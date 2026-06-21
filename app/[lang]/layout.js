import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { LOCALES, DEFAULT_LOCALE, isLocale, localeMeta, lpath, hreflangMap, clip } from '@/lib/i18n';
import { tc } from '@/lib/content';
import { SITE, NAME, DESCRIPTION } from '@/lib/site';
import { getNetworkFooter } from '@/lib/network-footer';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const sans = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono', display: 'swap' });

const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_ID || '';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const C = tc(lang);
  const m = localeMeta(lang);
  return {
    metadataBase: new URL(SITE),
    title: { default: clip(C.home.metaTitle, 60), template: `%s — ${NAME}` },
    description: clip(C.home.metaDesc, 158),
    applicationName: NAME,
    alternates: { canonical: lpath(lang), languages: hreflangMap('') },
    openGraph: { title: C.home.metaTitle, description: C.home.metaDesc, url: lpath(lang), siteName: NAME, locale: m.ogLocale, type: 'website', images: ['/og.png'] },
    twitter: { card: 'summary_large_image', title: C.home.metaTitle, description: C.home.metaDesc, images: ['/og.png'] },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const m = localeMeta(lang);
  const C = tc(lang);
  const network = await getNetworkFooter();
  const orgLd = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: NAME, url: `${SITE}${lpath(lang)}`, logo: `${SITE}/icon.png`, description: DESCRIPTION },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: NAME, url: `${SITE}${lpath(lang)}`, inLanguage: lang },
  ];
  return (
    <html lang={m.htmlLang} className={`${sans.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <Nav locale={lang} t={C.ui} />
        {children}
        <Footer locale={lang} t={C.ui} network={network} />
        {UMAMI_ID ? <Script src="https://uuu.my-monkey.fr/u.js" data-website-id={UMAMI_ID} strategy="afterInteractive" defer /> : null}
      </body>
    </html>
  );
}
