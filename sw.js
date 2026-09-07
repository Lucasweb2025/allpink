// Desliga o PWA antigo do site em HTML puro.
// Quem já visitou allpink.app.br ainda tem esse arquivo registrado;
// na próxima visita ele limpa o cache e se remove, senão a landing nova
// nunca aparece.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const nomes = await caches.keys();
      await Promise.all(nomes.map((nome) => caches.delete(nome)));
      await self.registration.unregister();
      const clientes = await self.clients.matchAll({ type: "window" });
      for (const cliente of clientes) {
        cliente.navigate(cliente.url);
      }
    })(),
  );
});
