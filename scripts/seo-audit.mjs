// SEO audit: crawl a sample of served pages and check on-page signals.
// Usage: node scripts/seo-audit.mjs [baseUrl]   (default http://localhost:4400)
const BASE = process.argv[2] || 'http://localhost:4400';

const SAMPLE = [
  '/en', '/pt', '/es', '/fr', '/de',
  '/en/stake/dice', '/fr/stake/dice', '/pt/bc-game/mines', '/de/rollbit/limbo',
  '/en/bc-game', '/es/roobet', '/en/games/mines', '/pt/games/plinko',
  '/en/how-it-works', '/fr/how-it-works', '/en/casinos', '/en/games',
];

const rx = {
  title: /<title[^>]*>([^<]*)<\/title>/i,
  desc: /<meta[^>]+name="description"[^>]+content="([^"]*)"/i,
  canonical: /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i,
  ogTitle: /<meta[^>]+property="og:title"[^>]+content="([^"]*)"/i,
  ogImage: /<meta[^>]+property="og:image"[^>]*>/i,
  ogLocale: /<meta[^>]+property="og:locale"[^>]+content="([^"]*)"/i,
  twitter: /<meta[^>]+name="twitter:card"[^>]*>/i,
  htmlLang: /<html[^>]+lang="([^"]*)"/i,
};

const count = (html, re) => (html.match(new RegExp(re, 'gi')) || []).length;

let warn = 0, fail = 0;
const W = (m) => { warn++; return `⚠ ${m}`; };
const F = (m) => { fail++; return `✗ ${m}`; };

console.log(`\nSEO audit · ${BASE}\n${'='.repeat(64)}`);

for (const path of SAMPLE) {
  const res = await fetch(BASE + path, { redirect: 'manual' });
  const html = await res.text();
  const notes = [];

  const title = (html.match(rx.title) || [])[1] || '';
  const desc = (html.match(rx.desc) || [])[1] || '';
  const canonical = (html.match(rx.canonical) || [])[1] || '';
  const hreflangs = count(html, '<link[^>]+rel="alternate"[^>]+hreflang=');
  const h1 = count(html, '<h1');
  const jsonld = count(html, 'application/ld\\+json');
  const htmlLang = (html.match(rx.htmlLang) || [])[1] || '';
  const words = (html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').match(/\b\w+\b/g) || []).length;

  if (res.status !== 200) notes.push(F(`HTTP ${res.status}`));
  if (!title) notes.push(F('no <title>')); else if (title.length > 62) notes.push(W(`title ${title.length} chars (>62)`));
  if (!desc) notes.push(F('no meta description')); else if (desc.length > 165) notes.push(W(`desc ${desc.length} chars (>165)`)); else if (desc.length < 70) notes.push(W(`desc ${desc.length} chars (<70)`));
  if (!canonical) notes.push(F('no canonical'));
  if (hreflangs !== 6) notes.push(F(`hreflang links = ${hreflangs} (want 6)`));
  if (h1 !== 1) notes.push(F(`<h1> count = ${h1} (want 1)`));
  if (!rx.ogImage.test(html)) notes.push(W('no og:image'));
  if (!rx.twitter.test(html)) notes.push(W('no twitter:card'));
  if (jsonld < 1) notes.push(W('no JSON-LD'));
  if (!htmlLang) notes.push(F('no <html lang>'));
  if (words < 250) notes.push(W(`thin: ${words} words`));

  const status = notes.length ? notes.join('  ') : '✓ clean';
  console.log(`\n${path}`);
  console.log(`  title(${title.length}): ${title.slice(0, 70)}`);
  console.log(`  desc(${desc.length}): ${desc.slice(0, 80)}`);
  console.log(`  canonical: ${canonical}  · hreflang:${hreflangs} · h1:${h1} · jsonld:${jsonld} · lang:${htmlLang} · words:${words}`);
  console.log(`  ${status}`);
}

console.log(`\n${'='.repeat(64)}`);
console.log(`${fail === 0 && warn === 0 ? '✅ all clean' : `${fail} fail · ${warn} warn`}\n`);
