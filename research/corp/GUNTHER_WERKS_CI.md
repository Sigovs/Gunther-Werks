# Gunther Werks: corporate site, lineup, brand identity, asset catalogue

**For:** Gunther Werks Miami, a child site of Prestige Imports (North Miami Beach, FL). This is research only, with no design and no code.
**Researched:** 25 Oct 2026. The live site https://guntherwerks.com/ was crawled from its own `sitemap.xml`: all 53 English URLs. Each URL was fetched with curl (HTML) and rendered in Playwright (system Chrome, headless) at 1440×900. The home page was also rendered at 390×844 (iPhone UA, touch). CSS, the Typekit kit, the JS bundles and the i18n dictionary were read as text.
**No image, video or font file was saved.** Dimensions, alpha and video specs come from reading the first bytes of each file in memory (HTTP Range requests). ZIP contents were listed by range-reading only the central directory. Screenshots of pages and contact sheets are allowed and are in `research/corp/shots/`.
**Tags:** **[V]** verified at the source given · **[I]** inferred (reason given) · **[?]** not stated or unknown. Figures are quoted exactly as published. Nothing is rounded or filled in.

### Source keys (used throughout)

| Key | Exact URL |
|---|---|
| HOME | https://guntherwerks.com/ |
| F26 | https://guntherwerks.com/programs/f26/ |
| TURBO | https://guntherwerks.com/programs/turbo/ |
| GWR | https://guntherwerks.com/programs/gwr/ |
| GWX | https://guntherwerks.com/programs/gwx/ |
| SPD | https://guntherwerks.com/programs/speedster/ |
| CPE | https://guntherwerks.com/programs/coupe/ |
| GXR | https://guntherwerks.com/programs/special-editions/gxr-evo/ |
| THM | https://guntherwerks.com/programs/special-editions/thermal-edition/ |
| BRU | https://guntherwerks.com/programs/special-editions/brundle-edition/ |
| BRU-PR | https://guntherwerks.com/newsroom/brundle-edition/ |
| GXR-NEWS | https://guntherwerks.com/newsroom/gxr-evo/ |
| EG | https://guntherwerks.com/commissions/turbo/project-end-game/ |
| COMM | https://guntherwerks.com/commissions/ |
| PSP | https://guntherwerks.com/provenance-succession/ (+ `/rennsport/`, `/phoenix/`, `/blue-phoenix/`, `/rubystone/`) |
| STORY | https://guntherwerks.com/our-story/ |
| OWN | https://guntherwerks.com/ownership/ |
| DEALER | https://guntherwerks.com/dealer/ |
| MK | https://guntherwerks.com/media-kit/ |
| MEDIA | https://guntherwerks.com/media/ |
| EVENTS | https://guntherwerks.com/events/ |
| CONTACT | https://guntherwerks.com/contact/ |
| BG-PDF | https://media.guntherwerks.com/assets/media/downloads/Gunther-Werks-Background.finalrev1.pdf |
| F26-PR | https://media.guntherwerks.com/assets/media/downloads/F26-PR.pdf (dated Aug 15, 2025) |
| GWX-PR | https://media.guntherwerks.com/assets/media/downloads/GWX-PR.pdf (dated Aug 13, 2025) |
| SPD-PR | https://media.guntherwerks.com/assets/media/downloads/Speeder-and-Warranty-PR.pdf (dated Oct 28, 2025) |
| TFS | https://media.guntherwerks.com/assets/media/downloads/gw-turbo-fact-sheet.pdf |
| DICT | The site's English UI dictionary, `https://guntherwerks.com/assets/i18n-ui-dNYy7T8c.js`. The model pages fill their text and stat labels from it at runtime. Keys are quoted where used |
| CSS | https://guntherwerks.com/assets/style-WjWpyfPV.css |
| TK | https://use.typekit.net/owj4qih.css |
| 400R-PR | https://www.conceptcarz.com/z27652/news.aspx (re-publication of the 18 Aug 2017 GW press release) |
| SHOP-23 | https://theshopmag.com/news/gunther-werks-announces-first-east-coast-showroom/ (27 Nov 2023) |
| DPR-GWR | https://news.dupontregistry.com/dealer-news/gunther-werks-new-1-of-40-gwr-lands-at-prestige-imports-in-sunny-south-florida |

---

## 0. Summary

| Topic | Finding |
|---|---|
| What GW is | A Huntington Beach, CA atelier that "remasters" the air-cooled Porsche 911 of the **993** generation. Founder and CEO: **Peter Nam** **[V: STORY, BG-PDF]** |
| Lineup | **Active:** F-26 (26 cars), Turbo (75), GWR (40), GWX (by invitation). **Special editions:** GXR-EVO (15), Brundle Edition (5), Thermal Edition (5). **One-off:** Project End Game (1 of 1). **Completed legacy:** Coupe (25; called "400R" at launch) and Speedster (25) **[V]** |
| Type | **Gill Sans Nova** (Monotype, served from an Adobe Fonts kit) for everything. **Bebas Neue** for stat numerals. **JetBrains Mono** for units and micro-labels. **Javacom** for model names (free display face by Youssef Habchi) **[V]** |
| Colour | Monochrome: black `#000`, white `#FFF`, near-black `#111`/`#0A0A0A`, grey `#333`, light surfaces `#F5F5F5`/`#F8F8F8`. Accents are per program: GXR red `#FF2A3C`, Thermal red `#E31937`, navy `#1D335C`, "by invitation" gold `#C9A227`. Declared tokens `--accent-color:#FF4500` and bronze `--cta-pill-primary-bg:#8B7355` are almost never visible **[V: CSS]** |
| Logo | A geometric wordmark, **"GUNTHER" over a widely tracked "W E R K S"**, available as SVG in black and white. There is also a **"GW" monogram SVG** **[V]** |
| Photography | Three registers: (1) a dark cyclorama studio with coloured rim light (red or amber), haze and floor reflections; (2) a white or grey seamless catalogue studio, used for the cutouts and the PSP galleries; (3) California location work (vineyards, Laguna Seca, coast), drone aerials and tracking shots. There is a lot of macro detail on interiors and craft **[V: visual]** |
| Cutouts | **47 alpha files verified; 43 are true car cutouts (including 1400 px menu copies) of 16 distinct cars** (§5). Large originals reach 4800 px. Side profiles all face left (nose left). Several are tightly cropped at the canvas edge |
| Video | 12 direct MP4s on the CDN (one 4K clip; the rest are 1080p, 720p and vertical) and 2 YouTube embeds. **No scroll-scrubbed video on the site.** Best single-take scrub segments: End Game 0:45.3–0:52.1 (crane-down reveal, 1080p) and Speedster 0:16.75–0:22.25 (slow orbit, 720p). **There is no turntable or frame sequence.** The "360°" button is a pseudo-panorama built from one flat photo (§4.3) |
| Press kit | Yes: **https://guntherwerks.com/media-kit/**. It holds 3 press-release PDFs, 6 image ZIPs (F-26, Turbo, GWR, GWX, Speedster, Coupe; the GWX ZIP is 358 MB with 161 JPGs), a Turbo fact sheet and a company background PDF. A wallpaper page is at **/media/** **[V]** |
| Miami | GW's own dealer page lists **"Miami · Prestige Imports · Javier Roque · (305) 783-6493 · 15050 Biscayne Blvd, North Miami Beach, FL 33181"** **[V: DEALER]**. **This conflicts with the address and phone in our project CLAUDE.md** (14780 Biscayne Blvd, (833) 290-6287). See §7 |

---

## 1. Site map

Platform: a custom **Vite** build. HTML is pre-rendered, and runtime text comes from an i18n dictionary (EN/JA). There is a US/GLOBAL region switch and Pagefind search. GSAP 3.15.0 is used. Images sit on a Cloudflare-fronted CDN, `media.guntherwerks.com/assets/…`, with `-{width}w.webp` variants (`Access-Control-Allow-Origin: *`) **[V]**. Japanese mirrors exist under `/ja/` **[V: sitemap]**.

The main menu has four tabs **[V: HOME markup]**:
- **Programs:** tiers Special Edition (GXR EVO, Brundle Edition, Thermal Edition, End Game Turbo) / Standard (F-26, Turbo, GWR, GWX) / Legacy (Speedster, Coupe). Each item shows a side-view cutout, a model logotype and a badge.
- **Ownership:** GW Access, Track Experience, Exclusive Events, Provenance Succession.
- **Company:** Our Story, Careers, Media, Contact, GW Store (gw9design.com).
- **Find a Dealer:** North America / Global / Become a Dealer.

Every page has a full-page screenshot at 1440 (`shots/<slug>-1440.png`) and a first-viewport shot (`-1440-fold.png`). The home page also has `home-390.png` and `home-390-fold.png`. Measured horizontal overflow at 1440 was **0 px on all 53 pages** **[V]**.

| Group | URLs (all under https://guntherwerks.com) |
|---|---|
| Home | `/` |
| Model pages: standard | `/programs/f26/`, `/programs/turbo/`, `/programs/gwr/`, `/programs/gwx/` |
| Model pages: legacy | `/programs/speedster/`, `/programs/coupe/` |
| Model pages: special editions | `/programs/special-editions/gxr-evo/`, `/programs/special-editions/thermal-edition/`, `/programs/special-editions/brundle-edition/` |
| Commissions | `/commissions/` + `/commissions/turbo/{project-end-game, napa, mckenna, darknecessities, hercules, alchemy, eisblau, hkgreenturbo, whitepink, whiteturbo, gemini, dragonball}/` |
| Provenance Succession (certified pre-owned) | `/provenance-succession/` + `/rennsport/`, `/phoenix/`, `/blue-phoenix/`, `/rubystone/` |
| Ownership and company | `/ownership/`, `/events/`, `/our-story/`, `/careers/`, `/contact/`, `/owners-application/` |
| Dealers | `/dealer/` (list), `/dealership/` (become-a-dealer form) |
| Press | `/newsroom/` + 13 posts (brundle-edition, gxr-evo, jalopy-jeff-gxr-evo, road-and-track-gxr-evo, car-and-driver-gxr-evo, motor1-gxr-evo, motor-trend-gxr-evo, dupont-registry-gxr-evo, goodwood-fos-2026-bts, goodwood-fos-2026, robb-report-f-26, top-gear-f-26), `/media-kit/`, `/media/` (wallpapers) |
| Other | `/privacy-policy/`, `/sitemap/` |

Site defects seen **[V]**:
- `/events/dinner-anglesey-arms/` is listed in the sitemap but serves the **home page** (identical HTML, 104,912 bytes).
- Three referenced images return **404**: `homepage/dji_0588.jpg`, `homepage/t7__1572.jpg` and `shared/dsc03004-enhanced-nr_.jpg` (all on `/events/`).
- The console shows only Cloudflare Turnstile CSP noise on the form pages.

---

## 2. Model lineup

All programs are built on the **Porsche 911 of the 993 generation**. "Turbocharged 993" **[V: HOME `home.hero.slide7.sub`]**; "The 993, the final air-cooled generation, provides the foundation" **[V: STORY]**. The Speedster starts from a convertible: "Gunther Werks uses a convertible as a foundation" **[V: DICT `speedster.body.copy`, rendered on SPD]**. **No price is published anywhere on the site [V: negative]**.

### 2.1 Lineup table (as published; contradictions flagged ⚠ and listed in 2.2)

| Model | Status on site | Production | Engine | Power | Torque | Weight | Body | Sources |
|---|---|---|---|---|---|---|---|---|
| **F-26** (also "Project F-26") | Active ("Standard" tier; inquiry form open). Sold-out status: **not stated** | "Limited to just 26 examples worldwide" | "Twin-turbocharged 4.0L flat six engine co-developed by Rothsport Racing", "Mezger"; six-speed manual, RWD | ⚠ **1,067 hp** (hero stat, home, menu) / **1,000 horsepower @ 7,600 RPM** (spec table and copy on the same page) | 750 lb-ft @ 5,600 RPM | ⚠ **2,750 lbs** curb (site) / 2,700 pounds (F26-PR) | "Carbon-fiber body panels and doors"; "993 steel chassis with added bracing for a 200% increase in rigidity"; wheelbase +30 mm rearward | F26, HOME, F26-PR |
| **Turbo** | Active | "Limited to 75 examples worldwide" | "Gunther Werks Specified, Rothsport Racing built 4.0-liter twin-turbocharged", 7500 rpm redline, Getrag 6-speed | ⚠ **850 bhp** ("600hp in standard form … track mode … 850hp") | ⚠ 600 lbft | ⚠ **2,700 lbs** (hero stat) | Carbon fenders, quarters, skirts, roof, hood, bumpers, wing, ducktail (optional) | TURBO, DICT `turbo.*` |
| **GWR** | Active ("The definitive 993") | "Limited to 40 Examples" | "4.0 Liter Quad Cam Twin Valve Flat-Six, co-developed by GW/Rothsport", naturally aspirated, re-engineered Getrag G50 6-speed | 500+ horsepower @ 9,000 RPM | 340 lb-ft | 2,400 lbs | "lightweight carbon fiber body"; S-duct hood | GWR, DICT `gwr.*` |
| **GWX** | Active, "By invitation only" | Site: "One-of-one and few-off editions". ⚠ GWX-PR: "only three planned builds" | GWX-PR: "second generation GWX 4.0 liter flat-six", sliding throttle plates. Site: **not stated** | GWX-PR: 440 horsepower. Site: **not stated** | GWX-PR: 320 lb-ft | **not stated** | GWX-PR: bespoke carbon panels; Candy Purple paint exclusive to GWX | GWX, GWX-PR |
| **Coupe** (launched 2017 as **400R**) | "Completed - Legacy Program" (inquiry disabled) | "Limited to 25 Examples" (BG-PDF: "inaugural program") | "4.0 Liter naturally aspirated flat-six by Rothsport", Getrag G50 6-speed, redline 7,800 RPM | ⚠ **435** hp (hero stat) / **430+** @ 7,800 (specs) / "over 400hp" (400R-PR, 2017) | ⚠ 312 ft/lb (stat label) / 330 lb-ft (specs, 400R-PR) | 2,677 lbs | Carbon front fenders, rear quarters, side skirts, roof, hood, bumpers | CPE, DICT `coupe.*`, 400R-PR |
| **Speedster** | "Completed - Legacy Program"; final car delivered per SPD-PR (Oct 28, 2025) | "Limited to 25 Examples" | 4.0 NA flat-six by Rothsport, Getrag G50 | ⚠ **435** (hero) / **430+** @ 7,800 (specs) | ⚠ 335 (stat label and sound line) / 330 lb-ft (specs) | 2,590 lbs | Carbon panels as Coupe; "Twice as stiff as standard coupe with no weight penalty" | SPD, SPD-PR |
| **GXR-EVO** | Special Edition, "Track Focused", "9 Year Anniversary". Unveiled at The Quail, "Aug 14, 2026 - 9:30am" | "Limited to 15 units globally" | "4.0-liter naturally aspirated flat-six … Rothsport Racing co-developed", four-cam twin-valve, "nearly 9,000 rpm", Getrag G50 | 455 hp | ⚠ not stated in specs (hero shows Coupe's "312 ft/lb Torque" label) | ⚠ hero **2,677** lbs "Curb Weight" / specs "Dry weight **2,386 lbs** (210 lbs lighter than Coupe)" | "Full carbon-fiber body in 12k 2x2 weave on the 993-generation platform"; "38.4 percent Increased Downforce" | GXR, DICT `gxr_evo.*`, GXR-NEWS |
| **Brundle Edition** (Turbo-based) | Special Edition, announced 10/21/2026; debut "Concours at Wynn Las Vegas" | "Limited to just five examples worldwide" | "Rothsport Racing-built 4.0-liter twin-turbocharged flat-six", 7,500 rpm | 860 hp | ⚠ 600 ft/lb (stat) / 610 lb-ft (BRU-PR text) | 2,700 lbs | Two-tone pearl livery; forged magnesium wheels | BRU, BRU-PR |
| **Thermal Edition** (Turbo-based) | Special Edition, tribute to The Thermal Club | "Limited to just five examples worldwide" | Same twin-turbo 4.0 as Turbo, 7,500 rpm | 850 bhp | 600 lbft | 2,700 lbs | Two-tone livery, carbon sills, Hyper Silver magnesium wheels | THM |
| **Project End Game** (Turbo Speedster) | "Completed Commission", "1 of 1". "The final Speedster, and the first one-of-one from GWX" | 1 | "Rothsport Racing-built 4.0-liter twin-turbocharged flat-six", 7,500 rpm, six-speed | 850 hp | 660 ft-lbs | "just over 2,600 lbs" (stat 2,600; 3.1 lbs/hp) | "carbon-fiber body" | EG |

Turbo commissions shown as completed one-offs, each with its own gallery: Napa (red), McKenna, Hercules, Dark Necessities, Alchemy, Eisblau, HK Green Turbo (RHD), White Pink, White Turbo, Gemini, Dragonball **[V: COMM]**. Provenance Succession (pre-owned, factory re-validated, 5-year/100,000-mile cover from succession) **[V: PSP]**:
- **Rubystone** (Coupe, "Porsche Rubystone Red", 435+ bhp): listed under "Available Commissions".
- **RennSport Aventura** (Coupe): "Privately Placed".
- **Phoenix** (Speedster, 435+ bhp, yellow).
- **Blue Phoenix** (Speedster, 445+ bhp).
- The availability of Phoenix and Blue Phoenix is **not stated** on the index page. Only Rubystone appears in the "Available" carousel **[V: render]**.

Warranty: "Every Gunther Werks commission is supported by a 5-year or 100,000-mile warranty, whichever comes first" **[V: GXR, THM, BRU, OWN]**. SPD-PR calls it "a first among boutique manufacturers" and says it "applies retroactively to all Gunther Werks vehicles" **[V: SPD-PR]**.

**About "400R":** the current site never uses the name 400R **[V: negative, DICT]**. The 2017 launch release names the car the 400R: "Only 25 examples will be made", "built on a Porsche® 993 platform", "over 400hp and 330lb/ft" **[V: 400R-PR]**. The site's own Coupe ZIP contains `Coupe/gunther-werks-400r.jpg` **[V: MK ZIP listing]**. Conclusion: Coupe = 400R **[I, strong]**. A "400R Speedster" name was **not found** on the site. The open-top car is simply "Speedster" **[V]**.

**Turbo history:** in Nov 2023 the Miami showroom news described a "750-hp Touring Turbo Edition Coupe" **[V: SHOP-23]**. Today's Turbo is 850 hp **[V: TURBO]**. Treat 750 hp as superseded.

### 2.2 Contradictions between sources

1. **F-26 power.** "1,067 hp" (F26 hero stat; HOME hero "TWIN TURBO 1,067 HP"; menu badge) versus "1,000 horsepower @ 7,600 RPM" (F26 spec table and body copy), "1,000 horsepower" (F26-PR) and "1,000-horsepower" (BG-PDF). The site disagrees with itself on one page.
2. **F-26 weight.** 2,750 lbs (F26) versus "a curb weight of only 2,700 pounds" (F26-PR).
3. **Chassis rigidity.** F-26 "200% increase" (F26) versus "150%+ rigidity improvement" for every chassis (BG-PDF).
4. **Turbo.** The site says 850 bhp, 600 lbft, 2,700 lbs and a 7500rpm redline. TFS says Track mode 840 crank HP, max torque 660 ft-lbs (895 Nm), curb weight 2790 lbs and max engine speed 7800 RPM. For the street modes the site says "600hp in standard form" and TFS says Comfort 513 / Sport 650.
5. **Brundle torque.** 600 ft/lb (stat on BRU and BRU-PR) versus "860 horsepower and 610 lb-ft" (BRU-PR body text).
6. **Coupe.** Hero 435 hp versus specs "430+ horsepower". Torque stat label 312 ft/lb (DICT `program.stat.torque_coupe`) versus 330 lb-ft (specs).
7. **Speedster.** Hero 435 versus specs 430+. Torque label 335 versus specs 330.
8. **GXR-EVO weight.** The hero shows a hard-coded "2,677" lbs Curb Weight, which is the Coupe's figure. The spec table says "Dry weight 2,386 lbs (210 lbs lighter than Coupe)", and 2,677 − 210 = 2,467, not 2,386. The hero torque label reuses the Coupe's "312 ft/lb". The spec intro still says "Full technical specifications will be released with the official reveal".
9. **Founding year.** BG-PDF says "Founded … in 2017 by Peter Nam" in its body text and "Founded: 2015 (established 2017)" in its snapshot box.
10. **GWX.** "only three planned builds" (GWX-PR) versus "one-of-one and few-off editions" with no number (GWX).
11. **Phoenix copy.** It says "Arctic-inspired livery", but the Phoenix car is yellow. The text is evidently reused from RennSport Aventura **[V: PSP/phoenix + gallery]**.
12. **Prestige Imports contact.** See §7.

---

## 3. Brand identity

### 3.1 Logo forms (all SVG unless noted)

| Asset | URL | Notes |
|---|---|---|
| Wordmark, black | https://media.guntherwerks.com/assets/logos/gunther-werks-logo.svg | viewBox 792.06×85.82. "GUNTHER" in squared, rounded-corner geometric letters over "W E R K S" spaced to the full width. Fill is the default (black) **[V]** |
| Wordmark, white | https://media.guntherwerks.com/assets/logos/gunther-werks-logo-white.svg | Same paths, `fill="#fff"`. Used in the header **[V]** |
| "GW" monogram | https://media.guntherwerks.com/assets/logos/gw-mark.svg | viewBox 310.03×61.23 **[V]** |
| "X" key emblem | https://media.guntherwerks.com/assets/logos/gw-x-logo.png | PNG RGBA 2401×2400. STORY: "the company key was designed in an 'X' pattern — a symbol of every door that closed" **[V]** |
| Favicon / touch icon | `…/assets/logos/favicon.png` (512²), `…/apple-touch-icon.png` (180²) | **[V]** |
| Model logotypes (PNG/WebP with alpha) | `…/programs/gunther-werks-f-26-program.png`, `…/gunther-werks-turbo-program.png`, `…/gw-gwr.png`, `…/gw-gwr-black.png`, `…/gw-gwx.png`, `…/gw-speedster.png`, `…/gw-coupe.png` (all 2449×811); `…/special-editions/gxrevo/GXR-EVO_Logo_2.png` / `_3.png` (1864×263); `…/brundle/BRUNDLE%20EDITION_Black.webp` / `_White.webp` (2856×125); `…/commissions/endgame-logo.png` / `-black.png` (1701×107); `…/psp/rennsport-aventura-logo.png`, `…/psp/blue-phoenix-white.png`, `…/psp/phoenix-logo.png` | **[V: probe]** |
| Model logotypes (SVG) | https://media.guntherwerks.com/assets/programs/special-editions/thermal/THERMAL_Text-Red.svg, `…/THERMAL_Text-White.svg` | **[V]** |
| Partner and press logos | `…/logos/{car-and-driver, dupont-registry, motor-trend, motor1, road-and-track, youtube}-logo.svg`, `bbc-top-gear.png`, `robb-report-logo.png`, `goodwood-fos-logo-white.png`, `…/brundle/martin-brundle-logo.webp` | **[V]** |

Header usage: the white wordmark sits centred in a 72 px bar (`--header-bar-height: calc(4.5rem + env(safe-area-inset-top))`). The bar is translucent dark over heroes and grey over white model pages. MENU and burger sit at the left; ENGLISH ▾ and search sit at the right **[V: CSS, shots]**.

### 3.2 Typefaces

| Family | Source and foundry | Weights served | Where used |
|---|---|---|---|
| **Gill Sans Nova** (`gill-sans-nova`) | Adobe Fonts kit `owj4qih` (TK), last published 2026-06-12. Gill Sans Nova is a **Monotype** family; the foundry attribution is from general knowledge, not printed in the kit **[I]** | **400, 400 italic, 700, 700 italic** only (fvd n4/i4/n7/i7) **[V: TK]** | Everything: body 16 px. Headings are UPPERCASE, weight 400, normal tracking, e.g. home hero H1 40/32, section H2 40–64 px, model-page H3 43.2/64.8. Nav H4s are 11.2 px with 0.1em tracking **[V: render]**. The CSS also asks for 300, 500 and 600, which no face supplies. The browser maps them to 400 or 700 **[I]** |
| **Bebas Neue** | Self-hosted Fontsource build (`/assets/bebas-neue-latin-400-normal-*.woff2`). Open-source, by Dharma Type **[I: general knowledge]** | 400 | Big stat numerals, `clamp(2.5rem,6vw,3.9rem)` (1,067 / 2,750 / 2.58 / 4.0) **[V: CSS]** |
| **JetBrains Mono** | Self-hosted Fontsource (400, 500, 600). Open-source, by JetBrains **[I]** | 400, 500, 600 | Stat units ("hp", "lbs", "Liter"), "LIMITED TO …" micro-labels and badges, letter-spaced **[V: shots, CSS]** |
| **Javacom** | `https://media.guntherwerks.com/assets/fonts/javacom/Javacom.woff2` (`--font-javacom`). Credited to **Youssef Habchi**, "free for personal use", commercial licence from the designer ([cufonfonts](https://www.cufonfonts.com/font/javacom)) **[V: web; licence status for GW is ?]** | 400 | Model names ("Turbo" in the menu, carousel build titles, F26 pill). Its squared techno letterforms echo the wordmark **[V]** |
| Phosphor / Phosphor-Thin | Self-hosted icon fonts | – | UI icons (`ph-caret-right` etc.) |

Defect: about 58 elements render in **Arial** (form and UI controls that do not inherit the font) **[V: render]**.

### 3.3 Colour palette (hex values actually in CSS; dominance from computed styles across all 53 pages)

| Role | Value | Evidence |
|---|---|---|
| Text, dominant | `#000000` (28,076 computed uses) + black alphas `.5/.6/.7/.76/.8/.85` | **[V]** |
| Reversed text | `#FFFFFF` (8,288) + white alphas `.6/.7/.8/.9/.92/.95` | **[V]** |
| Dark surfaces | `#111111` (1,047 bg), `#0A0A0A`, `#000`, `rgba(20,20,20,.98)` (menu), `#1A1A1A` (`--graphite`, declared but unused) | **[V]** |
| Light surfaces | `#FFFFFF`, `#F8F8F8`, `#F5F5F5`, `#F7F6F4` | **[V]** |
| Secondary text | `#333333` (`--text-secondary`) | **[V]** |
| Hairlines | `rgba(0,0,0,.08–.12)`, `rgba(255,255,255,.08–.12)`; 1 px pill strokes | **[V]** |
| GXR-EVO accent | `#FF2A3C` (scroll-indicator stripe, countdown, hover) | **[V]** |
| Thermal accents | `#E31937` red, `#1D335C` navy | **[V]** |
| "By invitation only" badge | `#C9A227` gold on `#000000FC` | **[V]** |
| Declared but rarely visible | `--accent-color:#FF4500` (focus outline, skip link, a few hovers); `--cta-pill-primary-bg:#8B7355` bronze (one rule) | **[V]** |
| Errors | `#C00`, `#C62828` | **[V]** |

The UI is strictly monochrome. Colour comes from the cars and the light in the photography. There is no brand hue.

### 3.4 Photography style **[V: visual review of contact sheets in `shots/_gallery-sheets/` and `shots/_hero-candidates-sheet.png`]**

- **Dark cyclorama studio, the signature hero look.** A charcoal infinity cove with one coloured rim or underglow per car (red for F-26, GXR-EVO and GWX; amber for Turbo; red haze for Thermal). Smoke or haze and a glossy floor reflection. The car is placed small-to-mid frame with large negative space above. This is the source of the home and menu hero images and of `features/…Carousel…` at 4800×2700.
- **White or grey seamless catalogue studio.** Soft, even, high-key light. All the cutouts and front views come from here. The PSP and Brundle galleries use a grey concrete-floored studio with a raking light.
- **Location.** California throughout: GW Haus (Folktale Winery, Carmel Valley) courtyards and drone aerials over vineyards, Laguna Seca, coastal and canyon roads at golden hour. Japan (turnpike) and Korea (runway) for the orange Turbo. Goodwood FOS. Tracking shots with motion blur, and low angles.
- **Detail and craft.** Many macro shots per commission: stitching, gauges ("GW" dials), shifters, carbon weave, badges, engine bay ("4.0L" shroud). Commission galleries are often **square crops** (`*-Square`). Workshop documentary: CNC work, gloved hands, carbon layup.
- **Mood.** Moody, cinematic, high-contrast and saturated. "Product as jewel" in the studio work; "owner's road trip" on location. People appear only at events and in apparel shots.
- **Outlier.** The Monterey Car Week 2026 posters (`events/GW_Carweek_2026_Artwork-*`) are **painted illustrations**, not photographs.

### 3.5 Video use **[V: markup + MP4 header probe]**
- Home hero: a muted autoplay loop, `gxr-evo-quail-canyon.r1.mp4` (1920×1080, 21.5 s, has an audio track), with a sound toggle. It is lazy-loaded (`data-lazy-src`) with a webp poster.
- The model pages carry an "engine sound" section ("Use headphones or earphones for an 8D sound experience").
- The home page has vertical reels (720×1280).
- Goodwood 2026 footage is available in **4K** (`gunther-werks-f-26-goodwood-fos.mp4`, 3840×2160, 21.1 s, no audio, 81 MB).
- There is no Vimeo or YouTube embed except on two newsroom posts (one YouTube iframe on `/newsroom/jalopy-jeff-gxr-evo/` and one on `/newsroom/top-gear-f-26/`).

### 3.6 Motion and interaction **[V: JS/CSS; behaviour seen in render, not frame-analysed]**
- GSAP 3.15.0 + ScrollTrigger, with many `scrub:` timelines (53) and 2 `pin:` uses.
- Line-split headline reveals (`line-split` class). A "decode" (scramble-style) line treatment on GXR-EVO ("PRESERVING THE / ANALOG SOUL …").
- Count-up hero stats (`data-target`).
- Hero carousel with `--hero-carousel-interval: 8s`, dot pager, prev/next and a progress line.
- CTA pills (radius 9999px, 1 px stroke) with an SVG stroke-draw hover (`cta-stroke-draw .6s`).
- Menu flyout with side-view cutouts per model. Programs carousel of cutouts with prev/next.
- A **360° interior panorama** (Photo Sphere Viewer, `index.module-*.js`) on the F-26, GWR, GWX, Coupe and Speedster pages.
- Floating "Explore … Gallery / Inquiry Now" FAB.
- Easing family: `cubic-bezier(.25,.46,.45,.94)` and `(.33,1,.68,1)`, mostly .35–.6 s.
- Lenis is bundled, but `main` sets `window.lenis = null` [I: native scroll in practice].
- **There are 28 `prefers-reduced-motion: reduce` blocks**, plus an on-site accessibility panel (font size 100/110/125%, high contrast, reduced motion).

### 3.7 Tone of voice

Confident, engineering-led and slightly grand. Uppercase headlines, short declaratives and pairs of fragments. It addresses "you" and owners, and says "commission", never "buy". Verbatim lines (each under 15 words):
- "At Gunther Werks, we don't sell cars. We deliver dreams." **[V: F26, OWN]**
- "Moves you forward. Without any limits holding you back." **[V: F26, GXR]**
- "The highest standard – as standard." **[V: F26, TURBO]**
- "Preserving the analog soul and legacy without compromising our motorsport DNA." **[V: GXR]**
- "Gunther Werks builds are reengineered and remastered." **[V: STORY, HOME]**
- Also: "Establish your boundaries by going beyond them." **[V: BG-PDF]**; "Nothing off the menu." **[V: GWX]**; "Your investment, secured." **[V: GXR, THM, BRU]**

Recurring words, by count across the English dictionary values **[V: DICT]**: commission (104), carbon (84), bespoke (75), limited (36), remaster(ed/ing) (31), 993 (30), Rothsport (27), engineered (26), motorsport (22), analog (18), exclusive (17), precision (14), masterpiece / legacy (11 each), one-of-one (10), invitation (9), air-cooled (9).

Recurring claims:
- Built in-house in California ("Built in California"; BG-PDF: "Over 90% of components are designed and produced internally").
- Carbon fibre and CNC made in-house.
- Rothsport engines.
- Strictly limited numbers.
- A 5-year/100,000-mile retroactive warranty.
- "Never Program Locked": upgrades are backward compatible "with the exception of the motor" (STORY).
- An analog, manual-gearbox purity.
- The footer tagline rotates, e.g. "DESIGNED FOR PLEASURE" and "DESIGNED FOR INNOVATION" **[V: render]**.
- Legal line in the footer: "not affiliated with, associated with, or endorsed by Porsche" **[V]**.

---

## 4. Asset catalogue (photography and video)

Maximum resolutions are the real pixel sizes of the largest file found: the original upload when it exists, otherwise the largest `-{w}w.webp`. Some originals are **not linked on the site** but exist at a predictable URL; these are marked "unlinked". Galleries are listed as folders, followed by picked frames.

### 4.1 Top hero candidates

| # | URL | Max res | Shows | Model | Studio / location | Orient. | Dealer-hero verdict |
|---|---|---|---|---|---|---|---|
| 1 | https://media.guntherwerks.com/assets/programs/special-editions/thermal/GW_Thermal-6.jpg | **9504×6336** (24 MB) | White two-tone Turbo, rear 3/4, red haze, black cove | Thermal Edition | Dark studio | L | **strong** |
| 2 | https://media.guntherwerks.com/assets/features/GW_Website_Home-Page-Carousel_Desktop_F26_1-6.jpg (+ mobile `…Carousel_Mobile_F26_1-6.jpg` 1080 w) | **4800×2700** | Silver F-26 profile in a warm dark cove, very large negative space | F-26 | Dark studio | L 16:9 | **strong** |
| 3 | https://media.guntherwerks.com/assets/features/GW_Website_Home-Page-Carousel_Desktop_orange-turbo_1-9.jpg (+ mobile version) | **4800×2700** | Orange Turbo, side and rear 3/4, amber glow | Turbo | Dark studio | L 16:9 | **strong** |
| 4 | https://media.guntherwerks.com/assets/programs/turbo_track-sunset_background.jpg | **4800×2700** | Orange Turbo from behind on a circuit under a pink sunset sky; small car, big sky | Turbo | Location (track) | L | **strong** |
| 5 | https://media.guntherwerks.com/assets/programs/f26/gunther-drone-3.jpg | 2560×1918 | F-26 from above in a vineyard lane, mountains behind | F-26 | Location (Carmel Valley [I]) | L 4:3 | **strong** |
| 6 | https://media.guntherwerks.com/assets/programs/gwr/001-Guntherwerks-GWR-HQ-4K.jpg | **3840×2560** | Turquoise GWR in the HQ showroom, garage-door windows, polished floor | GWR | HQ interior | L | **strong** |
| 7 | https://media.guntherwerks.com/assets/homepage/gw-brundle-edition-feature.jpg (+ `gw-brundle-edition-feature-mobile.jpg` 1080×1920) | 2560×1707 | Blue/white Brundle Edition, front 3/4, dark cove | Brundle | Dark studio | L | **strong** (current flagship news) |
| 8 | https://media.guntherwerks.com/assets/homepage/gw-house-program.jpg | 2048×1366 | Several cars (green coupe rear, turquoise GWR, others) in the GW Haus courtyard | Multi-model | Location (GW Haus) | L | **strong for "collection" story**, ok on resolution |
| 9 | https://media.guntherwerks.com/assets/homepage/gw-house-hero.jpg | 2048×1151 | Drone shot of GW Haus with 4 cars among vineyards | Multi-model | Location aerial | L | ok (res limit 2048) |
| 10 | https://media.guntherwerks.com/assets/homepage/gw-f26-laguna-seca.jpg | 2048×1365 | F-26 leading a green car at Laguna Seca, hills | F-26 + Coupe [I] | Track | L | ok–strong |
| 11 | https://media.guntherwerks.com/assets/programs/special-editions/gxrevo/Guntherwerks_GXR_Evo_15-2560w.webp (also `_11`, `_12`) | 2560×1707 | Carbon GXR-EVO in the showroom, red light, reflections | GXR-EVO | HQ interior | L | strong |
| 12 | https://media.guntherwerks.com/assets/story/speeder-showroom-lobby.jpg | **4800×2700** | Orange Speedster, profile, in the showroom lobby | Speedster | Interior | L | ok |
| 13 | https://media.guntherwerks.com/assets/homepage/GW_F-26_Model_Hero-View-Landscape_3-1.jpg (and `GW_GWR_…`, `GW_GWX_…`, `GW_Turbo_…Landscape_3-2.jpg`; portraits `…ortrait_3-1.jpg` 1080×1350) | 2560×1200 each | One car per program in a dark cove with coloured light (the home "Active Programs" set) | F-26 / GWR / GWX / Turbo | Dark studio | wide 2.13:1 | ok (consistent set, but 2560 max) |
| 14 | https://media.guntherwerks.com/assets/programs/f26/f-26-tech-hero.jpg | **6336×6336** | F-26 head-on in a hazy cove | F-26 | Dark studio | square | ok |
| 15 | https://media.guntherwerks.com/assets/programs/gwx/T7__3087.jpg, `gwx.jpg`, `gwx-pinnacle--of-innovation.jpg`, `T7__3017-hero.jpg` | 3000×2001 | Candy Purple GWX on light seamless | GWX | White studio | L | ok (catalogue look) |
| 16 | https://media.guntherwerks.com/assets/homepage/GW_FOS26_Web-Banner_Desktop_1.jpg | 4800×2700 | F-26 with **Goodwood graphics and chevrons baked in** | F-26 | Composite | L | **weak** (baked graphics) |
| 17 | https://media.guntherwerks.com/assets/media/gw-desktop{1,2,3,4,5,8}-2048x1152.jpg | 2048×1152 | Wallpapers with the **GW wordmark baked in** | various | mixed | L | weak |
| 18 | https://media.guntherwerks.com/assets/homepage/GW_motorsport_Apparel_WebBanner_1_4.jpg | 4800×2700 | Model in GW apparel with a car | – | Location | L | weak (merch) |

### 4.2 Galleries (folders; all frames have `-480w … -2560w.webp` variants)

| Folder (under `https://media.guntherwerks.com/assets/`) | Frames | Max res | Character |
|---|---|---|---|
| `programs/special-editions/thermal/GW_Thermal-{1…25}.jpg` | 25 | **originals 8072–9504 px wide** (e.g. 9504×6336; #23 portrait 6336×9504) | Dark cove exteriors + red/black interior detail. **The best-resolution set on the CDN** |
| `programs/brundle/Guntherwerks_Turbo_Brundle_Edition_{01…82}` | 82 | 2560 (webp only; .jpg 404) | Grey concrete studio exteriors 01–10, then detail and interior |
| `programs/brundle/helmet/Brundle_Edition_Helmet_{01…18}` | 18 | 2560 | Collector's helmet |
| `programs/special-editions/gxrevo/Guntherwerks_GXR_Evo_*` + `/sim/` | 67 + 14 | 2560 | Red-lit showroom, carbon details, MYSIM simulator |
| `programs/f26/gallery/*` | 15 | up to **5504×5504** (square) | Details plus `gw-f26-lp-{1,3,6}-square.jpg` (2560², front / 3/4 / rear in a dark cove) |
| `programs/gwr/*` | 23 | 3840 | Turquoise GWR: HQ showroom, Haus courtyard, dark cove, details |
| `programs/gwx/*` | 13 | 3000 | Purple GWX on white seamless + rear in red fog (`T7__2981-X4.jpg`, 2048) |
| `programs/coupe/*`, `programs/speedster/*` | 13 / 13 | 3840 / 2560 (many 1200–2048, Flickr-named) | Older, mixed-quality legacy imagery (hangar, roads, track) |
| `programs/turbo/jp/turnpike-*`, `programs/turbo/kr/_DSC*` | 4 / 14 | 2000 | Orange Turbo on location in Japan and Korea, golden-hour details |
| `commissions/{napa, mckenna, hercules, alchemy, eisblau, gemini, whitepink, whiteturbo, darknecessities, hkgreenturbo, dragonball, endgame}/` | 18–136 each | 2560 | Each opens with a dark-cove hero, then heavy interior detail; many square crops |
| `psp/{bluephoenix, phoenix, rennsport, rubystone}/` | 76 / 73 / 80 / 41 | 2560 | Grey studio walk-arounds (8 angles) + detail |
| `events/fos/*`, `events/fos/day{2,3,4}/` | ~208 | 2560 (only part of the set) | Goodwood FOS 2026 reportage |
| `ownership/*`, `story/*`, `homepage/gw-*` (craft) | ~25 | 2048–4800 | Events, dining, workshop, CNC, carbon, cluster, shifter |

### 4.3 Video, with scroll-scrub suitability

**Does guntherwerks.com scrub video on scroll? No [V].** Every `video.currentTime` use in the JS either resets a clip to 0 on `ended` or `mouseleave`, or drives a progress ring (`inquiry-form-submit-*.js`). Clips play and pause through IntersectionObserver (threshold .25) or on hover (pillar, program and discover cards). No ScrollTrigger timeline touches a `<video>`.

**Method:**
- Each MP4 was streamed in headless Chrome (nothing saved) and sampled every 0.25 s.
- Hard cuts were detected from frame-to-frame luminance difference, then checked by eye against timecoded sheets: 1 s per frame in `shots/_video-sheets/<name>.png`; 0.25 s per frame for the picked windows in `<name>_<tag>.png`. Raw data: `_raw/video_scan.json`.
- Resolution, length and audio come from the MP4 `tkhd`/`mvhd` boxes.
- **No letterbox bars were found in any clip.** Dark-band shares of 0–9 % are fade-to-black frames, not bars.
- All site videos are **direct MP4 files on the CDN**, `media.guntherwerks.com`, with `Accept-Ranges` and `ACAO: *`.

**Scrub rule applied:** one continuous shot, a steady and legible camera move, no hard cuts, no burnt-in text, no bars.

| Video (`https://media.guntherwerks.com/assets/…`) | Host / where used | Res · length · audio · size | Direct file? | Edit structure | Best scrub segment(s) | Scrub verdict |
|---|---|---|---|---|---|---|
| `videos/gw-project-end-game-cinematic.new.mp4` | CDN · `/commissions/turbo/project-end-game/` | 1920×1080 · 52.1 s · no audio · 11.5 MB | yes (mp4) | Studio montage, about 25 cuts (roughly every 1.5–2 s). Opens with a white frame at 0:00 and black at 0:01–0:02 | **0:45.3–0:52.1** (6.9 s): one continuous **crane-down / pull-back reveal**, from roof level to a full front 3/4 of the red End Game Speedster in a grey cove, ending on a static hero frame. Also 0:19.5–0:21.2 (wide studio, short) | **strong** (that segment only) |
| `videos/speedstergw.mp4` | CDN · `/programs/speedster/`, home | 1280×720 · 34.0 s · audio · 5.1 MB | yes | Studio montage, about 12 cuts | **0:16.75–0:22.25** (5.5 s): slow **push-in and orbit** from a wide front 3/4 toward the flank of the teal Speedster in a white cove. 0:29–0:31: front with doors and hood open (short) | **ok** (good move, but only 720p) |
| `videos/gunther-werks-f-26-goodwood-fos.mp4` (poster `.jpg` 3840×2160) | CDN · `/newsroom/goodwood-fos-2026-bts/` | **3840×2160** · 21.1 s · no audio · 81 MB | yes | Event coverage, cuts about every 1.5–5 s | **0:02.75–0:08.5** (5.7 s): telephoto head-on approach of the F-26 that becomes a **pan to profile as it drives past**. Hay bales and crowd in frame | **ok** (4K; motion is car-driven, not a camera orbit) |
| `videos/gw-turbo-fos-hill.mp4` | CDN · `/programs/turbo/` | 1920×1080 · 84.6 s · audio · 46.7 MB | yes | Event coverage, long takes with cuts | **0:06.75–0:14.25** (7.5 s): continuous telephoto **head-on approach** of the orange Turbo under trees. Later long takes, e.g. 1:16–1:24 approaching the finish, but crowd and marshals are in frame | **ok** |
| `videos/gunther-werks-fos-hill-run.mp4` | CDN · home, `/programs/f26/`, Goodwood BTS | 1920×1080 · 60.4 s · audio · 116 MB | yes | Start-line take, then a multi-camera edit | 0:01–0:11.75: static rear view of the F-26 on the start line, then pulling away | **weak–ok** |
| `videos/gxr-evo-quail-canyon.r1.mp4` (poster `…-1600w.webp`) | CDN · home hero, `/programs/special-editions/gxr-evo/` | 1920×1080 · 21.5 s · audio · 12.6 MB | yes | Fast-cut road film, shots of 1–2.5 s | Longest takes: 0:14.75–0:17.0 (chase from behind, closing in); 0:17.25–0:19.0 (front 3/4 tracking); 0:19.25–0:21.3 (rear follow) | **weak** (shots too short); fine as an ordinary autoplay loop |
| `psp/rennsport/video/gw-rennsport-black-star-canyon.mp4` | CDN · `/provenance-succession/rennsport/` | 1920×1080 · 60.1 s · no audio · 21.3 MB | yes | About 30 cuts. **Burnt-in GUNTHER wordmark at 0:52–0:58**, black at 0:59–1:00 | 0:21–0:23 chase on a canyon road (short) | **weak** |
| `videos/carbon-reel.mp4` | CDN · `/programs/gwx/` | 1280×720 · 8.0 s · no audio · 4.1 MB | yes | **One continuous shot**, 0 cuts | 0:00–0:08: slow macro slide across carbon weave (texture, not the car) | **ok as a texture or background scrub** |
| `videos/coupe-hero-engine.mp4` | CDN · `/programs/coupe/`, home | 1280×720 · 11.5 s · audio · 3.2 MB | yes | About 5 cuts, a fade to black at the end | none longer than about 2 s | weak |
| `videos/gwr-reel.mp4` | CDN · `/programs/gwr/`, home | **720×1280 (vertical)** · 60.2 s · no audio · 3.7 MB | yes | About 20 cuts, studio. The car reads blue in this grade | **0:12.75–0:17.0** slow lateral drift along the side profile; **0:52.25–0:56.5** wide cove, slow move | ok for **mobile only** (portrait, 720 px) |
| `videos/gunther-werks-korea-driven.mp4` | CDN · home | 720×1280 · 18.8 s · audio · 10 MB | yes | Social cut, about 10 cuts, white flash frames | – | weak |
| `videos/gw-gallery-history-reel.mp4` | CDN · home | 720×1280 · 35.2 s · audio · 4.2 MB | yes | About 17 cuts. **Burnt-in GUNTHER logo card at 0:32–0:35** | – | weak |

As ordinary autoplay heroes (not scrub), the strongest are the F-26 Goodwood 4K clip and the GXR-EVO canyon clip.

**Third-party embeds on the site (streaming only; no direct file) [V: iframes + YouTube oEmbed/watch page]:**

| Embed | Host / page | Title · owner | Length · max quality | Scrub verdict |
|---|---|---|---|---|
| `https://www.youtube-nocookie.com/embed/ZLiEcp5MS4k` | YouTube · `/newsroom/jalopy-jeff-gxr-evo/` | "Gunther Werks GXR Evo Their Most Extreme Track Focused Car Ever" · Jalopy Jeff | 8:07 · 2160p | unusable: a third-party review behind a streaming embed. Content was not frame-checked **[?]** |
| `https://www.youtube-nocookie.com/embed/LINuug62mkY` | YouTube · `/newsroom/top-gear-f-26/` | "New 1067bhp Porsche 911 Slantnose! '80s Hero Reborn \| 4K" · Top Gear | 23:44 · 2160p | unusable (same reasons) |

**GW's own YouTube channel** (https://youtube.com/@guntherwerks, linked in the footer) is streaming only. Commission and launch films run 42–554 s, mostly up to 2160p. Examples:
- "Randy Pobst review of the Gunther Werks F26" (`8qeeqzUUak8`, 3:17, 2026-09-19)
- "Gunther Werks Takes On Goodwood Festival of Speed 2026" (`seErDvMGAiI`, 9:14)
- "Gunther Werks Blue Bullet Commission" (`XKwXWjZkR1w`, 1:18, 2024)
- "Gunther Werks Project Tornado" (`o6M9ABPEYxY`, 0:42, 2023)
- "Gunther Werks Rennsport Aventura Commission" (`rawtWM6BVCo`, 1:00, 2022)
- "Introducing the 993 Speedster Remastered by Gunther Werks" (`fgXejCe9UNI`, 0:59, 2021)
- 24 more commission films (2022–2024)

These were **not frame-checked**, so their scrub suitability is **[?]**. For scrub use, ask GW for the **ungraded originals or the masters** of the studio commission films. The site's own studio clips (End Game, Speedster) suggest these are cut montages, and only individual takes would be usable.

**Image sequences, turntables, 360 [V: JS]:** none exist.
- There is **no configurator, no turntable and no frame sequence** on the site. A search of all bundles for frame or sequence URL patterns found nothing.
- The "Start 360° view" button on the F-26, GWR, GWX, Coupe and Speedster pages loads **Photo Sphere Viewer**. It wraps **one ordinary flat photo** into a partial sphere using padded `panoData`, so it is a pseudo-360 and not an equirectangular capture.
- Source photos: F-26 `programs/f26/gallery/44-gw-slantnose-square.jpg`; GWR `programs/gwr/T7__8265-X5.jpg`; GWX `programs/gwx/gunther-werks-cluster.jpg`; Coupe `programs/coupe/50899117873_e61148f044_k.jpg`; Speedster `programs/speedster/GW-Interior.jpg`.
- The nearest thing to a turntable set is the **8-angle studio walk-around** stills on each PSP page (`psp/*/…_001…_008`, 2560 px, a grey cove from a fixed camera height). They are stills only and too sparse for scrubbing.

**Bottom line for a scrub hero:**
- Only two site clips contain a clean, steady, single-take camera move on the car: **End Game 0:45.3–0:52.1** (1080p, the best) and **Speedster 0:16.75–0:22.25** (720p).
- The Goodwood and Turbo hillclimb takes are usable "car drives past" scrubs, but they are event footage.
- Anything longer or more cinematic would need new footage or GW's masters.

### 4.4 Press kit, downloads, social, dealer listing

**Media Kit (press kit): https://guntherwerks.com/media-kit/ [V].**

Press-release PDFs:
- F-26 (Aug 15, 2025): `…/assets/media/downloads/F26-PR.pdf`
- GWX (Aug 13, 2025): `…/GWX-PR.pdf`
- Speedster end and warranty (Oct 28, 2025): `…/Speeder-and-Warranty-PR.pdf`

"Images by Program" ZIPs, listed without downloading:

| ZIP | Size | Contents |
|---|---|---|
| `F26-media-kit.zip` | 30 MB | `gunther-werks-f-26.jpg` 27.4 MB + `-studio.jpg` |
| `turbo-media-kit.zip` | 5 MB | 2 JPGs |
| `GWR-media-kit.zip` | 47 MB | 2 JPGs (32.7 MB studio) |
| `GWX-media-kit.zip` | **358 MB** | **161 JPGs** (`T7__*`) |
| `speedster-media-kit.zip` | 4 MB | blue and purple studio shots |
| `coupe-media.zip` | 23 MB | `gunther-werks-400r.jpg` 22.7 MB + studio |

Other downloads:
- `gw-turbo-fact-sheet.pdf` (Turbo fact sheet)
- `Gunther-Werks-Background.finalrev1.pdf` (company background)
- `…/psp/rennsport/specsheet/Rennsport-Aventura-Spec-Sheet.pdf`
- Wallpapers at https://guntherwerks.com/media/ (desktop 2048×1152 files, although the page says "2560×1440"; mobile files)

Press contacts:
- press@guntherwerks.com, Christian Brantley, APR (2025 releases)
- Eric Becker | Kahn Media, ebecker@kahnmedia.com (Brundle release)

**[V: MK, PDFs, BRU-PR]**

**Social [V: footer of every page]:** https://instagram.com/guntherwerks · https://www.facebook.com/guntherwerksna · https://youtube.com/@guntherwerks. No LinkedIn, X or TikTok link. Merch: https://gw9design.com/ (GW9 is a subsidiary, per F26-PR).

**Dealer listing [V: DEALER]:**
- North America:
  - Beverly Hills: O'Gara Coach
  - Canada: GAIN Coachwerks, Victoria BC
  - Dallas: Earth MotorCars
  - **Miami: Prestige Imports**, Javier Roque, (305) 783-6493, Javier@PrestigeImports.com, 15050 Biscayne Blvd, North Miami Beach, FL 33181, prestigeimports.com
  - Nashville: "Gunther Werks Nashville", linking to paganiofnashville.com
  - New York: HK Motorcars, Mount Kisco
- Global: Hong Kong (SPS Global) and Tokyo (Auto Direct).

External: GW announced Prestige as its "first East Coast showroom", located inside Prestige's HQ **[V: SHOP-23, 27 Nov 2023]**. A "1 of 40 GWR" arrived at Prestige Imports **[V: DPR-GWR headline]**.

---

## 5. Cutouts (true alpha), grouped by model and angle

**How alpha was verified:**
1. The file header was read in memory. Every PNG is colour type 6 (RGBA). Every WebP is VP8X with the alpha flag and an `ALPH` chunk, or VP8L with `alpha_is_used`.
2. Each image was decoded in a browser canvas, which measured the share of fully transparent pixels and of transparent border pixels.
3. Each was viewed on a checkerboard and on grey.

All 47 tested files are **genuinely transparent** (21–82 % fully transparent pixels; transparent border share 50–100 %): 43 car cutouts, 2 detail/technical (wing crop, x-ray), 2 non-car (carbon tub, warranty badge). Sheets: `shots/_cutouts-contact-sheet.png`, `shots/_cutouts-edge-check.png`, `shots/_cutouts-detail-check.png`. Raw numbers: `_raw/cutout_alpha.json`.

**Common traits:**
- Shot on **white seamless** and masked, so reflections are bright. The side views keep a soft **semi-transparent contact shadow** (8–20 % semi-alpha pixels).
- Every **side profile faces left** (nose left, the car's right flank to camera). No right-facing profile exists [V].
- "Edge" in the table = the subject (or its shadow) touches the canvas edge, measured as a bbox at 0 or 1.

All URLs are under `https://media.guntherwerks.com/assets/`. Most also have `-400w/-700w/-1400w` (menu) or `-480w…-2000w` webp variants.

| Model / livery | Angle | Best URL | Max res | Other sizes / copies | Quality verdict |
|---|---|---|---|---|---|
| **F-26**, silver, bronze wheels | Profile L | `programs/gw-f-26-menu-side-view-1-1.png` | **4259×1457** | `menu/GW_F-26_Menu-Side-View_3-1.png` 1400×447 (unlinked png; webp linked) | **strong**; wing tip touches right edge |
| F-26 | Front 3/4 L | `programs/f26/f-26-program-25.webp` (lossless) | 2000×1400 | – | strong; nose near left edge |
| F-26 | Front | `programs/f26/gw-f-26-front-view-1.png` | 1717×1513 | – | ok; high vantage, wing top touches top edge |
| F-26 (ghost/x-ray rear and engine) | Rear, technical | `programs/f26/f-26-rear-2.png` | 1336×1210 | – | illustration, not a car cutout |
| **Turbo**, orange | Profile L | `programs/turbo/gw-turbo-menu-side-view-1-1.png` | 1400×466 | `menu/GW_Orange-Turbo_Menu-Side-View_3-1.png` 1400×447 | ok (**only 1400 px**) |
| Turbo | Front 3/4 L | `programs/turbo/turbo-program-25.png` | 2000×1400 | `-2000w.webp` | strong; nose and tail touch both side edges |
| Turbo | Front | `programs/turbo/gw-turbo-front-view-2.png` | 1943×1460 | `-2000w.webp` | strong (clean margins) |
| **GWR**, turquoise, white aero wheels | Profile L | `programs/gw-gwr-menu-side-view-1.png` | **4384×1503** | `menu/GW_GWR_Menu-Side-View_3-1.png` 1400×447 | **strong**; roof touches top |
| GWR | Front 3/4 L | `homepage/gwr-program-25.webp` (lossless) | 2000×1400 | – | strong |
| GWR | Front | `programs/gwr/GW_GWR_Front-View_1.png` | 2026×1419 | `-2000w.webp` | ok; **roof clipped at top edge** |
| **GWX**, Candy Purple, silver stripe | Profile L | `programs/gw-gwx-menu-side-view-1-1.png` | **4342×1479** | `menu/GW_GWX_Menu-Side-View_3-1.png` 1400×447 | **strong** |
| GWX | Front 3/4 L | `homepage/gwx-program-25.webp` (lossless) | 2000×1400 | – | strong; nose at left edge |
| GWX | Front | `programs/gwx/GW_GWX_Front-View_1.png` | 2356×1334 | `-2000w.webp` | strong |
| **Speedster**, light blue | Profile L | `programs/gw-speedster-menu-side-view-1-1.png` | **4371×1306** | `menu/GW_Speedster_Menu-Side-View_3-1.png` 1400×447 | **strong** |
| Speedster | Front | `programs/speedster/GW_Speedster_Front-View_1.png` | 2410×1448 | `-2000w.webp` | strong |
| Speedster, **dark green** (different car) | Front 3/4 L | `homepage/speedster-program-25.webp` (lossless) | 2000×1400 | – | strong; livery does not match the blue set |
| **Coupe**, magenta / Rubystone-like [I] | Profile L | `programs/gw-coupe-menu-side-view-1-1.png` | **4300×1382** | `menu/GW_Coupe_Menu-Side-View_3-1.png` 1400×447 | ok; **tight on all four edges** |
| Coupe, magenta | Front | `programs/coupe/GW_Coupe_Front-View_1.png` | 2446×1490 | `-2000w.webp` | **weak: roof cut off at top edge** |
| Coupe, **mint green** (different car) | Front 3/4 L | `homepage/coupe-program-25.webp` (lossless) | 2000×1400 | – | strong; nose at left edge |
| Coupe, red (detail) | Rear wing crop | `programs/coupe/gwcoupewing.png` | 1336×1210 | – | detail only |
| **GXR-EVO**, exposed carbon, bronze wheels | Profile L | `programs/gw_gxr-evo_menu-side-view_2-2.png` | **4584×1463** | `menu/GW_GXR-Evo_Menu-Side-View_3-1.png` 1400×447 | ok; splitter, wing and roof touch the edges |
| GXR-EVO | Front 3/4 L | `programs/GXR-Evo_Front-Quarter_2.png` (unlinked; site uses `-2560w.webp`) | 2496×1041 | `-2560w.webp` | ok; touches the edges |
| GXR-EVO | Rear 3/4 | `programs/special-editions/gxrevo/GXR-Evo_Rear-Quarter_2.png` | 2396×1143 | `-1920w.webp` | ok; **wing endplate clipped at the left and top edges** |
| **Brundle Edition**, blue/white chequer | Profile L | `menu/GW_Brundle-Turbo_Menu-Side-View_4-1-1.png` (unlinked png) | **4800×2700** | `programs/brundle/GW_Brundle-Turbo_Menu-Side-View_2-1.webp` 4800×1800; menu webp 1400×429 | **strong**; generous margins |
| Brundle | Front | `programs/brundle/gw-brundle-edition-front-view.webp` | 1943×1460 | – | strong |
| **Thermal Edition**, white, red/grey pinstripe | Profile L | `programs/special-editions/thermal/GW_Thermal-Turbo_Menu-Side-View_2-1.png` | 1400×466 | `menu/GW_Thermal-Turbo_Menu-Side-View_3-1.png` 1400×447 | ok (**only 1400 px**) |
| Thermal | Front | `programs/special-editions/thermal/Thermal-Turbo-Front-View_1.png` | 1943×1460 | – | strong |
| **Project End Game**, deep red Turbo Speedster | Profile L | `commissions/endgame/GW_ENDGAME_Menu-Side-View_1-1.png` | **4800×1411** | `-2000w.webp`; `menu/GW_Endgame_Menu-Side-View_3-1.png` 1400×447 | **strong** |
| **Blue Phoenix** (PSP), blue Speedster | Profile L | `psp/bluephoenix/gw-speedster-blue-phoenix-menu-side-view-1-1.png` | 2560×876 | `-2560w.webp` | strong |
| Blue Phoenix | Front 3/4 L | `psp/bluephoenix/psp-blue-phoenix-speedster-banner-1.png` | 2560×1440 | `-2560w.webp` | strong; generous margins |
| **Phoenix / "Simurgh"** (PSP), yellow Speedster | Front 3/4 L | `psp/phoenix/psp-simurgh-speedster-banner-1.png` | 2560×1440 | `-2560w.webp` | strong |
| Phoenix | Profile L | `psp/phoenix/psp-simurgh-speedster-banner-6.png` | 2560×876 | `-2560w.webp` | ok; nose and tail at the edges |
| **RennSport Aventura** (PSP), slate blue-grey Coupe | Front 3/4 L | `psp/rennsport/rennsport-3quarter-view.png` | 2560×968 | `-2560w.webp` | strong |
| RennSport Aventura | Profile L | `psp/rennsport/psp-rennsport-aventura-coupe-banner-1.png` | 2560×876 | `-2560w.webp` | ok; tight on all edges |
| **Rubystone** (PSP), magenta Coupe | Profile L | `psp/rubystone/psp-rubystone-coupe-banner-1-2560.png` | 2560×876 | `-2560w.webp` | ok; nose and tail at the edges |
| Non-car | Carbon tub with turquoise roll cage | `programs/gwr/carbonbuc.png` | 1336×1210 | – | technical |
| Non-car | "5 Year / 100,000 Mile" warranty badge | `homepage/gw-5-year-warranty-light.png` | 1178×1178 | – | graphic |

The table lists each car/angle once (best file first). The 47 files tested include the 1400 px menu copies named in the "Other sizes / copies" column; most also exist as `-{w}w.webp` variants.

**Coverage matrix (✓ = cutout exists; ★ = 4000 px+ wide):**

| Model | Profile L | Front 3/4 L | Front | Rear 3/4 | Rear | Profile R / Top |
|---|---|---|---|---|---|---|
| F-26 | ✓★ | ✓ | ✓ | – | (x-ray only) | – |
| Turbo | ✓ (1400) | ✓ | ✓ | – | – | – |
| GWR | ✓★ | ✓ | ✓ (roof clipped) | – | – | – |
| GWX | ✓★ | ✓ | ✓ | – | – | – |
| Speedster | ✓★ (blue) | ✓ (green car) | ✓ (blue) | – | – | – |
| Coupe | ✓★ (magenta) | ✓ (mint car) | ✓ (roof cut) | – | – | – |
| GXR-EVO | ✓★ | ✓ | – | ✓ | – | – |
| Brundle | ✓★ | – | ✓ | – | – | – |
| Thermal | ✓ (1400) | – | ✓ | – | – | – |
| End Game | ✓★ | – | – | – | – | – |
| Blue Phoenix / Phoenix / RennSport / Rubystone | ✓ | ✓ (not Rubystone) | – | – | – | – |

Gaps:
- No right-facing profiles.
- No rear views except GXR-EVO.
- No top views.
- Turbo and Thermal profiles exist only at 1400 px.
- Speedster and Coupe 3/4 views are **different cars** (different liveries) from their profile and front cutouts, so a matched set per model exists only for **F-26, GWR, GWX** (profile + 3/4 + front, same car) and for GXR-EVO (profile + 3/4 + rear 3/4).

---

## 6. Company facts

| Fact | Value | Source |
|---|---|---|
| Founder / CEO | **Peter Nam** ("Founder Peter Nam"; "— Peter Nam, CEO") | STORY, OWN, BG-PDF, F26-PR |
| HQ | 7622 Woodwind Dr, Huntington Beach, CA 92647 | BG-PDF footer. The site shows only "BUILT IN CALIFORNIA" and "our Huntington Beach Facility" (CONTACT, OWN) |
| Founded | ⚠ "Founded in Huntington Beach, California, in 2017" **and** "Founded: 2015 (established 2017)" (same document) | BG-PDF |
| First car | 400R (Coupe) unveiled at The Quail, release dated "Garden Grove, Calif. (August 18, 2017)"; 25 examples | 400R-PR |
| Name | "pays tribute to Gunther Wendt, the NASA engineer known for his exacting standards during the Apollo program" | STORY |
| Origin story | Skepticism from investors ("Nearly all turned him away"); the X-pattern key commemorates "every door that closed" | STORY |
| Vertical integration | "Over 90% of components are designed and produced internally"; in-house carbon fibre and CNC | BG-PDF, STORY |
| Engine partner | Rothsport Racing (all programs) | Model pages |
| Subsidiary | **GW9**: "extends this philosophy to Porsche's modern lineup by crafting carbon-fiber components and forged wheels"; store gw9design.com | F26-PR, HOME |
| Positioning | "Gunther Werks is not a manufacturer - it is an atelier." | BG-PDF |
| Delivery ritual | Private chef meal at the Huntington Beach facility, a billet key handover; BG-PDF: "five-course dining experience by a private chef" | OWN, BG-PDF |
| Events base | "GW Haus" at Folktale Winery, 8940 Carmel Valley Rd, Carmel-By-The-Sea, CA (Monterey Car Week, Aug 13–15, 2026) | EVENTS |
| Contact | +1 714-733-7038 · info@guntherwerks.com · press@guntherwerks.com · 9 am – 5 pm PST | CONTACT |

Earlier secondary sources say Nam was CEO of the carbon-parts maker **Vorsteiner** and quote a 400R conversion price of "$525,000" (Robb Report AU via search; **not fetched or verified here**). Treat this as **[?]** until checked.

---

## 7. Flags for the Gunther Werks Miami project

1. **Dealer contact mismatch (decide before any copy is written).** GW's official dealer page shows Prestige Imports at **15050 Biscayne Blvd**, contact **Javier Roque, (305) 783-6493, Javier@PrestigeImports.com**. Our CLAUDE.md shows **14780 Biscayne Blvd, (833) 290-6287** (taken from the sibling sites). One of the two is out of date, or Gunther Werks is shown in a different Prestige building. **[?] Ask the client.**
2. **Horsepower figures are internally inconsistent** at the source (F-26 1,067 vs 1,000; Turbo 850 vs 840 TFS; Coupe and Speedster 435 vs 430+). Under content-provenance, either quote one figure with its exact source and date, or avoid the figure.
3. **No price and no sold-out status** is published for any program **[V: negative]**. Do not imply availability. The Coupe and Speedster are completed. The GWX is by invitation.
4. **Javacom** (model-name display face) is credited as free only for personal use. Commercial web use on a dealer site needs a licence check **[?]**. Gill Sans Nova comes through an Adobe Fonts kit tied to GW's account, so a dealer site needs its own licence.
5. **Porsche trademark.** GW's footer disclaims affiliation with Porsche. Any dealer page should carry an equivalent line **[V: footer text]**.

---

## 8. Files in this folder

- `shots/` contains:
  - `<slug>-1440.png` (full page) and `<slug>-1440-fold.png` for all 53 pages
  - `home-390.png` and `home-390-fold.png`
  - `_cutouts-contact-sheet.png`, `_cutouts-edge-check.png`, `_cutouts-detail-check.png`
  - `_hero-candidates-sheet.png`
  - `_gallery-sheets/chunk_*.png`, each with its URL list in `.txt`
  - `_video-sheets/*.png`: timecoded frame sheets per video, 1 s per frame, plus 0.25 s windows
- `_raw/` contains:
  - Page HTML (`pages/`), extracted text (`txt/`, `body/`), JS bundles (`js/`), `style.css`, `typekit.css`
  - The English dictionary `en_dict.txt`
  - The full CDN URL list `media_urls.txt` (7,597 URLs) and the per-image base list `media_bases.txt`
  - Header probes `probe.json` / `guess.json` / `g3.json` (dimensions, alpha, bytes)
  - `cutout_alpha.json`
  - `ziplists.txt` (media-kit ZIP contents)
  - `video_scan.json` and `video_win_*.json` (per-0.25 s frame differences)
  - Render data `render-1440.json` / `render-390-home.json`
  - Press PDFs (`pdf/`; these are documents, not image files)

**Not verified:**
- Behaviour of animations frame by frame, and the 390 px layouts of pages other than the home page.
- Whether a cutout has fringing on dark backgrounds at 100 % zoom (checked only at contact-sheet scale).
- The rights and licensing status of any GW imagery for dealer use.
- The Gill Sans Nova foundry (from general knowledge, not from the kit).
- Prestige's current address.
