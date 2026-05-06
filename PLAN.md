# PLAN.md — Jy Alweer? Meme Empire Transformation

## PHASE 0 AUDIT — What Exists

### Stack
- Next.js 16 + React 19 + TypeScript + Tailwind 4 + shadcn/ui + Radix UI
- Supabase (Auth + DB: products, memes, orders, profiles, subscribers)
- Stripe Embedded Checkout (ZAR)
- Vercel Analytics + Vercel deployment
- i18n: Afrikaans/English via custom LanguageContext
- Cart: localStorage persistence via CartContext

### Routes Inventory
| Route | Status |
|-------|--------|
| `/` | Exists — weak hero, broken grid.svg reference |
| `/memes` | Exists — tabbed (Facebook feed + saved gallery) |
| `/shop` | Exists — broken sort/filter column names |
| `/shop/[id]` | Exists — no zoom, no reviews, no size guide |
| `/cart` | Exists — functional |
| `/checkout` | Exists — **BROKEN** (Stripe param mismatch) |
| `/checkout/success` | Exists |
| `/oor-ons` | Exists — bland, no personality |
| `/kontak` | Exists |
| `/versendingsbeleid` | Exists |
| `/terugsendings` | Exists |
| `/privaatheidsbeleid` | Exists |
| `/terme-en-voorwaardes` | Exists |
| `/account` | Exists |
| `/auth/login`, `/auth/sign-up` | Exists |
| `/admin` | Exists |
| `/404` | **MISSING** |

### Critical Bugs Found
1. **CHECKOUT BROKEN**: `checkout-form.tsx` calls `createCheckoutSession({items, shipping, shippingCost})` but `stripe.ts` action signature is `(items, shippingAddress)` — param shape mismatch, will throw at runtime.
2. **SHOP QUERIES WRONG COLUMNS**: `shop/page.tsx` sorts by `"price"` and `"featured"` but type/DB uses `price_cents` and `is_featured`. Also queries `.eq("in_stock", true)` but Product type has `is_active` + `stock_quantity`.
3. **MISSING ASSET**: Hero references `/grid.svg` which does not exist in `/public` — broken background.
4. **NO STRIPE KEYS**: `.env.local` has only Supabase keys. `stripe.ts` will throw on import without `STRIPE_SECRET_KEY`.
5. **LOGO NOT USED**: `JyAlweerGrapBlad.svg` exists in `/public/images/` but header renders text. Logo is never displayed.
6. **`ignoreBuildErrors: true`** in `next.config.mjs` — silently masking type errors.
7. **`images: { unoptimized: true }`** — kills Next.js image optimization entirely.

### Design Weaknesses
- Color palette: warm/earthy but generic — feels like a beige corporate SaaS, not a meme brand
- Typography: Inter + Playfair Display — pleasant but no character for a comedy brand
- Hero: static, low energy, uses a screenshot as the visual
- Meme gallery: functional masonry but no search, no personality, no lazy loading
- About page: flat text in shadcn Cards with emoji bullets — zero brand mythology
- Product cards: "No image" placeholder is dead and ugly
- Shipping cost inconsistency: cart shows R99 flat rate, stripe.ts hardcodes R65

### What's Good (keep it)
- Cart logic (localStorage, quantity, variants) — solid
- Supabase integration pattern — clean
- Language context system — well-structured
- Full type definitions in `lib/types.ts`
- Admin dashboard exists (products, memes, orders, subscribers)
- Policy pages in Afrikaans — rare attention to detail
- Checkout success page flow

---

## PHASED ROADMAP

### Phase 1: Foundation Fixes + Design System
**Goal**: Nothing broken, real design identity established

1. Fix all critical bugs (Stripe params, shop queries, grid.svg)
2. Overhaul `globals.css`: bold new palette (Ink + Acid Lime + Cream + Terracotta), new fonts (Space Grotesk display), full token set including motion tokens
3. Update `header.tsx`: use logo SVG, bolder nav, sticky with real presence
4. Update `footer.tsx`: richer layout, brand personality
5. Create DESIGN_SYSTEM.md

### Phase 2: Homepage + Content Pages
**Goal**: Pages that stop the scroll

1. Hero: animated SVG leaf motif, massive bold headline, dual CTA
2. Meme of the Day: full-bleed card with personality
3. Featured Products: bento-style asymmetric grid  
4. Newsletter: opinionated section, not an afterthought
5. Rebuild About/Oor-ons: brand mythology, lore, timeline-style layout
6. 404 page: the joke must land
7. Memes gallery: search, hover effects, bento/masonry hybrid

### Phase 3: Store Polish
**Goal**: Store that actually converts

1. Product detail: image zoom simulation, mock reviews (5 reviews, SA humour), size guide modal
2. Shop grid: search bar added, skeleton loading states
3. Cart: progress bar to free shipping threshold
4. Checkout: fix Stripe flow end-to-end, add trust signals

### Phase 4: SEO + Performance
**Goal**: 95+ Lighthouse

1. `sitemap.xml` and `robots.txt`
2. Product page structured data (JSON-LD)
3. Organization structured data on root layout
4. Re-enable image optimization (fix `unoptimized: true`)
5. Add blur placeholders to product images
6. OG image generation for product pages

### Phase 5: Testing Loop (minimum 3 passes)
1. Playwright: screenshot every route desktop + mobile
2. Lighthouse audit every page
3. Console error check
4. Cart + checkout e2e with Stripe test card 4242...
5. Visual review + fix iteration
6. Repeat x3

---

## DELIVERABLES CHECKLIST
- [x] PLAN.md (this file)
- [ ] DESIGN_SYSTEM.md
- [ ] CHANGELOG.md
- [ ] ASSETS_NEEDED.md
- [ ] Working site: `npm run dev`
- [ ] All pages polished
- [ ] Store functional end-to-end
