/* =========================================================================
   Gunther Werks Miami — Concept E · motion and interaction (UI-E "Glass & Key")
   GSAP 3.13 + ScrollTrigger + Lenis 1.3. GSAP is the lowest sufficient method: the page pins and
   scrubs to scroll (statement words, silhouette → lit, the Goodwood film, the heritage strip) and
   coordinates interruptible tab states on shared timelines, which CSS/WAAPI cannot do.
   Content is complete without this file (G7). ?full / ?state and prefers-reduced-motion skip every
   pin, scrub and smooth scroll; every state stays reachable by click and keyboard.
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
  const isDesk = () => innerWidth >= 1024;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const pad2 = n => String(n).padStart(2, '0');
  root.classList.add(MOTION ? 'motion' : 'no-motion');
  if (HAS_GSAP) gsap.registerPlugin(ScrollTrigger);
  const EX = 'expo.out';

  /* ------------------------------------------------------------------ data (sourced: research/corp) */
  const P = {
    f26: { name: 'F-26', group: 'p', lamp: '', kick: 'Standard program · 01 / 04', line: 'The future of analog power. Limited to 26 examples worldwide.', cut: 'assets/cut-f26-2400.webp', ar: 2400 / 803, cove: 'assets/cove-f26.jpg', light: '255, 246, 236',
      det: { img: 'assets/det-f26.jpg', alt: 'The F-26 in side profile in a warm grey studio cove.', light: true, box: [.165, .33, .835, .70], spots: [
        { x: .195, y: .56, cx: .10, cy: .74, t: 'Slantnose front', s: 'A tribute to the 930 Flachbau' },
        { x: .50, y: .41, cx: .29, cy: .17, t: 'Cockpit', s: 'Carbon, leather and Alcantara' },
        { x: .47, y: .53, cx: .37, cy: .755, t: 'Body', s: 'Carbon fibre, made in-house' },
        { x: .605, y: .645, cx: .585, cy: .755, t: 'Chassis', s: '250% stiffer than the original 993’s', src: 'Robb Report, 29 Jul 2026' },
        { x: .755, y: .47, cx: .60, cy: .11, t: 'Engine', s: 'Twin-turbocharged 4.0-litre flat-six, co‑developed with Rothsport Racing. 1,000 hp, six-speed manual.', img: 'assets/mac-engine.jpg', alt: 'The F-26 engine: twin-turbo 4.0 with carbon intake plumbing.', src: 'Gunther Werks F-26 release, 15 Aug 2025', open: true }
      ] },
      sheet: { kick: 'Standard program · 01 / 04', desc: 'Sculpted entirely from carbon fibre, its front end a tribute to the Porsche 930 Flachbau and 935 racers. At the rear, a 4.0-litre flat-six co‑developed with Rothsport Racing.',
        specs: [['Base', 'Porsche 993 Carrera'], ['Engine', 'Twin-turbocharged 4.0 L flat-six, Rothsport Racing'], ['Power', '1,000 hp @ 7,600 rpm'], ['Torque', '750 lb-ft'], ['Gearbox', 'Six-speed manual'], ['Drive', 'Rear-wheel drive, limited-slip differential'], ['Body', 'Carbon fibre'], ['Production', '26 examples']],
        src: 'Gunther Werks F-26 programme page and release, 15 Aug 2025 · Base: Robb Report, 29 Jul 2026',
        vid: 'assets/sheet-f26.mp4', poster: 'assets/sheet-f26-poster.jpg', cap: 'Goodwood Festival of Speed · from the start line',
        news: [['Robb Report · 29 Jul 2026', 'F-26 named Restomod of the Year'], ['Top Gear · 20 Jul 2026', 'F-26 first drive']] } },
    turbo: { name: 'Turbo', group: 'p', lamp: '', kick: 'Standard program · 02 / 04', line: 'Inspired by forced induction. Turbocharged 993. Limited to 75 examples worldwide.', cut: 'assets/cut-turbo-1400.webp', ar: 1292 / 435, cove: 'assets/cove-turbo.jpg', light: '255, 214, 176',
      det: { img: 'assets/det-turbo.jpg', alt: 'The orange Turbo, rear three-quarter, in an amber studio cove.', box: [.16, .33, .83, .72], spots: [
        { x: .19, y: .62, cx: .08, cy: .80, t: 'Integrated nose lift', s: 'Hydraulic, controlled from the wheel' },
        { x: .45, y: .42, cx: .60, cy: .11, t: 'Cockpit', s: 'Our own carbon-fibre steering wheel, with controls for track mode and the integrated nose lift.', img: 'assets/mac-turbo.jpg', alt: 'The Turbo cockpit: steering wheel and gauges.', src: 'Gunther Werks Turbo program', open: true },
        { x: .615, y: .50, cx: .30, cy: .765, t: 'Rear quarters', s: 'Carbon fenders, quarters, roof and hood' },
        { x: .725, y: .44, cx: .52, cy: .765, t: 'Rear wing', s: 'Carbon fibre; ducktail optional' },
        { x: .74, y: .565, cx: .74, cy: .80, t: 'Engine', s: '4.0 L twin-turbo, Rothsport Racing built, 7,500 rpm' }
      ] },
      sheet: { kick: 'Standard program · 02 / 04', desc: 'Inspired by forced induction: a turbocharged 993 with our own carbon-fibre steering wheel, a track mode and an integrated hydraulic nose lift.',
        specs: [['Base', 'Porsche 993'], ['Engine', '4.0 L twin-turbo flat-six, Gunther Werks specified, Rothsport Racing built'], ['Redline', '7,500 rpm'], ['Gearbox', 'Getrag six-speed, custom ratios'], ['Body', 'Carbon fenders, quarters, roof, hood, bumpers, wing'], ['Nose lift', 'Hydraulic'], ['Production', '75 examples']],
        src: 'Gunther Werks Turbo program page',
        vid: 'assets/sheet-turbo.mp4', poster: 'assets/sheet-turbo-poster.jpg', cap: 'Goodwood Festival of Speed · up the hill',
        news: [['Press release · 8 Jul 2026', 'Gunther Werks heads to the Goodwood Festival of Speed'], ['Press release · 21 Oct 2026', 'The Brundle Edition, from the Turbo program']] } },
    gwr: { name: 'GWR', group: 'p', lamp: '', kick: 'Standard program · 03 / 04', line: 'The definitive 993. Naturally aspirated performance. Limited to 40 examples.', cut: 'assets/cut-gwr-2400.webp', ar: 2400 / 806, cove: 'assets/cove-gwr.jpg', light: '232, 244, 255',
      det: { img: 'assets/det-gwr.jpg', alt: 'The turquoise GWR, front three-quarter, in a dark blue studio cove.', box: [.17, .30, .76, .69], spots: [
        { x: .36, y: .457, cx: .60, cy: .11, t: 'S-duct hood', s: 'Generates high-pressure downforce over the front axle, for traction and precise handling.', img: 'assets/mac-gwr.jpg', alt: 'The GWR front three-quarter in the GW Haus courtyard.', src: 'Gunther Werks GWR program', open: true },
        { x: .25, y: .585, cx: .07, cy: .76, t: 'Front bumper', s: 'Fender louvres and aero vents' },
        { x: .485, y: .637, cx: .29, cy: .755, t: 'Turbofan wheels', s: 'With aero fins' },
        { x: .64, y: .47, cx: .51, cy: .755, t: 'Engine', s: '4.0 L quad-cam, naturally aspirated, 9,000 rpm' },
        { x: .715, y: .40, cx: .74, cy: .74, t: 'Ventilated ducktail', s: 'Vents expel engine heat' }
      ] },
      sheet: { kick: 'Standard program · 03 / 04', desc: 'The definitive 993. Naturally aspirated, with S-ducting on the hood for downforce over the front axle, and a vented ducktail and taillights to expel engine heat.',
        specs: [['Engine', '4.0 L quad-cam, twin-valve flat-six, naturally aspirated'], ['Power', '500+ hp @ 9,000 rpm'], ['Torque', '340 lb-ft'], ['Gearbox', 'Re-engineered Getrag G50 six-speed'], ['Weight', '2,400 lb'], ['Wheels', 'Turbofan, with aero fins'], ['Production', '40 examples']],
        src: 'Gunther Werks GWR program page', img: 'assets/sheet-gwr.jpg', cap: 'GWR · Gunther Werks studio',
        news: [['Press release · 21 Oct 2026', 'Brundle Edition unveiled'], ['Press release · 14 Aug 2026', 'The GXR-EVO revealed at The Quail']] } },
    gwx: { name: 'GWX', group: 'p', lamp: 'gold', kick: 'By invitation only · 04 / 04', line: 'The pinnacle of innovation. One-of-one and few-off editions.', cut: 'assets/cut-gwx-2400.webp', ar: 2400 / 774, cove: 'assets/cove-gwx.jpg', light: '255, 226, 234',
      det: { img: 'assets/det-gwx.jpg', alt: 'The Candy Purple GWX, front three-quarter, with a red rim light.', box: [.16, .35, .82, .80], spots: [
        { x: .56, y: .62, cx: .60, cy: .11, t: 'Candy Purple', s: 'A paint exclusive to the GWX. Each commission is one-of-one or few-off — nothing off the menu.', img: 'assets/mac-gwx.jpg', alt: 'Exposed carbon fibre against Candy Purple paint.', src: 'GWX release, 13 Aug 2025', open: true },
        { x: .30, y: .53, cx: .07, cy: .86, t: 'Body', s: 'Bespoke carbon panels' },
        { x: .524, y: .45, cx: .29, cy: .17, t: 'Interior', s: 'Custom-dyed leathers, Alcantara detailing' },
        { x: .764, y: .55, cx: .76, cy: .86, t: 'Engine', s: 'Unique configurations, by commission' }
      ] },
      sheet: { kick: 'By invitation only · 04 / 04', desc: 'The pinnacle of Gunther Werks innovation: a culmination of everything learned from years of precision engineering. Each commission is a one-of-one masterpiece — nothing is off the menu.',
        specs: [['Commissions', 'One-of-one and few-off editions'], ['Engine', 'Unique configurations, by commission'], ['Paint', 'Candy Purple, exclusive to GWX'], ['Body', 'Bespoke carbon panels'], ['Interior', 'Custom-dyed leathers, Alcantara'], ['Access', 'By invitation only']],
        src: 'Gunther Werks GWX page · GWX release, 13 Aug 2025', img: 'assets/sheet-gwx.jpg', cap: 'GWX · Gunther Werks studio',
        news: [['Press release · 21 Oct 2026', 'Brundle Edition unveiled'], ['Press release · 14 Aug 2026', 'The GXR-EVO revealed at The Quail']] } },
    gxr: { name: 'GXR-EVO', group: 'e', lamp: 'gxr', kick: 'Special edition · Track focused', line: 'Limited to 15 units globally. Revealed at The Quail, 14 August 2026.', cut: 'assets/cut-gxr-2400.webp', ar: 2400 / 757, cove: 'assets/cove-gxr.jpg', light: '255, 214, 218' },
    brundle: { name: 'Brundle Edition', group: 'e', lamp: '', kick: 'Special edition · Turbo program', line: 'A tribute to Martin Brundle. Limited to just five examples worldwide.', cut: 'assets/cut-brundle-2400.webp', ar: 2400 / 675, cove: 'assets/cove-brundle.jpg', light: '236, 242, 255' },
    thermal: { name: 'Thermal Edition', group: 'e', lamp: '', kick: 'Special edition · Turbo program', line: 'A tribute to Gunther Werks and The Thermal Club. Limited to just five examples worldwide.', cut: 'assets/cut-thermal-1400.webp', ar: 1322 / 418, cove: 'assets/cove-thermal.jpg', light: '255, 230, 228' },
    endgame: { name: 'End Game', group: 'e', lamp: 'off', kick: 'Completed commission · 1 of 1', line: 'The final Speedster, and the first one-of-one from GWX.', cut: 'assets/cut-endgame-2400.webp', ar: 2400 / 725, cove: 'assets/cove-endgame.jpg', light: '240, 244, 250' }
  };
  const NAME_SHORT = { 'Brundle Edition': 'Brundle', 'Thermal Edition': 'Thermal' };
  const STEPS = [
    { n: 'Owner’s application', t: 'It begins with an application.', p: 'A commission starts with an owner’s application — part of Gunther Werks’ purchase screening process — and a first conversation with Javier Roque in Miami.', s: 'Gunther Werks, Owner’s Application', a: 'assets/com-app-a.jpg', aa: 'GW Haus at Folktale Winery from the air, cars among the vineyards.' },
    { n: 'Customization', t: 'Nothing off the menu.', p: 'Clients control the customization of the interior with bespoke leather, Alcantara, carbon fibre and billet aluminium accents.', s: 'Gunther Werks, Customization', a: 'assets/com-cus-b.jpg', aa: 'Blue Alcantara dash with an embroidered Greek-key pattern.' },
    { n: 'The build', t: 'Reengineered in California.', p: 'Each car begins with a Porsche 993 donor. Over 90% of its components are designed and produced in-house, with carbon fibre and CNC machining under one roof.', s: 'Robb Report, 29 Jul 2026 · Gunther Werks background', a: 'assets/com-bld-a.jpg', aa: 'A bare 993 body shell on a two-post lift.' },
    { n: 'Delivery', t: 'A meal, then the billet key.', p: 'On the day you collect your car, a meal is prepared for you by one of the finest chefs at the Huntington Beach facility, your car behind you. Then the billet key is placed in your hand.', s: 'Gunther Werks, Ownership', a: 'assets/com-dinner.jpg', aa: 'A long-table dinner in a barrel room, a Gunther Werks 4.0 engine as the centrepiece.' },
    { n: 'Ownership', t: 'Your investment, secured.', p: 'Every commission is supported by a 5-year or 100,000-mile warranty, whichever comes first, including access to future upgrades — and it stays with the car for each successive owner.', s: 'Gunther Werks, Ownership', a: 'assets/com-key.jpg', aa: 'The billet X-pattern keys in their presentation box.' }
  ];
  const PSP = { phoenix: { n: 10, name: 'Phoenix', spec: 'Speedster · 435+ bhp', alt: 'Phoenix, a yellow Gunther Werks Speedster', card: '05' },
    bluephoenix: { n: 9, name: 'Blue Phoenix', spec: 'Speedster · 445+ bhp', alt: 'Blue Phoenix, a blue Gunther Werks Speedster', card: '05' },
    rubystone: { n: 6, name: 'Rubystone', spec: 'Coupe · 435+ bhp', alt: 'Rubystone, a Coupe in Porsche Rubystone Red', card: '02' } };

  /* ------------------------------------------------------------------ scroll engine */
  let lenis = null;
  if (MOTION) {
    lenis = new Lenis({ lerp: .085, smoothWheel: true, anchors: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const target = t => (t.parentElement && t.parentElement.classList.contains('pin-spacer')) ? t.parentElement : t;
  function scrollToEl(el, o = {}) {
    if (!el) return;
    if (el.id === 'top') { lenis ? lenis.scrollTo(0, { duration: 1.4 }) : scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' }); return; }
    el = target(el);
    if (lenis) lenis.scrollTo(el, { duration: o.duration || 1.3, lock: !!o.lock, onComplete: o.done });
    else { el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); o.done && setTimeout(o.done, RM ? 0 : 700); }
  }
  d.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.hasAttribute('data-sheet') || a.classList.contains('js-rail-go')) return;
    const id = a.getAttribute('href'); if (id.length < 2) { e.preventDefault(); return; }
    const t = $(id); if (!t) return;
    e.preventDefault();
    const wasMenu = !menu.hidden, wasSheet = !sheet.hidden;
    closeMenu(); if (wasSheet) closeSheet();
    setTimeout(() => scrollToEl(t), wasSheet ? 450 : wasMenu ? 200 : 0);
  });

  /* ------------------------------------------------------------------ buttons: a pool of light follows the pointer */
  if (HOVER) d.addEventListener('pointermove', e => {
    const b = e.target.closest('.btn--lit, .btn--onlight'); if (!b) return;
    const r = b.getBoundingClientRect(); b.style.setProperty('--px', ((e.clientX - r.left) / r.width * 100) + '%'); b.style.setProperty('--py', ((e.clientY - r.top) / r.height * 100) + '%');
  }, { passive: true });

  /* ------------------------------------------------------------------ light tracks and tab tracks */
  function lt(line, i, n) { const seg = line && $('i', line); if (!seg || !line.clientWidth) return; const w = seg.offsetWidth; seg.style.left = (n > 1 ? (line.clientWidth - w) * i / (n - 1) : 0) + 'px'; }
  function ltSet(box, i, n) { lt($('.ltrack__line', box), i, n); const nb = $('.ltrack__n', box); if (nb) nb.innerHTML = `<b>${pad2(i + 1)}</b> / ${pad2(n)}`; const pv = $('.ltrack__prev', box), nx = $('.ltrack__next', box); pv && pv.setAttribute('aria-disabled', i === 0); nx && nx.setAttribute('aria-disabled', i === n - 1); }
  function pool(track) { const on = $(':scope > .is-on', track), p = $('.track__pool', track); if (!on || !p) return; p.style.width = on.offsetWidth + 'px'; p.style.transform = `translateX(${on.offsetLeft}px)`; }
  function setTab(track, btn) {
    const items = $$(':scope > button', track);
    items.forEach(b => { const on = b === btn; b.classList.toggle('is-on', on); b.setAttribute(b.getAttribute('role') === 'radio' ? 'aria-checked' : 'aria-selected', on); b.tabIndex = on ? 0 : -1; });
    pool(track);
    if (track.scrollWidth > track.clientWidth + 2) track.scrollTo({ left: btn.offsetLeft - (track.clientWidth - btn.offsetWidth) / 2, behavior: RM ? 'auto' : 'smooth' });
  }
  function tabKeys(track, act) {
    track.addEventListener('keydown', e => {
      const bs = $$(':scope > button:not(:disabled)', track), i = bs.indexOf(d.activeElement); if (i < 0) return;
      let n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = bs[(i + 1) % bs.length];
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = bs[(i - 1 + bs.length) % bs.length];
      if (e.key === 'Home') n = bs[0]; if (e.key === 'End') n = bs[bs.length - 1];
      if (n) { e.preventDefault(); n.focus(); act(n); }
    });
  }

  /* ------------------------------------------------------------------ header: fog, tone, current section */
  const hdNav = $('.hd__nav'), hdPool = $('.hd__pool'), navLinks = $$('.hd__nav a'), menuLinks = $$('.menu__nav a');
  let curId = null;
  function headerState() {
    const y = (lenis ? lenis.scroll : scrollY);
    root.classList.toggle('is-fog', y > 24);
    const probe = 40;
    root.classList.toggle('hd-light', $$('[data-hd="light"]').some(z => { const r = z.getBoundingClientRect(); return r.top <= probe && r.bottom > probe; }));
    const mid = innerHeight * .45; let id = null;
    navLinks.forEach(a => { const t = $(a.getAttribute('href')); if (!t) return; const r = t.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) id = a.getAttribute('href'); });
    if (!id && $('#studio').getBoundingClientRect().top <= mid && $('#atelier').getBoundingClientRect().bottom > mid) id = '#programs';
    if (id === curId) return; curId = id;
    [...navLinks, ...menuLinks].forEach(a => { const on = a.getAttribute('href') === id; on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'); });
    const a = navLinks.find(x => x.getAttribute('href') === id);
    if (a && hdNav.offsetParent) { hdPool.classList.add('is-on'); hdPool.style.transform = `translateX(${a.offsetLeft + a.offsetWidth / 2 - 36}px)`; } else hdPool.classList.remove('is-on');
  }
  if (lenis) lenis.on('scroll', headerState); else addEventListener('scroll', headerState, { passive: true });

  /* ------------------------------------------------------------------ menu: a bottom glass sheet */
  const menu = $('#menu'), menuBtn = $('.hd__menu'), mSheet = $('.menu__sheet', menu);
  function openMenu() {
    menu.hidden = false; root.classList.add('is-menu'); menuBtn.setAttribute('aria-expanded', 'true'); lenis && lenis.stop();
    $('#main').inert = true; $('.ft').inert = true;
    if (HAS_GSAP) RM ? gsap.fromTo(mSheet, { opacity: 0 }, { opacity: 1, duration: .16 }) : gsap.fromTo(mSheet, { yPercent: 100 }, { yPercent: 0, duration: .56, ease: EX });
    $('.menu__nav a', menu).focus();
  }
  function closeMenu() {
    if (menu.hidden) return;
    lenis && lenis.start(); $('#main').inert = false; $('.ft').inert = false;
    const done = () => { menu.hidden = true; root.classList.remove('is-menu'); menuBtn.setAttribute('aria-expanded', 'false'); lenis && lenis.start(); $('#main').inert = false; $('.ft').inert = false; menuBtn.focus({ preventScroll: true }); };
    if (HAS_GSAP && !RM) gsap.to(mSheet, { yPercent: 100, duration: .32, ease: 'power3.in', onComplete: done }); else done();
  }
  menuBtn.addEventListener('click', () => menu.hidden ? openMenu() : closeMenu());
  menu.addEventListener('click', e => { if (e.target.closest('[data-mclose]')) closeMenu(); });
  (function swipeClose() { let y0 = null; mSheet.addEventListener('pointerdown', e => { if (mSheet.scrollTop <= 0) y0 = e.clientY; }); mSheet.addEventListener('pointerup', e => { if (y0 !== null && e.clientY - y0 > 60) closeMenu(); y0 = null; }); })();

  /* ------------------------------------------------------------------ 4 · showroom: haze, torch reveal, roll forward */
  const night = $('.night'), cars = $$('.night .car'), railText = $('.js-rail'), railGo = $('.js-rail-go'), railLine = $('.night__rail .ltrack__line');
  let selected = cars[0];
  const carLine = c => { const nm = $('.nm', c).textContent, num = $('.num', c).textContent.trim(); return isNaN(+num) ? `${nm} · ${num} only` : `${nm} · ${+num === 1 ? 'One of one' : 'Limited to ' + num + ' examples'}${c.classList.contains('car--legacy') ? ' · completed' : ''}`; };
  function railTo(c) { railText.textContent = carLine(c); railGo.hidden = c.classList.contains('car--legacy'); lt(railLine, cars.indexOf(c), cars.length); }
  function light(c) { cars.forEach(x => { const on = x === c; x.classList.toggle('is-lit', on); $('button', x).setAttribute('aria-pressed', on); }); railTo(c); }
  cars.forEach(c => {
    const b = $('button', c), g = $('.car__g', c), st = $('.car__stack', c);
    const move = e => { const r = st.getBoundingClientRect(); g.style.setProperty('--mx', (e.clientX - r.left) + 'px'); g.style.setProperty('--my', (e.clientY - r.top) + 'px'); };
    b.addEventListener('pointerenter', e => { if (e.pointerType !== 'mouse') return; move(e); c.classList.add('is-hover'); night.classList.add('has-hover'); railTo(c); });
    b.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' && !RM) move(e); });
    b.addEventListener('pointerleave', e => { if (e.pointerType !== 'mouse') return; c.classList.remove('is-hover'); if (!$('.car.is-hover', night)) { night.classList.remove('has-hover'); railTo(selected); } });
    b.addEventListener('focus', () => { if (b.matches(':focus-visible')) light(c); });
    b.addEventListener('blur', () => light(selected));
    b.addEventListener('click', e => {
      const touch = e.pointerType === 'touch' || (!HOVER && e.pointerType !== 'mouse');
      const first = selected !== c; selected = c; light(c);
      if (touch && first) return;                       // tap 1: the haze and the colour; the View link (or tap 2) enters
      if (!c.classList.contains('car--legacy')) roll(c);
    });
  });
  railGo.addEventListener('click', e => { e.preventDefault(); if (!selected.classList.contains('car--legacy')) roll(selected); });
  let studioPin = null;
  const studioEnd = () => studioPin ? studioPin.end : target($('#studio')).getBoundingClientRect().top + (lenis ? lenis.scroll : scrollY);
  function roll(c) {
    const k = c.dataset.k, data = P[k]; if (!data) return;
    const toAtelier = data.group === 'p';
    const dest = toAtelier ? $('#atelier') : $('#studio');
    setStudio(k, true); if (toAtelier) setAtelier(k, true);
    if (!MOTION) { scrollToEl(dest); return; }
    const from = $('.car__stack', c).getBoundingClientRect(), vw = innerWidth, vh = innerHeight;
    let to;
    if (toAtelier) { const sw = Math.max(vw, vh * 16 / 9), sh = sw * 9 / 16, sl = (vw - sw) / 2, stp = (vh - sh) / 2, bx = data.det.box, w = (bx[2] - bx[0]) * sw; to = { x: sl + bx[0] * sw, y: stp + bx[3] * sh - w / data.ar, w }; }
    else { const w = vw < 768 ? vw - 16 : vw * .58; to = { x: (vw - w) / 2, y: vh * .64 - w / data.ar, w }; }
    const ghost = $('.ghost'); ghost.innerHTML = `<img src="${data.cut}" alt="">`;
    gsap.set(ghost, { display: 'block', x: from.left, y: from.top, width: from.width, opacity: 1 });
    gsap.timeline({ onComplete: () => gsap.set(ghost, { display: 'none' }) })
      .to(ghost, { x: to.x, y: to.y, width: to.w, duration: .9, ease: 'expo.inOut' })
      .to(ghost, { opacity: 0, duration: .5, ease: 'power2.out' }, '>-0.05');
    if (toAtelier) scrollToEl(dest, { duration: .9, lock: true, done: () => revealSpots() });
    else lenis.scrollTo(studioEnd(), { duration: .9, lock: true });
  }
  if (MOTION) ScrollTrigger.create({ trigger: night, start: 'top 55%', once: true, onEnter: () => { [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach((i, n) => gsap.delayedCall(n * .16, () => light(cars[i]))); } });

  /* ------------------------------------------------------------------ 5 · studio: one stage, a grouped track, the camera fixed */
  const studio = $('#studio'), sTrack = $('.track', studio), sName = $('.studio__name span', studio), detailsGo = $('[data-details]', studio);
  function etch() {
    const nameP = sName.parentElement; nameP.style.fontSize = '';
    const r = studio.getBoundingClientRect(), m = $('.studio__meta', studio).getBoundingClientRect();
    const avail = isDesk() ? r.width - 2 * (m.right - r.left + 32) : r.width - 32;
    const w = sName.getBoundingClientRect().width;
    if (w > avail) nameP.style.fontSize = (parseFloat(getComputedStyle(nameP).fontSize) * avail / w) + 'px';
    const s = sName.getBoundingClientRect(); sName.style.backgroundSize = `${r.width}px ${r.height}px`; sName.style.backgroundPosition = `${-(s.left - r.left)}px ${-(s.top - r.top)}px`;
  }
  function setStudio(k, instant) {
    const data = P[k]; if (!data || studio.dataset.k === k) return; studio.dataset.k = k;
    const imgs = $$('.car-img', studio), on = imgs.find(i => i.classList.contains('is-on')) || imgs[0], nx = imgs.find(i => i !== on);
    const coves = $$('.cove', studio), con = coves.find(i => i.classList.contains('is-on')), cnx = coves.find(i => i !== con);
    const meta = $('.studio__meta', studio);
    const write = () => {
      $('.js-kick', studio).textContent = data.kick; $('.js-name', studio).textContent = data.name; $('.js-line', studio).textContent = data.line;
      $('.js-enq', studio).textContent = 'Enquire about the ' + (NAME_SHORT[data.name] || data.name);
      const lp = $('.js-lamp', studio); lp.className = 'lamp js-lamp' + (data.lamp ? ' lamp--' + data.lamp : '');
      sName.textContent = NAME_SHORT[data.name] || data.name; sName.style.setProperty('--cove-img', `url(${data.cove})`); $('.car-ref', studio).src = data.cut; etch();
    };
    nx.src = data.cut; nx.alt = `The ${data.name} in side profile.`; on.alt = '';
    cnx.src = data.cove;
    studio.style.setProperty('--light-rgb', data.light);
    const btn = $(`button[data-k="${k}"]`, sTrack); btn && setTab(sTrack, btn);
    detailsGo.hidden = data.group !== 'p';
    const swap = () => { on.classList.remove('is-on'); nx.classList.add('is-on'); con.classList.remove('is-on'); cnx.classList.add('is-on'); };
    if (!HAS_GSAP || RM || instant) { swap(); write(); return; }
    swap();
    gsap.to([sName, meta], { opacity: 0, duration: .28, ease: 'power2.in', onComplete: () => { write(); gsap.to([sName, meta], { opacity: 1, duration: .56, ease: EX }); } });
  }
  $$(':scope > button', sTrack).forEach(b => b.addEventListener('click', () => { setStudio(b.dataset.k); if (P[b.dataset.k].group === 'p') setAtelier(b.dataset.k); }));
  tabKeys(sTrack, b => { setStudio(b.dataset.k); if (P[b.dataset.k].group === 'p') setAtelier(b.dataset.k); });
  detailsGo.addEventListener('click', () => setAtelier(studio.dataset.k, true));
  $('.studio__enq', studio).addEventListener('click', () => preselect(studio.dataset.k));
  studio.dataset.k = 'f26'; sName.style.setProperty('--cove-img', `url(${P.f26.cove})`);

  /* ------------------------------------------------------------------ 6 · atelier: the key opens the car */
  const atelier = $('#atelier'), stage = $('.stage', atelier), spotsEl = $('.spots', stage), svg = $('.leaders', stage), aTrack = $('.track', atelier);
  let bsheet = null;
  function spotHTML(s, i) {
    return `<div class="spot${s.open ? ' is-open' : ''}${s.img ? ' has-ph' : ''}" data-i="${i}" style="--x:${s.x};--y:${s.y};--cx:${s.cx};--cy:${s.cy}">
      <button class="key" type="button" aria-expanded="${!!s.open}" aria-controls="hc-${i}" aria-label="${s.t}: open detail"><svg aria-hidden="true"><use href="#key"/></svg></button>
      <div class="hc glass glass--smoke" id="hc-${i}" role="button" tabindex="-1">${s.img ? `<span class="hc__ph"><img src="${s.img}" alt="${s.alt || ''}" width="900" height="900"></span>` : ''}<span class="hc__t"><b>${s.t}</b><span>${s.s}</span>${s.src ? `<em>${s.src}</em>` : ''}</span><i class="pm" aria-hidden="true"></i></div></div>`;
  }
  function leaders(animate) {
    const sr = stage.getBoundingClientRect(); if (!sr.width || !isDesk()) { svg.innerHTML = ''; return; }
    svg.setAttribute('viewBox', `0 0 ${sr.width.toFixed(0)} ${sr.height.toFixed(0)}`);
    const gut = parseFloat(getComputedStyle(root).getPropertyValue('--g')) || 48, vw = root.clientWidth;
    const obs = [$('.atelier__head', atelier), $('.atelier__acts', atelier)].map(o => o.getBoundingClientRect());
    $$('.hc', spotsEl).forEach(h => {
      h.style.marginLeft = '0px'; const r = h.getBoundingClientRect(); let dx = 0;
      if (r.left < gut) dx = gut - r.left; else if (r.right > vw - gut) dx = vw - gut - r.right;
      obs.forEach(o => { const L = r.left + dx, R = r.right + dx; if (L < o.right + 16 && R > o.left && r.top < o.bottom + 8 && r.bottom > o.top - 8) dx += o.right + 24 - L; });
      if (dx) h.style.marginLeft = dx + 'px';
    });
    const out = [];
    $$('.spot', spotsEl).forEach(sp => {
      const kr = $('.key', sp).getBoundingClientRect(), cr = $('.hc', sp).getBoundingClientRect();
      const P0 = { x: kr.left + kr.width / 2 - sr.left, y: kr.top + kr.height / 2 - sr.top };
      const L = cr.left - sr.left, T = cr.top - sr.top, R = L + cr.width, B = T + cr.height;
      const pts = [];
      if (P0.y < T || P0.y > B) {                                  // card above or below: 45° then plumb
        const sy = P0.y < T ? 1 : -1, edge = sy > 0 ? T : B, tx = clamp(P0.x, L + 18, R - 18), dx = tx - P0.x, sx = Math.sign(dx) || 1;
        const leg = clamp(Math.abs(dx) || 24, 24, Math.max(24, Math.min(64, Math.abs(edge - P0.y) - 18)));
        const C = { x: P0.x + sx * leg, y: P0.y + sy * leg };
        pts.push(C);
        if (C.x < L + 10 || C.x > R - 10) pts.push({ x: tx, y: C.y });
        pts.push({ x: pts[pts.length - 1].x, y: edge });
      } else {                                                     // card left or right: 45° then level
        const sx = P0.x < L ? 1 : -1, edge = sx > 0 ? L : R, ty = clamp(P0.y, T + 14, B - 14), dy = ty - P0.y, sy = Math.sign(dy) || -1;
        const leg = clamp(Math.abs(dy) || 24, 24, Math.max(24, Math.min(64, Math.abs(edge - P0.x) - 18)));
        const C = { x: P0.x + sx * leg, y: P0.y + sy * leg };
        pts.push(C);
        if (C.y < T + 8 || C.y > B - 8) pts.push({ x: C.x, y: ty });
        pts.push({ x: edge, y: pts[pts.length - 1].y });
      }
      const f = pts[0], dl = Math.hypot(f.x - P0.x, f.y - P0.y) || 1, gap = 28;
      const S = { x: P0.x + (f.x - P0.x) / dl * gap, y: P0.y + (f.y - P0.y) / dl * gap }, E = pts[pts.length - 1];
      const dim = atelier.classList.contains('has-open') && !sp.classList.contains('is-open') ? ' class="is-dim"' : '';
      out.push(`<path${dim} d="M${S.x.toFixed(1)} ${S.y.toFixed(1)}${pts.map(p => `L${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join('')}"/><circle${dim} cx="${E.x.toFixed(1)}" cy="${E.y.toFixed(1)}" r="1.5"/>`);
    });
    svg.innerHTML = out.join('');
    if (animate && MOTION) {
      $$('path', svg).forEach((p, i) => { const l = p.getTotalLength(); gsap.fromTo(p, { strokeDasharray: l, strokeDashoffset: l }, { strokeDashoffset: 0, duration: .56, delay: .3 + i * .06, ease: EX }); });
      gsap.fromTo($$('circle', svg), { opacity: 0 }, { opacity: 1, duration: .24, delay: .86, stagger: .06 });
    }
  }
  function openSpot(sp, from) {
    const wasOpen = sp.classList.contains('is-open');
    const tgt = (from === 'toggle' && wasOpen) ? null : sp;
    const flip = MOTION && from !== 'init' && isDesk() ? $$('.spot', spotsEl).filter(x => x === tgt || x.classList.contains('is-open')).map(x => { const h = $('.hc', x), r = h.getBoundingClientRect(); return [h, r.width, r.height]; }) : [];
    $$('.spot', spotsEl).forEach(x => { const on = x === tgt; x.classList.toggle('is-open', on); $('.key', x).setAttribute('aria-expanded', on); });
    flip.forEach(([h, w0, h0]) => { const r = h.getBoundingClientRect(); gsap.fromTo(h, { width: w0, height: h0 }, { width: r.width, height: r.height, duration: .56, ease: EX, clearProps: 'width,height', onUpdate: () => leaders(false), onComplete: () => leaders(false) }); });
    atelier.classList.toggle('has-open', !!tgt);
    leaders(false);
    if (tgt && MOTION && from !== 'init') {
      const ph = $('.hc__ph', tgt);
      if (ph) gsap.fromTo(ph, { clipPath: 'inset(50% 50% 50% 50% round 12px)' }, { clipPath: 'inset(0% 0% 0% 0% round 12px)', duration: .56, ease: EX });
      gsap.fromTo($$('.hc__t > span, .hc__t em', tgt), { opacity: 0 }, { opacity: 1, duration: .24, delay: .16 });
    }
    tgt && fillBottomSheet(tgt);
  }
  function fillBottomSheet(sp) {
    if (isDesk()) { if (bsheet) bsheet.hidden = true; return; }
    const s = P[stage.dataset.k].det.spots[+sp.dataset.i];
    if (!bsheet) { bsheet = d.createElement('div'); bsheet.className = 'bsheet glass glass--smoke'; bsheet.setAttribute('aria-live', 'polite'); atelier.appendChild(bsheet);
      let x0 = null; bsheet.addEventListener('pointerdown', e => { x0 = e.clientX; }); bsheet.addEventListener('pointerup', e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) { const all = $$('.spot', spotsEl), i = all.indexOf($('.spot.is-open', spotsEl)); openSpot(all[(i + (dx < 0 ? 1 : -1) + all.length) % all.length]); } }); }
    bsheet.hidden = false;
    bsheet.innerHTML = `${s.img ? `<img src="${s.img}" alt="${s.alt || ''}">` : ''}<div><b>${s.t}</b><p>${s.s}</p>${s.src ? `<em>${s.src}</em>` : ''}</div>`;
    requestAnimationFrame(() => {
      let ln = $('.bline', atelier); if (!ln) { ln = d.createElement('span'); ln.className = 'bline'; ln.setAttribute('aria-hidden', 'true'); atelier.appendChild(ln); }
      const ar = atelier.getBoundingClientRect(), kr = $('.key', sp).getBoundingClientRect(), br = bsheet.getBoundingClientRect();
      const x = kr.left + kr.width / 2 - ar.left, y0 = kr.bottom - ar.top + 8, y1 = br.top - ar.top;
      ln.style.cssText = `left:${x}px;top:${y0}px;height:${Math.max(0, y1 - y0)}px`; ln.hidden = atelier.classList.contains('is-hidden');
    });
  }
  function bindSpots() {
    $$('.spot', spotsEl).forEach(sp => {
      const k = $('.key', sp), c = $('.hc', sp);
      k.addEventListener('click', () => openSpot(sp, 'toggle'));
      c.addEventListener('click', () => openSpot(sp, 'toggle'));
      c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSpot(sp, 'toggle'); } });
      if (HOVER) k.addEventListener('pointerenter', () => !sp.classList.contains('is-open') && openSpot(sp));
    });
  }
  function revealSpots() {
    if (!MOTION) return;
    gsap.fromTo($$('.key', spotsEl), { scale: .5, opacity: 0 }, { scale: 1, opacity: 1, duration: .56, stagger: .06, ease: EX, clearProps: 'transform,opacity' });
    gsap.fromTo($$('.hc', spotsEl), { opacity: 0 }, { opacity: 1, duration: .56, stagger: .06, delay: .4, ease: 'power2.out', clearProps: 'opacity' });
    leaders(true);
    atelier.classList.remove('is-in'); void atelier.offsetWidth; atelier.classList.add('is-in');
  }
  function setAtelier(k, instant) {
    const data = P[k]; if (!data || !data.det) return;
    const btn = $(`button[data-k="${k}"]`, aTrack); btn && setTab(aTrack, btn);
    $('.js-sheet', atelier).textContent = 'Explore the ' + data.name;
    if (stage.dataset.k === k && spotsEl.dataset.built) return;
    stage.dataset.k = k; spotsEl.dataset.built = '1';
    const lightWall = !!data.det.light;
    (lightWall && isDesk()) ? atelier.setAttribute('data-hd', 'light') : atelier.removeAttribute('data-hd');
    atelier.classList.toggle('is-darkwall', !lightWall);
    atelier.style.setProperty('--ktint', lightWall ? .64 : .5);
    const imgs = $$('.stage__img', stage), on = imgs.find(i => i.classList.contains('is-on')), nx = imgs.find(i => i !== on);
    const build = () => {
      $('.js-aname', atelier).textContent = data.name;
      spotsEl.innerHTML = data.det.spots.map(spotHTML).join(''); bindSpots();
      const op = $('.spot.is-open', spotsEl); atelier.classList.toggle('has-open', !!op); op && openSpot(op, 'init');
      requestAnimationFrame(() => leaders(!instant));
      curId = null; headerState();
    };
    if (on.getAttribute('src') === data.det.img) { build(); return; }
    nx.src = data.det.img; nx.alt = data.det.alt; on.alt = '';
    const swap = () => { on.classList.remove('is-on'); nx.classList.add('is-on'); };
    if (!MOTION || instant) { swap(); build(); return; }
    gsap.to([spotsEl, svg], { opacity: 0, duration: .24, ease: 'power2.in', onComplete: () => { swap(); build(); gsap.to([spotsEl, svg], { opacity: 1, duration: .4, delay: .2 }); } });
  }
  $$(':scope > button', aTrack).forEach(b => b.addEventListener('click', () => { setAtelier(b.dataset.k); setStudio(b.dataset.k); }));
  tabKeys(aTrack, b => { setAtelier(b.dataset.k); setStudio(b.dataset.k); });
  const viewBtn = $('.atelier__view');
  viewBtn.addEventListener('click', () => { const h = !atelier.classList.contains('is-hidden'); atelier.classList.toggle('is-hidden', h); viewBtn.setAttribute('aria-pressed', h); $('span', viewBtn).textContent = h ? 'Show details' : 'View the car'; if (bsheet) bsheet.hidden = h; const ln = $('.bline', atelier); if (ln) ln.hidden = h; });
  stage.dataset.k = ''; setAtelier('f26', true);
  if (MOTION) ScrollTrigger.create({ trigger: atelier, start: 'top 45%', onEnter: revealSpots, onEnterBack: () => atelier.classList.add('is-in') }); else atelier.classList.add('is-in');

  /* ------------------------------------------------------------------ program sheet */
  const sheet = $('#sheet'); let sheetFrom = null;
  function openSheet(k) {
    const data = P[k] && P[k].sheet ? P[k] : P.f26, s = data.sheet;
    $('.js-skick', sheet).textContent = s.kick; $('.js-sname', sheet).textContent = data.name; $('.js-sdesc', sheet).textContent = s.desc;
    $('.js-specs', sheet).innerHTML = s.specs.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('');
    $('.js-ssrc', sheet).textContent = s.src; $('.js-scap', sheet).textContent = s.cap;
    const v = $('.js-svid', sheet), im = $('.js-simg', sheet);
    if (s.vid) { v.hidden = false; im.hidden = true; if (v.getAttribute('src') !== s.vid) { v.src = s.vid; v.poster = s.poster; } } else { v.hidden = true; v.pause(); im.hidden = false; im.src = s.img; im.alt = `The ${data.name} in the studio.`; }
    $('.js-snews', sheet).innerHTML = s.news.map(([a, b]) => `<a class="row-go" href="#news" data-close><span><em>${a}</em>${b}</span><i aria-hidden="true"></i></a>`).join('');
    sheetFrom = d.activeElement; sheet.hidden = false; root.classList.add('is-sheet'); lenis && lenis.stop();
    $('#main').inert = true; $('.ft').inert = true; $('.hd').inert = true;
    if (s.vid && !RM) v.play().catch(() => {});
    $('.sheet__x', sheet).focus({ preventScroll: true });
    if (HAS_GSAP && !RM) {
      gsap.fromTo($('.sheet__veil', sheet), { opacity: 0 }, { opacity: 1, duration: .56, ease: 'power2.out' });
      const panes = $$('.sheet__grid > *', sheet);
      gsap.fromTo(panes[0], { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: .56, ease: EX, clearProps: 'transform' });
      gsap.fromTo(panes.slice(1), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .56, stagger: .08, delay: .08, ease: EX, clearProps: 'transform' });
    }
  }
  function closeSheet() {
    if (sheet.hidden) return;
    const done = () => { sheet.hidden = true; root.classList.remove('is-sheet'); lenis && lenis.start(); $('.js-svid', sheet).pause(); $('#main').inert = false; $('.ft').inert = false; $('.hd').inert = false; sheetFrom && sheetFrom.focus({ preventScroll: true }); };
    if (HAS_GSAP && !RM) { gsap.to($$('.sheet__grid > *', sheet), { opacity: 0, duration: .3, ease: 'power2.in' }); gsap.to($('.sheet__veil', sheet), { opacity: 0, duration: .4, delay: .05, ease: 'power2.in', onComplete: done }); } else done();
  }
  $('[data-sheet]').addEventListener('click', e => { e.preventDefault(); openSheet(stage.dataset.k); });
  sheet.addEventListener('click', e => { const c = e.target.closest('[data-close]'); if (c && !c.matches('a[href^="#"]')) closeSheet(); });
  d.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSheet(); closeMenu(); }
    if (e.key !== 'Tab') return;
    const box = !sheet.hidden ? sheet : !menu.hidden ? menu : null; if (!box) return;
    const f = $$('a, button', box).filter(x => !x.hidden && x.offsetParent);
    const i = f.indexOf(d.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
  });

  /* ------------------------------------------------------------------ 8 · goodwood: transport */
  const gw = $('#goodwood'), ppBtn = $('.film__pp', gw);
  let filmPaused = false;
  ppBtn.addEventListener('click', () => { filmPaused = !filmPaused; ppBtn.setAttribute('aria-pressed', filmPaused); ppBtn.setAttribute('aria-label', filmPaused ? 'Play the film' : 'Pause the film'); $('use', ppBtn).setAttribute('href', filmPaused ? '#i-play' : '#i-pause'); });
  if (!MOTION) { $$('.gw__c', gw).forEach(c => c.classList.add('is-on')); ppBtn.hidden = true; }

  /* ------------------------------------------------------------------ 9 · commission */
  const comm = $('#commission'), cTrack = $('.track', comm);
  let stepNow = 3, commST = null;
  function setStep(i, instant) {
    if (i === stepNow && !instant) return; stepNow = i; const s = STEPS[i];
    setTab(cTrack, $$(':scope > button', cTrack)[i]);
    const cap = $('.comm__cap', comm), ims = $$('.comm__ph > img', comm), on = ims.find(x => x.classList.contains('is-on')), nx = ims.find(x => x !== on);
    const write = () => { $('.comm__n b', cap).textContent = pad2(i + 1); $('.js-step', cap).textContent = s.n; $('.js-title', cap).textContent = s.t; $('.js-text', cap).textContent = s.p; $('.js-src', cap).textContent = s.s; };
    if (on.getAttribute('src') !== s.a) { nx.src = s.a; nx.alt = s.aa; on.alt = ''; on.classList.remove('is-on'); nx.classList.add('is-on'); }
    if (HAS_GSAP && !RM && !instant) gsap.to(cap, { opacity: 0, duration: .2, ease: 'power2.in', onComplete: () => { write(); gsap.to(cap, { opacity: 1, duration: .5, ease: EX }); } });
    else write();
  }
  $$(':scope > button', cTrack).forEach((b, i) => b.addEventListener('click', () => {
    if (commST && lenis) lenis.scrollTo(commST.start + (commST.end - commST.start) * (i + .5) / 5, { duration: .8 });
    setStep(i);
  }));
  tabKeys(cTrack, b => setStep(+b.dataset.i));

  /* ------------------------------------------------------------------ 10 · provenance: the turning car */
  const viewer = $('.viewer'), vImg = $('.viewer__img', viewer), walkLine = $('.walk__line', viewer);
  let vSet = 'phoenix', vScroll = 0, vManual = 0;
  const preload = k => { for (let i = 1; i <= PSP[k].n; i++) { const im = new Image(); im.src = `assets/psp/${k}-${pad2(i)}.jpg`; } };
  function vRender() {
    const n = PSP[vSet].n, i = (((3 + vScroll + vManual) % n) + n) % n;
    vImg.src = `assets/psp/${vSet}-${pad2(i + 1)}.jpg`; vImg.alt = `${PSP[vSet].alt}, angle ${i + 1} of ${n}.`;
    $('.walk__n', viewer).innerHTML = `<b>${pad2(i + 1)}</b> / ${pad2(n)}`; lt(walkLine, i, n);
    viewer.setAttribute('aria-label', `${PSP[vSet].name}, angle ${i + 1} of ${n}. Drag or use the arrow keys to turn the car.`);
  }
  const vStep = s => { vManual += s; vRender(); };
  $('.walk__prev', viewer).addEventListener('click', () => vStep(-1));
  $('.walk__next', viewer).addEventListener('click', () => vStep(1));
  viewer.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { e.preventDefault(); vStep(-1); } if (e.key === 'ArrowRight') { e.preventDefault(); vStep(1); } });
  (function drag() {
    let x0 = null, acc = 0;
    viewer.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; x0 = e.clientX; acc = 0; viewer.setPointerCapture(e.pointerId); });
    viewer.addEventListener('pointermove', e => { if (x0 === null) return; acc += e.clientX - x0; x0 = e.clientX; while (Math.abs(acc) > 46) { vStep(acc > 0 ? -1 : 1); acc -= Math.sign(acc) * 46; viewer.classList.add('was-dragged'); } });
    const up = () => { x0 = null; }; viewer.addEventListener('pointerup', up); viewer.addEventListener('pointercancel', up);
  })();
  $$('.pcard').forEach(card => {
    const label = () => card.setAttribute('aria-label', `Turn ${PSP[card.dataset.set].name} in the viewer`);
    label();
    card.addEventListener('click', () => {
      const k = card.dataset.set, prev = vSet; vSet = k; vManual = 0; preload(k); vRender();
      $('.js-pname', viewer).textContent = PSP[k].name; $('.js-pspec', viewer).textContent = PSP[k].spec;
      card.dataset.set = prev; $('img', card).src = `assets/psp/${prev}-${PSP[prev].card}.jpg`;
      $('.pcard__cap b', card).textContent = PSP[prev].name; $('.pcard__cap > span:not(.go)', card).textContent = PSP[prev].spec; label();
      if (HAS_GSAP && !RM) gsap.fromTo(vImg, { opacity: .4 }, { opacity: 1, duration: .56, ease: EX });
    });
  });
  preload('phoenix');

  /* ------------------------------------------------------------------ 3 · heritage: light finds the card; pager */
  const her = $('#heritage'), stripVp = $('.strip-vp', her), cards = $$('.yc', her), herLt = $('.ltrack', her);
  let herST = null, herDist = 0, herI = 0;
  function herLight(i) { herI = i; cards.forEach((c, j) => c.classList.toggle('is-lit', j === i)); ltSet(herLt, i, cards.length); }
  function herNearest() { const mid = innerWidth * (herST ? .36 : .5); let best = 0, bd = 1e9; cards.forEach((c, i) => { const r = c.getBoundingClientRect(), dd = Math.abs(r.left + r.width / 2 - mid); if (dd < bd) { bd = dd; best = i; } }); return best; }
  function herGo(dir) {
    const i = clamp(herI + dir, 0, cards.length - 1);
    if (herST && lenis) { const x = cards[i].offsetLeft - cards[0].offsetLeft; lenis.scrollTo(herST.start + (herST.end - herST.start) * clamp(x / herDist, 0, 1), { duration: .9 }); }
    else stripVp.scrollTo({ left: cards[i].offsetLeft - (stripVp.clientWidth - cards[i].offsetWidth) / 2, behavior: RM ? 'auto' : 'smooth' });
    herLight(i);
  }
  $('.ltrack__prev', herLt).addEventListener('click', () => herGo(-1));
  $('.ltrack__next', herLt).addEventListener('click', () => herGo(1));
  stripVp.addEventListener('scroll', () => { if (!herST) herLight(herNearest()); }, { passive: true });

  /* ------------------------------------------------------------------ 12 · news strip */
  const jvp = $('.jvp'), jcs = $$('.jc'), nLt = $('.news .ltrack');
  const newsNearest = () => { const x = jvp.scrollLeft; let best = 0, bd = 1e9; jcs.forEach((c, i) => { const dd = Math.abs(c.offsetLeft - jcs[0].offsetLeft - x); if (dd < bd) { bd = dd; best = i; } }); return best; };
  jvp.addEventListener('scroll', () => ltSet(nLt, newsNearest(), jcs.length), { passive: true });
  const newsGo = dir => { const i = clamp(newsNearest() + dir, 0, jcs.length - 1); jvp.scrollTo({ left: jcs[i].offsetLeft - jcs[0].offsetLeft, behavior: RM ? 'auto' : 'smooth' }); ltSet(nLt, i, jcs.length); };
  $('.ltrack__prev', nLt).addEventListener('click', () => newsGo(-1));
  $('.ltrack__next', nLt).addEventListener('click', () => newsGo(1));
  (function dragNews() {
    let x0 = null, s0 = 0, moved = false;
    jvp.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; x0 = e.clientX; s0 = jvp.scrollLeft; moved = false; });
    addEventListener('pointermove', e => { if (x0 === null) return; const dx = e.clientX - x0; if (Math.abs(dx) > 4) moved = true; jvp.scrollLeft = s0 - dx; });
    addEventListener('pointerup', () => { x0 = null; });
    jvp.addEventListener('click', e => { if (moved) { e.preventDefault(); moved = false; } }, true);
  })();

  /* ------------------------------------------------------------------ 13 · form */
  const form = $('#enquire'), iTrack = $('.track--milk', form);
  function preselect(k) { const sel = $('select[name="program"]', form); if (sel && $(`option[value="${k}"]`, sel)) sel.value = k; }
  $$(':scope > button', iTrack).forEach(b => b.addEventListener('click', () => setTab(iTrack, b)));
  tabKeys(iTrack, b => setTab(iTrack, b));
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
    // Prototype: there is no endpoint. The success state follows after a short delay so it can be reviewed.
    setTimeout(() => {
      clearTimeout(fail);
      const h = form.offsetHeight, done = d.createElement('div'); done.className = 'form__done'; done.setAttribute('role', 'status'); done.tabIndex = -1;
      done.innerHTML = `<h3 class="t-title">Thank you. Javier Roque will be in touch.</h3><p>Prestige Imports · 15050 Biscayne Blvd, North Miami Beach<br>(305) 783-6493 · Javier@PrestigeImports.com</p><p>Prototype note: nothing was sent from this page.</p>`;
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

  /* Hold a pinned section for `scrub` px, then keep it held while the next section slides over it as a full pane.
     A transparent spacer of `scrub` px follows it, so the next chapter only arrives once the held one has done its work. */
  function holdThenCover(sec, scrub) {
    const sp = d.createElement('div'); sp.className = 'hold-spacer'; sp.setAttribute('aria-hidden', 'true');
    sec.after(sp);
    const size = () => { sp.style.height = scrub() + 'px'; };
    size();
    const st = ScrollTrigger.create({ trigger: sec, start: 'top top', end: () => '+=' + (scrub() + innerHeight), pin: true, pinSpacing: false, onRefreshInit: size });
    return { st, kill: () => { st.kill(); sp.remove(); } };
  }

  function motion() {
    const mm = gsap.matchMedia();
    mm.add({ D: '(min-width: 1024px)', M: '(max-width: 1023px)' }, ctx => {
      const { D } = ctx.conditions, vh = () => innerHeight;
      const hero = $('.hero'), panel = $('.panel');

      gsap.fromTo($('.hero .bg'), { scale: 1.06 }, { scale: 1, duration: 1.8, ease: EX });
      gsap.from(lines($('.hero h1')), { yPercent: 110, duration: 1.1, stagger: .08, ease: EX, delay: .15 });
      gsap.from(['.hero .kick', '.hero .acts', '.photo-cap'], { opacity: 0, duration: 1, stagger: .08, ease: 'power2.out', delay: .5 });
      ScrollTrigger.create({ trigger: hero, start: 'top top', end: () => '+=' + vh() * (D ? 2.8 : 2), pin: true, pinSpacing: false });
      if (D) {
        ScrollTrigger.create({ trigger: panel, start: 'top top', end: () => '+=' + vh() * .8, pin: true });
        gsap.fromTo($$('.blurline .w', panel), { filter: 'blur(12px)', color: '#b9b4ae' }, { filter: 'blur(0px)', color: '#121212', stagger: .14, ease: 'none', scrollTrigger: { trigger: panel, start: 'top 55%', end: () => '+=' + vh() * 1.15, scrub: true } });
        gsap.to($('.hero .bg'), { yPercent: -5, ease: 'none', scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top top', scrub: true } });
      }

      if (D) {
        const strip = $('.strip', her);
        const tw = gsap.to(strip, { x: () => -(strip.scrollWidth - innerWidth), ease: 'none' });
        herST = ScrollTrigger.create({ trigger: her, start: 'top top', end: () => '+=' + Math.max(vh() * 1.6, strip.scrollWidth - innerWidth), pin: true, scrub: true, animation: tw, invalidateOnRefresh: true,
          onRefresh: () => { herDist = strip.scrollWidth - innerWidth; }, onUpdate: () => { const n = herNearest(); if (n !== herI) herLight(n); } });
        herDist = strip.scrollWidth - innerWidth;
        cards.forEach(c => {
          gsap.fromTo($('.yc__ph img', c), { xPercent: 4 }, { xPercent: -4, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } });
          gsap.fromTo($('.yc__y', c), { x: 28 }, { x: -28, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } });
        });
      }

      /* every program chapter hands over as a full pane: the next one slides over the held one (desktop and phone) */
      const holdStudio = holdThenCover(studio, () => D ? vh() * .6 : 0), holdAtelier = holdThenCover(atelier, () => 0);
      if (D) {
        const stack = $('.car-stack', studio);
        const RIM = (b, a, r) => `brightness(${b}) drop-shadow(0px -1.5px 0px rgba(255, 246, 236, ${a})) drop-shadow(0px 0px ${r}px rgba(255, 246, 236, ${a * .75}))`;
        studioPin = ScrollTrigger.create({ trigger: studio, start: 'top top', end: () => '+=' + vh() * .4, scrub: true,
          animation: gsap.timeline()
            .fromTo(stack, { filter: RIM(.12, 1, 4) }, { filter: RIM(.16, 1, 16), ease: 'none', duration: .3 }, 0)
            .to(stack, { filter: RIM(1, 0, 16), ease: 'none', duration: .7 }, .3)
            .fromTo(studio, { '--bloom': .2 }, { '--bloom': 1, ease: 'none', duration: 1 }, 0)
            .fromTo($('.studio__name', studio), { opacity: .35 }, { opacity: 1, ease: 'none', duration: 1 }, 0)
            .fromTo($('.car-ref', studio), { opacity: 0 }, { opacity: .06, ease: 'none', duration: .7 }, .3) });
      }

      const offFilm = film(D);

      if (D) {
        setStep(0, true);
        commST = ScrollTrigger.create({ trigger: comm, start: 'top top', end: () => '+=' + vh() * 2, pin: true, onUpdate: s => setStep(clamp(Math.floor(s.progress * 5), 0, 4)) });
        $$('.comm__ph > img', comm).forEach(im => gsap.fromTo(im, { yPercent: -3 }, { yPercent: 3, ease: 'none', scrollTrigger: { trigger: comm, start: 'top bottom', end: 'bottom top', scrub: true } }));
        ScrollTrigger.create({ trigger: $('#provenance'), start: 'top top', end: () => '+=' + vh() * .9, pin: true, onUpdate: s => { const v = Math.round(s.progress * (PSP[vSet].n - 1)); if (v !== vScroll) { vScroll = v; vRender(); } } });
      }

      const road = $('.road');
      ScrollTrigger.create({ trigger: road, start: 'top top', end: () => '+=' + road.offsetHeight, pin: true, pinSpacing: false });
      if (D) gsap.fromTo($('.road .bg'), { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: road, start: 'top bottom', end: 'bottom top', scrub: true } });

      if (D) gsap.fromTo($('.mia__pane'), { yPercent: 12 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '#miami', start: 'top bottom', end: 'top top', scrub: true } });

      $$('[data-lines]').forEach(el => { if (el.closest('.hero')) return; gsap.from(lines(el), { yPercent: 110, duration: 1, stagger: .08, ease: EX, scrollTrigger: { trigger: el, start: 'top 88%', once: true } }); });
      if (D) $$('.pcard img').forEach(im => gsap.fromTo(im, { yPercent: -3 }, { yPercent: 3, ease: 'none', scrollTrigger: { trigger: im.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));

      return () => { offFilm && offFilm(); holdStudio.kill(); holdAtelier.kill(); herST = null; commST = null; studioPin = null; };
    });
  }

  function film(D) {
    const canvas = $('.gw__film', gw), g = canvas.getContext('2d');
    const N = D ? 115 : 48, frames = new Array(N), cs = $$('.gw__c', gw), line = $('.film__line', gw);
    const src = i => D ? `assets/seq/f${String(i + 1).padStart(3, '0')}.webp` : `assets/seq-m/m${pad2(i + 1)}.webp`;
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
    const pre = ScrollTrigger.create({ trigger: gw, start: 'top 250%', once: true, onEnter: load });
    const hold = holdThenCover(gw, () => innerHeight * (D ? 1.8 : 1.2));
    const pin = ScrollTrigger.create({ trigger: gw, start: 'top top', end: () => '+=' + innerHeight * (D ? 1.8 : 1.2), scrub: true,
      onUpdate: s => {
        if (!filmPaused) { want = Math.round(s.progress * (N - 1)); draw(); lt(line, s.progress * 100, 101); }
        const t = 2.75 + s.progress * 5.75;
        cs.forEach(c => { const key = c.classList.contains('gw__c1') ? 3.0 : c.classList.contains('gw__c2') ? 6.6 : 7.6; c.classList.toggle('is-on', t >= key); });
      } });
    size(); addEventListener('resize', size);
    return () => { pre.kill(); pin.kill(); hold.kill(); removeEventListener('resize', size); gw.classList.remove('is-film'); };
  }

  /* ------------------------------------------------------------------ boot */
  function refreshUI() { $$('.track').forEach(pool); leaders(false); etch(); ltSet(herLt, herI, cards.length); ltSet(nLt, newsNearest(), jcs.length); railTo(selected); vRender(); curId = null; headerState(); }
  refreshUI();
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(() => { refreshUI(); MOTION && ScrollTrigger.refresh(); });
  addEventListener('resize', refreshUI);
  if (MOTION) { motion(); addEventListener('load', () => { refreshUI(); ScrollTrigger.refresh(); }, { once: true }); }
  else setStep(3, true);
  window.__E = { setStudio, setAtelier, openSheet, closeSheet, setStep, light, openMenu, closeMenu, lenis: () => lenis };
})();
