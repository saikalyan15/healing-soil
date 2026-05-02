import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ayurvedic } from '@/data/ayurvedic'
import AyurvedicPage from '@/components/programmatic/AyurvedicPage'
import { getProducts } from '@/lib/products'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const today = new Date().toISOString().split('T')[0]
  return ayurvedic
    .filter((a) => a.publishedAt !== null && a.publishedAt <= today)
    .map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = ayurvedic.find((a) => a.slug === slug)
  if (!page) return {}

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `/ayurvedic-soap/${slug}` },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `/ayurvedic-soap/${slug}`,
      siteName: 'Healing Soil',
      type: 'website',
    },
  }
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
  const products = allProducts.filter((p) => page.relatedProducts.includes(p.slug))

  return <AyurvedicPage page={page} products={products} />
}
