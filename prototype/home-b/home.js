/* =====================================================================
   Gunther Werks Miami — Home, Concept B "The Line"
   One render loop reads the scroll position and writes transforms/opacity.
   Static path (no GSAP, or prefers-reduced-motion) keeps every word and
   image visible; motion only layers on top of it (G7).
   Modes:  static  → no pins, authored stills
           track   → motion ≥1024: hero drain, horizontal line, 07/08 stages
           lift    → motion <1024: hero drain, vertical stations, phone stages
   ===================================================================== */
(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (t) => t * t * (3 - 2 * t);
  const tri = (v, c, w) => clamp(1 - Math.abs(v - c) / w);

  const RM = window.matchMedia('(prefers-reduced-motion: reduce)');
  const DESK = window.matchMedia('(min-width: 1024px)');
  const FINE = window.matchMedia('(hover: hover) and (pointer: fine)');
  const NARROW = window.matchMedia('(max-width: 699px)');
  const hasLib = !!(window.gsap && window.ScrollTrigger);

  const S = {
    mode: 'static', vh: window.innerHeight, vw: root.clientWidth,
    lenis: null, geo: null, raf: 0, lastY: -1, chapter: -1, ticking: false,
    egFrames: [], egLoaded: 0, egKind: '', egDrawn: -1,
    reelFrames: [], reelDrawn: -1, reelLoaded: false,
  };

  /* ---------- elements ---------- */
  const E = {
    hd: $('.hd'), scrims: $$('.hd-scrim i'), readout: $('[data-readout]'), roll: $('.hd-roll'), count: $('[data-count]'),
    fill: $('.hd-rule-fill'), ticks: $('.hd-ticks'), menu: $('#menu'), menuBtns: $$('.hd-menu, .hd-readout-b'),
    s00: $('.s00'), pin00: $('.s00-pin'), stage00: $('.s00-stage'), hc: $('.h-c'), hcar: $('.h-car'), mark: $('.s00-mark'),
    l1: $('.s00-l1'), l2: $('.s00-l2'),
    s01: $('.s01'), cars: $('.cars'), f26: $('.car--f26 .car-lift'),
    line: $('.line'), pin: $('.line-pin'), track: $('.line-track'), st: $$('.st'),
    st05: $('.st05'), coat: $('.coat'), coatScale: $('.coat-scale'), coatA: $('.coat-a'), coatAin: $('.coat-a-in'), coatB: $('.coat-b'), coatBin: $('.coat-b-in'),
    lps: $$('.lp'), finish: $('.st05-finish'), cap05: $('.st05-cap'), num05: $('.st-num--05'),
    reel: $('.reel'), reelCanvas: $('.reel-canvas'), reelSteps: $$('.reel-step'),
    s07: $('.s07'), pin07: $('.s07-pin'), film: $('.s07-film'), eg: $('.eg-canvas'), egBox: $('.eg-box'), cap07: $('.s07-cap'),
    paper: $('.s07-paper'), box: $('.s07-box'), key: $('.s07-key'), text07: $('.s07-text'), road: $('.s07-road'), roadImg: $('.s07-road img'),
    s08: $('.s08'), pin08: $('.s08-pin'), view: $('.s08-view'), phx: $$('.phx'), angles: $$('.angles button'),
    s09: $('.s09'), s10: $('.s10'), sketch: $('.s10-photo img'), ft: $('.ft'),
  };

  /* =====================================================================
     Chapters — header readout, ticks, progress
     ===================================================================== */
  // deslop-ignore-file 30 — 00–10 is a real sequence: Gunther Werks' own six build stations in GW's order, framed by the hero and the ending
  const CH = [
    ['00', 'Rewind', 'rewind'], ['01', 'Customization', 'customization'], ['02', 'Donor car disassembly', 'donor'],
    ['03', 'Fabrication', 'fabrication'], ['04', 'Body stage', 'body'], ['05', 'Paint & finishing', 'paint'],
    ['06', 'Assembly', 'assembly'], ['07', 'Delivery', 'delivery'], ['08', 'Provenance Succession', 'provenance'],
    ['09', 'News & events', 'news'], ['00', 'Gunther Werks Miami', 'miami'],
  ];
  const menuLinks = $$('.menu-list a');

  function setReadout(k) {
    if (k === S.chapter) return;
    const first = S.chapter < 0;
    S.chapter = k;
    const [n, label] = CH[k];
    const text = `${n} — ${label}`;
    E.count.textContent = `${n}/10`;
    menuLinks.forEach((a, i) => a.classList.toggle('is-here', i === k));
    const cur = E.readout;
    if (first || S.mode === 'static' || !window.gsap) { cur.textContent = text; return; }
    // 240 ms vertical roll inside a 20 px mask: old line up and out, new line up and in
    const next = document.createElement('span');
    next.className = 'hd-roll-in';
    next.textContent = text;
    E.roll.appendChild(next);
    gsap.killTweensOf(E.roll.children);
    $$('.hd-roll-in', E.roll).forEach((el) => { if (el !== next) gsap.to(el, { yPercent: -100, duration: .24, ease: 'power2.in', onComplete: () => el.remove() }); });
    gsap.fromTo(next, { yPercent: 100 }, { yPercent: 0, duration: .24, ease: 'power2.out' });
    E.readout = next; next.setAttribute('data-readout', '');
  }

  /* header tone per zone: what lies under the header decides black or white type */
  const GROUND_TONE = { photo: 'inv', dark: 'inv', light: 'ink', white: 'ink', sky: 'ink' };
  let zoneTick = 0;
  function groundAt(x, y, zone) {
    const els = document.elementsFromPoint(x, y);
    for (const el of els) {
      if (el.closest('.hd, .hd-scrim, .loupe, .skip')) continue;
      if (el.closest('.menu') && !E.menu.hidden) return 'white';
      const g = el.closest('[data-ground]');
      if (g) return (zone && g.dataset['ground' + zone]) || g.dataset.ground;
    }
    return 'light';
  }
  function updateZones(force) {
    if (!force && (zoneTick++ % 2)) return;
    if (!E.menu.hidden) return;
    const pad = Math.min(160, S.vw * .12);
    const pts = [pad, S.vw / 2, S.vw - pad];
    const vars = ['--zl', '--zc', '--zr'];
    pts.forEach((x, i) => {
      const g = groundAt(x, 30, ['L', 'C', 'R'][i]);
      const inv = GROUND_TONE[g] === 'inv';
      E.hd.style.setProperty(vars[i], inv ? '#FFFFFF' : '#111111');
      if (i === 2) E.hd.style.setProperty('--zr-inv', inv ? '#111111' : '#FFFFFF');
      E.scrims[i].classList.toggle('is-on', g === 'photo');
      E.scrims[i].classList.toggle('is-light', g === 'light');
      E.scrims[i].classList.toggle('is-white', g === 'white');
    });
  }

  /* =====================================================================
     Geometry — measured on load/resize, never during render
     ===================================================================== */
  const docTop = (el) => { let y = 0; let n = el; while (n) { y += n.offsetTop; n = n.offsetParent; } return y; };

  function clearInline() {
    [E.s00, E.line, E.s07, E.s08].forEach((el) => { el.style.height = ''; });
    [E.s01, E.s07, E.s08, E.s09].forEach((el) => { el.style.marginTop = ''; });
    E.pin00.style.position = ''; E.pin00.style.top = '';
    [E.stage00, E.mark, E.f26, E.track, E.coatScale, E.coatA, E.coatAin, E.coatB, E.coatBin, E.finish, E.paper, E.box, E.key, E.road, E.roadImg, E.num05]
      .forEach((el) => { if (el) { el.style.transform = ''; } });
    [E.hc, E.hcar, ...E.lps, ...E.phx].forEach((el) => { el.style.opacity = ''; });
    $$('.st-num, .inset, .tile, .pan, .strip-in').forEach((el) => { el.style.transform = ''; });
    E.pin07.classList.remove('is-stage');
  }

  function measure() {
    S.vh = window.innerHeight; S.vw = root.clientWidth;
    const vh = S.vh, vw = S.vw;
    const G = { vh, vw };
    clearInline();
    if (S.mode === 'static') { G.chapters = staticChapters(); S.geo = G; buildTicks(); return; }

    const desk = S.mode === 'track';
    // 00 — hero: pin P before 01 starts to rise, then 100vh of overlap
    G.P = desk ? .8 * vh : .7 * vh;
    G.T = G.P + vh;
    E.s00.style.height = (G.T + vh) + 'px';
    E.pin00.style.position = 'sticky'; E.pin00.style.top = '0px';
    E.s01.style.marginTop = (-vh) + 'px';
    G.f26Top = E.f26 ? (E.f26.getBoundingClientRect().top - E.s01.getBoundingClientRect().top) : 0;

    if (desk) {
      // the line: panel geometry in track space
      const panels = E.st.map((el) => ({ el, L: el.offsetLeft, W: el.offsetWidth }));
      const trackW = E.track.scrollWidth;
      const p05 = panels[3];
      const X05 = p05.L;
      const xEnd = Math.max(0, trackW - vw);
      const slow0 = Math.max(0, X05 - .6 * vw);
      // piecewise map: [x0,x1,ratio] — scroll = Δx·ratio; the booth stretch is slower ("nothing passes")
      const segs = [];
      let s = 0;
      const RATIO = .42;
      segs.push({ s0: s, x0: 0, x1: slow0, r: RATIO }); s += slow0 * RATIO;
      segs.push({ s0: s, x0: slow0, x1: X05, r: .9 }); s += (X05 - slow0) * .9;
      G.hold0 = s; G.holdLen = 1.2 * vh; s += G.holdLen;
      segs.push({ s0: s, x0: X05, x1: xEnd, r: RATIO }); s += (xEnd - X05) * RATIO;
      G.lineLen = s; G.segs = segs; G.X05 = X05; G.xEnd = xEnd; G.panels = panels; G.trackW = trackW;
      E.line.style.height = (vh + G.lineLen + vh) + 'px';
      E.s07.style.marginTop = (-vh) + 'px';
      // 07 stage
      E.pin07.classList.add('is-stage');
      G.len07 = 1.25 * vh;
      E.s07.style.height = (vh + G.len07 + vh) + 'px';
      E.s08.style.marginTop = (-vh) + 'px';
      G.len08 = 1.05 * vh;
      E.s08.style.height = (vh + G.len08 + vh) + 'px';
      E.s09.style.marginTop = (-vh) + 'px';
      // 06 strip
      const strip = $('.strip-in');
      G.stripH = strip ? strip.offsetHeight : 0;
      E.film.dataset.ground = 'photo';
    } else {
      G.len08 = 1.0 * vh;
      E.s08.style.height = (vh + G.len08) + 'px';
      E.film.dataset.ground = 'white';
    }
    E.pin08.style.position = 'sticky'; E.pin08.style.top = '0px';

    // positions in document space (after heights are set)
    G.top01 = docTop(E.s01);
    G.lineTop = docTop(E.line);
    G.top07 = docTop(E.s07);
    G.top08 = docTop(E.s08);
    G.top09 = docTop(E.s09);
    G.top10 = docTop(E.s10);
    G.coatTop = S.mode === 'lift' ? docTop(E.finish) + E.finish.offsetHeight + 40 : docTop(E.coat); G.coatH = E.coat.offsetHeight;
    G.st05Top = docTop(E.st05); G.st05H = E.st05.offsetHeight;
    G.reelTop = docTop(E.reel); G.reelH = E.reel.offsetHeight;
    G.filmTop = docTop(E.film);
    const eb = E.egBox.getBoundingClientRect(); G.egW = eb.width; G.egH = eb.height;
    G.max = Math.max(1, root.scrollHeight - vh);
    G.sketchTop = docTop(E.s10);
    S.geo = G;
    G.chapters = motionChapters();
    buildTicks();
    S.lastY = -1;
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  // inverse of the track map: x → scroll offset inside the line
  function xToS(x) {
    const G = S.geo;
    for (const g of G.segs) {
      if (x <= g.x1 || g === G.segs[G.segs.length - 1]) {
        const dx = clamp(x, g.x0, g.x1) - g.x0;
        let s = g.s0 + dx * g.r;
        return s;
      }
    }
    return 0;
  }
  function sToX(s) {
    const G = S.geo;
    if (s >= G.hold0 && s < G.hold0 + G.holdLen) return { x: G.X05, hp: (s - G.hold0) / G.holdLen };
    for (let i = G.segs.length - 1; i >= 0; i--) {
      const g = G.segs[i];
      if (s >= g.s0) return { x: Math.min(g.x1, g.x0 + (s - g.s0) / g.r), hp: s >= G.hold0 + G.holdLen ? 1 : 0 };
    }
    return { x: 0, hp: 0 };
  }

  function staticChapters() {
    const ids = CH.map((c) => c[2]);
    return ids.map((id, i) => (i === 0 ? 0 : Math.max(0, docTop(document.getElementById(id)) - S.vh * .5)));
  }
  function motionChapters() {
    const G = S.geo; const vh = S.vh;
    const c = [0, G.top01 - vh * .5];
    if (S.mode === 'track') {
      // a station is current once its left edge passes the viewport centre
      for (let k = 0; k < 5; k++) {
        const p = G.panels[k];
        let s = xToS(Math.max(0, p.L - S.vw * .5));
        if (k === 3) s = G.hold0 - .25 * vh;
        c.push(G.lineTop + s);
      }
      c.push(G.top07 - vh * .5, G.top08 - vh * .5, G.top09 - vh * .5, G.top10 - vh * .5);
    } else {
      ['donor', 'fabrication', 'body', 'paint', 'assembly'].forEach((id) => c.push(docTop(document.getElementById(id)) - vh * .5));
      c.push(G.top07 - vh * .5, G.top08 - vh * .5, G.top09 - vh * .5, G.top10 - vh * .5);
    }
    return c;
  }
  function buildTicks() {
    const max = Math.max(1, root.scrollHeight - S.vh);
    E.ticks.innerHTML = '';
    S.geo.chapters.forEach((s) => {
      const i = document.createElement('i');
      i.style.left = (clamp(Math.max(0, s + S.vh * .5) / max) * 100) + '%';
      E.ticks.appendChild(i);
    });
    S.geo.max = max;
  }

  // where an anchor should land
  function anchorY(id) {
    const G = S.geo; const vh = S.vh;
    const el = document.getElementById(id);
    if (!el) return null;
    if (id === 'rewind') return 0;
    if (S.mode === 'static') return docTop(el) - (id === 'enquire' ? 120 : 0);
    if (id === 'line') id = 'donor';
    if (S.mode === 'track') {
      const k = ['donor', 'fabrication', 'body', 'paint', 'assembly'].indexOf(id);
      if (k >= 0) return G.lineTop + (k === 3 ? G.hold0 + 2 : xToS(G.panels[k].L) + 2);
      if (id === 'customization') return G.top01;
      if (id === 'delivery') return G.top07;
      if (id === 'provenance') return G.top08;
      if (id === 'news') return G.top09;
    }
    if (id === 'customization') return G.top01;
    if (id === 'enquire') return docTop(el) - 120;
    return docTop(el);
  }

  /* =====================================================================
     Render — one pass per frame, transforms and opacity only
     ===================================================================== */
  function render(force) {
    const y = window.scrollY;
    if (!force && Math.abs(y - S.lastY) < .5) { updateZones(false); return; }
    S.lastY = y;
    const G = S.geo; if (!G) return;
    const vh = S.vh;

    // progress + chapter
    E.fill.style.transform = `scaleX(${clamp(y / G.max)})`;
    let k = 0; G.chapters.forEach((s, i) => { if (y >= s) k = i; });
    setReadout(k);
    $$('i', E.ticks).forEach((t, i) => t.classList.toggle('is-past', i <= k));

    if (S.mode !== 'static') {
      renderHero(y);
      if (S.mode === 'track') { renderTrack(y); render07(y); }
      else { renderLift(y); render07Lift(y); }
      render08(y);
    }
    updateZones(true);
  }

  /* 00 — the world drains, then the car; the camera leans in as 01 rises */
  function renderHero(y) {
    const G = S.geo; const vh = S.vh;
    if (y > G.T + vh) return;
    const world = clamp(y / (.40 * vh));
    const car = clamp((y - .45 * vh) / (.40 * vh));
    E.hc.style.opacity = (1 - world).toFixed(3);
    E.hcar.style.opacity = (1 - car).toFixed(3);
    const push = clamp((y - .6 * vh) / (G.T - .6 * vh));
    const zmax = S.mode === 'track' ? .12 : .08;
    E.stage00.style.transform = `scale(${(1 + zmax * push).toFixed(4)})`;
    const up = Math.max(0, y - G.P);
    E.mark.style.transform = (NARROW.matches ? 'translateX(-50%) ' : '') + `translateY(${(-1.3 * up).toFixed(1)}px)`;
    // the two lines swap by a triggered masked rise (comprehension never waits on scroll)
    const s1 = world > .15 && car < .5;
    const s2 = car >= .5;
    E.l1.classList.toggle('is-on', s1); E.l1.classList.toggle('is-off', !s1 && s2);
    E.l2.classList.toggle('is-on', s2);
    // 01: the F-26 crosses the seam into the photograph, then settles into its place
    const u = clamp((y - G.P) / vh);
    const settle = smooth(clamp((u - .62) / .38));
    const lead = S.mode === 'track' ? -(Math.max(0, G.f26Top) + 56) : 0;
    E.f26.style.transform = `translate3d(0,${(lead * (1 - settle)).toFixed(1)}px,0)`;
    if (u > .45) E.cars.classList.add('in');
  }

  /* 02–06 — the line */
  function renderTrack(y) {
    const G = S.geo; const vh = S.vh; const vw = S.vw;
    const s = clamp(y - G.lineTop, 0, G.lineLen);
    const { x, hp } = sToX(s);
    E.track.style.transform = `translate3d(${(-x).toFixed(1)}px,0,0)`;
    G.panels.forEach((p, i) => {
      const xc = p.L + p.W / 2 - vw / 2;
      const d = x - xc;
      const left = p.L - x;
      if (left > vw * 1.4 || left + p.W < -vw * .4) return;
      const num = p.el.querySelector(':scope > .st-num');
      if (num && i !== 3) num.style.transform = `translate3d(${(.4 * d).toFixed(1)}px,0,0)`;
      $$('.inset', p.el).forEach((el) => { if (el !== E.finish) el.style.transform = `translate3d(${(-.25 * d).toFixed(1)}px,0,0)`; });
      $$('.tile[data-rate]', p.el).forEach((el) => { const r = parseFloat(el.dataset.rate) || 1; el.style.transform = `translate3d(${(-(r - 1) * d).toFixed(1)}px,0,0)`; });
      const pan = $('.pan', p.el);
      if (pan) {
        const t = clamp((x - (p.L - vw)) / (p.W + vw));
        pan.style.transform = i === 4 ? `translate3d(0,${(-10 * t).toFixed(2)}%,0)` : `translate3d(${(-10.7 * t).toFixed(2)}%,0,0)`;
      }
      if (left < vw * .6) $$('[data-rv]', p.el).forEach((r) => { if (i !== 3 || hp > 0 || x >= G.X05) r.classList.add('in'); });
    });
    // 05: the numeral rises in the booth and settles into the paint room
    const boothStart = G.X05 - .3 * vw - vw;
    const bp = clamp((x - boothStart) / (G.X05 - boothStart));
    E.num05.style.transform = `translate3d(${(.4 * (x - G.X05)).toFixed(1)}px,${((1 - smooth(bp)) * .45 * vh).toFixed(1)}px,0)`;
    firstCoat(hp, x >= G.X05);
    // 06 strip runs up while the track runs left
    const p6 = G.panels[4];
    const t6 = clamp((x - (p6.L - vw)) / Math.max(1, G.xEnd - (p6.L - vw)));
    const yEnd = (vh - G.stripH) / 2 + 20;
    $('.strip-in').style.transform = `translate3d(0,${lerp(vh * .78, yEnd, t6).toFixed(1)}px,0)`;
    // carbon reel: its 8 s map to the fabrication panel's travel
    const p3 = G.panels[1];
    const tr = clamp((x - (p3.L - vw * .7)) / (p3.W + vw * .2));
    drawReel(tr);
  }

  /* First Coat — the pass, the mirrored pass, the light, the inset */
  function firstCoat(hp, atHold) {
    const pass = clamp((hp - .08) / .5);
    const refl = clamp((hp - .16) / .5);
    // shell: band edge travels roof (29 %) → sill (69 %); wrapper covers the top 68 %
    const Y = lerp(.29, .70, pass);
    const f = clamp(Y / .68);
    E.coatA.style.transform = `translate3d(0,${((f - 1) * 100).toFixed(2)}%,0)`;
    E.coatAin.style.transform = `translate3d(0,${((1 - f) * 100).toFixed(2)}%,0)`;
    E.coatB.style.transform = `translate3d(0,${((1 - refl) * 100).toFixed(2)}%,0)`;
    E.coatBin.style.transform = `translate3d(0,${(-(1 - refl) * 100).toFixed(2)}%,0)`;
    E.coatScale.style.transform = `scale(${(1 + .06 * pass).toFixed(4)})`;
    // finishing: one light, moved through three positions along the bonnet
    E.lps[0].style.opacity = tri(hp, .62, .07).toFixed(3);
    E.lps[1].style.opacity = tri(hp, .69, .07).toFixed(3);
    E.lps[2].style.opacity = tri(hp, .76, .07).toFixed(3);
    const ins = smooth(clamp((hp - .55) / .3));
    E.finish.style.transform = `translate3d(0,${((1 - ins) * .5 * S.vh).toFixed(1)}px,0)`;
    E.finish.style.opacity = '';
    E.cap05.classList.toggle('is-shown', hp > .8);
  }

  /* phone / vertical lift */
  function renderLift(y) {
    const G = S.geo; const vh = S.vh;
    // First Coat on phone: the coat sticks under the header while its station scrolls past
    // sticky range: from the coat reaching its sticky top until the station's tail has scrolled by
    const stick = G.coatTop - (S.mode === 'lift' ? (parseFloat(getComputedStyle(E.hd).height) + 24) : 0);
    const span = Math.max(1, vh * .9 - 40);
    const hp = clamp((y - stick) / span);
    firstCoatLift(hp);
    // carbon reel: scrubbed by its own travel through the viewport
    const tr = clamp((y + vh - G.reelTop) / (vh + G.reelH));
    drawReel(tr);
  }
  function firstCoatLift(hp) {
    const pass = clamp(hp / .7);
    const refl = clamp((hp - .08) / .7);
    const Y = lerp(.29, .70, pass);
    const f = clamp(Y / .68);
    E.coatA.style.transform = `translate3d(0,${((f - 1) * 100).toFixed(2)}%,0)`;
    E.coatAin.style.transform = `translate3d(0,${((1 - f) * 100).toFixed(2)}%,0)`;
    E.coatB.style.transform = `translate3d(0,${((1 - refl) * 100).toFixed(2)}%,0)`;
    E.coatBin.style.transform = `translate3d(0,${(-(1 - refl) * 100).toFixed(2)}%,0)`;
    E.coatScale.style.transform = `scale(${(1 + .04 * pass).toFixed(4)})`;
    E.lps[0].style.opacity = tri(hp, .78, .08).toFixed(3);
    E.lps[1].style.opacity = tri(hp, .86, .08).toFixed(3);
    E.lps[2].style.opacity = tri(hp, .94, .08).toFixed(3);
    E.cap05.classList.toggle('is-shown', hp > .75);
  }

  /* 07 — film, then the key, then the road (desktop stage) */
  function render07(y) {
    const G = S.geo; const vh = S.vh;
    const s = y - G.top07;
    if (s < -vh * 1.2 || s > G.len07 + vh * 1.2) return;
    const p = clamp(s / G.len07);
    drawEG(clamp(p / .6));
    // the crane starts on a near-white ceiling: header type is black until the camera reaches the wall
    const gd = Math.round(clamp(p / .6) * (EG_N - 1)) < 11 ? 'white' : 'photo';
    if (E.film.dataset.ground !== gd) E.film.dataset.ground = gd;
    E.cap07.classList.toggle('in', p > .5 && p < .9);
    const q = clamp((p - .6) / .28);
    E.paper.style.transform = `translate3d(0,${((1 - q) * 100).toFixed(2)}%,0)`;
    E.key.style.transform = `translate3d(0,${((1 - q) * .32 * vh).toFixed(1)}px,0)`;
    E.text07.classList.toggle('in', q > .55);
    const r = clamp((p - .88) / .12);
    E.road.style.transform = `translate3d(0,${((1 - r) * 100).toFixed(2)}%,0)`;
    const push = clamp((s - G.len07) / vh);
    E.roadImg.style.transform = `scale(${(1 + .04 * push).toFixed(4)})`;
  }
  /* 07 on phone: the film sticks; the paper slides over it */
  function render07Lift(y) {
    const G = S.geo; const vh = S.vh;
    const s = y - G.filmTop;
    if (s < -vh || s > vh * 2) return;
    const p = clamp(s / vh);
    drawEG(p);
    E.cap07.classList.toggle('in', p > .55);
  }

  /* 08 — seven photographs, stepped by scroll, 0.35-step dissolves */
  let lastAngle = -1;
  function render08(y) {
    const G = S.geo; const vh = S.vh;
    const s = y - G.top08;
    if (s < -vh * 1.2 || s > G.len08 + vh * 1.2) return;
    const a = clamp(s / G.len08) * (E.phx.length - 1);
    const i = Math.floor(a); const f = a - i;
    const mix = smooth(clamp((f - .65) / .35));
    E.phx.forEach((img, j) => {
      let o = 0;
      if (j === i) o = 1;
      else if (j === i + 1) o = mix;
      img.style.opacity = o.toFixed(3);
      img.style.zIndex = j === i + 1 ? 2 : (j === i ? 1 : 0);
    });
    const cur = Math.round(a);
    if (cur !== lastAngle) {
      lastAngle = cur;
      E.angles.forEach((b, j) => b.setAttribute('aria-pressed', j === cur ? 'true' : 'false'));
    }
  }
  function goAngle(k) {
    k = clamp(k, 0, E.phx.length - 1);
    if (S.mode === 'static') { showAngleStatic(k); return; }
    const G = S.geo;
    const target = G.top08 + (k / (E.phx.length - 1)) * G.len08 + (k === 0 ? 1 : 0);
    scrollToY(target, { duration: .7 });
  }
  function showAngleStatic(k) {
    E.angles.forEach((b, j) => b.setAttribute('aria-pressed', j === k ? 'true' : 'false'));
    const img = E.phx[k]; if (img) img.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  /* 10 — the sketch drifts inside its mask */
  function renderSketch(y) {
    if (S.mode !== 'track') return;
    const G = S.geo; const vh = S.vh;
    const t = clamp((y + vh - G.sketchTop) / (E.s10.offsetHeight + vh));
    E.sketch.style.transform = `translate3d(0,${(-8 * t).toFixed(2)}%,0)`;
  }

  /* =====================================================================
     Frame sequences — End Game (canvas) and the carbon reel
     ===================================================================== */
  const EG_N = 134;
  function loadEG() {
    const kind = S.mode === 'track' ? 'd' : 'm';
    if (S.egKind === kind) return;
    S.egKind = kind; S.egFrames = new Array(EG_N); S.egLoaded = 0; S.egDrawn = -1;
    const order = [];
    for (let i = 0; i < EG_N; i += 8) order.push(i);
    order.push(EG_N - 1);
    for (let i = 0; i < EG_N; i++) if (!order.includes(i)) order.push(i);
    let q = 0; const par = 6;
    const next = () => {
      if (q >= order.length || S.egKind !== kind) return;
      const i = order[q++];
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => { S.egFrames[i] = img; S.egLoaded++; S.lastY = -1; if (S.egLoaded === 1) { E.s07.classList.add('is-live'); S.egDrawn = -1; } next(); };
      img.onerror = next;
      img.src = `assets/seq/${kind}/f${String(i).padStart(3, '0')}.webp`;
    };
    for (let k = 0; k < par; k++) next();
  }
  function nearestFrame(arr, i) {
    if (arr[i]) return arr[i];
    for (let d = 1; d < arr.length; d++) { if (arr[i - d]) return arr[i - d]; if (arr[i + d]) return arr[i + d]; }
    return null;
  }
  function sizeCanvas(cv, w, h) {
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    const W = Math.round(w * dpr); const H = Math.round(h * dpr);
    if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; return true; }
    return false;
  }
  function drawEG(t) {
    if (!S.egFrames.length) return;
    const i = Math.round(t * (EG_N - 1));
    const img = nearestFrame(S.egFrames, i);
    if (!img) return;
    const resized = sizeCanvas(E.eg, S.geo.egW || S.vw, S.geo.egH || S.vh);
    const key = i * 1000 + (img === S.egFrames[i] ? 1 : 0);
    if (!resized && key === S.egDrawn) return;
    S.egDrawn = key;
    const ctx = E.eg.getContext('2d');
    const cw = E.eg.width, ch = E.eg.height, iw = img.naturalWidth, ih = img.naturalHeight;
    // cover, weighted toward the car (x 46 %, y 60 %)
    const sc = Math.max(cw / iw, ch / ih);
    const dw = iw * sc, dh = ih * sc;
    const dx = (cw - dw) * .46, dy = (ch - dh) * .6;
    ctx.drawImage(img, dx, dy, dw, dh);
  }
  const REEL_N = 48;
  function loadReel() {
    if (S.reelLoaded) return; S.reelLoaded = true;
    for (let i = 0; i < REEL_N; i++) {
      const img = new Image(); img.decoding = 'async';
      img.onload = () => { S.reelFrames[i] = img; S.lastY = -1; S.reelDrawn = -1; E.reel.classList.add('is-live'); };
      img.src = `assets/carbon/c${String(i).padStart(3, '0')}.webp`;
    }
  }
  function drawReel(t) {
    const step = t < .34 ? 0 : t < .67 ? 1 : 2;
    E.reelSteps.forEach((el, j) => el.classList.toggle('is-on', j <= step));
    if (!S.reelFrames.length) return;
    const i = Math.round(t * (REEL_N - 1));
    const img = nearestFrame(S.reelFrames, i);
    if (!img || i === S.reelDrawn) return;
    S.reelDrawn = i;
    E.reelCanvas.getContext('2d').drawImage(img, 0, 0, E.reelCanvas.width, E.reelCanvas.height);
  }

  /* =====================================================================
     Scrolling — Lenis in motion modes, native otherwise
     ===================================================================== */
  function scrollToY(y, opts = {}) {
    y = Math.max(0, Math.round(y));
    if (S.lenis) S.lenis.scrollTo(y, { duration: opts.duration ?? 1.4, immediate: !!opts.immediate, force: true });
    else window.scrollTo({ top: y, behavior: 'auto' });
  }

  function onAnchor(e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!id || id === 'main') return;
    const y = anchorY(id);
    if (y == null) return;
    e.preventDefault();
    closeMenu(false);
    if (a.dataset.intent) presetIntent(a.dataset.intent);
    const far = Math.abs(window.scrollY - y) > S.vh * 6;
    scrollToY(y, { duration: far ? 1.8 : 1.2, immediate: S.mode === 'static' });
    const target = id === 'enquire' ? $('.intent input:checked') || $('.intent input') : document.getElementById(id);
    if (target) {
      const focusIt = () => { if (!target.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(target.tagName)) target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); };
      setTimeout(focusIt, S.mode === 'static' ? 0 : (far ? 1850 : 1250));
    }
    history.replaceState(null, '', '#' + id);
  }

  /* =====================================================================
     Menu
     ===================================================================== */
  let menuReturn = null;
  function openMenu(btn) {
    menuReturn = btn || document.activeElement;
    E.menu.hidden = false; root.classList.add('menu-open');
    E.menuBtns.forEach((b) => b.setAttribute('aria-expanded', 'true'));
    if (S.lenis) S.lenis.stop();
    const here = $('.menu-list a.is-here') || $('.menu-list a');
    here.focus({ preventScroll: true });
    E.hd.style.setProperty('--zl', '#111111'); E.hd.style.setProperty('--zc', '#111111'); E.hd.style.setProperty('--zr', '#111111'); E.hd.style.setProperty('--zr-inv', '#FFFFFF');
  }
  function closeMenu(restore = true) {
    if (E.menu.hidden) return;
    E.menu.hidden = true; root.classList.remove('menu-open');
    E.menuBtns.forEach((b) => b.setAttribute('aria-expanded', 'false'));
    if (S.lenis) S.lenis.start();
    if (restore && menuReturn) menuReturn.focus({ preventScroll: true });
    updateZones(true);
  }
  E.menuBtns.forEach((b) => b.addEventListener('click', () => (E.menu.hidden ? openMenu(b) : closeMenu())));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !E.menu.hidden) { closeMenu(); return; }
    if (e.key === 'Tab' && !E.menu.hidden) {
      const f = [...$$('a, button', E.menu), ...E.menuBtns.filter((b) => b.offsetParent)];
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* =====================================================================
     Interactions that work in every mode
     ===================================================================== */
  // 01 — on touch, the car crossing the middle band of the screen takes its colour
  function setupCarBand() {
    if (FINE.matches || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((ents) => ents.forEach((en) => en.target.classList.toggle('is-painted', en.isIntersecting)), { rootMargin: '-34% 0px -34% 0px' });
    $$('.car').forEach((c) => io.observe(c));
  }

  // 03 — the loupe: inspect the work the way an inspector would
  function setupLoupe() {
    const loupe = document.createElement('div');
    loupe.className = 'loupe'; loupe.setAttribute('aria-hidden', 'true');
    document.body.appendChild(loupe);
    const Z = 2.2, R = 90;
    let active = null;
    $$('.tile-b').forEach((b) => {
      const img = $('img', b);
      b.addEventListener('pointerenter', (e) => {
        if (e.pointerType !== 'mouse' || !FINE.matches) return;
        active = b; loupe.style.backgroundImage = `url("${img.currentSrc || img.src}")`; loupe.classList.add('is-on');
      });
      b.addEventListener('pointerleave', () => { if (active === b) { active = null; loupe.classList.remove('is-on'); } });
      b.addEventListener('pointermove', (e) => {
        if (active !== b) return;
        const r = b.getBoundingClientRect();
        const nw = img.naturalWidth || 1600, nh = img.naturalHeight || 1067;
        const s1 = Math.max(r.width / nw, r.height / nh);
        const dw = nw * s1, dh = nh * s1;
        const ox = (dw - r.width) / 2, oy = (dh - r.height) / 2;
        const ix = e.clientX - r.left + ox, iy = e.clientY - r.top + oy;
        loupe.style.left = e.clientX + 'px'; loupe.style.top = e.clientY + 'px';
        loupe.style.backgroundSize = `${dw * Z}px ${dh * Z}px`;
        loupe.style.backgroundPosition = `${-(ix * Z - R)}px ${-(iy * Z - R)}px`;
      });
    });
    window.addEventListener('scroll', () => { if (active) { active = null; loupe.classList.remove('is-on'); } }, { passive: true });
  }

  // lightbox for the craft tiles (tap and Enter)
  function setupLightbox() {
    const dlg = $('.lb'); if (!dlg || !dlg.showModal) return;
    const im = $('.lb-img', dlg), cap = $('.lb-cap', dlg);
    $$('.tile-b').forEach((b) => b.addEventListener('click', () => {
      const t = $('img', b);
      im.src = b.dataset.full || t.src; im.alt = t.alt;
      cap.textContent = $('figcaption', b.closest('figure'))?.textContent || '';
      if (S.lenis) S.lenis.stop();
      dlg.showModal();
    }));
    dlg.addEventListener('close', () => { if (S.lenis) S.lenis.start(); });
    dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target === im) dlg.close(); });
  }

  // 08 — walk around it: buttons, arrow keys, drag
  function setupWalk() {
    E.angles.forEach((b, k) => b.addEventListener('click', () => goAngle(k)));
    E.view.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const cur = E.angles.findIndex((b) => b.getAttribute('aria-pressed') === 'true');
      goAngle(cur + (e.key === 'ArrowRight' ? 1 : -1));
    });
    let x0 = null, base = 0;
    E.view.addEventListener('pointerdown', (e) => { x0 = e.clientX; base = E.angles.findIndex((b) => b.getAttribute('aria-pressed') === 'true'); E.view.setPointerCapture(e.pointerId); });
    E.view.addEventListener('pointermove', (e) => {
      if (x0 == null) return;
      const steps = Math.round((x0 - e.clientX) / 70);
      const k = clamp(base + steps, 0, E.phx.length - 1);
      const cur = E.angles.findIndex((b) => b.getAttribute('aria-pressed') === 'true');
      if (k !== cur) goAngle(k);
    });
    const end = () => { x0 = null; };
    E.view.addEventListener('pointerup', end); E.view.addEventListener('pointercancel', end);
  }

  // 09 — pointing at a story shows its car: grey first, then its colour
  function setupNews() {
    const pv = $$('.preview img');
    const show = (k) => {
      pv.forEach((im) => { im.classList.toggle('is-on', im.dataset.k === k); });
    };
    $$('.log-a').forEach((a) => {
      a.addEventListener('mouseenter', () => show(a.dataset.k));
      a.addEventListener('focus', () => show(a.dataset.k));
    });
  }

  // 10 — the enquiry
  function presetIntent(v) {
    const r = $(`.intent input[value="${v}"]`);
    if (r) { r.checked = true; openForm(); }
  }
  function openForm() {
    const f = $('#enquire');
    if (!f.classList.contains('is-closed')) return;
    f.classList.remove('is-closed');
    f.classList.add('is-opening');
    $('.enq-fields').inert = false;
    if (S.mode !== 'static') { measure(); render(true); }
  }
  function setupForm() {
    const f = $('#enquire');
    const fields = $('.enq-fields');
    if (S.mode !== 'static' || root.classList.contains('motion')) { f.classList.add('is-closed'); fields.inert = true; }
    $$('.intent input', f).forEach((r) => r.addEventListener('change', () => {
      openForm();
      const prog = $('#f-program');
      if (r.value === 'provenance' && prog.value === 'not-sure') prog.value = 'not-sure';
    }));
    $$('a[data-program]').forEach((a) => a.addEventListener('click', () => { $('#f-program').value = a.dataset.program; }));
    const btn = $('.btn-send', f), lbl = $('.btn-send-l', f), status = $('.enq-status', f), done = $('.enq-done', f);
    const rules = {
      name: (v) => (v.trim().length < 2 ? 'Please tell us your name.' : ''),
      email: (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? 'Please enter an email address Javier can reply to.' : ''),
      phone: (v) => (v.trim() && v.replace(/\D/g, '').length < 7 ? 'This number looks too short — or leave it empty.' : ''),
      message: () => '',
    };
    const check = (el) => {
      const msg = rules[el.name] ? rules[el.name](el.value) : '';
      const fld = el.closest('.fld');
      fld.classList.toggle('is-bad', !!msg);
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      const err = $('.fld-err', fld); if (err) err.textContent = msg;
      return !msg;
    };
    $$('input:not([type=radio]), textarea', f).forEach((el) => el.addEventListener('blur', () => { if (el.value || el.closest('.fld').classList.contains('is-bad')) check(el); }));
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      if (f.classList.contains('is-closed')) openForm();
      const els = $$('input:not([type=radio]), textarea', f);
      const bad = els.filter((el) => !check(el));
      status.classList.remove('is-error'); status.textContent = '';
      if (bad.length) { bad[0].focus(); status.textContent = bad.length === 1 ? 'One field needs a look.' : `${bad.length} fields need a look.`; return; }
      btn.setAttribute('aria-busy', 'true'); lbl.textContent = 'Sending…';
      const fail = /[?&]form=error/.test(location.search);
      const timer = setTimeout(() => {
        btn.removeAttribute('aria-busy'); lbl.textContent = 'Send to Javier Roque';
        if (fail) {
          status.classList.add('is-error');
          status.innerHTML = 'Your enquiry did not send — the connection dropped. Everything you wrote is still here: try again, or call Javier Roque on <a href="tel:+13057836493">(305) 783-6493</a>.';
          return;
        }
        f.classList.add('is-sent'); done.hidden = false; done.focus();
      }, 1100);
      f.dataset.timer = timer;
    });
  }

  /* =====================================================================
     Reveals outside the stages (IntersectionObserver, one-shot)
     ===================================================================== */
  function prepReveals() {
    $$('[data-rv]').forEach((g) => {
      let i = 0;
      $$('.rv', g).forEach((rv) => {
        if (rv.classList.contains('st03-block') || rv.classList.contains('fig') || rv.classList.contains('btn-line')) { rv.style.setProperty('--i', i++); return; }
        $$(':scope > span', rv).forEach((sp) => {
          if (!sp.querySelector(':scope > .ln')) { const ln = document.createElement('span'); ln.className = 'ln'; while (sp.firstChild) ln.appendChild(sp.firstChild); sp.appendChild(ln); }
          sp.firstChild.style.setProperty('--i', i++);
        });
      });
    });
    $$('.cars .car').forEach((c, i) => c.querySelector('.car-img').style.setProperty('--i', i));
  }
  // ScrollTrigger owns the one-shot reveals and the sketch drift; the render loop owns the stages (G6)
  let ctx = null;
  function setupTriggers() {
    if (ctx) { ctx.revert(); ctx = null; }
    if (S.mode === 'static') return;
    gsap.registerPlugin(ScrollTrigger);
    ctx = gsap.context(() => {
      $$('[data-rv]').forEach((g) => {
        if (S.mode === 'track' && (g.closest('.line-track') || g.closest('.s07-pin'))) return; // stages reveal their own
        ScrollTrigger.create({ trigger: g, start: 'top 82%', once: true, onEnter: () => g.classList.add('in') });
      });
      ScrollTrigger.create({ trigger: E.cars, start: 'top 85%', once: true, onEnter: () => E.cars.classList.add('in') });
      if (S.mode === 'track') {
        gsap.fromTo(E.sketch, { yPercent: 0 }, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: E.s10, start: 'top bottom', end: 'bottom top', scrub: true } });
      }
    });
  }

  /* =====================================================================
     Track focus — Tab into a station scrolls the line to it
     ===================================================================== */
  E.track.addEventListener('focusin', (e) => {
    if (S.mode !== 'track') return;
    const G = S.geo;
    const r = e.target.getBoundingClientRect();
    if (r.left >= 0 && r.right <= S.vw) return; // already on screen
    const cur = clamp(window.scrollY - G.lineTop, 0, G.lineLen);
    const { x: xc } = sToX(cur);
    const elX = r.left + xc;                         // element's left edge in track space
    const x = clamp(elX - S.vw * .3, 0, G.xEnd);
    const st = e.target.closest('.st');
    const y = G.lineTop + (st === E.st05 ? G.hold0 + G.holdLen * .9 : xToS(x));
    scrollToY(y, { immediate: true });
  });

  /* =====================================================================
     Mode setup / teardown
     ===================================================================== */
  function pickMode() {
    if (!hasLib || RM.matches) return 'static';
    return DESK.matches ? 'track' : 'lift';
  }
  function setup() {
    const mode = pickMode();
    S.mode = mode;
    root.classList.toggle('motion', mode !== 'static');
    root.classList.toggle('static', mode === 'static');
    E.line.classList.toggle('track', mode === 'track');
    root.classList.toggle('lift', mode === 'lift');
    S.egKind = ''; S.egDrawn = -1;
    if (mode !== 'static' && !S.lenis && window.Lenis) {
      S.lenis = new Lenis({ autoRaf: false, lerp: .11, smoothWheel: true, anchors: false, prevent: (node) => !!node.closest('.menu, dialog') });
      S.lenis.on('scroll', () => { ScrollTrigger.update(); });
      gsap.ticker.add((t) => { S.lenis && S.lenis.raf(t * 1000); render(false); });
      gsap.ticker.lagSmoothing(0);
    }
    if (mode === 'static' && S.lenis) { S.lenis.destroy(); S.lenis = null; }
    measure();
    setupTriggers();
    render(true);
  }

  let rz = 0, lastW = root.clientWidth, lastH = window.innerHeight;
  function onResize() {
    clearTimeout(rz);
    rz = setTimeout(() => {
      const w = root.clientWidth, h = window.innerHeight;
      const modeNow = pickMode();
      // phone toolbars change the height by a little: ignore those
      if (modeNow === S.mode && w === lastW && Math.abs(h - lastH) < 120) return;
      lastW = w; lastH = h;
      if (modeNow !== S.mode) setup(); else { measure(); render(true); }
      if (S.mode !== 'static') loadEG();
    }, 160);
  }

  /* =====================================================================
     Boot
     ===================================================================== */
  function boot() {
    setupCarBand(); setupLoupe(); setupLightbox(); setupWalk(); setupNews();
    setup();
    setupForm();
    if (S.mode !== 'static') prepReveals(); else $$('[data-rv]').forEach((g) => g.classList.add('in'));
    document.addEventListener('click', onAnchor);
    window.addEventListener('resize', onResize);
    RM.addEventListener?.('change', () => { setup(); });
    DESK.addEventListener?.('change', () => { setup(); });
    if (S.mode === 'static') {
      let q = false;
      window.addEventListener('scroll', () => { if (q) return; q = true; requestAnimationFrame(() => { q = false; render(false); }); }, { passive: true });
    }
    // sequences: the reel when the line approaches, the film once the page has settled
    const startLoads = () => { if (S.mode !== 'static') { loadReel(); loadEG(); } };
    if ('requestIdleCallback' in window) requestIdleCallback(startLoads, { timeout: 2500 }); else setTimeout(startLoads, 1500);
    // geometry changes when fonts land and when images decode
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); render(true); });
    window.addEventListener('load', () => { measure(); render(true); });
    // hash on arrival
    if (location.hash && location.hash.length > 1) {
      const id = location.hash.slice(1);
      setTimeout(() => { const y = anchorY(id); if (y != null) scrollToY(y, { immediate: true }); }, 60);
    }
    root.classList.add('ready');
  }

  // expose a tiny hook for QA (read-only geometry + mode)
  window.__gw = { get mode() { return S.mode; }, get geo() { return S.geo; }, scrollToY, anchorY, xToS, top: (id) => docTop(document.getElementById(id)) };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
