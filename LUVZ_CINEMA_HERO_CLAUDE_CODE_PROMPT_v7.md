# LUVZ Collection — Cinematic Hero Implementation Prompt
## For Claude Code · Vanilla JS · No Build Step · Shopify via Cloudflare Pages
## Version 7 — Updated per team feedback review

---

## CHANGELOG — v6 → v7

Eight targeted additions based on team feedback review. All v6 changes preserved. No structural phase changes — additions are integrated into existing phases.

| # | Change | Location |
|---|--------|----------|
| 1 | **Mask + transform DOM split (STRONGLY RECOMMENDED):** `.luvz-cin-jewelry` split into two elements — `.luvz-cin-jewelry` owns transforms/opacity, new `.luvz-cin-mask` inner wrapper owns mask on `img`. Reduces compositor instability on Intel GPUs and Safari dramatically. Implement by default; may be skipped only if Phase 2 Gate compositor audit confirms clean layer separation without it. | Phase 2 DOM + CSS |
| 2 | **`contain` strategy audit:** `contain: layout paint style` added to `.luvz-cin-stage` and `.luvz-cin-glow` only. Explicitly excluded from `#hero`, animated text, transition layer. Checklist item added to verify it does not clip glow overflow or masks. | Phase 2 CSS |
| 3 | **Safari mask prefix hardening:** `-webkit-mask-image`, `mask-repeat: no-repeat`, `mask-size: cover` now explicit on `.luvz-cin-mask` wrapper. Prevents Safari tiling on gradient masks. | Phase 2 CSS |
| 4 | **Nav scroll listener ownership rule:** explicit checklist item — only ONE system may animate nav opacity/background. Guards against `existing nav scroll listener + cinema observer + mobile menu state` triple-write regression. | Audit 1 + Phase 2 nav CSS |
| 5 | **Lenis lifecycle hardening — overlay state manager:** Integrated directly into `app.js` open/close handlers as the single source of truth. A shared `window.__luvzLenisOverlays` Set tracks active overlays; `app.js` writes to it and calls `window.__luvzPauseLenis()` / `window.__luvzResumeLenis()` (exposed by `luvz-cinema.js`). Lenis resumes only when ALL overlays are closed. | Phase 3 JS + `app.js` |
| 6 | **Cursor GPU safety:** `filter: blur()` and animated `box-shadow` on cursor elements explicitly prohibited. Documented in cursor CSS and Phase 4 gate. | Phase 4 CSS + gate |
| 7 | **CLS guard for hero image:** `width` and `height` attributes required on `<img>` element. Prevents layout shift before CSS applies even with `fetchpriority="high"`. | Phase 2 DOM |
| 8 | **Mobile fallback philosophy locked:** explicit prohibition on mobile parallax, touch-reactive cursor, inertial scroll choreography, and layered blend experiments. Preserves editorial tone on mobile. | Absolute constraints |

---

## CHANGELOG — v5 → v6

| # | Change | Location |
|---|--------|----------|
| 1 | **`gsap.config({ force3D: false })`:** Added immediately after `gsap.registerPlugin(ScrollTrigger)`. Prevents GSAP from silently promoting compositor layers during transform animations. | Phase 3 IIFE |

---

## CHANGELOG — v4 → v5

| # | Change | Location |
|---|--------|----------|
| 1 | **IIFE return safety:** Replaced bare `return` guards in Phase 4 cursor system with single `if` conditional block. | Phase 4 JS |
| 2 | **Merged mousemove handlers:** Two separate `mousemove` listeners collapsed into one. | Phase 4 JS |
| 3 | **Micro-float ScrollTrigger pause guard:** Added `ScrollTrigger.create` pause/resume block inside entrance timeline's `.call()`. | Phase 3 JS |
| 4 | **Nav observer before reduced-motion guard:** Nav `IntersectionObserver` moved before `if (IS_MOBILE || REDUCED) return`. | Phase 3 IIFE opening |

---

## READ THIS ENTIRE FILE BEFORE TOUCHING ANY CODE

This prompt is the result of a fully approved cinematic art direction process. Every value, class name, file path, and constraint has been deliberately chosen. Do not improvise substitutions. Do not add features not listed. Do not remove features that are listed. If you are uncertain about anything, stop and ask before proceeding.

**Approved creative direction:** Cartier restraint (surgical spacing, weighted motion, intentional silence) with Sabyasachi atmospheric richness (burgundy silk, emerald shadow, warm gold). The hero is a cinematic threshold, not an ecommerce banner.

---

## Project Context

**Repo:** `n8nintegrationai/luvz-collection-dev`
**Live site:** `https://www.luvzcollection.com`
**Stack:** Vanilla JS, HTML5, CSS3. No React. No npm. No build step. Hosted on Cloudflare Pages.
**Key files:**
- `public/index.html` — all HTML structure + ALL CSS in one `<style>` block (259KB). This is the source of truth.
- `public/app.js` — all product/carousel/modal/wishlist/vault logic
- `public/luvz-chat.js` — chat widget (must load after app.js)
- `public/data/products.json` — product catalog

**Hero image:** `public/hero_image.webp` — an ornate Indian choker necklace with silver filigree, kundan stones, emerald-green jewels, and dark green pearl fringe. Shot on rich burgundy/maroon silk fabric with subtle gold traditional pattern. Dramatic low-key lighting. This image is the hero. Do not replace it or rename it.

---

## HERO IMAGE TREATMENT

The jewelry image must feel: **sculptural, museum-lit, heavy, dimensional, tactile, sacred, emotionally expensive.**

Shadows must dominate more than highlights. The piece should feel weighty — not photographed, but *revealed*.

**The image must NOT feel:**
- Ecommerce-photographed or catalog-like
- Evenly lit or digitally overprocessed
- Glamour-shot styled
- "Product on white background" energy, even with a colored background

**The mask treatment (Phase 2) is critical to this:** the radial mask must allow the burgundy silk to dissolve imperceptibly into the page's #141008 ground. The jewelry emerges from darkness — it is not placed on top of a background. If the photograph's edge is visible at any point, the mask needs tightening.

---

## NAV / HERO RELATIONSHIP

This is a critical editorial decision. Without it, you risk: *beautiful hero + ordinary navbar sitting on top of it.* That breaks the illusion immediately.

**Required nav behavior:**
- `#nav` must be **transparent** while the hero is fully in view — no background color, no border. The nav floats over the cinematic darkness invisibly.
- Nav background fades in (solid or semi-opaque) only as the user scrolls and the hero begins to leave — triggered via `IntersectionObserver` or a scroll threshold, NOT via the hero's GSAP timeline.
- Logo and nav text must be **light** (ivory/gold-adjacent) against the dark hero — not black or dark-on-dark. Confirm the existing nav text color works against #141008.
- The nav does NOT participate in the cinematic entrance animation — it is always present and always above the hero (z-index above all `.luvz-cin-*` elements).

**Nav scroll listener ownership — critical rule (v7 addition):**

> **Only ONE system may animate nav opacity/background at any time.** The cinema observer, any existing nav scroll listener, and mobile menu state must NOT overlap in control. Before adding the cinema nav observer, confirm that the existing `app.js` nav scroll listener (if any) is suppressed or deactivated while `.luvz-cin-nav-transparent` is active. If two systems both write to `#nav` background, they will fight — producing flicker during scroll or incorrect nav appearance after modal close.

**Implementation (already included in Phase 3's IIFE structure — at the top, before the `IS_MOBILE || REDUCED` guard):**

> **Critical placement:** The nav observer must run **before** `if (IS_MOBILE || REDUCED) return`. Nav transparency is a layout state, not an animation. If it runs after the guard, reduced-motion and mobile users permanently see the default nav background over the dark hero.

```javascript
  // ── Nav Transparency — runs BEFORE reduced-motion / mobile guard ─────────────
  const nav = document.getElementById('nav');
  if (nav) {
    const heroForNav = document.getElementById('hero');
    if (heroForNav) {
      const navIO = new IntersectionObserver(function ([entry]) {
        if (entry.isIntersecting) {
          nav.classList.add('luvz-cin-nav-transparent');
        } else {
          nav.classList.remove('luvz-cin-nav-transparent');
        }
      }, { threshold: 0.1 });
      navIO.observe(heroForNav);
    }
  }

  // if (IS_MOBILE || REDUCED) return; ← nav observer must be above this line
```

**Required CSS (add inside Cinema CSS block):**
```css
/* ── Nav transparency over hero ── */
#nav.luvz-cin-nav-transparent {
  background: transparent !important;
  background-color: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border-bottom-color: transparent !important;
  box-shadow: none !important;
  transition: background 0.6s ease, border-color 0.6s ease, box-shadow 0.6s ease;
}
#nav {
  transition: background 0.6s ease, border-color 0.6s ease;
}
```

**If the nav has a mobile media query with its own background override**, add a matching mobile override:
```css
@media (max-width: 768px) {
  #nav.luvz-cin-nav-transparent {
    background: transparent !important;
  }
}
```

Verify by toggling the class in DevTools with the hero visible. The nav should become completely invisible against the dark hero. If any panel, blur, or border remains visible, hunt down the CSS source and add it to the override block.

---

## ABSOLUTE CONSTRAINTS — NEVER VIOLATE THESE

### IDs that must never be renamed or removed:
```
#hero
#nav
#mob-menu
#moverlay
#luvz-chat-trigger
#luvz-chat-popup
#cat-bento
#vault-scene
#hero-particles-canvas   ← REMOVE this element entirely (dead code)
#top-sellers
#new-collection
#categories
#heritage
```

### Classes that must never be renamed:
```
.reveal              (IntersectionObserver trigger — used by app.js)
.gold-text           (shimmer animation — used site-wide)
.lc-fade-up          (hero animation hook — repurposed, not deleted)
.lc-ambient-glow     (hero animation hook — repurposed, not deleted)
.stagger-text        (remove the inline JS stagger logic; keep the class on elements if present)
.pcard .pcard-wish .pcard-btn
.luvz-*              (all chat widget classes)
```

### All new cinema elements must use the `.luvz-cin-*` prefix:
```
.luvz-cin-stage
.luvz-cin-jewelry        ← outer wrapper: owns transforms + opacity
.luvz-cin-mask           ← STRONGLY RECOMMENDED inner wrapper: owns mask on img (v7)
                            May be omitted only if Phase 2 compositor audit confirms no rasterization issue
.luvz-cin-glow
.luvz-cin-grain
.luvz-cin-text
.luvz-cin-transition
.luvz-cin-cursor-dot
.luvz-cin-cursor-ring
.luvz-cin-nav-transparent
```

### CSS file rule:
All cinema styles go inside the **existing** `<style>` block in `index.html`. Do NOT create a new `.css` file. Wrap all new cinema CSS between these comment fences:
```css
/* ── CINEMA HERO START ── */
...
/* ── CINEMA HERO END ── */
```

### New JS file:
Create `public/luvz-cinema.js`. Load it in `index.html` after `app.js` and `luvz-chat.js`, and after the CDN script tags for GSAP/ScrollTrigger/Lenis.

### Load order in index.html (bottom of `<body>`):
```html
<!-- existing scripts — do not reorder -->
<script src="app.js"></script>
<script src="luvz-chat.js"></script>

<!-- NEW: Cinema dependencies (CDN) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>

<!-- NEW: Cinema module (last) -->
<script src="luvz-cinema.js"></script>
```

### Sections below the hero:
Do not touch the Shop by Category bento, carousels, vault, chat widget, wishlist, modal system, hash routing, or any section below `#hero`. The cinematic transition effect is achieved entirely within `#hero` using a gradient overlay div — not by modifying anything below.

### Parallax restraint:
All parallax movement must remain subtle. Users should **feel** depth before consciously noticing movement.

### Scroll behavior constraint:
Scrolling must always feel **user-controlled**. The hero responds to scroll elegantly, but never traps, delays, hijacks, or resists user momentum.

### Mobile fallback philosophy — LOCKED (v7 addition):
The mobile approach is intentionally restrained: no GSAP, no custom cursor, CSS-only fade, static luxury composition. This restraint is the right decision for this brand direction and performance budget.

> **Do NOT implement any of the following on mobile under any circumstances:**
> - Mobile parallax of any kind
> - Touch-reactive cursor logic
> - Inertial scroll choreography
> - Layered blend mode experiments
>
> The current approach preserves the editorial tone. Any of the above would introduce performance risk and dilute the luxury atmosphere on the exact devices where it matters most.

---

## PHASE 1 — Surgery: Remove Dead Code & Isolate Hero

**Goal:** Clean the existing hero system without breaking anything. No visual changes yet.

### Step 1.1 — Remove dead particle code from `app.js`

Search for `initHeroParticles` in `app.js`. You will find a function wrapped in an immediate `return` statement — approximately 140 lines of dead code. Remove the entire function body and its `return` wrapper. The canvas element `#hero-particles-canvas` in `index.html` should also be removed from the DOM.

Verify: after removal, search for any remaining references to `initHeroParticles` or `#hero-particles-canvas` — there should be none.

### Step 1.2 — Fix the hero RAF memory leak in `app.js`

Find the `requestAnimationFrame(tick)` hero parallax/scroll loop. It currently runs forever. Wrap it with an `IntersectionObserver` on `#hero`:

```javascript
const heroEl = document.getElementById('hero');
if (heroEl) {
  const heroIO = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      if (!heroRAFRunning) { heroRAFRunning = true; requestAnimationFrame(tick); }
    } else {
      heroRAFRunning = false;
    }
  }, { threshold: 0 });
  heroIO.observe(heroEl);
}
```

Add a `let heroRAFRunning = true;` flag. Inside the `tick` function, add at the very top: `if (!heroRAFRunning) return;`.

### Step 1.3 — Remove inline stagger-text JS from hero

Find any inline `setTimeout`/`classList.add` stagger logic in `index.html` or `app.js` that drives `.stagger-text` elements inside `#hero`. Remove that JS logic only. Keep the `.stagger-text` class on the HTML elements — GSAP will animate them in Phase 3.

### Step 1.3b — Exclude `.luvz-cin-*` nodes from the `.reveal` IntersectionObserver

Add a defensive filter to the observer callback:

```javascript
// Inside the existing .reveal IntersectionObserver callback in app.js:
if (entry.target.closest('#hero')) return; // cinema hero — GSAP owns all motion inside #hero
```

### Step 1.4 — Create file scaffolding

1. Add CSS comment fences to `index.html` style block (empty for now):
```css
/* ── CINEMA HERO START ── */

/* ── CINEMA HERO END ── */
```

2. Create `public/luvz-cinema.js` with this skeleton only:
```javascript
// luvz-cinema.js — Cinematic Hero System
// Depends on: GSAP, ScrollTrigger, Lenis (loaded via CDN before this file)
// Must load after: app.js, luvz-chat.js
// Do not reference any app.js internals from this file.

(function () {
  'use strict';

  const IS_TOUCH = 'ontouchstart' in window;
  const IS_MOBILE = window.innerWidth <= 768;

  // Phases 2–4 implementation goes here

})();
```

3. Add CDN script tags + `<script src="luvz-cinema.js"></script>` to `index.html` in the load order specified above.

### Step 1.5 — Neutralize legacy hero CSS contamination

Search the existing `<style>` block for all rules targeting `#hero`, `.lc-fade-up`, `.lc-ambient-glow`, and `.stagger-text`. For each:

| Legacy rule | Action |
|-------------|--------|
| `#hero` opacity, transform, animation, or transition properties | Remove or nullify. `luvz-cinema.js` owns all hero motion. |
| `.lc-fade-up` opacity: 0 / transform / animation | Remove animation/transition. Keep the class — GSAP will set initial state via `gsap.set()`. |
| `.lc-ambient-glow` opacity / animation | Remove. GSAP owns glow opacity. |
| `.stagger-text` opacity: 0 | Keep the class, keep opacity: 0 — GSAP will animate it. But remove any existing CSS `animation:` or `transition:` on it. |
| Any `@keyframes` targeting hero elements | Remove entirely. |
| Any `#hero *` wildcard rules affecting opacity or transform | Audit and remove if cinema-targeted. |

**Do not remove:** layout properties (`display`, `position`, `width`, `height`, `z-index`), color, font, or anything that doesn't touch opacity/transform/animation on the hero's visual elements.

### Phase 1 Gate — Run before proceeding:
- [ ] Carousel works at 700px and 1100px viewport widths
- [ ] Product modal opens via hash routing
- [ ] Wishlist heart toggle and drawer open correctly
- [ ] Chat widget opens and SSE stream works
- [ ] No console errors on page load
- [ ] No `initHeroParticles` references remain
- [ ] Hero RAF stops firing when user scrolls past hero (verify in Chrome Performance tab)
- [ ] **Legacy CSS neutralized:** hero image appears at natural opacity with no CSS-driven fade-in, transforms, or animation
- [ ] **`.reveal` observer guard confirmed:** `entry.target.closest('#hero') return` guard exists in `app.js` observer callback

---

## PHASE 2 — Structure & Atmosphere: HTML + CSS

**Goal:** Rebuild the hero's inner HTML structure and write all CSS.

### Step 2.1 — Rebuild `#hero` inner HTML

Replace the existing content inside `#hero` (keep the `#hero` div itself) with this structure:

```html
<div id="hero">

  <!-- Atmospheric glow layer (behind jewelry) -->
  <div class="luvz-cin-glow" aria-hidden="true"></div>

  <!-- Jewelry image (the hero piece) -->
  <div class="luvz-cin-stage">
    <!--
      v7 ARCHITECTURE — MASK + TRANSFORM SEPARATION (STRONGLY RECOMMENDED):
      .luvz-cin-jewelry  → owns transforms (translateY, scale) and opacity
      .luvz-cin-mask     → inner wrapper, owns mask-image on the img

      WHY THIS MATTERS:
      When mask, animated transform, and opacity all live on the same compositor
      layer, integrated GPUs and Safari must re-rasterize on every transform frame.
      Separating ownership means:
        - .luvz-cin-jewelry can animate freely without invalidating the mask raster
        - .luvz-cin-mask holds a stable mask layer that is composited, not re-painted
      This is the single highest-risk area for Safari flicker and Intel GPU spikes.

      WHEN YOU MAY SKIP THIS SPLIT:
      After writing Phase 2 CSS with the single-element approach (mask on
      .luvz-cin-jewelry directly), run the Phase 2 Gate compositor audit:
        Chrome DevTools → Layers panel → scroll hero → watch .luvz-cin-jewelry
      If the layer does NOT flash green (re-rasterize) during scroll, the single-
      element approach is stable on your hardware and you may proceed without the
      split. If it DOES flash green, implement the split before continuing.
      Test on Chrome on an Intel-GPU Windows machine if possible — that is the
      highest-risk environment for this issue.
    -->
    <div class="luvz-cin-jewelry">
      <div class="luvz-cin-mask">
        <img
          src="hero_image.webp"
          alt="LUVZ Collection — Handcrafted Indian Choker Necklace"
          draggable="false"
          fetchpriority="high"
          width="1200"
          height="1600"
        />
        <!-- width + height attributes required for CLS prevention (v7).
             Even with fetchpriority="high", the browser cannot reserve layout space
             until it knows intrinsic dimensions. Without these, the image will shift
             the layout on load, producing a CLS hit in Lighthouse.
             Values should match the actual intrinsic dimensions of hero_image.webp.
             Update if the file is replaced. -->
      </div>
    </div>
  </div>

  <!-- Brand wordmark -->
  <div class="luvz-cin-text" aria-label="LUVZ Collection">
    <span>LUVZ</span>
  </div>

  <!-- Transition gradient (fades hero into next section) -->
  <div class="luvz-cin-transition" aria-hidden="true"></div>

  <!-- Filmic grain — 2–3% opacity animated noise. Cinematic texture, not visible effect. -->
  <div class="luvz-cin-grain" aria-hidden="true"></div>

  <!-- Preserve any existing WhatsApp CTA button if present in original HTML -->
  <!-- Keep it here, it will be repositioned via CSS -->

</div>

<!-- Custom cursor elements — placed on <body>, NOT inside #hero -->
<!-- Fixed position elements inside #hero with transformed ancestors can create -->
<!-- stacking context bugs in Safari. Body-level placement avoids this entirely. -->
<div class="luvz-cin-cursor-dot" aria-hidden="true"></div>
<div class="luvz-cin-cursor-ring" aria-hidden="true"></div>
```

**Important:** If the original `#hero` contained a WhatsApp CTA button, preserve it inside `#hero`. Do not remove it.

### Step 2.2 — Write Cinema CSS block

Insert the following between the `/* ── CINEMA HERO START ── */` and `/* ── CINEMA HERO END ── */` fences:

```css
/* ── CINEMA HERO START ── */

/* ── z-index Hierarchy — Do Not Alter Without Updating This Map ──
   1   .luvz-cin-glow        atmospheric glow (behind everything)
   2   .luvz-cin-stage       jewelry stage wrapper
   4   .luvz-cin-text        LUVZ wordmark
   5   .luvz-cin-transition  scroll-out gradient
   6   .luvz-cin-grain       filmic grain overlay
   100 .luvz-cin-cursor-dot  gold cursor dot
   100 .luvz-cin-cursor-ring cursor ring
── */

/* ── Hero Foundation ── */
#hero {
  position: relative;
  width: 100%;
  min-height: 100svh;  /* svh = stable viewport height — immune to iOS Safari URL bar collapse */
  /* Progressive enhancement: dvh tracks the bar in real time (only if dynamic height is desired) */
  /* min-height: 100dvh; */
  min-height: 600px; /* absolute floor */
  background: #141008;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: none;
  /* ACCESSIBILITY: cursor:none validated against Firefox, Windows High Contrast Mode,
     keyboard navigation, and prefers-reduced-motion (see Phase 4 gate).
     If any accessibility issue is found: restore cursor:auto on #hero and remove the
     custom cursor system entirely rather than patching individual cases. */
}

/* ── Atmospheric Glow (Sabyasachi atmosphere layer) ── */
.luvz-cin-glow {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  background:
    radial-gradient(
      ellipse 55% 50% at 50% 48%,
      rgba(90, 32, 18, 0.18) 0%,
      rgba(42, 18, 8, 0.12) 35%,
      rgba(14, 28, 20, 0.10) 60%,
      transparent 100%
    );
  will-change: transform, opacity;
  /* contain: layout paint style applied below — reduces paint propagation during scroll */
  contain: layout paint style;
  /* VERIFY: confirm contain does not clip the glow gradient overflow.
     If glow appears cropped at edges, remove contain from this element only. */
}

/* ── Jewelry Stage ── */
.luvz-cin-stage {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  /* contain: layout paint style applied — reduces paint propagation during scroll */
  contain: layout paint style;
  /* VERIFY: confirm contain does not clip the jewelry or mask at stage edges.
     If jewelry appears clipped, remove contain from this element only. */
}

/* ── Jewelry Wrapper — owns transforms and opacity ONLY (v7 split) ── */
/* ART-DIRECTION NOTE: width 52% is the starting value. On live review, you may find:
   - 13" laptops / MacBook Air: may need 48–50% for better negative space
   - 1440px+ ultrawides: may feel dominant — reduce to 48%
   These are composition decisions that require real device art-direction review. */
.luvz-cin-jewelry {
  position: relative;
  width: 52%;
  max-width: 560px;
  min-width: 300px;
  opacity: 0;           /* animated to 1 by GSAP */
  transform: translateY(20px); /* animated to 0 by GSAP */
  will-change: transform, opacity;
  pointer-events: auto; /* hover target zone */
}

/* ── Mask Wrapper — owns mask on img ONLY (v7 addition) ── */
/* ARCHITECTURAL RULE: .luvz-cin-mask must never have transforms or opacity animation.
   It exists solely to hold the mask layer in a stable compositor state.
   All animation lives on .luvz-cin-jewelry above.
   Collapsing these back into one element reintroduces the mask+transform+opacity
   GPU cost on the same layer — the problem this split was designed to solve. */
.luvz-cin-mask {
  display: block;
  width: 100%;

  /* ── The Seamless World Mask ── */
  /* Prefixed first for Safari compatibility (v7 hardening) */
  -webkit-mask-image: radial-gradient(
    ellipse 72% 68% at 50% 46%,
    black 28%,
    rgba(0,0,0,0.95) 40%,
    rgba(0,0,0,0.7) 55%,
    rgba(0,0,0,0.3) 72%,
    transparent 100%
  );
  /* Unprefixed — modern browsers */
  mask-image: radial-gradient(
    ellipse 72% 68% at 50% 46%,
    black 28%,
    rgba(0,0,0,0.95) 40%,
    rgba(0,0,0,0.7) 55%,
    rgba(0,0,0,0.3) 72%,
    transparent 100%
  );
  /* Safari gradient mask hardening (v7): without these, Safari may tile the mask */
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-composite: source-over;
  mask-composite: add;
}

.luvz-cin-mask img {
  display: block;
  width: 100%;
  height: auto;
  user-select: none;
  pointer-events: none; /* pointer events handled by .luvz-cin-jewelry wrapper */
}

/* ── LUVZ Wordmark ── */
.luvz-cin-text {
  position: absolute;
  bottom: 16%;
  left: 0;
  right: 0;
  z-index: 4;
  text-align: center;
  opacity: 0;
  will-change: opacity;
  pointer-events: none;
}

.luvz-cin-text span {
  font-family: 'Cinzel', Georgia, serif;
  font-weight: 400;
  font-size: clamp(18px, 2.4vw, 38px);
  letter-spacing: 0.28em;
  color: rgba(201, 169, 110, 0.78);
  text-indent: 0.28em;
}

/* ── Transition Gradient (hero → next section) ── */
.luvz-cin-transition {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  z-index: 5;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(20, 16, 8, 0.6) 50%,
    #141008 100%
    /* ← Adjust this final stop to match #top-sellers background per Audit 6 */
  );
  will-change: opacity;
}

/* ── Filmic Atmospheric Grain ── */
/* Barely perceptible animated noise — 2–3% opacity. Cinematic texture.          */
/* LOW-END GPU CAUTION: degrade in order if frame drops on integrated graphics:   */
/*   1. Duration: 0.18s → 0.25s   2. background-size: 200px → 160px             */
/*   3. numOctaves: 4 → 2          4. Last resort: disable via JS media query    */
/* Never reduce opacity below 0.02 — grain becomes pointless below that.          */
.luvz-cin-grain {
  position: absolute;
  inset: 0;
  z-index: 6;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  animation: luvzCinGrainShift 0.18s steps(1) infinite;
  mix-blend-mode: overlay;
}

@keyframes luvzCinGrainShift {
  0%   { background-position: 0 0; }
  25%  { background-position: -60px 40px; }
  50%  { background-position: 40px -60px; }
  75%  { background-position: -80px -30px; }
  100% { background-position: 20px 70px; }
}

/* ── Custom Cursor — Dot ── */
/* Positioned via transform: translate3d() in JS — compositor-only, no layout triggers */
/* GPU SAFETY (v7): No filter: blur() on cursor elements — animated blur on a fixed   */
/* element triggers continuous repaint on some systems. Use static shadow only.        */
/* No animated box-shadow — shadow animation also triggers repaint. If shadow desired, */
/* set it once statically and never animate it. Transform-only animation only here.   */
.luvz-cin-cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  background: rgba(201, 169, 110, 0.9);
  border-radius: 50%;
  z-index: 100;
  pointer-events: none;
  transition: opacity 0.3s ease;
  opacity: 0;
  will-change: transform;
  /* Static subtle shadow only — never animate this property */
  box-shadow: 0 0 4px rgba(201, 169, 110, 0.3);
}

/* ── Custom Cursor — Ring ── */
/* No CSS blur filter on ring. No animated box-shadow on ring.                         */
/* These are set once statically and never transitioned. GPU safety is non-negotiable. */
.luvz-cin-cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  border: 1px solid rgba(201, 169, 110, 0.45);
  border-radius: 50%;
  z-index: 100;
  pointer-events: none;
  opacity: 0;
  /* Static shadow — never animate */
  box-shadow: 0 0 8px rgba(201, 169, 110, 0.15);
  will-change: transform, opacity;
}

/* ── Mobile Override (≤ 768px) ── */
@media (max-width: 768px) {
  #hero {
    height: 100svh;
    min-height: -webkit-fill-available;
    min-height: 580px;
    cursor: auto;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 15%;
  }

  .luvz-cin-jewelry {
    width: 84%;
    max-width: 380px;
    min-width: unset;
    opacity: 1;
    transform: none;
    animation: luvzCinFadeIn 2.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  /* Mobile mask — slightly tighter, applied to .luvz-cin-mask as on desktop */
  .luvz-cin-mask {
    -webkit-mask-image: radial-gradient(
      ellipse 85% 78% at 50% 46%,
      black 30%,
      rgba(0,0,0,0.9) 50%,
      rgba(0,0,0,0.5) 70%,
      transparent 100%
    );
    mask-image: radial-gradient(
      ellipse 85% 78% at 50% 46%,
      black 30%,
      rgba(0,0,0,0.9) 50%,
      rgba(0,0,0,0.5) 70%,
      transparent 100%
    );
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: cover;
    mask-size: cover;
  }

  /* Mobile: subtle jewelry micro-breathe via CSS — no GSAP needed */
  .luvz-cin-mask img {
    animation: luvzCinFadeIn 2.4s cubic-bezier(0.16, 1, 0.3, 1) both, luvzCinFloatMobile 7s ease-in-out 2.4s infinite;
  }

  .luvz-cin-text {
    position: relative;
    bottom: unset;
    margin-top: 8%;
    opacity: 1;
    animation: luvzCinFadeIn 2.4s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
  }

  .luvz-cin-text span {
    font-size: clamp(16px, 5vw, 24px);
    letter-spacing: 0.22em;
  }

  .luvz-cin-glow {
    opacity: 1;
    animation: luvzCinFadeIn 2.4s ease both, luvzCinGlowBreathe 6s ease-in-out 2.4s infinite;
  }

  #hero .hero-whatsapp-btn,
  #hero [href*="wa.me"],
  #hero [href*="whatsapp"] {
    position: absolute;
    bottom: 7%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    opacity: 0.85;
  }

  .luvz-cin-cursor-dot,
  .luvz-cin-cursor-ring {
    display: none;
  }

  .luvz-cin-transition {
    display: none;
  }
}

/* ── Reduced Motion ── */
@media (prefers-reduced-motion: reduce) {
  .luvz-cin-jewelry,
  .luvz-cin-text,
  .luvz-cin-glow {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

/* ── Mobile keyframes (CSS-only, no GSAP on mobile) ── */
@keyframes luvzCinFadeIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes luvzCinGlowBreathe {
  0%, 100% { opacity: 0.85; }
  50%       { opacity: 1; }
}

@keyframes luvzCinFloatMobile {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-5px); }
}

/* ── CINEMA HERO END ── */
```

### Phase 2 Gate — Inspect before proceeding:
- [ ] Hero is dark (#141008) with jewelry image fading into it at edges — no hard rectangular frame visible
- [ ] Burgundy fabric appears to "live inside" the page dark background, not sit on top of it
- [ ] LUVZ text invisible (opacity 0 — correct, GSAP animates it in Phase 3)
- [ ] Jewelry wrapper (`.luvz-cin-jewelry`) and mask wrapper (`.luvz-cin-mask`) both present in DOM — confirm split
- [ ] On mobile (≤768px): jewelry and text both fade in via CSS animation
- [ ] All sections below hero completely unaffected
- [ ] Nav transparent CSS toggled in DevTools — all four suppressions confirmed: background, backdrop-filter, border-bottom, box-shadow
- [ ] **Nav scroll listener ownership confirmed:** no existing `app.js` nav scroll listener is writing to `#nav` background while `.luvz-cin-nav-transparent` is active. If any such listener exists, confirm it is suppressed or checked against the class before writing.
- [ ] **`contain` overflow check:** `.luvz-cin-glow` gradient visible to full edges — not clipped. `.luvz-cin-stage` jewelry not clipped at stage boundaries. If either is clipped, remove `contain` from that element.
- [ ] **Safari mask tiling test:** open in Safari — confirm mask gradient is a smooth radial fade, not a tiled pattern. If tiling is visible, verify `-webkit-mask-repeat: no-repeat` and `-webkit-mask-size: cover` are present on `.luvz-cin-mask`.
- [ ] **Mobile Safari overflow audit:**
  - [ ] iPhone Safari (390px width): no horizontal scroll visible
  - [ ] No masked image overflowing beyond viewport edge
  - [ ] No transform-induced overflow from `.luvz-cin-jewelry` layer
  - [ ] If overflow is present: find the root element causing it via DevTools and fix it directly — do NOT add `body { overflow-x: hidden }` as a global band-aid
- [ ] **Compositor rasterization audit:** Chrome DevTools → Layers panel confirms `.luvz-cin-jewelry` and `.luvz-cin-mask` are on separate compositor layers. Neither is repeatedly re-rasterizing during scroll (flashing green in the Layers panel).

---

## PHASE 3 — Motion System: Lenis + GSAP + ScrollTrigger

**Goal:** Implement the full cinematic motion system in `luvz-cinema.js`.

Write the complete `public/luvz-cinema.js` file as follows:

```javascript
// luvz-cinema.js — Cinematic Hero System
// LUVZ Collection — luvzcollection.com
// Direction: Cartier restraint + Sabyasachi atmosphere
// Dependencies: GSAP 3.12.5, ScrollTrigger, Lenis 1.0.42
// Load order: after app.js, luvz-chat.js, and all CDN scripts

(function () {
  'use strict';

  // ── Guards ──────────────────────────────────────────────────────────────────
  const IS_TOUCH   = 'ontouchstart' in window;
  const IS_MOBILE  = window.innerWidth <= 768;
  const REDUCED    = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Nav Transparency — runs BEFORE reduced-motion guard ─────────────────────
  // Nav transparency is a layout state, not an animation.
  // Reduced-motion and mobile users must still receive the transparent nav.
  const nav = document.getElementById('nav');
  if (nav) {
    const heroForNav = document.getElementById('hero');
    if (heroForNav) {
      const navIO = new IntersectionObserver(function ([entry]) {
        if (entry.isIntersecting) {
          nav.classList.add('luvz-cin-nav-transparent');
        } else {
          nav.classList.remove('luvz-cin-nav-transparent');
        }
      }, { threshold: 0.1 });
      navIO.observe(heroForNav);
    }
  }

  // If mobile or reduced motion: CSS handles all animation. Exit JS here.
  if (IS_MOBILE || REDUCED) return;

  // ── Element refs ────────────────────────────────────────────────────────────
  const hero       = document.getElementById('hero');
  const glow       = document.querySelector('.luvz-cin-glow');
  const jewelry    = document.querySelector('.luvz-cin-jewelry');
  const wordmark   = document.querySelector('.luvz-cin-text');
  const transition = document.querySelector('.luvz-cin-transition');

  if (!hero || !jewelry || !wordmark) return;

  // ── GSAP Plugin Registration ─────────────────────────────────────────────────
  gsap.registerPlugin(ScrollTrigger);

  // ── GSAP Rendering Config ────────────────────────────────────────────────────
  // force3D: false — prevents GSAP from aggressively promoting compositor layers.
  // Aligns with project constraint: no additional translateZ(0) hacks beyond
  // the approved will-change list.
  gsap.config({ force3D: false });

  // ── Lenis Smooth Scroll — HERO-SCOPED ONLY ───────────────────────────────────
  // Lenis is NOT initialized globally. Created when hero enters viewport,
  // destroyed when it leaves. Below the hero: native scroll everywhere.

  function createLenisConfig() {
    return {
      duration: 1.6,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smooth: true,
      smoothTouch: false,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
    };
  }

  let lenis = null;
  let lenisTickerFn = null;

  function startLenis() {
    if (lenis) return;
    lenis = new Lenis(createLenisConfig());
    lenisTickerFn = function (time) { lenis.raf(time * 1000); };
    gsap.ticker.add(lenisTickerFn);
    gsap.ticker.lagSmoothing(0);
  }

  function stopLenis() {
    if (!lenis) return;
    gsap.ticker.remove(lenisTickerFn);
    lenis.destroy();
    lenis = null;
    lenisTickerFn = null;
    window.__luvzLenisOverlays.clear(); // reset overlay state on full hero exit
  }

  startLenis();

  // ── Overlay State Manager — Lenis lifecycle (v7 addition) ───────────────────
  // PROBLEM THIS SOLVES:
  // Lenis retains scroll state while active. If a modal applies body overflow:hidden
  // while Lenis is running, and the modal closes and removes the lock, Lenis and
  // native scroll can desync — producing a scroll position jump on modal close.
  //
  // If multiple overlays stack (modal + drawer, or drawer + mobile nav), independent
  // pause/resume calls can desync — one resumes before the other has finished closing.
  //
  // ARCHITECTURAL DECISION — app.js as single source of truth:
  // The overlay state is owned by app.js, which already contains all modal/drawer/nav
  // open/close logic. luvz-cinema.js exposes two window-level functions that app.js
  // calls directly. This keeps overlay logic in one place and avoids any event
  // indirection that could fire out of order.
  //
  // INTEGRATION REQUIRED IN app.js (see Phase 3 integration section below):
  // Add two lines to each of the six overlay open/close handlers in app.js.

  // Shared overlay tracking Set — visible to both app.js and luvz-cinema.js
  window.__luvzLenisOverlays = window.__luvzLenisOverlays || new Set();

  // Exposed API — called directly by app.js open/close handlers
  window.__luvzOverlayOpen = function (id) {
    window.__luvzLenisOverlays.add(id);
    // Pause Lenis on first overlay open
    if (lenis && window.__luvzLenisOverlays.size === 1) {
      lenis.stop();
    }
  };

  window.__luvzOverlayClose = function (id) {
    window.__luvzLenisOverlays.delete(id);
    // Resume Lenis only when ALL overlays are closed
    if (lenis && window.__luvzLenisOverlays.size === 0) {
      lenis.start();
    }
  };

  // ── IntersectionObserver — scope Lenis + pause animations off-screen ─────────
  let heroVisible = true;
  let microFloatTween = null;
  let cursorActive = false;
  let cursorRAF = null;

  const heroIO = new IntersectionObserver(function ([entry]) {
    heroVisible = entry.isIntersecting;
    if (heroVisible) {
      startLenis();
      if (microFloatTween) microFloatTween.resume();
    } else {
      stopLenis();
      if (microFloatTween) microFloatTween.pause();
      cursorActive = false;
      if (cursorRAF) { cancelAnimationFrame(cursorRAF); cursorRAF = null; }
    }
  }, { threshold: 0 });

  heroIO.observe(hero);

  // ── Initial GSAP States ──────────────────────────────────────────────────────
  // Set before entrance fires — belt + suspenders alongside CSS opacity: 0
  gsap.set(jewelry, { y: 20, opacity: 0 });
  gsap.set(wordmark, { opacity: 0 });
  gsap.set(glow, { opacity: 0 });

  // ── Entrance Timeline ────────────────────────────────────────────────────────
  // Sequence: glow blooms → jewelry rises → wordmark fades in
  // Cartier pacing: nothing rushes. Every beat is deliberate.

  const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });

  entrance
    .to(glow, {
      opacity: 1,
      duration: 2.8,
      ease: 'power2.out',
    }, 0)

    .to(jewelry, {
      y: 0,
      opacity: 1,
      duration: 2.4,
      ease: 'power3.out',
    }, 0.4)

    .to(wordmark, {
      opacity: 1,
      duration: 2.0,
      ease: 'power2.out',
    }, 2.8)

    .call(function () {
      microFloatTween = gsap.to(jewelry, {
        y: 6,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Pause micro-float during scroll to prevent interpolation fighting on 120Hz+
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        onUpdate: function () { if (microFloatTween) microFloatTween.pause(); },
        onLeave: function () { if (microFloatTween) microFloatTween.resume(); },
        onEnterBack: function () { if (microFloatTween) microFloatTween.resume(); },
      });
    });

  // ── ScrollTrigger — Cinematic Scroll Choreography ───────────────────────────
  const scrollTL = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: '+=120%',
      scrub: 1.2,
    }
  });

  scrollTL
    .to(jewelry, {
      y: -70,
      scale: 1.08,
      ease: 'none',
    }, 0)

    .to(wordmark, {
      opacity: 0,
      ease: 'none',
      duration: 0.35,
    }, 0)

    .to(glow, {
      opacity: 0.4,
      scale: 1.04,
      ease: 'none',
    }, 0)

    .to(transition, {
      opacity: 1,
      ease: 'none',
      duration: 0.25,
    }, 0.75);

})();
```

**After writing Phase 3 code, add the overlay integration hooks to `app.js`:**

Locate the six overlay open/close handlers in `app.js` (identified in Audit 7) and add one function call to each. These calls are defensive — `window.__luvzOverlayOpen` and `window.__luvzOverlayClose` only exist after `luvz-cinema.js` loads, so guard each call with a truthiness check:

```javascript
// In modal open handler (app.js) — add immediately after body lock / overlay show:
if (window.__luvzOverlayOpen) window.__luvzOverlayOpen('modal');

// In modal close handler (app.js) — add immediately after body lock removal:
if (window.__luvzOverlayClose) window.__luvzOverlayClose('modal');

// In wishlist drawer open handler (app.js):
if (window.__luvzOverlayOpen) window.__luvzOverlayOpen('drawer');

// In wishlist drawer close handler (app.js):
if (window.__luvzOverlayClose) window.__luvzOverlayClose('drawer');

// In mobile nav open handler (app.js):
if (window.__luvzOverlayOpen) window.__luvzOverlayOpen('mobile-nav');

// In mobile nav close handler (app.js):
if (window.__luvzOverlayClose) window.__luvzOverlayClose('mobile-nav');
```

**Why the truthiness guard:** `app.js` loads before `luvz-cinema.js`. On mobile and reduced-motion devices, `luvz-cinema.js` exits early and never defines these functions. The guard prevents any console errors on those code paths. On desktop with full cinema running, the functions are defined by the time any overlay is opened.

### Phase 3 Gate — Test before proceeding:
- [ ] Entrance plays: glow → jewelry → LUVZ wordmark. Weighted, not instant, not bouncy.
- [ ] Micro-float: 6px sine breathe at 5.5s. No bounce. No jitter.
- [ ] Scroll: three planes separate. LUVZ fades by ~35% scroll. Transition gradient appears at bottom.
- [ ] Scroll feels editorial — not sluggish, not aggressive.
- [ ] Hero scrolled fully out of view: Chrome Performance confirms zero ongoing RAF
- [ ] Lenis inactive below hero (Chrome Performance confirms ticker stopped)
- [ ] **Lenis + modal body-lock test:** with hero partially visible (Lenis active), open a product modal then close it. Confirm no scroll position jump on close.
- [ ] **Overlay state manager test:** open modal, then open wishlist drawer (both open simultaneously). Close drawer. Confirm Lenis does NOT resume while modal is still open. Close modal. Confirm Lenis resumes. No scroll position jump.
- [ ] **Mobile nav Lenis test:** open mobile nav while hero is visible. Confirm Lenis pauses. Close mobile nav. Confirm Lenis resumes.
- [ ] Modal scroll, chat scroll, wishlist drawer: all native, no Lenis interference

---

## PHASE 4 — Premium Details: Cursor + Hover + Final Polish

**Goal:** The custom cursor system and jewelry hover state.

Add the following to `luvz-cinema.js`, inside the IIFE, after Phase 3 code:

```javascript
  // ── Custom Cursor System (Hero-only) ────────────────────────────────────────
  // GPU SAFETY RULES (v7 — non-negotiable):
  //   - NO filter: blur() on cursor elements — animated blur on fixed elements
  //     triggers continuous repaint on some hardware
  //   - NO animated box-shadow on cursor elements — same reason
  //   - Static shadow only (set once in CSS, never transitioned)
  //   - transform-only animation for all cursor motion
  //
  // BATTERY DRAIN — THREE explicit stop conditions:
  //   1. hero mouseleave → cursorActive = false → loop returns immediately
  //   2. heroIO fires (hero off-screen) → heroVisible = false → loop returns
  //   3. cancelAnimationFrame(cursorRAF) called on both mouseleave and heroIO exit
  //
  // IIFE RETURN SAFETY: Do NOT use bare return statements here.
  // All subsystems wrapped in conditional blocks, never early-returned.

  const cursorDot  = document.querySelector('.luvz-cin-cursor-dot');
  const cursorRing = document.querySelector('.luvz-cin-cursor-ring');

  if (cursorDot && cursorRing && !IS_TOUCH) {

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let cursorRingScale = 0.3;

    const DOT_LERP  = 0.12;
    const RING_LERP = 0.08;

    // ── Single merged mousemove handler ───────────────────────────────────────
    hero.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!cursorActive) {
        dotX = mouseX; dotY = mouseY;
        ringX = mouseX; ringY = mouseY;
        cursorActive = true;
        cursorDot.style.opacity = '1';
        startCursorRAF();
      }
    });

    hero.addEventListener('mouseleave', function () {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
      cursorActive = false;
      if (cursorRAF) { cancelAnimationFrame(cursorRAF); cursorRAF = null; }
    });

    hero.addEventListener('mouseenter', function () {
      if (!cursorActive) {
        cursorActive = true;
        cursorDot.style.opacity = '1';
        startCursorRAF();
      }
    });

    function startCursorRAF() {
      function loop() {
        if (!cursorActive || !heroVisible) {
          cursorRAF = null;
          return;
        }

        dotX  += (mouseX - dotX)  * DOT_LERP;
        dotY  += (mouseY - dotY)  * DOT_LERP;
        ringX += (mouseX - ringX) * RING_LERP;
        ringY += (mouseY - ringY) * RING_LERP;

        // translate3d only — never style.left / style.top inside RAF
        cursorDot.style.transform  = 'translate3d(' + (dotX - 3)   + 'px, ' + (dotY - 3)   + 'px, 0)';
        cursorRing.style.transform = 'translate3d(' + (ringX - 12) + 'px, ' + (ringY - 12) + 'px, 0) scale(' + cursorRingScale + ')';

        cursorRAF = requestAnimationFrame(loop);
      }
      cursorRAF = requestAnimationFrame(loop);
    }

    // ── Jewelry Hover — Ring Expand / Collapse ─────────────────────────────────
    if (jewelry) {
      jewelry.addEventListener('mouseenter', function () {
        gsap.to(cursorRing, {
          opacity: 1,
          duration: 0.4,
          ease: 'expo.out',
          overwrite: true,
          onStart: function () {
            gsap.to({ s: cursorRingScale }, {
              s: 1, duration: 0.4, ease: 'expo.out', overwrite: true,
              onUpdate: function () { cursorRingScale = this.targets()[0].s; }
            });
          }
        });
        gsap.to(cursorDot, {
          scale: 0.5,
          duration: 0.3,
          ease: 'expo.out',
          overwrite: true,
        });
        // Opacity only on jewelry — no filter animation (GPU stability)
        gsap.to(jewelry, {
          opacity: 0.95,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: true,
        });
      });

      jewelry.addEventListener('mouseleave', function () {
        gsap.to(cursorRing, {
          opacity: 0,
          duration: 0.35,
          ease: 'expo.out',
          overwrite: true,
          onStart: function () {
            gsap.to({ s: cursorRingScale }, {
              s: 0.3, duration: 0.35, ease: 'expo.out', overwrite: true,
              onUpdate: function () { cursorRingScale = this.targets()[0].s; }
            });
          }
        });
        gsap.to(cursorDot, {
          scale: 1,
          duration: 0.3,
          ease: 'expo.out',
          overwrite: true,
        });
        gsap.to(jewelry, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: true,
        });
      });
    } // end if (jewelry)

  } // end if (cursorDot && cursorRing && !IS_TOUCH)
```

### Phase 4 Gate — Full device testing:
- [ ] Desktop Chrome: cursor gold dot appears on first mousemove, lerp is silky
- [ ] Hover over jewelry: ring expands, dot shrinks, jewelry lifts. No text label.
- [ ] Mouse leaves jewelry: ring collapses, dot restores
- [ ] Mouse leaves `#hero`: both cursor elements invisible
- [ ] **Cursor RAF battery drain test:** scroll past hero → Chrome Performance → zero cursor RAF frames in flame chart
- [ ] **Cursor GPU safety check:** confirm no `filter: blur()` on `.luvz-cin-cursor-dot` or `.luvz-cin-cursor-ring`. Confirm `box-shadow` on both is static (set once in CSS, never animated). If either violation is present, remove immediately.
- [ ] Desktop Firefox: cursor tracks correctly, no console errors
- [ ] **Firefox cursor positioning:** `translate3d` positioning confirmed correct in Firefox
- [ ] **Windows High Contrast Mode:** experience not disorienting; if it is, restore `cursor: auto` and remove custom cursor system entirely
- [ ] **Keyboard navigation:** tab through page — all focusable elements inside `#hero` have visible focus rings
- [ ] iPhone Safari: no custom cursor code runs, native touch scroll works, CSS animation fires
- [ ] Android Chrome: same as iPhone
- [ ] `prefers-reduced-motion`: all GSAP skipped, jewelry and text appear instantly at full opacity
- [ ] Rapid scroll test: no jank, no z-fighting
- [ ] Chat widget: open overlay — Lenis does not prevent chat scroll

---

## FINAL VERIFICATION CHECKLIST

Run on live Cloudflare deployment, not localhost.

### Visual
- [ ] Hero is cinematic: dark, atmospheric, jewelry is the world
- [ ] Nav transparent over hero — floats invisibly. No background, blur, border, or shadow visible.
- [ ] Nav suppression complete: all four gone while `.luvz-cin-nav-transparent` active — toggle in DevTools to confirm each
- [ ] Nav solidifies as hero scrolls out — smooth transition, no flash
- [ ] Nav text/logo legible against `#141008`
- [ ] Burgundy fabric bleeds seamlessly into `#141008` — no hard photo edge
- [ ] LUVZ wordmark appears at ~2.8s in Cinzel gold
- [ ] Entrance sequence: glow → jewelry → text. Weighted, slow, intentional.
- [ ] Micro-float: jewelry breathes, 5.5s sine, no bounce
- [ ] Scroll: three planes separate, wordmark fades, transition gradient appears
- [ ] Hero dissolves into `#top-sellers` — no visible seam at boundary
- [ ] Mobile: static, beautiful, WhatsApp CTA visible, no horizontal overflow

### Functional (must not regress)
- [ ] Product carousels work at 700px, 1100px, desktop
- [ ] Product modal opens from URL hash (`#product/slug`)
- [ ] Wishlist: heart toggle, count badge, drawer, "Enquire All" WhatsApp
- [ ] Chat widget: opens, SSE stream works, sources display
- [ ] Vault 3D: tap rotates, opens modal
- [ ] `.reveal` IntersectionObserver still triggers on sections below hero
- [ ] `.luvz-cin-*` elements do NOT receive `.reveal` class states
- [ ] Nav: mobile menu opens/closes, overlay works
- [ ] No console errors on load

### Performance
- [ ] Lighthouse Performance score does not regress by more than 5 points
- [ ] No layout shift (CLS) from cinema elements — hero image has `width` and `height` attributes set
- [ ] Hero RAF confirmed stopped when hero is out of viewport
- [ ] `will-change` only on approved list: `.luvz-cin-jewelry`, `.luvz-cin-glow`, `.luvz-cin-cursor-dot`, `.luvz-cin-cursor-ring`, `.luvz-cin-transition`
- [ ] No additional `translateZ(0)` or GPU hacks added beyond approved list
- [ ] `gsap.config({ force3D: false })` confirmed present in `luvz-cinema.js`
- [ ] CDN scripts load from allowed domains: `cdnjs.cloudflare.com`, `cdn.jsdelivr.net`
- [ ] `contain: layout paint style` present on `.luvz-cin-stage` and `.luvz-cin-glow` — confirmed neither clips visible content

---

## KNOWN RISKS & MITIGATIONS

| Risk | Mitigation |
|------|-----------|
| Mask + transform + opacity on same compositor layer | **Addressed in v7:** `.luvz-cin-mask` inner wrapper separates mask ownership from `.luvz-cin-jewelry` animation ownership (strongly recommended). If skipping the split, confirm at Phase 2 Gate compositor audit that the layer does not re-rasterize during scroll. |
| Safari mask tiling | **Addressed in v7:** `-webkit-mask-repeat: no-repeat` and `-webkit-mask-size: cover` explicit on `.luvz-cin-mask` (or on `.luvz-cin-jewelry img` if split is skipped). |
| Lenis / modal body-lock scroll jump | **Addressed in v7:** `window.__luvzOverlayOpen/Close` API in `luvz-cinema.js`, called directly from `app.js` open/close handlers. Lenis resumes only when all overlays closed. |
| Cursor GPU drain (blur / shadow animation) | **Resolved in v7:** `filter: blur()` and animated `box-shadow` prohibited on cursor elements. Static shadow only. |
| CLS from hero image before CSS applies | **Resolved in v7:** `width` and `height` attributes required on `<img>`. |
| Nav scroll listener ownership conflict | **Resolved in v7:** explicit rule that only ONE system writes to nav background. Confirmed during Phase 2 gate. |
| Grain animation on low-end Intel integrated GPUs | Degrade in order: duration → background-size → numOctaves. Never reduce opacity first. |
| GSAP CDN version conflict | Check `app.js` for existing GSAP before adding CDN scripts. |
| Mask tuning on OLED mobile screens | Post-deployment art-direction. `rgba(0,0,0,0.9)` at 50% may need to move to 40% on OLED. |
| Transition gradient seam against `#top-sellers` | Inspect `#top-sellers` background and adjust gradient end stop to match exactly (Audit 6). |
| Lenis fighting iOS momentum scroll | `smoothTouch: false` set. Lenis destroyed when hero leaves viewport. |
| ScrollTrigger conflicting with app.js scroll listeners | `luvz-cinema.js` is IIFE — no globals. ScrollTrigger only touches `.luvz-cin-*` elements. |
| contain clipping glow or mask overflow | Verify at Phase 2 gate: if glow gradient is clipped, remove `contain` from `.luvz-cin-glow`. |

---

## PROHIBITED VISUAL TROPES

**Do NOT add any of the following under any circumstances:**
- Gold particle systems or sparkle animations
- Lens flare overlays
- Floating dust motes or bokeh effects
- Luxury shimmer sweeps
- Rotating jewelry or 3D spin effects
- Glowing borders
- Excessive blur (backdrop-filter blur > 4px on hero elements)
- Glossy UI glassmorphism
- "Premium" neon or iridescent effects
- Oversaturated gold gradients
- Any animated gradient that sweeps across the surface of the jewelry
- Visible grain that calls attention to itself

**The test:** If you can point to an effect and name it, it is too loud. The effects must be felt before they are seen.

---

## WHAT THIS PROMPT DOES NOT COVER

- Any changes to the Shop by Category bento section
- Any changes to product carousels, modals, or the vault
- Sound design or audio
- Video backgrounds
- WebGL, Three.js, canvas rendering
- Loading screen / preloader
- Any new nav items or hero CTAs beyond the existing WhatsApp button
- Changes to `products.json`
- Changes to the Oracle FastAPI chat backend

### Future refinement: Wordmark exit strategy (post-launch only)
Currently the LUVZ wordmark fades out on scroll. Future briefs may explore opacity + letter-spacing dissolve, nav logo continuity, or blur dissolve. Do not implement without a new approved brief.

---

## POST-DEPLOYMENT ART-DIRECTION (not blockers — schedule after launch)

| Item | When | Notes |
|------|------|-------|
| Mask tuning on OLED devices | First week post-launch | Tighten ellipse edges; `rgba(0,0,0,0.9)` stop may need to move from 50% → 40% |
| Mask on 13" laptops | First week post-launch | May need slight tightening to `70% 66%` |
| Mask on 1440p ultrawides | First week post-launch | May feel dominant — reduce jewelry width to ~48% |
| SVG grain on Intel integrated GPU | First QA on Windows laptop | Degrade: duration 0.18s → 0.25s, then tile 200px → 160px |
| Firefox cursor softness | Firefox QA | Reduce ring shadow — do NOT touch lerp speed |

---

*End of implementation prompt. All directions locked and approved.*
*Creative direction: Cartier restraint · Sabyasachi atmosphere · Indian luxury · Editorial dark*
*LUVZ Collection — luvzcollection.com*
