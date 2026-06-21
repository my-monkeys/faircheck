import { hmacSha256, toHex } from './hmac.js';

// ============================================================================
//  The "Stake method" — the de-facto industry standard provably-fair RNG.
//
//  Used (byte-identical) by Stake, Stake.us, BC.Game, Shuffle, Rollbit, Roobet,
//  Gamdom, Trustdice and the wider family of seed/nonce crypto casinos.
//
//  Bytes are produced by:
//      HMAC_SHA256(key = serverSeed, message = `${clientSeed}:${nonce}:${round}`)
//  Each round yields 32 bytes; `round` increments when more bytes are needed.
//
//  Bytes are then converted to uniform floats in [0, 1) by consuming 4 bytes each:
//      float = b0/256^1 + b1/256^2 + b2/256^3 + b3/256^4
// ============================================================================

/** Raw byte stream: returns the first `count` bytes plus the HMAC hex of each round
 *  (for full transparency in the UI). */
export async function generateBytes({ serverSeed, clientSeed, nonce, count }) {
  const bytes = [];
  const rounds = [];
  let round = 0;
  while (bytes.length < count) {
    const hmac = await hmacSha256(serverSeed, `${clientSeed}:${nonce}:${round}`);
    rounds.push({ round, message: `${clientSeed}:${nonce}:${round}`, hex: toHex(hmac) });
    for (let i = 0; i < hmac.length && bytes.length < count; i++) bytes.push(hmac[i]);
    round += 1;
  }
  return { bytes, rounds };
}

/** `count` uniform floats in [0, 1), plus the bytes/rounds behind them. */
export async function generateFloats({ serverSeed, clientSeed, nonce, count }) {
  const { bytes, rounds } = await generateBytes({ serverSeed, clientSeed, nonce, count: count * 4 });
  const floats = [];
  for (let i = 0; i < count; i++) {
    const chunk = bytes.slice(i * 4, i * 4 + 4);
    floats.push(chunk.reduce((acc, b, j) => acc + b / 256 ** (j + 1), 0));
  }
  return { floats, bytes, rounds };
}
