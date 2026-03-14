'use client'

import { useState } from 'react'
import BlogCard from './BlogCard'
import type { Post } from '@/lib/blog'

type BlogGridProps = {
  posts: Post[]
  dir: 'blog' | 'stories'
}

export default function BlogGrid({ posts, dir }: BlogGridProps) {
  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))]
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? posts : posts.filter((p) => p.category === active)

  return (
    <div>
      {/* Category filter tabs */}
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-1.5 font-sans text-sm font-medium transition-colors ${
                active === cat
                  ? 'bg-[#1E5631] text-white'
                  : 'border border-[#D6CFC4] bg-white text-[#666666] hover:border-[#1E5631] hover:text-[#1E5631]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="font-sans text-sm text-[#999]">No posts in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} dir={dir} />
          ))}
        </div>
      )}
    </div>
  )
}
