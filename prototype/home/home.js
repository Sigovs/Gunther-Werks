/* deslop-ignore-file 06 — the radial is the program's studio light behind a pulled-out car, not atmosphere */
/* Gunther Werks Miami — home prototype v2.
   The static page is complete without this file. With motion allowed, it adds: Lenis smooth scroll,
   House Lights (scrubbed), the line-up "pull it out" inspection (hover / focus / tap / scroll steps),
   the atelier window opening to the room, the special-edition track, the Goodwood film with its story,
   stacked ownership screens, the Provenance walk-around, overlaps, parallax and masked type reveals. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  let lenis = null;

  /* ------------------------------------------------------------ header: always present */
  const head = $('#head');
  // the bar takes the tone of what is under it: dark over dark chapters, light (#F5F5F5, dark ink) over the plates
  const hlRefTone = { light: false };
  const onScrollHead = () => {
    head.classList.toggle('is-solid', scrollY > 24);
    const y = head.offsetHeight + 1;
    let light = false;
    if (window.__hlLight && window.__hlLight()) light = true;
    else document.querySelectorAll('[data-tone="light"]').forEach(s => { const r = s.getBoundingClientRect(); if (r.top <= y && r.bottom > y) light = true; });
    head.classList.toggle('is-light', light && scrollY > 24);
  };
  addEventListener('scroll', onScrollHead, { passive: true });
  onScrollHead();

  /* ------------------------------------------------------------ menu */
  const menu = $('#menu');
  const menuBtn = $('.menu-btn');
  function openMenu() {
    menu.hidden = false; menuBtn.setAttribute('aria-expanded', 'true');
    root.style.overflow = 'hidden'; if (lenis) lenis.stop();
    requestAnimationFrame(() => $('.menu-links a', menu).focus());
  }
  function closeMenu(restore = true) {
    if (menu.hidden) return;
    menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false');
    root.style.overflow = ''; if (lenis) lenis.start();
    if (restore) menuBtn.focus();
  }
  menuBtn.addEventListener('click', openMenu);
  $('.menu-close', menu).addEventListener('click', () => closeMenu());
  menu.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return; }
    if (e.key !== 'Tab') return;
    const f = $$('a, button', menu).filter(el => el.offsetParent !== null);
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });
  $$('a[href^="#"]', menu).forEach(a => a.addEventListener('click', () => closeMenu(false)));

  /* ------------------------------------------------------------ enquiry form */
  const form = $('#form'), sent = $('#sent'), status = $('.form-status', form);
  const submit = $('button[type="submit"]', form), label = $('.btn-label', submit), interest = $('#f-interest');
  const fields = {
    name: { el: $('#f-name'), err: $('#e-name'), ok: v => v.trim().length > 1 },
    email: { el: $('#f-email'), err: $('#e-email'), ok: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) },
    message: { el: $('#f-msg'), err: $('#e-msg'), ok: v => v.trim().length > 1 }
  };
  const check = f => { const good = f.ok(f.el.value); f.el.setAttribute('aria-invalid', good ? 'false' : 'true'); f.err.hidden = good; return good; };
  Object.values(fields).forEach(f => {
    f.el.addEventListener('blur', () => { if (f.el.value !== '' || f.el.getAttribute('aria-invalid') === 'true') check(f); });
    f.el.addEventListener('input', () => { if (f.el.getAttribute('aria-invalid') === 'true') check(f); });
  });
  $$('[data-interest]').forEach(a => a.addEventListener('click', () => { interest.value = a.dataset.interest; }));
  const forceError = /[?&]form=error\b/.test(location.search);
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (form.getAttribute('aria-busy') === 'true') return;
    const bad = Object.values(fields).filter(f => !check(f));
    if (bad.length) { status.classList.remove('is-error'); status.textContent = bad.length === 1 ? 'One field needs attention.' : `${bad.length} fields need attention.`; bad[0].el.focus(); return; }
    form.setAttribute('aria-busy', 'true'); submit.disabled = true; label.textContent = 'Sending…';
    status.classList.remove('is-error'); status.textContent = 'Sending your enquiry to Javier Roque.';
    setTimeout(() => {   // mockup: no backend; always resolves or fails, never spins forever
      form.removeAttribute('aria-busy'); submit.disabled = false;
      if (forceError) {
        label.textContent = 'Try again'; status.classList.add('is-error');
        status.innerHTML = '<b>Not sent.</b> Your details are still here — please try again, or call <a href="tel:+13057836493">(305) 783-6493</a>.';
        return;
      }
      label.textContent = 'Send to Javier Roque'; status.textContent = '';
      $('#sent-sum').textContent = `Interest: ${interest.value} · Reply address: ${fields.email.el.value.trim()}`;
      form.hidden = true; sent.hidden = false; sent.focus();
    }, 1400);
  });
  $('#sent-again').addEventListener('click', () => {
    form.reset(); Object.values(fields).forEach(f => { f.el.removeAttribute('aria-invalid'); f.err.hidden = true; });
    sent.hidden = true; form.hidden = false; fields.name.el.focus();
  });

  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  /* ------------------------------------------------------------ pointer label + image peek (fine pointers only) */
  const cursor = $('#cursor'), peek = $('#peek'), peekImg = $('img', peek);
  if (fine.matches && !reduce.matches) {
    const cx = gsap.quickTo(cursor, 'x', { duration: .45, ease: 'power3.out' }), cy = gsap.quickTo(cursor, 'y', { duration: .45, ease: 'power3.out' });
    const px = gsap.quickTo(peek, 'x', { duration: .6, ease: 'power3.out' }), py = gsap.quickTo(peek, 'y', { duration: .6, ease: 'power3.out' });
    addEventListener('pointermove', e => { cx(e.clientX); cy(e.clientY); px(e.clientX); py(e.clientY); }, { passive: true });
    let cursorOn = false;
    document.addEventListener('pointerover', e => {
      const car = e.target.closest('.hl.is-lit .car');
      const on = !!car;
      if (on === cursorOn) return;
      cursorOn = on;
      gsap.to(cursor, { opacity: on ? 1 : 0, scale: on ? 1 : .4, duration: .4, ease: 'power3.out', overwrite: 'auto' });
    });
    $$('[data-peek]').forEach(a => {
      a.addEventListener('pointerenter', () => {
        peekImg.src = a.dataset.peek; peek.classList.toggle('is-cut', a.hasAttribute('data-peek-cut'));
        gsap.fromTo(peek, { opacity: 0, scale: .86, rotate: -2 }, { opacity: 1, scale: 1, rotate: 0, duration: .55, ease: 'expo.out', overwrite: 'auto' });
      });
      a.addEventListener('pointerleave', () => gsap.to(peek, { opacity: 0, scale: .92, duration: .3, ease: 'power2.in', overwrite: 'auto' }));
    });
  }

  if (reduce.matches) return;   // reduced motion: the static page, resting state, no Lenis

  /* ------------------------------------------------------------ Lenis, wired into ScrollTrigger on one ticker */
  if (window.Lenis) {
    lenis = new Lenis({ lerp: .09, smoothWheel: true, anchors: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollToY = (y, immediate) => lenis ? lenis.scrollTo(y, { immediate: !!immediate, duration: 1.4 }) : scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
  const hlRef = { pin: null, at: 0 };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const t = id ? document.getElementById(id) : null;
    if (!t) return;
    e.preventDefault();
    closeMenu(false);
    let y = t.getBoundingClientRect().top + scrollY;
    if (id === 'programs' && hlRef.pin) y = hlRef.pin.start + (hlRef.pin.end - hlRef.pin.start) * hlRef.at;
    if (id === 'top') y = 0;
    scrollToY(y);
    history.replaceState(null, '', '#' + id);
  });

  /* ------------------------------------------------------------ masked line splitting */
  function split(el) {
    if (el.dataset.split === 'done') return $$('.ln-i', el);
    const parts = [];
    el.childNodes.forEach(n => {
      if (n.nodeType === 3) n.textContent.split(/(\s+)/).forEach(t => { if (!t) return; parts.push(/^\s+$/.test(t) ? ' ' : `<span class="w">${t.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`); });
      else if (n.nodeName === 'BR') parts.push('<br>');
      else parts.push(`<span class="w">${n.outerHTML}</span>`);
    });
    el.innerHTML = parts.join('');
    const lines = [];
    let top = null;
    $$('.w', el).forEach(w => { const t = w.offsetTop; if (top === null || Math.abs(t - top) > 4) { lines.push([]); top = t; } lines[lines.length - 1].push(w.innerHTML); });
    el.innerHTML = lines.map(l => `<span class="ln"><span class="ln-i">${l.join(' ')}</span></span>`).join('');
    el.dataset.split = 'done';
    return $$('.ln-i', el);
  }

  const mm = gsap.matchMedia();
  const ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();

  ready.then(() => {
    mm.add({
      desk: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      phone: '(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)'
    }, ctx => {
      const desk = ctx.conditions.desk;
      root.classList.toggle('is-desk', desk);
      // created in page order, so every pin's spacing is known to the triggers below it
      if (desk) { $('#atelier').style.marginTop = '-50svh'; $('#world').style.marginTop = '-54svh'; }
      const off = [houseLights(desk)];
      if (desk) off.push(atelier(), editions(), rails());
      off.push(goodwood(desk), ownership(), walk(desk), overlaps(desk), miami(), navHere(), reveals(), parallax());
      off.push(() => { $('#atelier').style.marginTop = ''; $('#world').style.marginTop = ''; });
      return () => { off.forEach(fn => fn && fn()); root.classList.remove('is-desk'); };
    });
    ScrollTrigger.refresh();
  });
  addEventListener('load', () => ScrollTrigger.refresh(), { once: true });

  /* ---- soft reveals: headings by line inside masks, copy rising with a short stagger, triggered on enter */
  function reveals() {
    $$('[data-split]').forEach(el => {
      const lines = split(el);
      if (el.closest('.plate-head')) return;   // House Lights owns these
      gsap.fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 1.15, ease: 'expo.out', stagger: .09, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    $$('[data-reveal]').forEach(el => {
      if (el.closest('.plate-head')) return;
      gsap.fromTo(el, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
    return null;
  }

  /* ---- parallax: images drift inside their frames */
  function parallax() {
    $$('[data-par]').forEach(el => {
      const p = +el.dataset.par || 8;
      const masked = el.classList.contains('news-img');
      const target = masked ? $('img', el) : el;
      if (masked) gsap.set(target, { scale: 1.16 });
      gsap.fromTo(target, { yPercent: -p / 2 }, { yPercent: p / 2, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    $$('.tile').forEach(t => {
      const s = +t.dataset.speed || 0;
      gsap.fromTo(t, { y: -s * 9 }, { y: s * 9, ease: 'none', scrollTrigger: { trigger: '.mosaic', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo($('img', t), { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: t, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    return null;
  }

  /* ---- nav: the current chapter is underlined */
  function navHere() {
    const links = $$('.head-nav .nl');
    links.forEach(a => {
      const t = document.getElementById(a.getAttribute('href').slice(1));
      if (!t) return;
      ScrollTrigger.create({ trigger: t, start: 'top 45%', end: 'bottom 45%', onToggle: s => a.classList.toggle('is-here', s.isActive) });
    });
    return () => links.forEach(a => a.classList.remove('is-here'));
  }

  /* ================================================================ HOUSE LIGHTS + the line-up */
  function houseLights(desk) {
    const hl = $('#hl'), hero = $('.hero', hl), plate = $('.plate', hl), light = $('.plate-light', plate);
    const sweep = $('.sweep', hl), stage = $('#lineup'), row = $('.row', plate), bloom = $('.bloom', plate);
    const slots = $$('.slot', plate), cars = slots.map(s => $('.car', s)), ins = slots.map(s => $('.car-in', s));
    const f26 = ins[0], lit = $('.car-lit', f26), ns = $('.car-ns', f26);
    const headLines = split($('.plate-head .h-chap', plate));
    const headRest = $$('.plate-head .chap, .plate-head .stacc, .plate-head .lead', plate);
    const caps = [...$$('.cap', plate), ...(desk ? [] : $$('.pd', plate))], tier = $('.tier', plate), stepIx = $('.step-ix', plate);
    const heroType = $('.hero-type', hero), heroCap = $('.hero-cap', hero), heroPhoto = $('.hero-photo', hero);
    const rim = $('.rimband', hero);
    const CUT = { fx: 312 / 1400, rx: 1087 / 1400, cy: 322 / 1400 };
    const PHOTO = { fx: 535 / 1800, rx: 1215 / 1800, cy: 610 / 1012 };
    const PHOTO_M = { fx: 230.5 / 1080, rx: 806 / 1080, cy: 1049 / 1920 };
    const portrait = matchMedia('(max-aspect-ratio: 1/1)');
    hl.classList.add('is-hl');
    plate.removeAttribute('data-tone');   // the pinned stage reports its own tone (window.__hlLight)

    let R = { x: 0, y: 0, s: 1 };
    function register() {
      const st = hl.getBoundingClientRect(), W = hero.clientWidth, H = hero.clientHeight;
      let fx, rx, cy;
      if (portrait.matches) { const iw = W, ih = W * 16 / 9, oy = H - ih; fx = PHOTO_M.fx * iw; rx = PHOTO_M.rx * iw; cy = oy + PHOTO_M.cy * ih; }
      else { const iw = Math.max(W, H * 16 / 9), ih = Math.max(H, W * 9 / 16), ox = (W - iw) / 2, oy = (H - ih) / 2; fx = ox + PHOTO.fx * iw; rx = ox + PHOTO.rx * iw; cy = oy + PHOTO.cy * ih; }
      const prev = f26.style.transform; f26.style.transform = 'none';
      const r = f26.getBoundingClientRect(); f26.style.transform = prev;
      const w = r.width, left = r.left - st.left, top = r.top - st.top, s = (rx - fx) / ((CUT.rx - CUT.fx) * w);
      R = { x: fx - left - s * CUT.fx * w, y: cy - top - s * CUT.cy * w, s };
      const mw = (rx - fx) / (CUT.rx - CUT.fx);
      rim.style.setProperty('--mw', mw.toFixed(1) + 'px');
      rim.style.setProperty('--mx', (fx - CUT.fx * mw).toFixed(1) + 'px');
      rim.style.setProperty('--my', (cy - CUT.cy * mw).toFixed(1) + 'px');
      rim.style.setProperty('--y', ((cy - CUT.cy * mw * .42) / H * 100).toFixed(2) + '%');
    }
    register();

    // the timeline is written in viewport-percent units, so its durations are its scroll lengths
    const U = desk ? { tail: 50, steps: 4, step: 20, lineup: 120, hold: 14 } : { tail: 0, steps: 0, step: 0, lineup: 110, hold: 10 };
    const TOTAL = U.lineup + U.hold + U.steps * U.step + U.tail;
    const stepsAt = U.lineup + U.hold;
    hlRef.at = (U.lineup + U.hold * .5) / TOTAL;

    gsap.set(light, { opacity: 1 });
    gsap.set(plate, { clipPath: 'inset(0% 100% 0% 0%)' });
    gsap.set([lit], { opacity: 1 }); gsap.set(ns, { opacity: 0 });
    gsap.set(row, { '--floor': 0 });
    const wipe = { p: 0 };
    const setWipe = () => {
      const p = wipe.p;
      plate.style.clipPath = `inset(0% ${(100 - p * 100).toFixed(3)}% 0% 0%)`;
      gsap.set(sweep, { x: `${(p * 100 - 17).toFixed(3)}vw`, opacity: p <= 0 || p >= 1 ? 0 : 1 });
    };

    const tl = gsap.timeline({ defaults: { ease: 'none' } });
    const D = desk ? 1 : .9;   // phone runs the same beats a little tighter
    // A · the wordmark sinks and is wiped from the top down — it never travels toward the bar; the camera leans in
    tl.fromTo(heroType, { y: 0, clipPath: 'inset(0% 0% 0% 0%)' }, { y: 28, clipPath: 'inset(100% 0% 0% 0%)', duration: 22 * D, ease: 'power1.in' }, 4)
      .fromTo(heroCap, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 16, duration: 12 * D }, 0)
      .fromTo(heroPhoto, { scale: 1 }, { scale: 1.06, duration: 70 * D }, 0)
      // the rim light: a hairline behind the silhouette that widens into a glow before the house lights come up
      .fromTo(rim, { opacity: 0, '--bh': '1px' }, { opacity: 1, '--bh': '1px', duration: 4 }, 1)
      .to(rim, { '--bh': '26vh', duration: 22 * D, ease: 'power2.in' }, 5)
      // B · the house lights: a band of studio light crosses the frame; behind it the cove is the white studio
      //     and the photographed F-26 is its catalogue cutout, registered wheel to wheel — a wipe, never a dissolve
      .fromTo(wipe, { p: 0 }, { p: 1, duration: 50 * D, ease: 'power1.inOut', onUpdate: setWipe }, 16 * D)
      // C · the camera pulls back: the F-26 settles into slot 1, its siblings glide in on the same floor
      .fromTo(f26, { x: () => R.x, y: () => R.y, scale: () => R.s }, { x: 0, y: 0, scale: 1, duration: 44 * D, ease: 'power2.inOut' }, 62 * D);
    ins.slice(1).forEach((el, i) => {
      if (desk) tl.fromTo(el, { autoAlpha: 0, x: () => innerWidth * (.16 - i * .04), scale: 1.04 }, { autoAlpha: 1, x: 0, scale: 1, duration: 34, ease: 'power3.out' }, 76 + i * 6);
      else tl.fromTo(el, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 26, ease: 'power3.out' }, 70 + i * 6);
    });
    // D · the plate's heading rises line by line out of its masks; captions and the second tier follow
    tl.fromTo(headLines, { yPercent: 110 }, { yPercent: 0, duration: 18, stagger: 4, ease: 'power3.out' }, 92 * D)
      .fromTo(headRest, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 14, stagger: 3, ease: 'power3.out' }, 98 * D)
      .fromTo(caps, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 14, stagger: 3, ease: 'power3.out' }, 100 * D)
      .fromTo(row, { '--floor': 0 }, { '--floor': 1, duration: 12 }, 100 * D)
      .fromTo(tier, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 14, ease: 'power3.out' }, 104 * D)
      .to({}, { duration: TOTAL - U.lineup }, U.lineup);
    if (desk) {
      tl.fromTo(stepIx, { autoAlpha: 0 }, { autoAlpha: 1, duration: 6 }, stepsAt)
        .to(stepIx, { autoAlpha: 0, duration: 6 }, stepsAt + U.steps * U.step - 6)
        // tail: the plate steps back as the atelier slides over it
        .fromTo($('.plate-in', plate), { scale: 1, autoAlpha: 1 }, { scale: .95, autoAlpha: .4, duration: U.tail, ease: 'power1.in' }, TOTAL - U.tail);
    }
    hlRef.tail = U.tail;

    let lineup = null;
    const pin = ScrollTrigger.create({
      trigger: hl, start: 'top top', end: `+=${TOTAL}%`, pin: true, pinSpacing: true, scrub: desk ? 1.4 : 1, animation: tl, anticipatePin: 1,
      onUpdate: self => {
        const v = self.progress * TOTAL;
        hl.classList.toggle('is-lit', v > (desk ? 112 : 100));
        hlRef.light = v > 40;
        if (lineup) lineup.scrollStep(v >= stepsAt && v < stepsAt + U.steps * U.step ? Math.floor((v - stepsAt) / U.step) : null);
      }
    });
    hlRef.pin = pin;
    window.__hlLight = () => { const st = pin; return scrollY >= st.start && scrollY < st.end - innerHeight * (U.tail / 100) * .5 && (scrollY - st.start) / innerHeight * 100 > (desk ? 60 : 50); };
    if (desk) lineup = lineupInspect({ hl, plate, stage, slots, cars, bloom, stepIx });

    const onRefresh = () => { register(); if (lineup) lineup.measure(); };
    ScrollTrigger.addEventListener('refreshInit', () => { if (lineup) lineup.reset(); });
    ScrollTrigger.addEventListener('refresh', onRefresh);
    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      if (lineup) lineup.destroy();
      hl.classList.remove('is-hl', 'is-lit');
      plate.style.clipPath = '';
      hlRef.pin = null;
      window.__hlLight = null;
      plate.setAttribute('data-tone', 'light');
    };
  }

  /* ---- the line-up: pull a car out for inspection. Hover, focus, tap and the scroll steps share one state. */
  function lineupInspect({ hl, plate, stage, slots, cars, bloom, stepIx }) {
    const pds = slots.map(s => $('.pd', s)), svg = $('.leaders', stage), head = $('.plate-head', plate), N = slots.length;
    const imgAR = cars.map(c => { const im = $('img', c); return im.naturalHeight && im.naturalWidth ? im.naturalHeight / im.naturalWidth : (+im.getAttribute('height') / +im.getAttribute('width')); });
    let nat = [], cur = null, step = null, hovering = false, intent = 0;

    function measure() {
      const prev = cars.map(c => c.style.transform);
      cars.forEach(c => { c.style.transform = 'none'; });
      const s = stage.getBoundingClientRect();
      nat = cars.map(c => { const r = c.getBoundingClientRect(); return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height }; });
      cars.forEach((c, i) => { c.style.transform = prev[i]; });
    }
    function layout(i) {
      const s = stage.getBoundingClientRect(), W = s.width, H = Math.max(s.height, 380);
      const hr = head.getBoundingClientRect(), h2 = $('.h-chap', head).getBoundingClientRect();
      const wc = Math.min(W * .56, 1180), hc = wc * imgAR[i];
      const car = { x: -W * .01, y: H * .56 - hc * .5, w: wc, h: hc };
      const floor = car.y + (CUTF.cy + CUTF.r) * wc;
      const px = Math.max(W * .62, h2.right - s.left + 40);
      const panel = { x: px, y: hr.top - s.top, w: Math.min(W * .26, 400, W - px) };
      // the queue: three small monochrome cars on the same floor, overlapping in depth at the right
      const qW = Math.min(W * .17, 330), step = qW * .52, queue = [];
      let j = 0;
      for (let k = 0; k < N; k++) if (k !== i) { const w = qW * (1 - j * .06); queue[k] = { x: W - qW - (2 - j) * step, y: floor - (CUTF.cy + CUTF.r) * w, w, j }; j++; }
      return { car, panel, queue, floor };
    }
    const CUTF = { cy: .23, r: .0786 };   // wheel centre and radius as fractions of the cutout's width
    const toT = (k, r) => ({ x: r.x - nat[k].x, y: r.y - nat[k].y, scale: r.w / nat[k].w });

    // every call owns the whole state: stale, delayed tweens from the previous call are killed first (no ghost panels)
    const killAll = () => { gsap.killTweensOf([...cars, ...pds, bloom, ...pds.flatMap(p => $$('.pd-body > *', p)), ...svg.querySelectorAll('*')]); };
    function pull(i, quick) {
      if (i === cur) return;
      cur = i;
      stage.dataset.cur = i;
      killAll();
      plate.classList.add('is-pulled');
      if (!nat.length) measure();
      const L = layout(i), d = quick ? 0 : 1;
      // the panel's real height decides whether the queue can share its column; if not, the queue drops below it
      const pdi = pds[i];
      gsap.set(pdi, { left: L.panel.x, top: L.panel.y, width: L.panel.w });
      const pBottom = L.panel.y + pdi.offsetHeight + 24;
      const qTop = Math.min(...L.queue.filter(Boolean).map(q => q.y));
      if (pBottom > qTop) L.queue.forEach(q => { if (q) q.y += pBottom - qTop; });
      // queue first: the others roll aside and step back in depth, in monochrome
      cars.forEach((c, k) => {
        if (k === i) return;
        const q = L.queue[k];
        c.classList.add('is-mono');
        gsap.to(c, { ...toT(k, q), autoAlpha: .5 + q.j * .12, zIndex: 2 + q.j, duration: .8 * d, ease: 'expo.out', delay: q.j * .05 * d, overwrite: 'auto' });
      });
      // then the car rolls into the opened space and grows; it keeps its colour
      const c = cars[i];
      c.classList.remove('is-mono');
      gsap.to(c, { ...toT(i, L.car), autoAlpha: 1, zIndex: 6, duration: .9 * d, ease: 'expo.out', delay: .06 * d, overwrite: 'auto' });
      // the light of its cove blooms behind it
      const g = getComputedStyle(slots[i]).getPropertyValue('--glow').trim();
      bloom.style.background = `radial-gradient(closest-side, rgba(${g}, .36), rgba(${g}, .12) 55%, rgba(${g}, 0))`;
      const sr = stage.getBoundingClientRect(), pr = plate.getBoundingClientRect();
      gsap.to(bloom, { x: sr.left - pr.left + L.car.x - L.car.w * .15, y: sr.top - pr.top + L.car.y - L.car.h * 1.1, width: L.car.w * 1.3, height: L.car.h * 3.2, opacity: 1, duration: .9 * d, ease: 'power3.out', delay: .12 * d, overwrite: 'auto' });
      // the panel slides in beside it, never over it
      pds.forEach((p, k) => {
        if (k === i) {
          gsap.set(p, { left: L.panel.x, top: L.panel.y, width: L.panel.w });
          gsap.fromTo(p, { autoAlpha: 0, x: 32 }, { autoAlpha: 1, x: 0, duration: .7 * d, ease: 'power3.out', delay: .22 * d, overwrite: 'auto' });
          gsap.fromTo($$('.pd-body > *', p), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .6 * d, stagger: .035 * d, ease: 'power3.out', delay: .28 * d, overwrite: 'auto' });
        } else {
          gsap.to(p, { autoAlpha: 0, x: -16, duration: .25 * d, ease: 'power2.in' });
        }
      });
      if (stepIx) $('.step-n', stepIx).textContent = String(i + 1).padStart(2, '0');
      callouts(i, L, d);
    }
    // numbered callouts: a dot exactly on the part, one straight hairline into the air, the number at its end —
    // above the car for parts on its upper half, below it for the lower half; the panel lists the same numbers
    function callouts(i, L, d) {
      svg.innerHTML = '';
      const car = L.car, NS = 'http://www.w3.org/2000/svg';
      const items = $$('.pd-changed li', pds[i]);
      const upY = car.y - 30, downY = L.floor + 34;
      items.forEach((li, k) => {
        const [fx, fy] = li.dataset.pt.split(',').map(Number);
        const px = car.x + fx * car.w, py = car.y + fy * car.w;
        const up = fy * car.w < car.h * .5;
        const ty = up ? upY : downY;
        const line = document.createElementNS(NS, 'line');
        line.setAttribute('x1', px.toFixed(1)); line.setAttribute('x2', px.toFixed(1));
        line.setAttribute('y1', (up ? ty + 10 : ty - 10).toFixed(1)); line.setAttribute('y2', (up ? py - 4 : py + 4).toFixed(1));
        const dot = document.createElementNS(NS, 'circle');
        dot.setAttribute('cx', px.toFixed(1)); dot.setAttribute('cy', py.toFixed(1)); dot.setAttribute('r', '3.5');
        const num = document.createElementNS(NS, 'text');
        num.setAttribute('x', px.toFixed(1)); num.setAttribute('y', (up ? ty : ty + 4).toFixed(1));
        num.setAttribute('text-anchor', 'middle'); num.setAttribute('dominant-baseline', up ? 'auto' : 'hanging');
        num.textContent = String(k + 1).padStart(2, '0');
        svg.append(line, dot, num);
        const len = Math.abs(+line.getAttribute('y2') - +line.getAttribute('y1'));
        const at = .55 + k * .22;   // one at a time
        gsap.fromTo(dot, { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: .3 * d, ease: 'back.out(2)', delay: at * d });
        gsap.fromTo(line, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: .45 * d, ease: 'power2.out', delay: (at + .1) * d });
        gsap.fromTo(num, { opacity: 0, y: up ? 6 : -6 }, { opacity: 1, y: 0, duration: .35 * d, ease: 'power2.out', delay: (at + .4) * d });
      });
    }
    function back(quick) {
      if (cur === null) return;
      cur = null;
      stage.dataset.cur = '';
      killAll();
      const d = quick ? 0 : 1;
      plate.classList.remove('is-pulled');
      svg.innerHTML = '';
      cars.forEach((c, k) => { c.classList.remove('is-mono'); gsap.to(c, { x: 0, y: 0, scale: 1, autoAlpha: 1, zIndex: k === 0 ? 2 : 1, duration: .8 * d, ease: 'expo.out', delay: k * .03 * d, overwrite: 'auto' }); });
      pds.forEach(p => gsap.to(p, { autoAlpha: 0, duration: .25 * d, overwrite: 'auto' }));
      gsap.to(bloom, { opacity: 0, duration: .5 * d, overwrite: 'auto' });
    }
    const lit = () => hl.classList.contains('is-lit');
    const rest = () => (step !== null ? pull(step) : back());

    // pointer: hover-intent, keep the state anywhere on the stage, swap without resetting
    // after a swap the cars move under a still pointer; a new pull needs the pointer to have moved first (no flicker loop)
    let lock = null;
    const onMove = e => { if (lock && Math.hypot(e.clientX - lock[0], e.clientY - lock[1]) > 14) lock = null; };
    const onOver = e => {
      if (!lit() || e.pointerType === 'touch' || lock) return;
      const s = e.target.closest('.slot');
      if (!s) return;
      const i = slots.indexOf(s);
      hovering = true;
      clearTimeout(intent);
      if (i !== cur) intent = setTimeout(() => { pull(i); lock = [e.clientX, e.clientY]; }, 80);
    };
    const onLeave = e => { if (e.pointerType === 'touch') return; clearTimeout(intent); hovering = false; rest(); };
    // touch: tap pulls out; a second tap on the same car follows its link; a tap elsewhere returns the row
    const onClick = e => {
      const a = e.target.closest('.prog');
      if (!a || !lit()) return;
      const i = slots.indexOf(a.closest('.slot'));
      if (cur !== i) { e.preventDefault(); pull(i); }
    };
    const onDocDown = e => { if (cur !== null && !stage.contains(e.target) && e.pointerType === 'touch') rest(); };
    // keyboard: focus pulls out, arrows move through the cars, Escape returns the row
    const onFocus = e => { const s = e.target.closest('.slot'); if (s && lit()) pull(slots.indexOf(s)); };
    const onKey = e => {
      const a = e.target.closest('.prog'); if (!a) return;
      const i = slots.indexOf(a.closest('.slot'));
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); $('.prog', slots[(i + 1) % N]).focus(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); $('.prog', slots[(i + N - 1) % N]).focus(); }
      else if (e.key === 'Escape') { e.preventDefault(); back(); }
    };
    const onFocusOut = e => { if (!stage.contains(e.relatedTarget)) rest(); };
    stage.addEventListener('pointerover', onOver);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    stage.addEventListener('click', onClick);
    stage.addEventListener('focusin', onFocus);
    stage.addEventListener('keydown', onKey);
    stage.addEventListener('focusout', onFocusOut);
    document.addEventListener('pointerdown', onDocDown);

    return {
      measure,
      reset() { back(true); nat = []; },
      scrollStep(k) {
        if (k === step) return;
        step = k;
        if (hovering) return;
        if (k === null) back(); else pull(k);
      },
      destroy() {
        back(true);
        stage.removeEventListener('pointerover', onOver); stage.removeEventListener('pointermove', onMove); stage.removeEventListener('pointerleave', onLeave);
        stage.removeEventListener('click', onClick); stage.removeEventListener('focusin', onFocus);
        stage.removeEventListener('keydown', onKey); stage.removeEventListener('focusout', onFocusOut);
        document.removeEventListener('pointerdown', onDocDown);
        gsap.set([...cars, ...pds, bloom], { clearProps: 'all' });
      }
    };
  }

  /* ================================================================ ATELIER: the window opens to the room, then the camera pushes in */
  function atelier() {
    const sec = $('#atelier'), st = $('.at-stage', sec), win = $('.at-window', sec), photo = $('.at-photo', sec), img = $('.at-img img', sec);
    const text = $('.at-text', sec), cap = $('.at-cap', sec);
    sec.classList.add('is-film');
    const inset = () => { const s = st.getBoundingClientRect(), w = win.getBoundingClientRect(); return `inset(${(w.top - s.top).toFixed(1)}px ${(s.right - w.right).toFixed(1)}px ${(s.bottom - w.bottom).toFixed(1)}px ${(w.left - s.left).toFixed(1)}px)`; };
    const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: st, start: 'top top', end: '+=100%', pin: true, scrub: 1.2, invalidateOnRefresh: true, anticipatePin: 1 } });
    tl.fromTo(photo, { clipPath: inset }, { clipPath: 'inset(0px 0px 0px 0px)', duration: 42, ease: 'power2.inOut' }, 14)
      .fromTo(img, { scale: 1.22 }, { scale: 1.04, duration: 60, ease: 'power1.out' }, 0)
      .to(text, { x: -80, autoAlpha: 0, duration: 12, ease: 'power1.in' }, 6)
      .fromTo(cap, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 8 }, 58)
      .to({}, { duration: 14 }, 66)
      .to(cap, { autoAlpha: 0, duration: 6 }, 80)
      // push in through the glass: the room becomes the evidence that follows
      .to(img, { scale: 1.6, duration: 20, ease: 'power2.in' }, 80)
      .fromTo($('.at-dark', sec), { opacity: 0 }, { opacity: 1, duration: 14, ease: 'power1.in' }, 86);
    return () => { sec.classList.remove('is-film'); gsap.set([photo, img, text, cap], { clearProps: 'all' }); };
  }

  /* ================================================================ SPECIAL EDITIONS: a pinned horizontal track */
  function editions() {
    const sec = $('#editions'), stage = $('.se-stage', sec);
    sec.classList.add('is-film');
    const dist = () => stage.scrollWidth - innerWidth;
    const tween = gsap.to(stage, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: () => '+=' + Math.round(dist() * .5), pin: true, scrub: 1.2, invalidateOnRefresh: true, anticipatePin: 1 } });
    $$('.se-p', sec).forEach(p => {
      gsap.fromTo($('.se-img', p), { xPercent: -5 }, { xPercent: 5, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
      gsap.fromTo($('.se-num b', p), { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left 55%', toggleActions: 'play none none reverse' } });
      gsap.fromTo($$('.se-num span, .se-txt h3, .se-txt p:last-child', p), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .9, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left 50%', toggleActions: 'play none none reverse' } });
    });
    return () => { sec.classList.remove('is-film'); gsap.set(stage, { clearProps: 'all' }); };
  }

  /* ================================================================ rails: commissions and the world move sideways with the scroll */
  function rails() {
    const rail = $('.cm-rail');
    const cards = $$('li', rail);
    gsap.fromTo(cards, { y: i => [120, -60, 180, -90, 140, -40, 100][i % 7], rotate: i => [-4, 3, -2, 5, -3, 2, -5][i % 7], scale: .86 },
      { y: 0, rotate: 0, scale: 1, ease: 'power2.out', stagger: .02, scrollTrigger: { trigger: '#commissions', start: 'top 85%', end: 'top 10%', scrub: 1 } });
    gsap.fromTo(rail, { x: 0 }, { x: () => -(rail.scrollWidth - innerWidth * .9), ease: 'none', scrollTrigger: { trigger: '#commissions', start: 'top bottom', end: 'bottom top', scrub: 1, invalidateOnRefresh: true } });
    const a = $('.wr-a'), b = $('.wr-b');
    gsap.fromTo(a, { x: 0 }, { x: () => -(a.scrollWidth - innerWidth) * .6, ease: 'none', scrollTrigger: { trigger: '.world-rows', start: 'top bottom', end: 'bottom top', scrub: 1, invalidateOnRefresh: true } });
    gsap.fromTo(b, { x: () => -(b.scrollWidth - innerWidth) * .6 }, { x: 0, ease: 'none', scrollTrigger: { trigger: '.world-rows', start: 'top bottom', end: 'bottom top', scrub: 1, invalidateOnRefresh: true } });
    return null;
  }

  /* ================================================================ GOODWOOD: the scrub carries the F-26's story */
  function goodwood(desk) {
    const sec = $('#goodwood'), stage = $('.peak-stage', sec), canvas = $('.peak-canvas', sec), still = $('.peak-still img', sec);
    const lines = $$('.gw-l', sec), time = $('.gw-time', sec), bar = $('.gw-bar i', sec);
    const N = desk ? 115 : 96, pad = n => String(n).padStart(3, '0');
    const src = i => desk ? `assets/seq/d/f${pad(i + 1)}.webp` : `assets/seq/m/m${pad(i + 1)}.webp`;
    const frames = new Array(N), g = canvas.getContext('2d');
    // where the car is in each frame (centre, % of frame width) — the film area follows it like a camera operator
    const K = [[2.75, 40], [3.25, 50], [3.75, 53], [4.25, 54], [4.75, 52], [5.25, 55], [5.75, 52], [6.25, 43], [6.75, 42], [7.25, 45], [7.75, 55], [8.25, 48], [8.5, 47]];
    const track = t => { for (let k = 0; k < K.length - 1; k++) { const [t0, c0] = K[k], [t1, c1] = K[k + 1]; if (t >= t0 && t <= t1) { let u = (t - t0) / (t1 - t0); u = u * u * (3 - 2 * u); return (c0 + (c1 - c0) * u) / 100; } } return K[K.length - 1][1] / 100; };
    let want = 0, drawn = -1, alive = true;
    sec.classList.add(desk ? 'is-film' : 'is-phone');

    function size() { const dpr = Math.min(devicePixelRatio || 1, 2); canvas.width = Math.round(canvas.clientWidth * dpr); canvas.height = Math.round(canvas.clientHeight * dpr); drawn = -1; draw(); }
    function nearest(i) { if (frames[i]) return i; for (let d = 1; d < N; d++) { if (frames[i - d]) return i - d; if (frames[i + d]) return i + d; } return -1; }
    function draw() {
      const k = nearest(want);
      const img = k >= 0 ? frames[k] : (still.complete && still.naturalWidth ? still : null);
      if (!img || k === drawn && k >= 0) return;
      const cw = canvas.width, ch = canvas.height, iw = img.naturalWidth, ih = img.naturalHeight;
      g.fillStyle = '#000'; g.fillRect(0, 0, cw, ch);
      if (desk && k >= 0) {
        const a = cw / ch;
        let sw = ih * a, sh = ih, sx, sy = 0;
        if (sw > iw) { sw = iw; sh = iw / a; sy = (ih - sh) / 2; }
        sx = clamp(track(2.75 + k / (N - 1) * 5.75) * iw - sw / 2, 0, iw - sw);
        g.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
      } else {
        const s = Math.max(cw / iw, ch / ih), w = iw * s, h = ih * s;
        g.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      }
      drawn = k;
    }
    let started = false;
    function load() {
      if (started) return; started = true;
      const order = [], seen = new Set();
      [8, 4, 2, 1].forEach(st => { for (let i = 0; i < N; i += st) if (!seen.has(i)) { seen.add(i); order.push(i); } });
      let k = 0, active = 0;
      const next = () => {
        while (alive && active < 6 && k < order.length) {
          const i = order[k++]; active++;
          const im = new Image(); im.decoding = 'async'; im.src = src(i);
          im.decode().then(() => { frames[i] = im; if (Math.abs(i - want) < 6) { drawn = -2; draw(); } }).catch(() => {}).finally(() => { active--; next(); });
        }
      };
      next();
    }
    ScrollTrigger.create({ trigger: sec, start: 'top 300%', onEnter: load });
    if (scrollY > sec.getBoundingClientRect().top + scrollY - innerHeight * 3) load();

    const film = { f: 0 };
    const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: stage, start: 'top top', end: desk ? '+=300%' : '+=220%', pin: true, scrub: .9, anticipatePin: 1, onRefresh: size } });
    tl.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: .05 }, .02)
      .fromTo(film, { f: 0 }, { f: N - 1, duration: .86, onUpdate: () => {
        want = Math.round(film.f); draw();
        const t = 2.75 + film.f / (N - 1) * 5.75;
        time.textContent = `0:0${t.toFixed(2)}`;
        bar.style.transform = `scaleX(${(film.f / (N - 1)).toFixed(4)})`;
      } }, .06);
    // the story, keyed to the film: each line slides in, holds, and leaves
    const W = [[0, .15], [.15, .33], [.33, .5], [.5, .68], [.68, .84], [.84, 1.01]];
    lines.forEach((l, i) => {
      const [a, b] = W[i];
      if (i === 0) tl.set(l, { autoAlpha: 1, y: 0 }, 0); else tl.fromTo(l, { autoAlpha: 0, y: 46 }, { autoAlpha: 1, y: 0, duration: .03, ease: 'power2.out' }, a);
      if (i < lines.length - 1) tl.to(l, { autoAlpha: 0, y: -46, duration: .03, ease: 'power2.in' }, b - .03);
    });
    tl.to({}, { duration: desk ? .22 : .01 }, 1);   // ≈ 60vh of 340: the world rises over the held last frame   // desktop: the last frame holds while the next chapter rises over it
    size();
    return () => { alive = false; sec.classList.remove('is-film', 'is-phone'); gsap.set([canvas, ...lines], { clearProps: 'all' }); };
  }

  /* ================================================================ OWNERSHIP: large screens stacked over one another */
  function ownership() {
    const cards = $$('.own-c');
    cards.forEach((c, i) => {
      gsap.fromTo($('.own-big', c), { xPercent: 8 }, { xPercent: -6, ease: 'none', scrollTrigger: { trigger: c, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo($$('.own-txt h3, .own-txt p:not(.own-big):not(.chap)', c), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 55%', toggleActions: 'play none none reverse' } });
      if (i === cards.length - 1) return;
      ScrollTrigger.create({ trigger: c, start: 'top top', end: '+=100%', pin: true, pinSpacing: false });
      gsap.to(c, { '--o': 1, ease: 'none', scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top', scrub: true, onUpdate: s => { c.style.filter = `brightness(${(1 - s.progress * .55).toFixed(3)})`; } } });
    });
    return () => cards.forEach(c => { c.style.filter = ''; });
  }

  /* ================================================================ PROVENANCE: a real walk-around in six fixed-camera frames */
  function walk(desk) {
    const sec = $('#provenance'), stage = $('.psp-stage', sec), sets = $$('.walk-set', sec), dotsWrap = $('.walk-ix', sec), label = $('.walk-n', sec);
    const picks = $$('.psp-pick', sec);
    sec.classList.add('is-film');
    let active = 0;
    const p = { v: 0 };
    const frames = () => $$('img', sets[active]);
    const buildDots = () => { dotsWrap.innerHTML = frames().map(() => '<i></i>').join(''); };
    const paint = () => {
      const f = frames(), v = p.v * (f.length - 1);
      // each angle holds, and only the last 40% of a step crossfades — a stopped frame is never a double image
      f.forEach((im, i) => { const d = Math.abs(v - i); im.style.opacity = (d < .3 ? 1 : d > .7 ? 0 : 1 - (d - .3) / .4).toFixed(3); });
      const on = Math.round(v);
      $$('i', dotsWrap).forEach((d, i) => d.classList.toggle('is-on', i === on));
      label.textContent = `Angle ${on + 1} / ${f.length}`;
    };
    const choose = k => {
      if (k === active) return;
      gsap.to(sets[active], { autoAlpha: 0, duration: .5, ease: 'power2.out' });
      active = k;
      gsap.fromTo(sets[active], { autoAlpha: 0 }, { autoAlpha: 1, duration: .6, ease: 'power2.out' });
      picks.forEach((b, i) => b.setAttribute('aria-pressed', i === k ? 'true' : 'false'));
      buildDots(); paint();
    };
    picks.forEach((b, i) => b.addEventListener('click', () => choose(i)));
    gsap.set(sets.slice(1), { autoAlpha: 0 });
    buildDots();
    gsap.fromTo(p, { v: 0 }, { v: 1, ease: 'none', onUpdate: paint, scrollTrigger: { trigger: stage, start: 'top top', end: desk ? '+=100%' : '+=80%', pin: true, scrub: .8, anticipatePin: 1,
      snap: { snapTo: v => { const n = frames().length - 1; return Math.round(v * n) / n; }, duration: { min: .2, max: .5 }, delay: .12, ease: 'power2.out' } } });   // the angles are discrete states: rest on one
    paint();
    return () => { sec.classList.remove('is-film'); gsap.set(sets, { clearProps: 'all' }); $$('.walk-set img', sec).forEach(im => { im.style.opacity = ''; }); };
  }

  /* ================================================================ overlaps: the next chapter slides over the one that holds */
  function overlaps(desk) {
    if (!desk) return null;
    // Miami rises over the news (the atelier and the world rise over the plate and the film through their pins' tails)
    const st = ScrollTrigger.create({ trigger: '#news', start: 'bottom bottom', end: '+=100%', pin: true, pinSpacing: false });
    return () => st.kill();
  }

  /* ================================================================ Miami: the contact rises over the photograph */
  function miami() {
    gsap.fromTo('.miami-floor', { y: 90 }, { y: 0, ease: 'none', scrollTrigger: { trigger: '#miami', start: 'top bottom', end: 'top 15%', scrub: true } });
    return null;
  }
})();
