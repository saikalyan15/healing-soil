// One-off: point links inside content at the new site structure so readers and Google skip a redirect hop.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
const { SOAPS } = await import('../src/data/soaps.ts')
const aliases = JSON.parse(readFileSync('config/product-slug-aliases.json', 'utf8'))
const map = new Map()
for (const s of SOAPS) { map.set(s.slug, s.slug); for (const l of s.legacySlugs ?? []) map.set(l, s.slug) }
for (const [l, c] of Object.entries(aliases)) if (map.has(c)) map.set(l, c)
let changed = 0
for (const dir of ['content/blog', 'content/stories', 'content/pages']) {
  for (const f of readdirSync(dir, { recursive: true }).filter((f) => String(f).endsWith('.mdx'))) {
    const path = join(dir, String(f))
    let s = readFileSync(path, 'utf8'); const before = s
    s = s.replace(/\]\(\/shop\/([a-z0-9-]+)\)/g, (m, slug) => map.has(slug) ? `](/soaps/${map.get(slug)})` : '](/soaps)')
    s = s.replace(/\]\(\/shop\)/g, '](/soaps)')
    s = s.replace(/\]\(\/ingredient\/[a-z0-9-]+\)/g, '](/ingredients)')
    s = s.replace(/\]\(\/compare\/glycerin-vs-goat-milk-soap\)/g, '](/blog/glycerin-vs-goat-milk-soap)')
    s = s.replace(/\]\(\/compare\/shea-butter-vs-glycerin-soap\)/g, '](/blog/shea-butter-vs-glycerin-soap)')
    s = s.replace(/\]\(\/compare\/[a-z0-9-]+\)/g, '](/soaps)')
    s = s.replace(/\]\(\/soap-for\/monsoon\)/g, '](/blog/best-soap-for-rainy-season-india)')
    s = s.replace(/\]\(\/(?:soap|soap-for|occasion|ayurvedic-soap)\/[a-z0-9/-]+\)/g, '](/soaps)')
    s = s.replace(/\]\(\/gift-hampers\)/g, '](/gifting)')
    s = s.replace(/\]\(\/corporate-gifting\)/g, '](/wholesale)')
    if (s !== before) { writeFileSync(path, s); changed++ }
  }
}
console.log('Files updated:', changed)
