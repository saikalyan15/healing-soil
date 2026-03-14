// Blog content helpers — reads from content/blog/ MDX/markdown files
// or fetches from a headless CMS if integrated later

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  content: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  // TODO: read markdown files from content/blog/ or fetch from CMS
  return []
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  // TODO: read single markdown file from content/blog/
  return null
}
