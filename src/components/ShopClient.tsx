'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'
import type { Product } from '@/lib/products'

const TEXTURE_DESCRIPTIONS: Record<string, string> = {
  smooth: 'Plain lather, straightforward wash. Nothing added.',
  'mildly-textured': 'Fine particles with a barely-there feel. Not scratchy.',
  textured: 'Visible botanicals or grit from ingredients like neem powder, oat flakes, or dried petals.',
  loofah: 'Embedded loofah mesh for a firm, thorough wash.',
  mixed: 'A pack containing bars of different textures.',
}

// Slugs that surface when "Gifts" quick-filter is active
const GIFT_SLUGS = new Set(['gift-soap-pouch', 'kids-collection', 'travel-soaps'])

type ShopClientProps = {
  products: Product[]
}

const TEXTURE_FILTERS = [
  { value: 'all', label: 'All textures' },
  { value: 'smooth', label: 'Smooth' },
  { value: 'mildly-textured', label: 'Mildly Textured' },
  { value: 'textured', label: 'Textured' },
  { value: 'loofah', label: 'Loofah' },
  { value: 'mixed', label: 'Mixed' },
]

export default function ShopClient({ products }: ShopClientProps) {
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]
  const [active, setActive] = useState('All')
  const [giftsActive, setGiftsActive] = useState(false)
  const [activeTexture, setActiveTexture] = useState('all')
  const [showTextureGuide, setShowTextureGuide] = useState(false)

  const filtered = products
    .filter((p) => {
      if (giftsActive) return GIFT_SLUGS.has(p.slug)
      return active === 'All' || p.category === active
    })
    .filter((p) => {
      if (giftsActive) return true  // don't apply texture filter in gifts view
      if (activeTexture === 'all') return true
      if (activeTexture === 'mixed') return !p.texture
      return p.texture === activeTexture
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

      {/* Gifts quick-filter */}
      <div className="mb-4">
        <button
          onClick={() => {
            setGiftsActive((v) => !v)
            setActive('All')
            setActiveTexture('all')
          }}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2 font-sans text-sm font-semibold transition-colors ${
            giftsActive
              ? 'bg-[#C9A84C] text-white'
              : 'border-2 border-[#C9A84C] bg-white text-[#C9A84C] hover:bg-[#C9A84C] hover:text-white'
          }`}
        >
          🎁 Shop Gifts
        </button>
        {giftsActive && (
          <p className="mt-2 font-sans text-xs text-[#666666]">
            Gift soap pouches, kids collection, and travel sets — ready to wrap.
          </p>
        )}
      </div>

      {/* Category filter tabs — hidden when gifts filter is active */}
      {!giftsActive && categories.length > 1 && (
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

      {/* Texture filter tabs — hidden when gifts filter is active */}
      {!giftsActive && (
        <>
          <div className="mb-2 flex flex-wrap items-center gap-2">
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
            <button
              onClick={() => setShowTextureGuide((v) => !v)}
              className="ml-1 font-sans text-xs text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]"
            >
              {showTextureGuide ? 'Hide guide' : 'What do these mean?'}
            </button>
          </div>
          {showTextureGuide && (
            <div className="mb-6 rounded-lg border border-[#D6CFC4] bg-white px-4 py-4">
              <ul className="space-y-2">
                {TEXTURE_FILTERS.filter((t) => t.value !== 'all').map((t) => (
                  <li key={t.value} className="flex gap-2 font-sans text-sm">
                    <span className="font-medium text-[#1A1A14] min-w-[110px]">{t.label}</span>
                    <span className="text-[#666666]">{TEXTURE_DESCRIPTIONS[t.value]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
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
