# CHANGELOG.md

## Pass 1 — 2026-05-06

### Phase 0: Recon + Audit
- Mapped full codebase: 15 routes, 50+ components, Supabase + Stripe + Vercel stack
- Identified 7 critical bugs (documented in PLAN.md)
- Wrote PLAN.md with phased roadmap

### Phase 1: Design System
- **`app/globals.css`** — Complete rewrite. New palette: Cream background, Acid Lime primary, Terracotta accent, Ink dark sections. Added Space Grotesk as display font. Full motion token set (5 animation types, spring/out easings). Added utility classes: `.section-ink`, `.badge-lime`, `.card-lift`, `.hover-underline`, `.bg-dot-grid`, `.lime-glow`. Respects `prefers-reduced-motion`.
- **`app/layout.tsx`** — Swapped Playfair Display for Space Grotesk (bold display font better fit for meme brand). Added `metadataBase`. Added Organization JSON-LD structured data.
- **`next.config.mjs`** — Removed `images: { unoptimized: true }`. Added Supabase Storage remote patterns. Image optimization now active.

### Phase 1: Critical Bug Fixes
- **`app/actions/stripe.ts`** — Rewrote to accept `{ items, shipping, shippingCost }` object (was positional args). Items now expect `priceCents` not `priceInCents`. Shipping address field names aligned with form. Changed to `ui_mode: 'embedded'` + `return_url` (was hosted redirect + `success_url`). Now returns `clientSecret` (was `url`).
- **`app/(marketing)/shop/page.tsx`** — Fixed column names: `in_stock` → `is_active` + `stock_quantity > 0`; `price` → `price_cents`; `featured` → `is_featured`.
- **`public/grid.svg`** — Created missing dot-grid SVG (hero section referenced it but file didn't exist).

### Phase 1: Header
- **`components/layout/header.tsx`** — Added logo SVG (was text-only). Scroll-aware sticky styling. Improved mobile sheet with logo. Lime-highlighted active language. Cart badge repositioned. Nav links include About page.

### Phase 2: Homepage
- **`components/home/hero-section.tsx`** — Full rebuild. Animated floating logo mark with rotating ring. SVG squiggle underline on "Alweer?". Fade-up / delay-staggered copy. Social proof bar (followers, SA, shipping). Dual CTAs with correct styling.
- **`components/home/meme-of-day.tsx`** — Ink-section layout with lime top bar. Two-column grid (copy + image). Native share API wired up.
- **`components/home/featured-products.tsx`** — Bento-style grid (first product span-2). Hover overlay with CTA. Bottom "browse all" CTA block.
- **`components/home/newsletter-section.tsx`** — Ink section with lime CTA button. Better copy. Confirm no-spam text.

### Phase 2: Footer
- **`components/layout/footer.tsx`** — Lime accent bar at top. Logo integrated. Trust signals (payment methods). Animated social icons. Better link hover effects.

### Phase 2: New Pages
- **`app/not-found.tsx`** — Created 404 page. Giant outlined "404", SA humour, lime/ink brand, dual CTAs. No more default Next.js 404.

### Phase 2: About Page
- **`app/(marketing)/oor-ons/page.tsx`** — Full rebuild. Hero section with logo on lime. Stats strip (50k+, 100% SA, etc.). Brand story copy. Visual timeline (4 milestones). Values grid (4 cards). Ink CTA section at bottom.

### Phase 3: Product Detail
- **`components/shop/product-details.tsx`** — Added mock reviews section (5 SA-flavoured reviews with star ratings + breakdown bar). Added size guide dialog with cm measurements table. Added trust signals row (secure checkout, SA shipping, returns). Better image placeholder. Hover zoom on product image.

### Phase 3: Memes Gallery
- **`components/memes/memes-gallery.tsx`** — Added live search (filters by caption in both languages). Image hover overlay with FB + share buttons. Empty state with personality. Animated badge with filled star icon. Better lightbox (full bleed image, no padding until caption).

### Phase 4: SEO
- **`app/sitemap.ts`** — Created Next.js sitemap route covering all public pages.
- **`app/robots.ts`** — Created robots.txt blocking admin/account/auth/api, pointing to sitemap.
- **`app/layout.tsx`** — Organization JSON-LD structured data added to root layout.

### Documentation
- **`PLAN.md`** — Full audit + phased roadmap
- **`DESIGN_SYSTEM.md`** — Token definitions, component patterns, usage rules
- **`ASSETS_NEEDED.md`** — Complete list of assets, keys, copy, and schema requirements
- **`CHANGELOG.md`** — This file

---

## Known Outstanding Items (Pass 2+)

- [ ] Stripe Webhook handler (`/api/webhook/stripe`) for order confirmation
- [ ] OG image generation for product pages (Next.js `opengraph-image.tsx`)
- [ ] Product page structured data (Product JSON-LD)
- [ ] Cart slide-out drawer (currently navigates to full page)
- [ ] Loading skeletons on shop/memes pages
- [ ] Real product data in Supabase (see ASSETS_NEEDED.md)
- [ ] Playwright e2e tests for cart + checkout flow
