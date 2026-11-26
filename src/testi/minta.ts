// I testi della pagina di Minta, in inglese e in italiano.
//
// Riscritti il 25 novembre 2026 (decisione del proprietario; motto «Minta ascolta e scrive per te»
// dello stesso giorno, al posto di «Tu parli, Minta scrive») partendo dalla descrizione
// dello Store approvata e caricata il 17 novembre (MintaApp/Documentation/
// APPSTORE-TESTI-DEFINITIVI-2026-10-25.md), con i fatti verificati sul codice dell'app:
// otto tipi gratuiti su Private Cloud Compute (FormatAvailability.freeOnPrivateCloud), circa
// un'ora di parlato, 3 ore per Minta Cloud e il registratore, 15 minuti in memoria sul
// server, 16 lingue di trascrizione, iOS 27. Se l'app cambia, si rilegge qui.
//
// Quattro frasi inglesi sono protette dai test parola per parola (tests/sito.test.mjs).
import type { Lingua } from '../lib/lingue';

export interface Schermata {
  file: string;
  alt: string;
}

export interface TestiMinta {
  titolo: string;
  descrizione: string;
  h1: string;
  stato: string;
  apertura: string;
  schermateEtichetta: string;
  schermate: Schermata[];
  dueTitolo: string;
  due: { titolo: string; testo: string; elenco?: string[] }[];
  dueChiusa: string;
  motoriTitolo: string;
  motoriPremessa: string;
  motori: { titolo: string; testo: string }[];
  lingueTitolo: string;
  lingueTesto: string;
  puntiTitolo: string;
  punti: string[];
  serveTitolo: string;
  serveTesto: string;
  aiuto: string;
  aiutoLink: string;
}

const nomiSchermate = [
  '00-recording',
  '01-minutes',
  '02-lecture',
  '03-transcript',
  '04-recordings',
  '05-consent',
  '06-export',
];

// Le didascalie delle schermate dello Store (MintaApp/Minta/Tools/appstore-captions.json).
const didascalie = {
  en: [
    'Minta listens and writes for you',
    'Minutes with decisions and tasks',
    'Study notes, formulas included',
    'Who said what, by name',
    'Record and transcribe on your iPhone',
    'What leaves your phone, and to whom',
    'Export to PDF or Word',
  ],
  it: [
    'Minta ascolta e scrive per te',
    'Verbali con decisioni e compiti',
    'Appunti di studio, formule comprese',
    'Chi ha detto cosa, con i nomi',
    "Registra e trascrivi sull'iPhone",
    'Cosa esce dal telefono, e a chi',
    'Esporta in PDF o Word',
  ],
};

function schermate(lingua: Lingua): Schermata[] {
  return nomiSchermate.map((nome, i) => ({
    file: `immagini/minta/${lingua}/${nome}.webp`,
    alt: didascalie[lingua][i],
  }));
}

export const testiMinta: Record<Lingua, TestiMinta> = {
  en: {
    titolo: 'Minta — listens and writes for you | TROVA.ME',
    descrizione:
      'Minta records a meeting, a lecture or an idea, writes down everything that was said and turns it into the document you need. Free with Apple Intelligence.',
    h1: 'Minta listens and writes for you.',
    stato: 'In testing — not on the App Store yet.',
    apertura:
      'Every day you hear things that matter: a meeting, a lecture, an interview, an idea on the go. A few hours later, half of it is already gone.',
    schermateEtichetta: 'Minta on iPhone',
    schermate: schermate('en'),
    dueTitolo: 'With Minta you record, and you get two things.',
    due: [
      {
        titolo: 'Everything that was said, word for word.',
        testo: 'The full text, with the name of who’s speaking. Nothing gets lost.',
      },
      {
        titolo: 'The document you need, your choice.',
        testo: 'From that text, Minta writes what you want:',
        elenco: [
          'a quick summary, to remember the key points;',
          'lecture notes, ready to study;',
          'meeting minutes, with the decisions made and who does what;',
          'and more, like a recipe to follow or a page of your diary.',
        ],
      },
    ],
    dueChiusa:
      'From a summary of a few lines to the minutes of an hour-long meeting, without writing a word. So you can really listen: Minta takes notes for you.',
    motoriTitolo: 'Free, or Minta Cloud. You choose each time.',
    motoriPremessa:
      'Your recordings stay on your iPhone. Nothing goes to Minta Cloud without your yes. No ads, no tracking.',
    motori: [
      {
        titolo: 'Free, with Apple Intelligence',
        testo:
          'On any iPhone with Apple Intelligence you record, transcribe and write up without paying anything, with no subscription and no account. Transcription runs on your iPhone. Apple Intelligence writes eight types of write-up on Apple’s Private Cloud Compute, which keeps nothing, for up to about an hour of speech. Offline, the phone writes the summary on its own, for shorter recordings.',
      },
      {
        titolo: 'Minta Cloud',
        testo:
          'For the very best quality, for meeting minutes and long recordings: Claude by Anthropic, a frontier AI, writes every type, for recordings up to 3 hours. For a noisy room, Whisper can transcribe on the server. It’s optional and you only pay for what you use, with no subscription. The server transcribes and writes up without storing anything: the result waits in memory for at most 15 minutes, only so your iPhone can collect it.',
      },
    ],
    lingueTitolo: 'Works in many languages.',
    lingueTesto:
      'Listening in English, Spanish, Chinese or something else? Minta transcribes 16 languages, from English and Italian to Japanese and Arabic, and writes in the language you prefer.',
    puntiTitolo: 'Made for long, real recordings.',
    punti: [
      'Record up to 3 hours, even with the screen locked. Start from the Action button, Control Center or Siri.',
      'Knows who said what: name the voices, and the minutes use the names.',
      'Tap a paragraph to hear that moment again.',
      'Group recordings into a series — a project, a course, a client — and Minta tells you what was decided, what has changed and what is still open.',
      'Import audio, video, text and podcasts.',
      'Translate a transcript or a write-up into another language.',
      'Export as PDF or Word. Sync with your own iCloud, with your texts encrypted.',
      'Every write-up opens with a note that AI wrote it: check it before you use it.',
    ],
    serveTitolo: 'What you need',
    serveTesto:
      'An iPhone with iOS 27 or later. Free write-ups need Apple Intelligence; telling the voices apart needs iPhone 15 Pro or later.',
    aiuto: 'Using Minta and need a hand?',
    aiutoLink: 'Minta support',
  },
  it: {
    titolo: 'Minta — ascolta e scrive per te | TROVA.ME',
    descrizione:
      'Minta registra una riunione, una lezione o un’idea, scrive tutto quello che è stato detto e ne fa il documento che ti serve. Gratis con Apple Intelligence.',
    h1: 'Minta ascolta e scrive per te.',
    stato: 'In prova — non ancora sull’App Store.',
    apertura:
      'Ogni giorno ascolti cose importanti: una riunione, una lezione, un’intervista, un’idea al volo. Qualche ora dopo, metà l’hai già dimenticata.',
    schermateEtichetta: 'Minta su iPhone',
    schermate: schermate('it'),
    dueTitolo: 'Con Minta registri, e ottieni due cose.',
    due: [
      {
        titolo: 'Tutto quello che è stato detto, parola per parola.',
        testo: 'Un testo completo, con il nome di chi parla. Niente va perso.',
      },
      {
        titolo: 'Il documento che ti serve, scelto da te.',
        testo: 'Da quel testo Minta scrive quello che vuoi:',
        elenco: [
          'un riassunto veloce, per ricordare i punti chiave;',
          'gli appunti di una lezione, pronti da studiare;',
          'il verbale di una riunione, con le decisioni prese e chi deve fare cosa;',
          'e altro ancora, come una ricetta da seguire o una pagina di diario.',
        ],
      },
    ],
    dueChiusa:
      'Dal riassunto di poche righe al verbale di una riunione di un’ora, senza scrivere una parola. Così puoi ascoltare davvero: Minta prende appunti per te.',
    motoriTitolo: 'Gratis, o Minta Cloud. Scegli tu ogni volta.',
    motoriPremessa:
      'Le registrazioni restano sul tuo iPhone. Niente va a Minta Cloud senza il tuo sì. Nessuna pubblicità, nessun tracciamento.',
    motori: [
      {
        titolo: 'Gratis, con Apple Intelligence',
        testo:
          'Su ogni iPhone con Apple Intelligence registri, trascrivi ed elabori senza pagare nulla, senza abbonamento e senza account. La trascrizione si fa sull’iPhone. Apple Intelligence scrive otto tipi di elaborazione su Private Cloud Compute di Apple, che non conserva nulla, fino a circa un’ora di parlato. Senza rete il telefono scrive da solo il riassunto, per le registrazioni più brevi.',
      },
      {
        titolo: 'Minta Cloud',
        testo:
          'Per la qualità massima, per i verbali e le registrazioni lunghe: Claude di Anthropic, un’AI di frontiera, scrive tutti i tipi, per registrazioni fino a 3 ore. In una stanza rumorosa Whisper può trascrivere sul server. È facoltativo e paghi solo quello che usi, senza abbonamento. Il server trascrive ed elabora senza conservare nulla: il risultato aspetta in memoria al massimo 15 minuti, solo perché il tuo iPhone lo possa ritirare.',
      },
    ],
    lingueTitolo: 'Funziona con molte lingue.',
    lingueTesto:
      'Ascolti in inglese, spagnolo, cinese o altro? Minta trascrive 16 lingue, dall’italiano e l’inglese al giapponese e all’arabo, e scrive nella lingua che preferisci.',
    puntiTitolo: 'Fatta per registrazioni lunghe e vere.',
    punti: [
      'Registra fino a 3 ore, anche a schermo bloccato. Parti dal tasto Azione, dal Centro di Controllo o da Siri.',
      'Sa chi ha detto cosa: dai un nome alle voci, e il verbale usa i nomi.',
      'Tocca un paragrafo per riascoltare quel momento.',
      'Raccogli le registrazioni in una serie — un progetto, un corso, un cliente — e Minta ti dice cosa è stato deciso, cosa è cambiato e cosa resta aperto.',
      'Importa audio, video, testi e podcast.',
      'Traduci una trascrizione o un’elaborazione in un’altra lingua.',
      'Esporta in PDF o Word. Sincronizza con il tuo iCloud, con i testi cifrati.',
      'Ogni elaborazione si apre con una nota: l’ha scritta l’AI, controllala prima di usarla.',
    ],
    serveTitolo: 'Cosa serve',
    serveTesto:
      'Un iPhone con iOS 27 o successivo. L’elaborazione gratuita richiede Apple Intelligence; distinguere le voci richiede un iPhone 15 Pro o successivo.',
    aiuto: 'Usi Minta e ti serve una mano?',
    aiutoLink: 'Supporto di Minta',
  },
};
