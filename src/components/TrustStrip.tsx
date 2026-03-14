import React from 'react'

const items = ['Handmade', 'No chemicals', 'Small batch', 'Made to order', 'Goa']

export default function TrustStrip() {
  return (
    <div className="w-full bg-cream border-b border-[#E8E0D5]">
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-2.5">
        <div className="flex min-w-max items-center justify-center gap-0 md:min-w-0 md:flex-wrap">
          {items.map((item, i) => (
            <React.Fragment key={item}>
              <span className="whitespace-nowrap px-3 font-sans text-xs font-bold uppercase tracking-widest text-text-dark">
                {item}
              </span>
              {i < items.length - 1 && (
                <span className="select-none font-bold text-gold" aria-hidden="true">
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
