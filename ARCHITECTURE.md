# ARCHITECTURE.md — System Design & Topology

Technical reference for understanding data flow, rendering ownership, and system interactions.

---

## Data Flow

### Page Load & Product Rendering

```
User visits https://www.luvzcollection.com
  ↓
Browser loads index.html, parses HTML structure
  ↓
Deferred app.js script loads (after DOM ready)
  ↓
app.js DOMContentLoaded handler calls load()
  ↓
load() function (async):
  - Fetch products.json from jsDelivr CDN (caching via GitHub commit SHA)
  - Fallback to @main tag, then to MOCK_DATA if offline
  - Parse JSON into products object
  ↓
buildCard(product, section) called for each product:
  - Create HTML card element
  - Register in productRegistry[id] = product (lookup for wishlist, modal)
  - Append to section carousel track
  ↓
buildCarousel() / buildCategoryBento() render all sections:
  - Calculate pagination (pages = ceil(total / vis))
  - Render dots, prev/next buttons, pagination label
  - Store state in CS[sectionName]
  ↓
Scroll observers activate:
  - .reveal elements add class 'in' on first intersection (threshold 0.07)
  - Nav-active observer highlights current section in nav
  - Hero fade-up animations trigger
  - Vault IntersectionObserver starts/stops 3D rotation loop
  ↓
handleInitialHash() (after 400ms setTimeout):
  - If URL has #product/{slug}, search productRegistry for matching product
  - If found, call openModal(product)
  ↓
Page fully rendered and interactive
```

### User Interaction: Product Card Click

```
User clicks product card
  ↓
onclick="openModal(JSON.parse(this.dataset.p), badge)"
  ↓
openModal(product) function:
  - Set --modal-h CSS variable to window.innerHeight
  - Populate modal fields: name, price, description, badge
  - Call renderGalleryFrame() to set up image gallery
  - Add .open class to #moverlay (overlay animates to visible)
  - Lock body scroll (overflow: hidden)
  - Call pushProductHash(slug) → history.replaceState(null, '', '#product/{slug}')
  - Call setMetaTags() → update og:title, og:image for social sharing
  - Attach keydown listener for arrow key gallery navigation
  - Store product reference in _currentModalProduct (for referral system)
  ↓
Modal now visible and interactive

User closes modal (click close button, click overlay, press Escape)
  ↓
closeModal() function:
  - Remove .open class from #moverlay (animate to hidden)
  - Restore body scroll (overflow: '')
  - Remove keydown listener
  - Call clearHash() → history.replaceState(null, '', pathname + search)
  - Reset all meta tags to site defaults
  ↓
Modal hidden; URL restored to no fragment
```

### Chat Flow (Streaming)

```
User types message in #luvz-chat-input
  ↓
User presses Enter or clicks #luvz-chat-send
  ↓
send(text) function in luvz-chat.js:
  - addMessage('user', text) → renders user bubble in DOM
  - showTyping() → shows three-dot typing indicator
  - buildChatHistory() → reads localStorage, maps 'bot' → 'assistant'
  - Prepare payload: { role: 'user', text } + conversation history (last 10 messages)
  - Call window.streamLuvzResponse(options) with callbacks:
    · onDelta(delta) → append delta to bot bubble
    · onSources(sources) → render source cards grid
    · onComplete() → mark message done, save to localStorage
    · onError(message) → show error message
  ↓
streamLuvzResponse() in app.js:
  - Fetch POST to LUVZ_CHAT_API_URL (Oracle FastAPI backend):
    · Production: https://luvz-rag.oraclecloud.com:8443/api/chat
    · Override via window.LUVZ_CHAT_API_URL
  - Request body:
    { message: userText, history: [...] }
  ↓
Oracle FastAPI RAG Backend (100% local, no cloud APIs):
  - Extract userText from request JSON
  - Use sentence-transformers to generate embedding for user query
  - Query local vector database + products.json for relevant product context
  - Prepare Ollama request with RAG context:
    · System prompt: "You are the Luvz Style Assistant..."
    · Retrieved products: [{ id, name, price, description, whatsapp_url }, ...]
    · User message: {message}
  - POST to local Ollama service (luvz-fast model, Llama 3.2 1B)
  - Stream response back as SSE (Server-Sent Events)
  ↓
SSE stream arrives at browser:
  - parseSSEBlock() parses each event block into { event, data }
  - If event: 'text' → call onDelta(data)
  - If event: 'sources' → call onSources(JSON.parse(data))
  - If event: 'done' → call onComplete()
  - If event: 'error' → call onError(data)
  ↓
Callbacks in send() handler:
  - onDelta: updateBotStream(stream, delta) → append text to bubble
  - onSources: setBotStreamSources(stream, sources) → render product cards grid
  - onComplete: completeBotStream(stream) → mark done, saveHistory()
  - onError: failBotStream(stream, message) → show error bubble
  ↓
Message saved to localStorage['luvz_chat_v3'] with 24h TTL
  ↓
User can see bot response with product recommendations + WhatsApp links
```

### Wishlist State (localStorage)

```
User clicks wishlist heart on product card
  ↓
toggleWish(btn, id) function:
  - Get current wishlist from localStorage['luvz-wish'] (JSON array of product IDs)
  - If id in array → remove it (splice), set btn fill to 'none'
  - If id not in array → add it, set btn fill to var(--gold)
  - Call updateWishCount() → update all three badge elements
  - Save wishlist back to localStorage
  ↓
updateWishCount() function:
  - Read wishlist from localStorage
  - Update #nav-wish-count (desktop nav badge)
  - Update #mob-wish-count (mobile nav badge)
  - Update #wish-count-badge (wishlist drawer badge)
  ↓
User opens wishlist drawer (click heart button or menu option)
  ↓
openWishlist() function:
  - Call renderWishDrawer() → for each ID in wishlist, look up in productRegistry
  - Build drawer HTML with product image, name, price, individual WA link
  - Build "Enquire All" link that concatenates all product names into one WA message
  - Add .open class to #wish-overlay and #wish-drawer
  - Lock body scroll
  ↓
User removes product from drawer
  ↓
removeFromWishlist(id) function:
  - Splice id from wishlist array
  - Find all .pcard-wish buttons matching id (by data-pid or onclick string inspect)
  - Update their fill to 'none'
  - Update wishlist count badges
  - Re-render drawer
  - Save wishlist back to localStorage
  ↓
User closes wishlist (click overlay, press Escape, click item)
  ↓
closeWishlist() function:
  - Remove .open class from #wish-overlay and #wish-drawer
  - Restore body scroll
```

---

## Rendering Ownership

### index.html (Static Structure)

Owns:
- All semantic HTML: `<section id="hero">`, `<nav id="nav">`, etc.
- All CSS in `<style>` block (259KB, single source of truth for site styles)
- Chat widget stub: `<div id="luvz-chat-popup">` (empty, filled by luvz-chat.js)
- Wishlist drawer: `<div id="wish-drawer">` (structure, not content)
- Product modal: `<div id="moverlay">` (structure, not product data)
- Carousel track/nav stubs: `<div id="ct-{section}">`, `<div id="cn-{section}">` (JS populates)
- Inline scripts: GA4 tracking, JSON-LD schema, admin toggle hotkey

Does NOT own:
- Product card HTML (app.js builds this)
- Chat message bubbles (luvz-chat.js builds this)
- Carousel navigation dots and counts (app.js builds this)
- Wishlist drawer content (app.js builds this)

### app.js (Business Logic + DOM Manipulation)

Owns:
- **Product rendering:** buildCard(product, section) creates `<div class="pcard">` with all fields
- **Carousel logic:** buildCarousel(), buildCarouselInSection(), goPage(), getVis()
- **Modal system:** openModal(), closeModal(), renderGalleryFrame(), galleryPrev/Next
- **Wishlist state:** toggleWish(), renderWishDrawer(), removeFromWishlist(), getWishlist(), saveWishlist()
- **Product registry:** productRegistry[id] = product (central lookup table)
- **Hash routing:** handleInitialHash(), pushProductHash(), clearHash()
- **Meta tags:** setMetaTags(), SITE_TITLE, SITE_DESC, SITE_URL
- **Scroll effects:** sticky nav, hero parallax, hero chevron fade, gem bar, FWA button
- **Vault 3D:** initVault() IIFE, tap detection, rotation animation, depth dimming
- **Chat integration:** streamLuvzResponse(), SSE parsing, callbacks
- **Referral system:** applyReferralCode(), referral validation, WA link building
- **IntersectionObservers:** .reveal animations, nav-active indicator, hero entrance, vault toggle
- **Data fetching:** load() async function, GitHub fetch with fallbacks, MOCK_DATA

Does NOT own:
- Chat UI/UX (luvz-chat.js)
- Chat styling (luvz-chat.css)
- HTML structure (index.html)
- Data schema (products.json)

### luvz-chat.js (Chat Widget)

Owns:
- **Chat UI:** trigger button show/hide, popup open/close, animations
- **Message rendering:** addMessage(), createBotStream(), updateBotStream()
- **Markdown parsing:** parseMarkdown() converts MD links/formatting to HTML
- **Source cards:** renderSourceCards() builds product grid with image/price/CTA
- **Input handling:** send(), autoResize(), keyboard event handlers
- **History:** saveHistory(), loadHistory(), buildChatHistory() (localStorage management)
- **Suggestion chips:** rendering suggested follow-up questions
- **Typing indicator:** showTyping(), hideTyping()
- **Mobile keyboard:** safe-area-inset handling, overflow: hidden lock

Does NOT own:
- SSE streaming (app.js window.streamLuvzResponse())
- API endpoint (Oracle FastAPI backend)
- Gemini API integration
- Product data

### luvz-chat.css (Chat Styling)

Owns:
- `.luvz-trigger` button styles (floating pill, glass morphism, animations)
- `.luvz-popup` modal styles (fixed position, dropdown, mobile fullscreen)
- `.luvz-messages` scroll container and message bubble styling
- `.luvz-msg` / `.luvz-bubble` text formatting
- `.luvz-source-grid` and `.luvz-source-card` product card grid
- `.luvz-typing` indicator animation
- `.luvz-suggestions` chip styles
- `.luvz-chat-input` and `#luvz-chat-send` button styles
- Mobile breakpoints: `@media (max-width: 600px)` and `@media (max-width: 480px)`
- Safe-area-inset adjustments for iPhone notch/home-indicator
- Z-index layering (9998 desktop, 99999 mobile)

Does NOT own:
- Any site styles (all in index.html `<style>`)
- Responsive behavior outside 600px breakpoint (handled by popup fixed positioning)

### products.json (Data Source of Truth)

Owns:
- All product catalog: `id`, `name`, `category`, `section`, `price`, `badge`, `images[]`, `description`, `whatsapp`
- Section metadata: `top_sellers`, `new_collection`, category sections, `heritage`, `about`, `reviews`
- Review data: `customer-love` marquee content with author, rating, image

Does NOT own:
- Rendering logic (app.js handles this)
- Styling (CSS in index.html)
- Chat context (Oracle FastAPI fetches and processes product data)

### Oracle FastAPI Backend (External Service, 100% Local)

Runs on private Oracle ARM instance as independent service. Zero cloud API dependencies.

Owns:
- **API endpoint:** POST `/api/chat` handler (SSE streaming)
- **Embedding generation:** sentence-transformers (local vector generation)
- **RAG retrieval:** Queries local vector database + products.json for relevant products
- **LLM inference:** Sends user query + RAG context to local Ollama (luvz-fast model)
- **Response streaming:** Streams SSE events (text deltas, sources, completion)
- **Error handling:** Catches inference failures, returns error events

Does NOT own:
- Frontend chat UI (luvz-chat.js)
- Product catalog storage (products.json stored on GitHub)
- Browser-side streaming parsing (app.js)

### public/admin/config.yml (Decap CMS Schema)

Owns:
- CMS field definitions: product shape, section lists, editable fields
- GitHub backend configuration: OAuth, repo reference, branch, media folder

Does NOT own:
- CMS UI (Decap CMS provides this)
- Product rendering (that's app.js)

---

## Critical Dependencies

### Load Order (Script Execution)

1. **index.html structure** (parsed immediately)
2. **`<style>` block** in index.html (CSS applied immediately)
3. **Inline scripts** in index.html (GA4, JSON-LD, admin hotkey)
4. **`<script defer src="app.js">`** (queued, executes after DOM ready)
5. **app.js DOMContentLoaded** → calls load() async function
6. **load() completes** → products.json fetched, buildCard() populates registry
7. **`<script src="/luvz-chat.js">`** at end of body (executes last)
8. **luvz-chat.js IIFE** checks `window.streamLuvzResponse` exists; if not, shows error

**Critical:** If luvz-chat.js loads before app.js, chat will fail with "streaming unavailable" message.

### Breakpoint Sync

**CSS `@media` queries and `getVis()` in app.js must match:**

```javascript
// app.js getVis() — line 731
getVis() {
  if (window.innerWidth <= 700) return 2;
  if (window.innerWidth <= 1100) return 3;
  return VIS; // 4
}

// CSS @media in index.html
// @media (max-width: 700px) → carousel 2-item layout
// @media (max-width: 1100px) → carousel 3-item layout
// (default) → carousel 4-item layout (VIS constant)
```

If CSS breakpoint ≠ JS getVis(), carousel pagination **silently fails** (cards don't align with dots, snapping is jerky).

### Carousel State Sync

`CS[sectionName]` must be populated before carousel is rendered:

```javascript
buildCarousel(sec, items) {
  const vis = getVis();
  const total = items.length;
  const pages = Math.ceil(total / vis);
  CS[sec] = { page: 0, pages, total, vis, _r: renderFn };
}
```

If `getVis()` changes and carousel state isn't recalculated, pagination math breaks.

### Product Registry Timing

`productRegistry` must be populated before `handleInitialHash()` runs (400ms after DOMContentLoaded):

```javascript
buildCard(p, sec) {
  productRegistry[p.id] = p; // Register BEFORE rendering
  return cardHtml;
}

load().then(() => {
  setTimeout(() => handleInitialHash(), 400); // Wait for registry to populate
});
```

If handleInitialHash runs before load() finishes, URL hash routing fails silently.

### Chat API Availability

`luvz-chat.js` requires `window.streamLuvzResponse()` (defined in app.js):

```javascript
// luvz-chat.js send() function
if (!window.streamLuvzResponse) {
  addMessage('bot', 'Chat streaming is unavailable. Please refresh the page.');
  return;
}
```

### localStorage Persistence

Wishlist and chat history depend on localStorage:

```javascript
getWishlist() {
  return JSON.parse(localStorage.getItem('luvz-wish') || '[]');
}

loadHistory() {
  const data = JSON.parse(localStorage.getItem('luvz_chat_v3') || 'null');
  if (!data) return null;
  const age = Date.now() - data.ts;
  if (age > 24 * 60 * 60 * 1000) { // 24h TTL
    localStorage.removeItem('luvz_chat_v3');
    return null;
  }
  return data.msgs;
}
```

If localStorage disabled or quota exceeded, wishlist and chat history are lost.

---

## System Interactions Map

### Scroll Observers (All Active Simultaneously)

```
window.scroll event (passive listener, { passive: true })
  ├─ Sticky nav: scrollY > 50 → nav.classList.toggle('stuck')
  ├─ Hero chevron fade: scrollY > 100 → hero-discover opacity = 0
  ├─ Gem bar: scrollY > innerHeight * 0.8 → gem-hidden class
  ├─ FWA button: scrollY > heroHeight * 0.6 → fwa-visible class
  └─ Hero parallax (desktop only): heroImg.style.transform = scale(1.08) translateY(...)

IntersectionObserver for .reveal
  └─ On first intersection (threshold 0.07): add class 'in' → triggers fade-up animation

IntersectionObserver for nav-active (initNavActiveIndicator)
  └─ On intersection (rootMargin -28% 0px -58% 0px): mark nav link as 'is-active'

IntersectionObserver for .lc-fade-up (hero entrance)
  └─ On first intersection (threshold 0.1): triggers 'lcFadeUp' CSS animation

IntersectionObserver for vault-clip (_vaultIO)
  └─ On intersection (threshold 0.05): start RAF loop
  └─ On intersection end: stop RAF loop, cancel animation frame

IntersectionObserver for .stagger-text (motionObserver)
  └─ On first intersection (threshold 0.12): add class 'in' → stagger animation
```

### Touch Events (Overlapping Targets)

```
Product card
  ├─ Touch wishlist heart: toggleWish(btn, id)
  ├─ Touch product image: openModal(product)
  └─ Carousel touch swipe: left = nextPage(), right = prevPage()

Modal image gallery
  ├─ Touch image: swipe left = galleryNext(), swipe right = galleryPrev()
  ├─ Touch prev/next buttons: explicit click handler
  └─ Touch outside modal: closeModal()

Wishlist drawer
  └─ Touch outside drawer: closeWishlist()

Chat widget
  └─ Touch send button: send(text)
```

### Keyboard Events (Priority Order)

```
1. Any modal, drawer, popup open?
   ├─ Escape key → closeModal() / closeWishlist() / closeChat()
   └─ Gallery open? Arrow Left/Right → galleryPrev/Next()

2. Chat input focused?
   ├─ Enter key → send(text)
   ├─ Shift+Enter → newline (no send)
   └─ Any key → autoResize() textarea

3. Global hotkeys
   └─ Ctrl+Alt+L → toggle #admin-link visibility (hidden by default)
```

---

## 3D Vault System (Top Sellers)

### Initialization

```javascript
initVault() IIFE (line 1105):
  1. Query .vault-ring element (CSS: transform-style: preserve-3d)
  2. Set up requestAnimationFrame loop:
     - Calculate angle per frame based on elapsed time
     - Apply rotateX() and rotateY() transforms to vault ring
     - For each card in ring:
       · Calculate depth based on angle
       · Apply opacity and z-index based on depth (front = opaque + high z-index)
     - Continue loop at 60 FPS
  3. Set up tap detection:
     - Calculate distance from tap point to vault center
     - Calculate angle relative to vault rotation
     - If tap on non-front card, rotate vault to bring it to front
     - Wait 650ms for animation, then open modal
  4. Set up touch swipe: optional alternative to tap
  5. Touch swipe: 44px threshold, left = next rotation, right = prev rotation
```

### Visibility Management

```javascript
_vaultIO IntersectionObserver (line 1514):
  - Threshold: 0.05 (trigger when 5% of vault visible)
  - When vault enters viewport:
    · Store RAF ID in _raf variable
    · Call loop() immediately to start animation
  - When vault exits viewport:
    · Call cancelAnimationFrame(_raf) to stop loop
    · Vault stops rotating (no performance drain)
```

### Rendering

```css
.vault-scene {
  perspective: 680px;
  transform-style: preserve-3d;
}

.vault-ring {
  transform-style: preserve-3d;
  transform: rotateX(...) rotateY(...);
  /* Applied by JavaScript loop */
}

.vault-card {
  position: absolute;
  transform: translateZ(...) rotateY(...);
  /* Depth dimming via opacity + z-index */
  opacity: calc(0.3 + 0.7 * card.depth);
  z-index: round(card.depth * 100);
}
```

---

## Error Handling Strategy

| Error Scenario | Where Caught | User Experience |
|---|---|---|
| products.json fetch fails (network error) | load() function, line ~920 | Falls back to MOCK_DATA; site works with 3–5 mock products |
| Ollama inference timeout | Oracle FastAPI backend | Returns error event: "LLM inference failed. Try again." |
| Chat SSE stream timeout (25s) | streamLuvzResponse(), line ~1950 | Shows "Connection lost. Please try again." |
| Product ID not in registry (hash routing) | handleInitialHash(), line ~533 | URL hash ignored, no modal opens (silent fail) |
| localStorage full (quota exceeded) | saveHistory() / saveWishlist() | Wishlist/history not persisted; no user warning |
| Viewport.innerWidth === undefined (ReferenceError) | getVis() function | Returns fallback VIS constant (4); carousel still renders |
| Window.streamLuvzResponse undefined | luvz-chat.js send(), line ~342 | Shows "Chat streaming is unavailable. Please refresh." |

---

## Performance Optimization Opportunities

1. **Lazy load product images:** Add `loading="lazy"` to buildCard() output
2. **Throttle window.resize:** Add debounce to carousel recalculation (currently runs 50–100× per second)
3. **Memoize getVis():** Cache last known viewport width; only recalculate on actual resize
4. **Stop hero parallax when off-screen:** Add RAF loop visibility check (currently runs forever)
5. **Infinite scroll:** Implement pagination instead of loading all products at once
6. **Service Worker:** Cache products.json locally, enable offline mode
7. **Code splitting:** Move chat widget to separate bundle (users without chat don't load luvz-chat.js)
8. **Image optimization:** Serve WebP with PNG fallback; use Cloudinary transforms

---

## Deployment Checklist

**Frontend (Cloudflare Pages):**
- [ ] Verify LUVZ_CHAT_API_URL in luvz-chat.js matches live Oracle endpoint
- [ ] Set GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET in Cloudflare dashboard (Decap CMS)
- [ ] Test hash routing on live site (e.g., luvzcollection.com/#product/ring-name)
- [ ] Verify mobile chat trigger visibility on all screen sizes
- [ ] Test wishlist persistence across page reloads
- [ ] Confirm cookie consent / analytics tracking (GA4)

**Backend (Oracle FastAPI + Ollama):**
- [ ] Verify Oracle FastAPI service is running and accessible at LUVZ_CHAT_API_URL
- [ ] Confirm Ollama service is running with luvz-fast model loaded
- [ ] Verify sentence-transformers embeddings are cached and ready
- [ ] Test chat SSE streaming end-to-end
- [ ] Verify local vector database is populated with product embeddings
- [ ] Confirm products.json is synced to FastAPI service
- [ ] Monitor ARM resource usage (CPU, memory) under typical load

**General:**
- [ ] Performance audit: Lighthouse, Core Web Vitals
- [ ] Test across browsers: Chrome, Firefox, Safari, Edge
- [ ] Remove legacy `functions/` directory from repo (Cloudflare Workers code no longer used)
