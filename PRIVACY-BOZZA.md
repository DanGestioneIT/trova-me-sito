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
> Manca un punto che non posso decidere io: il **titolare del trattamento**. Se le app le
> pubblichi come persona fisica va il tuo nome; se hai una partita IVA o una società, vanno
> quelli, con l'indirizzo. Serve anche un contatto — e il brief oggi esclude di pubblicare
> un indirizzo email. Sono due cose che vanno decise insieme.

---

## Privacy

TROVA.ME is one person making three iPhone apps. This page says what each app does with
your data, in plain terms. It is short because the apps collect very little.

### This website

This site has no analytics, no cookies, no trackers, and no contact form. Nothing you do
here is recorded. It is a set of static pages served by GitHub Pages, which — like any web
server — logs requests at its own level; TROVA.ME neither receives nor stores those logs.

### Minta

Minta records audio, transcribes it, and rewrites the transcript. **You choose where that
work happens, and the choice decides where your words go.**

**On your iPhone.** Transcription uses Apple's on-device speech recognition and summaries
use Apple's on-device models. Your audio and your text never leave the phone. ⚠️ *Da
verificare: che nella modalità on-device non venga effettuata alcuna chiamata di rete, in
nessuna circostanza.*

**With your own API key.** Your transcript is sent directly from your iPhone to the AI
provider you chose — OpenAI, Anthropic or Google — under your own account and their terms.
TROVA.ME is not part of that exchange and never sees your key, which is stored in the
iPhone's keychain.

**Minta Cloud.** Audio and transcripts are sent to `api.trova.me`, which forwards them to
**Groq**, the provider that performs the transcription and the summarisation. **The
TROVA.ME server stores neither your audio nor your text**: it processes the request,
returns the result, and keeps only a ledger entry recording that credit was spent. What
Groq does with a request while it processes it is governed by Groq's own terms. ⚠️ *Due
verifiche: che nessun log del server conservi, anche temporaneamente, il contenuto delle
richieste; e qual e' la politica di conservazione dati di Groq, da citare qui.*

To use Minta Cloud you sign in with Apple. TROVA.ME receives the anonymous identifier Apple
issues for you, and uses it for one purpose only: keeping track of your credit balance.
Purchases are handled by Apple; TROVA.ME never sees your payment details.

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
