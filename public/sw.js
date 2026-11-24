/* eslint-env serviceworker */
/**
 * Service Worker de AEGIS — Back 1 (Plataforma / Offline).
 *
 * Estrategias:
 * - App shell (navegación): network-first con fallback al HTML cacheado.
 * - Assets estáticos (_next/static, icons): cache-first.
 * - APIs locales (/api/*): network-first con fallback a cache.
 * - /api/telemetry (SSE) y POST: pasan directo, sin cache.
 *
 * Los datos clínicos viven en IndexedDB (Dexie), no en este cache: son
 * offline por diseño y no los toca el service worker.
 */

const VERSION = 'v1';
const CACHE_SHELL = `aegis-shell-${VERSION}`;
const CACHE_RUNTIME = `aegis-runtime-${VERSION}`;

const PRECACHE = [
  '/',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// ---------------------------------------------------------------------------
// Instalación: precachear el shell
// ---------------------------------------------------------------------------

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_SHELL)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

// ---------------------------------------------------------------------------
// Activación: limpiar caches de versiones anteriores
// ---------------------------------------------------------------------------

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !key.endsWith(VERSION))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// ---------------------------------------------------------------------------
// Fetch: estrategias por tipo de petición
// ---------------------------------------------------------------------------

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo GET del mismo origen; el resto lo maneja el navegador.
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // SSE de la sala: no se cachea (es un stream en vivo).
  if (url.pathname === '/api/telemetry') {
    return;
  }

  // APIs locales: network-first con fallback a cache.
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Assets estáticos: cache-first (los nombres llevan hash).
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Navegación (documento): network-first con fallback al shell.
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  // Resto (fuentes, etc.): stale-while-revalidate.
  event.respondWith(staleWhileRevalidate(request));
});

// ---------------------------------------------------------------------------
// Estrategias
// ---------------------------------------------------------------------------

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_RUNTIME);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_RUNTIME);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;

    if (request.mode === 'navigate') {
      const shell = await caches.match('/');
      if (shell) return shell;
    }

    return Response.error();
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_RUNTIME);
  const cached = await cache.match(request);

  const revalidar = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);

  return cached || revalidar;
}
