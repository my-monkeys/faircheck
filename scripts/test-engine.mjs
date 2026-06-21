// Engine correctness test. Run: node scripts/test-engine.mjs
// (requires package.json "type":"module" at run time — see build note in the script).
import { hmacSha256, sha256Hex, toHex } from '../lib/pf/hmac.js';
import { generateFloats } from '../lib/pf/rng.js';
import { dice, roulette, limbo, plinko, mines, keno, wheel, hilo, crash } from '../lib/pf/games.js';

let pass = 0, fail = 0;
const ok = (name, cond, got) => { if (cond) { pass++; console.log(`  ok   ${name}`); } else { fail++; console.log(`  FAIL ${name}  got=${got}`); } };

console.log('\n# Cryptographic primitives (known vectors)');
// RFC 4231 Test Case 2 — HMAC-SHA256(key="Jefe", data="what do ya want for nothing?")
const rfc = toHex(await hmacSha256('Jefe', 'what do ya want for nothing?'));
ok('HMAC-SHA256 RFC 4231 #2', rfc === '5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843', rfc);
// SHA-256 known vectors
ok('SHA-256("abc")', (await sha256Hex('abc')) === 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
ok('SHA-256("")', (await sha256Hex('')) === 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');

console.log('\n# Float stream (Stake method)');
const SEEDS = { serverSeed: 'serverseedfaircheckdemo', clientSeed: 'clientseed', nonce: 1 };
const { floats } = await generateFloats({ ...SEEDS, count: 4 });
ok('floats in [0,1)', floats.every((f) => f >= 0 && f < 1), JSON.stringify(floats));
// Determinism: same seeds -> same floats
const again = (await generateFloats({ ...SEEDS, count: 4 })).floats;
ok('deterministic', JSON.stringify(floats) === JSON.stringify(again));
// Different nonce -> different stream (overwhelmingly)
const other = (await generateFloats({ ...SEEDS, nonce: 2, count: 4 })).floats;
ok('nonce changes stream', JSON.stringify(floats) !== JSON.stringify(other));

console.log('\n# Game outputs (ranges + shapes)');
const d = await dice(SEEDS);         ok('dice in [0,100]', d.result >= 0 && d.result <= 100, d.display);
const r = await roulette(SEEDS);     ok('roulette in 0..36', Number.isInteger(r.result) && r.result >= 0 && r.result <= 36, r.display);
const l = await limbo(SEEDS);        ok('limbo >= 1', l.result >= 1, l.display);
const p = await plinko(SEEDS);       ok('plinko bin in 0..16', p.result >= 0 && p.result <= 16, p.display);
const m = await mines(SEEDS, { count: 3 }); ok('mines: 3 distinct 0..24', m.result.length === 3 && new Set(m.result).size === 3 && m.result.every((x) => x >= 0 && x <= 24), m.display);
const k = await keno(SEEDS);         ok('keno: 10 distinct 1..40', k.result.length === 10 && new Set(k.result).size === 10 && k.result.every((x) => x >= 1 && x <= 40), k.display);
const w = await wheel(SEEDS, { segments: 10 }); ok('wheel in 0..9', w.result >= 0 && w.result <= 9, w.display);
const h = await hilo(SEEDS);         ok('hilo index 0..51', h.result >= 0 && h.result <= 51, h.display);
const CRASH_HASH = '8d1bc1b5b1c1e1f1a1b1c1d1e1f1a1b1c1d1e1f1a1b1c1d1e1f1a1b1c1d1e1f1a';
const cr = await crash({ gameHash: CRASH_HASH });    ok('crash >= 1', cr.result >= 1, cr.display);
const cr2 = await crash({ gameHash: CRASH_HASH });   ok('crash deterministic', cr.display === cr2.display, cr2.display);
let crashThrew = false; try { await crash({ gameHash: 'xyz' }); } catch { crashThrew = true; }
ok('crash rejects bad hash', crashThrew);

console.log('\n# Regression snapshot (fixed seeds)  — record current outputs');
console.log('  dice     =', d.display);
console.log('  roulette =', r.display);
console.log('  limbo    =', l.display);
console.log('  plinko   =', p.display);
console.log('  mines    =', m.display);
console.log('  keno     =', k.display);
console.log('  wheel    =', w.display);
console.log('  hilo     =', h.display);
console.log('  crash    =', cr.display);

console.log(`\n${fail === 0 ? '✅ ALL PASS' : '❌ FAILURES'}  (${pass} ok, ${fail} fail)\n`);
process.exit(fail === 0 ? 0 : 1);
