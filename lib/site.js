export const SITE = 'https://faircheck.my-monkey.fr';
export const NAME = 'Faircheck';
export const TAGLINE = 'Independent provably-fair verifier';
export const DESCRIPTION =
  'Paste your server seed, client seed and nonce to recompute any crypto-casino result yourself — Dice, Limbo, Mines, Plinko, Roulette, Keno, Wheel and Hi-Lo. 100% in your browser. No login, no tracking of your seeds.';

// Count helpers for copy ("verify N casinos × M games").
export const url = (p = '') => `${SITE}${p}`;

// Build timestamp — refreshed on every deploy. Used as a freshness signal
// (visible "updated" line + schema dateModified / og modifiedTime).
export const UPDATED = new Date().toISOString().slice(0, 10);
