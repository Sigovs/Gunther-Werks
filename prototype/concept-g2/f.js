/* =========================================================================
   Gunther Werks Miami — Concept G2 · interaction and motion (G with Alex's 26 Oct revisions: no outbound
   links, Provenance rebuilt, News read on-site, a film interlude, the Atelier entrance and pointer depth,
   one text-reveal system for every section)
   GSAP 3 + ScrollTrigger + Lenis (one ticker). No section is scrubbed any more; the hero is held while
   Programs slides over it, and images drift inside their frames. The content is complete without this
   file: no JS / ?static / prefers-reduced-motion show every section, and every state is reachable by
   click, keyboard and touch.
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

  /* ------------------------------------------------------------------ programs (sourced: research/corp/GUNTHER_WERKS_CI.md + GW pages/releases)
     The same three facts for every program, so the four compare. */
  const P = {
    f26: { name: 'F-26', line: 'The future of analog power.', src: 'F-26 programme page · F-26 release, 15 Aug 2025', url: 'https://guntherwerks.com/programs/f26/',
      facts: [['Power', '1,000', 'hp'], ['Engine', '4.0 L twin-turbo'], ['Signature', 'Slantnose, after the 930 Flachbau']] },
    turbo: { name: 'Turbo', line: 'Inspired by forced induction.', src: 'Turbo programme page', url: 'https://guntherwerks.com/programs/turbo/',
      facts: [['Power', '850', 'hp, track mode'], ['Engine', '4.0 L twin-turbo'], ['Signature', 'Hydraulic nose lift from the wheel']] },
    gwr: { name: 'GWR', line: 'The definitive 993.', src: 'GWR programme page', url: 'https://guntherwerks.com/programs/gwr/',
      facts: [['Power', '500+', 'hp at 9,000 rpm'], ['Engine', '4.0 L naturally aspirated'], ['Signature', 'S-duct hood, ventilated ducktail']] },
    gwx: { name: 'GWX', line: 'One-of-one and few-off editions.', src: 'GWX page · GWX release, 13 Aug 2025', url: 'https://guntherwerks.com/programs/gwx/',
      facts: [['Power', '440', 'hp'], ['Engine', '4.0 L, second generation'], ['Signature', 'Candy Purple, exclusive to the GWX']] }
  };
  const ORDER = ['f26', 'turbo', 'gwr', 'gwx'];

  /* ------------------------------------------------------------------ registration (measured; _tools/measure_wheels.py → register.py)
     Per cutout: trimmed image size, and the FRONT and REAR tyre contact points (x = wheel centre from a
     circle fit on the rim edge, y = where the opaque tyre ends below that centre), as fractions of the image.
     Every car is scaled, rotated and offset so both contact points land on the same two stage points:
     identical wheelbase, identical floor line. Bounding boxes play no part. */
  const REG = {
    f26: { w: 4219, h: 1433, f: [.21199, .91486], r: [.77623, .91137] },
    turbo: { w: 1314, h: 448, f: [.20616, .91964], r: [.77968, .92634] },
    gwr: { w: 4249, h: 1438, f: [.21502, .93255], r: [.78776, .93324] },
    gwx: { w: 4336, h: 1422, f: [.21644, .92194], r: [.76695, .91913] },
    gxr: { w: 4584, h: 1463, f: [.19014, .96104], r: [.73818, .94668] },
    brundle: { w: 4791, h: 1412, f: [.23356, .96176], r: [.73308, .95042] },
    thermal: { w: 1344, h: 431, f: [.2224, .93271], r: [.76004, .94432] },
    endgame: { w: 4481, h: 1370, f: [.22136, .93504], r: [.77672, .93285] }
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
    if (el.id === 'enquire') y = $('#miami').getBoundingClientRect().top + scrollY;
    if (lenis) lenis.scrollTo(y, { duration: 1.3 }); else scrollTo({ top: y, behavior: RM ? 'auto' : 'smooth' });
  }
  d.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute('href'); if (id.length < 2) { e.preventDefault(); return; }
    const t = $(id); if (!t) return;
    e.preventDefault();
    if (id === '#enquire') openForm(a.dataset.intent, a.dataset.k);
    if (a.closest('.ft') && a.dataset.k) select(a.dataset.k);
    const wasMenu = !menu.hidden; closeMenu();
    setTimeout(() => scrollToEl(t), wasMenu ? 220 : 0);
  });

  /* buttons: a fill layer that sweeps in on hover (CSS) */
  $$('.btn').forEach(b => { if (!b.querySelector('.fill')) b.insertAdjacentHTML('afterbegin', '<i class="fill" aria-hidden="true"></i>'); });
  /* buttons: a pool of light follows the pointer inside the capsule */
  if (HOVER) d.addEventListener('pointermove', e => {
    const b = e.target.closest('.btn'); if (!b) return;
    const r = b.getBoundingClientRect(); b.style.setProperty('--px', ((e.clientX - r.left) / r.width * 100) + '%'); b.style.setProperty('--py', ((e.clientY - r.top) / r.height * 100) + '%');
  }, { passive: true });

  /* nav labels: two stacked copies of each word, split into letters for the staggered roll on hover */
  $$('.hd__nav a').forEach(a => {
    if (a.querySelector('.rl')) return;
    const t = a.textContent.trim(), w = cls => `<span class="rl__w ${cls}" aria-hidden="true">${[...t].map((c, i) => `<span class="rl__c" style="--i:${i}">${c === ' ' ? '&nbsp;' : c}</span>`).join('')}</span>`;
    a.setAttribute('aria-label', t);
    a.innerHTML = `<span class="rl">${w('rl__w--a')}${w('rl__w--b')}</span>`;
  });
  /* ------------------------------------------------------------------ hero slides
     Four GW studio frames. Each shows for 6.5 s (the active bar fills; its animationend advances),
     pauses while the pointer is on the controller, while the hero is off screen, or when the visitor
     presses pause. Reduced motion or ?static: no autoplay. */
  const hsEl = $('.hs'), slides = $$('.hs__s'), bars = $$('.hs__bar'), hsPP = $('.js-hs-pp');
  let hsI = 0, hsUser = !MOTION, hsHover = false, hsVis = true;
  function hsState() {
    const paused = hsUser || hsHover || !hsVis;
    hsEl.classList.toggle('is-paused', paused);
    hsPP.setAttribute('aria-pressed', String(hsUser)); hsPP.setAttribute('aria-label', hsUser ? 'Play the slides' : 'Pause the slides');
    $('use', hsPP).setAttribute('href', hsUser ? '#i-play' : '#i-pause');
  }
  /* hero text: the display line and the paragraph change with the slide. The old lines leave to the left
     out of their masks, the new ones step in from the right, line after line, then the paragraph. */
  const HT = [
    ['Gunther Werks', 'Miami', 'The F-26. The future of analog power, limited to 26 examples.'],
    ['The Turbo', '75 examples', 'Inspired by forced induction. A twin-turbocharged 4.0-litre flat-six, built by Rothsport Racing.'],
    ['Thermal', 'Edition', 'A tribute to Gunther Werks and The Thermal Club. Limited to five examples.'],
    ['Brundle', 'Edition', 'Charlie Brundle’s design tribute to Martin Brundle’s racing career. Five examples.']
  ];
  const hmI = $$('.hm__i'), hpI = $('.hp__i');
  function heroText(n) {
    const put = () => {
      hmI[0].textContent = HT[n][0]; hmI[1].textContent = HT[n][1]; hpI.textContent = HT[n][2];
      if (!HAS_GSAP || !MOTION) return;
      gsap.fromTo(hmI, { xPercent: 105 }, { xPercent: 0, duration: 1.1, stagger: .14, ease: 'power3.out' });
      gsap.fromTo(hpI, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: .35, ease: 'power3.out' });
    };
    if (!HAS_GSAP || !MOTION) { put(); return; }
    gsap.killTweensOf([...hmI, hpI]);
    gsap.to(hmI, { xPercent: -105, duration: .45, stagger: .08, ease: 'power2.in' });
    gsap.to(hpI, { x: -30, opacity: 0, duration: .35, ease: 'power2.in', onComplete: () => gsap.delayedCall(.18, put) });
  }
  function hsGo(n) {
    n = (n + slides.length) % slides.length; if (n === hsI) return;
    slides[hsI].classList.remove('is-on'); slides[hsI].setAttribute('aria-hidden', 'true');
    slides[n].classList.add('is-on'); slides[n].removeAttribute('aria-hidden');
    $$('img', slides[n]).forEach(im => { im.loading = 'eager'; });
    $$('img', slides[(n + 1) % slides.length]).forEach(im => { im.loading = 'eager'; });   // warm the next one
    bars.forEach((b, i) => { b.classList.toggle('is-done', i < n); b.classList.remove('is-on'); b.removeAttribute('aria-current'); });
    void bars[n].offsetWidth; bars[n].classList.add('is-on'); bars[n].setAttribute('aria-current', 'true');
    $('.js-hs-i').textContent = String(n + 1).padStart(2, '0');
    heroText(n);
    hsI = n;
  }
  bars.forEach((b, i) => {
    b.addEventListener('click', () => hsGo(i));
    $('i', b).addEventListener('animationend', () => { if (!hsEl.classList.contains('is-paused')) hsGo(hsI + 1); });
  });
  $('.js-hs-prev').addEventListener('click', () => hsGo(hsI - 1));
  $('.js-hs-next').addEventListener('click', () => hsGo(hsI + 1));
  hsPP.addEventListener('click', () => { hsUser = !hsUser; hsState(); });
  hsEl.addEventListener('pointerenter', () => { hsHover = true; hsState(); });
  hsEl.addEventListener('pointerleave', () => { hsHover = false; hsState(); });
  hsEl.addEventListener('focusin', () => { hsHover = true; hsState(); });
  hsEl.addEventListener('focusout', () => { hsHover = false; hsState(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { hsVis = es[0].isIntersecting; hsState(); }, { threshold: .2 }).observe($('.hero'));
  hsState();

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

  /* ================================================================== 2 · PROGRAMS
     Choosing a program replaces the car directly: the old car is gone at once, the new one comes up
     from the studio ground (no two cars on screen, no outlines). Scroll never changes the program. */
  const pg = $('#programs'), stage = $('#pg-stage'), panel = $('#pg-panel');
  const tabs = $$('.pg__tab', pg), cars = {};
  $$('.pg__car', stage).forEach(im => { cars[im.dataset.k] = im; place(im.dataset.k, im); });
  $$('.pse__stage .pg__car').forEach(im => place(im.dataset.k, im));
  let cur = 'f26';

  function fillInfo(k) {
    const p = P[k];
    $('.js-line', pg).textContent = p.line;
    $('.js-facts', pg).innerHTML = p.facts.map(([t, v, u]) => u ? `<div><dt>${t}</dt><dd>${v}<small>${u}</small></dd></div>` : `<div><dt>${t}</dt><dd class="t">${v}</dd></div>`).join('');
    const enq = $('.js-enq', pg); enq.dataset.k = k; $('span', enq).textContent = `Enquire about the ${p.name}`;
  }
  function select(k, focusTab) {
    if (!P[k] || k === cur) return;
    const prev = cur; cur = k;
    const dir = ORDER.indexOf(k) > ORDER.indexOf(prev) ? 1 : -1;
    cars[prev].classList.remove('is-on'); cars[prev].alt = '';
    cars[k].loading = 'eager'; cars[k].alt = `The Gunther Werks ${P[k].name} in side profile.`; cars[k].classList.add('is-on');
    if (MOTION && cars[k].animate) {
      // strictly one car at a time: the old one leaves first, the new one rolls in only after it has gone
      Object.values(cars).forEach(c => c.getAnimations().forEach(a => a.cancel()));
      cars[prev].animate([{ translate: '0 0', opacity: 1 }, { translate: `${-8 * dir}% 0`, opacity: 0 }], { duration: 320, easing: 'cubic-bezier(.55,0,.75,.2)' });
      cars[k].animate([{ translate: `${10 * dir}% 0`, opacity: 0 }, { translate: '0 0', opacity: 1 }], { duration: 850, delay: 330, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
      $$('.pg__sh', stage).forEach(sh => sh.animate([{ opacity: 1 }, { opacity: .2, offset: .3 }, { opacity: 1 }], { duration: 1180, easing: 'ease-in-out' }));
    }
    tabs.forEach(t => { const on = t.dataset.k === k; t.classList.toggle('is-on', on); t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; if (on && focusTab) t.focus(); });
    panel.setAttribute('aria-labelledby', 'tab-' + k);
    fillInfo(k);
    if (MOTION && HAS_GSAP) gsap.fromTo([$('.js-line', pg), ...$$('.js-facts > div', pg), $('.js-enq', pg)], { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .07, ease: 'power3.out', delay: .25, clearProps: 'transform,opacity' });
  }
  function step(dir) { select(ORDER[(ORDER.indexOf(cur) + dir + ORDER.length) % ORDER.length]); }
  tabs.forEach(t => {
    t.addEventListener('click', () => select(t.dataset.k));
    t.addEventListener('keydown', e => {
      const i = ORDER.indexOf(t.dataset.k); let n = null;
      if (e.key === 'ArrowRight') n = ORDER[(i + 1) % 4]; if (e.key === 'ArrowLeft') n = ORDER[(i + 3) % 4];
      if (e.key === 'Home') n = ORDER[0]; if (e.key === 'End') n = ORDER[3];
      if (n) { e.preventDefault(); select(n, true); }
    });
  });
  /* the hidden three load once the section is near, so a change never waits on the network */
  if ('IntersectionObserver' in window) { const io = new IntersectionObserver(es => { if (es.some(x => x.isIntersecting)) { Object.values(cars).forEach(im => { im.loading = 'eager'; }); io.disconnect(); } }, { rootMargin: '600px 0px' }); io.observe(pg); }
  /* swipe on the plate: horizontal travel changes the program, vertical travel stays the page's */
  (() => {
    let x0 = null, y0 = 0;
    stage.addEventListener('pointerdown', e => { x0 = e.clientX; y0 = e.clientY; });
    addEventListener('pointerup', e => {
      if (x0 === null) return; const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) step(dx < 0 ? 1 : -1);
    });
    addEventListener('pointercancel', () => { x0 = null; });
  })();

  /* ================================================================== 7 · CONTACT
     The form is always open under the heading. Any Enquire link lands here with the interest and the
     program preselected. Its destination is not confirmed, so it stays a prototype: it validates, then
     says plainly that nothing was sent. */
  const form = $('#enquire');
  function openForm(intent, k) {
    if (intent) { const r = $(`input[name="intent"][value="${intent}"]`, form); if (r) r.checked = true; }
    if (k) { const sel = $('select[name="program"]', form); if ($(`option[value="${k}"]`, sel)) sel.value = k; }
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true, firstBad = null;
    [['name', v => v.trim().length > 1], ['email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())]].forEach(([n, test]) => {
      const inp = $(`[name="${n}"]`, form), bad = !test(inp.value); inp.closest('.fld').classList.toggle('is-bad', bad); inp.setAttribute('aria-invalid', bad); if (bad) { ok = false; firstBad = firstBad || inp; }
    });
    const chk = $('[name="ok"]', form); $('.chk', form).classList.toggle('is-bad', !chk.checked); if (!chk.checked) { ok = false; firstBad = firstBad || chk; }
    const note = $('.form__note', form); note.classList.remove('is-err', 'is-proto');
    if (!ok) { note.textContent = 'Error: please check the highlighted fields.'; note.classList.add('is-err'); firstBad.focus(); return; }
    note.classList.add('is-proto');
    note.textContent = 'Prototype: your enquiry was not sent. This form will be connected once its destination at Prestige Imports is confirmed.';
  });
  $$('input', form).forEach(i => i.addEventListener('input', () => { const f = i.closest('.fld'); f && f.classList.remove('is-bad'); i.removeAttribute('aria-invalid'); }));
  $('[name="ok"]', form).addEventListener('change', () => $('.chk', form).classList.remove('is-bad'));

  /* ================================================================== INTERLUDE — a muted loop, never scrubbed
     Plays while on screen, pauses off screen. Reduced motion or ?static: the poster stays and the
     button offers play. The visitor's pause always wins. */
  const vi = $('#interlude'), vid = $('.vi__v', vi), vBtn = $('.vi__pp', vi);
  let vUserPaused = !MOTION, vOn = false;
  function vSet(play) {
    if (play) { vid.preload = 'auto'; const pr = vid.play(); pr && pr.catch(() => {}); } else vid.pause();
  }
  function vUI() {
    const playing = !vid.paused;
    vBtn.setAttribute('aria-pressed', String(!playing));
    vBtn.setAttribute('aria-label', playing ? 'Pause the film' : 'Play the film');
    $('use', vBtn).setAttribute('href', playing ? '#i-pause' : '#i-play');
  }
  vBtn.hidden = false;
  vid.addEventListener('play', vUI); vid.addEventListener('pause', vUI); vUI();
  vBtn.addEventListener('click', () => { if (vid.paused) { vUserPaused = false; vSet(true); } else { vUserPaused = true; vSet(false); } });
  if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(x => { vOn = x.isIntersecting; if (vOn && !vUserPaused) vSet(true); if (!vOn) vid.pause(); }), { threshold: .25 }).observe(vi);

  /* ================================================================== NEWS & EVENTS — read on this site
     Each item opens a dialog with GW's own words for that post; nothing leaves the site. */
  const nd = $('.nd'), ndBody = $('.nd__body', nd);
  let ndFrom = null;
  $$('#news [data-n]').forEach(b => b.addEventListener('click', () => {
    const art = $(`.nd__src article[data-n="${b.dataset.n}"]`); if (!art) return;
    ndBody.innerHTML = art.innerHTML; const h = $('h3', ndBody); if (h) h.id = 'nd-h';
    ndFrom = b; lenis && lenis.stop();
    nd.showModal(); $('.nd__x', nd).focus();
    if (HAS_GSAP && !RM) gsap.fromTo($('.nd__in', nd), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .56, ease: EX });
  }));
  function ndClose() { if (nd.open) nd.close(); }
  $('.nd__x', nd).addEventListener('click', ndClose);
  nd.addEventListener('click', e => { if (e.target === nd) ndClose(); });
  nd.addEventListener('close', () => { lenis && lenis.start(); ndFrom && ndFrom.focus({ preventScroll: true }); });

  /* ================================================================== ATELIER — pointer depth (desktop, fine pointer, motion allowed)
     Each photograph shifts inside its own clipped frame at its own small rate: the engine is the
     background plane, the carbon detail moves a little more, the key a little more again. Frames, crops
     and the collage never move. The offset is clamped every frame against the real geometry, so no
     frame can show an empty edge; it eases back to rest when the pointer leaves the image area. */
  const at = $('#atelier');
  function atelierDepth() {
    const L = [[$('.at__big img', at), 3], [$('.at__carbon img', at), 7], [$('.at__key .ph img', at), 10]].map(([el, amp]) => ({ el, amp, x: 0, y: 0 }));
    const frames = [$('.at__big', at), $('.at__carbon', at), $('.at__key .ph', at)];
    let tx = 0, ty = 0, running = false;
    root.classList.add('at-depth');                 // a 1.04–1.06 overscan on the photos, only while the effect is on
    function area() { return frames.map(f => f.getBoundingClientRect()).reduce((a, r) => ({ l: Math.min(a.l, r.left), t: Math.min(a.t, r.top), r: Math.max(a.r, r.right), b: Math.max(a.b, r.bottom) }), { l: 1e9, t: 1e9, r: -1e9, b: -1e9 }); }
    function tick() {
      let moving = false;
      L.forEach((o, i) => {
        const gx = -tx * o.amp, gy = -ty * o.amp;
        o.x += (gx - o.x) * .07; o.y += (gy - o.y) * .07;
        o.el.style.translate = `${o.x.toFixed(2)}px ${o.y.toFixed(2)}px`;
        const f = frames[i].getBoundingClientRect(), m = o.el.getBoundingClientRect();
        const bl = m.left - o.x, br = m.right - o.x, bt = m.top - o.y, bb = m.bottom - o.y;
        const cx = clamp(o.x, f.right - br, f.left - bl), cy = clamp(o.y, f.bottom - bb, f.top - bt);
        if (cx !== o.x || cy !== o.y) { o.x = cx; o.y = cy; o.el.style.translate = `${o.x.toFixed(2)}px ${o.y.toFixed(2)}px`; }
        if (Math.abs(gx - o.x) > .05 || Math.abs(gy - o.y) > .05) moving = true;
      });
      running = moving || tx !== 0 || ty !== 0;
      if (running) requestAnimationFrame(tick);
    }
    function kick() { if (!running) { running = true; requestAnimationFrame(tick); } }
    at.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      const a = area(), inside = e.clientX >= a.l && e.clientX <= a.r && e.clientY >= a.t && e.clientY <= a.b;
      if (inside) { tx = clamp((e.clientX - (a.l + a.r) / 2) / ((a.r - a.l) / 2), -1, 1); ty = clamp((e.clientY - (a.t + a.b) / 2) / ((a.b - a.t) / 2), -1, 1); }
      else { tx = 0; ty = 0; }
      kick();
    }, { passive: true });
    at.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
    return () => { root.classList.remove('at-depth'); L.forEach(o => { o.el.style.translate = ''; }); tx = ty = 0; };
  }

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

  function motion() {
    const mm = gsap.matchMedia();
    mm.add({ D: '(min-width: 1024px)', W: '(min-width: 1200px) and (min-height: 700px)', M: '(max-width: 1023px)' }, ctx => {
      const { D } = ctx.conditions, vh = () => innerHeight;
      const hero = $('.hero'), hImg = $$('.hero__img');
      let offDepth = null;

      /* hero: masked line reveal on load; the photo settles, then pushes in under the scroll */
      gsap.fromTo('.hero__media', { scale: 1.06 }, { scale: 1, duration: 1.8, ease: EX });
      gsap.from($$('.hm__i'), { yPercent: 110, duration: 1.7, stagger: .16, ease: 'power3.out', delay: .2 });
      gsap.from('.hp__i', { y: 24, opacity: 0, duration: 1.2, ease: 'power2.out', delay: .75 });
      gsap.from('.htag', { xPercent: 100, duration: 1.1, ease: 'power3.out', delay: 1.1 });
      gsap.from('.hero__foot > *', { y: 24, opacity: 0, duration: 1.3, stagger: .14, ease: 'power2.out', delay: .9 });
      const holdHero = D ? holdThenCover(hero, () => 0) : null;
      // absolute range: the hold pin above shifts a 'top top' start on the same trigger to the end of the hold
      gsap.timeline({ scrollTrigger: { start: 0, end: () => vh(), scrub: true } })
        .to(hImg, { scale: D ? 1.0 : 1.04, ease: 'none', duration: 1 }, 0)
        .to('.hero__top', { y: () => vh() * .04, opacity: 0, ease: 'none', duration: .55 }, 0)      // the title settles and dims; it never rises under the bar
        .to('.hero__foot', { y: () => -vh() * .06, opacity: 0, ease: 'none', duration: .3 }, 0)
        .to({}, { duration: .45 }, .55);

      /* atelier: the images travel at different speeds, so the small ones cross the large one */
      if (D) $$('[data-speed]', at).forEach(el => {
        const sp = +el.dataset.speed;
        gsap.fromTo(el, { y: () => vh() * sp }, { y: () => -vh() * sp, ease: 'none', scrollTrigger: { trigger: at, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
        const im = $('img', el); if (im) gsap.fromTo(im, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: at, start: 'top bottom', end: 'bottom top', scrub: true } });
      });

      /* provenance: the photograph opens from a masked frame as it arrives, the car drifting inside it */
      if (D) {
        const clip = $('.psp__clip');
        gsap.fromTo(clip, { clipPath: 'inset(9% 7% 9% 7% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', ease: 'none', scrollTrigger: { trigger: '#provenance', start: 'top bottom', end: 'top top', scrub: true } });
        gsap.fromTo($('img', clip), { yPercent: -3 }, { yPercent: 3, ease: 'none', scrollTrigger: { trigger: '#provenance', start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.fromTo($('.gwd__ph img'), { yPercent: -3, scale: 1.06 }, { yPercent: 3, scale: 1.06, ease: 'none', scrollTrigger: { trigger: '#goodwood', start: 'top bottom', end: 'bottom top', scrub: true } });
      }

      /* ---------- one text-reveal system for every section ----------
         Kicker: a brief opacity fade. Title: each line rises out of its own clipping mask. Supporting copy:
         each block rises a few pixels as one readable block, after the title. Once per section; the timing
         is varied a little per section. Buttons, tabs and forms are never held back. */
      const SECT = [
        ['#programs', '.pg__line', { at: .18, gap: .07 }],
        ['#special-editions', '.pse__cap', { at: .12, gap: .06 }],
        ['#interlude', '', { at: 0, gap: 0 }],
        ['#goodwood', '.gwd__log li', { at: .2, gap: .06 }],
        ['#provenance', '.psp__spec, .psp__note', { at: .22, gap: .09 }],
        ['#news', '.nl__cap, .nr__t', { at: .16, gap: .08 }],
        ['#miami', '.ct__line', { at: .2, gap: 0 }]
      ];
      SECT.forEach(([sel, sup, o]) => {
        const sec = $(sel); if (!sec) return;
        const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 78%', once: true } });
        const k = $$('.kick', sec), t = $$('[data-lines]', sec), b = sup ? $$(sup, sec) : [];
        if (k.length) tl.from(k, { opacity: 0, duration: .9, ease: 'power1.out' }, 0);
        t.forEach((el, i) => tl.from(lines(el), { yPercent: 110, duration: 1.5, stagger: .14, ease: 'power3.out' }, .12 + i * .16));
        if (sel === '#interlude') tl.from(['.vi__line', '.vi__sub', '.vi__cta'], { y: 28, opacity: 0, duration: 1.4, stagger: .18, ease: 'power3.out', clearProps: 'transform,opacity' }, .2);
        if (b.length) tl.from(b, { y: 28, opacity: 0, duration: 1.2, stagger: o.gap * 1.6, ease: 'power2.out', clearProps: 'transform,opacity' }, o.at * 1.6 + .45);
      });

      /* ---------- the atelier entrance, once: eyebrow, the two masked lines, the paragraph, the two
         statistics (numerals rise from their own masks; the values never count), then the photographs:
         engine first, the carbon detail, then the key. Pointer depth starts when it has settled. */
      $$('.at__stats dd', at).forEach(dd => { if (!dd.querySelector('.mk')) dd.innerHTML = `<span class="mk"><span class="mk__in">${dd.innerHTML}</span></span>`; });
      const atl = gsap.timeline({ scrollTrigger: { trigger: at, start: 'top 72%', once: true },
        onComplete: () => { if (D && HOVER && !offDepth) offDepth = atelierDepth(); } });
      atl.from($('.kick', at), { opacity: 0, duration: .9, ease: 'power1.out' }, 0)
        .from(lines($('.at__stmt', at)), { yPercent: 110, duration: 1.6, stagger: .16, ease: 'power3.out' }, .15)
        .from($('.at__body', at), { y: 28, opacity: 0, duration: 1.2, ease: 'power2.out', clearProps: 'transform,opacity' }, .7)
        .from($$('.at__stats > div', at).map(x => $('.mk__in', x)), { yPercent: 105, duration: 1.4, stagger: .22, ease: 'power3.out' }, 1.0)
        .from($$('.at__stats dt', at), { opacity: 0, duration: 1, stagger: .22, ease: 'power1.out' }, 1.15)
        .from($('.at__key figcaption', at), { y: 24, opacity: 0, duration: 1.2, ease: 'power2.out', clearProps: 'transform,opacity' }, 1.5);
      [$('.at__big', at), $('.at__carbon', at), $('.at__key .ph', at)].forEach((f, i) =>
        atl.fromTo(f, { clipPath: 'inset(14% 0% 0% 0% round 20px)', opacity: 0 }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', opacity: 1, duration: 1.6, ease: 'power3.out', clearProps: 'clipPath,opacity' }, .3 + i * .32));

      /* ---------- pin-and-cover: the section holds at the top (or, if taller than the screen, at its end)
         while the next chapter slides over it. Programs under the special editions, Goodwood under
         Provenance, Provenance under News. Nothing is scrubbed; the atelier and the film are not pinned. */
      if (D) {
        gsap.fromTo('.vi__v', { scale: 1, opacity: 1 }, { scale: 1.06, opacity: .35, ease: 'none', scrollTrigger: { trigger: '#atelier', start: 'top bottom', end: 'top top', scrub: true } });
        gsap.fromTo('#atelier', { borderTopLeftRadius: 32, borderTopRightRadius: 32 }, { borderTopLeftRadius: 0, borderTopRightRadius: 0, ease: 'none', scrollTrigger: { trigger: '#atelier', start: 'top 80%', end: 'top top', scrub: true } });
      }
      const holds = D ? ['#programs', '#interlude', '#goodwood', '#provenance'].map(sel => {
        const sec = $(sel);
        return ScrollTrigger.create({ trigger: sec, start: () => sec.offsetHeight > innerHeight + 2 ? 'bottom bottom' : 'top top', end: () => '+=' + innerHeight, pin: true, pinSpacing: false, invalidateOnRefresh: true });
      }) : [];

      return () => { holdHero && holdHero.kill(); offDepth && offDepth(); holds.forEach(h => h.kill()); };
    });
  }

  /* ------------------------------------------------------------------ boot */
  function refreshUI() { curId = null; headerState(); }
  refreshUI();
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(() => { refreshUI(); MOTION && ScrollTrigger.refresh(); });
  let rT = 0; addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(refreshUI, 120); });
  if (MOTION) { motion(); addEventListener('load', () => { refreshUI(); ScrollTrigger.refresh(); }, { once: true }); }

  /* QA hook: the registration as rendered (positions read back from the laid-out images, not from the table) */
  window.__G = {
    select, REG, ST,
    measure() {
      const sr = stage.getBoundingClientRect();
      return ORDER.map(k => {
        const im = cars[k], r = REG[k], M = new DOMMatrix(getComputedStyle(im).transform);
        const cs = getComputedStyle(im), w = parseFloat(cs.width), h = parseFloat(cs.height), L = parseFloat(cs.left), T = parseFloat(cs.top), ox = r.f[0] * w, oy = r.f[1] * h;
        const map = (fx, fy) => { const x = fx * w - ox, y = fy * h - oy; const p = M.transformPoint(new DOMPoint(x, y)); return [L + ox + p.x, T + oy + p.y]; };
        const F = map(r.f[0], r.f[1]), R = map(r.r[0], r.r[1]);
        return { k, wheelbase: +(R[0] - F[0]).toFixed(2), floorFront: +F[1].toFixed(2), floorRear: +R[1].toFixed(2), stageW: +sr.width.toFixed(1), imgW: w };
      });
    }
  };
})();
