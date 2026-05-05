import type { Metadata } from 'next'
import { getProducts } from '@/lib/products'

export const dynamic = 'force-dynamic'
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

const faqItems = [
  {
    q: 'Are these soaps really chemical-free?',
    a: 'Our soaps contain no synthetic additives: no SLS, no artificial fragrance, no parabens, no preservatives. Every ingredient is something you can read and recognise.',
  },
  {
    q: 'What is the difference between glycerin, goat milk, and shea butter soap?',
    a: 'Glycerin soap is light and clear, best for oily or normal skin. Goat milk soap is creamier and more nourishing, suited to sensitive or dry skin. Shea butter soap is the richest of the three, best for very dry skin or anyone who wants to skip a separate moisturiser.',
  },
  {
    q: 'Do you ship across India?',
    a: 'Yes, we ship pan-India.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Shipped in 4 days. Arrives in 3 to 7 days depending on your city.',
  },
  {
    q: 'How do I order?',
    a: 'You can order through our website or reach us on WhatsApp. Both work.',
  },
  {
    q: 'Are these soaps suitable for sensitive skin?',
    a: 'Yes. Our soaps contain no synthetic fragrance, no SLS, and no parabens — the ingredients most likely to cause problems for people with sensitive skin. The goat milk and shea butter bases give a particularly gentle, creamy lather.',
  },
  {
    q: 'Is this a made-to-order product?',
    a: 'Yes. Every bar is made after you order. We do not hold pre-made stock, which keeps ingredients fresh and means no preservatives are needed.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
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
          url: `https://healingsoil.in/shop/${p.slug}`,
          item: {
            '@type': 'Product',
            name: p.name,
            description: p.description,
            image: p.image_url || undefined,
            brand: { '@type': 'Brand', name: 'Healing Soil' },
            sku: p.slug,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <div className="border-t border-[#D6CFC4] bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <h2 className="mb-8 font-serif text-3xl text-[#1E5631]">Frequently asked questions</h2>
          <div className="divide-y divide-[#D6CFC4]">
            {faqItems.map(({ q, a }) => (
              <details key={q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-base font-medium text-[#1A1A14] hover:text-[#1E5631]">
                  {q}
                  <span className="flex-shrink-0 text-[#C9A84C] transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#666666]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
