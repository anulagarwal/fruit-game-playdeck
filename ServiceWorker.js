const cacheName = "Momo Games-Watermelon Suika Game-0.4";
const contentToCache = [
    "Build/1d3e85521b1d79b38c88e8f85cb0f809.loader.js",
    "Build/5ec928db92dd489b7a738bd01af314b1.framework.js",
    "Build/df796beefea38cdccb88bd2438238c37.data",
    "Build/e8f885add21066afce91d4e12f4227a7.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
