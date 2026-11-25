/* Achecar — movimento leve + skeletons. Carregado no <helmet> de cada página. */
(function () {
  if (window.__acMotion) return;
  window.__acMotion = true;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(.2,.8,.2,1)';

  var css = [
    '@keyframes acShimmer{0%{background-position:-480px 0}100%{background-position:480px 0}}',
    '@keyframes acPageIn{from{opacity:0}to{opacity:1}}',
    '.sc-placeholder:not(:has(.sc-placeholder-error)),[data-ac-skel]{background-color:#ECECF3 !important;background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.65) 50%,rgba(255,255,255,0) 100%) !important;background-size:480px 100% !important;background-repeat:no-repeat !important;animation:acShimmer 1.3s linear infinite;border-radius:12px;color:transparent !important}',
    '.sc-placeholder{outline:0 !important;border:0 !important}',
    'img[data-ac-skel]{opacity:1}',
    'img[data-ac-skel]::before{content:none}',
    'body{animation:acPageIn .45s ease-out both}',
    '@media (prefers-reduced-motion: reduce){.sc-placeholder,[data-ac-skel]{animation:none !important}body{animation:none}}'
  ].join('');
  var st = document.createElement('style');
  st.id = 'ac-motion';
  st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  /* Skeleton para imagens/vídeos ainda carregando */
  function skelMedia(el) {
    if (el.__acSk) return;
    el.__acSk = true;
    var isImg = el.tagName === 'IMG';
    var ready = isImg ? (el.complete && el.naturalWidth > 0) : el.readyState >= 2;
    if (ready || (isImg && !el.getAttribute('src'))) return;
    var r = el.getBoundingClientRect();
    if (r.width < 24) return;
    var fixAR = false;
    if (r.height < 24) {
      var aw = +el.getAttribute('width'), ah = +el.getAttribute('height');
      el.style.aspectRatio = aw && ah ? aw + '/' + ah : '1/1';
      fixAR = true;
    }
    el.setAttribute('data-ac-skel', '');
    var done = function () {
      el.removeAttribute('data-ac-skel');
      if (fixAR) el.style.aspectRatio = '';
      if (!reduce && el.animate) el.animate([{ opacity: 0 }, { opacity: getComputedStyle(el).opacity }], { duration: 380, easing: 'ease-out' });
    };
    el.addEventListener(isImg ? 'load' : 'loadeddata', done, { once: true });
    el.addEventListener('error', function () { el.removeAttribute('data-ac-skel'); if (fixAR) el.style.aspectRatio = ''; }, { once: true });
  }

  /* Revelação suave ao rolar */
  var seen = new WeakSet();
  function skip(el) {
    if (el.closest('[data-qv-anim],[data-no-reveal],header,nav,dialog,[role="dialog"]')) return true;
    var cs = getComputedStyle(el);
    if (cs.position === 'fixed' || cs.position === 'sticky' || cs.animationName !== 'none') return true;
    return false;
  }
  var io = reduce || !('IntersectionObserver' in window) ? null : new IntersectionObserver(function (ents) {
    var batch = 0;
    ents.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      var d = Math.min(batch++ * 60, 360);
      e.target.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 560, delay: d, easing: EASE, fill: 'backwards' });
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });

  function candidates(root) {
    var out = [];
    root.querySelectorAll('section, article, [data-reveal]').forEach(function (el) { out.push(el); });
    root.querySelectorAll('section > div > div, section > div').forEach(function (el) {
      var cs = getComputedStyle(el);
      if (cs.display === 'grid') Array.prototype.forEach.call(el.children, function (c) { out.push(c); });
    });
    return out;
  }
  function scan(root) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll('img, video').forEach(skelMedia);
    if (!io) return;
    var vh = innerHeight;
    candidates(root).forEach(function (el) {
      if (seen.has(el)) return;
      seen.add(el);
      if (skip(el)) return;
      var r = el.getBoundingClientRect();
      if (r.height === 0) return;
      if (r.top < vh * 0.9 && performance.now() > 2500) return; /* já visível após carga: não piscar */
      io.observe(el);
    });
  }

  var pending = false;
  function queue() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () { pending = false; scan(document.body); });
  }
  function start() {
    scan(document.body);
    new MutationObserver(queue).observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
