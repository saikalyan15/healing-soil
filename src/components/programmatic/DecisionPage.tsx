import React from 'react'
import Link from 'next/link'
import BlogInlineCTA from '@/components/BlogInlineCTA'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/products'
import type { DecisionPage as DecisionPageType } from '@/data/decisions'
import { comparisons } from '@/data/comparisons'

type Props = {
  decision: DecisionPageType
  products: Product[]
}

const DecisionPage: React.FC<Props> = ({ decision, products }) => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: decision.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  const relatedComparisonPages = comparisons.filter(c =>
    decision.relatedComparisons.includes(c.slug) && c.publishedAt !== null
  )

  // First in-stock product in the decision's own priority order
  const primaryProduct = decision.recommendedProducts
    .map((slug) => products.find((p) => p.slug === slug))
    .find(Boolean)

  return (
    <div className="bg-[#F7F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="mx-auto max-w-[720px] px-4 py-16 sm:px-6">

        <h1 className="mb-6 font-serif text-4xl leading-tight text-[#1E5631] sm:text-5xl">
          {decision.h1}
        </h1>

        <p className="mb-8 font-sans text-lg leading-relaxed text-[#1A1A14]">
          {decision.intro}
        </p>

        {/* Recommendation callout */}
        <div className="mb-10 rounded-lg border border-[#C9A84C] bg-[#FFF8E8] p-6">
          <p className="mb-1 font-sans text-xs font-medium uppercase tracking-wider text-[#C9A84C]">
            Our recommendation
          </p>
          <p className="mb-2 font-serif text-2xl text-[#1E5631]">
            {decision.primaryBase} Base
          </p>
          <p className="font-sans text-base leading-relaxed text-[#1A1A14]">
            {decision.recommendation}
          </p>
          {primaryProduct && (
            <Link
              href={`/shop/${primaryProduct.slug}`}
              className="mt-4 inline-block rounded-md bg-[#1E5631] px-5 py-2.5 font-sans text-sm font-medium text-white hover:bg-[#174427]"
            >
              Start with {primaryProduct.name}
            </Link>
          )}
        </div>

        {/* Products */}
        {products.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 font-serif text-3xl text-[#1E5631]">Shop these soaps</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        <BlogInlineCTA />

        {/* Comparison links */}
        {relatedComparisonPages.length > 0 && (
          <div className="mt-10 border-t border-[#D6CFC4] pt-8">
            <h2 className="mb-4 font-serif text-2xl text-[#1E5631]">Compare the bases</h2>
            <ul className="space-y-2">
              {relatedComparisonPages.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={c.canonicalOverride ?? `/compare/${c.slug}`}
                    className="font-sans text-sm text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQs */}
        {decision.faqs.length > 0 && (
          <div className="mt-12 border-t border-[#D6CFC4] pt-8">
            <h2 className="mb-6 font-serif text-3xl text-[#1E5631]">Common questions</h2>
            <div className="space-y-6">
              {decision.faqs.map((faq, i) => (
                <div key={i}>
                  <p className="mb-2 font-sans text-base font-semibold text-[#1A1A14]">
                    {faq.q}
                  </p>
                  <p className="font-sans text-base leading-[1.8] text-[#1A1A14]">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mt-10 font-sans text-sm text-[#999]">
          Not sure which base to start with?{' '}
          <Link href="/guide/handmade-soap-india" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">
            Read our complete guide to handmade soap in India.
          </Link>
        </p>

      </article>
    </div>
  )
}

export default DecisionPage
