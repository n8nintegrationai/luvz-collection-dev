# Documentation Change Log

Version tracking and history for LUVZ Collection documentation suite.

---

## v2.0 (2026-05-04) — AI-Optimized Documentation Suite

**Major rewrite and expansion. Replaces legacy redesign-heavy documentation with system-oriented reference.**

### Critical Stack Correction (2026-05-04)

**Issue:** Documentation incorrectly assumed cloud Gemini API integration.

**Actual Stack (Confirmed):**
- Backend: FastAPI + Ollama + sentence-transformers on Oracle ARM instance
- LLM: luvz-fast (Llama 3.2 1B with custom Modelfile)
- Embeddings: Local sentence-transformers (no cloud APIs)
- Infrastructure: 100% local inference, zero external API dependencies

**Updates Made:**
- Replaced all "Gemini API" mentions with "Ollama (luvz-fast model)"
- Added explicit RAG system definition: sentence-transformers for embeddings + local vector DB
- Added ARM performance optimization rules to DESIGN_SYSTEM.md
- Updated deployment checklist with Ollama verification steps
- Removed cloud API references; added local inference error handling

**Impact:** When reaching Step 3 (Implementation), all suggestions will focus on HTTP requests to local FastAPI/Ollama endpoint. No cloud library imports or external API keys recommended.

### New Documents Created

1. **CLAUDE.md (Rewritten)**
   - Removed all redesign task notes (2026-05-02/03/04 patches)
   - Added concise "Repository Architecture" section with file ownership table
   - Replaced 50-line "Known Fragile Areas" table with 11-row risk register
   - Added "System Summaries" section (carousel, modal, wishlist, vault, chat) — one paragraph each
   - Added "AI Development Rules" section (how to safely modify the codebase)
   - Added "Critical Bug" callout (localhost chat endpoint)
   - Removed CLAUDE.md from MEMORY requirement — now self-contained

2. **DESIGN_SYSTEM.md (New)**
   - Complete visual system definition
   - Brand philosophy (restrained elegance, whispered luxury)
   - Color system (earth theme locked, all CSS variables)
   - Typography hierarchy and font strategy
   - Spacing grid (8px baseline)
   - Shadow system (CSS variable usage)
   - Component rules (cards, buttons, modals, carousels, chat widget)
   - Motion & animation guidelines
   - Responsive breakpoints (mobile-first)
   - Image handling and srcset strategy
   - Accessibility standards
   - Performance considerations

3. **ARCHITECTURE.md (New)**
   - Data flow diagrams (ASCII, text-based)
   - Rendering ownership matrix (file → what it renders)
   - Critical dependencies (load order, breakpoint sync, registry timing)
   - System interactions map (scroll observers, touch events, keyboard)
   - 3D vault system deep-dive
   - Error handling strategy (failures and fallbacks)
   - Performance optimization opportunities
   - Deployment checklist

4. **CURRENT_ISSUES.md (New)**
   - Visual inconsistencies table (typography, layout, hover)
   - UX issues (chat widget, wishlist, modal, referral)
   - Performance risks (RAF loops, CSS animations, image loading, DOM)
   - Data & API issues (chat endpoint, GitHub fetch, CMS workflow)
   - Mobile-specific risks (iOS Safari, keyboard, viewport)
   - Browser support & compatibility matrix
   - Accessibility debt (missing labels, focus states)
   - Known browser bugs and workarounds
   - Tech debt summary with priority matrix
   - Next steps (immediate, short/medium/long-term)

5. **docs/index.md (New)**
   - Documentation index and navigation guide
   - Read-in-order instructions
   - Quick reference for different roles (designers, engineers, AI, PMs)
   - File structure overview
   - Common tasks with documentation links
   - Version history table
   - Maintenance guidelines

6. **docs/log.md (This File)**
   - Version history and change tracking
   - Facilitates long-term maintenance and audits

### Rationale

**Why this rewrite was necessary:**
- Original CLAUDE.md mixed architecture (immutable) with redesign tasks (ephemeral)
- 50+ lines of redesign notes (2026-05-02/03/04) created confusion and noise
- Dated events section was task-like, not architectural
- No systematic risk register (fragile areas scattered, incomplete)
- Missing design philosophy, brand rules, error handling strategy
- No data flow documentation (new engineers/AI struggle with streaming, SSE, etc.)
- Fragile areas table was too long and conflated different risk categories

**What was removed:**
- All redesign task notes (hero enhancement, luxury art direction, etc.)
- Dated events (2026-05-02 through 2026-05-04)
- "Before Starting Any Redesign" checklist (now in DESIGN_SYSTEM.md and CLAUDE.md rules)
- Bloated PROTECTED list (consolidated to essentials only)

**What was added:**
- Brand philosophy and design language
- Complete color/typography/spacing system definition
- Data flow diagrams (page load, chat, wishlist)
- System interaction maps (observers, events, dependencies)
- Comprehensive error handling and fallback strategy
- Performance optimization roadmap
- Risk register with prioritization
- Accessibility audit findings
- Browser compatibility matrix
- Role-based quick start guides (for designers, engineers, AI, PMs)

### Impact

| Aspect | Before | After | Benefit |
|--------|--------|-------|---------|
| CLAUDE.md lines | 260 | 380 | More detail, same length (better content density) |
| Redesign task noise | 50 lines | 0 lines | Cleaner spec, no outdated patches |
| Design rules documented | No | Yes | Designers can self-serve on brand rules |
| Data flow documented | No | Yes | Engineers/AI understand streaming, SSE, registry |
| Risk register | Fragmented | Structured | Easier to prioritize, audit, track |
| Browser compat matrix | No | Yes | QA knows what to test |
| Performance roadmap | No | Yes | PMs can prioritize optimization |
| AI safety rules | Minimal | Explicit | Reduces risk of breaking changes |

---

## v1.0 (2026-05-02) — Original CLAUDE.md

**Initial documentation capturing 3 redesign sprints (nav-howit-works-footer-redesign, luxury-art-direction-refinement, hero-micropolish).**

### Original Contents

- Project overview (brief)
- File map (table of files)
- Architecture rules (CSS, JS, data flow)
- Protected IDs/classes (bloated list)
- Fragile areas (50 lines, conflated risks)
- Redesign task notes (50+ lines of 2026-05-02/03/04 patches)
- Dated events (implementation notes for specific dates)
- "Before Starting Any Redesign" checklist
- Fonts, breakpoints, etc.

### Limitations of v1.0

- Mixed architecture (immutable) with task notes (ephemeral)
- Difficult to distinguish what's important vs. what's temporary
- No design philosophy or brand rules
- No systematic risk register
- Missing data flow documentation
- No error handling or fallback strategy
- No performance roadmap
- Bloated protected lists (hard to scan)
- No role-based entry points (confusing for first-time readers)

---

## Future Versions

### v2.1 (Planned)
- Consolidate CSS @keyframes duplicates
- Document Jost font import strategy
- Add performance benchmarks (LCP, FID, CLS targets)
- Add test suite documentation (planned)

### v2.2 (Planned)
- Add Decap CMS workflow documentation (CMS admin guide)
- Document GitHub OAuth setup for admins
- Add deployment runbooks (pre-production checklist)

### v3.0 (Future)
- Automated documentation validation (CLAUDE.md checks against actual code)
- Architecture diagram generation (data flow ASCII art)
- Risk register integration with issue tracking (Linear/GitHub issues)
- Performance dashboard (Core Web Vitals tracking)

---

## How to Update This Log

After making documentation changes:

1. **Add new entry** under appropriate version
2. **Note what changed** (which files, which sections)
3. **Add rationale** (why was it needed)
4. **Update version number** (semantic versioning: major.minor.patch)
5. **Update docs/index.md** version history table
6. **Commit to git** with message: `docs: update documentation [reason]`

Example:
```markdown
### v2.1 (2026-05-15) — Chat Performance Optimization

**Fixed:** SSE timeout handling, RTT improvements

**Changes:**
- ARCHITECTURE.md: Added "Chat Performance" section with timeout tuning
- CURRENT_ISSUES.md: Removed "Chat API timeout" from risks (fixed)
- CLAUDE.md: Updated environment variable docs

**Rationale:** Chat timeout was causing 25% of messages to fail; now retries up to 3 times.
```

---

## Maintenance Checklist

- [ ] After each major feature: Update ARCHITECTURE.md data flow
- [ ] After each bug fix: Remove from CURRENT_ISSUES.md
- [ ] After each redesign: Validate against DESIGN_SYSTEM.md rules
- [ ] Quarterly: Audit all 4 docs for staleness
- [ ] Pre-deployment: Run ARCHITECTURE.md "Deployment Checklist"
- [ ] Annually: Plan major version bump if needed

---

Last updated: 2026-05-04

