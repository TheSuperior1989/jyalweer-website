# DESIGN_SYSTEM.md — Jy Alweer? Grap Blad

## Brand DNA

**Vibe**: Bold South African meme-merch label. Irreverent, confident, wearable.
**Logo mark**: White diamond badge on charcoal slate — solid + dashed rhombus, bold sans + script *Grap blad*.
**Design language**: Monochrome charcoal streetwear. The entire site lives inside the logo's world: slate surfaces, white type, dashed diamond motifs. No colour accents — white *is* the accent.
**Comparable brands**: MSCHF · Liquid Death · premium street culture with SA humour.
**NOT**: Generic SaaS · Cheap meme-page energy · Corporate e-commerce · Neon colour splashes.

**Primary logo asset**: `/images/jyalweer-logo.jpg` via `<Logo />` (`components/brand/logo.tsx`).

---

## Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display / Headlines | **Space Grotesk** | 700 | `font-display`, all headings, hero text |
| Body | **Inter** | 400, 500 | `font-sans`, body copy, UI labels |
| Script accent | **Pacifico** | 400 | `font-script` — matches logo "Grap blad" script |
| Mono | **Geist Mono** | 400 | Code / order numbers |

### Rules
- Headlines: `letter-spacing: -0.02em` — always tight
- Script only for brand tagline moments — never body copy
- Use `page-title` / `page-kicker` / `brand-rule` for consistent page intros

---

## Colour Palette — dark-only, cool slate (hue ≈ 250)

| Token | Value | Usage |
|-------|-------|-------|
| `--ink` | `#0d1015` | Deepest — footer, page-hero bands, ticker strip |
| `--background` | slate ≈ `#171c24` | Page ground |
| `--card` | slate ≈ `#20262f` | Elevated panels (the logo slate) |
| `--charcoal` | `#1e242d` | `.section-charcoal` hero/CTA bands |
| `--charcoal-soft` | `#262d38` | `.section-charcoal-soft` |
| `--primary` | white | The punch CTA — white on charcoal, like the logo |
| `--primary-foreground` | ink | Text on primary |
| `--muted-foreground` | cool grey | Secondary text |
| `--border` | slate ≈ white/14 | Borders, dividers |
| `--destructive` | red | Errors only — the single non-mono colour |

### Surface rhythm
ink (deepest) → background → card/charcoal (elevated). Bands are separated by
white gradient hairlines, not colour changes.

### Contrast
- White on any slate surface: excellent
- Muted-foreground on background/card: AA+

---

## Components

### Buttons (`Button`)
| Variant | Use |
|---------|-----|
| `default` | White punch CTA with soft white glow — primary actions |
| `outline` | White/25 border; add `border-dashed` for the logo's dashed language |
| `secondary` | Elevated slate surface |
| `ghost` | Tertiary / nav (white/10 hover) |
| `destructive` | Errors / removals only |

### Page chrome
| Piece | Use |
|-------|-----|
| `<PageHeader variant="band\|inline" />` | Page titles |
| `<LegalShell />` | Policy pages |
| `.page-shell` / `.page-shell-narrow` | Content width + padding |
| `.page-hero-band` | Ink hero strip with radial washes |
| `.brand-rule` | Glowing white underline accent |
| `.diamond-deco` | Rotated dashed square decoration |
| `.marquee-strip` / `.marquee-track` | Streetwear wordmark ticker |

### Cards
- `rounded-2xl border border-border bg-card`
- Product cards: `card-lift` hover (lift + white glow border)

### Badges
- `variant="punch"` white-on-ink with glow — limited drops / featured
- `variant="default"` white primary
- `variant="secondary"` slate
- `variant="outline"` dashed white/25

---

## Spacing

- Section padding: `py-20 md:py-28`
- Content max: `max-w-7xl` / narrow `max-w-4xl`
- Card padding: `p-4` min, `p-6` standard

---

## Motion

```css
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1)
--duration-fast: 150ms
--duration-mid:  250ms
--duration-slow: 400ms
```

Respect `prefers-reduced-motion` (includes the marquee).

---

## Utility classes

| Class | Effect |
|-------|--------|
| `.section-charcoal` / `.section-ink` | Brand slate surfaces |
| `.badge-punch` | White pill with glow |
| `.card-lift` | Hover lift + white glow |
| `.neon-glow` | Soft logo glow |
| `.font-script` | Pacifico |
| `.media-frame` | Product image frame |
| `.border-dashed-brand` | Logo-style dashed border |
| `.bg-dot-grid` | Faint white dot grid |

## Hard rules

- **No colour accents.** White, slate, ink — destructive red is the only exception.
- White gradient hairlines (`transparent → white/50 → transparent`) separate major bands.
- Dashed borders and rotated squares are the brand's decorative vocabulary.
