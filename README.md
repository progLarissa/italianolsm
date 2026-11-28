# italianolsm

**Quaderno d'Italiano** — um caderno interativo para aprender italiano do zero (A1) até o C1, pensado para quem fala português e espanhol.

## O que tem

- 26 unidades: os *Primi passi* (P1–P10, nível A1) e as unidades 1–16 (A2 → C1), cada uma com lição, leitura, exercícios, redação e "Parla e ascolta"
- Conjugador sem IA: busca qualquer verbo (infinitivo, forma conjugada ou em português) e mostra todos os tempos, com as formas irregulares em vermelho
- Verbos, falsos amigos, frases para traduzir, verificações (testes) com certificado
- Léxico temático com mais de 600 palavras, áudio, cartões, quiz e ditado
- «Le mie parole» com o método Anki (cartões, autoavaliação Di nuovo / Difficile / Bene / Facile, intervalos que crescem)
- Caderno de erros com repetição espaçada (1, 3, 7 e 15 dias)
- Memória de longo prazo: frases dos exercícios já feitos e verbos dos tempos estudados voltam em 3, 7, 15, 30 e 60 dias
- Ripasso misto semanal (todas as unidades estudadas, verbos, léxico e ditado), aquecimento «Ti ricordi?» antes de cada lição, diário de 3 frases depois da aula e ditado com frases das próprias unidades
- A história em capítulos *La lettera di Anna*, fichas-resumo e cultura italiana
- «Mappa del quaderno»: o que é cada parte e quando aparece no plano; tarefas «Scopri» apresentam uma parte por dia
- Botão «PT» ao lado das explicações em italiano, para ver a tradução em português
- Plano de estudo com datas reais e calendário mensal (aulas às terças e quintas, dias de trabalho em rodízio, férias)
- Vídeos do canal [Italianeando](https://www.youtube.com/@Italianeando/courses) por unidade e um livro recomendado para cada nível

## Como abrir

É uma página única: abra `index.html` no navegador, ou ative o GitHub Pages (Settings → Pages → branch `main`, pasta `/`).

No celular, use "Adicionar à tela de início" (Safari no iPhone, Chrome no Android): o caderno aparece com o próprio ícone e abre em tela cheia, como um app. Os ícones e o `manifest.webmanifest` ficam na raiz (`icon.svg` é a fonte; os PNG saem dele com `rsvg-convert`).

Para levar o progresso de um aparelho para outro (ou entre o Claude e esta versão), use «I miei progressi» (link no fim do Índice): gera um código para copiar e colar, ou um arquivo.

Fora do claude.ai, a correção das redações por IA, as respostas da IA e a sincronização entre dispositivos ficam desligadas. O progresso fica salvo no navegador (localStorage).

## Como editar

O código-fonte está em `src/`:

| Arquivo | Conteúdo |
|---|---|
| `head.html` | CSS e estrutura da página |
| `data1.js`, `data2.js`, `data3.js`, `extra*.js` | unidades 1–16 |
| `a1.js`, `a1_prep.js`, `a1_ce.js` | Primi passi (A1) |
| `vocab.js`, `vocab_a1.js` | léxico temático |
| `tests*.js` | verificações |
| `storia.js`, `schede.js`, `cultura.js`, `speak_data.js`, `videos.js`, `sentences.js`, `data_it.js` | história, fichas, cultura, fala, vídeos e livros, frases |
| `coniugatore.js` | motor do conjugador: irregulares, compostos, verbos em -ere fortes, regras dos regulares |
| `es_a1a2.js` | explicações e enunciados de A1 e A2 em espanhol da Espanha (aplicados por cima dos textos em português; dá para alternar na página da unidade) |
| `aiuto_pt.js` | traduções prontas (sem IA) das explicações das páginas, para o botão «PT» |
| `app.js` | a aplicação (rotas, plano, calendário, exercícios) |

Depois de editar, gere a página de novo:

```bash
./build.sh
```

Os testes em `test/` usam [jsdom](https://github.com/jsdom/jsdom) (`npm install jsdom`, depois `node test/t13.js`).
