'use client'

import Link from 'next/link'
import { useOrderStore } from '@/lib/store'
import OrderForm from './OrderForm'

export default function OrderPageClient() {
  const itemCount = useOrderStore((s) => s.itemCount)

  if (itemCount === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <p className="mb-2 font-serif text-3xl text-[#1E5631]">Your order is empty</p>
        <p className="mb-8 font-sans text-sm text-[#666666]">
          Add some soaps to your order first.
        </p>
        <Link
          href="/shop"
          className="rounded bg-[#1E5631] px-8 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
        >
          Browse the shop
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
      {/* Order form */}
      <div className="lg:col-span-3">
        <div className="rounded-lg border border-[#D6CFC4] bg-white p-6 sm:p-8">
          <OrderForm />
        </div>
      </div>

      {/* Reassurance panel */}
      <aside className="lg:col-span-2">
        <div className="sticky top-24 space-y-6 rounded-lg border border-[#D6CFC4] bg-white p-6">
          {/* Snehal Rane review */}
          <div className="rounded border-l-4 border-l-[#C9A84C] bg-[#FFF8E8] p-4">
            <p className="mb-3 font-serif text-[17px] italic leading-relaxed text-[#1A1A14]">
              "This handmade natural soap has become a staple in my routine. My skin feels
              noticeably softer, dryness is a thing of the past, and it has even helped reduce
              my tan."
            </p>
            <div>
              <p className="font-sans text-sm font-bold text-[#1E5631]">Snehal Rane</p>
              <p className="font-sans text-xs text-[#666666]">Bangalore</p>
            </div>
          </div>

          {/* How it works */}
          <div>
            <h3 className="mb-3 font-sans text-sm font-bold text-[#1A1A14]">How it works</h3>
            <ul className="space-y-2.5">
              {[
                'Place your order — no payment yet',
                'Deepanjali confirms availability on WhatsApp',
                'You pay only after confirmation',
                'Handmade and shipped from Goa',
              ].map((step) => (
                <li key={step} className="flex gap-2.5 font-sans text-sm text-[#666666]">
                  <span className="mt-0.5 font-bold text-[#C9A84C]">✓</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <p className="border-t border-[#D6CFC4] pt-4 font-sans text-xs text-[#666666]">
            Questions? WhatsApp Deepanjali at{' '}
            <a
              href="https://wa.me/917483100651"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#1E5631]"
            >
              +91 74831 00651
            </a>
          </p>
        </div>
      </aside>
    </div>
  )
}
