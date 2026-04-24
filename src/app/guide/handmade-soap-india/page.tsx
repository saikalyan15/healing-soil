import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The complete guide to handmade soap in India',
  description:
    'How to choose handmade soap for Indian skin: what SLS and parabens do, how glycerin, goat milk, and shea butter bases differ, and what to look for on an ingredients label.',
  alternates: { canonical: '/guide/handmade-soap-india' },
  openGraph: {
    title: 'The complete guide to handmade soap in India | Healing Soil',
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
        text: 'Commercial soap strips out glycerin during manufacturing because glycerin sells for more as a separate product in creams and lotions. It also adds sodium lauryl sulfate (SLS) to create thick lather. Handmade soap keeps the glycerin in the bar, uses no SLS, and is made in small batches without preservatives or synthetic fragrance. The result is a bar that cleans without stripping the skin barrier.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is SLS and why does it matter for Indian skin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sodium lauryl sulfate (SLS) is a synthetic detergent used in most commercial soaps to create a dense, foamy lather. It strips the skin\'s natural oils with every wash. Indian skin, especially in hot and humid climates, is already under significant daily stress from heat, sweat, and pollution. Avoiding SLS removes one unnecessary daily irritant from the equation.',
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
        text: 'Look for sodium lauryl sulfate (SLS) or sodium laureth sulfate (SLES) near the top of the list — these are synthetic detergents that strip skin oils. Synthetic fragrance is listed as "fragrance" or "parfum" and is a common source of reactions in people with sensitive skin. Parabens appear as methylparaben, propylparaben, or butylparaben. A short, readable ingredients list with names you recognise is a good sign. Ingredients are listed from highest to lowest concentration.',
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
  { href: '/blog/glycerin-vs-goat-milk-soap', label: 'Glycerin vs goat milk soap: which suits Indian skin?' },
  { href: '/blog/shea-butter-goat-milk-soap-dry-sensitive-skin', label: 'Shea butter + goat milk soap for dry, sensitive skin' },
  { href: '/blog/understanding-the-benefits-of-shea-butter-in-soap', label: 'Shea butter in soap: what it does and what it cannot' },
  { href: '/blog/what-makes-goat-milk-soap-beneficial-for-sensitive-skin', label: 'What makes goat milk soap beneficial for sensitive skin' },
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
          The process that makes real soap also produces glycerin, a humectant that draws moisture into the skin. Commercial manufacturers remove it because glycerin sells for more as a separate product — in face creams, lotions, and serums. What is left is a bar stripped of the thing that made it gentle.
        </p>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          To replace the cleansing power and create dense foam, sodium lauryl sulfate (SLS) is added. SLS is effective at cleaning, but it does not distinguish between dirt and the natural oils your skin needs. It strips both. For skin that is already dry or sensitive, every wash with an SLS bar is a small act of damage.
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
          <li><strong>Sodium Lauryl Sulfate (SLS)</strong> or Sodium Laureth Sulfate (SLES) — the primary synthetic detergent in most commercial bars. Strips natural skin oils with every wash.</li>
          <li><strong>Fragrance</strong> or <strong>Parfum</strong> — synthetic fragrance compounds grouped under one word. A common source of reactions for people with sensitive skin. Even bars marketed as &ldquo;gentle&rdquo; often contain it.</li>
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
          Read more: <Link href="/blog/what-makes-soap-chemical-free" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">What does &ldquo;chemical-free soap&rdquo; actually mean?</Link>
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
          Glycerin is a natural byproduct of soap-making. When it stays in the bar, it draws moisture gently into the skin as you wash. The lather is light. The feeling after washing is clean without heaviness. This is the right base if your skin produces enough of its own oil and you want cleansing without adding weight. It is also a good everyday bar for normal skin in warmer months.
        </p>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Read more: <Link href="/blog/glycerin-vs-goat-milk-soap" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">Glycerin vs goat milk soap: which suits Indian skin?</Link>
        </p>

        <h3 className="mb-2 mt-8 font-serif text-2xl text-[#1A1A14]">Goat milk — for sensitive or dry skin</h3>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Goat milk replaces water in the soap base. It contains natural fats that skin absorbs easily and vitamins in the form they occur naturally in milk. The bar feels creamy. After washing, skin feels nourished rather than just clean. Goat milk is the most versatile base: it suits sensitive skin, dry skin, and anyone switching from commercial soap for the first time.
        </p>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Read more: <Link href="/blog/what-makes-goat-milk-soap-beneficial-for-sensitive-skin" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">What makes goat milk soap beneficial for sensitive skin</Link> and <Link href="/blog/shea-butter-goat-milk-soap-dry-sensitive-skin" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">Shea butter + goat milk for dry, sensitive skin</Link>.
        </p>

        <h3 className="mb-2 mt-8 font-serif text-2xl text-[#1A1A14]">Shea butter — for very dry, mature, or tight-feeling skin</h3>
        <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]">
          Shea butter is the most nourishing of the three. Part of it does not break down during soap-making, so it stays in the bar and deposits on your skin when you wash. The lather is thick and creamy. After washing, skin feels conditioned rather than stripped. It is too rich for oily skin.
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
          Handmade soap is made in small batches, cured for several weeks, and sold without the shelf-life pressure of mass production. The process is slower by design. Each batch is slightly different because natural ingredients are not uniform.
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
          The soap Healing Soil makes starts on a farm in South Goa. The neem and tulsi are grown there. The glycerin and goat milk bases come from a manufacturer used since the start. Everything is combined, cured, and shipped to order. If you want to understand what that looks like in practice, two stories give the full picture:
        </p>
        <ul className="mb-5 list-disc pl-6 font-sans text-base leading-relaxed text-[#1A1A14] space-y-2">
          <li>
            <Link href="/stories/handmade-soap-sensitive-skin" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">
              Handmade soap for sensitive skin: why commercial bars irritate
            </Link>{' '}
            — what we learned after moving to a farm about SLS, parabens, and why removing a daily irritant is often all sensitive skin needs.
          </li>
          <li>
            <Link href="/stories/diy-neem-soap-slow-living" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">
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
          <p className="mb-4 font-sans text-xs text-[#999]">Shipped in 4 days. Arrives in 3 to 7 days depending on your city.</p>
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
