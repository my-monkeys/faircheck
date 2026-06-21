import Link from 'next/link';
import { notFound } from 'next/navigation';
import Verifier from '@/components/Verifier';
import { GAME_SLUGS, getGame } from '@/lib/games-meta';
import { CASINOS } from '@/lib/casinos';
import { LOCALES, isLocale, lpath, fmt, hreflangMap, localeMeta, clip } from '@/lib/i18n';
import { tc, localizedGames } from '@/lib/content';
import { SITE } from '@/lib/site';

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => GAME_SLUGS.map((game) => ({ lang, game })));
}

export async function generateMetadata({ params }) {
  const { lang, game } = await params;
  if (!isLocale(lang) || !getGame(game)) return {};
  const C = tc(lang); const gc = C.games[game]; const P = C.gamePage;
  const title = clip(fmt(P.metaTitle, { game: gc.name }), 60);
  const description = clip(fmt(P.metaDesc, { game: gc.name, intro: gc.intro }), 158);
  const suffix = `/games/${game}`;
  return {
    title: { absolute: title }, description,
    alternates: { canonical: lpath(lang, suffix), languages: hreflangMap(suffix) },
    openGraph: { title, description, url: lpath(lang, suffix), type: 'article', locale: localeMeta(lang).ogLocale, images: ['/og.png'] },
  };
}

export default async function GamePage({ params }) {
  const { lang, game } = await params;
  const g = getGame(game);
  if (!isLocale(lang) || !g) notFound();
  const C = tc(lang); const gc = C.games[game]; const P = C.gamePage;
  const localized = localizedGames(lang, [game]);
  const casinos = CASINOS.filter((c) => c.games.includes(game));
  const others = localizedGames(lang).filter((x) => x.slug !== game);

  const ld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Faircheck', item: `${SITE}${lpath(lang)}` },
      { '@type': 'ListItem', position: 2, name: P.breadcrumb, item: `${SITE}${lpath(lang, '/games')}` },
      { '@type': 'ListItem', position: 3, name: gc.name, item: `${SITE}${lpath(lang, `/games/${game}`)}` },
    ] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: lang, mainEntity: gc.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ];

  return (
    <main className="wrap" style={{ paddingBlock: '32px 8px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="label"><Link href={lpath(lang, '/games')} className="hover:underline">{P.breadcrumb}</Link> <span style={{ color: 'var(--muted)' }}>/ {gc.name}</span></nav>
      <h1 className="h1 mt-2">{fmt(P.h1, { game: gc.name })}</h1>
      <p className="lead mt-3" style={{ maxWidth: 700 }}>{gc.intro}</p>

      <div className="mt-7"><Verifier t={C.ui.verifier} games={localized} initial={game} lockGame /></div>

      <section className="mt-12 wrap-narrow" style={{ paddingInline: 0 }}>
        <span className="label">{fmt(P.algoKicker, { game: gc.name })}</span>
        <h2 className="h2 mt-1">{P.algoH2}</h2>
        <div className="hexblock mt-3">{g.formula}</div>
        <div className="prose mt-4">{gc.howItWorks.map((p, i) => <p key={i}>{p}</p>)}</div>

        <h2 className="h2 mt-8">{P.faqH2}</h2>
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
        <span className="label">{P.perCasinoKicker}</span>
        <h2 className="h2 mt-1">{fmt(P.perCasinoH2, { game: gc.name })}</h2>
        <p className="text-[14px] mt-2" style={{ color: 'var(--ink-soft)', maxWidth: 640 }}>{P.perCasinoDesc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {casinos.map((c) => <Link key={c.slug} href={lpath(lang, `/${c.slug}/${game}`)} className="chip">{c.name} {gc.name}</Link>)}
        </div>
      </section>

      <section className="mt-12">
        <span className="label">{P.otherGames}</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {others.map((x) => <Link key={x.slug} href={lpath(lang, `/games/${x.slug}`)} className="chip">{x.name}</Link>)}
        </div>
      </section>
    </main>
  );
}
