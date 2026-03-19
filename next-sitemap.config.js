const fs = require('fs')
const path = require('path')

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://healingsoil.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,

  // Pages that should not appear in the sitemap
  exclude: [
    '/cart',
    '/checkout',
    '/order',
    '/order/confirmation',
    '/order/track',
    '/about',                // 301 → /our-story
    '/our-products',         // 301 → /shop
    '/our-stories',          // 301 → /stories
    '/eco-picks',            // 301 → /
    '/healing-pillars',
    '/slow-living',
    '/mental-health',
    '/regenerative-living',
    '/my-account',
    '/icon.png',             // App Router favicon picked up as route
  ],

  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [],
  },

  // Add dynamic blog and story routes
  additionalPaths: async () => {
    const getSlugsByDir = (dir) => {
      const dirPath = path.join(process.cwd(), 'content', dir)
      if (!fs.existsSync(dirPath)) return []
      return fs
        .readdirSync(dirPath)
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => f.replace(/\.mdx$/, ''))
    }

    const blogSlugs = getSlugsByDir('blog')
    const storySlugs = getSlugsByDir('stories')

    return [
      ...blogSlugs.map((slug) => ({
        loc: `/blog/${slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })),
      ...storySlugs.map((slug) => ({
        loc: `/stories/${slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })),
    ]
  },

  // Priority overrides for key pages
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/shop': 0.9,
      '/our-story': 0.8,
      '/ingredients': 0.7,
      '/contact': 0.7,
      '/reviews': 0.7,
      '/blog': 0.6,
      '/stories': 0.6,
      '/privacy-policy': 0.3,
    }

    const changefreqMap = {
      '/': 'weekly',
      '/shop': 'weekly',
      '/our-story': 'monthly',
      '/ingredients': 'monthly',
      '/contact': 'monthly',
      '/reviews': 'monthly',
      '/blog': 'weekly',
      '/stories': 'weekly',
      '/privacy-policy': 'yearly',
    }

    return {
      loc: path,
      changefreq: changefreqMap[path] ?? config.changefreq ?? 'monthly',
      priority: priorities[path] ?? config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}

module.exports = config
