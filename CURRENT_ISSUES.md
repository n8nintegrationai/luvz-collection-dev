# CURRENT_ISSUES.md — Known Problems & Debt

---

## Visual Inconsistencies

### Typography

| Issue | Fix |
|-------|-----|
| Jost not imported; all Jost text falls back to system sans-serif | Import Jost from Google Fonts with `display=swap` |
| Duplicate `@keyframes` names (`lcFadeUp`, `lcImageFloat`, `lcImageFloatMobile` defined 2×) | Audit and consolidate all duplicate keyframe definitions |
| `hero-title` text-shadow defined in 3+ rule blocks; compounding effect | Consolidate to single `.hero-title` rule block |
| `.gold-text` nth-child stagger delays break if elements are reordered | Use CSS counter-based delays instead of nth-child |

### Layout & Spacing

| Issue | Fix |
|-------|-----|
| Mobile hero button spacing inconsistent across viewports | Lock `hero-btns` margin-bottom to 56px; test 320px–480px |
| Chat widget z-index: 9998 desktop, 99999 mobile | Use consistent z-index; document stacking context |
| Category bento grid gaps: 16px vs 12px in different cells | Standardize all gaps to 16px |
| Footer column widths (1.4fr 1fr 1.1fr) cause alignment issues on narrow screens | Test footer at all breakpoints; consider equal columns on tablet |

### Hover & Interactive States

| Issue | Fix |
|-------|-----|
| Product card hover shadow transition stutters on mobile | Add `will-change: box-shadow`; optimize for GPU |
| Ghost button hover shows 2px border shift (layout shift) | Transition `border-color` only; use `outline` instead of `border-width` change |
| Wishlist heart fill inconsistent between card and drawer | Sync `.pcard-wish` fill logic with drawer heart rendering |

---

## UX Issues

### Chat Widget

| Issue | Fix |
|-------|-----|
| Floating trigger hidden on <768px | Show trigger on mobile (reduced size), or update onboarding to highlight menu button |
| No loading state before SSE stream begins | Add immediate "Thinking…" message before stream |
| Old localStorage messages shown without context | Add timestamp to each message + "Previous conversation" divider |
| Safe-area-inset-bottom may not cover all iOS versions | Test iOS 15 Safari; adjust `viewport-fit` |
| Suggestion chips truncated on mobile | Horizontal scroll on chip row or shorten chip text |

### Wishlist

| Issue | Fix |
|-------|-----|
| ID generation `btoa(Math.random())` unstable across reloads | Add explicit `id` to every product in JSON |
| Heart button sync uses string inspection of onclick | Use `data-pid` as primary selector |
| "Enquire All" omits prices | Include prices: "Ring ₹X, Necklace ₹Y…" |
| `updateWishCount()` not called on drawer close | Call `updateWishCount()` on `closeWishlist()` |

### Product Modal

| Issue | Fix |
|-------|-----|
| Gallery swipe threshold 50px vs carousel 44px | Standardize all swipe thresholds to 44px |
| Gallery doesn't loop past last image | Add modulo: `index = (index - 1 + total) % total` |
| Referral code input has no real-time validation feedback | Green border on valid, red on invalid, while typing |

### Hash Routing

| Issue | Fix |
|-------|-----|
| 400ms setTimeout on `handleInitialHash()` gamble | Increase to 800ms or use `load()` completion promise |
| If MOCK_DATA used, hash routing silently fails | Log warning when products.json fails and MOCK_DATA activates |
| No visual feedback during 400ms wait | Show loading skeleton while modal opens |

---

## Performance Risks

### JavaScript

| Issue | Fix |
|-------|-----|
| Hero parallax `requestAnimationFrame(tick)` never stops | Stop loop when hero leaves viewport |
| Carousel resize handler runs 50–100× per second without throttle | Debounce to 100ms or use `ResizeObserver` |
| Wishlist button sync loops all `.pcard-wish` on every toggle | Cache by `data-pid` or use event delegation |

### CSS Animations

| Issue | Fix |
|-------|-----|
| `#hero-particles-canvas` JS exists but canvas never draws (150 lines dead code) | Remove or archive |
| Gold shimmer runs on every `.gold-text` even when off-screen | Remove `will-change` on scroll-out |
| Vault `preserve-3d` on every card, even off-screen | Mask or remove off-screen cards from DOM |

### Image Loading

| Issue | Fix |
|-------|-----|
| All product images load eagerly | Add `loading="lazy"` to `.pcard-img` in `buildCard()` |
| Modal gallery loads all images at once | Load on-demand or add `loading="lazy"` to gallery images |

### Data & API

| Issue | Fix |
|-------|-----|
| **Legacy `functions/` directory (Cloudflare Workers) — no longer used** | **Delete entire `functions/` directory** |
| Chat API has no retry on SSE failure | Exponential backoff, max 3 retries, in `streamLuvzResponse()` |
| products.json fetches from one GitHub URL with no failover | Add jsDelivr CDN as fallback endpoint |

---

## Mobile-Specific Risks

| Issue | Fix |
|-------|-----|
| iOS Safari: `overflow:hidden` + `transform` can freeze child scroll | Add `-webkit-overflow-scrolling: touch` |
| Mobile nav hamburger overlaps logo on 360px–480px | Lock nav icon width to 42px + 16px margin |
| FWA button repositions at 769px with visual jump | Add smooth transition or adjust query threshold |

---

## Browser Compatibility

| Issue | Fix |
|-------|-----|
| `backdrop-filter` unsupported in Firefox | Add solid background-color fallback |
| CSS `@property` animation (`--prism-angle`) unsupported in Safari | Provide static fallback or `animation: none` in Safari |

---

## Accessibility Debt

| Issue | Fix |
|-------|-----|
| Modal gallery has no button labels for keyboard users | Add `aria-label="Use arrow keys to navigate gallery"` |
| Wishlist heart has no aria-label | Add `aria-label="Add {{product.name}} to wishlist"` |
| No `focus-visible` outline on buttons | Add `focus-visible { outline: 2px solid var(--gold); outline-offset: 2px }` |
| Hover-only affordances (gold border) fail for colorblind users | Add secondary affordance: scale, shadow, or animation |

---

## Technical Debt Summary

| Category | Priority |
|----------|----------|
| Legacy `functions/` directory | **High** |
| Fragile wishlist button sync (string inspection) | Medium |
| Missing Jost font import | Medium |
| Duplicate CSS animations (3+) | Medium |
| Mobile chat trigger hidden <768px | Medium |
| Dead code (`initHeroParticles`, `posterData`) | Low |
| Unthrottled RAF loops (parallax, carousel resize) | Low |

---

## Next Steps

1. **Immediate:** Delete `functions/` directory.
2. **Short-term:** Fix wishlist ID generation; test mobile chat visibility; verify Oracle FastAPI stability.
3. **Medium-term:** Consolidate CSS animations; import Jost; debounce resize handlers.
4. **Long-term:** Remove dead code; implement lazy loading; add test suite.
