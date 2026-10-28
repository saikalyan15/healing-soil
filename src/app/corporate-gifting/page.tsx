import type { Metadata } from 'next'
import Image from 'next/image'
import WhatsAppCTA, { WhatsAppIcon } from '@/components/WhatsAppCTA'
import GiftHamperCard from '@/components/GiftHamperCard'
import { giftHampers } from '@/data/gift-hampers'
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp'

// Corporate gifting landing page, built to receive paid traffic from Meta ads.
//
// Copy follows CLAUDE.md: no em-dashes, soft close, no urgency, no superlatives,
// no therapeutic claims, the maker is not named, and the shipping line never
// promises free delivery. There is no cart and no checkout here. In
// 'content-only' site mode the order is placed in the WhatsApp conversation, and
// this page does the same: it prices the four sets and hands the reader to a
// pre-filled quote request. No invoice or GST wording appears on the page.
//
// noindex while this is an ad-only page. Flip `robots` to index it once the
// owner wants it found through search as well.

export const metadata: Metadata = {
  title: 'Corporate Gifting | Healing Soil',
  description:
    'Handmade soap gift sets for teams and clients, made to order on our farm in South Goa.',
  alternates: { canonical: '/corporate-gifting' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Corporate Gifting | Healing Soil',
    description:
      'Handmade soap gift sets for teams and clients, made to order on our farm in South Goa.',
    url: '/corporate-gifting',
    siteName: 'Healing Soil',
    type: 'website',
    images: ['/images/gifting/jute-bag-farm.webp'],
  },
}

/** Pre-filled quote request. The blank lines are for the buyer to complete. */
function quoteMessage(set: string): string {
  return `Hi Healing Soil, I would like a quote for corporate gifts.\nSet: ${set}\nQuantity:\nCity:\nNeeded by:`
}

// Sets, contents and prices come from src/data/gift-hampers.ts, shared with
// /gift-hampers, so the two pages cannot quote different prices.

const steps = [
  {
    t: 'Tell us what you have in mind',
    d: 'Message us on WhatsApp with the set, how many, which city they are going to, and the date you need them by.',
  },
  {
    t: 'We confirm and quote',
    d: 'We reply with what we can make in that time, and a quote that includes delivery.',
  },
  {
    t: 'Made after you confirm',
    d: 'Everything is made to order, so nothing has been sitting on a shelf. We ship from our farm in South Goa.',
  },
]

const faqItems = [
  {
    q: 'How long does it take?',
    a: 'Allow 2 to 3 days to make an order after you confirm, then about 4 to 7 days for delivery, depending on the city. Larger quantities can take longer, and we will say so when we quote.',
  },
  {
    q: 'Where do you deliver?',
    a: 'We ship from South Goa to addresses across India.',
  },
  {
    q: 'What goes into the soaps?',
    a: 'No SLS, no parabens, no synthetic fragrance. Neem, tulsi and lemongrass are grown on our farm. The bases (glycerine, goat milk and shea butter) are sourced, and we would rather say so.',
  },
  {
    q: 'Can you make something for a different budget or quantity?',
    a: 'Ask us. Tell us how many and what you have in mind, and we will tell you what is possible.',
  },
]

const primaryButton =
  'inline-flex items-center justify-center gap-2.5 rounded bg-[#1E5631] px-9 py-4 font-sans text-sm font-bold text-white shadow-[0_12px_30px_-12px_rgba(30,86,49,0.55)] transition-all hover:bg-[#153d22] active:scale-[0.98] md:text-base'

export default function CorporateGiftingPage() {
  return (
    <div className="bg-[#F7F5F0]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-2 md:gap-14 md:pb-24 md:pt-20">
        <div className="text-center md:text-left">
          <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
            Corporate gifting
          </p>
          <h1 className="mt-5 font-serif text-[clamp(34px,5.5vw,54px)] font-normal leading-[1.08] tracking-[-0.01em] text-[#1E5631]">
            Handmade soap gifts for your team
          </h1>
          <div className="mx-auto mt-7 h-px w-16 bg-[#C9A84C] md:mx-0" />
          <p className="mt-7 font-sans text-base leading-[1.85] text-[#666666] md:text-lg">
            Small batches, hand-poured on our farm in South Goa and packed as gift sets. For
            Diwali, a client thank-you, a new joiner or a team offsite. Everything is made to
            order.
          </p>
          <div className="mt-9">
            <WhatsAppCTA
              source="corporate_gifting_hero"
              message={quoteMessage('Not sure yet')}
              className={primaryButton}
            >
              <WhatsAppIcon />
              Start a conversation
            </WhatsAppCTA>
            <p className="mt-4 font-sans text-xs leading-relaxed text-[#999999]">
              We reply on WhatsApp. {WHATSAPP_DISPLAY}
            </p>
          </div>
        </div>

        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-xl shadow-[0_24px_50px_-24px_rgba(30,86,49,0.5)] md:max-w-none">
          <Image
            src="/images/gifting/jute-bag-farm.webp"
            alt="A jute gift bag with a kraft card, a wrapped soap and two handmade soaps on a wooden board, with greenery behind"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 45vw"
          />
        </div>
      </section>

      {/* ── The sets ─────────────────────────────────────────────────────── */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
              The sets
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-[#1E5631] md:text-[40px]">
              Four ways to give
            </h2>
            <p className="mt-5 font-sans text-base leading-[1.8] text-[#666666]">
              Prices are per set. We confirm the final quote, including delivery, on WhatsApp.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {giftHampers.map((h) => (
              <GiftHamperCard
                key={h.id}
                hamper={h}
                message={quoteMessage(`${h.name} (${h.contents.join(', ')})`)}
                source={`corporate_gifting_${h.id}`}
                ctaLabel="Ask about this set"
                priceSuffix="per set"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
        <div className="text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
            How it works
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-[#1E5631] md:text-[40px]">
            A short conversation, then we make it
          </h2>
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className="text-center md:text-left">
              <span className="font-serif text-4xl leading-none text-[#C9A84C]">{i + 1}</span>
              <h3 className="mt-3 font-serif text-[22px] leading-snug text-[#1A1A14]">{s.t}</h3>
              <p className="mt-2 font-sans text-[15px] leading-[1.75] text-[#666666]">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Farm and ingredients ─────────────────────────────────────────── */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-14">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-xl md:order-2 md:max-w-none">
            <Image
              src="/images/gifting/floral-bag-set-alt.webp"
              alt="A printed jute bag with soaps, a body butter and a lip balm in a wooden tray, with coconut palms behind"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 45vw"
            />
          </div>
          <div className="text-center md:order-1 md:text-left">
            <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
              Made on the farm
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-[#1E5631] md:text-[40px]">
              Honest soap, made slowly
            </h2>
            <p className="mt-6 font-sans text-base leading-[1.85] text-[#666666]">
              No SLS, no parabens, no synthetic fragrance. The scent comes from essential oils, and
              every bar has added vitamin E. Neem, tulsi and lemongrass are grown on our farm in
              South Goa. The glycerine, goat milk and shea butter bases are
              sourced, and we would rather say so. Each batch is poured by hand after the order
              is confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="text-center font-serif text-3xl leading-tight text-[#1E5631] md:text-[38px]">
          Questions
        </h2>
        <div className="mt-10 divide-y divide-[#D6CFC4] border-y border-[#D6CFC4]">
          {faqItems.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-[21px] leading-snug text-[#1A1A14]">
                {item.q}
                <span
                  aria-hidden="true"
                  className="font-sans text-xl text-[#C9A84C] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 font-sans text-[15px] leading-[1.8] text-[#666666]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Close ────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#1E5631] py-16 text-center md:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl leading-tight text-white md:text-[38px]">
            Thinking about gifts for a team or for clients?
          </h2>
          <p className="mt-5 font-sans text-base leading-[1.8] text-white/80">
            Tell us how many, where they are going and by when, and we will tell you what is
            possible.
          </p>
          <div className="mt-9">
            <WhatsAppCTA
              source="corporate_gifting_close"
              message={quoteMessage('Not sure yet')}
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
