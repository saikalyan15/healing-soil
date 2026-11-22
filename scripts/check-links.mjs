// Fails the build if any internal link or image in the built pages points at something that does not exist.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const dist = join(process.cwd(), 'dist')
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p] })
const exists = (path) => path === '/' || existsSync(join(dist, path + '.html')) || existsSync(join(dist, path, 'index.html')) || existsSync(join(dist, path))
const redirects = existsSync(join(dist, '_redirects')) ? readFileSync(join(dist, '_redirects'), 'utf8').split('\n').map((l) => l.split(/\s+/)[0]) : []
const bad = new Map()
for (const file of walk(dist).filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8')
  for (const m of html.matchAll(/\b(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const path = decodeURI(m[1])
    if (path.startsWith('//') || exists(path) || redirects.includes(path) || redirects.some((r) => r.endsWith('/*') && path.startsWith(r.slice(0, -1)))) continue
    const key = path
    bad.set(key, (bad.get(key) ?? new Set()).add(file.replace(dist, '')))
  }
}
if (bad.size) {
  console.error('Broken internal links:')
  for (const [p, files] of bad) console.error(`  ${p}  (in ${[...files].slice(0, 3).join(', ')}${files.size > 3 ? ', ...' : ''})`)
  process.exit(1)
}
console.log('Link check passed: no broken internal links or images.')
