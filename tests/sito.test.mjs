// Controlli sul sito gia' compilato (cartella dist/).
// Non verificano l'estetica: verificano i vincoli del brief che, se saltano,
// saltano in silenzio — lingua dichiarata, leggibilita' da telefono,
// indicizzazione, link interni.
//
// Si eseguono con `npm test`, che prima compila il sito.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const RADICE = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(RADICE, 'dist');
const BASE = '/trova-me-sito';

function elencaHtml(cartella) {
  const trovati = [];
  for (const voce of readdirSync(cartella, { withFileTypes: true })) {
    const percorso = join(cartella, voce.name);
    if (voce.isDirectory()) trovati.push(...elencaHtml(percorso));
    else if (voce.name.endsWith('.html')) trovati.push(percorso);
  }
  return trovati;
}

assert.ok(
  existsSync(DIST),
  'La cartella dist/ non esiste: esegui `npm run build` prima dei test (npm test lo fa da solo).',
);

const pagine = elencaHtml(DIST).map((percorso) => ({
  percorso,
  nome: relative(DIST, percorso).split(sep).join('/'),
  html: readFileSync(percorso, 'utf8'),
}));

test('il sito compilato contiene le pagine attese', () => {
  const attese = [
    'index.html',
    'app/minta/index.html',
    'app/pronto/index.html',
    'app/claudepal/index.html',
  ];
  const presenti = pagine.map((p) => p.nome);
  for (const attesa of attese) {
    assert.ok(presenti.includes(attesa), `Manca la pagina ${attesa}`);
  }
});

// Il sito e' in inglese: serve ad Apple, che esamina le app leggendo in inglese.
// I documenti interni restano in italiano — vedi BRIEF.md, sezione "La lingua".
test('ogni pagina e dichiarata in inglese', () => {
  for (const { nome, html } of pagine) {
    assert.match(
      html,
      /<html[^>]*\slang="en"/,
      `${nome}: manca lang="en" — senza, i lettori di schermo pronunciano il testo con la fonetica sbagliata`,
    );
  }
});

test('ogni pagina si adatta allo schermo del telefono', () => {
  for (const { nome, html } of pagine) {
    const tag = html.match(/<meta[^>]*name="viewport"[^>]*>/i);
    assert.ok(tag, `${nome}: manca il meta viewport, la pagina si leggerebbe rimpicciolita`);
    assert.match(
      tag[0],
      /width=device-width/,
      `${nome}: il viewport non e' impostato sulla larghezza del dispositivo`,
    );
  }
});

test('ogni pagina ha titolo e descrizione non vuoti', () => {
  for (const { nome, html } of pagine) {
    const titolo = html.match(/<title>([^<]*)<\/title>/i);
    assert.ok(titolo && titolo[1].trim().length > 0, `${nome}: titolo mancante o vuoto`);

    const descrizione = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
    assert.ok(
      descrizione && descrizione[1].trim().length > 0,
      `${nome}: manca la meta description, i motori di ricerca mostrerebbero testo a caso`,
    );
  }
});

test('ogni pagina dichiara il proprio indirizzo canonico', () => {
  for (const { nome, html } of pagine) {
    const canonico = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i);
    assert.ok(canonico, `${nome}: manca il link canonical`);
    assert.match(canonico[1], /^https:\/\//, `${nome}: il canonical non e' un indirizzo assoluto`);
  }
});

test('nessun collegamento interno punta nel vuoto', () => {
  for (const { nome, html } of pagine) {
    const href = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
    for (const link of href) {
      if (!link.startsWith('/')) continue; // esterni, ancore, mailto
      const senzaBase = link.startsWith(`${BASE}/`) ? link.slice(BASE.length) : link;
      assert.ok(
        link.startsWith(`${BASE}/`) || link === BASE,
        `${nome}: il collegamento ${link} non parte da ${BASE}/ — usa path() da src/lib/paths.ts`,
      );
      const relativo = senzaBase.replace(/^\//, '');
      const candidati = [
        join(DIST, relativo),
        join(DIST, relativo, 'index.html'),
        join(DIST, `${relativo}.html`),
      ];
      assert.ok(
        candidati.some((c) => existsSync(c) && statSync(c).isFile()),
        `${nome}: il collegamento ${link} non corrisponde a nessuna pagina prodotta`,
      );
    }
  }
});

test('ogni immagine ha un testo alternativo', () => {
  for (const { nome, html } of pagine) {
    for (const tag of html.match(/<img[^>]*>/g) ?? []) {
      assert.match(tag, /\salt="/, `${nome}: immagine senza alt — ${tag}`);
    }
  }
});

test('la sitemap per i motori di ricerca viene prodotta', () => {
  assert.ok(
    existsSync(join(DIST, 'sitemap-index.xml')),
    'Manca sitemap-index.xml: senza, i motori di ricerca scoprono le pagine solo per caso',
  );
});
