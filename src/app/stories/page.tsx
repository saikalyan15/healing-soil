import { getBlogPosts } from '@/lib/blog'
import BlogGrid from '@/components/BlogGrid'

export const metadata = {
  title: 'Life on the Farm — Healing Soil Stories',
  description:
    'Stories about slow living, growing food, and finding a different pace.',
}

export default function StoriesPage() {
  const posts = getBlogPosts('stories')

  return (
    <div className="bg-[#F7F5F0]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 max-w-xl">
          <h1 className="mb-3 font-serif text-5xl leading-tight text-[#1E5631]">
            Life on the farm
          </h1>
          <p className="font-sans text-lg text-[#666666]">
            Stories about slow living, growing food, and finding a different pace.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="font-sans text-sm text-[#999]">No stories yet — check back soon.</p>
        ) : (
          <BlogGrid posts={posts} dir="stories" />
        )}
      </div>
    </div>
  )
}
