import Link from 'next/link';
import { lpath } from '@/lib/i18n';
import { netLabel, netMore, legalShort } from '@/lib/content/network-labels';

export default function Footer({ locale, t, network }) {
  const f = t.footer;
  return (
    <footer className="border-t mt-16" style={{ borderColor: 'var(--rule)', background: 'var(--base-2)' }}>
      <div className="wrap" style={{ paddingBlock: '20px' }}>
        {/* brand + primary links */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span aria-hidden style={{ width: 18, height: 18, borderRadius: 5, background: 'var(--accent)', display: 'grid', placeItems: 'center', flex: 'none' }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1l4 1.6v3c0 2.6-1.7 4.3-4 5.1C3.7 9.9 2 8.2 2 5.6v-3L6 1z" fill="#10140c" /><path d="M4.4 6l1.1 1.1L8 4.7" stroke="#bff24a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span className="mono" style={{ fontWeight: 600, fontSize: 15 }}>fair<span style={{ color: 'var(--accent)' }}>check</span></span>
            <span className="label" style={{ fontSize: 10 }}>{t.tagline}</span>
          </div>
          <nav className="flex items-center gap-4 mono text-[13px]" style={{ color: 'var(--txt-2)' }}>
            <Link href={lpath(locale)} className="hover:underline">{f.lVerifier}</Link>
            <Link href={lpath(locale, '/games')} className="hover:underline">{t.nav.games}</Link>
            <Link href={lpath(locale, '/casinos')} className="hover:underline">{t.nav.casinos}</Link>
            <Link href={lpath(locale, '/how-it-works')} className="hover:underline">{t.nav.how}</Link>
          </nav>
        </div>

        {/* My-Monkey network — one compact inline band (labels localized; titles/URLs untouched) */}
        {network && (
          <div className="mt-4 pt-4 flex items-baseline gap-x-5 gap-y-2 flex-wrap text-[12.5px]" style={{ borderTop: '1px solid var(--rule-soft)' }}>
            <a href={network.brand.url} className="mono" style={{ color: 'var(--txt-2)', fontWeight: 600, flex: 'none' }}>🐵 {network.brand.name}</a>
            {network.columns?.map((col) => (
              <span key={col.key} className="inline-flex items-baseline gap-2 flex-wrap">
                <span className="label">{netLabel(locale, col.key, col.label)}</span>
                {col.links.slice(0, 3).map((l, i, arr) => (
                  <span key={l.url} style={{ color: 'var(--txt-3)' }}>
                    <a href={l.url} className="hover:underline" style={{ color: 'var(--txt-2)' }}>{l.title}</a>{i < arr.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </span>
            ))}
            {network.more && (
              <a href={network.more.url} className="link mono" style={{ marginLeft: 'auto', flex: 'none' }}>{netMore(locale, network.more.label)} →</a>
            )}
          </div>
        )}

        {/* compact legal */}
        <div className="mt-4 pt-3 flex items-baseline justify-between gap-3 flex-wrap" style={{ borderTop: '1px solid var(--rule-soft)' }}>
          <p style={{ color: 'var(--txt-3)', fontSize: 11.5, maxWidth: 680, lineHeight: 1.5 }}>{legalShort(locale)}</p>
          <p className="mono" style={{ color: 'var(--txt-3)', fontSize: 11.5, flex: 'none' }}>
            <a href="https://my-monkey.fr" className="link">My-Monkey</a> · in your browser
          </p>
        </div>
      </div>
    </footer>
  );
}
