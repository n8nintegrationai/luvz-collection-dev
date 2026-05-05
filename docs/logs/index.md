# LUVZ Collection Documentation Index

---

## Documents (Read in Order)

### 1. CLAUDE.md — Operating Manual
File ownership, protected IDs/classes, breakpoint sync, system summaries (carousel, modal, wishlist, vault, chat), development rules, fragile areas, deployment.

### 2. DESIGN_SYSTEM.md — Brand & Visual Rules
Color system, typography, spacing grid, shadow system, component rules (cards, buttons, modals, carousels, chat), animation keyframes, breakpoints, accessibility.

### 3. ARCHITECTURE.md — System Design & Topology
Data flow (page load, chat, wishlist), rendering ownership, critical dependencies (load order, breakpoint sync, registry timing), scroll/touch/keyboard event maps, vault 3D, error handling, deployment checklist.

### 4. CURRENT_ISSUES.md — Known Problems & Debt
Visual inconsistencies, UX gaps, performance risks, mobile-specific risks, browser compatibility, accessibility debt, tech debt priority matrix, next steps.

---

## Quick Reference by Role

**Designers:** DESIGN_SYSTEM.md → CURRENT_ISSUES.md (visual section) → CLAUDE.md development rules before proposing changes.

**Frontend Engineers:** CLAUDE.md → ARCHITECTURE.md → CURRENT_ISSUES.md → DESIGN_SYSTEM.md before building new components.

**AI Assistants:** Read CLAUDE.md completely. Use plan mode for changes touching >2 files. Reference ARCHITECTURE.md before implementing features. Check CURRENT_ISSUES.md for risks in affected areas.

**QA / PMs:** CURRENT_ISSUES.md for status; ARCHITECTURE.md deployment checklist before releases.

---

## File Structure

```
Prod New Code/
├── CLAUDE.md
├── DESIGN_SYSTEM.md
├── ARCHITECTURE.md
├── CURRENT_ISSUES.md
├── docs/
│   ├── index.md                 ← this file
│   ├── log.md                   ← change log
│   ├── PROJECT_CONTEXT.md       ← archive
│   └── HERO_ENHANCEMENT.md      ← archive
├── public/
│   ├── index.html               ← entire site (HTML + CSS)
│   ├── app.js                   ← product rendering, carousels, modals
│   ├── luvz-chat.js             ← chat widget
│   ├── luvz-chat.css            ← chat widget styles
│   ├── data/products.json       ← product catalog
│   └── images/
├── public/admin/
│   ├── config.yml               ← Decap CMS schema
│   └── index.html               ← CMS admin panel
├── .vscode/settings.json        ← Live Server port 5502
├── wrangler.jsonc               ← Cloudflare Pages config
└── .claude/settings.local.json
```

**Note:** `functions/api/` (chat.js, auth.js, callback.js) is dead code pending deletion. See CURRENT_ISSUES.md.

---

## Common Tasks

| Task | Read first | Then check |
|------|-----------|-----------|
| Add a new product section | CLAUDE.md "New Section Workflow" | DESIGN_SYSTEM.md components; ARCHITECTURE.md data flow |
| Fix a visual bug | CURRENT_ISSUES.md | DESIGN_SYSTEM.md; CLAUDE.md protected IDs |
| Redesign a section | CLAUDE.md (plan mode required) | ARCHITECTURE.md; DESIGN_SYSTEM.md motion rules |
| Optimize performance | CURRENT_ISSUES.md performance section | ARCHITECTURE.md |
| Debug broken chat | ARCHITECTURE.md "Chat Flow" | CURRENT_ISSUES.md "Data & API" |
| Deploy | ARCHITECTURE.md deployment checklist | CLAUDE.md environment variables |

---

## Maintenance Rules

1. After a bug fix: remove from CURRENT_ISSUES.md; add to log.md.
2. After adding a new system: document in CLAUDE.md "System Summaries" and ARCHITECTURE.md.
3. Before deployment: run ARCHITECTURE.md "Deployment Checklist."
4. Quarterly: audit all four docs for staleness.

---

## Links

- Live site: https://www.luvzcollection.com
- GitHub: https://github.com/n8nintegrationai/luvz-collection-dev
- Decap CMS admin: https://www.luvzcollection.com/admin

---

## Version History

| Version | Date | Summary |
|---------|------|---------|
| v2.2 | 2026-05-05 | CSS consistency pass: typography weight 900→700, shimmer isolation, opacity normalization, glow rebalancing, spacing rhythm unification, hover timing standardization |
| v2.1 | 2026-05-04 | All four docs trimmed; cross-doc duplication removed; functions/ flagged for deletion |
| v2.0 | 2026-05-04 | AI-optimized documentation suite; full rewrite from redesign-heavy v1.0 |
| v1.0 | 2026-05-02 | Original CLAUDE.md |

Last updated: 2026-05-05
