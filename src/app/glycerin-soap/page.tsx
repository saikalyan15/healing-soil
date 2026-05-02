import type { Metadata } from 'next'
import Link from 'next/link'
import { getProducts } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import BlogInlineCTA from '@/components/BlogInlineCTA'

export const metadata: Metadata = {
  title: 'Glycerin Soap: Handmade in Goa | Healing Soil',
  description:
    'Small batch glycerin soap made in Goa. Retains natural glycerin for a gentle, humectant wash. Suited to oily and normal skin. No SLS or parabens.',
  alternates: { canonical: '/glycerin-soap' },
  openGraph: {
    title: 'Glycerin Soap: Handmade in Goa | Healing Soil',
    description:
      'Small batch glycerin soap made in Goa. Retains natural glycerin for a gentle, humectant wash.',
    url: '/glycerin-soap',
    siteName: 'Healing Soil',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Glycerin soap handmade in Goa' }],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is glycerin soap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Glycerin soap is made with a base that retains its natural glycerin, a byproduct of the soap-making process. Glycerin is a humectant, meaning it draws moisture to the skin, providing a gentle wash that does not feel heavy or greasy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is glycerin retained in your soap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commercial soap manufacturers often remove glycerin to sell it separately for use in lotions and creams. At Healing Soil, we keep the glycerin in the bar, ensuring that every wash provides a moisturising feel that commercial "detergent bars" often lack.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is glycerin soap good for oily skin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, glycerin soap is an excellent choice for oily or combination skin. It cleanses effectively without leaving a heavy residue, making it ideal for those who want a fresh, clean feel after washing.',
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
      name: 'Glycerin Soap',
      item: 'https://healingsoil.in/glycerin-soap',
    },
  ],
}

export default async function GlycerinSoapPage() {
  const allProducts = await getProducts()
  const products = allProducts.filter((p) => p.base === 'Glycerine')

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
          Glycerin soap
        </h1>

        <p className="mb-5 font-sans text-lg leading-relaxed text-[#1A1A14]">
          Glycerin is one of the most effective natural humectants in skin care. While many commercial
          soaps remove it, our handmade glycerin bars keep it right where it belongs: in the soap.
        </p>

        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          The result is a wash that feels distinctly different. Glycerin draws moisture from the air
          to the skin, helping to keep it hydrated even after you rinse. This makes glycerin soap a
          practical daily choice for those who want a gentle cleanse without the richness of shea
          butter or goat milk.
        </p>

        <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Our glycerin soap is made in small batches in Goa, ensuring a high-quality, SLS-free bar that
          suits most skin types.
        </p>

        <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">Who it suits</h2>
        <ul className="mb-10 space-y-3 font-sans text-base leading-[1.8] text-[#1A1A14]">
          <li>
            <strong className="font-semibold text-[#1A1A14]">Oily skin</strong>: provides a thorough
            clean without adding heavy oils or fats.
          </li>
          <li>
            <strong className="font-semibold text-[#1A1A14]">Combination skin</strong>: balances
            cleansing with humectant properties for different skin zones.
          </li>
          <li>
            <strong className="font-semibold text-[#1A1A14]">Normal skin</strong>: an ideal everyday
            bar for those who want a light, fresh feel.
          </li>
        </ul>

        {/* Product Grid */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-3xl text-[#1E5631]">Our glycerin soaps</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        <BlogInlineCTA />

        <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">The glycerin difference</h2>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Most people are surprised to learn that commercial soap is often actually a
          synthetic detergent bar. During the manufacturing process, the natural glycerin is stripped
          out and sold as a separate, high-value ingredient.
        </p>

        <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Healing Soil glycerin soap retains this natural byproduct. Because glycerin is clear, it
          gives our bars a jewel-like appearance, but its real value is in how it makes your skin
          feel: clean, hydrated, and soft.
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
