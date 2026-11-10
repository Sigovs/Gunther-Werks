/* G3 · the header bar is a lens (Alex, 10 Nov 2026). In Chromium the backdrop under the bar is refracted through an
   SVG displacement map drawn to the bar's own pill: the bend is strongest at the rounded edge and fades to nothing
   inside, as in thick glass. Other browsers, and anyone who asks for less transparency, keep the frosted bar. */
(() => {
  const bar = document.querySelector('.hd__bar'), f = document.getElementById('hd-lens');
  const brands = navigator.userAgentData && navigator.userAgentData.brands;
  // Chrome on iOS is WebKit and says CriOS, not Chrome/, so it keeps the frost
  const chromium = brands ? brands.some((b) => /Chromium/.test(b.brand)) : /Chrome\/\d/.test(navigator.userAgent);
  if (!bar || !f || !chromium || matchMedia('(prefers-reduced-transparency: reduce)').matches) return;
  const img = f.querySelector('feImage');
  let last = '';
  const draw = () => {
    const W = Math.round(bar.offsetWidth), H = Math.round(bar.offsetHeight);
    if (!W || !H || `${W}x${H}` === last) return;
    last = `${W}x${H}`;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const ctx = c.getContext('2d'), map = ctx.createImageData(W, H), px = map.data;
    const r = H / 2, edge = Math.min(r, 26);
    for (let j = 0; j < H; j++) {
      for (let i = 0; i < W; i++) {
        // the nearest point on the pill's centre line, and the way out from it
        const x = i + .5, y = j + .5, cx = Math.min(Math.max(x, r), W - r);
        let nx = x - cx, ny = y - r; const q = Math.hypot(nx, ny) || 1; nx /= q; ny /= q;
        const t = Math.max(0, 1 - Math.max(0, r - q) / edge), m = t * t;
        // red and green carry the offset: the edge samples from further in, so the picture stretches toward it
        const k = (j * W + i) * 4;
        px[k] = 128 - nx * m * 127; px[k + 1] = 128 - ny * m * 127; px[k + 2] = 128; px[k + 3] = 255;
      }
    }
    ctx.putImageData(map, 0, 0);
    img.setAttribute('href', c.toDataURL());
    for (const el of [f, img]) { el.setAttribute('width', W); el.setAttribute('height', H); }
    document.documentElement.classList.add('lens');
  };
  draw();
  new ResizeObserver(draw).observe(bar);
})();
