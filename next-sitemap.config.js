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
    // lastmod comes from the content that backs each URL: MDX frontmatter
    // `date` for posts, `publishedAt` for programmatic data entries. A uniform
    // build-time timestamp on all 500+ URLs tells Google the dates are not
    // real, so it ignores lastmod entirely. When a page is genuinely revised,
    // add an `updated:` / `updatedAt:` field and wire it in here.
    const isoOrNull = (d) => (d ? new Date(d).toISOString() : null)
    const withLastmod = (lastmod) => (lastmod ? { lastmod } : {})

    const getPostsByDir = (dir) => {
      const dirPath = path.join(process.cwd(), 'content', dir)
      if (!fs.existsSync(dirPath)) return []
      return fs
        .readdirSync(dirPath)
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => {
          const content = fs.readFileSync(path.join(dirPath, f), 'utf8')
          if (content.includes('published: false')) return null
          const m = content.match(/^date:\s*['"]?(\d{4}-\d{2}-\d{2})/m)
          return { slug: f.replace(/\.mdx$/, ''), lastmod: isoOrNull(m && m[1]) }
        })
        .filter(Boolean)
    }

    const blogPosts = getPostsByDir('blog')
    const storyPosts = getPostsByDir('stories')
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
    
    const extractLiveEntries = (filePath) => {
      const fullPath = path.resolve(process.cwd(), filePath)
      if (!fs.existsSync(fullPath)) return []
      const content = fs.readFileSync(fullPath, 'utf8')
      const entries = []
      // [\s\S]*? handles multi-line objects that contain nested arrays (e.g. faqs: [{...}])
      // Only matches entries with a real date string — null entries are skipped naturally
      const entryRegex = /slug:\s*['"]([^'"]+)['"][\s\S]*?publishedAt:\s*'(\d{4}-\d{2}-\d{2})'/g
      let match
      while ((match = entryRegex.exec(content)) !== null) {
        if (match[2] <= today) {
          entries.push({ slug: match[1], lastmod: isoOrNull(match[2]) })
        }
      }
      return entries
    }

    // Comparison pages whose rel=canonical points somewhere else. These must
    // not be submitted, or the sitemap contradicts the canonical tag and
    // Google indexes both URLs. Note the top-level `exclude` array does NOT
    // cover these, because additionalPaths entries bypass it.
    const canonicalOverriddenCompareSlugs = new Set([
      'glycerin-vs-goat-milk-soap', // canonical → /blog/glycerin-vs-goat-milk-soap
    ])

    const compareEntries = extractLiveEntries('src/data/comparisons.ts').filter(
      (e) => !canonicalOverriddenCompareSlugs.has(e.slug)
    )
    const ingredientEntries = extractLiveEntries('src/data/ingredients.ts')
    const decisionEntries = extractLiveEntries('src/data/decisions.ts')
    const cityEntries = extractLiveEntries('src/data/cities.ts')
    const occasionEntries = extractLiveEntries('src/data/occasions.ts')
    const ayurvedicEntries = extractLiveEntries('src/data/ayurvedic.ts')
    const combinationEntries = extractLiveEntries('src/data/combinations.ts')

    // City-ingredient cross-pages use ingredientSlug: field, not slug:
    const extractCityIngredientEntries = (filePath) => {
      const fullPath = path.resolve(process.cwd(), filePath)
      if (!fs.existsSync(fullPath)) return []
      const content = fs.readFileSync(fullPath, 'utf8')
      const entries = []
      const entryRegex = /ingredientSlug:\s*['"]([^'"]+)['"][\s\S]*?publishedAt:\s*'(\d{4}-\d{2}-\d{2})'/g
      let match
      while ((match = entryRegex.exec(content)) !== null) {
        if (match[2] <= today) entries.push({ ingredientSlug: match[1], lastmod: isoOrNull(match[2]) })
      }
      return entries
    }
    const enabledCityIngredientEntries = extractCityIngredientEntries('src/data/city-ingredients.ts')

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
      // Products have no static date source (name, price and stock all live in
      // SoapLedger and can change any day), so build time is the honest value.
      ...productSlugs.map((slug) => ({
        loc: `/shop/${slug}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      })),
      ...blogPosts
        .filter((p) => !redirectedBlogSlugs.has(p.slug))
        .map((p) => ({
          loc: `/blog/${p.slug}`,
          changefreq: 'monthly',
          priority: 0.8,
          ...withLastmod(p.lastmod),
        })),
      ...storyPosts
        .filter((p) => !excludedStorySlugs.has(p.slug))
        .map((p) => ({
          loc: `/blog/${p.slug}`,
          changefreq: 'monthly',
          priority: 0.8,
          ...withLastmod(p.lastmod),
        })),
      ...compareEntries.map((e) => ({
        loc: `/compare/${e.slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        ...withLastmod(e.lastmod),
      })),
      ...decisionEntries.map((e) => ({
        loc: `/soap-for/${e.slug}`,
        changefreq: 'monthly',
        priority: 0.8,
        ...withLastmod(e.lastmod),
      })),
      ...ingredientEntries.map((e) => ({
        loc: `/ingredient/${e.slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        ...withLastmod(e.lastmod),
      })),
      ...cityEntries.map((e) => ({
        loc: `/soap/${e.slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        ...withLastmod(e.lastmod),
      })),
      ...occasionEntries.map((e) => ({
        loc: `/occasion/${e.slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        ...withLastmod(e.lastmod),
      })),
      ...ayurvedicEntries.map((e) => ({
        loc: `/ayurvedic-soap/${e.slug}`,
        changefreq: 'monthly',
        priority: 0.8,
        ...withLastmod(e.lastmod),
      })),
      ...combinationEntries.map((e) => ({
        loc: `/${e.slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        ...withLastmod(e.lastmod),
      })),
      ...enabledCityIngredientEntries.flatMap((ci) =>
        cityEntries.map((city) => ({
          loc: `/soap/${city.slug}/${ci.ingredientSlug}`,
          changefreq: 'monthly',
          priority: 0.6,
          // the later of the city hub's date and the cross-page's own date
          ...withLastmod([city.lastmod, ci.lastmod].filter(Boolean).sort().pop() || null),
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
