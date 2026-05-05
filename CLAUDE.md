# CLAUDE.md — LUVZ Collection

## Project Overview

**LUVZ Collection** — handcrafted 92.5 sterling silver and 22K gold polish jewelry. India-first, mobile-first.

**Tech Stack:**
- Frontend: Vanilla JS, HTML5, CSS3 (no framework, no npm, no build step). Hosting: Cloudflare Pages.
- Backend: FastAPI + Ollama + sentence-transformers on Oracle ARM instance (100% local, no cloud APIs).
- Data: `products.json` (GitHub source of truth, jsDelivr CDN delivery).
- Chat API: Oracle FastAPI + SSE streaming → local Ollama (`luvz-fast`, Llama 3.2 1B).
- CMS: Decap CMS (GitHub OAuth backend, admin at `/admin`).
- Repo: `n8nintegrationai/luvz-collection-dev` (main). Live: `https://www.luvzcollection.com`.

**Fonts:** Cinzel (display), Cormorant Garamond (body), Jost (UI — not imported, system fallback).

---

## File Ownership

| File | Owns |
|------|------|
| `public/index.html` | All HTML structure + all CSS in `<style>` block (259KB) |
| `public/app.js` | Product cards, carousels, modals, wishlist, vault 3D, scroll effects, hash routing, referral codes |
| `public/luvz-chat.js` | Chat widget UI, message bubbles, streaming state, localStorage history |
| `public/luvz-chat.css` | Chat widget styles only |
| `public/data/products.json` | All product catalog and section data |
| Oracle FastAPI Backend | Chat RAG service, product search, SSE streaming |
| `public/admin/config.yml` | Decap CMS schema and GitHub backend config |

---

## Critical IDs (Never Rename)

```
#nav              #mob-menu         #moverlay         #hero
#luvz-chat-trigger #luvz-chat-popup #luvz-messages    #luvz-chat-input
#wish-overlay     #wish-drawer      #wish-body        #wish-footer
#cat-bento        #vault-scene      #hero-particles-canvas
#top-sellers      #new-collection   #categories       #heritage
```

## Critical Classes (Never Rename)

```
.reveal              → IntersectionObserver scroll-entrance trigger
.is-visible .open .stuck .wished .in → State classes
.gold-text           → Shimmer animation (delay stacking per element)
.pcard .pcard-wish .pcard-btn → Product card selectors
.carousel-track .carousel-item .c-dot → Carousel navigation
.luvz-*              → All chat widget classes
.lc-fade-up .lc-corner .lc-ambient-glow → Hero animation triggers
.vault-ring .vault-clip → 3D vault selectors
.stagger-text        → Hero text stagger animation
```

## Breakpoints (CSS and JS must match)

```
max-width: 600px    → Modal mobile fullscreen + chat fullscreen
max-width: 700px    → Carousel 2 cards (getVis() = 2)
max-width: 768px    → Animations off, categories grid, hero simplified
max-width: 1100px   → Carousel 3 cards (getVis() = 3)
> 1100px            → Carousel 4 cards (VIS constant in app.js)
```

Source of truth for carousel math: `getVis()` at app.js line 731.

---

## System Summaries

### Carousel
- Paginated: N cards per page, `Math.ceil(total / vis)` pages. State in `CS[sectionName]`.
- Track: `transform: translateX(-page * (cardWidth + gap) * vis)`.
- Touch swipe: 44px threshold. Resize recalculates `vis` and re-renders all carousels.

### Modal & Hash Routing
- `openModal()` calls `pushProductHash(slug)` → sets `#product/{slug}`, then `setMetaTags()`.
- `closeModal()` calls `clearHash()` → restores URL, resets meta tags.
- `handleInitialHash()` on page load: reads hash, opens modal after 400ms setTimeout. Fragile if CDN is slow.

### Wishlist & productRegistry
- `productRegistry[id] = product` populated as each card builds.
- Wishlist in `localStorage['luvz-wish']`. ID: `p.id || btoa(p.name || Math.random()).slice(0, 8)` — fragile if product lacks explicit `id`.
- `toggleWish()` adds/removes, updates heart SVG fill, syncs all visible buttons.
- "Enquire All" concatenates all product names into one WhatsApp message.

### Vault 3D
- `initVault()` IIFE (line 1105). RAF loop managed by `_vaultIO` IntersectionObserver (starts/stops on viewport entry/exit).
- Tap non-front card → rotates vault, waits 650ms, opens modal.

### Chat & Streaming
- `luvz-chat.js send()` → `window.streamLuvzResponse()` (defined in app.js, must exist first).
- SSE fetch to `window.LUVZ_CHAT_API_URL`. Timeout: 25s.
- History saved to `localStorage['luvz_chat_v3']` with 24h TTL.
- **app.js must load before luvz-chat.js.**

### WhatsApp
Phone number `918919359961` hardcoded in three places: `app.js` line 4 (`WA_NUM`), `luvz-chat.js` line 37 (`WA_NUMBER`), `index.html` hero button. All WA links built via `waURL(name)`.

---

## Development Rules

1. Use plan mode for any change touching > 2 files.
2. Grep before renaming any ID or class.
3. All CSS goes in `index.html <style>` block — never create new `.css` files except for isolated widgets.
4. Use CSS variables only — never hardcode colors, shadows, or spacing.
5. Breakpoint changes must sync CSS and JS. Test carousel at 700px and 1100px.
6. After every change, test: mobile keyboard (chat input 16px font, safe-area-inset-bottom), carousel snap (resize past 700px and 1100px), modal open/close (hash, meta, gallery swipe), wishlist (heart toggle, count badge, drawer), chat (SSE stream, sources grid, typing indicator).

### New Section Workflow
1. Add section object to `products.json`.
2. Add nav link `<a href="#section-id">`.
3. Call `buildCarousel('section-name', data['section-name'])` in `load()` (app.js line 920+).
4. Add markup: `#ct-{section-name}` (track), `#cn-{section-name}` (nav).

---

## Known Fragile Areas

| System | Risk | Mitigation |
|--------|------|-----------|
| Product ID stability | `btoa(Math.random())` changes on reload if product lacks `id` | Ensure all products in JSON have explicit `id` |
| Hash routing 400ms | Slow CDN → modal won't open on page load | Increase setTimeout to 800ms if CDN latency increases |
| Hero parallax RAF | `requestAnimationFrame(tick)` never stops | Add visibility check; stop on hero scroll-out |
| Chat load order | `luvz-chat.js` depends on `window.streamLuvzResponse` | app.js must load first (confirmed in index.html) |
| Wishlist heart sync | Uses string inspection of onclick to find buttons | Use `data-pid` as primary selector instead |
| Category carousel nav | Inline `CS['ct-category-{name}']` in onclick | Refactor to use `goPage()` helper |
| Dead code | `initHeroParticles()` wrapped in `return` (140 lines) | Remove or archive |
| Carousel math mismatch | CSS breakpoints ≠ `getVis()` → silent pagination failures | Verify on resize |
| Vault resize | Recalculates perspective without throttle | Add `ResizeObserver` with debounce |

---

## Protected: Oracle FastAPI Endpoint

```
window.LUVZ_CHAT_API_URL = https://luvz-rag.oraclecloud.com:8443/api/chat
```

Never hardcode this URL elsewhere. If it changes: update `luvz-chat.js` line ~25, update detection logic in `app.js`, test SSE before deploying.

---

## Environment Variables

Cloudflare dashboard only (never in repo):
- `GITHUB_CLIENT_ID` — GitHub OAuth app ID (Decap CMS)
- `GITHUB_CLIENT_SECRET` — GitHub OAuth app secret (Decap CMS)

---

## Deployment

**Frontend:** `wrangler deploy`. Local preview via VS Code Live Server (port 5502).

**Pre-deployment checklist:**
- [ ] Oracle FastAPI backend running and accessible
- [ ] Ollama running with luvz-fast model loaded
- [ ] sentence-transformers embeddings cached
- [ ] LUVZ_CHAT_API_URL in luvz-chat.js matches live endpoint
- [ ] Test chat widget SSE on production domain
- [ ] products.json synced to backend RAG service
- [ ] Monitor ARM CPU/memory under load

---

## Quick Links
- **Design System:** `docs/design/DESIGN_SYSTEM.md`
- **Design System:** `docs/design/LUXURY_DIRECTION.md`
- **Known Issues:** `docs/issues/CURRENT_ISSUES.md`
- **Architecture:** `docs/architecture/ARCHITECTURE.md`