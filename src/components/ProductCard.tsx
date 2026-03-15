'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useOrderStore } from '@/lib/store'
import type { Product } from '@/lib/products'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useOrderStore((s) => s.addItem)
  const [added, setAdded] = useState(false)
  const [expanded, setExpanded] = useState(false)

  function handleAddToOrder() {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const displayPrice = product.price_range || `₹${product.price}`
  const isLong = product.description.length > 80

  return (
    <div className="group flex flex-col rounded-lg border border-[#D6CFC4] bg-white overflow-hidden transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F7F5F0]">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#D6CFC4]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="font-sans text-xs font-medium text-white bg-black/60 px-3 py-1 rounded-full">
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="font-serif text-[20px] text-[#1A1A14] leading-snug">
          {product.name}
        </h3>
        <div className="flex-1">
          <p className={`font-sans text-[14px] text-[#666666] leading-relaxed ${!expanded && isLong ? 'line-clamp-2' : ''}`}>
            {product.description}
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-1 font-sans text-xs text-[#1E5631] hover:underline"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
        <p className="font-sans text-sm font-bold text-[#1E5631] mt-1">
          {displayPrice}
        </p>
      </div>

      {/* Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToOrder}
          disabled={!product.in_stock}
          className={`w-full rounded py-2.5 font-sans text-sm font-medium transition-colors ${
            added
              ? 'bg-[#C9A84C] text-[#1A1A14]'
              : product.in_stock
              ? 'bg-[#1E5631] text-white hover:bg-[#C9A84C] hover:text-[#1A1A14]'
              : 'bg-[#D6CFC4] text-[#999] cursor-not-allowed'
          }`}
        >
          {added ? 'Added ✓' : 'Add to Order'}
        </button>
      </div>
    </div>
  )
}
