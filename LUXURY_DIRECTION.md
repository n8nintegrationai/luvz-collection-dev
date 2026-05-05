# LUVZ Collection — Visual Art-Direction Constitution
### `LUXURY_DIRECTION.md` · Stabilised & Refined Build
**Last Updated:** 2026-05-04 · **Status:** Brand DNA — Supersedes all implementation decisions

---

## Change Log: What Was Resolved in This Build

This document is the stabilised evolution of the original LUXURY_DIRECTION.md. Five structural contradictions have been identified, challenged, and resolved. All original intent is preserved — only the contradictions have been removed.

| # | Contradiction | Resolution |
|---|---------------|------------|
| 1 | **Typography Cold War** — Cinzel assigned a sentence-case literary role in WHY LUVZ | Cinzel strictly display/headers only. Cormorant or Crimson Pro owns all literary/editorial prose. |
| 2 | **Space-Time** — 80px vs 100px competing section padding standards | Unified via `clamp(64px, 8vw, 100px)` through a single `var(--section-gap)` token. |
| 3 | **Glass Concierge UX Loophole** — chat trigger could obscure product photography | New Visual Priority Rule: Concierge minimises to subtle text link on Full-Screen Zoom / Gallery View. |
| 4 | **Button Hierarchy Collision** — Ghost used for both primary and secondary CTAs | Ghost reserved for secondary only. Solid Fill (Primary Dark or Gold) reserved for Inquire/Purchase path. |
| 5 | **Animation Overlap** — Hero Shimmer and Heritage skWave able to run simultaneously | Heritage `skWave` triggers only when Heritage heading is ≥50% in-viewport via IntersectionObserver. |

---

## Preface

This document is the visual conscience of LUVZ Collection. It is not a style guide. It is not a component library. It is a set of permanent laws — the kind that do not change when trends shift, when a new engineer joins, or when a campaign brief arrives in a hurry.

LUVZ Collection makes handcrafted 92.5 sterling silver and 22K gold jewelry in India. The brand serves people who buy jewelry not as a transaction but as a keepsake decision. Every visual, atmospheric, and typographic choice on this website must honour that decision — the seriousness of it, the emotional weight of it, the longevity of it.

Luxury, for the purposes of this document, is not price. It is pacing. It is restraint. It is the willingness to let silence do work.

---

## 1. Brand Emotional Positioning

### Emotional Temperature

LUVZ is **warm, unhurried, and quietly certain.** Not loud. Not maximalist. Not urgent.

The emotional register is that of a family jeweler in a quiet room — someone who has been making pieces for forty years and doesn't need to convince you of anything. The craft is evident. The silence is intentional.

Every second a visitor spends on this site should feel like something they chose to spend, not something the site demanded.

### Pacing Philosophy

The site moves at **the speed of a considered purchase, not a browsing session.** Animations resolve before the next thing asks for attention. Sections breathe. Hover states are rewards, not reflexes. Loading happens without apology.

The site must never feel impatient. Impatience is for discounters.

### Luxury Philosophy

Luxury here is expressed through three principles:

1. **Restraint of emphasis.** If everything is emphasized, nothing is. The site should have one focal point, one loudest moment per viewport — and then quiet.
2. **Temporal generosity.** Give elements room to arrive. A section heading that eases in over 0.8 seconds signals that the brand believes the visitor has time. A heading that snaps in signals the opposite.
3. **Material honesty.** The palette — near-black espresso, warm amber, muted cream — should feel like the material it houses: tarnished silver, warm gold, aged wood. The site should smell like a jeweler's cabinet, not a technology product.

### Restraint Philosophy

**Never add an effect to fix a weakness.** Shimmer does not compensate for weak copy. Glow does not compensate for a poor image. Animation does not compensate for an unclear hierarchy.

When something feels wrong, the answer is almost always removal, not addition. A missing element rarely breaks luxury feel. An extra one almost always does. Restraint is the active choice to trust what is already there.

### Editorial Philosophy

LUVZ operates as a **jewelry editorial that happens to have a store.** The brand narrative earns the right to a magazine's voice. That voice is:

- Present tense, declarative: *"Crafted to feel heirloom-worthy."* Not *"Our pieces are designed to..."*
- Short. One sentence where ten could live.
- Sentence case for all editorial prose and WHY LUVZ passages. Title Case for structural section headings. Cinzel in Title Case reads architecturally confident. Cormorant or Crimson Pro in sentence case reads warmly human. Each register has its place and must not colonise the other.

### What LUVZ Should Emotionally Feel Like

A visitor who lands on this site should feel, in sequence:

1. **Arrested** — by the hero. Something is happening here that asks for attention.
2. **Curious** — as they scroll. The brand has a story, and it is being told with visual care.
3. **Persuaded without being sold to** — by the craft narrative. The Heritage section should feel like truth, not marketing.
4. **Welcomed, not processed** — at the contact and WhatsApp touchpoints.
5. **Reluctant to leave** — because the atmosphere has value in itself.

---

## 2. Typography Laws

> **RESOLVED — Fix #1:** Cinzel is a display face. It must never be assigned a 'literary' or sentence-case editorial role. All literary/editorial prose belongs exclusively to Cormorant Garamond or Crimson Pro. The WHY LUVZ `why-statement` must use Cormorant Garamond 400 italic or Crimson Pro 400, sentence case — never Cinzel.

### Approved Font Roles

| Font | Role | When Used |
|------|------|-----------|
| **Cinzel** | Display, identity only | Brand name, section headings (Title Case), card titles, pillar numerals, eyebrow labels, UI badge text. **Never used for body copy or sentence-case prose.** |
| **Cormorant Garamond** | Editorial body | All descriptive prose, captions, modal copy, prices, editorial sub-headings in sentence case. |
| **Crimson Pro** | Elevated prose | Long-form brand narrative, poetic brand statements, WHY LUVZ why-statement. Not decorative — it carries the most refined editorial register on the site. |
| **Jost** | UI (system fallback) | Button labels, navigation links, form labels, badge text. Never used for editorial prose. |

> ⚠ **Body text at Cinzel is permanently forbidden.** Cinzel is a display face not designed for extended reading. This includes the WHY LUVZ why-statement, which must use Cormorant Garamond 400 italic or Crimson Pro 400, sentence case.

### Weight Hierarchy

There is one correct weight cadence for this site. Deviation from it is a hierarchy error, not a style choice.

| Element | Font + Weight |
|---------|--------------|
| Brand mark / Hero title | Cinzel 400 — cinematic, singular |
| Section headings | Cinzel 700 — structural, not competing with hero |
| Card titles | Cinzel 600 — informational, compact |
| Eyebrows / labels | Cinzel 600 — small, precise, uppercase |
| Body prose | Cormorant 400 — reading weight, generous |
| Emphasized body | Cormorant 600 — selective, not pervasive |
| Captions / support text | Cormorant 300 — light, supporting |
| **WHY LUVZ why-statement** | **Cormorant 400 italic OR Crimson Pro 400 — sentence case. NEVER Cinzel.** |
| UI elements | Jost 600 — functional, clear |

> ⚠ **The inversion of section headings at weight 900 with hero at weight 400 must never recur.** The most prominent element must not be typographically outranked by its supporting sections.

### Case Law

Case is not a stylistic preference on this site. It is a structural signal.

**Title Case — structural headings:**
Section headings (`.sec-title`) use Title Case. This is the architectural register: formal, load-bearing, unhurried. Examples: *"Top Sellers", "New Collection", "Our Heritage", "Get In Touch"*

**Sentence case — editorial prose:**
All body copy, card descriptions, brand statements, captions, and the WHY LUVZ editorial passages use sentence case, set in **Cormorant Garamond or Crimson Pro — not Cinzel.** Examples: *"Crafted to feel heirloom-worthy."* / *"Each piece begins with the weight of the metal in the maker's hand."*

> **The test for case selection:** If the text is navigating or labelling a section → Title Case + Cinzel. If the text is speaking to the visitor as a person → sentence case + Cormorant / Crimson Pro. These two registers must never be played by the same font.

### Uppercase Rules

**Uppercase is permitted for:**
- Eyebrows (section category labels — small, widely spaced)
- Badge text (NEW, SOLD, GOLD)
- UI labels (navigation items, button text)
- Footer column headers
- Pillar numerals' unit labels (92.5 / 22K)

**Uppercase is forever forbidden for:**
- Section headings (`.sec-title`) — use Title Case instead
- Hero title — already correct
- Card descriptions
- Any sentence longer than four words

> **The test:** If removing the uppercase makes the text feel less important, the text was relying on format rather than content. The content must earn its own weight.

### Letter-Spacing Philosophy

| Element | Tracking |
|---------|----------|
| Section headings (Title Case) | 0.12–0.15em — more refined than previous 0.2em |
| Eyebrows | 0.45–0.55em — categorical, needs air |
| Card titles | 0.08em — correct |
| UI labels / buttons | 0.05em — correct |
| Body text | 0 — never track body text |

> ⚠ **Never apply tracking above 0.2em to any element larger than 14px.** At heading scale, 0.2em+ reads as a banner, not a headline.

### Opacity Tiers

| Tier | Opacity | Use |
|------|---------|-----|
| Primary | 100% | Headlines, CTAs, active UI |
| Secondary | 75% | Body prose, card descriptions, standard copy |
| Tertiary | 50% | Captions, supporting labels, quiet navigation |
| Minimum | 50% | The floor. Nothing below this for any text that must be read. |
| Ghost | 28–35% | Copyright / legal only — intentionally near-invisible |

> ⚠ **The contact section title at 0.5 opacity reads as apology, not restraint.** A section title must be at 100%. Footer links at 45% opacity are below the readable floor — raise to 55% minimum.

### Headline Behaviour

Headlines arrive **once and settle.** They do not shimmer after arrival. They do not pulse. They do not compete.

The `skWave` shimmer animation is a designation, not a decoration. It belongs exclusively to the Heritage section heading. No other heading on the site may use `skWave`, at any scroll position, under any circumstance. The moment a second element shimmers, the Heritage heading loses its designation.

> **CRITICAL:** The Heritage `skWave` must only trigger when the Heritage heading is ≥50% in-viewport. This ensures the shimmer never competes with the hero entrance animation. See Fix #5 in Section 5.

### Forbidden Typography Patterns

- Section headings at weight 900
- All-caps section headings
- Sentence case for structural section headings
- Title Case for editorial prose
- **Cinzel used for body copy, why-statements, or any sentence-case prose**
- Letter-spacing above 0.2em at heading scale
- `skWave` shimmer on any element other than the Heritage section heading
- Opacity below 50% on any readable text
- Mixed fonts within a single sentence
- Cormorant Garamond below 14px
- Jost used for editorial prose

---

## 3. Layout & Spacing Laws

> **RESOLVED — Fix #2:** The previous document defined Desktop Standard as 80px in Section 3 and 100px for Heritage in Section 8. Both are now unified under `var(--section-gap)` using a single responsive clamp. All spacing values remain 8px-grid multiples.

### The Unified Section Gap Variable

All section top/bottom padding is now governed by a single CSS variable:

```css
--section-gap: clamp(64px, 8vw, 100px);
```

This single token replaces the previous desktop-standard (80px) and heritage-exception (100px). The clamp resolves to:

- **64px** at narrow viewports (mobile — generous, on the 8px grid)
- **~80px** at typical desktop (~1000px viewport)
- **100px** at large desktop — the previous Heritage maximum, now the natural ceiling for all sections

Sections previously at 80px and sections previously at 100px now share one token and scale proportionally. The rhythm no longer jumps.

### The 8px Baseline Grid

Every spacing decision on this site resolves to a multiple of 8. This is not a guideline. It is the structural foundation that makes the layout feel deliberate rather than approximate.

| Value | Use |
|-------|-----|
| 8px | Tight internal gaps (icon + label, price + badge) |
| 16px | Card internal padding, carousel gap, tight section gaps |
| 24px | Standard internal margins, horizontal section padding (min) |
| 32px | Wider internal margins |
| 48px | Section padding — mobile minimum |
| 64px | Section padding — tablet / `var(--section-gap)` minimum |
| 80px | Section padding — `var(--section-gap)` midpoint at ~1000px |
| 100px | Section padding — `var(--section-gap)` maximum at large desktop |

> ⚠ **No section may use a gap value below 8px.** The current 7px category tile gap is a grid error, not a design choice.

### Max-Width System

| Column | Width | Sections |
|--------|-------|----------|
| Editorial | 960px | WHY LUVZ, Heritage text blocks, Contact, Footer brand column |
| Showcase | 1360px | Carousels, vault scene, full-bleed imagery, Category grid |

**No intermediate max-widths.** A layout element at 1100px or 800px has drifted between the two systems. If a section cannot be placed in either column, it must be redesigned until it can.

### Asymmetry Philosophy

Asymmetry is **earned, not assumed.** It appears in:
- **WHY LUVZ:** 38/62 editorial split
- **Contact:** 60/40 information split
- **Heritage:** Image at 21:9 against text blocks
- **New Collection:** Asymmetrical editorial grid

Asymmetry must be intentional and stable across viewports. Symmetry is the safe default. Asymmetry must justify itself through emotional function.

### Breathing Room Rules

- Every section uses `var(--section-gap)` top and bottom. Tighter padding requires explicit editorial justification.
- Cards need 16px internal breathing room. Less reads as cheap.
- Headlines need a margin below them of at minimum 50% of the headline's line-height.
- No element should touch the viewport edge on any device. Minimum 16px side margin on mobile, 24px on tablet, 32px+ on desktop.

### Mobile Spacing Philosophy

Mobile does not mean compressed. Mobile means **restructured.**

- Card padding: 16px — same as desktop
- Side margins: never below 16px
- Touch targets: never below 44px height
- Section padding on mobile: `clamp(48px, 10vw, 64px)`

### Forbidden Layout Behaviours

- Horizontal padding of 0 on any section at any viewport
- Gap values that are not multiples of 8
- Hardcoded section padding that bypasses `var(--section-gap)`
- Any intermediate max-width (1100px, 800px, etc.)
- Stacking two identical-layout sections without editorial differentiation
- Mobile content that touches the viewport edge

---

## 4. Atmospheric Direction

### Glow Usage

The site uses **warm amber radial glows** (`rgba(196, 136, 44, 0.06–0.08)`) as atmospheric foundation. The glow intensity ceiling is **0.08**. Every primary editorial section must have a glow.

| Section | Glow | Position |
|---------|------|----------|
| Hero | 0.08 | 30% 50% — off-centre, cinematic |
| WHY LUVZ | 0.07 | 30% 50% — editorial warmth |
| Categories | 0.05 | 50% 50% — neutral, functional |
| Top Sellers | 0.06 | 50% 40% — vault drama, centred |
| **New Collection** | **0.06** | **50% 30% — currently 0 — must be fixed immediately** |
| Heritage | 0.08 | 50% 30% — contemplative, strongest atelier warmth |
| Contact | 0.06 | 50% 30% — welcoming |
| Footer | 0.03 | 50% 100% — quiet exit |

### Gradient Intensity

All gradients must **feel like light behaving, not graphics behaving.** No hard stops in any decorative gradient. All atmospheric gradients resolve to `transparent` at their outer edge. The transition from glow to background must be imperceptible.

### Cinematic Layering

The hero's five-layer atmospheric construction is the site's strongest technical achievement. **The principle it demonstrates:** Luxury depth comes from superposition of subtle layers, not from a single strong effect. When adding atmosphere to any section, ask: *what are the layers?* Not: *what is the effect?*

### Blur Philosophy

`backdrop-filter: blur()` is used for **material transparency** only — the Glass Concierge, overlay panels, glass category labels. Blur is never decorative.

**Blur intensity:** 10–16px. Below 10px is insufficient. Above 16px reads as frosted bathroom glass, not polished editorial glass. The Glass Concierge uses `blur(12px)` — the correct midpoint, and the precise value that must not be changed.

### Shadow Restraint

Three shadow states:
- `--sh` — At-rest cards, buttons, unfocused UI
- `--sh-h` — Hovered cards, elevated states
- `--sh-modal` — Overlays and deep modals

**Never upgrade to a higher shadow state without a user action trigger.** Shadows strong at rest compete with the content they support.

---

## 5. Motion Philosophy

> **RESOLVED — Fix #5:** The Hero ambient glow and Heritage `skWave` were previously able to run simultaneously on page load. The Heritage `skWave` is now gated behind an IntersectionObserver with `threshold: 0.5` (50% in-viewport). The hero entrance and Heritage shimmer will never compete.

### Approved Durations

| Duration | Use |
|----------|-----|
| 0.15–0.20s | Immediate feedback — nav link colour, active states |
| 0.28–0.35s | Standard hover — card elevation, border colour, button fill |
| 0.50–0.80s | Deliberate entrance — section reveals, hero elements |
| 1.20–2.80s | Cinematic pacing — hero float, heritage image hover, ambient glow |
| 3s–7s | Continuous animation — vault rotation, logo float, hero image breathe |

> ⚠ **Nothing interactive may use a duration above 0.4s.** Nothing ambient may use a duration below 1.2s.

### Shimmer Authority — skWave Trigger Law

The `skWave` shimmer animation is the site's single most powerful accent tool. Its power is inseparable from its exclusivity.

1. The `skWave` shimmer is **exclusively reserved for the Heritage section heading.**
2. The `skWave` **must only activate when the Heritage heading is ≥50% in-viewport** (`IntersectionObserver` threshold: `0.5`). It must not run during the hero entrance.
3. No other heading on this site may use `skWave` — not Top Sellers, not New Collection, not WHY LUVZ, not the hero.
4. The shimmer must never appear on body text, captions, card titles, or UI elements.
5. Any future prompt or implementation pass that adds `skWave` to a second element is in direct violation of this constitution and must be reversed before any further work proceeds.

```js
// Correct IntersectionObserver implementation
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('skWave--active');
    }
  },
  { threshold: 0.5 }  // 50% in-viewport required
);
observer.observe(document.querySelector('.heritage-heading'));
```

### Easing Curves

```
Spring entrance (arriving, confident):
  cubic-bezier(0.34, 1.56, 0.64, 1)
  → Hero title entrance, modal pop-in, valued moments
  → The slight overshoot signals something that has weight

Luxury ease (unhurried, refined):
  cubic-bezier(0.25, 0.46, 0.45, 0.94)
  → Carousel transitions, modal slide-up, section reveals
  → Smooth deceleration, no abruptness

Standard ease:
  ease (0.25, 0.1, 0.25, 1.0)
  → Default hover states, nav transitions

Never:
  linear         → For anything visible (only for carousel drag tracking)
  ease-in        → Reads as reluctant
  bounce/elastic → Outside brand register entirely
```

### Hover Intensity Hierarchy

| Object tier | Hover treatment |
|-------------|----------------|
| Primary (product cards) | `translateY(-6px)` + shadow upgrade + `image scale(1.05)` + prism border |
| Secondary (category tiles) | `translateY(-3px)` + gold border flash |
| Tertiary (nav/footer links) | Colour transition only |
| Ghost (ambient elements) | No hover state — they are atmosphere, not interaction |

**The intensity gradient must be preserved.** If product cards lose hover intensity, the site loses its primary desire signal. If category tiles gain product-card-level hover, the hierarchy collapses.

### Animation Restraint

**One thing moves at a time within a section.** The exception is the hero, which earns its multiple simultaneous motions through intentional choreography. If an element is entering on scroll, nothing else in that section should be in motion.

### Parallax Rules

Parallax is a **desktop privilege.** Hero parallax (three-layer mouse-move) approved at desktop. Disable entirely on touch devices. The three-speed system (image ±14px, text ±5px, gem glow ±22px) is correct and must be preserved.

### Mobile Motion Behaviour

Mobile motion must be **10–30% less intense** than desktop equivalents — reduced, not removed.

- No parallax. No cursor tracking.
- Prism border on touch: reduce duration to 900ms (not 1800ms)
- Continuous animations may reduce speed by 20% on mobile

### Forbidden Motion Patterns

- `skWave` on any element other than the Heritage section heading
- Heritage `skWave` running before element is ≥50% in-viewport
- Interactive hover above 0.4s duration
- Ambient motion below 1.2s duration
- Parallax on touch devices
- Bounce, wobble, or elastic easing on any element
- Animations that run continuously off-screen
- Transitions on `all` properties — specify only properties that change
- Counter-intuitive easing (ease-in on arrivals)

---

## 6. Interaction Hierarchy

> **RESOLVED — Fix #3 & Fix #4:** The Glass Concierge now has an explicit Visual Priority Rule for product photography contexts. Ghost buttons no longer serve double duty — the hierarchy is unambiguous.

### Button Hierarchy — Stabilised

> ⚠ **Previously, Ghost buttons were assigned to both Primary Product Inquiries and General Contact, creating visual ambiguity about the most important action. This has been resolved.**

| Button type | Visual style | When used | Never used for |
|-------------|-------------|-----------|----------------|
| **Solid Fill (Primary)** | Gold or Primary Dark fill, light text | Inquire / Purchase — the single most important conversion action. **Max 2 per page.** | Navigation, contact forms, social links |
| **Ghost** | Transparent + gold border | Secondary actions only: Contact, Info, Instagram, general enquiry (non-purchase) | Primary conversion path |
| **WhatsApp** | `--wa-green` fill (#4A7C5E) | WhatsApp entry point exclusively | Any other function |
| **Text link** | Colour-only, no border | Navigation, footer, tertiary flows | Any CTA that requires a decision |

> ✓ **The Ghost button is now exclusively a secondary action signal. The Solid Fill button is the unambiguous primary CTA. Any page implementation that uses Ghost style for an Inquire or Purchase action is a hierarchy violation.**

### CTA Priority Behaviour

```
Primary CTA:      Solid Fill (Inquire/Purchase) — Gold or Primary Dark fill, max 2 per page
Primary channel:  WhatsApp / Glass Concierge — --wa-green or Gold fill, maximum visibility
Secondary CTA:    Ghost buttons (Contact, Info) — transparent + gold border
Tertiary:         Navigation, category links — colour-only indication
Ghost:            Footer links — quiet, present, undemanding
```

A CTA that visually outranks the primary touchpoint has broken the hierarchy.

### The Glass Concierge

The AI stylist chat trigger is the brand's most differentiating feature. It must present as a Glass Concierge element on **all viewports, including mobile.**

**Implementation law:**

```css
.chat-trigger {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(24, 17, 10, 0.55);   /* near-black espresso at 55% */
  border: 1px solid rgba(196, 136, 44, 0.25); /* gold at 25% — barely there */
  transition: opacity 0.5s ease-out;
}

.gallery-view-active .chat-trigger {
  opacity: 0;
  pointer-events: none;
}
```

The iconography must be minimalist and gold. No filled speech bubbles. No colour icons. A single line-weight gold glyph. On mobile: minimum 48px touch target, bottom of viewport, offset from navigation. It does not pulse. It does not bounce. It simply waits.

#### Visual Priority Rule — NEW (Fix #3)

High-end product photography must never be obscured by UI elements. The Glass Concierge must minimise or convert to a subtle text link whenever the user triggers a Full-Screen Zoom or Gallery View on a product image.

- **Default state:** Glass Concierge floating element, visible at all viewports.
- **Full-Screen Zoom / Gallery View triggered:** Concierge animates to `opacity: 0` and `pointer-events: none`, or collapses to a minimal text link (e.g. *"Stylist"* in Jost 400, gold colour, bottom-right corner).
- **Gallery View dismissed:** Concierge returns to default state with a 0.5s `ease-out` transition.
- The transition must feel like a concierge stepping aside for a private viewing moment — intentional and graceful, not a glitch.

### WhatsApp Palette Law

The correct WhatsApp colour for this palette is `--wa-green: #4A7C5E` — a desaturated, jewel-toned green. It must be used exclusively for WhatsApp UI elements. It must never be brightened toward international WhatsApp green and must never be used as a general accent colour.

### Hover Hierarchy

- Product card: full elevation, shadow, scale, prism, border colour
- Category tile: partial elevation, border flash — no scale, no prism
- Navigation: colour change only — no elevation, no border
- Footer links: colour change — faster than nav
- Buttons: background fill, colour inversion — no elevation unless primary CTA

**The hierarchy is not negotiable.** An element that receives more hover feedback than a product card has claimed to be more important than the inventory. That is always wrong.

---

## 7. Imagery Direction

### Photography Philosophy

LUVZ jewelry is photographed for **longing, not accuracy.** The image is not a product sheet. It is a desire object. Show the piece as if the visitor has already chosen it. Warm lighting, dark backgrounds, close focal lengths, shallow depth of field.

### Three Image Registers

| Register | Context | Character |
|----------|---------|-----------|
| Lifestyle editorial | Hero | Cinematic, full-bleed, person or context present, atmospheric. The brand at its most aspirational. |
| Atelier documentary | Heritage | Hands, process, material in transformation. Photographically distinct from the hero — visual evidence of craft. |
| Object portrait | Product cards, carousel | The piece, dark background, full object visible. No lifestyle elements. |

> ⚠ **These three registers must not overlap.** Using the hero image in the Heritage section collapses the narrative. This is a current error that must be corrected before any other heritage work proceeds.

### Forbidden Image Styles

- White or grey studio backgrounds in product cards
- Cool-toned or blue-shifted photography
- Flat-lit images with no shadow depth
- Images with visible props, clutter, or studio equipment
- The same image used in two distinct sections
- Images with text or watermarks overlaid
- Collage or composite images mixing multiple products in one frame
- Oversaturated gold or silver

---

## 8. Section Emotional Roles

### Hero

| Property | Specification |
|----------|--------------|
| **Emotional purpose** | Arrest and seduce. First impression — must earn every second the visitor gives it. |
| **Pacing role** | Opening statement. Unhurried. Designed to be absorbed, not scanned. |
| **Atmosphere intensity** | Maximum. Five-layer atmospheric construction. Full parallax. Hero particles. Float animation. |
| **Interaction density** | Minimum. Two buttons. No other interactive elements in the hero field itself. |
| **Typography mood** | Cinematic. Cinzel 400. Brand statement in sentence case. The brand name arrives; it does not announce. |
| **Grid / spacing** | Showcase column (1360px). `var(--section-gap)` top and bottom. |

> **GUARD:** The hero must never be simplified. Removing any atmospheric layer weakens the first impression. The hero achieves coherence through superposition — remove one layer and the depth collapses.

---

### WHY LUVZ

| Property | Specification |
|----------|--------------|
| **Emotional purpose** | Build trust through restraint. The brand explains itself without defending itself. |
| **Pacing role** | First breath after the hero. Lower density. Editorial. Visitor shifts from sensation to understanding. |
| **Atmosphere intensity** | High. Warm glow at 0.07. The gold separator line. The editorial split. |
| **Interaction density** | Minimal. This section is read, not navigated. |
| **Typography mood** | The why-statement in **Cormorant Garamond 400 italic or Crimson Pro 400, sentence case — never Cinzel.** Body prose in Crimson Pro or Cormorant Garamond, sentence case. |
| **Grid / spacing** | Editorial column (960px). 38/62 asymmetric split. `var(--section-gap)` top and bottom. |

> **GUARD:** Do not add animation. Do not use Cinzel for the why-statement. The power of this section is in stillness and in the warmth of the reading face.

---

### Categories

| Property | Specification |
|----------|--------------|
| **Emotional purpose** | Navigate without condescending. Wayfinding that must not abandon the brand's atmosphere. |
| **Pacing role** | Gear-shift. Visitor transitions from reading to exploring. Density increases. |
| **Atmosphere intensity** | Moderate. Glow at 0.05. |
| **Interaction density** | High. Every tile is a destination. Hover states must be clear. |
| **Typography mood** | Functional. Eyebrow at 8px uppercase. Category name at 14px Cinzel Title Case. |
| **Grid / spacing** | Showcase column (1360px). Tile gap: 16px (not 7px). Horizontal padding: min 24px. `var(--section-gap)`. |

> **GUARD:** Tile gaps at 8px minimum (16px preferred). Hover delta must be `translateY(-3px)` minimum — current `-1.5px` is imperceptible.

---

### Top Sellers

| Property | Specification |
|----------|--------------|
| **Emotional purpose** | Demonstrate desire through social proof. Spectacle signals that these pieces have earned a display case. |
| **Pacing role** | Re-activation after categories. The 3D Vault Carousel's slow rotation is a performance. |
| **Atmosphere intensity** | Moderate to high. Glow at 0.06. |
| **Interaction density** | Moderate. Vault tap → rotation → modal. Intentional friction — it is a reveal, not a browse. |
| **Typography mood** | Section heading Cinzel 700 Title Case. Card titles Cinzel 600 Title Case. |
| **Grid / spacing** | Showcase column (1360px). `var(--section-gap)`. |

> **GUARD:** Vault rotation speed (18°/sec) must not be increased. The 2.2s resume delay must be preserved. Vault and Asymmetrical Editorial Grid must never be swapped or made to resemble each other.

---

### New Collection

| Property | Specification |
|----------|--------------|
| **Emotional purpose** | Signal newness as editorial event, not restocking announcement. |
| **Pacing role** | Maintains momentum after Top Sellers while shifting key. Where Top Sellers is spectacle, New Collection is discovery. |
| **Atmosphere intensity** | Moderate. Glow at 0.06. **Currently 0 — must be corrected immediately.** |
| **Interaction density** | Moderate. Cards are browsed, not performed. |
| **Typography mood** | Cinzel 700 Title Case. Eyebrow must use `var(--txt2)` or `var(--gold)` — not `#3A8C5C`. |
| **Grid / spacing** | Editorial column (960px) for heading; Showcase column (1360px) for editorial grid. Gap: 16px. `var(--section-gap)`. |

**Layout law — Asymmetrical Editorial Grid:** One large feature card (spanning two columns or at 2:3 portrait ratio) offset against two or three smaller portrait cards. The composition should feel like a magazine spread — designed, not generated. The feature image does not need to be centred. The arrival should feel like the editor made a choice.

> **GUARD:** Must not be visually identical to Top Sellers. The vault is theatre; the editorial grid is a quiet room with new work on the walls. The layout must produce these two different feelings without the visitor needing to read a heading.

---

### Heritage

| Property | Specification |
|----------|--------------|
| **Emotional purpose** | Substantiate the craft claim. Must feel like evidence, not copy. |
| **Pacing role** | Deep breath. Panoramic 21:9 image and slow staggered reveals create the site's longest atmospheric pause. |
| **Atmosphere intensity** | Maximum (after hero). Glow at 0.08. Staggered entrance at 0.64s delay cadence. |
| **Interaction density** | Minimal. This section is witnessed, not navigated. |
| **Typography mood** | Cinzel 700 Title Case with `skWave` (**≥50% in-viewport trigger only**). Pillar numerals Cinzel 700. Body copy Cormorant Garamond 300 sentence case. |
| **Grid / spacing** | Showcase column (1360px) for panoramic image; Editorial column (960px) for text. `var(--section-gap)`. |

> **GUARD:** Heritage image must be editorially distinct from the hero image — both using the same source is a current error. The `skWave` must not activate until the element is ≥50% in-viewport. The shimmer is the brand's deepest designation — its timing must protect its scarcity.

---

### Get In Touch

| Property | Specification |
|----------|--------------|
| **Emotional purpose** | Welcome the visitor as a client, not a support case. |
| **Pacing role** | Resolution. After the narrative arc, this is where the visitor decides. |
| **Atmosphere intensity** | Moderate. Glow at 0.06. Contact section title at full opacity (not 0.5). |
| **Interaction density** | Low-moderate. Two contact cards. **Ghost button for secondary contact; WhatsApp fill for primary path.** |
| **Typography mood** | Cinzel 700 Title Case at full opacity. Ghost for secondary; WhatsApp fill for primary. |
| **Grid / spacing** | Editorial column (960px). 60/40 split. `var(--section-gap)`. |

> **GUARD:** WhatsApp is the primary contact path — its card must be visually dominant. Contact button transition must never exceed 0.35s. A slow contact CTA is a closed door.

---

### Footer

| Property | Specification |
|----------|--------------|
| **Emotional purpose** | Quiet confidence. The last impression. Not a legal necessity — a farewell. |
| **Pacing role** | Exit. Lowest density on the site. The visitor is leaving or has made a decision. |
| **Atmosphere intensity** | Minimal. Glow at 0.03 — barely present. |
| **Interaction density** | Low. Links, contact detail, copyright. No CTAs. |
| **Typography mood** | Cinzel 400 for brand name. All body copy at 55% opacity minimum. Footer links 14px minimum. Prose in sentence case; column headers in Title Case. |
| **Grid / spacing** | Editorial column (960px). `clamp(48px, 6vw, 64px)` top and bottom — the footer's quieter cadence. |

> **GUARD:** The footer is not an afterthought. 55% opacity, 14px, and legible grid alignment are the minimum standards for brand dignity at the exit.

---

## 9. Mobile Luxury Principles

### Mobile Emotional Pacing

Mobile luxury is earned through **restraint of density, not feature removal.** The emotional target is identical to desktop: warm, unhurried, certain. The delivery mechanism is different — touch instead of cursor, vertical instead of horizontal — but the emotional register must be identical.

### Mobile Density Limits

- No more than two product cards visible at once in a carousel view
- Category tiles: maximum 2 columns at any viewport below 600px
- No floating elements that overlap scrollable content
- No sticky elements that consume more than 56px of vertical space

When a section cannot maintain its desktop atmosphere within mobile density constraints, **simplify the structure, not the atmosphere.** Remove columns before removing warmth. Remove elements before removing glow.

### Touch Feedback Philosophy

- Active states (pressed) must be visually distinct — opacity to 0.7 or scale to 0.97 — and resolve on release
- No hover-dependent information (tooltips, revealed labels) on mobile
- Touch targets at 44px minimum everywhere, 48px for primary CTAs

### Mobile Typography Behaviour

- Hero title: `clamp(2.4rem, 16vw, 4.8rem)`
- Section headings: not smaller than 1.4rem on mobile
- Body text: not smaller than 15px (16px preferred — iOS auto-zoom minimum)
- Chat input: locked at 16px — iOS auto-zoom at 15px is a luxury-breaking interruption
- Caption and support text: not smaller than 13px

### The Glass Concierge on Mobile

The Glass Concierge must be present on **all viewports including mobile.** On mobile: `backdrop-filter: blur(12px)`, near-black 55% background, gold 25% border, minimalist gold icon, 48px touch target, bottom of viewport, offset from navigation. It does not pulse. It does not animate on arrival. It simply waits.

When a user enters Full-Screen Zoom or Gallery View on mobile, the Concierge minimises to a subtle text link (*"Stylist"*) in the corner. It restores when the gallery is dismissed.

---

## 10. Anti-Patterns

The following patterns break luxury feel immediately and must never recur.

### Over-Animation

- `skWave` shimmer on any element other than the Heritage section heading
- Heritage `skWave` activating before element is ≥50% in-viewport
- Hover transitions above 0.4s on interactive elements
- Bounce or elastic easing on any element
- Motion that continues after the triggering interaction has resolved
- Elements that animate on scroll without having anything worth revealing
- Prism animations running on elements outside the viewport

### Spacing Mistakes

- Any gap below 8px
- Horizontal padding of 0 on any section at any viewport
- Hardcoded section padding that bypasses `var(--section-gap)`
- Touch targets below 44px height
- Any spacing value that is not a multiple of 8

### Typography Mistakes

- Section headings at Cinzel weight 900
- All-caps section headings
- Sentence case on structural section headings
- Title Case on editorial prose and body copy
- **Cinzel used for the WHY LUVZ why-statement or any sentence-case prose**
- Text opacity below 50% for any readable content
- `skWave` shimmer animation on more than one element
- Cormorant Garamond below 14px
- Mixed fonts within a single phrase

### Button Hierarchy Mistakes

- Ghost button used for the primary Inquire or Purchase action
- Solid Fill button used for a secondary or informational action
- More than two Solid Fill CTA buttons on a single page
- WhatsApp button styled with any colour other than `--wa-green: #4A7C5E`

### Concierge Mistakes

- Glass Concierge hidden on mobile
- Glass Concierge obscuring product photography during Full-Screen Zoom or Gallery View
- Glass Concierge styled as a tech widget rather than editorial glass
- Concierge pulsing, bouncing, or demanding attention

### Atmosphere Mistakes

- Any section with zero glow — cold contrast against atmospheric neighbours
- Glow above 0.08 intensity — becomes decorative rather than atmospheric
- `backdrop-filter: blur()` used purely for decoration
- Adding atmospheric effects to compensate for weak content
- Hard gradient stops in any decorative gradient

### Colour Misuse

- Any non-palette colour in brand contexts
- Hardcoded colour values anywhere in CSS or JS
- `--wa-green` used for any purpose other than WhatsApp UI
- Ghost button border colour deviating from gold
- Solid Fill button colour deviating from Primary Dark or Gold
- Gold used as a dominant fill (it is always an accent — never a background)

### Interaction Misuse

- Contact ghost button transition above 0.35s
- Category tile hover delta below 3px
- Glass Concierge hidden on mobile
- Elements that do not respond to hover or touch
- Cursor-tracking effects on touch devices
- Interactive targets with no active state feedback

### Image Misuse

- The same photograph used in two distinct sections
- White, grey, or cool-toned product photography backgrounds
- Landscape product images forced into 1:1 crop without sufficient content
- Product photography with visible props or studio setup

### Section Differentiation Failure

- Top Sellers and New Collection using the same carousel layout
- The Asymmetrical Editorial Grid using rotation or 3D perspective (those properties belong to the Vault)
- The 3D Vault Carousel using flat grid composition (that property belongs to editorial)
- Any layout choice that makes the visitor feel they have not moved to a new editorial chapter

---

## 11. Implementation Guardrails

### How Future AI Prompts Should Work

Every AI implementation prompt for this site must:

1. **Reference this document first** — before writing any code, confirm which section applies
2. **State the emotional purpose of the change** — not just what it does, but what feeling it must produce or preserve
3. **List what must not change** — alongside what changes, name the elements that must be preserved
4. **Scope to one section or one system** — multi-section changes in a single pass create cascading unintended effects

**Prompt structure example:**
```
Context: Implementing improvement #6 from LUXURY_DIRECTION.md (contact ghost button timing)
Section affected: Get In Touch
Emotional purpose: Make the primary CTA feel responsive and welcoming, not sluggish
Change: .contact-ghost-btn transition from `all 0.6s ease` to `all 0.35s ease`
Must not change: Button styling, border colour, background fill behaviour, typography
```

### Implementation Passes — Correct Order

Never implement changes from multiple sections in a single pass.

**Pass 1 — Colour & atmosphere corrections:**
- Fix green eyebrow in New Collection → `var(--gold)` or `var(--txt2)`
- Add glow to New Collection (`rgba(196, 136, 44, 0.06)`)
- Fix contact section title opacity from 0.5 → 1.0
- Fix footer link opacity from 0.45 → 0.55
- Remove `skWave` from all section titles except Heritage
- Update `--wa-green` from international green to `#4A7C5E`

**Pass 2 — Typography weight, case, and spacing:**
- Section title weight from 900 → 700
- Section title tracking from 0.2em → 0.12–0.15em
- Migrate WHY LUVZ why-statement from Cinzel to Cormorant 400 italic or Crimson Pro 400
- Confirm all section headings in Title Case; all body prose in sentence case
- Category tile gap from 7px → 16px (8px grid)
- Horizontal padding 0 → 24px on categories section
- Implement `var(--section-gap): clamp(64px, 8vw, 100px)` across all sections

**Pass 3 — Motion & interaction:**
- Contact ghost button transition from 0.6s → 0.35s
- Category tile hover from `translateY(-1.5px)` → `translateY(-3px)` + gold border flash
- Prism touch duration from 1800ms → 900ms on mobile
- Gate Heritage `skWave` behind IntersectionObserver `threshold: 0.5`
- Implement Glass Concierge on all viewports including mobile
- Implement Concierge Visual Priority Rule (minimise on Full-Screen Zoom / Gallery View)

**Pass 4 — Button hierarchy:**
- Introduce Solid Fill button variant (Primary Dark or Gold) for Inquire/Purchase path
- Audit all Ghost buttons — reassign any that occupy a primary conversion role to Solid Fill
- Confirm max 2 Solid Fill buttons per page
- Confirm Ghost style reserved for Contact, Info, and secondary actions only

**Pass 5 — Heritage editorial:**
- Replace Heritage section image with a distinct photograph (artisan hands, craft process)

**Pass 6 — Section differentiation:**
- New Collection: transition from carousel to Asymmetrical Editorial Grid
- Confirm Top Sellers 3D Vault Carousel preserved without modification
- Categories: review bento grid tile weights and hover consistency

Each pass must be completed and visually verified before the next begins. Passes are not parallelizable.

### What Must Never Be Changed Casually

| Element | Why It Must Not Change Casually |
|---------|--------------------------------|
| Hero five-layer atmospheric architecture | Depth comes from superposition; removing one layer collapses perceived depth |
| Vault rotation speed (18°/sec) | The unhurried pace is the vault's luxury signal; faster reads as impatient |
| Hero spring easing `cubic-bezier(0.34, 1.56, 0.64, 1)` | The slight overshoot gives the brand name weight; changing it makes it arrive rather than settle |
| `skWave` shimmer — Heritage heading only | The shimmer's power depends on scarcity; a second instance destroys Heritage's North Star designation |
| Heritage `skWave` IntersectionObserver `threshold: 0.5` | Ensures shimmer never competes with hero entrance; violation collapses the animation hierarchy |
| WHY LUVZ why-statement in Cormorant/Crimson sentence case | The most refined typographic moment on the site — Cinzel here destroys the literary register |
| Vault 2.2s interaction resume delay | The pause respects the user's attention; removing it makes the vault feel automated, not alive |
| Hero image `object-position: center top` | This crop prioritises faces and skin — the most important contextual signal in jewelry photography |
| Parallax three-layer speed differentiation | Identical speeds create no depth; the differentiation creates the spatial register |
| WhatsApp number (`918919359961`) | Hardcoded in three locations; must change together or not at all |
| `--wa-green: #4A7C5E` | The desaturated jewel-toned value that keeps WhatsApp identifiable without clashing with the palette |
| Glass Concierge `backdrop-filter: blur(12px)` | The precise blur value that signals editorial glass; deviation degrades the material signal |
| New Collection Asymmetrical Editorial Grid | The layout distinction from Top Sellers is the section's entire editorial identity |
| 8px baseline grid | Every spacing value traces to this foundation; arbitrary values destroy the sense of considered intention |
| `var(--section-gap)` clamp token | Single source of truth for section rhythm; hardcoded overrides break the unified spacing system |

---

## Final Note

This document is the institutional memory of LUVZ Collection's visual ambition. It was written at a moment when the site's strongest work — the hero, the WHY LUVZ editorial split, the heritage cinematic pacing, the vault interaction restraint — demonstrates that the brand knows what luxury feels like.

The five contradictions resolved in this build were not failures of vision. They were failures of precision — places where the vision was not yet fully expressed in the rules. The rules are now precise.

The path forward is not addition. The path is extension — extending the care and emotional intelligence that already exists in the site's best moments to every moment. The atmosphere is already warm. The palette is already correct. The animation language is already unhurried.

The laws in this document exist to ensure that future changes extend that excellence rather than dilute it.

---

> *Does this feel like a jeweler who has been making pieces for forty years, or does it feel like a website that is trying to look like one?*
>
> **The answer must always be the former.**

---

*Permanent art-direction authority for LUVZ Collection*
*Written: 2026-05-04 · Refined & Stabilised: 2026-05-04*
*Review: before any significant redesign pass*
*Authority: supersedes any implementation decision that conflicts with its laws*
