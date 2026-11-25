# Regole di questo progetto

Sito vetrina di TROVA.ME. Il documento che dice **cosa deve ottenere** e' `BRIEF.md`:
leggilo prima di specificare o costruire qualunque cosa. Questo file dice invece **come
si scrive il codice qui**.

## Vincoli che non si negoziano

- **Due lingue, e non si mescolano.**
  - **Il sito per i visitatori e' in inglese e in italiano** (decisione del proprietario del
    25 novembre 2026; prima solo l'informativa aveva l'italiano, dal 19 ottobre). L'inglese
    resta agli indirizzi di sempre, perche' ci puntano l'app e App Store Connect; l'italiano
    sta accanto con «it/» (`it/`, `app/minta/it/`, `app/minta/support/it/`, `privacy/it/`).
    Ogni pagina offre la sua traduzione nella testata (`altra` di `Base`); testata e piede
    parlano la lingua della pagina (`src/lib/lingue.ts`). Le due versioni dicono le stesse
    cose: se ne cambi una, cambia anche l'altra.
  - **Italiano** tutto cio' che legge il proprietario: `BRIEF.md`, questo file, il
    README, i commenti nel codice, i nomi di file, variabili e componenti, i nomi dei
    test, i messaggi di commit.

  La lingua di una pagina si dichiara **in un punto solo**: `lingua` passato a `Base`, che
  la mette nell'attributo `lang`.
- **Prima il telefono.** Ogni modifica si valuta a schermo stretto. Se serve ingrandire
  con le dita per leggere, e' sbagliata.
- **Niente contenuti inventati.** Nessuno screenshot finto, nessuna data di uscita,
  nessun link allo Store finche' le app non ci sono davvero. Le schede dicono
  "in prova". Dal 25 novembre 2026 (decisione del proprietario) il sito presenta Minta;
  Pronto resta solo come accenno nella pagina iniziale, un'altra app «in lavorazione»,
  senza pagina sua. L'esperimento con Claude Code e' uscito il 27 ottobre 2026 e non si
  rimette senza una sua decisione.
- **Niente moduli di contatto, niente raccolta di email, niente tracciamento.** Unica
  eccezione, decisa il 9 agosto 2026: l'indirizzo di contatto nella pagina `privacy/`
  (`minta@trova.me` dal 22 novembre 2026, prima `dan@trova.me`),
  perche' un titolare del trattamento senza un recapito e' un documento incompleto; dal
  19 ottobre 2026 anche in `app/minta/support/`, perche' Apple chiede un contatto nella
  pagina di supporto (regola 1.5). Non e' un permesso ad aggiungerne altrove.
  Se serviranno, saranno decisioni prese apposta, non conseguenze di un lavoro.
- **Niente dipendenze nuove senza che siano scritte nel contratto.** Il sito deve
  restare leggibile fra un anno.

## Come e' fatto

- **Astro** genera HTML statico. Il JavaScript verso il browser va evitato: se una cosa
  si puo' fare in CSS, si fa in CSS. Le pagine devono essere leggibili dai motori di
  ricerca senza che nulla venga eseguito.
- `src/pages/` — una pagina per file. `src/layouts/Base.astro` avvolge tutte le pagine e
  si occupa di titolo, descrizione, canonical e meta social.
- `src/components/` — pezzi riusati. Lo stile sta dentro il componente, in `<style>`.
- `src/styles/global.css` — il sistema visivo: il `@font-face`, le variabili di colore
  chiaro/scuro, la scala tipografica, `.contenitore` (la colonna da 1120px) e le classi
  comuni `.stato`, `.etichetta`, `.apertura`, `.chiusura`, `.sezione`. Ogni pagina
  avvolge il proprio contenuto in `<div class="contenitore">`.
- **Il carattere e' Recursive, variabile, ospitato in `public/fonts/`.** Non sostituirlo
  con un font di sistema e **non collegarne uno esterno**: Google Fonts traccia, e il
  brief lo vieta. Un file servito dal nostro dominio no. Ha un asse `MONO`: il parlato
  grezzo e il testo composto sono lo stesso carattere in due stati, ed e' l'unica idea
  visiva propria del sito. Le due variabili `--parlato` e `--composto` esistono per
  questo.
- **Solo immagini vere.** Dal 25 novembre 2026 la pagina di Minta usa le schermate dello
  Store (in `public/immagini/minta/<lingua>/`, ridotte a 600px di larghezza in WebP dalle
  originali in MintaApp/Documentation/appstore-schermate/): se si rifanno quelle, si
  rifanno anche queste. Nessuna schermata inventata.
- **Ogni collegamento interno passa da `path()`** (`src/lib/paths.ts`). Un `href` scritto
  a mano funziona in sviluppo e si rompe una volta pubblicato, perche' il sito vive in
  una sottocartella.
- L'indirizzo pubblico sta in due righe di `astro.config.mjs` (`site` e `base`). Quando
  si agganciera' il dominio `trova.me` si cambiano quelle e nient'altro.

## Verifica

```bash
npm install     # la prima volta
npm run dev     # anteprima locale
npm test        # compila e verifica
npm run check   # controllo dei tipi
```

`npm test` non giudica l'estetica: verifica i vincoli che sbagliano in silenzio —
lingua dichiarata (`lang="en"`, `lang="it"` per le pagine italiane), traduzione offerta nella testata, adattamento al telefono, titolo e descrizione presenti,
collegamenti interni che portano da qualche parte, sitemap prodotta, e alcune frasi
protette parola per parola. **Se aggiungi una pagina, aggiungila anche all'elenco delle
pagine attese in `tests/sito.test.mjs`.**

Gli stessi controlli girano su ogni pull request (`.github/workflows/ci.yml`), e su `main`
il controllo `verifica` e' obbligatorio: senza il verde non si unisce.

### I test verdi non sono uno sguardo alla pagina

Misurano quello che gli e' stato detto di misurare: e' un cerchio chiuso. Una pagina puo'
passare ogni controllo e avere il titolo sopra il paragrafo — **e' successo, ed e' stato
pubblicato.** Se tocchi qualcosa di visibile, **rendi la pagina in un browser e guarda
l'immagine** prima di dire com'e' venuta. Il come sta nel `README.md`, con la trappola
della finestra che non scende sotto i 500px.

### Un test che si rompe per un cambio di forma va riscritto

Alcuni controlli qui dentro proteggono **frasi**, non struttura: la riga di stato della
pagina iniziale, le quattro frasi della scheda di Minta su dove finiscono i dati. Quelle
si toccano solo con una decisione dichiarata.

Se invece un test fallisce perche' e' cambiata l'impaginazione — pretendeva un certo
annidamento, un certo numero di parole, un certo figlio diretto — **riscrivilo sulla
verita' che proteggeva** e dichiaralo nella pull request. Un controllo che codifica il
layout della settimana scorsa si rompe a ogni impaginazione nuova, e insegna a ignorarlo.
