import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CASINOS } from '@/lib/casinos';
import { LOCALES, isLocale, lpath, fmt, hreflangMap, localeMeta, clip } from '@/lib/i18n';
import { tc } from '@/lib/content';

export function generateStaticParams() { return LOCALES.map((lang) => ({ lang })); }

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const C = tc(lang).how;
  const title = clip(C.metaTitle, 60), description = clip(C.metaDesc, 158);
  return {
    title: { absolute: title }, description,
    alternates: { canonical: lpath(lang, '/how-it-works'), languages: hreflangMap('/how-it-works') },
    openGraph: { title, description, url: lpath(lang, '/how-it-works'), type: 'article', locale: localeMeta(lang).ogLocale, images: ['/og.png'] },
  };
}

export default async function HowItWorks({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const C = tc(lang); const H = C.how;
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: lang, mainEntity: H.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };

  return (
    <main className="wrap wrap-narrow" style={{ paddingBlock: '40px 8px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <span className="label">{H.kicker}</span>
      <h1 className="h1 mt-2">{H.h1}</h1>
      <p className="lead mt-3">{H.lead}</p>

      <div className="prose mt-8">
        <h2 className="h2">{H.s1h}</h2><p>{H.s1p}</p>
        <h2 className="h2 mt-8">{H.s2h}</h2><p>{H.s2p}</p>
        <h2 className="h2 mt-8">{H.s3h}</h2><p>{H.s3p}</p>
        <div className="hexblock">bytes = HMAC-SHA256(serverSeed, `clientSeed:nonce:round`)</div>
        <p className="mt-3">{H.s3p2}</p>
        <h2 className="h2 mt-8">{H.s4h}</h2><p>{H.s4p}</p>
        <h2 className="h2 mt-8">{H.s5h}</h2><p>{fmt(H.s5p, { n: CASINOS.length })}</p>

        <h2 className="h2 mt-8">{H.faqH2}</h2>
        {H.faq.map(([q, a]) => (
          <details key={q} className="panel-soft" style={{ padding: '14px 16px', marginTop: 12 }}>
            <summary className="h3" style={{ cursor: 'pointer' }}>{q}</summary>
            <p className="mt-2 text-[14px]" style={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{a}</p>
          </details>
        ))}
      </div>

      <div className="mt-10 panel ticked" style={{ padding: 18 }}>
        <div className="h3">{H.ctaH}</div>
        <p className="mt-1 text-[14px]" style={{ color: 'var(--ink-soft)' }}>{H.ctaP}</p>
        <Link href={lpath(lang)} className="btn mt-3">{H.ctaBtn}</Link>
      </div>
    </main>
  );
}
