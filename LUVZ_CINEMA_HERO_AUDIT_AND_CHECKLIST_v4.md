# LUVZ Cinema Hero — Pre-Implementation Audit & Execution Checklist
## Version 4 · Run before writing any code · Cloudflare Pages · `public/index.html` + `public/app.js`

---

## CHANGELOG — v3 → v4

Eight targeted additions based on team feedback review. All v3 content preserved. No audit sections removed or reordered.

| # | Addition | Location |
|---|----------|----------|
| 1 | **Mask + transform DOM split (STRONGLY RECOMMENDED):** Phase 2 DOM step updated. `.luvz-cin-jewelry` is the outer animation wrapper; new `.luvz-cin-mask` is the inner mask wrapper on `img`. Implement by default; may be skipped only if Phase 2 Gate compositor audit confirms no re-rasterization without it. Compositor audit item updated to test both paths. | Phase 2 Step 2.1, Phase 2 Gate |
| 2 | **`contain` strategy audit:** `contain: layout paint style` on `.luvz-cin-stage` and `.luvz-cin-glow` only. Phase 2 Gate item added to verify no clipping. | Phase 2 Step 2.2, Phase 2 Gate |
| 3 | **Safari mask prefix hardening:** `-webkit-mask-image`, `-webkit-mask-repeat`, `-webkit-mask-size` now required on `.luvz-cin-mask`. Phase 2 Gate item added to catch tiling. | Phase 2 Step 2.2, Phase 2 Gate |
| 4 | **Nav scroll listener ownership rule:** Audit 1 gains explicit check that only ONE system writes nav background. Phase 2 Gate item added. | Audit 1, Phase 2 Gate |
| 5 | **Lenis overlay state manager — integrated into `app.js`:** `luvz-cinema.js` exposes `window.__luvzOverlayOpen(id)` and `window.__luvzOverlayClose(id)`. `app.js` calls these directly from existing open/close handlers (one guarded line per handler, no refactor). `app.js` is the single source of truth for overlay state. Audit 7 added to locate the six handler sites before Phase 3. | Phase 3 Step 3.1, Phase 3 Gate, Audit 7 |
| 6 | **Cursor GPU safety:** Phase 4 checklist and gate updated with explicit prohibition on `filter: blur()` and animated `box-shadow` on cursor elements. | Phase 4 Step 4.1, Phase 4 Gate |
| 7 | **CLS guard for hero image:** Phase 2 Step 2.1 updated — `width` and `height` attributes required on `<img>`. Final checklist performance item added. | Phase 2 Step 2.1, Final Verification |
| 8 | **Mobile fallback philosophy locked:** Execution checklist gains explicit prohibition list. Final checklist gains mobile restraint gate. | Phase 4 Gate |

---

## CHANGELOG — v2 → v3

| # | Addition | Location |
|---|----------|----------|
| 1 | **Nav stacking context ancestor audit** | Audit 1 |
| 2 | **Compositor rasterization audit** | Phase 2 Gate |
| 3 | **Lenis + modal body-lock scroll jump test** | Phase 3 Gate |
| 4 | **iOS dynamic viewport height clarification** | Phase 2 CSS |
| 5 | **`pointer-events: none` verification on atmosphere layers** | Phase 2 CSS |

---

## HOW TO USE THIS DOCUMENT

This document has two parts, run in order:

**Part 1 — Audit** gates the work. Each section has a `FINDING:` field. Fill it in before proceeding to the phase it protects. If any finding reveals a collision, resolve it first.

**Part 2 — Execution Checklist** is the step-by-step sequence for Claude Code. Each step is atomic. Do not skip steps. Do not proceed past a gate if any item is unchecked.

The implementation prompt (`LUVZ_CINEMA_HERO_CLAUDE_CODE_PROMPT_v7.md`) remains the source of truth for all code. This document tells you *what to check* before you write any of it.

---

---

# PART 1 — PRE-IMPLEMENTATION AUDIT

---

## AUDIT 1 — `#nav` CSS Collision Inventory

**Why this is the highest-risk area:** Legacy nav styles exist across multiple selectors and media queries. Even one surviving `backdrop-filter`, `background`, or `border-bottom` will destroy the cinematic illusion.

**Action:** Open `index.html`. Search the `<style>` block for every rule that contains `#nav`. For each rule found, complete the table row.

### Checklist

- [ ] Searched for: `#nav` — recorded all matching rules below
- [ ] Searched for: `#nav::before` and `#nav::after` — pseudo-elements are a common hidden blur source
- [ ] Searched for: `nav` (tag selector fallback)
- [ ] Searched inside every `@media` query — mobile overrides are where collisions most commonly hide
- [ ] Confirmed no `backdrop-filter` on `#nav` or its pseudo-elements survives while `.luvz-cin-nav-transparent` is active
- [ ] Confirmed no `background-color`, `background`, or shorthand `background` survives
- [ ] Confirmed no `border-bottom`, `border`, or `box-shadow` survives
- [ ] Toggled `.luvz-cin-nav-transparent` class in DevTools with hero visible — nav is completely invisible against `#141008`
- [ ] **Stacking context ancestor audit:** confirmed no ancestor element of `#nav` creates a new stacking context via `transform`, `filter`, `opacity < 1`, `perspective`, `mix-blend-mode`, or `isolation`. Walk the DOM tree from `#nav` to `<body>` in DevTools and confirm none of these properties are set on any ancestor.
- [ ] **Nav scroll listener ownership audit (v4):** searched `app.js` for any scroll listener that writes to `#nav` background, opacity, or class. If found, confirmed it is either (a) deactivated while `.luvz-cin-nav-transparent` is active, or (b) scoped to fire only when the hero is not visible. **Only ONE system may animate nav background at any time.** Competing writes from cinema observer + existing scroll listener + mobile menu state will produce flicker.

### Findings

| Selector | Property | Value | Overridden by cinema CSS? |
|----------|----------|-------|--------------------------|
| `#nav` | | | |
| `#nav::before` | | | |
| `#nav::after` | | | |
| `@media (max-width: 768px) #nav` | | | |
| *(add rows as needed)* | | | |

**Nav scroll listener findings:**

| Location in `app.js` | What it writes to `#nav` | Conflict risk |
|-----------------------|--------------------------|---------------|
| | | |

**FINDING:** *(fill in: clean / collisions found / scroll listener conflict found — list them)*

**Gate:** Do not write any cinema CSS until this audit is complete and all conflicts resolved.

---

## AUDIT 2 — Hero Transform & Animation Contamination

**Why this matters:** Legacy `opacity`, `transform`, `animation`, and `transition` rules on hero children will fight GSAP. Phase 1.5 must neutralize all of them before GSAP takes ownership.

**Action:** Search the `<style>` block for every rule targeting the following selectors. Record each one.

### Selectors to audit:
- `#hero`
- `#hero *`
- `.lc-fade-up`
- `.lc-ambient-glow`
- `.stagger-text`
- Any `@keyframes` block used by hero elements
- `.reveal` (confirm it does NOT target any `#hero` children)

### Checklist
- [ ] Every rule found for the above selectors is recorded below
- [ ] Every `animation:` property on hero elements is identified
- [ ] Every `transition:` property on hero elements is identified
- [ ] Every `opacity: 0` initial state on hero elements is identified — GSAP will own these
- [ ] Every `transform:` on hero elements is identified — GSAP will own these
- [ ] No `@keyframes` targeting hero elements will survive into Phase 3
- [ ] `.reveal` observer does NOT fire on any `#hero` descendant (guard exists in `app.js`)

### Findings

| Selector | Property | Value | Action (remove / keep / scope) |
|----------|----------|-------|-------------------------------|
| `.lc-fade-up` | | | |
| `.lc-ambient-glow` | | | |
| `.stagger-text` | | | |
| `#hero` | | | |
| *(add rows as needed)* | | | |

**FINDING:** *(fill in: clean / contamination found — list rules to neutralize)*

**Gate:** Phase 1.5 must address every row marked "remove" before Phase 3 GSAP code runs.

---

## AUDIT 3 — GSAP Duplication Risk

**Why this matters:** If `app.js` already loads GSAP, adding a second `<script>` tag will silently overwrite or conflict.

### Search terms:
- `gsap` (case-insensitive)
- `ScrollTrigger`
- `TweenMax`, `TweenLite`, `TimelineMax`
- `cdnjs.cloudflare.com/ajax/libs/gsap`
- `cdn.jsdelivr.net` with any GSAP path
- `unpkg.com/gsap`

### Checklist
- [ ] Searched `app.js` for all terms above
- [ ] Searched `index.html` `<script>` tags for all terms above
- [ ] Searched `luvz-chat.js` for any GSAP reference
- [ ] Confirmed Lenis is not already loaded (search for `lenis`, `Lenis`, `studio-freight`)
- [ ] Confirmed ScrollTrigger is not already loaded separately

### Findings

| File | Line | Reference found | Action |
|------|------|-----------------|--------|
| | | | |

**FINDING:** *(fill in: no existing GSAP / GSAP found at version X — action required)*

**Resolution if GSAP already exists:**
- Same version (3.12.5): do NOT add a second CDN tag. Confirm `ScrollTrigger` is also loaded.
- Different version: align to 3.12.5. Update the existing tag rather than adding a second.
- Bundled (not CDN): confirm ScrollTrigger is included. If not, load only `ScrollTrigger.min.js`.

**Gate:** CDN script tags in Phase 1.4 must be adjusted based on this finding before any code is added.

---

## AUDIT 4 — `cursor:none` Accessibility Surface

**Why this matters:** `cursor:none` on `#hero` hides the native cursor. If the custom cursor system fails, users have no cursor at all.

**Action:** Inspect all child elements of `#hero` in the current DOM.

### Checklist
- [ ] Listed all focusable elements inside `#hero` (links, buttons, inputs)
- [ ] Confirmed all focusable elements have visible `:focus` rings with `cursor:none` active
- [ ] Confirmed `cursor:none` is applied only to `#hero`, not to the full page
- [ ] Confirmed the WhatsApp CTA button (`[href*="wa.me"]`) has a functional focus ring
- [ ] Confirmed Windows High Contrast Mode test is on the Phase 4 gate checklist
- [ ] Confirmed: if cursor system must be removed, `cursor:none` CSS on `#hero` is also removed

### Findings

| Element | Selector / ID | Focusable? | Focus ring visible with cursor:none? |
|---------|--------------|------------|-------------------------------------|
| WhatsApp CTA | | Yes | |
| *(add any other interactive hero elements)* | | | |

**FINDING:** *(fill in: no issues / issues found — list them)*

**Gate:** If any focusable element inside `#hero` loses its focus ring, `cursor:none` must be scoped or removed.

---

## AUDIT 5 — OLED Mask Edge Risk

**Why this matters:** OLED displays compress near-black values, which can expose subtle hard edges at mask boundaries invisible on LCD.

### Checklist
- [ ] Identified which OLED devices are available for QA (iPhone OLED, Samsung Galaxy, etc.)
- [ ] Noted which devices are LCD-only
- [ ] Confirmed the mobile mask override is already tighter than desktop (`ellipse 85% 78%` vs `72% 68%`)
- [ ] Noted that OLED tuning is a post-deployment art-direction step, not a blocker

### Findings

| Device | Display type | Available for QA? |
|--------|-------------|-------------------|
| | | |

**FINDING:** *(fill in: OLED device available / no OLED device — note risk)*

**Gate:** Not a code blocker. Log as a post-deployment QA item if no OLED device is available now.

---

## AUDIT 6 — `#top-sellers` Transition Seam

**Why this matters:** The cinema transition gradient at the bottom of `#hero` fades to `#141008`. If `#top-sellers` has a different background color, a seam will appear.

### Checklist
- [ ] Located `#top-sellers` background color in CSS
- [ ] Confirmed whether it matches `#141008` exactly
- [ ] If it does NOT match: noted the exact value so the gradient end stop can be adjusted
- [ ] Checked whether `#top-sellers` has a top border, box-shadow, or padding creating visual separation

### Findings

| Element | Property | Current value | Matches `#141008`? |
|---------|----------|---------------|---------------------|
| `#top-sellers` | `background` / `background-color` | | |
| `#top-sellers` | `border-top` | | |
| `#top-sellers` | `box-shadow` | | |
| `#top-sellers` | `padding-top` | | |

**FINDING:** *(fill in: matches exactly / mismatch at value X — gradient end stop adjustment required)*

**Gate:** Confirm before Phase 2 CSS is written. Saves a deployment iteration.

---

## AUDIT 7 — `app.js` Overlay Event Hook Locations (v4 addition)

**Why this matters:** The v4 Lenis overlay state manager requires six `dispatchEvent` calls to be added to `app.js` — one on open and one on close for each of modal, wishlist drawer, and mobile nav. You cannot add them without first knowing where in `app.js` these events are currently handled.

**Action:** Search `app.js` for modal open/close, drawer open/close, and mobile nav open/close logic.

### Checklist
- [ ] Located modal open handler in `app.js` — recorded line number
- [ ] Located modal close handler in `app.js` — recorded line number
- [ ] Located wishlist drawer open handler in `app.js` — recorded line number
- [ ] Located wishlist drawer close handler in `app.js` — recorded line number
- [ ] Located mobile nav open handler in `app.js` — recorded line number
- [ ] Located mobile nav close handler in `app.js` — recorded line number
- [ ] Confirmed each handler is a clear, identifiable function or event listener (not spread across multiple locations)

### Findings

| System | Event | Location in `app.js` (function name or line) |
|--------|-------|----------------------------------------------|
| Modal | open | |
| Modal | close | |
| Wishlist drawer | open | |
| Wishlist drawer | close | |
| Mobile nav | open | |
| Mobile nav | close | |

**FINDING:** *(fill in: all located / could not locate — describe issue)*

**Gate:** Phase 3 Step 3.1 dispatch hook additions require all six locations above. Do not write Phase 3 until this audit is complete.

---

## AUDIT SUMMARY

Fill in before beginning Phase 1:

| Audit | Status | Blockers |
|-------|--------|----------|
| 1. Nav CSS collisions + scroll listener ownership | | |
| 2. Hero transform contamination | | |
| 3. GSAP duplication | | |
| 4. cursor:none accessibility | | |
| 5. OLED mask risk | | |
| 6. Top-sellers seam | | |
| 7. `app.js` overlay event hook locations (v4) | | |

**Proceed to implementation only when all blockers in the table above are resolved.**

---

---

# PART 2 — EXECUTION CHECKLIST FOR CLAUDE CODE

---

> **Branch:** All work on `feature-redesign-hero`. Do not merge to main until the Final Verification Checklist is complete on a live Cloudflare deployment.

---

## PRE-FLIGHT — Snapshot & Restore

> **Run this before touching any file.**

- [ ] Created full backup of `public/index.html` (copy to `public/index.html.bak` or equivalent)
- [ ] Created full backup of `public/app.js` (copy to `public/app.js.bak` or equivalent)
- [ ] Confirmed current production deployment URL loads without errors
- [ ] Created git checkpoint: `git commit -am "pre cinema hero checkpoint"`
- [ ] Confirmed git tag or branch exists so rollback is one command: `git checkout [checkpoint]`
- [ ] Confirmed: rollback can be fully restored in under 2 minutes

**Gate:** Do not modify any file until all six items above are checked.

---

## PHASE 1 — Surgery

### Step 1.1 — Remove dead particle code
- [ ] Found `initHeroParticles` function in `app.js`
- [ ] Confirmed it is wrapped in an immediate `return` statement (dead code)
- [ ] Removed the entire function body and its `return` wrapper
- [ ] Removed `#hero-particles-canvas` element from `index.html` DOM
- [ ] Searched for remaining references to `initHeroParticles` — zero found
- [ ] Searched for remaining references to `#hero-particles-canvas` — zero found

### Step 1.2 — Fix hero RAF memory leak
- [ ] Located `requestAnimationFrame(tick)` hero scroll loop in `app.js`
- [ ] Added `let heroRAFRunning = true;` flag
- [ ] Added `if (!heroRAFRunning) return;` at top of `tick` function
- [ ] Wrapped RAF start/stop in `IntersectionObserver` on `#hero`
- [ ] Verified: open Chrome Performance → scroll past hero → zero RAF frames from this loop

### Step 1.3 — Remove inline stagger-text JS
- [ ] Found all `setTimeout`/`classList.add` logic driving `.stagger-text` in `#hero`
- [ ] Removed the JS logic only — `.stagger-text` class remains on HTML elements
- [ ] Set `.stagger-text` initial CSS `opacity: 0` in cinema CSS block (Phase 2 will add this)

### Step 1.3b — Guard `.reveal` observer
- [ ] Found `.reveal` IntersectionObserver in `app.js`
- [ ] Added `if (entry.target.closest('#hero')) return;` at top of callback
- [ ] Confirmed no `.luvz-cin-*` element has a `.reveal` class

### Step 1.4 — Create file scaffolding
- [ ] Added `/* ── CINEMA HERO START ── */` and `/* ── CINEMA HERO END ── */` fences to `index.html` style block (empty)
- [ ] Created `public/luvz-cinema.js` with IIFE skeleton only
- [ ] Added CDN script tags for GSAP 3.12.5, ScrollTrigger, Lenis 1.0.42 to `index.html`
- [ ] Added `<script src="luvz-cinema.js"></script>` after CDN tags
- [ ] Confirmed load order: `app.js` → `luvz-chat.js` → CDN scripts → `luvz-cinema.js`

### Step 1.5 — Neutralize legacy hero CSS
*(Use Audit 2 findings to drive this step)*
- [ ] Removed all `animation:` rules from `.lc-fade-up`, `.lc-ambient-glow`, `.stagger-text`
- [ ] Removed all `transition:` rules from hero visual elements (not layout properties)
- [ ] Removed all `@keyframes` blocks targeting hero elements
- [ ] Removed or nullified `opacity`/`transform` rules GSAP will own
- [ ] Left intact: all `display`, `position`, `width`, `height`, `z-index`, `color`, `font` rules
- [ ] Reloaded page: hero shows jewelry at natural opacity — no CSS fade-in, no transform, no animation

### Phase 1 Gate
- [ ] Carousel works at 700px and 1100px viewport widths
- [ ] Product modal opens via hash routing
- [ ] Wishlist heart toggle and drawer open correctly
- [ ] Chat widget opens and SSE stream works
- [ ] No console errors on page load
- [ ] No `initHeroParticles` references remain
- [ ] Hero RAF stops when scrolled past (Chrome Performance tab)
- [ ] Legacy CSS neutralized: jewelry fully visible at natural state, no CSS-driven entrance
- [ ] `.reveal` observer guard confirmed in `app.js`

---

## LOCKED DOM CONTRACT — DO NOT MODIFY

> **Read before Phase 2.** These IDs and classes must not be renamed, removed, restructurally altered, or have new attributes added without an explicit approved brief.

| Identifier | Used by | Consequence of modification |
|------------|---------|----------------------------|
| `#top-sellers` | Transition gradient end stop | Seam appears at hero boundary |
| `#wishlist-drawer` | Wishlist JS in `app.js` | Drawer breaks entirely |
| `#luvz-chat-trigger` | Chat widget `luvz-chat.js` | Chat trigger disappears |
| `#luvz-chat-popup` | Chat widget `luvz-chat.js` | Chat popup breaks |
| `#vault-scene` | Vault 3D interaction | Vault breaks entirely |
| `#mob-menu` | Mobile nav JS | Mobile nav breaks |
| `#moverlay` | Mobile nav overlay | Mobile nav overlay breaks |
| `.pcard` | Product card rendering | All product cards break |
| `.pcard-wish` | Wishlist heart toggle | Wishlist toggle breaks |
| `.pcard-btn` | Product CTA | Product actions break |
| `.carousel-wrap` | Carousel scroll logic | Carousels break |
| `.reveal` | `IntersectionObserver` in `app.js` | All section reveals break |
| `[href*="wa.me"]` | WhatsApp CTA | Primary conversion path breaks |

**Violation of this contract is a failed implementation.**

---

## PHASE 2 — Structure & Atmosphere

### Step 2.1 — Rebuild `#hero` inner HTML
- [ ] Replaced inner content of `#hero` with cinema structure from prompt v7
- [ ] **v4 DOM split (STRONGLY RECOMMENDED) — implement by default:**
  - [ ] `.luvz-cin-jewelry` (outer — animation wrapper) is present
  - [ ] `.luvz-cin-mask` (inner — mask wrapper) is present as a child of `.luvz-cin-jewelry`, wrapping the `<img>`
  - [ ] **Skip condition:** if implementing as single element (mask on `.luvz-cin-jewelry` directly), proceed to Phase 2 Gate compositor audit before continuing — the gate will determine whether the split is needed
- [ ] All other `.luvz-cin-*` elements present: `glow`, `stage`, `text`, `transition`, `grain`
- [ ] Cursor elements added to `<body>` (NOT inside `#hero`): `.luvz-cin-cursor-dot`, `.luvz-cin-cursor-ring`
- [ ] `hero_image.webp` path correct, `fetchpriority="high"` set, `alt` text present
- [ ] **CLS guard (v4):** `width` and `height` attributes set on `<img>` element, matching actual intrinsic dimensions of `hero_image.webp`
- [ ] No IDs from the locked list have been renamed or removed

### Z-INDEX OWNERSHIP MAP

> All z-index values must be drawn from this table. No arbitrary z-index additions during implementation.

| Layer | Element | z-index | Notes |
|-------|---------|---------|-------|
| Atmospheric glow | `.luvz-cin-glow` | 1 | Behind everything |
| Jewelry stage | `.luvz-cin-stage` | 2 | Contains jewelry wrapper |
| Wordmark | `.luvz-cin-text` | 4 | Above jewelry |
| Transition gradient | `.luvz-cin-transition` | 5 | Bottom fade overlay |
| Grain | `.luvz-cin-grain` | 6 | Above transition, below cursor |
| Nav | `#nav` | *(existing — do not change)* | Always above all `.luvz-cin-*` |
| Cursor dot | `.luvz-cin-cursor-dot` | 100 | Fixed, compositor-only |
| Cursor ring | `.luvz-cin-cursor-ring` | 100 | Fixed, compositor-only |
| Modal overlays | `#moverlay`, drawer | *(existing — do not change)* | Must remain above cinema layers |
| Chat widget | `#luvz-chat-popup` | *(existing — do not change)* | Must remain above cinema layers |

**Rule:** If you need a z-index not in this table, stop and justify it before adding it.

### Step 2.2 — Write Cinema CSS
- [ ] All cinema CSS written between `/* ── CINEMA HERO START ── */` and `/* ── CINEMA HERO END ── */` fences
- [ ] `#hero` base styles written (background `#141008`, `min-height: 100svh`, `cursor:none`)
  - **Viewport height note:** `min-height: 100svh` (stable) preferred over plain `100vh`. On iOS Safari, `100vh` is calculated against the full viewport including the collapsed URL bar — causing visible crop or jump. `svh` stays stable. `dvh` (dynamic) tracks the bar in real time — only use if dynamic height is explicitly desired.
- [ ] `.luvz-cin-glow` written (opacity 0 initial, radial gradient, `will-change`, `contain: layout paint style`)
- [ ] `.luvz-cin-stage` written (NO `contain` property — `contain: paint` blocks mask-image on child `.luvz-cin-mask`. Desktop uses `position: absolute; inset: 0`, mobile uses `position: relative; width: 100%`. Both are sizing reference for `.luvz-cin-mask` gradients.)
- [ ] `.luvz-cin-jewelry` written (outer wrapper: `width 52%`, opacity 0, translateY(20px), `will-change`, `pointer-events: auto`) — **NO mask on this element**
- [ ] **`.luvz-cin-mask` written (v4):** inner wrapper with `-webkit-mask-image` + `mask-image` (both prefixed and unprefixed), `-webkit-mask-repeat: no-repeat`, `mask-repeat: no-repeat`, `-webkit-mask-size: cover`, `mask-size: cover`
- [ ] `.luvz-cin-mask img` written (`display: block`, `width: 100%`, `pointer-events: none`)
- [ ] `.luvz-cin-text` written (Cinzel font, gold color, opacity 0 initial, `pointer-events: none`)
- [ ] `.luvz-cin-transition` written (opacity 0 initial, gradient end stop matches `#top-sellers` background per Audit 6, `pointer-events: none`)
- [ ] **`pointer-events: none` confirmed on all atmosphere layers:** `.luvz-cin-glow`, `.luvz-cin-grain`, `.luvz-cin-transition`. If any of these intercepts pointer events, jewelry hover detection will silently fail.
- [ ] `.luvz-cin-grain` written (opacity 0.025, SVG turbulence, `luvzCinGrainShift` keyframe, `pointer-events: none`)
- [ ] **Cursor CSS written — GPU safety rules applied (v4):**
  - [ ] `.luvz-cin-cursor-dot`: `will-change: transform`, static `box-shadow` only (never animated), NO `filter: blur()`
  - [ ] `.luvz-cin-cursor-ring`: `will-change: transform, opacity`, static `box-shadow` only, NO `filter: blur()`
- [ ] Nav transparency CSS written (`.luvz-cin-nav-transparent` block suppresses all properties found in Audit 1)
- [ ] Mobile override block written (`@media (max-width: 768px)`) — mask applied to `.luvz-cin-mask` in mobile override
- [ ] Reduced-motion block written (`@media (prefers-reduced-motion: reduce)`)
- [ ] Mobile keyframes written: `luvzCinFadeIn`, `luvzCinGlowBreathe`, `luvzCinFloatMobile`

### Phase 2 Gate
- [ ] Hero is dark rectangle with jewelry image at natural opacity (GSAP not yet active)
- [ ] Mask bleed working: no hard rectangular frame visible around photo
- [ ] Burgundy fabric appears to live inside the dark page — not placed on top
- [ ] LUVZ text invisible (opacity 0 — correct)
- [ ] **v4 DOM split status confirmed in DevTools:** either (a) `.luvz-cin-jewelry` > `.luvz-cin-mask` > `img` structure visible in DOM inspector, or (b) single-element approach confirmed and compositor audit passed (no re-rasterization)
- [ ] On mobile (≤768px): jewelry and text fade in via CSS keyframe
- [ ] All sections below hero completely unaffected
- [ ] Nav transparent CSS toggled in DevTools — all four suppressions confirmed: background, backdrop-filter, border-bottom, box-shadow
- [ ] **Nav scroll listener ownership confirmed (v4):** no `app.js` nav scroll listener is writing to `#nav` background while `.luvz-cin-nav-transparent` is active. If one exists, it is suppressed or gated on hero visibility.
- [ ] **`contain` property check (v4 CRITICAL):** 
  - [ ] **Mask rendering:** `contain: paint` on `.luvz-cin-stage` BLOCKS mask-image rendering on child `.luvz-cin-mask`. The paint containment boundary prevents the mask gradient from painting. **If mask does not render, immediately remove `contain` from `.luvz-cin-stage` only.** (Safe to keep on `.luvz-cin-glow` — it has no mask children.)
  - [ ] **Visual overflow:** `.luvz-cin-glow` gradient is visible to full edge width — not clipped. `.luvz-cin-stage` jewelry not clipped at boundaries.
  - [ ] If clipping is visible after removing `contain`, investigate the element's dimensions and overflow settings, not the `contain` property.
- [ ] **Safari mask tiling test (v4):** open in Safari — mask gradient is a smooth radial fade, not a tiled pattern. If tiling visible, confirm `-webkit-mask-repeat: no-repeat` and `-webkit-mask-size: cover` on `.luvz-cin-mask`.
- [ ] **Mobile Safari overflow audit:**
  - [ ] iPhone Safari (390px width): no horizontal scroll visible
  - [ ] No masked image overflowing beyond viewport edge
  - [ ] No transform-induced overflow from `.luvz-cin-jewelry` layer
  - [ ] If overflow present: find root element via DevTools and fix directly — do NOT add `body { overflow-x: hidden }` as a global band-aid
- [ ] **Compositor rasterization audit (v4):** Chrome DevTools → Layers panel → scroll the hero.
  - **If DOM split was implemented:** confirm `.luvz-cin-jewelry` and `.luvz-cin-mask` are on separate compositor layers. Neither should flash green (re-rasterize) during scroll.
  - **If DOM split was skipped:** watch `.luvz-cin-jewelry` (single element with mask). If it flashes green during scroll, the mask+transform+opacity combination is causing raster invalidation — implement the DOM split before proceeding to Phase 3.
  - **Pass condition (either path):** no green flashing on the jewelry layer during scroll.

---

## PHASE 3 — Motion System

### Step 3.1 — Write `luvz-cinema.js`
- [ ] IIFE wrapper in place with `'use strict'`
- [ ] Guards declared: `IS_TOUCH`, `IS_MOBILE`, `REDUCED`
- [ ] **Nav `IntersectionObserver` written BEFORE `if (IS_MOBILE || REDUCED) return`** ← critical placement
- [ ] `if (IS_MOBILE || REDUCED) return` present after nav observer
- [ ] Element refs declared: `hero`, `glow`, `jewelry`, `wordmark`, `transition`
- [ ] Safety return present: `if (!hero || !jewelry || !wordmark) return`
- [ ] `gsap.registerPlugin(ScrollTrigger)` present
- [ ] **`gsap.config({ force3D: false })` present immediately after plugin registration**
- [ ] **Overlay state manager written in `luvz-cinema.js` (v4):**
  - [ ] `window.__luvzLenisOverlays` Set initialised
  - [ ] `window.__luvzOverlayOpen(id)` function defined: adds to Set, pauses Lenis on first open
  - [ ] `window.__luvzOverlayClose(id)` function defined: removes from Set, resumes Lenis only when Set is empty
  - [ ] `stopLenis()` calls `window.__luvzLenisOverlays.clear()` to reset state on hero exit
- [ ] **`app.js` overlay integration hooks added (v4) — one guarded call per handler:**
  - [ ] Modal open: `if (window.__luvzOverlayOpen) window.__luvzOverlayOpen('modal');`
  - [ ] Modal close: `if (window.__luvzOverlayClose) window.__luvzOverlayClose('modal');`
  - [ ] Drawer open: `if (window.__luvzOverlayOpen) window.__luvzOverlayOpen('drawer');`
  - [ ] Drawer close: `if (window.__luvzOverlayClose) window.__luvzOverlayClose('drawer');`
  - [ ] Mobile nav open: `if (window.__luvzOverlayOpen) window.__luvzOverlayOpen('mobile-nav');`
  - [ ] Mobile nav close: `if (window.__luvzOverlayClose) window.__luvzOverlayClose('mobile-nav');`
- [ ] Lenis `createLenisConfig()`, `startLenis()`, `stopLenis()` functions written
- [ ] `startLenis()` called immediately on load
- [ ] Hero `IntersectionObserver` written: starts/stops Lenis, pauses/resumes micro-float, stops cursor RAF
- [ ] Entrance timeline written: glow (0s) → jewelry (0.4s) → wordmark (2.8s)
- [ ] `gsap.set()` initial states written for jewelry, wordmark, glow
- [ ] Micro-float `.call()` written with `gsap.to` yoyo tween
- [ ] **Micro-float ScrollTrigger pause guard written inside `.call()` block**
- [ ] ScrollTrigger scroll choreography written: jewelry parallax, wordmark fade, glow dim, transition gradient
- [ ] `scrub: 1.2`, `end: '+=120%'` confirmed — no pinning

### Phase 3 Gate
- [ ] Entrance plays: glow → jewelry → LUVZ wordmark. Weighted, not instant, not bouncy.
- [ ] Micro-float: 6px sine breathe at 5.5s. No bounce. No jitter.
- [ ] Scroll: three planes separate. LUVZ fades by ~35% scroll. Transition gradient appears at bottom.
- [ ] Scroll feels editorial — not sluggish, not aggressive.
- [ ] Hero scrolled fully out of view: Chrome Performance confirms zero ongoing RAF
- [ ] Lenis inactive below hero (Chrome Performance confirms ticker stopped)
- [ ] Modal scroll, chat scroll, wishlist drawer: all native, no Lenis interference
- [ ] **Lenis + modal body-lock test:** with hero partially visible (Lenis active), open a product modal then close it. Confirm no scroll position jump on close.
- [ ] **Stacked overlay Lenis test (v4):** open product modal, then open wishlist drawer simultaneously. Close drawer only. Confirm Lenis does NOT resume (modal still open). Close modal. Confirm Lenis resumes. No scroll position jump.
- [ ] **Mobile nav Lenis test (v4):** open mobile nav while hero is visible. Confirm Lenis pauses. Close mobile nav. Confirm Lenis resumes.

---

## PHASE 4 — Cursor + Final Polish

### Step 4.1 — Write cursor system
- [ ] Cursor elements queried: `cursorDot`, `cursorRing`
- [ ] **Entire cursor system wrapped in `if (cursorDot && cursorRing && !IS_TOUCH) { }` — NO bare `return` statements**
- [ ] **Single merged `mousemove` listener on `hero`** — first-move activation and coordinate tracking in one handler
- [ ] `mouseleave` handler: hides both cursor elements, sets `cursorActive = false`, cancels RAF
- [ ] `mouseenter` handler: restores dot, restarts RAF
- [ ] `startCursorRAF()` loop: checks both `cursorActive` AND `heroVisible` before continuing
- [ ] `translate3d` used for positioning — never `style.left`/`style.top` inside RAF
- [ ] DOT_LERP: 0.12, RING_LERP: 0.08
- [ ] **GPU safety confirmed (v4):**
  - [ ] NO `filter: blur()` on `.luvz-cin-cursor-dot` or `.luvz-cin-cursor-ring` (in CSS or JS)
  - [ ] NO animated `box-shadow` on either cursor element — shadow is set once in CSS and never transitioned
  - [ ] Cursor animation is transform-only

### Step 4.2 — Write jewelry hover system
- [ ] Jewelry `mouseenter`: ring expands (scale 0.3→1, opacity 0→1), dot shrinks (scale 0.5), jewelry opacity lift to 0.95 — **opacity only, no filter animation**
- [ ] Jewelry `mouseleave`: ring collapses, dot restores, jewelry opacity restores to 1
- [ ] Jewelry block wrapped in `if (jewelry) { }` defensive guard
- [ ] `overwrite: true` on all hover tweens

### Phase 4 Gate — Full device testing
- [ ] Desktop Chrome: cursor gold dot appears on first mousemove, lerp is silky
- [ ] Hover over jewelry: ring expands, dot shrinks, jewelry lifts. No text label.
- [ ] Mouse leaves jewelry: ring collapses, dot restores
- [ ] Mouse leaves `#hero`: both cursor elements invisible
- [ ] **Cursor RAF battery drain test:** scroll past hero → Chrome Performance → zero cursor RAF frames in flame chart
- [ ] **Cursor GPU safety check (v4):** confirm no `filter: blur()` on either cursor element. Confirm `box-shadow` is static CSS, not animated. If either violation present, remove immediately.
- [ ] Desktop Firefox: cursor tracks correctly, no console errors
- [ ] **Windows High Contrast Mode:** experience not disorienting; if it is, remove custom cursor entirely and restore `cursor: auto`
- [ ] **Keyboard navigation:** tab through page — all focusable elements inside `#hero` have visible focus rings
- [ ] iPhone Safari: no custom cursor code runs, native touch scroll works, CSS animation fires
- [ ] Android Chrome: same as iPhone
- [ ] `prefers-reduced-motion`: all GSAP skipped, jewelry and text appear instantly at full opacity
- [ ] Rapid scroll test: no jank, no z-fighting
- [ ] Chat widget: open overlay — Lenis does not prevent chat scroll
- [ ] **Mobile fallback restraint confirmed (v4):** mobile hero has NO parallax, NO touch-reactive cursor, NO inertial scroll choreography, NO layered blend experiments. CSS-only fade and static composition only.

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
- [ ] No layout shift (CLS) from cinema elements — hero `<img>` has `width` and `height` attributes set
- [ ] Hero RAF confirmed stopped when hero is out of viewport
- [ ] `will-change` only on approved list: `.luvz-cin-jewelry`, `.luvz-cin-glow`, `.luvz-cin-cursor-dot`, `.luvz-cin-cursor-ring`, `.luvz-cin-transition`
- [ ] No additional `translateZ(0)` or GPU hacks added beyond approved list
- [ ] `gsap.config({ force3D: false })` confirmed present in `luvz-cinema.js`
- [ ] CDN scripts load from allowed domains: `cdnjs.cloudflare.com`, `cdn.jsdelivr.net`
- [ ] `contain: layout paint style` present on `.luvz-cin-stage` and `.luvz-cin-glow` — confirmed neither clips visible content

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

*LUVZ Collection — luvzcollection.com*
*Implementation brief: `LUVZ_CINEMA_HERO_CLAUDE_CODE_PROMPT_v7.md`*
*Creative direction: Cartier restraint · Sabyasachi atmosphere · Indian luxury · Editorial dark*
