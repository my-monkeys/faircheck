import Link from 'next/link';
import { notFound } from 'next/navigation';
import Verifier from '@/components/Verifier';
import { CASINOS, getCasino, casinoHasGame, ENGINES, PAIRS } from '@/lib/casinos';
import { getGame } from '@/lib/games-meta';
import { LOCALES, isLocale, lpath, fmt, hreflangMap, localeMeta, clip } from '@/lib/i18n';
import { tc, localizedGames, verifierT } from '@/lib/content';
import { SITE, UPDATED } from '@/lib/site';

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => PAIRS.map(({ casino, game }) => ({ lang, casino, game })));
}

export async function generateMetadata({ params }) {
  const { lang, casino, game } = await params;
  const c = getCasino(casino), g = getGame(game);
  if (!isLocale(lang) || !c || !g || !casinoHasGame(casino, game)) return {};
  const C = tc(lang); const gc = C.games[game]; const P = C.casinoGamePage;
  const label = gc.resultLabel.toLowerCase();
  const title = clip(fmt(P.metaTitle, { casino: c.name, game: gc.name }), 60);
  const description = clip(fmt(P.metaDesc, { casino: c.name, game: gc.name, label }), 158);
  const suffix = `/${casino}/${game}`;
  return {
    title: { absolute: title }, description,
    alternates: { canonical: lpath(lang, suffix), languages: hreflangMap(suffix) },
    openGraph: { title, description, url: lpath(lang, suffix), type: 'article', locale: localeMeta(lang).ogLocale, modifiedTime: UPDATED, images: ['/og.png'] },
  };
}

export default async function CasinoGamePage({ params }) {
  const { lang, casino, game } = await params;
  const c = getCasino(casino), g = getGame(game);
  if (!isLocale(lang) || !c || !g || !casinoHasGame(casino, game)) notFound();
  const C = tc(lang); const gc = C.games[game]; const P = C.casinoGamePage;
  const label = gc.resultLabel.toLowerCase();
  const localized = localizedGames(lang, [game]);
  const otherGames = localizedGames(lang, c.games.filter((s) => s !== game));
  const otherCasinos = CASINOS.filter((x) => x.slug !== c.slug && x.games.includes(game)).slice(0, 12);
  const vars = { casino: c.name, game: gc.name, label };
  const engineName = ENGINES[c.engine].name;
  const canonical = `${SITE}${lpath(lang, `/${c.slug}/${game}`)}`;

  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebPage', '@id': canonical, url: canonical, inLanguage: lang, dateModified: UPDATED },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Faircheck', item: `${SITE}${lpath(lang)}` },
      { '@type': 'ListItem', position: 2, name: c.name, item: `${SITE}${lpath(lang, `/${c.slug}`)}` },
      { '@type': 'ListItem', position: 3, name: gc.name, item: `${SITE}${lpath(lang, `/${c.slug}/${game}`)}` },
    ] },
    { '@context': 'https://schema.org', '@type': 'HowTo', inLanguage: lang, name: fmt(P.stepH2, vars),
      step: P.steps.map(([b, t]) => ({ '@type': 'HowToStep', name: b.replace(/[.:]$/, ''), text: fmt(t, vars) })) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: lang, mainEntity: gc.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ];

  return (
    <main className="wrap" style={{ paddingBlock: '32px 8px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="label"><Link href={lpath(lang, `/${c.slug}`)} className="hover:underline">{c.name}</Link> <span style={{ color: 'var(--muted)' }}>/ {gc.name}</span></nav>
      <h1 className="h1 mt-2">{fmt(P.h1, vars)}</h1>
      <p className="lead mt-3" style={{ maxWidth: 720 }}>{fmt(P.lead, { ...vars, intro: gc.intro })}</p>
      <p className="mt-3 text-[14px]" style={{ color: 'var(--ink-soft)', maxWidth: 720, lineHeight: 1.6 }}>{C.casinos[c.slug]}</p>
      <p className="mono text-[12px] mt-2" style={{ color: 'var(--muted)' }}>
        {fmt(C.casinoPage.engineLine, { engine: engineName, year: c.established, n: c.games.length })} · ↻ {UPDATED}
      </p>

      <div className="mt-7"><Verifier t={verifierT(lang)} games={localized} initial={game} lockGame casinoName={c.name} /></div>

      <section className="mt-12 wrap-narrow" style={{ paddingInline: 0 }}>
        <span className="label">{fmt(P.stepKicker, vars)}</span>
        <h2 className="h2 mt-1">{fmt(P.stepH2, vars)}</h2>
        <ol className="prose mt-4" style={{ paddingLeft: 18 }}>
          {P.steps.map(([b, t], i) => <li key={i}><strong>{b}</strong> {fmt(t, vars)}</li>)}
        </ol>

        <h2 className="h2 mt-8">{fmt(P.formulaH2, vars)}</h2>
        <div className="hexblock mt-3">{g.formula}</div>
        <div className="prose mt-4">
          <p>{C.engineSummary}</p>
          {gc.howItWorks.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <Link href={lpath(lang, `/games/${game}`)} className="link mono text-[13px] inline-block mt-2">
          {fmt(C.gamePage.algoKicker, { game: gc.name })} →
        </Link>

        {gc.note && <div className="note mt-4">{fmt(gc.note, vars)}</div>}

        <h2 className="h2 mt-8">{fmt(P.faqH2, vars)}</h2>
        <div className="mt-4 space-y-3">
          {gc.faq.map(([q, a]) => (
            <details key={q} className="panel-soft" style={{ padding: '14px 16px' }}>
              <summary className="h3" style={{ cursor: 'pointer' }}>{q}</summary>
              <p className="mt-2 text-[14px]" style={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <span className="label">{fmt(P.moreGames, vars)}</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {otherGames.map((x) => <Link key={x.slug} href={lpath(lang, `/${c.slug}/${x.slug}`)} className="chip">{c.name} {x.name}</Link>)}
        </div>
      </section>

      <section className="mt-8">
        <span className="label">{fmt(P.gameOnOthers, vars)}</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {otherCasinos.map((x) => <Link key={x.slug} href={lpath(lang, `/${x.slug}/${game}`)} className="chip">{x.name} {gc.name}</Link>)}
        </div>
      </section>
    </main>
  );
}
