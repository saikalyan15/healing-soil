// Seasonal framing for gifting. Inside a season's from/until window (IST, inclusive) the homepage
// band, the header link and the wording on /gift-hampers use it; outside every window the site shows
// plain year-round gifting copy. The site is static, so a season switches on or off at the next
// build: .github/workflows/daily-rebuild.yml triggers one every day.
//
// Add a festival by adding an entry. Keep `live: false` until copy and photo are signed off.

export type FestiveSeason = {
  id: string
  live: boolean
  name: string
  navLabel: string
  /** The festival days, as one plain sentence placed next to delivery times. */
  dateNote: string
  from: string
  until: string
  eyebrow: string
  headline: string
  intro: string
  heroImage: { src: string; alt: string }
  enquiry: string
  metaTitle: string
}

export const festiveSeasons: FestiveSeason[] = [
  {
    id: 'christmas-new-year-2026',
    live: true,
    name: 'Christmas and New Year',
    navLabel: 'Christmas gifts',
    dateNote: 'Christmas is on Friday, 25 December, and New Year’s Day on Friday, 1 January.',
    from: '2026-11-09',
    until: '2027-01-06',
    eyebrow: 'Christmas and New Year gifting',
    headline: 'Handmade gifts for Christmas and the New Year',
    intro: 'Three gift sets, each made to order on our farm in South Goa. Something small for the people you see every day, and something fuller for family.',
    heroImage: { src: '/images/gifting/jute-bag-farm.webp', alt: 'A jute gift bag with a kraft card, a wrapped soap and two handmade soaps on a wooden board, with greenery behind' },
    enquiry: 'Hi Healing Soil, I would like to ask about a gift set for Christmas or the New Year.',
    metaTitle: 'Christmas and New Year Gift Hampers | Healing Soil',
  },
]

/** Today's date in IST as YYYY-MM-DD. */
const istDate = (now: Date) => new Date(now.getTime() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10)

export function activeSeason(now: Date = new Date()): FestiveSeason | null {
  const today = istDate(now)
  return festiveSeasons.find((s) => s.live && today >= s.from && today <= s.until) ?? null
}
