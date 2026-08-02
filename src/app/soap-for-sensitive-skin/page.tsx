import type { Metadata } from 'next'
import Link from 'next/link'
import { getProducts } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import BlogInlineCTA from '@/components/BlogInlineCTA'

export const metadata: Metadata = {
  title: 'Soap for Sensitive Skin: Made in Goa | Healing Soil',
  description:
    'Gentle, SLS-free soap suited to sensitive skin. Made in small batches in Goa with natural ingredients like goat milk and shea butter. No synthetic fragrance.',
  alternates: { canonical: '/soap-for-sensitive-skin' },
  openGraph: {
    title: 'Soap for Sensitive Skin: Made in Goa | Healing Soil',
    description:
      'Gentle, SLS-free soap suited to sensitive skin. Made in small batches in Goa with natural ingredients.',
    url: '/soap-for-sensitive-skin',
    siteName: 'Healing Soil',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Soap for sensitive skin handmade in Goa' }],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What soap is best for sensitive skin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no universal best soap. Start with a clear ingredient list, a gentle lather, and a bar made without SLS, parabens, or synthetic fragrance. Patch test before regular use.',
      },
    },
    {
      '@type': 'Question',
      name: 'What ingredients should I avoid if I have sensitive skin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sensitivity is individual. Check the complete label for ingredients you already know you avoid, and introduce one new product at a time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is your soap suitable for sensitive skin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all Healing Soil soaps are designed to be gentle and are suitable for sensitive skin. We use no SLS, parabens, or synthetic fragrances, and our small-batch process ensures the natural glycerin is retained in every bar.',
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
      name: 'Soap for Sensitive Skin',
      item: 'https://healingsoil.in/soap-for-sensitive-skin',
    },
  ],
}

export default async function SoapForSensitiveSkinPage() {
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
          Soap for sensitive skin
        </h1>

        <p className="mb-5 font-sans text-lg leading-relaxed text-[#1A1A14]">
          Sensitive skin often prefers a simple routine: a clear ingredient list, a mild lather, and
          one new product at a time. The soap base also changes how rich or light the wash feels.
        </p>

        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Healing Soil bars are made in small batches without SLS, parabens, or synthetic fragrance.
          Goat milk gives a creamy lather, shea butter feels richer, and glycerin is the lightest option.
        </p>

        <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
          By retaining the natural glycerin and using nourishing bases like goat milk and shea
          butter, we create bars that clean gently while leaving a moisturising feel.
        </p>

        <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">What to look for</h2>
        <ul className="mb-10 space-y-3 font-sans text-base leading-[1.8] text-[#1A1A14]">
          <li>
            <strong className="font-semibold text-[#1A1A14]">SLS-Free</strong>: avoid synthetic
            foaming agents if that is your label preference.
          </li>
          <li>
            <strong className="font-semibold text-[#1A1A14]">Fragrance-Free</strong>: we use no
            synthetic perfumes, for a quieter scent profile.
          </li>
          <li>
            <strong className="font-semibold text-[#1A1A14]">Glycerin-Retained</strong>: natural
            glycerin contributes a smooth, light lather.
          </li>
        </ul>

        {/* Product Grid */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-3xl text-[#1E5631]">Recommended for sensitive skin</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        <BlogInlineCTA />

        <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">Our making process</h2>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Every bar of Healing Soil soap is melted and hand-poured to order in Goa. This means we
          don&apos;t need to use heavy synthetic preservatives to ensure a multi-year shelf life. The
          soap you receive was made within days of your order and is ready to provide a gentle,
          natural wash.
        </p>

        <p className="mb-10 font-sans text-base leading-[1.8] text-[#1A1A14]">
          We source our ingredients carefully, from the goat milk used in our most popular base to
          the neem and tulsi grown on our farm. Always check the product label and patch test if your
          skin is sensitive.
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
                href="/blog/natural-soap-sensitive-skin-india"
                className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]"
              >
                Choosing natural soap for sensitive skin in India
              </Link>
            </li>
            <li>
              <Link
                href="/goat-milk-soap"
                className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]"
              >
                Why goat milk is traditionally used for sensitive skin
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </div>
  )
}
