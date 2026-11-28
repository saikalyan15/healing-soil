import { getCollection, type CollectionEntry } from 'astro:content'

export type Post = (CollectionEntry<'blog'> | CollectionEntry<'stories'>) & { source: 'blog' | 'stories' }

/** Published posts from both collections, newest first. A slug in blog wins over the same slug in stories. */
export async function getPosts(): Promise<Post[]> {
  const [blog, stories] = await Promise.all([getCollection('blog'), getCollection('stories')])
  const seen = new Set<string>()
  const all: Post[] = []
  for (const [source, entries] of [['blog', blog], ['stories', stories]] as const) {
    for (const e of entries) {
      if (!e.data.published || seen.has(e.id)) continue
      seen.add(e.id)
      all.push({ ...e, source } as Post)
    }
  }
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}
