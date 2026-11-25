(function () {
  if (window.__acNoHover) return; window.__acNoHover = 1;
  var Q = "(min-width: 600px) and (hover: hover)", seen = new WeakMap();
  function wrap(sheet) {
    var rules; try { rules = sheet.cssRules; } catch (e) { return; }
    if (!rules || seen.get(sheet) === rules.length) return;
    for (var i = rules.length - 1; i >= 0; i--) {
      var r = rules[i];
      if (r.type === 1 && /:hover/.test(r.selectorText)) {
        var txt = r.cssText;
        sheet.deleteRule(i);
        sheet.insertRule("@media " + Q + "{" + txt + "}", i);
      }
    }
    seen.set(sheet, rules.length);
  }
  function scan() { for (var i = 0; i < document.styleSheets.length; i++) wrap(document.styleSheets[i]); }
  var st = document.createElement("style"); st.id = "ac-touch-press"; st.textContent = "@media (max-width: 599px), (hover: none){[data-rk] *{animation:none!important}button,a,[role=button],label{-webkit-tap-highlight-color:transparent}button:active,a:active,[role=button]:active{transform:scale(.97)!important;filter:brightness(.9)!important;transition:transform .08s ease-out,filter .08s ease-out!important}}"; (document.head || document.documentElement).appendChild(st);
  scan(); setInterval(scan, 400);
  document.addEventListener("DOMContentLoaded", scan);
})();
