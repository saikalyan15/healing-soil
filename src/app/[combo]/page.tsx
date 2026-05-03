import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { combinations } from '@/data/combinations'
import CombinationPage from '@/components/programmatic/CombinationPage'
import { getProducts } from '@/lib/products'

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

  return {
    title: `${combination.title} — Healing Soil`,
    description: combination.metaDescription,
    alternates: { canonical: `/${combo}` },
    openGraph: {
      title: combination.title,
      description: combination.metaDescription,
      url: `/${combo}`,
      siteName: 'Healing Soil',
      type: 'article',
    },
  }
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
  const products = allProducts.filter((p) => combination.relatedProducts.includes(p.slug))

  return <CombinationPage combination={combination} products={products} />
}
