# TROVA.ME — il sito

Vetrina delle app iOS pubblicate sotto il marchio TROVA.ME: **Minta**, **Pronto** e
**ClaudePal**. Sito statico, pensato prima di tutto per il telefono.

**Il sito e' in inglese** (serve ad Apple); **la documentazione interna e' in italiano**.
Il perche' sta in `BRIEF.md`, sezione "La lingua".

Pubblicato su GitHub Pages: https://dangestioneit.github.io/trova-me-sito/
Il dominio `trova.me` verra' agganciato piu' avanti, con un lavoro dedicato.

## Documenti

| File | A cosa serve |
|---|---|
| `BRIEF.md` | cosa deve ottenere il sito, e cosa resta fuori |
| `AGENTS.md` | le regole con cui si scrive il codice qui |
| `PRIVACY-BOZZA.md` | note interne e verifiche dietro la pagina `privacy/` |

## Come si lavora: questo progetto e' in FASE 1

Il sito e' ancora in costruzione e nessuno ci conta. Quindi si lavora con
**`/dan-birthtime`**: si costruisce una versione intera, **la si guarda resa da un
browser**, Codex contropropone sull'insieme, e le immagini vengono mostrate al
proprietario prima di pubblicare qualunque cosa. Niente Issue, niente contratti
sigillati, niente etichette.

```
/dan-birthtime  →  rese a 1440px e 390px  →  Codex contropropone  →  si guarda ancora
                →  immagini al proprietario  →  merge (suo)
```

Il giro completo del protocollo — `/dan-spec-enriched-with-codex` → `agent-ready` →
`/dan-build` → `/dan-review-codex` → merge — vale **quando una parte passa in
produzione**, e quel passaggio lo dichiara il proprietario con `/dan-truthtime`. Oggi non
esiste ancora nessun `dan-fasi.md`: tutto il sito e' in fase 1.

Le due fasi sono spiegate in `Guide_e_esempi/LE-DUE-FASI.md` del repository del protocollo.

## Comandi

```bash
npm install    # la prima volta
npm run dev    # anteprima locale su http://localhost:4321/trova-me-sito/
npm test       # compila il sito e verifica i vincoli del brief
npm run build  # compila in dist/
```

**Prima di dire com'e' venuta una pagina, guardala.** I test non lo fanno per te:

```bash
npm run build && (cd dist && python3 -m http.server 4400 &)
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --disable-gpu --hide-scrollbars \
      --window-size=1440,1200 --virtual-time-budget=4000 \
      --screenshot=/tmp/desktop.png "http://localhost:4400/index.html"
```

Per una larghezza da telefono vera serve un riquadro: la finestra di Chrome non scende
sotto i ~500px, quindi uno screenshot a 390 renderizza a 500 e ritaglia — e sembra un
difetto di impaginazione che non esiste. Metti la pagina in un `<iframe>` largo 390 e
fotografa quello.

Costruito con [Astro](https://astro.build).
