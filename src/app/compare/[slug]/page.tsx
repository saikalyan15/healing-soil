import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { comparisons } from '@/data/comparisons'
import ComparisonPage from '@/components/programmatic/ComparisonPage'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const today = new Date().toISOString().split('T')[0]
  return comparisons
    .filter((c) => c.publishedAt !== null && c.publishedAt <= today)
    .map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const comparison = comparisons.find((c) => c.slug === slug)
  if (!comparison) return {}

  return {
    title: `${comparison.title} — Healing Soil`,
    description: comparison.metaDescription,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      title: comparison.title,
      description: comparison.metaDescription,
      url: `/compare/${slug}`,
      siteName: 'Healing Soil',
      type: 'article',
    },
  }
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

  return <ComparisonPage comparison={comparison} />
}
