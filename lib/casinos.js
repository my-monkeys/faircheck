import { GAME_SLUGS } from './games-meta.js';

// Structural casino registry (language-neutral). Localized blurbs live per locale in
// lib/content/<locale>.js (key `casinos.<slug>`). The engine summary lives there too
// (`engineSummary`).
export const ENGINES = {
  'stake-method': { name: 'Stake method (HMAC-SHA256)' },
};

const ALL = GAME_SLUGS;
const DICE_FAMILY = ['dice', 'limbo'];

// raw: [slug, name, year, gamesOverride?]
const RAW = [
  ['stake', 'Stake', 2017],
  ['stake-us', 'Stake.us', 2022],
  ['bc-game', 'BC.Game', 2017],
  ['shuffle', 'Shuffle', 2023],
  ['rollbit', 'Rollbit', 2020],
  ['roobet', 'Roobet', 2019],
  ['gamdom', 'Gamdom', 2016],
  ['trustdice', 'TrustDice', 2018],
  ['chips-gg', 'Chips.gg', 2021],
  ['duelbits', 'Duelbits', 2020],
  ['rainbet', 'Rainbet', 2023],
  ['wild-io', 'Wild.io', 2022],
  ['metaspins', 'Metaspins', 2022],
  ['jackbit', 'Jackbit', 2022],
  ['flush', 'Flush', 2022],
  ['bets-io', 'Bets.io', 2021],
  ['500-casino', '500 Casino', 2016],
  ['betfury', 'BetFury', 2019],
  ['nanogames', 'Nanogames', 2018],
  ['empire', 'Empire.io', 2016],
  ['csgoroll', 'CSGORoll', 2016],
  ['clash', 'Clash.gg', 2022],
  ['primedice', 'Primedice', 2013, DICE_FAMILY],
  ['bitsler', 'Bitsler', 2015, ['dice', 'roulette', 'limbo']],
  ['windice', 'Windice', 2019, ['dice', 'limbo', 'wheel', 'keno']],
  ['luckybird', 'Luckybird.io', 2022],
  ['weiss', 'Weiss.bet', 2021],
  ['leebet', 'Leebet', 2023],
  ['justbit', 'Justbit', 2021],
  ['mystake', 'MyStake', 2020],
  ['fairspin', 'Fairspin', 2018],
  ['crypto-games', 'Crypto.Games', 2014],
];

export const CASINOS = RAW.map(([slug, name, year, games]) => ({
  slug, name, established: year, engine: 'stake-method', games: games || ALL,
}));

export const CASINO_MAP = Object.fromEntries(CASINOS.map((c) => [c.slug, c]));
export const CASINO_SLUGS = CASINOS.map((c) => c.slug);
export const getCasino = (slug) => CASINO_MAP[slug] || null;

export const PAIRS = CASINOS.flatMap((c) => c.games.map((g) => ({ casino: c.slug, game: g })));
export const casinoHasGame = (casino, game) => !!CASINO_MAP[casino]?.games.includes(game);
