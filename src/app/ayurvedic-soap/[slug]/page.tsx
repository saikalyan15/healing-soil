import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ayurvedic } from '@/data/ayurvedic'
import { buildMetadata } from '@/lib/seo'
import AyurvedicPage from '@/components/programmatic/AyurvedicPage'
import { getProducts , selectProducts } from '@/lib/products'
import { COMMERCE_ENABLED } from '@/lib/site-mode'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  if (!COMMERCE_ENABLED) return []
  const today = new Date().toISOString().split('T')[0]
  return ayurvedic
    .filter((a) => a.publishedAt !== null && a.publishedAt <= today)
    .map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = ayurvedic.find((a) => a.slug === slug)
  if (!page) return {}

  return buildMetadata({
    title: page.title,
    description: page.metaDescription,
    canonical: `/ayurvedic-soap/${slug}`,
  })
}

export const dynamicParams = false

export default async function Page({ params }: Props) {
  const { slug } = await params
  const today = new Date().toISOString().split('T')[0]
  const page = ayurvedic.find(
    (a) => a.slug === slug && a.publishedAt !== null && a.publishedAt <= today
  )

  if (!page) {
    notFound()
  }

  const allProducts = await getProducts()
  const products = selectProducts(allProducts, page.relatedProducts)

  return <AyurvedicPage page={page} products={products} />
}
