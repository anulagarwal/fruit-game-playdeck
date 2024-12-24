const cacheName = "Momo Games-Watermelon Suika Game-0.4";
const contentToCache = [
    "Build/fbfdf321a28b1443897050d5410bf720.loader.js",
    "Build/5ec928db92dd489b7a738bd01af314b1.framework.js",
    "Build/5144a2de7028cd215d7b72b99ce0dd6f.data",
    "Build/9d6905c9b1cc995ba81412959d8e6f0d.wasm",
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
