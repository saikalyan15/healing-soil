import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ingredients } from '@/data/ingredients'
import IngredientPage from '@/components/programmatic/IngredientPage'
import { getProducts } from '@/lib/products'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const today = new Date().toISOString().split('T')[0]
  return ingredients
    .filter((i) => i.publishedAt !== null && i.publishedAt <= today)
    .map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ingredient = ingredients.find((i) => i.slug === slug)
  if (!ingredient) return {}

  return {
    title: `${ingredient.title} — Healing Soil`,
    description: ingredient.metaDescription,
    alternates: { canonical: `/ingredient/${slug}` },
    openGraph: {
      title: ingredient.title,
      description: ingredient.metaDescription,
      url: `/ingredient/${slug}`,
      siteName: 'Healing Soil',
      type: 'article',
    },
  }
}

export const dynamicParams = false

export default async function Page({ params }: Props) {
  const { slug } = await params
  const today = new Date().toISOString().split('T')[0]
  const ingredient = ingredients.find(
    (i) => i.slug === slug && i.publishedAt !== null && i.publishedAt <= today
  )

  if (!ingredient) {
    notFound()
  }

  const allProducts = await getProducts()
  const products = allProducts.filter((p) => ingredient.relatedProducts.includes(p.slug))

  return <IngredientPage ingredient={ingredient} products={products} />
}
