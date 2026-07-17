import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms and Conditions — Healing Soil',
  description: 'Terms and conditions for using healingsoil.in and ordering from Healing Soil.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms and Conditions — Healing Soil',
    description: 'Terms and conditions for using healingsoil.in and ordering from Healing Soil.',
    url: '/terms',
    siteName: 'Healing Soil',
    type: 'website',
  },
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-4xl text-green-primary mb-2">Terms and Conditions</h1>
      <p className="font-sans text-sm text-[#888] mb-10">Last updated: July 2026</p>

      <div className="font-sans text-base leading-relaxed text-[#444] space-y-10">

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">About these terms</h2>
          <p>
            These terms and conditions govern your use of{' '}
            <a href="/" className="text-green-primary underline">healingsoil.in</a> and any order
            you place with Healing Soil, a small-batch handmade soap brand based on a farm in
            South Goa, India. By browsing our website or placing an order, you agree to these
            terms.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Our products</h2>
          <p>
            Every bar is handmade in small batches using natural oils and botanicals. Natural
            variation in colour, texture, shape and marbling between bars is expected and is not
            considered a defect.
          </p>
          <p className="mt-3">
            Our soaps are cosmetic products intended for cleansing and everyday personal care.
            They are not intended to diagnose, treat, cure, prevent, or otherwise be a substitute
            for medical advice for any skin condition or disease. If you have a specific skin
            concern, please consult a qualified dermatologist.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Orders and pricing</h2>
          <p>
            All prices on our website are listed in Indian Rupees (₹) and are inclusive of
            applicable taxes unless stated otherwise. Because most soaps are made to order,
            availability can change between when you view a product and when you order it — we
            will let you know if something you&apos;ve ordered is unavailable. We reserve the
            right to correct pricing errors and to modify prices at any time before an order is
            confirmed.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Payments</h2>
          <p>
            We accept UPI, credit/debit cards, net banking, and other payment methods enabled
            through our payment partners, along with cash on delivery where available. Your order
            is confirmed once payment is received or, for cash-on-delivery orders, once we confirm
            the order with you directly.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Shipping</h2>
          <p>
            We ship pan-India. Dispatch times, delivery estimates, and shipping costs are set out
            in our{' '}
            <a href="/shipping-policy" className="text-green-primary underline">Shipping Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Cancellations and returns</h2>
          <p>
            You can cancel or request a return under the conditions set out in our{' '}
            <a href="/returns" className="text-green-primary underline">
              Cancellation and Refunds Policy
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Intellectual property</h2>
          <p>
            All content on this website — including text, photographs, illustrations, and the
            Healing Soil name and logo — belongs to Healing Soil and may not be copied,
            reproduced, or used commercially without our written permission.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Limitation of liability</h2>
          <p>
            We take care in how our products are made and described, but we do not guarantee that
            the website will be uninterrupted or error-free. To the extent permitted by law,
            Healing Soil is not liable for indirect or consequential loss arising from your use of
            the website or our products, beyond the value of the order in question.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Governing law</h2>
          <p>
            These terms are governed by the laws of India, and any disputes will be subject to the
            jurisdiction of the courts of Goa, India.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Changes to these terms</h2>
          <p>
            We may update these terms occasionally. Any changes will be posted on this page with a
            revised date at the top. Continued use of our website after changes are posted
            constitutes your acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Contact us</h2>
          <p>
            Questions about these terms? Reach us on WhatsApp at{' '}
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
