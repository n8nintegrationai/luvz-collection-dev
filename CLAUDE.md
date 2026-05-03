# CLAUDE.md — LUVZ Collection

This file is read automatically by Claude Code at the start of every session.
For full architectural detail, see `PROJECT_CONTEXT.md`.

---

## Project Overview

**LUVZ Collection** — luxury handcrafted jewelry e-commerce site (92.5 sterling silver, 22K gold polish).
**Stack**: Vanilla JS · HTML5 · CSS3 · No framework · No build step · No npm
**Hosting**: Cloudflare Pages + Cloudflare Workers (serverless functions)
**GitHub remote**: `n8nintegrationai/luvz-collection-dev`
**Live site**: Cloudflare Pages · Product data CDN via jsDelivr

---

## Development Commands

```bash
# Local preview
# Open public/index.html via VS Code Live Server on port 5502
# (configured in .vscode/settings.json)

# Deploy
wrangler deploy

# Local API testing
# functions/api/chat.js falls back to http://127.0.0.1:8000/chat
# Override endpoint: set window.LUVZ_CHAT_API_URL in luvz-chat.js
```

**Environment variables** (Cloudflare dashboard only — never in repo):
- `GEMINI_API_KEY` — Google Generative AI
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — GitHub OAuth for CMS admin

---

## File Map

| File | Role |
|------|------|
| `public/index.html` | Entire site HTML + ALL CSS inline in `<style>` tag |
| `public/app.js` | Product rendering, carousels, modals, wishlist, theme, JSON-LD |
| `public/luvz-chat.js` | Chat widget: streaming, markdown parsing, localStorage history |
| `public/luvz-chat.css` | Chat widget styles ONLY — the only separate CSS file |
| `public/data/products.json` | Master product catalog — source of truth for all sections |
| `functions/api/chat.js` | Cloudflare Worker: Gemini API integration for chat |
| `public/admin/config.yml` | Decap CMS schema — defines editable fields |
| `public/_headers` | Cache rules, CSP, HSTS, CORS |

---

## Architecture Rules

### CSS
- **ALL site CSS lives in a single `<style>` block inside `index.html`**
- **DO NOT create separate `.css` files** for site styles — only `luvz-chat.css` exists separately
- Themes driven by `[data-theme="earth|light|dark"]` on `<html>` element
- **ALWAYS use CSS variables** — never hardcode colors, shadows, or spacing:
  ```css
  /* ✅ Correct */       color: var(--txt);   box-shadow: var(--sh);
  /* ❌ Wrong   */       color: #EAD9BC;      box-shadow: 0 2px 20px rgba(0,0,0,.5);
  ```
- Key variables: `--bg`, `--bg2`, `--bg3`, `--card`, `--txt`, `--txt2`, `--gold`, `--gold-l`, `--gold-xl`, `--border`, `--sh`, `--sh-h`, `--sh-modal`

### JavaScript
- `app.js` uses **vanilla JS, no imports**
- Script load order is CRITICAL — never reorder:
  1. Inline theme IIFE (in `<style>` block of index.html)
  2. `app.js`
  3. `luvz-chat.js`
- Key global state (extend, do NOT overwrite):
  - `CS` — carousel state per section
  - `productRegistry` — `id → product` map
  - `window.LuvzChatUI` — public API consumed by luvz-chat.js
  - `window.LUVZ_CHAT_API_URL` — overridable chat endpoint

### Data Flow
1. `index.html` loads → `app.js` fetches `products.json` from jsDelivr CDN
2. `app.js` renders all product sections, carousels, and modals from JSON
3. User sends chat → `luvz-chat.js` POSTs to `/api/chat`
4. `functions/api/chat.js` fetches fresh `products.json` from GitHub → sends to Gemini API → streams response back

---

## ⛔ NEVER Rename These IDs (JS selects them directly)

```
#nav              #mob-menu         #moverlay
#luvz-chat-trigger  #luvz-chat-popup  #luvz-messages
#luvz-chat-input  #luvz-chat-send
#wish-overlay     #wish-drawer      #wish-body    #wish-footer
```

## ⛔ NEVER Rename These Classes (JS depends on them)

```
.reveal              → IntersectionObserver scroll animation trigger
.is-visible .open .stuck .wished .active .in  → state classes toggled by JS
.gold-text           → gradient animation + delay stacking
.pcard .pcard-wish .pcard-btn  → product card selectors
.luvz-*              → all chat widget classes (luvz-msg, luvz-close-btn, etc.)
.carousel-track .carousel-item .c-dot .c-btn  → carousel navigation
.modal               → product detail modal
```

## ⛔ NEVER Change These Breakpoints (CSS AND JS must stay in sync)

```css
max-width: 600px    /* Chat mobile fullscreen cutoff */
max-width: 700px    /* Carousel 2-item view */
max-width: 768px    /* Tablet + particle disable */
max-width: 1100px   /* Carousel 3-item view */
```
**Why**: `getVis()` in app.js uses these exact pixel values for pagination math.

---

## Known Fragile Areas — Test These After Any Change

| Area | Risk | How to Test |
|------|------|-------------|
| Mobile keyboard / viewport | Input area overflows when keyboard opens | Open chat on real mobile, type long message |
| iOS Safari scroll | CSS `overflow:hidden` + `transform` freezes scroll | Test category carousel on iOS Safari |
| Chat popup position | Fixed button hidden under navbar on small screens | Check bottom nav doesn't cover chat trigger |
| Hash routing (`#product/{slug}`) | Shareable links break if product name slugs change | Share product URL, verify modal opens on fresh load |
| Carousel breakpoints | Pagination math breaks if CSS ≠ JS breakpoints | Resize window across 700px and 1100px |
| WhatsApp number | `WA_NUM` hardcoded in 3 places: `app.js`, `luvz-chat.js`, HTML | Search all files if number changes |
| `.gold-text` nth-child delays | Animation delay conflicts with new elements | Inspect animation timing after adding new gold-text elements |
| JSON structure | Missing keys in products.json silently break sections | Validate JSON keys: `top_sellers`, `new_collection`, category keys, `heritage`, `about` |

---

## Safe Patterns — Follow These When Adding Code

**New CSS style?**
- Use CSS variables: `color: var(--txt)` not `color: #EAD9BC`
- Use existing spacing tokens: `gap: 8px` not `gap: 9px`
- Use `var(--sh)` for shadows, never hardcode
- Add `reveal` class if element should animate on scroll

**New JS function?**
- Extend global objects: `CS.newProp = ...` not `window.newProp = ...`
- Wrap new code in IIFEs for encapsulation if top-level
- Don't add new event targets unless strictly necessary

**New component?**
- Use existing class prefixes: `.pcard-*`, `.luvz-*`
- Add `reveal` class for scroll-entrance animation

**New section?**
1. Add `id="my-section"` to HTML
2. Add nav link: `href="#my-section"` (auto-detected by scroll observer)
3. Add data to `products.json` under section key
4. Call `buildCarousel('my-section', data['my-section'])` in app.js

**New external script or API?**
- Update CSP header in `public/_headers` — current policy restricts script sources

---

## Product Data Shape (products.json)

Each product: `id`, `name`, `category`, `section`, `price`, `badge`, `images[]`, `description`, `material`, `whatsapp` (pre-filled message URL).

Sections: `top_sellers`, `new_collection`, `necklace`, `pendant`, `earrings`, `bangles`, `jhumkas`, `sets`, `heritage`, `about`

---

## Fonts

- **Cinzel** — display/headings (luxury feel)
- **Cormorant Garamond** — body (elegant, readable)
- **Jost** — UI/chat (modern, clean)

Loaded from Google Fonts with `preconnect` for performance. Font-size `16px` on chat input prevents iOS auto-zoom.

---

## Before Starting Any Redesign or Multi-File Task

1. Confirm you are in **plan mode** — review the full plan before any files are touched
2. Run `git status` — ensure a clean working tree or stash uncommitted changes
3. Identify which IDs/classes from the ⛔ lists above are in scope — do not rename them
4. Check the **Known Fragile Areas** table — plan to test affected areas after the change
5. Run `/compact` if continuing from a previous session to avoid context drift

---

*Last updated: May 2026 | Target browsers: Chrome, Firefox, Safari iOS 15+, Edge*

## 🎯 Current Task Context
- **Objective:** Execute the Full Cinematic Redesign (v1.2).
- **Scope:** Includes Hero section cleanup, "Jewellery Stylist" rebranding, and Luxury Motion System implementation.
- **Priority:** Ensure 100% adherence to the "PROTECTED" list in the main prompt.
- **Status:** ✅ replace-carousel-bento-grid

---

## 📅 Dated Events, Projects & Plans
* **2026-05-02:** Applied Redesign v1.2. Completed "Jewellery Stylist" rebranding, Hero cinematic gradients, and initial Motion System.
* **2026-05-02:** Applied Hero Micropolish (8 CSS-only changes to `#hero` and `#nav`): (1) `#hero::before` replaced with 4-layer cinematic atmospheric gradient (108° diagonal pull + warm haze pocket + bottom/top fades); (2) new `#hero .hero-content::before` organic haze + CSS grain for left-side texture depth; (3) `#hero::after` amber bloom widened to 4 radial layers bleeding across the center divide; (4) jewelry wrapper focal glow rules added (inert until HTML wraps `img.hero-img`); (5) title text-shadow diffused to 120px outer glow, `letter-spacing: 0.09em`, "COLLECTION" span gets atmospheric shadow; (6) buttons thinned to `border: 1px`, `border-radius: 1px`, slower `0.7s` transitions; (7) `#nav:not(.stuck)` made transparent gradient over hero, normal on scroll; (8) mobile `@media (768px)` simplified overlay and texture layer disabled.
* **2026-05-02:** Applied Hero Fix v1.3. Eight surgical fixes to `#hero` and cursor glow: (1) removed "Real silver. Real craft. Made for you." tagline; (2) LUVZ title overridden to warm gold #F0C96A with glow text-shadow (cleared gradient background-clip); (3) eyebrow + descriptor line contrast boosted; (4) buttons restyled to ghost gold glass with shimmer sweep on hover; (5) mobile buttons stack vertically with 56px margin clearing the discover indicator; (6) desktop discover indicator made fully visible with bouncing chevron; (7) hero/proof-bar gap removed; (8) cursor glow fixed (z-index 0→9999, opacity 4%→9%, idempotent element lookup).
* **2026-05-02:** Optimized mobile performance and stability by removing heavy animations and jitter, while ensuring full accessibility for reduced-motion settings. Refined the luxury brand aesthetic by restoring Cinzel typography and adding subtle gold hairline separators for a cleaner, editorial feel.
* **2026-05-03:** Replaced "Shop by Category" auto-scroll carousel with a static asymmetric CSS Grid bento mosaic — 6 tiles, glass-bar labels with `backdrop-filter`, GPU-composited hover, click-to-scroll anchors; removed `initCategoryAutoScroll`, `buildCatTile`, and all `.cat-carousel-*` / `.cat-tile*` CSS.