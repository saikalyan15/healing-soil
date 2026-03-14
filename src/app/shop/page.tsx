import type { Metadata } from 'next'
import { getProducts } from '@/lib/products'
import { reviews } from '@/lib/reviews'
import ReviewCard from '@/components/ReviewCard'
import ShopClient from '@/components/ShopClient'

export const metadata: Metadata = {
  title: 'Shop Handmade Soaps — Healing Soil',
  description:
    'Buy handmade chemical-free soaps from Goa. Glycerin and goat milk bases, natural ingredients. Made to order and shipped across India.',
}

export default async function ShopPage() {
  const products = await getProducts().catch(() => [])

  const krutika = reviews.find((r) => r.id === 'review-006')!
  const samyuktha = reviews.find((r) => r.id === 'review-008')!

  return (
    <div className="bg-[#F7F5F0]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">

        {/* Heading + intro */}
        <div className="mb-8 max-w-2xl">
          <h1 className="mb-3 font-serif text-5xl leading-tight text-[#1E5631]">
            The soaps
          </h1>
          <p className="font-sans text-base leading-relaxed text-[#666666]">
            Everything here is made by hand in small batches on a farm in South Goa. No chemicals,
            no synthetics. Order and we will make it fresh for you.
          </p>
        </div>

        {/* Social proof — skin sensitivity buyers */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ReviewCard
            quote={krutika.comment}
            name={krutika.author}
            location={krutika.location}
            occupation={krutika.occupation}
            featured={false}
          />
          <ReviewCard
            quote={samyuktha.comment}
            name={samyuktha.author}
            location={samyuktha.location}
            occupation={samyuktha.occupation}
            featured={false}
          />
        </div>

        {/* Category filter + product grid (client) */}
        {products.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-sans text-sm text-[#999]">
              Products are loading — please check back shortly.
            </p>
          </div>
        ) : (
          <ShopClient products={products} />
        )}

      </div>
    </div>
  )
}
