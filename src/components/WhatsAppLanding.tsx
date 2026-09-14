import Image from 'next/image'
import Link from 'next/link'
import WhatsAppCTA, { WhatsAppIcon } from './WhatsAppCTA'
import VideoTestimonial from './VideoTestimonial'
import BlogCard from './BlogCard'
import { WA_DEFAULT_MESSAGE, WHATSAPP_DISPLAY } from '@/lib/whatsapp'
import { reviews } from '@/lib/reviews'
import { getAllPosts } from '@/lib/blog'

// The homepage in 'content-only' site mode: a single page about Healing Soil and
// handmade soap, with WhatsApp as the way to get in touch. Copy follows
// CLAUDE.md: no em-dashes, soft close, no urgency, no superlatives, no
// therapeutic claims, the maker is not named.
//
// The soap gallery below shows what we make. It carries no price, no cart and no
// checkout, by design: this mode removes the transaction, not the product
// photography. The order is placed in the WhatsApp conversation either way.
//
// Deliberately no getProducts() call. Content-only mode does no SoapLedger work,
// which keeps this page a pure static render with no catalogue dependency and no
// compliance-throw risk. The list below is an editorial selection of eight bars,
// not a mirror of the catalogue, so it does not drift the way a mirror would.

type GalleryBar = {
  /** Canonical slug. Not linked anywhere in this mode, but it is what
   *  validate:products checks, so a bar renamed in SoapLedger fails the build
   *  rather than sitting here mislabelled. */
  slug: string
  name: string
  base: string
  note: string
  image: string
}

// Names, bases and notes are transcribed from the live SoapLedger records for
// these eight products, not written from the file names. An earlier draft of
// this list guessed the base from the image file name and labelled the Kesar
// Haldi bar goat milk when SoapLedger has it on a papaya cucumber base.
const gallery: GalleryBar[] = [
  {
    slug: 'neem-tulsi-goat-milk-soap',
    name: 'Neem Tulsi',
    base: 'Goat milk',
    note: 'Sun-dried neem and tulsi in a creamy goat milk base. A gentle herbal scent.',
    image: '/products/neem-tulsi-goatmilk.webp',
  },
  {
    slug: 'kesar-haldi-papaya-cucumber-soap',
    name: 'Kesar Haldi',
    base: 'Papaya cucumber',
    note: 'Saffron and turmeric, two ingredients long used in Indian personal care.',
    image: '/products/kesar-haldi-goatmilk.webp',
  },
  {
    slug: 'honey-oats-glycerin-soap',
    name: 'Honey Oats',
    base: 'Glycerine',
    note: 'Real honey and oat flakes. Warm and lightly sweet, with a light lather.',
    image: '/products/honey-oats-glycerin.webp',
  },
  {
    slug: 'ginger-rosemary-glycerin-soap',
    name: 'Ginger Rosemary',
    base: 'Glycerine',
    note: 'Ginger and rosemary. A warm herbal scent and a clean-rinsing feel.',
    image: '/products/ginger-rosemary-glycerin.webp',
  },
  {
    slug: 'shea-butter-kesar-gulab',
    name: 'Kesar Gulab',
    base: 'Shea butter',
    note: 'Saffron and rose. A slow, creamy lather and a warm floral scent.',
    image: '/products/kesar-gulab-sheabutter.webp',
  },
  {
    slug: 'marigold-soap',
    name: 'Marigold',
    base: 'Glycerine',
    note: 'Marigold oil and petals, from marigolds grown on the farm. Mild and sweet.',
    image: '/products/marigold-glycerine.webp',
  },
  {
    slug: 'orange-glycerin-soap',
    name: 'Orange',
    base: 'Glycerine',
    note: 'Sun-dried orange peel, ground. A fresh citrus scent and a light lather.',
    image: '/products/orange-glycerine.webp',
  },
  {
    slug: 'pomegranate-goat-milk-soap',
    name: 'Pomegranate',
    base: 'Goat milk',
    note: 'Sun-dried pomegranate peel in a goat milk base. A deep natural colour.',
    image: '/products/pomegranate-goatmilk.webp',
  },
]

// Botanicals we grow, shown as texture rather than as a claim about any of them.
const ingredients = [
  { name: 'Neem', image: '/images/ingredients/ingredient-neem.webp' },
  { name: 'Tulsi', image: '/images/ingredients/ingredient-tulsi.webp' },
  { name: 'Haldi', image: '/images/ingredients/ingredient-haldi.webp' },
  { name: 'Oats', image: '/images/ingredients/ingredient-oats.webp' },
  { name: 'Pomegranate', image: '/images/ingredients/ingredient-pomegranate.webp' },
]

const process = [
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
]

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
    q: 'Is Healing Soil soap suitable for sensitive skin?',
    a: 'Healing Soil soap is a gentle option suitable for sensitive skin. Every bar contains no SLS, no synthetic fragrance, and no parabens. Patch test any new personal-care product before regular use.',
  },
  {
    q: 'How do I order?',
    a: 'Send us a message on WhatsApp and we will take it from there. Tell us which bars you are interested in and where you are, and we will confirm what is available and how it ships.',
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

export default function WhatsAppLanding() {
  // Anchor quote: the only one carrying both halves of the positioning, quality
  // and gentleness plus plastic and waste. The two short quotes are chosen for
  // spread across cities. All three are already vetted copy on the full homepage.
  const anchorReview = reviews.find((r) => r.id === 'review-001')
  const shortQuotes = ['review-010', 'review-012']
    .map((id) => reviews.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => r != null)

  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <div className="bg-[#F7F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24">
        <Image
          src="/logo.png"
          alt="Healing Soil"
          width={200}
          height={80}
          priority
          className="mx-auto object-contain"
          style={{ height: '84px', width: 'auto' }}
        />

        <p className="mt-10 font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
          Handmade in South Goa
        </p>
        <h1 className="mt-5 font-serif text-[clamp(34px,5.5vw,56px)] font-normal leading-[1.08] tracking-[-0.01em] text-[#1E5631]">
          Handmade soap, made to order
        </h1>

        {/* Gold hairline. A quieter divider than a rule across the column. */}
        <div className="mx-auto mt-8 h-px w-16 bg-[#C9A84C]" />

        <p className="mx-auto mt-8 max-w-xl font-sans text-base leading-[1.85] text-[#666666] md:text-lg">
          Small batches, hand-poured on our farm in South Goa. Botanicals like neem and tulsi
          are grown on the farm; the glycerine, goat milk, and shea butter bases are sourced.
          No SLS, no parabens, no synthetic fragrance.
        </p>

        <div className="mt-11">
          <WhatsAppCTA
            source="landing_primary"
            message={WA_DEFAULT_MESSAGE}
            className="inline-flex items-center justify-center gap-2.5 rounded bg-[#1E5631] px-10 py-4 font-sans text-sm font-bold text-white shadow-[0_12px_30px_-12px_rgba(30,86,49,0.55)] transition-all hover:bg-[#153d22] active:scale-[0.98] md:px-12 md:py-5 md:text-base"
          >
            <WhatsAppIcon />
            Start a conversation
          </WhatsAppCTA>
          <p className="mt-4 font-sans text-xs leading-relaxed text-[#999999]">
            We are taking orders and answering questions on WhatsApp for now. {WHATSAPP_DISPLAY}
          </p>
        </div>
      </section>

      {/* ── Farm band ──────────────────────────────────────────────────────
          Full bleed and cinematic, so the page has a visual anchor before it
          asks anything of the reader. */}
      <section className="w-full">
        <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/7] lg:aspect-[16/6]">
          <Image
            src="/images/farm-coconut-canopy.webp"
            alt="The canopy of our farm in South Goa"
            fill
            priority
            className="hero-settle object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E1A]/55 via-transparent to-transparent" />
          <p className="absolute inset-x-0 bottom-0 px-6 pb-6 text-center font-sans text-[11px] uppercase tracking-[0.28em] text-white/80 sm:pb-8">
            Our farm, South Goa
          </p>
        </div>
      </section>

      {/* ── The soaps ──────────────────────────────────────────────────────
          No price and no buy button anywhere in this section, by design. */}
      <section className="w-full bg-[#F7F5F0] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
              What we make
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-[#1E5631] md:text-[42px]">
              The bars, and what goes in them
            </h2>
            <p className="mt-5 font-sans text-base leading-[1.8] text-[#666666]">
              Most bars start from one of three bases. Glycerine is the lightest, goat milk is
              creamier, shea butter is the richest. Every bar is poured after you order.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-14 lg:grid-cols-4">
            {gallery.map((bar) => (
              <figure key={bar.name} className="group">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#1E5631]/5 shadow-[0_14px_36px_-18px_rgba(30,86,49,0.4)]">
                  <Image
                    src={bar.image}
                    alt={`${bar.name} handmade soap, ${bar.base.toLowerCase()} base`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <figcaption className="mt-5">
                  <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#C9A84C]">
                    {bar.base}
                  </p>
                  <h3 className="mt-2 font-serif text-[22px] leading-snug text-[#1A1A14]">
                    {bar.name}
                  </h3>
                  <p className="mt-2 font-sans text-[13px] leading-[1.7] text-[#666666]">
                    {bar.note}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="mx-auto max-w-lg font-sans text-sm leading-relaxed text-[#666666]">
              There are more bars than these. If you are looking for something in particular,
              ask and we will tell you what is available.
            </p>
            <WhatsAppCTA
              source="landing_gallery"
              message={WA_DEFAULT_MESSAGE}
              className="mt-6 inline-flex items-center justify-center gap-2.5 rounded border-2 border-[#1E5631] px-9 py-4 font-sans text-sm font-bold text-[#1E5631] transition-all hover:bg-[#1E5631] hover:text-white active:scale-[0.98]"
            >
              <WhatsAppIcon />
              Ask about a bar
            </WhatsAppCTA>
          </div>
        </div>
      </section>

      {/* ── Botanicals strip ───────────────────────────────────────────────── */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
            Grown on the farm
          </p>
          <div className="mt-10 flex flex-wrap items-start justify-center gap-x-8 gap-y-8 sm:gap-x-14">
            {ingredients.map((item) => (
              <div key={item.name} className="w-[88px] sm:w-[108px]">
                <div className="relative aspect-square w-full overflow-hidden rounded-full bg-[#F7F5F0] ring-1 ring-[#E8DFC4]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="108px"
                  />
                </div>
                <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.18em] text-[#666666]">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-lg font-sans text-sm leading-[1.8] text-[#666666]">
            Harvested fresh for each batch. The glycerine, goat milk and shea butter bases are
            sourced, and we would rather say which is which.
          </p>
        </div>
      </section>

      {/* ── Reviews ────────────────────────────────────────────────────────
          Dark band for rhythm. Quotes are set as editorial text rather than in
          cards: card chrome on a dark ground reads busy rather than considered. */}
      <section className="w-full bg-[#1E5631] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
              In their words
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-[42px]">
              What people say
            </h2>
          </div>

          <div className="mt-14 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
            <div className="mx-auto w-full max-w-[330px] flex-shrink-0">
              <div className="overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]">
                <VideoTestimonial />
              </div>
              <p className="mt-4 text-center font-sans text-xs uppercase tracking-[0.18em] text-white/50">
                Karyn, on switching to handmade soap
              </p>
            </div>

            <div className="flex-1">
              {anchorReview && (
                <figure>
                  <blockquote className="font-serif text-[21px] italic leading-[1.7] text-white/90 md:text-[25px]">
                    &ldquo;{anchorReview.comment}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="h-px w-8 bg-[#C9A84C]" aria-hidden="true" />
                    <span className="font-sans text-sm font-bold text-white">
                      {anchorReview.author}
                    </span>
                    <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/50">
                      {anchorReview.location}
                    </span>
                  </figcaption>
                </figure>
              )}

              <div className="mt-12 grid grid-cols-1 gap-10 border-t border-white/15 pt-12 sm:grid-cols-2">
                {shortQuotes.map((r) => (
                  <figure key={r.id}>
                    <blockquote className="font-serif text-[17px] italic leading-[1.7] text-white/80">
                      &ldquo;{r.comment}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4">
                      <p className="font-sans text-sm font-bold text-white">{r.author}</p>
                      <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/50">
                        {r.occupation ? `${r.occupation} · ` : ''}
                        {r.location}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <Link
                href="/reviews"
                className="mt-10 inline-block font-sans text-sm font-bold text-white underline decoration-[#C9A84C] decoration-2 underline-offset-[6px] transition-colors hover:text-[#C9A84C]"
              >
                Read all reviews
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why it is different ────────────────────────────────────────────── */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[#F7F5F0] lg:aspect-square">
              {/* A bar rather than a landscape. The farm already has the band
                  above, and the cashew tree shot is the lead image on
                  /our-story, which stays live in this mode. Deliberately not
                  the marigold process shot: the bar in it is plastic wrapped,
                  which would sit directly beside the no-plastic line below. */}
              <Image
                src="/hero-soap.webp"
                alt="A honey oats bar resting on a woven tray"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-8 lg:pl-4">
              <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
                Why it is different
              </p>
              <h2 className="font-serif text-3xl leading-tight text-[#1E5631] md:text-4xl lg:text-[44px]">
                Five things we do that most soap does not.
              </h2>

              <div className="divide-y divide-[#D6CFC4]">
                {process.map((item, i) => (
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

              <Link
                href="/our-story"
                className="inline-block rounded border-2 border-[#1E5631] px-8 py-4 font-sans text-sm font-bold text-[#1E5631] transition-all hover:bg-[#1E5631] hover:text-white"
              >
                Read our story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest from the farm ───────────────────────────────────────────── */}
      {recentPosts.length > 0 && (
        <section className="w-full bg-[#F7F5F0] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-12 flex flex-col items-center justify-between gap-6 md:mb-14 md:flex-row md:items-end">
              <div className="text-center md:text-left">
                <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
                  Reading
                </p>
                <h2 className="mt-4 font-serif text-3xl text-[#1E5631] md:text-4xl">
                  Latest from the farm
                </h2>
              </div>
              <Link
                href="/blog"
                className="font-sans text-sm font-bold text-[#1E5631] underline decoration-[#C9A84C] decoration-2 underline-offset-[6px] hover:text-[#C9A84C]"
              >
                Read all stories
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

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="w-full bg-white py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-10 font-serif text-3xl text-[#1E5631] md:text-4xl">
            Common questions
          </h2>
          <div className="divide-y divide-[#D6CFC4]">
            {faqItems.map(({ q, a }) => (
              <details key={q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-base font-medium text-[#1A1A14] hover:text-[#1E5631]">
                  {q}
                  <span
                    className="flex-shrink-0 text-[#C9A84C] transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#666666]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Soft close ─────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#1E5631] py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-[clamp(30px,5.5vw,50px)] font-normal leading-tight text-white">
            If a bar sounds right, tell us
          </h2>
          <div className="mx-auto mt-8 h-px w-16 bg-[#C9A84C]" />
          <p className="mx-auto mt-8 max-w-xl font-sans text-base leading-[1.85] text-white/75 md:text-lg">
            Pick a base by how it feels, or describe what you are after and we will talk it
            through. Everything is poured once you decide.
          </p>
          <WhatsAppCTA
            source="landing_close"
            message={WA_DEFAULT_MESSAGE}
            className="mt-11 inline-flex items-center justify-center gap-2.5 rounded bg-white px-10 py-5 font-sans text-sm font-bold text-[#1E5631] shadow-xl transition-all hover:bg-[#F7F5F0] active:scale-[0.98] md:px-12 md:text-base"
          >
            <WhatsAppIcon />
            Start a conversation
          </WhatsAppCTA>
          <p className="mt-6 font-sans text-xs font-medium uppercase tracking-[0.2em] text-white/50">
            {WHATSAPP_DISPLAY} · Made in South Goa
          </p>
        </div>
      </section>
    </div>
  )
}
