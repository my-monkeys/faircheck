'use client';

import { useState, useEffect, useRef } from 'react';
import { compute } from '@/lib/pf/games';
import { sha256Hex } from '@/lib/pf/hmac';
import { fmt } from '@/lib/i18n';
import { downloadProof, copyProof } from '@/lib/proofcard';

const DEMO = { serverSeed: 'serverseedfaircheckdemo', clientSeed: 'clientseed', nonce: '1' };
const DEMO_HASH = '8d1bc1b5b1c1e1f1a1b1c1d1e1f1a1b1c1d1e1f1a1b1c1d1e1f1a1b1c1d1e1f1a';
const trunc = (s) => { s = String(s || ''); return s.length > 22 ? `${s.slice(0, 10)}…${s.slice(-8)}` : s; };

function defaultOpts(game) {
  const o = {};
  for (const opt of game.options) o[opt.key] = opt.default;
  return o;
}

// `t` = localized ui.verifier dict. `games` = localized game list (each carries `inputs`:
// 'seed' (serverSeed/clientSeed/nonce) or 'hash' (gameHash + optional salt), e.g. Crash).
export default function Verifier({ t, games, initial = 'dice', lockGame = false, casinoName }) {
  const find = (s) => games.find((g) => g.slug === s) || games[0];
  const [slug, setSlug] = useState(initial);
  const game = find(slug);
  const model = game.inputs || 'seed';
  const choices = games;

  const [serverSeed, setServerSeed] = useState('');
  const [clientSeed, setClientSeed] = useState('');
  const [nonce, setNonce] = useState('');
  const [hashedSeed, setHashedSeed] = useState('');
  const [gameHash, setGameHash] = useState('');
  const [salt, setSalt] = useState('');
  const [opts, setOpts] = useState(defaultOpts(game));
  const [out, setOut] = useState(null);
  const [hashCheck, setHashCheck] = useState(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cardMsg, setCardMsg] = useState('');
  const didAuto = useRef(false);

  function switchGame(next) {
    setSlug(next);
    setOpts(defaultOpts(find(next)));
    setOut(null); setErr('');
  }

  async function execute(v) {
    setErr(''); setOut(null); setHashCheck(null); setCopied(false); setCardMsg('');
    let input;
    if (v.model === 'hash') {
      if (!v.gameHash?.trim()) return setErr('Paste the round game hash (hex).');
      input = { gameHash: v.gameHash.trim(), salt: v.salt?.trim() || '' };
    } else {
      if (!v.serverSeed?.trim()) return setErr(t.errServer);
      if (!v.clientSeed?.trim()) return setErr(t.errClient);
      const n = Number(v.nonce);
      if (!Number.isInteger(n) || n < 0) return setErr(t.errNonce);
      input = { serverSeed: v.serverSeed.trim(), clientSeed: v.clientSeed.trim(), nonce: n };
    }
    setBusy(true);
    try {
      const res = await compute(v.slug, input, v.opts);
      setOut(res);
      if (v.model !== 'hash' && v.hashedSeed?.trim()) {
        const actual = await sha256Hex(input.serverSeed);
        const expected = v.hashedSeed.trim().toLowerCase();
        setHashCheck({ expected, actual, match: actual === expected });
      }
    } catch (e2) {
      setErr(e2.message || t.errFail);
    } finally {
      setBusy(false);
    }
  }

  const run = (e) => { e?.preventDefault(); execute({ slug, model, serverSeed, clientSeed, nonce, gameHash, salt, opts, hashedSeed }); };

  function buildLink() {
    if (typeof window === 'undefined') return '';
    const p = new URLSearchParams({ game: slug, run: '1' });
    if (model === 'hash') { p.set('hash', gameHash.trim()); if (salt.trim()) p.set('salt', salt.trim()); }
    else {
      p.set('server', serverSeed.trim()); p.set('client', clientSeed.trim()); p.set('nonce', String(nonce));
      if (hashedSeed.trim()) p.set('seedhash', hashedSeed.trim());
    }
    for (const opt of game.options) p.set(opt.key, String(opts[opt.key]));
    return `${window.location.origin}${window.location.pathname}?${p.toString()}`;
  }
  async function copyLink() {
    try { await navigator.clipboard.writeText(buildLink()); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* noop */ }
  }

  function cardData() {
    const rows = model === 'hash'
      ? [[t.gameHash.split('—')[0].trim(), trunc(gameHash)], ...(salt.trim() ? [['Salt', trunc(salt)]] : [])]
      : [['Server seed', trunc(serverSeed)], ['Client seed', trunc(clientSeed)], ['Nonce', String(nonce)]];
    return {
      casino: casinoName || 'Stake-method', game: game.name, resultLabel: game.resultLabel,
      result: out.display, verified: hashCheck ? hashCheck.match : null,
      rows, seed: model === 'hash' ? gameHash : serverSeed, permalink: buildLink(),
    };
  }
  async function onDownload() { try { await downloadProof(cardData()); setCardMsg('saved'); setTimeout(() => setCardMsg(''), 1800); } catch { /* noop */ } }
  async function onCopyImg() { try { const ok = await copyProof(cardData()); setCardMsg(ok ? 'copied' : 'unsupported'); setTimeout(() => setCardMsg(''), 1800); } catch { setCardMsg('unsupported'); setTimeout(() => setCardMsg(''), 1800); } }

  function loadExample() {
    if (model === 'hash') { setGameHash(DEMO_HASH); setSalt(''); }
    else { setServerSeed(DEMO.serverSeed); setClientSeed(DEMO.clientSeed); setNonce(DEMO.nonce); setHashedSeed(''); }
    setOut(null); setErr('');
  }

  useEffect(() => {
    if (didAuto.current || typeof window === 'undefined') return;
    didAuto.current = true;
    const q = new URLSearchParams(window.location.search);
    if (!q.has('server') && !q.has('hash') && !q.has('run')) return;
    const g = q.get('game') && games.some((x) => x.slug === q.get('game')) ? q.get('game') : slug;
    const gObj = find(g); const gModel = gObj.inputs || 'seed';
    const o = defaultOpts(gObj);
    for (const opt of gObj.options) if (q.has(opt.key)) o[opt.key] = Number(q.get(opt.key));
    setSlug(g); setOpts(o);
    let sv = '', cl = '', nc = '', hs = '', gh = '', sl = '';
    if (gModel === 'hash') { gh = q.get('hash') || ''; sl = q.get('salt') || ''; setGameHash(gh); setSalt(sl); }
    else {
      sv = q.get('server') || ''; cl = q.get('client') || ''; nc = q.get('nonce') || ''; hs = q.get('seedhash') || '';
      setServerSeed(sv); setClientSeed(cl); setNonce(nc); setHashedSeed(hs);
    }
    if (q.get('run') === '1') execute({ slug: g, model: gModel, serverSeed: sv, clientSeed: cl, nonce: nc, gameHash: gh, salt: sl, opts: o, hashedSeed: hs });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={run} className="panel ticked rise" style={{ padding: '18px' }}>
      <div className="flex items-center justify-between gap-3">
        <span className="label">{t.form}{casinoName ? ` · ${casinoName}` : ''}</span>
        <button type="button" className="label" style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={loadExample}>{t.loadExample}</button>
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
        {model === 'hash' ? (
          <>
            <label className="block">
              <span className="label">{t.gameHash}</span>
              <textarea className="field mt-1" rows={2} value={gameHash} onChange={(e) => setGameHash(e.target.value)} placeholder={t.gameHashPh} spellCheck={false} />
            </label>
            <label className="block">
              <span className="label">{t.salt}</span>
              <input className="field mt-1" value={salt} onChange={(e) => setSalt(e.target.value)} placeholder={t.saltPh} spellCheck={false} />
            </label>
          </>
        ) : (
          <>
            <label className="block">
              <span className="label">{t.serverSeed}</span>
              <textarea className="field mt-1" rows={2} value={serverSeed} onChange={(e) => setServerSeed(e.target.value)} placeholder={t.serverSeedPh} spellCheck={false} />
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
          </>
        )}

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

        {model !== 'hash' && (
          <details className="panel-soft" style={{ padding: '10px 12px' }}>
            <summary className="label" style={{ cursor: 'pointer' }}>{t.optional}</summary>
            <p className="mt-2 text-[13px]" style={{ color: 'var(--ink-soft)' }}>{t.hashDesc}</p>
            <input className="field mt-2" value={hashedSeed} onChange={(e) => setHashedSeed(e.target.value)} placeholder={t.hashPh} spellCheck={false} />
          </details>
        )}
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
            <button type="button" className="chip" style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={copyLink}>{copied ? t.copied : t.copyLink}</button>
          </div>

          <ol className="readout mt-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {out.steps.map((s, i) => (
              <li key={i}><span className="k">{String(i + 1).padStart(2, '0')} </span><span className="v">{s}</span></li>
            ))}
          </ol>

          {/* shareable proof card */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <button type="button" className="btn-ghost" style={{ padding: '8px 14px', fontSize: 13, borderRadius: 'var(--radius-sm)', cursor: 'pointer' }} onClick={onDownload}>⬇ {t.proofDownload}</button>
            <button type="button" className="btn-ghost" style={{ padding: '8px 14px', fontSize: 13, borderRadius: 'var(--radius-sm)', cursor: 'pointer' }} onClick={onCopyImg}>⧉ {t.proofCopy}</button>
            {cardMsg && <span className="label" style={{ color: 'var(--pass-2)' }}>{cardMsg === 'saved' ? t.proofSaved : cardMsg === 'copied' ? t.proofCopied : t.proofUnsupported}</span>}
          </div>

          {out.rounds?.length > 0 && (
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
          )}
        </div>
      )}
    </form>
  );
}
