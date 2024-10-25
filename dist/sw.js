if (!self.define) {
  let e,
    s = {};
  const i = (i, n) => (
    (i = new URL(i + ".js", n).href),
    s[i] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, r) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[t]) return;
    let o = {};
    const l = (e) => i(e, t),
      u = { module: { uri: t }, exports: o, require: l };
    s[t] = Promise.all(n.map((e) => u[e] || l(e))).then((e) => (r(...e), o));
  };
}
define(["./workbox-3e911b1d"], function (e) {
  "use strict";
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "assets/apple-touch-icon-4429e4c7.png", revision: null },
        { url: "assets/favicon-3ea94df8.svg", revision: null },
        { url: "assets/index-5dbbaeb2.css", revision: null },
        { url: "assets/index-c853906e.js", revision: null },
        { url: "index.html", revision: "7e93ae578b9b389052b1b4a0e04b1fe7" },
        {
          url: "manifest.webmanifest",
          revision: "e521ef897b0a1aed6fedcbeb5bf714c9",
        },
        { url: "registerSW.js", revision: "1872c500de691dce40960bb85481de07" },
        {
          url: "manifest.webmanifest",
          revision: "e521ef897b0a1aed6fedcbeb5bf714c9",
        },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))
    );
});
