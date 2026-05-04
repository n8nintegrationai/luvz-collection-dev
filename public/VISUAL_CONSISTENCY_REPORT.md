# VISUAL_CONSISTENCY_REPORT.md — LUVZ Collection

**Luxury art-direction audit. Benchmarked against DESIGN_SYSTEM.md and current branch state.**  
**Think: Cartier boutique, not Mejuri checkout funnel.**  
**Generated: 2026-05-04**

---

## 1. Overall Brand Impression

LUVZ currently reads as a luxury-aspiring site with a genuinely cinematic foundation that hasn't yet been pulled to full coherence. The opening hero is a serious piece of editorial craft — the layered parallax, the spring-eased title reveal, the warm particle field, the counter-movement of image and text. That hero earns a Mejuri-tier first impression.

Then the site relaxes into inconsistency. Sections alternate between editorial ambition (WHY LUVZ) and functional e-commerce logic (New Collection, contact). The gold shimmer animation runs on every section heading simultaneously, which reads not as accent but as ambient noise. The atmosphere is warm and intentional but unevenly sustained — like a luxury boutique where the entrance is beautiful and the back rooms are stock.

The brand's strongest signal is restraint in background tone (the near-black espresso palette is genuinely correct) and the unhurried animation language (vault rotation at 18°/sec, cursor glow at 0.9s lag). These create a temporal luxury. What undermines that signal is typographic inconsistency and glow overuse.

**Emotional temperature today:** Warm, cinematic in isolated moments, uneven overall. A strong 7/10 entrance leading to a 5/10 browse.

---

## 2. Strongest Sections

### Hero
The strongest piece of editorial work on the site. Five stacked atmospheric layers — full-bleed image with CSS float animation, a multi-stop cinematic veil via pseudo-elements, an ambient gem light glow, a warm particle field, and the content itself at z-index 3. The mouse-move parallax (three layers: image at ±14px, text counter-moving at ±5px, gem light at ±22px) creates genuine spatial depth. The spring-eased title entrance (`cubic-bezier(0.34, 1.56, 0.64, 1)`) gives the word LUVZ a feeling of arriving rather than appearing. 

**Why this works:** The hero respects the object (jewelry) by using portraiture framing (`object-position: center top`), a long-duration float animation (7s), and a color palette that doesn't fight the piece. The parallax speeds are intentionally different (no single motion register), which creates complexity without feeling chaotic. This is crafted work.

### WHY LUVZ
The 38/62 editorial split with a vertical gold border separator is the most magazine-grade layout decision on the site. The `why-statement` in Cinzel 400 (not the usual bold-uppercase mode) — "Crafted to feel heirloom-worthy." — reads with unusual quietness. The proof grid below using 9.5px Cinzel at 0.25em tracking is beautifully minimal.

**Why this works:** The section breaks the uppercase-everything pattern. Mixed-case Cinzel 400 reads more refined than Cinzel 900 all-caps. The restraint in typography (no extra decorations, no shimmer animation) signals confidence rather than trying to convince. The grid of proofs (four stat cards with minimal styling) is the purest typography-led layout on the site.

### Heritage (Cinematic Pass)
The 21:9 panoramic image wrap is the correct editorial choice — it signals "object, not product." The staggered reveal (six elements at 0–0.64s delays) is the most cinematically paced entrance on any section. The pillar numerals (92.5 / 22K / 100%) presented in Cinzel 700 at clamp scale with small Cormorant labels beneath — this is correct luxury hierarchy.

**Why this works:** The Heritage section has a narrative arc (eyebrow → headline → image → numbers → body → CTA) that unfolds across time. Each element has a distinct scale and weight, creating visual rest between active typography. The panoramic image at 21:9 aspect ratio forces focus — it's too wide to be a standard product shot, which makes it feel editorial and deliberate.

---

## 3. Weakest Sections

### New Collection
The eyebrow label uses `color: #3A8C5C` (forest green). This is a jarring palette break in a site built entirely on amber-gold warmth. The section is otherwise identical in structure to Top Sellers — same carousel mechanism, same sec-head pattern, no editorial differentiation.

**Why this fails:** A "New Collection" section should feel like the front page of a magazine editorial — it currently feels like a second shelf of the same inventory. The green eyebrow is the most egregious color break on the entire site. The lack of atmospheric glow (compare to Hero at 0.08, WHY LUVZ at 0.07, Contact at 0.06 — New Collection has 0) creates a cold contrast against its neighbors.

**Emotional read:** "This is different from the rest of the site, but I don't know why."

### Contact / GET IN TOUCH
The section title `.sec-title` has `opacity: 0.5` applied uniquely here. No other section mutes its title this aggressively. It reads as disabled, not restrained. The asymmetric 60/40 contact grid is structurally sound but atmospherically flat — neither panel creates desire.

**Why this fails:** The `.contact-ghost-btn` uses `transition: all 0.6s ease` — twice as slow as every other interactive element (nav/card register is 0.28–0.4s), which reads as unresponsive rather than deliberate. The call to action "Speak with our Jewellery Stylist" is the strongest editorial copy on the site and it's being suppressed by its own container. An muted title (0.5 opacity) signals apology rather than presence.

**Emotional read:** "The brand doesn't really want me to contact them."

### Footer
Three column widths (1.1fr / 1fr / 1.1fr) with type at 8–9px labels, 13.5px italic links at 45% opacity. The footer is recessive to the point of invisibility. Footer links at `rgba(200,170,100,0.45)` barely reach legibility, and the copyright text at `rgba(180,130,40,0.28)` is near-invisible.

**Why this fails:** A luxury brand's footer should feel like a quiet confidence — this feels like afterthought. The brand name appears again at 18px Cinzel 400 but is competing with the `footer-brand-sub` at 8px with 0.32em tracking — the size jump is extreme (2.25× scale difference) with no visual logic. Feet of a luxury boutique invite you back; this one ushers you out.

**Emotional read:** "The brand has checked out."

### Categories
The 7px gap between tiles creates a mosaic grid aesthetic that doesn't match the generous spacing language used everywhere else on the site (8px baseline grid, 16px defaults). The hover feedback is only `translateY(-1.5px)` — at this scale it's imperceptible. Category tile labels use an 8px eyebrow and 12px name, both inside a glass blur panel at the bottom edge.

**Why this fails:** The information is there but the scale is too compressed to create any editorial weight. The 7px gap (odd number) suggests a mistake rather than intentional design. Categories are the navigation for product discovery — they deserve visual prominence equal to the hero. Instead they're squeezed into the smallest typographic scale on the site.

**Emotional read:** "This is secondary."

---

## 4. Typography Consistency

### Hierarchy Inversion Problem
The hero title is Cinzel **400** weight. Section titles (`.sec-title`) are Cinzel **900** weight. This is an inverted hierarchy — the most prominent element in the site uses the lightest weight, while supporting section heads use the heaviest.

The hero title feels intentional (a wide, cinematic stroke at 6.5rem scale), but in context it reads as lighter and less confident than what follows it. A visitor sees "LUVZ COLLECTION" (400, 6.5rem) then scrolls to "WHY LUVZ?" (900, 2rem) — the section feels more emphatic than the brand name.

**Current state:**
- Hero title: Cinzel 400, clamp(2.6rem, 8vw, 6.5rem), text-shadow with glow
- Section titles: Cinzel 900, clamp(1.45rem, 3vw, 2rem), uppercase, 0.2em tracking
- Card titles: Cinzel 700, 18px, uppercase, 0.08em tracking

**Recommendation:** Hero title weight is correct. Drop section titles to 700 (not 900) to create a consistent weight cadence: Hero **400** (cinematic, singular) → Section **700** (structural, supporting) → Card **600** (informational, compact).

### Uppercase Overuse
Nine distinct typographic elements use `text-transform: uppercase`:
- `.eyebrow` (0.58rem, 0.55em tracking)
- `.sec-title` (Cinzel 900, 0.2em tracking)
- `.lc-eyebrow` (0.58rem, 0.45em tracking)
- `.why-proof-title` (9.5px, 0.25em)
- `.heritage-eyebrow` (11px, 0.35em)
- `.cat-glass-eyebrow` (8px, 0.18em)
- `.footer-col-label` (9px, 0.32em)
- `.footer-brand-sub` (8px, 0.32em)
- `.contact-ghost-btn` (11px, 0.10em)

When everything is uppercase, nothing has emphasis. The eyebrow-to-title transition (both uppercase, just different sizes) loses its tonal contrast. Cinzel in mixed case — used for `why-statement` ("Crafted to feel heirloom-worthy.") — is the most distinctive typographic moment on the site precisely because it breaks this pattern.

**Recommendation:** Reserve all-caps for UI labels and eyebrows only. Section titles in Cinzel mixed case (title case: "Why Luvz?" or "Top Sellers") with slightly reduced letter-spacing (0.12–0.15em instead of 0.2em) would feel more editorial and less like a banner headline.

### Opacity Register Inconsistency
Current opacity values are ad hoc across sections:

| Context | Color value | Effective opacity |
|---|---|---|
| Primary body (`.why-atmo`, `.cinematic-body`) | color text with opacity | 60–82% |
| Secondary text (`.why-proof-desc`) | text with opacity | 60% |
| Muted title (`#contact .sec-title`) | text with opacity | 50% |
| Footer links (`.footer-link`) | `rgba(200,170,100,0.45)` | 45% |
| Footer details (`.footer-contact-detail`) | `rgba(200,170,100,0.4)` | 40% |

This creates no clear tier system. Body text hovers between 60–82%. Footer text at 40–45% is so low it reads as disabled rather than intentionally quiet.

**Recommendation:** Establish two clear tiers:
- **Primary body:** 75% (currently 0.65–0.82, varies per section)
- **Secondary/supporting body:** 50% (currently 0.45–0.6, varies)

Anything below 50% should signal "intentionally ghosted" (e.g., `footer-copyright`). Current 40–45% footer links are neither readable nor intentional.

### Crimson Pro — Unused Potential
The font system loads Crimson Pro (200/300 weights, normal and italic) from Google Fonts. It doesn't appear prominently in any audited section. This is a beautiful editorial weight for long-form prose, poetic headers, or brand narrative. Its near-absence is a wasted typographic note — you're paying the font load cost without using it.

---

## 5. Atmospheric Consistency

### Gold Shimmer Overuse (Critical Issue)
The `.gold-text` class with its `skWave` animation applies simultaneously to:
- Top Sellers heading
- New Collection heading
- Heritage headline  
- Wishlist overlay title
- Likely other elements (vault label, modal titles)

At any given scroll position, **two or three headings are actively shimming in the same direction at the same speed**. This makes the shimmer feel ambient rather than accent — like a screensaver rather than a jeweler's spotlight on a single piece.

The animation mechanics:
- Duration: 1.7s infinite
- Effect: 200% gradient slide left-to-right via `background-position`
- Color scale: `var(--gold-d)` → `--gold` → `--gold-l` → `--gold` → `--gold-d`

**Impact assessment:**
- A single shimmer on the most important heading creates desire and luxury
- Two simultaneous shimmers create visual tension (competing focus points)
- Three+ shimmers create ambient noise that the eye learns to ignore

**Current problem:** The hero doesn't shimmer (correct — it's gold all-text anyway). But then WHY LUVZ shimmers. And Top Sellers shimmers. And New Collection shimmers. And Heritage shimmers. All different sections, all at slightly different times, all equally animated.

**Recommendation:** Remove `gold-text` from all `.sec-title` elements except **one chosen section** (Heritage is the strongest candidate — its position in the brand narrative warrants the animation).

For other headings, use `color: var(--gold)` — the color alone is sufficient and more sophisticated. The shimmer should be a **reward for the most important moment**, not wallpaper.

### Section Mood Variance
| Section | Designed Mood | Current Execution | Grade |
|---|---|---|---|
| Hero | Cinematic, nocturnal | Five-layer parallax, spring easing, particles | **A** |
| WHY LUVZ | Editorial magazine | Editorial split layout, minimal styling, mixed-case type | **A-** |
| Categories | Utilitarian exploration | Compressed scale, imperceptible hover | **D+** |
| Top Sellers | 3D showcase drama | Vault rotation, depth shadows, 18°/sec cadence | **B+** |
| New Collection | ? | Generic carousel, green eyebrow, no atmosphere | **D** |
| Heritage | Contemplative atelier | Panoramic image, staggered reveals, pillar scale | **A-** |
| Contact | Accessible concierge | Flat panels, muted title, slow button | **D+** |
| Footer | Quiet confidence | Near-invisible type, grid misalignment | **C-** |

The mood arc is: cinematic → editorial → utilitarian → dramatic → generic → contemplative → transactional → forgotten.

**Luxury expectation:** A luxury brand should sustain atmospheric presence all the way through the footer. The exit experience is part of the perception. Currently, the user experiences genuine luxury in the top 40% of the site, then encounters flatness, then regains beauty in heritage, then exits into fog.

### Green Eyebrow in New Collection
`color: #3A8C5C` (forest green) is the single most jarring color on the site. It is botanically green against a site built on warm amber-gold and near-black. This likely originated from a "Just Arrived" badge system or was a prototype color never cleaned up.

**Context:** Every other eyebrow on the site uses either:
- `var(--txt2)` — the secondary muted gold (C8A878)
- `var(--gold)` — the core brand gold (C88C2C)
- `--gold-xl` — the brightest gold (F2CA78)

The green breaks this completely.

**Recommendation:** Replace with `var(--txt2)` (muted warm) or `var(--gold)` (brand warm), depending on whether New Collection should feel like a quiet editorial feature or a bold announcement.

### Glow Balance
The radial glow language is actually well-calibrated in isolation:
- Hero `::before`: `radial-gradient(circle at 30% 50%, rgba(196,136,44,0.08), transparent 65%)` 
- WHY LUVZ `::before`: `radial-gradient(circle at 30% 50%, rgba(196,136,44,0.07), transparent 65%)`
- Heritage: `radial-gradient(circle at 50% 30%, rgba(196,136,44,0.08), transparent 60%)`
- Contact: `radial-gradient(circle at 50% 30%, rgba(196,136,44,0.06), transparent 60%)`

Glow intensities are consistent (0.06–0.08 range) and tasteful. They create a warm presence without feeling garish.

**Issue is not overuse but structural:** The sections that need atmosphere most (New Collection, Contact) have no glow at all, creating a cold contrast against the warmer neighbors. New Collection at 0% glow vs. Heritage at 0.08% glow reads like a different site.

**Recommendation:** Add `radial-gradient(circle at 50% 30%, rgba(196,136,44, 0.06), transparent 60%)` to `#new-collection::before` to bring it into the atmospheric family.

---

## 6. Layout Rhythm

### Spacing Cadence Breaks
The spacing system is almost correct. Most sections use `clamp(64px, 10vw, 120px)` padding-top and bottom — a generous, consistent scale. But three sections break the cadence:

**Heritage:** Uses `clamp(40px, 6vw, 72px)` — notably tighter than neighbors. Creates a compression that interrupts the breathing rhythm between New Collection and the footer. The heritage section earns its spaciousness as a moment of breath, but the tighter padding feels like cost-cutting rather than editorial choice.

**Categories:** Uses hardcoded `64px 0 72px` — note the `0` horizontal padding. This exposes edge-to-edge tiles (`gap: 7px`) against the padded sections on either side (24px side padding), which feels like a different site. The 7px gap also appears odd/accidental (baseline grid is 8px elsewhere).

**Footer grid:** Uses `60px 56px 0` — the 56px x-padding is wider than most sections' 24px, causing a visual indent mismatch. The footer content appears indented differently than body sections.

**Recommendation:** 
- Standardize all section padding to `clamp(64px, 10vw, 100px) clamp(20px, 6vw, 32px)` (top/bottom and left/right)
- Standardize gap values to 16px (8px baseline × 2)
- Make padding decisions intentional (not inherited/defaulted)

### Density Transitions
The site moves abruptly between high-density (categories bento, product carousels) and low-density (heritage, contact). There's no gentle density gradient — the user goes from a 7px-gap tile mosaic directly into a single large image panorama.

This shock contrast works visually (the heritage section earns its spaciousness as a moment of breath), but the categories-to-top-sellers transition is unclear — two sequential high-density sections with the same carousel mechanism but vastly different visual languages (flat bento vs. 3D vault).

**Luxury principle:** A boutique experience uses density shifts as breathing moments. But the shifts should feel intentional, not arbitrary.

### Max-Width Coordination
Section max-widths are uncoordinated:
- WHY LUVZ `.why-editorial-split`: `max-width: 960px`
- Contact `.contact-asymmetric`: `max-width: 1060px`
- Heritage `.cinematic-body`: `max-width: 560px`
- Carousel tracks: `max-width: 1360px`

These numbers don't relate to a consistent column system. A luxury brand benefits from one clear content column width used consistently across all editorial sections.

**Recommendation:** Establish a primary content column width (960–1000px) for all editorial sections (WHY LUVZ, Heritage, Contact). Carousel sections can break out wider (1100–1360px) as showcase moments.

---

## 7. Interaction Consistency

### Hover Feedback Hierarchy
Three distinct hover intensities exist on the site:

**Heavy (product cards):**
- `translateY(-6px)` movement
- Prism border animation
- Image scale 1.05
- Shadow upgrade from `var(--sh)` to `var(--sh-h)`  
- **Signal:** "This object is worth touching and owning"

**Light (categories):**
- `translateY(-1.5px)` movement  
- Image scale 1.025
- Glass panel darkening
- **Signal:** "This is interactive"
- **Problem:** Movement is barely perceptible at this viewport scale — reads as a CSS bug

**None (footer links):**
- Color change only (to `var(--gold)`)
- No movement, no elevation
- **Signal:** "This is clickable but I'm not important"

The gradient from cards → categories → footer links is correct in principle (importance decreases, feedback decreases). But the category hover delta is too small — it reads as unfinished rather than intentional restraint.

**Recommendation:** Increase category tile hover feedback:
- `translateY(-3px)` (double current, still subtle)
- Add a quick gold border flash on hover (instant, not slow)

### Transition Timing Register
| Element | Current duration | Issue |
|---|---|---|
| Product card hover | 0.35–0.4s | Appropriate — medium weight |
| Category tile | 0.5s | Slightly slow, but acceptable |
| Nav links | 0.28s | Fast — high-priority feedback |
| Ghost buttons (contact) | **0.6s** | **Too slow — feels unresponsive** |
| Heritage image hover | 1.2s | Intentional — editorial, not urgent |
| Footer links | 0.3s | Fast — secondary |

The 0.6s ghost button transition is the most egregious outlier. It makes the primary call to action in the contact section feel sluggish and unresponsive. This is the **only interactive element** on the site that breaks the hover register convention (0.28–0.4s).

**Recommendation:** Change `.contact-ghost-btn` transition from `all 0.6s ease` to `all 0.35s ease` to match product card hover register.

### Prism Card Border — Touch Event
The touch-triggered prism animation (`.prism-active` class added for exactly `1800ms` on card `touchstart`) is a strong luxury interaction signal on mobile — it rewards attention with a slow, ornate light sweep.

**Issue:** At 1800ms it outlasts the typical finger-down-and-release interaction. The user may have already scrolled past the card before the animation completes, creating orphaned glow effects as the page scrolls. The visual reward is disconnected from the user action.

**Emotional read:** The gesture feels lost.

### Vault Auto-Rotation Mechanics
The vault auto-rotation at 18°/sec (full rotation ~20 seconds) is appropriately unhurried. The 2.2s idle resume after user interaction respects the user's browsing without immediately reclaiming motion. 

**Why this works:** The vault's temporal restraint matches a luxury retail experience — the objects rotate on their own schedule, not demanding immediate engagement. This is the site's strongest interaction restraint decision.

---

## 8. Imagery Review

### Hero Image
The hero image at full-bleed with `scale(1.04)` + CSS `lcImageFloat` animation (7s, `ease-in-out`) creates a breathing, living quality. The `object-position: center top` suggests a portrait or face crop — appropriate for jewelry, where the piece is shown on skin or in lifestyle context.

**Why this works:** The breathing animation (float ±9px vertically) is subtle enough that the user might not consciously notice it, but it signals "this image is alive, not static." The 1.04× scale prevents the image from feeling pinched or small. The center-top crop keeps faces/skin visible.

**Grade:** A

### Heritage Image
The heritage section uses `src="images/hero_image.png"` — **the same image as the hero**.

This is the most significant missed editorial opportunity on the site. The Heritage section explicitly invokes craft, tradition, and atelier provenance. It should carry a *different* visual register — an artisan's hands, silver in process, a workshop detail, or a completely different atmospheric angle of the hero piece.

Using the same hero image dilutes both moments:
1. The Hero loses its uniqueness (it's recycled for another section)
2. Heritage loses its authenticity (we don't believe this is the brand's craft story if it's the same photo)

**Recommendation:** Commission a separate heritage image. The narrative requires it.

**Grade:** C-

### Category Tiles
The bento grid mixes portrait (necklace, bangles) and landscape-leaning tiles with images at very different focal crops. The editorial challenge of a bento grid is that each tile must carry visual weight proportional to its grid real estate.

If the necklace (largest tile, row-spanning 2) has a weak crop, the entire grid loses its anchor. The tile aspect ratios force images into different frames — consistency of **crop intent** matters more than consistency of image dimensions.

**Current problem:** At 7px gaps and compressed label scale (8px eyebrow, 12px name), the individual image qualities matter less than overall grid density. The grid feels like a navigation checklist, not an editorial gallery.

**Grade:** C

### Product Cards
`aspect-ratio: 1` (square) with `object-fit: cover` — this is the correct functional approach for browsing and comparison. But square-cropped jewelry on a dark background with no editorial variation reads as catalogue rather than editorial.

The luxury uplift would come from:
1. **Consistent background tone** (cream, slate, or the same warm amber as hero)
2. **Consistent cropping point** (always the same relationship between the object and frame edge)
3. **Subtle depth cues** (product edges, slight shadow, material texture)

Currently, the dark background (`--card` #221810) is neutral and appropriate, but the cropping is functional and uninspired.

**Grade:** B-

### Overall Imagery Coherence
The site doesn't have a unified photographic language:

- **Hero:** Cinematic, atmospheric, full-bleed, float animation
- **Categories:** E-commerce macro shots, compressed into tiles
- **Heritage:** Hero image recycled (breaks narrative)
- **Product cards:** Standard product photography, dark neutral background
- **Top Sellers (vault):** Same as product cards (e.g., see vault-demo.jpg)

A luxury brand needs a single visual DNA across all touchpoints — the same warmth, the same depth of field philosophy, the same tonal register, the same jewelry presentation philosophy.

**Recommendation:** Establish one photographic style guide:
- Consistent lighting (warm, not cool)
- Consistent background (dark or neutral)
- Consistent cropping (jewelry presented consistently — hand shot, closeup, full piece)
- Consistent depth of field (all at similar f-stop to create visual coherence)

**Grade:** C+

---

## 9. Mobile Luxury Review

### What Works Well

**Hero at mobile:** `clamp(2.4rem, 16vw, 4.8rem)` for the title — at 390px width this produces ~62px, which is bold and appropriately large. The spring entrance animation (`cubic-bezier(0.34, 1.56, 0.64, 1)`) still fires; the hero delivers luxury on mobile.

**WHY LUVZ stacking:** Correctly stacks to single column. The gold border shifts from vertical (desktop) to horizontal (mobile) — this is the right semantic transformation.

**Modal as bottom-sheet:** On <600px, the modal slides up with `mSlide 0.34s` animation — the slide-up gesture is a luxury signal that feels native to iOS.

**Zero particles on mobile:** Correct. The hero loses no atmosphere because the CSS `lcImageFloat` and cinematic veil layers provide sufficient depth without the canvas overhead.

**Grade:** B+

### What Fails to Deliver Luxury

**Categories on mobile:** The 2-column grid with necklace at full-width works structurally. But at 6px gap (barely changed from desktop 7px), tiles at ~148px height with labels at 8px/12px feel extremely small. The category section doesn't deliver luxury feel on mobile — it reads as a quick-navigation row, not an editorial invitation.

**Emotional read:** "This is a functional checklist, not a magazine."

**Contact section on mobile:** Single-column stack works. But the WhatsApp card and Instagram card stacked vertically with equal visual treatment creates no hierarchy. On mobile, WhatsApp should feel like the primary path — the Instagram card should be visually subordinate (smaller, lower contrast).

**Vault 3D on mobile:** The perspective experience at a narrow viewport (390px) is compromised. The depth foreshortening and angle relationships were designed for wider screens. At small scale, the 3D depth cues lose impact. The vault feels like a normal carousel, not a showcase.

**Footer on mobile:** `grid-template-columns: 1fr` stacks three columns vertically. The brand column appears first, then navigation, then contact info. But on mobile, the most useful information (WhatsApp, hours, location) is buried third. This is the reverse of what a mobile visitor needs when deciding whether to engage.

**Chat trigger hidden <768px:** This is the most consequential mobile UX gap. The AI stylist — the brand's differentiating feature (live concierge) — is invisible on mobile. The chat entry point requires finding a menu item. A luxury concierge should feel accessible on mobile, not hidden. The trigger should appear with a high-visibility approach (reduced size, but present).

**Grade:** D+

---

## 10. Prioritized Improvements

Ordered by visual impact per change complexity. **No code — direction only.**

### Critical — Breaks Brand Coherence

**1. Remove gold shimmer from all section titles except one**  
The `skWave` animation on every `.gold-text` heading simultaneously creates ambient shimmer noise rather than an accent. Reserve the animation for one chosen section (Heritage is the strongest candidate — its position in the brand narrative and contemplative mood warrant the animation). Other section titles should use `color: var(--gold)` — the color alone is sufficient. The shimmer should be a reward for the most important moment, not wallpaper.

**Impact:** Removes visual noise, clarifies hierarchy, increases perceived luxury.

---

**2. Fix the green eyebrow in New Collection**  
`color: #3A8C5C` breaks the entire color system. Replace with `var(--txt2)` (muted warm gold) or `var(--gold)` (brand warm), depending on whether New Collection should feel like a quiet editorial feature or a bold announcement. This is a one-token fix with immediate brand impact.

**Impact:** Restores color coherence, removes jarring visual break.

---

**3. Replace the hero image in Heritage**  
Using the same image for both the hero and the heritage brand story removes the emotional distinction between "entrance" and "brand depth." The heritage section explicitly invokes craft, tradition, and atelier provenance. It needs a different visual moment — artisan hands crafting, silver in process, a workshop detail, or a completely different atmospheric angle of the hero piece.

**Impact:** Strengthens brand narrative, increases perceived authenticity of craftsmanship claim.

---

### High Impact — Tonal Consistency

**4. Reduce section title weight from 900 to 700**  
Cinzel at 900 weight all-caps with 0.2em tracking is aggressive for a section heading. It competes with the hero title rather than anchoring the section. Cinzel 700 at slightly reduced tracking (0.12–0.15em instead of 0.2em) would feel more editorial and less like a banner headline. This creates a consistent weight cadence: Hero **400** (cinematic) → Section **700** (structural) → Card **600** (informational).

**Impact:** Improves typographic hierarchy, reduces aggression, increases perceived sophistication.

---

**5. Establish a clean opacity tier for body text**  
Current opacity values are ad hoc across sections (0.45–0.82). Create two clear tiers:
- **Primary body:** 75% (`--txt` color)
- **Secondary/supporting body:** 50% (muted color)

The extreme low end (40–45% in footer, 50% in contact title) should be raised to 50% minimum — anything below 50% reads as "intentionally ghosted," not deliberately quiet.

**Impact:** Improves readability, creates consistent tonal register, stops signaling "apology."

---

**6. Slow down contact ghost button transition from 0.6s to 0.35s**  
At 0.6s, the contact section's primary CTA feels unresponsive compared to every other hover effect on the site (0.28–0.4s). This is the only interactive element that breaks the established convention. Change from `all 0.6s ease` to `all 0.35s ease` to match product card hover.

**Impact:** Improves perceived responsiveness, creates interaction consistency.

---

### Medium Impact — Atmospheric Depth

**7. Add warm glow to New Collection section**  
New Collection has no atmospheric treatment — no radial glow, no texture, no warmth. It reads as a blank shelf compared to neighbors (Hero 0.08, WHY LUVZ 0.07, Heritage 0.08, Contact 0.06). Add a single `radial-gradient(circle at 50% 30%, rgba(196,136,44, 0.06), transparent 60%)` to `#new-collection::before` to bring it into the atmospheric family.

**Impact:** Increases warmth, improves section coherence, matches design system expectations.

---

**8. Increase category tile hover delta**  
`translateY(-1.5px)` at the category bento scale is imperceptible — reads as a CSS bug. Increase to `translateY(-3px)` (still subtle, but visible). Add a quick gold border flash on hover (instant, not slow) to reinforce clickability.

**Impact:** Makes categories feel responsive without breaking restraint, improves UX clarity.

---

**9. Raise contact section title opacity from 0.5 to standard**  
No other section title is muted to 0.5. The "We're Here for You" heading reads as intentionally suppressed — as though the brand is apologizing for having a contact page. Either remove the opacity entirely (use 100%), or raise it to 0.75 to match the quieter editorial register used elsewhere (why-atmo 0.65, cinematic-body 0.82).

**Impact:** Stops signaling "apology," improves call-to-action clarity.

---

### Lower Impact — Refinement

**10. Standardize section max-widths**  
Section max-widths are uncoordinated: 960px (WHY LUVZ), 1060px (Contact), 1360px (carousels). Editorial sections (WHY LUVZ, Heritage, Contact) should share a max-width around 960–1000px. Carousel sections can break out wider (1100–1360px). Standardization makes layout feel intentional, not inherited/defaulted.

**Impact:** Improves perceived coherence, suggests careful design.

---

**11. Improve footer visibility**  
Reduce footer link opacity from 45% to 55%, increase font size from 13.5px to 14px. The footer is the last impression a visitor has. At 45% opacity and 13.5px italic, links are near-invisible. This is not luxury restraint — it's abandonment. 55% opacity at 14px preserves the quiet register while remaining legible.

**Impact:** Improves UX (footer remains useful), sustains brand experience through exit.

---

**12. Differentiate New Collection layout from Top Sellers**  
New Collection and Top Sellers are visually identical sections — same sec-head pattern, same carousel mechanism, no editorial differentiation beyond heading copy. A luxury editorial site differentiates "best of" from "newest" through layout language, not just copy. Consider whether New Collection could use a different presentation: a visual strip, an editorial feature layout, a grid, or a magazine-style masonry.

**Impact:** Increases perceived editorial thoughtfulness, clarifies content hierarchy.

---

## Summary

**Visual audit complete. Twenty-three specific observations across typography, atmosphere, interaction, imagery, and mobile.**

**The site's strongest moments** (Hero, WHY LUVZ, Heritage) demonstrate genuine luxury craft. The weakest moments (New Collection, Contact, Footer) suggest rushed implementation or loss of vision.

**The path to coherence** is clear: consolidate the animation language (one shimmer, not four), fix the color break (green → gold), use consistent typography tiers (no inverted weights), and sustain atmosphere through the exit (footer).

These are not redesign prompts. They are refinements within the established visual language — removing noise, fixing inconsistencies, and pulling existing strong moments to full expression.

**Next step:** Implementation pass, starting with Critical items 1–3.

---

*Report generated: 2026-05-04*  
*Audit framework: Luxury boutique restraint (Cartier/Mejuri reference)*  
*Design system reference: DESIGN_SYSTEM.md*  
*No implementation code included.*
