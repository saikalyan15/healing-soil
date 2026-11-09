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
  /** The festival days, as one plain sentence placed next to delivery times. */
  dateNote: string
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
    // One window for both, live from the day Diwali gifting was taken down. Early on
    // purpose: everything is made to order, so gifts for 25 December need
    // ordering by mid-December. Ends after Epiphany, when New Year gifting
    // is done.
    id: 'christmas-new-year-2026',
    live: true,
    name: 'Christmas and New Year',
    dateNote: 'Christmas is on Friday, 25 December, and New Year’s Day on Friday, 1 January.',
    from: '2026-11-09',
    until: '2027-01-06',
    decor: 'evergreen',
    eyebrow: 'Christmas and New Year gifting',
    headline: 'Handmade gifts for Christmas and the New Year',
    intro:
      'Three gift sets, each made to order on our farm in South Goa. Something small for the people you see every day, and something fuller for family.',
    heroImage: {
      src: '/images/gifting/jute-bag-farm.webp',
      alt: 'A jute gift bag with a kraft card, a wrapped soap and two handmade soaps on a wooden board, with greenery behind',
    },
    enquiry: 'Hi Healing Soil, I would like to ask about a gift set for Christmas or the New Year.',
    // 50 chars, within the 60 char budget.
    metaTitle: 'Christmas and New Year Gift Hampers | Healing Soil',
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
