import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Complete Guide to Handmade Soap in India',
  description:
    'How to choose handmade soap for Indian skin: what SLS and parabens do, how glycerin, goat milk and shea butter bases differ, and how to read a label.',
  alternates: { canonical: '/guide/handmade-soap-india' },
  openGraph: {
    title: 'The Complete Guide to Handmade Soap in India',
    description:
      'How to choose handmade soap for Indian skin: SLS, parabens, glycerin, goat milk, shea butter explained.',
    url: '/guide/handmade-soap-india',
    siteName: 'Healing Soil',
    type: 'article',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Handmade soap guide India' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The complete guide to handmade soap in India',
  description:
    'How to choose handmade soap for Indian skin: what SLS and parabens do, how glycerin, goat milk, and shea butter bases differ, and what to look for on an ingredients label.',
  url: 'https://healingsoil.in/guide/handmade-soap-india',
  author: { '@type': 'Organization', name: 'Healing Soil', url: 'https://healingsoil.in' },
  publisher: {
    '@type': 'Organization',
    name: 'Healing Soil',
    logo: { '@type': 'ImageObject', url: 'https://healingsoil.in/logo.png' },
  },
  datePublished: '2026-04-24',
  dateModified: '2026-04-24',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://healingsoil.in/guide/handmade-soap-india' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between handmade soap and commercial soap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Handmade describes the way a bar is made, not one fixed formula. Compare the complete label, the soap base, and the scent. Healing Soil makes small batches without SLS, parabens, or synthetic fragrance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is SLS and why does it matter for Indian skin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sodium lauryl sulfate (SLS) is a surfactant used in some cleansing products to create fast, dense foam. SLS-free is a label preference, not a complete description of a formula, so compare every ingredient.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which soap base is best for sensitive skin in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Goat milk soap is usually the most versatile starting point for sensitive skin. It contains natural fats that absorb easily, vitamins in their naturally occurring form, and gives a creamy, gentle lather. Glycerin soap is a good alternative for oily or combination skin. Shea butter is the right choice when the skin is very dry.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I read a soap ingredients label in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Check SLS and SLES separately because they are different ingredients. Fragrance may appear as fragrance or parfum, and parabens have names such as methylparaben or propylparaben. A clear, complete list helps you compare formulas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does handmade soap lather less than commercial soap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Handmade soap without SLS produces a lighter, less dense lather than commercial bars. This is not a deficiency — thick foam is produced by SLS, not by effective cleansing. Glycerin and goat milk bases clean the skin without the aggressive foaming agent. Many people who switch from commercial soap initially miss the foam, then find they prefer the way their skin feels after washing without it.',
      },
    },
  ],
}

const blogLinks = [
  { href: '/blog/natural-soap-sensitive-skin-india', label: 'Natural soap for sensitive skin in India: what works and what to avoid' },
  { href: '/blog/glycerin-vs-goat-milk-soap', label: 'Glycerin vs goat milk soap: which suits Indian skin?' },
  { href: '/blog/shea-butter-goat-milk-soap-dry-sensitive-skin', label: 'Shea butter + goat milk soap for dry, sensitive skin' },
  { href: '/blog/understanding-the-benefits-of-shea-butter-in-soap', label: 'Shea butter in soap: what it does and what it cannot' },
  { href: '/blog/goat-milk-soap-benefits', label: 'Goat milk soap: ingredients, lather, and feel' },
  { href: '/blog/neem-tulsi-soap-benefits', label: 'Neem and tulsi soap: what these two ingredients actually do' },
  { href: '/blog/what-makes-soap-chemical-free', label: 'What does "chemical-free soap" actually mean?' },
  { href: '/blog/why-handmade-soap-lasts-longer', label: 'Why our handmade soap lasts longer than you expect' },
  { href: '/blog/why-we-make-soap-in-small-batches', label: 'Why we make soap in small batches' },
]

export default function HandmadeSoapIndiaGuide() {
  return (
    <div className="bg-[#F7F5F0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="mx-auto max-w-[720px] px-4 py-16 sm:px-6">

        {/* Header */}
        <div className="mb-4">
          <span className="rounded-full bg-[#1E5631] px-2.5 py-0.5 font-sans text-[11px] font-medium uppercase tracking-wider text-white">
            Guide
          </span>
        </div>
        <h1 className="mb-4 font-serif text-4xl leading-tight text-[#1E5631] sm:text-5xl">
          The complete guide to handmade soap in India
        </h1>

        <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src="/images/guide/guide-handmade-soap-india.webp"
            alt="Handmade soap bars drying on a wooden rack at the Healing Soil farm in Goa"
            fill
            className="object-cover"
            priority
          />
        </div>

        <p className="mb-10 font-sans text-lg leading-relaxed text-[#666666]">
          What commercial soap does to your skin, how to read a label, which base suits your skin type, and why the soap you use every day matters more than most skincare products combined.
        </p>

        {/* Section 1 */}
        <h2 className="mb-3 mt-10 font-serif text-3xl text-[#1E5631]">
          What commercial soap actually does
        </h2>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Most commercial soap bars in India are not really soap. They are detergent bars — synthetic foaming agents compressed into bar form and sold in packaging that says things like &ldquo;moisturising&rdquo; and &ldquo;gentle.&rdquo;
        </p>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Soap formulas vary widely. Glycerin bases generally create a light, smooth lather; goat milk bases feel creamier; and shea butter bases provide the richest, most conditioning texture.
        </p>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          SLS is one ingredient used in some cleansing products to create fast foam. Healing Soil bars do not contain it, but a useful comparison should still look at the entire formula rather than a single ingredient.
        </p>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Handmade soap keeps the glycerin in. It skips the SLS. The lather is lighter, the feeling after washing is different, and for people who have been reacting to commercial soap for years, the change is often noticeable within a week.
        </p>

        {/* Section 2 */}
        <h2 className="mb-3 mt-10 font-serif text-3xl text-[#1E5631]">
          How to read a soap label
        </h2>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Indian soap labels follow INCI (International Nomenclature of Cosmetic Ingredients) naming, so the same ingredient appears the same way on every pack. Ingredients are listed from highest to lowest concentration. Here is what to look for:
        </p>

        <h3 className="mb-2 mt-8 font-serif text-2xl text-[#1A1A14]">Avoid</h3>
        <ul className="mb-5 list-disc pl-6 font-sans text-base leading-relaxed text-[#1A1A14] space-y-2">
          <li><strong>Sodium Lauryl Sulfate (SLS)</strong> and Sodium Laureth Sulfate (SLES) — different surfactants that should be checked separately.</li>
          <li><strong>Fragrance</strong> or <strong>Parfum</strong> — label terms that describe added scent without always naming each scent material.</li>
          <li><strong>Parabens</strong> — methylparaben, propylparaben, butylparaben. Synthetic preservatives. Lower priority than SLS and fragrance, but a clean label leaves them out.</li>
          <li><strong>Triclosan</strong> — a synthetic additive found in some bars. Worth avoiding where the bar lists it.</li>
        </ul>

        <h3 className="mb-2 mt-8 font-serif text-2xl text-[#1A1A14]">Good signs</h3>
        <ul className="mb-5 list-disc pl-6 font-sans text-base leading-relaxed text-[#1A1A14] space-y-2">
          <li>A short list you can read aloud without stumbling.</li>
          <li>Saponified oils listed by name — saponified coconut oil, saponified olive oil, saponified castor oil.</li>
          <li>Glycerin listed as an ingredient (means it was kept in rather than extracted).</li>
          <li>Named plant extracts — neem leaf extract, tulsi extract — rather than &ldquo;herbal blend&rdquo; or &ldquo;botanical complex.&rdquo;</li>
        </ul>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Read more: <Link href="/blog/what-makes-soap-chemical-free" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">What does &ldquo;chemical-free soap&rdquo; actually mean?</Link> and, if your skin prefers mild products, <Link href="/blog/natural-soap-sensitive-skin-india" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">natural soap for sensitive skin in India</Link>.
        </p>

        {/* Section 3 — Three bases */}
        <h2 className="mb-3 mt-10 font-serif text-3xl text-[#1E5631]">
          The three soap bases and which skin type each suits
        </h2>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Most handmade soap in India is built on one of three bases: glycerin, goat milk, or shea butter. Each behaves differently on skin and suits different needs.
        </p>

        <h3 className="mb-2 mt-8 font-serif text-2xl text-[#1A1A14]">Glycerin — for oily, combination, or normal skin</h3>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Glycerin soap has a light lather and an easy-rinsing feel. Choose it when you want a smooth daily bar without the richness of goat milk or shea butter.
        </p>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Read more: <Link href="/blog/glycerin-vs-goat-milk-soap" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">Glycerin vs goat milk soap: which suits Indian skin?</Link>
        </p>

        <h3 className="mb-2 mt-8 font-serif text-2xl text-[#1A1A14]">Goat milk — for sensitive or dry skin</h3>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Goat milk gives the soap base a creamy texture and a richer lather than glycerin. It is a versatile option suitable for sensitive and dry skin types, as well as anyone who simply prefers a creamier wash.
        </p>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Read more: <Link href="/blog/goat-milk-soap-benefits" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">Goat milk soap: ingredients, lather, and feel</Link> and <Link href="/blog/shea-butter-goat-milk-soap-dry-sensitive-skin" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">Shea butter + goat milk for dry, sensitive skin</Link>.
        </p>

        <h3 className="mb-2 mt-8 font-serif text-2xl text-[#1A1A14]">Shea butter — for very dry, mature, or tight-feeling skin</h3>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Shea butter is the richest of the three bases. The lather is thick and creamy, and the after-wash feel is conditioning. Choose it when you enjoy a fuller texture.
        </p>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Read more: <Link href="/blog/understanding-the-benefits-of-shea-butter-in-soap" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">Shea butter in soap: what it does and what it cannot</Link>
        </p>

        {/* Section 4 — Indian skin + climate */}
        <h2 className="mb-3 mt-10 font-serif text-3xl text-[#1E5631]">
          Indian skin, Indian climate, and why both matter
        </h2>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Indian skin varies significantly across the population — from oily combination skin common in humid coastal regions to dry, reactive skin in drier inland areas. The climate adds its own variables: high humidity in cities like Mumbai, Bangalore, and Goa means skin already manages sweat and heat all day; drier conditions in Delhi or Pune in winter mean the same skin can become tight and reactive by December.
        </p>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          The practical rule: in summer and monsoon, lean toward glycerin or goat milk (lighter bases). In winter or dry months, lean toward goat milk or shea butter (more nourishing). If you are sensitive year-round, goat milk handles the full range better than any other base.
        </p>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Soap storage matters in Indian humidity. Keep the bar dry between washes — a perforated soap dish or a hanging pouch lets water drain away. A bar that sits in a wet dish dissolves faster and grows mushy. Rotate between two bars if possible, letting each one dry completely.
        </p>

        {/* Section 5 — Ingredients with purpose */}
        <h2 className="mb-3 mt-10 font-serif text-3xl text-[#1E5631]">
          Ingredients that come from somewhere
        </h2>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Neem and tulsi have been used in personal care and home routines across India for generations. Both are central to Ayurvedic practice and are grown on our farm in South Goa. In a soap, they contribute a distinctive earthy, herbal scent and a feel that is recognisably traditional. When these ingredients are grown on the farm rather than bought as synthetic extracts, the provenance is traceable.
        </p>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Read more: <Link href="/blog/neem-tulsi-soap-benefits" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">Neem and tulsi soap: what these two ingredients actually do</Link>
        </p>

        {/* Section 6 — Handmade vs industrial */}
        <h2 className="mb-3 mt-10 font-serif text-3xl text-[#1E5631]">
          Why handmade soap behaves differently
        </h2>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Handmade soap is made in small batches and sold without the shelf-life pressure of mass production. Healing Soil bars are melt-and-pour: pre-made bases are melted and hand-poured with botanicals to order, then shipped within days, not held in stock. Each batch is slightly different because natural ingredients are not uniform.
        </p>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          The result is a bar that lasts longer than most people expect — because glycerin-rich, SLS-free bars dissolve more slowly than commercial detergent bars. A single bar used correctly can last four to six weeks. Read more: <Link href="/blog/why-handmade-soap-lasts-longer" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">Why our handmade soap lasts longer than you expect</Link>
        </p>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Small-batch production also means what you receive was made for your order, not sitting in a warehouse for months. Read more: <Link href="/blog/why-we-make-soap-in-small-batches" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">Why we make soap in small batches</Link>
        </p>

        {/* From the farm */}
        <h2 className="mb-3 mt-10 font-serif text-3xl text-[#1E5631]">
          From the farm
        </h2>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          The soap Healing Soil makes starts on a farm in South Goa. The neem and tulsi are grown there. The glycerin and goat milk bases come from a manufacturer used since the start. Everything is melted, hand-poured, and shipped to order. If you want to understand what that looks like in practice, two stories give the full picture:
        </p>
        <ul className="mb-5 list-disc pl-6 font-sans text-base leading-relaxed text-[#1A1A14] space-y-2">
          <li>
            <Link href="/blog/natural-soap-sensitive-skin-india" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">
              Handmade soap for sensitive skin: a gentle label guide
            </Link>{' '}
            — how to compare SLS, parabens, fragrance, soap bases, and after-wash feel.
          </li>
          <li>
            <Link href="/blog/diy-neem-soap-slow-living" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">
              From a sagging neem branch to DIY soap
            </Link>{' '}
            — how a monsoon-bent neem branch turned into a DIY session that stocked the bathroom for three months.
          </li>
        </ul>

        {/* All posts */}
        <h2 className="mb-3 mt-10 font-serif text-3xl text-[#1E5631]">
          Go deeper
        </h2>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Every section of this guide has a detailed companion article.
        </p>
        <ul className="mb-10 space-y-3 font-sans text-base text-[#1A1A14]">
          {blogLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Bundle CTA */}
        <div className="mt-10 rounded-lg border border-[#C9A84C] bg-[#FFF8E8] p-6 text-center">
          <p className="mb-1 font-serif text-2xl text-[#1E5631]">Try the starter bundle</p>
          <p className="mb-1 font-sans text-sm text-[#666666]">
            Four soaps to find the one your skin agrees with. ₹1,000. Free shipping.
          </p>
          <p className="mb-4 font-sans text-xs text-[#999]">Shipped in 2 days. Arrives in 4-7 days depending on your city.</p>
          <Link
            href="/#bundle"
            className="inline-block rounded bg-[#1E5631] px-6 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
          >
            See the starter bundle
          </Link>
        </div>

      </article>
    </div>
  )
}
