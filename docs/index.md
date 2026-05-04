# LUVZ Collection Documentation Index

Comprehensive AI-optimized documentation for the LUVZ Collection e-commerce site.

---

## Core Documentation (Read in Order)

### 1. **CLAUDE.md** — Operating Manual
The single source of truth for development. Start here.

**Covers:**
- Project overview (what is LUVZ Collection)
- Tech stack and architecture
- File ownership map (what renders where)
- Protected IDs and classes (never rename)
- Breakpoint sync requirements (CSS ↔ JS)
- System summaries (carousel, modal, wishlist, vault, chat)
- AI development rules (how to safely modify the codebase)
- Known fragile areas (risks and mitigations)
- Environment variables and deployment
- Critical bug (localhost chat endpoint)

**Audience:** AI assistants, engineers, designers, CMS admins

**Read time:** 10 minutes

---

### 2. **DESIGN_SYSTEM.md** — Brand & Visual Rules
Defines luxury brand consistency, component styling, and accessibility.

**Covers:**
- Brand philosophy (restrained elegance, whispered luxury)
- Color system (earth theme locked)
- Typography (Cinzel, Cormorant Garamond, Jost)
- Spacing system (8px grid)
- Shadow system (CSS variables)
- Component rules (cards, buttons, modals, carousels, chat)
- Motion & animation (entrance, hover, carousel snaps, hero parallax)
- Responsive breakpoints (mobile-first)
- Image handling and responsive images
- Accessibility standards
- Performance considerations
- Design debt and future work

**Audience:** Designers, frontend engineers, AI designing new sections

**Read time:** 15 minutes

---

### 3. **ARCHITECTURE.md** — System Design & Topology
Technical deep-dive into data flow, rendering ownership, and system interactions.

**Covers:**
- Data flow diagrams (page load, product rendering, chat, wishlist)
- Rendering ownership (who builds what HTML)
- Critical dependencies (load order, breakpoint sync, registry timing)
- System interactions (scroll observers, touch events, keyboard handlers)
- 3D vault system (initialization, visibility, rendering)
- Error handling strategy (failures and fallbacks)
- Performance optimization opportunities
- Deployment checklist

**Audience:** Backend engineers, systems architects, AI implementing features

**Read time:** 20 minutes

---

### 4. **CURRENT_ISSUES.md** — Known Problems & Debt
Inventory of visual inconsistencies, UX gaps, performance risks, and tech debt.

**Covers:**
- Visual inconsistencies (typography, layout, hover states)
- UX issues (chat widget, wishlist, modal gallery, referral codes)
- Performance risks (JavaScript loops, CSS animations, image loading)
- Mobile-specific risks (iOS Safari quirks, keyboard overlap)
- Browser support & compatibility
- Accessibility debt (missing labels, focus states, color-only affordances)
- Known browser bugs and workarounds
- Tech debt summary and priority matrix
- Next steps (immediate fixes, short/medium/long-term)

**Audience:** QA, product managers, sprint planners, engineers triaging issues

**Read time:** 15 minutes

---

## Quick Reference

### For Designers
- Read **DESIGN_SYSTEM.md** for component styling and color system
- Check **CURRENT_ISSUES.md** for visual inconsistencies to fix
- Reference **CLAUDE.md** section "AI Development Rules" before proposing redesigns

### For Frontend Engineers
- Read **CLAUDE.md** first for file ownership and protected selectors
- Study **ARCHITECTURE.md** for data flow and system interactions
- Check **CURRENT_ISSUES.md** for known fragile areas before modifying
- Review **DESIGN_SYSTEM.md** before building new components

### For AI Assistants (Claude/Codex)
1. Read **CLAUDE.md** completely (10 min) — know the baseline
2. Use plan mode for any change touching >2 files
3. Reference **ARCHITECTURE.md** for data flow before implementing features
4. Check **CURRENT_ISSUES.md** for known risks in affected areas
5. Test against CLAUDE.md fragile areas checklist

### For Product Managers / Stakeholders
- **CURRENT_ISSUES.md** for status of known problems
- **DESIGN_SYSTEM.md** for brand consistency philosophy
- **CLAUDE.md** section "Critical Bug" for production blockers

---

## File Structure

```
Prod New Code/
├── CLAUDE.md                    ← Operating manual (START HERE)
├── DESIGN_SYSTEM.md             ← Visual & brand rules
├── ARCHITECTURE.md              ← System topology & data flow
├── CURRENT_ISSUES.md            ← Known problems & risks
├── docs/
│   ├── index.md                 ← This file (documentation index)
│   ├── log.md                   ← Change log & version history
│   ├── PROJECT_CONTEXT.md       ← Legacy architectural notes (archive)
│   └── HERO_ENHANCEMENT.md      ← Legacy redesign notes (archive)
├── public/
│   ├── index.html               ← Entire site (HTML + CSS)
│   ├── app.js                   ← Product rendering, carousels, modals
│   ├── luvz-chat.js             ← Chat widget
│   ├── luvz-chat.css            ← Chat widget styles
│   ├── data/products.json       ← Product catalog (source of truth)
│   └── images/
├── functions/api/
│   ├── chat.js                  ← Gemini API Worker
│   ├── auth.js                  ← GitHub OAuth
│   └── callback.js              ← OAuth callback
├── public/admin/
│   ├── config.yml               ← Decap CMS schema
│   └── index.html               ← CMS admin panel
├── .vscode/settings.json        ← Live Server port 5502
├── wrangler.jsonc               ← Cloudflare Pages config
└── .claude/settings.local.json  ← Claude Code permissions
```

---

## Common Tasks

### "I want to add a new product section"
1. Read: **CLAUDE.md** "New Section Workflow"
2. Reference: **ARCHITECTURE.md** "Data Flow"
3. Check: **DESIGN_SYSTEM.md** component rules
4. Test: **CLAUDE.md** "Known Fragile Areas" (carousel breakpoints)

### "I want to fix a visual bug"
1. Read: **CURRENT_ISSUES.md** (find the issue)
2. Review: **DESIGN_SYSTEM.md** (component rules)
3. Check: **CLAUDE.md** protected IDs/classes (don't break selectors)
4. Verify: Matches CSS variable system (no hardcoded colors)

### "I want to redesign the hero section"
1. Use **plan mode** (multi-file change)
2. Read: **ARCHITECTURE.md** "Data Flow" (understand rendering)
3. Review: **CLAUDE.md** fragile areas (parallax RAF loop, animation delays)
4. Check: **DESIGN_SYSTEM.md** typography & motion rules
5. Test: Mobile keyboard, scroll parallax, animation performance

### "I want to optimize performance"
1. Review: **CURRENT_ISSUES.md** performance risks section
2. Study: **ARCHITECTURE.md** "Performance Optimization Opportunities"
3. Profile: Lighthouse, Core Web Vitals
4. Implement: Follow **CLAUDE.md** AI Development Rules

### "Chat is broken in production"
1. Check: **CLAUDE.md** "Critical Bug" section (localhost endpoint)
2. Review: **ARCHITECTURE.md** "Chat Flow"
3. Test: **CURRENT_ISSUES.md** "Data & API Issues"
4. Verify: Environment variables set in Cloudflare dashboard

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v2.0 | 2026-05-04 | Initial AI-optimized documentation suite (CLAUDE.md rewrite, DESIGN_SYSTEM.md, ARCHITECTURE.md, CURRENT_ISSUES.md) |
| v1.0 | 2026-05-02 | Original CLAUDE.md with redesign notes and fragile-area warnings |

See **docs/log.md** for detailed change log.

---

## How to Maintain This Documentation

1. **After each major change:** Update CURRENT_ISSUES.md or ARCHITECTURE.md with new findings
2. **After adding a feature:** Document in CLAUDE.md "System Summaries" if it's a new system
3. **After fixing a bug:** Remove from CURRENT_ISSUES.md; add to docs/log.md
4. **Quarterly:** Review all 4 documents for staleness; update version in this index
5. **Before redesigns:** Reference DESIGN_SYSTEM.md to validate brand consistency
6. **Before deployment:** Check ARCHITECTURE.md "Deployment Checklist"

---

## Related Resources

- **Live site:** https://www.luvzcollection.com
- **GitHub repo:** https://github.com/n8nintegrationai/luvz-collection-dev
- **Decap CMS admin:** https://www.luvzcollection.com/admin
- **Google Fonts:** Cinzel, Cormorant Garamond, Crimson Pro
- **Cloudflare Dashboard:** Environment variables, deployments, analytics

---

## Questions?

- **"Where do I find X?"** → Search this index (Ctrl+F)
- **"What's the rule for X?"** → Check DESIGN_SYSTEM.md or CLAUDE.md
- **"Why is Y broken?"** → Look in CURRENT_ISSUES.md or ARCHITECTURE.md
- **"How do I implement X?"** → Read CLAUDE.md "AI Development Rules"

Last updated: 2026-05-04
