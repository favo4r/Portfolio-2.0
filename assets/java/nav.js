/* Mobile navigation toggle.
   Works with the .menu-toggle button and <header class="header"> on every page. */
(function () {
  var header = document.querySelector('header');
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (!header || !toggle || !nav) return;

  function setOpen(open) {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(!header.classList.contains('nav-open'));
  });

  // close after tapping a link
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  // close with Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  // reset when resizing back up to desktop
  window.matchMedia('(min-width: 1001px)').addEventListener('change', function (e) {
    if (e.matches) setOpen(false);
  });
})();
