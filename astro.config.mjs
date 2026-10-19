// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` + `base` compongono l'indirizzo pubblico del sito.
// Dal 19 ottobre 2026 il sito vive su trova.me (GitHub Pages con dominio proprio);
// il vecchio indirizzo dangestioneit.github.io/trova-me-sito/ rimanda qui da solo.
// Se l'indirizzo cambia ancora: queste due righe, l'url del font in
// src/styles/global.css, public/robots.txt e BASE in tests/sito.test.mjs.
export default defineConfig({
  site: 'https://trova.me',
  base: '/',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
