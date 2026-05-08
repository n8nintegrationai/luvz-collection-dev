# active.md — Open Issues Requiring Action

> Project: v2.11 (Production Ready + Hardened)
> Last updated: 2026-05-08

---

## Recently Resolved (v2.11 — Resilience & Accessibility Hardening Pass)

**Chat Resilience:** SSE retry logic with exponential backoff (max 3 attempts, 1s → 2s → 4s delays). Inline messaging during retry. Zero duplicate tokens on recovery.

**Data Loading:** products.json CDN failover (Primary GitHub SHA → jsDelivr @main → MOCK_DATA). Non-blocking sequential attempts with clear labeling.

**Wishlist Accessibility:** Dynamic aria-labels on all wish buttons. Labels sync immediately when state toggles. Screen reader friendly: "Add [product name] to wishlist" / "Remove [product name] from wishlist".

**Modal Gallery Accessibility:** Arrow key support (ArrowLeft/Right) for keyboard navigation. Updated button labels to "Previous product image" / "Next product image". Container aria-label explains keyboard/swipe options.

---



## UX Issues

### Chat Widget

| Issue | Fix |
|-------|-----|
| Floating trigger hidden on <768px | Show trigger on mobile (reduced size), or update onboarding to highlight menu button |
| Old localStorage messages shown without context | Add timestamp to each message + "Previous conversation" divider |
| Safe-area-inset-bottom may not cover all iOS versions | Test iOS 15 Safari; adjust `viewport-fit` |

### Wishlist

| Issue | Fix |
|-------|-----|
| "Enquire All" omits prices | Include prices: "Ring ₹X, Necklace ₹Y…" |
| `updateWishCount()` not called on drawer close | Call `updateWishCount()` on `closeWishlist()` |

### Product Modal

| Issue | Fix |
|-------|-----|
| Referral code input has no real-time validation feedback | Green border on valid, red on invalid, while typing |

### Hash Routing

| Issue | Fix |
|-------|-----|
| If MOCK_DATA used, hash routing silently fails | Log warning when products.json fails and MOCK_DATA activates |

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

| Issue | Status | Resolution |
|-------|--------|-----------|
| Modal gallery has no button labels for keyboard users | ✓ RESOLVED (v2.11) | Added aria-label to #mimg-wrap: "Use arrow keys or swipe to navigate between images". Gallery buttons now "Previous product image" / "Next product image" |
| Wishlist heart has no aria-label | ✓ RESOLVED (v2.11) | Dynamic aria-labels on all wish buttons: "Add/Remove [product name] to/from wishlist". Synced in toggleWish() and removeFromWishlist() |
| Hover-only affordances (gold border) fail for colorblind users | Active | Add secondary affordance: scale, shadow, or animation |

---

## Data & API

| Issue | Status | Resolution |
|-------|--------|-----------|
| Chat API has no retry on SSE failure | ✓ RESOLVED (v2.11) | Implemented exponential backoff (1s → 2s → 4s) with max 3 retries. Inline message "Connection interrupted. Retrying…" during retry. Final failure: "Connection lost. Please try again." |
| products.json fetches from one GitHub URL with no failover | ✓ RESOLVED (v2.11) | PRIMARY → jsDelivr versioned URL (commit SHA) → FALLBACK → jsDelivr @main → MOCK_DATA. Non-blocking sequential attempts with labeled comments (PRIMARY/FALLBACK/MOCK_DATA) |

---

## Next Steps

1. **Medium-term:** Test LCP with DevTools; profile scroll performance on low-end devices; load test with 100+ products.
2. **Long-term:** Implement image lazy loading (non-hero); add test suite; monitor Core Web Vitals in production.
