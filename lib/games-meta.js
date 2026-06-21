// Structural game registry (language-neutral). Display strings — name, resultLabel,
// tagline, intro, howItWorks, faq — live per locale in lib/content/<locale>.js.
// `options` carry only the numeric metadata; their labels/help are in lib/content/opts.js.

export const GAMES = [
  { slug: 'dice', category: 'number', formula: 'roll = floor(float × 10001) / 100', options: [] },
  {
    slug: 'limbo', category: 'multiplier',
    formula: 'multiplier = max(1, floor((1e8 / (floor(float×1e8)+1)) × (1 − houseEdge) × 100) / 100)',
    options: [{ key: 'houseEdge', type: 'number', default: 0.01, min: 0, max: 0.2, step: 0.001 }],
  },
  { slug: 'roulette', category: 'number', formula: 'pocket = floor(float × 37)', options: [] },
  {
    slug: 'plinko', category: 'grid',
    formula: 'each row: float < 0.5 → left, else right · bin = count of rights',
    options: [{ key: 'rows', type: 'number', default: 16, min: 8, max: 16, step: 1 }],
  },
  {
    slug: 'mines', category: 'grid',
    formula: 'draw N tiles from 25 (one float each, from the remaining pool)',
    options: [{ key: 'count', type: 'number', default: 3, min: 1, max: 24, step: 1 }],
  },
  { slug: 'keno', category: 'grid', formula: 'draw 10 numbers from 40 (one float each, from the remaining pool)', options: [] },
  {
    slug: 'wheel', category: 'number', formula: 'segment = floor(float × segments)',
    options: [{ key: 'segments', type: 'number', default: 10, min: 2, max: 50, step: 1 }],
  },
  { slug: 'hilo', category: 'cards', formula: 'index = floor(float × 52) · rank = index mod 13 · suit = floor(index / 13)', options: [] },
];

export const GAME_MAP = Object.fromEntries(GAMES.map((g) => [g.slug, g]));
export const GAME_SLUGS = GAMES.map((g) => g.slug);
export const getGame = (slug) => GAME_MAP[slug] || null;
