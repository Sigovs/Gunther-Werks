/* Gunther Werks Miami — home prototype.
   Static page first: everything below only enhances a page that is complete without it.
   Motion: GSAP + ScrollTrigger (vendor/), native scroll. Two scripted moments only —
   House Lights (triggered, reversible) and the Goodwood scrub (the one scrub on the page). */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------ header + compact bar */
  const head = $('#head');
  const bar = $('#bar');
  const barFocusables = $$('a, button', bar);
  let lastY = scrollY, barOn = false, ticking = false;
  function setBar(on) {
    if (on === barOn) return;
    barOn = on;
    bar.classList.toggle('is-on', on);
    bar.setAttribute('aria-hidden', on ? 'false' : 'true');
    barFocusables.forEach(el => el.tabIndex = on ? 0 : -1);
  }
  function onScroll() {
    const y = scrollY, dy = y - lastY;
    const threshold = head.offsetHeight + 40;
    if (y <= threshold) setBar(false);
    else if (dy < -4) setBar(true);
    else if (dy > 4) setBar(false);
    lastY = y; ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  bar.addEventListener('focusin', () => setBar(true));

  /* ------------------------------------------------------------------ menu panel */
  const menu = $('#menu');
  const menuBtns = $$('.menu-btn');
  let menuOpener = null;
  function openMenu(btn) {
    menuOpener = btn;
    menu.hidden = false;
    menuBtns.forEach(b => b.setAttribute('aria-expanded', 'true'));
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => $('.menu-links a', menu).focus());
  }
  function closeMenu(restore = true) {
    if (menu.hidden) return;
    menu.hidden = true;
    menuBtns.forEach(b => b.setAttribute('aria-expanded', 'false'));
    document.documentElement.style.overflow = '';
    if (restore && menuOpener) menuOpener.focus();
  }
  menuBtns.forEach(b => b.addEventListener('click', () => openMenu(b)));
  $('.menu-close', menu).addEventListener('click', () => closeMenu());
  menu.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return; }
    if (e.key !== 'Tab') return;
    const f = $$('a, button', menu).filter(el => el.offsetParent !== null);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  $$('a[href^="#"]', menu).forEach(a => a.addEventListener('click', () => closeMenu(false)));
  matchMedia('(min-width: 1024px)').addEventListener('change', e => { if (e.matches) closeMenu(false); });

  /* ------------------------------------------------------------------ "page to come" */
  const tip = $('#soon-tip');
  let tipTimer = 0;
  function showTip(el, hold) {
    clearTimeout(tipTimer);
    tip.textContent = 'Page to come';
    const anchor = $('.u', el) || el;
    const r = anchor.getBoundingClientRect();
    tip.classList.add('is-on');
    const th = tip.offsetHeight, tw = tip.offsetWidth;
    // beside the label when there is room (never over a car), otherwise above it
    let left = r.right + 12, top = r.top + (r.height - th) / 2;
    if (left + tw > innerWidth - 8) {
      left = Math.min(Math.max(8, r.left), innerWidth - tw - 8);
      top = r.top - th - 8;
      if (top < 64) top = r.bottom + 8;
    }
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
    if (hold) tipTimer = setTimeout(hideTip, 1800);
  }
  function hideTip() { tip.classList.remove('is-on'); }
  $$('[data-soon]').forEach(el => {
    el.setAttribute('aria-describedby', 'soon-desc');
    el.addEventListener('mouseenter', () => showTip(el));
    el.addEventListener('mouseleave', hideTip);
    el.addEventListener('focus', () => showTip(el));
    el.addEventListener('blur', hideTip);
    el.addEventListener('click', e => { e.preventDefault(); showTip(el, true); });
  });
  const desc = document.createElement('span');
  desc.id = 'soon-desc'; desc.className = 'vh'; desc.textContent = 'Page to come';
  document.body.append(desc);
  addEventListener('scroll', () => { if (tip.classList.contains('is-on')) hideTip(); }, { passive: true });

  /* ------------------------------------------------------------------ enquiry form */
  const form = $('#form');
  const sent = $('#sent');
  const status = $('.form-status', form);
  const submit = $('button[type="submit"]', form);
  const label = $('.btn-label', submit);
  const interest = $('#f-interest');
  const fields = {
    name: { el: $('#f-name'), err: $('#e-name'), ok: v => v.trim().length > 1 },
    email: { el: $('#f-email'), err: $('#e-email'), ok: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) },
    message: { el: $('#f-msg'), err: $('#e-msg'), ok: v => v.trim().length > 1 }
  };
  function check(f) {
    const good = f.ok(f.el.value);
    f.el.setAttribute('aria-invalid', good ? 'false' : 'true');
    f.err.hidden = good;
    return good;
  }
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
    if (bad.length) {
      status.classList.remove('is-error');
      status.textContent = bad.length === 1 ? 'One field needs attention.' : `${bad.length} fields need attention.`;
      bad[0].el.focus();
      return;
    }
    form.setAttribute('aria-busy', 'true');
    submit.disabled = true;
    label.textContent = 'Sending…';
    status.classList.remove('is-error');
    status.textContent = 'Sending your enquiry to Javier Roque.';
    // Mockup: no backend. The request is simulated, and it always resolves or fails — never spins forever.
    setTimeout(() => {
      form.removeAttribute('aria-busy');
      submit.disabled = false;
      if (forceError) {
        label.textContent = 'Try again';
        status.classList.add('is-error');
        status.innerHTML = '<b>Not sent.</b> Your details are still here — please try again, or call <a href="tel:+13057836493">(305) 783-6493</a>.';
        return;
      }
      label.textContent = 'Send to Javier Roque';
      status.textContent = '';
      $('#sent-sum').textContent = `Interest: ${interest.value} · Reply address: ${fields.email.el.value.trim()}`;
      form.hidden = true;
      sent.hidden = false;
      sent.focus();
    }, 1400);
  });
  $('#sent-again').addEventListener('click', () => {
    form.reset();
    Object.values(fields).forEach(f => { f.el.removeAttribute('aria-invalid'); f.err.hidden = true; });
    sent.hidden = true;
    form.hidden = false;
    fields.name.el.focus();
  });

  /* ------------------------------------------------------------------ motion */
  if (!window.gsap || !window.ScrollTrigger) return;   // the static page is already complete
  gsap.registerPlugin(ScrollTrigger);

  const hlState = { pin: null };
  // Programs link: while House Lights is armed, #programs sits under the hero, so the link scrolls into the lit plate instead
  $$('[data-nav="programs"]').forEach(a => a.addEventListener('click', e => {
    if (!hlState.pin) return;
    e.preventDefault();
    closeMenu(false);
    scrollTo({ top: hlState.pin.start + innerHeight * .5, behavior: reduce.matches ? 'auto' : 'smooth' });
    $('#programs-h').setAttribute('tabindex', '-1');
    setTimeout(() => $('#programs-h').focus({ preventScroll: true }), 600);
  }));

  const mm = gsap.matchMedia();
  mm.add({
    desk: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
    phone: '(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)'
  }, ctx => {
    const desk = ctx.conditions.desk;
    const off = [houseLights(desk), goodwood(desk)];
    return () => off.forEach(fn => fn && fn());
  });

  /* ---- House Lights: the hero F-26 becomes the catalogue F-26, the cove becomes the studio, the camera pulls back */
  function houseLights(desk) {
    const hl = $('#hl');
    const hero = $('.hero', hl);
    const plate = $('.plate', hl);
    const light = $('.plate-light', plate);
    const row = $('.row', plate);
    const f26 = $('.car-f26', plate);
    const lit = $('.car-lit', f26);
    const ns = $('.car-ns', f26);
    const others = $$('.slot:not(:first-child) .car', plate);
    const plateText = [$('.plate-head', plate), ...$$('.cap', plate), $('.tier', plate)];
    const heroType = [$('.hero-type', hero), $('.hero-cap', hero)];
    const CUT = { fx: 312 / 1400, rx: 1087 / 1400, cy: 322 / 1400 };            // F-26 cutout wheel centres (fraction of width)
    const PHOTO = { fx: 535 / 1800, rx: 1215 / 1800, cy: 610 / 1012 };          // hero photograph, landscape
    const PHOTO_M = { fx: 230.5 / 1080, rx: 806 / 1080, cy: 1049 / 1920 };     // hero photograph, portrait
    const portrait = matchMedia('(max-aspect-ratio: 1/1)');

    hl.classList.add('is-hl');
    row.style.setProperty('--floor', '0');

    let R = { x: 0, y: 0, s: 1 };
    function register() {
      const st = hl.getBoundingClientRect();
      const W = hero.clientWidth, H = hero.clientHeight;
      let fx, rx, cy;
      if (portrait.matches) {
        const iw = W, ih = W * 16 / 9, oy = H - ih;
        fx = PHOTO_M.fx * iw; rx = PHOTO_M.rx * iw; cy = oy + PHOTO_M.cy * ih;
      } else {
        const iw = Math.max(W, H * 16 / 9), ih = Math.max(H, W * 9 / 16), ox = (W - iw) / 2, oy = (H - ih) / 2;
        fx = ox + PHOTO.fx * iw; rx = ox + PHOTO.rx * iw; cy = oy + PHOTO.cy * ih;
      }
      const prev = f26.style.transform;
      f26.style.transform = 'none';
      const r = f26.getBoundingClientRect();
      f26.style.transform = prev;
      const w = r.width, left = r.left - st.left, top = r.top - st.top;
      const s = (rx - fx) / ((CUT.rx - CUT.fx) * w);
      R = { x: fx - left - s * CUT.fx * w, y: cy - top - s * CUT.cy * w, s };
    }
    register();

    gsap.set(light, { opacity: 0 });
    gsap.set(plateText, { autoAlpha: 0 });
    gsap.set([lit, ns], { opacity: 0 });

    const tl = gsap.timeline({ paused: true, onUpdate: state });
    if (desk) {
      tl.to(heroType, { autoAlpha: 0, y: -16, duration: .25, ease: 'power2.in' }, 0)
        .to(ns, { opacity: 1, duration: .40, ease: 'none' }, .15)
        .to(light, { opacity: 1, duration: .65, ease: 'power1.inOut' }, .30)
        .to(lit, { opacity: 1, duration: .12, ease: 'none' }, .85)
        .to(ns, { opacity: 0, duration: .12, ease: 'none' }, .85)
        .fromTo(f26, { x: () => R.x, y: () => R.y, scale: () => R.s }, { x: 0, y: 0, scale: 1, duration: .80, ease: 'power3.out' }, .95)
        .fromTo(others, { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, duration: .55, ease: 'power3.out', stagger: .08 }, 1.2)
        .to(plateText, { autoAlpha: 1, duration: .35, ease: 'none' }, 1.45)
        .to(row, { '--floor': 1, duration: .35, ease: 'none' }, 1.45);
    } else {
      // phone: authored separately — the F-26 is already near stack scale, so it barely shrinks and rises into the top slot
      tl.to(heroType, { autoAlpha: 0, y: -16, duration: .25, ease: 'power2.in' }, 0)
        .to(ns, { opacity: 1, duration: .35, ease: 'none' }, .12)
        .to(light, { opacity: 1, duration: .55, ease: 'power1.inOut' }, .25)
        .to(lit, { opacity: 1, duration: .12, ease: 'none' }, .75)
        .to(ns, { opacity: 0, duration: .12, ease: 'none' }, .75)
        .fromTo(f26, { x: () => R.x, y: () => R.y, scale: () => R.s }, { x: 0, y: 0, scale: 1, duration: .75, ease: 'power3.out' }, .80)
        .fromTo(others, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .50, ease: 'power3.out', stagger: .10 }, .95)
        .to(plateText, { autoAlpha: 1, duration: .30, ease: 'none' }, 1.30)
        .to(row, { '--floor': 1, duration: .30, ease: 'none' }, 1.30);
    }
    function state() {
      const p = tl.progress();
      hl.classList.toggle('is-lit', p > .5);
      head.classList.toggle('on-light', p > .3);
    }

    // triggered, not scrubbed: the timeline plays forward once the pin passes 12% and reverses above it
    const AT = .12;
    let armed = false;
    const pin = ScrollTrigger.create({
      trigger: hl, start: 'top top', end: desk ? '+=100%' : '+=80%',
      pin: true, pinSpacing: true, anticipatePin: 1,
      onUpdate: self => {
        const on = self.progress >= AT;
        if (on === armed) return;
        armed = on;
        on ? tl.timeScale(1).play() : tl.timeScale(1).reverse();
      },
      onLeave: () => { armed = true; if (tl.progress() < 1) tl.timeScale(4).play(); },   // a fast fling never releases mid-move
      onEnterBack: () => { armed = true; tl.timeScale(1).play(); }
    });
    hlState.pin = pin;

    // keyboard: tabbing into the plate while the cove is still showing brings the lights up first
    const onFocus = () => {
      if (tl.progress() === 1) return;
      if (scrollY < pin.start + (pin.end - pin.start) * AT) scrollTo({ top: pin.start + (pin.end - pin.start) * .4, behavior: 'auto' });
      armed = true;
      tl.progress(1);   // keyboard gets the finished plate at once, so no link is still hidden when focus arrives
    };
    plate.addEventListener('focusin', onFocus);

    const onRefresh = () => {
      const p = tl.progress();
      register();
      tl.invalidate().progress(0, true).progress(p, true);
      state();
    };
    ScrollTrigger.addEventListener('refresh', onRefresh);

    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      plate.removeEventListener('focusin', onFocus);
      tl.kill();
      hl.classList.remove('is-hl', 'is-lit');
      head.classList.remove('on-light');
      row.style.removeProperty('--floor');
      gsap.set([f26, lit, ns, light, ...others, ...plateText, ...heroType], { clearProps: 'all' });
      hlState.pin = null;
    };
  }

  /* ---- The peak: the F-26 at Goodwood, a canvas frame sequence scrubbed by scroll */
  function goodwood(desk) {
    const sec = $('#goodwood');
    const stage = $('.peak-stage', sec);
    const canvas = $('.peak-canvas', sec);
    const date = $('.peak-date', sec);
    const cap = $('.peak-cap', sec);
    const scrim = $('.peak-scrim', sec);
    const still = $('.peak-still img', sec);
    const N = desk ? 115 : 96;
    const pad = n => String(n).padStart(3, '0');
    const src = i => desk ? `assets/seq/d/f${pad(i + 1)}.webp` : `assets/seq/m/m${pad(i + 1)}.webp`;
    const frames = new Array(N);
    const g = canvas.getContext('2d');
    let want = 0, drawn = -1, alive = true;

    sec.classList.add('is-film');

    function size() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      drawn = -1; draw();
    }
    function nearest(i) {
      if (frames[i]) return frames[i];
      for (let d = 1; d < N; d++) {
        if (frames[i - d]) return frames[i - d];
        if (frames[i + d]) return frames[i + d];
      }
      return null;
    }
    function draw() {
      const img = nearest(want) || (still.complete && still.naturalWidth ? still : null);
      if (!img) return;
      const key = img === still ? -2 : frames.indexOf(img);
      if (key === drawn) return;
      const cw = canvas.width, ch = canvas.height, iw = img.naturalWidth, ih = img.naturalHeight;
      g.fillStyle = '#000'; g.fillRect(0, 0, cw, ch);
      if (desk && img !== still && cw / ch < 1.6) {
        // squarer desktop screens (4:3, 5:4): the full frame at the top, black below for the caption — never cropped onto the car
        const w = cw, h = ih * cw / iw, dpr = cw / canvas.clientWidth;
        g.drawImage(img, 0, Math.min(0, ch - h - 300 * dpr), w, h);   // keep ≥ 300 css px of black for the caption
      } else {
        const s = Math.max(cw / iw, ch / ih), w = iw * s, h = ih * s;
        g.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      }
      drawn = key;
    }

    // progressive loading in buckets (every 8th, 4th, 2nd, then the rest), started when the atelier approaches
    let started = false;
    function load() {
      if (started) return; started = true;
      const order = [], seen = new Set();
      [8, 4, 2, 1].forEach(step => { for (let i = 0; i < N; i += step) if (!seen.has(i)) { seen.add(i); order.push(i); } });
      if (!seen.has(N - 1)) order.splice(1, 0, N - 1);
      let k = 0, active = 0;
      const next = () => {
        while (alive && active < 6 && k < order.length) {
          const i = order[k++]; active++;
          const im = new Image();
          im.decoding = 'async';
          im.src = src(i);
          im.decode().then(() => { frames[i] = im; if (Math.abs(i - want) < 6) { drawn = -1; draw(); } })
            .catch(() => {})
            .finally(() => { active--; next(); });
        }
      };
      next();
    }
    const loader = ScrollTrigger.create({ trigger: '#atelier', start: 'top bottom', onEnter: load });
    if (loader.progress > 0 || scrollY > loader.start) load();

    const film = { f: 0 };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage, start: 'top top', end: desk ? '+=360%' : '+=300%',
        pin: true, scrub: .6, anticipatePin: 1, onRefresh: size
      }
    });
    // 0–6 %: black and the dateline · 6–9 %: the dateline leaves · 9–12 %: the first frame comes up out of black
    tl.fromTo(date, { autoAlpha: 1 }, { autoAlpha: 0, duration: .03, ease: 'none' }, .06)
      .fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: .03, ease: 'none' }, .09)
      .fromTo(film, { f: 0 }, { f: N - 1, duration: .78, ease: 'none', onUpdate: () => { want = Math.round(film.f); draw(); } }, .12);
    tl.fromTo(desk ? [scrim, cap] : cap, { autoAlpha: 0 }, { autoAlpha: 1, duration: .05, ease: 'none' }, .90);
    tl.to({}, { duration: .05 }, .95);   // the hold on 8.50 s, to the end of the pin

    size();
    return () => {
      alive = false;
      sec.classList.remove('is-film');
      gsap.set([date, canvas, cap, scrim], { clearProps: 'all' });
    };
  }

  // geometry changes that move the triggers: fonts and late images (G8)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
})();
