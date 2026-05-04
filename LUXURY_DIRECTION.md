# LUXURY_DIRECTION.md — LUVZ Collection Visual Art-Direction Constitution

**Permanent brand authority document. Supersedes any implementation decision that conflicts with it.**
**Last updated: 2026-05-04**

---

## Preface

This document is the visual conscience of LUVZ Collection. It is not a style guide. It is not a component library. It is a set of permanent laws — the kind that don't change when trends shift, when a new engineer joins, or when a campaign brief arrives in a hurry.

LUVZ Collection makes handcrafted 92.5 sterling silver and 22K gold jewelry in India. The brand serves people who buy jewelry not as a transaction but as a keepsake decision. Every visual, atmospheric, and typographic choice on this website must honor that decision — the seriousness of it, the emotional weight of it, the longevity of it.

Luxury, for the purposes of this document, is not price. It is pacing. It is restraint. It is the willingness to let silence do work.

---

## 1. Brand Emotional Positioning

### Emotional Temperature

LUVZ is **warm, unhurried, and quietly certain**. Not loud. Not maximalist. Not urgent.

The emotional register is that of a family jeweler in a quiet room — someone who has been making pieces for forty years and doesn't need to convince you of anything. The craft is evident. The silence is intentional.

Every second a visitor spends on this site should feel like something they chose to spend, not something the site demanded.

### Pacing Philosophy

The site moves at **the speed of a considered purchase, not a browsing session**. Animations resolve before the next thing asks for attention. Sections breathe. Hover states are rewards, not reflexes. Loading happens without apology.

The site must never feel impatient. Impatience is for discounters.

### Luxury Philosophy

Luxury here is expressed through three principles:

1. **Restraint of emphasis.** If everything is emphasized, nothing is. The site should have one shimmer, one focal point, one loudest moment per viewport — and then quiet.

2. **Temporal generosity.** Give elements room to arrive. A section heading that eases in over 0.8 seconds signals that the brand believes the visitor has time. A heading that snaps in signals the opposite.

3. **Material honesty.** The palette — near-black espresso, warm amber, muted cream — should feel like the material it houses: tarnished silver, warm gold, aged wood. The site should smell like a jeweler's cabinet, not a technology product.

### Restraint Philosophy

**Never add an effect to fix a weakness.** Shimmer does not compensate for weak copy. Glow does not compensate for a poor image. Animation does not compensate for an unclear hierarchy.

When something feels wrong, the answer is almost always removal, not addition. A missing element rarely breaks luxury feel. An extra one almost always does.

Restraint is the active choice to trust what is already there.

### Editorial Philosophy

LUVZ operates as a **jewelry editorial** that happens to have a store. The brand narrative (heritage, craft, material provenance, 22K gold polish, 92.5 sterling) earns the right to a magazine's voice. That voice is:

- Present tense, declarative: "Crafted to feel heirloom-worthy." Not "Our pieces are designed to..."
- Short. One sentence where ten could live.
- Mixed case, not all-caps: Cinzel in title case reads more confident than Cinzel in uppercase. Uppercase is for labels. Headlines are not labels.

### What LUVZ Should Emotionally Feel Like

A visitor who lands on this site should feel, in sequence:

1. **Arrested** — by the hero. Something is happening here that asks for attention.
2. **Curious** — as they scroll. The brand has a story, and it is being told with visual care.
3. **Persuaded without being sold to** — by the craft narrative. The Heritage section should feel like truth, not marketing.
4. **Welcomed, not processed** — at the contact and WhatsApp touchpoints.
5. **Reluctant to leave** — because the atmosphere has value in itself.

The current site achieves #1 and partial #2. The goal of this constitution is to extend that quality all the way through #5.

---

## 2. Typography Laws

### Approved Font Roles

| Font | Role | When Used |
|------|------|-----------|
| Cinzel | Display, identity | Brand name, section headings, card titles, pillar numerals |
| Cormorant Garamond | Editorial body | All descriptive prose, captions, modal copy, prices |
| Crimson Pro | Elevated prose | Long-form brand narrative passages, poetic brand statements |
| Jost (system fallback) | UI | Button labels, navigation links, form labels, badge text |

**Crimson Pro is not decorative.** It carries the most refined editorial register on the site and must be used when the copy is poetic, brand-definitional, or long-form. The current near-absence of Crimson Pro is a waste of its emotional range.

### Weight Hierarchy

There is one correct weight cadence for this site. Deviation from it is a hierarchy error, not a style choice.

```
Brand mark / Hero title  →  Cinzel 400       (cinematic, singular — width reads as confidence)
Section headings         →  Cinzel 700       (structural, supporting — not competing with hero)
Card titles              →  Cinzel 600       (informational, compact)
Eyebrows / labels        →  Cinzel 600       (small, precise)
Body prose               →  Cormorant 400    (reading weight, generous)
Emphasized body          →  Cormorant 600    (selective, not pervasive)
Captions / support text  →  Cormorant 300    (light, supporting)
UI elements              →  Jost 600         (functional, clear)
```

**The current inversion — section headings at weight 900, hero at weight 400 — must never recur.** The most prominent element on the site must not be typographically outranked by its supporting sections.

### Uppercase Rules

Uppercase is a **signal of categorical identity**, not emphasis. It flattens emotional tone when overused.

**Uppercase is permitted for:**
- Eyebrows (section category labels, small, widely spaced)
- Badge text (NEW, SOLD, GOLD)
- UI labels (navigation items, button text)
- Footer column headers
- Pillar numerals' unit labels (92.5 / 22K)

**Uppercase is forbidden for:**
- Section headings (`.sec-title`) — use Cinzel title case instead
- Hero title — already correct
- Card descriptions
- Any sentence longer than four words

**The test:** If removing the uppercase makes the text feel less important, the text was relying on the format rather than the content. The content must earn its own weight.

### Letter-Spacing Philosophy

Letter-spacing at Cinzel is used for **categorical distance**, not for emphasis. Wider tracking creates more air; it does not create more authority.

```
Section headings (title case):    0.12–0.15em   (more refined than current 0.2em)
Eyebrows:                         0.45–0.55em   (categorical — needs air)
Card titles:                      0.08em        (current — correct)
UI labels / buttons:              0.05em        (current — correct)
Body text:                        0             (never track body text)
```

**Never apply tracking above 0.2em to any element larger than 14px.** At heading scale, 0.2em+ reads as a banner, not a headline.

### Opacity Tiers

Opacity on text signals **tonal distance** from the primary reading voice. There are three intentional tiers. Nothing below the minimum.

| Tier | Opacity | Use |
|------|---------|-----|
| Primary | 100% | Headlines, CTAs, active UI |
| Secondary | 75% | Body prose, card descriptions, standard copy |
| Tertiary | 50% | Captions, supporting labels, quiet navigation |
| Minimum | 50% | The floor. Nothing below this for any text that must be read |
| Ghost | 28–35% | Copyright / legal only — intentionally near-invisible |

**The current contact section title at 0.5 opacity reads as apology, not restraint.** A section title must be at 100% or it should not exist.

**Footer links at 45% opacity are below the readable floor.** Footer copy must be raised to 55% minimum — not because it is important, but because invisible text that exists only to frustrate users is worse than no text.

### Headline Behavior

Headlines arrive **once and settle**. They do not shimmer after arrival. They do not pulse. They do not compete.

A headline that uses the `skWave` animation is making a request for sustained attention. That request can only be honored by one element at a time. The moment two elements shimmer simultaneously, neither is special.

**The shimmer is a designation, not a decoration.** It designates the single most important heading on the current viewport — and only that one.

### Forbidden Typography Patterns

- Section headings at weight 900 (too aggressive for supporting role)
- All-caps section headings (too categorical for editorial voice)
- Letter-spacing above 0.2em at heading scale
- Shimmer animation on more than one element per viewport
- Opacity below 50% on any readable text
- Mixed fonts within a single sentence
- Cormorant Garamond below 14px (it is a display face, not a UI face)
- Jost used for editorial prose (it is a UI face, not a reading face)
- Body text at Cinzel (it is a display face — it is not designed for extended reading)

---

## 3. Layout & Spacing Laws

### Spacing Cadence

The site uses an **8px baseline grid**. All spacing decisions must resolve to a multiple of 8. The allowed vertical spacing values are:

```
8px   — tight internal gaps (icon + label, price + badge)
16px  — card internal padding, carousel gap, tight section gaps
24px  — standard internal margins, horizontal section padding
32px  — wider internal margins
48px  — section top/bottom padding (mobile minimum)
64px  — section top/bottom padding (tablet start)
80px  — section top/bottom padding (desktop standard)
100px — section top/bottom padding (desktop max / large screens)
```

**No section may use a gap value below 8px.** The current 7px category tile gap is a grid error, not a design choice. It signals arithmetic accident, not editorial intention.

### Max-Width System

There are two intentional content column widths. Everything fits one of them.

```
Editorial content column:   960px   (WHY LUVZ, Heritage text, Contact, Footer brand column)
Showcase content column:    1360px  (Carousels, vault scene, full-bleed imagery)
```

**All editorial sections must share the 960px column.** Any section that breaks this column without being a showcase creates an alignment mismatch that reads as inconsistency.

The editorial column is not a constraint — it is a signal of care. It says the brand knows where its words should sit.

### Asymmetry Philosophy

Asymmetry on this site is **earned, not assumed**. It appears in:
- WHY LUVZ: 38/62 editorial split (the correct luxury move — unequal columns read as considered)
- Contact: 60/40 information split (structurally sound)
- Heritage: Image at 21:9 against text blocks

**Asymmetry must be intentional and stable across viewports.** An asymmetric layout that collapses incorrectly on tablet creates more damage than a symmetric layout would.

Symmetry is the safe default. Asymmetry must justify itself through emotional function.

### Density Rhythm

Density shifts are **editorial breath marks** — they allow the eye to rest and reset. But the shift must be intentional.

The correct density arc:
```
Hero          → Very low density (one image, one message)
WHY LUVZ      → Low density (editorial, generous whitespace)
Categories    → Medium density (bento grid — more information, same warmth)
Top Sellers   → Medium density (3D carousel — dramatic, not cramped)
New Collection→ Medium density (matches Top Sellers)
Heritage      → Low density (panoramic, cinematic, breath moment)
Contact       → Low density (two cards, generous spacing)
Footer        → Very low density (quiet exit)
```

**Two consecutive high-density sections must share distinct visual languages** or the visitor cannot distinguish between them. Top Sellers and New Collection, presented identically, read as the same section twice.

### Breathing Room Rules

- Every section needs visible sky above and below its content. `clamp(64px, 10vw, 100px)` top and bottom is the standard. Tighter padding requires explicit editorial justification.
- Cards need 16px internal breathing room. Less reads as cheap.
- Headlines need a margin below them that is at minimum 50% of the headline's line-height.
- No element should touch the viewport edge on any device. Minimum 16px side margin on mobile, 24px on tablet, 32px+ on desktop.

### Mobile Spacing Philosophy

Mobile does not mean compressed. Mobile means **restructured**.

- Card padding: 16px — same as desktop. The card is smaller; the padding stays.
- Side margins: never below 16px. 20px is preferred on all devices above 375px.
- Touch targets: never below 44px height. This is both accessibility and luxury — a brand that asks you to tap a 28px button does not respect your time.
- Section padding on mobile: `clamp(44px, 10vw, 64px)` — generous for the screen size.

### Forbidden Layout Behaviors

- Horizontal padding of 0 on any section (categories currently does this — it is an error)
- Gap values that are not multiples of 8
- Section max-widths that don't belong to either the editorial (960px) or showcase (1360px) column system
- Stacking two identical-layout sections without editorial differentiation
- Mobile content that touches the viewport edge

---

## 4. Atmospheric Direction

### Glow Usage

The site uses **warm amber radial glows** (`rgba(196, 136, 44, 0.06–0.08)`) as atmospheric foundation. This is correct and must be preserved.

The glow intensity ceiling is **0.08**. Above this value, the glow becomes a decorative choice rather than an atmospheric one. At 0.08, the glow is felt, not seen. That is the target.

Every section that contains primary editorial content must have a glow. The glow is not optional — it is the section's atmospheric fingerprint.

**Section glow assignments:**
```
Hero           → 0.08  (at 30% 50% — off-center, cinematic)
WHY LUVZ       → 0.07  (at 30% 50% — editorial warmth)
Categories     → 0.05  (at 50% 50% — neutral, functional section)
Top Sellers    → 0.06  (at 50% 40% — vault drama, centered)
New Collection → 0.06  (at 50% 30% — matches editorial family; currently 0 — must be fixed)
Heritage       → 0.08  (at 50% 30% — contemplative, strongest atelier warmth)
Contact        → 0.06  (at 50% 30% — welcoming, not cold)
Footer         → 0.03  (at 50% 100% — quiet exit, barely present)
```

A section with no glow reads as a different site inserted into this one. New Collection at 0.00 glow is the clearest current example of this failure.

### Gradient Intensity

All gradients on this site must **feel like light behaving, not graphics behaving**. This means:

- No hard stops in any decorative gradient
- All atmospheric gradients resolve to `transparent` at their outer edge
- The transition from glow to background must be imperceptible — the visitor should not be able to name the point where it ends
- Gradients used for section veils (hero cinematic overlay) may use multi-stop warm progressions, but must never feel like a filter applied to an image — they must feel like atmosphere

### Cinematic Layering

The hero's five-layer atmospheric construction — background image, CSS float animation, cinematic veil pseudo-elements, ambient gem light glow, particle field, and content — is the site's strongest technical achievement. This architecture must be preserved and used as a reference model.

**The principle it demonstrates:** Luxury depth comes from **superposition of subtle layers**, not from a single strong effect. A 0.08 glow + a 0.5s fade + a 1.04 scale + a 7s float = something that feels alive. Any single one of those effects alone would be unremarkable.

When adding atmosphere to any section, ask: what are the layers? Not: what is the effect?

### Blur Philosophy

`backdrop-filter: blur()` is used for **material transparency** — the chat widget trigger, overlay panels, glass category labels. It signals that an element is in front of the scene, not part of it.

**Blur is never decorative.** It is used only when an element needs to communicate "I float above this surface."

**Blur intensity:** 10–16px. Below 10px is insufficient to signal the material. Above 16px feels like a frosted bathroom window, not polished glass.

### Contrast Philosophy

The site's contrast system works through **tonal nearness**, not stark opposition. The near-black espresso background (`#18110A`) and warm card background (`#221810`) are very close in value — they create depth through proximity, not contrast.

High contrast is reserved for text-on-background (full legibility) and CTAs (action clarity). The atmospheric elements — glows, gradients, overlays — must all operate in the low-contrast register.

**Never introduce a color that creates a high-contrast break against the warm palette** unless that color is the WhatsApp green, which is an international UI convention and carries its own semantic weight.

### Section Warmth Hierarchy

The site moves through warmth like a room does — some corners are warmer, some cooler. The hierarchy:

```
Warmest:   Hero, Heritage     (most atmospheric investment)
Warm:      WHY LUVZ, Contact  (editorial warmth)
Neutral:   Top Sellers, New Collection  (functional warmth — enough to belong)
Cool:      Categories         (navigation function — less atmosphere, more clarity)
Quiet:     Footer             (barely present — exit, not entrance)
```

The error in the current site is that New Collection sits at Neutral with zero atmosphere (glow: 0), making it colder than Categories. This inverts the hierarchy.

### Shadow Restraint

Shadows signal **elevation and depth**. There are three shadow states:

- `--sh`: At-rest cards, buttons, unfocused UI. Present but not announcing.
- `--sh-h`: Hovered cards, elevated states. More shadow = more height = more desire.
- `--sh-modal`: Overlays and deep modals. Maximum depth — reserved for the most elevated surface.

**Never upgrade to a higher shadow state without a user action trigger.** Shadows that are strong at rest compete with the content they support.

### Texture Philosophy

The site does not currently use texture, and this is correct. The warmth of the palette, the depth of the glows, and the material photography carry the tactile signal. Adding CSS texture patterns or noise overlays would introduce a decorative register that competes with the photography.

**If texture is ever introduced:** it must be imperceptible at first glance. A maximum of 3% opacity noise. It must never animate. It must never tile visibly.

---

## 5. Motion Philosophy

### Approved Durations

Every motion duration on this site must come from this register:

```
Immediate feedback   →  0.15–0.2s   (navigation link color, active states)
Standard hover       →  0.28–0.35s  (card elevation, border color, button)
Deliberate entrance  →  0.5–0.8s    (section reveals, hero elements)
Cinematic pacing     →  1.2–2.8s    (hero float, heritage image hover, ambient glow)
Continuous animation →  3s–7s       (vault rotation, logo float, hero image breathe)
```

**Nothing interactive may use a duration above 0.4s.** An interactive element at 0.6s feels broken, not deliberate.

**Nothing ambient may use a duration below 1.2s.** Ambient motion that resolves in under a second reads as technical, not atmospheric.

### Easing Curves

Easing is **the emotional character of a motion**. Different easing curves carry different emotional registers.

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
  → Competent, neutral

Never:
  linear         → For anything visible (only for carousel drag tracking)
  ease-in        → Reads as reluctant — objects that accelerate into a stop
  bounce/elastic → Outside brand register entirely
```

### Hover Intensity Hierarchy

Hover states are calibrated to **the importance of the object being hovered**:

```
Primary objects (product cards):
  translateY(-6px) + shadow upgrade + image scale(1.05) + prism border
  Signal: "This object has weight and value."

Secondary objects (category tiles):
  translateY(-3px) + gold border flash
  Signal: "This is interactive."

Tertiary objects (nav links, footer links):
  color transition only
  Signal: "This is clickable."

Ghost objects (section glows, ambient elements):
  No hover state. They are atmosphere, not interaction.
```

**The intensity gradient must be preserved.** If product cards ever lose hover intensity, the site loses its primary desire signal. If category tiles gain product-card-level hover, the hierarchy collapses.

### Animation Restraint

**One thing moves at a time within a section.** The exception is the hero, which is the site's cinematic opening and earns its multiple simultaneous motions through intentional choreography.

For all other sections: if an element is entering (scroll reveal), nothing else in that section should be in motion. The visitor's attention is a resource. Competing motions dilute it.

**Scroll reveals are additive, not decorative.** An element that fades up on scroll must have something worth revealing. If the element would be equally visible without the reveal, remove the reveal.

### Shimmer Rules

The `skWave` shimmer animation is the site's single most powerful accent tool. Its power comes entirely from scarcity.

**Laws:**
1. Only one element on the page may use `skWave` at any given scroll position
2. Heritage section heading is the designated shimmer element — its position in the brand narrative (craft, tradition, provenance) earns the animation
3. All other section headings must use `color: var(--gold)` only — the color is sufficient; the animation is not needed
4. The shimmer must never be added to body text, captions, card titles, or UI elements
5. If the Heritage section is not visible (above or below viewport), the shimmer is not running — this is correct behavior

**The shimmer is a spotlight, not a stage wash.**

### Parallax Rules

Parallax is **a desktop privilege**. It requires pointer precision and screen real estate to read correctly.

- Hero parallax (three-layer mouse-move): approved at desktop. Disable entirely on touch devices.
- Section scroll parallax: approved at >768px only
- Mobile: no parallax. The floating animation on the hero image (`lcImageFloat`) is sufficient atmospheric motion.

**Parallax speeds must be different from each other to create depth.** The current three-speed system (image ±14px, text ±5px, gem glow ±22px) is correct — it creates genuine spatial registers.

### Mobile Motion Behavior

Mobile motion must be **10–30% less intense** than desktop equivalents. Not removed — reduced.

- Hover states do not exist on touch. The touch equivalent is a brief active state on press (opacity reduction or brief scale).
- Prism border on touch (1800ms duration): reduce to 900ms. The touch interaction resolves faster than the animation. The animation must resolve within the interaction window.
- No parallax. No cursor tracking.
- Continuous animations (float, vault rotation) may reduce speed by 20% on mobile.

### Forbidden Motion Patterns

- Shimmer on more than one heading simultaneously
- Interactive hover above 0.4s duration
- Ambient motion below 1.2s duration
- Parallax on touch devices
- Elements that bounce, wobble, or use elastic easing
- Animations that run continuously off-screen (performance and attention waste)
- Transitions on `all` properties — specify only the properties that change
- Motion that begins before page content has settled
- Counter-intuitive easing (ease-in on arrivals — elements should decelerate, not accelerate, into rest)

---

## 6. Interaction Hierarchy

### CTA Priority Behavior

The site has one primary call to action: **opening a conversation with the brand** — either through WhatsApp or the AI stylist chat. Product cards are secondary CTAs. Navigation is tertiary.

This hierarchy must be legible in visual priority at all times:

```
Primary CTA:   WhatsApp / Chat — maximum visibility, gold or green fills
Secondary CTA: Product "Enquire" buttons — ghost style, high contrast
Tertiary CTA:  Navigation, category links — minimal styling, color-only indication
Ghost CTA:     Footer links — quiet, present, undemanding
```

A CTA that visually outranks the primary touchpoint has broken the hierarchy.

### Hover Hierarchy

**Product cards receive the full hover treatment because they are the primary objects of desire.** Everything below them in the hierarchy receives proportionally less feedback:

- Product card: full elevation, shadow, scale, prism, border color
- Category tile: partial elevation, border flash — no scale, no prism
- Navigation: color change — no elevation, no border
- Footer links: color change — faster than nav
- Buttons: background fill, color inversion — no elevation unless they are primary CTAs

**The hierarchy is not negotiable.** An element that receives more hover feedback than a product card has claimed to be more important than the inventory. That is always wrong.

### Button Philosophy

Buttons communicate **the brand's confidence in its own offer**.

**Ghost button (default):** Used when the brand is inviting — "enquire here," "explore this." The empty background says: we are not forcing anything. The gold border says: we know what we are.

**Primary CTA (rare):** Used only when there is one essential action and the brand needs to name it clearly. The filled gold background is the loudest button state on the site — it should appear no more than twice per page.

**WhatsApp button:** Its own category. The green is a universal conversation signal. It must never be styled away from its semantic color — a gold WhatsApp button is a confused message.

**Contact ghost button:** 0.35s transition. Same as product card hover. The contact page's primary CTA must feel as responsive as the site's most important interactive element. A slow contact button signals reluctance.

### Card Interaction Philosophy

Product cards are **desire objects, not catalogue entries**. The interaction must confirm that the card represents something worth owning.

The current hover treatment — elevation, prism, image scale, shadow upgrade — is correct in principle. It must be maintained.

One rule: **the hover state must be visually unambiguous.** A visitor hovering a card must feel that the card has responded. If the transition is too subtle, the card feels inert. Inert product cards do not create desire.

### Tactile Luxury Principles

Luxury feel on touch devices comes from:
1. **Immediate response to touch** — the active state (brief opacity or scale reduction) must register within the same frame as the touch event
2. **Resolution that feels intentional** — the return to rest must feel graceful, not snappy
3. **No accidental triggers** — touch targets at 44px minimum prevent the frustration of mis-taps

**The prism border on mobile card touch is the strongest tactile luxury signal on the site.** It rewards attention with a slow ornate light sweep. Reduce its duration (900ms, not 1800ms) so it completes within the natural touch-and-lift window.

### Responsiveness Philosophy

Responsiveness here means **emotional responsiveness**, not just technical adaptability.

Every interactive element must confirm that the user's action was received. The confirmation may be subtle — a color shift, a shadow upgrade, a border change — but it must be unambiguous.

An element that does not visibly respond to hover or touch feels broken on a luxury site. The brand's silence in response to a customer's gesture is not restraint. It is neglect.

---

## 7. Imagery Direction

### Photography Philosophy

LUVZ jewelry is photographed for **longing, not accuracy**. The image is not a product sheet. It is a desire object.

The photography philosophy is: **show the piece as if the visitor has already chosen it**. Warm lighting, dark backgrounds, close focal lengths, shallow depth of field. The jewelry should feel like it is about to be worn, not waiting to be shipped.

### Crop Philosophy

**Object-position: center top** is the default for portrait and lifestyle shots. The piece, and the skin it sits against, should be the highest-priority crop point.

Square crops (1:1) on product cards are a functional constraint, not an editorial choice. The image must be photographed with sufficient breathing room to accommodate any square crop without losing the piece.

**Never force a landscape image into a square crop.** Never crop a necklace in half. If the image does not work at 1:1, the image must be replaced, not forced.

### Editorial Framing

The site uses three image registers:

1. **Lifestyle editorial** (Hero): Cinematic, full-bleed, person or context present, atmospheric. This is the brand's voice at its most aspirational.

2. **Atelier documentary** (Heritage): Hands, process, material in transformation. These images must be photographically distinct from the hero — different focal length, different moment, different register. The craft claim must be backed by visual evidence of craft.

3. **Object portrait** (Product cards, carousel): The piece, clean background, neutral or warm darkness, full object visible. No lifestyle elements. The piece speaks for itself.

**These three registers must not overlap.** Using a lifestyle image in a product card confuses the registers. Using the hero image in the heritage section (currently happening) collapses the narrative.

### Lighting Direction

All photography must use **warm lighting** — no cool daylight, no harsh studio white.

The correct reference: a jeweler's halogen display light, angled slightly. Warm catch lights on metal. Gold that glows rather than reflects. Silver that has warmth in its cool register.

Photography under cool or harsh lighting creates pieces that look mass-produced, regardless of their actual craftsmanship. The lighting philosophy is part of the luxury claim.

### Background Consistency

Product photography backgrounds must be consistent across all cards in a given carousel. Random mixes of white, black, cream, and dark product backgrounds within the same scroll view read as a grab-bag catalogue.

**Current requirement:** Dark neutral background (`#221810` or close equivalent) for all product photography. This makes the inventory feel coherent and intentional.

If any product image uses a light background, it must be either replaced or masked to a consistent dark background.

### Image Emotional Tone

The correct emotional tone for every image on this site is **quiet coveting**. The image should make a visitor feel that looking at it is a small luxury in itself — that the image, not just the product, is worth their attention.

Images that feel clinical, flat, or catalogue-standard break this tone immediately.

### Forbidden Image Styles

- White or grey studio backgrounds in product cards (breaks tonal coherence)
- Cool-toned or blue-shifted photography (breaks warmth)
- Flat-lit images with no shadow depth
- Images with visible props, clutter, or studio equipment
- The same image used in two distinct sections (currently: hero image in Heritage — must be corrected)
- Images with text or watermarks overlaid
- Collage or composite images that mix multiple products in one frame
- Oversaturated gold or silver (the metal should have its natural tonal range, not be pushed to orange or blue)

---

## 8. Section Emotional Roles

### Hero

**Emotional purpose:** Arrest and seduce. This is the first impression and must earn every second the visitor gives it.

**Pacing role:** Opening statement. Unhurried. Designed to be absorbed, not scanned.

**Atmosphere intensity:** Maximum. Five-layer atmospheric construction. Full parallax. Hero particles. Float animation. This is the one section permitted to use every atmospheric tool simultaneously.

**Interaction density:** Minimum. Two buttons. No other interactive elements in the hero field itself.

**Typography mood:** Cinematic. Weight 400. Mixed case. The brand name arrives, it does not announce.

**Guard:** The hero must never be simplified. Removing any atmospheric layer weakens the first impression. The hero is the most fragile system on the site because it achieves coherence through superposition — remove one layer and the depth collapses.

---

### WHY LUVZ

**Emotional purpose:** Build trust through restraint. The brand explains itself without defending itself.

**Pacing role:** First breath after the hero. Lower density. Editorial. The visitor shifts from sensation to understanding.

**Atmosphere intensity:** High. Warm glow at 0.07. The gold separator line. The editorial split. Enough warmth to feel continuous with the hero, not disconnected.

**Interaction density:** Minimal. This section is read, not navigated.

**Typography mood:** Mixed case. Cinzel 400 for the why-statement ("Crafted to feel heirloom-worthy."). This is the one place on the site where Cinzel behaves as a literary font rather than a display font. That restraint is the section's most powerful signal.

**Guard:** Do not add animation to this section. Its power is in stillness. Any motion here would make the brand appear anxious to hold attention.

---

### Categories

**Emotional purpose:** Navigate without condescending. The section is a wayfinding tool that must not abandon the brand's atmosphere while doing its job.

**Pacing role:** Gear-shift. The visitor transitions from reading to exploring. Density increases. The visitor takes control.

**Atmosphere intensity:** Moderate. Glow at 0.05. The warmth must be present or the section reads as a navigation tray, not a brand section.

**Interaction density:** High. Every tile is a destination. Hover states must be clear and unambiguous.

**Typography mood:** Functional. Eyebrow at 8px uppercase (correct — categorical). Category name at 14px Cinzel title case. Labels must be readable at a glance; they are wayfinding, not decoration.

**Guard:** Tile gaps at 8px minimum. Current 7px is an error. The hover delta (translateY -1.5px) is imperceptible and must be raised to -3px minimum. Categories must feel responsive; they are the most interaction-dense section on the site.

---

### Top Sellers

**Emotional purpose:** Demonstrate desire through social proof. The 3D vault delivers this through spectacle — these pieces are worth the visual drama.

**Pacing role:** Re-activation after categories. The vault's 18°/sec rotation is unhurried luxury drama. The visitor watches before they engage.

**Atmosphere intensity:** Moderate to high. The vault's depth shadows and perspective create their own atmosphere. Supplement with glow at 0.06.

**Interaction density:** Moderate. Vault tap → rotation → modal. The interaction has intentional friction — it is a reveal, not a browse.

**Typography mood:** Standard. Section heading in Cinzel 700 title case. Card titles at Cinzel 600.

**Guard:** The vault rotation speed (18°/sec) must not be increased. Faster rotation reads as impatient. The 2.2s resume delay after user interaction must be preserved — it respects the user's attention.

---

### New Collection

**Emotional purpose:** Signal newness as editorial event, not restocking announcement. Arrivals deserve a distinct visual register from the standing inventory.

**Pacing role:** Maintains momentum after Top Sellers. Same energy, different content. The editorial differentiation must come from atmospheric treatment, not layout duplication.

**Atmosphere intensity:** Moderate. Glow at 0.06. Currently 0 — must be corrected immediately. The warm glow brings this section into the atmospheric family.

**Interaction density:** Moderate. Same carousel mechanism as Top Sellers, but the section must feel editorially distinct. Consider whether a different presentation (strip, editorial grid, feature layout) would better serve the "new arrival" narrative.

**Typography mood:** The eyebrow must use `var(--txt2)` or `var(--gold)` — not `#3A8C5C` (forest green). The green is the single most disruptive color error on the site. One token change. Immediate brand impact.

**Guard:** New Collection must not be visually identical to Top Sellers. Two identical sections in sequence is a hierarchy error. The visitor should feel they've moved to a different editorial chapter, not a duplicate page.

---

### Heritage

**Emotional purpose:** Substantiate the craft claim. This section must feel like evidence, not copy. The brand's provenance is asserted here — 92.5 sterling, 22K gold polish, generational craft. The visitor must believe it.

**Pacing role:** Deep breath. The panoramic 21:9 image and slow staggered reveals create the site's longest atmospheric pause. The visitor is held here longer than anywhere else except the hero.

**Atmosphere intensity:** Maximum (after hero). Glow at 0.08. Staggered entrance at 0.64s delay cadence. This is the section that earns the `skWave` shimmer — on the heading only, once, as a designation of the brand's most important material claim.

**Interaction density:** Minimal. This section is witnessed, not navigated.

**Typography mood:** Contemplative. Pillar numerals in Cinzel 700 at clamp scale — large, few, definitive. Body copy in Cormorant Garamond 300 — light, generous, unhurried.

**Guard:** The heritage image must be editorially distinct from the hero image. Currently, both use the same source. This must be corrected — the brand's entrance image and its craft narrative image cannot be the same photograph. The heritage section's authenticity depends on visual evidence specific to its claim.

---

### Get In Touch

**Emotional purpose:** Welcome the visitor as a client, not as a support case. The brand's contact page is a concierge moment — warmth, accessibility, no resistance.

**Pacing role:** Resolution. After the narrative arc (hero → editorial → products → heritage), this section is where the visitor decides. The pacing must be unhurried and welcoming.

**Atmosphere intensity:** Moderate. Glow at 0.06. Currently the contact section title is at 0.5 opacity — this reads as apology. The title must be at full opacity. The section must feel like an invitation, not an afterthought.

**Interaction density:** Low-moderate. Two contact cards (WhatsApp primary, Instagram secondary). Ghost button for the primary CTA. Button transition at 0.35s — matching the product card hover register exactly.

**Typography mood:** Welcoming. Cinzel 700 section heading at full opacity. "Speak with our Jewellery Stylist" is the strongest editorial copy on the site — it must not be suppressed by its container. Section heading must not be muted.

**Guard:** WhatsApp is the primary contact path. Its card must be visually dominant over the Instagram card. On mobile, WhatsApp must appear first. The contact ghost button transition must never exceed 0.35s — a slow contact CTA is a closed door.

---

### Footer

**Emotional purpose:** Quiet confidence. A luxury brand's footer is not a legal necessity — it is the last impression. It should feel like the moment after a purchase, when the brand says "thank you" without making a ceremony of it.

**Pacing role:** Exit. The lowest density on the site. The visitor is leaving or has made a decision. The footer does not ask for more time.

**Atmosphere intensity:** Minimal. Glow at 0.03 — barely present. The footer does not compete with content above it.

**Interaction density:** Low. Links, contact detail, copyright. All secondary. No CTAs.

**Typography mood:** Quiet. Cinzel 400 for the brand name (same as the hero — continuity). All body copy at 55% opacity minimum (not current 40–45% — see opacity tier laws). Footer links at 14px minimum, not 13.5px.

**Guard:** The footer is not an afterthought. It is the last visual moment of the brand experience. A near-invisible footer signals that the brand has checked out. 55% opacity, 14px, and legible grid alignment are the minimum standards for brand dignity at the exit.

---

## 9. Mobile Luxury Principles

### Mobile Emotional Pacing

Mobile luxury is earned through **restraint of density**, not feature removal. The mobile experience must feel like the desktop experience, not like a compressed version of it.

The emotional target on mobile is the same as desktop: warm, unhurried, certain. The delivery mechanism is different — touch instead of cursor, vertical instead of horizontal — but the emotional register must be identical.

### Mobile Density Limits

Mobile screens impose density limits that must be respected:

- No more than two product cards visible at once in a carousel view
- Category tiles: maximum 2 columns at any viewport below 600px
- No floating elements that overlap scrollable content
- No sticky elements that consume more than 56px of vertical space

**When a section cannot maintain its desktop atmosphere within mobile density constraints, simplify the structure, not the atmosphere.** Remove columns before removing warmth. Remove elements before removing glow.

### Touch Feedback Philosophy

Touch feedback must be **legible without hover**. This means:

- Active states (pressed) must be visually distinct — opacity reduction to 0.7 or scale to 0.97 — and resolve on release
- No hover-dependent information (tooltips, revealed labels) on mobile — everything must be visible without touch
- Touch targets at 44px minimum everywhere, 48px for primary CTAs

The touch interaction with a luxury product card should feel like picking up the piece — immediate, weighted, responsive.

### Mobile Typography Behavior

- Hero title at `clamp(2.4rem, 16vw, 4.8rem)` — correct; at 390px this renders at ~62px, which is appropriately bold
- Section headings: not smaller than 1.4rem on mobile
- Body text: not smaller than 15px (16px preferred — the iOS auto-zoom minimum)
- Chat input: locked at 16px — the iOS auto-zoom behavior at 15px is a luxury-breaking interruption
- Caption and support text: not smaller than 13px

### Mobile Hierarchy Rules

On mobile, the most important information must appear first in the vertical stack:

**Contact section mobile hierarchy:**
1. WhatsApp (primary path — appears first)
2. Instagram (secondary — appears second)

**Footer mobile hierarchy:**
1. Brand name + tagline
2. Navigation links (most useful for mobile wayfinding)
3. Contact information (WhatsApp, hours — mobile visitor is likely about to contact)
4. Legal / copyright (last — least urgent)

The current footer order (brand → navigation → contact) is correct structurally. Ensure that the reorder on mobile follows the above priority.

### The Chat Trigger on Mobile

The AI stylist is the brand's most differentiating feature — a live luxury concierge available within the site. **Hiding this feature on mobile (<768px) is the most consequential UX error on the site.**

The chat trigger must be visible on mobile. At smaller scale — reduced padding, slightly smaller — but present. A luxury concierge that requires a menu hunt to access is not a luxury feature. It is a buried function.

On mobile, the trigger should appear at the bottom of the viewport, offset from the bottom navigation to prevent overlap, with sufficient size to be an obvious entry point.

---

## 10. Anti-Patterns

The following patterns break luxury feel immediately and must never recur.

### Over-Animation

- Multiple section headings shimmering simultaneously
- Hover transitions above 0.4s on interactive elements
- Bounce or elastic easing on any element
- Motion that continues after the interaction that triggered it has resolved
- Elements that animate on scroll without having anything worth revealing
- Prism animations running on elements outside the viewport

### Spacing Mistakes

- Any gap below 8px (current: category 7px — an error)
- Horizontal padding of 0 on any section at any viewport (current: categories — an error)
- Touch targets below 44px height
- Section padding below `clamp(44px, 8vw, 64px)` without editorial justification

### Typography Mistakes

- Section headings at Cinzel weight 900 (too aggressive; competes with hero)
- All-caps section headings (too categorical; removes editorial voice)
- Text opacity below 50% for any readable content
- Shimmer animation on more than one element simultaneously
- Cinzel used for body copy (a display face, not a reading face)
- Cormorant Garamond below 14px (too small for its serifs to read clearly)
- Mixed fonts within a single phrase

### Atmosphere Mistakes

- Any section with zero glow (`rgba(196,136,44, 0)`) — cold contrast against atmospheric neighbors
- Glow above 0.08 intensity — becomes decorative rather than atmospheric
- `backdrop-filter: blur()` used purely for decoration
- Adding atmospheric effects to compensate for weak content (effects do not fix copy)
- Hard gradient stops in any decorative gradient

### Color Misuse

- Any non-palette color in brand contexts — the current `#3A8C5C` green eyebrow in New Collection is the canonical example of this failure. One token fix. Immediate brand impact. Every color must trace to a CSS variable.
- Hardcoded color values anywhere in CSS or JS
- WhatsApp green (`--wa-green`) used for any purpose other than WhatsApp UI
- Gold used as a dominant fill (it is always an accent — never a background)

### Interaction Misuse

- Contact ghost button transition above 0.35s (currently 0.6s — broken)
- Category tile hover delta below 3px (currently 1.5px — imperceptible)
- Chat trigger hidden on mobile
- Elements that do not respond to hover or touch
- Cursor-tracking effects on touch devices
- Interactive targets with no active state feedback

### Image Misuse

- The same photograph used in two distinct sections
- White, grey, or cool-toned product photography backgrounds
- Landscape product images forced into 1:1 crop without sufficient content
- Images that compete with each other within a single scroll view
- Product photography with visible props or studio setup

---

## 11. Implementation Guardrails

### How Future AI Prompts Should Work

Every AI implementation prompt for this site must:

1. **Reference this document first** — before writing any code, confirm which section of LUXURY_DIRECTION.md applies to the change
2. **State the emotional purpose of the change** — not just what it does, but what feeling it must produce or preserve
3. **List what must not change** — alongside what changes, name the elements that must be preserved
4. **Scope to one section or one system** — multi-section changes in a single pass create cascading unintended effects

**Prompt structure example:**
```
Context: Implementing improvement #6 from LUXURY_DIRECTION.md (contact ghost button timing)
Section affected: Get In Touch
Emotional purpose: Make the primary CTA feel responsive and welcoming, not sluggish
Change: .contact-ghost-btn transition from `all 0.6s ease` to `all 0.35s ease`
Must not change: Button styling, border color, background fill behavior, typography
```

### How Redesign Prompts Should Be Structured

Any redesign prompt must:

1. **Name the specific anti-pattern being corrected** from Section 10 of this document
2. **Cite the law being applied** from the relevant section (Typography, Layout, Motion, etc.)
3. **Confirm the emotional role of the section** from Section 8 before proposing any change
4. **Test against the luxury principles** in Section 1 before implementation

A redesign prompt that does not reference this document is operating without a brief.

### How Implementation Passes Should Be Split

Never implement changes from multiple sections of this document in a single pass. Correct order:

**Pass 1 — Color and atmosphere corrections** (immediate brand coherence):
- Fix green eyebrow in New Collection → `var(--gold)` or `var(--txt2)`
- Add glow to New Collection (`rgba(196, 136, 44, 0.06)`)
- Fix contact section title opacity from 0.5 → 1.0
- Fix footer link opacity from 0.45 → 0.55
- Remove `skWave` from all section titles except Heritage

**Pass 2 — Typography weight and spacing** (hierarchy corrections):
- Section title weight from 900 → 700
- Section title tracking from 0.2em → 0.12–0.15em
- Category tile gap from 7px → 8px (or 16px)
- Horizontal padding 0 → 24px on categories section

**Pass 3 — Motion and interaction** (responsiveness corrections):
- Contact ghost button transition from 0.6s → 0.35s
- Category tile hover from translateY(-1.5px) → translateY(-3px) + gold border flash
- Prism touch duration from 1800ms → 900ms on mobile
- Chat trigger visible on mobile

**Pass 4 — Heritage editorial correction** (narrative authenticity):
- Replace Heritage section image with a distinct photograph (artisan hands, craft process)

**Pass 5 — Section differentiation** (editorial depth):
- New Collection: differentiate layout from Top Sellers
- Categories: review bento grid tile weights and hover consistency

Each pass must be completed and visually verified before the next begins. Passes are not parallelizable — each pass affects the visual context that the next pass depends on.

### What Must Never Be Changed Casually

The following elements have been established through deliberate editorial intention and must not be altered without a full review of their role in the atmospheric system:

| Element | Why It Must Not Change Casually |
|---------|--------------------------------|
| Hero five-layer atmospheric architecture | The depth comes from superposition; removing one layer collapses perceived depth |
| Vault rotation speed (18°/sec) | The unhurried pace is the vault's luxury signal; faster reads as impatient |
| Hero spring easing `cubic-bezier(0.34, 1.56, 0.64, 1)` | The slight overshoot gives the brand name weight; changing it makes it arrive rather than settle |
| `skWave` shimmer reserved for Heritage heading | The shimmer's power depends entirely on scarcity; adding it to other elements destroys Heritage's designation |
| WHY LUVZ `why-statement` in Cinzel 400 mixed case | This is the site's most refined typographic moment; Cinzel 900 uppercase would destroy it |
| Vault 2.2s interaction resume delay | The pause respects the user's attention; removing it makes the vault feel automated, not alive |
| Hero image `object-position: center top` | This crop prioritizes faces and skin — the most important contextual signal in jewelry photography |
| Parallax three-layer speed differentiation | Identical speeds create no depth; the differentiation is what creates the spatial register |
| WhatsApp number (`918919359961`) | Hardcoded in three locations; must change together or not at all |

---

## Final Note

This document is the institutional memory of LUVZ Collection's visual ambition. It was written at a moment when the site's strongest work (the hero, the WHY LUVZ editorial split, the heritage cinematic pacing, the vault interaction restraint) demonstrates that the brand knows what luxury feels like — and the site's weakest work (the green eyebrow, the four simultaneous shimmers, the invisible footer, the hidden chat trigger) demonstrates that this knowledge has not yet been applied consistently.

The path forward is not addition. The path is extension — extending the care and emotional intelligence that already exists in the site's best moments to every moment. The atmosphere is already warm. The palette is already correct. The animation language is already unhurried.

The laws in this document exist to ensure that future changes extend that excellence rather than dilute it.

**Every implementation decision must be measured against one question: does this feel like a jeweler who has been making pieces for forty years, or does it feel like a website that is trying to look like one?**

The answer must always be the former.

---

*Permanent art-direction authority for LUVZ Collection*
*Written: 2026-05-04*
*Review: before any significant redesign pass*
*Authority: supersedes any implementation decision that conflicts with its laws*
