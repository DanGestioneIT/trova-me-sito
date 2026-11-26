// Le domande della pagina di supporto di Minta, in inglese e in italiano.
//
// Riscritte il 25 novembre 2026 (decisione del proprietario): domande su come funziona Minta,
// niente rimborsi, l'indirizzo email una volta sola, in fondo. I nomi di pulsanti e menu sono
// quelli dell'app (Localizable.xcstrings): se l'app li cambia, si cambiano qui.
// Le risposte possono contenere un collegamento: `{privacy}` diventa il link all'informativa.
import type { Lingua } from '../lib/lingue';

export interface TestiSupporto {
  titolo: string;
  descrizione: string;
  h1: string;
  apertura: string;
  domandeTitolo: string;
  domande: { domanda: string; risposta: string[] }[];
  privacyLink: string;
  contattoTitolo: string;
  contattoPrima: string;
  contattoDopo: string;
}

export const testiSupporto: Record<Lingua, TestiSupporto> = {
  en: {
    titolo: 'Minta support | TROVA.ME',
    descrizione:
      'Help with Minta: how recording, write-ups, languages, speakers, import, translation, export and Minta Cloud work.',
    h1: 'Support',
    apertura: 'Short answers to the questions people ask most about Minta.',
    domandeTitolo: 'Common questions',
    domande: [
      {
        domanda: 'How do I record? Can I lock the screen?',
        risposta: [
          'Tap the red button and talk. You can lock the screen or use other apps: Minta keeps recording, for up to 3 hours. You can also start from the Action button, Control Center or Siri (“Record with Minta”).',
        ],
      },
      {
        domanda: 'What happens if a call comes in?',
        risposta: [
          'The recording pauses and the audio so far is saved. Minta tells you with a notification; when the call ends, it resumes on its own or with a tap.',
        ],
      },
      {
        domanda: 'How do I get minutes, a summary or study notes?',
        risposta: [
          'When the transcript is ready, tap Write up and choose a type of write-up: Minta suggests the one that fits. You can redo or edit it whenever you like: earlier versions stay saved.',
        ],
      },
      {
        domanda: 'What’s the difference between Free and Minta Cloud?',
        risposta: [
          'Free uses Apple Intelligence: eight types of write-up, for recordings up to about an hour. Offline, it writes only the General Summary.',
          'Minta Cloud uses Claude by Anthropic: every type, for recordings up to 3 hours, at the highest quality. You pay with credit, only for what you use, with no subscription.',
        ],
      },
      {
        domanda: 'Why can’t I choose Free?',
        risposta: [
          'Free needs an iPhone with Apple Intelligence, turned on in the iPhone’s Settings. The types beyond the General Summary need an internet connection. For a recording longer than about an hour, use Minta Cloud.',
        ],
      },
      {
        domanda: 'How do I see who said what?',
        risposta: [
          'On iPhone 15 Pro and later, Minta tells the voices apart (Settings › Transcription › Recognize speakers, on from the start). After the transcript, “Name the voices” opens: give each one a name, and the transcript and the minutes use the names.',
        ],
      },
      {
        domanda: 'Which languages can Minta transcribe? Does it happen on my iPhone?',
        risposta: [
          'Sixteen languages: Arabic, Chinese, Dutch, English (US and UK), French, German, Hindi, Italian, Japanese, Korean, Polish, Portuguese, Russian, Spanish, Swedish and Turkish. Choose yours in Settings › Transcription.',
          'Yes: transcription happens only on your iPhone. The first time you use a language, the iPhone downloads it from Apple, with none of your data; the recording waits and is transcribed as soon as it’s ready. With Minta Cloud you can also choose Minta Cloud Whisper, transcription on the server, useful in noisy rooms.',
        ],
      },
      {
        domanda: 'Can I use audio I already have?',
        risposta: [
          'Yes: tap Import. You can choose From Files (audio, video or text), Video from Photos, Paste text or Podcast from link. Minta transcribes it and writes it up like a recording.',
        ],
      },
      {
        domanda: 'How do I translate a transcript or a write-up?',
        risposta: [
          'Open it and choose Translate. Apple Intelligence translates it, and the translation stays on your iPhone.',
        ],
      },
      {
        domanda: 'How do I export to PDF or Word?',
        risposta: [
          'From the write-up’s ⋯ menu: Export PDF or Export Word. You can then send or save the file like any other.',
        ],
      },
      {
        domanda: 'Where are my recordings kept?',
        risposta: [
          'On your iPhone, and in your own iCloud if you turn on sync in Minta. They stay there until you delete them. Minta keeps no copy on a server, so a recording you deleted can’t be brought back. The details are on the {privacy}.',
        ],
      },
      {
        domanda: 'How does Minta Cloud credit work?',
        risposta: [
          'You buy it in Settings › Minta Cloud › Buy credit, as a one-time payment: no subscription. Each write-up or transcription with Minta Cloud uses some of it. The credit is tied to your Apple Account: no password.',
          'If after paying the credit isn’t there, close and reopen Minta. If it says “Sign in again to receive your credit”, sign in with Apple and it arrives on its own.',
        ],
      },
      {
        domanda: 'How do I delete my Minta Cloud account?',
        risposta: [
          'In Settings › Minta Cloud › Delete account, then confirm with Apple. The account and its data on Minta’s server are deleted, and any credit left is lost; your recordings stay on your iPhone. To just stop using Minta Cloud, choose Sign out instead: account and credit stay.',
        ],
      },
    ],
    privacyLink: 'privacy page',
    contattoTitolo: 'Contact',
    contattoPrima: 'Can’t find your answer? Write to',
    contattoDopo:
      'If you use Minta Cloud, include the support code from Settings › Minta Cloud: it is used to find your account. If it’s about a purchase, include its date.',
  },
  it: {
    titolo: 'Supporto di Minta | TROVA.ME',
    descrizione:
      'Aiuto per Minta: come funzionano registrazione, elaborazioni, lingue, voci, importazione, traduzione, esportazione e Minta Cloud.',
    h1: 'Supporto',
    apertura: 'Risposte brevi alle domande più frequenti su Minta.',
    domandeTitolo: 'Domande frequenti',
    domande: [
      {
        domanda: 'Come registro? Posso bloccare lo schermo?',
        risposta: [
          'Tocca il pulsante rosso e parla. Puoi bloccare lo schermo o usare altre app: Minta continua a registrare, fino a 3 ore. Puoi partire anche dal tasto Azione, dal Centro di Controllo o da Siri («Registra con Minta»).',
        ],
      },
      {
        domanda: 'Cosa succede se arriva una telefonata?',
        risposta: [
          'La registrazione va in pausa e l’audio fin qui resta salvato. Minta te lo dice con una notifica; finita la chiamata, riprende da sola o con un tocco.',
        ],
      },
      {
        domanda: 'Come ottengo un verbale, un riassunto o gli appunti?',
        risposta: [
          'Quando la trascrizione è pronta, tocca Elabora e scegli il tipo di elaborazione: Minta ti propone quello più adatto. Puoi rifarla o modificarla quando vuoi: le versioni precedenti restano salvate.',
        ],
      },
      {
        domanda: 'Che differenza c’è tra Gratis e Minta Cloud?',
        risposta: [
          'Gratis usa Apple Intelligence: otto tipi di elaborazione, per registrazioni fino a circa un’ora. Senza rete scrive solo il Riassunto generico.',
          'Minta Cloud usa Claude di Anthropic: tutti i tipi, per registrazioni fino a 3 ore, con la qualità più alta. Si paga col credito, solo quello che usi, senza abbonamento.',
        ],
      },
      {
        domanda: 'Perché non posso scegliere Gratis?',
        risposta: [
          'Gratis richiede un iPhone con Apple Intelligence, accesa nelle Impostazioni dell’iPhone. I tipi oltre il Riassunto generico richiedono la connessione a internet. Per una registrazione più lunga di circa un’ora, usa Minta Cloud.',
        ],
      },
      {
        domanda: 'Come vedo chi ha detto cosa?',
        risposta: [
          'Dall’iPhone 15 Pro in poi Minta distingue le voci (Impostazioni › Trascrizione › Riconosci chi parla, acceso di partenza). Dopo la trascrizione si apre «Dai nomi alle voci»: dai un nome a ognuna, e trascrizione e verbale usano i nomi.',
        ],
      },
      {
        domanda: 'Quali lingue trascrive Minta? Succede sul mio iPhone?',
        risposta: [
          'Sedici lingue: arabo, cinese, coreano, francese, giapponese, hindi, inglese (USA e Regno Unito), italiano, olandese, polacco, portoghese, russo, spagnolo, svedese, tedesco e turco. Scegli la tua in Impostazioni › Trascrizione.',
          'Sì: la trascrizione si fa solo sul tuo iPhone. La prima volta che usi una lingua, l’iPhone la scarica da Apple, senza nessun dato tuo; la registrazione aspetta e si trascrive appena la lingua è pronta. Con Minta Cloud puoi scegliere anche Minta Cloud Whisper, la trascrizione sul server, utile nelle stanze rumorose.',
        ],
      },
      {
        domanda: 'Posso usare un audio che ho già?',
        risposta: [
          'Sì: tocca Importa. Puoi scegliere Da File (audio, video o testo), Video da Foto, Incolla testo o Podcast da link. Minta lo trascrive e lo elabora come una registrazione.',
        ],
      },
      {
        domanda: 'Come traduco una trascrizione o un’elaborazione?',
        risposta: [
          'Aprila e scegli Traduci. La traduzione la fa Apple Intelligence e resta sul tuo iPhone.',
        ],
      },
      {
        domanda: 'Come esporto in PDF o Word?',
        risposta: [
          'Dal menu ⋯ dell’elaborazione: Esporta PDF o Esporta Word. Poi il file si manda o si salva come qualunque altro.',
        ],
      },
      {
        domanda: 'Dove sono le mie registrazioni?',
        risposta: [
          'Sul tuo iPhone, e nel tuo iCloud se accendi la sincronizzazione in Minta. Restano lì finché non le elimini. Minta non ne tiene copia su un server, quindi una registrazione eliminata non si può recuperare. I dettagli sono nell’{privacy}.',
        ],
      },
      {
        domanda: 'Come funziona il credito di Minta Cloud?',
        risposta: [
          'Lo compri in Impostazioni › Minta Cloud › Acquista credito, con un pagamento una tantum: niente abbonamento. Ogni elaborazione o trascrizione con Minta Cloud ne usa una parte. Il credito è legato al tuo Account Apple: niente password.',
          'Se dopo il pagamento il credito non c’è, chiudi e riapri Minta. Se dice «Accedi di nuovo per ricevere il credito», accedi con Apple e il credito arriva da solo.',
        ],
      },
      {
        domanda: 'Come elimino l’account di Minta Cloud?',
        risposta: [
          'In Impostazioni › Minta Cloud › Elimina account, poi conferma con Apple. L’account e i suoi dati sul server di Minta vengono eliminati, e il credito che resta va perso; le registrazioni restano sul tuo iPhone. Se vuoi solo smettere di usare Minta Cloud, scegli invece Esci: account e credito restano.',
        ],
      },
    ],
    privacyLink: 'informativa sulla privacy',
    contattoTitolo: 'Contatto',
    contattoPrima: 'Non trovi la risposta? Scrivi a',
    contattoDopo:
      'Se usi Minta Cloud, metti il codice di supporto che trovi in Impostazioni › Minta Cloud: serve a trovare il tuo account. Se riguarda un acquisto, metti la data.',
  },
};
