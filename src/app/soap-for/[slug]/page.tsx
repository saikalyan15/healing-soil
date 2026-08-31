import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { decisions } from '@/data/decisions'
import { buildMetadata } from '@/lib/seo'
import { getProducts, selectProducts } from '@/lib/products'
import { COMMERCE_ENABLED } from '@/lib/site-mode'
import DecisionPage from '@/components/programmatic/DecisionPage'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  if (!COMMERCE_ENABLED) return []
  const today = new Date().toISOString().split('T')[0]
  return decisions
    .filter((d) => d.publishedAt !== null && d.publishedAt <= today)
    .map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const decision = decisions.find((d) => d.slug === slug)
  if (!decision) return {}

  return buildMetadata({
    title: decision.title,
    description: decision.metaDescription,
    canonical: `/soap-for/${slug}`,
    ogType: 'article',
  })
}

export const dynamicParams = false

export default async function Page({ params }: Props) {
  const { slug } = await params
  const today = new Date().toISOString().split('T')[0]
  const decision = decisions.find(
    (d) => d.slug === slug && d.publishedAt !== null && d.publishedAt <= today
  )

  if (!decision) notFound()

  const allProducts = await getProducts().catch(() => [])
  const products = selectProducts(allProducts, decision.recommendedProducts, { inStockOnly: true })

  return <DecisionPage decision={decision} products={products} />
}
