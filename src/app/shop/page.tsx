import type { Metadata } from 'next'
import { getProducts } from '@/lib/products'
import { absoluteUrl, ORGANIZATION_ID } from '@/lib/seo'
import { reviews } from '@/lib/reviews'
import ReviewCard from '@/components/ReviewCard'
import ShopClient from '@/components/ShopClient'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping'

export const metadata: Metadata = {
  title: 'Shop Handmade Soaps — Healing Soil',
  description:
    'Buy handmade soaps from Goa. No SLS, parabens, or synthetic fragrance. Made to order and shipped across India.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop Handmade Soaps — Healing Soil',
    description:
      'Buy handmade soaps from Goa. No SLS, parabens, or synthetic fragrance. Made to order and shipped across India.',
    url: '/shop',
    siteName: 'Healing Soil',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Healing Soil handmade soaps' }],
    type: 'website',
  },
}

const faqItems = [
  {
    q: 'What do you leave out of your soaps?',
    a: 'Our soaps contain no SLS, parabens, synthetic fragrance, or added preservatives. Each product page lists the ingredients used in that bar.',
  },
  {
    q: 'What is the difference between glycerin, goat milk, and shea butter soap?',
    a: 'Glycerin soap has a light, clean lather. Goat milk soap has a softer, creamier feel. Shea butter soap has the richest texture and a moisturising feel that leaves skin feeling soft. Choose based on the lather, texture, and ingredients you prefer.',
  },
  {
    q: 'Do you ship across India?',
    a: 'Yes, we ship pan-India.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Shipped in 2 days. Arrives in 4-7 days depending on your city.',
  },
  {
    q: 'Is Healing Soil cold-process or melt-and-pour soap?',
    a: 'Healing Soil is melt-and-pour, not cold-process. We melt pre-made, already-saponified glycerin, goat milk, and shea butter bases and hand-pour them with botanicals in small batches, rather than mixing raw oils and lye from scratch.',
  },
  {
    q: 'How do I order?',
    a: 'Add your soaps to the cart and pay securely online through Razorpay. Orders are prepaid and cash on delivery is not currently available. You can reach us on WhatsApp if you need help choosing.',
  },
  {
    q: 'Are these soaps suitable for sensitive skin?',
    a: 'Our range includes gentle options suitable for sensitive skin. They contain no SLS, parabens, or synthetic fragrance. If you are unsure, choose a smooth bar and review the ingredient list before ordering.',
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

// Statically rendered and revalidated by the 'products' cache tag, same as the
// other product-consuming pages. Previously force-dynamic, which ran a Vercel
// Function on every request.
export default async function ShopPage() {
  // Not caught on purpose — see the note in src/app/page.tsx. Caching an empty
  // shop would be worse than serving the last good render.
  const products = await getProducts()

  const riya = reviews.find((r) => r.id === 'review-010')!
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
            url: `https://healingsoil.in/shop/${p.slug}`,
            name: p.name,
            description: p.description,
            image: p.image_url ? absoluteUrl(p.image_url) : undefined,
            brand: { '@type': 'Brand', name: 'Healing Soil' },
            sku: p.slug,
            offers: {
              '@type': 'Offer',
              price: p.price,
              priceCurrency: 'INR',
              availability: p.in_stock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
              seller: { '@id': ORGANIZATION_ID },
              hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'IN',
                returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
              },
              shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                  '@type': 'MonetaryAmount',
                  value: 100,
                  currency: 'INR',
                },
                shippingDestination: {
                  '@type': 'DefinedRegion',
                  addressCountry: 'IN',
                },
                deliveryTime: {
                  '@type': 'ShippingDeliveryTime',
                  handlingTime: {
                    '@type': 'QuantitativeValue',
                    minValue: 2,
                    maxValue: 2,
                    unitCode: 'DAY',
                  },
                  transitTime: {
                    '@type': 'QuantitativeValue',
                    minValue: 3,
                    maxValue: 7,
                    unitCode: 'DAY',
                  },
                },
              },
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
            Every Healing Soil handmade soap bar is made by hand in small batches on a farm in South Goa. No SLS,
            parabens, or synthetic fragrance. Order and we will make it fresh for you.
          </p>
        </div>

        {/* Payment and delivery information shown before product selection. */}
        <div className="mb-8 grid gap-3 rounded-lg border border-[#D6CFC4] bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Secure payment', 'Prepaid online through Razorpay'],
            ['Delivery', 'Pan-India shipping'],
            ['Dispatch', 'Within 2 business days'],
            ['Shipping offer', `Free above ₹${FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')}`],
          ].map(([title, detail]) => (
            <div key={title} className="border-b border-[#E8E0D5] pb-3 last:border-0 last:pb-0 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-3 sm:even:border-r-0 lg:even:border-r lg:last:border-r-0">
              <p className="font-sans text-xs font-semibold uppercase tracking-wide text-[#1E5631]">{title}</p>
              <p className="mt-1 font-sans text-sm text-[#666666]">{detail}</p>
            </div>
          ))}
          <p className="font-sans text-xs text-[#666666] sm:col-span-2 lg:col-span-4">
            Cash on delivery is not currently available. Shipping is calculated at checkout for orders below ₹{FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')}.
          </p>
        </div>

        {/* Social proof */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ReviewCard
            quote={riya.comment}
            name={riya.author}
            location={riya.location}
            occupation={riya.occupation}
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
