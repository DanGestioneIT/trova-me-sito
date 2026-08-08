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

## Come si lavora

Il progetto segue il protocollo Dan: ogni modifica nasce da un contratto su GitHub
Issues, viene costruita su un ramo, revisionata su una pull request e solo allora unita.

```
/dan-spec-enriched-with-codex  →  agent-ready  →  /dan-build  →  /dan-review-codex  →  merge
```

## Comandi

```bash
npm install    # la prima volta
npm run dev    # anteprima locale su http://localhost:4321/trova-me-sito/
npm test       # compila il sito e verifica i vincoli del brief
npm run build  # compila in dist/
```

Costruito con [Astro](https://astro.build).
