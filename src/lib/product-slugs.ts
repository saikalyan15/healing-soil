export const CANONICAL_PRODUCT_SLUGS = [
  'neem-tulsi-glycerin-soap',
  'honey-oats-glycerin-soap',
  'ginger-rosemary-glycerin-soap',
  'orange-glycerin-soap',
  'pomegranate-glycerin-soap',
  'marigold-soap',
  'neem-tulsi-goat-milk-soap',
  // The Kesar Haldi bar moved off a goat milk base. 'kesar-haldi-goat-milk-soap'
  // is now a legacy alias for this slug, not a product of its own.
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
  'gift-soap-pouch',
  'blue-pea-soap',
  'coconut-moringa',
  // SoapLedger's charcoal product is deliberately absent. Its name carries a
  // word banned by config/compliance-rules.json, so prohibitedClaimCategories()
  // makes getProducts() throw on it. That throw sits inside the map over the
  // catalogue, so it takes down every product, not just that one. It has to be
  // renamed in SoapLedger, and its slug changes with the name, so there is
  // nothing stable to list here yet.
] as const

/**
 * Products SoapLedger has archived. They stay canonical so their URLs keep
 * redirecting, but nothing in src/data may recommend them: selectProducts drops
 * a slug the catalogue no longer returns, silently, so a page whose whole
 * related-product list is retired renders an empty section rather than failing.
 * validate:products enforces that.
 */
export const RETIRED_PRODUCT_SLUGS = [
  'rice-rose-goat-milk-soap',
  'turmeric-honey-goat-milk-soap',
  'shea-butter-turmeric-gulab',
  'honey-kesar-haldi-shea-butter-soap',
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
  // No Kesar-Haldi rule. This used to rewrite SoapLedger's 'Kesar-Haldi Soap'
  // to 'Kesar Haldi Goat Milk Soap', which named a base the bar is not on:
  // SoapLedger has it as Papaya Cucumber. Leave the catalogue name alone.
]

export function canonicalProductName(name: string): string {
  return PRODUCT_NAME_REPLACEMENTS.reduce(
    (next, [pattern, replacement]) => next.replace(pattern, replacement),
    name
  )
}
import productSlugAliases from '../../config/product-slug-aliases.json'
