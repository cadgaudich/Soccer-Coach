// Coach PWA Service Worker
// Caching-Strategie: Cache-First für statische Dateien, Network-First für HTML (damit Updates ankommen)

const CACHE_VERSION = 'coach-v4';
const STATIC_ASSETS = [
  './',
  './Coach.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Cache addAll teilweise fehlgeschlagen:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  const isHtml = request.headers.get('accept')?.includes('text/html') || url.pathname.endsWith('.html');

  if (isHtml) {
    // Network-First für HTML: frische Version bevorzugen, Cache als Fallback
    event.respondWith(
      fetch(request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
        return response;
      }).catch(() => caches.match(request).then((cached) => cached || caches.match('./Coach.html')))
    );
  } else {
    // Cache-First für alles andere (Icons, Manifest)
    event.respondWith(
      caches.match(request).then((cached) => {
        return cached || fetch(request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
  }
});
