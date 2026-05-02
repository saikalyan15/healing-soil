export type OccasionPage = {
  slug: string
  title: string
  metaDescription: string
  h1: string
  tagline: string
  content: string
  relatedProducts: string[]
  faqs: { q: string; a: string }[]
  publishedAt: string | null
}

export const occasions: OccasionPage[] = []
