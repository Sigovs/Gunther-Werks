# Awwwards and dark.design references for Gunther Werks Miami

*Compiled 2026-10-25 for the Concept stage. Each site was opened live in Chrome through Playwright: the first screen and a mid-page frame at 1440×900, the same two at 390×844, and on the key sites a contact-sheet strip of the whole scroll. Playback was measured by logging every in-view `<video>`'s `currentTime`/`paused` while scrolling, and the shipped JS was read where it was public. Screenshots are in `shots/` as `<slug>-1440-first|mid.png`, `<slug>-390-first|mid.png` and `<slug>-strip.png`.*

**What the galleries have.** Awwwards' automotive coverage is thin and dated. A search by title ("car", "porsche", "automobili", "motors", "hypercar", "restomod", "coachbuild", "luxury", "racing" and others) gave no restomod or coachbuilder brand site. Most car winners from before 2022 are now dead, redirected or turned into OEM templates (see Traps). There is **no** live award-winning brand site that shows a model lineup at one shared scale; the closest is an editorial feature (ESPN). The comparison row will have to be authored, not borrowed.

Rating: **strong** = take the move as is; **useful** = take one narrow part; **weak** = mostly an anti-reference.

| # | Site | Source | Move it teaches | Rating |
|---|---|---|---|---|
| 1 | Scout Motors | Awwwards SOTD + Dev, 16 Jan 2025 | Canvas image-sequence scrub of a car driving at camera; text cues keyed to film time; separate portrait frame set for phones | **strong** |
| 2 | ESPN, *How F1 has evolved since 1950* | Awwwards HM, 1 Jun 2026 | Side-profile cutouts on one ground line at one scale; difference shown by overlaying two profiles; numbered "Fig." captions | useful |
| 3 | ESR Bespoke | Awwwards SOTD + Dev, 23 Oct 2026 | Drive-past film as the hero, with the car small in a large dark street field | useful |
| 4 | The Watch (FS 60P, 60fps) | Awwwards SOTD + Dev, 17 Aug 2026; Product Honors Jul 2026 | One object never leaves the page; chapters are camera positions on it | useful |
| 5 | Spyker Cars | Awwwards HM + Dev, 12 Sep 2026 | News & Partnerships: date · type · headline, with category tabs | weak (one narrow part only) |
| 6 | Forge Automotive | Awwwards SOTD + Dev, 25 Oct 2026 | Nothing to take. Shows the generic dark-luxury template | weak, anti-reference |
| 7 | S-2K (Honda S2000 tribute) | Awwwards SOTD + Dev, 6 Sep 2025 | Nothing to take. Shows "technical" decoration with nothing behind it | weak, anti-reference |
| 8 | Charge Cars | dark.design, Hardware | Dark studio cove and a chaptered product film: forward play between timestamps, a pre-rendered reverse file for going back | **strong** |
| 9 | Electronic Materials Office, Altar II | dark.design, Hardware | One small object on true black; a one-shot film that ends on the designed still; separately rendered portrait film for phones | **strong** |
| 10 | Apple iPad Pro | dark.design, Hardware | Hero film plays once and holds its end frame; start and end frames also ship as JPGs (poster and no-motion state) | useful |

---

## From Awwwards

### 1. Scout Motors: strong
**URL** https://www.scoutmotors.com/ · **Award** Site of the Day + Developer Award, 16 Jan 2025 (Locomotive). Shots: `scout-*`, `scout-strip.png`.

**The move.** The home film shows a truck driving toward the camera on a dirt road at golden hour. It is scrubbed by scroll and runs full-bleed with no frame or box, so the film is the page. The text ("An off-road icon reborn.", "The one that started it all.") sits in the empty sky and verge on the left and never touches the vehicle. Midway, the scrub cross-fades from the new truck to a black-and-white archive photo of the 1970s Scout, so heritage is told inside the same film. A second, shorter sequence later puts the truck in the dark with only its light bar lit (`scout-strip.png`, frames 10–11).

**How it is built** (read from `Sequence.astro` / `SequenceKey.astro`):
- It is a `<c-sequence>` custom element using GSAP. Each scrubbed moment is a **canvas image sequence, not `<video>.currentTime`**.
- The config is inline JSON: `{"frames":384,"duration":12.8,"fps":30,"timeByFold":2,"extension":"webp","sources":{"desktop":{"path":"desktop_720_80/","width":1280,"height":720},"mobile":{"path":"mobile_720_70/","width":720,"height":1280}},"showPoster":true,"firstFrame":"001.webp"}`. `timeByFold: 2` means 2 seconds of film per viewport height of scroll. Frames load in buckets, a few frames are prioritised, and a `canPlayThreshold` decides when scrubbing may start.
- **The phone gets its own portrait frame set** (720×1280), not a crop of the landscape one.
- Text is placed by `<c-sequence-key data-from="3" data-to="6">`. The cues are keyed to **film seconds**, not scroll pixels, so a caption stays tied to the moment it describes when the scroll length changes.
- The hero is a separate autoplay `<video>` with the same keyed cues (`data-type="autoplay"`).

**Do not take:** the 720p desktop frames stretched across 1440+ px (soft; GW's 4K F-26 film deserves better), the orange accent, the giant overlapping headlines ("The Scout In All Of Us."), the campfire lifestyle scenes, or the price disclaimer in the hero.

**Phone:** it holds up. A portrait-authored sequence, the headline at the bottom, the vehicle in the upper middle (`scout-390-first.png`).

### 2. ESPN, *How F1 has evolved since 1950*: useful
**URL** https://www.espn.com/espn/feature/story?id=43832710 · **Award** Honorable Mention, 1 Jun 2026. Shots: `espn-f1-*`, `espn-f1-strip.png`.

**The move.** It opens on one side-profile car, left-facing, on a thin drawn ground line in a large pale field, with the title above and "Fig 1" below (`espn-f1-1440-first.png`). Later, "Body length" lays the 2025 and 2026 cars on top of each other at the same scale, with a dimension arrow and a red marker for the −3,400 mm change (`espn-f1-1440-mid.png`). A 1950-vs-2024 top view does the same thing. Comparison is carried by shared scale and a shared datum, not by cards. This is the nearest live precedent for the GW comparison row (four 993-based programs, one camera angle, one ground line). The "Fig." numbering is also a quiet, factual way to caption figures.

**How built:** static illustrated cutouts on a pinned horizontal track (page height 60,000 px). The lead is an MP4 (`f1_car-sizes/assets/lead_desktop.mp4`).

**Do not take:** the painted illustrations and driver portraits, the beige newspaper palette, the red diagonal slabs and arrows, or the 60,000 px horizontal-scroll length.

**Phone:** partly. The opening profile survives at one scale (`espn-f1-390-first.png`), but the comparison chapters fall back to a long text column (`espn-f1-390-mid.png`). For GW, the phone row should become one car at a time on the same ground line, as the brief already says.

### 3. ESR Bespoke: useful
**URL** https://www.esrbespoke.au/ · **Award** Site of the Day + Developer Award, 23 Oct 2026 (Nightjar). Shots: `esr-*`.

**The move.** The hero is a looping street film in a cold, dark grade. A Porsche 911 drives past through the right third of the frame and stays small against the building and the road, which take most of the field (`esr-1440-first.png`). It is the clearest live case of a **drive-past at small subject scale**, which is what the F-26 and Turbo Goodwood drive-pasts should feel like. The "Unmute" control shows the film is treated as film.

**How built:** `<video>` autoplay loop (probe: time follows the clock, not the scroll), Next.js + Sanity, Lenis.

**Do not take:** the caption "Three decades of restoring…" placed straight on top of the passing car (text stuck to the subject); the hard switch to a white page with a giant grey marque list (`esr-1440-mid.png`); any looped autoplay where GW wants a scrub.

**Phone:** no. At 390 the film does not show on the first screen: a black field with a headline (`esr-390-first.png`). That is the failure to design out.

### 4. The Watch (FS 60P by 60fps): useful
**URL** https://thewatch.60fps.fr/ · **Award** Site of the Day + Developer Award, 17 Aug 2026; Product Honors, Jul 2026. Shots: `the-watch-*`.

**The move.** One object owns the whole page. Each chapter ("Elegant contour", "Bracelet") is a new camera position on **the same object**, which never leaves the frame; the type changes around it (`the-watch-1440-mid.png`, `-mid2.png`). For GW, a model page could treat the car this way, using stills or film at fixed angles from GW's shoot, so the car stays present and only the evidence around it changes.

**How built:** real-time WebGL (Three.js), with one canvas fixed behind the scrolling text. The page is 34,600 px long.

**Do not take:** WebGL itself (GW has photography and film, not a model), the crosshair and hairline decoration that aligns nothing, the light-grey ground, the giant "FS 60P" behind the object, or the length.

**Phone:** it holds up. The object is re-centred and the camera moves still read (`the-watch-390-*.png`).

### 5. Spyker Cars: weak (one narrow part only)
**URL** https://www.spykercars.com/ (news: `/news`) · **Award** Honorable Mention + Developer Award, 12 Sep 2026 (The Brink Agency). Shots: `spyker-*`, `spyker-news-*`, `spyker-strip.png`.

**The one part worth taking.** The news page: each item is **date · type label · headline** ("14.10.26 · PRESS RELEASE"), with category tabs (Events, Movie, Owners, Partnerships, Press releases) and a staggered layout (`spyker-news-1440-*.png`, `spyker-news-390-first.png`). That is the taxonomy GW's News & Events needs: GW press releases, outlet coverage, events.

**Do not take:** the hero film that shrinks from full-bleed into a framed card as you scroll (probe: 1425 → 1142 px wide). That is the opposite of a film melting into the page. Also leave out the award-badge PNG used as a news thumbnail, the scattered heritage collage, the white ground, and the condensed-sans plus serif mix. A React hydration error (#418) shows in the console.

**Phone:** it holds up. News stacks cleanly, with the date and type kept.

### 6. Forge Automotive: weak, anti-reference
**URL** https://forgeautomotive.co.uk/ · **Award** Site of the Day + Developer Award, 25 Oct 2026 (12 Studio). Shots: `forge-*`.

It is listed for what to avoid. It opens with an "Enter" gate. The first desktop screen is a condensed serif headline, "For Those Who Refuse Ordinary", on a carbon texture with no car (`forge-1440-first.png`). Chapters are blurred image placeholders behind large serif titles, and partner logos showed as broken `<img>` alt text during the capture (`forge-1440-mid.png`). On the phone the headline sits on top of a head-on red GT3 (`forge-390-first.png`). This is the generic dark-luxury template the brief bans: near-black, a refined serif, a texture and a slogan, with no evidence. The Awwwards highlights (scroll-scrubbed intro, point-light fake 3D, WebGL exhaust 404) are effects, not argument.

### 7. S-2K (Honda S2000 tribute): weak, anti-reference
**URL** https://s-2k.webflow.io/ · **Award** Site of the Day + Developer Award, 6 Sep 2025 (zuji studio). Shots: `s-2k-*`.

It is listed as the clearest case of technical decoration with nothing behind it: crosshairs at the grid corners, mono menu labels, a speedometer that reacts to scroll speed, "(99—09)" brackets, and a hollow outline-type echo (`s-2k-1440-first.png`, extra frames). The footage is low-resolution handheld fan video. GSAP and ScrollTrigger are present, but the motion is decoration.

---

## From dark.design

### 8. Charge Cars: strong
**URL** https://charge.cars/ · **Source** dark.design, Hardware (no Awwwards listing found). Shots: `charge-*`.

**The move.** It is the closest match to GW's own photographic register: a restomod (electric '67 Mustang) shot in a **dark studio cove with one cold rim light, haze and a graded floor**, the car small in the frame (`charge-1440-first.png`, `charge-1440-mid2.png`). The Product chapter is one continuous studio film that **takes the car apart in chapters**: body shell, battery pack, chassis and motors, composite panels. Each chapter has a one-line caption on a single leader line (`charge-1440-mid.png`). A segmented progress bar along the bottom shows which chapter you are in. This is the model for an "evidence in the light" chapter (carbon tub, Rothsport 4.0, machined parts), if GW footage allows it.

**How built** (`/js/app.js`): a forked fullPage.js section stepper. The product section is a "parted video player": **one MP4 with timestamped parts** (`data-video-timestamp`, `data-part-duration`).
- Stepping forward plays the film to the next timestamp, with `playbackRate` clamped to 1–2×.
- Stepping back switches to **a pre-rendered reversed copy** (`product-1-reverse.mp4`) seeked to `duration − t` and plays that forward.
- So it never seeks backwards in H.264, which is where `currentTime` scrubbing usually janks.

This is stepped playback, not a continuous scrub. It is a valid alternative for GW's crane-down reveal if a true scrub of the 1080p End Game film proves rough.

**Do not take:** the fullPage scroll hijack (the visitor loses the scroll bar and has to learn the page), Montserrat, the blue grade (GW's accent is per program, not one brand blue), the "technology company" headline over the car, and the cookie bar sitting on the hero (it covers the lower fifth at 1440).

**Phone:** partly. It becomes a tap stepper with ‹ › arrows, a caption under the film and the same segment bar (`charge-390-mid.png`). But the landscape film is centre-cropped, so the car loses its silhouette. GW's phone version needs portrait-authored frames (see Scout, EMO).

### 9. Electronic Materials Office, Altar II: strong
**URL** https://electronicmaterialsoffice.com/ · **Source** dark.design, Hardware. Shots: `dd-emo-*`.

**The move.** One small, softly rim-lit object on **true black** (`color(display-p3 0 0 0)`), with large empty space above and below it. The product name is small, bottom-left, and nothing competes with the object (`dd-emo-1440-first.png`). This is the one-lit-object first screen the brief asks for, with "car and wordmark" in place of "keyboard and name". The hero film **plays once and stops on its last frame**, so the resting state is a designed still and not a paused mid-motion frame. Section films behave the same way: they play once on entering view and hold.

**How built:** `<video>` webm. Desktop hero `altar-ii-hero.webm` is 3840×2400. **The phone gets a separately rendered portrait film** (`altar-ii-hero-mobile.webm`, 1200×1920) in which the object is re-staged for the tall frame, not cropped (`dd-emo-390-first.png`). The probe shows the hero at t=3.17 s, paused, at every scroll position.

**Do not take:** the price and red "Reserve" pill (GW publishes no prices), the red app-UI cards further down, and the serif/grotesque pairing. Do not stand a car on end the way the keyboard is rotated: take the principle (a portrait-authored frame), not the gesture.

**Phone:** yes, best in the set (`dd-emo-390-first.png`).

### 10. Apple iPad Pro: useful
**URL** https://www.apple.com/ipad-pro/ · **Source** dark.design, Hardware. Shots: `ipad-pro-*`.

**The move.** The product is seen edge-on and small on black, carried by light on its edges, with the headline above (`ipad-pro-1440-first.png`). The useful part is the plumbing. The hero film is shipped with **separate `hero_startframe` and `hero_endframe` JPGs**: the start frame is the poster before the film plays, and the end frame is the held state for reduced motion or a failed autoplay. Below the hero, the chip and iPadOS films play when they enter view (the probe shows time advancing with the clock, not the scroll) and hold their last frame. Every film therefore has a designed still on both sides, which the brief requires for each scrub.

**Do not take:** the gradient display type, the price and Buy button, the promo banner, and the 30,000 px spec-sheet length.

**Phone:** yes, a separate portrait hero render (`ipad-pro-390-first.png`).

### Dropped from dark.design
- **Ferrari Movie** (Culture; also an Awwwards SOTD, 25 Jan 2024) is **dead**: the domain is now a WordPress car blog (`ferrari-movie-*`).
- **Arrival** (Hardware) returns a 522 timeout.
- **OXI, Sol, Knob, Brilliant, Fura, Umbrel, Blok** were screened. They show product on black, but each is a shop page with nothing EMO or Charge does not already teach better (`dd-*`).

---

## Moves worth stealing (max 6)

1. **Image-sequence scrub with film-time cues and its own portrait frames** (Scout). Convert the F-26 Goodwood drive-past (0:02.75–0:08.5, 4K) to a canvas webp sequence: a landscape set at ≥1920 wide and a separately cut portrait set for phones. Set the scroll budget per second of film ("timeByFold"). Key the captions to film seconds, and keep them in the empty part of the frame.
2. **Stepped playback with a reversed twin** (Charge). For the End Game crane-down reveal (1080p), play forward between chapter timestamps and use a pre-rendered reversed file for going back, instead of seeking backwards in H.264. Pick this over a true scrub if the scrub stutters on mid-range phones.
3. **One-shot film that ends on the designed still** (EMO, iPad Pro). The first-screen F-26 film plays once and rests on a composed frame. That end frame also ships as a JPG and is the reduced-motion state and the poster, so the still is designed and not whatever frame the film stops on.
4. **One ground line, one scale, difference by overlay** (ESPN). For the comparison row, put the four left-facing cutouts on one datum at one scale, with production counts beneath. On a model page, an overlay (for example the GWR over the F-26) can show a difference without a spec table. Number the figures plainly.
5. **Small subject in a large dark field** (ESR drive-past, EMO, Charge cove). Keep the car at roughly a quarter to a third of the frame width, with type in the empty field and never on the bodywork.
6. **News as date · type · headline** (Spyker). A dated list with a type label (GW press release, coverage plus outlet, event) and plain category tabs. No cards with thumbnails.

## Traps seen

- **Award decay.** Most car winners from before 2023 now fail live:
  - Ferrari Movie: the domain is now a blog.
  - Lucid (SOTD 2021): a lease-offer OEM template with a cookie wall.
  - Lotus Personal Showroom: redirects to the Eletre sales page.
  - Porsche Cayenne Black Edition (HM Dec 2025): the TLS certificate has expired.
  - Bugatti Divo (HM 2018): redirects to bugatti.com, whose lineup is mismatched photo cards and an Instagram feed.
  - Arrival: down.

  An Awwwards card is not evidence that the site still works.
- **Gate before the car.** Forge ("Enter"), ZEEKR case study ("100%" gauge loader, "Click to enter"), Le Mans Classic ("Start the experience"). Each costs the first screen and gains nothing.
- **Generic dark luxury.** Forge: condensed serif slogan, carbon texture, blurred placeholders, no product on the first screen. It won Site of the Day today, which says more about the award than about the page.
- **Technical decoration without data.** S-2K and The Watch: crosshairs, hairlines that align nothing, a scroll-speed speedometer, mono labels on prose. The brief already bans this; these two show how quickly it reads as costume.
- **Film boxed or stretched.**
  - Spyker shrinks its full-bleed hero into a framed card as you scroll.
  - Scout stretches 1280×720 frames over 1440+ px.
  - Charge centre-crops a landscape film on the phone and loses the car.
  - ESR's hero film does not appear at 390 at all.
- **Text stuck to the subject.** ESR's caption lies across the passing 911; Charge's headline sits on the bonnet.
- **Scroll hijack.** Charge's fullPage stepper takes the scroll bar away. ESPN's 60,000 px horizontal track makes a feature feel like a chore.
- **Lineup as cards.** Bugatti and Porsche Motorsport show models in photo cards with different backgrounds, angles and scales. Difference is read from the cards, not from the cars: the exact failure the comparison row exists to avoid.

## Not verified

- Cartier *Le Chœur des Pierres* (SOTD 20 Oct 2026), Cartier Watches & Wonders 2026, Mercedes Vision One-Eleven and Mercury Racing 400R/300R returned **Access Denied or a Cloudflare challenge** to the automated browser. They were not visited and are not judged. Getting past those bot checks was refused and not attempted further.
- Rolls-Royce (the brief's primary reference) was left out on purpose: it is already in the vault.
- Motion was judged from frame sequences and playback logs, not by watching it at 60 fps. Smoothness and jank on real phones were not measured.
- Phone checks used Chrome mobile emulation at 390×844, not a physical device.
