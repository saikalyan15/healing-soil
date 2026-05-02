import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
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
  verification: {
    google: '2DgyjvWpPPDWaK3g3Qv5lQlj_4A5VM5tXUWE6wms14c',
  },
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
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Healing Soil',
    url: 'https://healingsoil.in',
    logo: 'https://healingsoil.in/logo.png',
    image: 'https://healingsoil.in/og-image.jpg',
    description: 'Handmade natural soaps from Goa, India. SLS-free, made to order, for sensitive skin.',
    foundingLocation: 'Goa, India',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Goa',
      addressCountry: 'IN',
    },
    areaServed: 'IN',
    priceRange: '₹₹',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      url: 'https://healingsoil.in',
    },
    sameAs: [
      'https://www.instagram.com/healingsoil.in',
      'https://www.facebook.com/profile.php?id=61576352186521',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Handmade Soap Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Small-batch Soap Making',
            description: 'Custom handmade soaps made in small batches on our Goa farm.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Natural Ingredient Sourcing',
            description: 'Sourcing and harvesting farm-grown botanicals like Neem and Tulsi.'
          }
        }
      ]
    }
  }

  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <WelcomeBanner />
        <Header />
        <TrustStrip />
        <main className="pb-[60px]">{children}</main>
        <Footer />
        <OrderTray />
        <GoogleAnalytics gaId="G-EWQR3K5MW7" />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window,document,"clarity","script","vz2i65l8ek");`}
        </Script>
      </body>
    </html>
  )
}
