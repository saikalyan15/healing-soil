import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import WhatsAppCTA, { WhatsAppIcon } from '@/components/WhatsAppCTA'
import GiftHamperCard from '@/components/GiftHamperCard'
import ValueList from '@/components/ValueList'
import { Garland, SeasonIcon, StringLights } from '@/components/FestiveDecor'
import { giftHampers, formatRupees, LOWEST_HAMPER_PRICE, HIGHEST_HAMPER_PRICE } from '@/data/gift-hampers'
import { activeSeason } from '@/data/festive-seasons'
import { SITE_URL, ORGANIZATION_ID } from '@/lib/seo'
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp'

// Consumer gift hamper page, indexed. One evergreen URL that takes on each
// festival's framing in turn (src/data/festive-seasons.ts) and falls back to
// year-round gifting copy between them, so the page keeps the links and history
// it builds up instead of starting from zero each season.
//
// Prices sit in the HTML as plain text and in Product/Offer structured data, so
// Google, ChatGPT and other answer engines can read and quote them. Ordering is
// on WhatsApp in every site mode; there is no cart here. /corporate-gifting is
// the bulk and ad-traffic version of the same four hampers.
//
// Copy follows CLAUDE.md: no em-dashes, no superlatives, no urgency, no
// therapeutic claims, the maker is not named, and the shipping line states the
// real threshold rather than promising free delivery.

// Daily, so a season switches on and off without a redeploy.
export const revalidate = 86400

const PAGE_URL = `${SITE_URL}/gift-hampers`
const RANGE = `${formatRupees(LOWEST_HAMPER_PRICE)} to ${formatRupees(HIGHEST_HAMPER_PRICE)}`

export function generateMetadata(): Metadata {
  const season = activeSeason()
  const title = season?.metaTitle ?? 'Handmade Soap Gift Hampers from Goa | Healing Soil'
  const description = `Four handmade soap gift hampers${season ? ` for ${season.name}` : ''}, from ${RANGE}. Made to order on our farm in South Goa and shipped across India.`
  const image = season?.heroImage.src ?? '/images/gifting/jute-bag-farm.webp'
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: PAGE_URL },
    openGraph: { title, description, url: PAGE_URL, siteName: 'Healing Soil', type: 'website', images: [image] },
  }
}

function enquiry(hamperName: string, seasonName?: string): string {
  return `Hi Healing Soil, I would like to order ${hamperName.toLowerCase()}${seasonName ? ` for ${seasonName}` : ''}.\nHow many:\nCity:\nNeeded by:`
}

export default function GiftHampersPage() {
  const season = activeSeason()

  const faqItems = [
    {
      q: `How much are Healing Soil gift hampers?`,
      a: `There are four hampers. ${giftHampers.map((h) => `${h.name} is ${formatRupees(h.price)}`).join(', ')}. Shipping is free on orders of ₹1,000 and above; below that it is ₹100, or ₹150 for North India.`,
    },
    {
      q: 'Why do the hampers cost what they do?',
      a: 'Neem, tulsi, lemongrass and marigold are grown on our farm in South Goa and sun-dried by hand. The scent comes from essential oils rather than synthetic fragrance, and every bar has added vitamin E. Each batch is poured by hand after you order, in small numbers. That is why a bar costs more than one from a supermarket shelf, and why we can only make so many.',
    },
    {
      q: 'What is in the festive potli?',
      a: 'An embroidered potli bag you can reuse, four assorted 50g handmade soaps, and five chocolate-coated cashews. The soaps are made on our farm in South Goa; the chocolate cashews are bought in from a packaged-food maker.',
    },
    {
      q: 'How long does a hamper take to arrive?',
      a: `Allow 2 to 3 days for us to make it after you confirm, then about 4 to 7 days for delivery depending on the city.${season ? ` ${season.name} is on ${season.dateLabel}.` : ''} Tell us the date you need it by and we will say honestly whether we can make it.`,
    },
    {
      q: 'How do I order a hamper?',
      a: `Message us on WhatsApp (${WHATSAPP_DISPLAY}) with the hamper, how many, the city and the date you need it by. We confirm and share payment details there.`,
    },
    {
      q: 'Can I order hampers in bulk for an office or clients?',
      a: 'Yes. The same four hampers are available for teams and clients, and we quote larger quantities including delivery. See our corporate gifting page or message us.',
    },
    {
      q: 'What goes into the soaps?',
      a: 'No SLS, no parabens, no synthetic fragrance. Neem, tulsi and lemongrass are grown on our farm. The glycerine, goat milk and shea butter bases are sourced, and we would rather say so.',
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        '@id': `${PAGE_URL}#hampers`,
        name: season ? `${season.name} gift hampers` : 'Gift hampers',
        itemListElement: giftHampers.map((h, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            '@id': `${PAGE_URL}#${h.id}`,
            name: `${h.name.replace(/^The /, '')} gift hamper`,
            description: `${h.contents.join('. ')}.${h.note ? ` ${h.note}` : ''}`,
            image: `${SITE_URL}${h.image?.src ?? '/products/50g-soap-squares/images/neem-tulsi-goatmilk-50g.webp'}`,
            brand: { '@type': 'Brand', name: 'Healing Soil' },
            offers: {
              '@type': 'Offer',
              url: `${PAGE_URL}#${h.id}`,
              price: h.price,
              priceCurrency: 'INR',
              availability: 'https://schema.org/MadeToOrder',
              seller: { '@id': ORGANIZATION_ID },
            },
          },
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  }

  const decor = season?.decor
  const heroImage = season?.heroImage ?? {
    src: '/images/gifting/jute-bag-farm.webp',
    alt: 'A jute gift bag with a kraft card, a wrapped soap and two handmade soaps on a wooden board, with greenery behind',
  }

  return (
    <div className="bg-[#F7F5F0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1E5631]">
        {decor && (
          <>
            <Garland decor={decor} />
            <StringLights decor={decor} className="-mt-1" />
          </>
        )}
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-2 md:gap-14 md:pb-24 md:pt-14">
          <div className="text-center md:text-left">
            <p className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.28em] text-[#F2B636]">
              {decor && <SeasonIcon decor={decor} />}
              {season?.eyebrow ?? 'Gifting'}
            </p>
            <h1 className="mt-5 font-serif text-[clamp(34px,5.5vw,54px)] font-normal leading-[1.08] tracking-[-0.01em] text-white">
              {season?.headline ?? 'Handmade soap gift hampers'}
            </h1>
            <div className="mx-auto mt-7 h-px w-16 bg-[#C9A84C] md:mx-0" />
            <p className="mt-7 font-sans text-base leading-[1.85] text-white/75 md:text-lg">
              Four hampers, from {RANGE}. Each one is made to order on our farm in South Goa
              and shipped across India.
            </p>
            <div className="mt-9">
              <a
                href="#hampers"
                className="inline-flex items-center justify-center rounded bg-[#C9A84C] px-9 py-4 font-sans text-sm font-bold text-[#1A1A14] transition-all hover:bg-[#F2B636] active:scale-[0.98] md:text-base"
              >
                See the four hampers
              </a>
              <p className="mt-4 font-sans text-xs leading-relaxed text-white/50">
                Free shipping on orders of ₹1,000 and above. Orders on WhatsApp, {WHATSAPP_DISPLAY}
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm md:max-w-none">
            {decor && (
              <div
                className="lamp-glow absolute -inset-8 rounded-full bg-[radial-gradient(closest-side,rgba(242,182,54,0.45),transparent)]"
                aria-hidden="true"
              />
            )}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] ring-1 ring-[#C9A84C]/40">
              <Image src={heroImage.src} alt={heroImage.alt} fill priority className="object-cover" sizes="(max-width: 768px) 90vw, 45vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ── The hampers ──────────────────────────────────────────────────── */}
      <section id="hampers" className="w-full scroll-mt-16 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">The hampers</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-[#1E5631] md:text-[40px]">
              Four ways to give
            </h2>
            <p className="mt-5 font-sans text-base leading-[1.8] text-[#666666]">
              Prices are per hamper. Tap the one you like and we will confirm the details on WhatsApp.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {giftHampers.map((h) => (
              <GiftHamperCard
                key={h.id}
                hamper={h}
                message={enquiry(h.name, season?.name)}
                source={`gift_hampers_${h.id}`}
                ctaLabel="Order on WhatsApp"
                highlight={season && h.id === 'festive-potli' ? `For ${season.name}` : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Where the price goes ─────────────────────────────────────────
          Straight after the prices, so the answer to "why this much" sits next
          to the number. Shared list: src/data/value-story.ts. */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[#F7F5F0] lg:aspect-square">
            <Image
              src="/images/farm-coconut-canopy.webp"
              alt="The canopy of our farm in South Goa"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-8">
            <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">Where the price goes</p>
            <h2 className="font-serif text-3xl leading-tight text-[#1E5631] md:text-[40px]">What goes into a bar</h2>
            <ValueList />
            <p className="font-sans text-sm leading-[1.7] text-[#666666]">
              The chocolate cashews in the potli are the one thing we do not make; they are bought
              in from a packaged-food maker.{' '}
              <Link href="/ingredients" className="font-semibold text-[#1E5631] underline decoration-[#C9A84C] underline-offset-4">
                Every ingredient, and where it comes from
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Timing ───────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-20">
        <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">Timing</p>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-[#1E5631] md:text-[38px]">
          Made after you order, so allow a little time
        </h2>
        <p className="mt-6 font-sans text-base leading-[1.85] text-[#666666]">
          We take 2 to 3 days to make a hamper once you confirm, then delivery takes about 4 to 7
          days depending on the city.
          {season && ` ${season.name} is on ${season.dateLabel}.`} Tell us the date you need it by
          and we will say honestly whether we can make it.
        </p>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="text-center font-serif text-3xl leading-tight text-[#1E5631] md:text-[38px]">Questions</h2>
        <div className="mt-10 divide-y divide-[#D6CFC4] border-y border-[#D6CFC4]">
          {faqItems.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-[21px] leading-snug text-[#1A1A14]">
                {item.q}
                <span aria-hidden="true" className="font-sans text-xl text-[#C9A84C] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 font-sans text-[15px] leading-[1.8] text-[#666666]">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center font-sans text-sm text-[#666666]">
          Buying for a team or clients?{' '}
          <Link href="/corporate-gifting" className="font-semibold text-[#1E5631] underline decoration-[#C9A84C] underline-offset-4">
            Corporate gifting
          </Link>
        </p>
      </section>

      {/* ── Close ────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#1E5631] py-16 text-center md:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl leading-tight text-white md:text-[38px]">Not sure which one?</h2>
          <p className="mt-5 font-sans text-base leading-[1.8] text-white/80">
            Tell us who it is for and we will help you choose.
          </p>
          <div className="mt-9">
            <WhatsAppCTA
              source="gift_hampers_close"
              message={season?.enquiry ?? 'Hi Healing Soil, I would like to ask about a gift hamper.'}
              className="inline-flex items-center justify-center gap-2.5 rounded bg-white px-9 py-4 font-sans text-sm font-bold text-[#1E5631] transition-all hover:bg-[#F7F5F0] active:scale-[0.98] md:text-base"
            >
              <WhatsAppIcon />
              Start a conversation
            </WhatsAppCTA>
          </div>
        </div>
      </section>
    </div>
  )
}
