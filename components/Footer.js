import Link from 'next/link';
import { NAME } from '@/lib/site';
import { lpath, fmt } from '@/lib/i18n';

export default function Footer({ locale, t, network }) {
  const f = t.footer;
  const [netBefore, netAfter] = String(f.network).split('{link}');
  return (
    <footer className="border-t mt-16" style={{ borderColor: 'var(--rule)', background: 'var(--base-2)' }}>
      <div className="wrap" style={{ paddingBlock: '30px' }}>
        {/* Faircheck */}
        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          <div>
            <div className="flex items-center gap-2">
              <span aria-hidden style={{ width: 18, height: 18, borderRadius: 5, background: 'var(--accent)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1l4 1.6v3c0 2.6-1.7 4.3-4 5.1C3.7 9.9 2 8.2 2 5.6v-3L6 1z" fill="#10140c" /><path d="M4.4 6l1.1 1.1L8 4.7" stroke="#bff24a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span className="mono" style={{ fontWeight: 600 }}>fair<span style={{ color: 'var(--accent)' }}>check</span></span>
            </div>
            <p className="mt-2 text-[13px]" style={{ color: 'var(--txt-2)', maxWidth: 320 }}>{f.about}</p>
          </div>
          <div>
            <div className="label">{f.verify}</div>
            <ul className="mt-2 mono text-[13px] space-y-1.5">
              <li><Link href={lpath(locale)} className="hover:underline">{f.lVerifier}</Link></li>
              <li><Link href={lpath(locale, '/games')} className="hover:underline">{f.lByGame}</Link></li>
              <li><Link href={lpath(locale, '/casinos')} className="hover:underline">{f.lByCasino}</Link></li>
            </ul>
          </div>
          <div>
            <div className="label">{f.learn}</div>
            <ul className="mt-2 mono text-[13px] space-y-1.5">
              <li><Link href={lpath(locale, '/how-it-works')} className="hover:underline">{f.lHow}</Link></li>
            </ul>
          </div>
        </div>

        {/* My-Monkey network (build-time, git.my-monkey.fr/api/footer) */}
        {network && (
          <>
            <hr className="rule-soft my-6" />
            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
              <div>
                <a href={network.brand.url} className="flex items-center gap-2" style={{ fontWeight: 600 }}>
                  <span aria-hidden>🐵</span>{network.brand.name}
                </a>
                {network.more && (
                  <a href={network.more.url} className="chip mt-3" style={{ display: 'inline-flex' }}>
                    {network.more.label} →
                  </a>
                )}
              </div>
              {network.columns?.map((col) => (
                <div key={col.key}>
                  <div className="label">{col.label}</div>
                  <ul className="mt-2 text-[13px] space-y-1.5">
                    {col.links.map((l) => (
                      <li key={l.url}><a href={l.url} className="hover:underline" style={{ color: 'var(--txt-2)' }}>{l.title}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}

        <hr className="rule-soft my-5" />
        <p className="note note-legal text-[12.5px]">{fmt(f.legal, { name: NAME })}</p>
        <p className="mt-3 text-[12px]" style={{ color: 'var(--txt-3)' }}>
          {netBefore}<a href="https://my-monkey.fr" className="link">My-Monkey</a>{netAfter}
        </p>
      </div>
    </footer>
  );
}
