export const CANONICAL_PRODUCT_SLUGS = [
  'neem-tulsi-glycerin-soap',
  'honey-oats-glycerin-soap',
  'ginger-rosemary-glycerin-soap',
  'orange-glycerin-soap',
  'pomegranate-glycerin-soap',
  'marigold-soap',
  'neem-tulsi-goat-milk-soap',
  'kesar-haldi-goat-milk-soap',
  'kesar-haldi-papaya-cucumber-soap',
  'kids-collection-set-of-4',
  'honey-oats-goat-milk-soap',
  'orange-goat-milk-soap',
  'rice-rose-goat-milk-soap',
  'pomegranate-goat-milk-soap',
  'ginger-rosemary-goat-milk-soap',
  'turmeric-honey-goat-milk-soap',
  'shea-butter-kesar-gulab',
  'shea-butter-turmeric-gulab',
  'honey-kesar-haldi-shea-butter-soap',
  'loofah-soaps',
  'travel-soaps',
  'red-rose-soap',
  'valentines-special-soap',
  'soap-squares-creamy-box',
  'soap-squares-light-box',
  'soap-squares-rich-box',
] as const

export const PRODUCT_SLUG_ALIASES = productSlugAliases

export type LegacyProductSlug = keyof typeof PRODUCT_SLUG_ALIASES

export function canonicalSlugFor(slug: string): string {
  return PRODUCT_SLUG_ALIASES[slug as LegacyProductSlug] ?? slug
}

export function resolveProductSlug(slug: string): string {
  return canonicalSlugFor(slug)
}

export function productSlugMatches(productSlug: string, requestedSlug: string): boolean {
  return canonicalSlugFor(productSlug) === canonicalSlugFor(requestedSlug)
}

const PRODUCT_NAME_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bGoatmilk\b/g, 'Goat Milk'],
  [/\bGoat Milk\b/g, 'Goat Milk'],
  [/\bSheabutter\b/g, 'Shea Butter'],
  [/\bShea Butter\b/g, 'Shea Butter'],
  [/\bHoney and Oats Goat Milk Soap\b/g, 'Honey Oats Goat Milk Soap'],
  [/\bKesar-Haldi Soap\b/g, 'Kesar Haldi Goat Milk Soap'],
]

export function canonicalProductName(name: string): string {
  return PRODUCT_NAME_REPLACEMENTS.reduce(
    (next, [pattern, replacement]) => next.replace(pattern, replacement),
    name
  )
}
import productSlugAliases from '../../config/product-slug-aliases.json'
