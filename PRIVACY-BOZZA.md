# Privacy policy — BOZZA, non pubblicata

> **Perché è una bozza e non una pagina.** Apple pretende un indirizzo di privacy policy per
> pubblicare un'app, e questo sito è il posto naturale dove tenerla. Ma è un documento con
> valore legale: **non l'ho pubblicata da solo.** Leggila, correggila dove ho capito male, e
> quando ti convince diventa una pagina in dieci minuti.
>
> Tutto quello che c'è scritto viene dai tuoi documenti di progetto — `BACKEND-INTEGRATION-HANDOFF.md`
> e `BACKEND-TRANSCRIBE-HANDOFF.md` di Minta, `PRONTO_SPEC.md`, il README di ClaudePal.
> **Le tre affermazioni da verificare tu**, perché se sono sbagliate il danno è serio, sono
> segnate con ⚠️.
>
> **Deciso il 9 agosto 2026:** titolare del trattamento è Daniele Eric Carandente come
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

The data controller is **Daniele Eric Carandente**, acting as an individual. For anything
on this page, write to **dan@trova.me**.

### This website

This site has no analytics, no cookies, no trackers, and no contact form. Nothing you do
here is recorded. It is a set of static pages served by GitHub Pages, which — like any web
server — logs requests at its own level; TROVA.ME neither receives nor stores those logs.

### Minta

Minta records audio, transcribes it, and rewrites the transcript. **You choose where that
work happens, and the choice decides where your words go.**

**On your iPhone.** Transcription uses Apple's on-device speech recognition and summaries
use Apple's on-device models. Your audio and your text never leave the phone. ✅ *Verificato
il 9 agosto 2026: in modalità aereo, con il motore Minta (on device) attivo, registrazione,
trascrizione e riassunto funzionano.*

**With your own API key.** Your transcript is sent directly from your iPhone to the AI
provider you chose — OpenAI, Anthropic or Google — under your own account and their terms.
TROVA.ME is not part of that exchange and never sees your key, which is stored in the
iPhone's keychain.

**Minta Cloud.** Audio and transcripts are sent to `api.trova.me`, which forwards them to
**Groq**, the provider that performs the transcription and the summarisation. **The
TROVA.ME server stores neither your audio nor your text**: it processes the request,
returns the result, and keeps only a ledger entry recording that credit was spent.

The processing itself is done by **Groq**, as a processor acting on TROVA.ME's
instructions, under Groq's Data Processing Addendum. Groq does not retain the contents of
inference requests by default; it may keep short-lived logs of inputs and outputs — up to
30 days — only to troubleshoot platform errors or investigate abuse. Groq operates in the
United States, and the transfer is covered by the EU Standard Contractual Clauses included
in that addendum.

> **Nota interna, non da pubblicare.** ✅ I log del backend TROVA.ME: verificato dal
> proprietario, nessun contenuto sensibile, solo l'identificatore interno.
>
> ✅ L'accordo con Groq **ce l'hai già**: il DPA è incorporato automaticamente nel Services
> Agreement, non c'è niente da firmare, e le clausole contrattuali tipo per il
> trasferimento fuori dall'Unione Europea si considerano sottoscritte.
>
> ⚙️ **Cosa conviene fare, ed è a portata di clic:** Groq offre lo **Zero Data Retention**,
> attivabile da solo nella pagina *Data Controls* della console. Con quello acceso non
> restano nemmeno i log di 30 giorni. Se lo attivi, questa pagina può dire che Groq non
> conserva niente, punto — invece della versione con l'eccezione. È la differenza fra una
> frase vera con una nota a piè di pagina e una frase vera e basta.

To use Minta Cloud you sign in with Apple. TROVA.ME receives the identifier Apple issues
for you — not your name, not your email — and uses it for one purpose only: keeping track
of your credit balance. That identifier and your balance are the only things kept, and they
are kept for as long as you have credit. Purchases are handled by Apple; TROVA.ME never
sees your payment details.

Your recordings, transcripts and summaries are stored on your iPhone. Deleting a session
deletes them.

### Pronto

Your list lives on your iPhone. **There is no Pronto account and no Pronto server.**

To understand what you dictate, Pronto sends the AI provider you chose two things: the text
of what you just said, **and a compact list of your active tasks**. The second is necessary
— without it, "move the dentist to Thursday" has nothing to refer to — but it means part of
your list leaves the phone, not only the sentence you just spoke.

That exchange happens directly between your iPhone and the provider, with your own key,
under your own account and their terms. TROVA.ME is not part of it and never sees the key,
which is stored in the iPhone's keychain. If you never configure a provider, nothing is
sent anywhere.

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

*Last updated: [DATA]*
