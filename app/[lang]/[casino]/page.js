import Link from 'next/link';
import { notFound } from 'next/navigation';
import Verifier from '@/components/Verifier';
import { CASINOS, CASINO_SLUGS, getCasino, ENGINES } from '@/lib/casinos';
import { LOCALES, isLocale, lpath, fmt, hreflangMap, localeMeta, clip } from '@/lib/i18n';
import { tc, localizedGames } from '@/lib/content';
import { SITE } from '@/lib/site';

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => CASINO_SLUGS.map((casino) => ({ lang, casino })));
}

export async function generateMetadata({ params }) {
  const { lang, casino } = await params;
  const c = getCasino(casino);
  if (!isLocale(lang) || !c) return {};
  const P = tc(lang).casinoPage;
  const title = clip(fmt(P.metaTitle, { casino: c.name }), 60);
  const description = clip(fmt(P.metaDesc, { casino: c.name }), 158);
  const suffix = `/${casino}`;
  return {
    title: { absolute: title }, description,
    alternates: { canonical: lpath(lang, suffix), languages: hreflangMap(suffix) },
    openGraph: { title, description, url: lpath(lang, suffix), type: 'article', locale: localeMeta(lang).ogLocale, images: ['/og.png'] },
  };
}

export default async function CasinoPage({ params }) {
  const { lang, casino } = await params;
  const c = getCasino(casino);
  if (!isLocale(lang) || !c) notFound();
  const C = tc(lang); const P = C.casinoPage;
  const games = localizedGames(lang, c.games);
  const engineName = ENGINES[c.engine].name;
  const others = CASINOS.filter((x) => x.slug !== c.slug).slice(0, 14);

  const ld = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Faircheck', item: `${SITE}${lpath(lang)}` },
    { '@type': 'ListItem', position: 2, name: P.breadcrumb, item: `${SITE}${lpath(lang, '/casinos')}` },
    { '@type': 'ListItem', position: 3, name: c.name, item: `${SITE}${lpath(lang, `/${c.slug}`)}` },
  ] };

  return (
    <main className="wrap" style={{ paddingBlock: '32px 8px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="label"><Link href={lpath(lang, '/casinos')} className="hover:underline">{P.breadcrumb}</Link> <span style={{ color: 'var(--muted)' }}>/ {c.name}</span></nav>
      <h1 className="h1 mt-2">{fmt(P.h1, { casino: c.name })}</h1>
      <p className="lead mt-3" style={{ maxWidth: 720 }}>{C.casinos[c.slug]}</p>
      <p className="mono text-[12px] mt-2" style={{ color: 'var(--muted)' }}>{fmt(P.engineLine, { engine: engineName, year: c.established, n: c.games.length })}</p>

      <div className="mt-7"><Verifier t={C.ui.verifier} games={games} initial={c.games[0]} casinoName={c.name} /></div>

      <section className="mt-12 wrap-narrow" style={{ paddingInline: 0 }}>
        <span className="label">{fmt(P.howKicker, { casino: c.name })}</span>
        <h2 className="h2 mt-1">{P.howH2}</h2>
        <div className="prose mt-4">
          <p>{fmt(P.howP1, { casino: c.name })}</p>
          <p>{fmt(P.howP2, { engine: C.engineSummary })}</p>
          <p>{P.howP3}</p>
        </div>
      </section>

      <section className="mt-10">
        <span className="label">{fmt(P.gamesKicker, { casino: c.name })}</span>
        <h2 className="h2 mt-1">{P.gamesH2}</h2>
        <div className="cardgrid mt-5">
          {games.map((g) => (
            <Link key={g.slug} href={lpath(lang, `/${c.slug}/${g.slug}`)} className="panel-flat ticked block" style={{ padding: 16 }}>
              <div className="h3">{c.name} {g.name}</div>
              <p className="mt-1 text-[13px]" style={{ color: 'var(--ink-soft)' }}>{g.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <span className="label">{P.otherCasinos}</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {others.map((x) => <Link key={x.slug} href={lpath(lang, `/${x.slug}`)} className="chip">{x.name}</Link>)}
        </div>
      </section>
    </main>
  );
}
