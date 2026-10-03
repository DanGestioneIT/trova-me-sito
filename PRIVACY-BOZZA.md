# Privacy policy — note interne dietro la pagina `privacy/`

> **Stato, 3 ottobre 2026.** La pagina è pubblicata (`src/pages/privacy.astro`). Questo file
> resta come copia annotata: il testo qui sotto segue la pagina, le note in italiano spiegano da
> dove viene ogni frase e cosa è stato verificato. La sezione Minta è stata riscritta il
> 3 ottobre: vedi la nota in testa a quella sezione.
>
> **Perché era una bozza e non una pagina.** Apple pretende un indirizzo di privacy policy per
> pubblicare un'app, e questo sito è il posto naturale dove tenerla. Ma è un documento con
> valore legale: **non l'ho pubblicata da solo.** Leggila, correggila dove ho capito male, e
> quando ti convince diventa una pagina in dieci minuti.
>
> Tutto quello che c'è scritto viene dai tuoi documenti di progetto — `BACKEND-INTEGRATION-HANDOFF.md`
> e `BACKEND-TRANSCRIBE-HANDOFF.md` di Minta, `PRONTO_SPEC.md`, il README di ClaudePal.
> **Le tre affermazioni da verificare tu**, perché se sono sbagliate il danno è serio, sono
> segnate con ⚠️.
>
> **Deciso il 9 agosto 2026:** titolare del trattamento è Daniele Riccarand come
> persona fisica; contatto `dan@trova.me`. Questo supera la riga del brief che escludeva
> di pubblicare un indirizzo email: là riguardava i moduli di contatto e la raccolta di
> indirizzi, qui è un obbligo di legge. Un indirizzo scritto in chiaro su una pagina
> pubblica viene raccolto dai robot nel giro di giorni: mettilo in conto, oppure decidi di
> offuscarlo quando la bozza diventa pagina.
>
> **Nota sul ruolo, perché la domanda è venuta ed è giusta.** Titolare non significa «chi
> conserva i dati», significa «chi decide perché e come vengono trattati». Sei tu ad avere
> deciso che l'audio di Minta Cloud vada a Groq per essere trascritto: quella decisione è
> il trattamento, anche se sul tuo server non resta niente. Groq è il **responsabile**,
> che elabora per conto tuo — quindi serve il loro accordo sul trattamento dei dati, da
> citare qui, tanto più che è un trasferimento fuori dall'Unione Europea.
>
> E c'è un secondo motivo, indipendente da Groq: l'identificatore Apple e il saldo dei
> crediti li conservi davvero. **Un identificatore senza nome non è anonimo, è pseudonimo**:
> se un saldo si può ricollegare a una persona — e si può, altrimenti il credito non
> funzionerebbe — resta un dato personale.
>
> Niente di tutto questo è un parere legale.

---

## Privacy

TROVA.ME is one person making three iPhone apps. This page says what each app does with
your data, in plain terms. It is short because the apps collect very little.

The data controller is **Daniele Riccarand**, acting as an individual. For anything
on this page, write to **dan@trova.me**.

### This website

This site has no analytics, no cookies, no trackers, and no contact form. Nothing you do
here is recorded. It is a set of static pages served by GitHub Pages, which — like any web
server — logs requests at its own level; TROVA.ME neither receives nor stores those logs.

### Minta

> **Nota interna, non da pubblicare — aggiornamento del 3 ottobre 2026.** Da qui in poi la
> sezione Minta segue l'informativa approvata dal proprietario, versione inglese:
> `MintaApp/Documentation/INFORMATIVA-PRIVACY-BOZZA.md`. Il proprietario la vuole corta,
> semplice, senza postille. Se cambia quella, cambia questa — e con loro i testi nell'app
> (foglio del consenso, Impostazioni › Info › Privacy).
>
> ✅ **Verificati il 3 ottobre 2026** (nota del manutentore nell'informativa, e controllati sul
> codice dell'app):
> - server di Minta Cloud su AWS a **Francoforte**;
> - **Groq con Zero Data Retention attivo**;
> - il server non salva audio né testo; tiene il **risultato solo in memoria, al massimo
>   15 minuti**, per recuperare le richieste interrotte da iOS (`MintaCloudAPI.resultRetention`
>   = 15 × 60 nell'app);
> - **consenso prima del primo invio a ogni motore esterno** (`DataSharingConsent.swift`);
> - **server Apple per il riconoscimento vocale solo dopo aver chiesto, ogni volta**
>   (`RecognitionPrivacyGate.swift`);
> - **cancellazione dell'account dall'app** (Impostazioni › Minta Cloud): accesso
>   revocato presso Apple, dati cancellati, spariti anche dai backup del database entro 24 ore,
>   credito residuo perso;
> - restano solo i **dati contabili resi anonimi per 10 anni**, con il codice Apple della
>   transazione, e un **codice non reversibile** dell'identificativo Apple (HMAC-SHA256 con sale)
>   per non dare una seconda prova gratuita;
> - **registri tecnici soltanto, tenuti 30 giorni** sul server;
> - **portachiavi svuotato a una reinstallazione da zero**.
>
> Resta valido dal 9 agosto: l'accordo sul trattamento con Groq (DPA) è incorporato nel loro
> Services Agreement, con le clausole contrattuali tipo per il trasferimento fuori dall'Unione
> Europea; non c'è niente da firmare.
>
> **Cosa è cambiato rispetto alla pagina del 9 agosto, e perché.**
> - «keeps only a ledger entry recording that credit was spent» e «that identifier and your
>   balance are kept for as long as you have credit» non sono più veri: ora c'è la memoria di
>   15 minuti, la cancellazione dall'app, i dati contabili per 10 anni e il codice anti-abuso.
>   Tolti.
> - La frase sulla prova in modalità aereo («checked the plain way») era verificata il
>   9 agosto, non è nell'informativa approvata e non è stata rifatta dopo i cambi al motore di
>   trascrizione: tolta.
> - `api.trova.me` → «Minta's server in Frankfurt», come nell'informativa.
> - La meta description della pagina diceva «with Minta Cloud nothing is kept, by anyone»:
>   con i dati contabili e la memoria di 15 minuti non è più esatto. Riscritta.
> - L'informativa approvata scrive «only an **anonymous** code created by Apple». Sulla pagina
>   ho scritto «only a code Apple creates for you», senza «anonymous»: questo stesso documento,
>   più in alto, spiega che un identificatore senza nome è **pseudonimo**, non anonimo, e la
>   pagina non deve contraddirlo. ⚠️ **Da decidere tu**: se togliere «anonymous» anche
>   nell'informativa dell'app, e se «accounting records, made anonymous… with Apple's
>   transaction code» regge — il codice di transazione Apple, presso Apple, si ricollega a una
>   persona.
> - Ogni motore è un blocco `.motore` a sé. Quello «With your own API key» si toglie intero,
>   se un giorno la chiave propria sparisce dall'app.
>
> ⚠️ **Resta la verità più fragile del documento**: lo Zero Data Retention di Groq vive in un
> interruttore della console Groq, che nessun test vede. Quando tocchi le impostazioni di Groq,
> rileggi questa sezione.

Minta records audio, transcribes it, and rewrites the transcript. **Your recordings,
transcriptions and summaries stay on your iPhone. They leave it only if you choose an external
engine, and only after you say yes.** No ads, no analytics, no tracking.

On your iPhone they stay until you delete them, and they can end up in your device backups if
you have those switched on. Keys and your Minta Cloud sign-in are kept in the iPhone's
encrypted keychain: if you reinstall the app from scratch, they are deleted.

Before the first send to each engine, Minta tells you what is sent and to whom, and asks for
your permission. The same summary is in Settings › Info › Privacy.

**On your iPhone.** Transcription uses Apple's on-device speech recognition and summaries use
Apple's on-device models. Nothing leaves the phone. If on-device recognition isn't available
for a recording, Minta asks you, every time, before using Apple's servers.

**With your own API key.** The text goes straight from your iPhone to the provider you chose —
OpenAI, Anthropic or Google — under your own account and its terms. Minta sees neither the
text nor the key. With a free Gemini key, Google may use the text to improve its models.

**Minta Cloud.** The transcription text (for summaries) or a compressed copy of the audio (for
transcriptions) goes to Minta's server in Frankfurt, which passes it to Groq for processing.
**The server stores neither your audio nor your text**: it keeps the result in memory only,
for at most 15 minutes, so it can be recovered if iOS interrupts the app, and then deletes it.

Groq works on Minta's behalf and keeps nothing: Zero Data Retention is switched on for this
account. Groq operates in the United States, under the EU Standard Contractual Clauses.

You sign in with Apple. Minta gets no name and no email, only a code Apple creates for you,
which the server uses for your credit: balance, free trial, charges and purchases. Apple
handles payments; Minta never sees your payment details.

**Deleting your Minta Cloud account** (Settings › Minta Cloud). Minta revokes its
access with Apple and deletes your data, which also disappears from backups within 24 hours.
Any remaining credit is lost. Only two things stay: accounting records, made anonymous, for 10
years because tax law requires it, with Apple's transaction code so a refund can still be
handled; and a one-way code of your Apple identifier, used only to avoid giving a second free
trial to someone who signs up again.

**Technical logs.** The app and the server log only technical data, such as durations, lengths
and error codes — never text, audio, names or emails. The server keeps them for 30 days.

**iPhone permissions.** The microphone to record, speech recognition to transcribe, and
notifications for recording alerts.

**Your rights.** You can ask to see, correct or delete your data, or object to its use, by
writing to dan@trova.me. You can also contact your data protection authority — in Italy, the
Garante privacy (garanteprivacy.it). Minta processes your data to give you the service you ask
for, and keeps accounting records because the law requires it.

### Pronto

Your list lives on your iPhone. **There is no Pronto account and no Pronto server.**

To understand what you dictate, Pronto sends what you said — together with the tasks
already on your list, so that "move the dentist to Thursday" has something to refer to — to
the AI provider you chose. That exchange happens directly between your iPhone and the
provider, with your own key, under your own account and their terms. TROVA.ME is not part
of it and never sees the key, which is stored in the iPhone's keychain. If you never
configure a provider, nothing is sent anywhere.

> **Nota interna, non da pubblicare.** Il proprietario ha chiesto di togliere il paragrafo
> che sottolineava «parte anche un pezzo della tua lista», con questa motivazione: quei
> task erano già stati inviati allo stesso fornitore quando sono stati creati, quindi
> rimandarli come contesto non rivela nulla di nuovo. È un'osservazione corretta sulla
> divulgazione *marginale*.
>
> Ho tolto l'enfasi ma **non il fatto**, ridotto a un inciso. Il motivo: una pagina che
> dice «Pronto invia quello che hai detto» mentre invia anche la lista sarebbe inesatta, e
> l'inesattezza costerebbe più di quanto faccia risparmiare — è esattamente il tipo di
> frase che qualcuno va a verificare. Se preferisci toglierlo del tutto, si può: è una tua
> decisione, e va presa sapendo questo.

### ClaudePal

ClaudePal is an experiment and is not distributed. It connects your iPhone to a Claude Code
session running on your own Mac, over your own local network. Nothing is sent to TROVA.ME.
What Claude Code itself sends to Anthropic is governed by Anthropic's terms and by your own
account.

The connection is not encrypted and is intended for a trusted network only. This is stated
plainly on the ClaudePal page as well.

### Children

None of these apps are directed at children.

### Changes

If any of this changes, this page changes with it, and the date below changes too.

*Last updated: 3 October 2026*
