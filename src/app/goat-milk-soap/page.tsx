import type { Metadata } from 'next'
import Link from 'next/link'
import { getProducts } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import BlogInlineCTA from '@/components/BlogInlineCTA'

export const metadata: Metadata = {
  title: 'Goat Milk Soap: Handmade in Goa | Healing Soil',
  description:
    'Creamy, nourishing goat milk soap made in small batches in Goa. Suited to sensitive and dry skin. No SLS, parabens, or synthetic fragrance.',
  alternates: { canonical: '/goat-milk-soap' },
  openGraph: {
    title: 'Goat Milk Soap: Handmade in Goa | Healing Soil',
    description:
      'Creamy, nourishing goat milk soap made in small batches in Goa. Suited to sensitive and dry skin.',
    url: '/goat-milk-soap',
    siteName: 'Healing Soil',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Goat milk soap handmade in Goa' }],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is goat milk soap good for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Goat milk soap is valued for its gentle cleansing and nourishing feel. It contains natural fats that help keep skin from feeling stripped after washing, making it a versatile choice for daily personal care.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is goat milk soap good for sensitive skin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, goat milk soap is traditionally used in personal care for sensitive skin. Its pH is closer to the skin\'s natural range than many commercial soaps, and it provides a creamy lather that feels gentle on the skin.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Healing Soil goat milk soap different from store-bought soap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unlike many commercial soaps, Healing Soil goat milk soap is made in small batches in Goa without SLS or parabens. We use a goat milk base that retains its natural vitamins and fats, providing a creamier lather and a softer feel on the skin.',
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
      name: 'Goat Milk Soap',
      item: 'https://healingsoil.in/goat-milk-soap',
    },
  ],
}

export default async function GoatMilkSoapPage() {
  const allProducts = await getProducts()
  const products = allProducts.filter((p) => p.base === 'Goat Milk')

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
          Goat milk soap
        </h1>

        <p className="mb-5 font-sans text-lg leading-relaxed text-[#1A1A14]">
          Goat milk soap is one of the most versatile choices for natural skin care. Known for its
          creamy lather and nourishing feel, it has been a staple in traditional personal care for
          centuries.
        </p>

        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          The secret lies in the natural fats and vitamins present in goat milk. These components
          survive the soap-making process and help to moisturise the skin while you wash. When you use
          a goat milk bar, you notice a softer, creamier lather that cleans without the tight, dry
          feeling often associated with commercial soap.
        </p>

        <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Our goat milk soap is made in small batches in Goa, ensuring that every bar is cured to
          perfection before it reaches you. We use no SLS or synthetic fragrances, relying instead on
          the natural goodness of our ingredients.
        </p>

        <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">Who it suits</h2>
        <ul className="mb-10 space-y-3 font-sans text-base leading-[1.8] text-[#1A1A14]">
          <li>
            <strong className="font-semibold text-[#1A1A14]">Sensitive skin</strong>: goat milk is
            traditionally preferred for those whose skin reacts easily to harsh chemicals.
          </li>
          <li>
            <strong className="font-semibold text-[#1A1A14]">Dry skin</strong>: the natural fats in
            the milk provide a moisturising feel that helps with seasonal or persistent dryness.
          </li>
          <li>
            <strong className="font-semibold text-[#1A1A14]">Daily use</strong>: gentle enough for
            the face and body, making it a practical choice for the whole family.
          </li>
        </ul>

        {/* Product Grid */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-3xl text-[#1E5631]">Our goat milk soaps</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        <BlogInlineCTA />

        <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">What makes it different</h2>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Commercial soaps often rely on SLS (Sodium Lauryl Sulfate) to create foam. While effective at
          cleaning, SLS can be harsh on the skin, stripping away its natural oils. Goat milk soap
          creates a natural, creamy lather without the need for these synthetic detergents.
        </p>

        <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
          By retaining the natural glycerin that forms during soap-making, we ensure that our bars
          provide a gentle wash that leaves skin feeling soft and conditioned.
        </p>

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
                href="/blog/glycerin-vs-goat-milk-soap"
                className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]"
              >
                Glycerin vs Goat Milk Soap: Which suits you?
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
