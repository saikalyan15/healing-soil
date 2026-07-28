import React from 'react'
import BlogInlineCTA from '@/components/BlogInlineCTA'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/products'
import type { CityPage as CityPageType } from '@/data/cities'
import { climateFor, preferredBases, waterNote, humidityNote } from '@/data/climate'

type Props = {
  city: CityPageType
  products: Product[]
}

/** Matches a product's base_type string onto our three base buckets. */
function baseKey(product: Product): 'glycerin' | 'goat-milk' | 'shea-butter' | 'other' {
  const b = (product.base || '').toLowerCase()
  if (b.includes('glycerin') || b.includes('glycerine')) return 'glycerin'
  if (b.includes('goat')) return 'goat-milk'
  if (b.includes('shea')) return 'shea-butter'
  return 'other'
}

/**
 * Four products chosen for the city rather than the whole catalogue.
 *
 * Every city page used to render every in-stock product, roughly 950 words of
 * identical cards around about 105 words of unique copy, which is why the group
 * sat at 85% pairwise overlap. Ordering by the base that suits the local water
 * and climate makes the selection genuinely differ between cities, and it is the
 * same judgement the page's copy is making in words.
 */
function productsForCity(products: Product[], citySlug: string): Product[] {
  const profile = climateFor(citySlug)
  if (!profile) return products.slice(0, 4)

  const order = preferredBases(profile)
  const bySales = (a: Product, b: Product) => b.units_sold - a.units_sold
  const pool = (key: string) => products.filter((p) => baseKey(p) === key).sort(bySales)

  // Quotas rather than a straight sort. Ranking every product by base and taking
  // the top four returned four bars of the same base, because most of the
  // catalogue shares one. Two from the base that suits the city, then one each
  // from the others, so the lead is right and the row still shows range.
  const picked: Product[] = [
    ...pool(order[0]).slice(0, 2),
    ...pool(order[1]).slice(0, 1),
    ...pool(order[2]).slice(0, 1),
  ]

  // Top up if a base is unavailable, so the row never renders short.
  for (const p of [...products].sort(bySales)) {
    if (picked.length >= 4) break
    if (!picked.some((x) => x.id === p.id)) picked.push(p)
  }

  return picked.slice(0, 4)
}

const CityPage: React.FC<Props> = ({ city, products }) => {
  const profile = climateFor(city.slug)
  const shown = productsForCity(products, city.slug)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faqs.map((f) => ({
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
          Which Soap Suits {city.displayName}
        </h1>

        <div className="prose-custom">
          <p className="mb-8 font-sans text-lg leading-relaxed text-[#1A1A14]">
            {city.displayName} is {profile?.seasonNote ?? 'served from our farm in South Goa'}.
            Here is what that means for the bar you pick, and how we ship to {city.state}.
          </p>

          {/* Water and climate, in that order: hard water changes whether a bar
              lathers at all, which matters more day to day than the season. */}
          {profile && (
            <>
              <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">
                Water and climate in {city.displayName}
              </h2>
              <p className="mb-4 font-sans text-base leading-[1.8] text-[#1A1A14]">
                {waterNote(profile)}
              </p>
              <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
                {humidityNote(profile)}
              </p>
            </>
          )}

          <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">
            What we recommend for {city.displayName}
          </h2>
          <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
            {city.climateNote}
          </p>

          <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">How we ship</h2>
          <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
            {city.deliveryNote}
          </p>

          {city.reviewerNote && (
            <div className="mb-10 rounded border-l-4 border-[#C9A84C] bg-[#FFF8E8] p-5 italic text-[#1A1A14]">
              {city.reviewerNote}
            </div>
          )}
        </div>

        <div className="mb-12 border-t border-[#D6CFC4] pt-8">
          <h3 className="mb-6 font-serif text-2xl text-[#1E5631]">Good picks for {city.displayName}</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {shown.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        <BlogInlineCTA />

        {city.faqs.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 font-serif text-3xl text-[#1E5631]">Common questions</h2>
            <div className="space-y-6">
              {city.faqs.map((faq, i) => (
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

export default CityPage
