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
    '/stories/*',            // 301 → /blog/*
    '/blog/goat-milk-soap-base-vs-glycerin-soap-base',          // 301 → /blog/glycerin-vs-goat-milk-soap
    '/compare/glycerin-vs-goat-milk-soap',                      // 301 → /blog/glycerin-vs-goat-milk-soap
    '/blog/garden-to-bar-marigold-soap',                        // 301 → /blog/marigold-soap-benefits
    '/blog/pomegranate-soap-benefits',                          // 301 → /blog/pomegranate-peel-soap
    '/blog/what-makes-goat-milk-soap-beneficial-for-sensitive-skin', // 301 → /blog/goat-milk-soap-benefits
    '/blog/handmade-soap-sensitive-skin',                       // 301 → /blog/natural-soap-sensitive-skin-india
    '/blog/sls-parabens-soap-india',                            // 301 → /blog/sls-free-soap-india
    '/blog/seven-days-without-paracetamol-how-we-beat-the-flu', // 301 → /blog
    '/blog/transform-your-mental-health-how-mindful-cooking-became-my-healing-practice', // 301 → /blog
    '/shop/orange',          // 301 → /shop/orange-glycerin-soap
    '/eco-picks',            // 301 → /
    '/healing-pillars',
    '/slow-living',
    '/mental-health',
    '/regenerative-living',
    '/my-account',
    '/distributor-soap-squares-catalog',
    '/whatsapp/callback',    // internal Meta Embedded Signup OAuth redirect target
    '/whatsapp/*',
    '/icon.png',             // App Router favicon picked up as route
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        // /distributor-soap-squares-catalog is a real private page (noindex,
        // nofollow at the meta level) — kept out of crawling on purpose.
        // /whatsapp/* are internal Meta Embedded Signup redirect targets.
        disallow: ['/distributor-soap-squares-catalog', '/whatsapp/'],
      },
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
        .filter((f) => {
          const content = fs.readFileSync(path.join(dirPath, f), 'utf8')
          return !content.includes('published: false')
        })
        .map((f) => f.replace(/\.mdx$/, ''))
    }

    const blogSlugs = getSlugsByDir('blog')
    const storySlugs = getSlugsByDir('stories')
    const redirectedBlogSlugs = new Set([
      'goat-milk-soap-base-vs-glycerin-soap-base',
      'garden-to-bar-marigold-soap',
      'pomegranate-soap-benefits',
      'what-makes-goat-milk-soap-beneficial-for-sensitive-skin',
      'sls-parabens-soap-india',
    ])

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

    // Comparison pages whose rel=canonical points somewhere else. These must
    // not be submitted, or the sitemap contradicts the canonical tag and
    // Google indexes both URLs. Note the top-level `exclude` array does NOT
    // cover these, because additionalPaths entries bypass it.
    const canonicalOverriddenCompareSlugs = new Set([
      'glycerin-vs-goat-milk-soap', // canonical → /blog/glycerin-vs-goat-milk-soap
    ])

    const compareSlugs = extractLiveSlugs('src/data/comparisons.ts').filter(
      (slug) => !canonicalOverriddenCompareSlugs.has(slug)
    )
    const ingredientSlugs = extractLiveSlugs('src/data/ingredients.ts')
    const decisionSlugs = extractLiveSlugs('src/data/decisions.ts')
    const citySlugs = extractLiveSlugs('src/data/cities.ts')
    const occasionSlugs = extractLiveSlugs('src/data/occasions.ts')
    const ayurvedicSlugs = extractLiveSlugs('src/data/ayurvedic.ts')
    const combinationSlugs = extractLiveSlugs('src/data/combinations.ts')

    // City-ingredient cross-pages use ingredientSlug: field, not slug:
    const extractCityIngredientSlugs = (filePath) => {
      const fullPath = path.resolve(process.cwd(), filePath)
      if (!fs.existsSync(fullPath)) return []
      const content = fs.readFileSync(fullPath, 'utf8')
      const slugs = []
      const entryRegex = /ingredientSlug:\s*['"]([^'"]+)['"][\s\S]*?publishedAt:\s*'(\d{4}-\d{2}-\d{2})'/g
      let match
      while ((match = entryRegex.exec(content)) !== null) {
        if (match[2] <= today) slugs.push(match[1])
      }
      return slugs
    }
    const enabledCityIngredientSlugs = extractCityIngredientSlugs('src/data/city-ingredients.ts')

    // Product slugs are read from the pages the build actually prerendered,
    // rather than hand-maintained here.
    //
    // This list used to be hardcoded and had silently drifted from SoapLedger:
    // it still listed kesar-haldi-goat-milk-soap and rice-rose-goatmilk-soap,
    // which no longer exist and were being submitted to Google as 404s, while
    // omitting kesar-haldi-papaya-cucumber-soap and kids-collection-set-of-4,
    // which do exist. Deriving it from the build output means the sitemap can
    // only ever contain URLs that were genuinely generated.
    //
    // next-sitemap runs as a postbuild step, so .next is guaranteed to exist.
    const productSlugs = (() => {
      const dir = path.join(process.cwd(), '.next', 'server', 'app', 'shop')
      if (!fs.existsSync(dir)) {
        console.warn('[next-sitemap] .next/server/app/shop not found — no product URLs emitted')
        return []
      }
      return fs
        .readdirSync(dir)
        .filter((f) => f.endsWith('.html'))
        .map((f) => f.replace(/\.html$/, ''))
        .sort()
    })()

    // Stories that are retired and redirect to /blog — exclude from sitemap.
    const excludedStorySlugs = new Set([
      'seven-days-without-paracetamol-how-we-beat-the-flu',
      'transform-your-mental-health-how-mindful-cooking-became-my-healing-practice',
      'handmade-soap-sensitive-skin',
    ])

    return [
      ...staticPaths.map((loc) => ({ loc })),
      ...productSlugs.map((slug) => ({
        loc: `/shop/${slug}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      })),
      ...blogSlugs
        .filter((slug) => !redirectedBlogSlugs.has(slug))
        .map((slug) => ({
          loc: `/blog/${slug}`,
          changefreq: 'monthly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        })),
      ...storySlugs
        .filter((slug) => !excludedStorySlugs.has(slug))
        .map((slug) => ({
          loc: `/blog/${slug}`,
          changefreq: 'monthly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        })),
      ...compareSlugs.map((slug) => ({
        loc: `/compare/${slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })),
      ...decisionSlugs.map((slug) => ({
        loc: `/soap-for/${slug}`,
        changefreq: 'monthly',
        priority: 0.8,
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
      ...occasionSlugs.map((slug) => ({
        loc: `/occasion/${slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })),
      ...ayurvedicSlugs.map((slug) => ({
        loc: `/ayurvedic-soap/${slug}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })),
      ...combinationSlugs.map((slug) => ({
        loc: `/${slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })),
      ...enabledCityIngredientSlugs.flatMap((ingredientSlug) =>
        citySlugs.map((citySlug) => ({
          loc: `/soap/${citySlug}/${ingredientSlug}`,
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: new Date().toISOString(),
        }))
      ),
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
      '/blog': 0.7,
      '/privacy-policy': 0.5,
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
