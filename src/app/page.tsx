import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: { absolute: 'Healing Soil | Natural Chemical-Free Handmade Soaps from Goa' },
  description:
    'Natural handmade soaps from a South Goa farm. No SLS, no parabens. Glycerin & goat milk with real neem, tulsi & honey. Made to order, ships across India.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Healing Soil | Natural Chemical-Free Handmade Soaps from Goa',
    description:
      'Natural handmade soaps from a South Goa farm. No SLS, no parabens. Glycerin & goat milk with real neem, tulsi & honey. Made to order, ships across India.',
    url: '/',
    siteName: 'Healing Soil',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Healing Soil handmade soaps from Goa' }],
    type: 'website',
  },
}
import { featuredReviews, shortReviews } from '@/lib/reviews'
import { getAllPosts } from '@/lib/blog'
import ProductCard from '@/components/ProductCard'
import ReviewCard from '@/components/ReviewCard'
import BlogCard from '@/components/BlogCard'

export default async function HomePage() {
  // Graceful fallback if SoapLedger env vars are not yet configured
  const featuredProducts = await getFeaturedProducts().catch(() => [])
  const latestPosts = getAllPosts().slice(0, 3)

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Healing Soil',
    url: 'https://healingsoil.in',
    description: 'Handmade soaps from Goa, India. Small-batch, no chemicals, made to order.',
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
      {/* ── Section 1: Hero ─────────────────────────────────────────────────── */}
      <section className="w-full bg-[#F7F5F0]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-16 sm:px-6 md:flex-row md:gap-16 md:py-24">

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="mb-5 font-serif text-[clamp(38px,5vw,52px)] leading-tight text-[#1E5631]">
              Handmade soaps<br className="hidden md:block" /> from a Goa farm
            </h1>
            <p className="mb-8 font-sans text-lg leading-relaxed text-[#666666]">
              No chemicals. No shortcuts.<br className="hidden sm:block" />
              Made to order, just for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                href="/shop"
                className="rounded bg-[#1E5631] px-8 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
              >
                Shop the soaps
              </Link>
              <Link
                href="/our-story"
                className="rounded border border-[#1E5631] px-8 py-3 font-sans text-sm font-medium text-[#1E5631] transition-colors hover:bg-[#1E5631] hover:text-white"
              >
                Our story
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="w-full max-w-[440px] flex-shrink-0 md:w-[44%]">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#1E5631]/10">
              <Image
                src="/hero-soap.jpg"
                alt="Healing Soil handmade soaps"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 44vw"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── Section 3: Featured Products ────────────────────────────────────── */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-serif text-4xl text-[#1E5631]">Our most loved soaps</h2>
              <p className="mt-1 font-sans text-sm text-[#666666]">
                A small selection of what we make. View all in the shop.
              </p>
            </div>
            <Link
              href="/shop"
              className="mt-3 self-start font-sans text-sm font-medium text-[#1E5631] hover:text-[#C9A84C] transition-colors sm:mt-0 sm:self-auto"
            >
              View all soaps →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 2} />
              ))
            ) : (
              /* Fallback skeleton when API is unavailable */
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse rounded-lg border border-[#D6CFC4] bg-[#F7F5F0]"
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── Section 3: Founder + Farm ───────────────────────────────────────── */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">

          {/* Founder quote */}
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-14">
            <div className="flex-shrink-0">
              <div
                className="relative h-[280px] w-[280px] overflow-hidden rounded-full"
                style={{ border: '3px solid #C9A84C' }}
              >
                <Image
                  src="/founder.jpg"
                  alt="Deepanjali, founder of Healing Soil"
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="mb-4 font-serif text-4xl leading-snug text-[#1E5631]">
                Made by Deepanjali,<br className="hidden md:block" /> on a farm in Goa
              </h2>
              <p className="mb-6 font-sans text-base leading-[1.8] text-[#1A1A14]">
                I left a corporate career to grow food and live slowly. The soaps started as a
                personal project. I wanted something clean for my skin that I could also feel good
                about making. Three years later, every bar still leaves my hands before it leaves
                the farm. The soaps are just the beginning of what this land makes possible.
              </p>
              <Link
                href="/our-story"
                className="inline-block rounded border border-[#1E5631] px-6 py-2.5 font-sans text-sm font-medium text-[#1E5631] transition-colors hover:bg-[#1E5631] hover:text-white"
              >
                Read our full story
              </Link>
            </div>
          </div>

          {/* Farm photo strip */}
          <div className="mt-12">
            <p className="mb-5 text-center font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A84C]">
              Where your soap is made
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                <Image
                  src="/stories/farm-cashew-tree.jpg"
                  alt="Cashew tree on the Healing Soil farm, South Goa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 33vw, 25vw"
                  unoptimized
                />
              </div>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                <Image
                  src="/stories/farm-coconut-canopy.jpg"
                  alt="Coconut palms at golden hour on the farm"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 33vw, 25vw"
                  unoptimized
                />
              </div>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                <Image
                  src="/stories/farm-dog-resting.jpg"
                  alt="A dog resting on the farm path in South Goa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 33vw, 25vw"
                  unoptimized
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Section 6: Featured Reviews ──────────────────────────────────────── */}
      <section className="w-full bg-[#F7F5F0] py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mb-8 text-center font-serif text-4xl text-[#1E5631]">
            What our customers say
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {featuredReviews.map((r) => (
              <ReviewCard
                key={r.id}
                quote={r.comment}
                name={r.author}
                location={r.location}
                occupation={r.occupation}
                featured={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: Short Review Strip ───────────────────────────────────── */}
      <section className="w-full bg-[#1E5631]/5 py-10">
        <div className="mx-auto max-w-5xl overflow-x-auto px-4 sm:px-6">
          <div className="flex min-w-max items-center justify-center gap-0 md:min-w-0 md:flex-wrap">
            {shortReviews.slice(0, 3).map((r, i) => (
              <div key={r.id} className="flex items-center">
                <p className="px-6 text-center font-serif text-lg italic text-[#1A1A14]">
                  "{r.comment}"
                </p>
                {i < 2 && (
                  <span className="select-none text-2xl font-bold text-[#C9A84C]" aria-hidden="true">
                    ·
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Blog Posts ───────────────────────────────────────────────── */}
      {latestPosts.length > 0 && (
        <section className="w-full bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-serif text-4xl text-[#1E5631]">From the farm</h2>
              <Link
                href="/blog"
                className="font-sans text-sm font-medium text-[#1E5631] hover:text-[#C9A84C] transition-colors"
              >
                Read all posts →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} dir="blog" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── How It Works ─────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#F7F5F0] py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mb-2 text-center font-serif text-4xl text-[#1E5631]">
            How ordering works
          </h2>
          <p className="mb-10 text-center font-sans text-sm text-[#666666]">
            No login, no checkout maze. Just pick, message, and receive.
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                n: '1',
                icon: <BrowseIcon />,
                title: 'Browse and choose',
                body: 'Pick the soaps you want from our collection. Every bar lists its ingredients.',
              },
              {
                n: '2',
                icon: <WhatsAppStepIcon />,
                title: 'Order on WhatsApp',
                body: 'We confirm availability and send you a payment link. No payment upfront.',
              },
              {
                n: '3',
                icon: <ShipIcon />,
                title: 'Made fresh and shipped',
                body: 'Your soap is made after payment and dispatched within a few days.',
              },
            ].map((step) => (
              <div key={step.n} className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#C9A84C] text-[#1E5631]">
                  {step.icon}
                </div>
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#C9A84C]">
                  Step {step.n}
                </span>
                <h3 className="font-serif text-xl text-[#1A1A14]">{step.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-[#666666]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#1E5631] py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="mb-3 font-serif text-[40px] leading-tight text-white">
            Ready to try something different?
          </h2>
          <p className="mb-8 font-sans text-base text-white/75">
            Handmade. No chemicals. Ships across India.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="rounded bg-white px-8 py-3 font-sans text-sm font-medium text-[#1E5631] transition-colors hover:bg-[#F7F5F0]"
            >
              Shop our soaps
            </Link>
            <a
              href="https://wa.me/917483100651"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-[#C9A84C] px-8 py-3 font-sans text-sm font-medium text-[#1A1A14] transition-colors hover:bg-[#b8943e]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

// ── Step icons ────────────────────────────────────────────────────────────────

function BrowseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function WhatsAppStepIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function ShipIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 5v3h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}
