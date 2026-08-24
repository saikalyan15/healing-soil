import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getProducts, getFeaturedProducts, type Product } from '@/lib/products'
import { canonicalSlugFor } from '@/lib/product-slugs'
import { getAllPosts } from '@/lib/blog'
import { SITE_URL } from '@/lib/seo'
import { reviews } from '@/lib/reviews'
import ReviewCard from '@/components/ReviewCard'
import BundlePicker from '@/components/BundlePicker'
import VideoTestimonial from '@/components/VideoTestimonial'
import ProductCard from '@/components/ProductCard'
import BlogCard from '@/components/BlogCard'

// Statically rendered and served from the Full Route Cache. Product data comes
// from getProducts(), which is tagged 'products', so this page is rebuilt when
// SoapLedger POSTs revalidateTag('products') to /api/revalidate, and otherwise
// falls back to the 24h data-cache TTL. It was previously force-dynamic, which
// ran a Vercel Function on every single request including crawler traffic.

export const metadata: Metadata = {
  // absolute, so buildTitle does not apply — keep this within the 60 char budget
  // by hand. Currently 57.
  title: { absolute: 'Handmade Natural Soap for the Whole Family | Healing Soil' },
  description:
    'Handmade soap for the whole family, made in small batches on our farm in South Goa. SLS-free and paraben-free. Starter bundle of four soaps for ₹1,000.',
  // Absolute, not '/': relative canonicals resolve against metadataBase with a
  // trailing slash, which disagreed with the no-trailing-slash canonical Google
  // had already chosen for the homepage (GSC canonical mismatch, Aug 2026).
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Handmade Natural Soap for the Whole Family | Healing Soil',
    description:
      'Handmade in small batches on our farm in South Goa, with botanicals we grow ourselves. No SLS, no parabens, no synthetic fragrance.',
    url: SITE_URL,
    siteName: 'Healing Soil',
    images: [{ url: '/og-image.jpg', width: 1200, height: 1200, alt: 'Healing Soil handmade soaps from Goa' }],
    type: 'website',
  },
}

// Exact slugs for the starter bundle (Stage 2 offer in docs/growth-strategy.md).
const BUNDLE_DEFINITIONS: { slug: string; fallback: RegExp }[] = [
  { slug: 'honey-oats-glycerin-soap', fallback: /honey.*oat.*glycerin/i },
  { slug: 'neem-tulsi-goat-milk-soap', fallback: /neem.*tulsi.*goat/i },
  { slug: 'pomegranate-goat-milk-soap', fallback: /pomegranate.*goat/i },
  { slug: 'travel-soaps', fallback: /travel/i },
]

function pickBundleDefaults(products: Product[]): string[] {
  const used = new Set<string>()
  const picked: string[] = []
  const take = (p: Product) => {
    picked.push(p.id)
    used.add(p.id)
  }

  // Pass 1: claim the bundle soaps that are actually available, so a sold-out slot
  // cannot steal a bar that a later slot matches by name.
  const slots = BUNDLE_DEFINITIONS.map((def) => {
    const matches = products.filter(
      (p) => !used.has(p.id) && (p.slug === def.slug || def.fallback.test(p.slug)),
    )
    const inStock =
      matches.find((p) => p.slug === def.slug && p.in_stock) ?? matches.find((p) => p.in_stock)
    if (inStock) used.add(inStock.id)
    return { inStock, soldOut: matches.find((p) => p.slug === def.slug) ?? matches[0] }
  })

  // Pass 2: where the soap we wanted is sold out, stand in the closest bar that is
  // available — same base first, so goat milk stays goat milk.
  for (const { inStock, soldOut } of slots) {
    if (inStock) {
      picked.push(inStock.id)
      continue
    }
    const substitute =
      (soldOut && products.find((p) => p.in_stock && !used.has(p.id) && p.base === soldOut.base)) ??
      products.find((p) => p.in_stock && !used.has(p.id))
    if (substitute) take(substitute)
  }

  // Top the bundle up to four slots, available bars first.
  for (const p of products) {
    if (picked.length >= 4) break
    if (!used.has(p.id) && p.in_stock) take(p)
  }
  // Only if the shop cannot field four available bars do we fall back to sold-out
  // ones, so the section still renders rather than collapsing.
  for (const p of products) {
    if (picked.length >= 4) break
    if (!used.has(p.id)) take(p)
  }

  return picked
}

export default async function HomePage() {
  // Deliberately not caught. Under force-dynamic a swallowed failure only blanked
  // one request; now that this page is statically cached, returning [] here would
  // bake an empty storefront into the Full Route Cache until the next revalidation.
  // Letting it throw means a failed background revalidation keeps serving the last
  // good page instead, which is the graceful outcome.
  const [products, featuredProducts] = await Promise.all([
    getProducts(),
    getFeaturedProducts(),
  ])
  
  const allPosts = getAllPosts()
  const recentPosts = allPosts.slice(0, 3)
  
  const bundleDefaults = pickBundleDefaults(products)

  // The designated hero bar. An editorial choice, not a sales one, so it is
  // deliberately not sourced from getFeaturedProducts(). Falls back to hiding
  // the section rather than showing a sold-out or missing product.
  //
  // Matched on the canonical slug: SoapLedger returns legacy forms for several
  // products, and this one was renamed when its base changed.
  const heroProduct = products.find(
    (p) => canonicalSlugFor(p.slug) === 'kesar-haldi-papaya-cucumber-soap' && p.in_stock,
  )

  // Named by role rather than by customer, so re-picking a review later does not
  // leave a variable called after someone who is no longer quoted.
  //
  // Short enough for the hero quote card. Gentle, no health claim.
  const heroReview = reviews.find((r) => r.id === 'review-010')

  // Long-form, and the only quote carrying both halves of the positioning:
  // quality and gentleness, plus plastic and waste. Belongs in the wide block.
  const featuredReview = reviews.find((r) => r.id === 'review-001')

  // Sonia covers water use, Shubhada mildness, Sunil switching from a
  // mainstream brand. Spread across two states and both genders, which the
  // family positioning needs.
  const gridReviews = ['review-009', 'review-007', 'review-011']
    .map((id) => reviews.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => r != null)

  const faqItems = [
    {
      q: 'What is Healing Soil handmade soap made from?',
      a: 'Healing Soil handmade soap bars are made from glycerine, goat milk, or shea butter bases, hand-poured with farm-grown botanicals like neem and tulsi. Every bar is SLS-free, paraben-free, and free of synthetic fragrance.',
    },
    {
      q: 'Is Healing Soil cold-process or melt-and-pour soap?',
      a: 'Healing Soil is melt-and-pour, not cold-process. We melt pre-made, already-saponified soap bases and hand-pour them with botanicals in small batches, rather than mixing raw oils and lye from scratch.',
    },
    {
      q: 'How long does shipping take?',
      a: 'Orders dispatch within about 2 days from our farm in South Goa. Transit typically takes another 3 to 7 days depending on your city. Shipping is free on orders of ₹1,000 and above; below that it is ₹100, or ₹150 for North India.',
    },
    {
      q: 'Is Healing Soil soap suitable for sensitive skin?',
      a: 'Healing Soil soap is a gentle option suitable for sensitive skin. Every bar contains no SLS, no synthetic fragrance, and no parabens. Patch test any new personal-care product before regular use.',
    },
    {
      q: 'Where is Healing Soil soap made?',
      a: 'Every bar is made on our farm in South Goa, India, hand-poured to order in small batches.',
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

  return (
    <div className="bg-[#F7F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Section 1: Hero review + farm context ─────────────────────────── */}
      <section className="w-full overflow-hidden bg-[#F7F5F0]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-12 sm:px-6 md:flex-row md:gap-16 md:py-24">
          <div className="z-10 flex-1 text-center md:text-left">
            <p className="mb-5 font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
              Handcrafted in South Goa
            </p>
            <h1 className="mb-6 font-serif text-[clamp(36px,5vw,58px)] font-normal leading-[1.08] tracking-[-0.01em] text-[#1E5631]">
              One bar your whole{' '}<br className="hidden md:block" />family can use.
            </h1>
            <p className="mb-8 max-w-lg font-sans text-base leading-[1.75] text-[#666] md:text-lg">
              Handmade in small batches on our farm in South Goa, with botanicals we grow
              ourselves. No SLS, no parabens, no synthetic fragrance.
            </p>

            {heroReview && (
              <div className="mb-8 rounded-lg border border-[#E8DFC4] bg-[#FFF8E8] p-5 text-left shadow-sm md:max-w-md">
                <p className="font-serif text-[17px] italic leading-relaxed text-[#1A1A14]">
                  {/* Some reviews end in a full stop and some do not, so add one
                      only when it is missing rather than hardcoding it. */}
                  &ldquo;{heroReview.comment.replace(/[.!?]?$/, (m) => m || '.')}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-0.5 w-6 bg-[#C9A84C]"></div>
                  <div>
                    <p className="font-sans text-sm font-bold text-[#1E5631]">
                      {heroReview.author}
                    </p>
                    <p className="font-sans text-[11px] uppercase tracking-wider text-[#666666]">
                      {heroReview.occupation} · {heroReview.location}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center gap-4 md:items-start">
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#bundle"
                  className="w-full rounded bg-[#1E5631] px-10 py-4 text-center font-sans text-sm font-bold text-white transition-all hover:bg-[#153d22] active:scale-[0.98] sm:w-auto md:px-12 md:py-5 md:text-base"
                >
                  Try the starter bundle (₹1,000)
                </Link>
                <Link
                  href="/shop"
                  className="w-full rounded border-2 border-[#1E5631] px-8 py-4 text-center font-sans text-sm font-bold text-[#1E5631] transition-all hover:bg-[#1E5631] hover:text-white active:scale-[0.98] sm:w-auto md:px-10 md:py-5 md:text-base"
                >
                  Browse individual soaps
                </Link>
              </div>
              <p className="font-sans text-xs font-medium leading-relaxed text-[#666666]">
                Free shipping over ₹1,000 · Ships in 2 days from Goa · Individual soaps from ₹250
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-[520px] flex-shrink-0 md:w-[48%]">
            {/* No offset frame here. An earlier version had a gold border set
                12px behind the image, but against the soft shadow it read as a
                misalignment rather than a deliberate detail. The shadow alone
                carries the depth. */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#1E5631]/5 shadow-[0_24px_60px_-20px_rgba(30,86,49,0.35)]">
              <Image
                src="/products/kesar-haldi-goatmilk.webp"
                alt="Kesar Haldi soap with saffron and turmeric, handmade in South Goa"
                fill
                className="hero-settle object-cover brightness-[1.04] saturate-[0.92] contrast-[0.97]"
                priority
                sizes="(max-width: 768px) 100vw, 48vw"
              />
            </div>
          </div>
        </div>
      </section>

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

      {/* ── Section 2.5: Hero product ─────────────────────────────────────
          A deliberate editorial pick, kept separate from "Most Loved" below,
          which is ranked by units actually sold. Two different promises, so
          they must not be merged: this one makes no volume claim. */}
      {heroProduct && (
        <section className="w-full bg-[#1E5631] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white/5">
                <Image
                  src={heroProduct.image_url || '/products/coming-soon.webp'}
                  alt={heroProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="text-center lg:text-left">
                <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
                  Our hero bar
                </p>
                <h2 className="mb-5 font-serif text-3xl leading-tight text-white md:text-5xl">
                  Kesar Haldi
                </h2>
                <p className="mb-8 max-w-md font-sans text-base leading-[1.75] text-white/75 md:text-lg">
                  Saffron and turmeric, two ingredients long used in Indian personal care.
                  A warm golden bar with a soft, creamy lather, made to order in small batches.
                </p>

                <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
                  {['Kesar and haldi', '100g', 'Made to order'].map((t) => (
                    <span key={t} className="font-sans text-xs uppercase tracking-[0.16em] text-white/50">
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/shop/${heroProduct.slug}`}
                  className="inline-block rounded bg-[#C9A84C] px-10 py-4 font-sans text-sm font-bold text-[#1A1A14] transition-all hover:bg-white active:scale-[0.98] md:px-12 md:py-5"
                >
                  See the bar
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

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
                src="/images/farm-coconut-canopy.webp"
                alt="Our farm canopy in South Goa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-8 lg:pl-8">
              <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
                Why it is different
              </p>
              <h2 className="font-serif text-3xl leading-tight text-[#1E5631] md:text-4xl lg:text-5xl">
                Five things we do that most soap does not.
              </h2>

              {/* Hairline-separated list rather than a card grid. Reads as
                  editorial rather than as a feature table. */}
              <div className="divide-y divide-[#D6CFC4]">
                {[
                  {
                    t: 'No SLS or parabens',
                    d: 'Our bars contain no SLS, parabens, or synthetic fragrance.',
                  },
                  {
                    t: 'Glycerin retained',
                    d: 'Glycerin is a natural byproduct of soap making. Commercial makers extract and sell it separately. We leave it in the bar.',
                  },
                  {
                    t: 'Botanicals from our farm',
                    d: 'Neem, tulsi and lemongrass are grown in South Goa and harvested fresh for each batch. The bases are sourced, and we would rather say so.',
                  },
                  {
                    t: 'Made to order',
                    d: 'We do not warehouse thousands of bars. Every batch is hand-poured after you order.',
                  },
                  {
                    t: 'Lighter on the earth',
                    d: 'Small batches, paper wrapping, no plastic. Peels and offcuts go back to the soil they came from.',
                  },
                ].map((item, i) => (
                  <div key={item.t} className="flex gap-5 py-5 first:pt-0">
                    <span className="mt-1 font-serif text-lg leading-none text-[#C9A84C]/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="mb-1.5 font-sans text-sm font-semibold tracking-wide text-[#1A1A14]">
                        {item.t}
                      </h3>
                      <p className="font-sans text-sm leading-[1.7] text-[#666666]">{item.d}</p>
                    </div>
                  </div>
                ))}
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
      {featuredReview && (
        <section className="w-full bg-[#F7F5F0] py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="relative rounded-3xl bg-white p-8 shadow-sm md:p-12 lg:p-16">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-[#C9A84C] px-6 py-2 font-sans text-xs font-bold uppercase tracking-widest text-white shadow-md">
                Verified Experience
              </div>
              <ReviewCard
                quote={featuredReview.comment}
                name={featuredReview.author}
                location={featuredReview.location}
                occupation={featuredReview.occupation}
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
                href="/blog"
                className="font-sans text-sm font-bold text-[#1E5631] underline decoration-[#C9A84C] decoration-2 underline-offset-4 hover:text-[#C9A84C]"
              >
                Read All Stories
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 7.5: FAQ ──────────────────────────────────────────────── */}
      <section className="w-full bg-[#F7F5F0] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 font-serif text-3xl text-[#1E5631] md:text-4xl">
            Common questions
          </h2>
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
      </section>

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
            Free shipping over ₹1,000 · Made in South Goa
          </p>
        </div>
      </section>
    </div>
  )
}
