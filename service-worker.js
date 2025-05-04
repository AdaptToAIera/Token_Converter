const CACHE_NAME = 'token-calculator-cache-v1';
const urlsToCache = [
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    // Add paths to your icon files here, e.g.:
    // '/icons/icon-192x192.png',
    // '/icons/icon-512x512.png',
    // Add paths to any placeholder or actual icon SVGs:
    // '/gearshape.svg',
    // '/text.word.count.svg',
    // '/doc.text.svg',
    // '/character.svg',
    // '/lightbulb.svg'
];

// Install event: cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serve from cache first, then network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // No cache hit - fetch from network
        return fetch(event.request);
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete caches not in whitelist
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});