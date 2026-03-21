'use client'

import { useState } from 'react'
import { useOrderStore } from '@/lib/store'
import type { Product } from '@/lib/products'
import { sendGAEvent } from '@next/third-parties/google'

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useOrderStore((s) => s.addItem)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product)
    sendGAEvent('event', 'add_to_cart', {
      currency: 'INR',
      value: product.price,
      items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity: 1 }],
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleAdd}
      disabled={!product.in_stock}
      className={`w-full rounded py-3 font-sans text-sm font-medium transition-colors ${
        added
          ? 'bg-[#C9A84C] text-[#1A1A14]'
          : product.in_stock
          ? 'bg-[#1E5631] text-white hover:bg-[#C9A84C] hover:text-[#1A1A14]'
          : 'bg-[#D6CFC4] text-[#999] cursor-not-allowed'
      }`}
    >
      {added ? 'Added to Cart ✓' : 'Add to Cart'}
    </button>
  )
}
