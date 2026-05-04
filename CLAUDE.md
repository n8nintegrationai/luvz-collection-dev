# CLAUDE.md — LUVZ Collection

Optimized for AI-assisted development. Last updated: 2026-05-04.

---

## Project Overview

**LUVZ Collection** is a handcrafted luxury jewelry e-commerce site specializing in 92.5 sterling silver and 22K gold polish. Target audience: India-first, mobile-first, luxury-conscious consumers. Brand positioning: restrained elegance, editorial aesthetic, not mass-market ecommerce.

**Tech Stack:**
- Frontend: Vanilla JS, HTML5, CSS3 (no framework, no npm, no build step)
- Hosting: Cloudflare Pages (static site delivery)
- Backend: FastAPI + Ollama + sentence-transformers on Oracle ARM instance (100% local, no cloud APIs)
- Data: products.json (GitHub source of truth, jsDelivr CDN delivery)
- Chat API: Oracle FastAPI endpoint + SSE streaming to local Ollama (luvz-fast model)
- LLM: Ollama with luvz-fast (Llama 3.2 1B, custom Modelfile)
- Embeddings: sentence-transformers (local vector generation)
- CMS: Decap CMS (GitHub OAuth backend, admin at `/admin`)
- GitHub repo: `n8nintegrationai/luvz-collection-dev` (main branch)
- Live domain: `https://www.luvzcollection.com`

**Fonts:** Cinzel (display), Cormorant Garamond (body), Jost (UI, system fallback — not imported).

---

## Repository Architecture

### File Ownership Map

| File | Renders | Owns |
|------|---------|------|
| `public/index.html` | Entire site HTML + all CSS in `<style>` block (259KB) | Structure, sections, nav, hero, modals, drawers, chat widget stub |
| `public/app.js` | (via DOM manipulation) | Product cards, carousels, modals, wishlist, vault 3D, scroll effects, hash routing, referral codes |
| `public/luvz-chat.js` | (via DOM injection) | AI chat widget UI, message bubbles, streaming state, localStorage history |
| `public/luvz-chat.css` | Chat widget styles only | Floating button, popup, messages, input area, mobile responsiveness |
| `public/data/products.json` | (via fetch) | All product catalog, section data (top_sellers, new_collection, heritage, reviews, etc.) |
| Oracle FastAPI Backend | (external API) | Chat RAG service, product search, Gemini integration, SSE streaming |
| `public/admin/config.yml` | Decap CMS schema | Product fields, editable sections, GitHub backend config |

### Data Flow

```
Page load
  ↓
app.js fetch products.json from jsDelivr CDN
  ↓
buildCard() for each product → populates productRegistry
  ↓
buildCarousel() / buildCategoryBento() render sections
  ↓
IntersectionObserver triggers scroll animations (.reveal, .lc-fade-up)

User clicks product card
  ↓
openModal(product) → sets hash #product/{slug}, updates meta tags, renders gallery

User sends chat message
  ↓
luvz-chat.js send() → window.streamLuvzResponse() (in app.js)
  ↓
app.js fetch(LUVZ_CHAT_API_URL) → Oracle FastAPI backend
  ↓
FastAPI RAG service: searches product catalog, calls Gemini API, streams response
  ↓
SSE stream back to client → luvz-chat.js parses deltas, renders bubbles
```

### Critical IDs (Never Rename)

These IDs are hardcoded in JavaScript:

```
#nav              #mob-menu         #moverlay         #hero
#luvz-chat-trigger #luvz-chat-popup #luvz-messages    #luvz-chat-input
#wish-overlay     #wish-drawer      #wish-body        #wish-footer
#cat-bento        #vault-scene      #hero-particles-canvas
#top-sellers      #new-collection   #categories       #heritage
```

### Critical Classes (Never Rename)

These classes are selected by JavaScript or animation system:

```
.reveal              → IntersectionObserver scroll-entrance trigger
.is-visible .open .stuck .wished .in → State classes
.gold-text           → Shimmer animation (delay stacking per element)
.pcard .pcard-wish .pcard-btn → Product card selectors
.carousel-track .carousel-item .c-dot → Carousel navigation
.luvz-*              → All chat widget classes (luvz-msg, luvz-bubble, etc.)
.lc-fade-up .lc-corner .lc-ambient-glow → Hero animation triggers
.vault-ring .vault-clip → 3D vault selectors
.stagger-text        → Hero text stagger animation
```

### Breakpoints (CSS/JS Sync Points)

These must match in both CSS `@media` queries AND `getVis()` logic in app.js:

```
max-width: 600px    → Modal mobile fullscreen + chat fullscreen
max-width: 700px    → Carousel 2 cards per page (getVis() = 2)
max-width: 768px    → Tablet: animations off, categories grid, hero simplification
max-width: 1100px   → Carousel 3 cards (getVis() = 3)
> 1100px            → Carousel 4 cards (VIS constant in app.js)
```

**Source of truth for carousel math:** `getVis()` at app.js line 731.

---

## System Summaries

### Carousel System
- Paginated: displays N cards per page, clamps to `Math.ceil(total / vis)` pages
- Renders dots, prev/next buttons, and count label (e.g., "1–4 of 12")
- State in `CS[sectionName]` as `{ page, pages, total, vis, _r }`
- Track repositioned via `transform: translateX(-page * (cardWidth + gap) * vis)`
- Touch swipe support: 44px threshold, left=next, right=prev
- Resize handler recalculates `vis` and re-renders all carousels

### Modal & Hash Routing
- Opening modal calls `pushProductHash(slug)` → sets `#product/{slug}` in URL
- Also calls `setMetaTags()` → updates og:title, og:description, og:image for social sharing
- On page load: `handleInitialHash()` reads URL hash, finds product in `productRegistry`, opens modal after 400ms (allows DOM to finish rendering)
- Closing modal calls `clearHash()` → restores URL to pathname + search, resets meta tags
- Fragile: 400ms setTimeout gamble — if `load()` is slow (CDN latency), modal may not open

### Wishlist & productRegistry
- `productRegistry[id] = product` populated as each card is built
- Wishlist array stored in `localStorage['luvz-wish']`
- ID generation: `p.id || btoa(p.name || Math.random()).slice(0, 8)` — **fragile if product lacks explicit id field**
- `toggleWish(btn, id)` adds/removes from wishlist, updates heart SVG fill, syncs all visible buttons
- `renderWishDrawer()` reads wishlist, looks up each product in registry, builds drawer HTML with images, prices, WA links
- "Enquire All" link concatenates all product names into one WhatsApp message

### Vault 3D Carousel
- Initiated by `initVault()` IIFE (line 1105)
- Managed by `_vaultIO` IntersectionObserver — starts/stops RAF loop based on viewport visibility
- Transform: `rotateX()` and `rotateY()` applied to `.vault-ring` (preserve-3d)
- Depth dimming: z-index and opacity scaled by card angle
- Tap detection: distance from center + angle calculation to determine which card
- Tap non-front card → rotates vault, waits 650ms, opens modal of tapped product

### Chat & Streaming
- User input in `#luvz-chat-input` → `luvz-chat.js send()` handler
- `send()` calls `window.streamLuvzResponse(options)` (defined in app.js, exposed on window)
- `streamLuvzResponse()` performs SSE fetch to Oracle FastAPI backend (`window.LUVZ_CHAT_API_URL`)
- FastAPI RAG service: (1) uses sentence-transformers to embed user query locally, (2) retrieves similar products from vector DB, (3) calls local Ollama (luvz-fast model), (4) streams SSE response
- SSE deltas parsed and streamed to bot bubble via `onDelta(delta)` callback
- Sources (product recommendations) rendered in grid via `onSources(sources)` callback
- Timeout: 25 seconds before "Connection lost" error
- `luvz-chat.js` saves all messages to `localStorage['luvz_chat_v3']` with 24h TTL
- **Critical dependency:** app.js must load before luvz-chat.js (window.streamLuvzResponse must exist)

### WhatsApp Integration
WhatsApp phone number `918919359961` hardcoded in **3 locations:**
1. `app.js` line 4: `WA_NUM` constant (used in all product cards)
2. `luvz-chat.js` line 37: `WA_NUMBER` constant (used in chat widget)
3. `index.html` inline: hero button WA link

All product cards, wishlist buttons, and referral system use `waURL(name)` helper to build WhatsApp message links.

---

## AI Development Rules

### When Adding Features

1. **Use plan mode** for any change touching > 2 files
2. **Preserve protected IDs/classes** — grep before renaming anything
3. **All CSS in index.html `<style>` block** — never create new .css files except for isolated widgets
4. **Use CSS variables only** — no hardcoded colors, shadows, or spacing (`var(--bg)`, `var(--gold)`, etc.)
5. **Breakpoint changes must sync CSS AND JS** — test carousel at 700px and 1100px boundaries
6. **Test after every change:**
   - Mobile keyboard (chat input 16px font, safe-area-inset-bottom)
   - Carousel snap (resize window past 700px and 1100px)
   - Modal open/close (hash routing, meta tags, gallery swipe)
   - Wishlist (heart toggle, count badge, drawer render)
   - Chat widget (SSE stream, sources grid, typing indicator)

### New Section Workflow

1. Add section object to `products.json` with product array
2. Add nav link: `<a href="#section-id">`
3. Call `buildCarousel('section-name', data['section-name'])` in `load()` (app.js line 920+)
4. Add carousel markup with IDs: `#ct-{section-name}` (track), `#cn-{section-name}` (nav)
5. Ensure nav link scroll-spy works (IntersectionObserver in `initNavActiveIndicator()`)

### Redesign Workflow

- Never embed redesign instructions directly in CLAUDE.md
- Use separate task documentation or PR descriptions
- Keep this file as the system spec — immutable, concise, architecture-focused

---

## Known Fragile Areas

| System | Risk | Mitigation |
|--------|------|-----------|
| Product ID stability | `btoa(Math.random())` changes across page loads if product lacks explicit `id` field | Ensure all products in JSON have `id` field |
| Hash routing 400ms | If `load()` slow, modal won't open on page load via hash | Increase setTimeout to 800ms if CDN latency increases |
| Hero parallax RAF | `requestAnimationFrame(tick)` never stops, runs every frame forever | Add visibility check + cleanup on hero scroll-out-of-view |
| Chat streaming order | `luvz-chat.js` depends on `window.streamLuvzResponse` (in app.js) | Always load app.js before luvz-chat.js (confirmed in index.html) |
| Wishlist heart sync | String inspection of onclick handlers to find matching buttons | Consider `data-pid` attribute as primary selector instead |
| Category carousel nav | Inline `CS['ct-category-{name}']` in onclick attributes | Refactor to use `goPage()` helper for consistency with named sections |
| Dead code bloat | `initHeroParticles()` wrapped in `return` statement (140 lines unused) | Remove or archive to docs/ if ever needed |
| Carousel math mismatch | CSS breakpoints ≠ JS getVis() → silent pagination failures | Verify against test suite on resize (planned) |
| Vault perspective | Recalculates on resize without throttle | Consider `ResizeObserver` with debounce for performance |

---

## Protected Systems

### Oracle FastAPI Backend Endpoint (CRITICAL)

The chat and product search system depends on the Oracle ARM instance running FastAPI + Ollama:

```
window.LUVZ_CHAT_API_URL = https://luvz-rag.oraclecloud.com:8443/api/chat
```

**Never modify or hardcode this URL in the frontend code.** If the backend endpoint changes:
1. Update `window.LUVZ_CHAT_API_URL` assignment in `luvz-chat.js` (line ~25)
2. Update LUVZ_CHAT_API_URL detection logic in `app.js` if hostname/environment changes
3. Test SSE streaming and chat widget before deploying

Endpoint features:
- RAG service: searches products.json + local vector embeddings (sentence-transformers)
- Local LLM: Ollama running luvz-fast (Llama 3.2 1B, custom Modelfile)
- SSE streaming: streams response deltas with sources (product recommendations)
- Timeout: 25 seconds per request

---

## Environment Variables

Set in Cloudflare dashboard only (never in repo):
- `GITHUB_CLIENT_ID` — GitHub OAuth app ID (Decap CMS admin)
- `GITHUB_CLIENT_SECRET` — GitHub OAuth app secret (Decap CMS admin)

Oracle FastAPI environment (managed separately, no cloud APIs):
- Backend runs on private Oracle ARM instance (internal network)
- Database: products.json + local vector store (RAG context)
- Embeddings: sentence-transformers (local embedding generation)
- LLM: Ollama with luvz-fast model (100% local inference, no external API calls)

---

## Deployment

**Frontend (Cloudflare Pages):**
```bash
# Local preview
# Open public/index.html via VS Code Live Server (configured in .vscode/settings.json, port 5502)

# Deploy to Cloudflare Pages
wrangler deploy
```

**Backend (Oracle FastAPI + Ollama):**
- Managed separately on Oracle ARM instance
- Verify LUVZ_CHAT_API_URL points to correct endpoint before going live
- Chat widget tests SSE streaming on page load

**Pre-deployment checklist:**
- [ ] Oracle FastAPI backend is running and accessible
- [ ] Ollama service is running with luvz-fast model loaded
- [ ] sentence-transformers embeddings are cached and ready
- [ ] LUVZ_CHAT_API_URL in luvz-chat.js matches live endpoint
- [ ] Test chat widget on production domain (full SSE stream)
- [ ] Verify products.json is up-to-date on backend RAG service
- [ ] Monitor ARM resource usage (CPU, memory) during load testing

---

## Quick Links

- **Design System:** see `DESIGN_SYSTEM.md`
- **Known Issues:** see `CURRENT_ISSUES.md`
- **Architecture Deep Dive:** see `ARCHITECTURE.md`
