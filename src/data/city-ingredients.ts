export type CityIngredientBatch = {
  ingredientSlug: string
  publishedAt: string | null
}

// Unpublished 2026-10-20. These 378 templated pages drew no city-name search
// queries in Search Console and the ones Google crawled sat in "Crawled -
// currently not indexed". With publishedAt null they leave generateStaticParams
// and the sitemap; next.config.mjs 301s each one to its /soap/[city] hub.
export const cityIngredientBatches: CityIngredientBatch[] = [
  // Batch 1 — 2026-05-22 (5 ingredients × 27 cities = 135 pages)
  { ingredientSlug: 'neem', publishedAt: null },
  { ingredientSlug: 'goat-milk', publishedAt: null },
  { ingredientSlug: 'glycerin', publishedAt: null },
  { ingredientSlug: 'honey', publishedAt: null },
  { ingredientSlug: 'shea-butter', publishedAt: null },
  // Batch 2 — 2026-05-22 (9 ingredients × 27 cities = 243 pages)
  { ingredientSlug: 'tulsi', publishedAt: null },
  { ingredientSlug: 'oats', publishedAt: null },
  { ingredientSlug: 'kesar', publishedAt: null },
  { ingredientSlug: 'haldi', publishedAt: null },
  { ingredientSlug: 'rose', publishedAt: null },
  { ingredientSlug: 'pomegranate', publishedAt: null },
  { ingredientSlug: 'orange', publishedAt: null },
  { ingredientSlug: 'ginger', publishedAt: null },
  { ingredientSlug: 'rosemary', publishedAt: null },
]
