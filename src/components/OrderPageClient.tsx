'use client'

import { useState, useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { sendGAEvent } from '@next/third-parties/google'
import { useRouter } from 'next/navigation'
import { useOrderStore } from '@/lib/store'
import OrderForm from './OrderForm'

const WA_NUMBER = '917483100651'

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function OrderPageClient() {
  const router = useRouter()
  const itemCount = useOrderStore((s) => s.itemCount)

  const [step, setStep] = useState<'form' | 'send'>('form')
  const [orderRef, setOrderRef] = useState('')
  const [waHref, setWaHref] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  // Set synchronously before any clearOrder() call so the redirect guard
  // below never fires during the cart-clear re-render
  const orderPlacedRef = useRef(false)

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent))
  }, [])

  // Redirect to shop only if the cart is empty and no order has been placed
  useEffect(() => {
    if (itemCount === 0 && !orderPlacedRef.current) {
      router.push('/shop')
    }
  }, [itemCount, router])

  // Called by OrderForm after a successful SoapLedger submission
  function handleOrderSuccess(ref: string, href: string) {
    orderPlacedRef.current = true  // gate the redirect — set before clearOrder fires
    setOrderRef(ref)
    setWaHref(href)
    setStep('send')
  }

  // ── Step 2: Send on WhatsApp ───────────────────────────────────────────────

  if (step === 'send') {
    return (
      <div className="mx-auto max-w-md space-y-6 py-4 text-center">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1E5631]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-[#1A1A14]">
            Your order is ready. Send it on WhatsApp to place it.
          </h2>
          <p className="mt-1 font-sans text-sm text-[#999]">Order #{orderRef}</p>
        </div>

        <p className="font-sans text-sm text-[#444444]">
          Send us your order on WhatsApp. We&apos;ll confirm it and send you a payment link.
        </p>

        {isMobile ? (
          <div className="space-y-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendGAEvent('event', 'whatsapp_send_clicked', { event_category: 'order_funnel', event_label: 'order_form_step2' })}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#25D366] px-6 py-4 font-sans text-base font-bold text-white shadow-sm transition-colors hover:bg-[#1ebe5d]"
            >
              <WhatsAppIcon />
              Send on WhatsApp →
            </a>
            <p className="font-sans text-xs text-[#666666]">
              WhatsApp opens with your order ready. Just tap Send.
            </p>
          </div>
        ) : (
          <div className="space-y-3 rounded-xl border border-[#25D366] bg-white p-6">
            <QRCodeSVG value={waHref} size={180} className="mx-auto" />
            <p className="font-sans text-sm font-semibold text-[#1A1A14]">
              Point your phone camera at this.
            </p>
            <p className="font-sans text-xs text-[#666666]">
              WhatsApp opens with your order. Tap Send to place it.
            </p>
          </div>
        )}

        <p className="font-sans text-xs text-[#999999]">
          After you send: we&apos;ll confirm your order and send you a payment link on WhatsApp.
        </p>

        <p className="font-sans text-xs text-[#999999]">
          Having trouble?{' '}
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#1E5631] underline"
          >
            Message us directly
          </a>
        </p>
      </div>
    )
  }

  // ── Empty state (rendered briefly while redirect is in flight) ────────────

  if (itemCount === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <p className="mb-2 font-serif text-3xl text-[#1E5631]">Your order is empty</p>
        <p className="mb-8 font-sans text-sm text-[#666666]">
          Add some soaps to your order first.
        </p>
      </div>
    )
  }

  // ── Step 1: Order form ────────────────────────────────────────────────────

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="rounded-lg border border-[#D6CFC4] bg-white p-6 sm:p-8">
          <OrderForm onSuccess={handleOrderSuccess} />
        </div>
      </div>

      <aside className="lg:col-span-2">
        <div className="sticky top-24 space-y-6 rounded-lg border border-[#D6CFC4] bg-white p-6">
          <div className="rounded border-l-4 border-l-[#C9A84C] bg-[#FFF8E8] p-4">
            <p className="mb-3 font-serif text-[17px] italic leading-relaxed text-[#1A1A14]">
              &ldquo;This handmade natural soap has become a staple in my routine. My skin feels
              noticeably softer, dryness is a thing of the past, and it has even helped reduce
              my tan.&rdquo;
            </p>
            <div>
              <p className="font-sans text-sm font-bold text-[#1E5631]">Snehal Rane</p>
              <p className="font-sans text-xs text-[#666666]">Bangalore</p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-sans text-sm font-bold text-[#1A1A14]">What happens next?</h3>
            <ul className="space-y-3">
              {[
                { title: 'Place Order', desc: 'Confirm your items and delivery address.' },
                { title: 'Confirmation', desc: 'We check your order and send you a UPI QR code for payment.' },
                { title: 'Made to Order', desc: 'Every bar is handmade fresh. Shipped in 4 days. Arrives in 3 to 7 days depending on your city.' },
                { title: 'Shipping', desc: 'Your soaps are sent via India Post Speed Post from South Goa.' },
                { title: 'Tracking', desc: 'India Post Speed Post notifies you via SMS on the day of delivery.' },
              ].map((s, i) => (
                <li key={i} className="flex gap-3 font-sans text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C9A84C] text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-[#1A1A14] leading-none mb-1">{s.title}</p>
                    <p className="text-[#666666] text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="border-t border-[#D6CFC4] pt-4 font-sans text-xs text-[#666666]">
            Questions? WhatsApp Healing Soil at{' '}
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
