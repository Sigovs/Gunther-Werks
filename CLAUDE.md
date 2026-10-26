# Gunther Werks Miami — Prestige Imports child site

The fourth child site for Prestige Imports, after Czinger Miami, Pagani of Miami and Lamborghini (more will follow).
Siblings to learn from: `../PRESTIGE_CZINGER`, `../PRESTIGE_PAGANI`, `../PRESTIGE_LAMBORGHNI/PRESTIGE_LAMBO`.

Brief: [BRIEF.md](BRIEF.md) (copy of design_dna/projects/briefs/gunther-werks-miami-2026-10-25.md, which is the source). Concept: [CONCEPT.md](CONCEPT.md) (25 Oct 2026, home page only). Client assets: `Alex Assets/`.

---

## ⛔ Before any visual work

1. Load the `design-dna` skill. It resolves `TASTE.md` and routes to the taste skills the task needs.
2. Read [.claude/rules/design-dna.md](.claude/rules/design-dna.md) and obey it. It is the build standard.
   It is a junction to the live master in `c:/____WORK/_____GDBURO SIGOFF/design_dna/.claude/rules/`, not a copy.
3. For scroll-led, cinematic or 3D work, load `scroll-site` before any markup.

Fallback if the local clone is missing: fetch TASTE.md, .claude/rules/design-dna.md
and skills/ from https://github.com/Sigovs/design_dna.

Dealer contact (confirmed by Alex, 25 Oct 2026 — as listed on guntherwerks.com/dealer/): Prestige Imports · 15050 Biscayne Blvd · Javier Roque · (305) 783-6493 · Javier@PrestigeImports.com.
NOT the sibling sites' 14780 Biscayne / (833) 290-6287 — that is the Prestige main showroom, not this site's contact.

Figures follow `content-provenance`: sourced and uncontradicted only, never invented.

**Home prototype v2.1 (25 Oct 2026; v2 rebuilt after Alex's 2/10 on v1, v1 kept in `prototype/home/_v1/`; v2.1 shortened to ~26 viewports at 1440):** `prototype/home/` — static HTML/CSS/JS, GSAP + ScrollTrigger + Lenis in `vendor/`. Run `python -m http.server` from that folder. Nine chapters; House Lights is a scrubbed pin (rim band → light sweep wipe → pull-back) that becomes the line-up, whose "pull it out" inspection is shared by hover, focus, tap and four scroll steps. Wheel registration in `home.js` (`CUT`, `PHOTO`, `PHOTO_M`), callout points in `data-pt` on each `.pd-changed li`. v2 images in `assets/v2/` (derived from `research/corp/assets/v2dl/` and `gallery/`). QA shots in `_shots/v2/` and `_shots/v2_1/`. Fonts: Cabin stand-in; Gillius ADF still to be compared.

**Home Concept B (25 Oct 2026, from CONCEPT-B.md, for Alex to compare with A):** `prototype/home-b/` — `python -m http.server 8766` there. One render loop in `home.js` (Lenis on the GSAP ticker; ScrollTrigger only for one-shot reveals and the sketch drift); modes `track` (≥1024), `lift` (<1024), `static` (reduced motion / no GSAP). Selective colour = graded B/W + the original's own chroma inside a rembg (isnet) mask, so there is no luminance seam and no halo. Locked in B: line scroll ratio .42, First Coat hold 1.2vh, 06 = 84vw, the road release cut into a static slide-over inside 07, header tone sampled per zone under the header. QA in `prototype/home-b/_shots/`.

**Home Concept C (25 Oct 2026, from CONCEPT-C.md, static concept image, awaiting Alex's score):** `prototype/concept-c/` — static HTML/CSS, no JS. Two authored compositions: 1440×900 base and 1920×1080 (`@media (min-width:1680px)` raises `--t` type 1.16, `--k` space 1.28, gutter 88→128). Renders: `CONCEPT-C-1440.png` / `CONCEPT-C-1920.png` (+ `-half.jpg`), per-section PNGs in `sections/1440|1920/`. In the full-page render `html.full` makes the header absolute and shows the scrolled-state duplicate over the F-26 screen. Mobile (390) deliberately not built yet — Alex will do it later.

**Home Concept D (25 Oct 2026, static concept image, awaiting Alex's score):** `prototype/concept-d/` — see its CONCEPT-D.md. GW's own catalogue language: each program in its GW "Active Programs" cove with GW's model logotype behind a rembg-masked car (`cove-*.jpg` + `car-*.webp`), GW stat block (Bebas + mono unit), tiered collection with GW badges, commission journey 01–06, "Begin your Gunther Werks" = GW owner's-application questions → Javier Roque. Type: Instrument Sans 88% width (Alex's call, "closer to Porsche"), Bebas figures, JetBrains Mono units/badges. Full-page PNGs are the 15 viewport screens stitched with the fixed nav in its per-screen state. GW logotype files saved to `research/corp/assets/logotypes/`.

**Home Concept E — working prototype, "Glass & Key" (25 Oct 2026):** `prototype/concept-e/` — run `python -m http.server 8797` there. Built to `concept-e/UI-E.md` + `prototype/CD-REVIEW.md` (D/E device ownership is binding). GSAP + ScrollTrigger + Lenis in `vendor/`, logic in `e.js` (`window.__E` exposes setStudio / setAtelier / openSheet). Studio and special editions are one stage; coves are GW photos with the car painted out (`assets/cove-*.jpg`); the showroom is haze + torch reveal, no cones; Goodwood film frames in `assets/seq/` (desktop, 115) and `assets/seq-m/` (phone, 48). Contrast is measured with reduced transparency emulated OFF (this machine reports it ON, so plain Chrome here shows the solid glass fallback). Shots: `_shots/build/`; motion frames: `sections/motion/`. The afternoon static images (CONCEPT-E-*.png) are history.

**Concept F — working prototype (25–26 Oct 2026, to CONCEPT-F.md):** `prototype/concept-f/` (self-contained; served at :8790/PRESTIGE_GUNTHER/prototype/concept-f/). `index.html` + `f.css` + `f.js`, vendor GSAP/ScrollTrigger/Lenis. Hero = GW's F-26 warm cove set back to 86 % inside a blurred copy of itself (GW's own portrait frame on phones/portrait tablets). §2 House Lights: pinned only for the light-up (≥1200 wide and ≥700 tall), dark cove + GW silhouette contour → white seamless; 8 Profile L cutouts registered by tyre contact points (`REG` in f.js; measured by `_tools/measure_wheels.py` → `_tools/register.py`, which also writes the outline masks `assets/hl/*-line.png` used for the hover ghost and the dark-state rim). Mobile keeps one pin (Goodwood). 1920×1080 page height 10,566 px. QA evidence in `concept-f/_shots/`.
- **26 Oct 2026, my own QA and fixes:**
  - The hero scrub (title fade, push-in) never ran. The hero's hold pin shifted its `'top top'` start to 900 px, so the H1 was sliced by the incoming panel. The timeline now uses an absolute range 0→vh.
  - The program change now puts the new car over the old one, which stays solid and drops out late; the white cove no longer shows through mid-change.
  - Re-QA at 1920/1440/1024/768/390/360: overflow 0, errors 0.
  - Videos: `_archive/video/GW-Miami_concept-F_scroll_1920.mp4` and `…_house-lights_1920.mp4`. Next: Alex's score.

**Concept G (26 Oct 2026): F with three sections replaced.**
- **Rules:**
  - Concept F stays untouched as the reference and fallback.
  - G is a separate copy in `prototype/concept-g/`.
  - Nothing in G is coded until the visual contracts are approved.
  - The contracts board is `concept-g/_contracts/index.html`.
- **Rejected in F (Alex, 26 Oct):**
  - **Programs ("House Lights")** failed on both UX and UI: the active state and navigation were unclear, the text and switcher were tiny, and the special editions were mixed in.
  - **The Goodwood scroll-scrub** of weak event footage.
  - **"Talk to Javier"**, a large pale pane over the image.
- **Rules that follow:**
  - Never scroll-scrub footage that is not strong at normal speed. Test it as a plain loop first; if it fails, use a still.
  - Contact must not hinge on one named person: a named contact is secondary only.
  - No pane or floating card covering a meaningful photograph.
  - Programs = one section where the four programs are the navigation, with the same three facts per program, one primary action, and the special editions in a separate group.
- **Contract v2 rules (Alex, 26 Oct; board at `concept-g/_contracts/index.html`, v1 kept as `index-v1.html`):**
  - **Cars:**
    - No ghost, outline, silhouette or second car layered over the selected car, and no hover-only effects. Selecting a program replaces the car directly.
    - On a dark site, cars sit on a consistent light, neutral studio plate with a believable floor and contact shadow. Never cutouts floating on black, never glow or edge light.
    - Check every car at its actual display size, including the wheels, tyres and lower body.
    - GW's cutouts carry baked floor shadows (Brundle has a hard black bar). They are cleaned in alpha only, in `_contracts/img/cut/`.
  - **Copy:** none that repeats what the heading, image or UI already says. No descriptive photo captions.
  - **Photos:** confirm provenance before presenting anything as documentary. The Goodwood flame shot is withdrawn: GW has two versions and the flame is unconfirmed. Use the start-box photo DS401822 instead.
  - **Contact:**
    - One purpose and one action ("Make an enquiry" → compact form in place). No showroom, phone or email blocks, and no specialist credit.
    - Unresolved contact details stay out: the Miami address and phone conflict across sources (GW 15050 / Prestige 14780 / duPont 14800).
  - **fal.ai:** ceiling $8 cumulative for this project, spent $0 as of 26 Oct. Show the assets, the reason and the estimate before any spend.
- **Concept G is the working base (Alex, 26 Oct: "a solid good").** Next comes a round of small edits inside G, not a new concept.
- **Concept G2 (26 Oct, `prototype/concept-g2/`)** is the working variation of G. G and F are kept unchanged. Rules from this round, which bind the site from here on:
  - **No visitor-facing external links or source citations.** Sources and attribution live in `concept-g2/CONTENT-SOURCES.md`.
  - **News & events are read on the site.** Each item opens a dialog with GW's own wording for that post.
  - **Header phone (305) 783-6493 stays.** No street address, email, named person or hours anywhere until confirmed. The form stays labelled as a prototype.
  - **Provenance:** one vehicle (Rubystone) with only the verified details and one enquiry action, the photograph leading. Never "Available commission", stacked sales copy or link lists.
  - **Special editions:** one quiet caption row per photo, the name with the production number to its right (stacked on phones).
  - **Interlude:** GW's Project End Game film (0:11.1–0:24.4), a muted loop with a pause control and one centred line, "Designed for pleasure." (GW's tagline).
    - The line was measured at ≥3:1 on every 0.5 s frame at 1440 and 390, behind a soft scrim.
    - Reduced motion shows the poster. $0 fal.ai.
  - **Atelier:** a one-time entrance (eyebrow → masked lines → paragraph → statistics in masks → engine, carbon, key). Then pointer depth on desktop with a fine pointer only:
    - each photo shifts inside its own frame at 3, 7 and 10 px;
    - the offset is clamped to the real geometry every frame;
    - a 1.03–1.06 overscan applies only while the effect is on.
  - **Hero (Alex, 26 Oct, later rounds):**
    - four GW studio slides (F-26, Turbo, Thermal, Brundle) with a controller: index, progress bars, prev/pause/next;
    - the display line (first line bold, second regular) and the paragraph under it change per slide, stepping out left and in from the right;
    - the dealer line is a small vertical tag in acid green `--acid #3dff6e` on the hero's right edge. It is the only bright accent on the site; don't spread it.
  - **Pins (desktop, no scrub):** hero, Programs (editions slide over), the film (Atelier rises over it with rounded shoulders while the film dims), Goodwood, Provenance.
  - **Programs car change:** strictly one car at a time. The old car rolls out, then the new one rolls in along the floor, in tab direction.
  - **Text sits level with the top of its photograph** (Provenance, Goodwood, Atelier). Provenance details sit right under the name.
  - **Buttons:** hover is a fill sweeping in from the left, with the label inverting.
  - **Nav hover:** letters roll inside a mask (21st.dev "Stagger Text" idea). The glow pool was rejected.
  - **Contact:** the form sits open under the heading, with no toggle and no "Prototype" label. The submit note still says nothing was sent.
  - **Text reveals:** one system for every section, slowed down on 26 Oct ("arrives too fast, motion not visible") to 1.5–1.7 s titles. Kicker fade → title lines from masks → supporting blocks rise 16 px; once per section. Buttons, tabs and forms are never held back.
- **G integrated (26 Oct, Alex approved contracts v2):** `concept-g/index.html` + `f.css` + `f.js`. Concept F is untouched (no F file changed after the G copy).
  - **Programs:** `#programs` (`.pg`) + `#special-editions` (`.pse`).
    - Cleaned cutouts in `assets/pg/`, with the registration inlined as styles so the section works without JS.
    - Tabs: click, ←/→/Home/End with roving tabindex, swipe on the plate.
    - `window.__G.measure()` reads the registration back.
  - **Goodwood:** `.gwd`, no scrub. The `assets/seq*` frames and `goodwood.jpg` are no longer referenced.
  - **Contact:** `.ct`, one button that opens the form in place.
    - The form is a labelled prototype: it validates, then says nothing was sent. It must not be connected until the destination is confirmed.
    - Without JS the form is shown open.
  - **Old CSS:** the House Lights, film and Miami-pane rules remain in `f.css` as dead code.
  - **Open:** the header, menu sheet and footer still carry F's (305) number, the 15050 address and Javier's details. The Miami contact conflict is unresolved, so this needs a site-wide decision.

**Concept D prototype (25 Oct 2026, "Billet & Gauge" per prototype/concept-d/UI-D.md + prototype/CD-REVIEW.md):** `prototype/concept-d/` index.html + concept-d.css + concept-d.js, vendor GSAP/ScrollTrigger/Lenis. Desktop master; phone adapts it. Peak = the pinned programs stage (cove re-light, logotype behind a masked car, needle + odometer). QA shots in `prototype/concept-d/_shots/build/<width>/`. The old static concept renders in that folder are kept untouched.

## Feedback log

- **Scope (Alex, 25 Oct 2026):** a trimmed, corporate-type version of guntherwerks.com, in OUR design. Do not carry 100% of the corp site's content: select what a dealer visitor needs. The corp site is the source of facts and brand carriers (logo, name, model names, figures), not the layout to copy.
- **Sitemap direction (Alex, 25 Oct 2026):** home (atelier story, lineup, Provenance Succession pre-owned, Miami, enquire) · model pages F-26 / Turbo / GWR / GWX · special editions and legacy grouped · **News & Events taken from GW's newsroom and events** · contact. Left on guntherwerks.com: careers, media kit, owners application, GW9 store, become a dealer, JA, single commission pages.
- **Motion and wow (Alex, 25 Oct 2026, on prototype v1 — "bland and boring at once, no wow"):** this site needs authored, rich scroll motion. Overrides the brief's restraint (C1e "scrub only on moving subjects", "House Lights triggered not scrubbed", "no slide-in text"):
  - navigation is ALWAYS visible (fixed), never scrolls away;
  - pinned holds (pin stops) where a section has something to show in steps;
  - sections overlap (the next one slides over the pinned previous one);
  - "large screens": full-bleed, full-screen imagery moments;
  - parallax wherever it adds depth (images inside masks, layered cutouts, type vs image);
  - soft slide-in / masked reveals of text on scroll;
  - the scrub must carry useful information keyed to the film, or it is pointless;
  - the hero → models transition must be elegant and scroll-driven, not an abrupt crossfade.
  Invariants still hold: reduced-motion state, legibility, no text on a car's key features, no layout jank.
- **Concept C is the working direction (Alex, 25 Oct 2026: "now that's something more interesting"):** prototype/concept-c — brand presentation in the Czinger/Pagani logic, one full screen per section, Rivian-style giant model names behind profile cutouts, Czinger-style spec plates, Porsche-Racing-style special editions and dated heritage strip. Next: refine the image with Alex, then add motion on top of it.
- **Concepts D and E both approved to build (Alex, 25 Oct 2026: "I like both very much… build both!").** Desktop first (1920/1440); mobile later by hand with Alex.
- **Don't borrow a reference's UI openly (Alex, 25 Oct 2026, on E's details stage):** racing.porsche.com's black rounded cards, square corner-arrow buttons, white dots and black pill tabs were copied too literally. Take the idea, redraw the components in our own language. Gunther UI language "Glass & Key": hotspots shaped as GW's X-pattern key mark (breathing; rotates 45° into "+" on hover); frosted-glass panels (strong backdrop blur, faint warm studio tint, a thin light edge like a glass highlight); leader lines with a gap at the dot, drawn on reveal; mono micro-units; tabs as a thin glass track with a sliding pool of light under the active item; "go" arrows as a hairline that lengthens on hover; glass nav bar.
- **Mobile follows desktop (Alex, 25 Oct 2026):** desktop is the master; the phone version is a faithful adaptation — same sections, order, images, UI language and signature moments, re-scaled and re-stacked, touch equivalents for hover. No separate phone concept.
- **Status 25 Oct 2026 (end of the 2 h autonomous run):** D (Billet & Gauge) and E (Glass & Key) are working desktop+phone prototypes, both passed my own wheel-scroll QA at 1440/390 after one fix round each (D: header bleed, black frames in the programs stage, phone voids; E: silhouette blob, stacked half-scenes, caption bleed). Next: Alex scores both and picks a direction.
- **Score for D and E v1 (Alex, 25 Oct 2026): "both good, 5–6–7/10 in places."** Saved as-is, untouched, in `prototype/_archive/concept-d_v1_2026-10-25` and `concept-e_v1_2026-10-25` (QA shots excluded). The working folders `concept-d/` and `concept-e/` move on from here. Good but below the bar. The next round has to lift the weak moments to the strongest ones, not add more devices.
- **Verdict on v1 (Alex, 25 Oct 2026): D 6.5/10, E 7/10.**
  - **D:** strong art direction (dark cove, red light, big type). But it acts like a poster: giant names, repeated figures and the repeated dark panel pull attention from the car and from the sale. The programs are separate scenes, so they read as a long scroll and can't be compared. The navigation is heavy, and Prestige/Miami barely shows.
  - **E:** clearer as a dealer homepage and better tied to Miami/Prestige/Javier. But it sprawls into a catalogue of everything: the slogan screen, the long news strip, the provenance grid, the commission, events, the form. "We don't sell cars. We deliver dreams." reads as generic marketing and weakens the engineering story.
  - **Direction (binding):** E's structure plus D's dark-cove boldness. Rebuild section 02 as ONE "House Lights" slider: one big car at a time, the same profile, scale and floor line for every car, a compact program switcher, and the concrete sourced differences beside the car. The other programs never appear as further sections or as tiny cards.
  - **Cut repeats, decorative screens and duplicated proof, never facts a buyer needs.** Keep one strong example each for programs, provenance, craft and the Miami enquiry.
- **Decisions taken autonomously (25 Oct 2026, Alex away for 2 h):** press outlets shown as names set in type, not their logos (rights unverified); E's Miami close sits on a GW scene, never a fake Miami image; D keeps GW's own orange needle #FF4500 as its only accent unless it reads loud (fallback white); E's showroom uses haze + feathered reveal, overriding the CD's soft-cone suggestion.
- **No stage-light cones (Alex, 25 Oct 2026):** a hard-edged spotlight cone over a car "looks very cheap". Light must feel like real studio light: soft haze blooms, feathered colour reveal following the pointer, fine film grain to kill banding, faint floor reflection. Refs (ideas only): 21st.dev Torch Reveal, velvet haze, Light Shader.
- **D and E are two DIFFERENT examples, each with its own UI (Alex, 25 Oct 2026):** D = "Billet & Gauge" (`prototype/concept-d/UI-D.md`), E = "Glass & Key" (`prototype/concept-e/UI-E.md`). Device ownership is in `prototype/CD-REVIEW.md` §1: a device from one column never appears in the other (no glass/blur in D; no grooves/needles/mono in E).
- **Mobile is in production; desktop is the master (Alex, 25 Oct 2026):** "the desktop is right — we fit the mobile to it." Phone = the same components and moments re-scaled/re-stacked, with touch equivalents for hover, bottom sheets, tracks in the thumb zone, ≥44 px targets, one pin per page, no parallax. Not a re-authored phone concept.
- **Typeface approved (Alex, 25 Oct 2026):** Instrument Sans (Google Fonts, variable, width ~88%) — the closest free match to Porsche Next; statements weight 400 in sentence case, nav/labels 500; Bebas Neue for big figures only. Cabin rejected (big caps + fat white pills read "cheerful", not luxury); buttons are slim outlines or text links with an arrow.
- **No one to ask (Alex, 25 Oct 2026):** the client relies on us to know everything; there is no channel to ask the dealer or Gunther Werks. Decide from the research and GW's own published material; never leave a "confirm with the client" gap — take the best-sourced answer and note its source.
- **Gunther style, not a sibling's layout (Alex, 25 Oct 2026, on Concept C):** don't copy Czinger's model section 1:1 (light ground + dark spec plate). The idea is right — big cutout, large names (he loves them) — but the layout must come from Gunther Werks' own language.
- **Drafts, not the direction (Alex, 25 Oct 2026):** home Concept A (prototype/home, v2.1) and Concept B (prototype/home-b) are kept as working drafts (наработки). The next direction starts from a concept IMAGE of the whole page, modelled on the clear brand presentation of our Pagani, Czinger and Lamborghini sites (their message and structure, not their palette/type) and on rivian.com and racing.porsche.com.
- **Show the whole page, every section full screen (Alex, 25 Oct 2026):** for this site the concept is shown as the full home page with all its sections. A hero-only board is fine when Alex asks for just the hero; ask which when it is unclear. Each section fits one full screen (100svh) unless its content truly needs more. The site is a full brand child site, not a landing hero.
- **Direction idea, not yet decided (Alex, 25 Oct 2026):** scroll-scrubbed video may suit this site — the cars and the corp films are strong enough to carry it. If it goes ahead, load `scroll-site` before any markup. Stack named by Alex: GSAP (ScrollTrigger) — load `gsap-implementation` once motion is approved.
- **Luxury, not cheerful (Alex, 25 Oct 2026, on C's closing screen):** no fat white pills — thin 1px outline buttons ~40 px with a small tracked label, at most one slim filled primary per screen; statements calm, sentence case, never shouty caps; statements in GW's own words ("Reengineered and remastered.", "Designed for pleasure."), not invented slogans. Cabin caps read friendly — dropped; type for D is Instrument Sans at 88% width.
- **Craft bar = racing.porsche.com, never its components (Alex, 25 Oct 2026):** take its neatness (quiet interface, huge imagery, one thing per screen, precise alignment); do not reuse its pill nav, black rounded cards, corner-arrow squares or black pill tabs.
- **D and E are two different UI languages (Alex, 25 Oct 2026):** E = "Glass & Key". D = "Billet & Gauge", from GW's machined billet parts, CNC work and the F-26's satin stealth gauge rings: graphite plates with an engraved hairline frame inset 6–8 px, satin brushed gradient, 4–6 px radii; markers as machined bezel rings (outer ring + inner dot, rotates a few degrees on hover, notch points like a needle); tabs as a slim scale with ticks and a sliding needle; slim rectangular buttons with a 1 px satin gradient edge, hover = one satin sweep; links = hairline with a travelling notch; graphite nav bar with engraved hairline, always visible; form fields = engraved underline that fills like a gauge sweep on focus; micro-motion 180–320 ms ease-out with a tiny settle. Every tick or ring marks something real.
- **Identity (Alex, 25 Oct 2026):** Gunther Werks' own brand stays recognisable; the sibling sites' (Czinger, Pagani, Lamborghini) ground, palette and type are not inherited — decided again from evidence.
