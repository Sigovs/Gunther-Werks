# 21st.dev — components worth studying for Gunther Werks Miami (25 Oct 2026)

21st.dev items are React/shadcn components; the sibling sites are static HTML + GSAP. So these are **technique references**, not installs: read the approach, rebuild it in our stack. Metadata only — no paid code fetched.

`get_inspiration` mostly returned old bookmarks unrelated to this brief (glass testimonial swiper, glitch text, shader backgrounds); none carried forward. The catalogue search was useful:

| Component | URL | What it teaches | Verdict |
|---|---|---|---|
| Hero Scrub (jean.duthil13) | https://21st.dev/@jean.duthil13/components/hero-scrub | Scroll-scrubbed **image sequence on canvas** with GSAP ScrollTrigger, pinned, mobile-aware, reduced-motion path. A canvas sequence scrubs smoothly in both directions, which `video.currentTime` often does not (keyframe spacing). Its "card scales from thumbnail to full viewport" choreography is the device we do **not** take — the brief wants the film to melt into the cove, not a box that grows. | useful — technique |
| Image Sequence (joyco) | https://21st.dev/@joyco/components/image-sequence | Canvas frame player with **binary progressive loading** (every 16th frame first, then fill in) — the answer to the weight of a 1080p/4K frame sequence on a phone. | useful — technique |
| Scroll-Linked Video Scrubber (pulkitxm) | https://21st.dev/@pulkitxm/components/scroll-linked-video-scrubber | The plain `<video>` + currentTime approach. Simpler, but needs a re-encode with a keyframe on every frame (`-g 1`) to scrub cleanly, and the file grows a lot. | reference — the fallback route |
| Spec Sheet (isaiahbjork) | https://21st.dev/@isaiahbjork/components/spec-sheet | Side-by-side spec comparison with a **"show only the rows that differ"** toggle and a stacked layout on narrow screens — the right logic for comparing F-26 / Turbo / GWR / GWX, whose differences are few and specific. Its table styling is generic and is not taken. | useful — logic |
| Scroll Gallery (soralabs), Cards Rotate Slider, Scroll Choreography | — | Pinned wipes, rotating cards, quadrant choreography: devices for their own sake. | rejected — anti-pattern for this brief (scrub only on moving subjects) |

Template search ("automotive luxury landing dark") returned nothing.

## For the build
- Scrub route: canvas image sequence (extracted from the GW MP4 segments, WebP/AVIF frames, progressive loading), with the `<video>` route as fallback.
- Comparison: the "differences only" logic applied to the four active programs.
