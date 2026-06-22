import { readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const slugModulePath = resolve(root, 'src/lib/product-slugs.ts')
const slugModule = readFileSync(slugModulePath, 'utf8')

function stringLiterals(source) {
  return [...source.matchAll(/'([^']+)'/g)].map((match) => match[1])
}

function readArrayExport(name) {
  const start = slugModule.indexOf(`export const ${name} = [`)
  if (start === -1) throw new Error(`Could not find ${name} in src/lib/product-slugs.ts`)
  const arrayStart = slugModule.indexOf('[', start)
  const arrayEnd = slugModule.indexOf('] as const', arrayStart)
  if (arrayStart === -1 || arrayEnd === -1) {
    throw new Error(`Could not parse ${name} in src/lib/product-slugs.ts`)
  }
  return stringLiterals(slugModule.slice(arrayStart, arrayEnd))
}

function readAliasMap() {
  const match = slugModule.match(/export const PRODUCT_SLUG_ALIASES = \{([\s\S]*?)\} as const/)
  if (!match) throw new Error('Could not find PRODUCT_SLUG_ALIASES in src/lib/product-slugs.ts')

  const aliases = new Map()
  for (const entry of match[1].split('\n')) {
    const quoted = entry.match(/'([^']+)':\s*'([^']+)'/)
    if (quoted) {
      aliases.set(quoted[1], quoted[2])
      continue
    }
    const bare = entry.match(/\s*([a-zA-Z0-9_-]+):\s*'([^']+)'/)
    if (bare) aliases.set(bare[1], bare[2])
  }
  return aliases
}

const canonicalSlugs = new Set(readArrayExport('CANONICAL_PRODUCT_SLUGS'))
const aliases = readAliasMap()

function canonicalSlugFor(slug) {
  return aliases.get(slug) ?? slug
}

const filesToScan = [
  'src/data/ayurvedic.ts',
  'src/data/combinations.ts',
  'src/data/comparisons.ts',
  'src/data/decisions.ts',
  'src/data/ingredients.ts',
  'src/data/occasions.ts',
  'src/app/blog/[slug]/page.tsx',
  'src/app/page.tsx',
]

function extractReferencedProductSlugs(file, source) {
  const refs = []
  const arrayField = /(?:relatedProducts(?:A|B)?|recommendedProducts)\s*:\s*\[([\s\S]*?)\]/g
  for (const match of source.matchAll(arrayField)) {
    refs.push(...stringLiterals(match[1]))
  }

  const allProductSlugs = source.match(/const allProductSlugs = \[([\s\S]*?)\]/)
  if (allProductSlugs) refs.push(...stringLiterals(allProductSlugs[1]))

  if (file.endsWith('src/app/blog/[slug]/page.tsx')) {
    const block = source.match(/const relatedProductsBySlug:[\s\S]*?= \{([\s\S]*?)\n\}/)
    if (block) {
      const arrays = [...block[1].matchAll(/\[([\s\S]*?)\]/g)]
      for (const match of arrays) refs.push(...stringLiterals(match[1]))
    }
  }

  if (file.endsWith('src/app/page.tsx')) {
    const block = source.match(/const BUNDLE_DEFINITIONS:[\s\S]*?= \[([\s\S]*?)\]/)
    if (block) {
      for (const match of block[1].matchAll(/slug:\s*'([^']+)'/g)) refs.push(match[1])
    }
  }

  return refs
}

const failures = []
const referenced = new Set()

for (const file of filesToScan) {
  const path = resolve(root, file)
  const source = readFileSync(path, 'utf8')
  for (const slug of extractReferencedProductSlugs(file, source)) {
    referenced.add(slug)
    const canonical = canonicalSlugFor(slug)
    if (!canonicalSlugs.has(canonical)) {
      failures.push({ file, slug, canonical })
    }
  }
}

if (failures.length > 0) {
  console.error('Product slug validation failed:')
  for (const failure of failures) {
    console.error(
      `- ${relative(root, failure.file)} references "${failure.slug}" -> "${failure.canonical}", which is not canonical`
    )
  }
  process.exit(1)
}

console.log(`Product slug validation passed: ${referenced.size} referenced slugs resolve.`)
