const cacheName = "Momo Games-Watermelon Suika Game-0.4";
const contentToCache = [
    "Build/FruitMerge_Telegram5.loader.js",
    "Build/68248473f2556f92c480c2b34c4ee74d.js",
    "Build/51cf138636d786c870589a3adc97934b.data",
    "Build/5607cff9420b28f7890e0e17a74f6678.wasm",
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
