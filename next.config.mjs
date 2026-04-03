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
      { source: '/blog/why-we-dont-use-chemicals',        destination: '/blog/what-makes-soap-chemical-free', permanent: true },
      // Old WordPress category pages
      { source: '/category/slow-living',                  destination: '/stories', permanent: true },
      { source: '/category/slow-livings',                 destination: '/stories', permanent: true },
      { source: '/category/slow-livings/',                destination: '/stories', permanent: true },
      { source: '/slow-livings',                          destination: '/stories', permanent: true },
      { source: '/slow-livings/',                         destination: '/stories', permanent: true },
      { source: '/handmade-soap-sensitive-skin',          destination: '/stories/handmade-soap-sensitive-skin', permanent: true },
      { source: '/handmade-soap-sensitive-skin/',         destination: '/stories/handmade-soap-sensitive-skin', permanent: true },
      { source: '/our-stories',                          destination: '/stories',  permanent: true },
      { source: '/our-stories/:path*',                   destination: '/stories/:path*', permanent: true },
      { source: '/healing-pillars',                      destination: '/stories',  permanent: true },
      { source: '/healing-pillars/:path*',               destination: '/stories',  permanent: true },
      { source: '/slow-living',                          destination: '/stories',  permanent: true },
      { source: '/mental-health',                        destination: '/stories',  permanent: true },
      { source: '/regenerative-living',                  destination: '/stories',  permanent: true },
      { source: '/our-products',                         destination: '/shop',     permanent: true },
      { source: '/contact-us',                           destination: '/contact',  permanent: true },
      { source: '/about',                                destination: '/our-story',permanent: true },
      { source: '/eco-picks',                            destination: '/',         permanent: true },
      { source: '/our-stories-2',                        destination: '/stories',  permanent: true },
      { source: '/our-stories-2/',                       destination: '/stories',  permanent: true },
      { source: '/recommends/:path*',                    destination: '/stories',  permanent: true },
    ]
  },
}

export default nextConfig
