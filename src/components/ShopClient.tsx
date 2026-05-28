'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'
import type { Product } from '@/lib/products'

type ShopClientProps = {
  products: Product[]
}

const TEXTURE_FILTERS = [
  { value: 'all', label: 'All textures' },
  { value: 'smooth', label: 'Smooth' },
  { value: 'mildly-textured', label: 'Mildly Textured' },
  { value: 'textured', label: 'Textured' },
  { value: 'loofah', label: 'Loofah' },
]

export default function ShopClient({ products }: ShopClientProps) {
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]
  const [active, setActive] = useState('All')
  const [activeTexture, setActiveTexture] = useState('all')

  const filtered = products
    .filter((p) => active === 'All' || p.category === active)
    .filter((p) => {
      if (activeTexture === 'all') return true
      const t = p.texture ?? 'smooth'
      return t === activeTexture
    })

  return (
    <div>
      {/* Handmade variation notice */}
      <div className="mb-8 flex items-start gap-3 rounded-lg border border-[#D6CFC4] bg-white px-4 py-3">
        <span className="mt-0.5 text-lg leading-none">🌿</span>
        <p className="font-sans text-[13px] leading-relaxed text-[#666666]">
          <span className="font-medium text-[#1A1A14]">Every bar is made to order by hand.</span>{' '}
          Images are illustrative. Natural ingredients mean the colour, texture and marbling of
          your soap will vary slightly from what you see. That variation is not a flaw; it is proof
          it was made fresh, just for you.
        </p>
      </div>

      {/* Category filter tabs */}
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-1.5 font-sans text-sm font-medium capitalize transition-colors ${
                active === cat
                  ? 'bg-[#1E5631] text-white'
                  : 'border border-[#D6CFC4] bg-white text-[#666666] hover:border-[#1E5631] hover:text-[#1E5631]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Texture filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {TEXTURE_FILTERS.map((t) => (
          <button
            key={t.value}
            onClick={() => setActiveTexture(t.value)}
            className={`rounded-full px-4 py-1.5 font-sans text-sm font-medium capitalize transition-colors ${
              activeTexture === t.value
                ? 'bg-[#1E5631] text-white'
                : 'border border-[#D6CFC4] bg-white text-[#666666] hover:border-[#1E5631] hover:text-[#1E5631]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <p className="font-sans text-sm text-[#999]">No products in this category.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
