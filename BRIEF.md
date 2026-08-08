# TROVA.ME — brief del sito

Documento di partenza, scritto prima che esistesse una riga di codice. Serve a chi
specificherà i lavori: dice **cosa deve ottenere il sito e cosa no**, non come farlo.

## Il marchio

**TROVA.ME** è il nome sotto cui pubblico le mie app iOS. Il dominio `trova.me` è mio.
Esiste già anche un backend a questo marchio (`API.TROVA.ME`), che alcune app usano.

## Il filo che tiene insieme le tre app

Non sono tre prodotti scollegati: **tolgono di mezzo la tastiera.** Si parla, e qualcosa
di utile succede. È questo che il sito deve far capire in dieci secondi, prima ancora
che il visitatore legga le singole schede.

| | Cosa fa | Come si usa |
|---|---|---|
| **Minta** | registra, trascrive, rielabora | detti, e ottieni un testo lavorato — con un prompt specializzato per ogni situazione |
| **Pronto** | to-do list che capisce il parlato | detti un impegno in linguaggio naturale, l'AI lo interpreta, lo ordina per priorità e aggiunge una spinta breve |
| **ClaudePal** | il telefono come telecomando | comandi una sessione di Claude Code sul Mac parlando dal telefono, e leggi la risposta lì |

Pronto è pensata **per chi tende a procrastinare**: non è una lista in più, è una lista
che si mette in ordine da sola. È il dettaglio che la distingue, e sul sito deve vedersi.

> **Correzione, 9 agosto 2026.** Questo brief diceva che Pronto «suggerisce il primo passo
> concreto». Non è più vero, e la contraddizione è emersa da una review: la specifica
> dell'app (`PRONTO_SPEC.md`, revisione 0.9) prescrive **una frase di incoraggiamento
> breve, mai istruzioni operative**. L'ordinamento invece è davvero automatico — peso e
> urgenza calcolati dall'app — quindi su quello il brief aveva ragione.

## Stato reale, da non abbellire

- **Minta** — implementata e funzionante, non ancora pubblicata sull'App Store.
- **Pronto** — implementata e funzionante, non ancora pubblicata.
- **ClaudePal** — esperimento dichiarato, non una release. Sul sito va presentata come
  tale: raccontarla come un prodotto in arrivo sarebbe falso, e chi la provasse se ne
  accorgerebbe subito.

Nessuna delle tre ha un link allo Store. Le schede dicono **"in arrivo"**; i link si
aggiungeranno con un lavoro dedicato quando le app usciranno davvero.

## Cosa deve fare il sito

Una vetrina breve e onesta: chi arriva capisce **cosa sono queste app, per chi sono,
e a che punto stanno**. Non deve vendere: deve raccontare bene.

Deve funzionare **prima di tutto da telefono**, perché è da lì che arriverà quasi
chiunque segua un link a un'app iOS.

## Immagini

**Non esistono ancora screenshot delle app**, e non si inventano. Il sito parte con
segnaposto dichiarati — un riquadro che dice apertamente che la schermata arriverà —
e gli screenshot veri li sostituiranno più avanti, con un lavoro a sé.

Non è un ripiego: gli screenshot vanno prodotti comunque per l'App Store, e conviene
farli una volta sola quando le app sono ultimate.

## Fuori perimetro, per ora

- Nessun modulo di contatto, nessuna raccolta di indirizzi email, nessun tracciamento
  degli utenti. Se un giorno serviranno, saranno decisioni loro, non conseguenze.
- Nessun collegamento del dominio `trova.me` nella prima versione: il sito nasce
  sull'indirizzo standard di GitHub Pages, e il dominio si aggancia dopo, quando il
  contenuto piace. Cambiare il DNS mentre si sta ancora scrivendo il sito aggiunge una
  variabile che non c'entra con il sito.
- Nessuna localizzazione: una sola lingua, senza selettore e senza indirizzi doppi.
  L'italiano potrà arrivare più avanti, con un lavoro dedicato.

## La lingua

**Il sito è in inglese.** Serve ad Apple: è l'indirizzo che accompagna le app sull'App
Store, e chi le esamina legge in inglese.

I documenti interni — questo brief, `AGENTS.md`, il README, i messaggi di commit e i
nomi nel codice — restano **in italiano**: li leggo io, e tradurli non darebbe niente ad
Apple togliendomi leggibilità.

La lingua è dichiarata in un punto solo (`src/layouts/Base.astro`), così una eventuale
versione italiana non richiede di riaprire ogni pagina.

## Come verifico che sia venuto bene

Apro il sito **dal telefono** e in dieci secondi devo capire cos'è TROVA.ME. Poi tocco
una delle tre app e capisco cosa fa e se posso averla adesso. Se devo ingrandire con
le dita per leggere, non va bene.
