// Renders the rate card and brochure to PDF with headless Chrome, from the same print pages
// and pricing data the site uses. Run: npm run build && npm run pdf
// The PDFs are committed (Cloudflare's build has no browser), and a hash of their source files
// is stored so scripts/check-pdfs.mjs can fail the site build when prices change but the PDFs
// were not regenerated.
import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pdfSourceHash } from './pdf-hash.mjs'

const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 4399
const root = process.cwd()
const pages = [
  ['rate-card', 'healing-soil-rate-card.pdf'],
  ['brochure', 'healing-soil-brochure.pdf'],
]

mkdirSync(join(root, 'public/downloads'), { recursive: true })
const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { cwd: root, stdio: 'ignore' })
try {
  for (let i = 0; i < 40; i++) {
    try { if ((await fetch(`http://localhost:${PORT}/`)).ok) break } catch {}
    await new Promise((r) => setTimeout(r, 250))
  }
  for (const [page, file] of pages) {
    const out = join(root, 'public/downloads', file)
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
}
