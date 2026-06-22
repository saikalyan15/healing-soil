'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'

export type SoapSquareCatalogItem = {
  name: string
  base: 'Glycerin' | 'Goat Milk' | 'Shea Butter' | 'Seasonal'
  image: string
}

type Props = {
  items: SoapSquareCatalogItem[]
}

const BASE_FILTERS = ['All', 'Glycerin', 'Goat Milk', 'Shea Butter', 'Seasonal'] as const

export default function SoapSquaresCatalogClient({ items }: Props) {
  const [activeBase, setActiveBase] = useState<(typeof BASE_FILTERS)[number]>('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return items.filter((item) => {
      const baseMatches = activeBase === 'All' || item.base === activeBase
      const nameMatches =
        normalizedQuery.length === 0 || item.name.toLowerCase().includes(normalizedQuery)

      return baseMatches && nameMatches
    })
  }, [activeBase, items, query])

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-b border-[#D6CFC4] pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-serif text-4xl leading-tight text-[#1E5631] md:text-5xl">
            50g Soap Squares Catalog
          </h1>
          <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-[#666666]">
            Plain square 50g variants for distributor, resale, hospitality, white-label, and bulk
            gifting conversations.
          </p>
        </div>

        <label className="block w-full md:max-w-xs">
          <span className="mb-1 block font-sans text-xs font-semibold uppercase text-[#666666]">
            Search by name
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Neem, honey, shea..."
            className="w-full rounded-md border border-[#D6CFC4] bg-white px-3 py-2 font-sans text-sm text-[#1A1A14] outline-none transition-colors placeholder:text-[#9A948B] focus:border-[#1E5631]"
            type="search"
          />
        </label>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {BASE_FILTERS.map((base) => (
          <button
            key={base}
            onClick={() => setActiveBase(base)}
            className={`rounded-full px-4 py-1.5 font-sans text-sm font-medium transition-colors ${
              activeBase === base
                ? 'bg-[#1E5631] text-white'
                : 'border border-[#D6CFC4] bg-white text-[#666666] hover:border-[#1E5631] hover:text-[#1E5631]'
            }`}
            type="button"
          >
            {base}
          </button>
        ))}
      </div>

      <div className="mb-4 font-sans text-sm text-[#666666]">
        Showing {filtered.length} of {items.length}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => (
          <article
            key={item.name}
            className="overflow-hidden rounded-lg border border-[#D6CFC4] bg-white"
          >
            <div className="relative aspect-square bg-[#EEE8DC]">
              <Image
                src={item.image}
                alt={`${item.name} 50g soap square`}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="px-4 py-3">
              <h2 className="font-serif text-xl leading-snug text-[#1A1A14]">{item.name}</h2>
              <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-wide text-[#1E5631]">
                {item.base}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
