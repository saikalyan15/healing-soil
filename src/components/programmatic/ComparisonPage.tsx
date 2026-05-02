import React from 'react'
import Link from 'next/link'
import BlogInlineCTA from '@/components/BlogInlineCTA'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/products'
import type { ComparisonPage as ComparisonPageType } from '@/data/comparisons'

type Props = {
  comparison: ComparisonPageType
  productsA: Product[]
  productsB: Product[]
}

const ComparisonPage: React.FC<Props> = ({ comparison, productsA, productsB }) => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: comparison.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  return (
    <div className="bg-[#F7F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <article className="mx-auto max-w-[720px] px-4 py-16 sm:px-6">
        <h1 className="mb-6 font-serif text-4xl leading-tight text-[#1E5631] sm:text-5xl">
          {comparison.h1}
        </h1>

        <div className="prose-custom">
          {/* Hero section */}
          <p className="mb-8 font-sans text-lg leading-relaxed text-[#1A1A14]">
            {comparison.metaDescription}
          </p>

          {/* Comparison table */}
          <div className="mb-10 overflow-x-auto">
            <table className="w-full border-collapse font-sans text-sm">
              <thead>
                <tr className="bg-[#EAE7DE]">
                  <th className="border border-[#D6CFC4] p-3 text-left text-[#1A1A14]">Feature</th>
                  <th className="border border-[#D6CFC4] p-3 text-left text-[#1A1A14]">{comparison.subjectA.name}</th>
                  <th className="border border-[#D6CFC4] p-3 text-left text-[#1A1A14]">{comparison.subjectB.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[#D6CFC4] p-3 font-medium text-[#1A1A14]">Feel</td>
                  <td className="border border-[#D6CFC4] p-3 text-[#1A1A14]">{comparison.subjectA.feel}</td>
                  <td className="border border-[#D6CFC4] p-3 text-[#1A1A14]">{comparison.subjectB.feel}</td>
                </tr>
                <tr>
                  <td className="border border-[#D6CFC4] p-3 font-medium text-[#1A1A14]">Key Pros</td>
                  <td className="border border-[#D6CFC4] p-3 text-[#1A1A14]">
                    <ul className="list-disc pl-4 space-y-1">
                      {comparison.subjectA.pros.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </td>
                  <td className="border border-[#D6CFC4] p-3 text-[#1A1A14]">
                    <ul className="list-disc pl-4 space-y-1">
                      {comparison.subjectB.pros.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">{comparison.subjectA.name}</h2>
          <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
            {comparison.subjectA.tagline}
          </p>

          <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">{comparison.subjectB.name}</h2>
          <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
            {comparison.subjectB.tagline}
          </p>

          <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">The Verdict</h2>
          <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
            {comparison.verdict}
          </p>
        </div>

        {/* Product grids */}
        <div className="mb-12 border-t border-[#D6CFC4] pt-8">
          <h3 className="mb-6 font-serif text-2xl text-[#1E5631]">{comparison.subjectA.name} range</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {productsA.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {productsB.length > 0 && (
          <div className="mb-12 border-t border-[#D6CFC4] pt-8">
            <h3 className="mb-6 font-serif text-2xl text-[#1E5631]">{comparison.subjectB.name} range</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {productsB.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        <BlogInlineCTA />

        {comparison.faqs.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 font-serif text-3xl text-[#1E5631]">Common questions</h2>
            <div className="space-y-6">
              {comparison.faqs.map((faq, i) => (
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
      </article>
    </div>
  )
}

export default ComparisonPage
