import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: { appIsrStatus: false, buildActivity: false },
  turbopack: { root: __dirname },

  async redirects() {
    return [
      { source: '/our-stories',                          destination: '/stories',  permanent: true },
      { source: '/our-stories/:path*',                   destination: '/stories/:path*', permanent: true },
      { source: '/healing-pillars/slow-living',          destination: '/stories',  permanent: true },
      { source: '/healing-pillars/mental-health',        destination: '/stories',  permanent: true },
      { source: '/healing-pillars/regenerative-living',  destination: '/stories',  permanent: true },
      { source: '/our-products',                         destination: '/shop',     permanent: true },
      { source: '/contact-us',                           destination: '/contact',  permanent: true },
      { source: '/about',                                destination: '/our-story',permanent: true },
      { source: '/eco-picks',                            destination: '/',         permanent: true },
    ]
  },
}

export default nextConfig
