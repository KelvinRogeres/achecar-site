(function () {
  var W = { "Mobile 360": 360, "Mobile 390": 390, "Mobile 412": 412, "Tablet 768": 768, "Tablet 1024": 1024, "Desktop 1280": 1280, "Desktop 1440": 1440, "Desktop 1920": 1920 };
  var inFrame = /[?&]bpFrame=1/.test(location.search);
  var box, ifr, cap, cur = null;
  function fit() {
    if (!box || !cur) return;
    var w = W[cur], aw = window.innerWidth - 48, ah = window.innerHeight - 72, s = Math.min(1, aw / w);
    ifr.style.width = w + "px"; ifr.style.height = Math.round(ah / s) + "px"; ifr.style.transform = "scale(" + s + ")";
    ifr.parentNode.style.width = Math.round(w * s) + "px"; ifr.parentNode.style.height = ah + "px";
    cap.textContent = cur + " · " + w + "px" + (s < 1 ? " · exibido em " + Math.round(s * 100) + "%" : "");
  }
  window.acBpPreview = function (v) {
    if (inFrame) return;
    var on = !!W[v];
    if (!on) { if (box) { box.remove(); box = null; document.documentElement.style.overflow = ""; } cur = null; return; }
    if (!box) {
      box = document.createElement("div");
      box.style.cssText = "position:fixed;inset:0;z-index:2147483000;background:#E9E9F0;display:flex;flex-direction:column;align-items:flex-start;gap:12px;padding:16px 24px 0;box-sizing:border-box;font:700 12px Roboto,sans-serif;color:#5A6472";
      cap = document.createElement("div");
      var wrap = document.createElement("div");
      wrap.style.cssText = "position:relative;overflow:hidden;background:#fff;border-radius:12px 12px 0 0;box-shadow:0 0 0 1px #D9D9E3,0 12px 32px rgba(26,13,64,.12)";
      ifr = document.createElement("iframe");
      ifr.style.cssText = "position:absolute;left:0;top:0;border:0;transform-origin:0 0;background:#fff";
      wrap.appendChild(ifr); box.appendChild(cap); box.appendChild(wrap); document.body.appendChild(box);
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("resize", fit);
    }
    if (cur !== v) {
      cur = v;
      var u = new URL(location.href); u.searchParams.set("bpFrame", "1");
      if (ifr.getAttribute("src") !== u.href) ifr.setAttribute("src", u.href);
    }
    fit();
  };
})();
