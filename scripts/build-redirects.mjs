// Writes public/_redirects from config/redirects.txt plus one rule per story, so old
// /stories/<slug> and root-level WordPress slugs reach /blog/<slug>. Stories are listed by
// slug (no wildcard) because /stories/*.webp image files must keep loading.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const rules = new Map()
const add = (from, to) => { if (!rules.has(from)) rules.set(from, to) }

for (const raw of readFileSync(join(root, 'config/redirects.txt'), 'utf8').split('\n')) {
  const line = raw.trim()
  if (!line || line.startsWith('#')) continue
  const [from, to] = line.split(/\s+/)
  add(from, to)
}

// Old shop URLs: /shop/<slug> and every legacy slug go to the matching /soaps page.
// Retired products and anything unknown fall through to /soaps.
const { SOAPS } = await import('../src/data/soaps.ts')
const aliases = JSON.parse(readFileSync(join(root, 'config/product-slug-aliases.json'), 'utf8'))
for (const soap of SOAPS) {
  add(`/shop/${soap.slug}`, `/soaps/${soap.slug}`)
  for (const legacy of soap.legacySlugs ?? []) add(`/shop/${legacy}`, `/soaps/${soap.slug}`)
}
for (const [legacy, canonical] of Object.entries(aliases)) {
  const soap = SOAPS.find((s) => s.slug === canonical)
  add(`/shop/${legacy}`, soap ? `/soaps/${soap.slug}` : '/soaps')
}
for (const gone of ['rice-rose-goat-milk-soap', 'turmeric-honey-goat-milk-soap', 'shea-butter-turmeric-gulab', 'honey-kesar-haldi-shea-butter-soap']) add(`/shop/${gone}`, '/soaps')
add('/shop', '/soaps')
add('/our-products', '/soaps')
add('/shop/*', '/soaps')

const published = (path) => !/^---[\s\S]*?\bpublished:\s*false\b[\s\S]*?---/i.test(readFileSync(path, 'utf8'))
const blogSlugs = new Set(readdirSync(join(root, 'content/blog')).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, '')))
for (const f of readdirSync(join(root, 'content/stories')).filter((f) => f.endsWith('.mdx'))) {
  const slug = f.replace(/\.mdx$/, '')
  if (!published(join(root, 'content/stories', f))) continue
  add(`/stories/${slug}`, `/blog/${slug}`)
  if (!blogSlugs.has(slug)) add(`/${slug}`, `/blog/${slug}`)
}

const lines = []
for (const [from, to] of rules) {
  lines.push(`${from} ${to} 301`)
  if (!from.includes('*') && from !== '/' && !from.endsWith('.php')) lines.push(`${from}/ ${to} 301`)
}
writeFileSync(join(root, 'public/_redirects'), lines.join('\n') + '\n')
console.log(`Wrote public/_redirects with ${lines.length} rules`)
