#!/usr/bin/env bash
# Monta index.html a partir dos arquivos em src/
set -e
cd "$(dirname "$0")/src"
cat data1.js data2.js data3.js a1.js extra.js extra2.js sentences.js data_it.js tests.js tests_a1.js vocab.js vocab_a1.js cultura.js speak_data.js a1_prep.js storia.js schede.js videos.js a1_ce.js app.js > ../all.js
node --check ../all.js
cd ..
python3 - <<'PY'
h=open('src/head.html').read(); i=h.index('</style>')+len('</style>'); headpart,bodypart=h[:i],h[i:]
reset='<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,-apple-system,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>'
js=open('all.js').read(); assert '</script>' not in js
doc='<!DOCTYPE html>\n<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'+reset+'\n'+headpart+'\n</head><body>'+bodypart+'\n<script>\n'+js+'\n</script>\n</body></html>\n'
open('index.html','w').write(doc)
print('index.html', len(doc), 'bytes')
PY
rm -f all.js
