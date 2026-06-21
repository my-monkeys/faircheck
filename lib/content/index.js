import en from './en.js';
import pt from './pt.js';
import es from './es.js';
import fr from './fr.js';
import de from './de.js';
import { OPT_I18N } from './opts.js';
import { proofLabels } from './proof-labels.js';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { GAMES, GAME_MAP } from '@/lib/games-meta';

export const CONTENT = { en, pt, es, fr, de };

/** Localized content bundle for a locale (falls back to English). */
export const tc = (locale) => CONTENT[locale] || CONTENT[DEFAULT_LOCALE];

/** Verifier UI dict + proof-card labels, merged. Pass this as the Verifier `t` prop. */
export const verifierT = (locale) => ({ ...tc(locale).ui.verifier, ...proofLabels(locale) });

/** Localized label/help for a verifier option key. */
export const optI18n = (locale, key) => (OPT_I18N[locale] || OPT_I18N[DEFAULT_LOCALE])[key] || { label: key, help: '' };

/** Build the localized game list the Verifier expects (optionally limited to `slugs`). */
export function localizedGames(locale, slugs) {
  const C = tc(locale);
  const list = slugs || GAMES.map((g) => g.slug);
  return list.map((slug) => {
    const g = GAME_MAP[slug];
    const gc = C.games[slug];
    return {
      slug, name: gc.name, resultLabel: gc.resultLabel, tagline: gc.tagline, formula: g.formula, category: g.category,
      inputs: g.inputs || 'seed',
      options: g.options.map((o) => ({ ...o, ...optI18n(locale, o.key) })),
    };
  });
}
