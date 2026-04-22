import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Order Received — Healing Soil',
  description: 'Your order has been received by Healing Soil.',
  robots: { index: false, follow: false },
}

export default async function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] py-16">
      <div className="mx-auto max-w-lg px-4 text-center">

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1E5631]">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="mb-2 font-serif text-4xl text-[#1A1A14]">Order received</h1>
        <p className="mb-8 font-sans text-base text-[#666666]">
          We&apos;ll confirm your order and send you a payment link on WhatsApp shortly.
        </p>

        <div className="mb-10 text-left">
          <h2 className="mb-4 font-serif text-2xl text-[#1E5631]">What happens next?</h2>
          <div className="space-y-4 rounded-xl border border-[#D6CFC4] bg-white p-6 shadow-sm">
            <div className="flex gap-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E5631] text-xs font-bold text-white">1</span>
              <div>
                <p className="font-sans text-sm font-bold text-[#1A1A14]">Confirmation &amp; Payment</p>
                <p className="font-sans text-sm leading-relaxed text-[#666666]">
                  We will message you to confirm and send a UPI QR code.{' '}
                  <span className="font-medium text-[#1A1A14]">Please note: We do not offer Cash on Delivery (COD).</span>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E5631] text-xs font-bold text-white">2</span>
              <div>
                <p className="font-sans text-sm font-bold text-[#1A1A14]">Made to Order</p>
                <p className="font-sans text-sm leading-relaxed text-[#666666]">
                  Every bar is handmade fresh just for you. Shipped in 4 days. Arrives in 3 to 7 days depending on your city.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E5631] text-xs font-bold text-white">3</span>
              <div>
                <p className="font-sans text-sm font-bold text-[#1A1A14]">Speed Post from Goa</p>
                <p className="font-sans text-sm leading-relaxed text-[#666666]">
                  We ship via India Post Speed Post from South Goa. India Post will notify you via SMS on the day of delivery.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E5631] text-xs font-bold text-white">4</span>
              <div>
                <p className="font-sans text-sm font-bold text-[#1A1A14]">Tracking by Phone Number</p>
                <p className="font-sans text-sm leading-relaxed text-[#666666]">
                  Need an update? Just message us on WhatsApp with your registered mobile number.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/shop"
          className="mr-4 inline-block rounded border border-[#1E5631] px-6 py-2.5 font-sans text-sm font-medium text-[#1E5631] transition-colors hover:bg-[#1E5631] hover:text-white"
        >
          Continue Shopping
        </Link>
        <Link
          href="/order/track"
          className="inline-block rounded bg-[#1E5631] px-6 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
        >
          Track My Order
        </Link>

        <p className="mt-8 font-sans text-xs text-[#999999]">
          Having trouble?{' '}
          <a
            href="https://wa.me/917483100651"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#1E5631] underline"
          >
            Message us on WhatsApp
          </a>{' '}
          and we&apos;ll sort it out.
        </p>
      </div>
    </div>
  )
}
