export type ComparisonPage = {
  slug: string
  title: string
  h1: string
  metaDescription: string
  subjectA: { name: string; slug: string; tagline: string; pros: string[]; feel: string }
  subjectB: { name: string; slug: string; tagline: string; pros: string[]; feel: string }
  verdict: string
  relatedProductsA: string[]  // product slugs filtered to base A
  relatedProductsB: string[]  // product slugs filtered to base B
  faqs: { q: string; a: string }[]
  publishedAt: string | null
}

export const comparisons: ComparisonPage[] = []
