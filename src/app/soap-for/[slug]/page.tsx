import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { decisions } from '@/data/decisions'
import { getProducts } from '@/lib/products'
import DecisionPage from '@/components/programmatic/DecisionPage'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const today = new Date().toISOString().split('T')[0]
  return decisions
    .filter((d) => d.publishedAt !== null && d.publishedAt <= today)
    .map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const decision = decisions.find((d) => d.slug === slug)
  if (!decision) return {}

  return {
    title: decision.title,
    description: decision.metaDescription,
    alternates: { canonical: `/soap-for/${slug}` },
    openGraph: {
      title: decision.title,
      description: decision.metaDescription,
      url: `/soap-for/${slug}`,
      siteName: 'Healing Soil',
      type: 'article',
    },
  }
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
  const products = allProducts.filter(
    (p) => decision.recommendedProducts.includes(p.slug) && p.in_stock
  )

  return <DecisionPage decision={decision} products={products} />
}
