# DESIGN_SYSTEM.md — LUVZ Collection

Visual and interaction rules for maintaining luxury brand consistency.

---

## Brand Philosophy

**Positioning:** Handcrafted 92.5 silver + 22K gold jewelry for India's luxury market. Editorial aesthetic, not commercial ecommerce.

**Emotional Tone:**
- Restrained elegance (more whitespace than color)
- Whispered luxury (subtle, purposeful motion)
- Artisan craft (handcrafted, heritage-focused)
- NOT: loud, emoji-heavy, mass-market, aggressive CTA

**Design Principles:**
- Gold used sparingly (accents, never dominant fills)
- Dark, warm backgrounds (earth theme locked — no light/dark toggles)
- Calm hover states (no sudden jumps, no bouncing)
- Slow, smooth animations (parallax, fade-up on scroll)
- Ample breathing room (generous padding, open layouts)

---

## Color System

**Earth Theme Only** (locked on `<html data-theme="earth">` — no light/dark modes):

| Role | Variable | Value | Use |
|------|----------|-------|-----|
| Primary Background | `--bg` | #18110A | Page background, sections |
| Alt Background | `--bg2` | #1E160D | Alternate section, modals |
| Tertiary Background | `--bg3` | #261C11 | Deep layers |
| Card Background | `--card` | #221810 | Product cards, modals |
| Card Alt | `--card2` | #2C2016 | Hover states, layers |
| Primary Text | `--txt` | #F0E2C8 | Body copy, headings |
| Secondary Text | `--txt2` | #C8A878 | Descriptions, labels |
| Tertiary Text | `--txt3` | rgba(200, 168, 120, 0.45) | Metadata, hints |
| Core Brand Gold | `--gold` | #C88C2C | Primary accents, borders |
| Dark Gold | `--gold-d` | #A06E10 | Hover, press states |
| Light Gold | `--gold-l` | #E4AA50 | Highlights, secondary accents |
| Extra-Light Gold | `--gold-xl` | #F2CA78 | Glows, very light accents |
| Border | `--border` | rgba(196, 136, 44, .14) | Subtle dividers |
| Border Hover | `--border-h` | rgba(196, 136, 44, .43) | Interactive border highlight |
| Shadow | `--sh` | 0 2px 20px rgba(0,0,0,.5) | Standard drop shadow |
| Shadow Hover | `--sh-h` | 0 14px 52px rgba(0,0,0,.7), 0 0 0 1px rgba(196, 136, 44, .15) | Elevated hover |
| Modal Shadow | `--sh-modal` | 0 40px 120px rgba(0,0,0,.88) | Deep modal shadow |
| WhatsApp Green | `--wa-green` | #25D366 | WhatsApp brand color |

**Note:** Use CSS variables everywhere. Never hardcode colors.

---

## Typography

### Typefaces

| Font | Weights | Use |
|------|---------|-----|
| **Cinzel** | 600, 700, 900 | Display, hero title, section headings, brand name |
| **Cormorant Garamond** | 300, 400, 600 (normal + italic) | Body copy, product descriptions, editorial text |
| **Jost** | (system fallback) | UI labels, button text, chat widget, nav links |

All fonts loaded from Google Fonts CDN with `display=swap` strategy.

### Type Scale

| Element | Font-Family | Size | Weight | Letter-Spacing | Line-Height |
|---------|------------|------|--------|-----------------|------------|
| Hero Title | Cinzel | clamp(28px, 8vw, 64px) | 900 | 0.09em | 1.1 |
| Section H2 | Cinzel | clamp(24px, 5vw, 48px) | 700 | 0.05em | 1.15 |
| Label / Card Title | Cinzel | 18px | 700 | 0.08em | 1.3 |
| Body | Cormorant Garamond | 16px | 400 | 0 | 1.6 |
| Body Bold | Cormorant Garamond | 16px | 600 | 0 | 1.6 |
| Caption | Cormorant Garamond | 14px | 300 | 0 | 1.5 |
| UI Label | Jost (system fallback) | 12px | 600 | 0.05em | 1.4 |
| Button | Jost (system fallback) | 14px | 600 | 0 | 1.4 |

### Font Strategy

- Cinzel: Draw attention, convey luxury & permanence
- Cormorant Garamond: Elegant, readable, editorial authority
- Jost: Clean, modern UI (not imported — acceptable system fallback)

**iOS Input Fix:** Chat input font-size = 16px prevents iOS auto-zoom on textarea focus.

---

## Spacing System

**8px baseline grid.** All spacing is a multiple of 8:

```
4px    → micro-gaps (rare)
8px    → tight spacing (gaps, padding-xs)
16px   → standard gap (default card padding, carousel gap)
24px   → comfortable spacing (section margin-bottom)
32px   → breathing room (padding-x)
44px   → section top padding (mobile)
56px   → section padding (tablet+)
80px   → section padding (desktop default)
100px  → section padding (large screens)
```

**Padding / Margin Guidelines:**
- Product cards: `padding: 16px`
- Sections: `padding: clamp(44px, 10vw, 100px) 24px` (vertical scales with viewport)
- Hero buttons: `padding: 12px 24px`
- Modal: `padding: 24px 20px` (mobile), `padding: 32px 28px` (desktop)
- Chat input: `padding: 8px 12px`

---

## Shadow System

**Use CSS variables only:**

| Variable | Usage |
|----------|-------|
| `var(--sh)` | Cards at rest, buttons, modals baseline |
| `var(--sh-h)` | Cards on hover, elevated interactive states |
| `var(--sh-modal)` | Full-screen overlays, deep modals |

Never hardcode `box-shadow` with RGB values.

---

## Component Rules

### Cards (Product Cards)

- Layout: `display: flex; flex-direction: column`
- Border: `1px solid var(--border)` on rest, `var(--border-h)` on hover
- Shadow: `var(--sh)` on rest, `var(--sh-h)` on hover
- Padding: `16px`
- Gap between image and text: `12px`
- Image: `aspect-ratio: 1; object-fit: cover; width: 100%`
- Title: Cinzel 700, `--txt`
- Price: Cormorant Garamond 400, `--txt2`
- Description: Cormorant Garamond 300, `--txt3`, max 2 lines
- Badge: Cinzel 600 12px, `--gold`, uppercase
- CTA button: Ghost theme (border + transparent bg), Jost 14px 600

### Buttons

**Ghost Theme** (default):
- Border: `1px solid var(--gold)`
- Background: `transparent`
- Color: `var(--gold)`
- Padding: `12px 24px`
- Hover: `background: var(--gold); color: var(--btn-fg)` or `border-color: var(--gold-l)`
- Transition: `0.3s ease`
- No rounded corners (luxury → sharp edges, `border-radius: 0` or `1px`)

**Primary CTA** (rare):
- Background: `var(--gold)`
- Color: `var(--btn-fg)`
- Border: none
- Hover: `background: var(--gold-l)`

**WhatsApp Button**:
- Background: `var(--wa-green)`
- Color: white
- Border: none
- Icon: white SVG (18px)
- Padding: `8px 12px`

### Modals

- Overlay: `background: rgba(0, 0, 0, 0.88)`
- Modal box: `background: var(--modal-bg); border-radius: 8px; padding: 24px`
- Shadow: `var(--sh-modal)`
- Desktop: centered, max-width 680px
- Mobile (<600px): full-screen, `position: fixed; inset: 0; border-radius: 0; slide-up animation (translateY 100% → 0)`
- Gallery nav arrows: Cinzel 700, `--gold`, centered
- Gallery counter: Cormorant Garamond 300, `--txt2`, right-aligned
- Close button: `×` (Cinzel 700 24px), top-right, 16px from edge

### Carousels

- Track gap: `16px`
- Cards per page: 4 desktop (>1100px) / 3 tablet (700–1100px) / 2 mobile (<700px)
- Navigation: dots (gold on active, `--border` inactive) + prev/next buttons
- Pagination label: "1–4 of 12" format, Cormorant Garamond 300, `--txt2`
- Snap: smooth `transform: translateX()`, transitions on `0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)` (custom easing)
- Touch support: 44px swipe threshold, left/right navigation
- Resize behavior: recalculates `vis` and re-renders on window resize (no debounce)

### Chat Widget

- Trigger button: `position: fixed; bottom: 80px; right: 16px; padding: 14px 16px; border-radius: 24px`
- Trigger background: `backdrop-filter: blur(14px); background: rgba(196, 136, 44, 0.05)`
- Trigger border: `1px solid var(--gold)`
- Popup: `position: fixed; bottom: 140px; right: 16px; width: 370px; height: 540px; border-radius: 12px` (desktop)
- Popup mobile (<600px): full-screen `inset: 0; border-radius: 0; slide-up transform`
- Header: gold avatar, "LUVZ Stylist" label, close button
- Messages: left-aligned bot, right-aligned user, `max-width: 86%`
- Typing indicator: three-dot animation
- Input: Jost 14px, `padding: 8px 12px; font-size: 16px` (iOS fix)
- Send button: 42×42px, gold background, white icon, Jost 14px
- z-index: 9998 (desktop), 99999 (mobile to sit above fixed nav)

### Navigation

- Desktop nav: `position: fixed; top: 0; width: 100%; z-index: 90; background: linear-gradient(180deg, rgba(18,13,8,.64), rgba(18,13,8,.46))`
- Mobile nav: hamburger icon (desktop hidden ≤900px), full-screen overlay menu (mobile)
- Mobile bottom nav: `position: fixed; bottom: 0; width: 100%; height: 56px; flex-row spacing`
- Active link indicator: gold underline or text color
- Logo: 40px (mobile), 48px (desktop), animated float on hover

---

## Motion & Animation

### Animation Principles

- **Entrance:** Fade-up on scroll (`.reveal` class → opacity 0→1, translateY 20px→0)
- **Hover:** Smooth border/shadow transitions (0.3s ease)
- **Carousel:** Snap-scroll (0.4s cubic-bezier)
- **Hero:** Parallax on scroll (desktop only, 0.28px per scroll-px), particle glow pulse
- **3D Vault:** Continuous rotation (requestAnimationFrame), depth dimming on angle
- **Text shimmer:** Gold gradient slide (`.gold-text` animation, letter-delay stacking)

### Keyframe Library

| Animation | Duration | Easing | Use |
|-----------|----------|--------|-----|
| `lcFadeUp` | 0.8s | ease-out | Hero content entrance |
| `lcImageFloat` | 2.8s | ease-in-out | Hero image subtle float |
| `lcAmbientScale` | 4s | ease-in-out (infinite) | Ambient glow blob pulse |
| `skWave` | 1.6s (infinite) | linear | Gold text shimmer |
| `prismSpin` | 3s (infinite) | linear | Prism spinning border |
| `logoFloat` | 3s (infinite) | ease-in-out | Nav logo vertical float |
| `chevBounce` | 0.8s (infinite) | ease-in-out | Scroll indicator chevron |
| `lcShimmerSweep` | 0.6s | ease-in-out | Button hover shimmer |
| `mPop` | 0.35s | cubic-bezier(0.34, 1.56, 0.64, 1) | Modal pop-in |
| `mSlide` | 0.4s | cubic-bezier(0.25, 0.46, 0.45, 0.94) | Mobile modal slide-up |

### Accessibility

**Respect `prefers-reduced-motion: reduce`:**
```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

Disable: vault rotation, hero parallax, text shimmer, ambient glows, all entrance animations.

**Mobile Touch:**
- `@media (hover: none)` — disable prism/bloom/sweep GPU effects
- `@media (hover: hover)` — enable hover-only states
- Prevents janky animations on touch devices

---

## Responsive Breakpoints

| Breakpoint | Context | Changes |
|-----------|---------|---------|
| < 480px | Mobile small | Carousel 50% - 6px, FWA button 32px, nav padding 14px |
| 480–600px | Mobile | Modal full-screen, chat 100% viewport, hero buttons stack |
| 600–768px | Tablet small | Carousel 2 cards, input flex-column, category grid 2 cols |
| 768–1100px | Tablet | Carousel 3 cards, animations disabled (particles off), hero simplified |
| > 1100px | Desktop | Carousel 4 cards, parallax enabled, vault 3D active |

**Test these boundaries actively** — carousel math is fragile at 700px and 1100px.

---

## Image Handling

- **Product images:** Responsive srcset via jsDelivr CDN, widths 400/600/800w
- **Hero image:** `loading="eager" fetchpriority="high"`
- **About/Heritage images:** lazy loading via Intersection Observer (planned)
- **Format:** WebP preferred (logo_gif.webp), PNG fallback (hero_image.png)
- **Aspect ratios:** Product cards 1:1 (square), hero 16:9 (responsive)

---

## Accessibility

- **Input field minimum 16px font** (iOS auto-zoom prevention)
- **Safe-area insets** for notch/home-indicator on mobile
- **Color contrast:** Primary text on dark background meets WCAG AA (4.5:1)
- **Focus states:** Gold border or outline on tab/keyboard navigation
- **Aria labels:** Buttons, icons, form inputs have descriptive text
- **Semantic HTML:** Headings, lists, links (not divs) for screen readers
- **Animations disabled** on `prefers-reduced-motion: reduce`

---

## Performance Considerations

### Frontend (Cloudflare Pages)
- **CSS:** Single inline `<style>` block (no CSS-in-JS, no external sheets except chat)
- **Images:** Responsive srcset, lazy loading where possible, WebP with PNG fallback
- **Fonts:** Google Fonts with `display=swap` (system font shown until loaded)
- **Animations:** GPU-safe transitions (`transform`, `opacity` only)
- **Avoid:**
  - Layout shifts (lock dimensions, use `aspect-ratio`)
  - JavaScript-driven animations (use CSS `@keyframes`)
  - Synchronous DOM queries in loops

### Backend (Local Ollama on ARM)
- **Optimize for local inference:** Prioritize small context windows to stay within ARM resource limits
- **Embeddings:** Batch sentence-transformers queries where possible
- **Model size:** luvz-fast (Llama 3.2 1B) chosen specifically for ARM performance
- **Cache:** Pre-cache frequent product embeddings and keep vector DB indexed
- **Monitor:** Track CPU/memory usage during inference; implement request queuing if needed
- **No cloud APIs:** All processing is local; network latency only from frontend → FastAPI

---

## Design Debt / Future Work

- Jost font not loaded — all UI text falls back to system sans-serif (acceptable, but inconsistent)
- CSS @keyframes duplicates (same animation defined twice, last wins) — consolidate eventually
- Mobile chat trigger hidden on <768px — only accessible via programmatic `openLuvzChat()` call
- No loading skeleton states (FCP/LCP feels slow)
- Product image lazy loading not yet implemented (all images eager-load)
