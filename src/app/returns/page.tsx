import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cancellation and Refunds — Healing Soil',
  description: 'Cancellation and refund policy for Healing Soil handmade natural soaps.',
  alternates: { canonical: '/returns' },
  openGraph: {
    title: 'Cancellation and Refunds — Healing Soil',
    description: 'Cancellation and refund policy for Healing Soil handmade natural soaps.',
    url: '/returns',
    siteName: 'Healing Soil',
    type: 'website',
  },
}

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-4xl text-green-primary mb-2">Cancellation and Refunds</h1>
      <p className="font-sans text-sm text-[#888] mb-10">Last updated: July 2026</p>

      <div className="font-sans text-base leading-relaxed text-[#444] space-y-10">

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Cancelling an order</h2>
          <p>
            You can cancel your order free of charge any time before it is dispatched. Message us
            on WhatsApp at{' '}
            <a href="https://wa.me/917483100651" className="text-green-primary underline">
              +91 74831 00651
            </a>{' '}
            as soon as possible with your order details, and we&apos;ll confirm the cancellation
            and refund any payment already made. Once an order has been dispatched, it can no
            longer be cancelled — see Returns below.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Returns</h2>
          <p>
            Because every Healing Soil soap is made to order using fresh natural ingredients, we
            are unable to accept returns or exchanges on opened or used bars, or for change of
            mind.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Damaged or incorrect orders</h2>
          <p>
            If your order arrives damaged or incorrect, please contact us within 48 hours of
            delivery on WhatsApp at{' '}
            <a href="https://wa.me/917483100651" className="text-green-primary underline">
              +91 74831 00651
            </a>{' '}
            or email us at{' '}
            <a href="mailto:healingsoil.in@gmail.com" className="text-green-primary underline">
              healingsoil.in@gmail.com
            </a>
            . We will replace or refund at our discretion.
          </p>
          <p className="mt-3">
            Natural variation in colour, texture, shape and marbling is not considered a defect —
            it is inherent to handmade soap and proof it was made fresh for you.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Refunds</h2>
          <p>
            Approved refunds are processed to your original payment method within 5 to 7 business
            days. If you paid via UPI or cash on delivery, we&apos;ll confirm the best way to
            return your payment when we approve the refund.
          </p>
        </section>

      </div>
    </div>
  )
}
