// expo export sonrası PWA son işlemi: index.html'e manifest/ikon etiketleri, tüm dosyaları önbelleğe alan service worker,
// GitHub Pages için 404.html (SPA yönlendirmesi) ve .nojekyll.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const base = (process.env.EXPO_BASE_URL || '').replace(/\/$/, '');

const files = [];
(function walk(dir) {
  for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) walk(p);
    else files.push(path.relative(DIST, p).replace(/\\/g, '/'));
  }
})(DIST);

const hash = crypto.createHash('sha256');
for (const f of files.sort()) hash.update(f + fs.statSync(path.join(DIST, f)).size);
const version = hash.digest('hex').slice(0, 12);
const precache = ['./', ...files.filter((f) => f !== 'sw.js' && !f.endsWith('.map'))];

fs.writeFileSync(
  path.join(DIST, 'sw.js'),
  `// Otomatik üretildi (scripts/pwa.mjs). Sürüm: ${version}
const CACHE = 'cfa-${version}';
const FILES = ${JSON.stringify(precache)};
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(e.request).catch(() => (e.request.mode === 'navigate' ? caches.match('./') : Response.error()));
    }),
  );
});
`,
);

const indexPath = path.join(DIST, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
const head = `
    <link rel="manifest" href="${base}/manifest.json" />
    <meta name="theme-color" content="#1F5FBF" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="CFA" />
    <link rel="apple-touch-icon" href="${base}/apple-touch-icon.png" />
    <script>if('serviceWorker' in navigator){var had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener('controllerchange',function(){if(had)location.reload()});addEventListener('load',function(){navigator.serviceWorker.register('${base}/sw.js',{scope:'${base}/'})})}</script>`;
if (!html.includes('rel="manifest"')) html = html.replace('</head>', `${head}\n  </head>`);
html = html.replace('<html lang="en">', '<html lang="tr">');
fs.writeFileSync(indexPath, html);
fs.writeFileSync(path.join(DIST, '404.html'), html); // GitHub Pages: derin bağlantılar SPA'ya düşsün
fs.writeFileSync(path.join(DIST, '.nojekyll'), '');
console.log(`PWA: ${precache.length} dosya önbellek listesinde, sürüm ${version}, base "${base}"`);
