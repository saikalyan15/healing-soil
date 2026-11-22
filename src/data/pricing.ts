// The single source for every price on the site, the rate card and the brochure.
//
// STATUS: retail prices are a snapshot of SoapLedger taken on 2026-11-22.
// The wholesale discounts, band sizes and 50g prices are PROPOSED and need the owner's sign-off
// before anything is published. Change a number here and every page and PDF follows.

export const PRICES_AS_OF = '2026-11-22'

/** Retail price per 100g bar, in rupees, by price tier. */
export const RETAIL_100G = {
  glycerine: 260,
  marigold: 300,
  goatMilk: 350,
  sheaButter: 400,
} as const

export type Tier = keyof typeof RETAIL_100G

export const TIER_LABEL: Record<Tier, string> = {
  glycerine: 'Glycerine bars',
  marigold: 'Marigold',
  goatMilk: 'Goat milk bars',
  sheaButter: 'Shea butter bars',
}

/** 100g bars. Bands count the bars in one order, mixed bars allowed. Discount is off retail. */
export const BANDS_100G = [
  { from: 12, to: 23, discount: 0.3 },
  { from: 24, to: 47, discount: 0.35 },
  { from: 48, to: null, discount: 0.4 },
] as const

/** 50g squares. Not half price: handling and wrapping cost the same as a 100g bar. Minimum per variant. */
export const SQUARES_50G = {
  minPerVariant: 25,
  price: { glycerine: 150, goatMilk: 200, sheaButter: 225 },
  volume: { from: 100, discount: 0.1 },
} as const

const roundTo5 = (n: number) => Math.round(n / 5) * 5

export function wholesale100g(tier: Tier) {
  return BANDS_100G.map((b) => ({ ...b, price: roundTo5(RETAIL_100G[tier] * (1 - b.discount)) }))
}

export function squares50gVolumePrice(tier: keyof typeof SQUARES_50G.price) {
  return roundTo5(SQUARES_50G.price[tier] * (1 - SQUARES_50G.volume.discount))
}
