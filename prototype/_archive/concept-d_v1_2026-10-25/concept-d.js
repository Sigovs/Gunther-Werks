/* Gunther Werks Miami — Concept D prototype behaviour ("Billet & Gauge", UI-D.md).
   Interaction runs everywhere: header needle + tone, menu sheet, program drawer, collection switcher,
   timeline scale, application form. Motion is an enhancement added only after GSAP builds the scenes (G7).
   Desktop (>=1024, motion allowed): Lenis + ScrollTrigger and the pinned programs stage (the peak).
   Tablet / phone (motion allowed): the same moments without pins, no parallax.
   prefers-reduced-motion: the static composition; needles and digits jump. */
(() => {
  'use strict';
  const html = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const T = { press: 120, d1: 180, d2: 240, d3: 320, draw: 480, light: 900 };
  const SETTLE = 'cubic-bezier(.34,1.32,.64,1)', OUT = 'cubic-bezier(.25,.46,.45,.94)', IN = 'cubic-bezier(.55,0,1,.45)';
  let lenis = null;
  const scrollToEl = (el) => {
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.1 });
    else el.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth' });
  };
  const anim = (el, kf, o) => (reduce.matches ? null : el.animate(kf, o));

  /* ---------------------------------------------------------------- header: needle on the scale, tone under the band */
  const hdr = $('#hdr'), hdrIn = $('.hdr__in', hdr), needle = $('.hdr__needle', hdr);
  const spyMap = { top: null, programs: 'programs', collection: 'collection', commission: 'commission', build: 'commission', delivery: 'commission', story: null, track: null, provenance: 'provenance', news: 'news', begin: null, footer: null };
  let spyKey = null;
  const placeNeedle = (key) => {
    spyKey = key;
    $$('.nav a', hdr).forEach((a) => { if (a.dataset.spy === key) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    const a = key && $(`.nav a[data-spy="${key}"]`, hdr);
    if (!a || !a.offsetParent) { needle.style.setProperty('--o', 0); return; }
    const r = a.getBoundingClientRect(), nr = hdrIn.getBoundingClientRect();
    needle.style.setProperty('--x', `${Math.round(r.left + r.width / 2 - nr.left - 1)}px`);
    needle.style.setProperty('--o', 1);
  };
  const sections = Object.keys(spyMap).map((id) => document.getElementById(id)).filter(Boolean);
  const spyIO = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) placeNeedle(spyMap[e.target.id]); }), { rootMargin: '-48% 0px -50% 0px' });
  sections.forEach((s) => spyIO.observe(s));
  // tone: the section under the header band decides scrim + ink
  const toneIO = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) hdr.dataset.hd = e.target.dataset.hd || 'dark'; }), { rootMargin: '0px 0px -96% 0px' });
  $$('main > section, main > .programs, footer').forEach((s) => toneIO.observe(s));
  window.addEventListener('resize', () => placeNeedle(spyKey));
  const solid = () => hdr.classList.toggle('is-solid', (window.scrollY || document.documentElement.scrollTop) > 24);
  window.addEventListener('scroll', solid, { passive: true }); solid();

  /* ---------------------------------------------------------------- focus trap helper */
  const focusables = (root) => $$('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])', root).filter((el) => el.offsetParent !== null);
  const trap = (root) => (e) => {
    if (e.key !== 'Tab') return;
    const f = focusables(root); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  const setInert = (on, keep) => { [$('main'), $('footer'), hdr].forEach((el) => { if (el !== keep) el.inert = on; }); };

  /* ---------------------------------------------------------------- menu sheet */
  const menuBtn = $('.hdr__menu'), sheet = $('#sheet'), sheetPlate = $('.sheet__plate', sheet);
  const sheetTrap = trap(sheet);
  const openSheet = () => {
    sheet.hidden = false; menuBtn.setAttribute('aria-expanded', 'true'); setInert(true); if (lenis) lenis.stop();
    $$('.sheet__nav a', sheet).forEach((a) => { if (a.dataset.spy === spyKey) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    const cur = $('.sheet__nav a[aria-current]', sheet), sn = $('.sheet__needle', sheet);
    if (cur) { sn.style.setProperty('--y', `${cur.offsetTop + cur.offsetHeight / 2 - 1}px`); sn.style.setProperty('--o', 1); } else sn.style.setProperty('--o', 0);
    anim(sheetPlate, [{ transform: 'translateY(-100%)' }, { transform: 'translateY(2px)', offset: .85 }, { transform: 'translateY(0)' }], { duration: T.d3 + 60, easing: OUT });
    requestAnimationFrame(() => $('.sheet__nav a', sheet).focus()); document.addEventListener('keydown', sheetTrap);
  };
  const closeSheet = (toFocus = true) => {
    const done = () => { sheet.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); setInert(false); if (lenis) lenis.start(); document.removeEventListener('keydown', sheetTrap); if (toFocus) menuBtn.focus(); };
    const a = anim(sheetPlate, [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], { duration: T.d2, easing: IN });
    if (a) a.onfinish = done; else done();
  };
  menuBtn.addEventListener('click', openSheet);
  $('.sheet__close', sheet).addEventListener('click', () => closeSheet());
  sheet.addEventListener('click', (e) => { const a = e.target.closest('.sheet__nav a,.sheet__foot a[href^="#"]'); if (a) { e.preventDefault(); closeSheet(false); setTimeout(() => scrollToEl($(a.getAttribute('href'))), 30); } });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) closeSheet(); });

  /* ---------------------------------------------------------------- program details drawer */
  const PROG = {
    f26:   { i: 1, tier: 'Standard', logo: 'f26.webp', line: 'The future of analog power.', cta: 'Begin your F-26', rows: [['Production', '26 examples worldwide'], ['Engine', 'Twin-turbocharged 4.0 L Mezger flat-six, co-developed with Rothsport Racing'], ['Power', '1,000 hp @ 7,600 rpm'], ['Torque', '750 lb-ft @ 5,600 rpm'], ['Transmission', 'Six-speed manual, rear-wheel drive'], ['Body', 'Carbon-fibre panels and doors'], ['Chassis', '993 steel chassis with added bracing; wheelbase +30 mm rearward']], src: 'Sources: Gunther Werks F-26 release, 15 Aug 2025 · F-26 program page' },
    turbo: { i: 2, tier: 'Standard', logo: 'turbo.webp', line: 'Inspired by forced induction.', cta: 'Begin your Turbo', rows: [['Production', '75 examples worldwide'], ['Engine', 'Gunther Werks specified, Rothsport Racing built 4.0 L twin-turbo flat-six'], ['Transmission', 'Getrag six-speed manual'], ['Body', 'Carbon fenders, quarters, skirts, roof, hood, bumpers and wing']], src: 'Source: Gunther Werks Turbo program page' },
    gwr:   { i: 3, tier: 'Standard', logo: 'gwr.webp', line: 'The definitive 993.', cta: 'Begin your GWR', rows: [['Production', '40 examples'], ['Engine', '4.0 L quad-cam twin-valve flat-six, naturally aspirated, co-developed by GW and Rothsport'], ['Power', '500+ hp @ 9,000 rpm'], ['Torque', '340 lb-ft'], ['Weight', '2,400 lbs'], ['Transmission', 'Re-engineered Getrag G50 six-speed'], ['Body', 'Lightweight carbon fibre, S-duct hood']], src: 'Source: Gunther Werks GWR program page' },
    gwx:   { i: 4, tier: 'Experimental division', logo: 'gwx.webp', line: 'A true one-of-one masterpiece.', cta: 'Request an invitation', rows: [['Availability', 'By invitation only · one-of-one and few-off editions'], ['Engine', 'Second-generation GWX 4.0 L flat-six with sliding throttle plates'], ['Power', '440 hp'], ['Torque', '320 lb-ft'], ['Paint', 'Candy Purple, exclusive to GWX']], src: 'Sources: Gunther Werks GWX release, 13 Aug 2025 · GWX program page' },
  };
  const dimmer = $('#dimmer'), drawer = $('#drawer'), drTrap = trap(drawer);
  document.body.append(dimmer, drawer);                       // outside <main>, so making the page inert never reaches the drawer
  let drFrom = null;
  const openDrawer = (key, from) => {
    const d = PROG[key]; if (!d) return;
    drFrom = from;
    $('.drawer__logo', drawer).src = `assets/logos/${d.logo}`;
    $('.drawer__k', drawer).textContent = `Program 0${d.i} / 04 · ${d.tier}`;
    $('.drawer__h', drawer).textContent = d.line;
    $('.spec', drawer).innerHTML = d.rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
    $('.drawer__src', drawer).textContent = d.src;
    $('.drawer__foot .btn1__t', drawer).textContent = d.cta;
    dimmer.hidden = false; drawer.hidden = false; setInert(true); if (lenis) lenis.stop();
    const phone = window.matchMedia('(max-width:1023px)').matches;
    anim(drawer, [{ transform: phone ? 'translateY(100%)' : 'translateX(100%)' }, { transform: phone ? 'translateY(-2px)' : 'translateX(-2px)', offset: .85 }, { transform: 'none' }], { duration: T.d3 + 60, easing: OUT });
    anim(dimmer, [{ opacity: 0 }, { opacity: 1 }], { duration: T.d2, easing: OUT });
    requestAnimationFrame(() => $('.drawer__h', drawer).focus()); document.addEventListener('keydown', drTrap);
  };
  const closeDrawer = () => {
    const phone = window.matchMedia('(max-width:1023px)').matches;
    const done = () => { drawer.hidden = true; dimmer.hidden = true; setInert(false); if (lenis) lenis.start(); document.removeEventListener('keydown', drTrap); if (drFrom) drFrom.focus(); };
    const a = anim(drawer, [{ transform: 'none' }, { transform: phone ? 'translateY(100%)' : 'translateX(100%)' }], { duration: T.d2, easing: IN });
    anim(dimmer, [{ opacity: 1 }, { opacity: 0 }], { duration: T.d2, easing: IN });
    if (a) a.onfinish = done; else done();
  };
  $$('[data-drawer]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); openDrawer(a.dataset.drawer, a); }));
  $('.drawer__close', drawer).addEventListener('click', closeDrawer);
  dimmer.addEventListener('click', closeDrawer);
  $('.drawer__foot a', drawer).addEventListener('click', (e) => { e.preventDefault(); closeDrawer(); setTimeout(() => scrollToEl($('#begin')), 280); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) closeDrawer(); });

  /* ---------------------------------------------------------------- odometer */
  const rollOdo = (odo, value) => {
    const digits = String(value).padStart(2, '0').split('');
    $$('.odo__d', odo).forEach((slot, k) => {
      const sp = slot.firstElementChild; if (sp.textContent === digits[k]) return;
      sp.getAnimations().forEach((x) => x.cancel());
      sp.textContent = digits[k];
      if (!reduce.matches) sp.animate([{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], { duration: T.d2, easing: SETTLE, delay: (digits.length - 1 - k) * 40, fill: 'backwards' });
    });
  };

  /* ---------------------------------------------------------------- collection: the thumbnail row is the switcher */
  const COL = {
    gxr:       { img: 'col-gxr.webp',       th: 'th-gxr.webp',       logo: 'gxr-dark.webp',       name: 'GXR-EVO',         href: 'https://guntherwerks.com/programs/special-editions/gxr-evo/', alt: 'Gunther Werks GXR-EVO in exposed carbon with bronze wheels, side profile', badges: [['Track focused', 'red'], ['455 hp · Limited to 15']], line: 'The fastest naturally aspirated car in Gunther Werks’ history.' },
    brundle:   { img: 'col-brundle.webp',   th: 'th-brundle.webp',   logo: 'brundle-dark.webp',   name: 'Brundle Edition', href: 'https://guntherwerks.com/programs/special-editions/brundle-edition/', alt: 'Gunther Werks Brundle Edition Turbo in blue and white pearl, side profile', badges: [['Special edition'], ['860 hp · Limited to 5']], line: 'A two-tone pearl livery inspired by Martin Brundle’s crash helmet.' },
    thermal:   { img: 'col-thermal.webp',   th: 'th-thermal.webp',   logo: 'thermal-red.svg',     name: 'Thermal Edition', href: 'https://guntherwerks.com/programs/special-editions/thermal-edition/', alt: 'Gunther Werks Thermal Edition Turbo in white with red pinstripes, side profile', badges: [['Special edition'], ['850 bhp · Limited to 5']], line: 'A tribute to Gunther Werks and The Thermal Club.' },
    endgame:   { img: 'col-endgame.webp',   th: 'th-endgame.webp',   logo: 'endgame-dark.webp',   name: 'End Game Turbo',  href: 'https://guntherwerks.com/commissions/turbo/project-end-game/', alt: 'Project End Game, a deep red Gunther Werks Turbo Speedster, side profile', badges: [['1 of 1'], ['Completed commission']], line: 'The final Speedster, and the first one-of-one from GWX.' },
    speedster: { img: 'col-speedster.webp', th: 'th-speedster.webp', logo: 'speedster-dark.webp', name: 'Speedster',       href: 'https://guntherwerks.com/programs/speedster/', alt: 'Gunther Werks Speedster in light blue, side profile', badges: [['Completed – Legacy Program'], ['Limited to 25']], line: 'Open air emotion.' },
    coupe:     { img: 'col-coupe.webp',     th: 'th-coupe.webp',     logo: 'coupe-dark.webp',     name: 'Coupe',           href: 'https://guntherwerks.com/programs/coupe/', alt: 'Gunther Werks Coupe in magenta, side profile', badges: [['Completed – Legacy Program'], ['Limited to 25']], line: 'Pure form.' },
  };
  const ORDER = Object.keys(COL);
  const col = $('#collection');
  const colFig = $('.col__car', col), colImg = $('.col__img', col), colRefl = $('.col__refl', col), colSheen = $('.col__sheen', col);
  const nbL = $('.col__nb--l', col), nbR = $('.col__nb--r', col), colId = $('.col__id', col);
  const tabs = $$('.tier', col), colSw = $('.sw--cars', col);
  ORDER.forEach((k) => { const i = new Image(); i.src = `assets/${COL[k].img}`; });
  let colKey = 'gxr', colRun = 0;
  const sheen = () => { if (reduce.matches) return; colSheen.classList.remove('is-run'); void colSheen.offsetWidth; colSheen.classList.add('is-run'); };
  const selectCar = (key, focus) => {
    const idx = ORDER.indexOf(key); if (idx < 0) return;
    tabs.forEach((b, k) => { const on = k === idx; b.classList.toggle('is-on', on); b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
    colSw.style.setProperty('--i', idx);
    if (focus) tabs[idx].focus();
    if (key === colKey) return;
    const dir = idx > ORDER.indexOf(colKey) ? 1 : -1; colKey = key;
    const d = COL[key];
    const swap = () => {
      colImg.src = colRefl.src = `assets/${d.img}`; colImg.alt = d.alt;
      colSheen.style.setProperty('--m', `url(assets/${d.img})`);
      const nm = $('.col__name img', colId); nm.src = `assets/logos/${d.logo}`; nm.alt = d.name;
      $('.badges', colId).innerHTML = d.badges.map(([t, c]) => `<span class="badge${c ? ' badge--' + c : ''}">${t}</span>`).join('');
      $('.col__line', colId).textContent = d.line;
      const go = $('.col__go', colId); go.href = d.href; $('.go__t', go).textContent = `Explore the ${d.name}`;
      nbL.src = `assets/${COL[ORDER[(idx - 1 + ORDER.length) % ORDER.length]].th}`;
      nbR.src = `assets/${COL[ORDER[(idx + 1) % ORDER.length]].th}`;
    };
    if (reduce.matches) { swap(); return; }
    const run = ++colRun;
    colFig.getAnimations().forEach((a) => a.cancel());
    const out = colFig.animate([{ opacity: 1, translate: '0 0' }, { opacity: 0, translate: `${-dir * 24}px 0` }], { duration: T.d2, easing: IN, fill: 'forwards' });
    colId.animate([{ opacity: 1 }, { opacity: 0 }], { duration: T.d1, fill: 'forwards' });
    out.onfinish = () => {
      if (run !== colRun) return;
      swap();
      colImg.style.transition = 'none'; colImg.style.filter = 'grayscale(1)';      // the colour resolves through a feathered transition, once the car is set
      colFig.animate([{ opacity: 0, translate: `${dir * 32}px 0` }, { opacity: 1, translate: '0 0' }], { duration: T.d3, easing: OUT, fill: 'forwards' });
      colId.animate([{ opacity: 0 }, { opacity: 1 }], { duration: T.d3, easing: OUT, fill: 'forwards' });
      colRefl.animate([{ opacity: 0 }, { opacity: .08 }], { duration: T.light, easing: OUT });
      requestAnimationFrame(() => requestAnimationFrame(() => { colImg.style.transition = ''; colImg.style.filter = ''; }));
      setTimeout(sheen, T.d3 + 120);
    };
  };
  tabs.forEach((b, k) => {
    b.addEventListener('click', () => selectCar(b.dataset.key));
    b.addEventListener('keydown', (e) => {
      const n = { ArrowRight: k + 1, ArrowLeft: k - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (n === undefined) return; e.preventDefault();
      selectCar(ORDER[(n + tabs.length) % tabs.length], true);
    });
  });
  new IntersectionObserver((en, ob) => { if (en[0].isIntersecting) { setTimeout(sheen, 400); ob.disconnect(); } }, { threshold: .6 }).observe(colFig);

  /* ---------------------------------------------------------------- our story: the timeline scale */
  const MS = [
    { y: 2017, m: 8, img: 'ms-2017.jpg', date: 'Aug 2017', line: 'The first program, launched as the 400R at The Quail. 25 examples.' },
    { y: 2025, m: 8, img: 'ms-2025a.jpg', date: 'Aug 2025', line: 'F-26 revealed. Limited to 26 examples worldwide.' },
    { y: 2025, m: 10, img: 'ms-2025b.jpg', date: 'Oct 2025', line: 'The final Speedster delivered; the warranty made retroactive.' },
    { y: 2026, m: 7, img: 'ms-2026a.jpg', date: 'Jul 2026', line: 'F-26 and Turbo on the hill at Goodwood Festival of Speed.' },
    { y: 2026, m: 8, img: 'ms-2026b.jpg', date: 'Aug 2026', line: 'GXR-EVO revealed at The Quail. 15 units.' },
    { y: 2026, m: 10, img: 'ms-2026c.jpg', date: 'Oct 2026', line: 'Brundle Edition announced. Five examples.' },
  ];
  const tl = $('[data-tl]'), tlScale = $('.tl__scale', tl), tlNeedle = $('.tl__needle', tl);
  // a broken axis: 2017–2018 at a tenth of the width, a cut, then 2024–2026 where five of six milestones sit
  const pos = (y, m) => { const v = y + (m - .5) / 12; return v < 2019 ? (v - 2017) * .1 : .25 + (v - 2024) * .25; };
  [2017, 2018, 2024, 2025, 2026].forEach((y) => {
    const t = document.createElement('span'); t.className = 'tl__yr'; t.style.left = `${pos(y, .5) * 100}%`;
    t.innerHTML = `<span class="stamp">${y}</span>`; t.setAttribute('aria-hidden', 'true'); tlScale.appendChild(t);
  });
  const brk = document.createElement('span'); brk.className = 'tl__brk'; brk.style.left = '22.5%'; brk.setAttribute('aria-hidden', 'true'); tlScale.appendChild(brk);
  MS.forEach((m) => { const t = document.createElement('span'); t.className = 'tl__tick'; t.style.left = `${pos(m.y, m.m) * 100}%`; t.setAttribute('aria-hidden', 'true'); tlScale.appendChild(t); });
  const years = [...new Set(MS.map((m) => m.y))];
  const yrBtns = years.map((y) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'tl__ms'; b.textContent = y;
    const first = MS.findIndex((m) => m.y === y);
    b.style.left = `${pos(y, MS.filter((m) => m.y === y).reduce((a, m) => a + m.m, 0) / MS.filter((m) => m.y === y).length) * 100}%`;
    b.setAttribute('aria-label', `${y}: show the first milestone of the year`);
    b.addEventListener('click', () => showMs(first));
    tlScale.appendChild(b); return b;
  });
  let msI = 0;
  const showMs = (i) => {
    msI = (i + MS.length) % MS.length; const m = MS[msI];
    tlNeedle.style.setProperty('--p', pos(m.y, m.m).toFixed(4));
    yrBtns.forEach((b, k) => b.setAttribute('aria-pressed', String(years[k] === m.y)));
    const ph = $('.tl__ph img', tl), apply = () => { ph.src = `assets/${m.img}`; $('.tl__date', tl).textContent = `${m.date} · ${msI + 1} / ${MS.length}`; $('.tl__line', tl).textContent = m.line; };
    if (reduce.matches) { apply(); return; }
    const p = $('.tl__panel', tl); const a = p.animate([{ opacity: 1 }, { opacity: 0 }], { duration: T.d1, easing: IN, fill: 'forwards' });
    a.onfinish = () => { apply(); p.animate([{ clipPath: 'inset(0 0 100% 0)', opacity: 1 }, { clipPath: 'inset(0)', opacity: 1 }], { duration: T.d3, easing: OUT, fill: 'forwards' }); };
  };
  $$('.tl__step [data-step]', tl).forEach((b) => b.addEventListener('click', () => showMs(msI + Number(b.dataset.step))));
  tl.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); showMs(msI + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); showMs(msI - 1); } });
  showMs(0);

  /* ---------------------------------------------------------------- the owner's application */
  const form = $('.form'), done = $('.form__done'), note = $('.form__note', form), submit = $('button[type=submit]', form);
  const det = $('.detent', form);
  $$('input[name=tr]', det).forEach((r) => r.addEventListener('change', () => det.style.setProperty('--i', r.value)));
  const setErr = (f, msg) => { const el = $('input,select', f), err = $('.f__err', f); f.classList.toggle('is-bad', !!msg); err.textContent = msg ? `Error: ${msg}` : ''; el.setAttribute('aria-invalid', msg ? 'true' : 'false'); };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let first = null;
    $$('.f', form).forEach((f) => {
      const el = $('input,select', f); if (!$('.f__err', f)) return;
      let msg = '';
      if (el.required && !el.value.trim()) msg = 'this field is required.';
      else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) msg = 'enter a valid email address.';
      else if (el.type === 'tel' && el.value.replace(/\D/g, '').length < 7) msg = 'enter a phone number.';
      setErr(f, msg); if (msg && !first) first = el;
    });
    const consent = $('#f-consent'), cErr = $('#e-consent');
    cErr.textContent = consent.checked ? '' : 'Error: please agree to be contacted about your application.';
    consent.setAttribute('aria-invalid', consent.checked ? 'false' : 'true');
    if (!consent.checked && !first) first = consent;
    if (first) { first.focus(); note.classList.add('is-err'); note.textContent = 'Please correct the highlighted fields. Your answers are kept.'; return; }
    note.classList.remove('is-err');
    // loading: the needle swings in the button; a prototype has no endpoint, so the request resolves locally
    submit.classList.add('is-busy'); submit.setAttribute('aria-disabled', 'true'); submit.style.minWidth = `${submit.offsetWidth}px`;
    $('.btn1__t', submit).textContent = 'Sending'; note.textContent = 'Sending to Javier Roque…';
    const timeout = setTimeout(() => fail(), 10000);
    const fail = () => { submit.classList.remove('is-busy'); submit.removeAttribute('aria-disabled'); $('.btn1__t', submit).textContent = 'Send to Javier Roque'; note.classList.add('is-err'); note.textContent = 'Error: the application could not be sent. Your answers are kept — try again, or call (305) 783-6493.'; };
    setTimeout(() => { clearTimeout(timeout); form.hidden = true; done.hidden = false; done.focus(); }, 1200);
  });
  submit.addEventListener('click', (e) => { if (submit.getAttribute('aria-disabled') === 'true') e.preventDefault(); });
  $$('.f input', form).forEach((el) => el.addEventListener('input', () => { const f = el.closest('.f'); if (f.classList.contains('is-bad') && el.value.trim()) setErr(f, ''); }));

  /* ---------------------------------------------------------------- in-page links */
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    if (a.closest('#sheet') || a.closest('.programs .sw') || a.getAttribute('href').length < 2) return;
    const t = $(a.getAttribute('href')); if (!t) return;
    e.preventDefault(); scrollToEl(t);
  }));
  $$('.programs .sw__i').forEach((a) => a.addEventListener('click', (e) => { if (html.classList.contains('mo-stage')) return; e.preventDefault(); scrollToEl($(a.getAttribute('href'))); }));

  /* ================================================================ MOTION */
  const start = () => {
    if (!window.gsap || !window.ScrollTrigger) return;          // without the library the static page stands
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const splitLines = (el) => {
      if (el.dataset.split) return $$('.ln-m > span', el);
      const parts = $$('.ln', el).length ? $$('.ln', el) : [el];
      const out = [];
      parts.forEach((p) => {
        const words = p.textContent.trim().split(/\s+/);
        p.innerHTML = words.map((w) => `<span class="w" style="display:inline-block">${w}</span>`).join(' ');
        const lines = []; let top = null;
        $$('.w', p).forEach((w) => { if (w.offsetTop !== top) { lines.push([]); top = w.offsetTop; } lines[lines.length - 1].push(w.textContent); });
        p.innerHTML = lines.map((l) => `<span class="ln-m"><span>${l.join(' ')}</span></span>`).join('');
        out.push(...$$('.ln-m > span', p));
      });
      el.dataset.split = '1';
      return out;
    };
    const setScale = (sw, v) => {
      sw.style.setProperty('--i', v.toFixed(3));
      const r = Math.round(v);
      $$('.sw__i', sw).forEach((li, k) => { li.classList.toggle('is-past', k < r); li.classList.toggle('is-on', k === r); if (k === r) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
    };

    /* ---------- DESKTOP ---------- */
    mm.add('(min-width:1024px) and (prefers-reduced-motion: no-preference)', () => {
      lenis = new window.Lenis({ autoRaf: false, lerp: .1 });
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
      window.__lenis = lenis;

      // hero: the statement is cut in; the photograph drifts as the page leaves it
      const hero = $('#top');
      gsap.timeline()
        .from($('.hero__img'), { opacity: 0, duration: 1.2, ease: 'power2.out' }, 0)
        .from(splitLines($('.hero__h1')), { yPercent: 106, duration: .9, ease: 'power4.out', stagger: .09 }, .15)
        .from($('.hero__k'), { opacity: 0, duration: .4 }, .1);
      gsap.to($('.hero__frame'), { yPercent: 8, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });

      // THE PEAK — one stage: the cove goes dark, the silhouettes change places, the next cove is re-lit,
      // GW's logotype settles behind a car that does not move; the needle follows scroll, the odometer rolls on each station.
      const wrap = $('#programs'), layers = $$('.prog', wrap), N = layers.length;
      html.classList.add('mo', 'mo-stage');
      const L = layers.map((el) => ({ el, cove: $('.prog__cove', el), car: $('.prog__car', el), sil: $('.prog__sil', el), name: $('.prog__name', el), data: $('.prog__data', el), say: $('.prog__say', el), cta: $('.prog__cta', el), more: $('.prog__more', el), odo: $('.odo', el) }));
      // every rest position is a lit, composed program: the first is lit on arrival; each change is a short re-light
      // of the next cove ON TOP of the lit previous one (lit → lit), with a brief dip of the old light (≤ 12% of a span)
      L.forEach((l, i) => {
        gsap.set(l.el, { autoAlpha: i === 0 ? 1 : 0 });
        gsap.set(l.sil, { display: 'none' });
        if (i) { gsap.set([l.cove, l.car], { opacity: 0 }); gsap.set(l.name, { opacity: 0, yPercent: 14 }); gsap.set([l.data, l.say, l.cta, l.more], { opacity: 0 }); }
      });
      const odo = L[0].odo; L.forEach((l, i) => { if (i) l.odo.style.visibility = 'hidden'; });
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      const HOLD = 1, X = .36;                                    // span per program = HOLD + X; X is the change
      const settle = [HOLD / 2];
      const pi = { v: 0 };
      let t = HOLD;
      for (let i = 1; i < N; i++) {
        const o = L[i - 1], n = L[i];
        tl.to([o.data, o.say, o.cta, o.more], { opacity: 0, duration: .1 }, t)
          .to([o.cove, o.car], { opacity: .72, duration: .06 }, t)                         // the old light dips
          .to(o.name, { opacity: 0, duration: .06 }, t)                                     // one logotype at a time
          .set(n.el, { autoAlpha: 1 }, t + .04)
          .to(n.cove, { opacity: 1, duration: .16 }, t + .05)                              // the next cove is re-lit over it
          .to(n.car, { opacity: 1, duration: .16 }, t + .08)
          .to(n.name, { opacity: 1, yPercent: 0, duration: .22, ease: 'power2.out' }, t + .1)
          .to([n.data, n.say, n.cta, n.more], { opacity: 1, duration: .1 }, t + .24)
          .set(o.el, { autoAlpha: 0 }, t + X)
          .set([o.cove, o.car, o.name], { opacity: 1 }, t + X)
          .to(pi, { v: i, duration: X, onUpdate: () => wrap.style.setProperty('--pi', pi.v.toFixed(3)) }, t);
        t += X + HOLD;
        settle.push(t - HOLD / 2);
      }
      let station = 0;
      const st = ScrollTrigger.create({
        trigger: wrap, start: 'top top', end: () => `+=${Math.round(tl.duration() * innerHeight * .8)}`,
        pin: true, scrub: true, animation: tl, anticipatePin: 1,
        onUpdate: (self) => {
          const tt = self.progress * tl.duration();
          let s = 0; settle.forEach((x, k) => { if (tt >= x - HOLD / 2 - X / 2) s = k; });
          if (s !== station) { station = s; rollOdo(odo, s + 1); }
        },
      });
      odo.parentElement !== wrap && wrap.appendChild(odo); odo.style.visibility = '';
      $$('.sw__i', wrap).forEach((a) => a.addEventListener('click', (e) => {
        e.preventDefault();
        const k = $$('.sw__i', a.parentElement).indexOf(a);
        lenis.scrollTo(st.start + (settle[k] / tl.duration()) * (st.end - st.start), { duration: 1.4 });
      }));

      // section statements: cut in line by line as each chapter arrives
      $$('.dl').forEach((el) => {
        if (el.closest('.programs')) return;
        gsap.from(splitLines(el), { yPercent: 106, duration: .9, ease: 'power4.out', stagger: .08, scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
      });

      // commission 01–03: the plate holds; the needle advances station by station and each step is read in turn
      const com = $('#commission'), sw1 = $('.sw--steps', com), steps = $$('.step', com);
      gsap.to($('.com1__bg', com), { yPercent: 6, ease: 'none', scrollTrigger: { trigger: com, start: 'top bottom', end: 'bottom top', scrub: true } });
      const sv = { v: -.5 }; setScale(sw1, sv.v);
      gsap.set(steps, { opacity: .32 });
      const ctl = gsap.timeline({ defaults: { ease: 'none' } });
      steps.forEach((s, k) => {
        ctl.to(sv, { v: k, duration: .5, onUpdate: () => setScale(sw1, sv.v) }, k * .8)
          .to(s, { opacity: 1, duration: .3 }, k * .8 + .25);
        if (k) ctl.to(steps[k - 1], { opacity: .56, duration: .3 }, k * .8 + .25);
      });
      ctl.to(steps, { opacity: 1, duration: .3 }, '+=.1');
      ScrollTrigger.create({ trigger: com, start: 'top top', end: () => `+=${Math.round(innerHeight * 1.1)}`, pin: true, scrub: true, animation: ctl });

      // 04 the build: the needle moves on; the frames arrive at different heights, images drift inside them
      const bSw = $('#build .sw--steps'), bv = { v: 2 }; setScale(bSw, 2);
      gsap.to(bv, { v: 3, ease: 'none', onUpdate: () => setScale(bSw, bv.v), scrollTrigger: { trigger: '#build', start: 'top 70%', end: 'top 30%', scrub: true } });
      $$('#build .pillars li').forEach((li, k) => {
        gsap.from(li, { y: [60, 120, 90, 140, 80, 110][k], ease: 'none', scrollTrigger: { trigger: '#build', start: 'top bottom', end: 'top 15%', scrub: true } });
        gsap.fromTo($('img', li), { yPercent: -5, scale: 1.12 }, { yPercent: 5, scale: 1.12, ease: 'none', scrollTrigger: { trigger: li, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      // 05–06: the needle to 05, then 06; images drift in their frames
      const dSw = $('#delivery .sw--steps'), dv = { v: 3 }; setScale(dSw, 3);
      gsap.to(dv, { v: 5, ease: 'none', onUpdate: () => setScale(dSw, dv.v), scrollTrigger: { trigger: '#delivery', start: 'top 80%', end: 'top 10%', scrub: true } });
      $$('#delivery .deliv__ph > img:first-child').forEach((im) => gsap.fromTo(im, { yPercent: -5, scale: 1.12 }, { yPercent: 5, scale: 1.12, ease: 'none', scrollTrigger: { trigger: im.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
      gsap.fromTo($('#story .story__key img'), { yPercent: -5, scale: 1.12 }, { yPercent: 5, scale: 1.12, ease: 'none', scrollTrigger: { trigger: '#story', start: 'top bottom', end: 'bottom top', scrub: true } });
      // Goodwood opens out as it arrives
      gsap.fromTo($('#track .track__img'), { scale: 1.16 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '#track', start: 'top bottom', end: 'top top', scrub: true } });

      // footer: GW's tagline drum rolls once — innovation, then pleasure
      const drum = $('.foot__drum');
      drum.insertAdjacentHTML('afterbegin', '<span aria-hidden="true">innovation.</span>');
      gsap.set($$('span', drum), { yPercent: 0 });
      ScrollTrigger.create({ trigger: '#footer', start: 'top 60%', once: true, onEnter: () => gsap.to($$('span', drum), { yPercent: -100, duration: .7, ease: 'back.out(1.6)', delay: .3 }) });

      return () => {
        gsap.ticker.remove(tick); lenis.destroy(); lenis = null; window.__lenis = null;
        html.classList.remove('mo', 'mo-stage'); wrap.style.removeProperty('--pi');
        const extra = $('span[aria-hidden]', drum); if (extra) extra.remove();
      };
    });

    /* ---------- TABLET / PHONE: the same moments, no pins, no parallax ---------- */
    mm.add('(max-width:1023px) and (prefers-reduced-motion: no-preference)', () => {
      html.classList.add('mo', 'mo-m');
      gsap.from(splitLines($('.hero__h1')), { yPercent: 106, duration: .9, ease: 'power4.out', stagger: .09, delay: .15 });
      $$('.prog').forEach((el) => {
        gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
          .from($('.prog__cove', el), { opacity: .35, duration: .9, ease: 'power2.out' }, 0)
          .from($('.prog__name', el), { opacity: 0, yPercent: 14, duration: .7, ease: 'power2.out' }, .1);
      });
      $$('.dl').forEach((el) => gsap.from(splitLines(el), { yPercent: 106, duration: .8, ease: 'power4.out', stagger: .07, scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
      const sw1 = $('#commission .sw--steps');
      $$('#commission .step').forEach((s, k) => ScrollTrigger.create({ trigger: s, start: 'top 80%', once: true, onEnter: () => setScale(sw1, k) }));
      setScale(sw1, 0);
      return () => { html.classList.remove('mo', 'mo-m'); };
    });

    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  };
  document.fonts.ready.then(start);
})();
