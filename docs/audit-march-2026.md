# Site Audit — healingsoil.in
March 2026

---

## Summary

This audit covers four areas: discoverability, conversion, security/maintenance, and feature gaps. Each finding is rated by impact and includes a clear recommendation. No padding — only things that genuinely matter at this stage.

**The core discoverability risk:** You've written about it — the old blog era where content nobody searched for accumulated. That risk still exists, now in the `/stories` section. The `/blog` section is doing the right thing. The `/stories` section is repeating the pattern.

**The highest-ROI action right now** is Google Merchant Center. Free product listings in Google Shopping. Zero code changes. Takes an hour to set up.

---

## 1. Discoverability

### 1.1 Google Merchant Center — HIGH IMPACT, no code needed

Products have everything required for a Shopping feed: name, price, image, availability. Google Merchant Center lists products in Google Shopping search results for free.

**Why this matters:** Search intent on Shopping is purchase-ready. Someone searching "neem tulsi handmade soap" in Google Shopping is about to buy. This is the highest-intent traffic available.

**What to do:**
1. Create a Google Merchant Center account at merchants.google.com
2. Verify healingsoil.in ownership (DNS or HTML file — same as Search Console)
3. Submit a product feed — the simplest option is a URL feed pointing to `/sitemap.xml`, which already lists all product URLs with structured data

No code changes required. The Product schema on `/shop/[slug]` pages already has the data GMC needs.

---

### 1.2 Google Business Profile — MEDIUM IMPACT, no code needed

"Natural soap Goa", "handmade soap South Goa", "handmade soap gift Goa" are local searches. A GBP listing appears in Maps and the Knowledge Panel for those.

**Practical constraint:** If operating from a rented residential space not permitted for commercial use, displaying the address publicly isn't appropriate. GBP has a solution for exactly this: **service area businesses**. You create the listing, set service areas (Goa, India-wide shipping), and hide the physical address entirely. Only the business name, phone, website, and service area show publicly. Many home-based and farm-based small businesses in India use this setup.

**What to do:** At business.google.com, when prompted for address type, choose "I deliver goods and services to my customers" → hide address → set service area as Goa or pan-India. Verify by phone. The NAP on the website doesn't need to include an address if the site doesn't currently show one.

If even this feels uncomfortable given the residential tenancy situation, skip GBP for now. It's medium-impact, not critical — GMC (section 1.1) matters more.

---

### 1.3 Stories section dilutes topical authority — HIGH IMPACT

The `/stories` section has 22 posts. Topics include composting, mental health, slow living, mango trees, and mindful cooking. Only 1 of 22 has a shop CTA.

This is the exact same problem as the old blog era — just in a different folder. Google builds a topic model for each site. A soap-selling site writing about mental health and composting doesn't get ranked as an authority on either soaps or mental health. It just gets ranked less for both.

**What was done (March 2026):**
- Removed "Stories" from header and footer navigation — Blog replaces it in the header
- Added `robots: { index: false, follow: false }` to `/stories` listing page and all `/stories/[slug]` pages — Google will stop indexing them
- Removed all story URLs from `next-sitemap.config.js` — they won't appear in future sitemap builds
- Individual story pages remain accessible by direct URL — any existing backlinks won't 404

**Going forward:** New content goes in `/blog` only, with soap-focused angles.

**What's working:** The `/blog` section has 8 posts, all targeting real soap search terms (`goat-milk-soap-sensitive-skin`, `neem-tulsi-soap-benefits`, `glycerin-vs-goat-milk-soap`, etc.). This is exactly right. Keep doing this.

---

### 1.4 Privacy policy page is empty — MEDIUM IMPACT

`src/app/privacy-policy/page.tsx` has a heading and nothing else.

This matters for two reasons:
1. **Legal:** GA4 and Microsoft Clarity are actively collecting behavioral data. An empty privacy policy while running tracking tools is a liability in most jurisdictions.
2. **Trust:** Privacy-conscious customers check this page before buying. An empty page is worse than no page — it signals the site owner didn't bother.

**What to write:** What data is collected (GA4 event data, Clarity session recordings, order information — name, phone, address), how it's used (analytics, order fulfilment), who it's shared with (Google, Microsoft, SoapLedger), how to request deletion (email address). 300 words is enough.

---

### 1.5 Blog content direction — LOW URGENCY

8 posts is a reasonable start. The keyword targeting is correct. Areas not yet covered:

- "handmade soap gift India" / "natural soap gift set India" (gift purchase intent — high conversion)
- "soap for oily skin India" (skin-type targeting)
- "chemical free soap benefits India" (health-conscious searcher)
- Ingredient-specific searches for less-covered ingredients in the current product range

No urgency here. The existing 8 posts are solid. Grow this when you have bandwidth — each well-targeted post compounds.

---

### 1.6 Star ratings in search results — MEDIUM IMPACT

`/shop/[slug]` pages have Product schema. Product schema supports `aggregateRating`, which makes gold stars appear in Google search results for product pages, increasing click-through rate.

The reviews data already exists in `src/lib/reviews.ts`, and `reviewsForProduct(slug)` is already called on product pages. The problem: reviews have no numeric `rating` field — they're text-only. Without a numeric rating, `aggregateRating` can't be calculated and included in schema.

All 10 reviews are clearly positive. Adding `rating: 5` to each review object is accurate.

**Fix:**
1. Add `rating: number` field to the review type in `src/lib/reviews.ts`
2. Set `rating: 5` on all existing reviews
3. Compute `aggregateRating` from the reviews array in the product page
4. Add `aggregateRating` to the Product JSON-LD schema output

Impact: star snippets in Google search results → higher CTR on product pages.

---

## 2. Conversion

### 2.1 Customer confirmation email — HIGH (worth considering)

After order submission, the customer gets a WhatsApp redirect. That's it. No email. The owner receives a Resend notification email — but the customer gets nothing from the site itself.

Resend is already configured and working. A customer confirmation email — order reference, items ordered, total, "what happens next", WhatsApp link — is a basic trust signal. It's especially important for desktop users who placed an order but didn't complete the WhatsApp step.

**The honest framing:** WhatsApp-first is a valid design choice for this market. Many small Indian e-commerce operations run entirely through WhatsApp with zero email. If your customers are comfortable with this, it's fine. But the customer email field doesn't exist in the order form — it would need to be added as an optional field before a confirmation email can be sent.

**Recommendation:** Consider adding an optional email field to the order form. If provided, send a simple confirmation. `sendOwnerEmail` in `src/lib/orders.ts` is the pattern to follow for a parallel `sendCustomerEmail`.

This is not urgent. Raise it as a deliberate decision rather than a gap.

---

### 2.2 Star ratings on reviews — MEDIUM

`src/lib/reviews.ts` reviews have no `rating` field. This affects two things:

1. The reviews page schema has a hardcoded `5/5` rating — not credible without real data backing it up.
2. AggregateRating on product pages (section 1.6) can't be added without this data.

**Fix:** Add `rating: 5` to each of the 10 existing reviews. All are clearly 5-star reviews. This is the accurate value.

---

### 2.3 What's working — no changes needed

The WhatsApp checkout flow is well-designed:
- Pre-filled message with full order details
- QR code for desktop users
- sessionStorage cart persistence across navigation
- "What happens next" steps reduce drop-off anxiety

GA4 `whatsapp_confirm_clicked` event tracks the key conversion moment. The sticky OrderTray, WelcomeBanner for returning users, real-time shipping calculation by state, and form validation are all solid.

Don't change these. Focus elsewhere.

---

## 3. Security & Maintenance

### 3.1 Security headers missing — HIGH, easy fix

`next.config.mjs` has no security headers configured. These four headers are standard, take 10 lines of config, and defend against common browser-level attacks:

```js
// In next.config.mjs, inside the config object:
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ],
    },
  ]
},
```

**Note on Content-Security-Policy:** Skip CSP for now. GA4, Microsoft Clarity, and Next.js all inject inline scripts that make a correct CSP complex to maintain. The four headers above are safe to add immediately.

---

### 3.2 Console.log leaks customer PII in production — MEDIUM

In `src/lib/orders.ts`:

```ts
console.log('[SoapLedger Request Payload]:', body)
```

`body` contains customer name, phone number, and shipping address. This logs PII to server-side logs (visible in Vercel's log dashboard, potentially stored in log aggregators).

**Fix:**

```ts
if (process.env.NODE_ENV !== 'production') {
  console.log('[SoapLedger Request Payload]:', body)
}
```

---

### 3.3 API error messages expose internals — MEDIUM

`src/app/api/orders/route.ts` returns the raw error message to the client on a 500 response. Raw error messages can leak stack traces, internal service names, and API endpoint structures.

**Fix:** Return a generic message to the client; log the full error server-side only.

```ts
// Instead of: return NextResponse.json({ error: err.message }, { status: 500 })
console.error('[orders] error:', err)
return NextResponse.json({ error: 'Order could not be processed. Please try again.' }, { status: 500 })
```

---

### 3.4 Revalidate endpoint accepts secret in GET query params — MEDIUM

`GET /api/revalidate?secret=...` passes the secret in the URL. URLs appear in:
- Server access logs
- Browser history
- Referrer headers sent to third-party resources on the next page

**Fix:** Change to POST and accept the secret in the request body instead of the query string.

---

### 3.5 No input validation on /api/orders — MEDIUM

The `/api/orders` request body is not validated. The `items` array uses `any` type.

**Minimum validation to add:**
- `customer_name`: non-empty string
- `phone`: matches Indian mobile format (`/^[6-9]\d{9}$/`)
- `items`: non-empty array, each item has `slug` (string) and `quantity` (positive integer)
- `shipping`: non-negative number

A library like `zod` makes this clean and type-safe. Without validation, malformed payloads can cause unexpected API errors or be used to probe internal behavior.

---

### 3.6 Verify .env.local was never committed — ACTION REQUIRED

`.gitignore` correctly excludes `.env*`. But verify it was never committed before the gitignore rule was in place:

```bash
git log --all --full-history -- .env.local
```

If this returns any commits: **rotate both the SoapLedger API key and the Resend API key immediately.** Keys committed to git history are compromised even if the file was later deleted — the history is permanent.

If the command returns nothing, you're clean.

---

### 3.7 Next.js version — INFORMATIONAL

Current: `next@14.2.35`. This is fine — Next.js 14 LTS is appropriate for production.

**One issue to fix:** `@next/third-parties` is pinned at `16.1.7` while Next.js itself is `14.x`. This version mismatch should be resolved:

```bash
npm install @next/third-parties@14
```

**On upgrading to Next.js 15:** Not recommended now. It involves breaking changes (async request APIs, React 19 requirement, caching behavior changes). Stick with 14.x and run `npm update next` to get the latest 14.x security patches.

---

### 3.8 Rate limiting — INFORMATIONAL

No rate limiting on `/api/orders`. At current traffic levels, this is not urgent. If spam orders or API abuse becomes a problem, Vercel's built-in rate limiting is the lowest-friction solution.

---

## 4. Feature Gaps — What to Skip for Now

**Worth doing when you have traction (>50 orders/month):**

| Feature | Why wait |
|---|---|
| Customer confirmation email | Needs email field added to order form; WhatsApp-first is a valid model for this market |
| User-generated review submission | Static reviews are fine at this scale; a form adds spam risk without much upside |
| Product filtering by skin type | Current category filter is enough for a small catalog |

**Not worth doing yet:**

| Feature | Reason |
|---|---|
| Payment gateway | WhatsApp-first is intentional and correct for this brand and market |
| Account system / login | Overkill at this stage |
| Coupon/discount codes | No promotional strategy exists yet |
| Product search | Small catalog; category filter is sufficient |
| "Customers also bought" | Catalog is too small for this to add value |
| Wishlist | No repeat-visit data to suggest this is a real need |

---

## Action Priority List

| Priority | Action | Effort |
|---|---|---|
| 1 | Set up Google Merchant Center | 1 hour, no code |
| 2 | Add security headers to `next.config.mjs` | 15 minutes |
| 3 | Set up Google Business Profile (service area, no address shown) | 30 minutes, no code — skip if residential tenancy is a concern |
| 4 | Write privacy policy content | 1 hour, no code |
| 5 | Fix PII console.log in `orders.ts` | 5 minutes |
| 6 | Fix raw error messages in `api/orders/route.ts` | 15 minutes |
| 7 | Add `rating` field to reviews, add AggregateRating to Product schema | 1 hour |
| 8 | Fix revalidate endpoint to use POST | 30 minutes |
| 9 | Verify `.env.local` not in git history | 5 minutes |
| 10 | Add input validation to `/api/orders` | 2 hours |
| 11 | Fix `@next/third-parties` version mismatch | 5 minutes |
| 12 | Deprioritize stories in sitemap | 30 minutes |
