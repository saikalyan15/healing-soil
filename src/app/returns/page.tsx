import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Returns Policy — Healing Soil',
  description: 'Returns and refund policy for Healing Soil handmade natural soaps.',
  alternates: { canonical: '/returns' },
  openGraph: {
    title: 'Returns Policy — Healing Soil',
    description: 'Returns and refund policy for Healing Soil handmade natural soaps.',
    url: '/returns',
    siteName: 'Healing Soil',
    type: 'website',
  },
}

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-4xl text-green-primary mb-10">Returns Policy</h1>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Because every Healing Soil soap is made to order using fresh natural ingredients, we are
          unable to accept returns or exchanges on opened or used bars.
        </p>
        <p>
          If your order arrives damaged or incorrect, please contact us within 48 hours of delivery
          on WhatsApp at{' '}
          <a href="https://wa.me/917483100651" className="underline">
            +91 74831 00651
          </a>{' '}
          or email us at{' '}
          <a href="mailto:healingsoil.in@gmail.com" className="underline">
            healingsoil.in@gmail.com
          </a>
          . We will replace or refund at our discretion.
        </p>
        <p>
          Natural variation in colour, texture, shape and marbling is not considered a defect. It
          is inherent to handmade soap and proof it was made fresh for you.
        </p>
        <p>We do not offer refunds for change of mind.</p>
      </div>
    </div>
  )
}
