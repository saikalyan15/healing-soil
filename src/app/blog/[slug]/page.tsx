import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MDXContent } from '@/components/MDXContent'
import { getAllPosts, getPostBySlugFromEither } from '@/lib/blog'
import { buildTitle, buildDescription, absoluteUrl, ORGANIZATION_ID, WEBSITE_ID } from '@/lib/seo'
import { canonicalSlugFor } from '@/lib/product-slugs'
import { getProducts } from '@/lib/products'
import RandomReview from '@/components/RandomReview'
import StoryCTA from '@/components/StoryCTA'
import BlogInlineCTA from '@/components/BlogInlineCTA'
import ProductCard from '@/components/ProductCard'
import CommerceOnly from '@/components/CommerceOnly'
import { COMMERCE_ENABLED } from '@/lib/site-mode'

type Props = { params: Promise<{ slug: string }> }

// ─── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

// ─── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlugFromEither(slug)
  if (!post) return {}
  // Posts without seoTitle/seoDescription fall back to the editorial title and
  // excerpt, which run long. buildTitle/buildDescription clamp them to budget.
  const metaTitle = buildTitle(post.seoTitle ?? post.title)
  const metaDescription = buildDescription(post.seoDescription ?? post.excerpt)
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `/blog/${slug}`,
      siteName: 'Healing Soil',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.featuredImage || '/og-image.jpg', width: 1200, height: 630, alt: post.title }],
    },
  }
}

// ─── MDX components ────────────────────────────────────────────────────────────

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-4 font-serif text-4xl leading-tight text-[#1E5631]" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mb-3 mt-10 font-serif text-3xl text-[#1E5631]" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mb-2 mt-8 font-serif text-2xl text-[#1A1A14]" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-5 font-sans text-base leading-[1.8] text-[#1A1A14]" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-5 list-disc pl-6 font-sans text-base leading-relaxed text-[#1A1A14] space-y-1" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-5 list-decimal pl-6 font-sans text-base leading-relaxed text-[#1A1A14] space-y-1" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="font-sans text-base text-[#1A1A14]" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-[#C9A84C] pl-5 font-serif text-xl italic text-[#1A1A14]"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-[#1A1A14]" {...props} />
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    // Storefront closed: inline links to shop / bundle written into old posts
    // become plain text rather than pointing at redirected routes.
    const toStorefront =
      typeof href === 'string' &&
      (href.startsWith('/shop') || href === '/#bundle' || href === '#bundle' || href.startsWith('/order'))
    if (!COMMERCE_ENABLED && toStorefront) {
      return <span {...props}>{children}</span>
    }
    return (
      <a
        href={href}
        className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]"
        {...props}
      >
        {children}
      </a>
    )
  },
  hr: () => <hr className="my-10 border-[#D6CFC4]" />,
}

// ─── Date helper ───────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ─── Per-post product links ────────────────────────────────────────────────────

const relatedProductsBySlug: Record<string, string[]> = {
  'goat-milk-soap-benefits': ['neem-tulsi-goat-milk-soap', 'kesar-haldi-papaya-cucumber-soap', 'honey-oats-goat-milk-soap'],
  'goat-milk-soap-base-vs-glycerin-soap-base': ['honey-oats-glycerin-soap', 'neem-tulsi-goat-milk-soap', 'honey-oats-goat-milk-soap'],
  'glycerin-vs-goat-milk-soap': ['honey-oats-glycerin-soap', 'neem-tulsi-goat-milk-soap', 'neem-tulsi-glycerin-soap'],
  'what-makes-goat-milk-soap-beneficial-for-sensitive-skin': ['neem-tulsi-goat-milk-soap', 'kesar-haldi-papaya-cucumber-soap'],
  'shea-butter-goat-milk-soap-dry-sensitive-skin': ['shea-butter-kesar-gulab', 'honey-kesar-haldi-shea-butter-soap', 'neem-tulsi-goat-milk-soap'],
  'understanding-the-benefits-of-shea-butter-in-soap': ['shea-butter-kesar-gulab', 'honey-kesar-haldi-shea-butter-soap'],
  'neem-tulsi-soap-benefits': ['neem-tulsi-goat-milk-soap', 'neem-tulsi-glycerin-soap'],
  'garden-to-bar-marigold-soap': ['marigold-soap'],
  'pomegranate-peel-soap': ['pomegranate-goat-milk-soap', 'pomegranate-glycerin-soap'],
  'sls-free-soap-india': ['neem-tulsi-goat-milk-soap', 'honey-oats-glycerin-soap', 'shea-butter-kesar-gulab'],
  'sls-parabens-soap-india': ['neem-tulsi-goat-milk-soap', 'honey-oats-glycerin-soap', 'shea-butter-kesar-gulab'],
  'natural-soap-sensitive-skin-india': ['neem-tulsi-goat-milk-soap', 'kesar-haldi-papaya-cucumber-soap', 'honey-oats-goat-milk-soap'],
  'handmade-soap-bangalore': ['neem-tulsi-goat-milk-soap', 'honey-oats-glycerin-soap', 'kesar-haldi-papaya-cucumber-soap'],
  'handmade-soap-goa': ['neem-tulsi-goat-milk-soap', 'honey-oats-glycerin-soap', 'shea-butter-kesar-gulab'],
  'why-handmade-soap-lasts-longer': ['neem-tulsi-goat-milk-soap', 'honey-oats-glycerin-soap', 'shea-butter-kesar-gulab'],
  'why-we-make-soap-in-small-batches': ['neem-tulsi-goat-milk-soap', 'kesar-haldi-papaya-cucumber-soap', 'honey-oats-glycerin-soap'],
  'best-soap-for-rainy-season-india': ['neem-tulsi-glycerin-soap', 'neem-tulsi-goat-milk-soap', 'kesar-haldi-papaya-cucumber-soap'],
  'small-travel-soap-bars-india': ['travel-soaps', 'honey-oats-glycerin-soap', 'neem-tulsi-glycerin-soap'],
  'marigold-soap-benefits': ['marigold-soap', 'red-rose-soap', 'shea-butter-kesar-gulab'],
  'pomegranate-soap-benefits': ['pomegranate-goat-milk-soap', 'pomegranate-glycerin-soap', 'orange-goat-milk-soap'],
  'loofah-soap-benefits-and-how-to-use': ['loofah-soaps', 'honey-oats-glycerin-soap', 'neem-tulsi-glycerin-soap'],
}

const relatedReadingBySlug: Record<string, Array<{ href: string; label: string }>> = {
  'monsoon-gardening-5-sustainable-ways-to-protect-your-plants-from-heavy-rain': [
    {
      href: '/our-story',
      label: 'How Healing Soil moved from Bangalore to a farm in South Goa',
    },
    {
      href: '/blog/diy-neem-soap-slow-living',
      label: 'How a monsoon-bent neem branch became a slow-living farm project',
    },
  ],
}

// ─── FAQ mapping ───────────────────────────────────────────────────────────────

const faqsBySlug: Record<string, Array<{ question: string; answer: string }>> = {
  'glycerin-vs-goat-milk-soap': [
    {
      question: 'What is the difference between glycerin and goat milk soap base?',
      answer: 'Glycerin soap has a light, easy-rinsing lather and a smooth feel. Goat milk soap has a creamier lather and a richer after-wash feel. Both Healing Soil bases are made without SLS, parabens, or synthetic fragrance.',
    },
    {
      question: 'Which base feels lighter?',
      answer: 'Glycerin is the lighter-feeling option. Choose goat milk when you prefer a creamy texture and a more nourishing feel after rinsing.',
    },
    {
      question: 'Can I try both bases?',
      answer: 'Yes. Some people prefer glycerin in humid weather and goat milk when they want a richer wash. A draining soap dish helps either bar dry between uses.',
    },
  ],
  'shea-butter-goat-milk-soap-dry-sensitive-skin': [
    {
      question: 'How do shea butter and goat milk soap feel different?',
      answer: 'Shea butter is the richest-feeling base in the range. Goat milk is creamy but lighter. Both make a gentle lather and are available without SLS, parabens, or synthetic fragrance.',
    },
    {
      question: 'How do I choose between shea butter and goat milk soap?',
      answer: 'Choose shea butter when you enjoy a rich, conditioning wash. Choose goat milk when you want a creamy lather with a lighter finish. Both are suitable options for sensitive skin.',
    },
  ],
  'understanding-the-benefits-of-shea-butter-in-soap': [
    {
      question: 'What does shea butter add to soap?',
      answer: 'Shea butter gives the bar a rich, creamy texture and a conditioning after-wash feel. It is the fullest-feeling of Healing Soil\'s three soap bases.',
    },
    {
      question: 'What is shea butter?',
      answer: 'Shea butter is a plant fat pressed from the nut of the shea tree, Vitellaria paradoxa. Soap makers use it to create a richer bar with a creamy lather.',
    },
    {
      question: 'Who might prefer shea butter soap?',
      answer: 'It suits people who enjoy a rich lather and want their skin to feel soft after washing. If you prefer a lighter rinse, compare it with glycerin or goat milk soap.',
    },
  ],
  'handmade-soap-goa': [
    {
      question: 'Is Healing Soil soap actually made in Goa?',
      answer: 'Yes. The soap is melted and hand-poured in Goa. The soap bases — glycerin, goat milk, shea butter — are sourced from a manufacturer we have worked with consistently. The botanicals we describe as farm-grown, neem and tulsi, are grown on our property in Goa, dried under the sun there, and added by hand to each batch.',
    },
    {
      question: 'What does small-batch soap mean?',
      answer: 'Small-batch means the batch size is small enough that the soap does not need a long shelf life engineered through preservatives and synthetic stabilisers. We make to order: when you place an order, we melt and hand-pour the bar and ship it within about two days. The bar you receive was made for your order, not sourced from stock that has been sitting in a warehouse.',
    },
    {
      question: 'Can handmade soap from Goa be shipped across India?',
      answer: 'Yes. Healing Soil ships pan-India. Shipped in 2 days from Goa. Arrives in 4-7 days depending on your city. Shipping is free on orders of ₹1,000 and above.',
    },
    {
      question: 'What is the difference between farm-grown and sourced ingredients in handmade soap?',
      answer: 'Farm-grown means the ingredient was grown on our property in Goa and added directly to the batch. Sourced means it was purchased from a supplier. We are specific about which is which: the soap bases are sourced from a known manufacturer; the neem and tulsi we describe as farm-grown are genuinely grown and processed by us on the farm.',
    },
    {
      question: 'Why is handmade soap from Goa different from commercial soap?',
      answer: 'Healing Soil soap is melted, hand-poured, and made to order in small batches. The bars contain no SLS, parabens, or synthetic fragrance, and the ingredient list identifies which botanicals are farm-grown and which ingredients are sourced.',
    },
  ],
  'goat-milk-soap-benefits': [
    {
      question: 'What does goat milk add to soap?',
      answer: 'Goat milk gives the bar a creamy texture and a rich, gentle lather. Healing Soil goat milk bars are made without SLS, parabens, or synthetic fragrance.',
    },
    {
      question: 'Is goat milk soap suitable for sensitive skin?',
      answer: 'It is a gentle option suitable for sensitive skin. Check the full ingredient list if you have a known sensitivity, and patch test any new personal-care product before regular use.',
    },
    {
      question: 'What is the difference between goat milk soap and regular commercial soap?',
      answer: 'Compare the labels rather than relying on the word handmade. Healing Soil goat milk soap has a creamy base and contains no SLS, parabens, or synthetic fragrance.',
    },
    {
      question: 'Does goat milk soap lather well?',
      answer: 'Yes. It creates a creamy lather rather than a large, airy foam. Wet the bar, work it between your hands, and keep it dry between uses.',
    },
    {
      question: 'How long does a goat milk soap bar last?',
      answer: 'A full-size handmade bar lasts approximately four to five weeks with daily face and body use. A soap dish that lets the bar drain between uses extends its life considerably — sitting in water dissolves the bar faster than use does.',
    },
    {
      question: 'Is goat milk soap suitable for the face?',
      answer: 'It can be used as a gentle face and body bar. Use light pressure, avoid the eye area, and stop if the product does not suit you.',
    },
  ],
  'handmade-soap-bangalore': [
    {
      question: 'Does Healing Soil deliver handmade soap to Bangalore?',
      answer: 'Yes. Healing Soil ships pan-India from Goa. Shipped in 2 days. Delivery to Bangalore typically takes 3 days after dispatch, so most Bangalore orders arrive in 5 days total.',
    },
    {
      question: 'Why does Bangalore water affect skin?',
      answer: 'Water hardness varies by neighbourhood and source. Hard water can reduce lather, so use a little water at a time and rinse the bar well rather than using more soap automatically.',
    },
    {
      question: 'What soap is best for skin in Bangalore?',
      answer: 'No single soap works for everyone, but the pattern that helps most people in Bangalore is SLS-free, no synthetic fragrance, and a base matched to skin type. Glycerin suits oily or combination skin. Goat milk suits sensitive or dry skin. Shea butter suits very dry skin. The Healing Soil starter bundle covers all three bases for ₹1,000 — a practical way to find which one works without committing to a full bar of each.',
    },
    {
      question: 'How do I check if my soap contains SLS?',
      answer: 'Read the ingredient list on the bar or box. SLS and SLES appear near the top if present — they are primary ingredients, not traces. Look for: sodium lauryl sulfate, sodium laureth sulfate, sodium coco sulfate. If none of those appear, the soap is at least SLS-free. Also look for "fragrance" or "parfum" listed without further detail, which usually means synthetic fragrance.',
    },
    {
      question: 'Is there a connection between Healing Soil and Bangalore?',
      answer: 'Yes. The people behind Healing Soil spent years in Bangalore before moving to Goa to start the farm and soap business. The Bangalore buyer base is not a coincidence — it is where many of our earliest customers came from. The story of that move is on the site.',
    },
  ],
  'natural-soap-sensitive-skin-india': [
    {
      question: 'What should I look for in soap for sensitive skin?',
      answer: 'Start with a clear ingredient list, a gentle lather, and a bar made without SLS, parabens, or synthetic fragrance. Patch test a new product and change one item at a time so you can judge how it feels.',
    },
    {
      question: 'Does natural always mean gentle?',
      answer: 'No. Natural is not a complete safety standard, and botanical ingredients can still be unsuitable for some people. Read the full label and patch test first.',
    },
    {
      question: 'Which soap base is best for sensitive skin in India?',
      answer: 'There is no universal best base. Goat milk gives a creamy lather, shea butter feels richer, and glycerin feels lighter. Choose by texture preference and patch test before regular use.',
    },
    {
      question: 'What ingredients should I compare for sensitive skin?',
      answer: 'Sensitivity is individual, so use the label to check for ingredients you already know you avoid. Healing Soil clearly states that its bars contain no SLS, parabens, or synthetic fragrance.',
    },
    {
      question: 'How do I know if a soap is genuinely natural?',
      answer: 'The word "natural" is not regulated for cosmetics in India. Look at the ingredient list instead. A genuinely gentle bar will not contain sodium lauryl sulfate, sodium laureth sulfate, parabens, synthetic fragrance, or PEG compounds. Handmade soap bases often use INCI names — standardised Latin-origin names like "butyrospermum parkii butter" for shea butter. These look technical but are simply the international naming convention for real ingredients.',
    },
  ],
  'sls-free-soap-india': [
    {
      question: 'What is SLS in soap?',
      answer: 'SLS stands for sodium lauryl sulfate. It is a surfactant used in some cleansing products to create fast, dense foam. Healing Soil bars are made without it.',
    },
    {
      question: 'Does SLS-free describe the whole formula?',
      answer: 'No. It only means the formula does not contain SLS. Read the complete ingredient list, because the base, scent, colour, and other ingredients also shape the wash experience.',
    },
    {
      question: 'How do I check if my soap contains SLS?',
      answer: 'Look at the ingredient list on the back of the bar or box. SLS and its close relative SLES appear near the top of the list if present. Look for: sodium lauryl sulfate, sodium laureth sulfate, sodium coco sulfate, or ammonium lauryl sulfate. If none of those words appear, the soap is at least SLS-free. Also watch for "fragrance" or "parfum" listed without further detail, which often means synthetic fragrance.',
    },
    {
      question: 'Is SLS-free soap better for Indian skin?',
      answer: 'SLS-free is a useful label preference, but skin types and formulas vary. Compare the full ingredient list and choose the lather and after-wash feel you prefer.',
    },
    {
      question: 'What is the difference between SLS and SLES?',
      answer: 'SLS is sodium lauryl sulfate and SLES is sodium laureth sulfate. They are different surfactants and appear under separate names on an ingredient list. Healing Soil bars contain neither.',
    },
  ],
  'goat-milk-soap-base-vs-glycerin-soap-base': [
    {
      question: 'What is the difference between goat milk soap base and glycerin soap base?',
      answer: 'Goat milk soap produces a creamy lather and a richer feel. Glycerin soap has a lighter lather and an easy-rinsing feel. Both Healing Soil bases are made without SLS, parabens, or synthetic fragrance.',
    },
    {
      question: 'Is goat milk soap base better than glycerin soap base?',
      answer: 'Neither is universally better. Choose goat milk for a creamier wash or glycerin for a lighter one. You can also switch with the weather or use different bases for face and body.',
    },
    {
      question: 'Which soap base is best for sensitive skin in India?',
      answer: 'Both are gentle options. Goat milk feels creamier; glycerin feels lighter. If your skin is sensitive, check the full ingredient list and patch test before regular use.',
    },
    {
      question: 'Can I use both goat milk and glycerin soap base?',
      answer: 'Yes. Many people use different bases for face and body, or switch seasonally. Goat milk is often preferred for the face and for dry or winter conditions; glycerin works well for the body or in warmer, more humid months when a lighter wash is preferred. The Healing Soil starter bundle includes both bases so you can find what works for your skin.',
    },
  ],
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlugFromEither(slug)
  if (!post) notFound()

  // relatedProductsBySlug is written in canonical slugs, but SoapLedger returns
  // legacy forms for several products (pomegranate-glycerine,
  // neem-tulsi-goatmilk-soap, sheabutter-kesar-gulab and others). Matching on
  // the raw slug therefore silently found nothing for those posts, so their
  // related-products block rendered empty.
  //
  // Mapping order is preserved rather than catalogue order, because the first
  // entry is the bar the post is actually about and it is what the inline CTA
  // features. A plain filter would return whichever product sorted first by
  // display_order instead.
  const relatedSlugs = relatedProductsBySlug[slug] ?? []
  const allProducts =
    COMMERCE_ENABLED && relatedSlugs.length > 0 ? await getProducts().catch(() => []) : []
  const relatedProducts = relatedSlugs
    .map((want) =>
      allProducts.find((p) => canonicalSlugFor(p.slug) === want && p.in_stock),
    )
    .filter((p): p is NonNullable<typeof p> => p != null)
  const relatedReading = relatedReadingBySlug[slug] ?? []

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage
      ? absoluteUrl(post.featuredImage)
      : 'https://healingsoil.in/og-image.jpg',
    datePublished: post.date,
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    isPartOf: { '@id': WEBSITE_ID },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://healingsoil.in/blog/${slug}`,
    },
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
        name: 'Blog',
        item: 'https://healingsoil.in/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://healingsoil.in/blog/${slug}`,
      },
    ],
  }

  const faqs = faqsBySlug[slug] || []
  const faqSchema = faqs.length > 0 && {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="bg-[#F7F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <article className="mx-auto max-w-[720px] px-4 py-16 sm:px-6">

        {/* Category + date */}
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full bg-[#1E5631] px-2.5 py-0.5 font-sans text-[11px] font-medium uppercase tracking-wider text-white">
            {post.category}
          </span>
          <time className="font-sans text-xs text-[#999]" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
        </div>

        {/* Title */}
        <h1 className="mb-4 font-serif text-4xl leading-tight text-[#1E5631] sm:text-5xl">
          {post.title}
        </h1>

        {/* Excerpt / standfirst */}
        <p className="mb-8 font-sans text-lg leading-relaxed text-[#666666]">
          {post.excerpt}
        </p>

        {/* Featured image */}
        {post.featuredImage && (
          <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              unoptimized={post.featuredImage.startsWith('/stories/')}
            />
          </div>
        )}

        {/* Inline CTA, soap/skincare posts only. Passed the post's first mapped
            product so the reader is sent to that bar rather than to the homepage
            bundle anchor. Falls back to the bundle when a post has no mapping. */}
        {post.source !== 'stories' && (
          <BlogInlineCTA product={relatedProducts[0]} />
        )}

        {/* MDX content */}
        <div className="prose-custom">
          <MDXContent source={post.content ?? ''} components={mdxComponents} />
        </div>

        {relatedReading.length > 0 && (
          <aside className="mt-10 rounded-lg border border-[#D6CFC4] bg-white p-6" aria-labelledby="related-reading-heading">
            <h2 id="related-reading-heading" className="mb-3 font-serif text-2xl text-[#1E5631]">
              Continue from the farm
            </h2>
            <ul className="space-y-2 font-sans text-sm">
              {relatedReading.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Author */}
        <p className="mt-10 border-t border-[#D6CFC4] pt-6 font-sans text-sm text-[#999]">
          Written by{' '}
          <Link href="/our-story" rel="author" className="font-medium text-[#1A1A14] underline underline-offset-2">
            {post.author}
          </Link>
        </p>

        {post.source === 'stories' ? (
          /* Farm life post: show StoryCTA only when cta flag is set */
          post.cta === 'shop' && <StoryCTA />
        ) : (
          /* Soap/skincare post: pull quote + product CTA */
          <>
            <div className="mt-10">
              <RandomReview />
            </div>

            <CommerceOnly>
              {relatedProducts.length > 0 ? (
                <div className="mt-8">
                  <p className="mb-4 font-serif text-2xl text-[#1E5631]">Shop these soaps</p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-8 rounded-lg border border-[#C9A84C] bg-[#FFF8E8] p-6 text-center">
                  <p className="mb-1 font-serif text-2xl text-[#1E5631]">
                    Try the starter bundle
                  </p>
                  <p className="mb-1 font-sans text-sm text-[#666666]">
                    Four soaps to find the one your skin agrees with. ₹1,000. SLS-free, made to order from Goa.
                  </p>
                  <p className="mb-4 font-sans text-xs text-[#999]">
                    Shipped in 2 days. Free shipping over ₹1,000.
                  </p>
                  <Link
                    href="/#bundle"
                    className="inline-block rounded bg-[#1E5631] px-6 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
                  >
                    See the starter bundle
                  </Link>
                </div>
              )}
            </CommerceOnly>

            <p className="mt-8 font-sans text-sm text-[#999]">
              Want the full picture?{' '}
              <Link href="/guide/handmade-soap-india" className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]">
                Read our complete guide to handmade soap in India.
              </Link>
            </p>
          </>
        )}

      </article>
    </div>
  )
}
