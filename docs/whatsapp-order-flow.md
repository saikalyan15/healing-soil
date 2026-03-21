# WhatsApp Order Flow — Market Research & Proposal

**Project:** healingsoil.in
**Date:** March 2026
**Status:** For review and decision-making

---

## Summary

This document surveys how WhatsApp-first commerce actually works in India, diagnoses the specific problems with the current Healing Soil checkout flow, and proposes a clear path forward. The goal is not to patch the current implementation but to understand the landscape and make an informed structural decision.

---

## Section 1: How WhatsApp-first commerce works in India

Four distinct models exist in the Indian market. Most businesses that describe themselves as "WhatsApp-first" are not doing what Healing Soil does — and understanding why matters.

### Model A — WhatsApp as CRM, not checkout

**Examples:** Nua, Mamaearth, Forest Essentials

Standard website checkout with UPI or Razorpay. WhatsApp is used exclusively post-purchase: order updates, support, re-engagement campaigns, and abandoned cart nudges. The actual ordering happens on the website with no WhatsApp involvement.

This is the dominant model among funded Indian D2C brands. WhatsApp here is a retention and communication channel, not a sales channel.

### Model B — WhatsApp-native storefront

**Examples:** Catlog, Take.app, Quickzu, Watskart

No website. A shareable link opens a product catalogue inside WhatsApp. The customer browses products, builds a cart, and completes the entire flow — including address collection and payment — within the chat. A chatbot (via WhatsApp Business API) handles each step sequentially. The business receives a structured order at the end.

This is the truest "WhatsApp-first" model. Used by tens of thousands of small Indian sellers: home bakers, boutique clothing sellers, handmade goods makers. The customer never leaves WhatsApp.

### Model C — Website + WhatsApp Business API hybrid

**Examples:** Interakt, WATI, Zoko integrations for Shopify/WooCommerce

Website for browsing and cart. At checkout, the customer completes a payment or submits a form, which triggers a WhatsApp Business API event. The business automatically sends the customer a WhatsApp template message — a payment button, a UPI link, or an order confirmation — without any manual step. No customer action required beyond payment.

Used by mid-sized D2C brands that want a web presence and professional-grade WhatsApp communication. The key difference from Model D: the WhatsApp message is business-initiated and automated.

### Model D — Click-to-Chat from product or cart page

**Examples:** WooCommerce plugins, Shopify apps, hand-rolled implementations across artisan sellers

No full checkout form. Customer taps "Order on WhatsApp" from the product page or a minimal cart summary. A pre-filled message (product name, variant, quantity) opens WhatsApp. The business then collects the shipping address in the WhatsApp conversation itself. No confirmation page. No form submission. The WhatsApp message is the order.

Very common among handmade, artisan, and home-based Indian sellers. The customer experience is low-friction and completely mobile-native.

---

### Where Healing Soil currently sits

Healing Soil runs a hybrid of Model C and Model D — but with characteristics that create friction rather than resolve it.

Like Model C: there is a full checkout form collecting name, phone, state, and shipping address before the WhatsApp step.

Like Model D: the WhatsApp message is customer-initiated (the customer must manually send it), not automated.

This combination exists for a legitimate reason: the SoapLedger API integration needed structured address and phone data before the WhatsApp conversation opened. Collecting that data upfront was a reasonable design choice.

The problem is that this creates the worst of both worlds: the friction of a full form (Model C) **and** the manual WhatsApp send step (Model D) **and** a confusing redirect to a confirmation page in between. The customer experiences three distinct actions where they expect one.

---

## Section 2: The specific problem with the current flow

### Core issue

The WhatsApp message and the form submission are two separate actions separated by a page redirect.

Current sequence:
1. Customer fills out the form on `/order`
2. Customer clicks "Confirm Order"
3. API call to SoapLedger runs (async)
4. Browser redirects to `/order/confirmation`
5. **At the same time**, WhatsApp opens in a new tab

At step 5, the customer is looking at two things simultaneously: a new browser tab (WhatsApp Web or the app) and a new page in the original tab. They don't know which one to act on. The order feels half-done regardless of which tab they focus on.

### Secondary issues

**Mental model mismatch.** By the time customers reach the confirmation page, they have already mentally "placed the order" — the form submission felt like the terminal action. The additional WhatsApp step reads as unexpected, not as the intended final step.

**QR code association.** The QR code shown on desktop is associated in Indian users' minds with WhatsApp Web login — scanning a QR code to link your phone. When shown a QR code to send an order, many customers assume they need to set up WhatsApp Web first, creating hesitation and drop-off.

**No "this is not a payment step" signal.** The confirmation page contains no explicit reassurance that no payment has occurred yet. This creates hesitation, particularly among users unfamiliar with COD-first flows.

**Desktop limitations.** On desktop, WhatsApp Web requires the customer to have their phone already linked to the browser. For users who haven't done this setup, the flow stops entirely. This is an invisible blocker.

**Browser tab suppression.** The `window.open` call happens after an async API call completes. Some browsers block this silently because the user gesture (the button click) is no longer active by the time the window open fires. The WhatsApp tab may not open at all — with no visible error.

---

## Section 3: Options available to Healing Soil

### Option 1 — Patch the current flow

Fix copy, improve QR code context text, add an explicit "no payment yet" line, restructure the desktop confirmation page layout.

**Pros:** Low effort. No structural changes to the order flow or API integration.

**Cons:** Doesn't address the root cause. The flow still has two separate actions and a tab switch. Users will still lose their place. Polishing a confused flow makes it slightly less confused, not coherent.

**Verdict:** Not recommended as a long-term answer. Appropriate only as a temporary measure while a structural fix is being built.

---

### Option 2 — Move to a WhatsApp-native storefront (Model B)

Replace the website ordering flow with Catlog or Take.app. The website remains for SEO and brand presence, but the "Order Now" CTA links to a WhatsApp catalogue.

**Pros:** Pure WhatsApp experience. No confirmation page confusion. Customers receive confirmation in the same chat they ordered in. Completely familiar to Indian mobile users. No web development effort.

**Cons:** Loses the website as a conversion surface. Less branding control. Monthly platform cost. SoapLedger integration would need rethinking — order data would live in the platform, not the current system. The website's SEO investment (recently completed) would yield less return if ordering moves off-site.

**Verdict:** Worth revisiting if order volume grows substantially. Not appropriate now — the website is newly SEO-optimised and the investment in it as a conversion tool has not yet paid off.

---

### Option 3 — WhatsApp Business API integration (Model C)

Integrate Interakt or WATI with the current website. Customer submits the form, and the business automatically sends a WhatsApp template message confirming the order — a payment link, UPI QR, or simple confirmation. No manual send step required from the customer.

**Pros:** Professional and automated. Customer confusion disappears — they submit the form and receive a WhatsApp message, no action required. Scales well. Works on both mobile and desktop without tab confusion.

**Cons:** Monthly cost in the range of ₹2,500–5,000+ depending on message volume. WhatsApp Business API approval takes one to four weeks. Payment gateway integration is required if collecting payment at this stage. Significant development effort. Premature at current order volumes.

**Verdict:** The right destination when order volume justifies the operational overhead — approximately 50+ orders per month. Not the right move today.

---

### Option 4 — Click-to-WhatsApp from cart, no form (Model D)

Remove the form entirely. Customer builds their cart on the website and taps "Order on WhatsApp." A pre-filled message with cart contents opens WhatsApp. Business collects the shipping address in the chat conversation.

**Pros:** Matches how Model D businesses actually operate. No tab confusion — the customer stays in WhatsApp from the moment they click. No confirmation page needed. The lowest possible friction for a mobile user.

**Cons:** Loses structured address and phone data before the conversation starts. SoapLedger order creation would need to happen after the WhatsApp conversation concludes, not before — requiring a manual step from the business side. Owner workload increases: address must be collected from every customer in chat. No order reference exists until the conversation has happened.

**Verdict:** Simpler for the customer, harder for the business. Worth considering if the WhatsApp-native experience is the explicit priority and the SoapLedger pre-creation requirement can be relaxed. Not recommended if maintaining order references is important.

---

### Option 5 — Merge the form submit and the WhatsApp open into one action (recommended)

Keep the form for data collection. But restructure the submit action so that the WhatsApp open is the *direct and immediate result* of clicking the button — not a side effect that fires after an async API call.

**Current flow:**
> Form submit → API call (async wait) → WhatsApp opens in new tab → Browser redirects to confirmation page → Customer confused between two tabs

**Proposed flow:**
> Customer fills form → Clicks "Send Order on WhatsApp" → WhatsApp opens immediately with pre-filled message → API call runs in background (fire-and-forget) → Customer is done

The confirmation page becomes a passive success screen — visible if the customer returns to the original tab or closes WhatsApp, but not a required action. It contains no QR code and requests no further steps.

**Pros:**
- Removes the tab confusion entirely. WhatsApp opening is the expected and immediate result of clicking the button.
- Matches the customer's mental model: "I clicked send on WhatsApp, my order is sent."
- Aligns with how Model D businesses operate (the most natural WhatsApp commerce pattern) while retaining the address data collection of Model C.
- No third-party platform cost. No API approval process.
- Works today, within the existing codebase.

**Cons:**
- The SoapLedger API call becomes fire-and-forget (non-blocking). If the call fails silently, the customer has sent the WhatsApp message but no order reference was created in SoapLedger.
- The order reference cannot be included in the pre-filled WhatsApp message if the API hasn't responded before WhatsApp opens.

**Mitigation:** Generate a short order reference client-side before the API call — a timestamp-based ID is sufficient (e.g. `HS-20260321-4821`). Include this reference in the pre-filled WhatsApp message. Send it to SoapLedger asynchronously. If the API call fails, the order reference still exists in the WhatsApp conversation and can be manually reconciled. This is recoverable and acceptable at current order volumes.

**Verdict: Recommended.** This is the structural fix that matches how customers actually experience WhatsApp-first ordering. It eliminates the root cause of the confusion without requiring a new platform, a Business API approval, or a fundamental rethinking of how orders are collected.

---

## Section 4: Recommendation and proposed new flow

### Recommended approach: Option 5

### New flow, step by step

1. Customer fills the form on `/order` (name, phone, state, address, cart contents) — unchanged from today
2. Customer clicks **"Send Order on WhatsApp"** — a green WhatsApp-branded button
3. WhatsApp opens immediately with a pre-filled message containing the order details and a client-generated order reference
4. In the background, the API call to SoapLedger completes (fire-and-forget, non-blocking)
5. Customer sends the message in WhatsApp — the order is placed
6. If the customer returns to the browser tab, they see a simple "Thank you — your order is on its way to us" page with no required actions

### Desktop behaviour

- The button click opens WhatsApp Web in a new tab immediately (no async delay)
- Below the button, a QR code is shown with explicit copy: "On a phone without WhatsApp Web? Scan this with your phone camera — WhatsApp opens with your order ready to send"
- The QR code is shown alongside the form, not on a separate confirmation page — so desktop users understand the completion mechanism before they fill the form, not after

### What changes versus today

| Element | Current | Proposed |
|---|---|---|
| Button label | "Confirm Order" | "Send Order on WhatsApp" with WhatsApp icon |
| Button action | Triggers API call, waits, then opens WhatsApp | Opens WhatsApp immediately; API call runs in background |
| Order reference | Generated by SoapLedger after API call | Generated client-side before WhatsApp opens |
| Confirmation page | Contains QR code + required WhatsApp action | Passive success screen, no required action |
| Desktop QR code | Shown on confirmation page after submit | Shown on the order form page itself |
| SoapLedger API call | Blocking (WhatsApp waits for it) | Non-blocking (fire-and-forget) |

### Files that would change

| File | Change |
|---|---|
| `src/components/OrderForm.tsx` | Button label, WhatsApp-first submit handler, client-side order ref generation |
| `src/app/order/confirmation/page.tsx` | Passive success page, remove action requirement and QR code |
| `src/app/order/confirmation/WhatsAppFallback.tsx` | Likely simplified or removed |
| `src/lib/orders.ts` | SoapLedger call made non-blocking |

---

## Decision

This document is for review. No code changes have been made.

The recommendation is Option 5. The implementation scope is contained to the four files listed above and can be completed in a single session. The structural change is small; the improvement to the customer experience is material.

If the recommendation is approved, implementation can proceed directly against the existing codebase.
