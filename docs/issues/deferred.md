# deferred.md — Intentionally Deferred Items

> Project: v2.10 (Production Ready)
> Last updated: 2026-05-08
> These items are non-blocking polish opportunities or low-priority improvements. No action required for production.

---

## Deferred Technical Debt

| Item | Reason for Deferral |
|------|---------------------|
| Chat widget mobile visibility (<768px) | Intentional UX choice; not performance-critical |
| Redirect/failover for products.json CDN delivery | Nice-to-have; current single-source is reliable |
| Carousel ResizeObserver optimization | Current 100ms debounce is adequate for production; further optimization not justified |

---

## New Collection — Future Enhancements

These are polish opportunities identified during the editorial rebuild. Structural redesign is not required.

- Higher quality campaign photography (lifestyle editorial register)
- Additional angle photography per product (enriched gallery experience)
- Motion refinement (cinematic timing, parallax effects on desktop)
- Optional ambient transitions (subtle fade/dissolve between images)
- Thumbnail image optimization (progressive loading, WebP variants)

---

## Long-Term Technical Roadmap

These items are non-urgent but worth tracking for future development cycles.

| Item | Notes |
|------|-------|
| Image lazy loading (non-hero) | Implement for performance at larger catalog sizes |
| Automated test suite | Add to prevent regressions as system grows |
| Core Web Vitals monitoring | Set up production monitoring dashboard |
| LCP profiling on low-end devices | Profile scroll performance under constrained hardware |
| Load testing with 100+ products | Verify catalog scaling before significant inventory growth |
