# CONCEPT E — Gunther Werks Miami home page (25 Oct 2026)

**Brief (Alex):** "racing.porsche.com — if we swap in our data and add a couple of sections we need (models, history, news) — something could come out of it." Plus: the best of drafts A/B/C and a motion layer.

**The idea in one sentence:** racing.porsche.com's skeleton (one scene per screen, one light sentence, tiny interface, huge imagery, rounded panels rising over photographs), filled with Gunther Werks' own words, cars and light, and given the dealer chapters a buyer needs: the collection, the commission, Provenance Succession, news and Miami.

## Status: working prototype in "Glass & Key" (25 Oct 2026, evening)

`index.html` is now the **working prototype**, built to `UI-E.md` and `../CD-REVIEW.md`. Run it with `python -m http.server 8797` in this folder and open http://localhost:8797/. The static concept images from the afternoon (`CONCEPT-E-1440/1920.png`, `sections/1440|1920/`) are kept as history; they show the earlier, Porsche-styled chrome. New full-page statics of the build: `_shots/build/full-1440|1920|390.png` (+ `-half.jpg`).

- **Stack:** GSAP 3.13 + ScrollTrigger + Lenis 1.3, copied into `vendor/`; vanilla JS in `e.js`. GSAP is the lowest sufficient method because the page pins and scrubs to scroll and runs interruptible tab states on shared timelines.
- **Modes:** `?full` gives a static full page. `?state=blur|sil|dark|sheet` gives the motion-state frames. With `prefers-reduced-motion`, nothing is pinned or scrubbed and Lenis is off; every state still works by click and keyboard.
- **Components (UI-E):**
  - one glass header bar: clear over the hero, fogging after 24 px, milk over light screens, with a pool of light under the current section;
  - X-key hotspots (a solid disc with four slots; it turns 45° into a "+");
  - dog-leg leaders with a gap at the key and a light point at the card;
  - smoke and milk glass cards with a lit top edge; the open card has an iris-reveal photo and a −/+ glyph;
  - tab tracks with a sliding pool of light;
  - hairline go-links;
  - a light track (hairline plus a 48 px light segment) for every pager;
  - lamps instead of chips;
  - a lit-glass primary button, where a pool of light follows the pointer;
  - a frosted milk pane for the statement and for Miami;
  - a bottom glass menu sheet at ≤1279 px.
- **No mono** anywhere. Three display sizes (88 / 56 / 32) plus Bebas figures. Gutter 72 at 1440 and 96 at 1920. The 14 px floor holds at every width.
- **Removed (they belong to D, per CD-REVIEW §1):** the key photograph and the "Every door that closed." line. The key's origin quote now sits beside the footer's X mark.
- **Merged:** Special editions now live in the Studio, as one grouped track: `F-26 · Turbo · GWR · GWX │ GXR-EVO · Brundle · Thermal · End Game │ Explore details`.
- **Coves are GW photographs:** each program's cove is GW's own studio photograph with the car painted out and the plate heavily blurred (`assets/cove-*.jpg`). They replace the CSS gradients. The program name behind the car is etched into that plate (background-clip text) and sized so it never runs into the program text.
- **Showroom: "haze, not spotlight"** (Alex's override, which replaces UI-E §7.10's cone):
  - animated film grain;
  - a soft silver haze that blooms behind the hovered or selected car;
  - colour that returns through a pointer-tracked feathered mask (on focus or tap, the whole car turns to colour);
  - a faint reflection;
  - neighbouring cars recede;
  - a light segment on the rail.
- **Miami scene:** the GW HQ showroom lobby (lifestyle-08), with the Prestige address on the milk pane. There is no fake Miami image.

### Motion as built

| Screen | Trigger | What happens |
|---|---|---|
| Hero | load | The photo settles from 1.06 to 1. The H1 lines clear from their masks (1.1 s expo). |
| Hero → statement | pin, scroll | The hero holds while the milk pane rises over it. The hero photo drifts −5%. |
| Statement | pin 80vh, scrub (desktop) | The words focus from blur 12→0 and #b9b4ae→ink, one after another. Phone: the words are sharp and there is no pin. |
| Heritage | pin, horizontal scrub (desktop) | The strip travels. Inside each glass caption the year runs ±28 px against the photo's ±4% parallax. The card nearest the reading line turns from B/W to colour. The light track and counter follow, and the discs step. Phone: a native snap strip, where the centred card is lit. |
| Showroom | once at 55%, then hover / focus / tap | The haze passes through all ten cars (160 ms steps) and settles on the F-26. Hover adds the haze and the torch colour reveal; the rest recede. Click (or the View link) starts the FLIP roll-forward: a ghost cutout flies to the atelier photo while Lenis scrolls there (0.9 s expo.inOut), then the keys and leaders draw. |
| Studio | held 160vh (desktop), the atelier slides over it as a full pane | The car starts **rim-lit**, not black: a thin light edge traces the roof, wing and arches, and the glow widens from 4 to 16 px. It is fully lit by 0.4vh, a quarter of the hold. The cove bloom grows .2→1. Tabs change the car with the camera fixed: a cove photo and car crossfade (1.2 s glass ease), the program text fades and re-sets, and the pool slides (560 ms expo). |
| Atelier | slides over the studio; held while Goodwood slides over it; enter / hover / click | The keys scale in (stagger 60 ms), the leaders draw (560 ms) and their light points appear, and the keys breathe three times. Hovering or focusing a key turns it 45°. Clicking opens a card: the iris reveals the photo, other cards drop to 74% and keys to 55%. "View the car" hides the UI. Tabs re-light the stage for each model's own changes. Cards are clamped clear of the gutters and of the heading. Phone and tablet: a glass bottom sheet; swiping it moves to the next or previous key. |
| Program sheet | "Explore the F-26" | The stage dims and blurs (veil). Panes stagger in: left x −24, then 80 ms each. Esc, Close or the veil closes it (400 ms). Focus is trapped, the page is inert, and focus returns to the trigger. The film loops muted. |
| Goodwood (the peak) | held 180vh (phone 120vh), scrub; slides over the held atelier; the commission then slides over the held film, so no caption lingers under the header | A canvas plays 115 frames (phone: 48 frames at 750 px, portrait crop that follows the car) of 0:02.75–0:08.50. Captions are keyed to film seconds: kicker at 3.0 s, 1,000 HP and its source at 6.6 s, the line at 7.6 s. The transport is a glass capsule with play/pause and a light track. There are no timecodes in the copy. |
| Commission | pin 200vh (desktop) | Scroll steps the five stages: the pool moves, the photo crossfades, the glass caption re-sets. Tabs are clickable at every width. |
| Provenance | pin 90vh (desktop) + drag / arrow keys / discs | The walk-around steps with scroll; drag, ←/→ and the discs add on top. A card click swaps which car is in the viewer. |
| Road → News | pin with pinSpacing false | The news section slides over the held road. Cards share one baseline. A light-track pager. Mouse drag on desktop. |
| Miami | scrub | The milk pane rises (12%→0). Form states: errors start "Error:" and the input is kept; loading shows a scanner light inside the button; after a 10 s timeout an error appears; success replaces the form. The success is a prototype state only: nothing is sent. |

### Verified (Chrome at 1920 / 1440 / 1024 / 768 / 430 / 390 / 360, with reduced transparency emulated off)

- **Horizontal overflow:** 0 px at every width.
- **Console:** 0 errors, 0 warnings, 0 failed requests.
- **Contrast** was measured on the composited render. Text was hidden, then the worst 5% of pixels under each text box were read, across all eight studio programs, all four atelier models, the commission stages, the program sheet and two Goodwood frames. Result: **0 failures** at 1920, 1440, 1024, 768 and 390. Two remain on phones:
  - 360: the Goodwood source line, while the film scrolls past (3.5:1).
  - 430: the third intent item, which is clipped by its own horizontal scroll.
- **Interactions driven at 1920 / 1440 / 1024 and 768 / 390:**
  - showroom hover, tap 1 / tap 2, the View link, and the roll-forward;
  - key hover, click and bottom sheet;
  - "View the car";
  - atelier and studio tabs (all 8 cars);
  - program sheet open, Esc, Close and focus trap;
  - commission tabs;
  - provenance arrows, drag and car swap;
  - heritage discs and swipe;
  - menu sheet navigation;
  - form error → sending → success;
  - nav and brand jumps.
- **Reduced motion:** no pins, no Lenis; the statement is sharp, Goodwood shows the still with all captions, the strip scrolls natively, and the tabs still work.

### Fix round (coordinator QA, real wheel scrolling every 0.85 viewport: `_shots/build/rv1440/`, `rv390/`)

1. **The silhouette is rim-lit.** At 1440, frame 09 is the only frame before the car is lit, and it shows a light edge with the body form readable. The car is lit by frame 10.
2. **No stacked half-scenes.** The studio and the atelier hand over as one pane sliding over a held scene. At 1440, frame 11 is the atelier as a full pane over the held studio, and frame 12 is Goodwood sliding over the held atelier; the atelier's tabs are already covered. At 390, frames 06 and 07 show the same.
3. **No caption bleed.** The commission slides over the held film. At 1440, frame 15 shows the film with no captions and no transport under the header; frame 16 is the commission. At 390, frames 09 and 10 show the same.

P2:
- The open card now grows from its collapsed size (FLIP, 560 ms expo); the leaders follow it.
- On phone and tablet, a plumb line runs from the selected key to the bottom sheet.
- The phone intent options use short visible labels (Commission · Provenance · Viewing). Their accessible names stay the full phrases. The Goodwood source line is set in full white.
- Contrast re-measured: **0 failures at all seven widths** (1920, 1440, 1024, 768, 430, 390, 360).

### Left / known

- This machine reports `prefers-reduced-transparency: reduce` (a Windows setting). In plain Chrome here the glass therefore renders as its solid fallback (smoke .88, milk .94), as the spec requires. The screenshots emulate it off.
- Not done from P2/P3:
  - the menu sheet's swipe-down works only from the sheet's top;
  - an image-error plate on the news cards.
- Goodwood figure: 160 px at 1440, where UI-E specifies 200. At 200 px it would cross the car's path in the film.

## Type, colour, controls

- **Instrument Sans** at `font-stretch: 88%` for all words (closest free match to Porsche Next; chosen by Alex and the coordinator). Statements are sentence case at weight 400; nav and labels are weight 500; small uppercase labels are tracked .12–.16em. **Bebas Neue** is used only for figures: years, production counts and 1,000 hp. No Cabin and no Gillius.
- **Colour:** GW monochrome (#000/#fff, #040404 night, #f2f2f0 mist). The only UI accent is **GXR red #FF2A3C**, which guntherwerks.com itself uses for its scroll-indicator stripe. Here it marks the progress rail and the special-editions cove. Studio light is taken from GW's own photographs: the F-26 warm cove is sampled from hero/02.
- **Controls:** thin 1 px outline or a hairline text link with an arrow, 44 px high, small tracked label. At most one filled primary per screen ("Send enquiry"). Active tabs are filled white. There is no brand hue and no fat pills.
- **Radius:** 6 (corner arrows) · 8 (pills, tabs, nav) · 12 (caption cards) · 16 (photo cards) · 24 (rising panels), following Porsche's 4/8/14–16 set.

## Screens: Porsche Racing device → Gunther Werks use

| # | Porsche Racing device | Gunther Werks content |
|---|---|---|
| 0 | Logo top-left, tiny centred nav pill, small pill top-right, always visible | GW wordmark + "Miami"; Programs · Heritage · Ownership · Provenance · News · Miami; "Enquire" pill. The wordmark turns dark over light screens (Heritage, Atelier, Provenance) |
| 1 | Hero: one full-bleed interior scene, one light sentence bottom-left | Orange Turbo head-on in the GW Huntington Beach showroom (gallery lifestyle-09). "Gunther Werks Miami. / Reengineered and remastered." The official-dealer line; outline "Book a private viewing" + link "Explore the programs" |
| 2 | White rounded panel rising over the scene; the statement resolves from blur | "We don't sell cars. / We deliver dreams." (GW Ownership page, verbatim) |
| 3 | Heritage strip: huge years over B/W photos, dark caption cards, corner arrows, pager | Aug 2017 400R at The Quail (25) · Aug 2025 F-26 revealed (26) · Oct 2025 final Speedster · Jul 2026 Goodwood · 14 Aug 2026 GXR-EVO at The Quail (15) · 21 Oct 2026 Brundle Edition (5). Title "Born from legacy. Driven by precision." (GW home). Closing line "Every door that closed." with the X-key origin (GW Our Story) |
| 4 | *(added; Alex's night-showroom image)* | **The showroom at night:** ten programs by GW tier (Standard · Special editions · Legacy) as dim grey profile cutouts on black, with Bebas production counts and tracked names. One car stands under an overhead cone with a floor pool and its colour restored. A GXR-red marker on a thin rail sits at the bottom |
| 5 | Coloured studio, car lit from silhouette, pill tabs bottom centre + "Explore details" | Warm cove (GW F-26 tones), the F-26 profile cutout with floor reflection and a large "F-26" behind the car. Tabs F-26 · Turbo · GWR · GWX; the camera stays fixed when a tab changes |
| 6 | "Explore details": dark rounded cards anchored to parts, expand icons, eye icon hides the UI | **What the atelier changed** on GW's real F-26 warm-cove photograph. Front (930 Flachbau tribute) · Cockpit (carbon, leather, Alcantara) · Body (carbon fibre, made in-house) · Chassis ("250% stiffer than the 993's", Robb Report) · Engine, open with a macro photograph (twin-turbo 4.0 with Rothsport Racing, 1,000 hp, F-26 release 15 Aug 2025). The cards sit on the wall and floor, joined to their dots by hairline leaders |
| 6b | Model overlay (dark panels over the blurred studio, close X) | **Program sheet** (motion frame m08): name, GW description, sourced spec rows, a Goodwood film loop, "Begin your commission" and "Latest news" (Robb Report, Top Gear) |
| 7 | Same studio device, second set | **Special editions** in a GXR-red cove: GXR-EVO · Brundle Edition · Thermal Edition · End Game. "Limited to 15 units globally" |
| 8 | *(added)* full-bleed moment | Goodwood: F-26 flames at the START line, "1,000 hp" (F-26 release, 15 Aug 2025). In the build this is the scrubbed film |
| 9 | "Teams": statement + pill tabs + floating photo cards | **The commission:** "Every step, from initial inquiry to delivery day." (GW Our Story). Owner's application · Customization · The build · Delivery (active) · Ownership. Delivery: the chef's meal at Huntington Beach, then the billet key (GW Ownership) |
| 10 | Rounded cards with corner arrows | **Provenance Succession:** "Curated builds, factory re-validated for their next steward." (GW). A walk-around viewer for Phoenix (angle 4 of 10, angle meter) plus Blue Phoenix and Rubystone cards. No availability claims |
| 11 | Closing line over a road at dusk | "Designed for pleasure." (GW footer tagline) over the orange Turbo on a circuit at sunset (hero/04) |
| 12 | Journal cards, rounded, corner arrows, overlapping the road | Brundle Edition 21 Oct 2026 · GXR-EVO 14 Aug 2026 · Monterey Car Week 13–15 Aug 2026 · Robb Report Restomod of the Year 29 Jul 2026 · Top Gear first drive 20 Jul 2026 |
| 13 | *(added)* the rising white panel returns | **Miami:** "Begin your Gunther Werks journey." (adapted from GW's "Ready to begin your Gunther Werks journey?"). Prestige Imports · 15050 Biscayne Blvd, North Miami Beach, FL 33181 · Javier Roque · (305) 783-6493 · Javier@PrestigeImports.com. A private-enquiry form (intent, program, name, phone, email, message, consent) |
| 14 | Big structured footer | Large links + columns Programs · Ownership · Dealer · Follow Gunther Werks. Prestige line, GW-services line and the Porsche non-affiliation line. No partner wall |

Facts come only from `research/corp/` (CI, `_raw/txt`, news posts). There are no prices. Contradicted figures are left out: F-26 weight, the 1,067 hp figure, and Turbo hp.

## Motion (the build; the image is static)

Stack: GSAP + ScrollTrigger (Alex). Lenis is optional. Easing family: GW's own `cubic-bezier(.25,.46,.45,.94)` for UI, and `power2.inOut` for scrubs. Durations come from one scale: 200 / 350 / 600 / 900 / 1200 ms. Every device listed below has the static frame as its reduced-motion state. Under `prefers-reduced-motion: reduce` no scrub or pin runs: sections stack as rendered and states change by instant cross-fade (≤200 ms or none).

| Screen | Trigger | What moves | Timing / length | Reduced motion |
|---|---|---|---|---|
| Header | always | Fixed and never hides. The wordmark and city label swap to dark over `data-hd="light"` screens, sampled under the header band | 400 ms colour | Instant swap |
| 1 Hero | load | Masked line reveal of the two H1 lines (each line rises 100%→0 inside its own overflow mask, 80 ms stagger). The photo settles from scale 1.06→1 | 900 ms, once | Lines visible, no scale |
| 1→2 | scroll, pin | **Overlap entry:** the white panel rises over the pinned hero scene (translateY 100%→0). The hero photo parallaxes at 0.4× | 100 vh | Panel already in place |
| 2 Statement | scroll-scrub inside the pin | **Words resolve from blur to sharp**, word by word: blur 12→0 px, colour #bbb→#161616, 7 words over 70% of the pin. Frame m01 | +80 vh pin | Sharp text |
| 3 Heritage | scroll, pin + horizontal | The strip translates on X with page scroll. **Years move at 1.25× the photographs** (parallax against their frames), and each photo drifts −6% inside its rounded mask. Caption cards fade in at 50% of each card. Pager and arrows stay in sync | 6 cards ≈ 220 vh | Strip scrolls natively on X with the arrows; no parallax |
| 3 | hover | Card photo scales 1.03. The corner arrow fills white and travels 2 px ↗ | 350 ms | Arrow fill only |
| 4 Showroom | scroll-in, pin | **Spotlights switch on one after another and off again** along the grid (cone + pool opacity 0→1→0, 140 ms apart, each lit 260 ms), leaving the F-26 lit; the rail marker follows the light. Frames m04 (all dark) → section 04 (one lit) | ≈ 2.2 s triggered once at 40% visibility, then pinned 60 vh | F-26 lit, no sequence |
| 4 | hover / focus | **Hover = spotlight:** the cone and pool fade in over that car, its colour returns (grayscale 1→0, brightness .34→1), its count and name go white, the rest stay dim, and the rail marker slides to it. Frame m05 | 700 ms in / 500 ms out | Instant state |
| 4→5 | click | **The lit car rolls forward:** a shared-element (FLIP) move from its grid cell to the studio position, scale ≈ 4.3, 900 ms. The grid dims to 0 and the cove fades up behind it | 900 ms | Cut to the studio |
| 5 Studio | scroll, pin | **Silhouette → lit** as the pin progresses: car brightness 0→1, reflection .06→.2, the large name .07→.26, cove brightness .86→1. Frames m02 → m03 | 120 vh | Lit |
| 5 | tab click | Cars switch with the camera fixed. Outgoing car drops to silhouette (300 ms), incoming cutout cross-fades at the same scale and ground line (600 ms), the name cross-fades and the cove hue tweens to the program light | 900 ms total | Instant swap |
| 5→6 | "Explore details" | Cutout cross-fades into the real F-26 photograph of the same cove. Dots appear with a 60 ms stagger, then leaders draw (stroke-dashoffset 300 ms), then cards (opacity/8 px, 350 ms) | 1.2 s | All visible at once |
| 6 Details | idle | **Hotspot breathing:** outer ring scale 1→1.5, opacity .28→0, 2.4 s loop. It runs only while the section is in view and stops after 3 cycles | — | Static rings |
| 6 | click a card | **Card expand:** width/height via FLIP 450 ms. The macro photo reveals by clip-path inset 100%→0. The other cards dim to .6. The eye icon hides every card, leader and dot (opacity 300 ms). Frames m06, m07 | 450 ms | Instant expand |
| 6 | tab switch | Hotspots move to each model's own changes: dots tween to new coordinates (600 ms) while cards re-label. GWR: S-duct hood · turbofan wheels with aero fins · ventilated ducktail. Turbo: nose lift · carbon rear quarters · carbon rear wing. GWX: Candy Purple · bespoke carbon panels | 600 ms | Instant |
| 6b Program sheet | "Explore F-26" | The studio blurs (0→18 px, brightness .62). Panels **stagger in**: left panel x −24 px → 0, film panel, then the two cards, 80 ms apart, 600 ms each. The film loops muted. Close (X / Esc) reverses in 400 ms and returns focus to the trigger; focus is trapped inside. Frame m08 | 600 ms | Panels appear without movement |
| 7 Special editions | scroll, pin; tabs | Same studio device and choreography in the GXR-red cove | 100 vh | Lit |
| 8 Goodwood | scroll-scrub | **Scrubbed film** `gunther-werks-f-26-goodwood-fos.mp4` 0:02.75–0:08.50 (4K, the head-on approach that pans into the drive-past) on a canvas frame sequence (WebP, about 70 frames) keyed to scroll. Captions are keyed to film seconds: 0:03.0 "Goodwood Festival of Speed · July 2026", 0:05.5 "1,000 hp", 0:07.5 "F-26, from the start line". The still on screen is the closing frame | 180 vh pin | The still (location-21) with all captions |
| 9 Commission | scroll, pin; tabs | The statement reveals line by line (masked). **Tabs step through the five stages as the pin progresses** (Owner's application → … → Ownership); photo cards cross-fade with 4% parallax inside their masks. Tabs can also be clicked | 5 steps × 40 vh | Tabs only, static cards |
| 10 Provenance | drag / arrow keys / scroll | **The turning car:** the walk-around frames (Phoenix 10, Blue Phoenix 9, RennSport 11) step with drag or ←/→. The angle meter follows; there is no tween between stills, only a 120 ms cross-fade | — | Arrows and keys only |
| 10 | hover | Card photo scales 1.04 and the corner arrow travels | 350 ms | Arrow fill |
| 11 Road | scroll | The statement rises with a masked reveal. The photo parallaxes at 0.6× | — | Static |
| 11→12 | scroll | **Overlap:** the news strip slides up over the pinned road (−120 px overlap kept at rest) | 60 vh | Stacked |
| 12 News | drag / scroll-x | Strip scrolls on X. Hover lifts the card (image scale 1.04) and the corner arrow travels | 350 ms | Native scroll |
| 13 Miami | scroll | The white panel rises over the Miami scene, as on screen 2, so the page closes with the gesture it opened with. Form states: focus ring = 1 px ink outline; error = #C62828 border + message under the field; input is kept after a failed submit; the submit button shows "Sending…" with a 10 s timeout | 100 vh | Panel in place |

Gestures are spent selectively, not on every chapter. Pins: 1→2, 3, 4, 5, 8, 9. Overlaps: 1→2, 11→12, 12→13. Scrubs: the statement words, silhouette→lit, the Goodwood film.

## Verified (25 Oct 2026, Chrome via Playwright, http://localhost:8797)

- Full page 1440: 12,045 px, 14 masses. Full page 1920: 14,493 px. Each full screen is exactly 900 / 1080 px; News (645 / 783) and the footer (720 / 894) are shorter by design.
- Horizontal overflow: scrollWidth = clientWidth at both widths (0 px).
- Fonts loaded: Instrument Sans (variable 400–700, 75–100% width) and Bebas Neue 400. All images decoded. Console: 0 errors, 0 warnings, 0 failed requests.
- Contrast was measured on the composited render, with text hidden and the worst 5% of background pixels under each glyph box: every text role passes AA at 1440 and 1920. Tightest: Heritage years 3.54:1 (large), road statement 3.54:1 (large), hero kicker 5.34:1 (1920), Atelier kicker 5.36:1, dim showroom counts 3.46:1 (large, the deliberate "off" state).
- No text on a car's defining features. Hero copy sits on the floor reflection below the car. Goodwood copy sits right of the car. Studio names sit behind the cars by design. Atelier cards sit on wall and floor with leaders.

Not verified: phone (390), real motion (none is built), the form's live states (designed above; not wired), the Porsche Next comparison beyond the coordinator's own board.
