# Meta Pixel Events — Implementation Spec for healingsoil.in

**Pixel ID:** 1321242129962420 (already installed, currently fires PageView only)
**Goal:** give Meta purchase signal so a future Sales campaign can optimize for buyers instead of chatters.

The base pixel is already loaded, so every event below is a one-line `fbq()` call at the right moment. Add them in this priority order — even just #1 and #4 make ads workable.

## 1. Purchase — order confirmation (highest priority)
Fire once on the order-success page/state, after payment or order placement:

```js
fbq('track', 'Purchase', {
  value: order.total,        // e.g. 1000
  currency: 'INR',
  content_ids: order.items.map(i => i.slug),
  content_type: 'product',
  num_items: order.items.length
});
```

Guard against double-firing on refresh (e.g. only fire when the confirmation is first rendered for that order ID, or set a flag in sessionStorage keyed by order ID).

## 2. AddToCart — every add-to-cart button
The bundle "Add the bundle to cart" button and each product card / product page "Add to Cart":

```js
fbq('track', 'AddToCart', {
  value: product.price,      // e.g. 350
  currency: 'INR',
  content_ids: [product.slug],
  content_name: product.name,
  content_type: 'product'
});
```

## 3. InitiateCheckout — checkout start
When the user lands on /order or starts checkout:

```js
fbq('track', 'InitiateCheckout', {
  value: cart.total,
  currency: 'INR',
  content_ids: cart.items.map(i => i.slug),
  num_items: cart.items.length
});
```

## 4. WhatsApp click — your hidden conversion path
Many of your orders come via the wa.me link, which never reaches an order-confirmation page — without this, WhatsApp orders are invisible to Meta. On every `wa.me/917483100651` link/button click:

```js
fbq('track', 'Contact', { content_name: 'whatsapp_order_click' });
```

`Contact` is a standard event, so it can be used as a campaign optimization goal later.

## 5. ViewContent — product pages (nice to have)
On each /shop/[slug] page load:

```js
fbq('track', 'ViewContent', {
  value: product.price,
  currency: 'INR',
  content_ids: [product.slug],
  content_name: product.name,
  content_type: 'product'
});
```

## Next.js notes
- These are client-side calls; in App Router components use `'use client'` and fire inside event handlers or `useEffect`.
- Route changes in Next.js don't reload the page — if PageView is currently only firing on first load, also call `fbq('track', 'PageView')` on route change (router events / usePathname effect). Your 28-day count (~660) looks plausible for full loads, but worth checking.
- TypeScript: declare `fbq` on `window` or use `(window as any).fbq`.

## Verify after deploying
1. Events Manager → Data sources → Healing Soil Pixel → **Test events** → enter healingsoil.in, click through add-to-cart → checkout → WhatsApp link, confirm each event appears.
2. Do one real test order and confirm a Purchase event with the right value lands.
3. Optional later: Conversions API (Meta estimates ~17.8% lower cost per result), but browser events are enough to start.
