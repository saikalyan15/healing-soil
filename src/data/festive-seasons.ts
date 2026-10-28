// data/festive-seasons.ts — seasonal framing for gifting, one entry per festival.
//
// The homepage strip and band, and the seasonal wording on /gift-hampers, read
// activeSeason(). Inside an entry's from/until window (IST, inclusive) that
// season's copy, photo and decor show; outside every window the site falls back
// to plain, year-round gifting copy. Pages that use this set
// `revalidate = 86400`, so a season switches on and off within a day with no
// redeploy.
//
// To add a festival: add an entry. To prepare one ahead of time without it going
// live: leave `live: false` until the copy and photo are signed off.
// Copy rules from CLAUDE.md apply: no em-dashes, no superlatives, no urgency.

export type SeasonDecor = 'marigold' | 'evergreen'

export type FestiveSeason = {
  id: string
  /** Off switch independent of dates, for an entry still being prepared. */
  live: boolean
  name: string
  /** The festival day itself, stated as a fact next to delivery times. */
  dateLabel: string
  from: string
  until: string
  decor: SeasonDecor
  eyebrow: string
  headline: string
  intro: string
  heroImage: { src: string; alt: string }
  /** Pre-filled WhatsApp opener. */
  enquiry: string
  /** Absolute <title> for /gift-hampers while this season is active. The
   *  description is built from the hamper data, so prices cannot drift. */
  metaTitle: string
}

export const festiveSeasons: FestiveSeason[] = [
  {
    id: 'diwali-2026',
    live: true,
    name: 'Diwali',
    dateLabel: 'Sunday, 8 November',
    from: '2026-10-01',
    // Bhai Dooj is 11 November.
    until: '2026-11-11',
    decor: 'marigold',
    eyebrow: 'Diwali gifting',
    headline: 'Handmade soap hampers for Diwali',
    intro:
      'Four hampers, each made to order on our farm in South Goa. Something small for the people you see every day, and something fuller for family.',
    heroImage: {
      src: '/images/gifting/diwali-potli.webp',
      alt: 'A cream and gold embroidered potli with a Happy Diwali tag, four handmade soaps and a pack of chocolate cashews in a wooden tray',
    },
    enquiry: 'Hi Healing Soil, I would like to ask about a Diwali gift hamper.',
    // 58 chars, within the 60 char budget.
    metaTitle: 'Diwali Gift Hampers, Handmade Soap from Goa | Healing Soil',
  },
  {
    // Prepared, not live. Before switching on: check the dates, the copy and
    // pick a photo without a Diwali tag in it.
    id: 'christmas-2026',
    live: false,
    name: 'Christmas',
    dateLabel: 'Friday, 25 December',
    from: '2026-12-01',
    until: '2026-12-26',
    decor: 'evergreen',
    eyebrow: 'Christmas gifting',
    headline: 'Handmade soap hampers for Christmas',
    intro:
      'Four hampers, each made to order on our farm in South Goa. For the people you see every day, and for family.',
    heroImage: {
      src: '/images/gifting/jute-bag-farm.webp',
      alt: 'A jute gift bag with a kraft card, a wrapped soap and two handmade soaps on a wooden board, with greenery behind',
    },
    enquiry: 'Hi Healing Soil, I would like to ask about a Christmas gift hamper.',
    metaTitle: 'Christmas Gift Hampers, Handmade Soap | Healing Soil',
  },
]

/** Today's date in IST as YYYY-MM-DD. */
function istDate(now: Date): string {
  return new Date(now.getTime() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

/** The live season whose window contains today (IST), or null. */
export function activeSeason(now: Date = new Date()): FestiveSeason | null {
  const today = istDate(now)
  return festiveSeasons.find((s) => s.live && today >= s.from && today <= s.until) ?? null
}
