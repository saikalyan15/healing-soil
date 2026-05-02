export type CityPage = {
  slug: string
  displayName: string
  state: string
  deliveryNote: string    // "Ships from Goa in 4 days, arrives in 3–7"
  reviewerNote?: string   // "We have customers in [city]..." — only if true
  faqs: { q: string; a: string }[]
  publishedAt: string | null
}

export const cities: CityPage[] = []
