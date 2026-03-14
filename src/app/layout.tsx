import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import TrustStrip from '@/components/TrustStrip'
import Footer from '@/components/Footer'
import OrderTray from '@/components/OrderTray'

const cormorant = Cormorant_Garamond({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Healing Soil — Handmade Soaps from Goa',
  description:
    'Healing Soil crafts small-batch, handmade natural soaps rooted in the spirit of Goa. Regenerative ingredients, slow living, and care for the earth.',
  metadataBase: new URL('https://healingsoil.in'),
  openGraph: {
    title: 'Healing Soil — Handmade Soaps from Goa',
    description:
      'Healing Soil crafts small-batch, handmade natural soaps rooted in the spirit of Goa.',
    url: 'https://healingsoil.in',
    siteName: 'Healing Soil',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <Header />
        <TrustStrip />
        <main className="pb-[60px]">{children}</main>
        <Footer />
        <OrderTray />
      </body>
    </html>
  )
}
