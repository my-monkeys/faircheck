import Link from 'next/link';
import { notFound } from 'next/navigation';
import Verifier from '@/components/Verifier';
import { GAMES } from '@/lib/games-meta';
import { CASINOS } from '@/lib/casinos';
import { LOCALES, isLocale, lpath, fmt, hreflangMap, localeMeta, clip } from '@/lib/i18n';
import { tc, localizedGames } from '@/lib/content';
import { SITE, NAME } from '@/lib/site';

export function generateStaticParams() { return LOCALES.map((lang) => ({ lang })); }

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const C = tc(lang);
  const title = clip(C.home.metaTitle, 60), description = clip(C.home.metaDesc, 158);
  return {
    title: { absolute: title }, description,
    alternates: { canonical: lpath(lang), languages: hreflangMap('') },
    openGraph: { title, description, url: lpath(lang), locale: localeMeta(lang).ogLocale, type: 'website', images: ['/og.png'] },
  };
}

export default async function Home({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const C = tc(lang);
  const H = C.home;
  const games = localizedGames(lang);
  const nC = CASINOS.length, nG = GAMES.length;

  const ld = [
    { '@context': 'https://schema.org', '@type': ['SoftwareApplication', 'WebApplication'], name: NAME, url: `${SITE}${lpath(lang)}`, applicationCategory: 'UtilityApplication', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript', inLanguage: lang, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: H.metaDesc },
    { '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: lang, mainEntity: H.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: fmt(a, { n: nC }) } })) },
  ];

  return (
    <main className="wrap" style={{ paddingBlock: '40px 8px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <section className="rise" style={{ maxWidth: 720 }}>
        <span className="label">{H.kicker}</span>
        <h1 className="h1 mt-2">{H.h1a}<br /><span style={{ color: 'var(--pass-2)' }}>{H.h1b}</span></h1>
        <p className="lead mt-4">{H.lead}</p>
        <div className="mt-4 flex flex-wrap gap-2 mono text-[12px]" style={{ color: 'var(--muted)' }}>
          {H.chips.map((c, i) => <span key={i} className="chip">{fmt(c, { n: nC, m: nG })}</span>)}
        </div>
      </section>

      <section className="mt-8"><Verifier t={C.ui.verifier} games={games} initial="dice" /></section>

      <section className="mt-14">
        <span className="label">{H.howKicker}</span>
        <h2 className="h2 mt-1">{H.howH2}</h2>
        <div className="cardgrid mt-5">
          {H.steps.map(([t, d], i) => (
            <div key={i} className="panel-flat ticked" style={{ padding: 16 }}>
              <div className="mono" style={{ color: 'var(--pass-2)', fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</div>
              <div className="h3 mt-1">{t}</div>
              <p className="mt-1 text-[14px]" style={{ color: 'var(--ink-soft)' }}>{d}</p>
            </div>
          ))}
        </div>
        <Link href={lpath(lang, '/how-it-works')} className="link mono text-[13px] inline-block mt-4">{H.fullExplainer}</Link>
      </section>

      <section className="mt-14">
        <div className="flex items-end justify-between">
          <div><span className="label">{H.gamesKicker}</span><h2 className="h2 mt-1">{H.gamesH2}</h2></div>
          <Link href={lpath(lang, '/games')} className="link mono text-[13px]">{H.allGames}</Link>
        </div>
        <div className="cardgrid mt-5">
          {games.map((g) => (
            <Link key={g.slug} href={lpath(lang, `/games/${g.slug}`)} className="panel-flat ticked block" style={{ padding: 16 }}>
              <div className="flex items-baseline justify-between"><div className="h3">{g.name}</div><span className="label">{g.category}</span></div>
              <p className="mt-1 text-[13px]" style={{ color: 'var(--ink-soft)' }}>{g.tagline}</p>
              <div className="mono mt-2 text-[11px]" style={{ color: 'var(--muted)' }}>{g.formula}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="flex items-end justify-between">
          <div><span className="label">{H.casinosKicker}</span><h2 className="h2 mt-1">{fmt(H.casinosH2, { n: nC })}</h2></div>
          <Link href={lpath(lang, '/casinos')} className="link mono text-[13px]">{H.allCasinos}</Link>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {CASINOS.map((c) => <Link key={c.slug} href={lpath(lang, `/${c.slug}`)} className="chip">{c.name}</Link>)}
        </div>
      </section>

      <section className="mt-14 wrap-narrow" style={{ paddingInline: 0 }}>
        <span className="label">{H.faqKicker}</span>
        <h2 className="h2 mt-1">{H.faqH2}</h2>
        <div className="mt-5 space-y-3">
          {H.faq.map(([q, a]) => (
            <details key={q} className="panel-soft" style={{ padding: '14px 16px' }}>
              <summary className="h3" style={{ cursor: 'pointer' }}>{q}</summary>
              <p className="mt-2 text-[14px]" style={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{fmt(a, { n: nC })}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
