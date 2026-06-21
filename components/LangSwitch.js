'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_META, isLocale } from '@/lib/i18n';

// Same-page locale switch: keeps the current path, swaps only the locale prefix.
export default function LangSwitch({ locale }) {
  const pathname = usePathname() || `/${locale}`;
  const parts = pathname.split('/').filter(Boolean);
  const suffix = isLocale(parts[0]) ? '/' + parts.slice(1).join('/') : pathname;
  const tail = suffix === '/' ? '' : suffix;

  return (
    <span className="mono flex items-center" style={{ fontSize: 12 }}>
      {LOCALES.map((l) => (
        l === locale ? (
          <span key={l} aria-current="true"
            style={{ color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', padding: '6px 6px', lineHeight: 1 }}>{l}</span>
        ) : (
          <Link key={l} href={`/${l}${tail}`} hrefLang={LOCALE_META[l].hreflang} className="hover:underline"
            aria-label={LOCALE_META[l].label}
            style={{ color: 'var(--txt-2)', textTransform: 'uppercase', padding: '6px 6px', lineHeight: 1 }}>{l}</Link>
        )
      ))}
    </span>
  );
}
