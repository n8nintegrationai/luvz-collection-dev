# PROJECT_CONTEXT.md — LUVZ Collection

## PROJECT OVERVIEW

**LUVZ Collection** is a luxury handcrafted jewelry e-commerce site featuring 92.5 sterling silver jewelry with 22K gold polish. The site combines a beautiful product catalog with an embedded AI chat widget for customer inquiries.

**Primary Users**: Customers browsing and inquiring about jewelry products
**Core Features**:
- Multi-section product catalog with categories (necklaces, pendants, earrings, bangles, jhumkas, sets)
- AI-powered chat widget for product inquiries
- Product wishlist (localStorage-based)
- Theme switcher (dark/light/earth themes)
- WhatsApp integration for direct customer contact
- Responsive mobile-first design

---

## FILE MAP

| File | Type | Purpose |
|------|------|---------|
| `public/index.html` | [CORE] | Main page: hero, navbar, product sections, modals, wishlist drawer |
| `public/app.js` | [SCRIPT] | Product rendering, carousels, modals, wishlist, theme switching, JSON-LD schemas |
| `public/luvz-chat.js` | [SCRIPT] | AI chat widget: message rendering, streaming, localStorage persistence |
| `public/luvz-chat.css` | [STYLE] | Chat widget styling: floating button, popup, messages, input area |
| `functions/api/chat.js` | [CORE] | Backend chat API endpoint |
| `public/admin/index.html` | [CORE] | Decap CMS admin interface (minimal) |
| `public/data/products.json` | [CORE] | Product data: catalog, heritage, about sections |

---

## HTML STRUCTURE

### Layout Pattern
- **Sticky navbar** at top with theme switcher, search, cart/wishlist icons, mobile hamburger
- **Hero section** with full-screen image and text animation (fade-up entrance)
- **Section-based design**: categories → top sellers → new collection → individual category sections → heritage → about → footer
- **Chat widget**: Floating fixed button (bottom-right) opens modal/fullscreen popup
- **Modals**: Product detail modal, wishlist drawer (overlay-based)

### Key Landmark Elements

| ID | Purpose | Must Keep |
|----|---------|-----------|
| `#nav` | Main navigation bar | ✓ (JS depends on nav-links) |
| `#mob-menu` | Mobile menu drawer | ✓ (toggleMenu depends on it) |
| `#moverlay` | Modal overlay (product details) | ✓ (modal height tracking) |
| `#luvz-chat-trigger` | Chat widget button | ✓ (chat event listeners) |
| `#luvz-chat-popup` | Chat widget popup container | ✓ (chat logic) |
| `#wish-overlay` / `#wish-drawer` | Wishlist drawer | ✓ (wishlist UI) |
| `[data-theme]` | Theme attribute (html element) | ✓ (CSS variable root) |

### Structural Patterns

**Product Card**:
```html
<div class="pcard reveal" onclick="openModal(data, badge)">
  <div class="pcard-img">
    <img/> <div class="badge"/> <button class="pcard-wish"/>
  </div>
  <div class="pcard-info">
    <div class="pcard-cat"/> <div class="pcard-name gold-text"/>
    <div class="pcard-price"/> <a class="pcard-btn" href="wa.me/..."/>
  </div>
</div>
```

**Carousel**:
```html
<div class="carousel-outer">
  <div class="carousel-track" id="ct-{section}">
    <!-- carousel-items appended by JS -->
  </div>
</div>
<div class="carousel-nav" id="cn-{section}">
  <!-- dots and pagination appended by JS -->
</div>
```

**Chat Widget**:
```html
<button id="luvz-chat-trigger">
  <svg class="luvz-trigger-icon"/> <span class="luvz-trigger-label"/> <div class="luvz-dot"/>
</button>
<div id="luvz-chat-popup" class="is-visible|hidden">
  <div class="luvz-chat-header"> <button class="luvz-close-btn"/> </div>
  <div id="luvz-messages" class="luvz-chat-messages"> <!-- bubbles appended --> </div>
  <div class="luvz-chat-input-area">
    <input id="luvz-chat-input"/> <button id="luvz-chat-send"/>
  </div>
</div>
```

### Naming Conventions
- **BEM-lite**: `.pcard-wish`, `.luvz-msg-bubble`, `.carousel-track`
- **Utility classes**: `.reveal` (fade-in on scroll), `.gold-text` (gradient animation)
- **State classes**: `.is-visible`, `.open`, `.wished`, `.active`, `.stuck`, `.in`
- **Theme prefix**: `--bg`, `--txt`, `--gold` (CSS custom properties)

---

## CSS ARCHITECTURE

### Stylesheet Organization

**Single file**: `luvz-chat.css` (chat widget only)
**Inline styles in HTML**: `<style>` tag contains all UI CSS including:
- Reset & base styles
- Theme definitions (3 color schemes)
- Component styles (nav, hero, cards, modals, chat)
- Animations & keyframes
- Media queries

### CSS Variables (Themes)

All variables respond to `[data-theme="earth|light|dark"]`. Example for **earth theme**:

```css
--bg: #18110A;              /* Primary background */
--bg2: #1E160D;             /* Secondary background */
--bg3: #261C11;             /* Tertiary background */
--card: #221810;            /* Card/component background */
--card2: #2C2016;           /* Card hover/secondary */
--border: rgba(196, 136, 44, .14);    /* Default borders */
--border-h: rgba(196, 136, 44, .43);  /* Hover/active borders */
--txt: #EAD9BC;             /* Primary text */
--txt2: #B49060;            /* Secondary text */
--txt3: rgba(180, 144, 96, .32);      /* Tertiary text (muted) */
--gold: #C88C2C;            /* Primary accent (gold) */
--gold-d: #A06E10;          /* Dark gold */
--gold-l: #E4AA50;          /* Light gold */
--gold-xl: #F2CA78;         /* Lightest gold */
--nav-bg: rgba(24, 17, 10, .97);     /* Navbar (semi-transparent) */
--modal-bg: #1E160D;                 /* Modal/drawer background */
--sk1: #2A1E14;             /* Skeleton loader color 1 */
--sk2: #36281A;             /* Skeleton loader color 2 */
--hero-glow: rgba(196, 136, 44, .08);  /* Hero section glow */
--sh: 0 2px 20px rgba(0, 0, 0, .5);    /* Default shadow */
--sh-h: 0 14px 52px rgba(0, 0, 0, .7), ...; /* Hover shadow */
--sh-modal: 0 40px 120px rgba(0, 0, 0, .88);  /* Modal shadow */
```

**Other themes**: `[data-theme="dark"]` and `[data-theme="light"]` — similar structure, different values.

### Typography

- **Display/Hero**: `Cinzel` (serif, weights 600, 700, 900) — luxury jewelry brand feel
- **Body**: `Cormorant Garamond` (serif, weights 300–600) — elegant, readable
- **UI/Chat**: `Jost` (sans-serif, weights 300–500) — modern, clean
- **Font loading**: Google Fonts (async), preconnected for performance

### Spacing & Sizing
- **Card padding**: `10px 14px` (messages), `10px` (elements)
- **Gap increments**: `6px`, `8px`, `10px`, `16px` gaps between flex items
- **Border radius**: `8px` (buttons), `10px` (inputs), `14px` (message bubbles), `50px` (pill buttons)
- **Shadows**: `--sh`, `--sh-h`, `--sh-modal` CSS variables (no hardcoded values)

### Breakpoints & Responsive Strategy

| Breakpoint | Use Case |
|------------|----------|
| `max-width: 600px` | Mobile fullscreen chat, trigger repositioning |
| `max-width: 768px` | Tablet layout, disable desktop particle animation |
| `max-width: 700px` | Mobile carousel (2 items visible) |
| `max-width: 1100px` | Tablet carousel (3 items visible) |
| Wider | Desktop (4 items per page, fixed VIS=4) |

### Key Animations & Keyframes

| Animation | Used For | Duration |
|-----------|----------|----------|
| `skWave` | `.gold-text` gradient text | 1.7s infinite |
| `liquidGold` | `.gem-bar` top line | 7s infinite |
| `spin` | `.loading-spinner` | 0.8s infinite |
| `luvzPulse` | Chat trigger dot | 2s infinite |
| `luvzMsgIn` | Message bubbles fade-in | 0.22s |
| `luvzBounce` | Typing indicator dots | 1.2s infinite |
| `lcFadeUp` | Hero entrance animations | 0.8s cubic-bezier |
| `catScroll` | Category carousel auto-scroll | 20s infinite (desktop) |

### Class Naming Conventions

**Never rename these — JS depends on them**:
- `.reveal` — triggers IntersectionObserver reveal animation
- `.is-visible`, `.open`, `.stuck`, `.wished`, `.active` — state classes
- `.gold-text` — gradient animation + animation delay stack
- `.pcard`, `.pcard-wish`, `.pcard-btn` — product card selector
- `.luvz-*` — all chat widget classes
- `.carousel-track`, `.carousel-item`, `.c-dot`, `.c-btn` — carousel navigation

---

## JAVASCRIPT ARCHITECTURE

### Script Loading Order

1. **Inline theme setup** in HTML `<style>` (IIFE)
2. **app.js** — Main application (must load before content renders)
3. **luvz-chat.js** — Chat widget (can load async, doesn't block page)
4. **API calls** — Fetch products.json from CDN, build sections

### Global State & Config

```javascript
// Config (do NOT rename)
const DATA_URL = 'https://cdn.jsdelivr.net/gh/...products.json';
const WA_NUM = '918919359961';
const VIS = 4;  // desktop cards per page

// Global objects (extend, don't overwrite)
const CS = {};          // Carousel state: {page, pages, total, vis, _r}
const CAT_META = {};    // Category metadata: icon + label
const SM = {};          // Section metadata: badge + label
const productRegistry = {}; // id → product object

// Window-attached chat API
window.LuvzChatUI = {
  formatBotText, renderSourceCards, renderBotContent, ...
};
window.LUVZ_CHAT_API_URL = 'http://127.0.0.1:8000/chat';
```

### Key Functions (Partial List)

**Theme & Persistence**:
- `setTheme(t, save=true)` — Switch theme, persist in localStorage
- `getWishlist()` / `saveWishlist(w)` — Wish list CRUD
- `loadHistory()` / `saveHistory(role, text)` — Chat history (24h TTL)

**Product Rendering**:
- `buildCard(product, section)` — Generate product card HTML
- `buildCatTile(category)` — Generate category tile HTML
- `buildCarousel(section, items)` — Populate carousel with pagination
- `openModal(product, badge)` — Open product detail modal
- `toggleWish(btn, id)` — Add/remove from wishlist

**Navigation & Scroll**:
- `initNavActiveIndicator()` — Active nav link on scroll
- `smoothScrollTo(sectionId)` — Smooth scroll to section
- `toggleMenu(forceClose)` — Mobile menu toggle

**Chat Functions** (in luvz-chat.js):
- `send(text)` — Send message, call API, stream response
- `openChat()` / `closeChat()` — Toggle popup visibility
- `parseMarkdown(raw)` — Convert markdown to HTML with link handling
- `renderBotContent(text, sources)` — Render bot message with product cards
- `renderSourceCards(sources)` — Render product recommendation cards

**Image & SEO**:
- `optimizeCloudinaryUrl(url, width, quality)` — Transform Cloudinary URLs
- `generateSrcset(url, widths)` — Generate responsive srcset
- `injectProductSchema(data)` — Inject JSON-LD schema for SEO

### DOM Selectors Script Depends On

⚠️ **Do NOT rename these IDs/classes**:

```javascript
// Navigation & Theme
#nav, .nav-link, .tb (theme button)
#mob-menu

// Modals & Overlays
#moverlay, .modal, .openModal()
#wish-overlay, #wish-drawer, #wish-body, #wish-footer

// Chat
#luvz-chat-trigger, #luvz-chat-popup, #luvz-messages
#luvz-chat-input, #luvz-chat-send
#luvz-suggestions, .luvz-chip
.luvz-close-btn

// Products
.pcard, .pcard-wish, .pcard-btn, .carousel-item
#ct-{section}, #cn-{section} (carousel track/nav by section key)
.reveal (intersection observer target)

// Sections & Anchors
#top_sellers, #new_collection, #necklace, #pendant, #earrings, 
#bangles, #jhumkas, #sets, #heritage, #about

// Other
.gold-text (animation class, used for stacking delays)
#hero-particles-canvas (optional, particle animation)
.gem-bar (top gold line)
```

### Event Listeners & Behaviors

| Target | Event | Handler | Behavior |
|--------|-------|---------|----------|
| `window` | `resize` | Modal height tracking | Update `--modal-h` if modal open |
| `window` | `scroll` | Nav stuck, hero fade, gem bar hide | Update nav state + chat visibility |
| `#nav` | Load-time | IntersectionObserver | Active link indicator on scroll |
| `.pcard` | `click` | `openModal(...)` | Open product detail modal |
| `.pcard-wish` | `click` | `toggleWish(...)` | Add/remove wishlist (stopPropagation) |
| `.pcard-btn` | `click` | Open WhatsApp link | Direct inquiry via WhatsApp |
| `#luvz-chat-trigger` | `click` | `openChat()` / `closeChat()` | Toggle chat popup |
| `.luvz-close-btn` | `click` | `closeChat()` | Close chat |
| `.luvz-chip` | `click` | `send(chip.dataset.msg)` | Send suggestion |
| `#luvz-chat-input` | `keydown` | Enter sends if !shiftKey | Send message on Enter |
| `#luvz-chat-input` | `input` | `autoResize()` | Expand textarea as user types |
| `.carousel-track` | `touchstart`/`touchend` | Carousel pagination | Swipe left/right to page |
| `.cat-carousel-outer` | `touchstart`/`touchend` | Mobile scroll control | Stop/resume auto-scroll on touch |
| `document` | `click` | Close chat if outside | Desktop only (>600px) |
| `document` | `keydown` (Escape) | `toggleMenu(true)` | Close mobile menu on Escape |

### Third-Party Libraries & CDN

```html
<!-- Fonts -->
Google Fonts: Cinzel, Cormorant Garamond, Jost (async preload)

<!-- CDN Data Source -->
jsDelivr: https://cdn.jsdelivr.net/gh/{github-repo}/public/data/products.json

<!-- Analytics -->
Google Tag Manager (GTM): gtag.js script (ID: G-7X8ZXT03Y9)

<!-- Images -->
Cloudinary: https://res.cloudinary.com (preconnected)
Placehold.co: Fallback placeholder images

<!-- Chat API -->
Backend: http://127.0.0.1:8000/chat (configurable via window.LUVZ_CHAT_API_URL)

<!-- Admin CMS -->
Decap CMS: https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js
```

---

## COMPONENT INVENTORY

### Product Card (`.pcard`)
- **HTML**: Image with overlay + heart button + badge + info section
- **CSS Classes**: `.pcard`, `.pcard-img`, `.pcard-info`, `.pcard-wish`, `.badge`
- **JS Behavior**: Click to open modal; heart to toggle wishlist; WhatsApp link
- **Where**: Carousel sections (top_sellers, new_collection, category sections)

### Chat Widget
- **Trigger Button** (`#luvz-chat-trigger`)
  - Fixed position (bottom-right, raised above mobile navbar)
  - Animated pulse dot + label
  - Click toggles popup
  
- **Popup** (`#luvz-chat-popup`)
  - Header with avatar + close button
  - Messages container with scroll
  - Input area with auto-resize textarea + send button
  - Suggestion chips (optional, hidden when user sends first message)
  
- **Message Bubble** (`.luvz-msg`)
  - Bot messages: left-aligned, light background, auto-parsed markdown
  - User messages: right-aligned, gold border background
  - Product cards rendered below bot messages with CTA buttons

### Carousel
- **Track** (`.carousel-track`, id `#ct-{section}`)
  - Flex container with items, animated via transform
  - Touch swipe support on mobile
  
- **Navigation** (`.carousel-nav`, id `#cn-{section}`)
  - Previous/Next buttons
  - Dot indicators per page
  - Item counter (e.g., "1–4 of 24")

### Category Tiles (`.cat-tile`)
- **Auto-scroll carousel** on desktop (CSS animation)
- **Touch-controlled scroll** on mobile (JS setInterval, paused on touch)
- **Links to category anchors** via hash navigation

### Wishlist Drawer (`.wish-drawer`)
- **Overlay-based modal**
- **Items**: Product image, name, price, WhatsApp enquire + remove button
- **"Enquire All"** button at bottom with multi-product WhatsApp link

### Product Modal (`.modal`)
- **Full details**: Large image gallery (placeholder), specs, price, WhatsApp CTA
- **Dynamic meta tags** updated on open (OG:title, og:image, etc.)
- **Hash-based routing**: URL changes to `#product/{slug}` for shareable links

---

## DESIGN TOKENS QUICK REFERENCE

### Core Color Variables (Earth Theme)

```css
--bg: #18110A;              --bg2: #1E160D;             --bg3: #261C11;
--card: #221810;            --card2: #2C2016;
--txt: #EAD9BC;             --txt2: #B49060;            --txt3: rgba(180, 144, 96, .32);
--gold: #C88C2C;            --gold-d: #A06E10;          --gold-l: #E4AA50;        --gold-xl: #F2CA78;
--border: rgba(196, 136, 44, .14);    --border-h: rgba(196, 136, 44, .43);
--nav-bg: rgba(24, 17, 10, .97);      --modal-bg: #1E160D;                --btn-fg: #18110A;
--hero-glow: rgba(196, 136, 44, .08); --trust-bg: #1E160D;               --cat-hover: rgba(196, 136, 44, .065);
--sh: 0 2px 20px rgba(0, 0, 0, .5);   --sh-h: 0 14px 52px rgba(0, 0, 0, .7), 0 0 0 1px rgba(196, 136, 44, .15);
--sh-modal: 0 40px 120px rgba(0, 0, 0, .88);
```

### Typography Tokens
```css
font-family: 'Cinzel', serif;             /* Hero/brand */
font-family: 'Cormorant Garamond', serif; /* Body copy */
font-family: 'Jost', sans-serif;          /* UI/chat */
font-size: 16px (chat input, prevents iOS auto-zoom)
font-size: 13.5px (message bubbles)
font-size: 12.5px (product descriptions)
```

### Spacing & Layout Tokens
```css
gap: 6px, 8px, 10px, 16px (flex gaps)
padding: 10px, 12px, 14px, 16px (element padding)
border-radius: 8px (buttons), 10px (inputs), 14px (bubbles), 50px (pills)
max-width: 370px (desktop chat popup)
height: 540px (desktop chat popup)
bottom: 140px (chat popup offset from trigger)
z-index: 9998 (chat popup), 9999 (chat trigger), 99999 (mobile fullscreen)
```

---

## SAFE MODIFICATION RULES

### ⚠️ Do NOT Rename These IDs
```
#nav, #mob-menu, #moverlay, #luvz-chat-trigger, #luvz-chat-popup,
#luvz-messages, #luvz-chat-input, #luvz-chat-send,
#wish-overlay, #wish-drawer, #wish-body, #wish-footer
```
**Reason**: JS directly selects these elements via `getElementById`, `querySelector`

### ⚠️ Do NOT Rename These Classes
```
.reveal (IntersectionObserver trigger)
.gold-text (animation stacking)
.pcard, .pcard-wish, .pcard-btn, .carousel-item
.modal, .open, .is-visible, .stuck, .wished, .active, .in
.luvz-* (all chat widget classes)
.carousel-track, .carousel-nav, .c-dot, .c-btn
```
**Reason**: JS selects these for functionality; breaking them breaks features

### ⚠️ Do NOT Change These Script Load Orders
1. Inline theme setup (in `<style>`)
2. `app.js` (must run before HTML content is rendered)
3. `luvz-chat.js` (depends on `window.streamLuvzResponse` setup)

### ⚠️ Do NOT Change These CSS Custom Property Values
- Use `var(--gold)` instead of hardcoding `#C88C2C`
- Use `var(--sh)` instead of hardcoding shadows
- Theme switching depends on `[data-theme]` attribute + variable stack

### ⚠️ Do NOT Hardcode These Breakpoints
```css
max-width: 600px   /* Chat mobile fullscreen cutoff */
max-width: 700px   /* Carousel 2-item breakpoint */
max-width: 768px   /* Tablet breakpoint + particle disable */
max-width: 1100px  /* Carousel 3-item breakpoint */
```
**Reason**: Layouts, animations, and JS behaviors are tied to exact pixel values

### ✅ DO Follow These Patterns When Adding New Code

**Adding a new CSS style?**
- Use CSS variables: `color: var(--txt)` not `color: #EAD9BC`
- Use existing spacing tokens: `gap: 10px` not `gap: 11px`
- Add animations to existing @keyframes blocks if possible
- Respect media query breakpoints listed above

**Adding a new JS function?**
- Extend global objects: `CS.newFeature = {...}` not `window.newFeature = {...}`
- Avoid new top-level globals; use IIFEs for encapsulation
- Listen to existing event targets (don't add new ones unless necessary)

**Adding a new component?**
- Use existing class prefixes: `.pcard-*` pattern, `.luvz-*` pattern
- Reference CSS variables, not hardcoded colors
- Add `reveal` class if it should animate on scroll

**Adding a new section?**
- Add section ID to HTML (e.g., `id="my-section"`)
- Add nav link with `href="#my-section"` (auto-detected by nav observer)
- Add data to `products.json` under section key
- Call `buildCarousel('my-section', data['my-section'])`

---

## COMMON PATTERNS TO REUSE

### Mobile Keyboard Handling
```css
/* Flex child that won't shrink when viewport shrinks */
flex: 1;
min-width: 0;  /* KEY FIX: without this, flex child can overflow */
width: 0;      /* forces flex to control width */
box-sizing: border-box;
```

### Smooth Entrance Animation
```css
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity .7s ease, transform .7s ease;
}
.reveal.in {
  opacity: 1;
  transform: none;
}
/* Stagger delays via nth-child */
.reveal.in:nth-child(N) { transition-delay: {0.08 * N}s; }
```

### Chat Message Bubble
```javascript
// Bot message: parse markdown, add product cards
const bubble = document.createElement('div');
bubble.innerHTML = renderBotContent(text, sources);
// User message: escape HTML, no markdown
bubble.textContent = text;
```

### WhatsApp Link Generation
```javascript
const msg = `Hi! I'm interested in ${productName}`;
const url = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;
```

### Carousel Pagination
```javascript
const s = CS[section];  // {page, pages, total, vis, _r}
const itemWidth = (parentWidth - gaps) / s.vis;
track.style.transform = `translateX(-${s.page * itemWidth * s.vis}px)`;
s._r();  // re-render dots + buttons
```

### Wishlist Toggle
```javascript
const btn = document.querySelector('.pcard-wish');
const id = btn.dataset.pid;
toggleWish(btn, id);  // updates localStorage + DOM
```

### Theme Switching
```javascript
setTheme('earth', true);  // switches [data-theme], saves to localStorage
// All CSS variables automatically update via cascade
```

---

## KNOWN FRAGILE AREAS

### 🔴 Mobile Keyboard Viewport Shrinking
**Issue**: When mobile keyboard opens, viewport height shrinks; input area can overflow
**Fix Applied**: `.luvz-chat-input-area` uses `flex: 1; min-width: 0;` + `width: 0` on input
**Why Fragile**: If you remove `min-width: 0`, send button gets pushed off-screen
**Test**: Open chat on mobile, type long message, keyboard should not break layout

### 🔴 iOS Safari Overflow + Scroll Issues
**Issue**: CSS `overflow:hidden` + `transform` animation breaks smooth scroll on iOS
**Fix Applied**: Category carousel switched from CSS animation to `setInterval` + `scrollLeft` on mobile
**Why Fragile**: If you try to add CSS-only animation back, iOS will freeze; must keep JS fallback
**Files Affected**: `initCategoryAutoScroll()` in app.js

### 🔴 Chat Popup Position + Navbar Overlap
**Issue**: Fixed chat button at `bottom: 80px` can be hidden under sticky navbar on smaller screens
**Fix Applied**: Bottom value raised to 80px; mobile fullscreen mode avoids overlap entirely
**Why Fragile**: Navbar height changes could require re-tuning; test on various screen sizes
**Check**: Mobile bottom navigation shouldn't cover trigger button

### 🔴 Hash Routing Product Modal
**Issue**: Hash route `#product/{slug}` used for shareable product links; depends on exact product name slug format
**Fix Applied**: `toSlug()` function converts names consistently; stored in `productRegistry`
**Why Fragile**: If product names change in JSON without slug consistency, links break
**Test**: Share product link, verify modal opens on fresh page load

### 🔴 CSS Specificity: `.gold-text` Animation
**Issue**: `.gold-text` has animation with hardcoded delay; stacking via `nth-child` can create conflicts
**Why Fragile**: If you add new `.gold-text` elements, ensure parent supports `:nth-child`
**Safe Approach**: Use `animation-delay` CSS variable instead of inline delays where possible

### 🔴 Carousel Responsive Breakpoints
**Issue**: Carousel item count (`vis`) hardcoded at specific breakpoints (700px, 1100px)
**Why Fragile**: Changing these breakpoints without updating JS logic breaks pagination math
**Sync Points**: Breakpoints in CSS media queries must match `getVis()` logic in app.js

### 🔴 WhatsApp Number Hardcoding
**Issue**: `WA_NUM = '918919359961'` hardcoded in 3 places: `app.js`, `luvz-chat.js`, HTML data
**Why Fragile**: Changing number in one place but forgetting others breaks some links
**Safe Approach**: Store in single config, reference everywhere; consider moving to JSON data

### 🔴 Product JSON Data Structure Dependency
**Issue**: Code assumes `products.json` has exact keys: `top_sellers`, `new_collection`, category keys, `heritage`, `about`
**Why Fragile**: Missing keys silently fail (no error); empty sections appear with no warning
**Test**: Validate JSON structure against expected keys in `app.js` comment at top of `buildCarousel()` calls

---

## SUMMARY FOR AI AGENTS

When modifying this project:

1. **Always use CSS variables** — never hardcode colors/shadows
2. **Never rename IDs in the "Do NOT Rename" list** — scripts depend on them
3. **Test on mobile AND desktop** — breakpoints are critical
4. **Preserve hash routing** — `#product/{slug}` enables shareable links
5. **Keep `.reveal` + IntersectionObserver** — scroll animations rely on it
6. **Avoid adding new global variables** — extend existing objects (`CS`, `SM`, `productRegistry`)
7. **Check WhatsApp links** — they appear in product cards, modals, wishlist, AND chat
8. **Validate JSON structure** — missing data keys break sections silently
9. **Test iOS Safari specifically** — has unique scroll/animation issues
10. **Update meta tags dynamically** — product modals change OG tags for social sharing

---

**Last Updated**: May 2026  
**Key Versions**: Cormorant Garamond 2.11, Cinzel 7.0, Jost 4.2  
**Framework**: Vanilla JS (no framework), CSS3, HTML5  
**Target Browsers**: Chrome, Firefox, Safari (iOS 15+), Edge
