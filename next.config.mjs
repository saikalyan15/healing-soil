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
      // www → non-www canonical redirect
      { source: '/:path*', has: [{ type: 'host', value: 'www.healingsoil.in' }], destination: 'https://healingsoil.in/:path*', permanent: true },
      // /compare/glycerin-vs-goat-milk-soap is a live page with canonicalOverride in comparisons.ts — no redirect needed
      // Secondary blog post on the same topic — consolidate into the original
      { source: '/blog/goat-milk-soap-base-vs-glycerin-soap-base', destination: '/blog/glycerin-vs-goat-milk-soap', permanent: true },
{ source: '/wp-includes/:path*',                   destination: '/blog',     permanent: true },
      { source: '/wp-content/:path*',                    destination: '/blog',     permanent: true },
      { source: '/wp-admin/:path*',                      destination: '/blog',     permanent: true },
      { source: '/wp-login.php',                         destination: '/blog',     permanent: true },
      { source: '/wp-signup.php',                        destination: '/blog',     permanent: true },
      { source: '/xmlrpc.php',                           destination: '/blog',     permanent: true },
      // Old WordPress blog slug
      { source: '/blog/why-we-dont-use-chemicals',        destination: '/blog/what-makes-soap-chemical-free',                              permanent: true },
      { source: '/blog/how-to-make-handmade-soap-last-longer', destination: '/blog/why-handmade-soap-lasts-longer',                             permanent: true },
      { source: '/blog/natural-soap-for-eczema-dry-skin', destination: '/blog/natural-soap-sensitive-skin-india',                             permanent: true },
      { source: '/blog/shea-butter-soap-benefits',        destination: '/blog/understanding-the-benefits-of-shea-butter-in-soap',             permanent: true },
      { source: '/blog/goat-milk-soap-for-sensitive-skin',destination: '/blog/what-makes-goat-milk-soap-beneficial-for-sensitive-skin',       permanent: true },
      // Unpublished posts — redirect to closest live alternative
      { source: '/blog/best-natural-soap-for-eczema',     destination: '/blog/natural-soap-sensitive-skin-india',                             permanent: true },
      { source: '/blog/seven-days-without-paracetamol-how-we-beat-the-flu', destination: '/blog',                                             permanent: true },
      { source: '/blog/transform-your-mental-health-how-mindful-cooking-became-my-healing-practice', destination: '/blog',                    permanent: true },
      { source: '/shop/orange',                          destination: '/shop/orange-glycerin-soap', permanent: true },
      { source: '/stories',                              destination: '/blog',     permanent: true },
      { source: '/stories/',                             destination: '/blog',     permanent: true },
      
      // Retired stories - direct to final destinations (avoiding chains)
      { source: '/stories/seven-days-without-paracetamol-how-we-beat-the-flu', destination: '/blog', permanent: true },
      { source: '/stories/transform-your-mental-health-how-mindful-cooking-became-my-healing-practice', destination: '/blog', permanent: true },
      { source: '/stories/how-to-make-handmade-soap-last-longer', destination: '/blog/why-handmade-soap-lasts-longer', permanent: true },
      { source: '/stories/natural-soap-for-eczema-dry-skin',      destination: '/blog/natural-soap-sensitive-skin-india', permanent: true },
      { source: '/stories/shea-butter-soap-benefits',             destination: '/blog/understanding-the-benefits-of-shea-butter-in-soap', permanent: true },
      { source: '/stories/goat-milk-soap-for-sensitive-skin',     destination: '/blog/what-makes-goat-milk-soap-beneficial-for-sensitive-skin', permanent: true },
      { source: '/stories/best-natural-soap-for-eczema',          destination: '/blog/natural-soap-sensitive-skin-india', permanent: true },
      
      // Generic story move (slug-only — no dots, so image files fall through to the catch-all below)
      { source: '/stories/:slug([^.]+)',                 destination: '/blog/:slug', permanent: true },
      // Catch-all for /stories/ with file extensions (old WP media files like .avif, .jpg)
      { source: '/stories/:path*',                       destination: '/blog',      permanent: true },
      // Old WordPress category pages
      { source: '/category/slow-living',                 destination: '/blog',     permanent: true },
      { source: '/category/slow-living/',                destination: '/blog',     permanent: true },
      { source: '/category/slow-livings',                destination: '/blog',     permanent: true },
      { source: '/category/slow-livings/',               destination: '/blog',     permanent: true },
      { source: '/category/regenerative-living',         destination: '/blog',     permanent: true },
      { source: '/category/regenerative-living/',        destination: '/blog',     permanent: true },
      { source: '/slow-livings',                         destination: '/blog',     permanent: true },
      { source: '/slow-livings/',                        destination: '/blog',     permanent: true },
      { source: '/handmade-soap-sensitive-skin',         destination: '/blog/handmade-soap-sensitive-skin', permanent: true },
      { source: '/handmade-soap-sensitive-skin/',        destination: '/blog/handmade-soap-sensitive-skin', permanent: true },
      { source: '/our-stories',                          destination: '/blog',     permanent: true },
      { source: '/our-stories/',                         destination: '/blog',     permanent: true },
      { source: '/our-stories/2',                        destination: '/blog',     permanent: true },
      { source: '/our-stories/2/',                       destination: '/blog',     permanent: true },
      { source: '/our-stories/:path*',                   destination: '/blog/:path*', permanent: true },
      { source: '/healing-pillars',                      destination: '/blog',     permanent: true },
      { source: '/healing-pillars/',                     destination: '/blog',     permanent: true },
      { source: '/healing-pillars/:path*',               destination: '/blog',     permanent: true },
      { source: '/slow-living',                          destination: '/blog',     permanent: true },
      { source: '/slow-living/',                         destination: '/blog',     permanent: true },
      { source: '/mental-health',                        destination: '/blog',     permanent: true },
      { source: '/mental-health/',                       destination: '/blog',     permanent: true },
      { source: '/regenerative-living',                  destination: '/blog',     permanent: true },
      { source: '/regenerative-living/',                 destination: '/blog',     permanent: true },
      { source: '/home',                                  destination: '/',         permanent: true },
      { source: '/home/',                                 destination: '/',         permanent: true },
      { source: '/diy-neem-soap-slow-living',             destination: '/blog/diy-neem-soap-slow-living', permanent: true },
      { source: '/diy-neem-soap-slow-living/',            destination: '/blog/diy-neem-soap-slow-living', permanent: true },
      { source: '/our-products',                         destination: '/shop',     permanent: true },
      { source: '/our-products/',                        destination: '/shop',     permanent: true },
      { source: '/contact-us',                           destination: '/contact',  permanent: true },
      { source: '/contact-us/',                          destination: '/contact',  permanent: true },
      { source: '/about',                                destination: '/our-story',permanent: true },
      { source: '/about/',                               destination: '/our-story',permanent: true },
      { source: '/eco-picks',                            destination: '/',         permanent: true },
      { source: '/eco-picks/',                           destination: '/',         permanent: true },
      { source: '/our-stories-2',                        destination: '/blog',     permanent: true },
      { source: '/our-stories-2/',                       destination: '/blog',     permanent: true },
      { source: '/recommends/:path*',                    destination: '/blog',     permanent: true },
      // WordPress RSS feed URLs — go directly to /blog
      { source: '/slow-living/feed/:path*',              destination: '/blog',     permanent: true },
      { source: '/mental-health/feed/:path*',            destination: '/blog',     permanent: true },
      { source: '/regenerative-living/feed/:path*',      destination: '/blog',     permanent: true },
      { source: '/monsoon-gardening-5-sustainable-ways-to-protect-your-plants-from-heavy-rain/feed/:path*', destination: '/blog/monsoon-gardening-5-sustainable-ways-to-protect-your-plants-from-heavy-rain', permanent: true },
      // Old WordPress post slugs at root level
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
      { source: '/seven-days-without-paracetamol-how-we-beat-the-flu',  destination: '/blog', permanent: true },
      { source: '/seven-days-without-paracetamol-how-we-beat-the-flu/', destination: '/blog', permanent: true },
      { source: '/monsoon-gardening-5-sustainable-ways-to-protect-your-plants-from-heavy-rain',  destination: '/blog/monsoon-gardening-5-sustainable-ways-to-protect-your-plants-from-heavy-rain', permanent: true },
      { source: '/monsoon-gardening-5-sustainable-ways-to-protect-your-plants-from-heavy-rain/', destination: '/blog/monsoon-gardening-5-sustainable-ways-to-protect-your-plants-from-heavy-rain', permanent: true },
      { source: '/mental-health-slow-living-useless-activities',  destination: '/blog/mental-health-slow-living-useless-activities', permanent: true },
      { source: '/mental-health-slow-living-useless-activities/', destination: '/blog/mental-health-slow-living-useless-activities', permanent: true },
      { source: '/caterpillar-content-writing-lessons',  destination: '/blog/caterpillar-content-writing-lessons', permanent: true },
      { source: '/caterpillar-content-writing-lessons/', destination: '/blog/caterpillar-content-writing-lessons', permanent: true },
      // Missing root-level story slugs from old WordPress
      { source: '/the-tank-that-taught-me-to-think-again',  destination: '/blog/the-tank-that-taught-me-to-think-again', permanent: true },
      { source: '/the-tank-that-taught-me-to-think-again/', destination: '/blog/the-tank-that-taught-me-to-think-again', permanent: true },
      { source: '/the-red-okra-the-art-of-slow-living',     destination: '/blog/the-red-okra-the-art-of-slow-living',    permanent: true },
      { source: '/the-red-okra-the-art-of-slow-living/',    destination: '/blog/the-red-okra-the-art-of-slow-living',    permanent: true },
      { source: '/when-the-sole-gives-up-before-the-soul',  destination: '/blog/when-the-sole-gives-up-before-the-soul', permanent: true },
      { source: '/when-the-sole-gives-up-before-the-soul/', destination: '/blog/when-the-sole-gives-up-before-the-soul', permanent: true },
      // WordPress author archive pages
      { source: '/author/:path*',                           destination: '/our-story',                                   permanent: true },
      // WordPress per-post RSS feed URLs
      { source: '/caterpillar-content-writing-lessons/feed/:path*', destination: '/blog/caterpillar-content-writing-lessons', permanent: true },
      // Retired product page
      { source: '/shop/valentines-special-soap',         destination: '/shop',      permanent: true },
    ]
  },
}

export default nextConfig
