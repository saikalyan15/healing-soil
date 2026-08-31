import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { comparisons } from '@/data/comparisons'
import { buildMetadata } from '@/lib/seo'
import ComparisonPage from '@/components/programmatic/ComparisonPage'
import { getProducts , selectProducts } from '@/lib/products'
import { COMMERCE_ENABLED } from '@/lib/site-mode'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  if (!COMMERCE_ENABLED) return []
  const today = new Date().toISOString().split('T')[0]
  return comparisons
    .filter((c) => c.publishedAt !== null && c.publishedAt <= today)
    .map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const comparison = comparisons.find((c) => c.slug === slug)
  if (!comparison) return {}

  const canonicalUrl = comparison.canonicalOverride ?? `/compare/${slug}`

  return buildMetadata({
    title: comparison.title,
    description: comparison.metaDescription,
    canonical: canonicalUrl,
    ogType: 'article',
  })
}

export const dynamicParams = false

export default async function Page({ params }: Props) {
  const { slug } = await params
  const today = new Date().toISOString().split('T')[0]
  const comparison = comparisons.find(
    (c) => c.slug === slug && c.publishedAt !== null && c.publishedAt <= today
  )

  if (!comparison) {
    notFound()
  }

  const allProducts = await getProducts()
  const productsA = selectProducts(allProducts, comparison.relatedProductsA)
  const productsB = selectProducts(allProducts, comparison.relatedProductsB)

  return (
    <ComparisonPage 
      comparison={comparison} 
      productsA={productsA} 
      productsB={productsB} 
    />
  )
}
