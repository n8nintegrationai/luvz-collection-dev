# CURRENT_ISSUES.md — Known Problems & Debt

---

## Visual Inconsistencies (Post CSS Consistency Pass)

### Resolved ✓
**5/8/2026:** Typography weight/case/tracking, opacity register, gold shimmer overuse, contact button timing, category hover clarity, New Collection eyebrow color, spacing rhythm. See `docs/logs/log.md` v2.2 for details.

**5/8/2026 (continued):** New Collection composition redesigned from grid-based ecommerce layout to editorial feature + carousel system. Removed duplication, introduced stacked layout with supporting product carousel. See `docs/logs/log.md` v2.3 for details.

**5/6/2026:** Category card interaction weakness (added elevation, shadow, typography response, overlay contrast). Heritage image reuse (replaced with distinct heritage.webp). Heritage shimmer looping (reduced to single 2.2s pass). Section width inconsistencies (unified categories and heritage to 1360px system, aligned all major sections). See `docs/logs/log.md` v2.4 for details.

**5/6/2026 (continued):** Typography system cleanup — Jost font properly imported with display=swap (no fallback). Duplicate keyframe definitions removed (lcFadeUp, lcImageFloat, lcImageFloatMobile). Hero-title shadow consolidated to single canonical rule. Animation system verified deterministic across desktop/mobile. Stagger logic confirmed stable; gold-text nth-child evaluated as non-issue (stagger is on .stagger-text.in > *:nth-child(n), static order). Eyebrow readability validated across all breakpoints. See `docs/logs/log.md` v2.5 for details.

### Remaining Issues

#### Typography

*(All active typography issues resolved 5/6/2026. See "Recently Resolved" section below.)*

#### Layout & Spacing

*(All active layout issues resolved 5/6/2026. See "Recently Resolved" section below.)*

#### Content & Narrative

*(None currently)*

#### Hover & Interactive States

| Issue | Fix |
|-------|-----|
| Product card hover shadow transition stutters on mobile | Add `will-change: box-shadow`; optimize for GPU |
| Ghost button hover shows 2px border shift (layout shift) | Transition `border-color` only; use `outline` instead of `border-width` change |
| Wishlist heart fill inconsistent between card and drawer | Sync `.pcard-wish` fill logic with drawer heart rendering |
| Contact section card visual hierarchy flat | Make WhatsApp dominant (gold accent), Instagram secondary (gray accent) |
| Category card hover feedback minimal | *(Resolved 5/6/2026: added elevation, shadow, overlay contrast, typography response)* |

---

## Recently Resolved (2026-05-06 — Layout & Spacing Polish)

| Item | Resolution |
|------|-----------|
| Mobile hero button spacing inconsistency | Locked `margin-bottom: 56px;` at 480px media query. Spacing now consistent across 320px–768px viewports. No layout shift. |
| Chat widget z-index mismatch | Standardized to z-index: 9999 across desktop (was 9998) and mobile (was 99999). Added stacking context comment documenting position relative to modal (9998). Trigger remains 9999. |
| Footer column misalignment at tablet | Added tablet breakpoint `@media (max-width: 1024px)` with equal 1fr 1fr 1fr grid columns. Desktop (>1024px) keeps asymmetric 1.1fr 1fr 1.1fr; tablet/mobile adapt cleanly. |

**Total:** 3 spacing/stacking fixes. Zero visual changes. System consistency improved across all breakpoints.

---

## Recently Resolved (2026-05-06 — Typography Cleanup & Animation Deduplication)

| Item | Resolution |
|------|-----------|
| Jost font silent fallback | Font properly imported from Google Fonts with `&family=Jost:wght@300;400;500&display=swap`. No-JS fallback included. Zero FOIT risk. |
| Duplicate `@keyframes lcFadeUp` | Removed 22px (dead code) version; canonical 24px definition at line 5766 now sole source of truth. Hero title stagger works correctly. |
| Duplicate `@keyframes lcImageFloat` | Removed -9px (dead code) version; canonical -8px definition at line 5783 active. Hero image float animation deterministic. |
| Duplicate `@keyframes lcImageFloatMobile` | Removed 767px media block (-5px, 9s duration) that was overridden by 768px canonical. Mobile animation now single source. |
| `hero-title` text-shadow duplication | Removed 4-layer shadow rule (lines 7356–7364, fully overridden by 5-layer with `!important`). Consolidated to canonical Block 11. No visual change. |
| `.gold-text` nth-child refactor concern | Evaluated and verified non-issue — stagger lives on `.stagger-text.in > *:nth-child(n)` (static hero content, stable order). No refactor needed. |
| Eyebrow opacity readability (8px) | Validated across desktop/tablet/mobile breakpoints. `.cat-glass-eyebrow` at 50% opacity on dark background is readable. No change required. Hover state (68%) provides adequate contrast feedback. |

**Total cleanup:** ~47 lines of dead code removed. Animation system now deterministic. Zero visual regressions. Typography system technically correct and maintainable.

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

1. **Short-term:** Fix wishlist ID generation; test mobile chat visibility; verify Oracle FastAPI stability.
2. **Medium-term:** Consolidate CSS animations; import Jost; debounce resize handlers.
3. **Long-term:** Remove dead code; implement lazy loading; add test suite.
