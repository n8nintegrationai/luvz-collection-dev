# ARCHITECTURE.md — System Design & Topology

---

## Data Flow

### Page Load & Product Rendering

```
Browser loads index.html
  ↓
app.js deferred → DOMContentLoaded → load() (async)
  ↓
Fetch products.json from jsDelivr CDN (SHA-pinned)
  Fallback: @main tag → MOCK_DATA if offline
  ↓
buildCard(product, section):
  - Register in productRegistry[id] = product
  - Append to carousel track
  ↓
buildCarousel() / buildCategoryBento():
  - pages = ceil(total / vis)
  - Render dots, prev/next, pagination label
  - Store state in CS[sectionName]
  ↓
IntersectionObservers activate:
  - .reveal → add 'in' on first intersection (threshold 0.07)
  - Nav-active → highlight current section
  - Vault → start/stop RAF loop on viewport entry/exit
  ↓
handleInitialHash() after 400ms setTimeout:
  - If #product/{slug} in URL, find in productRegistry, call openModal()
```

### Product Card Click

```
onclick → openModal(product):
  - Set --modal-h to window.innerHeight
  - Populate modal fields; call renderGalleryFrame()
  - Add .open to #moverlay; lock body scroll
  - pushProductHash(slug) → history.replaceState
  - setMetaTags() → update og:title, og:image
  - Attach keydown listener for gallery arrow keys

closeModal():
  - Remove .open; restore body scroll
  - Remove keydown listener
  - clearHash() → restore URL; reset meta tags
```

### Chat Flow (Streaming)

```
luvz-chat.js send(text):
  - addMessage('user', text); showTyping()
  - buildChatHistory() from localStorage (last 10 messages, 'bot' → 'assistant')
  - Call window.streamLuvzResponse({ onDelta, onSources, onComplete, onError })
  ↓
app.js streamLuvzResponse():
  - POST to LUVZ_CHAT_API_URL: { message, history }
  ↓
Oracle FastAPI (local ARM):
  - sentence-transformers: embed user query
  - Query local vector DB + products.json for RAG context
  - POST to Ollama (luvz-fast, Llama 3.2 1B)
  - Stream SSE response
  ↓
SSE events parsed by parseSSEBlock():
  - 'text'    → onDelta(data)   → append to bubble
  - 'sources' → onSources(data) → render product grid
  - 'done'    → onComplete()    → saveHistory()
  - 'error'   → onError(data)   → show error bubble
  ↓
History saved to localStorage['luvz_chat_v3'] with 24h TTL
```

### Wishlist State

```
toggleWish(btn, id):
  - Read localStorage['luvz-wish']
  - Add or remove id; update heart fill; call updateWishCount()
  - Save back to localStorage

openWishlist() → renderWishDrawer():
  - For each id in wishlist, look up productRegistry
  - Build drawer HTML with image, name, price, WA link
  - Build "Enquire All" WA link with all product names
  - Add .open to #wish-overlay and #wish-drawer; lock body scroll

removeFromWishlist(id):
  - Splice from wishlist; update heart fill on matching buttons
  - Call updateWishCount(); re-render drawer; save localStorage

closeWishlist():
  - Remove .open; restore body scroll
```

---

## Rendering Ownership

### index.html
Owns: all HTML structure, all CSS in `<style>` block, stubs for chat popup / wishlist drawer / modal / carousel tracks, inline GA4 + JSON-LD + admin hotkey scripts.  
Does NOT own: product card HTML, chat bubbles, carousel dots/counts, wishlist drawer content.

### app.js
Owns: `buildCard()`, carousel logic (`buildCarousel`, `goPage`, `getVis`), modal system, wishlist state, `productRegistry`, hash routing, meta tags, scroll effects, vault 3D (`initVault` IIFE), `streamLuvzResponse()`, referral system, all IntersectionObservers, `load()` data fetching.  
Does NOT own: chat UI/UX, chat styling, HTML structure, data schema.

### luvz-chat.js
Owns: trigger show/hide, popup open/close, `addMessage()`, `createBotStream()`, `updateBotStream()`, markdown parsing, source card rendering, `send()`, input handling, `saveHistory()` / `loadHistory()`, suggestion chips, typing indicator, mobile keyboard handling.  
Does NOT own: `streamLuvzResponse()` (app.js), API endpoint, product data.

### luvz-chat.css
Owns: `.luvz-trigger`, `.luvz-popup`, `.luvz-messages`, `.luvz-msg`, `.luvz-bubble`, `.luvz-source-grid`, `.luvz-typing`, `.luvz-suggestions`, input/send button styles, mobile breakpoints ≤600px and ≤480px, safe-area-inset adjustments, z-index layering.  
Does NOT own: any site styles (those are in index.html `<style>`).

### products.json
Owns: all product fields (`id`, `name`, `category`, `section`, `price`, `badge`, `images[]`, `description`, `whatsapp`), section metadata, review data.  
Does NOT own: rendering, styling, or chat RAG context (FastAPI handles that).

### Oracle FastAPI Backend
Owns: POST `/api/chat` SSE handler, sentence-transformers embedding, RAG retrieval, Ollama inference, SSE event streaming, error handling.  
Does NOT own: frontend chat UI, products.json storage, browser-side SSE parsing.

### public/admin/config.yml
Owns: Decap CMS field definitions, GitHub backend config (OAuth, repo, branch, media folder).

---

## Critical Dependencies

### Script Load Order

1. index.html structure and `<style>` block
2. Inline scripts (GA4, JSON-LD, admin hotkey)
3. `<script defer src="app.js">` → executes after DOM ready
4. `app.js` DOMContentLoaded → `load()` → populates `productRegistry`
5. `<script src="/luvz-chat.js">` at end of body

**If luvz-chat.js loads before app.js, `window.streamLuvzResponse` is undefined and chat fails.**

### Breakpoint Sync

CSS `@media` queries and `getVis()` (app.js line 731) must match exactly:

```javascript
getVis() {
  if (window.innerWidth <= 700) return 2;
  if (window.innerWidth <= 1100) return 3;
  return VIS; // 4
}
```

Mismatch → carousel pagination silently fails (cards misalign, snapping jerky).

### Carousel State

`CS[sectionName]` must be populated before render:
```javascript
CS[sec] = { page: 0, pages: Math.ceil(total / vis), total, vis, _r: renderFn };
```
If `getVis()` changes and state isn't recalculated, pagination math breaks.

### Hash Routing Timing

`productRegistry` must be populated before `handleInitialHash()` runs (400ms after DOMContentLoaded). If `load()` is still pending, hash routing fails silently.

### Chat API Dependency

```javascript
// luvz-chat.js send()
if (!window.streamLuvzResponse) {
  addMessage('bot', 'Chat streaming is unavailable. Please refresh the page.');
  return;
}
```

### localStorage Persistence

- Wishlist: `localStorage['luvz-wish']` (JSON array of IDs)
- Chat history: `localStorage['luvz_chat_v3']` with 24h TTL

If localStorage is disabled or quota exceeded, wishlist and chat history are lost silently.

---

## Scroll & Observer Map

```
scroll event (passive):
  ├─ scrollY > 50       → nav.classList.toggle('stuck')
  ├─ scrollY > 100      → hero-discover opacity = 0
  ├─ scrollY > innerHeight * 0.8 → gem-hidden class
  ├─ scrollY > heroHeight * 0.6  → fwa-visible class
  └─ desktop only       → hero parallax translateY

IntersectionObserver (.reveal, threshold 0.07)     → add class 'in'
IntersectionObserver (nav-active, -28% / -58%)     → mark nav link is-active
IntersectionObserver (.lc-fade-up, threshold 0.1)  → trigger lcFadeUp
IntersectionObserver (.stagger-text, threshold 0.12) → add class 'in'
IntersectionObserver (vault-clip, threshold 0.05)  → start/stop RAF loop
```

## Touch Event Map

```
Product card:
  ├─ Heart tap     → toggleWish(btn, id)
  ├─ Image tap     → openModal(product)
  └─ Swipe         → nextPage() / prevPage() (44px threshold)

Modal gallery:
  ├─ Swipe         → galleryNext() / galleryPrev()
  └─ Tap outside   → closeModal()

Wishlist drawer:
  └─ Tap outside   → closeWishlist()
```

## Keyboard Event Priority

```
1. Modal/drawer/popup open?
   ├─ Escape → close active overlay
   └─ Arrow Left/Right (gallery open) → galleryPrev/Next()

2. Chat input focused?
   ├─ Enter        → send(text)
   ├─ Shift+Enter  → newline
   └─ Any key      → autoResize()

3. Global: Ctrl+Alt+L → toggle #admin-link visibility
```

---

## 3D Vault System

```javascript
initVault() IIFE (line 1105):
  1. Query .vault-ring (transform-style: preserve-3d)
  2. RAF loop:
     - Apply rotateX() + rotateY() to vault ring
     - Per card: opacity = 0.3 + 0.7 * depth; z-index = round(depth * 100)
  3. Tap detection:
     - Non-front card tap → rotate vault → wait 650ms → openModal()
  4. Swipe: 44px threshold, left = next, right = prev

_vaultIO IntersectionObserver (threshold 0.05):
  - Viewport entry → start RAF loop
  - Viewport exit  → cancelAnimationFrame(_raf)
```

```css
.vault-scene  { perspective: 680px; transform-style: preserve-3d; }
.vault-ring   { transform-style: preserve-3d; /* JS applies rotateX/Y */ }
.vault-card   { position: absolute; transform: translateZ(...) rotateY(...); }
```

---

## Error Handling

| Scenario | Where Caught | User Experience |
|----------|-------------|----------------|
| products.json fetch fails | `load()` | Falls back to MOCK_DATA (3–5 mock products) |
| Ollama timeout | Oracle FastAPI | Returns error event: "LLM inference failed" |
| Chat SSE timeout (25s) | `streamLuvzResponse()` | "Connection lost. Please try again." |
| Product not in registry (hash) | `handleInitialHash()` | Hash silently ignored, no modal opens |
| localStorage quota exceeded | `saveHistory()` / `saveWishlist()` | Not persisted; no user warning |
| `getVis()` reference error | `getVis()` | Returns VIS fallback (4); carousel still renders |
| `streamLuvzResponse` undefined | `luvz-chat.js send()` | "Chat streaming is unavailable. Please refresh." |

---

## Deployment Checklist

**Frontend (Cloudflare Pages):**
- [ ] LUVZ_CHAT_API_URL in luvz-chat.js matches live Oracle endpoint
- [ ] GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET set in Cloudflare dashboard
- [ ] Test hash routing on live domain
- [ ] Verify mobile chat trigger visibility
- [ ] Test wishlist persistence across reloads
- [ ] Confirm GA4 tracking

**Backend (Oracle FastAPI + Ollama):**
- [ ] FastAPI running at LUVZ_CHAT_API_URL
- [ ] Ollama running with luvz-fast model loaded
- [ ] sentence-transformers embeddings cached
- [ ] Vector DB populated with product embeddings
- [ ] products.json synced to FastAPI service
- [ ] Test SSE streaming end-to-end
- [ ] Monitor ARM CPU/memory under load

**General:**
- [ ] Lighthouse / Core Web Vitals audit
- [ ] Test: Chrome, Firefox, Safari, Edge
- [ ] Remove legacy `functions/` directory (Cloudflare Workers, no longer used)
