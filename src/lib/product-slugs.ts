export const CANONICAL_PRODUCT_SLUGS = [
  'neem-tulsi-glycerin-soap',
  'honey-oats-glycerin-soap',
  'ginger-rosemary-glycerin-soap',
  'orange-glycerin-soap',
  'pomegranate-glycerin-soap',
  'marigold-soap',
  'neem-tulsi-goat-milk-soap',
  'kesar-haldi-goat-milk-soap',
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
] as const

export const PRODUCT_SLUG_ALIASES = {
  'neem-tulsi-goatmilk-soap': 'neem-tulsi-goat-milk-soap',
  'honey-and-oats-goatmilk-soap': 'honey-oats-goat-milk-soap',
  'honey-oats-goatmilk-soap': 'honey-oats-goat-milk-soap',
  'ginger-rosemary-goat-milk-soap': 'ginger-rosemary-goat-milk-soap',
  'ginger-rosemary-goatmilk-soap': 'ginger-rosemary-goat-milk-soap',
  'orange-goatmilk-soap': 'orange-goat-milk-soap',
  'rice-rose-goatmilk-soap': 'rice-rose-goat-milk-soap',
  'pomegranate-goatmilk-soap': 'pomegranate-goat-milk-soap',
  'turmeric-honey-goatmilk-soap': 'turmeric-honey-goat-milk-soap',
  'sheabutter-kesar-gulab': 'shea-butter-kesar-gulab',
  'sheabutter-turmeric-gulab': 'shea-butter-turmeric-gulab',
  'honey-kesar-haldi-sheabutter-soap': 'honey-kesar-haldi-shea-butter-soap',
  'pomegranate-glycerine': 'pomegranate-glycerin-soap',
  orange: 'orange-glycerin-soap',
} as const

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
