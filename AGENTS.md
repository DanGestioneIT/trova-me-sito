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
- **Niente moduli di contatto, niente raccolta di email, niente tracciamento.**
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
- `src/styles/global.css` — solo variabili di colore e stili di base.
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
collegamenti interni che portano da qualche parte, sitemap prodotta. **Se aggiungi una pagina,
aggiungila anche all'elenco delle pagine attese in `tests/sito.test.mjs`.**

Gli stessi controlli girano su ogni pull request (`.github/workflows/ci.yml`).
