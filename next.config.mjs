import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: { appIsrStatus: false, buildActivity: false },
  turbopack: { root: __dirname },
  images: {
    unoptimized: true,
  },

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
      { source: '/blog/natural-soap-for-eczema-dry-skin', destination: '/blog/natural-soap-sensitive-skin-india',                             permanent: true },
      { source: '/blog/shea-butter-soap-benefits',        destination: '/blog/understanding-the-benefits-of-shea-butter-in-soap',             permanent: true },
      { source: '/blog/goat-milk-soap-for-sensitive-skin',destination: '/blog/what-makes-goat-milk-soap-beneficial-for-sensitive-skin',       permanent: true },
      // Unpublished posts — redirect to closest live alternative
      { source: '/blog/best-natural-soap-for-eczema',     destination: '/blog/natural-soap-sensitive-skin-india',                             permanent: true },
      { source: '/blog/seven-days-without-paracetamol-how-we-beat-the-flu', destination: '/blog',                                             permanent: true },
      { source: '/blog/transform-your-mental-health-how-mindful-cooking-became-my-healing-practice', destination: '/blog',                    permanent: true },
      // /stories → /blog (stories merged into blog)
      // :slug pattern [^.]+ excludes file extensions so static assets (images) are not caught
      { source: '/stories',                              destination: '/blog',     permanent: true },
      { source: '/stories/:slug([^.]+)',                 destination: '/blog/:slug', permanent: true },
      // Old WordPress category pages
      { source: '/category/slow-living',                 destination: '/blog',     permanent: true },
      { source: '/category/slow-livings',                destination: '/blog',     permanent: true },
      { source: '/category/slow-livings/',               destination: '/blog',     permanent: true },
      { source: '/category/regenerative-living',         destination: '/blog',     permanent: true },
      { source: '/category/regenerative-living/',        destination: '/blog',     permanent: true },
      { source: '/slow-livings',                         destination: '/blog',     permanent: true },
      { source: '/slow-livings/',                        destination: '/blog',     permanent: true },
      { source: '/handmade-soap-sensitive-skin',         destination: '/blog/handmade-soap-sensitive-skin', permanent: true },
      { source: '/handmade-soap-sensitive-skin/',        destination: '/blog/handmade-soap-sensitive-skin', permanent: true },
      { source: '/our-stories',                          destination: '/blog',     permanent: true },
      // Specific pagination page must come before the wildcard to avoid /blog/2/ (404)
      { source: '/our-stories/2',                        destination: '/blog',     permanent: true },
      { source: '/our-stories/2/',                       destination: '/blog',     permanent: true },
      { source: '/our-stories/:path*',                   destination: '/blog/:path*', permanent: true },
      { source: '/healing-pillars',                      destination: '/blog',     permanent: true },
      { source: '/healing-pillars/:path*',               destination: '/blog',     permanent: true },
      { source: '/slow-living',                          destination: '/blog',     permanent: true },
      { source: '/mental-health',                        destination: '/blog',     permanent: true },
      { source: '/regenerative-living',                  destination: '/blog',     permanent: true },
      { source: '/home',                                  destination: '/',         permanent: true },
      { source: '/home/',                                 destination: '/',         permanent: true },
      { source: '/diy-neem-soap-slow-living',             destination: '/blog/neem-tulsi-soap-benefits', permanent: true },
      { source: '/diy-neem-soap-slow-living/',            destination: '/blog/neem-tulsi-soap-benefits', permanent: true },
      { source: '/our-products',                         destination: '/shop',     permanent: true },
      { source: '/contact-us',                           destination: '/contact',  permanent: true },
      { source: '/about',                                destination: '/our-story',permanent: true },
      { source: '/eco-picks',                            destination: '/',         permanent: true },
      { source: '/our-stories-2',                        destination: '/blog',     permanent: true },
      { source: '/our-stories-2/',                       destination: '/blog',     permanent: true },
      { source: '/recommends/:path*',                    destination: '/blog',     permanent: true },
      // WordPress RSS feed URLs — go directly to /blog (not via the category redirect above)
      { source: '/slow-living/feed/:path*',              destination: '/blog',     permanent: true },
      { source: '/mental-health/feed/:path*',            destination: '/blog',     permanent: true },
      { source: '/regenerative-living/feed/:path*',      destination: '/blog',     permanent: true },
      { source: '/monsoon-gardening-5-sustainable-ways-to-protect-your-plants-from-heavy-rain/feed/:path*', destination: '/blog/monsoon-gardening-5-sustainable-ways-to-protect-your-plants-from-heavy-rain', permanent: true },
      // Old WordPress post slugs at root level — go directly to /blog/[slug] (not via /stories which would chain)
      { source: '/an-attempt-at-homemade-drinks',        destination: '/blog/an-attempt-at-homemade-drinks',        permanent: true },
      { source: '/an-attempt-at-homemade-drinks/',       destination: '/blog/an-attempt-at-homemade-drinks',        permanent: true },
      { source: '/why-play-is-essential-for-a-fulfilling-life-even-as-adults',  destination: '/blog/why-play-is-essential-for-a-fulfilling-life-even-as-adults', permanent: true },
      { source: '/why-play-is-essential-for-a-fulfilling-life-even-as-adults/', destination: '/blog/why-play-is-essential-for-a-fulfilling-life-even-as-adults', permanent: true },
      { source: '/farm-tea-ritual-how-regenerative-living-includes-rest-and-restoration',  destination: '/blog/farm-tea-ritual-how-regenerative-living-includes-rest-and-restoration', permanent: true },
      { source: '/farm-tea-ritual-how-regenerative-living-includes-rest-and-restoration/', destination: '/blog/farm-tea-ritual-how-regenerative-living-includes-rest-and-restoration', permanent: true },
      { source: '/the-mango-tree-and-the-art-of-resilience',  destination: '/blog/the-mango-tree-and-the-art-of-resilience', permanent: true },
      { source: '/the-mango-tree-and-the-art-of-resilience/', destination: '/blog/the-mango-tree-and-the-art-of-resilience', permanent: true },
      { source: '/transform-your-mental-health-how-mindful-cooking-became-my-healing-practice',  destination: '/blog', permanent: true },
      { source: '/transform-your-mental-health-how-mindful-cooking-became-my-healing-practice/', destination: '/blog', permanent: true },
      { source: '/just-do-it-said-the-mango-tree-a-lesson-in-letting-go',  destination: '/blog/just-do-it-said-the-mango-tree-a-lesson-in-letting-go', permanent: true },
      { source: '/just-do-it-said-the-mango-tree-a-lesson-in-letting-go/', destination: '/blog/just-do-it-said-the-mango-tree-a-lesson-in-letting-go', permanent: true },
    ]
  },
}

export default nextConfig
