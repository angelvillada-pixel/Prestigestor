// Service Worker - Prestige Racing (Gestor Taller & Casa)
// - Funciona sin internet (guarda la app en el telefono).
// - Solo toca archivos de ESTA misma app (nunca otros sitios).
// - Cada vez que se cambie index.html, suba el numero: CACHE = 'gestor-vN'.
const CACHE = 'gestor-v8';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './logo-prestige-racing.png', './marca-agua.png', './marca-agua-claro.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;          // nada de otros sitios

  // Pagina principal: primero la red (para recibir mejoras), y si no hay internet, la copia guardada.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put('./index.html', copy)); }
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Resto (iconos, manifest): copia guardada primero, se actualiza en segundo plano.
  e.respondWith(
    caches.match(req).then((hit) => {
      const red = fetch(req).then((res) => {
        if (res && res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => hit);
      return hit || red;
    })
  );
});
