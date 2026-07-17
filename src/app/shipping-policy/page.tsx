import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping Policy — Healing Soil',
  description: 'Shipping and delivery policy for Healing Soil handmade natural soaps, shipped pan-India from Goa.',
  alternates: { canonical: '/shipping-policy' },
  openGraph: {
    title: 'Shipping Policy — Healing Soil',
    description: 'Shipping and delivery policy for Healing Soil handmade natural soaps, shipped pan-India from Goa.',
    url: '/shipping-policy',
    siteName: 'Healing Soil',
    type: 'website',
  },
}

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-4xl text-green-primary mb-2">Shipping Policy</h1>
      <p className="font-sans text-sm text-[#888] mb-10">Last updated: July 2026</p>

      <div className="font-sans text-base leading-relaxed text-[#444] space-y-10">

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Where we ship</h2>
          <p>
            We ship pan-India from our workshop in South Goa. Shipping is free on every order,
            with no minimum order value.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Dispatch and delivery time</h2>
          <p>
            Orders are dispatched within 2 business days of order confirmation. After dispatch,
            delivery typically takes 4 to 7 business days depending on your location — metro
            cities are usually on the faster end, and remote areas may take a little longer.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Courier and tracking</h2>
          <p>
            We ship via India Post Speed Post and other courier partners depending on your
            location. Once your order is dispatched, we share tracking details on WhatsApp so you
            can follow its progress. You can also check your order status anytime on our{' '}
            <a href="/order/track" className="text-green-primary underline">Track Order</a> page.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Delivery delays</h2>
          <p>
            Occasionally, weather, regional holidays, or courier network disruptions can delay
            delivery beyond our usual estimates. We&apos;ll let you know if we&apos;re aware of a
            delay affecting your order.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Incorrect address or failed delivery</h2>
          <p>
            Please double-check your delivery address before confirming your order. If a delivery
            fails because of an incorrect address or because no one was available to receive it,
            we&apos;ll work with you to arrange redelivery, which may involve an additional
            shipping charge.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Questions about your order</h2>
          <p>
            Reach us on WhatsApp at{' '}
            <a href="https://wa.me/917483100651" className="text-green-primary underline">
              +91 74831 00651
            </a>{' '}
            or by email at{' '}
            <a href="mailto:healingsoil.in@gmail.com" className="text-green-primary underline">
              healingsoil.in@gmail.com
            </a>.
          </p>
        </section>

      </div>
    </div>
  )
}
