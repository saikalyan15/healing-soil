'use client'

import { useState, useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { sendGAEvent } from '@next/third-parties/google'
import { useRouter } from 'next/navigation'
import { useOrderStore } from '@/lib/store'
import { buildWhatsAppMessage, type WhatsAppLineItem, type ShippingAddress } from '@/lib/orders'

const FREE_SHIPPING_THRESHOLD = 1000
const SHIPPING_STANDARD = 100
const SHIPPING_NORTH = 150
const WA_NUMBER = '917483100651'

const NORTH_INDIA_STATES = [
  'Delhi',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Ladakh',
  'Punjab',
  'Rajasthan',
  'Uttar Pradesh',
  'Uttarakhand',
]

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

export default function OrderForm() {
  const router = useRouter()
  const items = useOrderStore((s) => s.items)
  const clearOrder = useOrderStore((s) => s.clearOrder)
  const updateQty = useOrderStore((s) => s.updateQty)
  const removeItem = useOrderStore((s) => s.removeItem)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [step, setStep] = useState<'form' | 'send'>('form')
  const [orderRef, setOrderRef] = useState('')
  const [waHref, setWaHref] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent))
  }, [])

  // Redirect to shop only if cart is empty while still on the form step
  useEffect(() => {
    if (items.length === 0 && step === 'form') {
      router.push('/shop')
    }
  }, [items.length, step, router])

  // Clear the cart once we've moved to step 2 — done here so the redirect
  // guard above already sees step === 'send' and does not fire
  useEffect(() => {
    if (step === 'send') {
      clearOrder()
    }
  }, [step, clearOrder])

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  let shipping = 0
  if (subtotal < FREE_SHIPPING_THRESHOLD && state) {
    shipping = NORTH_INDIA_STATES.includes(state) ? SHIPPING_NORTH : SHIPPING_STANDARD
  } else if (subtotal < FREE_SHIPPING_THRESHOLD && !state) {
    shipping = SHIPPING_STANDARD
  }

  const total = subtotal + shipping

  const checkoutFiredRef = useRef(false)

  function handleFirstFocus() {
    if (checkoutFiredRef.current) return
    checkoutFiredRef.current = true
    sendGAEvent('event', 'begin_checkout', {
      currency: 'INR',
      value: total,
      items: items.map((i) => ({ item_id: i.product_id, item_name: i.product_name, price: i.price, quantity: i.qty })),
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!name.trim()) { setError('Please enter your full name.'); return }
    if (!validateIndianPhone(phone)) { setError('Please enter a valid Indian mobile number.'); return }
    if (!state) { setError('Please select your state.'); return }
    if (!address.trim()) { setError('Please enter your delivery address.'); return }
    if (items.length === 0) { setError('Your order is empty.'); return }

    setLoading(true)

    const normalizedPhone = normalizePhone(phone)
    const fullAddress = `${address.trim()}, ${state}`

    const lineItems = items.map((i) => ({
      product_id: i.product_id,
      product_slug: i.product_slug,
      price: i.price,
      qty: i.qty,
    }))

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

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: name.trim(),
          customer_phone: normalizedPhone,
          items: lineItems,
          address: fullAddress,
          shipping: shipping,
          notes: notes.trim() || undefined,
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || `Server error ${res.status}`)
      }

      const { order_id, ref } = data
      const humanRef = ref || order_id

      sendGAEvent('event', 'purchase', {
        transaction_id: humanRef,
        currency: 'INR',
        value: total,
        shipping: shipping,
        items: items.map((i) => ({ item_id: i.product_id, item_name: i.product_name, price: i.price, quantity: i.qty })),
      })

      const waMessage = buildWhatsAppMessage(
        humanRef,
        { name: name.trim() },
        whatsappItems,
        shippingAddress,
        shipping,
        notes.trim() || undefined
      )

      setOrderRef(humanRef)
      setWaHref(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`)
      setStep('send')
    } catch (err) {
      setError(
        "We're sorry, but we couldn't process your order right now. Please message us on WhatsApp and we'll help you place your order manually."
      )
      setLoading(false)
    }
  }

  // ─── Step 2: Send on WhatsApp ─────────────────────────────────────────────────

  if (step === 'send') {
    return (
      <div className="space-y-6 text-center">

        {/* Checkmark */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1E5631]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-[#1A1A14]">
            Your order is ready — send it on WhatsApp to place it
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
              WhatsApp opens with your order — tap Send to place it.
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

  // ─── Step 1: Order form ───────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order summary */}
      <div className="rounded-lg bg-[#F7F5F0] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl text-[#1A1A14]">Order Summary</h2>
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
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between font-sans text-sm text-[#666666]">
            <span>Shipping</span>
            {shipping === 0 ? (
              <span className="font-medium text-[#1E5631]">Free</span>
            ) : (
              <span>₹{shipping}</span>
            )}
          </div>
          {shipping > 0 && (
            <p className="font-sans text-xs text-[#999]">
              Free shipping on orders above ₹1,000
            </p>
          )}
          <div className="flex justify-between border-t border-[#D6CFC4] pt-2 font-sans text-base font-bold text-[#1A1A14]">
            <span>Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
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
            Phone Number <span className="text-red-500">*</span>
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

        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-[#1A1A14]">
            Order Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Landmarks, special instructions, or skin concerns..."
            rows={2}
            className="w-full resize-none rounded border border-[#D6CFC4] bg-white px-3 py-2.5 font-sans text-sm text-[#1A1A14] placeholder:text-[#bbb] focus:border-[#1E5631] focus:outline-none focus:ring-1 focus:ring-[#1E5631]"
          />
        </div>
      </div>

      {error && (
        <div className="rounded border border-red-200 bg-red-50 px-4 py-3">
          <p className="font-sans text-sm font-medium text-red-800">
            {error}
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Healing Soil, I'm having trouble placing my order on the website. Can you help me?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-sans text-sm font-bold text-[#1E5631] underline"
          >
            Message us on WhatsApp →
          </a>
        </div>
      )}

      <div className="space-y-2">
        <button
          type="submit"
          disabled={loading || items.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded bg-[#1E5631] py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            'Saving your order…'
          ) : (
            <>
              <WhatsAppIcon />
              Place Order on WhatsApp
            </>
          )}
        </button>
        {!loading && (
          <p className="text-center font-sans text-xs text-[#999999]">
            Clicking this saves your order and shows you how to send it on WhatsApp in one step.
          </p>
        )}
      </div>
    </form>
  )
}
