import type { Metadata } from 'next'
import Link from 'next/link'
import WhatsAppFallback from './WhatsAppFallback'

export const metadata: Metadata = {
  title: 'Order Received — Healing Soil',
  description: 'Your order has been received. Healing Soil will confirm availability and contact you on WhatsApp shortly.',
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

        <h1 className="mb-2 font-serif text-4xl text-[#1E5631]">Thank you!</h1>
        <p className="mb-8 font-serif text-2xl text-[#1A1A14]">Your order has been placed.</p>

        {/* Info box */}
        <div className="mb-8 rounded-lg border border-[#D6CFC4] bg-white p-6 text-center shadow-sm">
          <p className="mb-2 font-sans text-lg font-medium text-[#1A1A14]">
            No complex order numbers to remember.
          </p>
          <p className="font-sans text-sm leading-relaxed text-[#666666]">
            To know the status of your order, just WhatsApp us from your registered mobile number. That's all we need to find your details!
          </p>
        </div>

        <p className="mb-6 font-sans text-base text-[#1A1A14]">
          Since every bar is handmade fresh just for you (made to order), we will first check our schedule, confirm your order details, and then send you a payment link via WhatsApp.
        </p>
        <p className="mb-10 font-sans text-sm text-[#666666]">
          Healing Soil will get back to you shortly to confirm availability and payment.
        </p>

        {/* WhatsApp fallback box */}
        <div className="mb-8 rounded-lg border border-[#D6CFC4] bg-[#F7F5F0]/50 p-6 text-left">
          <p className="mb-4 font-sans text-sm text-[#1A1A14]">
            If WhatsApp did not open automatically, tap the button below to send your order:
          </p>
          <WhatsAppFallback />
          <p className="mt-4 font-sans text-sm text-[#666666]">
            Or reach us directly:{' '}
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
                <p className="font-sans text-sm font-bold text-[#1A1A14]">Confirmation & Payment</p>
                <p className="font-sans text-sm leading-relaxed text-[#666666]">
                  We will message you to confirm and send a UPI QR code. 
                  <span className="ml-1 font-medium text-[#1A1A14]">Please note: We do not offer Cash on Delivery (COD).</span>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E5631] text-xs font-bold text-white">2</span>
              <div>
                <p className="font-sans text-sm font-bold text-[#1A1A14]">Made to Order</p>
                <p className="font-sans text-sm leading-relaxed text-[#666666]">
                  Every bar is handmade fresh just for you. Total time to reach you via India Post is 8–15 days.
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
                  Need an update? Just message us on WhatsApp with your registered mobile number. No need to keep track of order numbers.
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
