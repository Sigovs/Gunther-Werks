# Current site audit: Gunther Werks Miami (Prestige Imports)

- **Page audited:** https://www.prestigeimports.com/clp-gunther-werks-miami?isNew=0
- **Captured:** 2026-10-25 (a Sunday), headless Chrome via Playwright, at 1440 and 390 px wide
- **Also inspected (one level only):** the three Gunther Werks program pages the main page links to: `/clp-turbo`, `/clp-speedster`, `/clp-coupe`. They are the only destinations of the page's content CTAs, and most of the usable photography lives there. No other prestigeimports.com pages were crawled.
- **Platform:** DealerFire "Engine 6" (DealerSocket). Images are served from `cdn-ds.com/media/...`.

Screenshots are in `shots/`:

| File | What |
|---|---|
| `current-desktop-1440_full.png` / `_fold.png` | Main GW page, desktop |
| `current-mobile-390_full.png` / `_fold.png` | Main GW page, mobile (iPhone UA, DPR 2) |
| `linked-clp-turbo-1440_full.png`, `linked-clp-speedster-1440_full.png`, `linked-clp-coupe-1440_full.png` | Linked program pages, desktop |

---

## 1. What the main page contains (top to bottom, desktop 1440)

1. **Prestige Imports global header.** Prestige script logo, "Certified Collision Center" / "Certified Paint Shop" links, mega-nav (HOME, NEW, PRE-OWNED, CONSIGN, SERVICE, STORE, RESEARCH, ABOUT). Utility bar: "14780 Biscayne Blvd, North Miami Beach, FL" · "Closed Today" · "(833) 290-6287".
2. **Hero, desktop only (`hidden-xs`).** A full-height muted YouTube background, *Gunther Werks Cedar Green Commission* (`IJMk3WKNEYI`, uploaded by Gunther Werks), with two overlaid headlines in white:
   - H1: "Remastering an Icon" with a white rule under it
   - Right: "A Modern Interpretation of a Classic Analog Masterpiece"
   The frame captured at load shows stone columns and sky, so **no car is visible in the first screen**.
3. **Hero, mobile only (`hidden-sm hidden-md hidden-lg`).** Leftover content from another dealer template: H1 "Your Perfect Adventure Companion", H3 "Reserve the 2023 Hyundai IONIQ 6 in San Leandro, CA", a second block "The IONIQ 6 / State-of-the-art technologies in this futuristic vehicle deliver a seamless driving experience…", and two Hyundai IONIQ 6 photos (`bg-hero-mbl.jpg`, `bg-hero-mbl-2.jpg`). On a phone, **the first thing a visitor sees on the Gunther Werks page is a Hyundai in California.** Under it sits a mobile quick-bar: "inventory / Call / Directions".
4. **GW wordmark.** A 1440 px wide raster JPG of "GUNTHER / W E R K S / M I A M I", black on white.
5. **Intro copy** (bold H4, centred, blue-grey): "Prestige Imports is proud to welcome Gunther Werks Miami as an official franchise to our dealer family…" (verbatim in section 4).
6. **CEO quote** in a grey box, attributed "-Brett David, CEO of Prestige Imports".
7. **"DISCOVER OUR PROGRAMS".** Three cards, each a label (TURBO / SPEEDSTER / COUPE) over a 578 px side-profile car on white. Only the images are links (to `/clp-turbo`, `/clp-speedster`, `/clp-coupe`), and they have no alt text.
8. **"MODERN | CLASSIC".** A yellow 993-based GW car (689 px image, hidden on mobile) plus one sentence: "Porsche 911® remastered by Gunther Werks are modern high-performance, bespoke vehicles that pay homage to the analogue drivers' vehicles of a quarter-century ago." The paragraph contains a large block of pasted Elementor markup (`hub_fancy_heading`) copied from another site.
9. **Parallax band.** About 800 px tall, `Porsche911_Racing.jpg` (a 1038×400 greyscale, near-black, motion-blurred race 911) stretched to full width. It has no text and renders as an **empty black block**.
10. **Global footer.** Links NEW | PRE-OWNED | FINANCE | SERVICE | PARTS | ABOUT US; "Prestige Imports | 14780 Biscayne Blvd North Miami Beach , FL 33181 | (833) 290-6287"; social icons; DealerFire credit; Privacy | Sitemap.

### CTAs and links in page content

| CTA | Target |
|---|---|
| Turbo card image (no text link) | https://www.prestigeimports.com/clp-turbo |
| Speedster card image (no text link) | https://www.prestigeimports.com/clp-speedster |
| Coupe card image (no text link) | https://www.prestigeimports.com/clp-coupe |
| Phone (footer) | `tel:(833) 290-6287` |
| Mobile quick-bar | inventory / Call / Directions (generic site-wide) |
| Nav: PRE-OWNED → "Gunther Werks Miami" | links back to this same page (`?isNew=0`) |

There is **no inquiry form, no "contact / enquire" CTA, no inventory and no VDP link** on the main page. The only route to an enquiry is through a program page's "INQUIRE" button, which goes to the generic contact page (https://www.prestigeimports.com/contact-prestige-imports-in-north-miami-beach-fl).

### Inventory

**None.** The page lists no Gunther Werks vehicles: no VIN, no stock number, no price and no VDP link. The nav item "Gunther Werks Miami" under PRE-OWNED points to this landing page, not to an inventory search. (Not checked: whether the site's used-inventory search holds any GW car. That would mean crawling beyond the brief.)

### Linked program pages (summary)

Each one has a full-width hero (YouTube background), a stat strip, an "INQUIRE" button (to the generic contact page), anchor tabs (Overview / Body or Aerodynamics / Engine / Transmission / Lighting / Gallery), long copy evidently taken from Gunther Werks' own material, and a gallery. Verbatim facts are in section 4.

| Page | Hero/embedded videos | Problem |
|---|---|---|
| `/clp-turbo` | `CmUy7WrE5N4` "On the road with the new Porsche Taycan Turbo S" (Porsche) | **Wrong video:** a Porsche Taycan EV is the hero of the GW Turbo page |
| `/clp-speedster` | `u2-TyIgLpSE` "Gunther Werks Gulf Blaü Speedster Commission" (GW); `tTO-x-pTrg0` | Second video is **private** (embed broken) |
| `/clp-coupe` | `SoaY2WT25ig` "Gunther Werks Sterling Silver Commission" (GW); `lT2gBozvfDI` "The new 911 Carrera Coupé and 911 Carrera Cabriolet." (Porsche) | **Wrong video:** a current Porsche 911 Carrera launch film |

---

## 2. What is wrong with it

1. **On mobile it is a Hyundai page.** The mobile hero, the mobile H1 and two photos advertise a "2023 Hyundai IONIQ 6 in San Leandro, CA", left over from a template. The GW hero video is hidden on mobile, so nothing GW-related appears until the second screen.
2. **No car in the first screen on desktop.** The hero video opens on stone columns and sky. The headline sits over a random frame.
3. **A dead black band.** About 800 px of near-black parallax image just above the footer, with no content.
4. **Tiny, upscaled imagery.** The three program cars are 578 px originals and the yellow 911 is 689 px. The CDN never serves more than the original, so `w_960` and `w_2880` are only upscales.
5. **The logo is a raster JPEG.** A greyscale JPG on white, with no SVG and no transparency.
6. **No conversion path.** No enquiry form, no CTA on the main page, no inventory, no VDP. The programs are reachable only by clicking unlabeled images, and the "INQUIRE" buttons on the program pages go to the generic dealer contact page.
7. **Wrong and broken media on linked pages.** A Taycan video on the Turbo page, a new-911 video on the Coupe page and a private video on the Speedster page.
8. **The specs contradict themselves.** The stat strips and body copy disagree (see 4.3). Power-to-weight is given as "5.9 lbs" / "6.2 lbs" with no unit basis. The copy has typos ("yorus", "couch-built", "all aspects or our restorations", "What If ?….").
9. **Generic dealer chrome dominates.** The full Prestige mega-nav, collision/paint-shop links and DealerFire footer surround the brand. There is no Gunther Werks identity system: fonts are Abel + Roboto. The pasted inline style asks for `termina`, but that font is never loaded.
10. **Copy-paste debris.** The pasted Elementor markup inside the MODERN | CLASSIC block, the inline style soup in the headings and a JS console error (`TypeError: Cannot read properties of undefined (reading 'replace')` in `replaceLink`). The ActivEngage chat is configured "InActive".
11. **Accessibility and SEO.** Every content image has `alt=""`. There are two H1s (one hidden per breakpoint, one of them Hyundai). There is no `og:image`. The `?isNew=0` query string is meaningless.
12. **Undated claims.** "Production of the vehicle has now started, as production of 25 Coupe restorations has just concluded" (Speedster page) has no date.

What is worth keeping: the GW-authored copy blocks (engine, body, lighting, interior; after fact-checking against Gunther Werks), the CEO quote, the dealer contact/hours data, the three GW commission films, and about 25 genuinely good 2000 px+ photographs from the linked program pages.

---

## 3. Downloaded assets

All in `assets/`. Each file is the **CDN original**: the URL with `/w_NNN/` stripped. Requesting a larger `w_` (tested up to `w_4000`) returns the original size, so these are the maximum available. 5 byte-identical duplicates were dropped (listed below). "1x" means wide enough for a full-bleed slot at 1x but not at 2x/retina.

Not downloaded: the Prestige logo and favicons (generic chrome), the collision/paint-shop icons, two Hyundai IONIQ 6 mobile hero images (`sz_165476/Backgrounds/bg-hero-mbl-2.jpg`, `sz_421428/Backgrounds/bg-hero-mbl.jpg`: not GW, reject), and two `Turbo24_D1.png` / `Turbo24_D3.png` (a 226×184 down-arrow UI icon).

Duplicates (same MD5, one copy kept): `speedster2_d` = `coupe3_D`; `speedster7_d` = `coupe8_D`; `speedster8_d` = `Coupe9_D`; `Speedster9_d` = `Coupe10_D`; `Turbo20_D1` = `Turbo20_D` (parallax bg).

### 3.1 Cutouts (transparent background)

Both are from `/clp-speedster`. Both **do carry real alpha**, but as **PNG colour type 3** (8-bit indexed palette + `tRNS` chunk with full 0–255 alpha range), **not colour type 6 (RGBA)**. That means 256 colours, so expect some banding on body reflections. They are the only transparent car images on the page or the linked pages, and **none is a full, clean, high-res car cutout.**

| File | Size | Model | Colour | View angle | Alpha check | Verdict |
|---|---|---|---|---|---|---|
| `cutouts/gw-rear-doors-open-teal_alpha_660x430.png` | 660×430, 54 KB | Speedster per hosting page, but it has a roof, so it may be a coupe (uncertain). Cut from `Speedster14_D.jpg` | Teal / green-blue, tan accents | Straight rear, both doors + engine lid open | colour type 3 + tRNS; 63.6 % fully transparent px, 1 540 partial-alpha edge px | Usable small only. No ground shadow, tight mask. Source: https://cdn-ds.com/media/sz_194506/1477/speedster5_D.png |
| `cutouts/gw-speedster-body-shell-front-34-greyscale_alpha_1336x1210.png` | 1336×1210 canvas (car ≈1120×370), 152 KB | Speedster/convertible body shell (no wheels, no interior) | Greyscale primer/grey | Front 3/4 from right | colour type 3 + tRNS; 83.8 % fully transparent, 4 374 partial-alpha px | Usable small / process storytelling only. Soft source, crude mask. Source: https://cdn-ds.com/media/sz_253080/1477/speedster6_D.png |

**Near-cutout candidates** (opaque, but on pure #FFFFFF or a near-white studio, so they can be keyed out): the three program-card profiles (578 px, pure white at every corner), `photos/gw-coupe-front-34-yellow-black-stripes-studio_689x388.jpg` (white), and at a usable size `photos/coupe/gw-coupe-front-34-black-blue-stripe-studio_2048x1365.jpg`, `photos/coupe/gw-coupe-front-silver-blue-stripes-studio_2048x1366.jpg`, `photos/turbo/gw-turbo-front-orange-studio_2048x1370.jpg`, `photos/turbo/gw-turbo-rear-34-left-orange-studio_2048x1366.jpg`, `photos/turbo/gw-turbo-rear-34-right-orange-studio_2048x1366.jpg` and `photos/speedster/gw-speedster-rear-doors-open-teal-studio_2048x1366.jpg` (light-grey gradient studios, so keying needs proper masking).

### 3.2 Videos

Downloaded from YouTube embeds on the main page (1) and the linked program pages (2), all three uploaded by the **Gunther Werks** channel. Best available stream (video + audio merged to MP4). Porsche-channel videos and the private video were not downloaded.

| File | Spec | Embedded on | Source | Content | Verdict |
|---|---|---|---|---|---|
| `video/gw-cedar-green-commission_yt-IJMk3WKNEYI_1920x1080.mp4` | H.264, 1920×1080 (max available), 54 s, 15 MB | Main page hero | https://www.youtube.com/watch?v=IJMk3WKNEYI | Cedar Green coupe at a concours lawn event: details, interior, crowd, overhead shot; GW logo end card | Usable for hero video (1080p). Event footage with people. Opens on a flag/columns, so it needs trimming |
| `video/gw-gulf-blau-speedster-commission_yt-u2-TyIgLpSE_3840x2160.mp4` | VP9, 3840×2160, 53 s, 46 MB | `/clp-speedster` | https://www.youtube.com/watch?v=u2-TyIgLpSE | Gulf-blue Speedster driving through a port (cranes, containers, bridge), interior, 4.0L intake, "Limited to 25" sill plate | Best film. **Letterboxed ≈2.39:1 inside 16:9** (black bars baked in), so crop for full-bleed |
| `video/gw-sterling-silver-commission_yt-SoaY2WT25ig_3840x2160.mp4` | VP9, 3840×2160, 64 s, 62 MB | `/clp-coupe` | https://www.youtube.com/watch?v=SoaY2WT25ig | Silver coupe at golden hour under freeway bridges and palm boulevards, interior, engine, "Sterling … Limited to" sill | Excellent. Also letterboxed ≈2.39:1 |
| `video/gw-cedar-green-commission-yt-thumbnail_1280x720.jpg` | 1280×720 | (YouTube poster) | https://i.ytimg.com/vi/IJMk3WKNEYI/maxresdefault.jpg | Cedar Green coupe front 3/4 + baked "Cedar Green" script | Reference only |

Rights note: these are Gunther Werks' own films, downloaded for design reference as authorised by the user. Before public use, confirm the rights with Gunther Werks or embed the originals.

### 3.3 All still images

Page column: "GW page" = main page; others = linked program pages.

| File | Size | Page | Source URL | Shows | Verdict |
|---|---|---|---|---|---|
| `logos/gw-miami-wordmark-black-on-white_3302x636.jpg` | 3302x636, 46 KB | GW page | https://cdn-ds.com/media/sz_49974/Backgrounds/Gunther_Werks_Logo.jpg | GUNTHER / W E R K S wordmark + "M I A M I", black on white, greyscale JPEG (no vector, no alpha) | usable small / reference only: raster, needs vector redraw or official SVG |
| `program-cards/gw-turbo-profile-white-on-white_578x488.jpg` | 578x488, 13 KB | GW page | https://cdn-ds.com/media/sz_14605/Backgrounds/Turbo.jpg | Program card: white GW Turbo, pure side profile (nose left), pure white #FFF background | usable small (578 px); white bg keyable |
| `program-cards/gw-speedster-profile-green-on-white_578x488.jpg` | 578x488, 14 KB | GW page | https://cdn-ds.com/media/sz_15001/Backgrounds/Speedster.jpg | Program card: dark green GW Speedster, side profile (nose left), roof down, pure white bg | usable small (578 px); white bg keyable |
| `program-cards/gw-coupe-profile-silver-on-white_578x488.jpg` | 578x488, 13 KB | GW page | https://cdn-ds.com/media/sz_14588/Backgrounds/Coupe1.jpg | Program card: silver GW Coupe, side profile (nose left), gold wheels, pure white bg | usable small (578 px); white bg keyable |
| `photos/gw-coupe-front-34-yellow-black-stripes-studio_689x388.jpg` | 689x388, 33 KB | GW page | https://cdn-ds.com/media/sz_35373/Backgrounds/APorsche_911.jpg | Yellow GW 993-based car with black twin stripes, front 3/4 from left, white studio | usable small (689 px) |
| `photos/porsche-911-racing-track-greyscale-dark_1038x400.jpg` | 1038x400, 21 KB | GW page | https://cdn-ds.com/media/sz_23648/Backgrounds/Porsche911_Racing.jpg | Greyscale, very dark, motion-blurred race 911 on track (parallax band, renders as a black block). Not identifiable as GW | reject |
| `video/gw-cedar-green-commission-yt-thumbnail_1280x720.jpg` | 1280x720, 93 KB | GW page | https://i.ytimg.com/vi/IJMk3WKNEYI/maxresdefault.jpg | YouTube poster of the hero video: Cedar Green coupe front 3/4 with baked-in "Cedar Green" script + GW logo | reject for hero (baked type); reference only |
| `photos/turbo/gw-turbo-rear-orange-desert-panorama_1902x494.jpg` | 1902x494, 134 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo1_D1.jpg | Orange GW Turbo, rear view, small in frame, desert/mountain panorama (3.85:1) | usable wide banner (1x) |
| `photos/turbo/gw-turbo-side-orange-showroom-panorama_1904x604.jpg` | 1904x604, 125 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo2_D1.jpg | Orange-red GW Turbo, side/front 3/4 in dark showroom with wall art, panorama (3.15:1) | usable wide banner (1x) |
| `photos/turbo/gw-engine-bay-purple-car_410x436.jpg` | 410x436, 39 KB | /clp-turbo | https://cdn-ds.com/media/1477/turbo3_D1.jpg | Engine bay, flat-fan air-cooled engine, purple car (model uncertain) | usable small |
| `photos/turbo/gw-rear-34-high-blue-studio_484x564.jpg` | 484x564, 36 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo4_D1.jpg | Light blue car, high rear 3/4, white studio, portrait crop (model uncertain) | usable small |
| `photos/turbo/gw-rear-yellow-studio-portrait_480x622.jpg` | 480x622, 23 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo5_O1.jpg | Yellow/gold car, straight rear, light studio, portrait (model uncertain) | usable small |
| `photos/turbo/gw-headlight-hood-vent-green-detail_1336x1210.jpg` | 1336x1210, 103 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo6_O1.jpg | Green car: headlight + vented hood detail | usable medium |
| `photos/turbo/gw-turbo-side-orange-crop-white_1336x1210.jpg` | 1336x1210, 136 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo7_D1.jpg | Orange GW Turbo, tight side crop (door, rear vent, PORSCHE script), white bg | usable medium |
| `photos/turbo/gw-turbo-carbon-vent-detail-orange_1336x1210.jpg` | 1336x1210, 210 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo8_D1.jpg | Carbon-fibre intake/vent detail under orange bodywork | usable medium |
| `photos/turbo/gw-engine-cooling-fan-detail_1086x1102.jpg` | 1086x1102, 101 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo9_O1.jpg | Engine cooling fan (flat fan) detail | usable medium |
| `photos/turbo/gw-turbo-interior-console-tablet-orange_1086x1102.jpg` | 1086x1102, 148 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo10_D1.jpg | Interior: shifter + console with tablet, orange/grey trim | usable medium |
| `photos/turbo/gw-turbo-carbon-bucket-seats_1086x1102.jpg` | 1086x1102, 187 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo11_D1.jpg | Interior: carbon bucket seats, grey Alcantara, orange accents, door open | usable medium |
| `photos/turbo/gw-turbo-rear-orange-dark-studio_1800x1200.jpg` | 1800x1200, 132 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo12_D1.jpg | Orange GW Turbo, straight rear, dark teal studio, red floor reflection | usable for hero (1x) |
| `photos/turbo/gw-turbo-engine-bay-orange_2000x1333.jpg` | 2000x1333, 332 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo13_D1.jpg | Turbo engine bay open, orange car, yellow charge coolers, light bar | usable for hero (1x) |
| `photos/turbo/gw-turbo-rear-34-left-orange-studio_2048x1366.jpg` | 2048x1366, 184 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo14_D1.jpg | Orange GW Turbo, rear 3/4 from left, light grey studio, car small in frame | usable for hero (1x) |
| `photos/turbo/gw-turbo-front-orange-studio_2048x1370.jpg` | 2048x1370, 169 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo15_D1.jpg | Orange GW Turbo, straight front, light grey studio | usable for hero (1x) |
| `photos/turbo/gw-turbo-console-phone-charging-detail_2000x1333.jpg` | 2000x1333, 250 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo16_D1.jpg | Centre console: shifter + inductive phone charger, carbon, orange trim | usable medium |
| `photos/turbo/gw-turbo-carbon-intake-detail-orange_2048x1366.jpg` | 2048x1366, 311 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo17_D1.jpg | Carbon intake/vent detail framed by orange body | usable medium |
| `photos/turbo/gw-turbo-rear-34-right-orange-studio_2048x1366.jpg` | 2048x1366, 212 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo18_D1.jpg | Orange GW Turbo, rear 3/4 from right, light grey studio | usable for hero (1x) |
| `photos/turbo/gw-turbo-hood-vent-orange-detail_2048x1366.jpg` | 2048x1366, 128 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo19_D1.jpg | Vented front hood + Porsche crest, orange | usable medium |
| `photos/turbo/gw-turbo-interior-dashboard-orange_2048x1366.jpg` | 2048x1366, 394 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo20_D1.jpg | Interior: dashboard, gauges, steering wheel, orange/grey (identical file also used as page parallax bg sz_469761/1477/Turbo20_D.jpg) | usable for hero (1x) |
| `photos/turbo/gw-turbo-rear-34-orange-dark-garage-sparks_2281x1521.jpg` | 2281x1521, 387 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo21_D1.jpg | Orange GW Turbo, rear 3/4, dark garage with wall art, glowing particles on floor | usable for hero (1x) |
| `photos/turbo/gw-turbo-carbon-dashboard-detail_2048x1366.jpg` | 2048x1366, 205 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo22_D1.jpg | Carbon dashboard/gauge hood detail | usable medium |
| `photos/turbo/gw-turbo-gauges-steering-wheel_2048x1366.jpg` | 2048x1366, 288 KB | /clp-turbo | https://cdn-ds.com/media/1477/Turbo23_D1.jpg | Gauges through steering wheel, orange-faced tach | usable medium |
| `photos/speedster/gw-speedster-rear-34-green-driving-panorama_1902x603.jpg` | 1902x603, 153 KB | /clp-speedster | https://cdn-ds.com/media/sz_220455/1477/speedster1_D.jpg | Green GW Speedster driving, rear 3/4, motion blur, panorama (3.15:1) | usable wide banner (1x) |
| `photos/speedster/gw-interior-blue-steering-wheel_410x436.jpg` | 410x436, 34 KB | /clp-speedster | https://cdn-ds.com/media/sz_58275/1477/speedster2_d.jpg | Interior: blue leather, blue steering wheel, gauges (same file reused on Coupe page as coupe3_D) | usable small |
| `photos/speedster/gw-speedster-rear-34-green-canyon-road_480x622.jpg` | 480x622, 47 KB | /clp-speedster | https://cdn-ds.com/media/sz_95336/1477/speedster3_d.jpg | Green GW Speedster driving canyon road, rear 3/4 high, portrait | usable small |
| `photos/speedster/gw-speedster-air-filter-detail_484x564.jpg` | 484x564, 29 KB | /clp-speedster | https://cdn-ds.com/media/sz_53208/1477/speedster4_d.jpg | Engine air-filter detail, teal body | usable small |
| `photos/speedster/gw-shift-knob-detail-navy_800x800.jpg` | 800x800, 35 KB | /clp-speedster | https://cdn-ds.com/media/sz_194432/1477/speedster7_d.jpg | Polished shift knob detail, navy/cream (same file reused on Coupe page as coupe8_D) | usable small |
| `photos/speedster/gw-headlight-red-detail_800x800.jpg` | 800x800, 63 KB | /clp-speedster | https://cdn-ds.com/media/sz_225544/1477/speedster8_d.jpg | Bespoke LED headlight on red car (same file reused on Coupe page as Coupe9_D) | usable small |
| `photos/speedster/gw-taillight-silver-detail_800x800.jpg` | 800x800, 35 KB | /clp-speedster | https://cdn-ds.com/media/sz_143776/1477/Speedster9_d.jpg | Taillight on silver/white car (same file reused on Coupe page as Coupe10_D) | usable small |
| `photos/speedster/gw-speedster-tonneau-yellow-seats-detail_2048x1366.jpg` | 2048x1366, 350 KB | /clp-speedster | https://cdn-ds.com/media/sz_418875/1477/Speedster10_D.jpg | Teal Speedster from above/rear: tonneau humps open, yellow seats | usable for hero (1x) |
| `photos/speedster/gw-speedster-front-34-green-brick-wall-portrait_1638x2047.jpg` | 1638x2047, 517 KB | /clp-speedster | https://cdn-ds.com/media/sz_987886/1477/Speedster11_D.jpg | Dark green GW Speedster, front 3/4 from right, brick building, portrait 4:5 | usable for hero (mobile portrait) |
| `photos/speedster/gw-speedster-overhead-teal-sand_2048x1151.jpg` | 2048x1151, 598 KB | /clp-speedster | https://cdn-ds.com/media/sz_576424/1477/Speedster12_D.jpg | Teal GW Speedster, high overhead rear 3/4 on sand/concrete | usable for hero (1x) |
| `photos/speedster/gw-speedster-shifter-tan-leather_2048x1366.jpg` | 2048x1366, 351 KB | /clp-speedster | https://cdn-ds.com/media/sz_679858/1477/Speedster13_D.jpg | Shifter + console, tan leather, carbon (also page parallax bg) | usable for hero (1x) as texture |
| `photos/speedster/gw-speedster-rear-doors-open-teal-studio_2048x1366.jpg` | 2048x1366, 198 KB | /clp-speedster | https://cdn-ds.com/media/sz_237599/1477/Speedster14_D.jpg | Teal GW car, straight rear, both doors open, engine lid open, white studio (source of the speedster5 cutout) | usable for hero (1x) |
| `photos/speedster/gw-speedster-carbon-pillar-detail_2048x1366.jpg` | 2048x1366, 263 KB | /clp-speedster | https://cdn-ds.com/media/sz_481811/1477/Speedster15_D.jpg | Carbon fibre pillar/door detail, teal + tan | usable medium |
| `photos/speedster/gw-speedster-gauges-white-dials_2048x1366.jpg` | 2048x1366, 216 KB | /clp-speedster | https://cdn-ds.com/media/sz_415962/1477/Speedster16_D.jpg | White-faced gauges close-up | usable medium |
| `photos/speedster/gw-speedster-front-green-driving-highway_2048x1365.jpg` | 2048x1365, 348 KB | /clp-speedster | https://cdn-ds.com/media/sz_489689/1477/Speedster17_D.jpg | Green GW Speedster driving towards camera, open road, motion blur, car small | usable for hero (1x) |
| `photos/coupe/gw-coupe-red-driving-sunset-panorama_1902x624.jpg` | 1902x624, 105 KB | /clp-coupe | https://cdn-ds.com/media/sz_152922/1477/coupe_d.jpg | Red GW Coupe driving, side/front 3/4, sunset backlight, panorama (3.05:1) | usable wide banner (1x) |
| `photos/coupe/gw-coupe-rear-silver-desert-panorama_1900x657.jpg` | 1900x657, 204 KB | /clp-coupe | https://cdn-ds.com/media/sz_303741/1477/coupe2_d.jpg | Silver GW Coupe, rear, desert, hazy sun, panorama (2.9:1) | usable wide banner (1x) |
| `photos/coupe/gw-coupe-front-34-green-driving-portrait_480x622.jpg` | 480x622, 35 KB | /clp-coupe | https://cdn-ds.com/media/sz_61710/1477/Coupe4_D.jpg | Dark green GW Coupe driving, front 3/4, portrait | usable small |
| `photos/coupe/gw-coupe-rear-yellow-door-open_484x564.jpg` | 484x564, 47 KB | /clp-coupe | https://cdn-ds.com/media/sz_87124/1477/Coupe5_D.jpg | Yellow GW Coupe with black stripes, rear from above, door open, GUNTHER plate | usable small |
| `photos/coupe/gw-coupe-rear-wing-red-40l-detail_1008x915.jpg` | 1008x915, 76 KB | /clp-coupe | https://cdn-ds.com/media/sz_108852/1477/Coupe6_D.jpg | Red rear wing with "4.0L" emboss, light studio | usable medium |
| `photos/coupe/gw-carbon-body-shell-studio_1010x916.jpg` | 1010x916, 73 KB | /clp-coupe | https://cdn-ds.com/media/sz_102402/1477/Coupe7_D.jpg | Bare carbon/body-in-white shell, light grey studio | usable medium |
| `photos/coupe/gw-coupe-front-34-black-blue-stripe-studio_2048x1365.jpg` | 2048x1365, 213 KB | /clp-coupe | https://cdn-ds.com/media/sz_337745/1477/Coupe11_D.jpg | Black GW Coupe, blue PORSCHE side stripe, front 3/4 from left, near-white studio | usable for hero (1x); near-white bg |
| `photos/coupe/gw-coupe-front-blue-racetrack_2048x1152.jpg` | 2048x1152, 260 KB | /clp-coupe | https://cdn-ds.com/media/sz_449027/1477/Coupe12_D.jpg | Blue GW Coupe with stripes on race track, head-on, dramatic sky (also page parallax bg) | usable for hero (1x) |
| `photos/coupe/gw-coupe-engine-bay-40l-intake_2784x1856.jpg` | 2784x1856, 382 KB | /clp-coupe | https://cdn-ds.com/media/sz_332219/1477/Coupe13_D.jpg | Engine bay, 4.0L intake plenum, red/white car | usable for hero (largest still: 2784 px) |
| `photos/coupe/gw-coupe-headlight-yellow-detail_2048x1366.jpg` | 2048x1366, 143 KB | /clp-coupe | https://cdn-ds.com/media/sz_986632/1477/Coupe14_D.jpg | LED headlight on yellow car | usable for hero (1x) |
| `photos/coupe/gw-coupe-shifter-blue-interior_2048x1366.jpg` | 2048x1366, 260 KB | /clp-coupe | https://cdn-ds.com/media/sz_305430/1477/Coupe15_D.jpg | Shifter + console, navy interior | usable for hero (1x) |
| `photos/coupe/gw-coupe-carbon-seats-yellow-detail_2048x1366.jpg` | 2048x1366, 388 KB | /clp-coupe | https://cdn-ds.com/media/sz_1895777/1477/Coupe16_D.jpg | Carbon bucket seats with yellow inserts, roll cage | usable for hero (1x) |
| `photos/coupe/gw-coupe-front-silver-blue-stripes-studio_2048x1366.jpg` | 2048x1366, 133 KB | /clp-coupe | https://cdn-ds.com/media/sz_846341/1477/Coupe17_D.jpg | Silver GW Coupe with navy stripes, straight front, light grey studio | usable for hero (1x) |

Model attribution for the photos follows the page that hosts them. Several cars on the Turbo page (blue, yellow, green, purple) may be other GW builds, so their model is **uncertain**. Colours are as seen, not official paint names.

---

## 4. Verbatim facts and their sources

Everything below is copied as published. It is **dealer-page copy, not verified against Gunther Werks.** Treat every figure as "source: Prestige Imports page", to be confirmed before reuse (content-provenance).

### 4.1 Dealer facts

Source: https://www.prestigeimports.com/clp-gunther-werks-miami?isNew=0 (header, footer, JSON-LD `AutoDealer`)

- Name: "Prestige Imports"
- Address (footer): "14780 Biscayne Blvd North Miami Beach , FL  33181"
- Address (header): "14780 Biscayne Blvd, North Miami Beach, FL"
- Phone (header/footer/JSON-LD Sales): "(833) 290-6287"
- Service phone (JSON-LD only, not shown on page): "(833) 290-5148"
- Sales hours (JSON-LD only): "Mo 09:00-19:00", "Tu 09:00-19:00", "We 09:00-19:00", "Th 09:00-19:00", "Fr 09:00-19:00", "Sa 10:00-18:00" (no Sunday entry)
- Service hours (JSON-LD only): "Mo 08:00-17:30" through "Fr 08:00-17:30"
- Header status on capture day (Sunday 2026-10-25): "Closed Today"
- Geo (JSON-LD): latitude "25.913485", longitude "-80.15750349"
- Socials: https://www.facebook.com/prestigeimportsmiami · https://www.instagram.com/prestigeimports/ · https://twitter.com/PRESTIGEMIAMI · https://www.youtube.com/prestigeimportsmiami · https://www.pinterest.com/prestigeimports/
- Page `<title>`: "Gunther Werks Miami"; meta description: "Gunther Werks Miami – A Modern Interpretation of a Classic Analog Masterpiece"

### 4.2 Main page copy

Source: https://www.prestigeimports.com/clp-gunther-werks-miami?isNew=0

- Hero H1: "Remastering an Icon"
- Hero right: "A Modern Interpretation of a Classic Analog Masterpiece"
- Intro: "Prestige Imports is proud to welcome Gunther Werks Miami as an official franchise to our dealer family. Gunther Werks Miami will be one of the global epicenters for this renowned restorer of remastered custom icons. Our Gunther Werks dealership will provide authorized sales and service for the entire East Coast of the United States."
  - *Claims to verify with Prestige/GW: "official franchise", "authorized sales and service for the entire East Coast". Undated; "will be" suggests launch-era copy.*
- Quote: "Prestige Imports is pleased to welcome Gunther Werks and act as their showroom here in South Florida. We pride ourselves in offering our clients the absolute finest luxury transportation on the planet." — "-Brett David, CEO of Prestige Imports"
- "DISCOVER OUR PROGRAMS": "TURBO", "SPEEDSTER", "COUPE"
- "MODERN | CLASSIC": "Porsche 911® remastered by Gunther Werks are modern high-performance, bespoke vehicles that pay homage to the analogue drivers' vehicles of a quarter-century ago."
- Hero video title: "Gunther Werks Cedar Green Commission" (YouTube, channel "Gunther Werks")

### 4.3 Program facts (linked pages)

**Turbo.** Source: https://www.prestigeimports.com/clp-turbo
- Headline: "Project Tornado"
- Stat strip: "700 hp Track Mode" · "600 hp Standard" · "2,700 lbs Curb Weight" · "4.0 Liter Twin-Turbo"
- "Limited to 75 Examples." / "Only 75 discerning individuals will ever own one"
- "The Turbo features a Gunther Werks Specified, Rothsport Racing built 4.0-liter twin-turbocharged engine that revs to 7500rpm. Power is transferred to a 6-speed manual transmission with bespoke ratios to just the rear wheels."
- "Inlet temperatures are controlled using twin liquid charge coolers, these being seventeen times more efficient than an air-to-air intercooler." … "controlled by a sophisticated multimap Motec engine management system. Output is 600hp in standard form, but with a press of the steering wheel mounted track mode setting, this increases to a formidable 700hp."
- "The 4.0L engine uses a race-derived flat fan, which provides more than double the volume of air than the standard vertical fan"
- "The benefits of making them from carbon fibre result in a saving of over 500 lbs. from the original platform."
- Interior: "carbon fiber steering wheel with integrated controls for switching the engine to track mode and activating the integrated nose lift"; "magnetic inductive charging base"; "Porsche Classic PCCM radio"; "lightweight hollow carbon fiber bucket seats are designed to utilize both a 5-point harness and 3-point belts"

**Speedster.** Source: https://www.prestigeimports.com/clp-speedster
- Headline: "Open Roof Masterpiece."
- Stat strip: "435 hp" · "355 ft/lb Torque" · "2,590 lbs Curb Weight" · "5.9 lbs Power to Weight" · "Roadster"
- "Limited to 25 Examples." / "As Gunther Werks' restorations of coupe's was limited to 25 examples, so too Speedster restorations will be limited to only 25 unique examples. Production of the vehicle has now started, as production of 25 Coupe restorations has just concluded." *(undated)*
- "we have made the Speedster twice as stiff as a standard coupe with no weight penalty"
- Engine: "Our 4.0-liter has been meticulously developed by Rothsport from Oregon to our specifications, to create the ultimate naturally aspirated flat-six." … "The net result is: a 7800 rpm redline, 330lbs feet of torque, and 430+ horsepower."
- Transmission: "Getrag G50" "rebuilt with completely bespoke custom ratios" … "single mass mid-weight flywheel and uprated single-plate clutch" … "lower ratio limited slip differential featuring carbon clutches"
- Lighting: "lightweight forged T-6061 aluminum components and carbon fiber to accommodate the larger Bi-LED projectors and active daytime running lights" … "hand-polished aerospace grade glass housing"

**Coupe.** Source: https://www.prestigeimports.com/clp-coupe
- Headline: "A Legend Reborn."
- Stat strip: "435 hp" · "312 ft/lb Torque" · "2,677 lbs Curb Weight" · "6.2 lbs Power to Weight" · "Coupe"
- "Limited to 25 Examples." / "Only 25 discerning individuals will ever own one"
- Engine and transmission copy: identical to the Speedster page ("7800 rpm redline, 330lbs feet of torque, and 430+ horsepower"; Getrag G50).

**Contradictions to resolve before any figure ships:**
- Speedster torque: "355 ft/lb" (strip) vs "330lbs feet" (copy). Coupe torque: "312 ft/lb" (strip) vs "330lbs feet" (copy).
- Power: "435 hp" (strips) vs "430+ horsepower" (copy).
- "Power to Weight" given as "5.9 lbs" / "6.2 lbs" (presumably lb/hp; the unit is not stated).
- No prices appear anywhere. None should be invented.

---

## 5. Verified vs not verified

**Verified:** page content and structure at 1440 and 390 (rendered DOM and screenshots); no horizontal overflow at either width (`scrollWidth` = viewport); CDN originals are the maximum size; alpha in both PNG cutouts (IHDR colour type + alpha histogram); duplicate files by MD5; video resolution and duration via ffprobe; YouTube uploader names via oEmbed.

**Not verified / uncertain:** whether any Gunther Werks car is in the site's used inventory (not crawled); every spec and claim above, against Gunther Werks; the exact model or commission name of the non-orange cars on the Turbo page; whether `speedster5_D.png` shows a Speedster or a coupe; the Cedar Green film's location (looks like a concours lawn, not identified); usage rights for any asset.
