// The My-Monkey footer API (git.my-monkey.fr/api/footer) returns French labels only —
// its contract has no locale param. But each column carries a language-neutral `key`,
// so we localize the labels ourselves (titles/URLs/UTM are left untouched as required).
import { DEFAULT_LOCALE } from '@/lib/i18n';

const COLS = {
  daily: { en: 'Daily games', pt: 'Jogos do dia', es: 'Juegos del día', fr: 'Jeux du jour', de: 'Tägliche Spiele' },
  games: { en: 'Games', pt: 'Jogos', es: 'Juegos', fr: 'Jeux', de: 'Spiele' },
  tools: { en: 'Tools', pt: 'Ferramentas', es: 'Herramientas', fr: 'Outils', de: 'Tools' },
  maps: { en: 'Maps', pt: 'Mapas', es: 'Mapas', fr: 'Cartes', de: 'Karten' },
  apps: { en: 'Apps', pt: 'Apps', es: 'Apps', fr: 'Applis', de: 'Apps' },
};

const MORE = {
  en: 'Explore all of My-Monkey', pt: 'Todo o universo My-Monkey', es: 'Todo el universo My-Monkey',
  fr: "Tout l'univers My-Monkey", de: 'Das ganze My-Monkey-Universum',
};

/** Localized column label by API key; falls back to the API-provided French label. */
export const netLabel = (locale, key, fallback) =>
  (COLS[key] && (COLS[key][locale] || COLS[key][DEFAULT_LOCALE])) || fallback;

/** Localized "explore the network" CTA. */
export const netMore = (locale, fallback) => MORE[locale] || MORE[DEFAULT_LOCALE] || fallback;

// Compact one-line legal disclaimer (the long version was footer-bloat). Kept short but
// present — Faircheck is gambling-adjacent, so the "not a casino / not affiliated / 18+" line stays.
const LEGAL = {
  en: 'Informational tool, not a casino — not affiliated with any operator. 18+; gambling carries risk and is restricted in some regions.',
  pt: 'Ferramenta informativa, não um cassino — sem afiliação com qualquer operador. 18+; apostar é arriscado e proibido em algumas regiões.',
  es: 'Herramienta informativa, no un casino — sin afiliación con ningún operador. 18+; apostar conlleva riesgo y está restringido en algunas regiones.',
  fr: "Outil informatif, pas un casino — sans affiliation avec un quelconque opérateur. 18+ ; les jeux d'argent comportent des risques et sont restreints dans certaines régions.",
  de: 'Informationstool, kein Casino — keine Verbindung zu Betreibern. 18+; Glücksspiel ist riskant und in einigen Regionen eingeschränkt.',
};

export const legalShort = (locale) => LEGAL[locale] || LEGAL[DEFAULT_LOCALE];
