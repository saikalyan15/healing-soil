# WhatsApp Order Notifications Plan — Healing Soil
*Prepared: March 2026 | Status: For review*

---

## The problem, clearly stated

When a customer places an order on the website today, this is what happens:

1. Order is submitted to SoapLedger ✅
2. Customer is shown the confirmation page ✅
3. A pre-filled WhatsApp message is queued — but **the customer must manually click "Send"** ⚠️
4. On desktop, many customers skip this step entirely ❌
5. CallMeBot was supposed to send a WhatsApp notification to your number — but the API key is broken ❌

**Net result:** Orders arrive in SoapLedger, but you and your wife have no reliable way to know when a new order comes in. You're dependent on customers clicking "Send" on WhatsApp, which many don't.

---

## What you want

1. **Automatic notification to your WhatsApp** when any order is placed — without the customer having to do anything
2. **Automatic confirmation to the customer** on WhatsApp (so they know their order was received)
3. **A way to query pending/unconfirmed orders** — ideally without having to open SoapLedger every time
4. Simple. Lean. Free or near-free.

---

## The core constraint: WhatsApp

WhatsApp (owned by Meta) has two modes:

- **You message a customer first** → requires the official Business API, and Meta charges per message
- **Customer messages you first** → free for 24 hours (user-initiated session)

The current system relies on customers messaging first. To **automatically send to customers**, you must use the Meta API. To **automatically notify yourself**, you have two realistic paths: Meta API or an alternative channel (Telegram, email).

---

## Options

---

### Option A: Meta WhatsApp Cloud API (Official)
**Covers: Auto-notify owner + auto-confirm customer**

Meta now offers direct API access for free — you don't need a Business Solution Provider (BSP) like WATI or Interakt. You connect directly via Meta's servers.

**How it works:**
- You set up a Meta Business Account and link a WhatsApp Business number
- When an order is placed, your server calls Meta's API to send two messages:
  - One to your wife's WhatsApp: "New order — HS-0042, Riya, ₹450, 2 items"
  - One to the customer: "Hi Riya, we've received your order HS-0042. We'll confirm availability and send a payment link shortly. — Healing Soil 🌿"
- Messages to customers require a pre-approved **template** (Meta reviews it once, takes 0–24 hrs)
- Messages to your own number (owner notification) also use a template but can be simpler

**Cost:**
- Meta account: Free
- **Notification to your number (business-initiated, India):** ~₹0.97/message
- **Confirmation to customer (business-initiated, India):** ~₹0.97/message
- For 50 orders/month: 100 messages × ₹0.97 = **~₹97/month**
- For 100 orders/month: **~₹194/month**
- No monthly platform fee — purely pay-per-message

**One-time setup complexity:** Medium (3–5 days)
- Create Meta Business Account
- Get WhatsApp Business API access (Meta Cloud, not a BSP)
- Create and submit 2 message templates for approval
- Add ~40 lines of code to `lib/orders.ts` replacing the CallMeBot block

**What this looks like in the code:** The existing `sendCallMeBotNotification()` function in `lib/orders.ts` gets replaced with a `sendWhatsAppNotification()` function that calls Meta's Graph API. The structure is already there — it's a swap, not a rewrite.

**Pros:**
- Official, reliable, scales with the business
- Customer gets a proper confirmation on WhatsApp automatically
- Your wife gets instant order alerts on WhatsApp
- No monthly platform fee

**Cons:**
- Setup takes a few days (Meta verification, template approval)
- Cost per message (minimal but not zero)
- Requires a Meta Business Account and verification

---

### Option B: Email notification to owner (free) + keep WhatsApp button for customer
**Covers: Auto-notify owner only**

Instead of using WhatsApp for owner notifications, use email. When an order is placed, the server sends an email to your Gmail instantly. The customer experience stays the same (WhatsApp button they have to click).

**How it works:**
- When order is placed → server sends email to `healingsoil.in@gmail.com`
- Email contains: customer name, phone, items ordered, total
- You and your wife get notified instantly via Gmail (push notifications on phone)

**Cost:** Free
- **Resend** (recommended): 3,000 emails/month free, forever. No credit card required.
- Or Nodemailer with Gmail (free but slightly more fragile)

**One-time setup complexity:** Low (2–4 hours)
- Create a free Resend account, verify your domain
- Replace `sendCallMeBotNotification()` with `sendEmailNotification()`
- ~20 lines of code

**Customer side:** No change. They still have to click "Send on WhatsApp". The UX could be improved slightly (see "UX improvement for customer WhatsApp" below).

**Pros:**
- Free, forever
- Fast to implement (hours, not days)
- Works on any device, no Meta account needed
- Gmail gives push notifications on mobile

**Cons:**
- Owner notification is email, not WhatsApp (you need to check your email, not WhatsApp)
- Customer does not get an automatic confirmation — they still have to click the WhatsApp button

---

### Option C: Telegram bot for owner notification (free) + keep WhatsApp for customer
**Covers: Auto-notify owner only**

A Telegram bot can send messages to any Telegram user or group instantly, for free, with no rate limits. You create a bot, get a bot token, and when an order is placed, the server sends a Telegram message to your wife's Telegram account.

**Cost:** Free, always.

**One-time setup complexity:** Very low (1–2 hours)
- Create a Telegram bot via BotFather (5 minutes)
- Add bot token to `.env.local`
- Replace CallMeBot code with Telegram API call (~15 lines)

**Cons:**
- Requires your wife to use Telegram in addition to WhatsApp
- Customer experience: no change (still has to click the WhatsApp button)

---

## The /orders query — simple admin page

Regardless of which notification option you choose, the cleanest solution for querying pending orders is a **simple password-protected admin page** inside the Next.js site itself.

**What it would look like:**

- URL: `https://healingsoil.in/admin/orders` (or any path)
- Protected by a secret URL token or a basic password check in the code
- Queries SoapLedger API for orders by status (pending, unpaid, not dispatched)
- Shows: order ref, customer name & phone, items, total, date placed
- Mobile-friendly — your wife can bookmark it and check from her phone in seconds

**This is much simpler than a WhatsApp bot command.** A WhatsApp bot that listens for `/orders` would require:
- A WhatsApp webhook endpoint
- Parsing incoming messages
- Responding with formatted text
- This is 5× more code and complexity for the same result as a web page

**Cost:** Zero. It's just another Next.js page.

**Effort:** Medium (1 day). Depends on what SoapLedger exposes via API for order listing.

---

## Recommendation

Given your preference for simple, lean, and minimalist — here is the suggested path:

### Do first (free, fast):
**Option B — Email notifications to owner via Resend**
- Solves your wife's problem immediately
- Free, 2–4 hours to implement
- No external accounts or verification needed
- You can evaluate if email is sufficient before investing time in Meta setup

**Build the `/admin/orders` page**
- Your wife gets a fast, bookmarkable view of all pending orders
- No WhatsApp bot complexity needed
- 1 day of work

### Do later (if you want full WhatsApp automation):
**Option A — Meta Cloud API**
- Migrate owner notification from email to WhatsApp
- Add automatic customer confirmation message
- Only worth doing once the business has more order volume (50+ orders/month) where the friction of the current flow becomes a real bottleneck

### Don't do:
- WATI, Interakt, 360dialog, or any BSP — ₹2,000–8,000/month for a small shop is not justified
- Rebuilding the WhatsApp flow using a bot/webhook just for the `/orders` query — a web page is simpler and faster

---

## Estimated cost summary

| Solution | Monthly cost | Setup time | Solves |
|---|---|---|---|
| Email (Resend) + admin page | Free | 1 day | Owner notification + order view |
| Meta API (full) | ~₹100–200 | 3–5 days | Owner + customer notifications |
| Telegram bot | Free | 2 hours | Owner notification only |
| WATI / Interakt | ₹2,000–8,000+ | 1–2 days | Full platform (overkill) |

---

## UX improvement for customer WhatsApp (quick win, no API needed)

Regardless of which notification path you pick, the WhatsApp button UX on desktop can be improved:

- Make the button larger and more prominent on the confirmation page
- Add text: "**You must click this to complete your order**" — currently it says "If WhatsApp did not open automatically", which is too soft
- On desktop, add a QR code that opens WhatsApp on the customer's phone — this removes the "I'm on desktop" friction entirely
- Show the pre-filled message text directly on the page so they can see exactly what will be sent before clicking

This is low effort and could meaningfully improve the click-through rate on the WhatsApp button.

---

## Questions to decide

1. Is email sufficient for owner notifications, or does it have to be WhatsApp?
2. Are you comfortable creating a Meta Business Account (required for Option A)?
3. For the admin orders page — does SoapLedger have an API endpoint to list orders by status? (Need to check the SoapLedger API docs/codebase)
4. Do you want the `/admin/orders` page to be part of the public site (password-protected route) or would you prefer it to be a separate tool?
