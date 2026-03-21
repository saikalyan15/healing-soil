import type { Metadata } from 'next'
import Link from 'next/link'
import WhatsAppFallback from './WhatsAppFallback'

export const metadata: Metadata = {
  title: 'Confirm Your Order — Healing Soil',
  description: 'One more step — send your order on WhatsApp to confirm it with Healing Soil.',
  robots: { index: false, follow: false },
}

type Props = {
  searchParams: Promise<{ ref?: string }>
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const { ref = 'unknown' } = await searchParams

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-16">
      <div className="mx-auto max-w-lg px-4 text-center">

        {/* Pending icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>

        <h1 className="mb-2 font-serif text-4xl text-[#1A1A14]">One more step</h1>
        <p className="mb-6 font-serif text-xl text-[#1A1A14]">
          Send your order on WhatsApp to confirm it.
        </p>

        {/* Amber status badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="font-sans text-sm font-semibold text-amber-800">
            Order reserved — not confirmed until we receive your WhatsApp message
          </span>
        </div>

        {/* Primary action — WhatsApp */}
        <div className="mb-10 rounded-xl border border-[#25D366] bg-white p-6 shadow-sm">
          <p className="mb-4 font-sans text-sm text-[#1A1A14]">
            Review the message below, then tap the button to send it. We confirm and send you a payment link on WhatsApp.
          </p>
          <WhatsAppFallback />
        </div>

        {/* What happens next */}
        <div className="mb-10 text-left">
          <h2 className="mb-4 font-serif text-2xl text-[#1E5631]">What happens next?</h2>
          <div className="space-y-4 rounded-xl border border-[#D6CFC4] bg-white p-6 shadow-sm">
            <div className="flex gap-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E5631] text-xs font-bold text-white">1</span>
              <div>
                <p className="font-sans text-sm font-bold text-[#1A1A14]">Confirmation & Payment</p>
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

        <p className="mt-8 font-sans text-xs text-[#999999]">
          Having trouble placing your order?{' '}
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
