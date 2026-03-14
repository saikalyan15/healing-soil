import type { Metadata } from 'next'
import { getProducts } from '@/lib/products'
import { reviews } from '@/lib/reviews'
import ReviewCard from '@/components/ReviewCard'
import ShopClient from '@/components/ShopClient'

export const metadata: Metadata = {
  title: 'Shop Handmade Soaps — Healing Soil',
  description:
    'Buy handmade chemical-free soaps from Goa. Glycerin and goat milk bases, natural ingredients. Made to order and shipped across India.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop Handmade Soaps — Healing Soil',
    description:
      'Buy handmade chemical-free soaps from Goa. Glycerin and goat milk bases, natural ingredients. Made to order and shipped across India.',
    url: '/shop',
    siteName: 'Healing Soil',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Healing Soil handmade soaps' }],
    type: 'website',
  },
}

export default async function ShopPage() {
  const products = await getProducts().catch(() => [])

  const krutika = reviews.find((r) => r.id === 'review-006')!
  const samyuktha = reviews.find((r) => r.id === 'review-008')!

  const itemListSchema = products.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Healing Soil Handmade Soaps',
        url: 'https://healingsoil.in/shop',
        numberOfItems: products.length,
        itemListElement: products.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: p.name,
          url: `https://healingsoil.in/shop#${p.slug}`,
          item: {
            '@type': 'Product',
            name: p.name,
            description: p.description,
            image: p.image_url || undefined,
            offers: {
              '@type': 'Offer',
              price: p.price,
              priceCurrency: 'INR',
              availability: p.in_stock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            },
          },
        })),
      }
    : null

  return (
    <div className="bg-[#F7F5F0]">
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

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
