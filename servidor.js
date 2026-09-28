// Servidor local SOLO para pruebas:  node servidor.js  ->  http://localhost:8099
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const PUBLICOS = new Set(['index.html', 'manifest.json', 'sw.js', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png']);
const tipos = {
  '.html': 'text/html; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8', '.png': 'image/png'
};
const seguridad = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cross-Origin-Opener-Policy': 'same-origin'
};

const srv = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end(); }
  let nombre;
  try {
    const p = decodeURIComponent(req.url.split('?')[0]);
    nombre = p === '/' ? 'index.html' : p.replace(/^\/+/, '');
  } catch (e) { res.writeHead(400, seguridad); return res.end('solicitud invalida'); }

  // Solo se sirven los archivos de la lista (evita leer cualquier otro archivo del computador)
  if (!PUBLICOS.has(nombre)) { res.writeHead(404, seguridad); return res.end('no encontrado'); }

  fs.readFile(path.join(root, nombre), (e, d) => {
    if (e) { res.writeHead(404, seguridad); return res.end('no encontrado'); }
    res.writeHead(200, Object.assign({
      'Content-Type': tipos[path.extname(nombre)] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    }, seguridad));
    res.end(req.method === 'HEAD' ? undefined : d);
  });
});

// 127.0.0.1: solo este computador puede entrar (no toda la red WiFi)
srv.listen(8099, '127.0.0.1', () => console.log('UP http://localhost:8099/index.html'));
