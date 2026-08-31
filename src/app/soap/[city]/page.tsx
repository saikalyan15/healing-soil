import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { cities } from '@/data/cities'
import CityPage from '@/components/programmatic/CityPage'
import { buildMetadata } from '@/lib/seo'
import { climateFor, waterNote } from '@/data/climate'
import { getProducts } from '@/lib/products'
import { COMMERCE_ENABLED } from '@/lib/site-mode'

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  if (!COMMERCE_ENABLED) return []
  const today = new Date().toISOString().split('T')[0]
  return cities
    .filter((c) => c.publishedAt !== null && c.publishedAt <= today)
    .map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const cityData = cities.find((c) => c.slug === city)
  if (!cityData) return {}

  // Retargeted from delivery intent to climate intent. GSC shows city demand
  // only in a climate-plus-city shape: "best soap for humid weather chennai
  // bangalore" at 31 impressions and position 3.2, "best soap for humid weather
  // kolkata west bengal" at 27 and position 1.7. Nothing at all resembles
  // "handmade soap in {city}", which is what these pages used to target.
  const profile = climateFor(city)
  const title = `Best Soap for ${cityData.displayName} Water and Weather`
  const description = profile
    ? `${waterNote(profile)} Handmade in small batches in South Goa, shipped to ${cityData.displayName}.`
    : `Small batch handmade soap made in Goa, shipped to ${cityData.displayName}, ${cityData.state}. SLS-free, natural ingredients.`

  return buildMetadata({
    title,
    description,
    canonical: `/soap/${city}`,
    ogType: 'article',
  })
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
