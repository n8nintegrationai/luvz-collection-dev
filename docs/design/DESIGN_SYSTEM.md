# DESIGN_SYSTEM.md — LUVZ Collection

---

## Design Principles

- Gold used sparingly — accents only, never dominant fills.
- Dark warm backgrounds only (`data-theme="earth"` locked — no light/dark toggle).
- Hover states: smooth, no sudden jumps or bouncing.
- Animations: slow, scroll-triggered fade-ups; parallax desktop-only.
- Generous padding; open layouts.

---

## Color System (Earth Theme — locked)

| Role | Variable | Value |
|------|----------|-------|
| Primary Background | `--bg` | #18110A |
| Alt Background | `--bg2` | #1E160D |
| Tertiary Background | `--bg3` | #261C11 |
| Card Background | `--card` | #221810 |
| Card Alt | `--card2` | #2C2016 |
| Primary Text | `--txt` | #F0E2C8 |
| Secondary Text | `--txt2` | #C8A878 |
| Tertiary Text | `--txt3` | rgba(200, 168, 120, 0.45) |
| Core Brand Gold | `--gold` | #C88C2C |
| Dark Gold | `--gold-d` | #A06E10 |
| Light Gold | `--gold-l` | #E4AA50 |
| Extra-Light Gold | `--gold-xl` | #F2CA78 |
| Border | `--border` | rgba(196, 136, 44, .14) |
| Border Hover | `--border-h` | rgba(196, 136, 44, .43) |
| Shadow | `--sh` | 0 2px 20px rgba(0,0,0,.5) |
| Shadow Hover | `--sh-h` | 0 14px 52px rgba(0,0,0,.7), 0 0 0 1px rgba(196,136,44,.15) |
| Modal Shadow | `--sh-modal` | 0 40px 120px rgba(0,0,0,.88) |
| WhatsApp Green | `--wa-green` | #25D366 |

**Never hardcode colors. Use CSS variables everywhere.**

---

## Typography

| Element | Font | Size | Weight | Letter-Spacing | Line-Height |
|---------|------|------|--------|----------------|-------------|
| Hero Title | Cinzel | clamp(28px, 8vw, 64px) | 400 | 0.09em | 1.1 |
| Section H2 | Cinzel | clamp(24px, 5vw, 48px) | 700 | 0.13em | 1.15 |
| Card Title | Cinzel | 18px | 600 | 0.08em | 1.3 |
| Body | Cormorant Garamond | 16px | 400 | 0 | 1.6 |
| Body Bold | Cormorant Garamond | 16px | 600 | 0 | 1.6 |
| Caption | Cormorant Garamond | 14px | 300 | 0 | 1.5 |
| UI Label | Jost (system fallback) | 12px | 600 | 0.05em | 1.4 |
| Button | Jost (system fallback) | 14px | 600 | 0 | 1.4 |

Chat input font-size must be 16px (prevents iOS auto-zoom).

---

## Spacing (8px baseline grid)

**CSS Variables (2026-05-05 consistency pass):**
```css
--section-gap: clamp(64px, 8vw, 100px);  /* Responsive rhythm: 64px mobile → 100px large desktop */
--t-fast: 0.28s;                          /* Nav links, low-priority feedback */
--t-std: 0.35s;                           /* Cards/buttons, standard interaction */
```

**Base scale:**
```
8px   → tight gaps, component spacing
16px  → default card padding, carousel gap, category grid gap
24px  → horizontal section padding
32px  → larger internal margins
64px  → section top/bottom (mobile) via --section-gap
80px  → section top/bottom (tablet) via --section-gap
100px → section top/bottom (large desktop) via --section-gap
```

- Product cards: `padding: 16px`
- Sections: `padding: var(--section-gap) 24px`
- Modal: `padding: 24px 20px` (mobile), `32px 28px` (desktop)
- Hero buttons: `padding: 12px 24px`
- Chat input: `padding: 8px 12px`

---

## Shadows

Use variables only — never hardcode `box-shadow` RGB values.

| Variable | Usage |
|----------|-------|
| `var(--sh)` | Cards at rest, buttons |
| `var(--sh-h)` | Cards on hover, elevated states |
| `var(--sh-modal)` | Overlays, deep modals |

---

## Components

### Cards
- `display: flex; flex-direction: column; padding: 16px`
- Border: `1px solid var(--border)` → hover: `var(--border-h)`
- Shadow: `var(--sh)` → hover: `var(--sh-h)`
- Image: `aspect-ratio: 1; object-fit: cover; width: 100%`
- Title: Cinzel 700 `--txt`. Price: Cormorant Garamond 400 `--txt2`. Description: Cormorant Garamond 300 `--txt3`, 2 lines max. Badge: Cinzel 600 12px `--gold` uppercase.
- CTA: ghost button (see below).

### Buttons

**Ghost (default):** `border: 1px solid var(--gold); background: transparent; color: var(--gold); padding: 12px 24px; border-radius: 0; transition: 0.3s ease`. Hover: `background: var(--gold); color: var(--btn-fg)`.

**Primary CTA (rare):** `background: var(--gold); color: var(--btn-fg); border: none`. Hover: `background: var(--gold-l)`.

**WhatsApp:** `background: var(--wa-green); color: white; border: none; padding: 8px 12px`.

### Modals
- Overlay: `background: rgba(0,0,0,0.88)`. Box: `background: var(--modal-bg); border-radius: 8px`.
- Desktop: centered, max-width 680px.
- Mobile (<600px): `position: fixed; inset: 0; border-radius: 0`; slide-up animation.
- Close button: `×` Cinzel 700 24px, top-right, 16px from edge.

### Carousels
- Track gap: 16px. Cards per page: 4 (>1100px) / 3 (700–1100px) / 2 (<700px).
- Snap transition: `0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- Touch swipe threshold: 44px.
- Pagination label format: "1–4 of 12", Cormorant Garamond 300 `--txt2`.

### Chat Widget
- Trigger: `position: fixed; bottom: 80px; right: 16px; padding: 14px 16px; border-radius: 24px; border: 1px solid var(--gold); backdrop-filter: blur(14px)`.
- Popup desktop: `position: fixed; bottom: 140px; right: 16px; width: 370px; height: 540px; border-radius: 12px`.
- Popup mobile (<600px): `inset: 0; border-radius: 0`; slide-up.
- z-index: 9998 (desktop), 99999 (mobile).
- Input font-size: 16px (iOS fix). Send button: 42×42px, gold background.

### Navigation
- Desktop: `position: fixed; top: 0; z-index: 90; background: linear-gradient(180deg, rgba(18,13,8,.64), rgba(18,13,8,.46))`.
- Mobile bottom nav: `position: fixed; bottom: 0; height: 56px`.
- Logo: 40px mobile, 48px desktop.

---

## Animation

### Keyframes

| Animation | Duration | Use |
|-----------|----------|-----|
| `lcFadeUp` | 0.8s ease-out | Hero content entrance |
| `lcImageFloat` | 2.8s ease-in-out | Hero image float |
| `lcAmbientScale` | 4s ease-in-out infinite | Ambient glow pulse |
| `skWave` | 1.6s linear infinite | Gold text shimmer |
| `prismSpin` | 3s linear infinite | Prism border |
| `logoFloat` | 3s ease-in-out infinite | Nav logo float |
| `chevBounce` | 0.8s ease-in-out infinite | Scroll chevron |
| `lcShimmerSweep` | 0.6s ease-in-out | Button hover shimmer |
| `mPop` | 0.35s cubic-bezier(0.34,1.56,0.64,1) | Modal pop-in |
| `mSlide` | 0.4s cubic-bezier(0.25,0.46,0.45,0.94) | Mobile modal slide-up |

### Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

Disable on `hover: none` devices: prism, bloom, sweep, GPU-heavy effects.

---

## Responsive Breakpoints

| Breakpoint | Changes |
|-----------|---------|
| < 480px | Carousel 50% - 6px; nav padding 14px |
| 480–600px | Modal full-screen; chat 100% viewport; hero buttons stack |
| 600–768px | Carousel 2 cards; category grid 2 cols |
| 768–1100px | Carousel 3 cards; animations off; hero simplified |
| > 1100px | Carousel 4 cards; parallax enabled; vault 3D active |

Test carousel math actively at 700px and 1100px — breakpoints are fragile.

---

## Image Handling

- Product cards: `aspect-ratio: 1` (square). Hero: 16:9 responsive.
- Hero: `loading="eager" fetchpriority="high"`.
- Format: WebP preferred, PNG fallback.
- Lazy loading for non-hero images: planned.

---

## Accessibility Rules

- Input minimum 16px font (iOS zoom prevention).
- Safe-area insets required for mobile notch/home-indicator.
- All buttons, icons, and form inputs need `aria-label`.
- `focus-visible` must show gold outline: `outline: 2px solid var(--gold); outline-offset: 2px`.
- GPU-safe transitions only: `transform` and `opacity`.

---

## Editorial Campaign Sections

Design principles introduced in New Collection, establishing the reference direction for future luxury editorial experiences.

**Composition Philosophy:**
- No visible card containers (no borders, no panels, no compartmentalization)
- Image-led storytelling (visual hierarchy dominates typography)
- Overlay typography (captions float over images, not below)
- Atmospheric gradients instead of solid panels (layered subtle glows)
- Sparse luxury pacing (white space is breathing room, not emptiness)
- Asymmetry with purpose (21:9 panoramic ratios, offset layouts)

**Navigation & Interaction:**
- Filmstrip navigation instead of carousel arrows (subtle dots, not mechanical controls)
- Circular looping (navigation never traps at boundaries)
- Cross-fade transitions (cinematic, not mechanical)
- Wishlist integration (persistent state, mobile-optimized touch)
- Swipe affordance on mobile (44px threshold, gesture-natural)

**Typography on Images:**
- Overlay captions (name, price, category eyebrow)
- Text shadows for readability on photographic backgrounds (never drop to transparent fallback)
- No opacity below 50% on readable content
- Cormorant Garamond for descriptive prose (editorial register)
- Cinzel for labels and section heads (architectural register)

**Image Treatment:**
- Full-bleed primary image (no frame, no mat, extends to viewport edge)
- Angle variations in gallery (not additional products)
- Lifestyle editorial register (aspirational, cinematic, not product documentation)
- Consistent lighting/background treatment across all angles
- No white or cool-toned backgrounds (maintain dark warm aesthetic)

**Mobile Behavioral Differences:**
- Stacked layout (full-width images, bottom captions)
- Image-first narrative (captions below, not overlaid)
- Simplified caption structure (essential info only, no eyebrows)
- Swipeable gallery (touch-optimized, no pagination visible)
- Full viewport width (no padding constraints)

**Motion Rules:**
- Image transitions: cross-fade (0.4s cubic-bezier, 25–46–45–94)
- Section entrance: 0.8s ease-out fade-up (slow, deliberate)
- Ambient motion: 2.8s float / 4s scale (continuous, not triggered)
- Hover feedback: 0.35s (interactive, snappy)
- Never bounce, never elastic, never parallax on touch devices

**Performance Considerations:**
- Featured image preload (desktop priority) or eager load (mobile-first)
- Supporting carousel images lazy-load on scroll (use `loading="lazy"`)
- Angle gallery: load on-demand when user opens modal
- Wishlist button: data-pid attribute for O(1) state lookup
- No off-screen animation consumption (IntersectionObserver gates)

**Reference Pattern:**
This section establishes the design and interaction vocabulary for future editorial experiences on LUVZ Collection. Any future section built with similar emotional intent should follow this playbook. Sections with transactional intent (Enquire, Purchase, Add to Cart) should continue using card grids and carousel patterns.

---

## Design Debt

- Jost not imported — UI falls back to system sans-serif.
- Duplicate `@keyframes` definitions — last one wins; consolidate.
- Mobile chat trigger hidden <768px.
- No loading skeleton states.
- Product image lazy loading not implemented.
