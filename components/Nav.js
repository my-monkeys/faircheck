import Link from 'next/link';
import { lpath } from '@/lib/i18n';
import LangSwitch from './LangSwitch';

export default function Nav({ locale, t, suffix = '' }) {
  return (
    <header className="border-b" style={{ borderColor: 'var(--rule)', background: 'var(--paper)' }}>
      <div className="wrap flex items-center justify-between" style={{ height: 58 }}>
        <Link href={lpath(locale)} className="flex items-center gap-2">
          <span aria-hidden style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--accent)', display: 'grid', placeItems: 'center', flex: 'none' }}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
              <path d="M6 1l4 1.6v3c0 2.6-1.7 4.3-4 5.1C3.7 9.9 2 8.2 2 5.6v-3L6 1z" fill="#10140c" />
              <path d="M4.4 6l1.1 1.1L8 4.7" stroke="#bff24a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: '-0.02em' }}>
            fair<span style={{ color: 'var(--accent)' }}>check</span>
          </span>
          <span className="label" style={{ fontSize: 10, marginLeft: 2 }}>{t.tagline}</span>
        </Link>
        <nav className="flex items-center gap-4 mono" style={{ fontSize: 13 }}>
          <Link href={lpath(locale, '/casinos')} className="hover:underline">{t.nav.casinos}</Link>
          <Link href={lpath(locale, '/games')} className="hover:underline">{t.nav.games}</Link>
          <Link href={lpath(locale, '/how-it-works')} className="hover:underline">{t.nav.how}</Link>
          <LangSwitch locale={locale} suffix={suffix} />
        </nav>
      </div>
    </header>
  );
}
