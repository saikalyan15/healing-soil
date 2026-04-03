import { NextResponse } from 'next/server'
import { getBlogPosts } from '@/lib/blog'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') ?? '0', 10)

  let posts = getBlogPosts('blog')

  if (limit > 0) posts = posts.slice(0, limit)

  const data = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    featuredImage: p.featuredImage ?? null,
    url: `https://healingsoil.in/blog/${p.slug}`,
  }))

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
