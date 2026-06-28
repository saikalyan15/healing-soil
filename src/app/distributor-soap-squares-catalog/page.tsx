import type { Metadata } from 'next'
import SoapSquaresCatalogClient, {
  type SoapSquareCatalogItem,
} from './SoapSquaresCatalogClient'

export const metadata: Metadata = {
  title: '50g Soap Squares Catalog | Healing Soil',
  description: 'Private distributor catalog for Healing Soil 50g soap squares.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

const IMAGE_BASE = '/products/50g-soap-squares/images'

const soapSquares: SoapSquareCatalogItem[] = [
  {
    id: 'neem-tulsi-glycerine',
    name: 'Neem Tulsi Glycerin',
    base: 'Glycerin',
    image: `${IMAGE_BASE}/neem-tulsi-glycerine-50g.png`,
  },
  {
    id: 'honey-oats-glycerin',
    name: 'Honey Oats Glycerin',
    base: 'Glycerin',
    image: `${IMAGE_BASE}/honey-oats-glycerin-50g.png`,
  },
  {
    id: 'ginger-rosemary-glycerin',
    name: 'Ginger Rosemary Glycerin',
    base: 'Glycerin',
    image: `${IMAGE_BASE}/ginger-rosemary-glycerin-50g.png`,
  },
  {
    id: 'orange-glycerine',
    name: 'Orange Glycerin',
    base: 'Glycerin',
    image: `${IMAGE_BASE}/orange-glycerine-50g.png`,
  },
  {
    id: 'pomegranate-glycerin',
    name: 'Pomegranate Glycerin',
    base: 'Glycerin',
    image: `${IMAGE_BASE}/pomegranate-glycerin-50g.png`,
  },
  {
    id: 'marigold-glycerine',
    name: 'Marigold Glycerin',
    base: 'Glycerin',
    image: `${IMAGE_BASE}/marigold-glycerine-50g.png`,
  },
  {
    id: 'neem-tulsi-goatmilk',
    name: 'Neem Tulsi Goat Milk',
    base: 'Goat Milk',
    image: `${IMAGE_BASE}/neem-tulsi-goatmilk-50g.png`,
  },
  {
    id: 'honey-oats-goatmilk',
    name: 'Honey Oats Goat Milk',
    base: 'Goat Milk',
    image: `${IMAGE_BASE}/honey-oats-goatmilk-50g.png`,
  },
  {
    id: 'ginger-rosemary-goat-milk',
    name: 'Ginger Rosemary Goat Milk',
    base: 'Goat Milk',
    image: `${IMAGE_BASE}/ginger-rosemary-goat-milk-50g.png`,
  },
  {
    id: 'orange-goatmilk',
    name: 'Orange Goat Milk',
    base: 'Goat Milk',
    image: `${IMAGE_BASE}/orange-goatmilk-50g.png`,
  },
  {
    id: 'pomegranate-goatmilk',
    name: 'Pomegranate Goat Milk',
    base: 'Goat Milk',
    image: `${IMAGE_BASE}/pomegranate-goatmilk-50g.png`,
  },
  {
    id: 'kesar-haldi-goatmilk',
    name: 'Kesar Haldi Goat Milk',
    base: 'Goat Milk',
    image: `${IMAGE_BASE}/kesar-haldi-goatmilk-50g.png`,
  },
  {
    id: 'kesar-gulab-sheabutter',
    name: 'Kesar Gulab Shea Butter',
    base: 'Shea Butter',
    image: `${IMAGE_BASE}/kesar-gulab-sheabutter-50g.png`,
  },
  {
    id: 'honey-kesar-haldi-sheabutter',
    name: 'Honey Kesar Haldi Shea Butter',
    base: 'Shea Butter',
    image: `${IMAGE_BASE}/honey-kesar-haldi-sheabutter-50g.png`,
  },
  {
    id: 'red-rose',
    name: 'Red Rose',
    base: 'Seasonal',
    image: `${IMAGE_BASE}/red-rose-50g.png`,
  },
]

type PageProps = {
  searchParams?: Promise<{
    items?: string
    vendor?: string
  }>
}

export default async function DistributorSoapSquaresCatalogPage({ searchParams }: PageProps) {
  const params = await searchParams
  const selectedIds = new Set(
    params?.items
      ?.split(',')
      .map((item) => item.trim())
      .filter(Boolean) ?? []
  )
  const isCustomView = selectedIds.size > 0
  const items = isCustomView
    ? soapSquares.filter((item) => selectedIds.has(item.id))
    : soapSquares
  const vendorName = params?.vendor?.trim() || undefined

  return (
    <main className="min-h-screen bg-[#F7F5F0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SoapSquaresCatalogClient
          isCustomView={isCustomView}
          items={items}
          vendorName={vendorName}
        />
      </div>
    </main>
  )
}
