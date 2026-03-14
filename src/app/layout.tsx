import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

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
        {/* Nav placeholder — replace with <Nav /> component */}
        <header className="w-full border-b border-border bg-cream-card">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <span className="font-serif text-2xl font-semibold text-green-primary tracking-wide">
              Healing Soil
            </span>
            <nav className="hidden gap-8 text-sm font-medium text-text-dark md:flex">
              <a href="/our-products" className="hover:text-green-primary transition-colors">Shop</a>
              <a href="/about" className="hover:text-green-primary transition-colors">About</a>
              <a href="/blog" className="hover:text-green-primary transition-colors">Blog</a>
              <a href="/our-stories" className="hover:text-green-primary transition-colors">Our Stories</a>
              <a href="/cart" className="hover:text-green-primary transition-colors">Cart</a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        {/* Footer placeholder */}
        <footer className="border-t border-border bg-green-dark py-10 text-center text-sm text-cream/70">
          <p>&copy; {new Date().getFullYear()} Healing Soil. Made with love in Goa, India.</p>
        </footer>
      </body>
    </html>
  )
}
