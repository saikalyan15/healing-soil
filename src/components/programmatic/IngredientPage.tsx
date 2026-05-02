import React from 'react'
import BlogInlineCTA from '@/components/BlogInlineCTA'
import type { IngredientPage as IngredientPageType } from '@/data/ingredients'

type Props = {
  ingredient: IngredientPageType
}

const IngredientPage: React.FC<Props> = ({ ingredient }) => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ingredient.faqs.map((f) => ({
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
          {ingredient.name} in Handmade Soap
        </h1>

        <div className="prose-custom">
          <p className="mb-5 font-sans text-lg leading-relaxed text-[#1A1A14]">
            {ingredient.tagline}
          </p>

          <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">Origin</h2>
          <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
            {ingredient.origin}
          </p>

          <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">Traditional Use</h2>
          <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
            {ingredient.traditionalUse}
          </p>

          <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">What it feels like</h2>
          <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
            {ingredient.feel}
          </p>
        </div>

        <div className="mb-10 border-t border-[#D6CFC4] pt-8">
          <p className="mb-4 font-sans text-sm font-medium text-[#1A1A14]">Products containing {ingredient.name}</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
             {/* Stub for related products */}
             <div className="rounded border border-[#D6CFC4] p-4 text-center text-sm text-[#666]">
               Product Grid
             </div>
          </div>
        </div>

        <BlogInlineCTA />

        {ingredient.faqs.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 font-serif text-3xl text-[#1E5631]">Common questions</h2>
            <div className="space-y-6">
              {ingredient.faqs.map((faq, i) => (
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

export default IngredientPage
