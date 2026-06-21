// i18n config. English is the default locale and is prefixed like the others (/en),
// with `/` redirecting to /en. Hreflang + canonical are emitted per page.
//
// `operatorLinks` gates any future affiliate/operator links per locale. It is FALSE
// for `fr` on purpose: promoting gambling operators to a French audience (incl.
// affiliation/parrainage) is illegal under the ANJ regime. Faircheck ships none today;
// this flag keeps it that way when affiliate links are added later.

export const LOCALES = ['en', 'pt', 'es', 'fr', 'de'];
export const DEFAULT_LOCALE = 'en';

export const LOCALE_META = {
  en: { label: 'English', htmlLang: 'en', ogLocale: 'en_US', hreflang: 'en', operatorLinks: true },
  pt: { label: 'Português', htmlLang: 'pt-BR', ogLocale: 'pt_BR', hreflang: 'pt-BR', operatorLinks: true },
  es: { label: 'Español', htmlLang: 'es', ogLocale: 'es_ES', hreflang: 'es', operatorLinks: true },
  fr: { label: 'Français', htmlLang: 'fr', ogLocale: 'fr_FR', hreflang: 'fr', operatorLinks: false },
  de: { label: 'Deutsch', htmlLang: 'de', ogLocale: 'de_DE', hreflang: 'de', operatorLinks: true },
};

export const isLocale = (l) => LOCALES.includes(l);
export const localeMeta = (l) => LOCALE_META[l] || LOCALE_META[DEFAULT_LOCALE];

/** Localized path: lpath('es', '/stake/dice') -> '/es/stake/dice' */
export const lpath = (locale, p = '') => `/${locale}${p}`;

/** hreflang alternates map for a path SUFFIX shared across locales (for metadata.alternates.languages). */
export function hreflangMap(suffix = '') {
  const languages = {};
  for (const l of LOCALES) languages[LOCALE_META[l].hreflang] = `/${l}${suffix}`;
  languages['x-default'] = `/${DEFAULT_LOCALE}${suffix}`;
  return languages;
}

/** Tiny formatter: fmt('Verify {casino} {game}', {casino:'Stake', game:'Dice'}). */
export function fmt(str, vars = {}) {
  return String(str).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
}

/** Clip a meta string to `max` chars at a word boundary, trimming dangling
 *  separators/conjunctions. Used to keep titles ≤60 and descriptions ≤158 across
 *  locales (translated strings run longer than the English source). */
export function clip(str, max) {
  let s = String(str).trim();
  if (s.length <= max) return s;
  s = s.slice(0, max);
  const sp = s.lastIndexOf(' ');
  if (sp > max * 0.55) s = s.slice(0, sp);
  return s.replace(/[\s–—\-&·,;:]+$/u, '').replace(/\s+(and|or|y|e|et|und|&)$/i, '');
}
