import type { Metadata } from 'next'
import Link from 'next/link'
import { getProducts } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import BlogInlineCTA from '@/components/BlogInlineCTA'
import CommerceOnly from '@/components/CommerceOnly'
import { COMMERCE_ENABLED } from '@/lib/site-mode'

export const metadata: Metadata = {
  title: 'SLS-Free Soap India: Handmade in Goa | Healing Soil',
  description:
    'Handmade soap made without SLS, parabens, or synthetic fragrance. Made in small batches in Goa with natural glycerin retained. Suited to all skin types.',
  alternates: { canonical: '/sls-free-soap' },
  openGraph: {
    title: 'SLS-Free Soap India: Handmade in Goa | Healing Soil',
    description:
      'Handmade soap made without SLS, parabens, or synthetic fragrance. Made in small batches in Goa.',
    url: '/sls-free-soap',
    siteName: 'Healing Soil',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'SLS-free soap handmade in Goa' }],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does SLS-free mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SLS-free means the soap does not contain sodium lauryl sulfate. SLES is a different surfactant and should be checked separately on the ingredient list. Healing Soil bars contain neither.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is handmade soap always SLS-free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not necessarily. Handmade describes a making method, not a specific formula. Check the complete ingredient list rather than relying on the word handmade.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does SLS-free describe the whole formula?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. It only describes the absence of SLS. The base, scent, colour, and other ingredients still matter, so compare the complete label.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does SLS-free soap lather well?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Foam depends on the complete formula and water conditions, not on SLS alone. Healing Soil bases create light or creamy lather depending on the base.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://healingsoil.in',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'SLS-Free Soap',
      item: 'https://healingsoil.in/sls-free-soap',
    },
  ],
}

export default async function SlsFreeSoapPage() {
  const allProducts = COMMERCE_ENABLED ? await getProducts() : []
  const products = allProducts.filter((p) => p.in_stock)

  return (
    <div className="bg-[#F7F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="mx-auto max-w-[720px] px-4 py-16 sm:px-6">
        <h1 className="mb-6 font-serif text-4xl leading-tight text-[#1E5631] sm:text-5xl">
          SLS-free soap in India
        </h1>

        <p className="mb-5 font-sans text-lg leading-relaxed text-[#1A1A14]">
          SLS-free is a useful label preference, but it is not the whole story. The soap base,
          fragrance, colour, and complete ingredient list all shape how a bar feels in use.
        </p>

        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Sodium lauryl sulfate is a surfactant used in some cleansing products to create fast,
          dense foam. Sodium laureth sulfate, or SLES, is a separate ingredient that appears under
          its own name on the label.
        </p>

        <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
          At Healing Soil, we make soap differently. Our bars are genuinely SLS-free, relying on
          SLS-free bases and make every bar without parabens or synthetic fragrance.
        </p>

        <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">The Healing Soil difference</h2>
        <div className="prose-custom mb-10">
          <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
            Glycerin bars feel light and rinse easily, goat milk bars have a creamier lather, and
            shea butter bars provide the richest, most conditioning feel.
          </p>
          <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
            By combining SLS-free bases with farm-grown ingredients like neem and tulsi, we create soap
            with a clear ingredient list and a gentle wash experience.
          </p>
        </div>

        {/* Product Grid */}
        <CommerceOnly>
          <div className="mb-12">
            <h2 className="mb-6 font-serif text-3xl text-[#1E5631]">Our SLS-free collection</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </CommerceOnly>

        <BlogInlineCTA />

        <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">What to compare on the label</h2>
        <ul className="mb-10 space-y-3 font-sans text-base leading-[1.8] text-[#1A1A14]">
          <li>
            <strong className="font-semibold text-[#1A1A14]">Surfactants</strong>: check SLS and
            SLES separately.
          </li>
          <li>
            <strong className="font-semibold text-[#1A1A14]">Fragrance</strong>: check whether the
            scent is botanical, essential-oil based, synthetic, or absent.
          </li>
          <li>
            <strong className="font-semibold text-[#1A1A14]">Soap base</strong>: choose glycerin,
            goat milk, or shea butter by the lather and after-wash feel you prefer.
          </li>
        </ul>

        <h2 className="mb-6 font-serif text-3xl text-[#1E5631]">Common questions</h2>
        <div className="mb-10 space-y-6">
          {faqSchema.mainEntity.map((faq, i) => (
            <div key={i}>
              <p className="mb-2 font-sans text-base font-semibold text-[#1A1A14]">
                {faq.name}
              </p>
              <p className="font-sans text-base leading-[1.8] text-[#1A1A14]">
                {faq.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-[#D6CFC4] pt-8">
          <p className="mb-3 font-sans text-sm font-medium text-[#1A1A14]">Read more</p>
          <ul className="space-y-2 font-sans text-sm">
            <li>
              <Link
                href="/blog/sls-free-soap-india"
                className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]"
              >
                Read the SLS-free soap label guide
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
