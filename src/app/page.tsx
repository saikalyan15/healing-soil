import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getProducts } from '@/lib/products'
import { reviews } from '@/lib/reviews'
import ReviewCard from '@/components/ReviewCard'
import BundlePicker from '@/components/BundlePicker'
import VideoTestimonial from '@/components/VideoTestimonial'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: 'Healing Soil | Handmade Soap for Skin That Reacts to Commercial Soap' },
  description:
    'Handmade soap from a Goa farm. SLS-free, glycerin retained. A starter bundle of 4 soaps for ₹1,000 for skin that has stopped getting along with commercial soap.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Healing Soil | Handmade Soap for Skin That Reacts to Commercial Soap',
    description:
      'Handmade soap from a Goa farm. SLS-free, glycerin retained. A starter bundle of 4 soaps for ₹1,000.',
    url: '/',
    siteName: 'Healing Soil',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Healing Soil handmade soaps from Goa' }],
    type: 'website',
  },
}

// Exact slugs for the starter bundle (Stage 2 offer in docs/growth-strategy.md).
// Fallback regex catches drift if a slug is renamed; specific enough to
// disambiguate from sibling products (e.g. neem-tulsi-glycerin vs goatmilk).
const BUNDLE_DEFINITIONS: { slug: string; fallback: RegExp }[] = [
  { slug: 'honey-oats-glycerin-soap', fallback: /honey.*oat.*glycerin/i },
  { slug: 'neem-tulsi-goatmilk-soap', fallback: /neem.*tulsi.*goat/i },
  { slug: 'kesar-haldi-goat-milk-soap', fallback: /kesar.*haldi.*goat/i },
  { slug: 'travel-soaps', fallback: /travel/i },
]

function pickBundleDefaults(products: { id: string; slug: string }[]): string[] {
  const used = new Set<string>()
  const picked: string[] = []
  for (const def of BUNDLE_DEFINITIONS) {
    const exact = products.find((p) => p.slug === def.slug && !used.has(p.id))
    const found = exact ?? products.find((p) => def.fallback.test(p.slug) && !used.has(p.id))
    if (found) {
      picked.push(found.id)
      used.add(found.id)
    }
  }
  // Top up from remaining products if any slot missed (defensive, not expected)
  for (const p of products) {
    if (picked.length >= 4) break
    if (!used.has(p.id)) {
      picked.push(p.id)
      used.add(p.id)
    }
  }
  return picked
}

export default async function HomePage() {
  const products = await getProducts().catch(() => [])
  const bundleDefaults = pickBundleDefaults(products)

  const krutika = reviews.find((r) => r.id === 'review-006')
  const riya = reviews.find((r) => r.id === 'review-010')
  const gridReviews = ['review-002', 'review-009']
    .map((id) => reviews.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => r != null)

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Healing Soil',
    url: 'https://healingsoil.in',
    description:
      'Handmade soap from a farm in South Goa. SLS-free, glycerin retained. Made to order, shipped across India.',
    image: 'https://healingsoil.in/og-image.jpg',
    logo: 'https://healingsoil.in/logo.png',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Goa',
      addressCountry: 'IN',
    },
    areaServed: 'IN',
    priceRange: '₹₹',
    sameAs: [
      'https://instagram.com/healingsoil.in',
      'https://www.facebook.com/profile.php?id=61576352186521',
    ],
  }

  return (
    <div className="bg-[#F7F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* ── Section 1: Hero (Krutika) ──────────────────────────────────────── */}
      <section className="w-full bg-[#F7F5F0]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-16 sm:px-6 md:flex-row md:gap-16 md:py-24">
          <div className="flex-1 text-center md:text-left">
            <h1 className="mb-5 font-serif text-[clamp(34px,4.6vw,52px)] leading-tight text-[#1E5631]">
              The only soap her skin<br className="hidden md:block" /> didn&rsquo;t react to.
            </h1>
            <p className="mb-8 font-sans text-lg leading-relaxed text-[#666666]">
              Handmade soap from a Goa farm. Made to order. For skin that has stopped getting
              along with commercial soap.
            </p>

            {krutika && (
              <div className="mb-8 rounded-lg border-l-4 border-l-[#C9A84C] bg-[#FFF8E8] border border-[#E8DFC4] p-5 text-left">
                <p className="font-serif text-[17px] italic leading-relaxed text-[#1A1A14]">
                  &ldquo;{krutika.comment}.&rdquo;
                </p>
                <p className="mt-3 font-sans text-sm font-bold text-[#1E5631]">
                  {krutika.author}
                </p>
                <p className="font-sans text-xs text-[#666666]">
                  {krutika.occupation} · {krutika.location}
                </p>
              </div>
            )}

            <div className="flex flex-col items-center gap-3 md:items-start">
              <Link
                href="#bundle"
                className="rounded bg-[#1E5631] px-8 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
              >
                Try the starter bundle. Four soaps, ₹1,000.
              </Link>
              <p className="font-sans text-xs leading-relaxed text-[#666666]">
                Shipped in 4 days. Arrives in 3 to 7 days depending on your city. Free shipping included.
              </p>
            </div>
          </div>

          <div className="w-full max-w-[440px] flex-shrink-0 md:w-[44%]">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#1E5631]/10">
              <Image
                src="/hero-soap.jpg"
                alt="Healing Soil handmade soaps from a South Goa farm"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 44vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Bundle pick 4 ───────────────────────────────────────── */}
      <section id="bundle" className="w-full bg-white py-16 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 max-w-2xl">
            <h2 className="mb-3 font-serif text-4xl text-[#1E5631]">
              The starter bundle
            </h2>
            <p className="font-sans text-base leading-relaxed text-[#666666]">
              Four soaps so you can find the one your skin agrees with, without committing to a
              full bar of any single one.
            </p>
          </div>

          {products.length > 0 ? (
            <BundlePicker products={products} defaultIds={bundleDefaults} />
          ) : (
            <div className="rounded-lg border border-[#D6CFC4] bg-[#F7F5F0] p-8 text-center">
              <p className="font-sans text-sm text-[#999]">
                Bundle is loading. Please refresh in a moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Section 3: Mechanism ───────────────────────────────────────────── */}
      <section className="w-full bg-[#F7F5F0] py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 font-serif text-4xl leading-tight text-[#1E5631]">
            Why our soap doesn&rsquo;t lather the way you&rsquo;re used to
          </h2>
          <div className="space-y-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
            <p>
              Two things make our soap behave differently from commercial soap.
            </p>
            <p>
              The first is glycerin. Saponification produces glycerin naturally. Commercial soap
              removes it because glycerin sells for more on its own, in face creams and lotions.
              Ours stays in the bar.
            </p>
            <p>
              The second is what is missing. There is no SLS, the detergent that gives most
              commercial bars their thick foam. SLS is also one of the more common reasons
              sensitive skin reacts to soap.
            </p>
            <p>
              That is why our soap does not foam the way you are used to, and why someone who
              reacts to commercial soap may not react to ours.
            </p>
          </div>
          <div className="mt-8 rounded-lg border border-[#D6CFC4] bg-white p-5">
            <p className="font-sans text-sm leading-relaxed text-[#666666]">
              The glycerin and goat milk bases come from a manufacturer we have used since the
              start. The neem and tulsi are grown on our farm in Goa. We combine them, cure each
              batch, and ship after your order.
            </p>
          </div>
          <p className="mt-6 font-sans text-sm leading-relaxed text-[#666666]">
            Every bar is made to order. No two batches are identical, and we will not pretend they
            are. If the bar arrives damaged, we replace it.
          </p>
        </div>
      </section>

      {/* ── Section 4: Riya secondary proof ────────────────────────────────── */}
      {riya && (
        <section className="w-full bg-white py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <ReviewCard
              quote={riya.comment}
              name={riya.author}
              location={riya.location}
              occupation={riya.occupation}
              featured={true}
            />
          </div>
        </section>
      )}

      {/* ── Section 5b: Karyn video testimonial ─────────────────────────────── */}
      <section className="w-full bg-[#F7F5F0] py-16">
        <div className="mx-auto max-w-[360px] px-4 sm:px-6">
          <VideoTestimonial />
          <p className="mt-4 text-center font-sans text-sm text-[#999]">
            Karyn &mdash; on switching to handmade soap
          </p>
        </div>
      </section>

      {/* ── Section 6: Reviews grid ────────────────────────────────────────── */}
      {gridReviews.length > 0 && (
        <section className="w-full bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {gridReviews.map((r) => (
                <ReviewCard
                  key={r.id}
                  quote={r.comment}
                  name={r.author}
                  location={r.location}
                  occupation={r.occupation}
                  featured={false}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 7: Soft close ──────────────────────────────────────────── */}
      <section className="w-full bg-[#1E5631] py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="mb-5 font-serif text-[40px] leading-tight text-white">
            If you&rsquo;d like to try
          </h2>
          <p className="mb-8 font-sans text-base leading-[1.8] text-white/80">
            This is a starter bundle, not a subscription. Four soaps to find the one your skin
            agrees with. If it works, you will know within a week. If it does not, you have
            learnt something at ₹1,000 instead of finding out one bar at a time.
          </p>
          <Link
            href="#bundle"
            className="inline-block rounded bg-white px-8 py-3 font-sans text-sm font-medium text-[#1E5631] transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
          >
            Add the bundle to cart. ₹1,000.
          </Link>
          <p className="mt-4 font-sans text-xs text-white/70">
            Free shipping. Shipped in 4 days. Arrives in 3 to 7 days depending on your city.
          </p>
        </div>
      </section>
    </div>
  )
}
