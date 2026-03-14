import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/lib/blog'

type BlogCardProps = {
  post: Post
  dir: 'blog' | 'stories'
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogCard({ post, dir }: BlogCardProps) {
  const href = `/${dir}/${post.slug}`

  return (
    <article className="group flex flex-col rounded-lg border border-[#D6CFC4] bg-white overflow-hidden transition-shadow hover:shadow-md">
      {/* Featured image — 16:9 */}
      <Link href={href} className="block aspect-video w-full overflow-hidden relative">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#1E5631]">
            <span className="font-serif text-2xl text-white/40">Healing Soil</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        {/* Category pill */}
        <span className="inline-block self-start rounded-full bg-[#1E5631] px-2.5 py-0.5 font-sans text-[11px] font-medium uppercase tracking-wider text-white">
          {post.category}
        </span>

        {/* Title */}
        <Link href={href}>
          <h2 className="font-serif text-[20px] leading-snug text-[#1A1A14] transition-colors hover:text-[#1E5631]">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="line-clamp-3 flex-1 font-sans text-[14px] leading-relaxed text-[#666666]">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-1 flex items-center justify-between">
          <time className="font-sans text-xs text-[#999]" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <Link
            href={href}
            className="font-sans text-xs font-medium text-[#1E5631] hover:text-[#C9A84C] transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}
