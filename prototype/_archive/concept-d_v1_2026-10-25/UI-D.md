# UI-D — "Billet & Gauge" · the interface system for Concept D

25 Oct 2026 · art direction · for the designer building `prototype/concept-d/`.
Read with `CONCEPT-D.md` (sections, facts) and `../CD-REVIEW.md` (what to fix first).
This file replaces the interim "Billet & Gauge" note wherever they differ. The differences are listed in §12.

**Desktop is the master.** Every component is drawn at 1440 first. 1920 scales it, and the phone is a faithful adaptation: the same components and moments, re-scaled and re-stacked, with touch replacing hover. It is not a separate phone concept. Phone behaviour is given per component and summarised in §10.

---

## 1. The idea

> **Every control on the page is a machined part: cut into graphite, read like a gauge, moved by a detent.**

Why it belongs to Gunther Werks and nobody else:

- **The billet key.** GW's key is a machined aluminium octagon with the X cut through it. The object the owner is handed at delivery is a CNC part, not a logo.
- **In-house machining.** "Over 90% of components are designed and produced internally" (BG-PDF). Carbon and CNC parts come from their own shop, and the craft gallery is full of billet parts, shifters and machined bezels.
- **The gauge.** GW's own cluster (`delivery` frame: "5 YEAR / 100K MILE WARRANTY" on a white-faced dial with an **orange needle**) is the most GW-specific interface in their whole photo library. An analog dial is the brand's thesis ("The future of analog power", "analog soul"; "analog" appears 18 times in their copy).
- **GW's own CSS already holds this palette and has never used it.** `--graphite:#1A1A1A` is declared and unused. `--accent-color:#FF4500` is declared for focus outlines and a few hovers. D finally uses both, for what they were declared for.
- **GW's own CTA move.** Their pill CTA draws its 1px stroke on hover (`cta-stroke-draw .6s`). D keeps that gesture and drops the pill.

**What D is.** An instrument panel lit for a showroom. Precision, weight and a detent. It is quiet until touched, and then it moves exactly, on one axis, and settles.

**What D is not.** It is not skeuomorphic. There are no brushed-metal textures, screws, rivets, knurling bitmaps or 3D bevels. The material is *implied* by three marks, listed in §2, and nothing else.

### NOT taken from racing.porsche.com

| Porsche device | D replaces it with |
|---|---|
| Floating dark centred nav pill + separate right pill | No container at all. A centred GW lockup (GW's own header arrangement), links set straight on the image over a tonal scrim, and an orange needle tick marking the current section |
| Black rounded cards, radius 14–16 | Graphite plates, chamfer 4, with an engraved inset groove. Photos at radius 2 |
| Square dark corner button with ↗ | **D never puts an icon in a box.** The go-cue is an inline hairline arrow that moves on a detent |
| White dot hotspots with a halo | A machined bezel ring that makes one quarter-turn to "set" itself, then stays still. It never breathes |
| Black pill tabs with a white filled active pill | A tick scale with a sliding orange needle |
| Rising white rounded panel | A graphite plate docked flush into the photograph. It does not rise; its content advances |
| Huge years over B/W photos + dark caption cards + pager dots | A 2017–2026 tick-scale timeline with a needle (§7.6) |
| Expand ↗↙ squares, eye toggle | A chevron notch that turns 90°, and a text toggle |
| Dots-and-arrows pager | An odometer counter ("02 / 04") with rolling digits |

### NOT shared with Concept E ("Glass & Key")

D never uses **blur, glass, translucency over photos, glow, light pools, breathing, the X-key glyph as a control, or capsule shapes.** E never uses **grooves, needles, tick scales, mono stamps, or chamfered plates.** If a component could sit in either page, it is wrong in one of them.

---

## 2. The material: three marks and a needle

The whole visual vocabulary is these four, plus type. If something needs a fifth mark, the component is wrong.

| Mark | What it is | Value (dark ground) | Value (light ground `#F5F5F5`) |
|---|---|---|---|
| **Groove** (engraved line) | Two adjacent 1 px lines: a cut, then its lit lower lip | `1px rgba(0,0,0,.72)` + `1px rgba(255,255,255,.07)` directly below | `1px rgba(0,0,0,.16)` + `1px rgba(255,255,255,.92)` below |
| **Satin** (machined face) | A vertical gradient with **≤3% luminance travel**, felt rather than seen | `linear-gradient(180deg,#171717 0%,#121212 100%)` | `linear-gradient(180deg,#EFEFED 0%,#E7E7E5 100%)` |
| **Chamfer** (edge) | Radius 2–4 plus a 1 px top-inner highlight and a 1 px bottom-inner shade | `inset 0 1px 0 rgba(255,255,255,.08), inset 0 -1px 0 rgba(0,0,0,.5)` | `inset 0 1px 0 rgba(255,255,255,.95), inset 0 -1px 0 rgba(0,0,0,.08)` |
| **Needle** | A 2 px orange bar or ring that marks *where you are / what is chosen / what has focus*. Nothing else is orange | `#FF4500` | `#FF4500` (UI only, 3.16:1 on `#F5F5F5`; never text on light) |

**Hard limits.** No `box-shadow` used for elevation. The only shadows in D are the inset chamfer lines. No `backdrop-filter`. No gradient that reads as a gradient: test this by squinting. If you can see where the gradient starts, it is too strong. The orange is never a fill larger than 2×16 px, apart from the selected radio dot (8 px).

---

## 3. Tokens

Extend the existing `:root` in `concept-d.css` (names kept where they exist). Every value below is the 1440 value. `≥1680px` keeps the existing `--t:1.2; --k:1.3`.

### 3.1 Colour and alpha

| Token | Value | Use | Measured |
|---|---|---|---|
| `--black` | `#000` | page ground under coves | — |
| `--ink` | `#0A0A0A` | default dark ground | — |
| `--graphite` | `#121212` | plate base (satin bottom) | — |
| `--graphite-hi` | `#171717` | plate satin top | — |
| `--graphite-2` | `#1A1A1A` | plate hover / raised (GW `--graphite`) | — |
| `--paper` | `#F5F5F5` | light ground (Collection, Provenance) | — |
| `--alu` | `#E9E9E7` | primary button face (top) | — |
| `--alu-2` | `#D9D9D6` | primary button face (bottom) | — |
| `--on-d` | `rgba(255,255,255,.94)` | primary text on dark | 17.4:1 on `--ink` |
| `--on-d-2` | `rgba(255,255,255,.74)` | body / secondary on dark | 10.8:1 |
| `--on-d-3` | `rgba(255,255,255,.58)` | tertiary, stamps, sources: **the floor for any text on dark** | 6.9:1 on `--ink`, 6.5:1 on `--graphite` |
| `--on-l` | `#0A0A0A` | primary on light | 18.1:1 on `--paper` |
| `--on-l-2` | `rgba(0,0,0,.70)` | secondary on light | 8.2:1 |
| `--on-l-3` | `rgba(0,0,0,.58)` | floor on light | 5.3:1 |
| `--needle` | `#FF4500` | active / selected / focus / progress | 5.8:1 on `--ink` (UI ≥3:1 ✓) |
| `--gold` | `#C9A227` | "By invitation only" badge only (GW) | 8.7:1 on `--black` |
| `--gxr` | `#FF2A3C` | "Track focused" badge only (GW) | 5.6:1 on `--black` |
| `--err-d` | `#FF6B5E` | error text and line on dark (GW `#C62828` lifted for a dark ground) | 7.1:1 on `--ink` |
| `--err-l` | `#C62828` | error on light (GW's own) | 5.6:1 on `#FFF`, 5.1:1 on `--paper` |
| `--scrim-d` | `linear-gradient(180deg,rgba(0,0,0,.62) 0,rgba(0,0,0,.34) 64px,rgba(0,0,0,0) 128px)` | header legibility on dark screens | — |
| `--scrim-l` | `linear-gradient(180deg,rgba(245,245,245,.86) 0,rgba(245,245,245,.5) 64px,rgba(245,245,245,0) 128px)` | header legibility on light screens | — |

The ratios above are token ratios. Text over photographs is re-measured on the composited render (§11).

### 3.2 Radii (the chamfer scale)

`--r-0: 0` (full-bleed media) · `--r-1: 2px` (photos, fields, checkboxes) · `--r-2: 4px` (buttons, badges, plates) · `--r-3: 8px` (sheets, the large docked plate). **Nothing above 8. No pills.** The existing `--r-s/m/l` (10/14/20) are removed.

### 3.3 Strokes

`--hair: 1px` · `--groove: 2px` (two 1 px lines, §2) · `--needle-w: 2px` · `--focus-w: 2px`. Ticks: minor `1×4 px`, major `1×8 px`, hover major `1×12 px`, needle `2×14 px`.

### 3.4 Blur, shadow, highlight

Blur: **none, anywhere.** Shadow: **none.** Highlights: the chamfer insets (§2), and the one-time **sweep** on the primary button: a band `linear-gradient(100deg,transparent 0,rgba(255,255,255,.55) 50%,transparent 100%)`, 40% of the button's width, skewed −20°.

### 3.5 Spacing

4-based, multiplied by `--k`: `--s1 4 · --s2 8 · --s3 12 · --s4 16 · --s5 24 · --s6 32 · --s7 48 · --s8 64 · --s9 96 · --s10 128`.

| | 1920 | 1440 | 1024 | 768 | 430 | 390 |
|---|---|---|---|---|---|---|
| Page gutter `--gut` | 120 | 80 | 48 | 32 | 24 | 20 |
| Header band `--hdr` | 88 | 72 | 64 | 60 | 56 | 56 |
| First line under header | `--hdr + 64` | `--hdr + 64` (136) | `--hdr + 48` | `--hdr + 40` | `--hdr + 32` | `--hdr + 32` |
| Content end above screen bottom (full-screen sections) | ≥ 112 | ≥ 80 | ≥ 64 | ≥ 56 | ≥ 40 + safe-area | ≥ 40 + safe-area |

Rhythm rule: **inside a group < between groups < between sections.** Label→value 8, item→item 24–32, group→group 64, section top/bottom per the table.

### 3.6 Type roles

Instrument Sans (variable, `font-stretch: 88%` = `"wdth" 88`), Bebas Neue, JetBrains Mono. In D, **mono is the machinist's stamp.** It carries every kicker, index, unit, badge, date and source line. That is D's typographic tell; E barely uses mono.

| Role | Face / settings | 1440 | 1920 | 390 / 430 | Notes |
|---|---|---|---|---|---|
| `display-xl` (hero H1, footer tagline) | Instrument Sans 400, wdth 88, −0.025em, lh 1.00 | 72 | 86 | 40 / 44 | sentence case, GW words only |
| `display-l` (section statement) | same, −0.02em, lh 1.02 | 56 | 67 | 34 / 36 | |
| `title` (step, card, program line) | Instrument Sans 400, lh 1.2 | 28 | 34 | 22 / 24 | the program one-liner uses this, **not** 20 px |
| `title-s` (news, plate title) | Instrument Sans 500, lh 1.25 | 20 | 24 | 18 | |
| `body-l` | Instrument Sans 400, lh 1.55, max 60ch | 18 | 21 | 16 | |
| `body` | Instrument Sans 400, lh 1.6, max 66ch | 16 | 18 | 16 | |
| `nav` | Instrument Sans 500, wdth 88, +0.01em | 15 | 17 | 16 (menu sheet: 32) | sentence case |
| `button` | Instrument Sans 600, wdth 88, UPPERCASE, +0.08em | 14 | 16 | 14 | |
| `stamp` | JetBrains Mono 500, UPPERCASE, +0.06em, lh 1.2 | 14 | 15 | 14 | kickers, indices, badges, dates, sources. **Never below 14.** |
| `unit` | JetBrains Mono 500, lowercase, as GW sets it ("hp", "lb-ft", "Liter") | 14 | 16 | 14 | |
| `fig-xl` (program stage stats) | Bebas Neue 400, lh .9, `font-variant-numeric: tabular-nums` | 72 | 86 | 44 | |
| `fig-l` (other stat rows, step numbers) | Bebas Neue 400 | 48 | 58 | 36 | |

**Floor: 14 px for anything that carries information.** That includes badges ("LIMITED TO 5"), stat labels, dates and source lines. The current render sets several of these at 12–13 px; they move to 14.

### 3.7 Z-layers

`0` media / cove · `1` scenery (GW logotype behind the car) · `2` subject (masked car) · `3` annotation (bezels, dimension lines, plates) · `10` section content · `20` docked local controls (tick switcher, odometer) · `100` header · `200` menu sheet · `300` dimmer · `310` drawer / sheet · `400` form result notice · `1000` skip link.

### 3.8 Motion tokens

| Token | Value | Use |
|---|---|---|
| `--d-press` | 120 ms | press / detent |
| `--d-1` | 180 ms | colour, tick length, opacity of small parts |
| `--d-2` | 240 ms | digit roll, field line draw, link arrow |
| `--d-3` | 320 ms | needle travel, drawer, menu sheet, shutter |
| `--d-draw` | 480 ms | stroke-draw, sweep, bezel quarter-turn |
| `--d-light` | 900 ms | cove re-light between programs |
| `--ease-out` | `cubic-bezier(.25,.46,.45,.94)` | GW's own easing; default for entering |
| `--ease-in` | `cubic-bezier(.55,0,1,.45)` | exits, one step faster than the entrance |
| `--ease-settle` | `cubic-bezier(.34,1.32,.64,1)` | **needles and digits only**: about 4% overshoot, then settle (the detent) |
| `--ease-lin` | `linear` | anything scrubbed by scroll |

Character: **one axis per movement, no floating, no fade-ins for their own sake.** A thing appears because a light comes on (cove), a cut is made (groove draws), or a part is set (bezel turns, needle lands). Transform and opacity only, plus `clip-path` for the shutter and SVG `stroke-dashoffset` for lines.

---

## 4. Layout grammar (so the components land on one system)

- 12 columns inside `--gut`, gutter 24 (32 at 1920). Content is **left-aligned on the grid.** D centres only two things: the GW lockup in the header and a car with its logotype. Statements, plates, forms and stats sit on columns.
- Grooves are the page's rules. Use a horizontal groove between groups (stat rows, step rows, form groups, footer bar) and never a plain 1 px border.
- Photos: radius 2, no overlay captions. Captions sit under the photo on the ground (§7.10).

---

## 5. Header — the "bezel header"

**Anatomy (≥1280).** No bar and no pill. Three zones on the 72 px band:
- **Left:** links `Programs · Collection · Commission · Provenance`, gap 28.
- **Centre:** the GW lockup = white GW wordmark (168 px wide at 1440, 200 at 1920) + a vertical groove 20 px tall + `MIAMI` in `stamp`. It is centred optically on the viewport, not inside a box.
- **Right:** `News`, then the phone `(305) 783-6493` in `nav` with `tabular-nums`, then the **Begin** secondary button (40 visual / 44 hit).
- Under the link group: a **scale groove** (1 px `rgba(255,255,255,.14)`) running the width of the left group, 10 px below the link baselines. The **needle** (2×10 px `--needle`) stands on it under the current section's link.
- Legibility: a `::before` behind the band carrying `--scrim-d` or `--scrim-l`, chosen per screen by `data-hd` (the sampling E already uses). It is not a plate, so it has no hard edge (U-rule: no opaque bar crossing live content).

**1024–1279.** Left: `Menu` (text + a 2-line glyph of 16×10 px, 1 px strokes). Centre: lockup. Right: phone (from 1180 up) + Begin.

| State | Spec |
|---|---|
| Default | links `--on-d-2` (dark) / `--on-l-2` (light). Wordmark 100% |
| Hover (link) | text → `--on-d` in `--d-1`. A **preview tick** (1×6 px, white .5) appears on the scale groove under the hovered link, so the visitor sees where the needle would go |
| Focus-visible | needle ring: `outline:2px solid var(--needle); outline-offset:4px; border-radius:2px` plus a 1 px `#0A0A0A` keyline outside it (`box-shadow:0 0 0 7px #0A0A0A` sits behind the outline offset), so the ring holds over any photo |
| Active (pressed) | text translateY 1px for `--d-press` |
| Current section | `aria-current="true"`. Needle under the link. Text `--on-d` |
| Section change on scroll | the needle travels on X, `--d-3 --ease-settle`. The link colours cross in `--d-1` |
| Tone change (dark ↔ light screen) | ink, wordmark fill and scrim cross-fade together in 320 ms `--ease-out`. They are sampled under the band, never per section edge |
| Disabled | n/a |

**Never:** a plate, a blur, or a header that hides on scroll (Alex: nav always visible).

**Phone (390/430).** `Menu` left (44×44 hit) · lockup centre (wordmark 132 px; `MIAMI` stamp shown at ≥375) · **Begin** right (button M, label `BEGIN`). The scrim is the same, at 112 px. The needle is not shown in the bar (no links); it appears in the menu sheet. **768:** the same as phone with phone number added left of Begin.

---

## 6. Menu sheet (≤1279)

- A full-viewport plate (satin `--graphite`) drops from the top: `translateY(-100%) → 0` in `--d-3 --ease-out`, then a 2 px settle (the plate "seats"). The dimmer behind is `rgba(0,0,0,.6)` (only visible at 768+ where the sheet stops at 72vh).
- **The content is bottom-weighted for the thumb.** Links sit in the lower 60% of the sheet in `display-l` at 32 px (40 at 768), each preceded by a `stamp` index `01–06` on a **vertical scale groove** at the left. The current section carries the needle (2×14 px, horizontal on a vertical scale).
- Below the links, a groove, then the dealer block in `body` (Prestige Imports · 15050 Biscayne Blvd · Javier Roque · phone · email, all tappable), then **Begin your Gunther Werks** as the primary, full width.
- **Close** sits exactly where `Menu` was: `CLOSE` stamp + a 12 px × of two 1 px strokes. Hit area 44.
- **States.** Link hover/press: text `--on-d` and the index stamp `--needle`. Focus: needle ring. Opening moves focus to the first link. Focus is trapped. `Esc` closes. Closing returns focus to `Menu`. The page is `inert`.
- **Reduced motion:** the sheet is present at once (no travel), and the dimmer appears in 0 ms.

---

## 7. Components

Each block lists default · hover · focus-visible · active · selected · disabled · loading where they apply. `(hover: hover) and (pointer: fine)` gates every hover effect. On touch, the hover content is either always visible or arrives on first tap, as stated per component.

### 7.1 Primary button: "billet"

At most **one per screen.** Use it for Begin (hero), Send to Javier Roque (form), and Begin your commission (drawer).

- **Box:** height 40 visual (44 for the form submit), hit area 44 (`::after` inset −2px 0). Padding 0 20. `--r-2`. Face `linear-gradient(180deg,var(--alu),var(--alu-2))` with the chamfer insets. Label `button`, `#0A0A0A`.
- **Hover:** the face lightens to `#F2F2F0 → #E4E4E1` in `--d-1`. **One sweep:** the highlight band crosses left to right in `--d-draw --ease-out`, **once per hover-in**. It does not repeat while the pointer rests.
- **Focus-visible:** needle ring (outline 2 px `--needle`, offset 3, radius 4) + 1 px ink keyline. The sweep also runs once on focus.
- **Active:** `translateY(1px)`, and the top inset becomes `inset 0 1px 2px rgba(0,0,0,.22)` (pressed into its seat) for `--d-press`.
- **Disabled:** face `#3A3A3A`, label `rgba(255,255,255,.5)`, no sweep, `cursor:not-allowed`, `aria-disabled`.
- **Loading** (form submit): the label becomes `SENDING` and a 24 px tick scale appears right of it inside the button. A 2 px needle swings across that scale (`--d-light`, `ease-in-out`, alternate) until the response arrives. **Timeout 10 s → error state** (§7.11). The button keeps its width (min-width locked when loading starts).
- **On light ground:** inverted. Face `#1A1A1A → #121212`, label `#F2F2F0`, chamfer insets per the dark column.
- **Phone:** height 44 visual, full width when it is the section's only action. A press shows the active state. There is no sweep on touch.

### 7.2 Secondary button: "stroke-draw" (GW's own gesture, without the pill)

- **Box:** height 40 / hit 44, padding 0 18, `--r-2`, transparent. Border 1 px `rgba(255,255,255,.34)` (light ground: `rgba(0,0,0,.28)`). Label `button` `--on-d`.
- **Hover:** an SVG `rect` stroke (1 px, `--on-d`) **draws the full perimeter clockwise from the left midpoint** in `--d-draw --ease-out` over the dim border (`stroke-dasharray` = perimeter). It is GW's `cta-stroke-draw`, re-timed from 600 to 480 ms. A trailing hairline arrow, if present, moves 4 px right with `--ease-settle`.
- **Focus-visible:** needle ring, and the stroke is drawn fully at once.
- **Active:** fill `rgba(255,255,255,.06)`, `translateY(1px)`.
- **Disabled:** border and label at `.3`, no draw.
- **Hover-out:** the stroke retracts counter-clockwise in `--d-3 --ease-in`.
- **Phone:** on press, the stroke is drawn fully at once (no travel) and the active fill shows. Full width when stacked.

### 7.3 Text link / "go" link

- **Anatomy:** label `nav` (sentence case; uppercase `button` style allowed only as a section's closing link), then a 10 px gap, then the **hairline arrow** (a 14 px shaft of 1 px + a head of two 1 px strokes, 5 px, at 40°). Under the label and arrow runs a **groove** (2 px composite) at +6 px below the baseline.
- **Hover:** the groove's lit line goes from `.07` to `--on-d` (it becomes a 1 px white rule) in `--d-1`. The arrow moves 6 px right with `--d-2 --ease-settle`, so it lands with a click.
- **Focus-visible:** needle ring around label + arrow, offset 4.
- **Active:** arrow at +8 px, label `.86`.
- **Visited:** none.
- **External links** (press, guntherwerks.com): the arrow is rotated −45°, and the link carries `rel="noopener"` plus a visually hidden "(opens in a new tab)".
- **Phone:** the groove is always lit at `.5`. Press = active state. The hit area is padded to 44 tall.

### 7.4 Tick-scale switcher (programs, collection tiers, commission steps)

Replaces every pill tab group in D.

- **Anatomy:** a row of labels (`nav`, 15 px, `--on-d-3`), each item at least 64 px wide and 44 tall including the scale. Under the labels, a **scale** spans the group: baseline 1 px `rgba(255,255,255,.22)`, minor ticks 1×4 px every 8 px at `.16`, and a major tick 1×8 px at each item centre at `.5`. The **needle** (2×14 px `--needle`) sits on the active item's centre and crosses the baseline. A trailing action ("Program details", a go-link, §7.3) sits after a vertical groove of 16 px.
- **No container.** It sits on the cove's darkened floor. If a measurement fails there (§11), the fix is a floor gradient on the stage, never a plate behind the tabs.

| State | Spec |
|---|---|
| Default | label `--on-d-3`, major tick 8 px |
| Hover | label `--on-d`, its major tick grows to 12 px (`--d-1`) |
| Focus-visible | needle ring around the label (offset 4), and its major tick at 12 px |
| Active (pressed) | label `translateY(1px)` |
| Selected | label `--on-d`, the needle under it, `aria-selected="true"` |
| Disabled | label `.28`, its tick dashed, not focusable in the roving order |
| Change | the needle travels on X in `--d-3 --ease-settle`. Label colours cross in `--d-1`. If scroll drives it (the pinned programs stage), the needle follows scroll **linearly** (`--ease-lin`) between stations and settles on each with `--ease-settle` when scrolling stops |

Keyboard: `role="tablist"`, roving `tabindex`, ←/→, Home/End, automatic activation.
**Phone:** docked at the bottom of its stage, 16 px + safe-area above the screen edge, inside the thumb zone. The scale runs full width (gutter to gutter). Four programs fit at 390 (each item at least 72 px). The six collection items scroll horizontally in their own container with `scroll-snap-type:x mandatory`. The needle stays fixed at the centre and **the scale moves under it** (the dial principle). Edge fades are 24 px gradients of the ground colour. Swiping the stage itself left/right also steps the switcher.

### 7.5 Step scale and odometer (commission 01–06, program counter)

- **Step scale:** the switcher (§7.4) set as stations: `stamp` index `01–06` above each major tick and the step name below it in `body` 14 px `--on-d-3`. **Completed** stations: major tick full height (8 px) at `--on-d`. **Upcoming:** 4 px at `.3`. **Current:** needle + name `--on-d`. Progress is therefore carried by tick length and brightness, not by colour alone.
- **One numbering system per screen.** Where the step scale is present, the step blocks below carry **no** big `01/02/03` Bebas numerals. Today both exist on screen 07; that duplication goes.
- **Odometer** ("02 / 04"): `stamp`, `tabular-nums`. Each digit sits in a 1em-tall `overflow:hidden` slot. On change, the old digit moves −100% and the new one comes in from +100%, `--d-2 --ease-settle`, right-hand digit first, 40 ms per further digit. **Reduced motion:** instant swap.
- **Phone:** the step scale becomes **vertical** at <600 (stations down the left, names to the right, needle horizontal) and follows the vertical reading order of the stacked steps.

### 7.6 Timeline scale (Our story: replaces the heritage-years cards)

- A horizontal scale spanning the grid, 2017 → 2026, one major tick per year. The year is set under each tick in `stamp`, and **milestone years** in Bebas `fig-l` (48) above the scale.
- Each milestone is a station (button). Selecting one moves the needle there and shows **one** milestone panel above the scale: a photo (radius 2, B/W graded as now) + `stamp` date + one line in `body-l`.
- Default view: needle on **2017** (the first program). The six milestones from CONCEPT-D keep their sources.
- States as §7.4. Scroll is not hijacked: the visitor clicks, drags the needle, or uses ←/→.
- **Phone:** the scale scrolls horizontally under a fixed centre needle (as §7.4 phone), and the milestone panel stacks above it at full width.

### 7.7 Hotspot marker: the bezel (Program details, What changed)

- **Anatomy:** 32 px visual / 44 hit. An outer ring 1 px `rgba(255,255,255,.8)` with a 1 px `rgba(0,0,0,.45)` keyline outside it (holds on white paint), four inward ticks of 3 px at 0/90/180/270°, and a 6 px centre dot `--on-d`.
- **Entrance (set once):** when its stage is revealed, each bezel makes **one quarter-turn** (rotate −90° → 0) in `--d-draw --ease-settle`, with a 60 ms stagger. Then it is still. **D's hotspots never breathe.**

| State | Spec |
|---|---|
| Default | as anatomy |
| Hover | ticks lengthen 3 → 6 px (the bezel closes in like a crosshair locking), ring scale 1 → 1.125, in `--d-1` |
| Focus-visible | needle ring at 40 px diameter, offset 2, + ink keyline |
| Active | centre dot scale .7 for `--d-press` |
| Selected (its plate is open) | centre dot `--needle` 8 px, ring `--on-d`, ticks at 6 px, dimension line drawn. `aria-expanded="true"` |
| Others while one is selected | opacity .56 |

Each bezel is a `<button>` with `aria-controls` → its plate and an accessible name ("Engine: twin-turbo 4.0, show detail").
**Phone:** 36 visual / 44 hit. Tap = select. The plate opens as the bottom drawer (§7.8 phone). Under reduced motion or without JS, every change is listed under the photograph as a plain list of plates.

### 7.8 Dimension line (leader) and spec plate (info card)

**Dimension line.** **Orthogonal segments only** (vertical then horizontal, at most one elbow), like an engineering drawing. Stroke 1 px `rgba(255,255,255,.78)` with a 1 px `rgba(0,0,0,.35)` underlay offset by 1 px (legibility over light paint). It starts 4 px outside the bezel ring and ends in a **6 px perpendicular end-tick** at the plate edge. Draw: `stroke-dashoffset`, `--ease-lin`, the first segment then the second, 320 ms in total, starting after the bezel's quarter-turn. It is anchored in the same coordinate space as the image (`viewBox` matched to the photo's `object-fit` mapping), so it never drifts off its point at another width.

**Spec plate, collapsed.**
- Width 240–280. Padding 14/16. `--r-2`. Satin graphite at **.94 opacity** (no blur). Chamfer insets. An **engraved inset groove** 4 px inside the edge (plates ≥220 wide only).
- Row 1: `stamp` index (`02`, `--on-d-3`) + title `title-s` (`--on-d`). Row 2: one line `body` 14 `--on-d-2`. Right edge: a **chevron notch** (6 px V, 1 px strokes) pointing right, no box.

**Spec plate, expanded.**
- Width 400 (420 at 1920). A macro photo at the top (16:9, `--r-1`) opens by a **shutter**: `clip-path: inset(0 0 100% 0) → inset(0)` in `--d-3 --ease-out`, top to bottom. Then up to 3 lines of `body`, and a source line in `stamp` `--on-d-3` (for example `ROBB REPORT · 29 JUL 2026`). The chevron has turned 90° to point down.
- The expansion is a FLIP (transform from the collapsed rect), never a width/height animation. Contents fade in `--d-1` after 120 ms.

| State | Spec |
|---|---|
| Hover (collapsed) | face → `--graphite-2`, inset groove's lit line `.07 → .14`, chevron +3 px right, all `--d-1` |
| Focus-visible | needle ring around the plate, offset 3 |
| Active | `translateY(1px)` |
| Selected / expanded | as above. Every other plate .56, every other dimension line .3 |
| Collapse | reverse FLIP `--d-2 --ease-in`. The shutter closes bottom to top |

**Phone.** Plates never float over the car at 390. The selected plate becomes a **bottom drawer**: full width, `--r-3` on the top corners only, docked above the tick switcher. The dimension line becomes one **vertical** segment from the bezel to the drawer's top edge, with an end-tick. Swipe left/right on the drawer = next/previous bezel. A drag handle is not drawn; the `CLOSE` stamp sits top right of the drawer. 768: plates float as on desktop at 300 px width when space allows, otherwise drawer.

### 7.9 Drawer (overlay sheet): "Program details"

- **Desktop:** a full-height graphite plate **flush to the right edge** (no float, no gap), width `min(560px, 42vw)`, `--r-3` on the left corners only. It slides in on X from 100% to 0 in `--d-3 --ease-out` with a 2 px settle. The page behind is dimmed by `rgba(0,0,0,.64)` (`--d-2`). **No blur.**
- **Content:** the GW logotype (small, 40 px tall) · `stamp` "PROGRAM 01 / 04 · STANDARD" · one-line description in `title` · **spec table** as engraved rows (label `stamp` `--on-d-3` left, value `body` `--on-d` right, `tabular-nums`, a groove between rows, row height 48) · sources in `stamp` · the press rail (two go-links) · the primary **Begin your F-26** sticky at the bottom of the drawer on a satin footer with a groove above it.
- **Close:** top right, `CLOSE` stamp + a 12 px ×, hit 44. Hover: label `--on-d` and the × rotates 90° (`--d-2 --ease-settle`). `Esc` closes. Clicking the dimmer closes.
- **Behaviour:** focus moves to the drawer heading. Focus is trapped. The page is `inert`. `overscroll-behavior: contain`. Closing returns focus to the trigger. Exit `--d-2 --ease-in`.
- **Phone:** the drawer is a full-screen sheet rising from the bottom (`translateY(100%) → 0`, `--d-3`), with `--r-3` top corners and 8 px of the page visible above it. `CLOSE` sits top left. Swipe-down dismisses when the sheet is scrolled to the top. The primary is sticky at the bottom above the safe area.
- **Reduced motion:** it appears and disappears without travel; the dimmer shows in 0 ms.

### 7.10 Image cards: news, provenance, press

**No overlay captions, no corner boxes.** The photo is clean, the caption sits under it on the ground, and the go-cue is the inline arrow.

- **Photo:** `--r-1`, `object-position` set per image (see the review for the current bad crops). Aspect: news lead 16:10, news 4:3, provenance 4:5.
- **Caption:** a `stamp` row (tag + date, `--on-d-3`, tag first), then the title in `title-s` (lead card: `title`), then for provenance a `stamp` spec line (`SPEEDSTER · 435+ BHP · ROTHSPORT 4.0 L`). The title ends with the hairline arrow inline.
- **Press variant (Goodwood):** a satin plate with chamfer (no photo): the publication's logo in white at 18 px tall, the headline in `title-s`, the date in `stamp`, and the arrow. It replaces the glass press cards (glass is E's).

| State | Spec |
|---|---|
| Hover | photo brightness .9 → 1 and scale 1 → 1.02 (`--d-draw --ease-out`, inside an `overflow:hidden` frame). The title's groove draws left→right (`--d-3`). The arrow takes its detent |
| Focus-visible | needle ring around the whole card (photo + caption), offset 4 |
| Active | card `translateY(1px)` |
| Loading | a satin plate of the exact aspect ratio, no shimmer |
| Error (image fails) | the same plate + `IMAGE UNAVAILABLE` stamp `--on-d-3`. The caption is unaffected |
| Long title | up to 3 lines at 1440. Never clamped with an ellipsis. The grid row grows |

**Phone:** news = the lead card full width, then the four cards as a horizontal snap strip (card 80vw, gap 12, odometer under it). Provenance = a snap strip at 82vw. Press plates = a snap strip at 78vw. Hover → press state. 768: two-up grids.

### 7.11 Forms: the owner's application ("Begin your Gunther Werks")

- **Text field:** no box. Label above (`nav` 14, `--on-d-2`). Input `body-l` 18 `--on-d`, height 48, padding 0. The baseline is a **groove**. Placeholders are only for format hints (`.42`), never instead of a label.
  - Hover: the groove's lit line → `.5`.
  - **Focus:** a 2 px `--needle` line **draws over the groove from left to right** in `--d-2 --ease-out`, and the label → `--on-d`. That 2 px line at 5.8:1 is the focus indicator. A ring is not added.
  - Filled: lit line `.5`.
  - **Error:** a 2 px `--err-d` line + a message under it in `body` 14 `--err-d`, starting with "Error:" (visually as a 12 px ring-"!" glyph + the text). `aria-invalid`, `aria-describedby`. **Input is kept.**
  - Disabled: `.3`, and the groove is dashed.
- **Select** (Program, Expected use, **Registration state**, which becomes a select of US states + "Outside the US"): the same field, native `<select>`, `appearance:none`, a **chevron notch** at the right. The native option list is kept for accessibility.
- **Ordinal radio: the detent scale** (Track experience: No · Beginner–novice · Intermediate · Highly skilled · Professional driver). These options are ordered, so they are stations on a scale (§7.4 visuals). Real `<input type="radio">` elements are visually hidden; each station's label is the hit area (≥44 tall). The needle lands on the chosen station with `--ease-settle`. ←/→ moves it. **Phone (<600): vertical scale** with labels on the right.
- **Nominal radio** (Air-cooled Porsche Yes/No · Best describes you): an 18 px circle, 1 px `rgba(255,255,255,.5)`. Checked: an 8 px `--needle` dot + the ring at `--on-d`. Hover: ring `.8`. Focus: needle ring around the dot and its label. Options are laid in a row with 32 px between them. **No pill chips.**
- **Checkbox** (consent, required, **missing today**): an 18 px square at `--r-1`, 1 px `.5`. Checked: white fill + an ink check (1.5 px) drawn in `--d-1`. The label is `body` 14. It links the Prestige Imports privacy policy.
- **Submit:** the primary (§7.1, 44 visual). States: loading → timeout 10 s → error notice; **success** replaces the form with a plate: "Sent to Javier Roque." + "Gunther Werks asks you to allow 48 business hours for a response." (GW's line) + a phone link. The notice gets `role="status"` and focus.
- **Layout:** two columns on ≥1024 (row gap 32, column gap 24). One column on <768. Groups (identity · program · experience) are separated by a groove and 48 px.

### 7.12 Badges: the stamp

GW's own badge, kept as a brand carrier and drawn in D's material.

- `stamp` 14 px, height 28, padding 0 10, `--r-2`, 1 px stroke, transparent face.
- **Standard / Twin-turbo / Naturally aspirated:** stroke `rgba(255,255,255,.4)`, text `--on-d-2`.
- **Track focused:** stroke and text `--gxr`.
- **By invitation only:** stroke and text `--gold`.
- **Completed – Legacy:** dashed stroke `.3`, text `--on-d-3`.
- At most **two badges per object.** They are never interactive, so they have no hover. The tier is always stated in words, never by colour alone.
- **Phone:** the same, wrapping under the title when needed.

### 7.13 Stat block (GW's block)

- Figure (`fig-xl` on the program stage, `fig-l` elsewhere) · unit under it (`unit`) · label under that (`nav` 14, `--on-d-3`, **one line, ≤ 28 characters**).
- Stats in a row are separated by **vertical grooves** 48 px tall. On the program stage the row is centred under the car; elsewhere it is left-aligned on the grid.
- **Sources and dates leave the labels.** One `stamp` footnote line under the row carries them: `FIGURES: GUNTHER WERKS F-26 RELEASE, 15 AUG 2025`. The dated figure keeps its date in the render (content-provenance), just not inside a two-line label.
- **No count-up.** GW counts up on their site; D does not. A gauge reads its value, it doesn't spin to it.
- **Phone:** a 2×2 grid with a vertical groove between columns and a horizontal groove between rows. Figures 44. The footnote is under the grid.

### 7.14 Cursor and pointer

The system cursor everywhere. **No custom cursor**: an instrument panel does not need a pointer costume, and a custom cursor is the fastest way to look like a template. `cursor:pointer` on every interactive element. `cursor:grab` only on a horizontally scrollable scale on desktop.

### 7.15 Skip link and loading of the page

The skip link is the primary button, top-left at the gutter, visible on focus. The page itself has no loader. The hero photo is the LCP (`fetchpriority=high`), and the H1 is HTML at its final size.

---

## 8. Where each component goes (section map)

| Screen | Components |
|---|---|
| Header | §5. On light screens: `--scrim-l` + ink |
| 1 Hero | `display-xl` H1, primary **Begin** + secondary **Explore the programs**, a `stamp` caption row at the bottom |
| 2–5 Programs (one pinned stage) | GW logotype (z1) behind the masked car (z2), stat block `fig-xl`, badges (max 2), program line in `title`, **tick switcher** + "Program details" go-link, secondary **Begin your F-26**, odometer `01 / 04` |
| Program details | Bezels + dimension lines + spec plates on the cove photo, then the drawer §7.9 |
| 6 Collection (light) | the switcher as the thumbnail row: thumbnails stand on the scale and the needle marks the active car. The duplicate top-right toggle is removed. Badges, go-link |
| 7–9 Commission | **docked plate** (graphite, `--r-3`, flush to the left gutter and the screen bottom, cut into the photograph), step scale §7.5, the six build frames as image cards without overlay captions, the delivery photos |
| 10 Our story | key photograph (radius 2) + timeline scale §7.6 |
| 11 On track | full-bleed photo, `display-l`, press plates §7.10 |
| 12 Provenance (light) | provenance image cards, go-link |
| 13 News | image cards, go-link |
| 14 Begin | photo + contact plate (satin, no red gradient: the red stays in the photograph), form §7.11 |
| 15 Footer | `display-xl` "Designed for pleasure." (see review P3 for the GW rotating tagline), the X mark, grooves between the columns and the legal bar |

---

## 9. Motion per component: summary

| Component | Trigger | Moves | Duration / easing | Reduced motion |
|---|---|---|---|---|
| Header needle | section change | X travel | 320 `settle` | jumps |
| Primary sweep | hover-in / focus | highlight band, once | 480 `out` | none |
| Secondary stroke | hover | perimeter draw | 480 `out`, retract 320 `in` | full border at once |
| Go-link arrow | hover | +6 px | 240 `settle` | none (the groove lights) |
| Tick switcher | select / scroll | needle X | 320 `settle`, linear when scrubbed | jumps |
| Odometer | change | digit roll | 240 `settle` | swap |
| Bezel | stage reveal | quarter-turn, once | 480 `settle`, 60 stagger | static |
| Dimension line | after bezel | dashoffset | 320 linear | drawn |
| Plate expand | click | FLIP + shutter | 320 `out` / 240 `in` | instant |
| Drawer | open / close | X (Y on phone) | 320 `out` / 240 `in` | instant |
| Menu sheet | open | Y from top + 2 px settle | 320 `out` | instant |
| Cove re-light (stage) | program change | cove brightness .35 → 1, logotype opacity, car cross-fade | 900 `out` | instant swap |
| Field focus | focus | needle line draw | 240 `out` | line present |

---

## 10. Phone and tablet: rules that apply to every component

Desktop is the master; the phone re-scales and re-stacks it.

- **Breakpoints.** 390 base phone · 430 large phone (type +4%, gutter 24) · 768 portrait tablet (the phone structure with two-up grids and the desktop stat row) · 1024 desktop composition. **Touch rules follow `(hover:none)`, not width**, so a 1024 touch tablet gets tap behaviour.
- **Hover → touch.** Anything revealed on hover is either always visible on touch (the groove under links, plate titles, provenance spec lines) or arrives on the first tap, with the second tap or an explicit go-link navigating. Nothing a buyer needs exists only on hover.
- **Targets.** ≥44×44 for every interactive element, including scale stations, bezels, odometer arrows and the menu. 8 px minimum between adjacent targets.
- **Controls in the thumb zone.** The tick switcher, the plate drawer and the drawer's primary sit in the lower third, above `env(safe-area-inset-bottom)`.
- **Pins.** The phone keeps **one** pin: the programs stage (4 states × 70svh). Every other pinned or scrubbed sequence on desktop becomes normal flow on the phone.
- **Parallax.** Off on the phone. The logotype-behind-car layering stays; it is static depth, not motion.
- **Swipe.** Horizontal swipes are used only inside an explicit scroller (snap strips, the switcher, the drawer). The page never hijacks vertical scroll.
- **Menu.** §6. **Sheets.** §7.8 and §7.9.
- **Type.** Per §3.6. Nothing drops below 14.

---

## 11. Accessibility

- **Contrast on the composited render.** Every text role over a photograph or cove is measured with the two-screenshot method (text hidden / visible, worst 5% of covered pixels) at 1920, 1440, 390, and **in every program state of the pinned stage** (four coves, four tones). Targets: 4.5:1 below 24 px, 3:1 for `display-*` and `fig-*`. Known risk areas: the stat labels on the Turbo amber floor, the switcher labels on the GWR cyan floor, and the header links over the Goodwood foliage. **The fix order:** move the text into a calmer region → deepen the stage's floor gradient (part of the image layer) → the header scrim. Never text-shadow, never a plate behind the tabs.
- **Plates are opaque enough to measure once.** At .94 graphite, the worst case (white paint behind) composites to ≥ `#202020`; `--on-d-3` on that is ≥ 5.9:1.
- **Focus.** The needle ring (2 px `#FF4500`, offset 2–4) + 1 px `#0A0A0A` keyline, everywhere except text fields, whose focus is the 2 px needle line. Orange measures 5.8:1 against the keyline and against `--ink`, and 3.16:1 against `--paper`; on light grounds the keyline is kept.
- **Selection is never colour alone.** The needle is a shape at a position. Completed steps are longer ticks. The checked radio has a dot. Badges state the tier in words.
- **Reduced motion** (`prefers-reduced-motion: reduce`): no pin. The programs stage renders as the four stacked screens (as in the static render). Needles and digits jump, the bezel is static, lines are pre-drawn, shutters and sheets are instant, the sweep and stroke-draw are replaced by their end state, and no film autoplays. Every state is reachable by click or keyboard.
- **Keyboard.** Tablists with roving tabindex. Radiogroups. Bezels are buttons. Drawers and sheets trap focus, close on `Esc` and return focus. The skip link comes first.
- **Assistive tech.** Logotypes behind cars are `aria-hidden` images with the program name in real text. The scale ticks and grooves are decorative. The needle position is exposed through `aria-selected` / `aria-checked` / `aria-current`.
- **Without JS:** the stage is four stacked sections, plates are listed under their photos, and the drawer content is a link to the model page.

---

## 12. Changes from the interim "Billet & Gauge" note

1. **The accent is named and sourced:** GW's own declared `#FF4500` (`--accent-color`, their focus outline), which is also the needle in GW's own cluster photo. It is used only for needle, focus and selection.
2. **D never blurs.** The interim note did not say this; now it is a rule. Glass is E's alone, and the Goodwood press cards stop being glass.
3. **The header is not a plate.** It is a centred GW lockup over a tonal scrim, which is GW's own header arrangement. A plate over full-screen coves would cut 72 px off every image.
4. **Hotspots don't breathe.** Bezels make one quarter-turn when the stage is set, then stay still.
5. **No icon boxes and no pills, anywhere.** The radius scale tops out at 8.
6. **New components:** the ordinal detent scale for the application form, the timeline scale for Our story (it replaces the Porsche heritage-years cards, which E keeps in its own form), the odometer counter, and the dimension-line leader.
7. **Mono becomes D's stamp.** All kickers, indices, dates and sources are in mono at 14 px. That makes it D's typographic tell, and it is the clearest single difference from E at a glance.
