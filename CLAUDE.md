# Healing Soil — Claude Instructions

## Regulatory Compliance — No Therapeutic Claims

Healing Soil sells handmade soap in India under the Drugs and Cosmetics Act, 1940.
Making therapeutic or medicinal claims without a drug/cosmetic license is an offence.

**NEVER write or suggest copy that includes:**
- "antibacterial," "antifungal," "anti-inflammatory" as product claims
- References to skin conditions: eczema, psoriasis, acne, rashes, dermatitis
- "treats," "cures," "heals," "relieves," "repairs" + any skin condition
- Clinical study citations or peer-reviewed research references supporting health claims
- Exfoliation claims (e.g. "lactic acid dissolves dead skin cells")
- "repairs skin barrier," "reduces pigmentation," "anti-aging," "slows signs of ageing"
- "removes toxins," "stimulates circulation" as skin benefit claims

**SAFE language to use instead:**
- "gentle," "nourishing," "moisturising feel," "leaves skin feeling soft"
- "suitable for sensitive skin" (skin type, not disease)
- "no SLS, parabens, synthetic fragrance"
- "made with natural oils and botanicals"
- "traditionally used in Ayurvedic personal care"
- Ingredient lists and process/origin descriptions
- "gentle lather," "creamy texture," "earthy scent"

**Why this matters:** CDSCO (not FSSAI — that's food) classifies soap as a drug if it makes therapeutic claims. No claims = no drug/cosmetic license needed for handmade soap.

## Brand constraints (non-negotiable)

- **Never name the maker in public copy.** This is a safety decision, not a style one.
- No exaggeration beyond what the ingredient actually does.
- No urgency. Everything is made to order, so scarcity would be invented.
- No superlatives.
- Transparency about which ingredients are grown on the farm and which bases are
  sourced is a trust signal. Say which is which.
- Eco-conscious choices appear in context, never as a headline claim.
- Soft close only. An invitation, not a prompt.
- No em-dashes.

## Business facts

- **ICP:** urban Indian woman 28–45, Bangalore-heavy, reads ingredient lists, has
  already moved off commercial soap. Not looking for "the best soap", looking for
  one that does not hurt her. Two recurring themes in reviews: no reaction, and
  no heavy lather.
- **Primary offer:** individual bars from the shop. There is no starter bundle
  (removed). Do not reintroduce a "bundle" or "4 soaps for ₹1,000" offer without
  the owner asking for it.
- **Farm is in Goa.** Bangalore is where customers are, never the origin.
- **Site posture:** `NEXT_PUBLIC_SITE_MODE` (`src/lib/site-mode.ts`) gates how
  much of the site is live: `full` (storefront), `content-only` (no storefront,
  one-page WhatsApp landing, blog stays indexed), `dark` (holding page only).
  The site currently runs `content-only` because there is no GST registration for
  interstate online sales. Reversal to `full` is a one env var change plus
  redeploy; nothing is deleted.
- **Payments (full mode only):** Razorpay is the default website checkout behind
  `NEXT_PUBLIC_ENABLE_RAZORPAY`. WhatsApp is shown only after a definite gateway
  failure or checkout dismissal. SoapLedger has an immediate order-pause switch.
- **Shipping:** free on orders of ₹1,000 and above. Below that ₹100, or ₹150 for
  the nine North India states listed in `src/lib/shipping.ts`. Never claim
  unconditional free shipping.

## Verify against the live system, not against docs

Point-in-time status documents in this repo went stale and caused repeated wrong
conclusions. Before acting on any claim about current state, check the source:

- Analytics and search: the `mcp__ga4__*` and `mcp__gsc__*` tools.
- Product catalogue: the SoapLedger API, not any hardcoded list.
- What is built and rendering: the build output in `.next/`, not assumptions.
- What changed: `git log`.

If a doc and the live system disagree, the live system is right.

## Commands

```
npm run dev                  # Next.js dev server
npm run build                # production build (runs next-sitemap as postbuild)
npm start                    # serve a production build
npm test                     # node --test over src/**/*.test.ts
npm run validate:products    # checks product slugs against SoapLedger + config/product-slug-aliases.json
npm run validate:compliance  # scans content/blog, content/stories, src, public for prohibited-claim regex hits
```

Run a single test file directly, e.g. `node --test src/lib/payment-fee.test.ts`. Tests live next to
the code they cover (`*.test.ts`), not in a separate `__tests__` tree.

`npm run validate:compliance` is the automated enforcement of the regulatory rules at the top of
this file — it applies `config/compliance-rules.json` against every `.mdx`/`.ts`/`.tsx`/`.txt` file
in the scan roots (content is skipped only when its frontmatter has `published: false`). Run it
after editing any product copy, blog content, or the compliance rules themselves.

## Architecture

This is a Next.js 16 App Router site with **no local database**. All product and order data lives
in an external service called **SoapLedger** (`src/lib/products.ts`, `src/lib/orders.ts`), reached
over a bearer-key REST API (`SOAPLEDGER_API_URL` / `SOAPLEDGER_API_KEY`). SoapLedger owns:

- The product catalogue (name, price, stock, images, `units_sold` for best-seller ranking)
- Orders, payment status, shipment tracking
- The order-pause switch and any manual/WhatsApp payment fallback state

Because product pages are statically rendered but content changes at any time, `getProducts()`
wraps the SoapLedger fetch in `unstable_cache` tagged `'products'` with a 24h fallback TTL —
SoapLedger pushes `revalidateTag('products')` on every edit, so the TTL is a safety net, not the
primary invalidation path. Do not add `force-dynamic` to product pages; that runs a Vercel
Function per request and previously caused a Fluid Active CPU cost spike (see the comment in
`src/lib/products.ts`).

**Product slugs are not stable.** SoapLedger has returned legacy slug forms over time
(`pomegranate-glycerine` vs `pomegranate-glycerin-soap`, etc). `src/lib/product-slugs.ts` +
`config/product-slug-aliases.json` maps any legacy slug to its canonical form; every lookup that
compares slugs (`selectProducts`, `getProductBySlug`) goes through `canonicalSlugFor` /
`productSlugMatches` rather than comparing raw strings. New data files that reference products by
slug must use `CANONICAL_PRODUCT_SLUGS` from that file.

### Programmatic SEO pages

Most of the route tree under `src/app/` is generated from static data files in `src/data/`
(ingredients, cities, occasions, comparisons, decisions, climate, combinations, ayurvedic) paired
with one renderer component each in `src/components/programmatic/`. Pattern, e.g. `[combo]`:

1. `src/data/combinations.ts` — one entry per page: slug, copy, `relatedProducts` (canonical
   slugs), `publishedAt` (a page with a future or null `publishedAt` is excluded from
   `generateStaticParams`, so unpublished pages 404 rather than draft-rendering)
2. `src/app/[combo]/page.tsx` — `generateStaticParams` from the data file, `dynamicParams = false`
   (unknown slugs 404 rather than rendering on demand), fetches products via `getProducts()` +
   `selectProducts()`
3. `src/components/programmatic/CombinationPage.tsx` — the actual layout/copy rendering

The same shape repeats for `soap/[city]`, `soap/[city]/[ingredient]`, `ingredient/[slug]`,
`occasion/[slug]`, `compare/[slug]`, `ayurvedic-soap/[slug]`, `soap-for/[slug]`. When adding a page
in one of these families, add a data entry, not a new route file.

### Checkout flow

1. Client builds an order via the zustand cart store (`src/lib/store.ts`, persisted to
   localStorage).
2. `src/app/api/razorpay/create-order` creates the Razorpay order and a SoapLedger order in one
   step (`submitOrder` in `src/lib/orders.ts`), gated by `NEXT_PUBLIC_ENABLE_RAZORPAY`.
3. Razorpay Checkout runs client-side; `src/app/api/razorpay/verify` validates the signature and
   calls `updateSoapLedgerPayment` to transition the order to paid.
4. `src/app/api/razorpay/webhook` is the source of truth for payment state (signed, server-to-
   server) — `verify` is the fast path for UI feedback, the webhook is what must not be skipped.
5. `manual-fallback` exists for WhatsApp-based orders after a definite gateway failure or checkout
   dismissal, per the brand rule above — never offer WhatsApp checkout as a first option.
6. `reconcile` reconciles Razorpay-side state against SoapLedger for orders stuck in a pending
   state.

`sendOwnerEmail` (Resend) fires after a successful `submitOrder` and must never throw — a
notification failure must never block or lose an order; errors are logged and swallowed.

### Content

Blog and story posts are MDX files under `content/blog/` and `content/stories/`, read via
`src/lib/blog.ts` (frontmatter via `gray-matter`, not a CMS). `content/stories/` predates the soap
business — this was a slow-living blog before the pivot, and stories are kept as brand identity,
not for SEO.

### Compliance enforcement

`config/compliance-rules.json` is the machine-readable form of the regulatory rules at the top of
this file. It is consumed in two places:

- `src/lib/compliance.ts` — `prohibitedClaimCategories()`, called inside `getProducts()` so a
  SoapLedger product whose name/description/ingredients match a prohibited pattern throws rather
  than rendering (this fails closed: a bad product blocks the whole catalogue fetch, which is
  intentional — see the comment in `src/lib/products.ts`).
- `scripts/validate-compliance.mjs` — the same rules applied to on-disk content and source files,
  run via `npm run validate:compliance`.

Keep both in sync with any change to the regulatory rules above; they read the same JSON file so
this should stay automatic.
