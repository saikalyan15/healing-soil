import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import Header from '@/components/Header'
import TrustStrip from '@/components/TrustStrip'
import Footer from '@/components/Footer'
import OrderTray from '@/components/OrderTray'
import WelcomeBanner from '@/components/WelcomeBanner'

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
  title: {
    template: '%s | Healing Soil',
    default: 'Healing Soil — Handmade Natural Soaps from Goa',
  },
  description:
    'Healing Soil crafts small-batch, handmade natural soaps rooted in the spirit of Goa. Regenerative ingredients, slow living, and care for the earth.',
  metadataBase: new URL('https://healingsoil.in'),
  openGraph: {
    title: 'Healing Soil — Handmade Natural Soaps from Goa',
    description:
      'Healing Soil crafts small-batch, handmade natural soaps rooted in the spirit of Goa.',
    url: 'https://healingsoil.in',
    siteName: 'Healing Soil',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Healing Soil handmade soaps from Goa' }],
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
        <WelcomeBanner />
        <Header />
        <TrustStrip />
        <main className="pb-[60px]">{children}</main>
        <Footer />
        <OrderTray />
        <GoogleAnalytics gaId="G-EWQR3K5MW7" />
      </body>
    </html>
  )
}
