/**
 * Costruisce un indirizzo interno tenendo conto della sottocartella in cui
 * il sito e' pubblicato (`base` in astro.config.mjs).
 *
 * Va usato per OGNI collegamento interno: scrivere href="/app/minta/" a mano
 * funziona in sviluppo e si rompe una volta pubblicato su GitHub Pages.
 */
export function path(p: string): string {
  const base = import.meta.env.BASE_URL;
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return prefix + p.replace(/^\/+/, '');
}
