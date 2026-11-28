// Renders the rate card and brochure to PDF with headless Chrome, from the same print pages
// and pricing data the site uses. Run: npm run build && npm run pdf
// The PDFs are committed (Cloudflare's build has no browser), and a hash of their source files
// is stored so scripts/check-pdfs.mjs can fail the site build when prices change but the PDFs
// were not regenerated.
import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pdfSourceHash } from './pdf-hash.mjs'

const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 4399
const root = process.cwd()
const OUT = '.pdfbuild'
// The brochure is public. The rate card has prices, so it goes to docs/ for sending on WhatsApp.
const pages = [
  ['rate-card', 'docs/rate-card/healing-soil-rate-card.pdf'],
  ['brochure', 'public/downloads/healing-soil-brochure.pdf'],
]

mkdirSync(join(root, 'public/downloads'), { recursive: true })
mkdirSync(join(root, 'docs/rate-card'), { recursive: true })
const run = (args, env = {}) => {
  const r = spawnSync('npx', ['astro', ...args], { cwd: root, stdio: 'pipe', env: { ...process.env, ...env } })
  if (r.status !== 0 && args[1] !== 'stop') throw new Error(`astro ${args.join(' ')} failed: ${r.stderr}${r.stdout}`)
}
run(['build', '--outDir', OUT], { RATE_CARD: '1' })
run(['preview', 'stop'])
const server = spawn('npx', ['astro', 'preview', '--port', String(PORT), '--outDir', OUT], { cwd: root, stdio: 'ignore' })
try {
  let up = false
  for (let i = 0; i < 60 && !up; i++) {
    try { up = (await fetch(`http://localhost:${PORT}/print/rate-card`)).ok } catch {}
    if (!up) await new Promise((r) => setTimeout(r, 250))
  }
  if (!up) throw new Error('The preview server did not serve the rate card page')
  for (const [page, file] of pages) {
    const out = join(root, file)
    const r = spawnSync(CHROME, [
      '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--hide-scrollbars',
      '--virtual-time-budget=6000', `--print-to-pdf=${out}`, `http://localhost:${PORT}/print/${page}`,
    ], { stdio: 'pipe' })
    if (r.status !== 0) throw new Error(`Chrome failed for ${page}: ${r.stderr}`)
    console.log('Wrote', file)
  }
  writeFileSync(join(root, 'config/pdf-source.hash'), pdfSourceHash() + '\n')
} finally {
  server.kill()
  run(['preview', 'stop'])
  rmSync(join(root, OUT), { recursive: true, force: true })
}
