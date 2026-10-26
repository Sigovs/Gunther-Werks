# CD-REVIEW: Concept D and Concept E · 25 Oct 2026

Creative-director review of the renders as they stand: `concept-d/CONCEPT-D-1440-half.jpg` + `concept-d/sections/1440/01–15`, and `concept-e/CONCEPT-E-1440-half.jpg` + `concept-e/sections/1440/01–14` + `concept-e/sections/motion/m01–m08`.
The UI systems these fixes point to are `concept-d/UI-D.md` ("Billet & Gauge") and `concept-e/UI-E.md` ("Glass & Key"). **Desktop is the master; the phone adapts it** (§5 and §6 below).

---

## 0. Verdict

Both are the strongest material this site has had. Both are below the bar, and for the same reason: **they are one page wearing two costumes, and the costume is Porsche's.**

Cover the content and look only at the chrome. In both concepts you get the same floating dark nav pill, the same black rounded cards with a square ↗ in the corner, the same white-filled active pill tab, the same rising white rounded panel, and the same heritage strip of huge years over B/W photographs. On top of that they share the same statement ("We don't sell cars. We deliver dreams."), the same key photograph, the same "Every door that closed.", the same Goodwood, the same press logos and the same news cards. Alex asked for two different examples. Today they differ mainly in where the coves are.

The fix is not polish. It is **ownership**: each device belongs to one concept (§1), and each concept is redrawn in its own UI language (UI-D, UI-E). Then the section-level faults below.

---

## 1. Splitting the two pages: who owns what

| Device / content | **D: Billet & Gauge** | **E: Glass & Key** |
|---|---|---|
| Governing idea | GW's own catalogue, set in machined parts | racing.porsche.com's skeleton, developed into studio light behind glass |
| Header | centred GW lockup (GW's own arrangement) over a scrim, orange needle on a scale | one glass bar, clear at the top, fogs on scroll |
| Model names | **GW's own logotypes** behind the cars | Instrument Sans name **etched in glass** behind the car |
| Tabs | tick scale + needle | glass track + pool of light |
| Hotspots | bezel ring, one quarter-turn, still | X key, breathes ×3, turns 45° |
| Leaders | orthogonal dimension lines with end-ticks | 45° dog-leg with a gap and a light point |
| Cards | graphite plates, chamfer 4, captions **under** photos | glass cards, captions on a **glass back inside** photos |
| Kickers / labels | **JetBrains Mono stamps** | Instrument Sans, **no mono at all** |
| Statement panel | none. The commission plate is **docked** into the photo, not rising | the rising pane, now **frosted glass** (screen 2 and Miami) |
| "We don't sell cars. We deliver dreams." | **removed from D**. D's commission opens with GW's "Bespoke by design." (/commissions) | **E only** |
| Hero line | "Gunther Werks Miami. / Built in California." | "Gunther Werks Miami. / Reengineered and remastered." |
| Heritage | **timeline scale** 2017→2026 with a needle | B/W strip that **turns to colour under the light** |
| Key photograph + "Every door that closed." | **D only** (Our story) | removed. The key lives on as the hotspot glyph, and its origin line moves to the footer mark caption |
| Goodwood | a supporting chapter: hillclimb photo + press **plates** | **the peak**: the scrubbed 4K film, 1,000 HP |
| Peak (one) | the **programs stage**: four GW coves re-lit in turn, the logotype swapping behind the car | **Goodwood** |
| Signature move | the cove re-light with GW's logotype, read through the needle | the X key opening the car (What the atelier changed) |
| Accent | GW's own `#FF4500` needle (their declared `--accent-color`, the needle in their cluster photo) | none. Light is the accent |
| Grounds | mostly dark. Light only for the Collection (GW's own light carousel) and Provenance | alternates by scene. Light panes are glass, not white cards |

If a designer finds themselves using a device from the other column, it is the wrong page.

---

## 2. Concept D: review

### 2.1 What is genuinely strong (keep it)

- **The four program screens (`02-p-f26` → `05-p-gwx`) are the best thing on either page.** GW's own coves, GW's own logotypes, the car masked so it stands in front of its name. This is brand-own: nobody else can make this frame. The colour sequence red → amber → blue → violet is the page's rhythm.
- **The GW stat block** (Bebas figure, mono unit, small label) is lifted correctly from GW's program pages.
- **The commission journey** (07–09) is the richest dealer content either page has: owner's application, 48 business hours, 993 donor to bare metal, the barrel-room dinner, the warranty cluster. The cluster photograph (`09-delivery`, right) is the single best piece of GW material on the page.
- **The owner's-application form** (`14-begin`) asks GW's real screening questions. It is the most truthful form we have shown Alex.
- **The Collection** (`06`) uses GW's own carousel logic: active car in colour, neighbours grey, logotype, badges.

### 2.2 What is junior

1. **Borrowed chrome**, as in §0: the nav pill, the white filled CTA pills (hero "BEGIN YOUR GUNTHER WERKS", form "SEND TO JAVIER ROQUE", which are exactly the "fat white pill" Alex rejected), the pill tabs, the rising white panel on 07, corner-↗ boxes on 10/12/13, the dark caption card on 10, and **glass** press cards on 11 (glass is E's).
2. **The nav pill turns mid-grey (`#6B6B6B`-ish) on every light screen** (06, 10, 12). It reads as a disabled toolbar and is the ugliest element on the page.
3. **The programs read as four identical screens**, because they are drawn as four. Logotype / car / four stats / badges + line + tabs + CTA, four times = 3,600 px of one formula. It was intended as one pinned stage. Build it as one.
4. **The bottom band of every program screen has no hierarchy.** Badges (left), the GW one-liner at 20 px (left), tabs (centre) and the CTA (right) all sit in the last 100 px at equal weight. The program's thesis ("The future of analog power.") is the smallest text on the screen.
5. **"Standard" is said twice** on each standard program: the top-right `STANDARD PROGRAMS 01 / 04` and the `STANDARD` badge.
6. **Stat labels carry sources and wrap.** "HORSEPOWER · GW RELEASE, 15 AUG 2025" breaks into two ragged lines under 1,000 and 440. The date must stay in the render (provenance), but in a footnote, not in the label.
7. **4.0 Liter appears four times** (F-26, Turbo, GWX, and the build screen 08). A repeated figure stops being evidence.
8. **Vertical rhythm is cramped at both ends.** Kickers sit at y = 104, only 44 px below the nav. Content ends 32 px above the screen bottom on 07, 08, 12 and 13, against an 80 px side gutter. Screens feel jammed into 900 px rather than composed in it.
9. **Two numbering systems for the same steps** on 07: the 01–06 rail (top right) and the big Bebas 01 / 02 / 03 below it. 08 and 09 repeat the rail.
10. **Crops.** Provenance (`12`): Rubystone and Phoenix are cut at the card's left edge through the nose. Collection (`06`): the left neighbour is cut mid-door. The Turbo script logotype (`03`) starts about 18 px under the nav band.
11. **Logotype brightness.** On GWR (`04`) the pure-white logotype is brighter than the cyan car, so the car loses dominance to its own name.
12. **Copy.** "Shown in Miami." is invented: it is in no GW source. Statements must be GW's words (feedback log).
13. **The form** has a pill cluster: 11 radio pills across 3 rows. "Registration state" is a text input. **There is no consent checkbox.** There are no loading, error or success states. The contact plate behind Javier's details is a red **gradient**, which reads as a gradient button.
14. **The Our story screen (`10`)** repeats the Porsche/E heritage device (B/W years) and puts a dark caption card with ↗ on the key photograph.

### 2.3 Fixes by section

| # | Section (file) | Fix | P |
|---|---|---|---|
| 0 | Header (all) | UI-D §5: centred GW lockup, links over `--scrim-d/-l`, needle on a scale groove, Begin as the stroke-draw secondary. Kills the grey pill on light screens | **P1** |
| 1 | Hero (`01-top`) | H1 "Gunther Werks Miami." + "Built in California." (GW's words). **Delete "Shown in Miami."** The primary becomes the billet button (40 px, chamfer 4), the secondary stroke-draw. Kicker in mono stamp. Bottom caption row in stamps, 14 px | **P1** |
| 2 | Programs (`02`–`05`) | **One pinned stage**, 4 states × 100vh (desktop). The cove re-lights (900 ms), the logotype swaps, the car cross-fades at the same ground line, the needle travels, the odometer rolls `01 → 02 / 04` | **P1** |
| 2a | Programs: bottom band | The program line moves up to `title` 28 px, left, **above** the badges. Tabs = tick switcher centred. CTA right on the switcher's baseline. One "Standard" only: drop the top-right `STANDARD PROGRAMS` label and keep the odometer `01 / 04` there | **P1** |
| 2b | Programs: stats | Labels one line ≤ 28 characters. Sources to a single stamp footnote under the row. Stat figures at `fig-xl` 72. Replace the third "4.0" on the build screen with a different sourced figure, or drop it | P2 |
| 2c | Programs: logotypes | Logotype at 82–86% white so the car is always the brightest mass. Turbo script ≥ 40 px clear of the header band (scale it to 92% or lower it). Check that each logotype is crossed by the roofline **once**, not by a mirror or wing tip (GWX wing tip vs the X) | P2 |
| 3 | Collection (`06`) | Remove the top-right `Special edition 4 / Legacy 2` toggle: the thumbnail row *is* the switcher (UI-D §7.4). Neighbours peek with their **nose or tail only** (≥ 35% of the car or none). The centred stack (logotype, 2 badges, line, link) shrinks: badges in one row with the line, link last | P2 |
| 4 | Commission 01–03 (`07`) | Replace the rising white panel with the **docked graphite plate** (flush to the left gutter and the screen bottom, `--r-3`, cut into the photo). Statement "Bespoke by design." (GW /commissions). **One** numbering system: the step scale. Remove the big 01/02/03 and the three pill chips; their facts ("48 business hours", "Four active programs") become `stamp` lines inside each step | **P1** |
| 5 | Build (`08`) | Six frames: radius 2, captions **under** the frames (index stamp + name), no gradient overlay. Swap "Customization"'s stock-looking tablet frame for a GW craft frame (`craft-*`). Stats: 90%+ in-house + 993 only | P2 |
| 6 | Delivery (`09`) | Keep. Badges become stamps. Body measure ≤ 60ch (the right column runs 64+). The cluster photo is the best GW asset on the page: give it 7 of 12 columns, not 5.5 | P2 |
| 7 | Our story (`10`) | **Timeline scale** (UI-D §7.6) instead of six year-cards. Key photo radius 2, caption under it (stamp). No caption card, no ↗ | **P1** |
| 8 | On track (`11`) | Press cards become satin **plates** (UI-D §7.10 press variant), not glass. Robb Report and Top Gear appear again in News 13: show them once (keep them here, drop them from the news grid, or the reverse) | P2 |
| 9 | Provenance (`12`) | Re-crop every card with an explicit `object-position` so the full nose is in frame (Rubystone `68% 60%`, Phoenix `62% 60%` as a start, then check). Captions under photos. Spec line in stamp. No ↗ boxes | **P1** (crops) |
| 10 | News (`13`) | Image cards per UI-D §7.10. Tags as stamps, not pill chips. Content ends ≥ 80 px above the bottom | P2 |
| 11 | Begin (`14`) | UI-D §7.11: grooved fields, **ordinal detent scale** for track experience, nominal radios as dots, Registration state as a select, **consent checkbox**, billet submit, loading / timeout / error / success. The contact plate is satin graphite (the red stays in the photograph) | **P1** |
| 12 | Footer (`15`) | Grooves between the columns and the legal bar. The X mark at 160 px, `--graphite-2` on `--ink`, anchored to the tagline's baseline instead of floating mid-right. Optional: GW's footer tagline rotates (PLEASURE / INNOVATION); D may roll the last word once on a drum when the footer enters (UI-D odometer), then rest on "pleasure." | P3 |
| 13 | All screens: rhythm | First line at `--hdr + 64` (136 at 1440). Content ends ≥ 80 px above the screen bottom (≥ 112 at 1920). Internal < group < section spacing per UI-D §3.5 | **P1** |
| 14 | All: type floor | Badges, stamps, stat labels and dates at **14 px** minimum (several are 12–13 now) | **P1** |

### 2.4 Phone: recomposition of D's key sections (faithful to the desktop)

| Section | At 390 / 430 (768 in brackets) |
|---|---|
| Header | `Menu` · lockup (wordmark 132) · `Begin`. Scrim 112 px. Menu = the top-down graphite sheet with bottom-weighted links (UI-D §6) |
| Hero | The Thermal frame re-cropped so the **whole car** sits in the lower 55%, `object-position: 62% 70%`. H1 34 px, top. Buttons stacked, primary full width. The caption row becomes one stamp line |
| Programs stage | **The one phone pin**, 4 × 70svh. Logotype full width minus gutters, the car at 100vw − 16 standing in front of it (the same overlap as desktop). Stats as a 2×2 grid with grooves. Program line `title` 22. Tick switcher docked bottom in the thumb zone. A swipe on the stage also steps it (768: the stats stay in one row) |
| Program details | Bezels on the photo (36 / 44). The selected plate becomes the **bottom drawer** with a vertical dimension line. Details as a full-screen sheet from the bottom |
| Collection | Active car full width + logotype + line. The thumbnails become a scale scrolling under a fixed centre needle. Neighbour peeks are kept (≥ 35% visible) |
| Commission | The photo becomes a 4:3 header. The docked plate sits **under** it (flush full width). Steps stack against a **vertical** step scale. Build frames = a snap strip of 6 (78vw) + odometer. Delivery and ownership stack |
| Our story | Key photo full width. The timeline scale scrolls under a fixed needle. The milestone panel stacks above it |
| On track | Photo crop on the car (`object-position: 70% 55%`). Statement over the bottom scrim. Press plates = snap strip |
| Provenance / News | Lead full width. Others as snap strips (82vw / 80vw) with odometers |
| Begin | Photo 4:3 + contact plate under it. Form single column. The ordinal scale goes **vertical**. Submit full width 44 |
| Footer | Tagline 48 px. Link columns 2-up. Legal bar stacked |

### 2.5 The bar for "done": what makes D a 9/10 for Alex

- **Rich use of GW material:** every model is presented in GW's own cove with GW's own logotype; the cluster, the billet key, the barrel room and the craft frames are used at a size that respects them; nothing generic or stock-looking is left (the tablet frame goes).
- **Wow with taste:** one peak. The programs stage re-lights its cove and swaps the logotype behind a car that does not move, with the needle as the only moving UI. Nothing else on the page competes with it.
- **Motion that means something:** every movement is a part being set (needle, bezel, detent, shutter, stroke-draw). No fade-ups. No count-ups.
- **Luxury, not cheerful:** no pills, no white blobs, no grey toolbar. Rhythm with air at the top *and* the bottom of each screen. Statements in GW's words only.
- **Brand-own UI:** at thumbnail size you can tell it is D by the mono stamps, the grooves and the orange needle, and nobody would say "Porsche".
- **Truthful and usable:** every figure carries its source in the render, crops are intentional at 1920 / 1440 / 1024 / 768 / 390, the form has all its states, and keyboard and touch both work.

---

## 3. Concept E: review

### 3.1 What is genuinely strong (keep it)

- **The hero (`01-hero`)**: the orange Turbo head-on in the Huntington Beach atelier, symmetrical through the glazed door. It is real, specific, and the best first screen of the two.
- **"What the atelier changed" (`06`, `m06`)** is the best product-understanding moment either page has. The idea, the sourced facts (Flachbau tribute, in-house carbon, Robb Report's 250%, the dated 1,000 hp) and the per-model change sets are all right. It only needs its own UI.
- **The night showroom (`04`, `m05`)** is an original device grown from Alex's image. It shows ten programs and their scarcity in one glance.
- **Goodwood (`08`)**, with flames at the START line, a marshal for scale and 1,000 HP in Bebas, is the right peak.
- **The road (`11`)** "Designed for pleasure." is the right release before the close.
- **The Program sheet (`m08`)** is informative and correctly sourced.

### 3.2 What is junior

1. **Porsche chrome everywhere**, exactly what Alex called out: the nav pill + separate right pill, black caption cards with ↗ squares (03, 06, 10, 12), white dot hotspots with halos, white filled active pills, the rising **white** panels (02, 13), dots + square arrow pagers (03), the eye icon (06).
2. **The nav pill goes mid-grey on light screens** (03, 10, footer), as in D.
3. **Screen 2 is a 900 px white void with seven words in it.** In `02-statement-panel` the panel also ends at y = 540 with the hero hard-cut behind it (captured mid-transition). Even as designed, a white card is a wall, not a scene.
4. **Two identical studio screens.** 05 (F-26, warm cove) and 07 (GXR-EVO, red cove) are the same layout, and 07's cove is a flat CSS red gradient that looks cheap next to GW's photographed coves.
5. **The studio itself:** the floor "reflection" is a flipped cutout at low opacity with sharp wheels (physically wrong, reads fake). The ghost "F-26" behind the car is a grey watermark, not a design element. Info sits top-left, the CTA top-right and the tabs bottom-centre: three corners, so the eye ping-pongs.
6. **Showroom:** the spotlight is a **hard-edged polygon**, and it passes behind the headline "One commission at a time." Car names are letterspaced to about .3em ("F - 2 6", "E N D  G A M E"), which breaks the names. The GXR-red rail is red used as UI.
7. **Six display sizes** (56 / 72 / 32 / 64 / 44 / 72), so there is no type scale. **The gutter is 48 px** at 1440, which reads like a template at this width.
8. **Heritage (`03`)** is the most literal Porsche copy on the page. The orphan line "Every door that closed." + paragraph under the strip competes with the section title: two statements on one screen.
9. **Hero:** the kicker "THE OFFICIAL GUNTHER WERKS DEALER · PRESTIGE IMPORTS" runs into the car's front-left corner (around x 445–500). Text stuck to the object.
10. **Commission (`09`):** a centred title and tabs over left-aligned cards (alignment break), a dark text card on a dark ground (box in a box), and the key box photo small and unexplained.
11. **Goodwood:** the 1,000 hp source is bottom-left, about 800 px from the figure. The film transport shows build timecodes ("Film · 0:02.75 — 0:08.50").
12. **Road → News (`11`, `12`):** the news cards peek 50 px into the bottom of the road frame, so the release frame looks unfinished. The cards are staggered (every second card dropped), which is Porsche's rhythm.
13. **Miami (`13`):** a grey form box inside a white panel over a dark scene (box in box in scene). A default native select chevron. The key photograph is reused again. **There is no Miami image**: the scene behind the panel is an anonymous dark frame.

### 3.3 Fixes by section

| # | Section (file) | Fix | P |
|---|---|---|---|
| 0 | Header (all) | UI-E §5: one glass bar, clear at the top and fogging on scroll, milk over light screens, pool of light on the current link. Kills the grey pill | **P1** |
| 1 | Hero (`01`) | Shorten the kicker to "Official Gunther Werks dealer" (the Prestige name is in the header and footer), max-width ending at x ≤ 420. Secondary = clear capsule, link = hairline arrow. The caption stays | P2 |
| 2 | Statement (`02`) | The **milk glass pane** rises over the sticky hero (UI-E §8). The hero stays visible, blurred, through it, and the words focus from blur. Fixes the void and is E's signature material at first contact | **P1** |
| 3 | Heritage (`03`) | UI-E §7.9 heritage variant: B/W → colour under the light, the year on the glass caption, the light-track pager, glass discs. **Remove** "Every door that closed." + paragraph (the key origin goes to the footer caption) | **P1** |
| 4 | Showroom (`04`) | Feathered volumetric cone (UI-E §7.10) that **starts below the headline** or with the headline moved clear of it. Names tracked ≤ .06em. The rail becomes a light segment. Check the legacy row: two cars + a paragraph is fine, but make the paragraph `body-l`, aligned to the car row's baseline | **P1** |
| 5 | Studio + Special editions (`05`, `07`) | **Merge into one stage** with a grouped track: `F-26 · Turbo · GWR · GWX │ GXR-EVO · Brundle · Thermal · End Game │ Explore details`. The cove hue tweens to GW's **photographed** red cove for special editions (use GW's red-rim frame, not a CSS gradient). Saves 100vh and removes the repeat | **P1** |
| 5a | Studio: the frame | Etched-glass name (UI-E §7.14). Reflection: a real one from GW's photo, or a soft contact shadow + a blurred 6% reflection that fades by 40 px. Never a sharp flipped cutout. Program info and CTA together in the left column (CTA as a go-link under the line), track bottom-centre: two zones, not three | P2 |
| 6 | Atelier (`06`) | Keys (solid disc with slots), dog-leg leaders with a gap, glass cards, `+ / −` glyphs, the "View the car" text toggle (UI-E §7.5–7.7). Robb Report attribution in the Chassis card's expanded source line | **P1** |
| 6b | Program sheet (`m08`) | Glass panes, close disc with a bare × + "Close", spec rows with light hairlines. Remove the dark-square ↗ on Latest news (the title is the link) | P2 |
| 7 | Goodwood (`08`) | The source sits under "1,000 HP" ("Power: Gunther Werks F-26 release, 15 Aug 2025"). The transport becomes a glass capsule labelled "Goodwood Festival of Speed · from the start line", **no timecodes**. The figure lights (opacity), it does not count | P2 |
| 8 | Commission (`09`) | Head and tabs **left-aligned** to the cards' grid (or the cards centred under them: one axis). The text card becomes a glass back on the dinner photo (no dark box). The key box image becomes the Ownership stage's image | P2 |
| 9 | Provenance (`10`) | Walk-around control = glass capsule + light track. Caption labels as glass backs. No ↗ boxes | P2 |
| 10 | Road → News (`11`, `12`) | The road frame resolves on its own: News starts **after** it, or overlaps by the full header height (≥ 160 px) so the overlap reads as a decision. Remove the stagger: one baseline | P2 |
| 11 | Miami (`13`) | The **milk glass pane** returns (the page closes with the gesture it opened with). The form sits directly on the pane: no grey inner box. The intent becomes a glass track. A custom chevron. Key photo removed. **The scene behind needs a real image** (see §7) | **P1** |
| 12 | Footer (`14`) | Plain type on `--night`, no glass. The X key at 64 px with GW's line "The company key was designed in an 'X' pattern — a symbol of every door that closed." | P3 |
| 13 | All: type and grid | Three display sizes only (88 / 56 / 32 + figures). Gutter 72 at 1440 / 96 at 1920. First line at bar + inset + 56. Content ends ≥ 72 above the bottom | **P1** |

### 3.4 Phone: recomposition of E's key sections (faithful to the desktop)

| Section | At 390 / 430 (768 in brackets) |
|---|---|
| Header | Glass bar inset 8, 52 tall: wordmark + Menu. Enquire moves into the bottom glass menu sheet (768: Enquire + Menu in the bar) |
| Hero | Head-on Turbo, `object-position: 50% 62%`, the car centred at about 80vw. H1 32 px on the floor reflection. Secondary full width + the go-link under it |
| Statement pane | A sticky hero with the milk pane **scrolling over it** (no pin). Statement 40 px, sharp from the start |
| Heritage | Snap strip 84vw. The centred card is lit (colour). Light track + counter |
| Showroom | 2-column grid. Tap 1 lights a car and shows its line under the grid; the **View** go-link enters the studio |
| Studio | Car at 100vw − 16. Etched name behind it at about 180 px. The grouped track docked bottom, scrolling inside itself |
| Atelier | Side view full width. Keys on the photo (40 / 44). The selected card is a **bottom sheet** with a plumb leader to it. Swipe = next key. Under reduced motion: a list of cards below the photo |
| Program sheet | Full-height bottom sheet. Panes stacked (info → film → Begin → news) |
| Goodwood | **The one phone scrub:** 48 frames at 750 w, pinned 120svh, 1,000 HP at 112 px bottom-right, source under it |
| Commission | Track at the top of the section, tapped (not scroll-driven). Cards stacked |
| Provenance | Walk-around full width, drag to turn (`touch-action: pan-y`), light-track angle meter. Cards as a snap strip |
| Road / News | Statement 40 px over the sky. News snap strip 84vw, one baseline |
| Miami | The milk pane full width minus 16. Form single column. Submit 48 full width |

### 3.5 The bar for "done": what makes E a 9/10 for Alex

- **Rich use of GW material:** GW's real atelier, real coves (no CSS gradients standing in for a cove), the real Goodwood film scrubbed as the peak, the real F-26 photograph under the keys, and a real Miami image at the close.
- **Wow with taste:** one peak (Goodwood) and one signature (the X key opening the car). The glass is the medium, not the show: it appears only over photographs, and the cars are always brighter than the glass.
- **Motion that means something:** glass fogs when you leave the hero, words focus inside the pane, light finds the chosen car, the key turns to open a part, and the past regains its colour. No slide-ins, no bounce.
- **Luxury, not cheerful:** no white pills, no red UI, no white void, no stagger. One type scale, editorial gutters, air.
- **Brand-own UI:** nobody looking at it says "Porsche". The skeleton is still one scene per screen with one light sentence, and every component is GW's (the key, the studio light, the atelier glass).
- **Truthful and usable:** contrast on glass is measured per placement, crops are intentional at every width, the form has its states, and keyboard and touch both work.

---

## 4. Copy and provenance flags (both pages)

| Line | Status | Action |
|---|---|---|
| "Shown in Miami." (D hero) | **Not in any GW source.** Invented | delete |
| "One commission at a time." (E showroom) | GW home ✓ | keep |
| "An experience unlike any other." (D 09) | GW ownership / home ✓ | keep |
| "Every step, from initial inquiry to delivery day." (E 09) | GW Our story ✓ | keep |
| "Up the legendary hillclimb." (D 11) | GW newsroom, Goodwood 2026 ✓ | keep |
| "Built in California." | GW Our story / Ownership ✓ | D hero |
| "Bespoke by design." | GW /commissions ✓ | D commission statement |
| "250% stiffer than the 993's" (E atelier) | Robb Report ("250 percent stiffer than the original 993's") ✓ | attribute in the card's source line |
| 1,000 hp | GW F-26 release, 15 Aug 2025 ✓ | the date sits **beside** the figure on both pages |
| Press logos (Robb Report, Top Gear, Road & Track) | GW uses them on its own newsroom | see §7 |

---

## 5. Order of work for the two designers

The order is: chrome first (one component file per concept, from UI-D / UI-E), then the structural P1s, then P2.
Do not polish a section before its components exist, or it will be polished twice.
**D:** header → switcher + odometer → programs stage → commission plate + step scale → timeline → form → rhythm and crops pass.
**E:** glass recipe + header → key / leader / card → tracks → statement and Miami panes → heritage → studio merge → showroom cone → type and grid pass.

---

## 6. Phone: the general rule

Alex: "the desktop is right — we fit the mobile to it." The phone keeps every section, every component and every moment of the desktop, re-scaled and re-stacked. Touch replaces hover (first tap reveals, a visible go-link navigates). Controls dock in the thumb zone. Targets are ≥ 44. **One** pin per page on the phone (D: the programs stage; E: Goodwood). Parallax is off. The per-section tables are in §2.4 and §3.4, and the per-component rules are in UI-D §10 and UI-E §10.

---

## 7. For Alex

1. **E needs a Miami image.** There is no photograph of Prestige Imports, Biscayne Blvd or Miami anywhere in our sources. The Miami pane currently floats over an anonymous dark frame. Either supply a real Prestige showroom or Miami photo, or the close sits over a GW scene (the warm cove or the atelier) and says "Miami" only in words. Both pages would benefit; E depends on it.
2. **Press logos on a dealer site.** Both pages show Robb Report, Top Gear and Road & Track marks. GW shows them on its own newsroom. Whether a dealer may reuse the marks is a rights question we cannot answer from the research. The fallback is the publication's name in type, which is already legible in both systems.

Judgment calls already made (they are art direction, not questions):
- D's only colour is GW's own `#FF4500` needle (their declared accent and the needle in their cluster photo). If it reads loud in the build, the fallback is a white needle, at the cost of losing the gauge reference.
- E's special editions merge into the programs studio.
- "We don't sell cars. We deliver dreams." stays in E only. D's commission opens with "Bespoke by design."
- The key photograph and "Every door that closed." stay in D only.
