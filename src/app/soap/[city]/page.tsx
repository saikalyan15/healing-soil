import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { cities } from '@/data/cities'
import CityPage from '@/components/programmatic/CityPage'
import { getProducts } from '@/lib/products'

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  const today = new Date().toISOString().split('T')[0]
  return cities
    .filter((c) => c.publishedAt !== null && c.publishedAt <= today)
    .map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const cityData = cities.find((c) => c.slug === city)
  if (!cityData) return {}

  const title = `Handmade Soap Delivered to ${cityData.displayName} | Healing Soil`
  const description = `Small batch handmade soap made in Goa, delivered to ${cityData.displayName}, ${cityData.state}. SLS-free, natural ingredients.`

  return {
    title,
    description,
    alternates: { canonical: `/soap/${city}` },
    openGraph: {
      title,
      description,
      url: `/soap/${city}`,
      siteName: 'Healing Soil',
      type: 'article',
    },
  }
}

export const dynamicParams = false

export default async function Page({ params }: Props) {
  const { city } = await params
  const today = new Date().toISOString().split('T')[0]
  const cityData = cities.find(
    (c) => c.slug === city && c.publishedAt !== null && c.publishedAt <= today
  )

  if (!cityData) {
    notFound()
  }

  const allProducts = await getProducts()
  const products = allProducts.filter((p) => p.in_stock)

  return <CityPage city={cityData} products={products} />
}
