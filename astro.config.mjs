// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` + `base` compongono l'indirizzo pubblico del sito.
// Oggi il sito vive sull'indirizzo standard di GitHub Pages.
// Quando il dominio trova.me verra' agganciato, si cambiano queste due righe
// (site: 'https://trova.me', base: '/') e nient'altro nel progetto.
export default defineConfig({
  site: 'https://dangestioneit.github.io',
  base: '/trova-me-sito',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
