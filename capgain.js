/* CapGain — shell condiviso (tema, menu a scomparsa, selettori) */
(function () {
  var root = document.documentElement, body = document.body;
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  // tema
  var theme = ls('cg-theme') || 'light';
  root.setAttribute('data-theme', theme);
  // menu chiuso/aperto
  if (ls('cg-collapsed') === '1') body.classList.add('collapsed');

  function syncThemeIcon() {
    var t = root.getAttribute('data-theme');
    document.querySelectorAll('[data-theme-toggle] i').forEach(function (i) { i.className = t === 'light' ? 'ti ti-moon' : 'ti ti-sun'; });
  }

  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-collapse]');
    if (c) { body.classList.toggle('collapsed'); ls('cg-collapsed', body.classList.contains('collapsed') ? '1' : '0'); if (window.cgSegInit) window.cgSegInit(); }
    var t = e.target.closest('[data-theme-toggle]');
    if (t) { var n = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light'; root.setAttribute('data-theme', n); ls('cg-theme', n); syncThemeIcon(); if (window.cgRedraw) window.cgRedraw(); }
  });

  // selettori segmented con indicatore scorrevole
  function segInit() {
    document.querySelectorAll('[data-seg]').forEach(function (s) {
      var ind = s.querySelector('.ind'); if (!ind) return;
      var place = function (b) { ind.style.left = b.offsetLeft + 'px'; ind.style.width = b.offsetWidth + 'px'; };
      var on = s.querySelector('button.on') || s.querySelector('button'); if (on) place(on);
      if (!s.dataset.bound) {
        s.dataset.bound = '1';
        s.querySelectorAll('button').forEach(function (b) {
          b.addEventListener('click', function () { s.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); place(b); });
        });
      }
    });
  }
  window.cgSegInit = segInit;
  window.cssv = function (n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); };

  window.addEventListener('load', function () { syncThemeIcon(); segInit(); if (window.cgRedraw) window.cgRedraw(); });
  window.addEventListener('resize', segInit);
})();
