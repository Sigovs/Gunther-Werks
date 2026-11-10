/* G3 · the text pages (Privacy, Accessibility, Cookie settings): the home page's header and menu sheet, without the
   home's scroll choreography. The header fogs once the page moves; the menu sheet rises, traps focus, and closes
   on Escape, the Close button or the dimmed page, as on the home page. */
(() => {
  const d = document, root = d.documentElement;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fog = () => root.classList.toggle('is-fog', scrollY > 24);
  fog(); addEventListener('scroll', fog, { passive: true });

  d.querySelectorAll('.btn').forEach((b) => { if (!b.querySelector('.fill')) b.insertAdjacentHTML('afterbegin', '<i class="fill" aria-hidden="true"></i>'); });

  const menu = d.getElementById('menu'), btn = d.querySelector('.hd__menu');
  if (!menu || !btn) return;
  const sheet = menu.querySelector('.menu__sheet'), main = d.getElementById('main'), ft = d.querySelector('.ft');
  const EX = 'cubic-bezier(.16, 1, .3, 1)';
  const open = () => {
    menu.hidden = false; root.classList.add('is-menu'); btn.setAttribute('aria-expanded', 'true');
    main.inert = true; if (ft) ft.inert = true;
    sheet.animate(RM ? [{ opacity: 0 }, { opacity: 1 }] : [{ transform: 'translateY(100%)' }, { transform: 'none' }], { duration: RM ? 160 : 560, easing: EX });
    menu.querySelector('.menu__nav a').focus();
  };
  const close = () => {
    if (menu.hidden) return;
    const done = () => { menu.hidden = true; root.classList.remove('is-menu'); btn.setAttribute('aria-expanded', 'false'); main.inert = false; if (ft) ft.inert = false; btn.focus({ preventScroll: true }); };
    if (RM) return done();
    sheet.animate([{ transform: 'none' }, { transform: 'translateY(100%)' }], { duration: 320, easing: 'cubic-bezier(.7, 0, .84, 0)' }).onfinish = done;
  };
  btn.addEventListener('click', () => (menu.hidden ? open() : close()));
  menu.addEventListener('click', (e) => { if (e.target.closest('[data-mclose]')) close(); });
  d.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'Tab' && !menu.hidden) {
      const f = [...sheet.querySelectorAll('a, button')], i = f.indexOf(d.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
})();
