// data/gift-hampers.ts — the one place gift hamper contents and prices live.
//
// Read by /gift-hampers (consumer, indexed), /corporate-gifting (ad landing),
// and the Diwali band on the homepage. Change a price here and every surface,
// including the Product/Offer structured data, follows. Two static files quote
// the prices by hand and must be updated with them: public/llms.txt and
// content/blog/gifting-handmade-soap.mdx (the price range).
//
// Copy rules from CLAUDE.md apply: no em-dashes, no superlatives, no urgency, no
// therapeutic claims. Say which items are made on the farm and which are bought
// in. The chocolate cashews are bought in from a packaged-food maker that holds
// its own FSSAI registration, so the copy makes no food claims of our own.

export type GiftHamper = {
  id: string
  name: string
  /** Rupees, as a number, so structured data and display share one source. */
  price: number
  /** One-line summary for compact tiles. */
  summary: string
  /** Itemised contents for the full card and the schema description. */
  contents: string[]
  /** Optional note under the contents, e.g. the card or where an item comes from. */
  note?: string
  /** Single photo shown on the card and in the structured data. */
  image: { src: string; alt: string; position?: string }
}

export const giftHampers: GiftHamper[] = [
  {
    id: 'jute-bag',
    name: 'The jute bag set',
    price: 300,
    summary: 'A reusable jute bag with three mini soaps.',
    contents: ['A reusable jute drawstring bag', 'Three mini handmade soaps'],
    note: 'Comes with a kraft card, with space for a handwritten note.',
    image: {
      src: '/images/gifting/jute-bag-card.webp',
      alt: 'A jute drawstring bag with a kraft card, a wrapped soap and two mini soaps',
      position: '50% 55%',
    },
  },
  {
    id: 'discovery-box',
    name: 'The discovery box',
    price: 899,
    summary: 'Four 50g soaps in one box.',
    contents: ['Four assorted 50g handmade soaps', 'Packed together in one box'],
    image: {
      src: '/products/soap-squares-light-box.webp',
      alt: 'Four 50g handmade soaps in a kraft gift box printed with the Healing Soil logo, with neem leaves and marigold petals around it',
      position: '50% 55%',
    },
  },
  {
    id: 'festive-potli',
    name: 'The festive potli',
    price: 1299,
    summary: 'An embroidered potli with four 50g soaps and chocolate cashews.',
    contents: [
      'A festive embroidered potli bag, reusable',
      'Four assorted 50g handmade soaps',
      'Five chocolate-coated cashews',
    ],
    note: 'The soaps are made on our farm. The chocolate cashews are bought in from a packaged-food maker.',
    image: {
      src: '/images/gifting/diwali-potli.webp',
      alt: 'A cream and gold embroidered potli with a Happy Diwali tag, four handmade soaps and a pack of chocolate cashews in a wooden tray',
      position: '50% 60%',
    },
  },
  {
    id: 'full-set',
    name: 'The full set',
    price: 1499,
    summary: 'Two soaps, an avocado body butter and a kokum lip balm.',
    contents: [
      'One 100g handmade soap',
      'One 50g handmade soap',
      'An avocado body butter',
      'A kokum lip balm',
    ],
    image: {
      src: '/images/gifting/floral-bag-set.webp',
      alt: 'A printed jute bag beside a honey oats soap, a green soap, an avocado body butter and a kokum lip balm',
      position: '50% 72%',
    },
  },
]

export function formatRupees(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`
}

export const LOWEST_HAMPER_PRICE = Math.min(...giftHampers.map((h) => h.price))
export const HIGHEST_HAMPER_PRICE = Math.max(...giftHampers.map((h) => h.price))
