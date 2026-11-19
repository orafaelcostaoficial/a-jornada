// Offline: rede primeiro (pega atualizações quando há internet), cache como reserva.
// Ao mudar a lista de arquivos, suba a versão.
const CACHE = 'ajornada-v2';
const ARQUIVOS = [
  './', './index.html', './css/estilo.css', './manifest.webmanifest',
  './js/app.js', './js/jogo.js', './js/store.js', './js/icones.js', './js/avatar.js',
  './fonts/fraunces-latin-500-normal.woff2', './fonts/fraunces-latin-600-normal.woff2', './fonts/fraunces-latin-700-normal.woff2',
  './fonts/nunito-latin-400-normal.woff2', './fonts/nunito-latin-600-normal.woff2', './fonts/nunito-latin-700-normal.woff2', './fonts/nunito-latin-800-normal.woff2',
  './data/plano.js', './data/era-principio.js', './data/imagens.js',
  './icons/icon-192.png', './icons/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((r) => { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copia)); return r; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
