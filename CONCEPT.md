# CONCEPT — Gunther Werks Miami, home page (mockup, index only)

*Art direction, 25 Oct 2026. BUILD, one direction. Directs only: no markup, CSS or scene code.
Inputs read: BRIEF.md, CLAUDE.md, research/corp/GUNTHER_WERKS_CI.md (cited as CI §n),
research/corp/assets/ASSETS.md and the files themselves (hero/, cutouts/, video/ frame sheets
re-extracted at 0.5 s), research/references/awwwards/AWWWARDS_REFS.md, research/references/21st/21ST_REFS.md,
design_dna TASTE.md (§0, §2, §2c) and .claude/rules/design-dna.md (DNA1, DNA27–48, DNA72–76, DNA90, DNA101).
Manifest resolved from `c:/____WORK/_____GDBURO SIGOFF/design_dna/TASTE.md`.*

Source keys (F26-PR, TFS, STORY, BG-PDF, DEALER, …) are the ones defined in CI §0 "Source keys".
`assets/` below means `research/corp/assets/`.

---

## 0. Design Read

```
Reading this as a dealer home page for South Florida / East Coast collectors, leaning cinematic-industrial (library) with one technical-luxury (provisional) device.
Mandate: REDESIGN — carried untouched: GUNTHER / W E R K S wordmark (assets/logos/gunther-werks-logo-white.svg, -logo.svg), GW monogram (gw-mark.svg), black/white ground, GW's own per-program accents, uppercase humanist voice, GW's two studio registers (dark cove, white seamless), "remastered / commission / atelier" vocabulary, the Porsche non-affiliation line. In scope: sitemap, hierarchy, composition, motion. Sibling Prestige sites carry nothing.
Style mode: DIRECTED HYBRID — anchor cinematic-industrial / signature technical-luxury (the comparison row only); unifying principle: the car is the constant, the light around it changes.
Dimensionality: SUPPORT — one film scrub and one triggered transition reinforce a page that reads completely as stills.
```

---

## 1. The governing idea

> **Every Gunther Werks is the same 993 remastered, so the page holds that silhouette still — one profile, one floor, one scale — and makes what the atelier changed the only thing you look at.**

**Why this replaces the brief's §3 sentence** ("the atelier lights each car the way it builds it — one at a time, in the dark, with the evidence in the light"). That sentence opens on a lighting style (CG1), describes Charge Cars, EMO and every other one-lit-object-on-black page equally well (CG5), and contradicts the brief's own signature device: "one at a time" cannot produce a row of four. Its good half survives literally — the evidence *is* in the light (§4, the light plate).

**Concept gate**

| | Result |
|---|---|
| CG1 style first? | No. Opens on a product fact: one donor generation (CI §2: "The 993, the final air-cooled generation, provides the foundation", STORY). |
| CG2 one sentence, could be wrong? | Yes. It bets the buyer's desire lives in the *difference between programs on a constant base*, not in lifestyle or a mood reel. If collectors buy on GW Haus weekends and canyon films, this page is wrong. |
| CG3 swap the technique? | Swap the registered row for photo cards (Bugatti / Porsche Motorsport, AWWWARDS_REFS "Traps") and the difference is read from the cards, not the cars: the sentence dies. Swap House Lights for a cut and the hero car no longer *becomes* the catalogue car: the sentence weakens. The technique carries meaning. |
| CG4 complexity compensating? | Static build = one cove photograph, one light plate with four cars at one scale, one room, one film still, three cars, a dated list, a contact. It still argues the idea. |
| CG5 house style? | No dark-luxury default: the page has three light masses, and the ground flips because GW's cutouts were shot on white seamless (CI §5), not by taste. |
| CG6 variety as viewpoint? | One direction. |
| CG7 dies after the hero? | Each mass carries it — see the clause in every shot below. |

**Why this brand and not any dark car site.** Only an atelier whose entire range is built on one donor generation, and whose own studio shot every program from the same left-facing profile angle (CI §5: "Every side profile faces left"), can show four cars on one footprint and let the eye find the remaster — F-26 slantnose and swan wing, Turbo whale-tail and side intakes, GWR aero discs, GWX frame-mounted wing in Candy Purple. Czinger, Pagani and Lamborghini have a different platform per model; Singer has one formula, not a lineup. And "remastered" is GW's own word (31 uses in its dictionary, CI §3.7), not ours.

---

## 2. Hero declaration (first screen)

| | |
|---|---|
| **Owner** | One car and the wordmark. Nothing else speaks. |
| **Asset, desktop** | `assets/hero/02-f26-profile-warm-cove_4800x2700.jpg` — silver F-26, pure left-facing profile, warm haze from left, glossy floor. GW's own home-carousel frame. |
| **Asset, phone** | `assets/hero/02-f26-profile-warm-cove-mobile_1080x1920.jpg` — same shoot, authored portrait. |
| **Viewport ownership** | 100svh, full-bleed field. |
| **Object scale** | GW's composition is kept: car spans ~16.5 %–83 % of frame width, roof at ~33 % of height. Not enlarged. |
| **Focal point** | Front wheel and door seam of the F-26; second read the wordmark. |
| **Negative space** | Top third (haze) carries the wordmark. Floor (bottom ~25 %) carries one caption. |
| **Text safe zones (1440×900)** | Wordmark band y 13–27 %; left edge registered to the F-26's front bumper x (≈16.5 % of image width − crop), so the first thing the page does is align type to the car's nose. Caption band y 88–94 %, x from the front-wheel centre (~30 %) to ~62 %, clear of the amber floor reflection (x 17–24 %) and the red one (x 78–82 %). Verify AA on the composite, not the token. |
| **Desktop crop** | `object-fit: cover`; at 1440×900 the frame loses 80 px per side and nothing of the car. At 1920×1080 the frame is exact. At 1024×768 cover crops ~232 px per side: nose stays ≥ 40 px in — verify. |
| **Phone crop (390×844)** | **Not cover.** The portrait file has the car edge to edge (x 3 %–97 %); cover would cut the nose. Fit to width (390×693), anchor to the bottom so the floor continues, fill the top 151 px with the haze colour sampled from the image's top row, blended by a 120 px gradient overlap. Car then sits at y ≈ 53–66 %; wordmark at y ≈ 18–24 %; caption at y ≈ 88 %. |
| **Copy** | `<h1>` = the white wordmark SVG at clamp(300px, 40vw, 720px), accessible name "Gunther Werks Miami". Under it, 14 px tracked uppercase: **MIAMI · PRESTIGE IMPORTS** (DEALER). Floor caption, 14 px: **F-26** — nothing more; the row says the rest. |
| **Absent, on purpose** | No headline or slogan. No CTA button (Enquire lives in the header). No carousel, dots, arrows or progress line (GW's current home). No video, no sound toggle. No count-up stats. No scroll arrow. No badge. No cookie bar over the frame. |

---

## 3. Feeling curve

| Act | Feeling | What on screen causes it |
|---|---|---|
| 1 Hero | Held breath, want | One F-26 standing in warm haze, the wordmark aligned to its nose. |
| 2 House Lights → Lineup | Clarity — "it's four of them, and it's the same car" | The studio lights come up, the same F-26 becomes a white-seamless catalogue car, pulls back, and three siblings are standing beside it on one floor. |
| 3 Atelier | Respect | The real Huntington Beach room, the workshop visible through the glass, two numbers that don't need adjectives. |
| 4 Silence → Peak | Exhilaration | Black. A dateline. Then the F-26 comes straight at you at Goodwood and blows past under your own scroll. 1,000 horsepower. |
| 5 Provenance Succession | Reassurance, possibility | Three cars in calm light, re-validated by the factory for their next owner. |
| 6 News & Events | Standing | Robb Report, Top Gear, Road & Track — dated, quiet, in a list. |
| 7 Miami | Arrival, intimacy | Back in a cove, amber this time. A person's name, a phone number, an address, a form. |

No two adjacent acts share a feeling. Act 4 is the one peak.

---

## 4. Shot list — every section, in order

Grid: 12 columns, 24 px gutter, side margin `clamp(20px, 8.33vw, 160px)` (120 px at 1440), content max-width 1600 px at 1920. Phone: 4 columns, 16 px gutter, 20 px margin. Ground sequence: **D**ark · **L**ight plate `#F5F5F5` (GW's own light surface, CI §3.3) · **F**ilm.

### 0 · Header (persistent chrome)
- **Job:** route and phone, never compete.
- **1440:** absolute over the hero, transparent: GW monogram `assets/logos/gw-mark.svg` (white, 24 px tall) left on the margin; right side: Programs · Provenance · News · Miami · (305) 783-6493 (tel link) · **Enquire** (1 px white stroke pill — GW's CTA pill, CI §3.6). The full wordmark is *not* in the header on the home page; the hero owns it.
- **On scroll:** the header scrolls away with the hero. On scroll-up anywhere below the hero a compact bar (56 px, solid `#0A0A0A`, monogram · phone · Enquire) drops in from the top; it never turns solid while content slides under a transparent one (U-invariant on opaque surfaces crossing content).
- **390:** monogram left, "Enquire" and a menu button right; phone number inside the menu and in the compact bar.
- **Moves:** compact bar translateY only, 240 ms ease-out; reduced motion = appears without travel.

### 1 · Hero — the cove  `D`
As §2. Static. Carries the idea: the 993 silhouette, held still, before anything else is said.

### 2 · House Lights → the lineup plate  `D → L` — signature move + comparison row
- **Job:** show what is for sale, at once, and that it is one base car remastered four ways.
- **Assets:** `assets/cutouts/f26-profile-l-silver_4259x1457.png` · `assets/cutouts/turbo-profile-l-orange_1400x466.png` · `assets/cutouts/gwr-profile-l-turquoise_4384x1503.png` · `assets/cutouts/gwx-profile-l-candypurple_4342x1479.png` (plus a local derivative of the F-26, §5).
- **Composition 1440 (resting state):** light plate `#F5F5F5`, full width. Eyebrow **PROGRAMS**; H2 **ONE 993. FOUR REMASTERS.**; one line under it: "The 993, the final air-cooled generation, provides the foundation." (STORY). Below, the comparison row (§6). Below the row, the quieter second tier (two short text groups, no images):
  - *Special editions* — GXR-EVO · 15 (GXR: "Limited to 15 units globally") · Brundle Edition · 5 (BRU-PR: "five examples worldwide") · Thermal Edition · 5 (THM) · Project End Game · 1 of 1 (EG).
  - *Legacy, completed* — Coupe · 25 (CPE) · Speedster · 25 (SPD; final car delivered per SPD-PR, 28 Oct 2025).
  - Each name links to the grouped page (to come; mockup links are visibly marked "page to come" on hover/focus).
  - Method line, 14 px `#333`: "Drawn to one wheelbase from Gunther Werks studio photographs."
- **390:** the vertical registration stack (§6). Second tier as two stacked lists.
- **Carries the idea:** this is the sentence, drawn.
- **Moves:** the signature move House Lights (§5) on desktop and phone; nothing else on the plate moves. Links: car + name are one link per program; hover = the name's underline draws in (no lift, no scale on the car).

### 3 · The atelier  `D`
- **Job:** say what "remastered" means in evidence, not adjectives.
- **Asset:** `assets/hero/06-gwr-turquoise-hq-showroom_3840x2560.jpg` — GWR in the Huntington Beach HQ; the workshop (lifts, a car on stands) is visible through the glass wall at left. The atelier is literally behind the car.
- **1440:** text in columns 1–5 on `#0A0A0A`; the photograph in columns 6–12, bleeding off the right edge, cropped to 4:3 at `object-position: 30% 55%` so the glass wall with the workshop and the whole car survive and the ceiling light panel is trimmed. Text never touches the image.
  - Eyebrow **THE ATELIER**
  - H2 **REENGINEERED AND REMASTERED.** (STORY / HOME: "Gunther Werks builds are reengineered and remastered.")
  - Body: "Gunther Werks is not a manufacturer — it is an atelier." (BG-PDF). "Carbon fiber is made in-house, from raw material to finished panel; CNC machining is performed entirely under one roof." (STORY, condensed from "Carbon Fiber In-House" and "CNC Machining In-House").
  - Two figures, Bebas Neue, stacked with a line each:
    - **90%+** — "of components designed and produced internally, from structural carbon fiber to billet aluminum details." (BG-PDF: "Over 90% of components are designed and produced internally…")
    - **4.0 L** — "flat-six engines, co-developed with Rothsport Racing." (F26-PR; GWR, TURBO pages; GWX-PR "4.0 liter")
  - Closing line, 14 px: "The name pays tribute to Gunther Wendt, the NASA engineer known for his exacting standards during the Apollo program." (STORY)
- **390:** photograph first, re-cropped 4:5 at `object-position: 34% 60%` (car front three-quarter + two panes of workshop glass); text below; figures side by side.
- **Carries the idea:** what changed, and who changed it.
- **Moves:** nothing. The section ends with 30vh of plain black before act 4 — the silence in front of the peak.

### 4 · The peak — F-26 at Goodwood  `F`
- **Job:** the one thing a still cannot show about the remaster — 1,000 horsepower moving.
- **Asset:** `assets/video/gunther-werks-f-26-goodwood-fos.mp4`, 3840×2160, segment **0:02.75–0:08.50** (one continuous telephoto take: head-on approach → turn → drive past, nose right). Poster/reference: `assets/video/gunther-werks-f-26-goodwood-fos.jpg`.
- **Route:** canvas image sequence (Scout / 21st Hero Scrub + joyco progressive loading), not `video.currentTime`.
  - Desktop set: 115 frames (20 fps) at 1920×1080 WebP q≈70, est. 11–14 MB, loaded in buckets (every 8th frame first) starting when act 3 enters the viewport.
  - Phone set: separately authored portrait — a 1215×2160 crop window from the 4K source **tracking the car's centroid** (keyframed every 0.5 s, eased), output 810×1440 WebP q≈65, 96 frames, est. ≤ 6 MB.
- **1440 composition:** full-bleed 100vw × 100vh, pinned. Text is never over the car — the head-on frames have the car filling the height, so no caption lives over the approach:
  - 0–8 % of the pin: black, one dateline centred-left on the margin: **GOODWOOD FESTIVAL OF SPEED · JULY 2026** (newsroom posts 08 Jul and 12 Jul 2026; ASSETS).
  - 8–12 %: dateline out, first frame fades up from black.
  - 12–90 %: scrub 2.75 → 8.50 s, linear (`ease: none`), `scrub: 0.6` (a little weight).
  - 90–100 %: hold on 8.50 s (car small, departing right; left half is blurred bales). Caption lower-left on the margin, over a bottom scrim that is a sibling of the copy, measured on the composite: **F-26** / "1,000 horsepower from a twin-turbocharged 4.0-liter flat-six co-developed by Rothsport Racing, through a six-speed manual." (F26-PR, 15 Aug 2025) / link **Explore the F-26**.
- **390:** same pin logic; the portrait sequence keeps the car centred, so the caption is **not** placed over the film at all — the pin releases and the caption block follows in flow on black.
- **Carries the idea:** the remaster you cannot photograph. The only moment on the page where the silhouette is allowed to move.
- **Reduced motion:** no pin, no sequence. One still: frame **0:07.25** (F-26 in side profile, "26" on the door, wing up) at 16:9, caption *below* the image, never on it. Phone: the portrait crop of the same frame.

### 5 · Provenance Succession  `L`
- **Job:** a second way in — certified pre-owned, sold through Prestige — without any availability claim.
- **Assets:** `assets/cutouts/rubystone-profile-l-magenta_2560x876.png` · `assets/cutouts/phoenix-profile-l-yellow_2560x876.png` · `assets/cutouts/bluephoenix-profile-l-blue_2560x876.png`. RennSport Aventura is left out: GW lists it as "privately placed", and showing one placed car beside unlabelled ones would imply the others are available.
- **1440:** light plate. Text in columns 1–5; columns 6–12 hold the three cars as a vertical stack on one front-axle datum (the same registration rule as the phone lineup, larger: wheelbase ≈ 300 px, car ≈ 560 px long; 2560 px sources at 2x = fine).
  - Eyebrow **PROVENANCE SUCCESSION**
  - H2 **CURATED BUILDS, FACTORY RE-VALIDATED FOR THEIR NEXT STEWARD.** (GW meta, CI §2.1 / DICT)
  - Body: "Each Provenance Succession vehicle returns to the Huntington Beach facility for a comprehensive diagnostic re-validation prior to delivery to the new owner." (DICT/PSP). "Availability and succession timing are provided by Javier Roque at Prestige Imports upon qualification." (GW line, with Prestige substituted per Alex 25 Oct — flagged [?] in §10.)
  - Under each car, 14 px: **RUBYSTONE** — Coupe · Porsche Rubystone Red · **PHOENIX** — Speedster · **BLUE PHOENIX** — Speedster · bespoke blue livery (PSP pages). No horsepower, no status, no warranty figure (GW gives "minimum of 3 years or 100,000 miles from date of succession" on the PSP pages and 5-year elsewhere — not shown).
  - CTA, the plate's only one: **Ask about Provenance Succession** → enquiry form with interest preset.
- **390:** text, then the three cars full content width, same axle datum.
- **Carries the idea:** the same silhouette, held still; this time what changes is the owner.
- **Moves:** nothing.

### 6 · News & Events  `D`
- **Job:** prove the brand is current and recognised, then route out.
- **Asset:** one lead image only — `assets/news-events/brundle-edition/lead-gw-brundle-edition-feature_2560x1707.jpg` (newest item, dark cove, front 3/4). Phone: `assets/hero/07-brundle-front34-dark-cove-mobile_1080x1920.jpg` cropped 4:5.
- **1440:** `#0A0A0A`. Columns 1–4: eyebrow **NEWS & EVENTS**, the lead image at 4:5 under it. Columns 6–12: a dated list, date · source · headline, hairlines `rgba(255,255,255,.12)` (GW's own), tabular figures:
  1. 21 Oct 2026 · Press release · "Gunther Werks Unveils Collaboration with Racing Legend Martin Brundle"
  2. 14 Aug 2026 · Press release · "Gunther Werks Reveals the GXR-Evo — The Ultimate Analog Driving Experience"
  3. 14 Aug 2026 · Road & Track ↗ · "Gunther Werks GXR-EVO Debuts as the Company's Most Extreme Porsche 911 Restomod"
  4. 29 Jul 2026 · Robb Report ↗ · "Gunther Werks F-26 Named Restomod of the Year by Robb Report"
  5. 20 Jul 2026 · Top Gear ↗ · "Gunther Werks F-26 First Drive by Top Gear"
  6. 13–15 Aug 2026 · Event · "Monterey Car Week at GW Haus, Carmel Valley" (EVENTS)
  - All titles and dates verbatim from ASSETS.md "news-events" index. The Motor1 item is excluded (its headline carries a price). Press releases open as articles; coverage links out with the outlet named.
  - Foot: **All news** (page to come).
- **390:** lead image, then the list; each item stacks date+source over headline.
- **Carries the idea:** the remasters out in the world, judged by others.
- **Moves:** nothing; hover on a row = headline underline draws.

### 7 · Miami — the ending  `D` (photograph) + form
- **Job:** hand over the action to a person.
- **Asset:** `assets/hero/03-turbo-orange-side-rear34-amber-cove_4800x2700.jpg`; phone `assets/hero/03-turbo-orange-side-rear34-amber-cove-mobile_1080x1920.jpg`. The page closes in the cove it opened in — amber now, the Turbo's light.
- **1440:** full-bleed 100vh. Contact block in the dark upper-left field (x 8–38 %, y 14–44 %; the roof begins at x ≈ 42 %, y ≈ 33 % — keep clear):
  - Eyebrow **GUNTHER WERKS MIAMI**
  - H2 **READY TO BEGIN YOUR GUNTHER WERKS JOURNEY?** (STORY, verbatim)
  - "Prestige Imports is the Gunther Werks dealer for Miami." (DEALER)
  - **Javier Roque** · (305) 783-6493 · Javier@PrestigeImports.com · 15050 Biscayne Blvd, North Miami Beach, FL 33181 (DEALER; CLAUDE.md — not 14780 / 833 number).
  - **Enquire** (pill) → scrolls to the form.
- Directly below, on `#0A0A0A`: the enquiry form, two columns at 1440 (labels above fields): Name · Email · Phone (optional) · Interest (F-26 / Turbo / GWR / GWX / Special editions / Provenance Succession / Other — preselected when arriving from a program link) · Message · **Send to Javier Roque**. States designed: idle, sending, sent ("Javier will be in touch"), error (input kept). Mockup has no backend — say so in the sent state's dev note, not on the page.
- **390:** portrait file fitted to width like the hero (car edge to edge in source); contact block in the top dark 40 %, Enquire in the floor band; form single column.
- **Carries the idea:** the silhouette, one last time, in light you can visit.
- **Moves:** nothing.

### 8 · Footer  `D`
GW wordmark (small, black ground), the nav repeated, Instagram / YouTube / Facebook (GW's), and the legal line: "Gunther Werks Miami is operated by Prestige Imports. Not affiliated with, associated with, or endorsed by Porsche. Porsche and all Porsche model names are registered trademarks of Dr. Ing. h.c. F. Porsche AG." (adapted from GW's footer, CI §3.7). Rotating "DESIGNED FOR …" tagline: not used.

---

## 5. The signature move — **House Lights**

**What it is.** The hero's F-26 photograph becomes the F-26 catalogue cutout without moving a pixel, the cove turns into the white seamless studio, the camera pulls back, and the other three programs are already standing on the same floor at the same scale. The car is held; the light and the context change. That is the governing sentence performed once.

**Why it belongs to Gunther Werks and nobody else.** GW photographs its cars in two real studios — the dark cove for desire and the white seamless for record (CI §3.4) — and the hero frame and the cutout are the same F-26 at the same left-facing profile angle. Only because all four programs share one donor car and one camera angle can the hero car be registered onto its cutout and its siblings placed beside it at one wheelbase. A brand with a different platform per model, or a mixed-angle shoot, cannot do this move.

**Mechanics (desktop ≥ 1024).**
- The hero and the plate's first screen are one container; the stage pins for **100vh**.
- **Triggered, not scrubbed** — a time-based timeline (1.8 s) plays forward when the pin passes 12 % and reverses when scrolling back above it. It is not a scrub because it is a transition on still objects; the brief and Alex's rule keep scrubs for moving subjects. If the visitor scrolls through faster than the timeline, `onLeave` completes it at 4× speed so the release never jumps.
- Layers, bottom to top: L1 the cove photo · L2 a CSS light field `#F5F5F5` · L3 the F-26 cutout · L4–L6 Turbo, GWR, GWX cutouts · L7 HTML type.
- **Registration:** measure front and rear wheel centres in both the photo and the cutout (source px, stored as JSON). L3 is scaled and translated so both wheel centres coincide with the photo's, at every viewport.
- Timeline:
  - 0.00–0.25 s — wordmark, sub-line and caption leave (opacity, y −16 px). No type survives into the transition.
  - 0.15–0.55 s — L3 fades in over the photographed car using the **shadow-free F-26 derivative** (so no white-seamless contact halo shows on the dark floor).
  - 0.30–0.95 s — L2 light field 0 → 1 under L3: the cove becomes the studio. At 0.85 the shadowed cutout swaps in (its contact shadow is meant for a light ground).
  - 0.95–1.75 s — pull back: L3 scales from hero size (~960 px long at 1440) to row size (~270 px) and travels to slot 1, front axle on the slot datum, tyres on the shared ground line. L4–L6 fade in at their final slots with x +24 px → 0, stagger 0.08 s. Ease `power3.out` — a camera settling, not objects flying.
  - 1.45–1.80 s — plate eyebrow, H2 and row captions fade in (opacity only).
- **Phone (≤ 1023, authored separately):** pin 80svh, same trigger and 1.6 s timeline, but the pull-back is vertical: the F-26 is already ~ the stack's scale on a 390 screen, so it barely shrinks and rises into the top slot of the vertical stack; Turbo, GWR, GWX appear below it on the front-axle datum, stagger 0.1 s.
- **Reduced motion:** no pin, no timeline. The hero stands as a still; scrolling meets a clean dark-to-light seam (a chapter cut) and the plate in its resting state. Nothing is lost.
- **No-JS:** the same as reduced motion — both states are in the document.

---

## 6. The comparison row (exact)

- **Cars, order:** F-26 · Turbo · GWR · GWX — GW's own "Standard" tier order (CI §1). Files as in §4/2. All left-facing; no mirroring, ever.
- **Shared scale:** each cutout scaled so its **wheelbase** (front-to-rear wheel centre) equals one value W. The F-26 is drawn at W × 1.013 because its rear wheelbase is extended 30 mm (F26-PR) on a 2,286 mm Turbo wheelbase (TFS). GWR and GWX are assumed at W (no published wheelbase) — that is why the method line says "drawn to one wheelbase", not "to scale".
- **Shared ground line:** tyre contact points (not the semi-transparent shadow) on one y. One 1 px rule `rgba(0,0,0,.12)` across the content width at that y — the only drawn line on the plate, because it *is* the shared floor.
- **Slots at 1440:** content 1200 px, four slots of 270 px, gap 40 px → W ≈ 152 px, cars ≈ 270 × 92 px. At 1920: slots ≈ 360 px, W ≈ 203 px. Turbo's 1400 px source stays above 2x at both (max use ≈ 400 CSS px; never larger anywhere on the page).
- **Under each car,** left-aligned to that car's **front-axle x** (so the type shows the registration):
  1. Name, humanist uppercase ~20 px: F-26 · TURBO · GWR · GWX.
  2. The figure — production, the one figure that does not contradict itself (BRIEF §4), Bebas Neue ~72 px: **26** (F26-PR; F26 "Limited to just 26 examples worldwide") · **75** (TURBO "Limited to 75 examples worldwide") · **40** (GWR "Limited to 40 Examples"). GWX has no number: a small black plate with gold `#C9A227` uppercase **BY INVITATION** — GW's own badge (CI §3.3), the only colour on the plate. (GWX-PR's "only three planned builds" is not used: GW's current page gives no number.)
  3. Unit line, 14 px `#333`: "examples" (none for GWX).
  4. GW's descriptor, 14–16 px: "The future of analog power." · "Turbocharged 993." · "The definitive 993." · "The pinnacle of innovation." (HOME).
  - The car, name and figure are one link per program ("Explore F-26" as accessible name).
- **No horsepower in the row.** Power lives in the film (F-26, one dated figure) and on the model pages. Turbo's power contradicts across sources (site 850 vs TFS 840 track mode) and is not needed here.
- **Phone / tablet (< 1024):** a **vertical stack**, not a carousel and not a shrunken row. One car per line at one wheelbase (W ≈ 0.54 × content width ≈ 189 px at 390), every front axle on one vertical datum, so the remasters read as the ragged differences at nose and tail. Name + figure on one line beneath each car (figure 44 px Bebas), descriptor below. Four cars ≈ 880 px, about one screen.

---

## 7. Scroll budget and motion

| Act | Pins | Length (desktop / phone) | Motion | Reduced-motion state |
|---|---|---|---|---|
| 1 Hero | with act 2 | 100vh / 100svh | none | the still |
| 2 House Lights | yes | +100vh / +80svh | triggered timeline, 1.8 s / 1.6 s, reversible | no pin; dark→light seam; plate at rest |
| 2 Plate (rest) | no | ≈120vh / ≈170svh | link underlines only | same |
| 3 Atelier | no | ≈110vh / ≈160svh | none | same |
| 4 Silence + peak | yes | 30vh black + **360vh** pin / 30svh + 300svh | **the only scrub**: canvas sequence 2.75→8.50 s, `scrub: 0.6`, linear | frame 0:07.25 still, caption below |
| 5 Provenance | no | ≈110vh / ≈180svh | none | same |
| 6 News | no | ≈110vh / ≈160svh | underlines | same |
| 7 Miami + form + footer | no | ≈190vh / ≈260svh | compact header only | same |
| **Page** | 2 pins, never nested | **≈ 12.3 viewports** / ≈ 14.5 | | |

- **Scrubs used: one.** The second allowance is deliberately unspent: the Turbo Goodwood take (0:06.75–0:14.25) is a second head-on approach — the same feeling as the peak, blown highlights; End Game 0:45.3–0:52.1 is a camera move on a still car; Speedster is 720p. Spending it would make the peak one of two.
- **Engine:** native scroll (DNA90 default; no documented need for Lenis). GSAP + ScrollTrigger, `gsap.context()` per section, `matchMedia` branches for ≥1024 / <1024 / reduced motion. Load `scroll-site` then `gsap-implementation` before building.
- **Peak sequence loads** when act 3 enters; until frame buckets pass the threshold, the pin shows the reduced-motion still (no blank canvas, no spinner).

**Performance budget**
- LCP element: hero image, preloaded, AVIF 2880 w (≈ 350 KB) / phone 1170 w (≈ 150 KB). LCP ≤ 2.0 s desktop cable, ≤ 2.5 s 4G phone. CLS 0.
- First screen total ≤ 1.2 MB (image, wordmark SVG 4 KB, fonts ≤ 120 KB, JS ≤ 90 KB gz).
- Page excluding the sequence ≤ 6 MB. Sequence ≤ 14 MB desktop, ≤ 6 MB phone, lazy. Largest single file ≤ 400 KB (hero AVIF / the 1920 w F-26 cutout for House Lights).
- Cutout derivatives: WebP/AVIF with alpha at the widths used (row 800 w, House Lights F-26 1920 w, PSP 1200 w). Never upscale; Turbo never above 1400 source px.

**Compositing plan (DNA101) — no generation; all supplied or local derivatives**

| ID | Source | Role | Alpha | Derivative |
|---|---|---|---|---|
| HERO-D / HERO-M | hero/02 desktop / mobile | background plate (car flattened into it) | no | AVIF 2880/1920/1440 w; mobile 1170 w + sampled haze fill colour |
| F26-CUT | cutouts/f26-profile-l-silver_4259x1457.png | persistent foreground subject (hero → row) | yes | 1920 w and 800 w |
| F26-CUT-NS | same | transition-only subject | yes | local: semi-alpha shadow below the rocker line removed (alpha < 0.85 → 0) |
| ROW-T / G / X | turbo 1400x466, gwr 4384, gwx 4342 | row subjects | yes | 800 w |
| LIGHT | CSS `#F5F5F5` | atmosphere / ground | — | HTML/CSS |
| SEQ-D / SEQ-M | video/gunther-werks-f-26-goodwood-fos.mp4 2.75–8.50 | film | no | frame sets as §4/4; phone set tracked-crop |
| SEQ-RM | same, t = 7.25 | reduced-motion still | no | 16:9 2560 w + 4:5 phone crop |
| ATELIER | hero/06 | plate | no | 4:3 and 4:5 crops |
| PSP-1/2/3 | rubystone, phoenix, bluephoenix profiles | subjects | yes | 1200 w |
| NEWS | news-events/brundle-edition/lead…, hero/07 mobile | plate | no | 4:5 |
| END-D / END-M | hero/03 desktop / mobile | background plate | no | as hero |
| Type, data, form | — | interface | — | HTML only |

---

## 8. Typography, colour, spacing

**Voices — two, plus tabular figures.**
1. **Humanist sans, replacing Gill Sans Nova.** Render both candidates on this page's real strings (the plate H2, the atelier body, the form) at 1440 and 390 and choose there: **Gillius ADF first** (the closer Gill descendant, GPL + font exception — check the webfont build for hinting and the uppercase W/K/R), **Cabin** the fallback (Google Fonts, variable, robust). One family does every role: display uppercase at weight 400, normal tracking, as GW sets it (CI §3.2); body sentence case; eyebrows uppercase 14 px tracked 0.12 em.
2. **Bebas Neue** (GW's own stat numerals, open source) — only for the figures: 26 · 75 · 40 · 90%+ · 4.0 L. Tabular.
- **Not used:** Javacom (licence), JetBrains Mono (mono micro-labels read as technical costume here; auction-editorial is not named), GW model logotype PNGs (names stay live text in the row).
- **Scale (relative, desktop → phone):** body 1rem (17 px), measure ≤ 62ch → same · captions/labels 0.875rem (14 px floor) → same · H2 ≈ 2.75rem → 1.875rem · row figures ≈ 4.5rem → 2.75rem · hero wordmark clamp(300px, 40vw, 720px) — the largest type on the page and the only display "type" that is not a heading. Adjacent levels ≥ 1.6×. No scenery type.

**Colour.** `#000` / `#0A0A0A` dark grounds, `#FFFFFF` and white alphas for type on dark, `#F5F5F5` light plate with `#111` / `#333` type, hairlines at .12 alpha — all GW's own values (CI §3.3). Program accents exactly as GW assigns them, and GW assigns very few: gold `#C9A227` on black for "By invitation" (used once, the GWX slot); GXR red `#FF2A3C` and Thermal red/navy are not needed on the home page and stay off it. F-26, Turbo and GWR have no UI accent at GW — their colour is the light in their photographs (warm cove, amber cove), and that is where colour lives on this page. Focus ring: GW's declared `#FF4500`, 2 px, 3 px offset (≥ 3:1 on both grounds). No gradients, no gold anywhere else.

**Spacing character.** Air around cars is part of the shot, not padding: no car is ever closer than one slot-gap to type or another car. Sections exhale downward (top 104 px / bottom 168 px at 1440; 64 / 104 at 390), from an 8-based scale 8 · 16 · 24 · 40 · 64 · 104 · 168. Density only in the second tier, the news list and the form — air between groups, not inside rows. Wide screens: content stops at 1600 px; the plates and photographs bleed, the type does not.

---

## 9. Killed

- **The brief's §3 idea** (lighting as concept) — opens on a style, fits any dark car site, contradicts the row.
- **GW's carousel hero and the GXR-EVO canyon autoplay** — eight rotating subjects is no subject; GXR is a special edition.
- **A second scrub** (Turbo Goodwood) — same feeling as the peak, adjacent; makes the peak one of two.
- **End Game crane-down as a scrub or as a home act** — a camera move on a still car, a 1-of-1 not for sale; it belongs on the commissions page.
- **Speedster orbit** — 720p and a completed legacy program.
- **Scrubbing House Lights** — a scrub on static objects as a section transition, which the brief forbids; it is triggered instead.
- **The comparison row on black** — the cutouts carry white-seamless contact halos (verified in the render: a pale puddle under the F-26 on dark).
- **Program cards, a cutout carousel (GW's menu), tabs** — difference read from containers, not from cars.
- **A before/after drag slider between remasters** — a known device, gesture-dependent, and it hides three of four cars.
- **Horsepower or a spec table under the row** — figures contradict across GW sources; the row's figure is production.
- **Count-up numbers, line-split and "decode" headline reveals** — GW's current site has them; they decorate evidence.
- **Mono micro-labels, crosshairs, "Fig." numbering** — technical costume (S-2K trap); auction-editorial not named.
- **Javacom model names / model logotype PNGs** — licence; live text is accessible and linkable.
- **Pseudo-360 interior** — one flat photo wrapped in a sphere (CI §4.3).
- **GW Haus / vineyard lifestyle chapter (hero/05, hero/08)** — events, not the Miami buyer's task; trimmed.
- **Thermal 9504 px still as hero** — special edition; the F-26 leads and has the film.
- **RennSport Aventura in Provenance** — "privately placed"; would imply the others are available.
- **Motor1 item in News** — its headline carries a price.
- **Mirrored cutouts** — no right-facing views exist; none are faked.
- **Lenis, scroll hijack, horizontal tracks, gate screens** — native scroll, the visitor keeps the transport.
- **Anything from Czinger / Pagani / Lamborghini Miami** — not carriers.

---

## 10. Open risks

1. **House Lights registration.** The cove photo and the cutout are the same profile angle but may differ slightly in camera height and lens. If wheel-centre registration leaves the roofline more than ~1 % apart, the 0.4 s overlap shows a double image. Fallback: start L3 only when L2 ≥ 0.6, so the dissolve happens mostly into light. Test at 1440 and 390 before anything else is built.
2. **Edge-to-edge portrait frames.** Both mobile photos (hero/02-mobile, hero/03-mobile) have the car at 3–97 % of width; the width-fit + sampled-fill approach can show a seam at the haze. Verify on device; if it shows, extend the image with the sampled colour as a radial, not a band.
3. **Cutout edges.** Fringing at 100 % on `#F5F5F5` was never checked (CI §8 "Not verified"). F-26 wing tip and GWR roof touch their canvas edges; Phoenix nose and tail touch theirs — confirm nothing is clipped at the sizes used.
4. **Sequence weight.** 11–14 MB desktop, ≤ 6 MB phone on an event clip with crowd and hay-bale detail that compresses poorly. If WebP q70 overshoots, drop to 1600 w desktop before dropping frames. The tracked portrait crop is hand-keyed work.
5. **Fast scroll through House Lights.** A triggered timeline inside a pin can be overtaken; the `onLeave` speed-up must be checked with trackpad flings and keyboard Page Down.
6. **Facts chosen under Alex's rule.** F-26 = 1,000 hp and 2,700 lb per F26-PR (15 Aug 2025), not the site's 1,067 hp / 2,750 lbs; only 1,000 hp is shown. GWX shown as "By invitation", not "three planned builds" (GWX-PR, Aug 2025, older than the current page). PSP warranty (3-year vs 5-year) not shown. Founding year (2015 vs 2017 in one document) not shown.
7. **[?] Provenance Succession through Prestige** — written as Alex decided; to confirm. The copy makes no per-car availability claim either way.
8. **"Over 90%"** comes from the undated background PDF; the site says "most of its componentry". Compatible, but if Alex wants only dated sources, swap the figure for STORY's carbon/CNC line.
9. **Typeface.** Gillius ADF's web build quality is unknown; Cabin is the safe fallback. Decide on the render, not the specimen.
10. **Goodwood footage.** The driver in the clip is not identified anywhere we hold; no name is written.
