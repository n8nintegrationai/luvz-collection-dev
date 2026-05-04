# Documentation Change Log

---

## v2.1 (2026-05-04) — Documentation Trim

All four documents trimmed for concision. No rules changed; no content added.

**Changes:**
- CLAUDE.md: Removed data flow diagram (lives in ARCHITECTURE.md), "Redesign Workflow" meta-instructions, deployment narrative (duplicate of checklist), section intro sentences.
- DESIGN_SYSTEM.md: Collapsed brand philosophy to concrete rules; removed font rationale sub-section; removed backend performance block (wrong document); compressed Design Debt to a list.
- ARCHITECTURE.md: Removed "Performance Optimization Opportunities" (verbatim duplicate of CURRENT_ISSUES.md); collapsed all "Does NOT own" lists to single sentences; trimmed outcome-description steps from chat/wishlist flows.
- CURRENT_ISSUES.md: Dropped "Impact" column from all tables; merged "Known Browser Bugs" into Browser Compatibility; removed "Next Steps" sentences that restated the priority column.
- index.md: Removed per-document "Covers" bullet lists (restate doc headers); collapsed role guidance to single-line flows; replaced "Common Tasks" prose with lookup table; removed "Questions?" section (restated the index's own purpose).
- log.md: Removed v2.0 rationale narrative (describes the previous doc state, not actionable going forward); collapsed future version plans.

---

## v2.0 (2026-05-04) — AI-Optimized Documentation Suite

Full rewrite. Replaced redesign-heavy CLAUDE.md with four-document system-oriented suite.

**Stack correction:** Documentation previously assumed cloud Gemini API. Actual stack confirmed as FastAPI + Ollama (luvz-fast, Llama 3.2 1B) + sentence-transformers on Oracle ARM — 100% local, no external API dependencies.

**New documents created:** DESIGN_SYSTEM.md, ARCHITECTURE.md, CURRENT_ISSUES.md, docs/index.md, docs/log.md.

**CLAUDE.md changes:** Removed all redesign task notes and dated events (2026-05-02/03/04); added System Summaries, AI Development Rules, and structured fragile-areas risk register.

---

## v1.0 (2026-05-02) — Original CLAUDE.md

Initial documentation from three redesign sprints. Mixed architecture rules with ephemeral task notes; no design system, no data flow docs, no risk register.

---

## Planned

- **v2.2:** Jost font import strategy; CSS @keyframes consolidation; CMS admin workflow; GitHub OAuth setup guide.
- **v3.0:** Automated doc validation against code; risk register linked to GitHub issues; Core Web Vitals tracking.

---

## How to Update This Log

```markdown
### vX.Y (YYYY-MM-DD) — Short Title

**Changes:**
- FILE.md: what changed and why

**Rationale:** one sentence if non-obvious.
```

Commit message format: `docs: update documentation [reason]`

---

## Maintenance Checklist

- [ ] After each bug fix: remove from CURRENT_ISSUES.md; add entry here.
- [ ] After each new feature: update ARCHITECTURE.md data flow and CLAUDE.md System Summaries.
- [ ] After each redesign: validate against DESIGN_SYSTEM.md.
- [ ] Quarterly: audit all four docs for staleness; update version in index.md.
- [ ] Pre-deployment: run ARCHITECTURE.md "Deployment Checklist."

Last updated: 2026-05-04
