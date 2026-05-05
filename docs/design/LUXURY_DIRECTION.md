# LUVZ Collection — Visual Art-Direction Constitution

*Brand DNA · Supersedes all implementation decisions*

---

## Emotional Tone

LUVZ is **warm, unhurried, and quietly certain.**

The emotional register is that of a family jeweler in a quiet room — someone who has been making pieces for forty years and doesn't need to convince you of anything. The craft is evident. The silence is intentional.

A visitor who moves through this site should feel, in sequence: **arrested** by the hero, **curious** as they scroll, **persuaded without being sold to** by the craft narrative, **welcomed** at the point of contact, and **reluctant to leave** — because the atmosphere has value in itself.

Every second spent here should feel chosen, not demanded.

> *Does this feel like a jeweler who has been making pieces for forty years, or a website trying to look like one? The answer must always be the former.*

---

## Typography Philosophy

Two typefaces. Two registers. They must never colonise each other.

**Cinzel** is the architectural voice — display only. Brand name, section headings in Title Case, card titles, eyebrow labels. Never body copy. Never sentence-case prose. Never the WHY LUVZ editorial statement.

**Cormorant Garamond / Crimson Pro** is the literary voice — all editorial prose, captions, brand statements, the WHY LUVZ why-statement in sentence case and italic. This is the warmest typographic register on the site. Treat it accordingly.

**Jost** handles UI: buttons, navigation, form labels. Functional. Never editorial.

**Case is structural, not stylistic.**
- Title Case → structural headings. The architectural register.
- Sentence case → editorial prose. The human register.

The test: if the text is labelling a section, it speaks in Title Case with Cinzel. If the text is speaking *to* the visitor as a person, it speaks in sentence case with Cormorant or Crimson Pro. These registers must not overlap.

**Weight hierarchy:** hero title at Cinzel 400 — singular, cinematic. Section headings at Cinzel 700. The hero must never be typographically outranked by its supporting sections.

**Tracking:** section headings at 0.12–0.15em. Eyebrows at 0.45–0.55em. Body text: never tracked.

**Opacity floor:** no readable text below 50% opacity. Section titles at 100%.

---

## Motion Philosophy

The site moves at the speed of a considered purchase, not a browsing session.

**Duration tiers:**
- 0.15–0.35s — hover feedback and active states
- 0.50–0.80s — section entrances and deliberate reveals
- 1.2–2.8s — cinematic ambient motion
- 3s–7s — continuous vault rotation, hero float, ambient breathe

Nothing interactive above 0.4s. Nothing ambient below 1.2s.

**Easing:** Spring entrance `cubic-bezier(0.34, 1.56, 0.64, 1)` for arriving moments that have weight. Luxury ease `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for transitions. Never `ease-in`. Never bounce or elastic.

**The skWave shimmer belongs exclusively to the Heritage heading.** It activates only when that heading is ≥50% in-viewport. The moment a second element shimmers, the Heritage heading loses its designation — and the site loses its deepest accent. No future implementation may add `skWave` to any other element under any circumstance.

**One thing moves at a time within a section.** The hero earns its simultaneous motions through intentional choreography. Everywhere else: sequence, don't stack.

**Parallax is a desktop privilege.** Disable entirely on touch devices.

---

## Layout Philosophy

Space is not emptiness. It is the site's most eloquent material.

**Two column widths. No intermediates.**
- Editorial column: 960px — WHY LUVZ, Heritage text, Contact, Footer
- Showcase column: 1360px — carousels, vault, full-bleed imagery, categories

An element at 1100px or 800px has drifted between systems. Redesign it until it belongs to one.

**One spacing grid: 8px.** Every gap, margin, and padding on this site resolves to a multiple of 8. Values that are not multiples of 8 are errors, not choices. The unified section gap — `clamp(64px, 8vw, 100px)` — governs all section padding from a single token.

**Asymmetry is earned, not assumed.** It appears in WHY LUVZ (38/62 split), Contact (60/40), Heritage (21:9 panoramic against editorial text), and New Collection's editorial grid. Symmetry is the safe default. Asymmetry must justify itself through emotional function.

**Mobile means restructured, not compressed.** Remove columns before removing warmth. Remove elements before removing glow. The emotional target is identical on every viewport.

---

## Lighting Philosophy

Light is atmosphere, not decoration.

The palette — near-black espresso, warm amber, muted cream — should feel like the material it houses: tarnished silver, warm gold, aged wood. The site should suggest a jeweler's cabinet, not a technology product.

Every primary editorial section carries a warm amber radial glow at `rgba(196, 136, 44, 0.06–0.08)`. The glow ceiling is 0.08 — above that, it becomes decorative. A section with zero glow reads as cold against its atmospheric neighbours.

All gradients feel like light behaving, not graphics behaving. No hard stops. Every atmospheric gradient resolves to `transparent` at its outer edge. The transition from glow to background must be imperceptible.

`backdrop-filter: blur()` is used for material transparency only — the Glass Concierge, overlay panels, glass labels. Blur is never decorative. The correct blur range is 10–16px. Below 10px is insufficient. Above 16px reads as frosted bathroom glass.

Luxury depth comes from superposition of subtle layers, not from a single strong effect. When adding atmosphere to any section, ask: *what are the layers?* Not: *what is the effect?*

---

## Restraint Rules

**Never add an effect to fix a weakness.** Shimmer does not compensate for weak copy. Glow does not compensate for a poor image. Animation does not compensate for an unclear hierarchy. When something feels wrong, the answer is almost always removal, not addition.

**One focal point per viewport.** If everything is emphasised, nothing is. One loudest moment — and then quiet.

**Temporal generosity.** Give elements room to arrive. A section heading that eases in over 0.8 seconds signals that the brand believes the visitor has time. A heading that snaps in signals the opposite.

**Three image registers — never interchangeable:**
- *Lifestyle editorial* — hero only. Cinematic, full-bleed, aspirational.
- *Atelier documentary* — Heritage only. Hands, process, craft in transformation.
- *Object portrait* — product cards. The piece against dark background. No lifestyle.

The same photograph cannot appear in two sections. The registers cannot overlap. Using the hero image in Heritage collapses the narrative.

**The Glass Concierge waits. It does not perform.** Present on all viewports. Minimalist gold icon. No pulse. No bounce. When a visitor enters Full-Screen Zoom or Gallery View, it steps aside — fading to a subtle text link — and returns when the gallery is dismissed. A concierge who interrupts a private viewing moment is no longer a concierge.

---

## Anti-Patterns

These break luxury feel immediately and must never recur.

**Typography**
- Cinzel used for body copy, editorial prose, or any sentence-case text
- Section headings at Cinzel weight 900 or in all-caps
- Title Case on editorial prose; sentence case on structural headings
- Any readable text below 50% opacity
- Mixed fonts within a single phrase
- Cormorant Garamond below 14px

**Motion**
- `skWave` shimmer on any element other than the Heritage section heading
- Heritage `skWave` triggering before ≥50% in-viewport
- Interactive transitions above 0.4s duration
- Bounce, wobble, or elastic easing on any element
- Parallax or cursor tracking on touch devices
- Animations running continuously off-screen

**Layout & Spacing**
- Any gap value that is not a multiple of 8
- Horizontal padding of 0 on any section at any viewport
- Hardcoded section padding bypassing `var(--section-gap)`
- Any intermediate max-width (800px, 1100px, etc.)
- Two adjacent sections using identical layouts without editorial differentiation

**Interaction**
- Ghost button used for the primary Inquire or Purchase action
- More than two Solid Fill CTA buttons on a single page
- Contact CTA transitions above 0.35s — a slow contact button is a closed door
- Glass Concierge hidden on mobile
- Glass Concierge obscuring product photography during gallery view
- `--wa-green` used for any purpose other than WhatsApp UI

**Atmosphere**
- Any section with zero glow
- Glow above 0.08 — decorative, not atmospheric
- Hard gradient stops in any decorative gradient
- Atmospheric effects added to compensate for weak content
- White, grey, or cool-toned product photography backgrounds

---

## Reference Brands

The emotional register LUVZ inhabits — and must consistently meet.

**Cartier** — Restraint as authority. Space as confidence. No visual impatience.

**Bottega Veneta** — Material honesty. The craft is visible but never laboured. The brand does not explain itself.

**Aesop** — Editorial voice as brand identity. Typography as atmosphere. Every word earns its place.

**The Row** — Silence as luxury signal. What is not there is as intentional as what is.

**Vogue India** — The editorial register for imagery and layout. Asymmetry with purpose. A sense that an editor made every choice.

---

*Art-direction authority for LUVZ Collection · Review before any significant redesign pass*
