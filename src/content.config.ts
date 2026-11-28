import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// Blog posts and the older "stories" share one schema. Both are served under /blog/<slug>,
// which is where the old site already put them. The slug is the filename, not the
// frontmatter slug field.
const schema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  excerpt: z.string().optional().default(''),
  category: z.string().optional().default('general'),
  author: z.string().optional().default('Healing Soil'),
  featuredImage: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  published: z.boolean().optional().default(true),
})

const loader = (base: string) =>
  glob({
    pattern: '*.mdx',
    base,
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  })

const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
  h1: z.string(),
  lead: z.string().optional(),
  updated: z.string().optional(),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional().default([]),
  cta: z.enum(['soaps', 'whatsapp', 'none']).optional().default('soaps'),
  products: z.array(z.string()).optional().default([]),
  productsTitle: z.string().optional(),
})

export const collections = {
  pages: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './content/pages', generateId: ({ entry }) => entry.replace(/\.mdx$/, '') }),
    schema: pageSchema,
  }),
  blog: defineCollection({ loader: loader('./content/blog'), schema }),
  stories: defineCollection({ loader: loader('./content/stories'), schema }),
}
