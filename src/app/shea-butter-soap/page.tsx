import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shea Butter Soap — Handmade in Goa | Healing Soil',
  description:
    'Rich, conditioning shea butter soap made in small batches in Goa. Suited to dry, sensitive, and mature skin. No SLS, parabens, or synthetic fragrance.',
  alternates: { canonical: '/shea-butter-soap' },
  openGraph: {
    title: 'Shea Butter Soap — Handmade in Goa | Healing Soil',
    description:
      'Rich, conditioning shea butter soap made in small batches in Goa. Suited to dry, sensitive, and mature skin.',
    url: '/shea-butter-soap',
    siteName: 'Healing Soil',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Shea butter soap handmade in Goa' }],
  },
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Shea Butter Soap',
  description:
    'Handmade shea butter soap made in small batches in Goa. Rich and conditioning — suited to dry, sensitive, and mature skin. No SLS, parabens, or synthetic fragrance.',
  brand: { '@type': 'Brand', name: 'Healing Soil' },
  offers: {
    '@type': 'Offer',
    price: '400',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    url: 'https://healingsoil.in/shop',
    seller: { '@type': 'Organization', name: 'Healing Soil' },
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the benefits of shea butter soap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shea butter soap leaves a conditioning deposit on skin with every wash. The non-saponifiable compounds in shea butter survive the soap-making process and are deposited on skin while you wash. The result is a wash that feels nourishing rather than stripping — skin tends to feel soft after washing. It suits dry, sensitive, and mature skin and does not clog pores.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who should use shea butter soap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shea butter soap is the right choice when dryness is the main concern. If your skin feels tight after showering regardless of what you use, if you have persistent dry patches on your elbows, knees, or shins, or if your skin tends to feel particularly dry in winter, shea butter is the richest and most conditioning of the three soap bases. Mature skin that leans toward dryness also tends to suit it well.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Healing Soil shea butter soap different from commercial soap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commercial shea butter soaps often add SLS as the primary detergent and use synthetic fragrance, then list shea butter as a trace ingredient for marketing purposes. Healing Soil shea butter soap uses shea butter as the base — not a trace addition — and contains no SLS, parabens, or synthetic fragrance. It is made to order in small batches in Goa and ships in seven to ten days.',
      },
    },
  ],
}

export default function SheaButterSoapPage() {
  return (
    <div className="bg-[#F7F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="mx-auto max-w-[720px] px-4 py-16 sm:px-6">

        <h1 className="mb-6 font-serif text-4xl leading-tight text-[#1E5631] sm:text-5xl">
          Shea butter soap
        </h1>

        <p className="mb-5 font-sans text-lg leading-relaxed text-[#1A1A14]">
          Most soap takes something from your skin when you wash. It removes dirt, yes — but also the
          thin layer of oil your skin produces to protect itself. Shea butter soap works differently.
          It cleans and leaves something behind: a conditioning deposit that keeps skin from feeling
          stripped after the shower.
        </p>

        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Shea butter contains compounds that do not convert to soap during the saponification process.
          They survive manufacturing intact. When you wash with a shea butter bar, these compounds —
          fatty acids, cinnamic acid esters, vitamins A and E — are deposited on the skin and remain
          there after rinsing. The result is skin that feels soft, not tight.
        </p>

        <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
          This is not a marketing claim. It is the chemistry of how shea butter behaves in soap,
          which is why it has been used in handmade soap for decades before it became a label trend.
        </p>

        {/* Who it suits */}
        <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">Who it suits</h2>

        <ul className="mb-10 space-y-3 font-sans text-base leading-[1.8] text-[#1A1A14]">
          <li>
            <strong className="font-semibold">Very dry skin</strong> — if your skin feels tight after
            every shower regardless of what you use, shea butter is the right base to try.
          </li>
          <li>
            <strong className="font-semibold">Dry patches</strong> — elbows, knees, heels, and shins
            that stay rough even with regular moisturising respond well to consistent shea butter use.
          </li>
          <li>
            <strong className="font-semibold">Sensitive skin</strong> — shea butter does not clog
            pores despite its richness, and a properly made shea butter soap has no synthetic fragrance
            or SLS — the two most common sources of skin reactions.
          </li>
          <li>
            <strong className="font-semibold">Mature skin</strong> — skin tends to feel drier with
            age. Shea butter&apos;s richness suits skin that leans toward dryness.
          </li>
          <li>
            <strong className="font-semibold">Post-shave</strong> — skin that feels raw and tight
            after shaving responds well to shea butter&apos;s conditioning properties.
          </li>
        </ul>

        {/* Shop CTA */}
        <div className="mb-10 rounded-lg border border-[#C9A84C] bg-[#FFF8E8] p-6 text-center">
          <p className="mb-1 font-serif text-2xl text-[#1E5631]">Our shea butter soap</p>
          <p className="mb-1 font-sans text-sm text-[#666666]">
            Made in small batches in Goa. No SLS, parabens, or synthetic fragrance. ₹400 per bar.
          </p>
          <p className="mb-4 font-sans text-xs text-[#999]">
            Ships in 7–10 days. Free shipping pan-India.
          </p>
          <Link
            href="/shop"
            className="inline-block rounded bg-[#1E5631] px-6 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
          >
            Shop shea butter soap
          </Link>
        </div>

        {/* What makes it different */}
        <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">What makes handmade different</h2>

        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Most commercial soaps labelled &ldquo;shea butter&rdquo; contain SLS as the primary
          detergent and list shea butter as a trace ingredient — enough to appear on the label, not
          enough to change how the soap behaves on skin. The detergent strips. The shea butter does
          not compensate for it.
        </p>

        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Healing Soil shea butter soap uses shea butter as the base. No SLS. No sodium laureth
          sulfate. No synthetic fragrance. The soap is made to order in small batches at the farm in
          South Goa, cured for the right amount of time, and shipped when ready. The seven to ten day
          window between order and dispatch is the making and curing time, not a logistics delay.
        </p>

        <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Commercial soap also removes the glycerin that forms naturally during saponification because
          glycerin is profitable to sell separately. Healing Soil soap keeps it in the bar. Shea
          butter plus retained glycerin means every wash does something useful for the skin rather
          than just stripping it.
        </p>

        {/* FAQ */}
        <h2 className="mb-6 font-serif text-3xl text-[#1E5631]">Common questions</h2>

        <div className="mb-10 space-y-6">
          <div>
            <p className="mb-2 font-sans text-base font-semibold text-[#1A1A14]">
              Is shea butter soap good for sensitive skin?
            </p>
            <p className="font-sans text-base leading-[1.8] text-[#1A1A14]">
              Yes. Shea butter does not clog pores despite its richness, and a properly made shea
              butter soap contains no synthetic fragrance or SLS — the two most common triggers for
              sensitive skin reactions. If your skin is both dry and sensitive, shea butter is usually
              the right base.
            </p>
          </div>
          <div>
            <p className="mb-2 font-sans text-base font-semibold text-[#1A1A14]">
              How does shea butter soap compare to goat milk soap?
            </p>
            <p className="font-sans text-base leading-[1.8] text-[#1A1A14]">
              Goat milk is gentler and more versatile — it suits most skin types including sensitive
              skin. Shea butter is richer and more conditioning — suited to skin that is very dry or
              that feels tight after showering. If you are not sure which to try first, the starter
              bundle includes both.{' '}
              <Link
                href="/blog/shea-butter-goat-milk-soap-dry-sensitive-skin"
                className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]"
              >
                See the full comparison.
              </Link>
            </p>
          </div>
          <div>
            <p className="mb-2 font-sans text-base font-semibold text-[#1A1A14]">
              Does shea butter soap work for the whole body?
            </p>
            <p className="font-sans text-base leading-[1.8] text-[#1A1A14]">
              Yes. It works on the face and body. For very dry body skin — shins, elbows, heels — you
              can hold the bar on the dry area longer than you would normally wash, letting the
              conditioning deposit absorb while the lather does its work.
            </p>
          </div>
        </div>

        {/* Internal links */}
        <div className="border-t border-[#D6CFC4] pt-8">
          <p className="mb-3 font-sans text-sm font-medium text-[#1A1A14]">Read more</p>
          <ul className="space-y-2 font-sans text-sm">
            <li>
              <Link
                href="/blog/understanding-the-benefits-of-shea-butter-in-soap"
                className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]"
              >
                Benefits of shea butter soap: what it does for dry and sensitive skin
              </Link>{' '}
              — the full ingredient breakdown
            </li>
            <li>
              <Link
                href="/blog/shea-butter-goat-milk-soap-dry-sensitive-skin"
                className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]"
              >
                Shea butter vs goat milk soap: which suits you?
              </Link>
            </li>
            <li>
              <Link
                href="/guide/handmade-soap-india"
                className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]"
              >
                Complete guide to handmade soap in India
              </Link>
            </li>
          </ul>
        </div>

      </article>
    </div>
  )
}
