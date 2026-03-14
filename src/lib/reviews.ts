// Reviews data fetching — integrate with SoapLedger or a review service

export type Review = {
  id: string
  productId: string
  author: string
  rating: number
  comment: string
  createdAt: string
  verified: boolean
}

export async function getReviewsForProduct(productId: string): Promise<Review[]> {
  // TODO: fetch reviews from SoapLedger API
  return []
}

export async function submitReview(review: Omit<Review, 'id' | 'createdAt' | 'verified'>): Promise<Review | null> {
  // TODO: post review to SoapLedger API
  return null
}
