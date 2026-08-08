'use client'

import { useState } from 'react'
import Image from 'next/image'
import { sendGAEvent } from '@next/third-parties/google'
import { GA4_EVENT } from '@/lib/analytics'
import { useOrderStore } from '@/lib/store'
import type { Product } from '@/lib/products'
import { trackMetaEvent } from '@/lib/meta-pixel'

type BundlePickerProps = {
  products: Product[]
  defaultIds: string[]
}

export default function BundlePicker({ products, defaultIds }: BundlePickerProps) {
  const addItem = useOrderStore((s) => s.addItem)
  const [added, setAdded] = useState(false)

  // A sold-out default would land in a slot and leave the add button dead on
  // arrival, so swap it for the closest available bar (same base first).
  const [selection, setSelection] = useState<Product[]>(() => {
    const chosen: Product[] = []
    const used = new Set<string>()
    for (const id of defaultIds) {
      const wanted = products.find((p) => p.id === id)
      if (!wanted || used.has(wanted.id)) continue
      const usable = wanted.in_stock
        ? wanted
        : products.find((p) => p.in_stock && !used.has(p.id) && p.base === wanted.base) ??
          products.find((p) => p.in_stock && !used.has(p.id)) ??
          wanted
      chosen.push(usable)
      used.add(usable.id)
    }
    return chosen
  })

  function setSlot(idx: number, productId: string) {
    const next = products.find((p) => p.id === productId)
    if (!next || !next.in_stock) return
    setSelection((prev) => prev.map((p, i) => (i === idx ? next : p)))
  }

  function handleAdd() {
    selection.forEach((p) => addItem(p))
    sendGAEvent('event', GA4_EVENT.ADD_TO_CART, {
      currency: 'INR',
      value: total,
      items: selection.map((p) => ({
        item_id: p.id,
        item_name: p.name,
        price: p.price,
        quantity: 1,
      })),
    })
    trackMetaEvent('AddToCart', {
      value: total,
      currency: 'INR',
      content_ids: selection.map((p) => p.slug),
      content_name: 'Build Your Own Bundle',
      content_type: 'product',
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
          {allAvailable
            ? 'You can swap any soap before checkout.'
            : 'One of these is sold out right now. Pick another soap in that slot to carry on.'}
        </p>
      </div>
    </div>
  )
}
