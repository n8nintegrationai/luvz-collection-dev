# CURRENT_ISSUES.md — Known Problems & Debt

Inventory of visual inconsistencies, UX gaps, performance risks, and data issues. Prioritized for future sprints.

---

## Visual Inconsistencies

### Typography

| Issue | Impact | Fix |
|-------|--------|-----|
| Jost font not imported (used in UI labels, buttons, chat) | All Jost text falls back to system sans-serif; visual inconsistency across platforms | Import Jost from Google Fonts + add to font-display=swap strategy |
| Multiple `@keyframes` definitions (same animation name twice) | Last definition wins; creates confusion and maintainability risk | Audit all @keyframes, consolidate duplicates (lcFadeUp, lcImageFloat, lcImageFloatMobile appear 2×) |
| Hero title text-shadow applies multiple times in CSS cascade | Text-shadow appears in 3+ rule blocks; compounding effect (outer glow may be too strong) | Consolidate to single `.hero-title` rule block |
| `.gold-text` nth-child stagger delays fragile on new elements | Animation delay stacking breaks if elements reordered or added | Consider CSS counter-based delays instead of nth-child |

### Layout & Spacing

| Issue | Impact | Fix |
|-------|--------|-----|
| Mobile hero button spacing sometimes clears discover indicator, sometimes doesn't | Visual misalignment on different mobile viewports | Lock hero-btns margin-bottom to 56px + test on 320px–480px range |
| Chat widget z-index jumps from 9998 (desktop) to 99999 (mobile) | Risk of conflict if unexpected fixed elements added | Use consistent z-index; document stacking context explicitly |
| Category bento grid gaps inconsistent (16px vs 12px in different cells) | Visual irregularity in "Shop by Category" section | Standardize all gaps to 16px |
| Footer column widths vary (1.4fr 1fr 1.1fr) → unbalanced on narrow screens | Wrapping and alignment issues on 600px–768px | Test footer at all breakpoints; consider equal columns on tablet |

### Hover & Interactive States

| Issue | Impact | Fix |
|-------|--------|-----|
| Product card hover shadow transition stutters on some browsers | Performance regression on mobile (hover: none devices) | Use will-change: box-shadow; optimize for GPU |
| Button ghost-theme hover sometimes shows 2px border shift | Layout shift on hover due to border width change | Transition border-color only, not border-width (use outline instead) |
| Wishlist heart icon fill color inconsistent between card and drawer | Heart appears filled in one place, outline in another | Sync .pcard-wish fill logic with drawer heart rendering |

---

## UX Issues

### Chat Widget

| Issue | Impact | Fix |
|-------|--------|-----|
| Floating trigger button completely hidden on <768px | Chat only accessible via #mob-askai-btn or programmatic openLuvzChat() call | Either show trigger on mobile (reduced size), or update onboarding to highlight menu button |
| No loading state on first chat message | User sees typing indicator only after response starts arriving | Add immediate "Thinking..." message before SSE stream begins |
| Chat history loads from localStorage but no visual indication of old messages | First-time users see old conversation without timestamp context | Add timestamp to each message + "Previous conversation" divider |
| Mobile keyboard overlap: safe-area-inset-bottom may not cover all iOS versions | Input field sometimes hidden by keyboard on older iPhones | Test iOS 15 Safari specifically; consider CSS viewport-fit adjustments |
| Suggestion chips below input: not all chips visible on mobile (truncation) | Users miss suggested questions on small screens | Horizontal scroll on chip row or reduce chip text length |

### Wishlist

| Issue | Impact | Fix |
|-------|--------|-----|
| Product ID generation (btoa(Math.random())) unstable | Wishlist IDs become stale if page reloads before save | Add explicit `id` field to every product in JSON; fallback only to p.name |
| Wishlist heart button sync on remove uses string inspection of onclick | Fragile: minification would break button matching | Use data-pid attribute consistently as primary selector |
| "Enquire All" link concatenates product names without prices | Message is ambiguous ("I'm interested in Ring, Necklace, Pendant") | Include prices in bulk enquiry message: "Ring ₹X, Necklace ₹Y..." |
| Wishlist drawer doesn't update cart count on close (only on add/remove) | Badge count can be out-of-sync visually | Call updateWishCount() on drawer close |

### Product Modal

| Issue | Impact | Fix |
|-------|--------|-----|
| Gallery swipe threshold (50px) differs from carousel (44px) | Inconsistent swipe sensitivity feels buggy | Standardize all swipe thresholds to 44px |
| Image gallery doesn't loop (last image prev button doesn't wrap) | Non-intuitive UX on product with many images | Add modulo logic: `index = (index - 1 + total) % total` |
| Referral code input has no validation feedback while typing | User can't tell if code is valid until clicking button | Add real-time validation: green border on valid code, red on invalid |
| Modal price field (#m-price) hidden by default; no indication it can be revealed | Price visibility inconsistent (hidden vs. visible across products) | Either always show price or make visibility toggle explicit |

### Hash Routing

| Issue | Impact | Fix |
|-------|--------|-----|
| 400ms setTimeout delay on handleInitialHash() is a gamble | If load() is slow (CDN latency), modal won't open on page load via hash | Increase to 800ms or use DOMContentLoaded + load() completion promise |
| Product registry only populated if products.json loaded successfully | If fallback to MOCK_DATA, hash routing silently fails | Log warning if products.json fails and MOCK_DATA used |
| No visual feedback while waiting for modal to open (blank page for 400ms) | User thinks page is broken | Show loading skeleton while modal opens |

---

## Performance Risks

### JavaScript Loops & Observers

| Issue | Impact | Fix |
|-------|--------|-----|
| Hero parallax `requestAnimationFrame(tick)` loop never stops | Runs every frame forever, consumes CPU (especially on battery-powered devices) | Add visibility check: only tick if hero in viewport, stop on scroll-out |
| Vault `requestAnimationFrame(loop)` doesn't use RAF schedule batching | Can cause jank if vault visible and other heavy JS running | Check browser throttling; consider `cancelAnimationFrame` when vault hidden |
| Carousel resize handler recalculates all carousels without throttle | Window.resize fires 50–100× per second on drag; every carousel recalculates | Add resize throttle (100ms or use ResizeObserver with debounce) |
| Wishlist button sync loops through all `.pcard-wish` elements on every toggle | O(N) operation per toggle; slow on mobile with 50+ products | Cache button elements by data-pid or use event delegation |

### CSS Animations

| Issue | Impact | Fix |
|-------|--------|-----|
| Hero particle canvas (#hero-particles-canvas) JS code exists but canvas never drawn | Dead code doesn't consume resources, but takes up 150 lines | Remove or move to docs/archived-features/ |
| Gold shimmer animation runs on every `.gold-text` element even when off-screen | Unnecessary GPU work on invisible elements | Use `will-change` only on visible elements, remove on scroll-out |
| Vault 3D transforms preserve-3d on every card, even off-screen | Performance cost on low-end devices | Clip vault cards to viewport with CSS mask-image or remove off-screen cards from DOM |

### Image Loading

| Issue | Impact | Fix |
|-------|--------|-----|
| All product images load eagerly (no lazy loading attribute) | First page load fetches 50+ images unnecessarily | Add `loading="lazy"` to product `.pcard-img` elements |
| Hero image has `loading="eager" fetchpriority="high"` but CSS still applies aspect-ratio | Hero image may shift layout if CSS rule doesn't apply in time | Inline width/height attributes on hero img for immediate aspect-ratio |
| Product gallery inside modal: all images loaded at once (not progressive) | User scrolls through image gallery; all images already in DOM | Load gallery images on-demand or use picture tag with loading="lazy" |

### Memory & DOM

| Issue | Impact | Fix |
|-------|--------|-----|
| Modal gallery `img.src` cleared after 400ms close delay (line 1562–1565) | Small memory leak if modal opened/closed many times rapidly | Consider using IntersectionObserver to clear src when modal fully hidden |
| Love-strip marquee HTML has duplicate review cards (doubled for CSS infinite scroll) | Extra DOM nodes, duplicated data, harder to maintain | Use CSS animation-iteration: infinite or JS scroll-clamp instead |
| Product registry never pruned (all cards loaded, none removed) | Single-page app; registry grows if user navigates between sections | Consider cleanup if product count exceeds 500+ |

### Data & API

| Issue | Impact | Fix |
|-------|--------|-----|
| **Legacy `functions/` directory (Cloudflare Workers)** | **Dead code:** Chat backend moved to Oracle FastAPI; functions/api/chat.js, auth.js, callback.js no longer used. Risk of context pollution in future AI development. | Delete entire `functions/` directory. Verify Oracle FastAPI endpoint is primary. Update deployment docs to remove Cloudflare Worker references. |
| Chat API endpoint has no fallback if SSE stream fails | 25-second timeout shows "Connection lost" but no retry mechanism | Implement exponential backoff + max 3 retries in app.js streamLuvzResponse() |
| products.json fetches from GitHub raw URL (no failover) | If GitHub is down, site shows "Could not load products" | Add fallback endpoint (jsDelivr CDN or separate backup URL) |
| Decap CMS admin panel functional but no documented auth workflow | Unclear who has GitHub OAuth credentials | Document CMS access procedure in CLAUDE.md |

---

## Mobile-Specific Risks

| Issue | Impact | Fix |
|-------|--------|-----|
| iOS Safari: overflow:hidden + transform freezes scroll on some layouts | Categories section sometimes doesn't scroll smoothly | Add `-webkit-overflow-scrolling: touch` + test on iOS 15+ |
| iOS keyboard: safe-area-inset-bottom may not cover all devices | Input field hidden by keyboard on some iPhones | Manual testing on iPhone 12/14; consider bottom sheet pattern |
| Viewport resize on keyboard open: relies on flex min-width:0 workaround | One-off fix, not systematic; fragile if layout changes | Document this constraint in code comment + test after any flex layout change |
| Mobile nav hamburger icon position varies (sometimes overlaps logo) | Visual misalignment on 360px–480px screens | Lock nav icon width (42px) + margin (16px); test on smallest phones |
| FWA button (floating WhatsApp) repositions at 769px breakpoint | Visual jump when crossing tablet threshold | Consider smooth transition or media query query that repositions before user notices |

---

## Browser Support & Compatibility

| Issue | Impact | Fix |
|-------|--------|-----|
| @supports() guards for backdrop-filter (chat widget, bento badges) | Non-supporting browsers (Firefox, some Safari versions) show no blur | Test on Firefox 120+, Safari 15+; add fallback background color |
| CSS Grid auto-fit grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) | May not wrap correctly on all browsers; IE11 not supported (intentional) | Test on Chrome 120+, Firefox 120+, Safari 17+, Edge 120+ |
| CSS @property --prism-angle animation only works in Chrome/Edge | Safari doesn't support animated custom properties | Provide static fallback prism effect or use animation: none in Safari |
| SVG icons: white fill not scaled on all devices | Some icons appear too small on mobile | Use SVG viewBox="0 0 24 24" + explicit width/height |

---

## Accessibility Debt

| Issue | Impact | Fix |
|-------|--------|-----|
| Modal gallery navigation via arrow keys only (no button labels) | Keyboard users don't know gallery accepts arrow keys | Add aria-label to gallery: "Use arrow keys to navigate gallery" |
| Wishlist heart button has no aria-label | Screen reader says "button" not "add to wishlist" | Add aria-label="Add {{product.name}} to wishlist" |
| Chat widget trigger label "Ask AI Stylist" too long on mobile | Label text wraps awkwardly on 320px screens | Use shorter label "Ask" or hide on mobile (<480px) |
| No focus visible state on buttons (focus-visible outline missing) | Keyboard navigation appears broken | Add focus-visible { outline: 2px solid var(--gold); outline-offset: 2px } |
| Color-only affordances (gold border on hover) fail for colorblind users | Hover state invisible to colorblind users | Add secondary affordance: text scale, shadow, or animation |

---

## Known Browser Bugs / Quirks

| Browser | Issue | Workaround |
|---------|-------|-----------|
| iOS Safari 15–16 | overflow:hidden + transform on parent freezes child scroll | Use -webkit-overflow-scrolling: touch |
| Firefox | backdrop-filter not supported | Fallback to solid background color |
| Safari 14 | CSS @property animation not supported | Provide static fallback (no animation) |
| Chrome Mobile | Viewport resize on keyboard open can cause layout jank | Use position: fixed instead of position: absolute for modals |
| All Browsers | 100vh on mobile doesn't account for dynamic viewport height | Use 100svh or JS window.innerHeight |

---

## Technical Debt Summary

| Category | Count | Priority |
|----------|-------|----------|
| Legacy functions/ directory (Cloudflare Workers, no longer used) | 1 | **High** (cleanup) |
| Dead code (initHeroParticles, posterData functions) | 2 | Low (cleanup) |
| Fragile string inspection (wishlist button sync) | 1 | Medium (refactor) |
| Missing imports (Jost font) | 1 | Medium (polish) |
| Duplicate CSS animations | 3+ | Medium (maintenance) |
| Mobile UX gaps (chat visibility, referral feedback) | 3 | Medium (UX) |
| Performance risk loops (parallax RAF, carousel resize) | 2 | Low (non-critical) |

---

## Next Steps

1. **Immediate (cleanup):** Remove legacy `functions/` directory (Cloudflare Workers code no longer used; Oracle FastAPI is backend)
2. **Short-term:** Test mobile chat visibility; refactor wishlist ID generation; verify Oracle FastAPI endpoint stability
3. **Medium-term:** Consolidate CSS animations; add Jost font import; optimize resize handlers
4. **Long-term:** Remove dead code (initHeroParticles, posterData); implement lazy loading; add comprehensive test suite
