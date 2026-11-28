// The soap catalogue for the site. Seeded once from SoapLedger on 2026-11-22; after that this file
// is the source of truth. Wording was tidied to the brand rules (no superlatives, no em-dashes,
// no skin outcomes). Weight is shown only where SoapLedger states it.
//
// Left out on purpose: Charcoal (its name and text break the compliance rules and need rewriting),
// Blue Pea and Lavender Bliss (no photo yet), the gift sets, kids set and Valentine bar (gifting
// page), and the lip balm and body butter (shown on the homepage as seasonal).
//
// Methods: every bar here is melt and pour from a bought base except Coconut Moringa, which is
// cold process. Owner to confirm if any other bar is cold process.

export type Origin = { kind: 'farm' | 'sourced'; place?: string }
export type Ingredient = { name: string; origin?: Origin }
export type Method = 'Melt and pour' | 'Cold process'

export interface Soap {
  slug: string
  name: string
  base: string
  method: Method
  weightGrams: number | null
  price: number
  image: string | null
  description: string
  ingredients: Ingredient[]
  seoTitle?: string
  seoDescription?: string
  /** Old SoapLedger or site slugs that redirect here. */
  legacySlugs?: string[]
}

const farm: Origin = { kind: 'farm' }
const india: Origin = { kind: 'sourced', place: 'Indian farms' }
const EO: Ingredient = { name: 'Essential oils' }
const VE: Ingredient = { name: 'Vitamin E' }

export const SOAPS: Soap[] = [
  {
    slug: 'neem-tulsi-glycerin-soap', name: 'Neem Tulsi', base: 'Glycerine', method: 'Melt and pour', weightGrams: 100, price: 260,
    image: '/products/neem-tulsi-glycerine.webp',
    description: 'A gentle glycerine soap made with sun-dried neem and tulsi, two herbs long used in Ayurvedic personal care. Earthy herbal scent and a light lather.',
    ingredients: [{ name: 'Neem', origin: farm }, { name: 'Tulsi', origin: farm }, EO, VE],
  },
  {
    slug: 'neem-tulsi-goat-milk-soap', name: 'Neem Tulsi', base: 'Goat milk', method: 'Melt and pour', weightGrams: 100, price: 350,
    image: '/products/neem-tulsi-goatmilk.webp',
    description: 'A creamy goat milk soap with sun-dried neem and tulsi, two herbs long used in Ayurvedic personal care. Richer lather with a gentle herbal scent.',
    ingredients: [{ name: 'Neem', origin: farm }, { name: 'Tulsi', origin: farm }, EO, VE],
    legacySlugs: ['neem-tulsi-goatmilk-soap'],
  },
  {
    slug: 'honey-oats-glycerin-soap', name: 'Honey Oats', base: 'Glycerine', method: 'Melt and pour', weightGrams: 100, price: 260,
    image: '/products/honey-oats-glycerin.webp',
    description: 'A glycerine soap made with real honey and oat flakes. Warm, lightly sweet scent, gentle texture, and a light lather that leaves skin feeling soft.',
    ingredients: [{ name: 'Honey', origin: { kind: 'sourced', place: 'Goa' } }, { name: 'Oats' }, EO, VE],
  },
  {
    slug: 'honey-oats-goat-milk-soap', name: 'Honey Oats', base: 'Goat milk', method: 'Melt and pour', weightGrams: 100, price: 350,
    image: '/products/honey-oats-goatmilk.webp',
    description: 'A goat milk soap made with honey and oat flakes. Creamy lather, warm comforting scent, and a moisturising feel that leaves skin feeling soft.',
    ingredients: [{ name: 'Honey', origin: { kind: 'sourced', place: 'Goa' } }, { name: 'Oats' }, EO, VE],
    legacySlugs: ['honey-and-oats-goatmilk-soap', 'honey-oats-goatmilk-soap'],
  },
  {
    slug: 'kesar-haldi-papaya-cucumber-soap', name: 'Kesar Haldi', base: 'Papaya cucumber', method: 'Melt and pour', weightGrams: 100, price: 350,
    image: '/products/kesar-haldi-goatmilk.webp',
    description: 'A soap with saffron and turmeric, two ingredients long used in Indian personal care. Made without goat milk. Warm golden colour and a soft, creamy lather.',
    ingredients: [{ name: 'Turmeric', origin: india }, { name: 'Saffron (kesar)', origin: { kind: 'sourced', place: 'Kashmir' } }, EO, VE],
    legacySlugs: ['kesar-haldi-goat-milk-soap', 'kesar-haldi-goatmilk-soap'],
  },
  {
    slug: 'shea-butter-kesar-gulab', name: 'Kesar Gulab', base: 'Shea butter', method: 'Melt and pour', weightGrams: 100, price: 400,
    image: '/products/kesar-gulab-sheabutter.webp',
    description: 'A richly moisturising shea butter soap with saffron and rose. Slow, creamy lather, warm floral scent and a soft finish.',
    ingredients: [{ name: 'Saffron (kesar)', origin: { kind: 'sourced', place: 'Kashmir' } }, { name: 'Rose', origin: india }, EO, VE],
    legacySlugs: ['sheabutter-kesar-gulab'],
  },
  {
    slug: 'ginger-rosemary-glycerin-soap', name: 'Ginger Rosemary', base: 'Glycerine', method: 'Melt and pour', weightGrams: 100, price: 260,
    image: '/products/ginger-rosemary-glycerin.webp',
    description: 'A glycerine soap made with ginger and rosemary. Light lather with a warm herbal scent and a clean-rinsing feel.',
    ingredients: [{ name: 'Ginger', origin: india }, { name: 'Rosemary', origin: india }, EO, VE],
  },
  {
    slug: 'ginger-rosemary-goat-milk-soap', name: 'Ginger Rosemary', base: 'Goat milk', method: 'Melt and pour', weightGrams: 100, price: 350,
    image: '/products/ginger-rosemary-goat-milk.webp',
    description: 'A goat milk soap made with ginger and rosemary. Creamy lather with a warm herbal scent that rinses clean.',
    ingredients: [{ name: 'Ginger', origin: india }, { name: 'Rosemary', origin: india }, EO, VE],
    legacySlugs: ['ginger-rosemary-goatmilk-soap'],
  },
  {
    slug: 'pomegranate-glycerin-soap', name: 'Pomegranate', base: 'Glycerine', method: 'Melt and pour', weightGrams: 100, price: 260,
    image: '/products/pomegranate-glycerin.webp',
    description: 'A glycerine soap made with sun-dried pomegranate peel powder. Deep natural colour, light lather and a lightly textured surface.',
    ingredients: [{ name: 'Pomegranate peel, sun-dried and powdered', origin: india }, VE],
    legacySlugs: ['pomegranate-glycerine'],
  },
  {
    slug: 'pomegranate-goat-milk-soap', name: 'Pomegranate', base: 'Goat milk', method: 'Melt and pour', weightGrams: 100, price: 350,
    image: '/products/pomegranate-goatmilk.webp',
    description: 'A goat milk soap made with sun-dried pomegranate peel. Deep natural colour, creamy lather, and a subtly fruity scent that leaves skin feeling soft.',
    ingredients: [{ name: 'Pomegranate peel', origin: india }, EO, VE],
    legacySlugs: ['pomegranate-goatmilk-soap'],
  },
  {
    slug: 'orange-glycerin-soap', name: 'Orange', base: 'Glycerine', method: 'Melt and pour', weightGrams: 100, price: 260,
    image: '/products/orange-glycerine.webp',
    description: 'A bright glycerine soap made with sun-dried orange peel powder. Fresh citrus scent with a light, clean-rinsing lather.',
    ingredients: [{ name: 'Orange peel, sun-dried and powdered', origin: india }, VE],
    legacySlugs: ['orange'],
  },
  {
    slug: 'orange-goat-milk-soap', name: 'Orange', base: 'Goat milk', method: 'Melt and pour', weightGrams: 100, price: 350,
    image: '/products/orange-goatmilk.webp',
    description: 'A bright goat milk soap with sun-dried orange peel. Fresh citrus scent and a creamy lather.',
    ingredients: [{ name: 'Orange peel', origin: india }, EO, VE],
    legacySlugs: ['orange-goatmilk-soap'],
  },
  {
    slug: 'marigold-soap', name: 'Marigold', base: 'Glycerine', method: 'Melt and pour', weightGrams: null, price: 300,
    image: '/products/marigold-glycerine.webp',
    seoTitle: 'Marigold soap: glycerine bar with marigold oil and petals | Healing Soil',
    description: 'Made with marigold oil and marigold petals, with a very mild, sweet scent. The oil is made at home from marigolds grown on our farm, and the bar is finished with petals and vitamin E.',
    ingredients: [{ name: 'Marigold oil', origin: farm }, { name: 'Marigold petals', origin: farm }, VE],
  },
  {
    slug: 'red-rose-soap', name: 'Red Rose', base: 'Red wine and pomegranate', method: 'Melt and pour', weightGrams: null, price: 250,
    image: '/products/red-rose.webp',
    description: 'A handmade soap shaped like a rose, made on a sourced red wine and pomegranate base with rose essential oil and vitamin E. No farm botanicals. Soft, creamy lather with a delicate floral scent.',
    ingredients: [{ name: 'Rose essential oil', origin: india }, VE],
  },
  {
    slug: 'loofah-soaps', name: 'Loofah', base: 'Glycerine', method: 'Melt and pour', weightGrams: 150, price: 500,
    image: '/products/loofah.webp',
    seoTitle: 'Loofah soap: 150g glycerine bar with natural loofah | Healing Soil',
    description: 'A glycerine soap with a full slice of sun-dried loofah running through it. The loofah softens when wet, giving each wash a firm, textured feel. One bar in place of two: glycerine soap and natural loofah, with no SLS and no synthetic fragrance.',
    ingredients: [{ name: 'Dried sponge gourd (loofah)' }, EO, VE],
  },
  {
    slug: 'travel-soaps', name: 'Travel soaps', base: 'Glycerine and goat milk', method: 'Melt and pour', weightGrams: 30, price: 50,
    image: '/products/travel-soap.webp',
    description: 'Compact bars of our handmade soaps, made for travel, gym bags, or trying a new scent before you commit to a full bar. Same ingredients, same small-batch making, in a size for the road.',
    seoTitle: 'Travel soap bars: 30g mini soaps | Healing Soil',
    seoDescription: 'Small 30g handmade soap bars for travel, gym bags and guest stays. Glycerine and goat milk, made without SLS or synthetic fragrance. Order on WhatsApp.',
    ingredients: [EO, VE],
  },
  {
    slug: 'coconut-moringa', name: 'Coconut Moringa', base: 'Made from scratch', method: 'Cold process', weightGrams: null, price: 200,
    image: null,
    description: 'A cold-process soap made from coconut oil, olive oil and moringa juice, not from a ready base. Vitamin E is added.',
    ingredients: [{ name: 'Coconut oil' }, { name: 'Olive oil' }, { name: 'Moringa juice' }, VE],
  },
]

export const getSoap = (slug: string) => SOAPS.find((s) => s.slug === slug)

export const originLabel = (o?: Origin) =>
  !o ? null : o.kind === 'farm' ? 'Grown on our farm' : `Sourced${o.place ? `, ${o.place}` : ''}`

export const BASE_ORDER = ['Glycerine', 'Goat milk', 'Papaya cucumber', 'Shea butter', 'Red wine and pomegranate', 'Made from scratch']
