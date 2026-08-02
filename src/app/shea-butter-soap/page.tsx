import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shea Butter Soap — Handmade in Goa | Healing Soil',
  description: 'Rich shea butter soap with a creamy lather and conditioning feel. Small-batch, SLS-free, and made without parabens or synthetic fragrance.',
  alternates: { canonical: '/shea-butter-soap' },
  openGraph: {
    title: 'Shea Butter Soap — Handmade in Goa | Healing Soil',
    description: 'Rich, conditioning shea butter soap made in small batches in Goa.',
    url: '/shea-butter-soap',
    siteName: 'Healing Soil',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Shea butter soap handmade in Goa' }],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does shea butter add to soap?',
      acceptedAnswer: { '@type': 'Answer', text: 'Shea butter gives soap a rich texture, creamy lather, and conditioning after-wash feel.' },
    },
    {
      '@type': 'Question',
      name: 'Is shea butter soap suitable for sensitive skin?',
      acceptedAnswer: { '@type': 'Answer', text: 'Healing Soil shea butter soap is a gentle option suitable for sensitive skin. It contains no SLS, parabens, or synthetic fragrance. Patch test any new product before regular use.' },
    },
    {
      '@type': 'Question',
      name: 'How does shea butter soap compare with goat milk soap?',
      acceptedAnswer: { '@type': 'Answer', text: 'Shea butter is the richer, more conditioning base. Goat milk has a creamy lather with a lighter finish.' },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://healingsoil.in' },
    { '@type': 'ListItem', position: 2, name: 'Shea Butter Soap', item: 'https://healingsoil.in/shea-butter-soap' },
  ],
}

export default function SheaButterSoapPage() {
  return (
    <div className="bg-[#F7F5F0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="mx-auto max-w-[720px] px-4 py-16 sm:px-6">
        <h1 className="mb-6 font-serif text-4xl leading-tight text-[#1E5631] sm:text-5xl">Shea butter soap</h1>

        <p className="mb-5 font-sans text-lg leading-relaxed text-[#1A1A14]">
          Shea butter is the richest of Healing Soil&apos;s three soap bases. It creates a dense bar, a creamy lather, and a conditioning feel that leaves skin feeling soft after washing.
        </p>
        <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Our bars are melted and hand-poured in small batches in Goa. They contain no SLS, parabens, or synthetic fragrance.
        </p>

        <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">Who may prefer it</h2>
        <ul className="mb-10 space-y-3 font-sans text-base leading-[1.8] text-[#1A1A14]">
          <li>People who enjoy a rich, creamy lather.</li>
          <li>Dry and mature skin types that prefer a conditioning wash.</li>
          <li>Sensitive skin types looking for a bar without SLS or synthetic fragrance.</li>
          <li>Anyone who finds glycerin soap too light in cooler weather.</li>
        </ul>

        <div className="mb-10 rounded-lg border border-[#C9A84C] bg-[#FFF8E8] p-6 text-center">
          <p className="mb-1 font-serif text-2xl text-[#1E5631]">Try our shea butter bars</p>
          <p className="mb-4 font-sans text-sm text-[#666666]">Hand-poured in Goa. Current prices and delivery estimates are shown in the shop.</p>
          <Link href="/shop" className="inline-block rounded bg-[#1E5631] px-6 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]">Shop shea butter soap</Link>
        </div>

        <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">How it compares</h2>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Choose shea butter for the fullest texture. Choose goat milk for a creamy but lighter wash, or glycerin for the lightest, easiest-rinsing feel. There is no universal best base; the useful difference is how each one feels in your routine.
        </p>
        <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
          See our <Link href="/blog/shea-butter-goat-milk-soap-dry-sensitive-skin" className="text-[#1E5631] underline underline-offset-2">shea butter and goat milk comparison</Link> or read the <Link href="/blog/understanding-the-benefits-of-shea-butter-in-soap" className="text-[#1E5631] underline underline-offset-2">shea butter ingredient guide</Link>.
        </p>

        <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">Use and storage</h2>
        <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Wet the bar, build a creamy lather with your hands, and rinse. Keep it on a draining soap dish and let it dry between uses. If your skin is sensitive, patch test first and stop using any product that does not suit you.
        </p>

        <h2 className="mb-6 font-serif text-3xl text-[#1E5631]">Common questions</h2>
        <div className="space-y-6">
          {faqSchema.mainEntity.map((faq) => (
            <div key={faq.name}>
              <p className="mb-2 font-sans font-semibold text-[#1A1A14]">{faq.name}</p>
              <p className="font-sans leading-[1.8] text-[#1A1A14]">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}
