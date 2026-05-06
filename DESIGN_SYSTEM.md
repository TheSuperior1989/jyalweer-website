# DESIGN_SYSTEM.md — Jy Alweer?

## Brand DNA

**Vibe**: Bold South African meme-merch label. Irreverent, confident, wearable.
**Comparable brands**: MSCHF · Liquid Death · Arc Browser (premium + personality) meets SA street culture.
**NOT**: Generic SaaS · Cheap meme-page energy · Corporate e-commerce.

---

## Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display / Headlines | **Space Grotesk** | 700, 900 | `font-display`, all `<h1>–<h3>`, hero text |
| Body | **Inter** | 400, 500 | `font-sans`, body copy, UI labels |
| Mono | **Geist Mono** | 400 | Code snippets only |

### Rules
- Headlines: `letter-spacing: -0.02em` — always tight
- Body: default tracking, max line-length ~70ch
- Never mix more than 2 type sizes in a single visual block

---

## Colour Palette

| Token | OKLCH | Hex (approx) | Usage |
|-------|-------|--------------|-------|
| `--background` | `oklch(0.97 0.012 80)` | `#faf6ec` | Page backgrounds |
| `--foreground` | `oklch(0.10 0.010 50)` | `#0f0d0b` | Primary text, ink fills |
| `--primary` | `oklch(0.85 0.23 127)` | `#c8ff00` | Acid lime — CTAs, badges, highlights |
| `--primary-foreground` | `oklch(0.10 0.010 50)` | `#0f0d0b` | Text on lime |
| `--accent` | `oklch(0.52 0.14 42)` | `#c4622d` | Terracotta — secondary accents |
| `--accent-foreground` | `oklch(0.97 0.012 80)` | `#faf6ec` | Text on terracotta |
| `--ink` | `#0a0a0a` | — | Hero sections, dark panels |
| `--lime` | `#c8ff00` | — | Raw lime reference |
| `--forest` | `#1a4a1a` | — | Logo green reference |
| `--terra` | `#c4622d` | — | Terracotta reference |
| `--muted` | `oklch(0.93 0.012 80)` | `#ede8de` | Subtle backgrounds |
| `--muted-foreground` | `oklch(0.46 0.018 55)` | `#7a6c5a` | Secondary text |
| `--border` | `oklch(0.85 0.018 75)` | `#d9d1c4` | Borders, dividers |

### Contrast Requirements
- Lime `#c8ff00` on Ink `#0a0a0a`: **18:1** — exceeds AAA ✓
- Terracotta on cream: **4.6:1** — meets AA ✓
- All body text on background: **14:1+** ✓

---

## Spacing Scale

Uses Tailwind's default scale (4px base unit). Key landmarks:
- `p-4` (16px) — card internal padding minimum
- `gap-6` (24px) — standard grid gap
- `py-16/py-20` — section vertical padding (mobile)
- `py-24/py-28` — section vertical padding (desktop)
- `max-w-7xl` — content max width

---

## Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Small badges, inputs |
| `--radius` / `--radius-lg` | 10px | Cards, buttons |
| `--radius-xl` | 16px | Feature cards, hero blocks |
| `--radius-2xl` | 22px | Large hero cards |
| `rounded-full` | 9999px | Pills, avatar, icon circles |

---

## Shadow Tokens

| Class | Usage |
|-------|-------|
| `shadow-sm` | Subtle lift (nav items) |
| `shadow-lg` | Cards on hover |
| `shadow-2xl` | Hero floaters, modals |

---

## Motion Tokens

```css
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1)   /* bouncy entries */
--ease-out:     cubic-bezier(0.16, 1, 0.3, 1)        /* smooth exits */
--duration-fast: 150ms  /* micro (hover state changes) */
--duration-mid:  250ms  /* standard transitions */
--duration-slow: 400ms  /* page-level reveals */
```

### Animation Classes
| Class | Effect | Usage |
|-------|--------|-------|
| `.animate-fade-up` | Fade + 24px rise | Section entry |
| `.animate-slide-left` | Fade + slide right→ | Left column reveals |
| `.animate-slide-right` | Fade + slide left→ | Right column reveals |
| `.animate-scale-in` | Scale 0.92 → 1 | Modal entries |
| `.animate-float` | Slow vertical bob | Hero logo mark |
| `.animate-spin-slow` | 20s rotation | Decorative ring |
| `.animate-sparkle` | Pulse scale | Icon accents |
| `.delay-100` – `.delay-500` | Stagger delays | Sequential reveals |

All animations respect `prefers-reduced-motion: reduce` — they're disabled when set.

---

## Component Usage

### Button
```tsx
// Primary (dark) — main CTAs
<Button style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
  Shop Now
</Button>

// Lime — hero CTAs, newsletter submit
<Button style={{ background: "var(--lime)", color: "var(--ink)" }}>
  Shop Now
</Button>

// Outline — secondary actions
<Button variant="outline">Browse Memes</Button>

// Ghost — tertiary, nav links
<Button variant="ghost">View All</Button>
```

### Card
```tsx
// Standard product / meme card
<div className="rounded-xl border border-border bg-card card-lift">

// Ink dark section (hero, newsletter)
<section className="section-ink">

// Muted background variant
<section className="bg-muted/30">
```

### Badge
```tsx
// Lime accent (limited edition, featured)
<Badge className="badge-lime">Beperkte Uitgawe</Badge>

// Secondary (out of stock)
<Badge variant="secondary">Uit Voorraad</Badge>
```

### Layout
- Use `section-ink` class for full-bleed dark sections
- All sections: `py-20 md:py-28` padding
- Content containers: `mx-auto max-w-7xl px-4`
- Lime accent top bar: `h-1 style={{ background: "var(--lime)" }}`

---

## Utility Classes (custom)

| Class | Effect |
|-------|--------|
| `.section-ink` | Black background + cream foreground |
| `.badge-lime` | Lime background + ink text, bold |
| `.card-lift` | Hover: translateY(-4px) + shadow |
| `.hover-underline` | Animated underline on hover |
| `.bg-dot-grid` | Dot pattern background |
| `.lime-glow` | Pulsing lime box-shadow |
| `.texture-noise::after` | Subtle noise overlay |
