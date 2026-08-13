'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import type { TrackedOrder } from '@/lib/orders'

const PROGRESS_STEPS = [
  { label: 'Order received', description: 'Your order details are recorded.' },
  { label: 'Payment confirmed', description: 'Your payment has been securely confirmed.' },
  { label: 'Being made', description: 'We are preparing your soaps.' },
  { label: 'Ready to dispatch', description: 'Your package is ready for the courier.' },
  { label: 'Dispatched', description: 'Your package is on its way.' },
  { label: 'Delivered', description: 'Your order has arrived.' },
]

function progressIndex(status: string) {
  if (status === 'Delivered') return 5
  if (['Dispatched', 'Partially Dispatched', 'Partially Delivered'].includes(status)) return 4
  if (status === 'Ready to Dispatch') return 3
  if (status === 'In Manufacturing') return 2
  if (status === 'Payment Confirmed') return 1
  return 0
}

function formatDate(value: string | null) {
  if (!value) return null
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata',
  }).format(new Date(value))
}

function getStatusMessage(order: TrackedOrder) {
  if (order.is_interest) {
    return {
      title: 'Your interest is saved',
      body: 'This is not yet a placed or paid order. We will email you when ordering reopens.',
      tone: 'border-[#E8D29B] bg-[#FFF8E8] text-[#6B4E16]',
    }
  }
  if (order.status === 'Cancelled') {
    return {
      title: 'Order cancelled',
      body: 'This order is no longer active. Message us if you believe this is incorrect.',
      tone: 'border-red-200 bg-red-50 text-red-800',
    }
  }
  if (order.payment_status === 'failed') {
    return {
      title: 'Payment did not complete',
      body: 'Your order details are safe. If money was deducted, do not pay again—wait a few minutes and refresh because a delayed confirmation may still arrive.',
      tone: 'border-red-200 bg-red-50 text-red-800',
    }
  }
  if (order.payment_status === 'pending') {
    return {
      title: 'Payment confirmation is pending',
      body: 'If money was deducted, do not pay again. Razorpay’s signed confirmation can update this order automatically; refresh after a few minutes.',
      tone: 'border-[#E8D29B] bg-[#FFF8E8] text-[#6B4E16]',
    }
  }
  if (order.payment_status === 'manual' || (order.status === 'Order Placed' && order.payment_status !== 'paid')) {
    return {
      title: 'Manual order received',
      body: 'Message us with this order reference to complete manual payment and confirmation.',
      tone: 'border-[#BFD4C5] bg-[#F2F8F3] text-[#1E5631]',
    }
  }
  if (order.status === 'Delivered') {
    return {
      title: 'Delivered',
      body: 'Your order has been marked as delivered. We hope you enjoy your soaps.',
      tone: 'border-[#BFD4C5] bg-[#F2F8F3] text-[#1E5631]',
    }
  }
  return {
    title: order.status,
    body: order.status === 'Payment Confirmed'
      ? 'Payment is confirmed and your order is now in our preparation queue.'
      : 'Your order is moving through our handmade preparation and delivery process.',
    tone: 'border-[#BFD4C5] bg-[#F2F8F3] text-[#1E5631]',
  }
}

export default function OrderTracker({ initialRef = '' }: { initialRef?: string }) {
  const [ref, setRef] = useState(initialRef.toUpperCase())
  const [phone, setPhone] = useState('')
  const [order, setOrder] = useState<TrackedOrder | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function lookup(event?: FormEvent) {
    event?.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ref: ref.trim(), phone: phone.trim() }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Could not check this order.')
      setOrder(data)
    } catch (err) {
      setOrder(null)
      setError(err instanceof Error ? err.message : 'Could not check this order.')
    } finally {
      setLoading(false)
    }
  }

  const statusMessage = order ? getStatusMessage(order) : null
  const activeStep = order ? progressIndex(order.status) : 0
  const dispatchedAt = order?.shipments.find((shipment) => shipment.dispatched_at)?.dispatched_at || null
  const deliveredAt = order?.shipments.find((shipment) => shipment.delivered_at)?.delivered_at || null
  const whatsappHref = order
    ? `https://wa.me/917483100651?text=${encodeURIComponent(`Hi Healing Soil, I need help with order ${order.ref}.`)}`
    : 'https://wa.me/917483100651'

  return (
    <div className="space-y-6">
      <form onSubmit={lookup} className="rounded-xl border border-[#D6CFC4] bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="order-ref" className="mb-1.5 block font-sans text-sm font-medium text-[#1A1A14]">
              Order reference
            </label>
            <input
              id="order-ref"
              value={ref}
              onChange={(event) => setRef(event.target.value.toUpperCase())}
              placeholder="HS-12AB34CD"
              autoComplete="off"
              maxLength={11}
              required
              className="w-full rounded-lg border border-[#D6CFC4] px-3 py-3 font-sans text-sm uppercase text-[#1A1A14] focus:border-[#1E5631] focus:outline-none focus:ring-1 focus:ring-[#1E5631]"
            />
          </div>
          <div>
            <label htmlFor="order-phone" className="mb-1.5 block font-sans text-sm font-medium text-[#1A1A14]">
              Registered mobile number
            </label>
            <input
              id="order-phone"
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="10-digit mobile number"
              autoComplete="tel"
              maxLength={18}
              required
              className="w-full rounded-lg border border-[#D6CFC4] px-3 py-3 font-sans text-sm text-[#1A1A14] focus:border-[#1E5631] focus:outline-none focus:ring-1 focus:ring-[#1E5631]"
            />
          </div>
        </div>
        <p className="mt-3 font-sans text-xs leading-relaxed text-[#777]">
          For privacy, both details must match. We never display your address, email, or phone number here.
        </p>
        {error ? (
          <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-800">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-lg bg-[#1E5631] px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Checking securely…' : order ? 'Refresh Status' : 'Check Order Status'}
        </button>
      </form>

      {order && statusMessage ? (
        <section aria-live="polite" className="space-y-6">
          <div className={`rounded-xl border p-5 ${statusMessage.tone}`}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-wider opacity-70">Order {order.ref}</p>
                <h2 className="mt-1 font-serif text-2xl">{statusMessage.title}</h2>
              </div>
              <span className="rounded-full bg-white/70 px-3 py-1 font-sans text-xs font-semibold">
                {formatDate(order.created_at)}
              </span>
            </div>
            <p className="mt-3 font-sans text-sm leading-relaxed">{statusMessage.body}</p>
          </div>

          {!order.is_interest && order.status !== 'Cancelled' ? (
            <div className="rounded-xl border border-[#D6CFC4] bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-6 font-serif text-2xl text-[#1A1A14]">Order progress</h2>
              <ol className="space-y-0">
                {PROGRESS_STEPS.map((step, index) => {
                  const reached = index <= activeStep
                  const current = index === activeStep
                  const done = index < activeStep || (activeStep === PROGRESS_STEPS.length - 1 && current)
                  return (
                    <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
                      {index < PROGRESS_STEPS.length - 1 ? (
                        <span className={`absolute left-[11px] top-6 h-full w-px ${index < activeStep ? 'bg-[#1E5631]' : 'bg-[#D6CFC4]'}`} />
                      ) : null}
                      <span className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${reached ? 'border-[#1E5631] bg-[#1E5631] text-white' : 'border-[#D6CFC4] bg-white text-[#999]'}`}>
                        {done ? '✓' : current ? '•' : index + 1}
                      </span>
                      <div>
                        <p className={`font-sans text-sm font-semibold ${current ? 'text-[#1E5631]' : reached ? 'text-[#1A1A14]' : 'text-[#888]'}`}>
                          {step.label}{current ? ' — Current' : ''}
                        </p>
                        <p className="mt-0.5 font-sans text-xs text-[#777]">{step.description}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          ) : null}

          <div className="rounded-xl border border-[#D6CFC4] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-[#EEE9E1] pb-4">
              <h2 className="font-serif text-xl text-[#1A1A14]">Order summary</h2>
              <span className="font-sans text-base font-bold text-[#1E5631]">₹{order.total.toLocaleString('en-IN')}</span>
            </div>
            <ul className="divide-y divide-[#EEE9E1]">
              {order.items.map((item, index) => (
                <li key={`${item.name}-${index}`} className="flex justify-between gap-4 py-3 font-sans text-sm text-[#555]">
                  <span>{item.name}</span>
                  <span className="font-medium text-[#1A1A14]">× {item.quantity}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-2 grid gap-2 border-t border-[#EEE9E1] pt-4 font-sans text-xs text-[#666] sm:grid-cols-3">
              <div><dt className="font-semibold text-[#1A1A14]">Placed</dt><dd>{formatDate(order.created_at)}</dd></div>
              {dispatchedAt ? <div><dt className="font-semibold text-[#1A1A14]">Dispatched</dt><dd>{formatDate(dispatchedAt)}</dd></div> : null}
              {deliveredAt ? <div><dt className="font-semibold text-[#1A1A14]">Delivered</dt><dd>{formatDate(deliveredAt)}</dd></div> : null}
            </dl>
          </div>

          <div className="text-center">
            <p className="font-sans text-sm text-[#666]">
              Courier tracking is shared after dispatch. Need help with this order?
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex rounded-lg border border-[#1E5631] px-5 py-2.5 font-sans text-sm font-semibold text-[#1E5631] transition-colors hover:bg-[#1E5631] hover:text-white"
            >
              Message us with {order.ref}
            </a>
          </div>
        </section>
      ) : null}
    </div>
  )
}
