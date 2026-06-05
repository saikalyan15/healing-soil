# Healing Soil — Ads Launch Execution Playbook
**Step-by-step guide to go from zero to live Meta ads**
*Bangalore only | Click-to-WhatsApp | May 2026*

---

## Before You Start — Two Payment Concepts (Read This First)

Your customer payment workflow does not change. The two concepts are completely separate:

| Payment Type | What It Is | Do You Need It? |
|---|---|---|
| **Meta payment method** | How Meta charges you for ad spend (~₹150/day) | **Yes, mandatory.** Without it Meta will not publish your ads. |
| **Customer payment link** | How you collect money from buyers | Unchanged. Your workflow (enquiry → check stock → confirm → send link) stays exactly as is. |

Adding a card to Meta does not affect how customers pay you. It just lets Meta deduct your ad spend.

---

## Phase 1 — Connect WhatsApp Business Number to Meta

### 1.1 — Confirm you have WhatsApp Business (not regular WhatsApp)
1. On your phone, look for the **WhatsApp Business** app (icon has a briefcase on it)
2. Open it — the header should say "WhatsApp Business"
3. Confirm the registered number is **7483100651**
4. If you are on regular WhatsApp with this number, you need to migrate to WhatsApp Business before continuing — let me know and I will write that out separately

### 1.2 — Connect your number in Meta Business Suite
1. On your computer, go to **business.facebook.com**
2. In the left sidebar, click **Settings** (gear icon, bottom of sidebar)
3. In the left panel of Settings, scroll down and click **WhatsApp Accounts**
4. Click the blue **Add** button (top right of the panel)
5. A dialog appears — enter your number: **+91 7483100651**
6. Select how to receive the verification code: choose **SMS**
7. Click **Send Code**
8. Check your phone — a 6-digit OTP will arrive via SMS
9. Enter the OTP in the dialog box on your computer
10. Click **Verify**
11. Your number will now appear listed under WhatsApp Accounts
12. Click **Done**

**What this achieves:** Ad taps will now open a WhatsApp conversation with your number directly. The WhatsApp Business app on your phone continues working exactly as before — every ad conversation lands in your normal inbox.

---

## Phase 2 — Set Up WhatsApp Business Auto-Replies

Do all of this on your phone in the WhatsApp Business app. Complete this before launching any ads.

### 2.1 — Greeting Message (sent to first-time contacts)
1. Open **WhatsApp Business** on your phone
2. Tap the three dots **⋮** (top right) → **Settings**
3. Tap **Business tools**
4. Tap **Greeting message**
5. Toggle the switch **ON**
6. Tap the pencil icon to edit the message text
7. Clear the default text and replace with exactly:

```
Hi! Thanks for reaching out to Healing Soil 🌿

We make small-batch handmade soaps with natural ingredients — no SLS, no parabens, no synthetic fragrance.

Tell us what you're looking for and we'll get back to you within a few hours (8 AM – 9 PM).

Browse our collection: healingsoil.in/shop
```

8. Under **Send greeting message**, select: **To everyone not in address book**
9. Tap **Save**

### 2.2 — Away Message (sent after 9 PM and before 8 AM)
1. In **Business tools**, tap **Away message**
2. Toggle the switch **ON**
3. Edit the message text to:

```
Hi! We received your message 🌿

We're away right now but will reply first thing in the morning. You can browse our full collection at healingsoil.in/shop in the meantime.
```

4. Under **Schedule**, tap and select **Custom schedule**
5. Set the hours: **9:00 PM to 8:00 AM**
6. Under **Send to**, select: **Everyone not in address book**
7. Tap **Save**

### 2.3 — Quick Replies (for the questions you will get repeatedly)
1. In **Business tools**, tap **Quick replies**
2. Tap the **+** icon to create each reply below

**Quick Reply 1 — Pricing**
- Shortcut: `/price`
- Message:
```
Our soaps are priced between ₹250–₹500 depending on the variety. Each bar is handmade in small batches with natural ingredients.

You can see the full range at healingsoil.in/shop — let us know which ones interest you and we'll confirm availability!
```

**Quick Reply 2 — Ingredients**
- Shortcut: `/ing`
- Message:
```
All Healing Soil soaps are made with natural oils and botanicals — no SLS, no parabens, no synthetic fragrance.

Each soap has its own ingredient list. Let me know which one you're curious about and I'll share the details.
```

**Quick Reply 3 — Delivery**
- Shortcut: `/delivery`
- Message:
```
We deliver across India. Shipping typically takes 3–5 business days.

Once you confirm your order, we'll check availability and send you a payment link to complete your purchase.
```

**Quick Reply 4 — Order confirmation**
- Shortcut: `/order`
- Message:
```
Great! Let me check our current stock and get back to you shortly with availability and a payment link. Should take no more than a few hours.
```

**How to use quick replies while chatting:** Type `/` in any WhatsApp message box and your shortcuts appear. Tap one to insert the message instantly.

---

## Phase 3 — Add Payment Method to Meta

This is for Meta to charge you for ad spend. Your customer payment workflow is unaffected.

1. Go to **business.facebook.com**
2. Click **Settings** in the left sidebar
3. Click **Billing and payments** (sometimes listed under **Financial tools**)
4. Click **Add payment method**
5. Select **Credit or debit card** — recommended over UPI because UPI auto-debit sometimes fails mid-campaign and pauses your ads
6. Enter your card number, expiry, CVV, and billing name
7. Click **Save**
8. You will see a billing threshold field — leave it at the default (usually ₹2,000) which means Meta charges your card every time your spend reaches ₹2,000

---

## Phase 4 — Create the Campaign in Ads Manager

### 4.1 — Open Ads Manager
1. Go to **business.facebook.com**
2. In the left sidebar, click **Ads Manager**

### 4.2 — Start a new campaign
1. Click the green **+ Create** button (top left of Ads Manager)
2. Under **Campaign objective**, click **Engagement**
3. In the sub-options that appear, select **Messaging**
4. Under "Where do you want the messaging to happen?" click **WhatsApp**
5. Click **Continue**

### 4.3 — Configure campaign settings
1. **Campaign name:** type `HS_Month1_WhatsApp_BLR`
2. **Special ad categories:** leave all toggles OFF
3. **Campaign budget optimisation (CBO):** toggle this **ON**
4. **Daily budget:** type `150` (₹150/day)
5. Leave everything else at default
6. Click **Next** (bottom right)

---

## Phase 5 — Create Ad Set A (Wellness Audience)

### 5.1 — Ad set details
1. **Ad set name:** type `AdSet_A_Wellness_BLR`
2. Under **WhatsApp account**, select **7483100651** from the dropdown — this is the number you connected in Phase 1

### 5.2 — Location targeting
1. Under **Audience**, find the **Locations** field
2. Delete any pre-filled location (usually "India" by default — click the X next to it)
3. Type **Bangalore** in the search box
4. Select **Bangalore, Karnataka, India** (city-level, not the state)
5. Make sure the radius is set to **0 km** or the city pin option — do not expand radius

### 5.3 — Age and gender
- Age minimum: **25**
- Age maximum: **50**
- Gender: **Women**
  - *Why:* Word-of-mouth buyers and Instagram engagement skew female. Budget goes further targeting the audience already converting. Open to all genders in Month 2 if data warrants.

### 5.4 — Detailed targeting (interests)
1. Click **Add interests or behaviors**
2. Search and add each of these three, one at a time:
   - **Natural skincare**
   - **Organic products**
   - **Ayurveda**
3. Stop at three. Do not add more. Each additional interest narrows the audience and raises your cost.

### 5.5 — Audience exclusions
1. Click **Exclude people**
2. In the exclusion search box, type your Facebook page name and select it — this excludes people who already like your page
3. Add a second exclusion: search for your Instagram account and add it — this excludes existing Instagram followers
4. **Why:** These people already know you. Your ad budget should only reach new potential customers.

### 5.6 — Audience size check
After setting location, age, and interests, look at the **Audience size** meter on the right side of the page. It should show a number in the range of 100,000–2,000,000 and be in the "Defined" zone (middle of the meter). If it shows "Too specific", remove one interest. If it shows "Too broad", this setup is still fine at city-level.

### 5.7 — Placements
1. Under **Placements**, select **Manual placements** (not Advantage+ Placements)
2. You will see a list of all Meta surfaces — uncheck everything
3. Then check only these:
   - Instagram Feed
   - Instagram Stories
   - Instagram Reels
   - Facebook Feed
4. Leave all others (Messenger, Marketplace, Audience Network, etc.) unchecked

### 5.8 — Schedule
1. **Start date:** set to tomorrow or the day after — give yourself time to finish setup
2. **End date:** leave blank (no end date)
3. Leave budget delivery as **All day**

Click **Next**.

---

## Phase 6 — Create Ad Set B (Gifting Audience)

Repeat every step in Phase 5 with the following two changes only:

- **Ad set name:** `AdSet_B_Gifting_BLR`
- **Interests (replace all three):**
  - Handmade products
  - Artisan products
  - Gift shopping

Everything else — location, age, placements, exclusions, budget — stays identical.

---

## Phase 7 — Prepare Your Ad Creatives (Before Ads Manager)

Make these **two** creatives before you go into the ads section of Ads Manager. The Sensitive Skin reel is skipped for Month 1 — images only, faster to make and easier to test. Add video in Month 2 once you know which angle wins.

### Creative 1 — "No Nasties" (Single image, 1080x1080px)

**Make it in Canva:**
1. Go to canva.com → New Design → search **Instagram Post** → select **Square (1080x1080)**
2. Upload your best flat-lay soap photo as the background (2–3 soaps, earthy tones)
3. Add a text block (large, easy to read on mobile):
   - Top line: **"No sulfates. No harsh chemicals."**
   - Below it (smaller): **"Just pure, handmade soap."**
4. Add a thin strip at the bottom of the image: **"healingsoil.in/shop | Chat on WhatsApp →"**
5. Keep the overlay text color in white or dark brown — nothing bright or clinical
6. Click **Download** → PNG → save to your computer

*~~Sensitive Skin Reel — skipped for Month 1.~~ Video requires production effort and extra testing time. Run images-only in Month 1. If the No Nasties or Gift angle wins, build a reel version of that winner in Month 2.*

### Creative 2 — "Gift" (Carousel, 3–4 images, 1080x1080px each)

**Make 4 slides in Canva:**
- Slide 1: A single soap bar styled warmly — headline: **"Give skin what it deserves"**
- Slide 2: Two soaps together — headline: **"Handcrafted in small batches"**
- Slide 3: Soap with natural props (dried flowers, kraft paper) — headline: **"Natural ingredients, no harsh chemicals"**
- Slide 4: Plain earthy background, text only: **"Order on WhatsApp → 7483100651"** and **healingsoil.in/shop**

Download all 4 as PNGs.

---

## Phase 8 — Create the Three Ads in Ads Manager

You are now back in Ads Manager. You should see Ad Set A and Ad Set B created. You'll add the ads inside Ad Set A first, then duplicate to Ad Set B.

### Ad 1 — "No Nasties"

1. Click into **Ad Set A (Wellness)**
2. Click **+ Add ad**
3. **Ad name:** `Ad1_NoNasties`
4. Under **Identity**, select your Instagram page: **Healing Soil Farm Life**
5. **Format:** Single image or video → select **Image**
6. Click **Upload** → select the Creative 1 PNG you made in Canva
7. **Primary text (body copy):**
```
Your skin deserves better than a factory formula. Healing Soil soaps are handcrafted with natural ingredients — gentle on skin, tough on chemicals.
```
8. **Headline:** `No sulfates. No harsh chemicals. Just handmade soap.`
9. **Call to action button:** select **Send WhatsApp Message**
10. **WhatsApp business number:** 7483100651
11. **Pre-filled customer message** (the message customers see pre-typed when they tap the ad):
```
Hi! I saw your ad and I'm interested in your soaps. Can you tell me more?
```
12. On the right side, click through the preview and check it on both **Instagram feed** and **Facebook feed** — confirm text is readable and the image looks right
13. Click **Save ad**

---

### Ad 2 — "Gift"

1. Inside **Ad Set A**, click **+ Add ad**
2. **Ad name:** `Ad2_Gift`
3. Identity: **Healing Soil Farm Life**
4. **Format:** Carousel
5. Upload your 4 Canva slides, one per carousel card
6. For each card, fill in:
   - Card 1 headline: `Give skin what it deserves`
   - Card 2 headline: `Handcrafted in small batches`
   - Card 3 headline: `Natural ingredients, nothing harsh`
   - Card 4 headline: `Order on WhatsApp →`
7. **Primary text:**
```
Beautiful handmade soaps — a thoughtful gift for people who care about what they put on their skin. Made in small batches with natural ingredients.
```
8. **CTA button:** Send WhatsApp Message
9. **WhatsApp number + pre-filled message:** same as Ad 1
10. Preview carousel — swipe through each card in the preview
11. Click **Save ad**

---

## Phase 9 — Duplicate Both Ads to Ad Set B

1. In Ads Manager, go back to the Campaign level view
2. You should see Ad Set A with 2 ads inside (No Nasties + Gift)
3. Check the box next to **Ad Set A**
4. Click **Duplicate** (from the top action bar)
5. When prompted "Duplicate to a new ad set or existing ad set?" — select **Existing ad set**
6. Select **Ad Set B (Gifting)**
7. Click **Duplicate**

Ad Set B now has copies of both ads. You have 4 ads total running across 2 audiences — same creatives, different interest targeting. This tells you which audience responds better to each angle.

---

## Phase 10 — Final Pre-Launch Checklist

Go through this before clicking Publish. Every item must be ticked.

- [ ] WhatsApp number 7483100651 appears under WhatsApp Accounts in Meta Business Settings
- [ ] Greeting message is active in WhatsApp Business app (toggle ON)
- [ ] Away message is active with 9 PM–8 AM schedule
- [ ] Quick replies saved: `/price`, `/ing`, `/delivery`, `/order`
- [ ] Payment method (card) added to Meta Billing and Payments
- [ ] Campaign objective is Messaging → WhatsApp
- [ ] Campaign daily budget is ₹150/day with CBO on
- [ ] Both ad sets target Bangalore, Women 25–50, correct interests
- [ ] Both ad sets have exclusions for existing page and Instagram followers
- [ ] Manual placements selected: Instagram Feed, Stories, Reels + Facebook Feed only
- [ ] Both ads exist in both ad sets (4 ads total)
- [ ] Each ad has WhatsApp CTA and pre-filled message set
- [ ] Each ad previewed — text readable, image clear on mobile

When all boxes are checked → click **Publish Campaign**.

---

## Phase 11 — Week 1–2 Operating Rules

**Do not break these or you will restart the learning phase and waste money:**

1. **Make zero changes to any live ad for the first 7 days.** No copy edits, no image swaps, no budget changes. Every edit resets the algorithm's learning clock.
2. **Check WhatsApp at fixed times:** 8 AM, 1 PM, 6 PM, 9 PM — not reactively throughout the day
3. **Track every conversation.** Keep a simple note or spreadsheet with columns: Date | Name | Product Asked About | Converted? | Revenue
4. **Do not kill an ad before Day 7.** An ad that looks expensive in Day 2 often stabilises by Day 5.

---

## Phase 12 — End of Week 2 Review

At Day 14, check Ads Manager for these numbers:

| Metric | What to look for |
|---|---|
| Cost per WhatsApp conversation | Lowest cost = best performing ad |
| Link click-through rate (CTR) | Above 1% is healthy for this budget |
| Ad Set A vs B | Which audience started more conversations? |
| Angle performance | Rank: which of the 3 ads got most taps? |

**Action after review:**
- Kill the worst-performing ad angle (highest cost per conversation, lowest CTR)
- Move that budget into the winning angle
- Keep both ad sets running unless one is dramatically worse

---

## Video Creation — Your Options for Image-to-Video

You want to turn product still images into a video reel. Options ranked by ease:

| Tool | How | Cost | Best for |
|---|---|---|---|
| **CapCut** (phone) | Photo slideshow + transitions + music + text | Free | Quickest result, good enough for Month 1 |
| **Canva** (desktop) | Presentations > Animate, or use the video template | Free / Pro | Clean, branded look |
| **Google Veo** (via Google Labs / VideoFX) | Upload image + text prompt → AI generates 4-sec video clip | Free (waitlist) | Cinematic movement on still product shots |
| **Runway ML** (runwayml.com) | Image-to-video: upload one photo, it adds motion | Free tier (limited) | Single-shot product movement |
| **Kling AI** (klingai.com) | Same as Runway — upload image, generates motion video | Free tier | Good quality, currently accessible |
| **Pika** (pika.art) | Upload image + describe motion → generates video | Free tier | Simple to use, no queue |
| **ComfyUI** | Local workflow: load img2vid node + a motion model | Free (runs on your machine) | Full control, no watermarks — technical setup required |

**Recommendation for your first reel:** Use CapCut. 15 minutes, free, no learning curve, and slideshow-style reels from product photos perform well for handmade brands. Save the AI video tools for Month 2 once you know which ad angle is worth investing time in.

**If you want to try Google Veo / VideoFX:** Go to labs.google → find VideoFX → it uses Veo under the hood. You upload a product image and write a short prompt like "soap bar on a wooden surface with soft morning light, gentle movement". It generates a 4-second clip you can trim and use as your reel. Quality is high but availability is limited.

**For ComfyUI:** If you want to do this locally (no cost, no watermarks, full control), set up ComfyUI with the Wan or CogVideoX node. This is a half-day setup but gives you unlimited image-to-video generation. Let me know if you want a separate walkthrough for this.

---

*Healing Soil — Ads Execution Playbook — May 2026*
