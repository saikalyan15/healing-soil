import { getBlogPosts } from '@/lib/blog'
import BlogGrid from '@/components/BlogGrid'

export const metadata = {
  title: 'From the Farm — Healing Soil Blog',
  description:
    'Writing about handmade soap, natural ingredients, skin science, and slow living from a farm in South Goa.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'From the Farm — Healing Soil Blog',
    description: 'Writing about handmade soap, natural ingredients, and the science of skin.',
    url: '/blog',
    siteName: 'Healing Soil',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Healing Soil blog — from the farm' }],
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getBlogPosts('blog')

  return (
    <div className="bg-[#F7F5F0]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 max-w-xl">
          <h1 className="mb-3 font-serif text-5xl leading-tight text-[#1E5631]">
            From the farm
          </h1>
          <p className="font-sans text-lg text-[#666666]">
            Writing about handmade soap, natural ingredients, and the science of skin.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="font-sans text-sm text-[#999]">No posts yet — check back soon.</p>
        ) : (
          <BlogGrid posts={posts} dir="blog" />
        )}
      </div>
    </div>
  )
}
