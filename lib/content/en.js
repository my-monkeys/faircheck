// English content — the single source of truth. Other locales mirror this structure
// exactly (same keys, same {tokens}); only the string VALUES are translated.

const C = {
  ui: {
    nav: { casinos: 'Casinos', games: 'Games', how: 'How it works' },
    tagline: 'provably-fair',
    footer: {
      about: 'An independent, open verifier for provably-fair casino games. We recompute outcomes — we do not run, host, or take bets.',
      verify: 'Verify', learn: 'Learn',
      lVerifier: 'Universal verifier', lByGame: 'By game', lByCasino: 'By casino', lHow: 'How provably fair works',
      legal: '{name} is an informational tool, not a gambling operator. It is not affiliated with, endorsed by, or sponsored by any casino named on this site, and it does not link to or promote any operator. Names and game mechanics are referenced for verification and educational purposes only. Gambling carries financial risk and is age-restricted (18+/21+ depending on your jurisdiction); some forms of online gambling are illegal in certain countries — check your local law.',
      network: 'A {link} project · computed entirely in your browser.',
    },
    verifier: {
      form: 'Verification form', loadExample: 'load example',
      serverSeed: 'Server seed — revealed / unhashed',
      serverSeedPh: 'e.g. 3f1a9c… (the seed the casino shows AFTER you rotate seeds)',
      clientSeed: 'Client seed', clientSeedPh: 'your client seed',
      nonce: 'Nonce', noncePh: 'bet number, e.g. 1',
      optional: 'Optional · pre-commit hash check',
      hashDesc: 'Paste the hashed server seed the casino published before the bet. Faircheck confirms SHA-256 of your revealed seed matches it — proof the seed was locked in advance.',
      hashPh: 'hashed server seed (64-char SHA-256 hex)',
      errServer: 'Paste the revealed (unhashed) server seed.',
      errClient: 'Paste the client seed.',
      errNonce: 'Nonce must be a whole number ≥ 0.',
      errFail: 'Computation failed.',
      verify: 'Verify {game} result', computing: 'Computing…',
      privacy: '100% in your browser · seeds never leave this page',
      hashOk: '✓ Hash verified', hashBad: '✗ Hash mismatch',
      expected: 'expected', got: 'sha256()',
      copyLink: '⧉ copy verification link', copied: '✓ link copied',
      showRaw: 'Show raw cryptographic material',
      hmacMsg: 'HMAC msg #{n}', bytesUsed: 'bytes used', floats: 'floats',
    },
  },

  home: {
    metaTitle: 'Faircheck — Provably-Fair Verifier for Crypto Casinos',
    metaDesc: 'Paste your server seed, client seed and nonce to recompute any crypto-casino result yourself — Dice, Limbo, Mines, Plinko, Roulette, Keno, Wheel and Hi-Lo. 100% in your browser, no login.',
    kicker: 'Independent · open · client-side',
    h1a: 'Verify your casino result.', h1b: 'Prove it was fair.',
    lead: 'Paste your server seed, client seed and nonce. Faircheck recomputes the exact outcome with the same HMAC-SHA256 math the casino used — so you can check Dice, Limbo, Mines, Plinko, Roulette, Keno, Wheel and Hi-Lo yourself. Nothing leaves your browser.',
    chips: ['{n}+ casinos', '{m} games', 'no login', 'no seed logging'],
    howKicker: 'The method', howH2: 'Three inputs, one provable outcome',
    steps: [
      ['Commit', 'Before the bet, the casino shows the SHA-256 hash of a secret server seed. It is now locked in — it cannot change.'],
      ['Bet', 'Your result is HMAC-SHA256(server seed, `client seed:nonce:round`), turned into a float, then mapped to the game. You control the client seed.'],
      ['Reveal & verify', 'Rotate your seeds to reveal the server seed. Faircheck hashes it to match the commitment and recomputes every roll.'],
    ],
    fullExplainer: 'Full explainer →',
    gamesKicker: 'By game', gamesH2: 'Pick a game to verify', allGames: 'All games →',
    casinosKicker: 'By casino', casinosH2: '{n} casinos, one algorithm', allCasinos: 'All casinos →',
    faqKicker: 'FAQ', faqH2: 'Questions',
    faq: [
      ['What is a provably-fair verifier?', 'A tool that recomputes a casino game result from its public inputs — the server seed, your client seed and the nonce — so you can confirm the outcome was determined before the bet and never altered. Faircheck does this entirely in your browser.'],
      ['Do I have to trust Faircheck?', 'No. The verification is pure math (HMAC-SHA256) running locally on your device. Your seeds are never sent anywhere. You can read the open algorithm and even run the same computation yourself.'],
      ['Which casinos does it cover?', 'Every casino on the “Stake method” — the HMAC-SHA256 seed/nonce scheme used by {n}+ crypto casinos including Stake, BC.Game, Roobet, Shuffle and Rollbit. The math is identical; only seed-rotation menus differ.'],
      ['My result does not match — is the casino cheating?', 'Usually it is a seed or nonce mismatch: make sure you rotated your seed pair so the server seed is revealed (unhashed), and that the nonce is the exact bet number. For Limbo/Wheel, the operator’s house edge or segment count must match too. A genuine mismatch on correct inputs is the red flag worth screenshotting.'],
    ],
  },

  how: {
    metaTitle: 'How Provably Fair Works — Server Seed, Client Seed & Nonce Explained',
    metaDesc: 'A plain-English guide to provably-fair gambling: server seeds, client seeds, nonces, HMAC-SHA256 and how to verify any result yourself.',
    kicker: 'The method', h1: 'How provably fair works',
    lead: 'Provably-fair gambling lets you check, with cryptography instead of trust, that a result was decided before you bet and never tampered with afterwards. Here is the whole idea in five minutes.',
    s1h: '1. The commitment',
    s1p: 'Before any bet, the casino generates a secret server seed and shows you only its SHA-256 hash. A hash is a one-way fingerprint: you cannot reverse it to find the seed, but once the seed is revealed, anyone can hash it and confirm it matches. By publishing the hash first, the casino locks itself in — it can no longer pick a different server seed once it sees how you bet.',
    s2h: '2. Your input',
    s2p: 'You provide a client seed (you can change it any time) and every bet carries an incrementing nonce. Because you influence the client seed, the casino cannot have pre-computed a result that only it controls.',
    s3h: '3. The draw', s3p: 'The outcome is produced deterministically:',
    s3p2: 'Those bytes are sliced into 4-byte groups and turned into floats in the range [0, 1). Each game then maps the floats to a result — a dice roll, a crash multiplier, a set of mine tiles, and so on. Same inputs, same output, every time.',
    s4h: '4. The reveal',
    s4p: 'When you rotate your seed pair, the casino reveals the old server seed in plain text. Now you can do two checks: hash the revealed seed and confirm it equals the commitment from step 1, and recompute every result to confirm the casino reported them honestly. That is exactly what the Faircheck verifier does — locally, in your browser, so your seeds never leave your device.',
    s5h: 'Why it is the same on most casinos',
    s5p: 'Stake published this scheme and it became the de-facto standard. The {n}+ casinos Faircheck supports use the identical HMAC-SHA256 byte-to-float method; only the menus for rotating seeds differ. That is why one verifier can check them all.',
    faqH2: 'FAQ',
    faq: [
      ['Is provably fair the same as “fair”?', 'No. It proves the casino could not change the outcome after you bet — it does not change the house edge. A provably-fair game can still be designed to favour the house; it just cannot lie about the result it generated.'],
      ['Can the casino still cheat?', 'Not on the result itself, as long as it commits to the hashed server seed before the bet and you verify after revealing it. The remaining trust is that the commitment you saw was genuinely shown before play — which is why you should screenshot the hashed seed.'],
      ['What is a nonce?', 'A counter that increases by one for every bet made on the same server/client seed pair. It guarantees each bet produces a different result from the same seeds.'],
    ],
    ctaH: 'Ready to check a bet?', ctaP: 'Open the universal verifier and paste your seeds.', ctaBtn: 'Open the verifier',
    linkVerifier: 'the Faircheck verifier',
  },

  gamesIndex: {
    metaTitle: 'Provably-Fair Games We Verify — Dice, Limbo, Mines, Plinko & More',
    metaDesc: 'Verify Dice, Limbo, Mines, Plinko, Roulette, Keno, Wheel and Hi-Lo. Each game explained, with a free in-browser verifier and the exact formula.',
    kicker: 'By game', h1: 'Provably-fair games',
    lead: 'Each game turns the same HMAC-SHA256 seed stream into an outcome a different way. Pick one to read how it works and verify a result against any of the {n} supported casinos.',
  },

  casinosIndex: {
    metaTitle: 'Crypto Casinos We Verify — Stake, BC.Game, Roobet & More',
    metaDesc: 'Provably-fair verification for {n}+ crypto casinos — Stake, BC.Game, Roobet, Shuffle, Rollbit and more. Recompute any original game result in your browser.',
    kicker: 'By casino', h1: 'Casinos we verify',
    lead: 'These {n} crypto casinos run the same HMAC-SHA256 “Stake method” provably-fair scheme, so Faircheck reproduces their {m} originals from the seed pair and nonce you already have.',
    gamesLine: '{n} games · seed/nonce',
  },

  gamePage: {
    breadcrumb: 'Games',
    h1: 'Verify {game}',
    algoKicker: 'How {game} is generated', algoH2: 'The algorithm',
    faqH2: 'FAQ',
    perCasinoKicker: 'Per casino', perCasinoH2: 'Verify {game} on your casino',
    perCasinoDesc: 'The math is the same everywhere, but each page is tuned to how that casino reveals its seeds.',
    otherGames: 'Other games',
    metaTitle: 'Verify {game} — Provably-Fair Checker',
    metaDesc: 'Free {game} provably-fair verifier. {intro}',
  },

  casinoPage: {
    breadcrumb: 'Casinos',
    h1: '{casino} verifier',
    engineLine: 'Engine: {engine} · established {year} · {n} verifiable games',
    howKicker: 'How to verify on {casino}', howH2: 'Reveal your seed, then recompute',
    howP1: 'Open the provably-fair or fairness panel in your {casino} account and rotate your seed pair. This reveals the previous server seed in plain text and shows the SHA-256 hash it was committed to before your bets.',
    howP2: 'Paste that revealed server seed, your client seed and the nonce of the bet into the form above. {engine}',
    howP3: 'Faircheck hashes your revealed seed to confirm it matches the pre-bet commitment, then reproduces the exact outcome — all locally, so your seeds never leave the page.',
    gamesKicker: '{casino} games', gamesH2: 'Verify a specific game',
    otherCasinos: 'Other casinos',
    metaTitle: '{casino} Provably-Fair Verifier',
    metaDesc: 'Independently verify {casino} results. Recompute Dice, Limbo, Mines and more from your server seed, client seed and nonce — free, in your browser.',
  },

  casinoGamePage: {
    h1: '{casino} {game} verifier',
    lead: 'Independently check any {casino} {game} bet. {intro}',
    stepKicker: 'Step by step on {casino}', stepH2: 'How to verify {casino} {game}',
    steps: [
      ['Reveal the seed.', 'Open {casino}’s provably-fair panel and rotate your seed pair — this reveals the previous server seed and shows the SHA-256 hash it was committed to before you bet.'],
      ['Find the nonce.', 'Each bet on a seed pair has an incrementing nonce. Use the nonce of the exact {game} round you want to check.'],
      ['Paste & verify.', 'Drop the server seed, client seed and nonce into the form above. Faircheck recomputes the {label} and confirms the seed hash matches.'],
    ],
    formulaH2: 'The {game} formula',
    faqH2: '{game} verification FAQ',
    moreGames: 'More {casino} games', gameOnOthers: '{game} on other casinos',
    metaTitle: '{casino} {game} Verifier — Provably Fair',
    metaDesc: 'Verify {casino} {game} results yourself. Recompute the {label} from your server seed, client seed and nonce with the exact HMAC-SHA256 math. Free, in-browser, no login.',
  },

  notFound: {
    metaTitle: 'Not found',
    kicker: '404', h1: 'Nothing to verify here', lead: 'That page does not exist. Head back to the verifier.',
    cta1: 'Universal verifier', cta2: 'Browse casinos',
  },

  // Stake-method engine summary, reused across pages.
  engineSummary: 'Bytes from HMAC-SHA256(serverSeed, `clientSeed:nonce:round`), converted to floats and mapped per game. The server seed is committed as a SHA-256 hash before the bet and revealed when you rotate seeds.',

  // Per-game localized content. `name` + `resultLabel` are display strings; `slug` and
  // `formula` live in lib/games-meta.js (language-neutral).
  games: {
    dice: {
      name: 'Dice', resultLabel: 'Roll', tagline: 'The 0.00–100.00 roll, recomputed from your seeds.',
      intro: 'Dice is the simplest provably-fair game: a single float drives a roll between 0.00 and 100.00. Faircheck regenerates that exact float from your server seed, client seed and nonce, so you can confirm the roll the casino showed you was the only roll it could have produced.',
      howItWorks: [
        'A single 4-byte float is taken from the HMAC-SHA256 byte stream keyed by your server seed.',
        'The float (a number in [0, 1)) is multiplied by 10001 and floored, then divided by 100 to give a roll with two decimals between 0.00 and 100.00.',
        'Because the server seed was committed to as a SHA-256 hash before the bet, the operator could not change it after seeing your client seed or nonce.',
      ],
      faq: [
        ['Why 10001 and not 10000?', 'Multiplying by 10001 makes every roll from 0.00 to 100.00 inclusive equally likely once floored — using 10000 would make 100.00 unreachable.'],
        ['My roll does not match. What now?', 'Check the nonce (it increments by one each bet) and that you pasted the UNHASHED server seed the casino revealed after rotating your seed pair. A single wrong character changes everything.'],
      ],
    },
    limbo: {
      name: 'Limbo', resultLabel: 'Multiplier', tagline: 'The crash-style target multiplier, with the house edge exposed.',
      intro: 'Limbo turns one float into a target multiplier. Unlike dice, the result depends on the operator’s house edge, so Faircheck exposes that as an input instead of hiding it — set it to your casino’s value (1% is standard) and the multiplier is fully reproducible.',
      howItWorks: [
        'One float is drawn from the HMAC-SHA256 stream, exactly as in dice.',
        'The float is converted to a large integer, inverted, and scaled by (1 − house edge) to produce the crash point.',
        'The result is floored to two decimals and clamped to a minimum of 1.00×.',
      ],
      faq: [
        ['Why do I need to enter a house edge?', 'The multiplier formula bakes in the operator’s edge. Most Stake-method casinos use 1% (0.01); a different edge shifts every multiplier, so it must match your casino.'],
        ['Is Limbo the same as Crash?', 'The math is closely related — both derive a multiplier from a single float — but Crash rounds and animates differently per operator. Use the Limbo verifier for Stake-style Limbo.'],
      ],
      note: 'Heads up: Limbo depends on an operator-specific house edge. If your result is off by a constant factor, adjust it in the form to match what {casino} used.',
    },
    roulette: {
      name: 'Roulette', resultLabel: 'Pocket', tagline: 'The single-zero European pocket, 0–36.',
      intro: 'Provably-fair roulette maps one float onto the 37 pockets of a single-zero European wheel. Faircheck reproduces the winning pocket so you can confirm the spin was fixed by the seeds, not by the house.',
      howItWorks: [
        'A single float in [0, 1) is generated from your seeds.',
        'It is multiplied by 37 and floored to land on a pocket from 0 to 36.',
        'Red/black and odd/even simply follow from that pocket number on a standard wheel layout.',
      ],
      faq: [
        ['European or American wheel?', 'The Stake-method verifier uses the single-zero European wheel (0–36). American double-zero roulette is rare on crypto-casino originals.'],
      ],
    },
    plinko: {
      name: 'Plinko', resultLabel: 'Landing bin', tagline: 'The ball’s left/right path and final bin.',
      intro: 'Plinko drops a ball through a triangle of pegs. Each row uses one float to decide left or right. Faircheck rebuilds the full path and the bin the ball settles in, for any row count from 8 to 16.',
      howItWorks: [
        'One float is drawn per row (8 to 16 floats total, depending on the risk level).',
        'A float below 0.5 sends the ball left, otherwise right.',
        'The landing bin is the number of right moves — that index selects the payout multiplier on the board.',
      ],
      faq: [
        ['How many rows should I pick?', 'It depends on the board you played — Stake’s rows range from 8 (low) to 16 (high). The path only matches if the row count matches your bet.'],
      ],
    },
    mines: {
      name: 'Mines', resultLabel: 'Mine tiles', tagline: 'Which of the 25 tiles were mines.',
      intro: 'Mines hides bombs on a 5×5 grid. The mine positions are drawn from your seeds before you click anything. Faircheck reveals exactly which tiles (0–24) were mined, so you can confirm nothing moved as you played.',
      howItWorks: [
        'One float is drawn per mine from the HMAC-SHA256 stream.',
        'Each float picks a tile out of the remaining unmined tiles (a shuffle-and-select), guaranteeing distinct positions.',
        'The full set of mine tiles is fixed at bet time — clicking a safe tile never relocates a mine.',
      ],
      faq: [
        ['Tiles are numbered how?', 'Left-to-right, top-to-bottom: the top-left tile is 0, the bottom-right is 24.'],
      ],
    },
    keno: {
      name: 'Keno', resultLabel: 'Drawn numbers', tagline: 'The 10 numbers drawn from 40.',
      intro: 'Keno draws ten numbers from a field of forty. Faircheck reproduces the exact draw from your seeds so you can check the numbers against the ones you picked.',
      howItWorks: [
        'Ten floats are drawn from the HMAC-SHA256 stream.',
        'Each float selects a tile from the remaining pool of forty, producing ten distinct numbers.',
        'The draw is identical for everyone holding the same seed pair and nonce.',
      ],
      faq: [
        ['Numbering?', 'Tiles are numbered 1 to 40. Faircheck returns them sorted for easy comparison.'],
      ],
    },
    wheel: {
      name: 'Wheel', resultLabel: 'Segment', tagline: 'The winning segment of the wheel.',
      intro: 'Wheel spins to one of N equal segments. Faircheck maps your float onto the wheel you actually played — set the segment count and the winning index is reproducible.',
      howItWorks: [
        'A single float in [0, 1) is generated.',
        'It is multiplied by the number of segments and floored to pick the winning index.',
        'Risk levels change how many segments and which multipliers sit on the wheel, so the segment count must match your bet.',
      ],
      faq: [
        ['Why set segment count?', 'Different risk levels use different numbers of segments. The float is the same; only the mapping changes.'],
      ],
      note: 'Heads up: Wheel depends on an operator-specific segment count. If your result is off, set the segment count in the form to match what {casino} used.',
    },
    hilo: {
      name: 'Hi-Lo', resultLabel: 'Card', tagline: 'The drawn card from a 52-card deck.',
      intro: 'Hi-Lo asks whether the next card is higher or lower. Each card is a single float over a 52-card deck. Faircheck reveals the exact card so you can verify the sequence you bet on.',
      howItWorks: [
        'One float per card is drawn from the HMAC-SHA256 stream.',
        'The float is multiplied by 52 and floored to an index from 0 to 51.',
        'The index maps to a rank (A→K) and a suit (♦♣♥♠) in the standard Stake ordering.',
      ],
      faq: [
        ['Which card order?', 'Ranks run Ace, 2…10, Jack, Queen, King; suits run diamonds, clubs, hearts, spades — the ordering Stake-method games use.'],
      ],
    },
  },

  // Per-casino localized blurb. slug/name/year/games live in lib/casinos.js.
  casinos: {
    stake: 'The originator of the modern seed/nonce model; its open provably-fair spec is the one most other casinos copied verbatim.',
    'stake-us': 'Stake’s US social-casino sister site, running the same provably-fair originals and the same HMAC-SHA256 verification.',
    'bc-game': 'A large crypto casino whose in-house originals use the identical server-seed, client-seed and nonce scheme.',
    shuffle: 'A newer crypto casino built around Stake-style originals with standard seed-pair verification.',
    rollbit: 'Crypto casino and trading platform; its dice, plinko and limbo originals follow the HMAC-SHA256 method.',
    roobet: 'Popular crypto casino whose original games expose a rotatable server seed and incrementing nonce.',
    gamdom: 'One of the older crypto casinos, with provably-fair originals verifiable from the revealed seed pair.',
    trustdice: 'Dice-first crypto casino with a full set of provably-fair originals on the standard model.',
    'chips-gg': 'Crypto social casino offering Stake-style originals and seed-pair provable fairness.',
    duelbits: 'Crypto casino and esports book; its originals verify through the HMAC-SHA256 seed/nonce scheme.',
    rainbet: 'Modern crypto casino with provably-fair originals and a public verification flow.',
    'wild-io': 'Crypto casino whose originals expose server seed, client seed and nonce for independent checks.',
    metaspins: 'Crypto casino with Stake-style originals verifiable once the server seed is revealed.',
    jackbit: 'Crypto casino and sportsbook offering provably-fair originals on the standard seed model.',
    flush: 'Crypto casino with HMAC-SHA256 provably-fair originals and rotatable seeds.',
    'bets-io': 'Crypto casino whose in-house games publish the seed pair and nonce for verification.',
    '500-casino': 'Long-running crypto casino (formerly CSGO500) with provably-fair originals on the seed/nonce model.',
    betfury: 'Crypto casino with a large originals library verifiable from server and client seeds.',
    nanogames: 'Crypto casino with fast originals and standard HMAC-SHA256 provable fairness.',
    empire: 'Crypto and skin casino whose originals follow the seed-pair provably-fair scheme.',
    csgoroll: 'Skin-based site with provably-fair originals you can recompute from the revealed seeds.',
    clash: 'Case and originals site exposing server seed, client seed and nonce for verification.',
    primedice: 'The classic Stake-sibling dice site — the game that popularised seed/nonce provable fairness.',
    bitsler: 'Veteran crypto dice casino with provably-fair dice, roulette and limbo.',
    windice: 'Crypto dice casino with provably-fair originals on the standard model.',
    luckybird: 'Social crypto casino with Stake-style originals and rotatable seed pairs.',
    weiss: 'Privacy-focused crypto casino offering provably-fair originals on the seed/nonce model.',
    leebet: 'Newer crypto casino with HMAC-SHA256 provably-fair originals.',
    justbit: 'Crypto casino whose originals verify from the revealed server and client seeds.',
    mystake: 'Crypto and fiat casino with provably-fair originals on the standard model.',
    fairspin: 'Blockchain casino with provably-fair originals verifiable from the seed pair.',
    'crypto-games': 'Long-running multi-coin casino with simple, well-documented provably-fair dice and originals.',
  },
};

export default C;
