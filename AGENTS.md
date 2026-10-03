# Regole di questo progetto

Sito vetrina di TROVA.ME. Il documento che dice **cosa deve ottenere** e' `BRIEF.md`:
leggilo prima di specificare o costruire qualunque cosa. Questo file dice invece **come
si scrive il codice qui**.

## Vincoli che non si negoziano

- **Due lingue, e non si mescolano.**
  - **Inglese** tutto cio' che vede un visitatore: testi delle pagine, titoli, meta
    description, testi alternativi delle immagini, etichette `aria-label`. Il sito
    accompagna le app sull'App Store e chi le esamina legge in inglese.
  - **Italiano** tutto cio' che legge il proprietario: `BRIEF.md`, questo file, il
    README, i commenti nel codice, i nomi di file, variabili e componenti, i nomi dei
    test, i messaggi di commit.

  La lingua del sito e' dichiarata **in un punto solo**, l'attributo `lang` in
  `src/layouts/Base.astro`. Non aggiungerne altri e non introdurre localizzazione:
  una eventuale versione italiana sara' un lavoro a se'.
- **Prima il telefono.** Ogni modifica si valuta a schermo stretto. Se serve ingrandire
  con le dita per leggere, e' sbagliata.
- **Niente contenuti inventati.** Nessuno screenshot finto, nessuna data di uscita,
  nessun link allo Store finche' le app non ci sono davvero. Le schede dicono
  "in arrivo"; ClaudePal e' un esperimento dichiarato e va presentata come tale.
- **Niente moduli di contatto, niente raccolta di email, niente tracciamento.** Unica
  eccezione, decisa il 9 agosto 2026: l'indirizzo `dan@trova.me` nella pagina `privacy/`,
  perche' un titolare del trattamento senza un recapito e' un documento incompleto. Non
  e' un permesso ad aggiungerne altrove.
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
- **Niente immagini finte.** Non esistono screenshot delle app e non si inventano: resta
  il segnaposto dichiarato. Materia visiva astratta e tipografia grande sono ammesse,
  qualunque cosa somigli a una schermata dell'app no.
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
lingua dichiarata (`lang="en"`), adattamento al telefono, titolo e descrizione presenti,
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
