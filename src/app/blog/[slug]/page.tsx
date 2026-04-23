import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MDXContent } from '@/components/MDXContent'
import { getAllPosts, getPostBySlugFromEither } from '@/lib/blog'
import RandomReview from '@/components/RandomReview'
import StoryCTA from '@/components/StoryCTA'
import BlogInlineCTA from '@/components/BlogInlineCTA'

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
  return {
    title: `${post.title} — Healing Soil`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
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
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]" {...props} />
  ),
  hr: () => <hr className="my-10 border-[#D6CFC4]" />,
}

// ─── Date helper ───────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ─── FAQ mapping ───────────────────────────────────────────────────────────────

const faqsBySlug: Record<string, Array<{ question: string; answer: string }>> = {
  'glycerin-vs-goat-milk-soap': [
    {
      question: 'What is glycerin soap?',
      answer: 'Glycerin is a natural byproduct of soap-making. Commercial manufacturers remove it because it sells separately. Healing Soil keeps glycerin in the bar. Glycerin draws moisture gently into your skin; the lather is light and the feeling after washing is clean without being heavy. Glycerin soap suits oily skin or combination skin, or anyone who wants cleansing without added weight.',
    },
    {
      question: 'What is goat milk soap?',
      answer: 'Goat milk soap replaces water in the soap base. Goat milk contains lactic acid that gently removes dead skin cells, natural fats that skin absorbs easily, and vitamins A–E. The bar feels creamy; skin feels nourished, not just clean. Goat milk soap is versatile and suits sensitive skin, dry skin, eczema-prone skin, and anyone switching from commercial soap for the first time.',
    },
    {
      question: 'What is shea butter soap?',
      answer: 'Shea butter is the most nourishing of the three bases. Part of it does not break down during soap-making, so it stays in the bar and deposits on your skin when you wash. The lather is thick and creamy; the feeling is conditioning rather than just clean. Shea butter soap suits dry skin, mature skin, winter skin, and anyone who feels tight after showering. It is too rich for oily or acne-prone skin.',
    },
    {
      question: 'How do I choose the right soap base for my skin?',
      answer: 'If your skin is oily or breaking out, start with glycerin. If you have sensitive, dry, or combination skin, start with goat milk. If your skin is very dry, tight, or mature, choose shea butter. When in doubt, goat milk is usually the right answer.',
    },
  ],
  'shea-butter-goat-milk-soap-dry-sensitive-skin': [
    {
      question: 'Why do dry skin and sensitive skin often come together?',
      answer: 'Healthy skin has a protective barrier of oils, proteins, and moisture. This barrier keeps hydration in and irritants out. Chronically dry skin means this barrier is compromised. When the barrier is thin, irritants get through more easily. So dryness and sensitivity feed each other. Commercial soap accelerates this cycle by stripping the barrier with synthetic foaming agents and synthetic fragrance.',
    },
    {
      question: 'How does shea butter soap help dry, sensitive skin?',
      answer: 'Shea butter contains compounds that do not break down during soap-making. When you wash, these intact molecules are deposited on your skin and do not rinse away. Shea butter has natural anti-inflammatory properties, fills the skin barrier rather than coating it, and slows moisture loss. It also does not clog pores despite its richness.',
    },
    {
      question: 'How does goat milk soap help sensitive skin?',
      answer: 'Goat milk contains lactic acid (a gentle alpha-hydroxy acid) that dissolves the bonds holding dead skin cells on the surface, allowing them to lift without scrubbing. Goat milk is naturally rich in vitamins A, B2–B12, C, D, E, and minerals. Its pH is closer to skin\'s natural pH, reducing disruption. Goat milk soap is deeply nourishing without the richness that could feel heavy.',
    },
    {
      question: 'How do I choose between shea butter and goat milk soap?',
      answer: 'If your skin is very dry, gets rough in patches, or worsens significantly in winter, choose shea butter soap for intensive moisture. If your skin is mildly to moderately dry or sensitive and you want gentle nourishment without heaviness, choose goat milk soap. Goat milk is the easier place to start if you are not sure.',
    },
  ],
  'understanding-the-benefits-of-shea-butter-in-soap': [
    {
      question: 'What is shea butter?',
      answer: 'Shea butter comes from the nut of the shea tree (Vitellaria paradoxa), which grows across the savannah belt of West and Central Africa. The nut is dried, crushed, and pressed to extract the fat. Raw shea butter contains fatty acids (oleic, stearic, linoleic, palmitic), vitamins A, E, and F, and non-saponifiable compounds that do not convert to soap during saponification. This is what makes shea butter valuable in soap.',
    },
    {
      question: 'Does shea butter clog pores?',
      answer: 'No. Shea butter has a low comedogenic rating and does not tend to block pores despite its richness. This makes it workable for combination skin and for people who want moisturising benefits without the risk of congestion.',
    },
    {
      question: 'Why does shea butter belong in soap?',
      answer: 'Shea butter could be a leave-on product like a cream or balm, but it is strong in soap because the soap works at the moment of maximum exposure to skin. The conditioning happens while you are washing, not an hour later. Shea butter fills the microscopic gaps in the skin\'s surface layer, slows transepidermal water loss, and has natural anti-inflammatory properties that are especially valuable for reactive or dry skin.',
    },
  ],
  'sls-free-soap-india': [
    {
      question: 'What is SLS in soap?',
      answer: 'SLS stands for sodium lauryl sulfate. It is a synthetic detergent added to soap and body wash to create fast, dense lather. It is cheap to manufacture with and very effective at removing oil, which is why it appears in most commercial soap bars sold in India. The problem is it removes more than dirt. It strips the protective oil layer your skin produces naturally, which leads to dryness, tightness, and irritation with regular use.',
    },
    {
      question: 'Why does my skin feel dry and tight after showering?',
      answer: 'If your skin feels tight or dry immediately after washing, the most common cause is the soap you are using. Most commercial soap bars contain SLS or SLES, which strip the skin\'s natural oil barrier. Your skin then tries to rebuild that barrier, but daily washing with an SLS-based product keeps disrupting the cycle. Switching to an SLS-free soap is usually one of the first things worth trying.',
    },
    {
      question: 'How do I check if my soap contains SLS?',
      answer: 'Look at the ingredient list on the back of the bar or box. SLS and its close relative SLES appear near the top of the list if present. Look for: sodium lauryl sulfate, sodium laureth sulfate, sodium coco sulfate, or ammonium lauryl sulfate. If none of those words appear, the soap is at least SLS-free. Also watch for "fragrance" or "parfum" listed without further detail, which often means synthetic fragrance.',
    },
    {
      question: 'Is SLS-free soap better for Indian skin?',
      answer: 'For people who bathe twice a day in a hot, humid climate, SLS-free soap is generally gentler. Indian skin types vary, but the combination of frequent washing, hard water in many cities, and high heat means SLS contact adds up quickly. An SLS-free bar cleans without stripping, which suits most skin types and is especially helpful for sensitive, dry, or reactive skin.',
    },
    {
      question: 'What is the difference between SLS and SLES?',
      answer: 'SLES (sodium laureth sulfate) is a modified version of SLS that is slightly milder. Some brands swap SLS for SLES and market the product as gentler. It is somewhat less harsh, but it still functions as a detergent and still strips skin oils with regular use. Truly SLS-free soap uses neither compound. The lather comes from the soap-making process itself, not from added foaming agents.',
    },
  ],
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlugFromEither(slug)
  if (!post) notFound()

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage || 'https://healingsoil.in/og-image.jpg',
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Healing Soil',
      url: 'https://healingsoil.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Healing Soil',
      logo: {
        '@type': 'ImageObject',
        url: 'https://healingsoil.in/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://healingsoil.in/blog/${slug}`,
    },
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

        {/* Inline bundle CTA — visible for soap/skincare posts only */}
        {post.source !== 'stories' && <BlogInlineCTA />}

        {/* MDX content */}
        <div className="prose-custom">
          <MDXContent source={post.content ?? ''} components={mdxComponents} />
        </div>

        {/* Author */}
        <p className="mt-10 border-t border-[#D6CFC4] pt-6 font-sans text-sm text-[#999]">
          Written by <span className="font-medium text-[#1A1A14]">{post.author}</span>
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

            <div className="mt-8 rounded-lg border border-[#C9A84C] bg-[#FFF8E8] p-6 text-center">
              <p className="mb-1 font-serif text-2xl text-[#1E5631]">
                Try the starter bundle
              </p>
              <p className="mb-1 font-sans text-sm text-[#666666]">
                Four soaps to find the one your skin agrees with. ₹1,000. SLS-free, made to order from Goa.
              </p>
              <p className="mb-4 font-sans text-xs text-[#999]">
                Shipped in 4 days. Free shipping included.
              </p>
              <Link
                href="/#bundle"
                className="inline-block rounded bg-[#1E5631] px-6 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
              >
                See the starter bundle
              </Link>
            </div>

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
