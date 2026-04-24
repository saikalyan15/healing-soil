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
      question: 'What is the difference between glycerin and goat milk soap base?',
      answer: 'A glycerin soap base keeps the glycerin that forms naturally during the soap-making process. Most commercial manufacturers remove it to sell separately. Glycerin draws moisture gently into the skin; the lather is light and the feeling after washing is clean without heaviness. A goat milk soap base replaces water with goat milk, which contains natural fats and vitamins. The bar has a creamy lather and leaves skin feeling nourished rather than just clean. Glycerin suits oily or normal skin; goat milk suits sensitive or dry skin and is the more versatile of the two.',
    },
    {
      question: 'What is glycerin soap?',
      answer: 'Glycerin is a natural byproduct of soap-making. Commercial manufacturers remove it because it sells separately. Healing Soil keeps glycerin in the bar. Glycerin draws moisture gently into your skin; the lather is light and the feeling after washing is clean without being heavy. Glycerin soap suits oily skin or combination skin, or anyone who wants cleansing without added weight.',
    },
    {
      question: 'What is goat milk soap?',
      answer: 'Goat milk soap replaces water in the soap base. Goat milk contains natural fats that skin absorbs easily and vitamins in the form they occur naturally in milk. The bar feels creamy; skin feels nourished, not just clean. Goat milk soap is versatile and suits sensitive skin, dry skin, and anyone switching from commercial soap for the first time.',
    },
    {
      question: 'How do I choose the right soap base for my skin?',
      answer: 'If your skin is oily or breaking out, start with the glycerin soap base. If you have sensitive, dry, or reactive skin, start with goat milk — it is the most versatile base. If your skin is very dry, tight after every shower, or feels rough in patches, choose shea butter. When in doubt, goat milk is usually the right answer.',
    },
  ],
  'shea-butter-goat-milk-soap-dry-sensitive-skin': [
    {
      question: 'Why do dry skin and sensitive skin often come together?',
      answer: 'Healthy skin has a protective barrier of oils, proteins, and moisture. When that barrier is compromised, moisture escapes more easily and skin becomes less tolerant of everyday products. Commercial soap can worsen this cycle — synthetic foaming agents strip the barrier and synthetic fragrance is a common source of reactions.',
    },
    {
      question: 'How does shea butter soap help dry, sensitive skin?',
      answer: 'Shea butter contains compounds that do not break down during soap-making. When you wash, these intact molecules are deposited on your skin and do not rinse away. The result is skin that feels conditioned after washing rather than stripped. Shea butter is also rich without clogging pores.',
    },
    {
      question: 'How does goat milk soap suit sensitive skin?',
      answer: 'Goat milk contains natural fats that skin absorbs easily and vitamins in the form they occur naturally in milk. Its pH is closer to skin\'s natural range than most soaps, so washing with it tends to feel gentler. The lather is creamy and the feeling afterwards is nourished rather than tight.',
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
      answer: 'Shea butter could be a leave-on product like a cream or balm, but it works well in soap because the conditioning happens at the moment of washing rather than an hour later. It fills the microscopic gaps in the skin\'s surface layer and slows moisture loss — especially valuable for very dry or reactive skin.',
    },
  ],
  'handmade-soap-goa': [
    {
      question: 'Is Healing Soil soap actually made in Goa?',
      answer: 'Yes. The soap is made and cured in Goa. The soap bases — glycerin, goat milk, shea butter — are sourced from a manufacturer we have worked with consistently. The botanicals we describe as farm-grown, neem and tulsi, are grown on our property in Goa, dried under the sun there, and added by hand to each batch.',
    },
    {
      question: 'What does small-batch soap mean?',
      answer: 'Small-batch means the batch size is small enough that the soap does not need a long shelf life engineered through preservatives and synthetic stabilisers. We make to order: when you place an order, we make the batch, cure it for the right amount of time, and ship. The bar you receive was made for your order, not sourced from stock that has been sitting in a warehouse.',
    },
    {
      question: 'Can handmade soap from Goa be shipped across India?',
      answer: 'Yes. Healing Soil ships pan-India. The window from order to dispatch is seven to ten days — the making and curing time, not a processing delay. Free shipping is included.',
    },
    {
      question: 'What is the difference between farm-grown and sourced ingredients in handmade soap?',
      answer: 'Farm-grown means the ingredient was grown on our property in Goa and added directly to the batch. Sourced means it was purchased from a supplier. We are specific about which is which: the soap bases are sourced from a known manufacturer; the neem and tulsi we describe as farm-grown are genuinely grown and processed by us on the farm.',
    },
    {
      question: 'Why is handmade soap from Goa different from commercial soap?',
      answer: 'The practical difference is in ingredients and shelf life. Commercial soap usually contains SLS, a synthetic detergent that strips skin oils, and is manufactured months before use. Small-batch handmade soap skips SLS entirely, uses no synthetic preservatives, and is made to order — so the bar you receive was cured recently, not held in a warehouse. The result is a cleaner ingredient list and a gentler effect on skin.',
    },
  ],
  'handmade-soap-bangalore': [
    {
      question: 'Does Healing Soil deliver handmade soap to Bangalore?',
      answer: 'Yes. Healing Soil ships pan-India from Goa. The window from order to dispatch is seven to ten days — the making and curing time. Delivery to Bangalore typically adds one to two days after dispatch.',
    },
    {
      question: 'Why does Bangalore water affect skin?',
      answer: "Bangalore's water supply tends toward moderate to high mineral hardness, particularly in zones served by KRS reservoir water. Hard water reacts with soap to reduce lather, leading people to use more soap. As the water dries, minerals deposit on skin as a film that can feel tight or dry. Combined with SLS-based commercial soap — which strips skin oils — the dryness compounds. Many people in Bangalore dealing with persistent skin dryness have never identified this combination as the cause.",
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
      question: 'What causes sensitive skin in India?',
      answer: 'Sensitive skin is often a response to something in the routine rather than a fixed skin type. In India, the most common culprits are SLS in commercial soap — which strips the skin\'s natural oils — and synthetic fragrance, which is a common source of reactions for people with sensitive skin. Removing these, particularly by switching to an SLS-free soap without synthetic fragrance, often makes a meaningful difference.',
    },
    {
      question: 'Can switching to natural soap help sensitive skin?',
      answer: 'For many people, yes. The main change is removing SLS and synthetic fragrance from the daily wash routine. Switching to an SLS-free, fragrance-free soap reduces daily contact with synthetic additives. The tightness after washing often reduces in the first week. Underlying dryness typically improves within two to three weeks.',
    },
    {
      question: 'Which soap base is best for sensitive skin in India?',
      answer: 'Goat milk is the most versatile base for sensitive skin. It contains lactic acid that gently removes dead skin cells, natural fats that absorb easily, and a pH closer to skin\'s natural pH. For very dry or reactive skin that gets tight or develops redness, shea butter is the richer option. For mild sensitivity with oily or combination skin, glycerin is a good starting point.',
    },
    {
      question: 'What ingredients in commercial soap irritate sensitive skin?',
      answer: 'The most common are: SLS and SLES — synthetic detergents that strip skin oils with every wash; synthetic fragrance listed as "fragrance" or "parfum" — a common source of reactions for sensitive skin; parabens such as methylparaben and propylparaben — synthetic preservatives; and PEG compounds. Removing these from your soap routine is the most direct way to reduce reactions from the product itself.',
    },
    {
      question: 'How do I know if a soap is genuinely natural?',
      answer: 'The word "natural" is not regulated for cosmetics in India. Look at the ingredient list instead. A genuinely gentle bar will not contain sodium lauryl sulfate, sodium laureth sulfate, parabens, synthetic fragrance, or PEG compounds. Handmade soap bases often use INCI names — standardised Latin-origin names like "butyrospermum parkii butter" for shea butter. These look technical but are simply the international naming convention for real ingredients.',
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
