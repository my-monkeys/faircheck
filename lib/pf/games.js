import { generateFloats } from './rng.js';

// ============================================================================
//  Per-game result derivation on top of the Stake-method float stream.
//  Each function returns { result, display, floats, bytes, rounds, steps }
//  where `steps` is a human-readable breakdown shown in the verifier UI.
//
//  Multiplier games (limbo, crash) depend on the operator's house edge, so it is
//  exposed as a parameter and surfaced in the UI rather than hard-coded silently.
// ============================================================================

const CARDS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS = ['♦', '♣', '♥', '♠']; // diamonds, clubs, hearts, spades (Stake order)

/** DICE — roll in [0.00, 100.00]. result = floor(float * 10001) / 100. */
export async function dice(seeds) {
  const { floats, bytes, rounds } = await generateFloats({ ...seeds, count: 1 });
  const f = floats[0];
  const roll = Math.floor(f * 10001) / 100;
  return {
    result: roll,
    display: roll.toFixed(2),
    floats, bytes, rounds,
    steps: [`float = ${f.toFixed(10)}`, `roll = floor(${f.toFixed(8)} × 10001) / 100 = ${roll.toFixed(2)}`],
  };
}

/** ROULETTE — single-zero European pocket 0–36. result = floor(float * 37). */
export async function roulette(seeds) {
  const { floats, bytes, rounds } = await generateFloats({ ...seeds, count: 1 });
  const f = floats[0];
  const pocket = Math.floor(f * 37);
  return {
    result: pocket,
    display: String(pocket),
    floats, bytes, rounds,
    steps: [`float = ${f.toFixed(10)}`, `pocket = floor(${f.toFixed(8)} × 37) = ${pocket}`],
  };
}

/** LIMBO — crash multiplier. floatPoint = (1e8 / (floor(float*1e8)+1)) * (1 - houseEdge). */
export async function limbo(seeds, { houseEdge = 0.01 } = {}) {
  const { floats, bytes, rounds } = await generateFloats({ ...seeds, count: 1 });
  const f = floats[0];
  const intValue = Math.floor(f * 1e8) + 1;
  const raw = (1e8 / intValue) * (1 - houseEdge);
  const mult = Math.max(1, Math.floor(raw * 100) / 100);
  return {
    result: mult,
    display: `${mult.toFixed(2)}×`,
    floats, bytes, rounds,
    steps: [
      `float = ${f.toFixed(10)}`,
      `int = floor(float × 1e8) + 1 = ${intValue}`,
      `multiplier = max(1, floor((1e8 / ${intValue}) × ${(1 - houseEdge).toFixed(2)} × 100) / 100) = ${mult.toFixed(2)}×`,
    ],
  };
}

/** PLINKO — ball path over N rows; each row goes right if float >= 0.5. bin = #right. */
export async function plinko(seeds, { rows = 16 } = {}) {
  const { floats, bytes, rounds } = await generateFloats({ ...seeds, count: rows });
  const path = floats.map((f) => (f < 0.5 ? 'L' : 'R'));
  const bin = path.filter((d) => d === 'R').length;
  return {
    result: bin,
    display: `bin ${bin} · ${path.join('')}`,
    floats, bytes, rounds,
    steps: [
      `${rows} rows, one float per row`,
      `path = ${path.join(' ')} (float < 0.5 → L, else R)`,
      `landing bin = ${bin} (count of R)`,
    ],
  };
}

/** Shuffle-select: pick `picks` distinct slots out of `size`, one float per pick,
 *  drawing from the remaining pool. Shared by Mines (25/N) and Keno (40/10). */
async function shuffleSelect(seeds, { size, picks }) {
  const { floats, bytes, rounds } = await generateFloats({ ...seeds, count: picks });
  const pool = Array.from({ length: size }, (_, i) => i);
  const chosen = [];
  floats.forEach((f) => {
    const idx = Math.floor(f * pool.length);
    chosen.push(pool[idx]);
    pool.splice(idx, 1);
  });
  return { chosen, floats, bytes, rounds };
}

/** MINES — `count` mine tiles out of a 25-tile (5×5) grid, indices 0–24. */
export async function mines(seeds, { count = 3 } = {}) {
  const { chosen, floats, bytes, rounds } = await shuffleSelect(seeds, { size: 25, picks: count });
  const sorted = [...chosen].sort((a, b) => a - b);
  return {
    result: sorted,
    display: `mines @ ${sorted.join(', ')}`,
    floats, bytes, rounds,
    steps: [
      `${count} mines drawn from 25 tiles (one float each, from the remaining pool)`,
      `mine tiles (0–24) = ${sorted.join(', ')}`,
    ],
  };
}

/** KENO — 10 drawn numbers out of 40 (tiles 1–40). */
export async function keno(seeds, { draws = 10 } = {}) {
  const { chosen, floats, bytes, rounds } = await shuffleSelect(seeds, { size: 40, picks: draws });
  const nums = chosen.map((n) => n + 1).sort((a, b) => a - b);
  return {
    result: nums,
    display: nums.join(', '),
    floats, bytes, rounds,
    steps: [`${draws} numbers drawn from 40 tiles`, `drawn = ${nums.join(', ')}`],
  };
}

/** WHEEL — pocket in [0, segments). result = floor(float * segments). */
export async function wheel(seeds, { segments = 10 } = {}) {
  const { floats, bytes, rounds } = await generateFloats({ ...seeds, count: 1 });
  const f = floats[0];
  const pocket = Math.floor(f * segments);
  return {
    result: pocket,
    display: `segment ${pocket} / ${segments}`,
    floats, bytes, rounds,
    steps: [`float = ${f.toFixed(10)}`, `segment = floor(float × ${segments}) = ${pocket}`],
  };
}

/** HILO — a single card. index = floor(float * 52); rank = index % 13, suit = index / 13. */
export async function hilo(seeds) {
  const { floats, bytes, rounds } = await generateFloats({ ...seeds, count: 1 });
  const f = floats[0];
  const idx = Math.floor(f * 52);
  const rank = CARDS[idx % 13];
  const suit = SUITS[Math.floor(idx / 13)];
  return {
    result: idx,
    display: `${rank}${suit}`,
    floats, bytes, rounds,
    steps: [`float = ${f.toFixed(10)}`, `card index = floor(float × 52) = ${idx}`, `card = ${rank}${suit}`],
  };
}

// Registry used by the verifier component + page generation.
export const GAME_FNS = { dice, roulette, limbo, plinko, mines, keno, wheel, hilo };

/** Dispatch a game by slug with options. */
export async function compute(gameSlug, seeds, opts = {}) {
  const fn = GAME_FNS[gameSlug];
  if (!fn) throw new Error(`Unknown game: ${gameSlug}`);
  return fn(seeds, opts);
}
