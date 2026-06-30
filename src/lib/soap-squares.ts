const SQUARE_IMAGE_BASE = '/products/50g-soap-squares/images'

export type SoapSquaresBoxSlug =
  | 'soap-squares-creamy-box'
  | 'soap-squares-light-box'
  | 'soap-squares-rich-box'

export type SoapSquaresBoxDetail = {
  slug: SoapSquaresBoxSlug
  badge: string
  shortLabel: string
  contents: string
  selectionCopy: string
  supportImages: { src: string; alt: string }[]
}

export const soapSquaresBoxDetails: SoapSquaresBoxDetail[] = [
  {
    slug: 'soap-squares-creamy-box',
    badge: 'Most Popular',
    shortLabel: 'Creamy Box',
    contents: '4 x 50g Goat Milk Soap Squares',
    selectionCopy: 'Goat milk soaps with a softer, creamier feel.',
    supportImages: [
      {
        src: `${SQUARE_IMAGE_BASE}/neem-tulsi-goatmilk-50g.png`,
        alt: 'Neem Tulsi Goat Milk 50g Soap Square',
      },
      {
        src: `${SQUARE_IMAGE_BASE}/honey-oats-goatmilk-50g.png`,
        alt: 'Honey Oats Goat Milk 50g Soap Square',
      },
      {
        src: `${SQUARE_IMAGE_BASE}/kesar-haldi-goatmilk-50g.png`,
        alt: 'Kesar Haldi Goat Milk 50g Soap Square',
      },
    ],
  },
  {
    slug: 'soap-squares-light-box',
    badge: 'Best Entry Price',
    shortLabel: 'Light Box',
    contents: '4 x 50g Glycerin Soap Squares',
    selectionCopy: 'Glycerin soaps with a clean, easy lather.',
    supportImages: [
      {
        src: `${SQUARE_IMAGE_BASE}/neem-tulsi-glycerine-50g.png`,
        alt: 'Neem Tulsi Glycerin 50g Soap Square',
      },
      {
        src: `${SQUARE_IMAGE_BASE}/honey-oats-glycerin-50g.png`,
        alt: 'Honey Oats Glycerin 50g Soap Square',
      },
      {
        src: `${SQUARE_IMAGE_BASE}/marigold-glycerine-50g.png`,
        alt: 'Marigold Glycerin 50g Soap Square',
      },
    ],
  },
  {
    slug: 'soap-squares-rich-box',
    badge: 'Most Giftable',
    shortLabel: 'Rich Box',
    contents: '2 x 50g Shea Butter + 2 x 50g Goat Milk',
    selectionCopy: 'A richer-feeling mix with shea butter and goat milk soaps.',
    supportImages: [
      {
        src: `${SQUARE_IMAGE_BASE}/kesar-gulab-sheabutter-50g.png`,
        alt: 'Kesar Gulab Shea Butter 50g Soap Square',
      },
      {
        src: `${SQUARE_IMAGE_BASE}/honey-kesar-haldi-sheabutter-50g.png`,
        alt: 'Honey Kesar Haldi Shea Butter 50g Soap Square',
      },
      {
        src: `${SQUARE_IMAGE_BASE}/orange-goatmilk-50g.png`,
        alt: 'Orange Goat Milk 50g Soap Square',
      },
    ],
  },
]

const SOAP_SQUARES_SLUGS = new Set<string>(soapSquaresBoxDetails.map((box) => box.slug))

export function isSoapSquaresProduct(productOrSlug: { slug: string } | string): boolean {
  const slug = typeof productOrSlug === 'string' ? productOrSlug : productOrSlug.slug
  return SOAP_SQUARES_SLUGS.has(slug)
}

export function getSoapSquaresBoxDetail(slug: string): SoapSquaresBoxDetail | null {
  return soapSquaresBoxDetails.find((box) => box.slug === slug) ?? null
}
