'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'
import type { Product } from '@/lib/products'

type ShopClientProps = {
  products: Product[]
}

export default function ShopClient({ products }: ShopClientProps) {
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All' ? products : products.filter((p) => p.category === active)

  return (
    <div>
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
