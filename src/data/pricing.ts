// The single source for every wholesale price on the site, the rate card and the brochure.
//
// Decisions (owner, 2026-11-22): wholesale is 50g soap squares only, three soaps, public prices
// for events, hospitality and gifting. Shops that resell are quoted by message, so no resale price
// is shown. Prices are per piece, with a minimum per soap. 100g bars are retail only.
//
// A null price means "not confirmed yet": the page shows "Ask us" instead of a number, so
// nothing invented can reach the live site.

/** When the owner last confirmed these prices. Shown on the rate card. */
export const PRICES_AS_OF = '2026-11-22'

export const SQUARES = {
  weightGrams: 50,
  minPerSoap: 25,
  soaps: [
    {
      id: 'honey-oats',
      name: 'Honey Oats',
      base: 'Glycerine',
      price: 150 as number | null,
      image: '/products/50g-soap-squares/images/honey-oats-glycerin-50g.webp',
      note: 'Rolled oats and honey in a clear glycerine base.',
    },
    {
      id: 'kesar-haldi',
      name: 'Kesar Haldi',
      base: 'Papaya cucumber',
      price: 200 as number | null,
      image: '/products/50g-soap-squares/images/kesar-haldi-goatmilk-50g.webp',
      note: 'Saffron and turmeric in a papaya cucumber base, made without goat milk.',
    },
    {
      id: 'red-rose',
      name: 'Red Rose',
      base: 'Red wine' as string | null, // owner said "Red Vine"; SoapLedger lists the base as Red Wine. Confirm the spelling.
      price: 150 as number | null,
      image: '/products/50g-soap-squares/images/red-rose-50g.webp',
      note: 'A rose bar with a soft floral scent.',
    },
  ],
} as const

/** Owner, 2026-11-22: about 5 to 7 days for 50 squares of 50g. Larger orders are confirmed by message. */
export const LEAD_TIME = 'about 5 to 7 days for 50 squares'

export const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`
