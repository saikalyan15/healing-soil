// data/gift-hampers.ts — the one place gift set contents live.
//
// Read by /gift-hampers (consumer, indexed), /corporate-gifting (ad landing),
// and the gifting band on the homepage.
//
// No prices, by the owner's decision (Nov 2026): the sets are quoted on
// WhatsApp. Do not add a price field back without the owner asking. Two static
// files describe the sets by hand and must follow any change here:
// public/llms.txt and content/blog/gifting-handmade-soap.mdx.
//
// Copy rules from CLAUDE.md apply: no em-dashes, no superlatives, no urgency, no
// therapeutic claims. Say which items are made on the farm and which are bought
// in.

export type GiftHamper = {
  id: string
  name: string
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
    summary: 'Four 50g soaps in one box.',
    contents: ['Four assorted 50g handmade soaps', 'Packed together in one box'],
    image: {
      src: '/products/soap-squares-light-box.webp',
      alt: 'Four 50g handmade soaps in a kraft gift box printed with the Healing Soil logo, with neem leaves and marigold petals around it',
      position: '50% 55%',
    },
  },
  {
    id: 'full-set',
    name: 'The full set',
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

