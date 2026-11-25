/**
 * Le due lingue del sito (decisione del proprietario del 25 novembre 2026: il sito
 * in italiano e in inglese). L'inglese resta agli indirizzi di sempre, perche' ci
 * puntano l'app e App Store Connect; l'italiano sta accanto, con «it/» in fondo
 * (`it/`, `app/minta/it/`, `app/minta/support/it/`, `privacy/it/`).
 *
 * Qui stanno solo le parole della cornice (testata e piede); i testi delle pagine
 * stanno in `src/testi/`.
 */
export type Lingua = 'en' | 'it';

export const cornice = {
  en: {
    navigazione: 'Main navigation',
    lingue: 'Language',
    nomeLingua: 'English',
    piede: 'iPhone apps.',
    privacy: 'Privacy',
    pathPrivacy: 'privacy/',
    pathHome: '',
    pathMinta: 'app/minta/',
  },
  it: {
    navigazione: 'Navigazione principale',
    lingue: 'Lingua',
    nomeLingua: 'Italiano',
    piede: 'App per iPhone.',
    privacy: 'Privacy',
    pathPrivacy: 'privacy/it/',
    pathHome: 'it/',
    pathMinta: 'app/minta/it/',
  },
} as const;

export function altraLingua(lingua: Lingua): Lingua {
  return lingua === 'en' ? 'it' : 'en';
}
