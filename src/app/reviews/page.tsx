import type { Metadata } from 'next'
import ReviewCard from '@/components/ReviewCard'
import { featuredReviews, shortReviews } from '@/lib/reviews'

export const metadata: Metadata = {
  title: 'Customer Reviews — Healing Soil',
  description:
    'Read what customers say about Healing Soil handmade soaps from Goa.',
}

export default function ReviewsPage() {
  return (
    <div className="bg-[#F7F5F0]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">

        <h1 className="mb-3 font-serif text-5xl leading-tight text-[#1E5631]">
          What our customers say
        </h1>
        <p className="mb-12 font-sans text-base text-[#666666]">
          Real feedback from real customers. No edits, no stars — just their words.
        </p>

        {/* Featured reviews */}
        <div className="mb-10 space-y-5">
          {featuredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              quote={review.comment}
              name={review.author}
              location={review.location}
              occupation={review.occupation}
              featured={true}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#D6CFC4]" />
          <span className="font-sans text-xs uppercase tracking-widest text-[#999]">
            More reviews
          </span>
          <div className="h-px flex-1 bg-[#D6CFC4]" />
        </div>

        {/* Short reviews grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {shortReviews.map((review) => (
            <ReviewCard
              key={review.id}
              quote={review.comment}
              name={review.author}
              location={review.location}
              occupation={review.occupation}
              featured={false}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
