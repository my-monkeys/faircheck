# Faircheck

**Independent provably-fair verifier for crypto casinos.** Paste your server seed, client
seed and nonce; Faircheck recomputes the exact outcome — Dice, Limbo, Roulette, Plinko,
Mines, Keno, Wheel, Hi-Lo — with the same HMAC-SHA256 "Stake method" the casino used.
100% client-side: seeds never leave the browser.

- Live: https://faircheck.my-monkey.fr
- Audience: **EN / global only.** No French-targeted operator promotion (ANJ legal risk).
- Monetisation: AdSense-safe (tool-only, no operator links shipped). Affiliate hooks left
  for later, fenced to non-FR traffic.

## How it works

```
bytes  = HMAC-SHA256(serverSeed, `${clientSeed}:${nonce}:${round}`)   // 32 bytes/round
float  = b0/256 + b1/256² + b2/256³ + b3/256⁴                         // per 4 bytes, in [0,1)
result = <per-game mapping of the floats>                             // see lib/pf/games.js
```

The revealed server seed is also SHA-256'd and matched against the casino's pre-bet
commitment (the "hash check" PASS/FAIL stamp).

## Stack

Next 16 (App Router, no `src/`) · React 19 · Tailwind 4 · Turbopack. Shared parent
`node_modules` (CloudLinux), custom `server.js` for Passenger, deploy via `monkey`.

## Layout

```
lib/pf/        hmac.js · rng.js · games.js   — the engine (Web Crypto, runs in browser + Node)
lib/casinos.js · lib/games-meta.js           — SEO registries (32 casinos × 8 games)
components/Verifier.js                        — client verifier widget + shareable permalinks
app/[casino]/[game]/                          — the money pages (241 casino×game pages)
app/games/[game]/ · app/[casino]/             — game + casino hubs
scripts/test-engine.mjs                       — correctness tests (RFC 4231 HMAC vector, ranges)
scripts/assets.mjs                            — favicon + OG generation (sharp)
```

## Dev

```bash
npm run dev      # http://localhost:3000
npm test         # engine correctness (HMAC vector, SHA-256 vectors, ranges, determinism)
npm run build
node scripts/assets.mjs   # regenerate icons + og.png
```

## Verification permalinks

Every result can be shared: `/<casino>/<game>?server=…&client=…&nonce=…&run=1` (plus
`hash=` for the commitment check and game options like `houseEdge`/`rows`/`count`). Opening
the link auto-fills and re-runs the verification.

## Disclaimer

Faircheck is an informational tool, not a gambling operator. It is not affiliated with any
casino named in the data and does not link to or promote operators. Gambling is
age-restricted and illegal in some jurisdictions.
