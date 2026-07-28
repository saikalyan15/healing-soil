import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { cities } from '@/data/cities'
import { ingredients } from '@/data/ingredients'
import { cityIngredientBatches } from '@/data/city-ingredients'
import { buildMetadata } from '@/lib/seo'
import CityIngredientPage from '@/components/programmatic/CityIngredientPage'
import { getProducts, selectProducts } from '@/lib/products'

type Props = { params: Promise<{ city: string; ingredient: string }> }

export async function generateStaticParams() {
  const today = new Date().toISOString().split('T')[0]

  const enabledIngredientSlugs = cityIngredientBatches
    .filter((b) => b.publishedAt !== null && b.publishedAt <= today)
    .map((b) => b.ingredientSlug)

  const publishedCities = cities.filter(
    (c) => c.publishedAt !== null && c.publishedAt <= today
  )

  return enabledIngredientSlugs.flatMap((ingredientSlug) =>
    publishedCities.map((c) => ({ city: c.slug, ingredient: ingredientSlug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, ingredient: ingredientSlug } = await params
  const cityData = cities.find((c) => c.slug === citySlug)
  const ingredientData = ingredients.find((i) => i.slug === ingredientSlug)
  if (!cityData || !ingredientData) return {}

  // The previous template carried 61 characters of fixed chrome before any
  // variable, so every one of these 378 pages exceeded the 60 character budget
  // no matter which city or ingredient filled it in.
  const title = `${ingredientData.name} Soap in ${cityData.displayName}`
  const description = `Handmade ${ingredientData.name.toLowerCase()} soap made in small batches in Goa, delivered to ${cityData.displayName}. SLS-free, no parabens, no synthetic fragrance.`

  return buildMetadata({
    title,
    description,
    canonical: `/soap/${citySlug}/${ingredientSlug}`,
    ogType: 'article',
  })
}

export const dynamicParams = false

export default async function Page({ params }: Props) {
  const { city: citySlug, ingredient: ingredientSlug } = await params
  const today = new Date().toISOString().split('T')[0]

  const cityData = cities.find(
    (c) => c.slug === citySlug && c.publishedAt !== null && c.publishedAt <= today
  )
  const ingredientData = ingredients.find((i) => i.slug === ingredientSlug)
  const batch = cityIngredientBatches.find(
    (b) => b.ingredientSlug === ingredientSlug && b.publishedAt !== null && b.publishedAt <= today
  )

  if (!cityData || !ingredientData || !batch) {
    notFound()
  }

  const allProducts = await getProducts()
  const relatedProducts = selectProducts(allProducts, ingredientData.relatedProducts, { inStockOnly: true })
  const products = relatedProducts.length > 0
    ? relatedProducts
    : allProducts.filter((p) => p.in_stock).slice(0, 4)

  return <CityIngredientPage city={cityData} ingredient={ingredientData} products={products} />
}
