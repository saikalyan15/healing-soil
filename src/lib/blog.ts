import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// ─── Types ─────────────────────────────────────────────────────────────────────

export type Post = {
  title: string
  date: string
  slug: string
  excerpt: string
  category: string
  featuredImage?: string
  author: string
  cta?: string
  source?: 'blog' | 'stories'
  content?: string  // only present when fetched via getPostBySlug
  published?: boolean
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function contentDir(dir: 'blog' | 'stories'): string {
  return path.join(process.cwd(), 'content', dir)
}

function parseMdxFile(filePath: string, slug: string, includeContent = false): Post {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    title: data.title ?? 'Untitled',
    date: data.date ? String(data.date) : '',
    slug,
    excerpt: data.excerpt ?? '',
    category: data.category ?? 'general',
    featuredImage: data.featuredImage ?? undefined,
    author: data.author ?? 'Healing Soil',
    cta: data.cta ?? undefined,
    published: data.published !== false,
    ...(includeContent ? { content } : {}),
  }
}

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Returns all posts from content/{dir}/ sorted by date descending.
 * Skips non-.mdx files (e.g. README.md).
 */
export function getBlogPosts(dir: 'blog' | 'stories'): Post[] {
  const dirPath = contentDir(dir)

  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.mdx'))

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      return parseMdxFile(path.join(dirPath, file), slug)
    })
    .filter((p) => p.published !== false)

  return posts.sort((a, b) => {
    const da = new Date(a.date).getTime()
    const db = new Date(b.date).getTime()
    return db - da  // newest first
  })
}

/**
 * Returns a single post with its full MDX content string.
 * Returns null if the slug is not found.
 */
export function getPostBySlug(slug: string, dir: 'blog' | 'stories'): Post | null {
  const filePath = path.join(contentDir(dir), `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const post = parseMdxFile(filePath, slug, true)
  if (post.published === false) return null
  return post
}

/**
 * Returns all posts from both blog and stories, merged and sorted by date descending.
 */
export function getAllPosts(): Post[] {
  const blogPosts = getBlogPosts('blog').map(p => ({ ...p, source: 'blog' as const }))
  const storyPosts = getBlogPosts('stories').map(p => ({ ...p, source: 'stories' as const }))
  return [...blogPosts, ...storyPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Returns a single post searching blog dir first, then stories dir.
 * Returns null if not found in either.
 */
export function getPostBySlugFromEither(slug: string): Post | null {
  const blogPost = getPostBySlug(slug, 'blog')
  if (blogPost) return { ...blogPost, source: 'blog' }
  const storyPost = getPostBySlug(slug, 'stories')
  if (storyPost) return { ...storyPost, source: 'stories' }
  return null
}

/**
 * Returns posts filtered by category (case-insensitive).
 */
export function getPostsByCategory(category: string, dir: 'blog' | 'stories'): Post[] {
  return getBlogPosts(dir).filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  )
}
