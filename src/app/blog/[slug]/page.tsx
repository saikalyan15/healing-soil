import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MDXContent } from '@/components/MDXContent'
import { getBlogPosts, getPostBySlug } from '@/lib/blog'
import { reviews } from '@/lib/reviews'
import ReviewCard from '@/components/ReviewCard'

type Props = { params: Promise<{ slug: string }> }

// ─── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getBlogPosts('blog').map((p) => ({ slug: p.slug }))
}

// ─── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug, 'blog')
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

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug, 'blog')
  if (!post) notFound()

  const pullQuote = reviews[2]

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

  return (
    <div className="bg-[#F7F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
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
            />
          </div>
        )}

        {/* MDX content */}
        <div className="prose-custom">
          <MDXContent source={post.content ?? ''} components={mdxComponents} />
        </div>

        {/* Author */}
        <p className="mt-10 border-t border-[#D6CFC4] pt-6 font-sans text-sm text-[#999]">
          Written by <span className="font-medium text-[#1A1A14]">{post.author}</span>
        </p>

        {/* Pull quote review */}
        <div className="mt-10">
          <ReviewCard
            quote={pullQuote.comment}
            name={pullQuote.author}
            location={pullQuote.location}
            featured={false}
          />
        </div>

        {/* Product CTA */}
        <div className="mt-8 rounded-lg border border-[#C9A84C] bg-[#FFF8E8] p-6 text-center">
          <p className="mb-1 font-serif text-2xl text-[#1E5631]">
            Try our handmade soaps
          </p>
          <p className="mb-4 font-sans text-sm text-[#666666]">
            Made to order from our farm in Goa. No chemicals. No shortcuts.
          </p>
          <Link
            href="/shop"
            className="inline-block rounded bg-[#1E5631] px-6 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
          >
            Shop the collection
          </Link>
        </div>

      </article>
    </div>
  )
}
