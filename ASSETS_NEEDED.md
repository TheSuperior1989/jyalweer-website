# ASSETS_NEEDED.md

Everything you need to provide before launch. Batched so you can brief a designer, photographer, or agency in one go.

---

## 🔑 API Keys / Secrets (REQUIRED before checkout works)

| Key | Where | Notes |
|-----|-------|-------|
| `STRIPE_SECRET_KEY` | `.env.local` | Get from stripe.com/dashboard — use test key (`sk_test_...`) for dev |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `.env.local` | Get from stripe.com/dashboard — use test key (`pk_test_...`) for dev |
| `NEXT_PUBLIC_BASE_URL` | `.env.local` | Set to `https://jyalweer.co.za` in production |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` | Optional — only needed for admin server operations |

---

## 📸 Product Images (REQUIRED before store works)

For each product in your Supabase `products` table, upload a square image (min 800×800px) to Supabase Storage.

Ideal shots:
- Clean white or cream background
- Flat lay OR model wearing the item
- At least 1 main image; 3–5 preferred for a gallery
- File format: JPEG or WebP, <500KB each

Current placeholder: "No image" shown — ugly and kills conversions.

---

## 🖼 Meme Images

Your memes table likely has no entries yet. To populate the homepage "Meme of the Day" section:
- Add meme records to Supabase `memes` table
- Set `is_meme_of_day: true` on one record
- Set `is_active: true` on all visible memes
- Provide `image_url` (Supabase Storage URL) and captions in both Afrikaans and English

---

## 🌐 Social Media Links (verify these are correct)

| Platform | URL used | Status |
|----------|----------|--------|
| Facebook | `https://www.facebook.com/JyAlweer` | Confirm this is the correct page URL |
| Instagram | `https://instagram.com/jyalweer` | Confirm handle |
| Twitter/X | `https://twitter.com/jyalweer` | Confirm or remove if not active |

---

## 📋 Copy to Write

| Location | What's needed |
|----------|---------------|
| Hero section | Real tagline beyond "Die amptelike tuiste van..." — something punchy in SA vernacular |
| About page | "Ons Storie" — the milestone years (2019, 2021, etc.) are placeholders. Replace with real dates/events |
| Product descriptions | Each product needs compelling copy in Afrikaans + English |
| Contact page `kontak` | Current page not reviewed — needs real address, phone, response time |
| Newsletter welcome email | Set up in Supabase/email provider after form submissions work |

---

## 🏗 Supabase Schema

Ensure these tables and columns exist. Column names the app depends on:

### `products`
```
id, name, name_af, description, description_af, price_cents (int),
category ("tshirts"|"hoodies"|"caps"|"stickers"),
image_url, sizes (text[]), colors (text[]),
is_limited_drop (bool), is_featured (bool),
stock_quantity (int), is_active (bool),
created_at, updated_at
```

### `memes`
```
id, caption, caption_af, image_url,
facebook_link, is_featured (bool), is_meme_of_day (bool),
is_active (bool), created_at, updated_at
```

### `profiles`
```
id (= auth.uid), full_name, language_preference, is_admin (bool),
created_at, updated_at
```

### `orders` + `order_items`
See `lib/types.ts` for full schema.

---

## 🎨 Design Assets

| Asset | Spec | Notes |
|-------|------|-------|
| OG image (social share) | 1200×630px | Brand colours + logo. Used when links shared on WhatsApp/Twitter |
| Favicon variants | 32×32, 180×180 PNG | Currently using placeholder icons |
| Product mockup templates | PSD/Figma | Needed to generate product images quickly |

---

## 🌍 Domain + Hosting

- Domain `jyalweer.co.za` — confirm DNS points to Vercel
- Set `NEXT_PUBLIC_BASE_URL=https://jyalweer.co.za` in Vercel env vars
- Add Stripe webhook endpoint in Stripe dashboard: `https://jyalweer.co.za/api/webhook/stripe` (not yet created — needed for order confirmation emails)
