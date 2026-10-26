/* =========================================================================
   Gunther Werks Miami — Concept F · interaction and motion
   GSAP 3 + ScrollTrigger + Lenis (one ticker). GSAP is the lowest sufficient method here: the page
   pins, scrubs a light-up and a film to scroll, and lets the next chapter slide over the held one.
   The content is complete without this file: no JS / ?static / prefers-reduced-motion show the lit
   room, the still film and every caption, and every state stays reachable by click and keyboard.
   ========================================================================= */
(() => {
  'use strict';
  const d = document, root = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s), $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const STATIC = root.classList.contains('static');
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const HAS_GSAP = !!(window.gsap && window.ScrollTrigger);
  const MOTION = !STATIC && !RM && HAS_GSAP;
  const HOVER = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  root.classList.add(MOTION ? 'motion' : 'no-motion');
  if (HAS_GSAP) gsap.registerPlugin(ScrollTrigger);
  const EX = 'expo.out';

  /* ------------------------------------------------------------------ programs (sourced: research/corp/GUNTHER_WERKS_CI.md + GW pages/releases) */
  const P = {
    f26: { name: 'F-26', kick: 'Standard program · 26 examples', line: 'The future of analog power.',
      diffs: ['Twin-turbocharged 4.0-litre flat-six, co-developed with Rothsport Racing', '1,000 hp at 7,600 rpm, through a six-speed manual', 'Slantnose front, an homage to the 930 Flachbau', 'Carbon-fibre body panels and doors'],
      src: 'Gunther Werks F-26 programme page · F-26 release, 15 Aug 2025', enq: 'Enquire with Javier about the F-26', form: 'f26',
      notes: [{ x: .10, y: .405, t: 'Slantnose front' }, { x: .905, y: .085, t: '935-inspired rear wing' }] },
    turbo: { name: 'Turbo', kick: 'Standard program · 75 examples', line: 'Inspired by forced induction. Turbocharged 993.',
      diffs: ['4.0-litre twin-turbo flat-six, specified by Gunther Werks, built by Rothsport Racing', '850 hp in track mode, 7,500 rpm, Getrag six-speed manual', 'Hydraulic nose lift, controlled from the carbon steering wheel', 'Carbon fenders, quarters, roof, hood, bumpers and wing'],
      src: 'Gunther Werks Turbo programme page', enq: 'Enquire with Javier about the Turbo', form: 'turbo',
      notes: [{ x: .045, y: .55, t: 'Hydraulic nose lift' }, { x: .925, y: .225, t: 'Carbon-fibre wing' }] },
    gwr: { name: 'GWR', kick: 'Standard program · 40 examples', line: 'The definitive 993. Naturally aspirated performance.',
      diffs: ['4.0-litre quad-cam flat-six, naturally aspirated: 500+ hp at 9,000 rpm', 'S-duct hood: high-pressure downforce over the front axle', 'Ventilated ducktail and taillights expel engine heat', 'Turbofan wheels with aero fins · 2,400 lbs'],
      src: 'Gunther Werks GWR programme page', enq: 'Enquire with Javier about the GWR', form: 'gwr',
      notes: [{ x: .175, y: .37, t: 'S-duct hood' }, { x: .905, y: .225, t: 'Ventilated ducktail' }] },
    gwx: { name: 'GWX', kick: 'By invitation only', lamp: 'ring', line: 'The pinnacle of innovation. One-of-one and few-off editions.',
      diffs: ['Second-generation 4.0-litre flat-six, 440 hp, with sliding throttle plates', 'Bespoke carbon-fibre body panels, exclusive to the GWX', 'Candy Purple, developed in-house and exclusive to the GWX', 'Each commission crafted in collaboration with its client'],
      src: 'Gunther Werks GWX page · GWX release, 13 Aug 2025', enq: 'Enquire with Javier about the GWX', form: 'gwx',
      notes: [{ x: .225, y: .37, t: 'Vented carbon front fenders' }, { x: .935, y: .05, t: 'Frame-mounted wing' }] },
    gxr: { name: 'GXR-EVO', kick: 'Special edition · 15 units', line: 'The fastest naturally aspirated car in Gunther Werks’ history.',
      diffs: ['455 hp, revving to nearly 9,000 rpm; Getrag G50 six-speed', 'Full carbon-fibre body in a 12k 2x2 weave · 2,386 lbs dry', 'Splitter, canards and a high-downforce wing; a shark-fin replaces the rear window', 'Revealed at The Quail, 14 August 2026'],
      src: 'Gunther Werks GXR-EVO release, 14 Aug 2026', enq: 'Enquire with Javier about the GXR-EVO', form: 'gxr',
      notes: [{ x: .02, y: .80, t: 'Splitter and canards', row: 0 }, { x: .725, y: .155, t: 'Shark-fin', row: 0 }, { x: .955, y: .02, t: 'High-downforce wing', row: 1 }] },
    brundle: { name: 'Brundle Edition', kick: 'Special edition · Five examples', line: 'Charlie Brundle’s design tribute to Martin Brundle’s racing career.',
      diffs: ['Rothsport Racing-built 4.0-litre twin-turbo flat-six, 860 hp', 'Two-tone pearl livery, painted by hand, after Martin Brundle’s helmet', 'Adjustable high-downforce rear wing, front canards, Brembo CCMR brakes', 'Announced 21 Oct 2026; public debut at the Concours at Wynn Las Vegas'],
      src: 'Gunther Werks Brundle Edition release, 21 Oct 2026', enq: 'Enquire with Javier about the Brundle Edition', form: 'brundle',
      notes: [{ x: .14, y: .40, t: 'Hand-painted pearl livery' }, { x: .905, y: .08, t: 'Adjustable rear wing' }] },
    thermal: { name: 'Thermal Edition', kick: 'Special edition · Five examples', line: 'A tribute to Gunther Werks and The Thermal Club.',
      diffs: ['Turbo platform: twin-turbo 4.0-litre flat-six, 850 bhp', 'Exclusive two-tone livery on each of the five', 'Magnesium wheels finished in Hyper Silver', 'Carbon-fibre sills'],
      src: 'Gunther Werks Thermal Edition page', enq: 'Enquire with Javier about the Thermal Edition', form: 'thermal', notes: [] },
    endgame: { name: 'Project End Game', kick: 'Completed commission · 1 of 1', lamp: 'ring', line: 'The final Speedster, and the first one-of-one from GWX.',
      diffs: ['A Turbo Speedster: Rothsport Racing-built 4.0-litre twin-turbo flat-six', '850 hp, 660 lb-ft, six-speed manual', 'Carbon-fibre body, just over 2,600 lbs', 'Delivered; a completed one-of-one commission'],
      src: 'Gunther Werks Project End Game page', enq: 'Discuss a one-of-one GWX commission with Javier', form: 'gwx', notes: [] }
  };
  const ORDER = ['f26', 'turbo', 'gwr', 'gwx', 'gxr', 'brundle', 'thermal', 'endgame'];

  /* ------------------------------------------------------------------ registration (measured; _tools/measure_wheels.py → register.py)
     Per cutout: trimmed image size, and the FRONT and REAR tyre contact points (x = wheel centre from a
     circle fit on the rim edge, y = where the opaque tyre ends below that centre), as fractions of the image.
     Every car is scaled, rotated and offset so both contact points land on the same two stage points:
     identical wheelbase, identical floor line. Bounding boxes play no part. */
  const REG = {
    f26: { w: 4219, h: 1433, f: [.21199, .91486], r: [.77623, .91137], src: ['assets/hl/f26-1200.webp 1200w', 'assets/hl/f26-2400.webp 2400w'] },
    turbo: { w: 1314, h: 448, f: [.20616, .91964], r: [.77968, .92634], src: ['assets/hl/turbo-1314.webp 1314w'] },
    gwr: { w: 4249, h: 1438, f: [.21502, .93255], r: [.78776, .93324], src: ['assets/hl/gwr-1200.webp 1200w', 'assets/hl/gwr-2400.webp 2400w'] },
    gwx: { w: 4336, h: 1422, f: [.21644, .92194], r: [.76695, .91913], src: ['assets/hl/gwx-1200.webp 1200w', 'assets/hl/gwx-2400.webp 2400w'] },
    gxr: { w: 4584, h: 1463, f: [.19014, .96104], r: [.73818, .94668], src: ['assets/hl/gxr-1200.webp 1200w', 'assets/hl/gxr-2400.webp 2400w'] },
    brundle: { w: 4791, h: 1412, f: [.23356, .96176], r: [.73308, .95042], src: ['assets/hl/brundle-1200.webp 1200w', 'assets/hl/brundle-2400.webp 2400w'] },
    thermal: { w: 1344, h: 431, f: [.2224, .93271], r: [.76004, .94432], src: ['assets/hl/thermal-1344.webp 1344w'] },
    endgame: { w: 4481, h: 1370, f: [.22136, .93504], r: [.77672, .93285], src: ['assets/hl/endgame-1200.webp 1200w', 'assets/hl/endgame-2400.webp 2400w'] }
  };
  /* stage, in wheelbases: 1.90 wide × 0.80 tall; front contact 0.37 from the left; floor 0.60 from the top (75 %) */
  const ST = { W: 1.90, H: 0.80, FX: 0.37, FLOOR: 0.60 };
  function geo(k) {
    const r = REG[k], a = r.w / r.h;
    const fx = r.f[0], fy = r.f[1] / a, rx = r.r[0], ry = r.r[1] / a;  // image-width units
    const th = Math.atan2(ry - fy, rx - fx), s = (1 / ST.W) / Math.hypot(rx - fx, ry - fy);
    return { a, th, s, fx, fy, left: ST.FX / ST.W - s * fx, top: (ST.FLOOR / ST.W - s * fy) / (ST.H / ST.W) };
  }
  function place(k, el) {
    const g = geo(k), r = REG[k];
    el.style.left = g.left * 100 + '%'; el.style.top = g.top * 100 + '%'; el.style.width = g.s * 100 + '%';
    el.style.aspectRatio = r.w + ' / ' + r.h;
    el.style.setProperty('--ox', r.f[0] * 100 + '%'); el.style.setProperty('--oy', r.f[1] * 100 + '%'); el.style.setProperty('--rot', -g.th + 'rad');
  }
  /* image fraction (px, py) → stage pixels, through the same transform */
  function toStage(k, px, py, W) {
    const g = geo(k), dx = px - g.fx, dy = py / g.a - g.fy, c = Math.cos(-g.th), sn = Math.sin(-g.th);
    const ux = (dx * c - dy * sn) * g.s * ST.W, uy = (dx * sn + dy * c) * g.s * ST.W;   // in wheelbases
    const wb = W / ST.W;
    return [(ST.FX + ux) * wb, (ST.FLOOR + uy) * wb];
  }

  /* ------------------------------------------------------------------ scroll engine */
  let lenis = null;
  if (MOTION) {
    lenis = new Lenis({ lerp: .085, smoothWheel: true, anchors: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const target = t => (t.parentElement && t.parentElement.classList.contains('pin-spacer')) ? t.parentElement : t;
  function scrollToEl(el) {
    if (!el) return;
    if (el.id === 'top') { lenis ? lenis.scrollTo(0, { duration: 1.4 }) : scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' }); return; }
    let y = target(el).getBoundingClientRect().top + scrollY;
    if (el.id === 'programs' && hlLitEnd) y = hlLitEnd();          // arrive with the lights already up
    if (el.id === 'enquire') y = $('#miami').getBoundingClientRect().top + scrollY + (innerWidth < 1280 ? 0 : 0);
    if (lenis) lenis.scrollTo(y, { duration: 1.3 }); else scrollTo({ top: y, behavior: RM ? 'auto' : 'smooth' });
  }
  let hlLitEnd = null;
  d.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute('href'); if (id.length < 2) { e.preventDefault(); return; }
    const t = $(id); if (!t) return;
    e.preventDefault();
    if (a.dataset.intent) setIntent(a.dataset.intent);
    if (a.closest('.ft') && a.dataset.k) select(a.dataset.k, true);
    const wasMenu = !menu.hidden; closeMenu();
    setTimeout(() => scrollToEl(t), wasMenu ? 220 : 0);
  });

  /* buttons: a pool of light follows the pointer inside the capsule */
  if (HOVER) d.addEventListener('pointermove', e => {
    const b = e.target.closest('.btn'); if (!b) return;
    const r = b.getBoundingClientRect(); b.style.setProperty('--px', ((e.clientX - r.left) / r.width * 100) + '%'); b.style.setProperty('--py', ((e.clientY - r.top) / r.height * 100) + '%');
  }, { passive: true });

  /* ------------------------------------------------------------------ header: fog, tone, current section */
  const hdNav = $('.hd__nav'), hdPool = $('.hd__pool'), navLinks = $$('.hd__nav a'), menuLinks = $$('.menu__nav a');
  let curId = null;
  function headerState() {
    const y = lenis ? lenis.scroll : scrollY;
    root.classList.toggle('is-fog', y > 24);
    const probe = 40;
    let under = null;
    for (const el of d.elementsFromPoint(innerWidth / 2, probe)) { if (!el.closest('.hd')) { under = el; break; } }
    root.classList.toggle('hd-light', !!(under && under.closest('[data-hd="light"]')));
    const mid = innerHeight * .45; let id = null;
    navLinks.forEach(a => { const t = $(a.getAttribute('href')); if (!t) return; const r = t.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) id = a.getAttribute('href'); });
    if (id === curId) return; curId = id;
    [...navLinks, ...menuLinks].forEach(a => { a.getAttribute('href') === id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'); });
    const a = navLinks.find(x => x.getAttribute('href') === id);
    if (a && hdNav.offsetParent) { hdPool.classList.add('is-on'); hdPool.style.transform = `translateX(${a.offsetLeft + a.offsetWidth / 2 - 36}px)`; } else hdPool.classList.remove('is-on');
  }
  if (lenis) lenis.on('scroll', headerState); else addEventListener('scroll', headerState, { passive: true });

  /* ------------------------------------------------------------------ menu sheet (≤1279) */
  const menu = $('#menu'), menuBtn = $('.hd__menu'), mSheet = $('.menu__sheet', menu);
  function openMenu() {
    menu.hidden = false; root.classList.add('is-menu'); menuBtn.setAttribute('aria-expanded', 'true'); lenis && lenis.stop();
    $('#main').inert = true; $('.ft').inert = true;
    if (HAS_GSAP) RM ? gsap.fromTo(mSheet, { opacity: 0 }, { opacity: 1, duration: .16 }) : gsap.fromTo(mSheet, { yPercent: 100 }, { yPercent: 0, duration: .56, ease: EX });
    $('.menu__nav a', menu).focus();
  }
  function closeMenu() {
    if (menu.hidden) return;
    const done = () => { menu.hidden = true; root.classList.remove('is-menu'); menuBtn.setAttribute('aria-expanded', 'false'); lenis && lenis.start(); $('#main').inert = false; $('.ft').inert = false; menuBtn.focus({ preventScroll: true }); };
    if (HAS_GSAP && !RM) gsap.to(mSheet, { yPercent: 100, duration: .32, ease: 'power3.in', onComplete: done }); else done();
  }
  menuBtn.addEventListener('click', () => menu.hidden ? openMenu() : closeMenu());
  menu.addEventListener('click', e => { if (e.target.closest('[data-mclose]')) closeMenu(); });
  d.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
    if (e.key === 'Tab' && !menu.hidden) { const f = $$('a, button', mSheet), i = f.indexOf(d.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } }
  });

  /* ================================================================== 2 · HOUSE LIGHTS */
  const hl = $('#programs'), stage = $('#hl-stage'), carsEl = $('.hl__cars', hl), mirrorEl = $('.hl__mirror', hl), ghost = $('.hl__ghost', hl);
  const leads = $('.hl__leads', hl), notesEl = $('.hl__notes', hl), card = $('.hl__card', hl);
  const swBtns = $$('.sw__b, .se__b', hl), swLine = $('.sw__line i', hl);
  const cars = {}, mirrors = {};
  let cur = 'f26';
  ORDER.forEach(k => {
    const im = d.createElement('img'); im.className = 'hl__car' + (k === cur ? ' is-on' : '');
    im.srcset = REG[k].src.join(', '); im.src = REG[k].src[0].split(' ')[0]; im.sizes = '(min-width: 1680px) 1100px, (min-width: 1200px) 62vw, 96vw';
    im.alt = k === cur ? `The Gunther Werks ${P[k].name} in side profile.` : ''; im.decoding = 'async'; im.draggable = false;
    if (k !== cur) im.loading = 'lazy';
    im.width = REG[k].w; im.height = REG[k].h;
    place(k, im); carsEl.appendChild(im); cars[k] = im;
    const m = im.cloneNode(); m.alt = ''; m.classList.toggle('is-on', k === cur); place(k, m); mirrorEl.appendChild(m); mirrors[k] = m;
    const pre = new Image(); pre.src = `assets/hl/${k}-line.png`;   // the outline masks are small; keep them warm for the hover
  });

  function fillCard(k) {
    const p = P[k];
    $('.js-kick', card).textContent = p.kick;
    $('.js-lamp', card).className = 'lamp js-lamp ' + (p.lamp === 'ring' ? 'lamp--ring' : 'lamp--ink');
    $('.js-name', card).textContent = p.name;
    $('.js-line', card).textContent = p.line;
    $('.js-diffs', card).innerHTML = p.diffs.map(x => `<li>${x}</li>`).join('');
    $('.js-src', card).textContent = p.src;
    const enq = $('.js-enq', card); enq.dataset.k = k; $('span', enq).textContent = p.enq;
  }

  /* callouts: a dot on the feature, a plumb hairline up to a label above the car; drawn after the car settles */
  let noteTimer = 0;
  function notes(k, animate) {
    const W = stage.clientWidth, H = stage.clientHeight; if (!W) return;
    leads.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const old = $$('.lead, .hl__note', hl);
    old.forEach(x => { x.style.opacity = 0; });
    clearTimeout(noteTimer);
    const draw = () => {
      old.forEach(x => x.remove());
      const wb = W / ST.W, carTop = (ST.FLOOR - .58) * wb;
      (P[k].notes || []).forEach((n, i) => {
        const [x, y] = toStage(k, n.x, n.y, W);
        const row = n.row || 0, ly = carTop - 18 - row * 30;
        const g = d.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('class', 'lead');
        const len = Math.max(0, y - 7 - ly);
        g.innerHTML = `<path d="M${x.toFixed(1)} ${ly.toFixed(1)}V${(y - 7).toFixed(1)}" stroke-dasharray="${len}" stroke-dashoffset="${animate ? len : 0}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5"/>`;
        leads.appendChild(g);
        const lab = d.createElement('span'); lab.className = 'hl__note' + (x > W * .6 ? ' hl__note--r' : ''); lab.textContent = n.t;
        lab.style.left = (x + (x > W * .6 ? 1 : -1)) + 'px'; lab.style.top = ly + 'px';
        notesEl.appendChild(lab);
        const path = $('path', g), dot = $('circle', g);
        if (animate && HAS_GSAP) {
          gsap.fromTo(dot, { opacity: 0, scale: .4, transformOrigin: 'center' }, { opacity: 1, scale: 1, duration: .4, ease: EX, delay: i * .08 });
          gsap.to(path, { strokeDashoffset: 0, duration: .56, ease: EX, delay: .12 + i * .08 });
          gsap.delayedCall(.4 + i * .08, () => lab.classList.add('is-on'));
        } else lab.classList.add('is-on');
      });
    };
    if (animate) noteTimer = setTimeout(draw, old.length ? 380 : 0); else draw();
  }

  function swState() {
    swBtns.forEach(b => { const on = b.dataset.k === cur; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
    const main = $(`.sw__b[data-k="${cur}"]`, hl);
    if (main && main.offsetParent) { swLine.style.opacity = 1; swLine.style.width = main.offsetWidth + 'px'; swLine.style.transform = `translateX(${main.offsetLeft}px)`; }
    else swLine.style.opacity = 0;
  }

  function select(k, instant) {
    if (!P[k] || k === cur) return;
    const prev = cur; cur = k;
    [cars[prev], mirrors[prev]].forEach(el => {
      el.classList.remove('is-on'); el.classList.add('is-leaving');
      requestAnimationFrame(() => el.classList.add('is-gone'));
      clearTimeout(el._leave); el._leave = setTimeout(() => el.classList.remove('is-leaving', 'is-gone'), 800);
    });
    [cars[k], mirrors[k]].forEach(el => { clearTimeout(el._leave); el.classList.remove('is-leaving', 'is-gone'); el.classList.add('is-on'); });
    cars[prev].alt = ''; cars[k].alt = `The Gunther Werks ${P[k].name} in side profile.`;
    cars[k].loading = 'eager'; rimTo(k);
    hideGhost();
    swState();
    if (instant || RM || !HAS_GSAP) { fillCard(k); notes(k, false); return; }
    card.classList.add('is-out');
    setTimeout(() => { fillCard(k); card.classList.remove('is-out'); }, 240);
    notes(k, true);
  }
  function step(dir) { select(ORDER[(ORDER.indexOf(cur) + dir + ORDER.length) % ORDER.length]); }

  /* the ghost: the outline of the program you point at, laid on the same base over the current car */
  let ghostK = null;
  function showGhost(k) {
    if (k === cur || !P[k]) { hideGhost(); return; }
    ghostK = k; place(k, ghost); ghost.style.setProperty('--m', `url(assets/hl/${k}-line.png)`);
    ghost.classList.add('is-on'); hl.classList.add('is-ghosting');
  }
  function hideGhost() { ghostK = null; ghost.classList.remove('is-on'); hl.classList.remove('is-ghosting'); }

  swBtns.forEach(b => {
    b.addEventListener('click', () => select(b.dataset.k));
    if (HOVER) { b.addEventListener('pointerenter', () => showGhost(b.dataset.k)); b.addEventListener('pointerleave', hideGhost); }
    b.addEventListener('focus', () => { if (b.matches(':focus-visible')) showGhost(b.dataset.k); });
    b.addEventListener('blur', hideGhost);
    b.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') showGhost(b.dataset.k); });   // touch: the outline appears on press
    b.addEventListener('pointercancel', hideGhost);
    b.addEventListener('keydown', e => {
      let i = swBtns.indexOf(b), n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = swBtns[(i + 1) % swBtns.length];
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = swBtns[(i - 1 + swBtns.length) % swBtns.length];
      if (e.key === 'Home') n = swBtns[0]; if (e.key === 'End') n = swBtns[swBtns.length - 1];
      if (n) { e.preventDefault(); n.focus(); select(n.dataset.k); hideGhost(); }
    });
  });
  stage.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); step(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } });
  /* swipe / drag on the stage: horizontal travel changes the program, vertical travel stays the page's */
  (() => {
    let x0 = null, y0 = 0;
    stage.addEventListener('pointerdown', e => { x0 = e.clientX; y0 = e.clientY; });
    addEventListener('pointerup', e => {
      if (x0 === null) return; const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) step(dx < 0 ? 1 : -1);
    });
    addEventListener('pointercancel', () => { x0 = null; });
  })();
  $('.js-enq', card).addEventListener('click', e => { const k = e.currentTarget.dataset.k; setIntent('commission'); preselect(P[k].form); });

  /* the room's light level: 0 = house lights down (silhouette against haze), 1 = white seamless cove */
  const haze = $('.hl__haze', hl), rim = $('.hl__rim', hl);
  function rimTo(k) { place(k, rim); rim.style.setProperty('--m', `url(assets/hl/${k}-line.png)`); }
  rimTo(cur);
  function setLit(v) {
    v = clamp(v, 0, 1);
    hl.style.setProperty('--lit', v.toFixed(3));
    carsEl.style.setProperty('--carb', (.05 + .95 * Math.pow(v, 1.35)).toFixed(3));
    haze.style.opacity = (v < .3 ? .72 + v / .3 * .28 : 1 - (v - .3) / .7 * .8).toFixed(3);
    rim.style.opacity = clamp(1 - v * 1.8, 0, 1).toFixed(3);
    const on = v > .55;
    if (on === hl.classList.contains('is-pre')) {
      hl.classList.toggle('is-pre', !on);
      if (on) { revealLines($('.hl__h2', hl)); notes(cur, true); } else { $$('.lead, .hl__note', hl).forEach(x => x.remove()); }
    }
    on ? hl.setAttribute('data-hd', 'light') : hl.removeAttribute('data-hd');
  }

  /* ================================================================== 4 · GOODWOOD (E's film, shorter pin) */
  const gw = $('#goodwood');
  let filmPaused = false;
  const ppBtn = $('.film__pp', gw);
  ppBtn.addEventListener('click', () => {
    filmPaused = !filmPaused; ppBtn.setAttribute('aria-pressed', filmPaused);
    ppBtn.setAttribute('aria-label', filmPaused ? 'Play the film' : 'Pause the film');
    $('use', ppBtn).setAttribute('href', filmPaused ? '#i-play' : '#i-pause');
  });

  /* ================================================================== 7 · FORM */
  const form = $('#enquire'), iTrack = $('.track--milk', form);
  function pool(track) { const on = $(':scope > .is-on', track), p = $('.track__pool', track); if (!on || !p) return; p.style.width = on.offsetWidth + 'px'; p.style.transform = `translateX(${on.offsetLeft}px)`; }
  function setTab(btn) {
    $$(':scope > button', iTrack).forEach(b => { const on = b === btn; b.classList.toggle('is-on', on); b.setAttribute('aria-checked', on); b.tabIndex = on ? 0 : -1; });
    pool(iTrack);
  }
  function setIntent(v) { const b = $(`button[data-v="${v}"]`, iTrack); if (b) setTab(b); if (v === 'psp') preselect('rubystone'); }
  function preselect(k) {
    const sel = $('select[name="program"]', form); if (!sel || !$(`option[value="${k}"]`, sel)) return;
    sel.value = k; const w = sel.parentElement; w.classList.remove('is-set'); void w.offsetWidth; w.classList.add('is-set');
    setTimeout(() => w.classList.remove('is-set'), 1600);
  }
  $$(':scope > button', iTrack).forEach(b => b.addEventListener('click', () => setTab(b)));
  iTrack.addEventListener('keydown', e => {
    const bs = $$(':scope > button', iTrack), i = bs.indexOf(d.activeElement); if (i < 0) return; let n = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = bs[(i + 1) % bs.length];
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = bs[(i - 1 + bs.length) % bs.length];
    if (n) { e.preventDefault(); n.focus(); setTab(n); }
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true, firstBad = null;
    [['name', v => v.trim().length > 1], ['email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())]].forEach(([n, test]) => {
      const inp = $(`[name="${n}"]`, form), bad = !test(inp.value); inp.closest('.fld').classList.toggle('is-bad', bad); inp.setAttribute('aria-invalid', bad); if (bad) { ok = false; firstBad = firstBad || inp; }
    });
    const chk = $('[name="ok"]', form); $('.chk', form).classList.toggle('is-bad', !chk.checked); if (!chk.checked) { ok = false; firstBad = firstBad || chk; }
    const note = $('.form__note', form); note.classList.remove('is-err');
    if (!ok) { note.textContent = 'Error: please check the highlighted fields.'; note.classList.add('is-err'); firstBad.focus(); return; }
    const btn = $('button[type="submit"]', form), t = $('.btn__t', btn);
    btn.style.width = btn.offsetWidth + 'px'; btn.disabled = true; btn.classList.add('is-loading'); t.textContent = 'Sending'; note.textContent = '';
    const fail = setTimeout(() => { btn.disabled = false; btn.classList.remove('is-loading'); t.textContent = 'Send enquiry'; note.classList.add('is-err'); note.textContent = 'We couldn’t send this. Call Javier Roque on (305) 783-6493.'; }, 10000);
    // Prototype: there is no endpoint. The sent state follows after a short delay so it can be reviewed (?fail shows the error state).
    if (new URLSearchParams(location.search).has('fail')) return;
    setTimeout(() => {
      clearTimeout(fail);
      const h = form.offsetHeight, done = d.createElement('div'); done.className = 'form__done'; done.setAttribute('role', 'status'); done.tabIndex = -1;
      const prog = $('select[name="program"]', form); const pName = prog.options[prog.selectedIndex].text;
      done.innerHTML = `<h3>Thank you. Javier Roque will be in touch.</h3><p>About: ${pName}.</p><p>Prestige Imports · 15050 Biscayne Blvd, North Miami Beach<br>(305) 783-6493 · Javier@PrestigeImports.com</p><p>Prototype note: nothing was sent from this page.</p>`;
      form.replaceWith(done); done.focus({ preventScroll: true });
      if (HAS_GSAP && !RM) gsap.fromTo(done, { height: h, opacity: 0 }, { height: 'auto', opacity: 1, duration: .56, ease: EX });
    }, 1400);
  });
  $$('input', form).forEach(i => i.addEventListener('input', () => { const f = i.closest('.fld'); f && f.classList.remove('is-bad'); i.removeAttribute('aria-invalid'); }));
  $('[name="ok"]', form).addEventListener('change', () => $('.chk', form).classList.remove('is-bad'));

  /* ================================================================== MOTION */
  function lines(el) {
    if (el.dataset.split) return $$('.line__in', el);
    el.dataset.split = '1';
    const lnN = $$('.ln', el);
    if (lnN.length) { el.innerHTML = lnN.map(n => `<span class="line"><span class="line__in">${n.innerHTML}</span></span>`).join(''); return $$('.line__in', el); }
    const words = el.innerHTML.trim().split(/\s+/);
    el.innerHTML = words.map(w => `<span class="wd" style="display:inline-block">${w}</span>`).join(' ');
    const groups = []; let top = null;
    $$('.wd', el).forEach(w => { if (w.offsetTop !== top) { groups.push([]); top = w.offsetTop; } groups[groups.length - 1].push(w.innerHTML); });
    el.innerHTML = groups.map(g => `<span class="line"><span class="line__in">${g.join(' ')}</span></span>`).join('');
    return $$('.line__in', el);
  }
  function revealLines(el) { if (!MOTION || !el) return; gsap.fromTo(lines(el), { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: .08, ease: EX, overwrite: true }); }

  /* hold a pinned section for `scrub` px, then keep it held while the next chapter slides over it */
  function holdThenCover(sec, scrub, cover = true) {
    const sp = d.createElement('div'); sp.className = 'hold-spacer'; sp.setAttribute('aria-hidden', 'true'); sec.after(sp);
    const size = () => { sp.style.height = scrub() + 'px'; };
    size();
    const st = ScrollTrigger.create({ trigger: sec, start: 'top top', end: () => '+=' + (scrub() + (cover ? innerHeight : 0)), pin: true, pinSpacing: false, onRefreshInit: size });
    return { st, kill: () => { st.kill(); sp.remove(); } };
  }

  function film(D) {
    const canvas = $('.gw__film', gw), g = canvas.getContext('2d');
    const N = D ? 115 : 48, frames = new Array(N), cs = $$('.gw__c', gw), line = $('.film__line', gw);
    const src = i => D ? `assets/seq/f${String(i + 1).padStart(3, '0')}.webp` : `assets/seq-m/m${String(i + 1).padStart(2, '0')}.webp`;
    const K = [[2.75, 40], [3.25, 50], [3.75, 53], [4.25, 54], [4.75, 52], [5.25, 55], [5.75, 52], [6.25, 43], [6.75, 42], [7.25, 45], [7.75, 55], [8.25, 48], [8.5, 47]];
    const track = t => { for (let k = 0; k < K.length - 1; k++) { const [t0, c0] = K[k], [t1, c1] = K[k + 1]; if (t >= t0 && t <= t1) { let u = (t - t0) / (t1 - t0); u = u * u * (3 - 2 * u); return (c0 + (c1 - c0) * u) / 100; } } return .47; };
    let want = 0, drawn = -1, loaded = false;
    const load = () => { if (loaded) return; loaded = true; for (let i = 0; i < N; i++) { const im = new Image(); im.decoding = 'async'; im.onload = () => { frames[i] = im; if (drawn < 0 || i === want) draw(); }; im.src = src(i); } };
    const size = () => { const dpr = Math.min(devicePixelRatio || 1, 2); canvas.width = Math.round(canvas.clientWidth * dpr); canvas.height = Math.round(canvas.clientHeight * dpr); drawn = -1; draw(); };
    function draw() {
      let k = want; if (!frames[k]) { for (let dd = 1; dd < N; dd++) { if (frames[k - dd]) { k -= dd; break; } if (frames[k + dd]) { k += dd; break; } } }
      const img = frames[k]; if (!img || k === drawn) return; drawn = k;
      const cw = canvas.width, ch = canvas.height, iw = img.naturalWidth, ih = img.naturalHeight, a = cw / ch;
      let sw = ih * a, sh = ih, sy = 0; if (sw > iw) { sw = iw; sh = iw / a; sy = (ih - sh) / 2; }
      const sx = clamp(track(2.75 + k / (N - 1) * 5.75) * iw - sw / 2, 0, iw - sw);
      g.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    }
    gw.classList.add('is-film');
    const len = () => innerHeight * (D ? 1.1 : .9);
    const pre = ScrollTrigger.create({ trigger: gw, start: 'top 250%', once: true, onEnter: load });
    const hold = holdThenCover(gw, len);   // the next chapter covers the film, so its captions never travel up under the header
    const pin = ScrollTrigger.create({ trigger: gw, start: 'top top', end: () => '+=' + len(), scrub: true,
      onUpdate: s => {
        if (!filmPaused) { want = Math.round(s.progress * (N - 1)); draw(); const seg = $('i', line); if (seg && line.clientWidth) seg.style.left = ((line.clientWidth - seg.offsetWidth) * s.progress) + 'px'; }
        const t = 2.75 + s.progress * 5.75;
        cs.forEach(c => { const key = c.classList.contains('gw__c1') ? 2.8 : c.classList.contains('gw__c2') ? 5.2 : 6.6; c.classList.toggle('is-on', t >= key); });
      } });
    // a caption never lingers: once the next chapter covers the film, the copy is already behind it
    size(); addEventListener('resize', size);
    return () => { pre.kill(); pin.kill(); hold.kill(); removeEventListener('resize', size); gw.classList.remove('is-film'); };
  }

  function motion() {
    const mm = gsap.matchMedia();
    mm.add({ D: '(min-width: 1024px)', W: '(min-width: 1200px) and (min-height: 700px)', M: '(max-width: 1023px)' }, ctx => {
      const { D, W } = ctx.conditions, vh = () => innerHeight;
      const hero = $('.hero'), hImg = $('.hero__img'), at = $('#atelier');

      /* hero: masked line reveal on load; the photo settles, then pushes in under the scroll */
      gsap.fromTo('.hero__media', { scale: 1.06 }, { scale: 1, duration: 1.8, ease: EX });
      gsap.from(lines($('.hero__h1')), { yPercent: 110, duration: 1.15, stagger: .08, ease: EX, delay: .15 });
      gsap.from('.hero__foot > *', { opacity: 0, duration: 1, stagger: .1, ease: 'power2.out', delay: .55 });
      const holdHero = D ? holdThenCover(hero, () => 0) : null;
      // absolute range: the hold pin above shifts a 'top top' start on the same trigger to the end of the hold
      gsap.timeline({ scrollTrigger: { start: 0, end: () => vh(), scrub: true } })
        .to(hImg, { scale: D ? 1.0 : 1.04, ease: 'none', duration: 1 }, 0)
        .to('.hero__top', { y: () => vh() * .04, opacity: 0, ease: 'none', duration: .55 }, 0)      // the title settles and dims; it never rises under the bar
        .to('.hero__foot', { y: () => -vh() * .06, opacity: 0, ease: 'none', duration: .3 }, 0)
        .to({}, { duration: .45 }, .55);

      /* house lights: pinned only for the light-up on the desktop composition; elsewhere it lights as it arrives */
      hl.classList.add('is-pre'); $$('.lead, .hl__note', hl).forEach(x => x.remove()); setLit(0);
      let holdHL = null;
      if (W) {
        const LIT = () => vh() * .6, HOLD = () => vh() * .95;   // lights up over .6 vh, then a .35 vh rest in the lit room
        holdHL = holdThenCover(hl, HOLD);
        ScrollTrigger.create({ trigger: hl, start: 'top top', end: () => '+=' + LIT(), scrub: .35, onUpdate: s => setLit(s.progress) });
        gsap.fromTo($('.hl__stagewrap', hl), { scale: .96, transformOrigin: '60% 80%' }, { scale: 1, ease: 'none', scrollTrigger: { trigger: hl, start: 'top top', end: () => '+=' + LIT(), scrub: .35 } });
        hlLitEnd = () => holdHL.st.start + LIT();
      } else {
        ScrollTrigger.create({ trigger: hl, start: 'top 92%', end: 'top 12%', scrub: .35, onUpdate: s => setLit(s.progress) });
        hlLitEnd = null;
      }

      /* atelier: the images travel at different speeds, so the small ones cross the large one */
      if (D) $$('[data-speed]', at).forEach(el => {
        const sp = +el.dataset.speed;
        gsap.fromTo(el, { y: () => vh() * sp }, { y: () => -vh() * sp, ease: 'none', scrollTrigger: { trigger: at, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
        const im = $('img', el); if (im) gsap.fromTo(im, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: at, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      $$('.at__stats dd', at).forEach((dd, i) => gsap.fromTo(dd, { opacity: .22 }, { opacity: 1, duration: 1.2, delay: i * .15, ease: 'power1.out', scrollTrigger: { trigger: dd, start: 'top 85%', once: true } }));

      const offFilm = film(D);

      /* provenance: the photograph opens from a masked frame as it arrives, the car drifting inside it */
      if (D) {
        const clip = $('.psp__clip');
        gsap.fromTo(clip, { clipPath: 'inset(9% 7% 9% 7% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', ease: 'none', scrollTrigger: { trigger: '#provenance', start: 'top bottom', end: 'top top', scrub: true } });
        gsap.fromTo($('img', clip), { yPercent: -3 }, { yPercent: 3, ease: 'none', scrollTrigger: { trigger: '#provenance', start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.fromTo($('.mia__pane'), { yPercent: 10 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '#miami', start: 'top bottom', end: 'top top', scrub: true } });
      }

      $$('[data-lines]').forEach(el => {
        if (el.closest('.hero') || el.closest('.hl')) return;
        gsap.from(lines(el), { yPercent: 110, duration: 1, stagger: .08, ease: EX, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });

      return () => { offFilm && offFilm(); holdHero && holdHero.kill(); holdHL && holdHL.kill(); hlLitEnd = null; hl.classList.remove('is-pre'); setLit(1); };
    });
  }

  /* ------------------------------------------------------------------ boot */
  function refreshUI() {
    swState(); pool(iTrack);
    if (!hl.classList.contains('is-pre')) notes(cur, false);
    curId = null; headerState();
  }
  fillCard(cur);
  if (!MOTION) {
    setLit(1);
    $$('.gw__c').forEach(c => c.classList.add('is-on'));
  }
  refreshUI();
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(() => { refreshUI(); MOTION && ScrollTrigger.refresh(); });
  let rT = 0; addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(refreshUI, 120); });
  if (MOTION) { motion(); addEventListener('load', () => { refreshUI(); ScrollTrigger.refresh(); }, { once: true }); }

  /* QA hook: the registration as rendered (positions read back from the laid-out images, not from the table) */
  window.__F = {
    select, lenis: () => lenis, setLit, REG, ST,
    measure() {
      const sr = stage.getBoundingClientRect();
      return ORDER.map(k => {
        const im = cars[k], r = REG[k], M = new DOMMatrix(getComputedStyle(im).transform);
        const cs = getComputedStyle(im), w = parseFloat(cs.width), h = parseFloat(cs.height), L = parseFloat(cs.left), T = parseFloat(cs.top), ox = r.f[0] * w, oy = r.f[1] * h;
        const map = (fx, fy) => { const x = fx * w - ox, y = fy * h - oy; const p = M.transformPoint(new DOMPoint(x, y)); return [L + ox + p.x, T + oy + p.y]; };
        const F = map(r.f[0], r.f[1]), R = map(r.r[0], r.r[1]);
        return { k, frontX: +F[0].toFixed(2), rearX: +R[0].toFixed(2), wheelbase: +(R[0] - F[0]).toFixed(2), floorFront: +F[1].toFixed(2), floorRear: +R[1].toFixed(2), stageW: +sr.width.toFixed(1), imgW: w };
      });
    }
  };
})();
