import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: { appIsrStatus: false, buildActivity: false },
  turbopack: { root: __dirname },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // www → non-www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.healingsoil.in' }],
        destination: 'https://healingsoil.in/:path*',
        permanent: true,
      },
      // Old WordPress blog slug
      { source: '/blog/why-we-dont-use-chemicals',        destination: '/blog/what-makes-soap-chemical-free',                              permanent: true },
      { source: '/blog/natural-soap-for-eczema-dry-skin', destination: '/blog/best-natural-soap-for-eczema',                                  permanent: true },
      { source: '/blog/shea-butter-soap-benefits',        destination: '/blog/understanding-the-benefits-of-shea-butter-in-soap',             permanent: true },
      { source: '/blog/goat-milk-soap-for-sensitive-skin',destination: '/blog/what-makes-goat-milk-soap-beneficial-for-sensitive-skin',       permanent: true },
      // /stories → /blog (stories merged into blog)
      // :slug pattern [^.]+ excludes file extensions so static assets (images) are not caught
      { source: '/stories',                              destination: '/blog',     permanent: true },
      { source: '/stories/:slug([^.]+)',                 destination: '/blog/:slug', permanent: true },
      // Old WordPress category pages
      { source: '/category/slow-living',                 destination: '/blog',     permanent: true },
      { source: '/category/slow-livings',                destination: '/blog',     permanent: true },
      { source: '/category/slow-livings/',               destination: '/blog',     permanent: true },
      { source: '/slow-livings',                         destination: '/blog',     permanent: true },
      { source: '/slow-livings/',                        destination: '/blog',     permanent: true },
      { source: '/handmade-soap-sensitive-skin',         destination: '/blog/handmade-soap-sensitive-skin', permanent: true },
      { source: '/handmade-soap-sensitive-skin/',        destination: '/blog/handmade-soap-sensitive-skin', permanent: true },
      { source: '/our-stories',                          destination: '/blog',     permanent: true },
      { source: '/our-stories/:path*',                   destination: '/blog/:path*', permanent: true },
      { source: '/healing-pillars',                      destination: '/blog',     permanent: true },
      { source: '/healing-pillars/:path*',               destination: '/blog',     permanent: true },
      { source: '/slow-living',                          destination: '/blog',     permanent: true },
      { source: '/mental-health',                        destination: '/blog',     permanent: true },
      { source: '/regenerative-living',                  destination: '/blog',     permanent: true },
      { source: '/our-products',                         destination: '/shop',     permanent: true },
      { source: '/contact-us',                           destination: '/contact',  permanent: true },
      { source: '/about',                                destination: '/our-story',permanent: true },
      { source: '/eco-picks',                            destination: '/',         permanent: true },
      { source: '/our-stories-2',                        destination: '/blog',     permanent: true },
      { source: '/our-stories-2/',                       destination: '/blog',     permanent: true },
      { source: '/recommends/:path*',                    destination: '/blog',     permanent: true },
    ]
  },
}

export default nextConfig
