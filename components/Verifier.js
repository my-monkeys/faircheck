'use client';

import { useState, useEffect, useRef } from 'react';
import { compute } from '@/lib/pf/games';
import { sha256Hex } from '@/lib/pf/hmac';
import { fmt } from '@/lib/i18n';

const DEMO = { serverSeed: 'serverseedfaircheckdemo', clientSeed: 'clientseed', nonce: '1' };

function defaultOpts(game) {
  const o = {};
  for (const opt of game.options) o[opt.key] = opt.default;
  return o;
}

// `t` = localized ui.verifier dict. `games` = localized game list
// [{ slug, name, resultLabel, options:[{ key, label, help, type, default, min, max, step }] }].
export default function Verifier({ t, games, initial = 'dice', lockGame = false, casinoName }) {
  const find = (s) => games.find((g) => g.slug === s) || games[0];
  const [slug, setSlug] = useState(initial);
  const game = find(slug);
  const choices = games;

  const [serverSeed, setServerSeed] = useState('');
  const [clientSeed, setClientSeed] = useState('');
  const [nonce, setNonce] = useState('');
  const [hashedSeed, setHashedSeed] = useState('');
  const [opts, setOpts] = useState(defaultOpts(game));
  const [out, setOut] = useState(null);
  const [hashCheck, setHashCheck] = useState(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const didAuto = useRef(false);

  function switchGame(next) {
    setSlug(next);
    setOpts(defaultOpts(find(next)));
    setOut(null); setErr('');
  }

  async function execute(v) {
    setErr(''); setOut(null); setHashCheck(null); setCopied(false);
    if (!v.serverSeed?.trim()) return setErr(t.errServer);
    if (!v.clientSeed?.trim()) return setErr(t.errClient);
    const n = Number(v.nonce);
    if (!Number.isInteger(n) || n < 0) return setErr(t.errNonce);

    setBusy(true);
    try {
      const seeds = { serverSeed: v.serverSeed.trim(), clientSeed: v.clientSeed.trim(), nonce: n };
      const res = await compute(v.slug, seeds, v.opts);
      setOut(res);
      if (v.hashedSeed?.trim()) {
        const actual = await sha256Hex(v.serverSeed.trim());
        const expected = v.hashedSeed.trim().toLowerCase();
        setHashCheck({ expected, actual, match: actual === expected });
      }
    } catch (e2) {
      setErr(e2.message || t.errFail);
    } finally {
      setBusy(false);
    }
  }

  const run = (e) => { e?.preventDefault(); execute({ slug, serverSeed, clientSeed, nonce, opts, hashedSeed }); };

  function buildLink() {
    if (typeof window === 'undefined') return '';
    const p = new URLSearchParams({ game: slug, server: serverSeed.trim(), client: clientSeed.trim(), nonce: String(nonce), run: '1' });
    for (const opt of game.options) p.set(opt.key, String(opts[opt.key]));
    if (hashedSeed.trim()) p.set('hash', hashedSeed.trim());
    return `${window.location.origin}${window.location.pathname}?${p.toString()}`;
  }
  async function copyLink() {
    try { await navigator.clipboard.writeText(buildLink()); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* noop */ }
  }

  useEffect(() => {
    if (didAuto.current || typeof window === 'undefined') return;
    didAuto.current = true;
    const q = new URLSearchParams(window.location.search);
    if (!q.has('server') && !q.has('run')) return;
    const g = q.get('game') && games.some((x) => x.slug === q.get('game')) ? q.get('game') : slug;
    const o = defaultOpts(find(g));
    for (const opt of find(g).options) if (q.has(opt.key)) o[opt.key] = Number(q.get(opt.key));
    const sv = q.get('server') || '', cl = q.get('client') || '', nc = q.get('nonce') || '', hs = q.get('hash') || '';
    setSlug(g); setOpts(o); setServerSeed(sv); setClientSeed(cl); setNonce(nc); setHashedSeed(hs);
    if (q.get('run') === '1') execute({ slug: g, serverSeed: sv, clientSeed: cl, nonce: nc, opts: o, hashedSeed: hs });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={run} className="panel ticked rise" style={{ padding: '18px' }}>
      <div className="flex items-center justify-between gap-3">
        <span className="label">{t.form}{casinoName ? ` · ${casinoName}` : ''}</span>
        <button type="button" className="label" style={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => { setServerSeed(DEMO.serverSeed); setClientSeed(DEMO.clientSeed); setNonce(DEMO.nonce); setHashedSeed(''); setOut(null); setErr(''); }}>
          {t.loadExample}
        </button>
      </div>

      {!lockGame && (
        <div className="mt-3 flex flex-wrap gap-2">
          {choices.map((g) => (
            <button key={g.slug} type="button" onClick={() => switchGame(g.slug)}
              className={`chip ${slug === g.slug ? 'chip-on' : ''}`}>{g.name}</button>
          ))}
        </div>
      )}

      <hr className="rule-soft my-4" />

      <div className="grid gap-3" style={{ gridTemplateColumns: '1fr' }}>
        <label className="block">
          <span className="label">{t.serverSeed}</span>
          <textarea className="field mt-1" rows={2} value={serverSeed} onChange={(e) => setServerSeed(e.target.value)}
            placeholder={t.serverSeedPh} spellCheck={false} />
        </label>

        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          <label className="block">
            <span className="label">{t.clientSeed}</span>
            <input className="field mt-1" value={clientSeed} onChange={(e) => setClientSeed(e.target.value)} placeholder={t.clientSeedPh} spellCheck={false} />
          </label>
          <label className="block">
            <span className="label">{t.nonce}</span>
            <input className="field mt-1" inputMode="numeric" value={nonce} onChange={(e) => setNonce(e.target.value)} placeholder={t.noncePh} spellCheck={false} />
          </label>
        </div>

        {game.options.length > 0 && (
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            {game.options.map((opt) => (
              <label key={opt.key} className="block">
                <span className="label">{opt.label}</span>
                <input className="field field-num mt-1" type="number" step={opt.step} min={opt.min} max={opt.max}
                  value={opts[opt.key]} onChange={(e) => setOpts({ ...opts, [opt.key]: Number(e.target.value) })} />
                {opt.help && <span className="block mt-1 text-[12px]" style={{ color: 'var(--muted)' }}>{opt.help}</span>}
              </label>
            ))}
          </div>
        )}

        <details className="panel-soft" style={{ padding: '10px 12px' }}>
          <summary className="label" style={{ cursor: 'pointer' }}>{t.optional}</summary>
          <p className="mt-2 text-[13px]" style={{ color: 'var(--ink-soft)' }}>{t.hashDesc}</p>
          <input className="field mt-2" value={hashedSeed} onChange={(e) => setHashedSeed(e.target.value)} placeholder={t.hashPh} spellCheck={false} />
        </details>
      </div>

      {err && <div className="note mt-4" style={{ borderLeftColor: 'var(--fail)' }}>{err}</div>}

      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <button type="submit" className="btn" disabled={busy}>{busy ? t.computing : fmt(t.verify, { game: game.name })}</button>
        <span className="label">{t.privacy}</span>
      </div>

      {out && (
        <div className="mt-5 rise">
          <hr className="rule my-4" />

          {hashCheck && (
            <div className="mb-4">
              <span className={`stamp ${hashCheck.match ? 'stamp-pass' : 'stamp-fail'}`}>{hashCheck.match ? t.hashOk : t.hashBad}</span>
              <div className="readout mt-2">
                <div><span className="k">{t.expected} </span><span className="v">{hashCheck.expected}</span></div>
                <div><span className="k">{t.got} </span><span className="v">{hashCheck.actual}</span></div>
              </div>
            </div>
          )}

          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="label">{game.resultLabel}</span>
            <span className="mono" style={{ fontSize: 'clamp(28px, 6vw, 44px)', fontWeight: 600, color: 'var(--pass-2)' }}>{out.display}</span>
            <button type="button" className="chip" style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={copyLink}>
              {copied ? t.copied : t.copyLink}
            </button>
          </div>

          <ol className="readout mt-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {out.steps.map((s, i) => (
              <li key={i}><span className="k">{String(i + 1).padStart(2, '0')} </span><span className="v">{s}</span></li>
            ))}
          </ol>

          <details className="mt-3">
            <summary className="label" style={{ cursor: 'pointer' }}>{t.showRaw}</summary>
            <div className="mt-2">
              {out.rounds.map((r) => (
                <div key={r.round} className="mb-2">
                  <div className="readout"><span className="k">{fmt(t.hmacMsg, { n: r.round })} </span><span className="v">{r.message}</span></div>
                  <div className="hexblock mt-1">{r.hex}</div>
                </div>
              ))}
              <div className="readout">
                <div><span className="k">{t.bytesUsed} </span><span className="v">[{out.bytes.join(', ')}]</span></div>
                <div><span className="k">{t.floats} </span><span className="v">[{out.floats.map((f) => f.toFixed(8)).join(', ')}]</span></div>
              </div>
            </div>
          </details>
        </div>
      )}
    </form>
  );
}
