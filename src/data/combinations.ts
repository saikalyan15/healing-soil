export type CombinationPage = {
  slug: string
  name: string
  title: string
  metaDescription: string
  productSlug: string
  faqs: { q: string; a: string }[]
  publishedAt: string | null
}

export const combinations: CombinationPage[] = []
