import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { occasions } from '@/data/occasions'
import { buildMetadata } from '@/lib/seo'
import OccasionPage from '@/components/programmatic/OccasionPage'
import { getProducts , selectProducts } from '@/lib/products'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const today = new Date().toISOString().split('T')[0]
  return occasions
    .filter((o) => o.publishedAt !== null && o.publishedAt <= today)
    .map((o) => ({ slug: o.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const occasion = occasions.find((o) => o.slug === slug)
  if (!occasion) return {}

  return buildMetadata({
    title: occasion.title,
    description: occasion.metaDescription,
    canonical: `/occasion/${slug}`,
  })
}

export const dynamicParams = false

export default async function Page({ params }: Props) {
  const { slug } = await params
  const today = new Date().toISOString().split('T')[0]
  const occasion = occasions.find(
    (o) => o.slug === slug && o.publishedAt !== null && o.publishedAt <= today
  )

  if (!occasion) {
    notFound()
  }

  const allProducts = await getProducts()
  const products = selectProducts(allProducts, occasion.relatedProducts)

  return <OccasionPage occasion={occasion} products={products} />
}
