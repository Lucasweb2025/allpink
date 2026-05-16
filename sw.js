const CACHE_NAME = 'allpink-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icone-192.png'
];

// Instalação do PWA e salvamento dos arquivos base no cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Ativação do Service Worker
self.addEventListener('activate', (e) => {
  self.clients.claim();
});

// Estratégia de Cache: Tenta carregar pela rede (Internet), se falhar ou cair, usa o Cache salvo
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});