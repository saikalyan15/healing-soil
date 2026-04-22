'use client'

import { useState } from 'react'
import Image from 'next/image'
import { sendGAEvent } from '@next/third-parties/google'
import { useOrderStore } from '@/lib/store'
import type { Product } from '@/lib/products'

type BundlePickerProps = {
  products: Product[]
  defaultIds: string[]
}

export default function BundlePicker({ products, defaultIds }: BundlePickerProps) {
  const addItem = useOrderStore((s) => s.addItem)
  const [added, setAdded] = useState(false)

  const initial: Product[] = defaultIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p != null)

  const [selection, setSelection] = useState<Product[]>(initial)

  function setSlot(idx: number, productId: string) {
    const next = products.find((p) => p.id === productId)
    if (!next) return
    setSelection((prev) => prev.map((p, i) => (i === idx ? next : p)))
  }

  function handleAdd() {
    selection.forEach((p) => addItem(p))
    sendGAEvent('event', 'add_to_cart', {
      currency: 'INR',
      value: total,
      items: selection.map((p) => ({
        item_id: p.id,
        item_name: p.name,
        price: p.price,
        quantity: 1,
      })),
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const total = selection.reduce((s, p) => s + p.price, 0)
  const allAvailable = selection.every((p) => p.in_stock)

  if (selection.length === 0) {
    return (
      <p className="text-center font-sans text-sm text-[#999]">
        Bundle is loading. Please refresh in a moment.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {selection.map((slot, i) => (
          <div
            key={i}
            className="flex flex-col rounded-lg border border-[#D6CFC4] bg-white overflow-hidden"
          >
            <div className="relative aspect-square w-full bg-[#F7F5F0]">
              {slot.image_url ? (
                <Image
                  src={slot.image_url}
                  alt={slot.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              <label
                htmlFor={`bundle-slot-${i}`}
                className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]"
              >
                Slot {i + 1}
              </label>
              <select
                id={`bundle-slot-${i}`}
                value={slot.id}
                onChange={(e) => setSlot(i, e.target.value)}
                className="w-full rounded border border-[#D6CFC4] bg-white px-2 py-2 font-serif text-base text-[#1A1A14] focus:border-[#1E5631] focus:outline-none"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id} disabled={!p.in_stock}>
                    {p.name} {p.in_stock ? '' : '(out of stock)'}
                  </option>
                ))}
              </select>
              <p className="flex-1 font-sans text-xs leading-relaxed text-[#666666]">
                {slot.description}
              </p>
              <p className="font-sans text-sm font-bold text-[#1E5631]">
                ₹{slot.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-[#D6CFC4] bg-[#F7F5F0] p-6 text-center">
        <p className="font-serif text-2xl text-[#1A1A14]">
          Total ₹{total}
          {total >= 1000 && (
            <span className="ml-2 font-sans text-sm font-medium text-[#1E5631]">
              · free shipping included
            </span>
          )}
        </p>
        <button
          onClick={handleAdd}
          disabled={!allAvailable}
          className={`mt-4 w-full rounded px-8 py-3 font-sans text-sm font-medium transition-colors sm:w-auto ${
            added
              ? 'bg-[#C9A84C] text-[#1A1A14]'
              : allAvailable
              ? 'bg-[#1E5631] text-white hover:bg-[#C9A84C] hover:text-[#1A1A14]'
              : 'bg-[#D6CFC4] text-[#999] cursor-not-allowed'
          }`}
        >
          {added ? 'Added to cart ✓' : 'Add the bundle to cart'}
        </button>
        <p className="mt-3 font-sans text-xs text-[#666666]">
          You can swap any soap before checkout.
        </p>
      </div>
    </div>
  )
}
