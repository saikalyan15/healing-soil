import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getProducts, getFeaturedProducts } from '@/lib/products'
import { getAllPosts } from '@/lib/blog'
import { reviews } from '@/lib/reviews'
import ReviewCard from '@/components/ReviewCard'
import BundlePicker from '@/components/BundlePicker'
import VideoTestimonial from '@/components/VideoTestimonial'
import TrustStrip from '@/components/TrustStrip'
import ProductCard from '@/components/ProductCard'
import BlogCard from '@/components/BlogCard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: 'Healing Soil | Handmade Soap for Skin That Reacts to Commercial Soap' },
  description:
    'Handmade soap from a Goa farm. SLS-free, glycerin retained. A starter bundle of 4 soaps for ₹1,000 for skin that has stopped getting along with commercial soap.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Healing Soil | Handmade Soap for Skin That Reacts to Commercial Soap',
    description:
      'Handmade soap from a farm in South Goa. SLS-free, glycerin retained. A starter bundle of 4 soaps for ₹1,000.',
    url: '/',
    siteName: 'Healing Soil',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Healing Soil handmade soaps from Goa' }],
    type: 'website',
  },
}

// Exact slugs for the starter bundle (Stage 2 offer in docs/growth-strategy.md).
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
  const [products, featuredProducts] = await Promise.all([
    getProducts().catch(() => []),
    getFeaturedProducts().catch(() => []),
  ])
  
  const allPosts = getAllPosts()
  const recentPosts = allPosts.slice(0, 3)
  
  const bundleDefaults = pickBundleDefaults(products)

  const krutika = reviews.find((r) => r.id === 'review-006')
  const riya = reviews.find((r) => r.id === 'review-010')
  const gridReviews = ['review-002', 'review-001']
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
      "@type": "PostalAddress",
      "addressRegion": "Goa",
      "addressCountry": "IN"
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

      {/* ── Section 1: Hero (Krutika Review + Farm Context) ────────────────── */}
      <section className="w-full overflow-hidden bg-[#F7F5F0]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-12 sm:px-6 md:flex-row md:gap-16 md:py-24">
          <div className="z-10 flex-1 text-center md:text-left">
            <h1 className="mb-5 font-serif text-[clamp(34px,4.6vw,52px)] font-normal leading-[1.1] text-[#1E5631]">
              The soap her skin<br className="hidden md:block" /> didn&rsquo;t react to.
            </h1>
            <p className="mb-8 font-sans text-base leading-relaxed text-[#666] md:text-lg">
              If your skin reacts to most soaps, this is what we make in small batches on our farm in South Goa.
            </p>

            {krutika && (
              <div className="mb-8 rounded-lg border border-[#E8DFC4] bg-[#FFF8E8] p-5 text-left shadow-sm md:max-w-md">
                <p className="font-serif text-[17px] italic leading-relaxed text-[#1A1A14]">
                  &ldquo;{krutika.comment}.&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-0.5 w-6 bg-[#C9A84C]"></div>
                  <div>
                    <p className="font-sans text-sm font-bold text-[#1E5631]">
                      {krutika.author}
                    </p>
                    <p className="font-sans text-[11px] uppercase tracking-wider text-[#666666]">
                      {krutika.occupation} · {krutika.location}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center gap-4 md:items-start">
              <Link
                href="#bundle"
                className="w-full rounded bg-[#1E5631] px-10 py-4 text-center font-sans text-sm font-bold text-white transition-all hover:bg-[#153d22] active:scale-[0.98] sm:w-auto md:px-12 md:py-5 md:text-base"
              >
                Try the starter bundle (₹1,000)
              </Link>
              <p className="font-sans text-xs font-medium leading-relaxed text-[#666666]">
                Free shipping. Shipped in 4 days from Goa.
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-[520px] flex-shrink-0 md:w-[48%]">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#1E5631]/5 shadow-2xl">
              <Image
                src="/hero-soap.jpg"
                alt="Healing Soil handmade soaps from a South Goa farm"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 48vw"
              />
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* ── Section 2: Bundle (Primary Offer) ────────────────────────────── */}
      <section id="bundle" className="w-full bg-white py-16 scroll-mt-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 font-serif text-3xl text-[#1E5631] md:text-5xl">
              The Starter Bundle
            </h2>
            <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-[#666666] md:text-lg">
              Not sure which one to pick? Get four different soaps to find the one your skin agrees with, without committing to a full bar of any single one.
            </p>
          </div>

          {products.length > 0 ? (
            <BundlePicker products={products} defaultIds={bundleDefaults} />
          ) : (
            <div className="rounded-lg border border-[#D6CFC4] bg-[#F7F5F0] p-12 text-center">
              <p className="font-sans text-sm text-[#999]">
                Fetching the harvest. Please refresh in a moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Section 3: Featured Products (Shop Context) ──────────────────── */}
      <section className="w-full bg-[#F7F5F0] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex flex-col items-center justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <div className="text-center md:text-left">
              <h2 className="mb-3 font-serif text-3xl text-[#1E5631] md:text-4xl">
                Most Loved by Our Community
              </h2>
              <p className="font-sans text-base text-[#666666]">
                Our best-sellers, made in small batches with farm-grown ingredients.
              </p>
            </div>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 font-sans text-sm font-bold text-[#1E5631]"
            >
              <span className="underline decoration-[#C9A84C] decoration-2 underline-offset-4 group-hover:text-[#C9A84C]">View the Full Shop</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Visual Mechanism (The "Why") ──────────────────────── */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[#F7F5F0] shadow-inner lg:aspect-square">
              <Image
                src="/stories/farm-coconut-canopy.jpg"
                alt="Our farm canopy in South Goa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-8 lg:pl-8">
              <h2 className="font-serif text-3xl leading-tight text-[#1E5631] md:text-4xl lg:text-5xl">
                Made differently, for skin that reacts.
              </h2>
              
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E5631]/10 font-serif text-[#1E5631]">1</div>
                  <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#C9A84C]">No SLS or Parabens</h3>
                  <p className="font-sans text-sm leading-relaxed text-[#666666]">
                    Commercial soaps use chemical foaming agents that strip natural oils. We don&rsquo;t.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E5631]/10 font-serif text-[#1E5631]">2</div>
                  <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#C9A84C]">Glycerin Retained</h3>
                  <p className="font-sans text-sm leading-relaxed text-[#666666]">
                    Glycerin is a natural byproduct of soap making. Commercial makers remove it; we keep it in.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E5631]/10 font-serif text-[#1E5631]">3</div>
                  <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#C9A84C]">Farm Grown Botanicals</h3>
                  <p className="font-sans text-sm leading-relaxed text-[#666666]">
                    Neem, Tulsi, and Lemongrass are grown on our farm in South Goa, harvested fresh for each batch.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E5631]/10 font-serif text-[#1E5631]">4</div>
                  <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#C9A84C]">Made to Order</h3>
                  <p className="font-sans text-sm leading-relaxed text-[#666666]">
                    We don&rsquo;t warehouse thousands of bars. Every batch is hand-poured when you order.
                  </p>
                </div>
              </div>
              
              <div className="pt-6">
                <Link
                  href="/our-story"
                  className="w-full rounded border-2 border-[#1E5631] px-8 py-4 text-center font-sans text-sm font-bold text-[#1E5631] transition-all hover:bg-[#1E5631] hover:text-white sm:w-auto"
                >
                  Read Our Full Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Community Proof (Riya) ─────────────────────────────── */}
      {riya && (
        <section className="w-full bg-[#F7F5F0] py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="relative rounded-3xl bg-white p-8 shadow-sm md:p-12 lg:p-16">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-[#C9A84C] px-6 py-2 font-sans text-xs font-bold uppercase tracking-widest text-white shadow-md">
                Verified Experience
              </div>
              <ReviewCard
                quote={riya.comment}
                name={riya.author}
                location={riya.location}
                occupation={riya.occupation}
                featured={true}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Section 6: Video & More Reviews ──────────────────────────────── */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 font-serif text-3xl text-[#1E5631] md:text-5xl">What Others Are Saying</h2>
            <p className="font-sans text-[#666666]">Real stories from people who switched from commercial soap.</p>
          </div>
          
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="mx-auto w-full max-w-[360px] flex-shrink-0">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <VideoTestimonial />
              </div>
              <p className="mt-4 text-center font-sans text-sm italic text-[#999]">
                Karyn &mdash; on switching to handmade soap
              </p>
            </div>
            
            <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
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
        </div>
      </section>

      {/* ── Section 7: Articles Strip (Latest from the Farm) ──────────────── */}
      {recentPosts.length > 0 && (
        <section className="w-full bg-[#F7F5F0] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-12 flex flex-col items-center justify-between gap-6 md:mb-16 md:flex-row md:items-end">
              <div className="text-center md:text-left">
                <h2 className="mb-3 font-serif text-3xl text-[#1E5631] md:text-4xl">
                  Latest from the Farm
                </h2>
                <p className="font-sans text-base text-[#666666]">
                  Lessons in slow living, soap making, and regenerating the soil.
                </p>
              </div>
              <Link
                href="/our-stories"
                className="font-sans text-sm font-bold text-[#1E5631] underline decoration-[#C9A84C] decoration-2 underline-offset-4 hover:text-[#C9A84C]"
              >
                Read All Stories
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} dir={post.source || 'blog'} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 8: Soft Close (High Intensity CTA) ────────────────────── */}
      <section className="w-full bg-[#1E5631] py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-6 font-serif text-[clamp(32px,6vw,56px)] font-normal leading-tight text-white">
            Ready to find your soap?
          </h2>
          <p className="mb-12 font-sans text-lg leading-relaxed text-white/80 md:text-xl">
            Start with the trial bundle. Four soaps, one week, and you&rsquo;ll know if your skin has finally found what it needs.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#bundle"
              className="w-full rounded bg-white px-10 py-5 font-sans text-sm font-bold text-[#1E5631] shadow-xl transition-all hover:bg-[#F7F5F0] active:scale-[0.98] sm:w-auto md:px-12 md:text-base"
            >
              Get the Bundle (₹1,000)
            </Link>
            <Link
              href="/shop"
              className="w-full rounded border-2 border-white/30 px-10 py-5 font-sans text-sm font-bold text-white transition-all hover:bg-white/10 sm:w-auto md:px-12 md:text-base"
            >
              Browse All Soaps
            </Link>
          </div>
          <p className="mt-8 font-sans text-xs font-medium uppercase tracking-[0.2em] text-white/50">
            Free shipping across India · Made in South Goa
          </p>
        </div>
      </section>
    </div>
  )
}
