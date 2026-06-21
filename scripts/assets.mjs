// Generate brand assets (favicon + icons + OG) with sharp. Run: node scripts/assets.mjs
// Slate / security-vault palette: deep graphite + lime accent.
import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const app = join(root, 'app');
mkdirSync(pub, { recursive: true });

const BASE = '#161a1f', CARD = '#1b2128', LINE = '#232932', TXT = '#e8ecf0', MUT = '#6c7682';
const LIME = '#bff24a', OK = '#7fe08a', OKBG = '#152018', DARK = '#10140c';

const grid = (w, h, step, color, sw = 1) => {
  let l = '';
  for (let x = 0; x <= w; x += step) l += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${color}" stroke-width="${sw}"/>`;
  for (let y = 0; y <= h; y += step) l += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${color}" stroke-width="${sw}"/>`;
  return l;
};

// ---- icon: lime rounded square + dark shield + lime check (the nav mark) ----
function iconSVG(s) {
  const r = s * 0.2, p = s * 0.16;
  // shield path scaled into the inner box
  const sx = (x) => p + (x / 12) * (s - 2 * p);
  const sy = (y) => p + (y / 12) * (s - 2 * p);
  const shield = `M ${sx(6)} ${sy(1)} L ${sx(10)} ${sy(2.6)} L ${sx(10)} ${sy(5.6)} C ${sx(10)} ${sy(8.2)} ${sx(8.3)} ${sy(9.9)} ${sx(6)} ${sy(10.7)} C ${sx(3.7)} ${sy(9.9)} ${sx(2)} ${sy(8.2)} ${sx(2)} ${sy(5.6)} L ${sx(2)} ${sy(2.6)} Z`;
  const check = `M ${sx(4.4)} ${sy(6)} L ${sx(5.5)} ${sy(7.1)} L ${sx(8)} ${sy(4.7)}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
    <rect width="${s}" height="${s}" rx="${r}" fill="${LIME}"/>
    <path d="${shield}" fill="${DARK}"/>
    <path d="${check}" fill="none" stroke="${LIME}" stroke-width="${s * 0.05}" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

// ---- OG 1200×630 (slate) ----
function ogSVG() {
  const W = 1200, H = 630, m = 56;
  const markS = 40, markX = 92, markY = 104;
  const sx = (x) => markX + (x / 12) * markS, sy = (y) => markY + (y / 12) * markS;
  const shield = `M ${sx(6)} ${sy(1)} L ${sx(10)} ${sy(2.6)} L ${sx(10)} ${sy(5.6)} C ${sx(10)} ${sy(8.2)} ${sx(8.3)} ${sy(9.9)} ${sx(6)} ${sy(10.7)} C ${sx(3.7)} ${sy(9.9)} ${sx(2)} ${sy(8.2)} ${sx(2)} ${sy(5.6)} L ${sx(2)} ${sy(2.6)} Z`;
  const check = `M ${sx(4.4)} ${sy(6)} L ${sx(5.5)} ${sy(7.1)} L ${sx(8)} ${sy(4.7)}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${BASE}"/>
    <g opacity="0.55">${grid(W, 320, 46, LINE)}</g>
    <rect x="${m}" y="${m}" width="${W - 2 * m}" height="${H - 2 * m}" rx="14" fill="none" stroke="${LINE}" stroke-width="1.5"/>

    <rect x="${markX}" y="${markY}" width="${markS}" height="${markS}" rx="9" fill="${LIME}"/>
    <path d="${shield}" fill="${DARK}"/>
    <path d="${check}" fill="none" stroke="${LIME}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="${markX + markS + 16}" y="${markY + 30}" font-family="Geist" font-size="30" font-weight="600" fill="${TXT}">fair<tspan fill="${LIME}">check</tspan></text>
    <text x="${W - 92}" y="${markY + 28}" text-anchor="end" font-family="Geist Mono" font-size="15" letter-spacing="3" fill="${MUT}">PROVABLY-FAIR · VERIFIER</text>

    <text x="92" y="300" font-family="Geist" font-size="72" font-weight="700" fill="${TXT}">Verify your casino result.</text>
    <text x="92" y="390" font-family="Geist" font-size="72" font-weight="700" fill="${LIME}">Prove it was fair.</text>

    <text x="92" y="468" font-family="Geist Mono" font-size="21" fill="${MUT}">HMAC-SHA256( serverSeed , clientSeed:nonce:round )</text>

    <g transform="translate(840,486)">
      <rect x="0" y="0" width="268" height="58" rx="8" fill="${OKBG}" stroke="${OK}" stroke-width="1.5"/>
      <circle cx="34" cy="29" r="12" fill="${OK}"/>
      <path d="M 28.5 29 L 32.5 33 L 40 25" fill="none" stroke="${OKBG}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="58" y="36" font-family="Geist Mono" font-size="19" font-weight="600" letter-spacing="1" fill="${OK}">HASH VERIFIED</text>
    </g>

    <text x="92" y="540" font-family="Geist Mono" font-size="17" fill="${MUT}">32+ casinos · 8 games · 100% in your browser · no login</text>
  </svg>`;
}

async function png(svg, out, w, h) {
  await sharp(Buffer.from(svg)).resize(w, h).png().toFile(out);
  console.log('  ✓', out.replace(root + '/', ''));
}

console.log('Generating slate assets…');
await png(iconSVG(512), join(app, 'icon.png'), 512, 512);
await png(iconSVG(512), join(app, 'apple-icon.png'), 180, 180);
await png(iconSVG(512), join(pub, 'icon-192.png'), 192, 192);
await png(iconSVG(512), join(pub, 'icon-512.png'), 512, 512);
await png(ogSVG(), join(pub, 'og.png'), 1200, 630);
console.log('Done.');
