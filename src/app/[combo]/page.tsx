import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { combinations } from '@/data/combinations'
import { buildMetadata } from '@/lib/seo'
import CombinationPage from '@/components/programmatic/CombinationPage'
import { getProducts , selectProducts } from '@/lib/products'

type Props = { params: Promise<{ combo: string }> }

export async function generateStaticParams() {
  const today = new Date().toISOString().split('T')[0]
  return combinations
    .filter((c) => c.publishedAt !== null && c.publishedAt <= today)
    .map((c) => ({ combo: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { combo } = await params
  const combination = combinations.find((c) => c.slug === combo)
  if (!combination) return {}

  return buildMetadata({
    title: combination.title,
    description: combination.metaDescription,
    canonical: `/${combo}`,
    ogType: 'article',
  })
}

export const dynamicParams = false

export default async function Page({ params }: Props) {
  const { combo } = await params
  const today = new Date().toISOString().split('T')[0]
  const combination = combinations.find(
    (c) => c.slug === combo && c.publishedAt !== null && c.publishedAt <= today
  )

  if (!combination) {
    notFound()
  }

  const allProducts = await getProducts()
  const products = selectProducts(allProducts, combination.relatedProducts)

  return <CombinationPage combination={combination} products={products} />
}
