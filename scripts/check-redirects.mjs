// Fails if any redirect destination in dist/_redirects is not a built page or file.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = join(process.cwd(), 'dist')
const bad = []
for (const line of readFileSync(join(dist, '_redirects'), 'utf8').split('\n')) {
  if (!line.trim()) continue
  const [from, to] = line.split(/\s+/)
  if (to.includes(':splat')) continue
  const path = to.split('#')[0]
  const ok = path === '/' || existsSync(join(dist, path + '.html')) || existsSync(join(dist, path, 'index.html')) || existsSync(join(dist, path))
  if (!ok) bad.push(`${from} -> ${to}`)
  if (from === to) bad.push(`loop: ${from}`)
}
if (bad.length) {
  console.error('Redirect destinations that do not exist:\n' + [...new Set(bad)].join('\n'))
  process.exit(1)
}
console.log('Redirect check passed: every destination exists.')
