export type CityIngredientBatch = {
  ingredientSlug: string
  publishedAt: string | null
}

export const cityIngredientBatches: CityIngredientBatch[] = [
  // Batch 1 — 2026-05-22 (5 ingredients × 27 cities = 135 pages)
  { ingredientSlug: 'neem', publishedAt: '2026-05-22' },
  { ingredientSlug: 'goat-milk', publishedAt: '2026-05-22' },
  { ingredientSlug: 'glycerin', publishedAt: '2026-05-22' },
  { ingredientSlug: 'honey', publishedAt: '2026-05-22' },
  { ingredientSlug: 'shea-butter', publishedAt: '2026-05-22' },
  // Batch 2 — 2026-05-22 (9 ingredients × 27 cities = 243 pages)
  { ingredientSlug: 'tulsi', publishedAt: '2026-05-22' },
  { ingredientSlug: 'oats', publishedAt: '2026-05-22' },
  { ingredientSlug: 'kesar', publishedAt: '2026-05-22' },
  { ingredientSlug: 'haldi', publishedAt: '2026-05-22' },
  { ingredientSlug: 'rose', publishedAt: '2026-05-22' },
  { ingredientSlug: 'pomegranate', publishedAt: '2026-05-22' },
  { ingredientSlug: 'orange', publishedAt: '2026-05-22' },
  { ingredientSlug: 'ginger', publishedAt: '2026-05-22' },
  { ingredientSlug: 'rosemary', publishedAt: '2026-05-22' },
]
