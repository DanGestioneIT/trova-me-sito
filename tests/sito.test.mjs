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
    // GitHub Pages serve questo file a chi sbaglia indirizzo: senza, il
    // visitatore vede la pagina di errore di GitHub e non sa dov'e' finito.
    '404.html',
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

// --- pagina di errore -------------------------------------------------------
// Chi arriva su un indirizzo inesistente e' gia' a un passo dall'andarsene.
// Questi controlli tengono in piedi l'unica via di ritorno che gli resta.

function pagina404() {
  const trovata = pagine.find((p) => p.nome === '404.html');
  assert.ok(trovata, "Manca dist/404.html: chi sbaglia indirizzo vedrebbe la pagina di GitHub");
  return trovata.html;
}

test('la pagina di errore riporta alla pagina iniziale', () => {
  const collegamenti = [...pagina404().matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((m) => ({
    href: (m[1].match(/\shref="([^"]*)"/) ?? [])[1],
    testo: m[2].replace(/<[^>]*>/g, '').trim(),
  }));

  const ritorno = collegamenti.find((c) => c.testo === 'Go to the homepage');
  assert.ok(
    ritorno,
    "404.html: manca il collegamento 'Go to the homepage' — senza, il visitatore ha solo il tasto indietro",
  );
  assert.equal(
    ritorno.href,
    `${BASE}/`,
    `404.html: il collegamento di ritorno punta a ${ritorno.href} invece che a ${BASE}/ — usa path() da src/lib/paths.ts`,
  );
});

test('la pagina di errore chiede di non essere indicizzata', () => {
  const robots = pagina404().match(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/i);
  assert.ok(robots, '404.html: manca <meta name="robots">');
  assert.match(
    robots[1],
    /\bnoindex\b/,
    '404.html: il meta robots non dice noindex — la pagina di errore finirebbe fra i risultati di ricerca per TROVA.ME',
  );
});

test('la pagina di errore resta fuori dalla sitemap', () => {
  const sitemap = readdirSync(DIST).filter((nome) => /^sitemap-.*\.xml$/.test(nome));
  assert.ok(sitemap.length > 0, 'Nessun file sitemap-*.xml da controllare');

  for (const nome of sitemap) {
    assert.ok(
      !readFileSync(join(DIST, nome), 'utf8').includes('404'),
      `${nome}: contiene la pagina di errore — non va segnalata ai motori di ricerca`,
    );
  }
});

// --- pagina iniziale --------------------------------------------------------
// Il testo della pagina iniziale e' il messaggio che le tre schede erediteranno.
// Questi controlli non giudicano come e' scritto — quello si legge — ma tengono
// i tre vincoli che cederebbero in silenzio: lo stato reale delle app detto
// fino in fondo, la lunghezza che la rende leggibile da telefono, e le promesse
// che il sito non puo' ancora fare.

const RIGA_STATO = 'None of these are on the App Store yet.';
const PAROLE_MASSIME = 90;
const PROMESSE_VIETATE = ['apps.apple.com', 'download', 'available now', 'coming soon'];

// Elementi senza tag di chiusura: senza questo elenco il conteggio della
// profondita' non tornerebbe mai a zero e i figli diretti sarebbero sbagliati.
const SENZA_CHIUSURA = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img',
  'input', 'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

function paginaIniziale() {
  const trovata = pagine.find((p) => p.nome === 'index.html');
  assert.ok(trovata, 'Manca dist/index.html');
  return trovata.html;
}

function contenutoMain(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*)<\/main>/i);
  assert.ok(main, 'index.html: manca <main>');
  return main[1];
}

function decodifica(testo) {
  return testo
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&'); // per ultimo: &amp;lt; deve restare &lt;
}

// I tag diventano uno spazio invece di sparire: il compilatore toglie gli a
// capo fra un tag e l'altro, e cancellandoli due parole vicine diventerebbero
// una sola, facendo contare meno parole di quante ce ne sono davvero.
function testoSemplice(html) {
  return decodifica(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function contaParole(testo) {
  return testo.split(/\s+/).filter((parola) => /[\p{L}\p{N}]/u.test(parola)).length;
}

// Divide il contenuto di <main> nei suoi figli diretti seguendo la profondita'
// dei tag. Serve solo a sapere qual e' l'ultimo: un analizzatore HTML vero
// sarebbe una dipendenza in piu', e qui non si aggiungono dipendenze.
function figliDiretti(interno) {
  const figli = [];
  const tag = /<(\/?)([a-zA-Z][^\s/>]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;
  let profondita = 0;
  let inizio = 0;
  let trovato;

  while ((trovato = tag.exec(interno)) !== null) {
    const chiusura = trovato[1] === '/';
    const nome = trovato[2].toLowerCase();
    const senzaContenuto = SENZA_CHIUSURA.has(nome) || /\/\s*$/.test(trovato[3]);

    if (profondita === 0 && trovato.index > inizio) {
      figli.push(interno.slice(inizio, trovato.index)); // testo fra due elementi
      inizio = trovato.index;
    }

    if (chiusura) {
      profondita -= 1;
      if (profondita === 0) {
        figli.push(interno.slice(inizio, tag.lastIndex));
        inizio = tag.lastIndex;
      }
    } else if (senzaContenuto) {
      if (profondita === 0) {
        figli.push(interno.slice(inizio, tag.lastIndex));
        inizio = tag.lastIndex;
      }
    } else {
      profondita += 1;
    }
  }

  if (inizio < interno.length) figli.push(interno.slice(inizio));
  return figli.filter((figlio) => testoSemplice(figlio) !== '');
}

test('la pagina iniziale finisce dicendo che le app non sono ancora sullo Store', () => {
  const figli = figliDiretti(contenutoMain(paginaIniziale()));
  assert.ok(figli.length > 0, 'index.html: <main> non ha contenuto');
  assert.equal(
    testoSemplice(figli[figli.length - 1]),
    RIGA_STATO,
    `index.html: l'ultima cosa dentro <main> deve dire esattamente "${RIGA_STATO}" — chi legge fino in fondo deve trovarci lo stato reale, non una promessa`,
  );
});

test('il testo della pagina iniziale resta corto quanto uno schermo di telefono', () => {
  const parole = contaParole(testoSemplice(contenutoMain(paginaIniziale())));
  assert.ok(
    parole <= PAROLE_MASSIME,
    `index.html: ${parole} parole dentro <main>, il massimo e' ${PAROLE_MASSIME} — oltre, chi arriva da telefono deve scorrere prima di capire cosa sia TROVA.ME`,
  );
});

test('la pagina iniziale non promette quello che le app non danno ancora', () => {
  const html = paginaIniziale().toLowerCase();
  for (const promessa of PROMESSE_VIETATE) {
    assert.ok(
      !html.includes(promessa),
      `index.html: compare "${promessa}" — nessuna delle tre app e' pubblicata, e annunciarlo qui sarebbe falso`,
    );
  }
});
