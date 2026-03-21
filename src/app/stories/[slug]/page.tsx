import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getBlogPosts, getPostBySlug } from '@/lib/blog'
import StoryCTA from '@/components/StoryCTA'

type Props = { params: { slug: string } }

// ─── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getBlogPosts('stories').map((p) => ({ slug: p.slug }))
}

// ─── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug, 'stories')
  if (!post) return {}
  return {
    title: `${post.title} — Healing Soil`,
    description: post.excerpt,
    robots: { index: false, follow: false },
    alternates: { canonical: `/stories/${params.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/stories/${params.slug}`,
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

export default function StoryPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug, 'stories')
  if (!post) notFound()

  return (
    <div className="bg-[#F7F5F0]">
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

        {/* Excerpt */}
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
          <MDXRemote source={post.content ?? ''} components={mdxComponents} />
        </div>

        {/* Shop CTA — only for soap and slow-living stories */}
        {post.cta === 'shop' && <StoryCTA />}

        {/* Author */}
        <p className="mt-10 border-t border-[#D6CFC4] pt-6 font-sans text-sm text-[#999]">
          Written by <span className="font-medium text-[#1A1A14]">{post.author}</span>
        </p>

      </article>
    </div>
  )
}
