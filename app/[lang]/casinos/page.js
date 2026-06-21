import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CASINOS } from '@/lib/casinos';
import { GAMES } from '@/lib/games-meta';
import { LOCALES, isLocale, lpath, fmt, hreflangMap, localeMeta, clip } from '@/lib/i18n';
import { tc } from '@/lib/content';
import { SITE } from '@/lib/site';

export function generateStaticParams() { return LOCALES.map((lang) => ({ lang })); }

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const C = tc(lang).casinosIndex;
  const title = clip(C.metaTitle, 60), description = clip(fmt(C.metaDesc, { n: CASINOS.length }), 158);
  return {
    title: { absolute: title }, description,
    alternates: { canonical: lpath(lang, '/casinos'), languages: hreflangMap('/casinos') },
    openGraph: { title, description, url: lpath(lang, '/casinos'), locale: localeMeta(lang).ogLocale, type: 'website', images: ['/og.png'] },
  };
}

export default async function CasinosIndex({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const C = tc(lang); const I = C.casinosIndex;
  const ld = { '@context': 'https://schema.org', '@type': 'ItemList', name: I.h1, inLanguage: lang,
    itemListElement: CASINOS.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: `${SITE}${lpath(lang, `/${c.slug}`)}` })) };
  return (
    <main className="wrap" style={{ paddingBlock: '40px 8px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <span className="label">{I.kicker}</span>
      <h1 className="h1 mt-2">{I.h1}</h1>
      <p className="lead mt-3" style={{ maxWidth: 700 }}>{fmt(I.lead, { n: CASINOS.length, m: GAMES.length })}</p>
      <div className="cardgrid mt-8">
        {CASINOS.map((c) => (
          <Link key={c.slug} href={lpath(lang, `/${c.slug}`)} className="panel-flat ticked block" style={{ padding: 18 }}>
            <div className="flex items-baseline justify-between"><div className="h3">{c.name}</div><span className="label">est. {c.established}</span></div>
            <p className="mt-2 text-[13px]" style={{ color: 'var(--ink-soft)', lineHeight: 1.5 }}>{C.casinos[c.slug]}</p>
            <div className="mono mt-3 text-[11px]" style={{ color: 'var(--muted)' }}>{fmt(I.gamesLine, { n: c.games.length })}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
