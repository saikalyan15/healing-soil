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
