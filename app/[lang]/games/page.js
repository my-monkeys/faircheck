import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GAMES } from '@/lib/games-meta';
import { CASINOS } from '@/lib/casinos';
import { LOCALES, isLocale, lpath, fmt, hreflangMap, localeMeta, clip } from '@/lib/i18n';
import { tc, localizedGames } from '@/lib/content';
import { SITE } from '@/lib/site';

export function generateStaticParams() { return LOCALES.map((lang) => ({ lang })); }

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const C = tc(lang).gamesIndex;
  const title = clip(C.metaTitle, 60), description = clip(C.metaDesc, 158);
  return {
    title: { absolute: title }, description,
    alternates: { canonical: lpath(lang, '/games'), languages: hreflangMap('/games') },
    openGraph: { title, description, url: lpath(lang, '/games'), locale: localeMeta(lang).ogLocale, type: 'website', images: ['/og.png'] },
  };
}

export default async function GamesIndex({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const C = tc(lang).gamesIndex;
  const games = localizedGames(lang);
  const ld = { '@context': 'https://schema.org', '@type': 'ItemList', name: C.h1, inLanguage: lang,
    itemListElement: games.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.name, url: `${SITE}${lpath(lang, `/games/${g.slug}`)}` })) };
  return (
    <main className="wrap" style={{ paddingBlock: '40px 8px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <span className="label">{C.kicker}</span>
      <h1 className="h1 mt-2">{C.h1}</h1>
      <p className="lead mt-3" style={{ maxWidth: 680 }}>{fmt(C.lead, { n: CASINOS.length })}</p>
      <div className="cardgrid mt-8">
        {games.map((g) => (
          <Link key={g.slug} href={lpath(lang, `/games/${g.slug}`)} className="panel-flat ticked block" style={{ padding: 18 }}>
            <div className="flex items-baseline justify-between"><div className="h3">{g.name}</div><span className="label">{g.category}</span></div>
            <p className="mt-1 text-[14px]" style={{ color: 'var(--ink-soft)' }}>{g.tagline}</p>
            <div className="mono mt-3 text-[11px]" style={{ color: 'var(--muted)' }}>{g.formula}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
