'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOrderStore } from '@/lib/store'
import { buildWhatsAppMessage, type LineItem, type ShippingAddress } from '@/lib/orders'

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

export default function OrderForm() {
  const router = useRouter()
  const items = useOrderStore((s) => s.items)
  const clearOrder = useOrderStore((s) => s.clearOrder)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  
  // Shipping logic
  let shipping = 0
  if (subtotal < FREE_SHIPPING_THRESHOLD && state) {
    shipping = NORTH_INDIA_STATES.includes(state) ? SHIPPING_NORTH : SHIPPING_STANDARD
  } else if (subtotal < FREE_SHIPPING_THRESHOLD && !state) {
    shipping = SHIPPING_STANDARD // Default placeholder
  }

  const total = subtotal + shipping

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

    const lineItems: LineItem[] = items.map((i) => ({
      product_id: i.product_id,
      product_name: i.product_name,
      slug: i.product_id,
      quantity: i.qty,
      unit_price: i.price,
    }))

    const shippingAddress: ShippingAddress = {
      name: name.trim(),
      phone: normalizedPhone,
      address_line_1: fullAddress,
      city: '',
      state: state,
      pincode: '',
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
          notes: notes.trim() || undefined,
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || `Server error ${res.status}`)
      }

      const { order_id } = data

      const waMessage = buildWhatsAppMessage(
        order_id,
        { name: name.trim() },
        lineItems,
        shippingAddress,
        shipping,
        notes.trim() || undefined
      )

      try {
        sessionStorage.setItem('hs_wa_message', waMessage)
      } catch {
        // sessionStorage unavailable — fallback on confirmation page will be hidden
      }

      window.open(
        `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`,
        '_blank'
      )

      clearOrder()
      router.push(`/order/confirmation?ref=${order_id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order summary */}
      <div className="rounded-lg bg-[#F7F5F0] p-5">
        <h2 className="font-serif text-xl text-[#1A1A14] mb-3">Order Summary</h2>
        {items.length === 0 ? (
          <p className="font-sans text-sm text-[#666666]">No items in your order yet.</p>
        ) : (
          <ul className="mb-4 space-y-2">
            {items.map((item) => (
              <li
                key={item.product_id}
                className="flex items-baseline justify-between font-sans text-sm text-[#1A1A14]"
              >
                <span>
                  {item.product_name}{' '}
                  <span className="text-[#666666]">×{item.qty}</span>
                </span>
                <span>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="space-y-1.5 border-t border-[#D6CFC4] pt-3">
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
            placeholder="Priya Nair"
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
            placeholder="98765 43210"
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
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 font-sans text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || items.length === 0}
        className="w-full rounded bg-[#1E5631] py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Placing order…' : 'Confirm Order'}
      </button>
    </form>
  )
}
