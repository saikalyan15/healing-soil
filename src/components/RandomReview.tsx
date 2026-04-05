'use client'

import { useEffect, useState } from 'react'
import { reviews } from '@/lib/reviews'
import ReviewCard from '@/components/ReviewCard'

export default function RandomReview() {
  const [review, setReview] = useState<(typeof reviews)[0] | null>(null)

  useEffect(() => {
    const idx = Math.floor(Math.random() * reviews.length)
    const pick = reviews[Math.max(0, Math.min(idx, reviews.length - 1))]
    setReview(pick)
  }, [])

  if (!review) return null

  return (
    <ReviewCard
      quote={review.comment}
      name={review.author}
      location={review.location}
      occupation={review.occupation}
      featured={false}
    />
  )
}
