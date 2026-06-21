import { SITE } from '@/lib/site';
import { LOCALES, LOCALE_META, DEFAULT_LOCALE } from '@/lib/i18n';
import { GAME_SLUGS } from '@/lib/games-meta';
import { CASINO_SLUGS, PAIRS } from '@/lib/casinos';

export const dynamic = 'force-static';

// Custom sitemap so we can attach an XSL stylesheet (/sitemap.xsl) — the XML renders
// as a styled, human-readable page in a browser while staying a valid sitemap with
// hreflang alternates for crawlers.

function altLinks(suffix) {
  const links = LOCALES.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${LOCALE_META[l].hreflang}" href="${SITE}/${l}${suffix}"/>`,
  );
  links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/${DEFAULT_LOCALE}${suffix}"/>`);
  return links.join('\n');
}

export function GET() {
  const suffixes = [
    { s: '', p: '1.0', f: 'weekly' },
    { s: '/casinos', p: '0.7', f: 'weekly' },
    { s: '/games', p: '0.7', f: 'weekly' },
    { s: '/how-it-works', p: '0.6', f: 'monthly' },
    ...GAME_SLUGS.map((g) => ({ s: `/games/${g}`, p: '0.8', f: 'monthly' })),
    ...CASINO_SLUGS.map((c) => ({ s: `/${c}`, p: '0.6', f: 'monthly' })),
    ...PAIRS.map(({ casino, game }) => ({ s: `/${casino}/${game}`, p: '0.7', f: 'monthly' })),
  ];

  const urls = [];
  for (const { s, p, f } of suffixes) {
    const alts = altLinks(s);
    for (const l of LOCALES) {
      urls.push(
        `  <url>\n    <loc>${SITE}/${l}${s}</loc>\n${alts}\n    <changefreq>${f}</changefreq>\n    <priority>${p}</priority>\n  </url>`,
      );
    }
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    urls.join('\n') +
    `\n</urlset>\n`;

  return new Response(xml, {
    headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  });
}
