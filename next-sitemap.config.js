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
    '/our-stories',          // 301 → /blog
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

    const staticPaths = [
      '/',
      '/shop',
      '/our-story',
      '/ingredients',
      '/contact',
      '/reviews',
      '/faq',
      '/returns',
      '/privacy-policy',
    ]

    // Programmatic SEO data
    const today = new Date().toISOString().split('T')[0]
    
    const extractLiveSlugs = (filePath) => {
      const fullPath = path.resolve(process.cwd(), filePath)
      if (!fs.existsSync(fullPath)) return []
      const content = fs.readFileSync(fullPath, 'utf8')
      const slugs = []
      // [\s\S]*? handles multi-line objects that contain nested arrays (e.g. faqs: [{...}])
      // Only matches entries with a real date string — null entries are skipped naturally
      const entryRegex = /slug:\s*['"]([^'"]+)['"][\s\S]*?publishedAt:\s*'(\d{4}-\d{2}-\d{2})'/g
      let match
      while ((match = entryRegex.exec(content)) !== null) {
        if (match[2] <= today) {
          slugs.push(match[1])
        }
      }
      return slugs
    }

    const compareSlugs = extractLiveSlugs('src/data/comparisons.ts')
    const ingredientSlugs = extractLiveSlugs('src/data/ingredients.ts')
    const citySlugs = extractLiveSlugs('src/data/cities.ts')

    // Product pages are dynamic at runtime, so list their canonical URLs explicitly.
    const productSlugs = [
      'gift-soap-pouch',
      'ginger-rosemary-glycerin-soap',
      'ginger-rosemary-goat-milk-soap',
      'honey-and-oats-goatmilk-soap',
      'honey-kesar-haldi-sheabutter-soap',
      'honey-oats-glycerin-soap',
      'kesar-haldi-goat-milk-soap',
      'loofah-soaps',
      'neem-tulsi-glycerin-soap',
      'neem-tulsi-goatmilk-soap',
      'orange',
      'orange-goatmilk-soap',
      'pomegranate-glycerine',
      'pomegranate-goatmilk-soap',
      'red-rose-soap',
      'rice-rose-goatmilk-soap',
      'sheabutter-kesar-gulab',
      'travel-soaps',
    ]

    return [
      ...staticPaths.map((loc) => ({ loc })),
      ...productSlugs.map((slug) => ({
        loc: `/shop/${slug}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })),
      ...blogSlugs.map((slug) => ({
        loc: `/blog/${slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })),
      ...storySlugs.map((slug) => ({
        loc: `/blog/${slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })),
      ...compareSlugs.map((slug) => ({
        loc: `/compare/${slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })),
      ...ingredientSlugs.map((slug) => ({
        loc: `/ingredient/${slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })),
      ...citySlugs.map((slug) => ({
        loc: `/soap/${slug}`,
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
      '/faq': 0.7,
      '/blog': 0.6,
      '/privacy-policy': 0.3,
    }

    const changefreqMap = {
      '/': 'weekly',
      '/shop': 'weekly',
      '/our-story': 'monthly',
      '/ingredients': 'monthly',
      '/contact': 'monthly',
      '/reviews': 'monthly',
      '/faq': 'monthly',
      '/blog': 'weekly',
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
