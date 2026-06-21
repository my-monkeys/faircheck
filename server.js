// Startup file Passenger (o2switch / CloudLinux). Passenger lance ce fichier ; il doit
// binder un port et charger .env lui-même. NE PAS utiliser output:"standalone" (ne boote
// pas sous Passenger).
const fs = require('fs');
const path = require('path');
const { createServer } = require('http');
const { parse } = require('url');

// Passenger ne source pas les .env — on les charge à la main (sans écraser process.env).
function loadEnv(p) {
  try {
    for (const l of fs.readFileSync(p, 'utf8').split('\n')) {
      const t = l.trim();
      if (!t || t.startsWith('#')) continue;
      const i = t.indexOf('=');
      if (i < 0) continue;
      const k = t.slice(0, i).trim();
      let v = t.slice(i + 1).trim();
      if ((v[0] === '"' && v.endsWith('"')) || (v[0] === "'" && v.endsWith("'"))) v = v.slice(1, -1);
      if (process.env[k] === undefined) process.env[k] = v;
    }
  } catch (_) { /* pas de .env, tant pis */ }
}
loadEnv(path.join(__dirname, '.env.local'));
loadEnv(path.join(__dirname, '.env'));

// Passenger masque stdout/stderr — on miroite les logs dans tmp/server.log (LE fichier à lire en debug).
fs.mkdirSync(path.join(__dirname, 'tmp'), { recursive: true });
const log = fs.createWriteStream(path.join(__dirname, 'tmp', 'server.log'), { flags: 'a' });
const w = (lvl, a) => log.write(
  `[${new Date().toISOString()}] [${lvl}] ` +
  a.map((x) => (x instanceof Error ? x.stack : typeof x === 'object' ? JSON.stringify(x) : String(x))).join(' ') + '\n',
);
process.on('uncaughtException', (e) => w('FATAL', ['uncaughtException', e]));
process.on('unhandledRejection', (e) => w('FATAL', ['unhandledRejection', e]));

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const app = require('next')({ dev: false });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare()
  .then(() => createServer((req, res) => handle(req, res, parse(req.url, true)))
    .listen(port, (e) => {
      if (e) { w('FATAL', ['listen', e]); throw e; }
      w('READY', ['Faircheck listening on ' + port]);
    }))
  .catch((e) => w('FATAL', ['prepare', e]));
