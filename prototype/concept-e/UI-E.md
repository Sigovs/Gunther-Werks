# UI-E — "Glass & Key" · the interface system for Concept E

25 Oct 2026 · art direction · for the designer building `prototype/concept-e/`.
Read with `CONCEPT-E.md` (screens, motion table, facts) and `../CD-REVIEW.md` (what to fix first).
This file replaces the interim "Glass & Key" note where they differ. The differences are listed in §12.

**Desktop is the master.** Every component is drawn at 1440 first. 1920 scales it, and the phone is a faithful adaptation: the same components and moments, re-scaled and re-stacked, with touch replacing hover. It is not a separate phone concept. Phone behaviour is given per component and summarised in §10.

---

## 1. The idea

> **The interface is studio light behind glass. Every surface is a pane of frosted glass that lets the car's own light through, every marker is Gunther Werks' X key, and every state change is light moving, never a box moving.**

Why it belongs to Gunther Werks and nobody else:

- **GW's photographs are made of soft light and glass.** The Huntington Beach atelier in E's hero is a glazed sectional door under light-box ceilings. The studio coves are lit by large diffusers. A frosted pane is the material of the room these cars are shown in.
- **The X key.** "The company key was designed in an 'X' pattern — a symbol of every door that closed" (GW, Our Story). In E, every hotspot is that key, and turning it opens a part of the car. The brand's founding symbol becomes the page's verb.
- **GW's header is already translucent:** a 72 px dark bar over heroes (CI §3.1). E develops that into real glass.
- **GW's UI is strictly monochrome; colour comes from the cars and the light** (CI §3.3). E's only "accent" is light itself: a warm pool `rgba(255,246,236,…)`. There is no UI hue. GXR red stays a cove colour, never a control colour.

**What E is.** Airy, soft and slow to settle. Things don't slide in: they **clear**, like glass losing its fog, or they **light up**, like a car under a spotlight. Motion uses expo-out at 400–720 ms with no overshoot.

**What E is not.** Not glassmorphism-by-default. Glass appears only where something sits **over a photograph**. On flat grounds E uses no glass at all, just type and light. Blur never sits behind body copy longer than three lines.

### NOT taken from racing.porsche.com

| Porsche device | E replaces it with |
|---|---|
| Tiny centred dark nav pill + separate right "pill" | **One** continuous glass bar, gutter to gutter, that is clear at the top of the hero and **fogs into smoke glass** once you scroll |
| Opaque white rounded panel rising over the hero | A **frosted glass pane** rising over the hero. The hero stays visible, blurred, through it, and the statement focuses from blur inside it. Same gesture, opposite material |
| Black rounded caption cards | Smoke or milk **glass** cards with a lit top edge |
| Square dark corner button with ↗ | No corner buttons. A **hairline arrow** that lengthens, or the whole card as the target |
| White dot hotspots with a halo | The **X key** (a solid disc with four cut slots) that turns 45° into a "+" |
| Straight single-segment leaders to cards | A **dog-leg** leader (45° then level) with a **gap** at the key and a light point at the card |
| Black pill tabs with a white filled active pill | A glass **track** with a **pool of light** sliding under the active item |
| Pager dots + square arrow buttons | A **light track**: a hairline with a 48 px segment of light at the active position, plus 44 px glass discs |
| Expand ↗↙ squares, eye icon | `+ / −` hairline glyphs, and a text toggle "View the car / Show details" |
| Heritage: big years over B/W photos, dark caption cards | B/W photos that **turn to colour under the light** when active. The year is set on the glass caption, not printed over the picture |
| Staggered dark news cards with corner arrows | Image cards with a **glass back** (caption on frosted glass inside the photo) that rises on hover |

### NOT shared with Concept D ("Billet & Gauge")

E never uses **grooves, tick scales, needles, mono stamps, chamfered plates, or the orange accent.** D never uses **blur, glass, light pools, breathing, the X-key glyph as a control, or capsule shapes.** E uses **no JetBrains Mono at all**; units and labels are Instrument Sans. That is E's typographic tell against D.

---

## 2. The glass: one recipe, three densities

| Glass | Where | Fill | Backdrop | Edge (1 px, gradient) | Inner highlight |
|---|---|---|---|---|---|
| **Smoke** | over photographs and dark scenes | `rgba(16,14,12,var(--tint))`, `--tint` default **.44** | `blur(24px) saturate(1.4) brightness(.92)` | top `rgba(255,255,255,.30)` → bottom `rgba(255,255,255,.06)` | `inset 0 1px 0 rgba(255,255,255,.14)` |
| **Milk** | over light photos, light grounds, the two statement panes | `rgba(250,249,247,var(--tint))`, default **.66** | `blur(24px) saturate(1.2)` | top `rgba(255,255,255,.95)` → bottom `rgba(0,0,0,.06)` | `inset 0 1px 0 rgba(255,255,255,.7)` |
| **Clear** | header at the very top of the hero only | none | none | top `rgba(255,255,255,.22)` → bottom `rgba(255,255,255,0)` | none |

- **Warm studio tint.** The smoke base `rgb(16,14,12)` is warm black, sampled from the shadow side of GW's warm-cove F-26 photograph. Do not add a separate coloured wash.
- **The edge is the material.** Build the 1 px gradient edge as a `::before` with `padding:1px`, the gradient as its background, and `mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)`. A plain `border` cannot carry a gradient and reads as a box.
- **Tint floors (the contrast rule).** The `--tint` value is the variable; the blur is fixed. Over any region where the composited luminance under the glass exceeds 0.5 (white walls, sky, light paint), **smoke `--tint` ≥ .64.** Over measured dark regions it may stay at .44. Milk `--tint` ≥ .66; the statement and Miami panes are .80 and .86. Text on smoke is ≥ `rgba(255,255,255,.86)`. Text on milk is ≥ `rgba(11,11,11,.70)`. These floors are derived in §11.
- **No `backdrop-filter`** (unsupported, or `prefers-reduced-transparency: reduce`): smoke `--tint` .88, milk .94. `prefers-contrast: more`: tint .92 and edge at .6.
- **Performance.** Never animate `blur()`. To fog or clear a surface, animate the **opacity** of a pre-blurred `::after` layer. At most **4** backdrop-filtered surfaces on screen at once on desktop and **2** on the phone. Glass never sits on an element whose transform is scrubbed every frame.

---

## 3. Tokens

Extend `concept-e.css` `:root` (existing names kept). Values are 1440. `≥1680px` keeps `--t:1.2; --k:1.28`.

### 3.1 Colour and alpha

| Token | Value | Use | Measured |
|---|---|---|---|
| `--ink` | `#0B0B0B` | text on light, smoke primary | — |
| `--night` | `#040404` | dark ground | — |
| `--paper` | `#FFFFFF` | light ground | — |
| `--mist` | `#F2F2F0` | light ground (Heritage, Provenance) | — |
| `--smoke-rgb` | `16 14 12` | smoke glass base | — |
| `--milk-rgb` | `250 249 247` | milk glass base | — |
| `--on-d` | `#FFFFFF` | primary text on dark/smoke | — |
| `--on-d-2` | `rgba(255,255,255,.86)` | secondary on smoke (**floor**) | ≥ 4.9:1 at tint .64 over white |
| `--on-d-3` | `#A3A3A3` | tertiary on solid `--night` only (never on glass) | 8.3:1 on `--night` |
| `--on-l` | `#0B0B0B` | primary on light/milk | — |
| `--on-l-2` | `rgba(11,11,11,.70)` | secondary on milk (**floor**) | ≥ 4.7:1 at tint .66 over black |
| `--text-2` | `#5C5C5C` | secondary on solid white | 6.6:1 |
| `--light` | `rgba(255,246,236,.30)` | **the pool of light**: the only "accent" | — |
| `--light-edge` | `rgba(255,246,236,.55)` | the pool's brightest point / light-track segment | — |
| `--gxr` | `#FF2A3C` | special-editions cove + the "Track focused" lamp dot only. **Never a UI control** | — |
| `--gold` | `#C9A227` | "By invitation only" lamp dot only | — |
| `--err` | `#C62828` | error on light / milk (GW's own) | 5.6:1 on white |
| `--err-d` | `#FF8A80` | error on smoke: only at `--tint` ≥ .88 (forms sit on milk; this is for the menu-sheet and sheet notices) | 6.0:1 at tint .88 over white; fails at .64 |

The progress rail in the showroom stops being red and becomes a light segment (§7.12).

### 3.2 Radii

`--r-field 12` (fields, small glass) · `--r-card 18` (glass cards, caption backs) · `--r-img 20` (photos) · `--r-pane 32` (the statement and Miami panes, sheets) · capsules = height/2 (tracks, buttons, header bar) · discs = 50%. Where `corner-shape: superellipse()` is supported, apply `superellipse(1.6)` to cards and panes for a continuous curve. Ordinary radii are the fallback.

### 3.3 Strokes

`--hair: 1px` (glass edges, leaders, go-link arrows) · focus: a **double ring** (§11) · leader light point 3 px · the key's slot gap is drawn, not stroked.

### 3.4 Blur, shadow, highlight

Blur: 24 px for glass surfaces, 12 px for the key disc, 0→18 px for the **stage** behind an open program sheet (a single filtered layer, desktop only). **Shadows: none on glass.** The lit top edge carries the depth. The one exception is the statement and Miami panes, which carry `0 40px 80px rgba(0,0,0,.22)`: they are large physical panes over a scene, and the shadow is part of their position in depth. **Light:** the pool is `radial-gradient(closest-side, var(--light-edge), var(--light) 45%, transparent 100%)`.

### 3.5 Spacing

`--s1 4 · --s2 8 · --s3 12 · --s4 16 · --s5 24 · --s6 32 · --s7 40 · --s8 56 · --s9 72 · --s10 96` (× `--k`).

| | 1920 | 1440 | 1024 | 768 | 430 | 390 |
|---|---|---|---|---|---|---|
| Page gutter `--g` | 96 | **72** (was 48: too tight for editorial) | 40 | 32 | 24 | 24 |
| Glass inset from the viewport edge (header, sheets) | 16 | 12 | 12 | 10 | 8 | 8 |
| Header bar | 64 tall | 56 | 56 | 52 | 52 | 52 |
| First line under the header | bar + inset + 56 | bar + inset + 56 | + 48 | + 40 | + 32 | + 32 |
| Content end above the screen bottom | ≥ 96 | ≥ 72 | ≥ 56 | ≥ 48 | ≥ 32 + safe-area | ≥ 32 + safe-area |

### 3.6 Type roles

Instrument Sans (`wdth` 88 for statements), Bebas Neue for figures, **no mono.** E keeps **three** display sizes, not six as now.

| Role | Face / settings | 1440 | 1920 | 390 / 430 | Notes |
|---|---|---|---|---|---|
| `statement` (inside a glass pane, the road line) | Instrument Sans 400, wdth 88, −0.025em, lh 1.04 | 88 | 106 | 40 / 44 | |
| `display` (hero H1, section heads) | 400, wdth 88, −0.02em, lh 1.06 | 56 | 67 | 32 / 34 | |
| `title` (program name in studio, sheet name) | 400, wdth 88, lh 1.1 | 32 | 38 | 26 | |
| `card-title` | 500, wdth 92, lh 1.25 | 17 | 20 | 16 | |
| `body-l` | 400, wdth 100, lh 1.6, max 60ch | 18 | 21 | 16 | |
| `body` | 400, wdth 100, lh 1.6 | 16 | 18 | 16 | |
| `label` (nav, tabs, buttons, captions) | 500, wdth 100, +0.005em, sentence case | 14 | 16 | 14 | buttons are **sentence case** in E (D's are caps) |
| `kicker` | 500, UPPERCASE, +0.14em | 14 | 15 | 14 | the current .3em tracking on car names ("F - 2 6") goes; names are never letterspaced over .06em |
| `figure` | Bebas Neue 400, lh .88 | 120 (years), 200 (1,000 HP) | ×1.2 | 72 / 112 | |
| `unit` | Bebas Neue at 36% of its figure, baseline-aligned | — | — | — | "HP" stays Bebas, as now |

Floor: **14 px** for everything informative.

### 3.7 Z-layers

`0` scene photo / film · `1` name behind the car (etched glass, §7.14) · `2` car cutout · `3` light layers (spotlight cone, pool) · `4` keys and leaders · `5` glass cards · `10` content · `20` docked tracks · `90` statement / Miami pane · `100` header bar · `200` menu sheet · `300` stage blur + dim · `310` program sheet · `400` notices · `1000` skip link.

### 3.8 Motion tokens

| Token | Value | Use |
|---|---|---|
| `--e-press` | 120 ms | press |
| `--e-1` | 240 ms | hover colour, small light changes |
| `--e-2` | 400 ms | glass fog/clear, key turn, arrow lengthen |
| `--e-3` | 560 ms | pool slide, leader draw, iris reveal |
| `--e-4` | 720 ms | spotlight on, card lift, image scale |
| `--e-5` | 1200 ms | scene re-light, pane rise (when not scrubbed) |
| `--ease-expo` | `cubic-bezier(.16,1,.3,1)` | everything entering or expanding |
| `--ease-in` | `cubic-bezier(.7,0,.84,0)` | exits, one step faster |
| `--ease-glass` | `cubic-bezier(.22,.61,.36,1)` | opacity of fog layers and light |
| `--ease-lin` | linear | scrubs |

Character: **no overshoot, no bounce, no slide-ins.** Light moves, glass clears, keys turn. Loops are allowed only for the key's breath (3 cycles) and a muted film.

---

## 4. Layout grammar

- **Scenes and panes.** E is full-bleed photographs with glass laid over them. Statements centre inside panes; working content (cards, forms, captions) aligns to the 12-column grid inside `--g`. The current mix of a centred head and left-aligned cards below it on the same screen (Commission) is the one alignment break to remove: choose one per screen.
- **Glass only over photographs.** On `--mist` and `--paper` grounds, captions and controls are plain type. On light photographs, use milk glass.

---

## 5. Header: the glass bar

**Anatomy.** One capsule bar, inset `12px` from the top and the side edges of the viewport, height 56, radius 28. Inside it: the GW wordmark + "MIAMI" `label` left (padding-left 20). Links `Programs · Heritage · Ownership · Provenance · News · Miami` centred (`label`, gap 24). The **Enquire** primary small (40 tall) right, 8 px from the bar's end. One surface. Not a pill in the middle and another at the right.

| State | Spec |
|---|---|
| At the top of the hero | **Clear glass**: no fill, no blur, only the edge. Text white over the hero's own top region (measured; the hero's lightbox ceiling needs the scrim that ships with the image layer) |
| After 24 px of scroll | **Fogs into smoke glass**: the pre-blurred `::after` opacity 0 → 1 in `--e-2 --ease-glass`. Scrolling back to 0 clears it again |
| Over light screens (`data-hd="light"`) | milk glass; text, wordmark and the Enquire inversion cross in `--e-2`. Sampled under the bar, as now |
| Link hover | text `--on-d-2` → `--on-d`. A **pool of light** (ellipse 72×32, `--light` at 50% strength) appears under the link in `--e-1` |
| Current section | its pool at full strength, text `--on-d`, `aria-current`. Moving between sections, **the pool slides** to the new link in `--e-3 --ease-expo` |
| Focus-visible | double ring (§11) around the link, radius 14 |
| Active | pool brightens to `--light-edge` for `--e-press` |

It is always visible and never hides on scroll.
**1024–1279:** links collapse to a `Menu` capsule button (glass, 40 tall), and the wordmark and Enquire stay.
**Phone (390/430):** bar inset 8, height 52, radius 26. Wordmark (128 px) + `MIAMI` (from 375 up) left; a **Menu** capsule right. **Enquire moves into the menu sheet** and into a docked enquiry button at the end of Miami (the bar has room for two items, not three). **768:** wordmark left, Enquire + Menu right.

---

## 6. Menu sheet (≤1279): a bottom glass sheet

- Smoke glass, radius 32 on the top corners, inset 8 from the sides, rising from the bottom to **at most 86svh** (`translateY(100%) → 0`, `--e-3 --ease-expo`). The page behind dims by `rgba(4,4,4,.5)`; the page itself is not blurred, because one glass surface is enough.
- A 36×4 px grabber (milk .5, radius 2) at the top. Links in `display` at 32 px, one per row, 56 px rows. The current section carries a pool of light at the left of its row. Then the Prestige block (address, Javier Roque, phone, email, all tappable). Then **Enquire** as a full-width milk primary.
- Close: the grabber (swipe down), a `Close` text button top right (44 hit), the dimmer, or `Esc`.
- Focus moves to the first link. Focus is trapped. The page is `inert`. Focus returns to `Menu` on close.
- **Reduced motion:** the sheet appears in place with a 160 ms opacity fade (no travel).

---

## 7. Components

`(hover:hover) and (pointer:fine)` gates every hover. Touch equivalents are given per component.

### 7.1 Primary button: "lit glass"

At most **one per screen.**

- **On dark / over photo:** a milk glass capsule, `--tint` .86, height 44, padding 0 22, radius 22. Label `label` `--on-l`, followed by a hairline arrow when it navigates.
- **On light grounds / milk panes:** a smoke glass capsule, `--tint` .88, label `--on-d`.
- **Hover:** a **pool of light follows the pointer inside the button** (a radial 120 px `--light-edge`, tracked via `--x/--y` custom properties, `transition: opacity var(--e-1)`) and the top edge brightens .95 → 1.
- **Focus-visible:** double ring, radius 26.
- **Active:** `scale(.98)` + pool at full strength, `--e-press`.
- **Disabled:** tint .3, label 40%, no pool, `aria-disabled`.
- **Loading** ("Sending"): the label stays, and the pool travels left↔right across the capsule (`--e-5`, `ease-in-out`, alternate), like a scanner light under glass. Width is locked. **Timeout 10 s → error** (§7.11).
- **Phone:** height 48. Full width when it is the section's only action. Press = active + pool centred. No pointer tracking.

### 7.2 Secondary button: "clear capsule"

- Height 44, radius 22, **clear glass** (edge only) + `backdrop-filter: blur(8px)` + smoke `--tint` .12. Label `--on-d`.
- **Hover:** `--tint` .12 → .24 in `--e-1` (fogs slightly) + a centred pool at 40%. **Focus:** double ring. **Active:** `scale(.98)`. **Disabled:** edge .3, label 40%.
- **On light:** milk `--tint` .3, label `--on-l`.
- **Phone:** height 48. The press shows the fogged state.

### 7.3 Text link / "go" link: the hairline arrow

- Label `label` (sentence case) + 10 px + **arrow**: a 16 px shaft (1 px) and a 5 px head. **No underline.** The line is the arrow.
- **Hover:** the shaft lengthens 16 → 32 px (`scaleX` from the left, the head translating with it) in `--e-2 --ease-expo`. The label goes from `.86` to `1`.
- **Focus-visible:** double ring around label + arrow, radius 8.
- **Active:** the shaft at 40 px.
- **External:** the arrow is rotated −45° and the shaft does not lengthen; the head moves 3 px up-right.
- **Phone:** the shaft rests at 24 px so the cue is visible without hover. Press = 40. The hit area is padded to 44.

### 7.4 Tab track: glass track with a pool of light

Used by the studio (programs + special editions), the commission stages, the enquiry intent, and the Atelier model switch.

- **Anatomy:** a smoke glass capsule, height 48, radius 24, padding 4. Items `label` `--on-d-2`, padding 0 18, min-width 64. The **pool**: an inner capsule (inset 4, height 40) filled with `radial-gradient(… var(--light-edge) 0, var(--light) 55%, transparent)` plus a 1 px inner edge `rgba(255,255,255,.22)`. It sits under the active item. **There is no white fill.**
- **Groups:** a 1 px × 16 px divider (`rgba(255,255,255,.2)`) separates groups in one track, for example `F-26 · Turbo · GWR · GWX │ GXR-EVO · Brundle · Thermal · End Game │ Explore details`.

| State | Spec |
|---|---|
| Default | label `--on-d-2` |
| Hover | label `--on-d` + a faint pool (20% strength) under the hovered item, `--e-1` |
| Focus-visible | double ring around the item, radius 20 |
| Active | pool to `--light-edge` for `--e-press` |
| Selected | pool under it, label `--on-d`, `aria-selected` |
| Disabled | label 35%, skipped by the roving tabindex |
| Change | the pool slides on X and resizes to the new item's width (transform, measured), `--e-3 --ease-expo`. When scroll drives it (commission stages), the pool moves linearly and settles on release |

**On light grounds:** milk track, ink labels, and a pool of `rgba(255,255,255,.95)` with a 1 px `rgba(0,0,0,.08)` edge.
Keyboard: tablist, roving tabindex, ←/→, Home/End.
**Phone:** the track is docked at the bottom of its stage, 16 px + safe-area above the screen edge, inset 8 from the sides, and scrolls horizontally inside itself (`scroll-snap-type:x proximity`). The selected item is auto-scrolled into the centre. Edge fades are 24 px masks. Swiping the stage left/right also steps the track.

### 7.5 Hotspot marker: the X key

- **Glyph** (draw a new SVG from `gw-x-logo.png`, do not trace the PNG at 16 px): a **solid white disc 16 px with four rounded slots cut at N, E, S, W**, so the remaining material reads as GW's X. **Never draw it as a stroked ⊗.** At 16 px a circled × reads as "close", and the solid disc with slots is what separates the brand mark from the dismiss icon. Check this on the render at 1440 and at 390 before going further.
- **Carrier:** a 40 px smoke glass disc (blur 12, `--tint` .36 over dark, .64 over light paint) with the key centred. Hit area 44.
- **Breath:** a 1 px ring `rgba(255,255,255,.6)` scales 1 → 1.6 and fades .6 → 0 over 2400 ms `--ease-expo`. **Three cycles** after the stage enters view, then it stops. It does not run while a card is open.

| State | Spec |
|---|---|
| Default | key at 0° (X) |
| Hover / focus-visible | the key **turns 45°**, so the slots now sit on the diagonals and the solid material reads as "+". `--e-2 --ease-expo`. Disc scale 1.08, `--tint` +.14. Focus adds the double ring (50%) |
| Active | disc scale .94, `--e-press` |
| Selected (card open) | the disc becomes **milk** glass, the key **ink** at 0°: the key has been "inserted". `aria-expanded="true"` |
| Others while one is selected | 55% |
| Model switch (track) | keys travel to the new model's coordinates in `--e-3 --ease-expo` while their cards re-label (as CONCEPT-E) |

Each key is a `<button aria-controls>` with a name such as "Engine: twin-turbo 4.0 litre, open detail".
**Phone:** disc 40 / hit 44. Tap = select. The card opens as a bottom sheet (§7.7 phone).

### 7.6 Leader line: dog-leg with a gap

- Two segments: a **45° run** of 24–64 px leaving the key, then **level or plumb** to the card edge. The leader starts **8 px off the disc edge** (the gap) and ends at the card in a **3 px light point** (`--light-edge`, a 6 px soft halo).
- Stroke 1 px `rgba(255,255,255,.82)` with `filter: drop-shadow(0 0 1px rgba(0,0,0,.5))`. This is legibility over white paint, not decoration. On milk cards over a light scene: ink .7, the halo white.
- **Draw** after the key appears: `stroke-dashoffset` in `--e-3 --ease-expo`, then the light point fades in over 240 ms.
- Coordinates live in the photo's mapped `viewBox` (same `object-fit` / `object-position` mapping), so leaders stay on their parts at 1440, 1920 and 1024.
- **Reduced motion:** drawn and lit. **Hidden mode** ("View the car"): leaders, cards and keys fade to 0 in `--e-2` and the car stands alone.

### 7.7 Glass info card: collapsed and expanded

**Collapsed.** Smoke glass, radius 18, padding 14 18, width 220–280. `card-title` `--on-d`, then one line of `body` 14 `--on-d-2`. At the right, a **`+` hairline glyph** 12 px (two 1 px strokes), with no box. The whole card is the button.

**Expanded.** Width 400 (440 at 1920). A macro photo inside the card, inset 6 px, radius 12 ("a slide in a light box"), 16:10. It opens by an **iris**: `clip-path: inset(50% 50% 50% 50% round 12px) → inset(0 round 12px)` in `--e-3 --ease-expo`. Then 2–3 lines of `body`, and a source line in `label` `--on-d-2` (for example "Robb Report, 29 Jul 2026"). The glyph is now `−`. The size change is a FLIP transform; text fades in `--e-1` after 160 ms.

| State | Spec |
|---|---|
| Hover (collapsed) | `--tint` +.10, top edge .30 → .45, and a pool of light follows the pointer inside the card at 30% |
| Focus-visible | double ring, radius 22 |
| Active | `scale(.99)` |
| Expanded | as above. Others 55%, their leaders 30% |
| Collapse | reverse FLIP `--e-2 --ease-in`; the iris closes |

**Phone.** Cards do not float around a car that is only 390 px wide. The selected card becomes a **bottom sheet**: smoke glass, radius 32 on the top corners, inset 8, max 60svh, above the docked track. The leader becomes one plumb line from the key to the sheet's top edge (gap at the key, light point at the sheet). Swipe left/right on the sheet = next/previous key. A grabber is shown; swipe down closes. **768:** cards float as on desktop at 260 px when they fit; otherwise the sheet. Under reduced motion or without JS, the changes are a list of cards under the photo.

### 7.8 Overlay sheet: the Program sheet

- **The stage behind** (studio cove + car) blurs 0 → 18 px and dims to brightness .6 in `--e-3`, using **one** `filter` on the stage layer (desktop only; on the phone it dims only).
- **Panes:** smoke glass, radius 32, inset 40 from the viewport. The left info pane comes first (x −24 → 0), then the film pane, then the two small panes, with an 80 ms stagger and `--e-3 --ease-expo` each (as CONCEPT-E). Spec rows: label `label` `--on-d-2` left, value `body` `--on-d` right, `tabular-nums` where the face supports it (otherwise right-aligned), and a **1 px light hairline** `rgba(255,255,255,.12)` between rows.
- **Close:** a 44 px smoke glass disc, top right, with a 14 px hairline × (two 1 px strokes, **no ring**, so it never resembles the key) and a visible `Close` label to its left at ≥1024. Hover: the disc fogs (+.14) and the × turns 90° in `--e-2`. `Esc` closes. Clicking the blurred stage closes. Exit 400 ms `--ease-in`, then focus returns to "Explore F-26".
- Focus trap, `inert` page, `overscroll-behavior: contain`.
- **Phone:** a full-height bottom sheet (radius 32 top, 8 px of the stage visible above it) with the grabber. The panes stack: info → film (16:9, muted, a tap starts it) → Begin → Latest news. The close disc is top right. Swipe down at the scroll top dismisses.
- **Reduced motion:** the panes appear without travel, the film does not autoplay (a play disc shows), and the stage dims without blur.

### 7.9 Image cards with a glass back: news, provenance, heritage

- Photo radius 20. The **caption sits on a smoke glass strip inside the photo**, inset 8 from the bottom and sides, radius 14, padding 12 16: tag + date in `label` `--on-d-2`, title in `card-title` `--on-d`. Over light photos the strip is milk.
- **Hover:** the photo scales 1 → 1.04 (`--e-4 --ease-expo`). The glass strip **rises 6 px** and reveals one more line: a go-link ("Read the release" / "Ask about this car") with its arrow (`--e-2`).
- **Focus-visible:** double ring around the whole card, radius 24.
- **Active:** `scale(.99)`.
- **Loading:** a `--night` (or `--mist`) plate of the exact aspect + the glass strip with its text. No shimmer.
- **Error:** the plate + "Image unavailable" in `label`.
- **Long titles:** up to 3 lines; the strip grows upward. Never an ellipsis.
- **News layout:** one even baseline. **The Porsche stagger (every second card dropped 60 px) is removed.**
- **Heritage variant: "the light finds it".** Photos are B/W (`grayscale(1) brightness(.85)`). The active card (or the hovered/focused one) **returns to colour** (`grayscale 1 → 0`, `brightness .85 → 1`, `--e-4 --ease-glass`), the same logic as the night showroom. The year is set **in Bebas at 120 px on the glass caption**, not over the photograph.
- **Provenance variant:** the walk-around viewer's control is a glass capsule (§7.13). The cards follow this pattern.
- **Phone:** horizontal snap strips (card 84vw, gap 12) with a light track under them (§7.12). The go-link line is always shown on touch. In heritage, the **centred card is the lit one**.

### 7.10 Spotlight: the showroom at night (a component in its own right)

- **The cone:** a soft volumetric beam. `linear-gradient` from `rgba(255,246,236,.16)` at the top to 0 at the floor, masked by a trapezoid with a **40 px feathered edge** (`mask-image` with a blurred SVG or two blurred gradients). **Not a hard polygon**, as it is now. The **floor pool** is an ellipse `radial-gradient` at `--light`. The cone never crosses the section headline. The beam starts below the headline's baseline, or the headline moves left of the beam.
- **Lit car:** `grayscale 1 → 0`, `brightness .34 → 1`. Count and name `#A3A3A3 → #FFF`.
- **Hover / focus / tap:** that car lights (`--e-4` in, 500 ms out). The others stay at .34. The **light track** marker under the grid slides to it (`--e-3`).
- **Selection** (click / Enter): the FLIP "roll forward" into the studio (900 ms, as CONCEPT-E).
- **Phone:** a 2-column grid (cars at 46vw). Tap 1 lights the car and shows its line under the grid ("F-26 · Limited to 26 examples worldwide · View"). The **View** go-link (or tap 2) enters the studio. No pointer tracking.

### 7.11 Forms: the Miami pane (private enquiry)

The form sits **directly on the milk Miami pane**. **No inner grey box**: today it is a box inside a panel inside a page.

- **Field:** height 52, radius 12, fill `rgba(255,255,255,.72)`, glass edge (top `rgba(255,255,255,1)` → bottom `rgba(0,0,0,.10)`), inner highlight. Label above, `label` `--on-l-2`. Input `body` `--on-l`.
  - Hover: bottom edge → `.18`.
  - **Focus:** fill → `#FFF` + double ring (ink 2 px + white 1 px).
  - Error: a 2 px `--err` edge + a message under it (`body` 14 `--err`, starting "Error:") + `aria-invalid`/`describedby`. **Input is kept.**
  - Disabled: 40%.
- **Select:** the same field, native `<select>` with `appearance:none` and a 12 px hairline chevron.
- **Intent** (Discuss a commission · Provenance Succession · Private viewing): a **glass track** (§7.4, milk variant) as a `radiogroup`. Not three outlined chips.
- **Checkbox** (consent): 20 px, radius 6, milk glass. Checked: smoke fill + a white check drawn in `--e-1`. The label links the privacy policy.
- **Submit:** the primary (§7.1, the smoke variant on milk). Loading → timeout 10 s → an error notice above the button ("We couldn't send this. Call Javier Roque on (305) 783-6493."), with input kept. **Success:** the form is replaced in place (the height animates by FLIP) by "Thank you. Javier Roque will be in touch." + the contact lines. The notice gets `role="status"` and focus.
- **Phone:** single column. The intent track scrolls horizontally if it needs to. Fields are full width. The submit is full width, 48 tall. The pane's side inset is 8 px.

### 7.12 Progress and pagination: the light track

- A 1 px hairline `rgba(255,255,255,.18)` (light ground: `rgba(0,0,0,.14)`). The **active segment** is 48 px of light (`linear-gradient(90deg, transparent, var(--light-edge), transparent)`, 2 px tall, with a 6 px soft glow). It slides in `--e-3 --ease-expo`.
- **Prev/next:** 44 px smoke glass discs with a hairline chevron. Disabled at the ends: 35%, `aria-disabled`.
- **Counter:** `label`, `tabular-nums` where supported: "02 / 06".
- **Uses:** heritage, news, provenance strips, the showroom rail (no longer red), and the walk-around angle meter (one segment per angle).
- **Phone:** the same track under every snap strip, and the discs are hidden (swipe is the control, the counter remains). They come back at 768.

### 7.13 Film transport (Goodwood) and the walk-around control

- **Film transport:** a smoke glass capsule, 44 tall. A play/pause disc (36 px glass) + a light track showing the scrub position + a **meaningful label**: "Goodwood Festival of Speed · from the start line". **No timecodes on screen**; "0:02.75 — 0:08.50" is a build note, not copy.
- **Walk-around** (Provenance): a glass capsule with `←` disc · light-track angle meter · `→` disc · "Drag to turn" label (hidden after the first drag). Keyboard ←/→ on the focused viewer. Drag = pointer events with `touch-action: pan-y`, so vertical page scroll still works on the phone.

### 7.14 Etched name behind the car (studio)

The program name behind the car is **etched glass**, not a grey watermark: the name in `title` scaled to 280 px (wdth 88), filled with a **blurred, slightly brightened copy of the cove** (`background-clip: text` over a pre-blurred cove image at `brightness(1.25)`), plus a 1 px top highlight on the letters (`-webkit-text-stroke` is not used). It reads as lettering frosted into a pane standing behind the car. `aria-hidden`; the real name is in the HTML `title`. **Reduced transparency:** a flat `rgba(255,255,255,.14)` fill.

### 7.15 Badges: lamps, not chips

- An 8 px dot + `label`. The dot is a small lamp: a `radial-gradient` with a 6 px soft glow. Colour by tier: standard = white, track focused = `--gxr`, by invitation = `--gold`, legacy = an unlit dot (1 px ring, no fill). **The tier is always written**, so meaning is never in the dot's hue alone.
- At most two per object. They sit on glass or on solid grounds, never directly on a photo.
- **Phone:** the same.

### 7.16 Stat blocks

- Figure Bebas (`figure`) + unit in Bebas at 36% + label `label` `--on-d-2` (one line) + source in `label` `--on-d-2` **beside the figure**, not across the screen. ("Power: Gunther Werks F-26 release, 15 Aug 2025" sits directly under "1,000 HP", not 800 px away in the bottom-left corner.)
- **The figure is lit, not counted:** on entering view, its opacity goes .25 → 1 in `--e-5 --ease-glass`, like a light coming up. No count-up.
- **Phone:** figure 112 at 390 for 1,000 HP. Other stats are 2-up.

### 7.17 Cursor

The system cursor. **No custom cursor and no cursor-follow light on the page.** Light responds to **objects** (a car under the spotlight, a pool under a tab, a pool inside a button), never to an arbitrary pointer position over content. Use `cursor:grab` / `grabbing` on the walk-around viewer and on horizontal strips on desktop.

---

## 8. Where each component goes (section map)

| Screen | Components |
|---|---|
| Header | §5: clear at the top of the hero, fogs on scroll, milk over light screens |
| 1 Hero | `display` H1 (the kicker is shortened so it never meets the car, see review), secondary **Book a private viewing** + go-link **Explore the programs** |
| 2 Statement | the **milk glass pane** rises over the sticky hero (radius 32, inset 12, shadow §3.4). Words focus from blur inside it (CONCEPT-E m01). The hero stays visible through it |
| 3 Heritage | image cards, heritage variant (§7.9), light track. The orphan "Every door that closed." line leaves this screen (review P1) |
| 4 Showroom | spotlight §7.10, lamps, light track (not red) |
| 5 Studio (programs **and** special editions, merged) | etched name §7.14, tab track with groups §7.4, go-link "Enquire about the F-26", "Explore details" |
| 6 Atelier | keys §7.5, leaders §7.6, glass cards §7.7, track, "View the car" toggle |
| 6b Program sheet | §7.8 |
| 8 Goodwood (the peak) | figure §7.16, film transport §7.13 |
| 9 Commission | tab track (scroll-driven), image cards, **left-aligned** head to match the cards |
| 10 Provenance | walk-around §7.13, image cards, go-link |
| 11 Road | `statement` on the scene |
| 12 News | image cards, glass back, light track, **even baseline** |
| 13 Miami | the **milk glass pane** returns over the scene (the gesture the page opened with), form §7.11 |
| 14 Footer | plain type on `--night`. **No glass** (no photograph under it). The X key at 64 px as the footer mark, with the Our Story caption |

---

## 9. Motion per component: summary

| Component | Trigger | Moves | Duration / easing | Reduced motion |
|---|---|---|---|---|
| Header fog | scroll > 24 px | glass layer opacity | 400 `glass` | instant |
| Nav pool | section change | pool X | 560 `expo` | jumps |
| Primary | hover | pointer-tracked pool | 240 opacity | static pool on hover |
| Go-link | hover | shaft 16 → 32 | 400 `expo` | shaft at 24, no change |
| Tab track | select / scroll | pool X + width | 560 `expo` | jumps |
| Key | enter view | breath ×3 | 2400 | static ring |
| Key | hover / focus | rotate 45° | 400 `expo` | instant rotate |
| Leader | after key | dashoffset + light point | 560 + 240 | drawn |
| Card expand | click | FLIP + iris | 560 `expo` / 400 `in` | instant |
| Statement pane | scroll (pinned 1→2) | pane Y, word blur 12 → 0 | scrubbed, linear | pane in place, text sharp |
| Program sheet | open | stage blur + pane stagger | 560 `expo` / 400 `in` | no travel, dim only |
| Heritage light | active card | grayscale → colour | 720 `glass` | active card in colour |
| Spotlight | hover / focus / tap | cone, pool, colour | 720 in / 500 out | instant |
| Stat figure | enter view | opacity .25 → 1 | 1200 `glass` | lit |
| Menu sheet | open | Y from bottom | 560 `expo` | 160 ms fade |

---

## 10. Phone and tablet: rules that apply to every component

Desktop is the master; the phone re-scales and re-stacks it.

- **Breakpoints.** 390 base · 430 (type +4%, gutter 24) · 768 (the phone structure, two-up grids, cards may float) · 1024 desktop composition. **Touch behaviour follows `(hover:none)`, not width.**
- **Hover → touch.** Every hover-revealed thing is visible at rest on touch (the go-link arrow at 24 px, the caption go-line) or arrives on the first tap (the spotlight, the key's turn), with a visible go-link for the second step. Nothing exists only on hover.
- **Targets ≥ 44×44** (keys, discs, track items, the grabber's touch zone of 44 tall). 8 px between adjacent targets.
- **Controls in the thumb zone.** Tracks, sheets and the enquiry action dock in the lower third above `env(safe-area-inset-bottom)`. The header keeps only wordmark + Menu.
- **Pins.** The phone keeps **one** scrub: Goodwood (the peak). It runs at 48 frames, 750 px wide WebP, pinned 120svh. The statement pane becomes a **sticky hero with the pane scrolling over it** (no pin; the words are sharp from the start, and the blur→focus runs only on desktop). Commission tabs are tapped, not scroll-driven. The heritage strip is a native snap scroller.
- **Parallax.** Off on the phone, except the hero photo at 0.15× while the pane slides over it.
- **Glass budget.** At most 2 backdrop-filtered surfaces on screen. Blur 16 instead of 24. When a sheet is open, the header bar's glass switches to the solid fallback tint.
- **Type.** Per §3.6. Nothing below 14.

---

## 11. Accessibility

- **Glass contrast is a measured property, per placement.** For every glass component that sits over a photograph or a scrubbed film, measure the composited pixels under its text (two screenshots, text hidden / visible, worst 5% under the glyphs) at 1920, 1440, 390, **across every frame of a moving background** (the Goodwood scrub, the strips, the walk-around angles). Text ≥ 4.5:1 below 24 px, ≥ 3:1 at `display` and up. If it fails, **raise that placement's `--tint`** (up to .88). Never add text-shadow.
- **Derivation of the floors (worst case, pure white under smoke; pure black under milk):** smoke at .64 composites to about `#66625F`, where white text is 5.9:1 and `rgba(255,255,255,.86)` is 4.9:1. At .44 the same white region gives 3.0:1, so .44 is allowed **only over measured dark regions.** Milk at .66 over black composites to about `#A5A4A3`, where `#0B0B0B` is 8.0:1 and ink at .70 is 4.7:1.
- **Focus: the double ring.** On dark/smoke: `box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 3px #0B0B0B` at a 2 px offset (outline-offset via a wrapper or `outline: 2px solid #fff; outline-offset: 2px` + an outer ink `box-shadow`). On light/milk: inverted (2 px ink + 1 px white). This holds ≥ 3:1 against any photograph, because one of the two rings always contrasts. Add a soft `0 0 12px rgba(255,255,255,.35)` glow on dark only, so focus feels like the light system, not like browser chrome.
- **Never meaning by hue alone.** The pool of light is also a position and a brightness change on the label. Lamps carry the tier in words. Lit/unlit cars carry the name in white vs grey and `aria-pressed`.
- **Reduced motion:** no pins, no scrubs. Heritage, commission and news are native scrollers. The statement is sharp in a static pane. Goodwood shows the still (location-21) with all captions. The key does not breathe. Leaders are pre-drawn. Sheets and panes appear without travel. Films do not autoplay. Every state is reachable by click or keyboard.
- **Reduced transparency / no backdrop-filter:** the solid tints in §2. The etched name is flat.
- **Keyboard:** tablists, a radiogroup for intent, keys as buttons, sheets with focus trap + `Esc` + return focus, the walk-around with ←/→, the skip link first.
- **Assistive tech:** the etched name, the cones, pools and breath rings are `aria-hidden`. Every card's content exists as real text in the DOM (also when collapsed, so it is in the reading order).

---

## 12. Changes from the interim "Glass & Key" note

1. **The key is a solid disc with four slots, not a stroked ×.** A ringed × at 16 px reads as "close"; the brand mark must not look like the dismiss icon. The sheet close is a bare × with a "Close" label.
2. **The rising white panel becomes a glass pane.** It is the same structural gesture with E's own material, and it fixes the 900 px white void on screen 2.
3. **The header is one bar** that fogs on scroll (clear → smoke). The fog is animated by layer opacity, never by blur radius.
4. **No mono in E.** Badges become lamps. Units are Bebas/Instrument Sans. That gives D and E a typographic difference you can see at thumbnail size.
5. **Heritage keeps its years but changes its logic.** B/W turns to colour under the light, and the year sits on the glass. The pager is the light track.
6. **Studio and Special editions merge** into one stage with a grouped track (one studio device, not two identical screens).
7. **Contrast is guaranteed by tint floors**, with the arithmetic in §11. "Strong blur" alone does not make text legible on glass over white walls.
8. **Gutter 48 → 72** at 1440 (96 at 1920). 48 px reads like a template at this width.
