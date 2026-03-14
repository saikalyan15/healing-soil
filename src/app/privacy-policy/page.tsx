import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Healing Soil',
  description:
    'Privacy policy for healingsoil.in — how we collect, use, and protect your information.',
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy — Healing Soil',
    description: 'Privacy policy for healingsoil.in.',
    url: '/privacy-policy',
    siteName: 'Healing Soil',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-4xl text-green-primary">Privacy Policy</h1>
    </div>
  )
}
