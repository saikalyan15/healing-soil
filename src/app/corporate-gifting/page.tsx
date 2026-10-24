import type { Metadata } from 'next'
import Image from 'next/image'
import WhatsAppCTA, { WhatsAppIcon } from '@/components/WhatsAppCTA'
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp'

// Corporate gifting landing page, built to receive paid traffic from Meta ads.
//
// Copy follows CLAUDE.md: no em-dashes, soft close, no urgency, no superlatives,
// no therapeutic claims, the maker is not named, and the shipping line never
// promises free delivery. There is no cart and no checkout here. In
// 'content-only' site mode the order is placed in the WhatsApp conversation, and
// this page does the same: it prices the three sets and hands the reader to a
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

type GiftSet = {
  id: string
  name: string
  price: string
  contents: string
  extra?: string
  whatsappSet: string
}

const sets: GiftSet[] = [
  {
    id: 'jute-bag',
    name: 'The jute bag set',
    price: '₹300',
    contents: 'A reusable jute bag with three mini soaps.',
    extra: 'Comes with a kraft card, with space for a handwritten note.',
    whatsappSet: 'The jute bag set (jute bag with 3 mini soaps)',
  },
  {
    id: 'discovery-box',
    name: 'The discovery box',
    price: '₹899',
    contents: 'Four 50g soaps in one box.',
    whatsappSet: 'The discovery box (4 x 50g soaps)',
  },
  {
    id: 'full-set',
    name: 'The full set',
    price: '₹1,500',
    contents:
      'One 100g soap, one 50g soap, an avocado body butter and a kokum lip balm.',
    whatsappSet: 'The full set (100g soap, 50g soap, avocado body butter, kokum lip balm)',
  },
]

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

const mosaic = [
  { src: '/products/50g-soap-squares/images/neem-tulsi-goatmilk-50g.webp', alt: 'Neem Tulsi goat milk soap, 50g' },
  { src: '/products/50g-soap-squares/images/honey-oats-glycerin-50g.webp', alt: 'Honey Oats glycerine soap, 50g' },
  { src: '/products/50g-soap-squares/images/kesar-gulab-sheabutter-50g.webp', alt: 'Kesar Gulab shea butter soap, 50g' },
  { src: '/products/50g-soap-squares/images/orange-glycerine-50g.webp', alt: 'Orange glycerine soap, 50g' },
]

const primaryButton =
  'inline-flex items-center justify-center gap-2.5 rounded bg-[#1E5631] px-9 py-4 font-sans text-sm font-bold text-white shadow-[0_12px_30px_-12px_rgba(30,86,49,0.55)] transition-all hover:bg-[#153d22] active:scale-[0.98] md:text-base'

const outlineButton =
  'inline-flex w-full items-center justify-center gap-2.5 rounded border-2 border-[#1E5631] px-6 py-3.5 font-sans text-sm font-bold text-[#1E5631] transition-all hover:bg-[#1E5631] hover:text-white active:scale-[0.98]'

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
              Three ways to give
            </h2>
            <p className="mt-5 font-sans text-base leading-[1.8] text-[#666666]">
              Prices are per set. We confirm the final quote, including delivery, on WhatsApp.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {sets.map((set) => (
              <article
                key={set.id}
                className="flex flex-col overflow-hidden rounded-xl border border-[#D6CFC4] bg-[#F7F5F0]"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[#1E5631]/5">
                  {set.id === 'jute-bag' && (
                    <Image
                      src="/images/gifting/jute-bag-card.webp"
                      alt="A jute drawstring bag with a kraft card, a wrapped soap and two mini soaps"
                      fill
                      className="object-cover object-[50%_55%]"
                      sizes="(max-width: 768px) 90vw, 30vw"
                    />
                  )}
                  {set.id === 'discovery-box' && (
                    <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1 bg-white p-1">
                      {mosaic.map((m) => (
                        <div key={m.src} className="relative overflow-hidden">
                          <Image
                            src={m.src}
                            alt={m.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 45vw, 15vw"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {set.id === 'full-set' && (
                    <Image
                      src="/images/gifting/floral-bag-set.webp"
                      alt="A printed jute bag beside a honey oats soap, a green soap, an avocado body butter and a kokum lip balm"
                      fill
                      className="object-cover object-[50%_72%]"
                      sizes="(max-width: 768px) 90vw, 30vw"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#C9A84C]">
                    {set.price} per set
                  </p>
                  <h3 className="mt-2 font-serif text-[26px] leading-snug text-[#1A1A14]">
                    {set.name}
                  </h3>
                  <p className="mt-3 font-sans text-[15px] leading-[1.7] text-[#444444]">
                    {set.contents}
                  </p>
                  {set.extra && (
                    <p className="mt-2 font-sans text-[13px] leading-[1.7] text-[#666666]">
                      {set.extra}
                    </p>
                  )}
                  <div className="mt-6 pt-2 md:mt-auto">
                    <WhatsAppCTA
                      source={`corporate_gifting_${set.id}`}
                      message={quoteMessage(set.whatsappSet)}
                      className={outlineButton}
                    >
                      <WhatsAppIcon />
                      Ask about this set
                    </WhatsAppCTA>
                  </div>
                </div>
              </article>
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
              No SLS, no parabens, no synthetic fragrance. Neem, tulsi and lemongrass are grown
              on our farm in South Goa. The glycerine, goat milk and shea butter bases are
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
