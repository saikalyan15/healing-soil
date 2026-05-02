export type IngredientPage = {
  slug: string
  name: string
  title: string
  metaDescription: string
  tagline: string
  origin: string         // "Grown on our Goa farm" or "Sourced from..."
  traditionalUse: string // Ayurvedic framing only, CDSCO-safe
  feel: string           // "gentle lather", "creamy texture"
  relatedProducts: string[]
  faqs: { q: string; a: string }[]
  publishedAt: string | null
}

export const ingredients: IngredientPage[] = []
