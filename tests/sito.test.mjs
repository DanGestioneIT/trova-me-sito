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
const BASE = '';

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
    // L'app apre questa pagina da Impostazioni › Info › Support
    // (AppLinks.support): se sparisce, il pulsante dell'app porta alla 404.
    'app/minta/support/index.html',
    'app/pronto/index.html',
    'app/claudepal/index.html',
    // La pagina che Apple pretende per pubblicare un'app: se sparisce, sparisce
    // anche l'indirizzo che sara' dichiarato su App Store Connect.
    'privacy/index.html',
    // La versione italiana dell'informativa (decisione del proprietario del 19
    // ottobre 2026: il titolare e' in Italia).
    'privacy/it/index.html',
  ];
  const presenti = pagine.map((p) => p.nome);
  for (const attesa of attese) {
    assert.ok(presenti.includes(attesa), `Manca la pagina ${attesa}`);
  }
});

// Il sito e' in inglese: serve ad Apple, che esamina le app leggendo in inglese.
// I documenti interni restano in italiano — vedi BRIEF.md, sezione "La lingua".
// Unica eccezione, decisa il 19 ottobre 2026: la versione italiana dell'informativa.
const LINGUE_DIVERSE = { 'privacy/it/index.html': 'it' };

test('ogni pagina dichiara la propria lingua', () => {
  for (const { nome, html } of pagine) {
    const attesa = LINGUE_DIVERSE[nome] ?? 'en';
    const dichiarata = (html.match(/<html[^>]*\slang="([^"]*)"/) ?? [])[1];
    assert.equal(
      dichiarata,
      attesa,
      `${nome}: dichiara lang="${dichiarata}" invece di lang="${attesa}" — i lettori di schermo pronuncerebbero il testo con la fonetica sbagliata`,
    );
  }
});

// Sulla pagina italiana testata e piede restano in inglese: devono dirlo.
test('nella pagina italiana testata e piede si dichiarano in inglese', () => {
  const italiana = pagine.find((p) => p.nome === 'privacy/it/index.html');
  assert.ok(italiana, 'Manca dist/privacy/it/index.html');
  assert.match(italiana.html, /<header[^>]*\slang="en"/, 'privacy/it: la testata non dichiara lang="en"');
  assert.match(italiana.html, /<footer[^>]*\slang="en"/, 'privacy/it: il piede non dichiara lang="en"');
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
// Il limite protegge una cosa sola: che la pagina iniziale resti breve. Era 90
// quando il contenuto era una lista di righe; con le schede sono comparse le
// pastiglie di stato e i "Read more", che sono interfaccia e non discorso.
// Alzato a 120 per farceli stare, senza rinunciare al vincolo.
const PAROLE_MASSIME = 120;
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

// Il controllo guarda il testo, non la struttura. La versione precedente
// pretendeva che la riga fosse l'ultimo FIGLIO DIRETTO di <main>, e si e' rotta
// alla prima impaginazione che avvolge il contenuto in un contenitore — cioe'
// per un motivo che non c'entra niente con la verita' da proteggere.
test('la pagina iniziale finisce dicendo che le app non sono ancora sullo Store', () => {
  const testo = testoSemplice(contenutoMain(paginaIniziale())).trim();
  assert.ok(
    testo.endsWith(RIGA_STATO),
    `index.html: il contenuto deve finire con "${RIGA_STATO}" — chi legge fino in fondo deve trovarci lo stato reale, non una promessa. Finisce invece con: "${testo.slice(-90)}"`,
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

// --- scheda di Minta --------------------------------------------------------
// La pagina si legge e si giudica a occhio: qui non si verifica come e'
// scritta. Queste frasi sono pero' le sole che, riscritte, non diventerebbero
// brutte ma false — lo stato reale dell'app, cosa il server non conserva, e il
// limite vero della trascrizione. Sono promesse fatte a chi legge, e vanno
// protette una per una. (La frase sulla chiave personale nel portachiavi e'
// uscita il 17 ottobre 2026 con decisione dichiarata del proprietario: l'app non
// usa piu' le chiavi personali, e al suo posto si controlla che non torni.)
//
// Il confronto si fa sul testo senza tag e con le entita' decodificate
// (testoSemplice): il compilatore rende l'apostrofo come &#39;, quindi una
// ricerca sul file grezzo non troverebbe le frasi che ne contengono uno.

const FRASI_MINTA = [
  'In testing — not on the App Store yet.',
  // Riscritta il 3 ottobre 2026 con decisione dichiarata del proprietario: il server ora
  // tiene il risultato in memoria fino a 15 minuti (recupero delle richieste interrotte).
  'without storing anything: the result waits in memory for at most 15 minutes',
  // Riscritta il 17 ottobre 2026: dal Lotto 15 (deciso dal proprietario) Whisper accetta fino a 2 ore.
  'Minta Cloud transcribes up to two hours per file.',
];

function paginaMinta() {
  const trovata = pagine.find((p) => p.nome === 'app/minta/index.html');
  assert.ok(trovata, 'Manca dist/app/minta/index.html');
  return trovata.html;
}

for (const frase of FRASI_MINTA) {
  test(`la scheda di Minta dice ancora, parola per parola: "${frase}"`, () => {
    assert.ok(
      testoSemplice(paginaMinta()).includes(frase),
      `app/minta/index.html: la frase "${frase}" non c'e' piu' cosi' com'e' — e' una promessa fatta a chi legge, e riscriverla la rende falsa`,
    );
  });
}

// Le chiavi personali (OpenAI, Claude, Gemini) sono uscite dall'app il 17 ottobre
// 2026: ne' la scheda di Minta ne' l'informativa possono ancora offrirle.
test('Minta non offre piu\' la chiave personale', () => {
  const minta = testoSemplice(paginaMinta());
  const privacy = pagine.find((p) => p.nome === 'privacy/index.html');
  assert.ok(privacy, 'Manca dist/privacy/index.html');
  const sezioneMinta = testoSemplice(privacy.html).split('Minta records audio')[1]?.split('Pronto')[0] ?? '';
  assert.ok(sezioneMinta.length > 0, 'privacy/index.html: la sezione di Minta non si trova');
  for (const [nome, testo] of [['app/minta', minta], ['privacy (Minta)', sezioneMinta]]) {
    for (const parola of ['own key', 'own API key', 'OpenAI', 'Gemini']) {
      assert.ok(!testo.includes(parola), `${nome}: compare ancora "${parola}"`);
    }
  }
});

// Dal 17 ottobre 2026 (Lotto 24 dell'app, decisione del proprietario) il motore sul telefono,
// con la rete e dopo un si', manda il testo a Private Cloud Compute di Apple: l'informativa lo
// deve dire nel suo blocco, e la scheda non puo' piu' promettere che non esce niente.
test('Minta dice di Apple Private Cloud Compute e non promette piu\' che non esce niente', () => {
  const privacy = pagine.find((p) => p.nome === 'privacy/index.html');
  assert.ok(privacy, 'Manca dist/privacy/index.html');
  const sezioneMinta = testoSemplice(privacy.html).split('Minta records audio')[1]?.split('Pronto')[0] ?? '';
  assert.ok(sezioneMinta.includes('Apple Intelligence (Private Cloud Compute)'), 'privacy: manca il blocco di Private Cloud Compute');
  // Dal 18 ottobre 2026 (versione breve) il permesso si dice «with your yes»: la verita' protetta
  // e' la stessa, il testo passa da Private Cloud Compute solo dopo un si'.
  assert.ok(sezioneMinta.includes('Online and with your yes'), 'privacy: manca il permesso');
  assert.ok(!testoSemplice(paginaMinta()).includes('Nothing leaves your phone'), 'app/minta: promette ancora che non esce niente');
});

// Dal 19 ottobre 2026 (Lotto 33 dell'app) ogni account Minta Cloud ha un codice di supporto
// casuale: l'informativa dice cos'e' e a cosa serve, la pagina di supporto chiede di metterlo
// nel messaggio. Se uno dei due sparisce, chi scrive non sa che c'e' o non sa perche'.
test('Minta: il codice di supporto nell\'informativa e nel contatto del supporto', () => {
  const privacy = pagine.find((p) => p.nome === 'privacy/index.html');
  assert.ok(privacy, 'Manca dist/privacy/index.html');
  const sezioneMinta = testoSemplice(privacy.html).split('Minta records audio')[1]?.split('Pronto')[0] ?? '';
  assert.ok(sezioneMinta.includes('A random support code'), 'privacy: manca il codice di supporto');
  assert.ok(sezioneMinta.includes('it is used only to find your account'), 'privacy: manca a cosa serve il codice di supporto');
  const supporto = pagine.find((p) => p.nome === 'app/minta/support/index.html');
  assert.ok(supporto, 'Manca dist/app/minta/support/index.html');
  const contatto = testoSemplice(supporto.html).split('Contact')[1] ?? '';
  assert.ok(contatto.includes('include the support code from Settings › Minta Cloud'), 'supporto: il contatto non chiede il codice di supporto');
});

// --- informativa in due lingue ------------------------------------------------
// Dal 19 ottobre 2026 l'informativa c'e' anche in italiano (privacy/it/). L'inglese
// resta a privacy/, dove puntano l'app e App Store Connect. Chi arriva su una delle
// due deve trovare l'altra in cima, e le due devono dire le stesse cose di Minta:
// qui si controllano le frasi che gli altri test proteggono nella versione inglese.

function paginaPrivacy(nome) {
  const trovata = pagine.find((p) => p.nome === nome);
  assert.ok(trovata, `Manca dist/${nome}`);
  return trovata.html;
}

test('le due versioni dell\'informativa si collegano a vicenda', () => {
  const inglese = paginaPrivacy('privacy/index.html');
  const italiana = paginaPrivacy('privacy/it/index.html');
  assert.match(inglese, new RegExp(`<a[^>]*href="${BASE}/privacy/it/"[^>]*>Italiano</a>`), 'privacy: manca il collegamento «Italiano»');
  assert.match(italiana, new RegExp(`<a[^>]*href="${BASE}/privacy/"[^>]*>English</a>`), 'privacy/it: manca il collegamento «English»');
});

test('la versione italiana dice di Minta le stesse cose protette in inglese', () => {
  const testo = testoSemplice(paginaPrivacy('privacy/it/index.html'));
  const sezioneMinta = testo.split('Minta registra l’audio')[1]?.split('Pronto')[0] ?? '';
  assert.ok(sezioneMinta.length > 0, 'privacy/it: la sezione di Minta non si trova');
  for (const frase of [
    'Apple Intelligence (Private Cloud Compute)',
    'Con la rete e il tuo sì',
    'Un codice di supporto casuale',
    'serve solo a trovare il tuo account',
    'Il risultato resta in memoria al massimo 15 minuti',
  ]) {
    assert.ok(sezioneMinta.includes(frase), `privacy/it: manca «${frase}»`);
  }
  for (const parola of ['tua chiave', 'OpenAI', 'Gemini']) {
    assert.ok(!sezioneMinta.includes(parola), `privacy/it (Minta): compare ancora «${parola}»`);
  }
});

// L'attivita' in tempo reale (il riquadro sulla schermata di blocco) mostra il nome della
// registrazione: tutte e due le versioni dicono che resta sul telefono (19 ottobre 2026).
test('l\'informativa dice che l\'attivita\' in tempo reale resta sul telefono', () => {
  assert.ok(
    testoSemplice(paginaPrivacy('privacy/index.html')).includes('with its name (it stays on the phone)'),
    'privacy: la Live Activity non dice che resta sul telefono',
  );
  assert.ok(
    testoSemplice(paginaPrivacy('privacy/it/index.html')).includes('con il suo nome (resta sul telefono)'),
    'privacy/it: l\'attivita\' in tempo reale non dice che resta sul telefono',
  );
});

// Regola del proprietario (Lotto 42, 21 ottobre 2026): il suo nome compare solo dove la
// legge lo chiede, cioe' come titolare del trattamento nelle due versioni dell'informativa
// (GDPR, art. 13). Altrove, piede compreso, niente nome.
const PAGINE_COL_TITOLARE = ['privacy/index.html', 'privacy/it/index.html'];

test('il nome del proprietario compare solo come titolare nell\'informativa', () => {
  for (const { nome, html } of pagine) {
    const piede = (html.match(/<footer[\s\S]*?<\/footer>/) ?? [''])[0];
    assert.doesNotMatch(piede, /Riccarand|Daniele/i, `${nome}: il piede contiene il nome del proprietario`);
    if (PAGINE_COL_TITOLARE.includes(nome)) {
      assert.match(html, /<strong>Daniele Riccarand<\/strong>/, `${nome}: manca il titolare del trattamento`);
      const volte = html.match(/Riccarand/gi)?.length ?? 0;
      assert.equal(volte, 1, `${nome}: il nome compare ${volte} volte, deve restare solo come titolare`);
    } else {
      assert.doesNotMatch(html, /Riccarand|Daniele/i, `${nome}: contiene il nome del proprietario`);
    }
  }
});
