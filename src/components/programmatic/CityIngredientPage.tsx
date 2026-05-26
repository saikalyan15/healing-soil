import React from 'react'
import Link from 'next/link'
import BlogInlineCTA from '@/components/BlogInlineCTA'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/products'
import type { CityPage } from '@/data/cities'
import type { IngredientPage } from '@/data/ingredients'

type Props = {
  city: CityPage
  ingredient: IngredientPage
  products: Product[]
}

const CityIngredientPage: React.FC<Props> = ({ city, ingredient, products }) => {
  const faqs = [
    {
      q: `How long does delivery of ${ingredient.name} soap to ${city.displayName} take?`,
      a: city.faqs.find((f) => f.q.toLowerCase().includes('long') || f.q.toLowerCase().includes('deliver'))?.a ??
        `We ship from our workshop in South Goa. Delivery to ${city.displayName} typically arrives within a few business days of dispatch.`,
    },
    {
      q: `What does ${ingredient.name} soap feel like?`,
      a: ingredient.feel,
    },
    {
      q: `Is your ${ingredient.name} soap SLS-free?`,
      a: `Yes, all Healing Soil soaps are made without SLS, parabens, or synthetic fragrances. Our ${ingredient.name.toLowerCase()} soap is suitable for sensitive skin and daily use.`,
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://healingsoil.in' },
      { '@type': 'ListItem', position: 2, name: `Soap in ${city.displayName}`, item: `https://healingsoil.in/soap/${city.slug}` },
      { '@type': 'ListItem', position: 3, name: `${ingredient.name} Soap`, item: `https://healingsoil.in/soap/${city.slug}/${ingredient.slug}` },
    ],
  }

  const relatedProducts = products.filter((p) => ingredient.relatedProducts.includes(p.slug))
  const displayProducts = relatedProducts.length > 0 ? relatedProducts : products.filter((p) => p.in_stock).slice(0, 4)

  return (
    <div className="bg-[#F7F5F0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="mx-auto max-w-[720px] px-4 py-16 sm:px-6">
        <nav className="mb-8 font-sans text-sm text-[#6B6B5A]">
          <Link href="/" className="hover:text-[#1E5631]">Home</Link>
          <span className="mx-2">›</span>
          <Link href={`/soap/${city.slug}`} className="hover:text-[#1E5631]">
            Soap in {city.displayName}
          </Link>
          <span className="mx-2">›</span>
          <span>{ingredient.name} Soap</span>
        </nav>

        <h1 className="mb-6 font-serif text-4xl leading-tight text-[#1E5631] sm:text-5xl">
          {ingredient.name} Soap Delivered to {city.displayName}
        </h1>

        <p className="mb-6 font-sans text-lg leading-relaxed text-[#1A1A14]">
          {ingredient.name} soap, made in small batches on our farm in South Goa, shipped directly to {city.displayName}, {city.state}. No SLS, no parabens, no synthetic fragrance.
        </p>

        <p className="mb-10 font-sans text-base leading-[1.8] text-[#4A4A3A]">
          {city.climateNote}
        </p>

        <div className="prose-custom">
          <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">About {ingredient.name}</h2>
          <p className="mb-4 font-sans text-base leading-[1.8] text-[#1A1A14]">{ingredient.tagline}</p>
          <p className="mb-4 font-sans text-base leading-[1.8] text-[#1A1A14]">{ingredient.traditionalUse}</p>
          <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">{ingredient.feel}</p>

          <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">Delivery to {city.displayName}</h2>
          <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">{city.deliveryNote}</p>

          {city.reviewerNote && (
            <div className="mb-10 rounded border-l-4 border-[#C9A84C] bg-[#FFF8E8] p-5 italic text-[#1A1A14]">
              {city.reviewerNote}
            </div>
          )}
        </div>

        <div className="mb-12 border-t border-[#D6CFC4] pt-8">
          <h3 className="mb-6 font-serif text-2xl text-[#1E5631]">
            {ingredient.name} soaps from our collection
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {displayProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        <BlogInlineCTA />

        <div className="mt-12">
          <h2 className="mb-6 font-serif text-3xl text-[#1E5631]">Common questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i}>
                <p className="mb-2 font-sans text-base font-semibold text-[#1A1A14]">{faq.q}</p>
                <p className="font-sans text-base leading-[1.8] text-[#1A1A14]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-[#D6CFC4] pt-8">
          <p className="font-sans text-sm text-[#6B6B5A]">
            Also see:{' '}
            <Link href={`/soap/${city.slug}`} className="text-[#1E5631] hover:underline">
              All soaps delivered to {city.displayName}
            </Link>
            {' · '}
            <Link href={`/ingredient/${ingredient.slug}`} className="text-[#1E5631] hover:underline">
              About {ingredient.name} in soap
            </Link>
          </p>
        </div>
      </article>
    </div>
  )
}

export default CityIngredientPage
