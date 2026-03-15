import type { Metadata } from 'next'
import Link from 'next/link'
import WhatsAppFallback from './WhatsAppFallback'

export const metadata: Metadata = {
  title: 'Order Received — Healing Soil',
  description: 'Your order has been received. Deepanjali will confirm availability and contact you on WhatsApp shortly.',
  robots: { index: false, follow: false },
}

type Props = {
  searchParams: { ref?: string }
}

export default function ConfirmationPage({ searchParams }: Props) {
  const ref = searchParams.ref ?? 'unknown'

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-16">
      <div className="mx-auto max-w-lg px-4 text-center">
        {/* Check icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1E5631]">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="mb-4 font-serif text-4xl text-[#1E5631]">Order received!</h1>

        {/* Reference number */}
        <div className="mb-6 inline-block rounded-lg border border-[#D6CFC4] bg-white px-8 py-4">
          <p className="mb-1 font-sans text-xs uppercase tracking-widest text-[#999]">
            Order reference
          </p>
          <p className="font-serif text-3xl font-semibold tracking-wide text-[#1A1A14]">
            #{ref}
          </p>
        </div>

        <p className="mb-2 font-sans text-base text-[#1A1A14]">
          Your order has been recorded.
        </p>
        <p className="mb-10 font-sans text-sm text-[#666666]">
          Deepanjali will confirm availability and get back to you on WhatsApp shortly.
        </p>

        {/* WhatsApp fallback box */}
        <div className="mb-8 rounded-lg border border-[#D6CFC4] bg-white p-6 text-left">
          <p className="mb-4 font-sans text-sm text-[#1A1A14]">
            If WhatsApp did not open automatically, tap the button below to send your order:
          </p>
          <WhatsAppFallback />
          <p className="mt-4 font-sans text-sm text-[#666666]">
            Or reach Deepanjali directly:{' '}
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

        <div className="mb-10 text-left">
          <h2 className="mb-4 font-serif text-2xl text-[#1E5631]">What happens next?</h2>
          <div className="space-y-4 rounded-xl border border-[#D6CFC4] bg-white p-6 shadow-sm">
            <div className="flex gap-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E5631] text-xs font-bold text-white">1</span>
              <div>
                <p className="font-sans text-sm font-bold text-[#1A1A14]">WhatsApp Confirmation</p>
                <p className="font-sans text-sm leading-relaxed text-[#666666]">
                  Deepanjali will message you to confirm the items in your order are in stock and ready to be packed.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E5631] text-xs font-bold text-white">2</span>
              <div>
                <p className="font-sans text-sm font-bold text-[#1A1A14]">UPI Payment</p>
                <p className="font-sans text-sm leading-relaxed text-[#666666]">
                  We will send you a UPI QR code or bank details. 
                  <span className="ml-1 font-medium text-[#1A1A14]">Please note: We do not offer Cash on Delivery (COD).</span>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E5631] text-xs font-bold text-white">3</span>
              <div>
                <p className="font-sans text-sm font-bold text-[#1A1A14]">Shipping from Goa</p>
                <p className="font-sans text-sm leading-relaxed text-[#666666]">
                  Once payment is confirmed, your fresh soaps are shipped from South Goa, and we send you the tracking link.
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
      </div>
    </div>
  )
}
