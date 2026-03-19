import type { Metadata } from 'next'
import ReviewCard from '@/components/ReviewCard'
import { featuredReviews, shortReviews } from '@/lib/reviews'

export const metadata: Metadata = {
  title: 'Customer Reviews — Healing Soil',
  description:
    'Read what customers say about Healing Soil handmade soaps from Goa. Real reviews from real people — no edits, no stars.',
  alternates: { canonical: '/reviews' },
  openGraph: {
    title: 'Customer Reviews — Healing Soil',
    description: 'Read what customers say about Healing Soil handmade soaps from Goa.',
    url: '/reviews',
    siteName: 'Healing Soil',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Customer reviews for Healing Soil soaps' }],
    type: 'website',
  },
}

export default function ReviewsPage() {
  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Healing Soil Handmade Natural Soaps',
    description: 'Small-batch handmade soaps made on a farm in South Goa. Glycerin and goat milk bases, real ingredients, no chemicals.',
    brand: { '@type': 'Brand', name: 'Healing Soil' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '10',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Lisha' },
        reviewBody: 'I absolutely love your handmade soaps. They are not just beautiful but genuinely high in quality and gentle on the skin.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Snehal Rane' },
        reviewBody: 'This handmade natural soap has become a staple in my routine. My skin feels noticeably softer, dryness is a thing of the past.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Krutika' },
        reviewBody: 'Allergic to all the commercial soaps due to skin sensitivity. These were the only soaps that my skin did not react to.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Riya' },
        reviewBody: 'Absolutely loving the honey oats glycerine soap. It is very gentle on the skin. Even without the heavy lather, it leaves me feeling so refreshed.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
    ],
  }

  return (
    <div className="bg-[#F7F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
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
