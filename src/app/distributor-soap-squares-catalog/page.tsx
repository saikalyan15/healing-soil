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
    name: 'Neem Tulsi Glycerin',
    base: 'Glycerin',
    image: `${IMAGE_BASE}/neem-tulsi-glycerine-50g.png`,
  },
  {
    name: 'Honey Oats Glycerin',
    base: 'Glycerin',
    image: `${IMAGE_BASE}/honey-oats-glycerin-50g.png`,
  },
  {
    name: 'Ginger Rosemary Glycerin',
    base: 'Glycerin',
    image: `${IMAGE_BASE}/ginger-rosemary-glycerin-50g.png`,
  },
  {
    name: 'Orange Glycerin',
    base: 'Glycerin',
    image: `${IMAGE_BASE}/orange-glycerine-50g.png`,
  },
  {
    name: 'Pomegranate Glycerin',
    base: 'Glycerin',
    image: `${IMAGE_BASE}/pomegranate-glycerin-50g.png`,
  },
  {
    name: 'Marigold Glycerin',
    base: 'Glycerin',
    image: `${IMAGE_BASE}/marigold-glycerine-50g.png`,
  },
  {
    name: 'Neem Tulsi Goat Milk',
    base: 'Goat Milk',
    image: `${IMAGE_BASE}/neem-tulsi-goatmilk-50g.png`,
  },
  {
    name: 'Honey Oats Goat Milk',
    base: 'Goat Milk',
    image: `${IMAGE_BASE}/honey-oats-goatmilk-50g.png`,
  },
  {
    name: 'Ginger Rosemary Goat Milk',
    base: 'Goat Milk',
    image: `${IMAGE_BASE}/ginger-rosemary-goat-milk-50g.png`,
  },
  {
    name: 'Orange Goat Milk',
    base: 'Goat Milk',
    image: `${IMAGE_BASE}/orange-goatmilk-50g.png`,
  },
  {
    name: 'Pomegranate Goat Milk',
    base: 'Goat Milk',
    image: `${IMAGE_BASE}/pomegranate-goatmilk-50g.png`,
  },
  {
    name: 'Kesar Haldi Goat Milk',
    base: 'Goat Milk',
    image: `${IMAGE_BASE}/kesar-haldi-goatmilk-50g.png`,
  },
  {
    name: 'Kesar Gulab Shea Butter',
    base: 'Shea Butter',
    image: `${IMAGE_BASE}/kesar-gulab-sheabutter-50g.png`,
  },
  {
    name: 'Honey Kesar Haldi Shea Butter',
    base: 'Shea Butter',
    image: `${IMAGE_BASE}/honey-kesar-haldi-sheabutter-50g.png`,
  },
  {
    name: 'Red Rose',
    base: 'Seasonal',
    image: `${IMAGE_BASE}/red-rose-50g.png`,
  },
]

export default function DistributorSoapSquaresCatalogPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SoapSquaresCatalogClient items={soapSquares} />
      </div>
    </main>
  )
}
