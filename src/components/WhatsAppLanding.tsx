import Image from 'next/image'
import Link from 'next/link'
import WhatsAppCTA, { WhatsAppIcon } from './WhatsAppCTA'
import { WA_DEFAULT_MESSAGE, WHATSAPP_DISPLAY } from '@/lib/whatsapp'

// The homepage in 'content-only' site mode: a single page about Healing Soil and
// handmade soap, with WhatsApp as the way to get in touch. No products, prices,
// cart or checkout. Copy follows CLAUDE.md: no em-dashes, soft close, no
// urgency, no superlatives, no therapeutic claims, the maker is not named.

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
  return (
    <div className="bg-[#F7F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <Image
          src="/logo.png"
          alt="Healing Soil"
          width={200}
          height={80}
          priority
          className="mx-auto object-contain"
          style={{ height: '84px', width: 'auto' }}
        />

        <p className="mt-8 font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
          Handmade in South Goa
        </p>
        <h1 className="mt-4 font-serif text-[clamp(32px,5vw,52px)] font-normal leading-[1.1] text-[#1E5631]">
          Handmade soap, made to order
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-[1.8] text-[#666666] md:text-lg">
          Small batches, hand-poured on our farm in South Goa. Botanicals like neem and tulsi
          are grown on the farm; the glycerine, goat milk, and shea butter bases are sourced.
          No SLS, no parabens, no synthetic fragrance.
        </p>

        <div className="mt-10">
          <p className="font-sans text-sm text-[#666666]">
            We are taking orders and answering questions on WhatsApp for now.
          </p>
          <WhatsAppCTA
            source="landing_primary"
            message={WA_DEFAULT_MESSAGE}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded bg-[#1E5631] px-10 py-4 font-sans text-sm font-bold text-white transition-all hover:bg-[#153d22] active:scale-[0.98] md:px-12 md:py-5 md:text-base"
          >
            <WhatsAppIcon />
            Start a conversation
          </WhatsAppCTA>
          <p className="mt-3 font-sans text-xs text-[#999999]">{WHATSAPP_DISPLAY}</p>
        </div>

        <p className="mt-12 font-sans text-sm text-[#666666]">
          You can also read more about how the soap is made and where it comes from:
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 font-sans text-sm">
          <Link href="/blog" className="font-medium text-[#1E5631] underline underline-offset-4 hover:text-[#C9A84C]">
            Reading from the farm
          </Link>
          <Link href="/our-story" className="font-medium text-[#1E5631] underline underline-offset-4 hover:text-[#C9A84C]">
            Our story
          </Link>
        </div>
      </section>

      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="mb-6 font-serif text-2xl text-[#1E5631] md:text-3xl">Common questions</h2>
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
    </div>
  )
}
