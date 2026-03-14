// lib/reviews.ts — static customer review data for Healing Soil

export type Review = {
  id: string
  author: string
  location: string
  occupation?: string
  productSlug?: string       // linked product slug when review is product-specific
  comment: string
  featured: boolean          // true → long featured testimonial; false → short quote
}

// ─── Static review data ────────────────────────────────────────────────────────

export const reviews: Review[] = [
  // ── Featured (long-form) reviews ──────────────────────────────────────────
  {
    id: 'review-001',
    author: 'Lisha',
    location: 'Bangalore',
    comment:
      'I absolutely love your handmade soaps. They are not just beautiful but genuinely high in quality and gentle on the skin. What makes Healing Soil soaps even better is the thoughtful approach towards reducing plastic and mindful waste. It truly reflects your values, and that makes your products even more meaningful and worth supporting. I am for sure going to be your loyal customer and I have strongly recommended your soaps to my friends as well.',
    featured: true,
  },
  {
    id: 'review-002',
    author: 'Snehal Rane',
    location: 'Bangalore',
    comment:
      'This handmade natural soap has become a staple in my routine. My skin feels noticeably softer, dryness is a thing of the past, and it has even helped reduce my tan. Every use leaves me feeling calm and refreshed. It is the little luxury I did not know I needed.',
    featured: true,
  },

  // ── Short reviews ─────────────────────────────────────────────────────────
  {
    id: 'review-003',
    author: 'Customer',
    location: 'Bangalore',
    comment: 'Came out of the shower smelling like a baby',
    featured: false,
  },
  {
    id: 'review-004',
    author: 'Customer',
    location: 'Bangalore',
    comment: 'I love that soap does not lather up like regular ones',
    featured: false,
  },
  {
    id: 'review-005',
    author: 'Customer',
    location: 'Bangalore',
    productSlug: 'neem-tulsi-goat-milk',
    comment: 'Neem Tulsi soap was amazing and has soft mild fragrance',
    featured: false,
  },
  {
    id: 'review-006',
    author: 'Krutika',
    location: 'Bangalore',
    occupation: 'Housewife',
    comment:
      'Allergic to all the commercial soaps due to skin sensitivity. These were the only soaps that my skin did not react to',
    featured: false,
  },
  {
    id: 'review-007',
    author: 'Shubhada',
    location: 'Bangalore',
    occupation: 'Small Business Owner',
    comment: 'The soaps are amazing and very mild and exfoliating',
    featured: false,
  },
  {
    id: 'review-008',
    author: 'Samyuktha',
    location: 'Bangalore',
    occupation: 'Therapist',
    comment: 'Soaps are amazing and long lasting',
    featured: false,
  },
  {
    id: 'review-009',
    author: 'Sonia',
    location: 'Bangalore',
    occupation: 'Housewife',
    comment:
      'The Red wine soaps are awesome. They lather less and consume less water',
    featured: false,
  },
]

// ─── Derived exports ───────────────────────────────────────────────────────────

/** All reviews with featured: true (long-form testimonials) */
export const featuredReviews: Review[] = reviews.filter((r) => r.featured)

/** All reviews with featured: false (short pull-quotes) */
export const shortReviews: Review[] = reviews.filter((r) => !r.featured)

/**
 * Returns all reviews linked to a specific product slug.
 * Falls back to returning all reviews if no slug match is found,
 * so UIs always have something to display.
 */
export function reviewsForProduct(slug: string): Review[] {
  const matched = reviews.filter((r) => r.productSlug === slug)
  return matched.length > 0 ? matched : reviews
}
