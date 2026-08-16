'use client'

import { useEffect, useState, useRef } from 'react'
import { sendGAEvent } from '@next/third-parties/google'
import { useOrderStore } from '@/lib/store'
import { formatPreferencesAsNote } from '@/lib/store'
import { buildWhatsAppMessage, type WhatsAppLineItem, type ShippingAddress } from '@/lib/orders'
import OrderPreferences from './OrderPreferences'
import { trackMetaLeadOnce, trackMetaPurchaseOnce } from '@/lib/meta-pixel'
import { GA4_EVENT } from '@/lib/analytics'
import { getStoredAttribution } from '@/lib/attribution'
import { calculateShipping } from '@/lib/shipping'
import {
  formatReopenDate,
  futureReopenDate,
  useOrderAvailability,
} from './OrderAvailabilityProvider'
const WA_NUMBER = '917483100651'
const PENDING_CHECKOUT_STORAGE_KEY = 'healing-soil-pending-checkout'

const ALL_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala',
  'Ladakh', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
  'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
].sort()

function validateIndianPhone(p: string): boolean {
  return /^(\+91|91|0)?[6-9]\d{9}$/.test(p.replace(/\s|-/g, ''))
}

function normalizePhone(p: string): string {
  const digits = p.replace(/\D/g, '')
  if (digits.startsWith('91') && digits.length === 12) return digits
  if (digits.startsWith('0') && digits.length === 11) return '91' + digits.slice(1)
  return '91' + digits.slice(-10)
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void
      on: (event: string, handler: (response: unknown) => void) => void
    }
  }
}

function loadRazorpayScript(): Promise<boolean> {
  if (typeof window !== 'undefined' && window.Razorpay) return Promise.resolve(true)
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// Feature toggle — online payment via Razorpay is implemented but hidden for
// now; the site runs the original WhatsApp-only order flow until this is
// flipped back on. Set NEXT_PUBLIC_ENABLE_RAZORPAY=true to re-enable.
const RAZORPAY_ENABLED = process.env.NEXT_PUBLIC_ENABLE_RAZORPAY === 'true'

type Props = {
  acceptingOrders: boolean
  reopenDate: string | null
  onSuccess: (ref: string, waHref: string, outcome: 'paid' | 'pending' | 'manual' | 'interest') => void
}

export default function OrderForm({
  onSuccess,
  acceptingOrders: initialAcceptingOrders,
  reopenDate: initialReopenDate,
}: Props) {
  const items = useOrderStore((s) => s.items)
  const clearOrder = useOrderStore((s) => s.clearOrder)
  const updateQty = useOrderStore((s) => s.updateQty)
  const removeItem = useOrderStore((s) => s.removeItem)
  const preferences = useOrderStore((s) => s.preferences)
  const availability = useOrderAvailability()
  const acceptingOrders = availability.acceptingOrders ?? initialAcceptingOrders
  const reopenDate = futureReopenDate(availability.reopenDate ?? initialReopenDate)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [contactConsent, setContactConsent] = useState(false)
  const [pendingOrder, setPendingOrder] = useState<{
    sessionId: string
    checkoutKey: string
    orderId: string
    ref: string
    token: string
  } | null>(null)

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  const shipping = acceptingOrders ? calculateShipping(subtotal, state) : 0

  const total = subtotal + shipping

  const checkoutFiredRef = useRef(false)
  const payRequestInFlightRef = useRef(false)

  async function currentCheckoutKey() {
    const value = JSON.stringify({
      customer: {
        name: name.trim(),
        phone: normalizePhone(phone),
        email: email.trim().toLowerCase(),
        address: address.trim(),
        state,
      },
      notes: formatPreferencesAsNote(preferences) || '',
      items: items
        .map((item) => ({ product_id: item.product_id, price: item.price, qty: item.qty }))
        .sort((a, b) => a.product_id.localeCompare(b.product_id)),
    })
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
  }

  function handleFirstFocus() {
    if (!acceptingOrders || checkoutFiredRef.current) return
    checkoutFiredRef.current = true
    sendGAEvent('event', GA4_EVENT.BEGIN_CHECKOUT, {
      currency: 'INR',
      value: total,
      items: items.map((i) => ({ item_id: i.product_id, item_name: i.product_name, price: i.price, quantity: i.qty })),
    })
  }

  const [paymentDismissed, setPaymentDismissed] = useState(false)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(PENDING_CHECKOUT_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed && typeof parsed === 'object'
            && typeof parsed.sessionId === 'string'
            && typeof parsed.checkoutKey === 'string'
            && typeof parsed.orderId === 'string'
            && typeof parsed.ref === 'string'
            && typeof parsed.token === 'string') {
          setPendingOrder(parsed)
        }
      }
    } catch {
      sessionStorage.removeItem(PENDING_CHECKOUT_STORAGE_KEY)
    }

  }, [])

  function validateForm(): boolean {
    if (!name.trim()) { setError('Please enter your full name.'); return false }
    if (!validateIndianPhone(phone)) { setError('Please enter a valid Indian mobile number.'); return false }
    if (items.length === 0) { setError(acceptingOrders ? 'Your order is empty.' : 'Your interest list is empty.'); return false }
    if (!acceptingOrders) return true
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Please enter a valid email address.'); return false }
    if (!state) { setError('Please select your state.'); return false }
    if (!address.trim()) { setError('Please enter your delivery address.'); return false }
    return true
  }

  // Saves the order to SoapLedger, fires attribution events, builds the
  // WhatsApp message, and hands off to the parent's "send" step. Shared by
  // both the paid (Razorpay) path and the WhatsApp-only fallback path.
  function buildManualWhatsAppHref(humanRef: string) {
    const normalizedPhone = normalizePhone(phone)
    const fullAddress = `${address.trim()}, ${state}`
    const preferencesNote = formatPreferencesAsNote(preferences)

    const whatsappItems: WhatsAppLineItem[] = items.map((i) => ({
      product_id: i.product_id,
      product_name: i.product_name,
      price: i.price,
      qty: i.qty,
    }))

    const shippingAddress: ShippingAddress = {
      name: name.trim(),
      phone: normalizedPhone,
      address_line_1: fullAddress,
    }

    const waMessage = buildWhatsAppMessage(
      humanRef,
      { name: name.trim() },
      whatsappItems,
      shippingAddress,
      shipping,
      preferencesNote || undefined
    )
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`
  }

  async function submitToSoapLedgerAndProceed(intent?: 'interest') {
    const normalizedPhone = normalizePhone(phone)
    const preferencesNote = formatPreferencesAsNote(preferences)
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: name.trim(),
        customer_phone: normalizedPhone,
        customer_email: intent === 'interest' || !email.trim() ? undefined : email.trim().toLowerCase(),
        items: items.map((i) => ({ product_id: i.product_id, product_slug: i.product_slug, qty: i.qty })),
        address: intent === 'interest' ? undefined : address.trim(),
        state: intent === 'interest' ? undefined : state,
        notes: intent === 'interest' ? undefined : preferencesNote || undefined,
        intent,
        consent: intent === 'interest' ? contactConsent : undefined,
        attribution: getStoredAttribution(),
      }),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      if (data.code === 'ORDERS_OPEN' || data.code === 'ORDERS_PAUSED') {
        await availability.refresh()
      }
      throw new Error(data.error || `Server error ${res.status}`)
    }

    const { order_id, ref } = data
    const humanRef = ref || order_id

    if (intent === 'interest') {
      onSuccess(humanRef, '', 'interest')
      return
    }

    const attributionParams = {
      value: total,
      currency: 'INR',
      content_ids: items.map((i) => i.product_slug),
      content_type: 'product',
      // Total quantity across line items, not distinct SKU count — a more
      // accurate "items purchased" signal for Meta than items.length.
      num_items: items.reduce((sum, item) => sum + item.qty, 0),
    }

    trackMetaLeadOnce(humanRef, attributionParams)
    const waHref = buildManualWhatsAppHref(humanRef)

    // Clear cart first, then hand off to parent — orderPlacedRef in parent
    // is already set before clearOrder() triggers any re-render
    sessionStorage.removeItem(PENDING_CHECKOUT_STORAGE_KEY)
    setPendingOrder(null)
    clearOrder()
    onSuccess(humanRef, waHref, 'manual')
  }

  function finishPaidCheckout(ref: string, outcome: 'paid' | 'pending') {
    sendGAEvent('event', GA4_EVENT.PURCHASE, {
      transaction_id: ref,
      currency: 'INR',
      value: total,
      shipping,
      items: items.map((i) => ({ item_id: i.product_id, item_name: i.product_name, price: i.price, quantity: i.qty })),
    })
    trackMetaPurchaseOnce(ref, {
      value: total,
      currency: 'INR',
      content_ids: items.map((i) => i.product_slug),
      content_type: 'product',
      num_items: items.reduce((sum, item) => sum + item.qty, 0),
    })
    sessionStorage.removeItem(PENDING_CHECKOUT_STORAGE_KEY)
    setPendingOrder(null)
    clearOrder()
    onSuccess(ref, '', outcome)
  }

  // ── Primary path: pay on the website via Razorpay ────────────────────────
  async function handlePayNow(e: React.FormEvent) {
    e.preventDefault()

    if (payRequestInFlightRef.current) return

    if (!acceptingOrders) {
      await handleInterest()
      return
    }

    if (!RAZORPAY_ENABLED) {
      await handleWhatsAppFallback()
      return
    }

    setError('')
    setPaymentDismissed(false)
    if (!validateForm()) return

    payRequestInFlightRef.current = true
    setLoading(true)

    try {
      const checkoutKey = await currentCheckoutKey()
      const checkoutSessionId = pendingOrder?.checkoutKey === checkoutKey
        ? pendingOrder.sessionId
        : crypto.randomUUID()
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkout_session_id: checkoutSessionId,
          customer_name: name.trim(),
          customer_phone: normalizePhone(phone),
          customer_email: email.trim() ? email.trim().toLowerCase() : undefined,
          address: address.trim(),
          state,
          notes: formatPreferencesAsNote(preferences) || undefined,
          items: items.map((i) => ({ product_id: i.product_id, qty: i.qty })),
          attribution: getStoredAttribution(),
        }),
      })

      const orderData = await orderRes.json().catch(() => ({}))
      if (!orderRes.ok) {
        if (orderData.code === 'ORDERS_PAUSED') {
          await availability.refresh()
          throw new Error('Orders are temporarily paused while we catch up.')
        }
        throw new Error(orderData.error || `Server error ${orderRes.status}`)
      }
      const createdOrder = {
        sessionId: checkoutSessionId,
        checkoutKey,
        orderId: orderData.order_id,
        ref: orderData.ref,
        token: orderData.fallback_token,
      }
      setPendingOrder(createdOrder)
      sessionStorage.setItem(PENDING_CHECKOUT_STORAGE_KEY, JSON.stringify(createdOrder))

      if (orderData.already_paid) {
        payRequestInFlightRef.current = false
        setLoading(false)
        finishPaidCheckout(createdOrder.ref, 'paid')
        return
      }
      if (orderData.payment_pending) {
        payRequestInFlightRef.current = false
        setLoading(false)
        finishPaidCheckout(createdOrder.ref, 'pending')
        return
      }

      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error('Could not load the payment widget.')
      }

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: orderData.order_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Healing Soil',
        description: 'Handmade natural soap order',
        prefill: {
          name: name.trim(),
          contact: normalizePhone(phone),
          ...(email.trim() ? { email: email.trim().toLowerCase() } : {}),
        },
        theme: { color: '#1E5631' },
        retry: { enabled: true, max_count: 4 },
        handler: async (response: unknown) => {
          const r = response as {
            razorpay_order_id: string
            razorpay_payment_id: string
            razorpay_signature: string
          }
          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(r),
            })
            const verifyData = await verifyRes.json().catch(() => ({}))

            if (!verifyRes.ok || !verifyData.verified) {
              throw new Error('Payment could not be verified')
            }

            finishPaidCheckout(verifyData.ref || createdOrder.ref, verifyData.pending ? 'pending' : 'paid')
            payRequestInFlightRef.current = false
            setLoading(false)
          } catch (err) {
            // A valid Checkout success can still lose its browser callback.
            // The signed webhook will finish this same SoapLedger order.
            finishPaidCheckout(createdOrder.ref, 'pending')
            payRequestInFlightRef.current = false
            setLoading(false)
          }
        },
        modal: {
          ondismiss: () => {
            payRequestInFlightRef.current = false
            setLoading(false)
            setPaymentDismissed(true)
          },
        },
      })

      razorpay.on('payment.failed', () => {
        payRequestInFlightRef.current = false
        setLoading(false)
        setPaymentDismissed(true)
      })

      razorpay.open()
    } catch (err) {
      payRequestInFlightRef.current = false
      setError(err instanceof Error ? err.message : 'Could not start payment. Please try again.')
      if (acceptingOrders) setPaymentDismissed(true)
      setLoading(false)
    }
  }

  // ── Fallback path: skip online payment, coordinate manually on WhatsApp ───
  async function handleWhatsAppFallback() {
    setError('')
    if (!validateForm()) return

    setLoading(true)
    try {
      const checkoutKey = await currentCheckoutKey()
      if (pendingOrder && pendingOrder.checkoutKey === checkoutKey) {
        const res = await fetch('/api/razorpay/manual-fallback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider_order_id: pendingOrder.orderId, fallback_token: pendingOrder.token }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          if (data.code === 'ORDERS_PAUSED') await availability.refresh()
          throw new Error(data.error || 'Could not switch to manual payment.')
        }
        const waHref = buildManualWhatsAppHref(data.ref || pendingOrder.ref)
        sessionStorage.removeItem(PENDING_CHECKOUT_STORAGE_KEY)
        setPendingOrder(null)
        clearOrder()
        onSuccess(data.ref || pendingOrder.ref, waHref, 'manual')
      } else {
        await submitToSoapLedgerAndProceed()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not process your order right now.')
      setLoading(false)
    }
  }

  async function handleInterest() {
    setError('')
    if (!validateForm()) return
    if (!contactConsent) {
      setError('Please tick the box so we can WhatsApp you when orders reopen.')
      return
    }
    setLoading(true)
    try {
      await submitToSoapLedgerAndProceed('interest')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save your interest. Please try again.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handlePayNow} className="space-y-6">
      {acceptingOrders && RAZORPAY_ENABLED && (
        <div className="rounded-lg border border-[#BFD3C5] bg-[#F2F8F4] p-4">
          <p className="font-sans text-sm font-semibold text-[#1E5631]">
            Secure prepaid checkout through Razorpay
          </p>
          <p className="mt-1 font-sans text-xs leading-relaxed text-[#555]">
            Pay online by UPI, card, or another method offered by Razorpay. Cash on delivery is not currently available.
          </p>
        </div>
      )}
      {!acceptingOrders && (
        <div className="rounded-lg border border-[#E8D29B] bg-[#FFF8E8] p-5">
          <h2 className="font-serif text-xl text-[#1E5631]">Orders are temporarily paused while we catch up.</h2>
          <p className="mt-2 font-sans text-sm leading-relaxed text-[#555]">
            Save the soaps you like and we&apos;ll WhatsApp you when ordering reopens
            {reopenDate ? `, expected ${formatReopenDate(reopenDate)}` : ''}. No payment will be taken and stock is not reserved.
          </p>
        </div>
      )}
      {/* Order summary */}
      <div className="rounded-lg bg-[#F7F5F0] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl text-[#1A1A14]">{acceptingOrders ? 'Order Summary' : 'Selected Products'}</h2>
          <button
            type="button"
            onClick={() => clearOrder()}
            className="font-sans text-xs text-[#999] hover:text-red-500 transition-colors underline"
          >
            Empty Cart
          </button>
        </div>
        <ul className="mb-4 space-y-4">
          {items.map((item) => (
            <li
              key={item.product_id}
              className="flex items-center justify-between gap-4 border-b border-[#D6CFC4] pb-4 last:border-0 last:pb-0"
            >
              <div className="flex-1">
                <p className="font-sans text-sm font-medium text-[#1A1A14]">{item.product_name}</p>
                <p className="font-sans text-xs text-[#666666]">₹{item.price.toLocaleString('en-IN')} each</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center rounded border border-[#D6CFC4] bg-white">
                  <button
                    type="button"
                    onClick={() => updateQty(item.product_id, item.qty - 1)}
                    className="px-2 py-1 text-[#666666] hover:bg-[#F7F5F0]"
                  >
                    –
                  </button>
                  <span className="min-w-[24px] text-center font-sans text-xs font-medium">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQty(item.product_id, item.qty + 1)}
                    className="px-2 py-1 text-[#666666] hover:bg-[#F7F5F0]"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.product_id)}
                  className="ml-1 text-[#999] hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </div>

              <span className="min-w-[70px] text-right font-sans text-sm font-medium">
                ₹{(item.price * item.qty).toLocaleString('en-IN')}
              </span>
            </li>
          ))}
        </ul>

        <div className="space-y-1.5 border-t border-[#D6CFC4] pt-4">
          <div className="flex justify-between font-sans text-sm text-[#666666]">
            <span>{acceptingOrders ? 'Subtotal' : 'Estimated value'}</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          {acceptingOrders ? (
            <>
              <div className="flex justify-between font-sans text-sm text-[#666666]">
                <span>Shipping</span>
                {shipping === 0 ? <span className="font-medium text-[#1E5631]">Free</span> : <span>₹{shipping}</span>}
              </div>
              {shipping > 0 && <p className="font-sans text-xs text-[#999]">Free shipping on orders above ₹1,000</p>}
              <div className="flex justify-between border-t border-[#D6CFC4] pt-2 font-sans text-base font-bold text-[#1A1A14]">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </>
          ) : (
            <p className="font-sans text-xs text-[#999]">Final prices and delivery charges will be confirmed when ordering reopens.</p>
          )}
        </div>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-[#1A1A14]">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={handleFirstFocus}
            placeholder="Enter your full name"
            autoComplete="name"
            className="w-full rounded border border-[#D6CFC4] bg-white px-3 py-2.5 font-sans text-sm text-[#1A1A14] placeholder:text-[#bbb] focus:border-[#1E5631] focus:outline-none focus:ring-1 focus:ring-[#1E5631]"
          />
        </div>

        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-[#1A1A14]">
            {acceptingOrders ? 'Phone Number' : 'WhatsApp Number'} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
            autoComplete="tel"
            className="w-full rounded border border-[#D6CFC4] bg-white px-3 py-2.5 font-sans text-sm text-[#1A1A14] placeholder:text-[#bbb] focus:border-[#1E5631] focus:outline-none focus:ring-1 focus:ring-[#1E5631]"
          />
        </div>

        {acceptingOrders && <>
        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-[#1A1A14]">
            Email Address{' '}
            {acceptingOrders ? (
              <span className="font-normal text-[#777]">(optional)</span>
            ) : (
              <span className="text-red-500">*</span>
            )}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded border border-[#D6CFC4] bg-white px-3 py-2.5 font-sans text-sm text-[#1A1A14] placeholder:text-[#bbb] focus:border-[#1E5631] focus:outline-none focus:ring-1 focus:ring-[#1E5631]"
          />
        </div>

        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-[#1A1A14]">
            State <span className="text-red-500">*</span>
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full rounded border border-[#D6CFC4] bg-white px-3 py-2.5 font-sans text-sm text-[#1A1A14] focus:border-[#1E5631] focus:outline-none focus:ring-1 focus:ring-[#1E5631]"
          >
            <option value="">Select your state</option>
            {ALL_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-[#1A1A14]">
            Full Delivery Address <span className="text-red-500">*</span>
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Flat / House no., Street, Area, City, State, PIN code"
            rows={3}
            autoComplete="street-address"
            className="w-full resize-none rounded border border-[#D6CFC4] bg-white px-3 py-2.5 font-sans text-sm text-[#1A1A14] placeholder:text-[#bbb] focus:border-[#1E5631] focus:outline-none focus:ring-1 focus:ring-[#1E5631]"
          />
        </div>

        </>}
      </div>

      {acceptingOrders && <OrderPreferences />}

      {!acceptingOrders && (
        <label className="flex items-start gap-3 rounded border border-[#D6CFC4] bg-white p-4 font-sans text-sm text-[#444]">
          <input
            type="checkbox"
            checked={contactConsent}
            onChange={(e) => setContactConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#1E5631]"
          />
          <span>WhatsApp me when Healing Soil is accepting orders again. This does not reserve stock or place a paid order.</span>
        </label>
      )}

      {error && (
        <div className="rounded border border-red-200 bg-red-50 px-4 py-3">
          <p className="font-sans text-sm font-medium text-red-800">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <button
          type="submit"
          disabled={loading || items.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded bg-[#1E5631] py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {!acceptingOrders ? (
            loading ? 'Saving your interest…' : 'Save My Interest'
          ) : RAZORPAY_ENABLED ? (
            loading ? 'Starting payment…' : `Pay ₹${total.toLocaleString('en-IN')} & Place Order`
          ) : loading ? (
            'Saving your order…'
          ) : (
            <>
              <WhatsAppIcon />
              Place Order on WhatsApp
            </>
          )}
        </button>
        {!loading && !paymentDismissed && acceptingOrders && (
          <p className="text-center font-sans text-xs text-[#999999]">
            {RAZORPAY_ENABLED
              ? 'Secure prepaid payment by Razorpay. Cash on delivery is not currently available.'
              : 'Clicking this saves your order and shows you how to send it on WhatsApp in one step.'}
          </p>
        )}

        {paymentDismissed && !loading && acceptingOrders && (
          <div className="rounded border border-[#D6CFC4] bg-[#F7F5F0] px-4 py-3 text-center">
            <p className="font-sans text-xs text-[#666666]">
              No worries — you can also place your order now and pay via a payment link we send
              on WhatsApp instead.
            </p>
            <button
              type="button"
              onClick={handleWhatsAppFallback}
              className="mt-2 inline-flex items-center gap-2 font-sans text-sm font-bold text-[#1E5631] underline"
            >
              <WhatsAppIcon />
              Place Order &amp; Pay via WhatsApp
            </button>
          </div>
        )}
      </div>
    </form>
  )
}
