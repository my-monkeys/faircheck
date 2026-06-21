// Validate locale content files mirror en.js exactly (keys + placeholder tokens).
// Run: node --experimental-default-type=module scripts/check-i18n.mjs
import en from '../lib/content/en.js';
import pt from '../lib/content/pt.js';
import es from '../lib/content/es.js';
import fr from '../lib/content/fr.js';
import de from '../lib/content/de.js';

const LOCALES = { pt, es, fr, de };
let problems = 0;

function keyPaths(obj, prefix = '') {
  const out = [];
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => {
      if (v && typeof v === 'object') out.push(...keyPaths(v, `${prefix}[${i}]`));
      else out.push(`${prefix}[${i}]`);
    });
  } else if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      const p = prefix ? `${prefix}.${k}` : k;
      if (obj[k] && typeof obj[k] === 'object') out.push(...keyPaths(obj[k], p));
      else out.push(p);
    }
  }
  return out;
}

function tokens(obj) {
  const counts = {};
  const walk = (v) => {
    if (typeof v === 'string') { for (const m of v.matchAll(/\{(\w+)\}/g)) counts[m[1]] = (counts[m[1]] || 0) + 1; }
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk(obj);
  return counts;
}

const enPaths = keyPaths(en);
const enTokens = tokens(en);

for (const [loc, data] of Object.entries(LOCALES)) {
  const paths = keyPaths(data);
  const missing = enPaths.filter((p) => !paths.includes(p));
  const extra = paths.filter((p) => !enPaths.includes(p));
  const tk = tokens(data);
  const tokenDiff = Object.keys(enTokens).filter((k) => (tk[k] || 0) !== enTokens[k]);

  const okStruct = missing.length === 0 && extra.length === 0;
  const okTokens = tokenDiff.length === 0;
  console.log(`\n[${loc}] paths: ${paths.length}/${enPaths.length}  struct:${okStruct ? 'OK' : 'FAIL'}  tokens:${okTokens ? 'OK' : 'FAIL'}`);
  if (missing.length) { problems++; console.log('  missing:', missing.slice(0, 10).join(' | ') + (missing.length > 10 ? ` … +${missing.length - 10}` : '')); }
  if (extra.length) { problems++; console.log('  extra  :', extra.slice(0, 10).join(' | ')); }
  if (tokenDiff.length) { problems++; console.log('  token mismatch:', tokenDiff.map((k) => `{${k}} en=${enTokens[k]} ${loc}=${tk[k] || 0}`).join(', ')); }
}

console.log(`\n${problems === 0 ? '✅ all locales mirror en.js' : `❌ ${problems} problem(s)`}\n`);
process.exit(problems === 0 ? 0 : 1);
