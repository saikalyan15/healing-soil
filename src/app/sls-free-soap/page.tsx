import type { Metadata } from 'next'
import Link from 'next/link'
import { getProducts } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import BlogInlineCTA from '@/components/BlogInlineCTA'

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
        text: 'SLS-free means the soap does not contain Sodium Lauryl Sulfate or Sodium Laureth Sulfate (SLES). These are synthetic detergents used in many commercial soaps to create fast, dense lather, but they can be harsh on the skin.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is handmade soap always SLS-free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not necessarily. Some mass-produced "handmade" soaps still use pre-made bases that contain SLS. At Healing Soil, we use only SLS-free bases that rely on traditional saponification for their lather.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why should I avoid SLS in soap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SLS is an effective detergent, but it can be too effective. It strips away the natural oils that protect your skin, leading to dryness, tightness, and sometimes irritation, especially for those with sensitive skin.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does SLS-free soap lather well?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, but the lather is different. Instead of the aggressive, airy foam of a commercial detergent bar, SLS-free soap produces a creamy, soft lather that cleans effectively while being much gentler on the skin.',
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
  const allProducts = await getProducts()
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
          If your skin feels dry or tight after a shower, the soap is usually the reason. Most
          commercial soap bars sold in India contain SLS: a synthetic detergent that strips your
          skin every time you wash.
        </p>

        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Sodium Lauryl Sulfate (SLS) is added to soap to create lather fast and clean effectively. It
          is also cheap to manufacture. The problem is that SLS does not just remove dirt; it removes
          the oils your skin produces naturally to protect itself.
        </p>

        <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
          At Healing Soil, we make soap differently. Our bars are genuinely SLS-free, relying on
          traditional soap-making methods and natural ingredients to provide a gentle, nourishing
          wash.
        </p>

        <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">The Healing Soil difference</h2>
        <div className="prose-custom mb-10">
          <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
            Commercial manufacturers often remove the natural glycerin from soap to sell it as a
            separate product. We keep the glycerin in our bars. Glycerin is a humectant that draws
            moisture to the skin, making the act of washing a hydrating experience rather than a
            stripping one.
          </p>
          <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
            By combining SLS-free bases with farm-grown ingredients like neem and tulsi, we create soap
            that respects your skin&apos;s natural balance.
          </p>
        </div>

        {/* Product Grid */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-3xl text-[#1E5631]">Our SLS-free collection</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        <BlogInlineCTA />

        <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">Why switch to SLS-free?</h2>
        <ul className="mb-10 space-y-3 font-sans text-base leading-[1.8] text-[#1A1A14]">
          <li>
            <strong className="font-semibold text-[#1A1A14]">Retains moisture</strong>: cleans
            without stripping natural oils.
          </li>
          <li>
            <strong className="font-semibold text-[#1A1A14]">Gentle on skin</strong>: suitable
            for sensitive or reactive skin types.
          </li>
          <li>
            <strong className="font-semibold text-[#1A1A14]">Natural lather</strong>: experience
            the creamy feel of traditional soap.
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
                Deep dive: The problem with SLS in commercial soap
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
