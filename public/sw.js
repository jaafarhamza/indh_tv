const CACHE_NAME = "indh-tv-videos-v1";

// Video domains to cache
const VIDEO_DOMAINS = [
  "smbiz2u60k.ufs.sh",
  "nq3v18uj8o.ufs.sh",
];

// Install: activate immediately
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// Activate: claim all clients and clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: cache video files on first request, serve from cache on repeat
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Check if this is a video request (local or external CDN)
  const isLocalVideo = url.pathname.startsWith("/videos/");
  const isExternalVideo = VIDEO_DOMAINS.some((domain) => url.hostname.includes(domain));

  if (isLocalVideo || isExternalVideo) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            // Serve from cache (instant!)
            return cachedResponse;
          }

          // Not cached yet — fetch from network and cache it
          return fetch(event.request).then((networkResponse) => {
            // Only cache successful complete responses
            if (networkResponse.ok && networkResponse.status === 200) {
              // Clone the response before caching (stream can only be read once)
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Network failed, return nothing (video won't play)
            return new Response("", { status: 503 });
          });
        });
      })
    );
  }
});
