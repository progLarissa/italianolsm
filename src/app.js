(function(){
'use strict';
const $ = (s,el=document)=>el.querySelector(s);
const esc = s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const BANDS = ['A1 → A2','A2 → B1','B1 → B2','B2 → C1'];
const uNum = u=>u.n||String(u.id);
const uName = u=>u.n?`Primi passi ${u.n}`:`Unità ${u.id}`;
const tRange = t=>t.range||`${t.units[0]}–${t.units[1]}`;

/* ---------- estado ---------- */
const KEY='quaderno-italiano-v1';
let S;
try{ S = JSON.parse(localStorage.getItem(KEY)||'{}'); }catch(e){ S = {}; }
function ensureDefaults(){
  ['lesson','ex','read','write','tab','gen','corr','days','err','errDel','voc','tests','cult','spk','myvoc','log','orale','wpm','asc','story','planChk','revDays','schedaDays','planToast','lexSeen','books','mem','memDone','memDays','misto','ricordi','diario','frasi','frasiHide','ankiDays'].forEach(k=>{ if(!S[k]||typeof S[k]!=='object') S[k]={}; });
  S.verbi=S.verbi||{ok:0,tot:0,best:0}; S.falsi=S.falsi||{best:0};
  S.lab=S.lab||{trad:{ok:0,tot:0},trasf:{ok:0,tot:0},ord:{ok:0,tot:0}};
  S.goal=S.goal||30; S.mastered=S.mastered||0;
}
ensureDefaults();
let saveT;
function save(){ S.at=Date.now(); clearTimeout(saveT); saveT=setTimeout(()=>{ try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} schedulePush(); },150); }

/* ---------- correção ---------- */
const norm = s=>String(s).toLowerCase().replace(/[’`´‘]/g,"'").replace(/\s*'\s*/g,"'").replace(/\s+/g,' ').trim().replace(/[.!?,;:»«"]+$/,'').replace(/^[«"]+/,'');
const strip = s=>norm(s).normalize('NFD').replace(/[̀-ͯ]/g,'');
function expand(a){
  if(!a.includes('/')) return [a];
  const toks=a.split(' ').map(t=>t.split('/'));
  let out=[''];
  toks.forEach(opts=>{ const n=[]; out.forEach(p=>opts.forEach(o=>n.push((p?p+' ':'')+o))); out=n; });
  return out;
}
function judge(val, answers){
  const all=[].concat(...answers.map(expand));
  const v=norm(val);
  if(!v) return 'no';
  if(all.some(a=>norm(a)===v)) return 'ok';
  if(all.some(a=>strip(a)===strip(val))) return 'acc';
  return 'no';
}
function rx(src){
  const C='[a-zàèéìòù]';
  return new RegExp(src.replace(/</g,'(?<!'+C+')').replace(/>/g,'(?!'+C+')').replace(/W/g,C),'gi');
}

/* ---------- progresso ---------- */
function uParts(u){
  const parts=[!!S.lesson[u.id], !!S.read[u.id]];
  u.ex.forEach((_,i)=>parts.push(!!S.ex[u.id+'-'+i]));
  parts.push(!!(S.write[u.id]&&S.write[u.id].done));
  parts.push(!!(S.spk[u.id]&&S.spk[u.id].done));
  return parts;
}
function uPct(u){ const p=uParts(u); return Math.round(100*p.filter(Boolean).length/p.length); }

/* ---------- navegação ---------- */
function renderNav(route){
  const nav=$('#nav');
  let h=`<a class="brand" href="#"><b>Quaderno d'Italiano</b><span>Dall'A1 al C1 · scrittura e lettura</span></a>${rhythmWidget()}`;
  BANDS.forEach((b,bi)=>{
    const us=UNITS.filter(u=>u.band===bi);
    h+=`<div class="navgroup"><h4><span>${bi===0?'A1 → A2 · Primi passi':b}</span></h4><ul>`;
    us.forEach(u=>{
      const cur = route.type==='unit'&&route.id===u.id;
      h+=`<li><a class="navlink" href="#unita-${u.id}" ${cur?'aria-current="page"':''}><span class="n${u.n?' sm':''}">${uNum(u)}</span><span class="t">${esc(u.title)}<span class="bar"><i style="width:${uPct(u)}%"></i></span></span></a></li>`;
    });
    h+=`</ul></div>`;
  });
  const due=errDue().length;
  h+=`<div class="navgroup"><h4><span>Ogni giorno</span></h4><ul>
   <li><a class="navlink tool" href="#piano" ${route.type==='piano'?'aria-current="page"':''}><span class="n">▦</span><span class="t">Il mio piano<br><small class="note">calendario con le attività di ogni giorno</small></span></a></li>
   <li><a class="navlink tool" href="#ripasso" ${route.type==='ripasso'?'aria-current="page"':''}><span class="n">✎</span><span class="t">Quaderno degli errori ${due?`<span class="badge">${due}</span>`:''}<br><small class="note">${Object.keys(S.err).length} da ripassare · ${S.mastered} imparati</small></span></a></li>
   <li><a class="navlink tool" href="#misto" ${route.type==='misto'?'aria-current="page"':''}><span class="n">⇄</span><span class="t">Ripasso misto<br><small class="note">${S.misto&&S.misto[weekKey(dayKey())]?'fatto questa settimana ✓':'tutte le unità, una volta alla settimana'}</small></span></a></li>
   <li><a class="navlink tool" href="#diario" ${route.type==='diario'?'aria-current="page"':''}><span class="n">✍</span><span class="t">Il mio diario<br><small class="note">3 frasi dopo il corso</small></span></a></li>
   <li><a class="navlink tool" href="#racconto" ${route.type==='racconto'?'aria-current="page"':''}><span class="n">❧</span><span class="t">Il racconto: La lettera di Anna<br><small class="note">${STORIA.filter((_,i)=>storyRead(i)).length}/${STORIA.length} capitoli letti</small></span></a></li>
   <li><a class="navlink tool" href="#cultura" ${route.type==='cultura'?'aria-current="page"':''}><span class="n">❦</span><span class="t">Cultura italiana<br><small class="note">${Object.keys(S.cult).filter(k=>S.cult[k]&&S.cult[k].read).length}/${CULTURA.length} schede lette</small></span></a></li>
   <li><a class="navlink tool" href="#lessico" ${route.type==='lessico'?'aria-current="page"':''}><span class="n">Aa</span><span class="t">Lessico tematico<br><small class="note">${LESSICO.reduce((a,t)=>a+t.w.length,0)} parole · ${LESSICO.length} temi</small></span></a></li>
  </ul></div>
  <div class="navgroup"><h4><span>Ascolto e parlato</span></h4><ul>
   <li><a class="navlink tool" href="#leggere" ${route.type==='leggere'?'aria-current="page"':''}><span class="n">❝</span><span class="t">Leggere ad alta voce<br><small class="note">${TESTI.length} testi · scioglilingua</small></span></a></li>
   <li><a class="navlink tool" href="#ascolto" ${route.type==='ascolto'?'aria-current="page"':''}><span class="n">♪</span><span class="t">Ascolto<br><small class="note">dettato · dialoghi · numeri</small></span></a></li>
   <li><a class="navlink tool" href="#parlare" ${route.type==='parlare'?'aria-current="page"':''}><span class="n">☏</span><span class="t">Parlare<br><small class="note">conversazione IA · prova orale</small></span></a></li>
   <li><a class="navlink tool" href="#fuori" ${route.type==='fuori'?'aria-current="page"':''}><span class="n">✚</span><span class="t">Fuori dal quaderno<br><small class="note">${Object.keys(S.myvoc).length} parole mie · registro</small></span></a></li>
  </ul></div>
  <div class="navgroup"><h4><span>Verifiche</span></h4><ul>${TESTS.map(t=>{ const r=S.tests[t.id]; return `<li><a class="navlink tool" href="#verifica-${t.id}" ${route.type==='test'&&route.id===t.id?'aria-current="page"':''}><span class="n${t.lvl.length>2?' sm':''}">${r&&r.passed?'✓':t.lvl}</span><span class="t">${t.title} · ${t.range?'':'unità '}${tRange(t)}<br><small class="note">${r?'migliore: '+r.best+'/20':'non ancora svolta'}</small></span></a></li>`; }).join('')}</ul></div>`;
  h+=`<div class="navgroup"><h4><span>Strumenti</span></h4><ul>
   <li><a class="navlink tool" href="#schede" ${route.type==='scheda'?'aria-current="page"':''}><span class="n">☰</span><span class="t">Schede riassuntive<br><small class="note">il ripasso in 2 minuti</small></span></a></li>
   <li><a class="navlink tool" href="#falsi-amici" ${route.type==='falsi'?'aria-current="page"':''}><span class="n">≠</span><span class="t">Falsi amici<br><small class="note">${FALSI.length} trappole ES/PT</small></span></a></li>
   <li><a class="navlink tool" href="#verbi" ${route.type==='verbi'?'aria-current="page"':''}><span class="n">→</span><span class="t">Coniugatore<br><small class="note">cerca qualsiasi verbo · tutti i tempi</small></span></a></li>
   <li><a class="navlink tool" href="#frasi" ${route.type==='frasi'?'aria-current="page"':''}><span class="n">¶</span><span class="t">Laboratorio di frasi<br><small class="note">${TRAD.length} traduzioni · ${TRASF.length} trasformazioni</small></span></a></li>
  </ul></div><p class="syncline" id="syncline">${syncText()}</p>`;
  nav.innerHTML=h;
  updRhythm();
}
function route(){
  const h=decodeURIComponent(location.hash.slice(1));
  let m;
  if((m=h.match(/^unita-(\d+)$/)) && UNITS.find(u=>u.id==m[1])) return {type:'unit',id:+m[1]};
  if(h==='falsi-amici') return {type:'falsi'};
  if(h==='verbi') return {type:'verbi'};
  if((m=h.match(/^verbo-([a-zàèéìòù']+)$/))) return {type:'verbi',q:m[1]};
  if(h==='frasi') return {type:'frasi'};
  if(h==='ripasso') return {type:'ripasso'};
  if(h==='misto') return {type:'misto'};
  if(h==='diario') return {type:'diario'};
  if(h==='lessico') return {type:'lessico'};
  if(h==='cultura') return {type:'cultura'};
  if(h==='leggere') return {type:'leggere'};
  if((m=h.match(/^leggere-(\d+)$/)) && TESTI[+m[1]]) return {type:'leggere',id:+m[1]};
  if(h==='ascolto') return {type:'ascolto'};
  if((m=h.match(/^ascolto-(\d+)$/)) && ASCOLTI[+m[1]]) return {type:'ascolto',id:+m[1]};
  if(h==='parlare') return {type:'parlare'};
  if(h==='fuori') return {type:'fuori'};
  if(h==='piano') return {type:'piano'};
  if(h==='racconto') return {type:'racconto'};
  if((m=h.match(/^racconto-(\d+)$/)) && STORIA[+m[1]]) return {type:'racconto',id:+m[1]};
  if(h==='schede') return {type:'scheda'};
  if((m=h.match(/^scheda-(\d+)$/)) && SCHEDE[+m[1]] && UNITS.find(u=>u.id==m[1])) return {type:'scheda',id:+m[1]};
  if((m=h.match(/^cultura-(\d+)$/)) && CULTURA[+m[1]]) return {type:'cultura',id:+m[1]};
  if((m=h.match(/^lessico-(\d+)$/)) && LESSICO[+m[1]]) return {type:'lessico',id:+m[1]};
  if((m=h.match(/^verifica-(\d+)$/)) && TESTS.find(t=>t.id==m[1])) return {type:'test',id:+m[1]};
  return {type:'home'};
}
function render(){
  const r=route();
  stopTestTimer(); stopSpeak(); stopOral();
  try{ memSync(); }catch(e){}
  try{ autoAhead(); }catch(e){}
  renderNav(r);
  closeNav();
  if(r.type==='unit') renderUnit(UNITS.find(u=>u.id===r.id));
  else if(r.type==='falsi') renderFalsi();
  else if(r.type==='verbi') renderVerbi(r.q);
  else if(r.type==='frasi') renderLab();
  else if(r.type==='ripasso') renderRipasso();
  else if(r.type==='misto') renderMisto();
  else if(r.type==='diario') renderDiario();
  else if(r.type==='lessico') renderLessico(r.id);
  else if(r.type==='cultura') renderCultura(r.id);
  else if(r.type==='leggere') renderLeggere(r.id);
  else if(r.type==='ascolto') renderAscolto(r.id);
  else if(r.type==='parlare') renderParlare();
  else if(r.type==='fuori') renderFuori();
  else if(r.type==='piano') renderPiano();
  else if(r.type==='racconto') renderRacconto(r.id);
  else if(r.type==='scheda') renderScheda(r.id);
  else if(r.type==='test') renderTest(r.id);
  else renderHome();
  window.scrollTo(0,0);
}
function openNav(){ $('#nav').classList.add('open'); $('#scrim').classList.add('open'); $('#menuBtn').setAttribute('aria-expanded','true'); }
function closeNav(){ $('#nav').classList.remove('open'); $('#scrim').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded','false'); }
$('#menuBtn').addEventListener('click',()=>$('#nav').classList.contains('open')?closeNav():openNav());
$('#scrim').addEventListener('click',closeNav);
window.addEventListener('hashchange',render);

/* ---------- HOME ---------- */
function renderHome(){
  const total=UNITS.reduce((a,u)=>a+uPct(u),0)/UNITS.length;
  const doneU=UNITS.filter(u=>uPct(u)===100).length;
  const next=UNITS.find(u=>uPct(u)<100)||UNITS[0];
  const exDone=Object.keys(S.ex).length;
  let h=`<section class="hero">
   <div class="eyebrow">Corso intensivo · scrittura, lettura, grammatica</div>
   <h1>Dall'A1 al C1, partendo da <em>quello che sai già.</em></h1>
   <p class="lead">Chi parla spagnolo e portoghese conosce già metà dell'italiano. Questo quaderno va dritto all'altra metà: le strutture in cui le tre lingue si separano, con tanti esercizi, letture vere e testi corretti.</p>
   <p class="note">Se parti da zero, comincia dai <a href="#unita-101">Primi passi</a> (livello A1): nove unità con spiegazioni in portoghese e consegne bilingui. Poi passa all'unità 1.</p>
   <div class="stats">
     <div class="stat"><b>${Math.round(total)}%</b><span>del percorso</span></div>
     <div class="stat"><b>${doneU}/${UNITS.length}</b><span>unità completate</span></div>
     <div class="stat"><b>${exDone}</b><span>serie di esercizi</span></div>
     <div class="stat"><b>${S.verbi.best||0}</b><span>record coniugatore</span></div>
   </div>
   <div class="btnrow" style="margin-top:20px"><a class="btn primary" href="#unita-${next.id}">${uPct(next)>0?'Continua':'Comincia'}: ${uName(next)} →</a><a class="btn" href="#verbi">Allena i verbi</a><a class="btn" href="#frasi">Laboratorio di frasi</a></div>
  </section>`;
  h+=homeRhythm();
  h+=`<h2 class="sec">Il percorso</h2><div class="levelmap">`;
  BANDS.forEach((b,bi)=>{
    const us=UNITS.filter(u=>u.band===bi);
    const desc=['Primi passi: suoni, essere e avere, presente, numeri, città, gusti','Basi solide: le strutture che spagnolo e portoghese non hanno','Congiuntivo, imperativo e ipotesi: il salto verso il B2','Relativi, reggenze, causativo e registro formale: verso il C1'][bi];
    h+=`<div class="lv"><b>${b}</b><small>${desc}</small><div class="units">${us.map(u=>{const p=uPct(u);return `<a href="#unita-${u.id}" class="${p===100?'full':p>0?'part':''}" title="${esc(u.title)} · ${p}%">${uNum(u)}</a>`}).join('')}</div></div>`;
  });
  h+=`</div>
  <div class="cols3">
   <div class="card"><div class="card-h"><span class="lab">1 · Contrasto</span></div><h3>Solo ciò che è diverso</h3><p>Ogni lezione confronta italiano, spagnolo e portoghese e segna in rosso le trappole tipiche di chi parla già le due lingue. Le spiegazioni restano in portoghese per rendere chiari i confronti.</p></div>
   <div class="card"><div class="card-h"><span class="lab">2 · Quantità</span></div><h3>Esercizi fino all'automatismo</h3><p>Quattro serie per unità (compresa la ricostruzione di frasi), un laboratorio di traduzione e trasformazione, ${Object.keys(VERBI).length} verbi nel coniugatore e un pulsante che genera esercizi nuovi quando vuoi.</p></div>
   <div class="card"><div class="card-h"><span class="lab">3 · Produzione</span></div><h3>Scrivere ed essere corretta</h3><p>Un compito di scrittura per unità, con obiettivi grammaticali controllati mentre scrivi e una correzione dettagliata con la penna rossa.</p></div>
  </div>
  ${(()=>{ const nx=STORIA.findIndex((_,i)=>!storyRead(i)), done=STORIA.filter((_,i)=>storyRead(i)).length; return `<a class="story-banner" href="#racconto${nx>=0?'-'+nx:''}"><span class="lab">Il racconto · ${done}/${STORIA.length} capitoli</span><b>La lettera di Anna</b><span>Una lettera del 1925, una chiave arrugginita, un segreto di famiglia. Un capitolo per ogni unità, dall'A1 al C1.</span><em>${nx<0?'Rileggi la storia':nx===0?'Comincia il capitolo 1':'Continua: capitolo '+(nx+1)} →</em></a>`; })()}
  <h2 class="sec">Ascoltare e parlare</h2>
  <div class="cols4">
   <a class="card lexcard" href="#leggere"><span class="lab">Pronuncia e fluidità</span><h3>Leggere ad alta voce</h3><span class="note">${TESTI.length} testi, shadowing e cronometro delle parole al minuto.</span></a>
   <a class="card lexcard" href="#ascolto"><span class="lab">Orecchio</span><h3>Ascolto</h3><span class="note">Dettati per livello, ${ASCOLTI.length} dialoghi e annunci, numeri e orari.</span></a>
   <a class="card lexcard" href="#parlare"><span class="lab">Conversazione</span><h3>Parlare</h3><span class="note">${ROLEPLAY.length} situazioni con l'IA, frasi utili, simulazione della prova orale.</span></a>
   <a class="card lexcard" href="#fuori"><span class="lab">Corso, video, libri</span><h3>Fuori dal quaderno</h3><span class="note">Le tue parole, il registro di studio, il racconto di ciò che leggi.</span></a>
  </div>
  ${homeCultura()}
  <h2 class="sec">Come funziona il piano</h2>
  <p>Il quaderno ti prepara un <a href="#piano">calendario reale</a>: 20–30 minuti al giorno, con le lezioni del corso il martedì e il giovedì, la domenica libera e la pausa per le feste. Ogni giorno vedi che cosa fare; le attività si spuntano da sole quando le completi. Se salti qualche giorno, premi «Ripianifica da oggi» e il piano si adatta.</p>
  <div class="tw"><table class="tbl plan">
   <tr><th>giorno</th><th>che cosa fai</th><th>tempo</th></tr>
   <tr><td>lun · mer · ven · sab</td><td>5 minuti di ripasso degli errori + i passi dell'unità (lezione, esercizi, lettura, racconto, parla e ascolta, scrittura)</td><td>25 min</td></tr>
   <tr><td>mar · gio</td><td>Prima del corso: scheda riassuntiva · ripasso degli errori · un piccolo passo dell'unità · dopo il corso: registra la lezione e le parole nuove</td><td>20–25 min</td></tr>
   <tr><td>domenica</td><td>Libera (facoltativo: un video, una canzone, il tuo libro)</td><td>—</td></tr>
  </table></div>
  <h3>Lettura estensiva, in ordine di difficoltà</h3>
  <ul class="dots">
   <li><b>Settimane 1–4:</b> notizie brevi del <i>Post</i> (lingua chiara e attuale) e i racconti di Italo Calvino, <i>Marcovaldo</i>.</li>
   <li><b>Settimane 5–8:</b> Natalia Ginzburg, <i>Lessico famigliare</i>; articoli di <i>Internazionale</i>.</li>
   <li><b>Settimane 9–12:</b> Elena Ferrante, <i>L'amica geniale</i>; Primo Levi, <i>Il sistema periodico</i>.</li>
   <li><b>Settimane 13–16:</b> Italo Calvino, <i>Le città invisibili</i>; editoriali e articoli d'opinione dei quotidiani nazionali.</li>
  </ul>
  <p class="note">Per certificare il livello, gli esami CILS, CELI e PLIDA valutano anche il parlato e l'ascolto; questo quaderno copre lettura, scrittura e grammatica.</p>`;
  $('#main').innerHTML=h;
  bindHome();
}

/* ---------- UNIDADE ---------- */
const TABS=[['lezione','Lezione'],['lettura','Lettura'],['esercizi','Esercizi'],['scrittura','Scrittura'],['parla','Parla e ascolta']];
function renderUnit(u){
  const tab=S.tab[u.id]||'lezione';
  const p=uPct(u);
  const parts=uParts(u);
  const tabDone={lezione:parts[0],lettura:parts[1],esercizi:u.ex.every((_,i)=>S.ex[u.id+'-'+i]),scrittura:!!(S.write[u.id]&&S.write[u.id].done),parla:!!(S.spk[u.id]&&S.spk[u.id].done)};
  let h=`<header class="uhead"><div class="eyebrow">${u.n?'Primi passi · '+u.n:'Unità '+String(u.id).padStart(2,'0')} · ${u.lvl}</div>
   <h1 class="title">${esc(u.title)}</h1><p class="subtitle">${esc(u.sub)}</p>
   ${u.band<=1?langSwitch():''}
   <div class="uprog"><span class="track"><i style="width:${p}%"></i></span><span>${p}% completato</span></div>
   <div class="btnrow ulinks">${SCHEDE[u.id]?`<a class="btn" href="#scheda-${u.id}">Scheda riassuntiva</a>`:''}${chapterOfUnit(u.id)>=0?`<a class="btn" href="#racconto-${chapterOfUnit(u.id)}">Racconto · cap. ${chapterOfUnit(u.id)+1}${storyRead(chapterOfUnit(u.id))?' ✓':''}</a>`:''}</div></header>
   <nav class="tabs" role="tablist">${TABS.map(([k,l])=>`<button role="tab" data-tab="${k}" aria-selected="${k===tab}">${l}${tabDone[k]?'<span class="tick">✓</span>':''}</button>`).join('')}</nav>
   <div id="tabc"></div>
   ${(()=>{ const t=TESTS.find(x=>x.units[1]===u.id); return t?`<div class="callout"><span class="pen">Fine del blocco!</span> Hai finito le unità ${tRange(t)}? Mettiti alla prova con la <a href="#verifica-${t.id}">${t.title}</a> (livello ${t.lvl}, 30 minuti).</div>`:''; })()}
   <div class="btnrow" style="justify-content:space-between;margin-top:34px">
    ${(()=>{ const i=UNITS.indexOf(u), p=UNITS[i-1]; return p?`<a class="btn ghost" href="#unita-${p.id}">← ${uName(p)}</a>`:'<span></span>'; })()}
    ${(()=>{ const i=UNITS.indexOf(u), n=UNITS[i+1]; return n?`<a class="btn ghost" href="#unita-${n.id}">${uName(n)} →</a>`:'<a class="btn ghost" href="#verbi">Coniugatore →</a>'; })()}
   </div>`;
  $('#main').innerHTML=h;
  bindLangSwitch($('.uhead'),()=>renderUnit(u));
  $('#main').querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{ S.tab[u.id]=b.dataset.tab; save(); renderUnit(u); $('.tabs').scrollIntoView({block:'start'}); }));
  const c=$('#tabc');
  if(tab==='lezione') tabLesson(u,c);
  else if(tab==='lettura') tabReading(u,c);
  else if(tab==='esercizi') tabEx(u,c);
  else if(tab==='parla') tabParla(u,c);
  else tabWrite(u,c);
}
function refreshProgress(u){
  renderNav(route());
  const p=uPct(u);
  const tr=$('.uprog'); if(tr){ tr.querySelector('i').style.width=p+'%'; tr.lastElementChild.textContent=p+'% completato'; }
}
function goTab(u,t){ S.tab[u.id]=t; save(); renderUnit(u); $('.tabs').scrollIntoView({block:'start'}); }

/* lição */
function tabLesson(u,c){
  const d=!!S.lesson[u.id];
  c.innerHTML=`${ricordiHTML(u)}<div class="lesson">${u.lesson}</div>
   <div class="done-row">${SCHEDE[u.id]?`<a class="btn" href="#scheda-${u.id}">Ripassa in 2 minuti: scheda riassuntiva</a>`:''}<button class="btn ${d?'':'primary'}" id="ldone">${d?'✓ Lezione studiata':'Segna come studiata'}</button>
   <button class="btn" id="lnext">Vai alla lettura →</button></div>`;
  $('#ldone').onclick=()=>{ S.lesson[u.id]=!S.lesson[u.id]; save(); tabLesson(u,c); refreshProgress(u); };
  bindRicordi(u);
  $('#lnext').onclick=()=>{ if(!S.lesson[u.id]){S.lesson[u.id]=true;save();} goTab(u,'lettura'); };
}

/* leitura */
function gloss(t){ return t.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g,(m,a,b)=>`<span class="g" tabindex="0" data-t="${esc(b)}">${a}</span>`); }
function tabReading(u,c){
  const R=u.reading;
  c.innerHTML=`<article class="reading" id="readart"><h2>${esc(R.title)}</h2>${speakBtnHTML('rspeak')}${gloss(R.text)}</article>
   <p class="note">Parole sottolineate con i puntini: passa il mouse o toccale per vedere la traduzione.</p>
   <section class="card" style="margin-top:24px"><div class="card-h"><div><span class="lab">Comprensione</span><h3>Domande sul testo</h3></div><span class="score" id="rscore"></span></div>
   <ol class="items" id="rq"></ol><div class="btnrow"><button class="btn" id="rreset">Rifai</button></div></section>
   ${storyCard(u)}`;
  mcList($('#rq'),R.q,(score,tot)=>{ S.read[u.id]={s:score,t:tot}; save(); showScore($('#rscore'),score,tot); refreshProgress(u); }, i=>['u'+u.id+'-r-'+i,'mc',{q:R.q[i][0],o:R.q[i][1],c:R.q[i][2],e:R.q[i][3]||''},uName(u)+' · lettura']);
  if(S.read[u.id]) showScore($('#rscore'),S.read[u.id].s,S.read[u.id].t);
  bindSpeak('rspeak',()=>textOf($('#readart'),'h2,.speak'));
  $('#rreset').onclick=()=>tabReading(u,c);
}
function showScore(el,s,t){ el.textContent=s+'/'+t; el.classList.toggle('good',s/t>=.8); }

/* múltipla escolha */
function mcList(ol,items,onDone,errFn){
  let answered=0,score=0;
  ol.innerHTML=items.map((it,i)=>`<li><div><div class="q">${esc(it[0])}</div><div class="opts">${it[1].map((o,j)=>`<button class="opt" data-i="${i}" data-j="${j}">${esc(o)}</button>`).join('')}</div><div class="expl" hidden></div></div></li>`).join('');
  ol.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>{
    const i=+b.dataset.i,j=+b.dataset.j,it=items[i];
    const li=ol.children[i];
    li.querySelectorAll('.opt').forEach((x,k)=>{ x.disabled=true; if(k===it[2]) x.classList.add('ok'); });
    if(j!==it[2]){ b.classList.add('no'); if(errFn){ const e=errFn(i); if(e) addErr(...e); } } else score++;
    tick();
    const ex=li.querySelector('.expl');
    const mark = j===it[2]?'<span class="mark ok">giusto!</span>':'<span class="mark no">no…</span>';
    ex.innerHTML=mark+(it[3]?' '+esc(it[3]):''); ex.hidden=false;
    if(++answered===items.length) onDone(score,items.length);
  }));
}

/* exercícios */
const TYPE_LAB={fill:'Completa',mc:'Scelta multipla',fix:'Correggi',order:'Riordina'};
function tabEx(u,c){
  c.innerHTML=`<p class="note" style="margin-bottom:18px">Scrivi e premi <b>Invio</b> per andare avanti. «Correggi» controlla tutta la serie; gli accenti dimenticati diventano gialli.</p><div id="sets"></div>
   <section class="card" id="gencard"><div class="card-h"><div><span class="lab">Esercizi extra</span><h3>Altri esercizi su questa unità</h3></div></div>
   <p>Genera 6 frasi nuove su <i>${esc(u.title.toLowerCase())}</i>, pensate per le trappole di chi parla spagnolo e portoghese. Puoi ripetere tutte le volte che vuoi.</p>
   <div class="btnrow"><button class="btn red" id="genbtn">Genera 6 esercizi nuovi</button><span class="note" id="genmsg"></span></div>
   <div id="gensets"></div></section>`;
  const box=$('#sets');
  u.ex.forEach((set,i)=>{
    const sec=document.createElement('section'); sec.className='card'; box.appendChild(sec);
    buildSet(sec,set,String.fromCharCode(65+i),u.id+'-'+i,()=>refreshProgress(u),uName(u)+' · serie '+String.fromCharCode(65+i));
  });
  (S.gen[u.id]||[]).forEach((set,k)=>addGenSet(u,set,k));
  $('#genbtn').onclick=()=>generate(u);
}
function addGenSet(u,set,k){
  const sec=document.createElement('div'); sec.style.marginTop='18px';
  $('#gensets').prepend(sec);
  const inner=document.createElement('section'); inner.className='card'; inner.style.boxShadow='none'; sec.appendChild(inner);
  buildSet(inner,{t:'fill',title:'Generati · serie '+(k+1),items:set},'IA',null,null,uName(u)+' · esercizi generati');
}
function buildSet(sec,set,letter,key,onSave,src){
  const ekey=i=>(key||('g'+hashStr(set.items[i][0])))+'-'+i;
  const prev=key&&S.ex[key];
  sec.innerHTML=`<div class="card-h"><div><span class="lab">${letter} · ${TYPE_LAB[set.t]}</span><h3>${esc(set.title)}</h3></div><span class="score">${prev?prev.s+'/'+prev.t:''}</span></div><ol class="items"></ol>
   ${set.t!=='mc'?'<div class="btnrow"><button class="btn primary" data-a="check">Correggi</button><button class="btn" data-a="show">Mostra le soluzioni</button><button class="btn" data-a="reset">Rifai</button></div>':'<div class="btnrow"><button class="btn" data-a="reset">Rifai</button></div>'}`;
  if(prev) showScore(sec.querySelector('.score'),prev.s,prev.t);
  const ol=sec.querySelector('.items');
  const record=(s,t)=>{ showScore(sec.querySelector('.score'),s,t); if(key){ S.ex[key]={s,t}; save(); onSave&&onSave(); } };
  sec.querySelector('[data-a="reset"]').onclick=()=>buildSet(sec,set,letter,key,onSave,src);
  if(set.t==='mc'){ mcList(ol,set.items,record,i=>{ const it=set.items[i]; return [ekey(i),'mc',{q:it[0],o:it[1],c:it[2],e:it[3]||''},src]; }); return; }
  if(set.t==='order'){ orderList(ol,set.items,sec,record,ekey,src); return; }

  ol.innerHTML=set.items.map((it,i)=>{
    if(set.t==='fill'){
      const multi=Array.isArray(it[1][0]);
      const answers=multi?it[1]:[it[1]];
      let txt=it[0], hint='';
      const m=txt.match(/\s*(\([^()]*\))\s*$/); if(m){ hint=m[1]; txt=txt.slice(0,m.index); }
      let bi=0;
      const html=esc(txt).replace(/___/g,()=>{ const a=answers[bi]||['']; const w=Math.max(4,...a.map(x=>x.length))+2; return `<input class="blank" data-b="${bi++}" style="width:${w}ch" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="lacuna">`; });
      return `<li><div><div class="sent">${html}${hint?`<span class="hint">${esc(hint)}</span>`:''}<span class="fb"></span></div><div class="expl" hidden></div></div></li>`;
    } else {
      const html=esc(it[0]).replace(/\{([^}]*)\}/,'<span class="err">$1</span>');
      const w=Math.max(10,...it[1].map(x=>x.length))+2;
      return `<li><div><div class="sent">${html}</div><div class="fixline">Correzione: <input class="blank" data-b="0" style="width:${w}ch" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="correzione"><span class="fb"></span></div><div class="corrected" hidden></div></div></li>`;
    }
  }).join('');

  const inputs=[...ol.querySelectorAll('.blank')];
  inputs.forEach((inp,k)=>inp.addEventListener('keydown',e=>{
    if(e.key==='Enter'){ e.preventDefault(); const li=inp.closest('li'); const idx=[...ol.children].indexOf(li);
      const rowInputs=[...li.querySelectorAll('.blank')];
      if(inp===rowInputs[rowInputs.length-1]) checkRow(idx);
      const nx=inputs[k+1]; if(nx) nx.focus(); }
  }));
  const results=new Array(set.items.length).fill(null);
  function answersOf(i){ const it=set.items[i]; if(set.t==='fix') return [it[1]]; return Array.isArray(it[1][0])?it[1]:[it[1]]; }
  function checkRow(i,reveal){
    const li=ol.children[i], it=set.items[i], ans=answersOf(i);
    let rowOk=true; const notes=[];
    li.querySelectorAll('.blank').forEach(inp=>{
      const b=+inp.dataset.b; const r=judge(inp.value,ans[b]);
      inp.classList.remove('ok','no','acc');
      if(reveal && r!=='ok'){ inp.value=ans[b][0]; inp.classList.add('acc'); rowOk=false; return; }
      inp.classList.add(r);
      if(r!=='ok') rowOk=false;
      if(r==='no') notes.push(ans[b][0]);
      if(r==='acc') notes.push('accento: '+ans[b][0]);
    });
    const fb=li.querySelector('.fb');
    fb.innerHTML = reveal ? '' : (rowOk?'<span class="mark ok">✓</span>':`<span class="mark ${notes.every(n=>n.startsWith('accento'))?'acc':'no'}">${esc(notes.join(' · '))}</span>`);
    if(set.t==='fill' && it[2]){ const ex=li.querySelector('.expl'); ex.textContent=it[2]; ex.hidden=false; }
    if(set.t==='fix'){ const co=li.querySelector('.corrected'); co.textContent='✓ '+it[2]; co.hidden=false; }
    const tried=[...li.querySelectorAll('.blank')].some(x=>x.value.trim());
    if(!reveal && tried && results[i]===null) tick();
    if(!reveal && tried && !rowOk) addErr(ekey(i), set.t==='fix'?'fix':'fill', set.t==='fix'?{p:it[0],a:it[1],c:it[2]}:{p:it[0],a:it[1],e:it[2]||''}, src);
    results[i]= reveal?false:rowOk;
    if(results.every(r=>r!==null) && !reveal) record(results.filter(Boolean).length,results.length);
    return rowOk;
  }
  sec.querySelector('[data-a="check"]').onclick=()=>{ set.items.forEach((_,i)=>checkRow(i)); };
  sec.querySelector('[data-a="show"]').onclick=()=>{ set.items.forEach((_,i)=>{ if(results[i]!==true) checkRow(i,true); }); };
}

/* ---------- IA ---------- */
let samplePromise=null;
function getSample(){
  if(!samplePromise) samplePromise = (async()=>{ try{ return (window.claude&&window.claude.use) ? await window.claude.use('sample') : null; }catch(e){ return null; } })();
  return samplePromise;
}
const ERR={not_granted:'Non hai autorizzato Claude su questa pagina.',sampling_disabled:'Claude non è disponibile per questo account.',rate_limited:'Troppe richieste di seguito. Aspetta qualche minuto e riprova.',session_expired:'La sessione è scaduta: accedi di nuovo a Claude.',refused:'La richiesta è stata rifiutata. Prova a riformulare il testo.',invalid_json:'La risposta è arrivata in un formato inatteso. Riprova.'};
const errMsg=e=>ERR[e&&e.code]||'Non è stato possibile completare la richiesta. Riprova tra poco.';

async function generate(u){
  const btn=$('#genbtn'), msg=$('#genmsg');
  btn.disabled=true; msg.textContent='Preparo le frasi…';
  const sample=await getSample();
  if(!sample){ msg.textContent='La generazione automatica funziona solo con la pagina aperta dentro Claude.'; btn.disabled=false; return; }
  const prompt=`Sei un insegnante d'italiano esperto. Crea 6 esercizi di completamento NUOVI e vari sul tema: ${u.focus}. Livello ${u.lvl}.
La studentessa è madrelingua portoghese (Brasile) e parla spagnolo fluentemente: almeno 3 frasi devono colpire errori tipici di ispanofoni/lusofoni su questo tema.
Regole: ogni frase in italiano naturale e moderno, ${u.band===0?'5-12 parole, con lessico molto semplice di livello A1':'8-20 parole'}; contiene esattamente UNA lacuna scritta "___"; dopo la frase, tra parentesi, il suggerimento (es. il verbo all'infinito e la persona). "risposte" elenca tutte le soluzioni corrette accettabili (minuscole, senza punteggiatura). "spiegazione" in ${aiLang(u)==='pt'?'portoghese':'italiano semplice'}, massimo 20 parole.
Rispondi solo con un array JSON: [{"frase":"Penso che Marco ___ ragione. (avere)","risposte":["abbia"],"spiegazione":"${({pt:'Verbo de opinião pede congiuntivo.',es:'Un verbo de opinión pide congiuntivo.',it:'Dopo un verbo di opinione serve il congiuntivo.'})[aiLang(u)]}"}]`;
  try{
    const data=await sample.json(prompt,{cache:false});
    const items=(Array.isArray(data)?data:[]).filter(x=>x&&typeof x.frase==='string'&&(x.frase.match(/___/g)||[]).length===1&&Array.isArray(x.risposte)&&x.risposte.length)
      .map(x=>[x.frase,x.risposte.map(String),x.spiegazione?String(x.spiegazione):'']);
    if(!items.length) throw {code:'invalid_json'};
    S.gen[u.id]=(S.gen[u.id]||[]).concat([items]).slice(-5); save();
    addGenSet(u,items,S.gen[u.id].length-1);
    msg.textContent='Fatto: la nuova serie è qui sotto.';
  }catch(e){ msg.textContent=errMsg(e); }
  btn.disabled=false;
}

/* ---------- escrita ---------- */
function md(t){
  const lines=esc(t).split('\n'); let out='', list=null;
  const inline=s=>s.replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/~~([^~]+)~~/g,'<del>$1</del>').replace(/(^|\s)_([^_]+)_/g,'$1<i>$2</i>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g,'$1<i>$2</i>');
  const close=()=>{ if(list){ out+=`</${list}>`; list=null; } };
  lines.forEach(l=>{
    let m;
    const fake=l.match(/~~([^~]+)~~\s*(?:→|-&gt;|->)\s*\*\*([^*]+)\*\*/);
    if(fake && canon(fake[1].replace(/&#39;|&apos;/g,"'"))===canon(fake[2].replace(/&#39;|&apos;/g,"'"))) return;
    if((m=l.match(/^#{1,4}\s+(.*)/))){ close(); out+=`<h4>${inline(m[1])}</h4>`; }
    else if((m=l.match(/^\s*[-*•]\s+(.*)/))){ if(list!=='ul'){close(); out+='<ul>'; list='ul';} out+=`<li>${inline(m[1])}</li>`; }
    else if((m=l.match(/^\s*\d+[.)]\s+(.*)/))){ if(list!=='ol'){close(); out+='<ol>'; list='ol';} out+=`<li>${inline(m[1])}</li>`; }
    else if(l.trim()===''){ close(); }
    else { close(); out+=`<p>${inline(l)}</p>`; }
  });
  close(); return out;
}
function aiLang(u){ if(['pt','it','es'].includes(S.aiLang)) return S.aiLang; const low=!u||u.band<=1; return low?((S.expLang||'es')==='es'?'es':'pt'):'it'; }
const LNAME={pt:'portoghese',es:'spagnolo di Spagna',it:'italiano semplice'};
const lname=(u,up)=>{ const n=LNAME[aiLang(u)]; return up?n.toUpperCase():n; };
function corrPrompt(u,text){
  const lvl=u.lvl.split('→').pop().trim();
  const head=`Sei un'insegnante d'italiano esigente ma incoraggiante. Correggi il testo di una studentessa madrelingua portoghese (Brasile) che parla spagnolo fluentemente e sta studiando per arrivare al livello ${lvl}.
Tema grammaticale dell'unità: ${u.focus}.
Consegna: ${u.write.task}
`;
  const body = aiLang(u)==='es' ? `
Rispondi IN SPAGNOLO DI SPAGNA (gli esempi in italiano), con esattamente queste sezioni in markdown:
## Valoración general
Nivel MCER estimado del texto, 2-3 frases sobre puntos fuertes y débiles, y si se han usado la consigna y las estructuras de la unidad.
## Lo que has hecho bien
2 o 3 puntos concretos del texto que son correctos y están bien usados (aquí, y solo aquí, van los aciertos).
## Errores
Lista con cada error en el formato: ~~incorrecto~~ → **correcto**: explicación breve. Marca [ES] o [PT] cuando sea una interferencia de esas lenguas. Agrupa por tipo (gramática, vocabulario, ortografía/tildes). Incluye SOLO errores reales: si la forma original ya es correcta, no la pongas en esta lista.
## Texto corregido
El texto entero corregido, cambiando lo mínimo posible.
## Para sonar más italiana
3 sugerencias de expresiones o estructuras más naturales, con el fragmento original y la versión mejorada.
## Ejercicio personalizado
3 frases para completar basadas en sus errores (con ___), y las soluciones al final.
` : aiLang(u)==='pt' ? `
Rispondi IN PORTOGHESE (gli esempi in italiano), con esattamente queste sezioni in markdown:
## Avaliação geral
Nível CEFR estimado do texto, 2-3 frases sobre pontos fortes e fracos, e se a consigna e as estruturas da unidade foram usadas.
## O que você acertou
2 ou 3 pontos concretos do texto que estão corretos e bem usados (é aqui, e só aqui, que vão os acertos).
## Erros
Lista com cada erro no formato: ~~errado~~ → **certo**: explicação curta. Marque [ES] ou [PT] quando for interferência dessas línguas. Agrupe por tipo (gramática, vocabulário, ortografia/acentos). Inclua SOMENTE erros reais. Antes de listar um item, confira se a forma original está mesmo errada: se estiver correta (inclusive variantes aceitas, como «un po' d'italiano» / «un po' di italiano»), NÃO a liste. Nunca risque com ~~ ~~ algo que está correto e nunca escreva «correto ✔» dentro desta seção. Omita as categorias sem erros. Se não houver nenhum erro, escreva apenas: «Nenhum erro. Brava!».
## Texto corrigido
O texto inteiro corrigido, mudando o mínimo possível.
## Para soar mais italiano
3 sugestões de expressões ou estruturas mais naturais, com o trecho original e a versão melhorada.
## Exercício personalizado
3 frases para completar baseadas nos erros dela (com ___), e as soluções no fim.
` : `
Rispondi IN ITALIANO, con frasi chiare adatte al livello ${lvl} (se una spiegazione è difficile, puoi aggiungere tra parentesi una parola in portoghese), con esattamente queste sezioni in markdown:
## Valutazione generale
Livello QCER stimato del testo, 2-3 frasi su punti di forza e di debolezza, e se la consegna e le strutture dell'unità sono state usate.
## Che cosa hai fatto bene
2 o 3 punti concreti del testo che sono corretti e ben usati (è qui, e solo qui, che vanno le cose giuste).
## Errori
Elenco di ogni errore nel formato: ~~sbagliato~~ → **giusto**: spiegazione breve. Segna [ES] o [PT] quando è un'interferenza di queste lingue. Raggruppa per tipo (grammatica, lessico, ortografia/accenti). Inserisci SOLO errori veri. Prima di elencare un elemento, verifica che la forma originale sia davvero sbagliata: se è corretta (anche varianti accettate, come «un po' d'italiano» / «un po' di italiano»), NON inserirla. Non barrare mai con ~~ ~~ qualcosa di corretto e non scrivere «corretto ✔» in questa sezione. Ometti le categorie senza errori. Se non ci sono errori, scrivi soltanto: «Nessun errore. Brava!».
## Testo corretto
Il testo intero corretto, cambiando il meno possibile.
## Per suonare più italiana
3 suggerimenti di espressioni o strutture più naturali, con il passaggio originale e la versione migliorata.
## Esercizio personalizzato
3 frasi da completare basate sui suoi errori (con ___) e le soluzioni alla fine.
`;
  return head+body+`
TESTO DELLA STUDENTESSA:
"""
${text}
"""`;
}
function tabWrite(u,c){
  const W=u.write; const st=S.write[u.id]||{text:'',done:false};
  c.innerHTML=`<div class="card" style="background:var(--blu-soft);border-color:transparent;box-shadow:none"><span class="lab note">Consegna · ${W.words[0]}–${W.words[1]} parole</span><p class="task" style="margin:6px 0 0">${esc(W.task)}</p></div>
   <div class="write-grid">
    <div><textarea class="paper" id="wtext" placeholder="Scrivi qui il tuo testo…" spellcheck="false" lang="it">${esc(st.text||'')}</textarea>
     <p class="wc" id="wc"></p>
     <div class="btnrow" style="margin-top:12px"><button class="btn red" id="wcorr">Correggi con la penna rossa</button><button class="btn" id="wmodel">Vedi il testo modello</button><button class="btn" id="wdone"></button></div>
    </div>
    <aside class="side"><h4>Obiettivi del compito</h4><ul class="checklist" id="wtargets"></ul><p class="note" style="margin:0">Gli obiettivi si contano da soli mentre scrivi (alcuni sono stime). Quelli «da confermare» spuntali tu.</p><h4>Correzione in</h4><div class="seg" id="ailang" style="margin:0"><button data-l="it" aria-pressed="${aiLang(u)==='it'}">italiano</button><button data-l="es" aria-pressed="${aiLang(u)==='es'}">spagnolo</button><button data-l="pt" aria-pressed="${aiLang(u)==='pt'}">portoghese</button></div></aside>
   </div>
   <div id="wmodelbox" hidden><div class="model">${esc(W.model)}</div></div>
   <div id="wout"></div>`;
  const ta=$('#wtext');
  const manual=st.manual||{};
  function upd(){
    const t=ta.value; const n=t.trim()?t.trim().split(/\s+/).length:0;
    $('#wc').innerHTML=`<b>${n}</b> parole · obiettivo ${W.words[0]}–${W.words[1]}${n>=W.words[0]?' <span class="mark ok">✓</span>':''}`;
    $('#wtargets').innerHTML=W.targets.map((tg,i)=>{
      if(tg.manual){ const on=!!manual[i]; return `<li class="${on?'on':''}"><span class="bx">${on?'✓':'○'}</span><label><input type="checkbox" data-m="${i}" ${on?'checked':''} hidden>${esc(tg.l)} <span class="note">(da confermare)</span></label></li>`; }
      const ms=t.match(rx(tg.re))||[]; const cnt=tg.distinct?new Set(ms.map(x=>x.toLowerCase())).size:ms.length; const on=cnt>=tg.n;
      return `<li class="${on?'on':''}"><span class="bx">${on?'✓':'○'}</span><span>${esc(tg.l)} <span class="note">${cnt}/${tg.n}</span></span></li>`;
    }).join('');
    $('#wtargets').querySelectorAll('[data-m]').forEach(cb=>cb.addEventListener('change',()=>{ manual[cb.dataset.m]=cb.checked; persist(); upd(); }));
  }
  function persist(){ S.write[u.id]=Object.assign(S.write[u.id]||{},{text:ta.value,manual}); save(); }
  function doneBtn(){ const d=S.write[u.id]&&S.write[u.id].done; const b=$('#wdone'); b.textContent=d?'✓ Compito completato':'Segna come completato'; b.classList.toggle('primary',!d); }
  ta.addEventListener('input',()=>{ upd(); persist(); });
  upd(); doneBtn();
  $('#ailang').querySelectorAll('button').forEach(b=>b.onclick=()=>{ S.aiLang=b.dataset.l; save(); $('#ailang').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.l===S.aiLang)); });
  $('#wdone').onclick=()=>{ persist(); S.write[u.id].done=!S.write[u.id].done; save(); doneBtn(); refreshProgress(u); };
  $('#wmodel').onclick=()=>{ const b=$('#wmodelbox'); b.hidden=!b.hidden; $('#wmodel').textContent=b.hidden?'Vedi il testo modello':'Nascondi il testo modello'; };
  if(S.corr[u.id]) $('#wout').innerHTML=`<div class="ai-out"><div class="stamp">Correzione salvata</div>${md(S.corr[u.id])}</div>`;
  $('#wcorr').onclick=async()=>{
    const text=ta.value.trim(); const out=$('#wout');
    if(text.split(/\s+/).length<30){ out.innerHTML=`<div class="ai-out"><p>Scrivi almeno 30 parole prima di chiedere la correzione.</p></div>`; return; }
    const prompt=corrPrompt(u,text);
    const btn=$('#wcorr'); btn.disabled=true;
    out.innerHTML=`<div class="ai-out"><div class="stamp">La professoressa sta leggendo…</div><div id="aibody"></div><div class="btnrow" style="margin-top:10px"><button class="btn" id="aistop">Ferma</button></div></div>`;
    const sample=await getSample();
    if(!sample){
      out.innerHTML=`<div class="ai-out fallback"><p>La correzione automatica funziona solo con la pagina aperta dentro Claude. Copia la richiesta qui sotto e incollala in una conversazione con Claude: contiene già il tuo testo e le istruzioni.</p><textarea readonly id="fbtext">${esc(prompt)}</textarea><div class="btnrow" style="margin-top:8px"><button class="btn" id="fbcopy">Copia la richiesta</button><span class="note" id="fbmsg"></span></div></div>`;
      $('#fbcopy').onclick=()=>{ const tx=$('#fbtext'); navigator.clipboard.writeText(tx.value).then(()=>$('#fbmsg').textContent='Copiata.',()=>{ tx.select(); $('#fbmsg').textContent='Selezionata: usa Ctrl+C / Cmd+C.'; }); };
      btn.disabled=false; return;
    }
    const ctl=new AbortController(); $('#aistop').onclick=()=>ctl.abort();
    try{
      const r=await sample(prompt,{cache:false,signal:ctl.signal,onText:({text})=>{ const b=$('#aibody'); if(b) b.innerHTML=md(text); }});
      S.corr[u.id]=r.text; save();
      out.querySelector('.stamp').textContent='Corretto ✓'; const s=$('#aistop'); s&&s.remove();
      if(r.truncated) out.querySelector('.ai-out').insertAdjacentHTML('beforeend','<p class="note">La risposta è stata tagliata. Prova con un testo un po’ più breve.</p>');
    }catch(e){
      const b=$('#aibody'); if(b) b.innerHTML=e.text?md(e.text):'';
      out.querySelector('.stamp').textContent = e.code==='cancelled'?'Correzione interrotta':errMsg(e);
      const s=$('#aistop'); s&&s.remove();
    }
    btn.disabled=false;
  };
}

/* ---------- FALSI AMICI ---------- */
let falsiMode='cards';
function renderFalsi(){
  let h=`<header class="uhead"><div class="eyebrow">Strumenti · lessico</div><h1 class="title">Falsi amici</h1><p class="subtitle">Parole che sembrano spagnole o portoghesi, ma non lo sono. Gira le carte e poi mettiti alla prova con il quiz.</p></header>
  <div class="seg" role="group"><button data-m="cards" aria-pressed="${falsiMode==='cards'}">Carte</button><button data-m="quiz" aria-pressed="${falsiMode==='quiz'}">Quiz</button></div><div id="fbody"></div>`;
  $('#main').innerHTML=h;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ falsiMode=b.dataset.m; renderFalsi(); });
  const fb=$('#fbody');
  if(falsiMode==='cards'){
    fb.innerHTML=`<div class="fgrid">${FALSI.map((f,i)=>`<button class="flip" data-i="${i}" aria-label="${esc(f[0])}: gira la carta"><div class="in"><div class="f"><b>${esc(f[0])}</b><small>tocca per vedere il significato</small></div><div class="b"><span class="m">${esc(f[1])}</span><span class="tr">≠ ${esc(f[2])}</span><span class="ex">${esc(f[3])}</span></div></div></button>`).join('')}</div>`;
    fb.querySelectorAll('.flip').forEach(b=>b.onclick=()=>b.classList.toggle('on'));
  } else quizFalsi(fb);
}
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function quizFalsi(fb){
  const qs=shuffle(FALSI).slice(0,10).map(f=>{
    const opts=shuffle([f[1],...shuffle(FALSI.filter(x=>x!==f)).slice(0,3).map(x=>x[1])]);
    const q=[`Che cosa significa «${f[0]}»?`,opts,opts.indexOf(f[1]),`Attenzione: ${f[2]}. Es.: ${f[3]}`]; q.w=f[0]; return q;
  });
  fb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">10 domande casuali</span><h3>Quiz dei falsi amici</h3></div><span class="score" id="fscore">${S.falsi.best?'record '+S.falsi.best+'/10':''}</span></div><ol class="items" id="fq"></ol><div class="btnrow"><button class="btn primary" id="fnew">Nuovo quiz</button></div></section>`;
  mcList($('#fq'),qs,(s,t)=>{ S.falsi.best=Math.max(S.falsi.best||0,s); save(); $('#fscore').textContent=s+'/'+t+' · record '+S.falsi.best+'/10'; }, i=>['f-'+qs[i].w,'falso',{w:qs[i].w},'Falsi amici']);
  $('#fnew').onclick=()=>quizFalsi(fb);
}

/* ---------- CONIUGATORE ---------- */
const VKEYS=Object.keys(VERBI).sort((a,b)=>a.localeCompare(b,'it'));
let vSel={tempi:['pres','imp','pp','fut','cond','cong','cimp'],verbi:VKEYS.slice()};
try{ const v=JSON.parse(localStorage.getItem(KEY+'-v2')||'null'); if(v&&v.tempi&&v.verbi&&v.verbi.length) vSel={tempi:v.tempi,verbi:v.verbi.filter(k=>VERBI[k])}; }catch(e){}
let streak=0, cur=null, vMode='cerca', vQuery='', vTab=VKEYS.includes('andare')?'andare':VKEYS[0];
function saveVSel(){ try{localStorage.setItem(KEY+'-v2',JSON.stringify(vSel));}catch(e){} }
function renderVerbi(q){
  if(q){ vMode='cerca'; vQuery=q; }
  if(vMode==='table') vMode='cerca';
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Strumenti · verbi</div><h1 class="title">Coniugatore</h1><p class="subtitle">Cerca qualsiasi verbo e vedi tutti i tempi, con le forme irregolari in evidenza: funziona senza IA e senza consumare niente. Nell'allenamento scrivi la forma e premi Invio; Invio di nuovo passa al verbo successivo.</p></header>
   <div class="seg" role="group"><button data-m="cerca" aria-pressed="${vMode==='cerca'}">Cerca un verbo</button><button data-m="drill" aria-pressed="${vMode==='drill'}">Allenamento</button></div>
   <div id="vbody"></div>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ vMode=b.dataset.m; renderVerbi(); });
  if(vMode==='cerca') return verbSearch();
  $('#vbody').innerHTML=`<section class="card drill" id="drill"></section>
   <section class="card"><div class="card-h"><div><span class="lab">Impostazioni</span><h3>Che cosa allenare</h3></div><span class="note" id="vstats"></span></div>
   <p class="note" style="margin:0 0 6px">Tempi</p><div class="chipsel" id="selT">${Object.entries(TEMPI).map(([k,l])=>`<button data-k="${k}" aria-pressed="${vSel.tempi.includes(k)}">${l}</button>`).join('')}</div>
   <div class="btnrow" style="margin:16px 0 6px"><span class="note">Verbi:</span><button class="btn ghost" data-g="all">tutti</button><button class="btn ghost" data-g="irr">solo irregolari</button><button class="btn ghost" data-g="reg">solo regolari</button></div>
   <div class="chipsel" id="selV">${VKEYS.map(k=>`<button data-k="${k}" aria-pressed="${vSel.verbi.includes(k)}" title="${esc(VERBI[k].pt||'')}">${k}</button>`).join('')}</div>
   <p class="note" style="margin-top:14px">Il passato remoto serve per leggere la letteratura; nel passato prossimo con <i>essere</i> valgono sia il maschile sia il femminile. Le forme alternative (come <i>diedi/detti</i>) sono giuste tutte e due.</p></section>`;
  const sync=()=>{ ['#selT','#selV'].forEach((id,ix)=>$(id).querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',vSel[ix?'verbi':'tempi'].includes(x.dataset.k)))); saveVSel(); nextVerb(); };
  const tog=(id,arr)=>$(id).querySelectorAll('button').forEach(b=>b.onclick=()=>{ const k=b.dataset.k; const i=vSel[arr].indexOf(k); if(i>=0){ if(vSel[arr].length>1) vSel[arr].splice(i,1);} else vSel[arr].push(k); sync(); });
  tog('#selT','tempi'); tog('#selV','verbi');
  $('#vbody').querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{ const g=b.dataset.g; vSel.verbi=VKEYS.filter(k=>g==='all'||VERBI[k].g===g); sync(); });
  nextVerb();
}
const VGROUPS=[['Indicativo',[['pres','presente'],['imp','imperfetto'],['pp','passato prossimo'],['trap','trapassato prossimo'],['fut','futuro semplice'],['futant','futuro anteriore'],['pr','passato remoto']]],
 ['Congiuntivo',[['cong','presente'],['congp','passato'],['cimp','imperfetto'],['congtrap','trapassato']]],
 ['Condizionale',[['cond','presente'],['condp','passato']]]];
const VPRON=['io','tu','lui/lei','noi','voi','loro'];
function verbSearch(){
  const I=verbIndex();
  const recent=Array.isArray(S.vRecent)?S.vRecent.slice(0,10):[];
  $('#vbody').innerHTML=`<section class="card vsearch"><label class="lab" for="vq">Cerca un verbo</label>
    <div class="dictrow"><input id="vq" class="inp" type="search" list="vlist" enterkeyhint="search" placeholder="parlare, alzarsi… vado… comer" value="${esc(vQuery)}" autocomplete="off" autocapitalize="off" spellcheck="false"><button class="btn primary" id="vqgo" type="button">Coniuga</button></div>
    <datalist id="vlist">${I.all.map(v=>`<option value="${v}">`).join('')}</datalist>
    <p class="note">Puoi scrivere l'infinito (anche riflessivo: <i>alzarsi</i>), una forma coniugata (<i>vado, ho fatto, faccia</i>) o il verbo in portoghese (<i>comer</i>). ${I.all.length} verbi con il significato, più qualsiasi verbo regolare.</p>
    <div class="vchips"><span class="note">${recent.length?'Cercati di recente:':'I più usati:'}</span>${(recent.length?recent:['essere','avere','fare','andare','venire','stare','potere','volere','dovere','sapere','alzarsi','capire']).map(v=>`<button class="btn ghost sm" type="button" data-v="${esc(v)}">${esc(v)}</button>`).join('')}</div>
  </section><div id="vres"></div>`;
  const inp=$('#vq');
  const go=v=>{ v=(v||inp.value).trim(); if(!v) return; vQuery=v; inp.value=v; showVerb(v); };
  $('#vqgo').onclick=()=>go();
  inp.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); go(); inp.blur(); } });
  inp.addEventListener('change',()=>{ if(I.all.includes(inp.value.trim().toLowerCase())) go(); });
  $('#vbody').querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>go(b.dataset.v));
  if(vQuery) showVerb(vQuery);
}
function showVerb(q){
  const box=$('#vres'); if(!box) return;
  const r=findVerb(q);
  if(!r.c){
    const L=r.list||[];
    box.innerHTML=`<section class="card">${L.length?`<p>${r.fromForm?`«<b>${esc(r.fromForm)}</b>» è una forma di:`:r.byPt?'In italiano:':'Forse cercavi:'}</p><div class="vchips">${L.map(v=>{ const c=conjugate(v); return `<button class="btn ${L.length===1?'primary':''}" type="button" data-v="${esc(v)}">${esc(v)}${c&&c.pt?` <span class="note">· ${esc(c.pt)}</span>`:''}</button>`; }).join('')}</div>`:`<p>Non trovo «${esc(q)}». Scrivi l'infinito (che finisce in <b>-are, -ere, -ire</b> o <b>-rre</b>) oppure una forma coniugata.</p>`}</section>`;
    box.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{ vQuery=b.dataset.v; $('#vq').value=vQuery; showVerb(vQuery); });
    if(r.fromForm&&L.length===1){ vQuery=L[0]; return showVerb(L[0]); }
    return;
  }
  const c=r.c, v=c.inf;
  S.vRecent=[v,...(Array.isArray(S.vRecent)?S.vRecent:[]).filter(x=>x!==v)].slice(0,10); save();
  const cell=(t,i)=>{ const f=c.T[t][i]; const irr=c.reg&&c.reg[t]&&c.reg[t][i]!==f; return irr?`<b class="irrf">${esc(f)}</b>`:esc(f); };
  const pron=(t,i)=>t.startsWith('cong')?'che '+VPRON[i].replace('lui/lei','lui'):VPRON[i];
  const tcard=(t,l)=>`<div class="vt"><h4>${l}${canSpeak?` <button class="btn ghost sm vsay" type="button" data-say="${t}" aria-label="Ascolta ${l}">▶</button>`:''}</h4>${c.T[t].map((x,i)=>`<div><span>${pron(t,i)}</span>${cell(t,i)}</div>`).join('')}</div>`;
  const partIrr=c.reg&&c.reg.part!==c.part;
  const canDrill=VERBI[c.base]&&!c.refl;
  box.innerHTML=`<section class="card vres">
    <div class="vhead"><div class="verbname">${esc(v)}</div><div class="note">${esc(c.pt||'')}${c.pt?' · ':''}${c.g==='irr'?'<b class="irrf">irregolare</b>':'regolare'}${c.refl?' · riflessivo':''}${r.guess?' · <i>non è nella lista: coniugato con le regole</i>':''}</div>
     <div class="vfacts"><span><b>ausiliare</b> ${c.aux==='E'?'essere':'avere'}</span><span><b>participio</b> ${partIrr?`<b class="irrf">${esc(c.part)}</b>`:esc(c.part)}</span><span><b>gerundio</b> ${esc(c.ger)}</span></div>
     ${c.notes.length?`<ul class="dots vnotes">${c.notes.map(n=>`<li>${esc(n)}</li>`).join('')}</ul>`:''}
     <div class="btnrow">${canSpeak?`<button class="btn" type="button" id="vsayinf">▶ Ascolta</button>`:''}${canDrill?`<button class="btn" type="button" id="vdrill">Allenati con «${esc(c.base)}»</button>`:''}</div>
     ${c.g==='irr'?'<p class="note">Le forme in <b class="irrf">rosso</b> sono irregolari: non seguono la regola.</p>':''}</div>
    ${VGROUPS.map(([g,ts])=>`<h3 class="vgh">${g}</h3><div class="vgrid">${ts.map(([t,l])=>tcard(t,l)).join('')}</div>`).join('')}
    <h3 class="vgh">Imperativo</h3>
    ${c.T.imper?`<div class="vgrid"><div class="vt"><h4>imperativo</h4>${c.T.imper.map((x,i)=>`<div><span>${PERS_IMP[i]}</span>${esc(x)}</div>`).join('')}</div><div class="vt"><h4>negativo</h4><div><span>tu</span>non ${esc(c.refl?c.inf.replace(/si$/,'ti'):c.inf)}</div><div><span>Lei</span>non ${esc(c.T.imper[1])}</div><div><span>voi</span>non ${esc(c.T.imper[3])}</div><p class="note" style="margin:6px 0 0">Con <i>tu</i> il negativo è <b>non + infinito</b>.</p></div></div>`:`<p class="note">Questo verbo non ha l'imperativo.</p>`}
  </section>`;
  box.querySelectorAll('[data-say]').forEach(b=>b.onclick=()=>{ const t=b.dataset.say; speak(c.T[t].map((x,i)=>(t.startsWith('cong')?'che ':'')+['io','tu','lui','noi','voi','loro'][i]+' '+x.split('/')[0]).join('. ')+'.'); });
  const si=$('#vsayinf'); if(si) si.onclick=()=>speak(v+'. '+c.T.pres.map(x=>x.split('/')[0]).join(', ')+'.');
  const dr=$('#vdrill'); if(dr) dr.onclick=()=>{ vSel.verbi=[c.base]; saveVSel(); vMode='drill'; renderVerbi(); };
  box.scrollIntoView({block:'start',behavior:'smooth'});
}
function vstats(){ const v=S.verbi; const el=$('#vstats'); if(el) el.textContent=`${v.ok}/${v.tot} giuste · serie ${streak} · record ${v.best}`; }
function nextVerb(){
  const v=vSel.verbi[Math.floor(Math.random()*vSel.verbi.length)];
  const t=vSel.tempi[Math.floor(Math.random()*vSel.tempi.length)];
  const p=Math.floor(Math.random()*6);
  const forms=coniuga(v,t);
  cur={v,t,p,ans:forms[p],forms,done:false};
  const d=$('#drill'); if(!d) return;
  d.innerHTML=`<div class="verb">${v}</div><div class="note" style="margin-top:4px">${esc(VERBI[v].pt||'')}</div><div class="meta"><b>${TEMPI[t]}</b></div><div class="pers">${PERSONE[p]}${t==='cong'||t==='cimp'?' <span class="note">(che…)</span>':''}</div>
   <input id="vin" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="forma conjugada"><div class="fb" id="vfb"></div><div id="vtab"></div>`;
  vstats();
  const inp=$('#vin'); inp.focus({preventScroll:true});
  inp.addEventListener('keydown',e=>{ if(e.key!=='Enter') return; e.preventDefault(); if(cur.done){ nextVerb(); return; } checkVerb(); });
}
function checkVerb(){
  const inp=$('#vin'); if(!inp.value.trim()) return;
  const r=judge(inp.value,[cur.ans]);
  cur.done=true; S.verbi.tot++; tick();
  if(r==='no') addErr(`v-${cur.v}-${cur.t}-${cur.p}`,'verb',{v:cur.v,t:cur.t,p:cur.p},'Coniugatore');
  if(r==='ok'){ S.verbi.ok++; streak++; S.verbi.best=Math.max(S.verbi.best,streak); $('#vfb').innerHTML='<span class="mark ok">Perfetto! ✓</span>'; inp.style.color='var(--verde)'; }
  else if(r==='acc'){ S.verbi.ok++; streak++; S.verbi.best=Math.max(S.verbi.best,streak); $('#vfb').innerHTML=`<span class="mark acc">Quasi: ${esc(cur.ans)} (accento!)</span>`; }
  else { streak=0; $('#vfb').innerHTML=`<span class="mark no">${esc(cur.ans)}</span>`; inp.style.color='var(--rosso)'; inp.style.textDecoration='line-through'; }
  save(); vstats();
  $('#vtab').innerHTML=`<div class="conj">${cur.forms.map((f,i)=>`<div><span>${PERSONE[i]}</span>${i===cur.p?'<b>'+esc(f)+'</b>':esc(f)}</div>`).join('')}</div><p class="note" style="margin-top:14px">participio <b>${esc(VERBI[cur.v].part)}</b> · gerundio <b>${gerundio(cur.v)}</b> · Invio per il successivo</p>`;
}

/* ---------- MONTA A FRASE ---------- */
const canon=s=>norm(s).replace(/[.,!?;:«»"—–-]/g,' ').replace(/\s+/g,' ').trim();
function shuffleTokens(toks){ let s; let n=0; do{ s=shuffle(toks); n++; }while(n<8 && s.join(' ')===toks.join(' ')); return s; }
function makeOrder(box,item){
  const sentence=item[0], alts=item[1]||[];
  const toks=sentence.split(' ');
  box.innerHTML=`<div class="build" aria-label="la tua frase"><span class="ph">Tocca le parole nell'ordine giusto</span></div><div class="pool"></div><div class="fb"></div>`;
  const build=box.querySelector('.build'), pool=box.querySelector('.pool');
  shuffleTokens(toks).forEach(t=>{ const b=document.createElement('button'); b.className='tok'; b.type='button'; b.textContent=t; pool.appendChild(b); });
  const ph=build.querySelector('.ph');
  box.addEventListener('click',e=>{
    const b=e.target.closest('.tok'); if(!b||box.dataset.locked) return;
    (b.parentElement===pool?build:pool).appendChild(b);
    ph.hidden=build.querySelectorAll('.tok').length>0;
  });
  return {
    check(){
      const built=[...build.querySelectorAll('.tok')].map(x=>x.textContent).join(' ');
      const fb=box.querySelector('.fb');
      if(pool.children.length){ fb.innerHTML='<span class="mark no">mancano delle parole</span>'; return false; }
      const ok=[sentence,...alts].some(a=>canon(a)===canon(built));
      fb.innerHTML= ok?'<span class="mark ok">✓ perfetto</span>':`<span class="mark no">✗</span> <span class="corrected">${esc(sentence)}</span>`;
      build.classList.toggle('ok',ok); build.classList.toggle('no',!ok);
      return ok;
    },
    incomplete(){ return pool.children.length>0; },
    reveal(){ box.dataset.locked='1'; box.querySelector('.fb').innerHTML=`<span class="corrected">${esc(sentence)}</span>`; }
  };
}
function orderList(ol,items,sec,record,ekey,src){
  ol.innerHTML=items.map(()=>`<li><div class="ordbox"></div></li>`).join('');
  const ctrls=[...ol.querySelectorAll('.ordbox')].map((b,i)=>makeOrder(b,items[i]));
  const done=new Array(items.length).fill(false);
  sec.querySelector('[data-a="check"]').onclick=()=>{ const r=ctrls.map((c,i)=>{ const ok=c.check(); const complete=!c.incomplete(); if(complete&&!done[i]){ done[i]=true; tick(); } if(complete&&!ok&&ekey) addErr(ekey(i),'order',{s:items[i][0],al:items[i][1]||[]},src); return ok; }); record(r.filter(Boolean).length,r.length); };
  sec.querySelector('[data-a="show"]').onclick=()=>ctrls.forEach(c=>c.reveal());
}

/* ---------- LABORATORIO DI FRASI ---------- */
S.lab=S.lab||{trad:{ok:0,tot:0},trasf:{ok:0,tot:0},ord:{ok:0,tot:0}};
let labMode='trad', labLvl=-1, labCur=null;
const LV=['A2–B1','B1–B2','B2–C1'];
const ALL_ORDER=[].concat(...Object.entries(ORDER).map(([u,arr])=>arr.map(x=>x.concat([+u]))));
function renderLab(){
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Strumenti · frasi</div><h1 class="title">Laboratorio di frasi</h1><p class="subtitle">Frasi intere, una alla volta: traduci dal portoghese, trasforma le strutture e ricostruisci frasi in disordine. Invio controlla, Invio di nuovo passa alla prossima.</p></header>
   <div class="seg" role="group"><button data-m="trad" aria-pressed="${labMode==='trad'}">Traduzione</button><button data-m="trasf" aria-pressed="${labMode==='trasf'}">Trasforma</button><button data-m="ord" aria-pressed="${labMode==='ord'}">Riordina</button></div>
   ${labMode==='trad'?`<div class="chipsel" id="lvl" style="margin:-6px 0 16px"><button data-l="-1" aria-pressed="${labLvl===-1}">tutti i livelli</button>${LV.map((l,i)=>`<button data-l="${i}" aria-pressed="${labLvl===i}">${l}</button>`).join('')}</div>`:''}
   <section class="card labcard" id="labcard"></section>
   <p class="note" id="labstats"></p>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ labMode=b.dataset.m; renderLab(); });
  const lv=$('#lvl'); if(lv) lv.querySelectorAll('button').forEach(b=>b.onclick=()=>{ labLvl=+b.dataset.l; renderLab(); });
  nextLab();
}
function labStats(){ const s=S.lab[labMode]; $('#labstats').textContent=`In questa modalità: ${s.ok} giuste su ${s.tot}.`; }
function pick(arr,prev){ if(arr.length<2) return arr[0]; let x; do{ x=arr[Math.floor(Math.random()*arr.length)]; }while(x===prev); return x; }
function nextLab(){
  const card=$('#labcard'); labStats();
  if(labMode==='ord'){
    const it=pick(ALL_ORDER,labCur&&labCur.it); labCur={it,done:false};
    card.innerHTML=`<div class="card-h"><span class="lab">Unità ${it[2]} · riordina</span></div><div class="ordbox big"></div><div class="btnrow" style="margin-top:14px"><button class="btn primary" id="lcheck">Verifica</button><button class="btn" id="lnext">Prossima →</button></div>`;
    const ctl=makeOrder(card.querySelector('.ordbox'),it);
    $('#lcheck').onclick=()=>{ if(labCur.done) return; const ok=ctl.check(); if(card.querySelector('.pool').children.length) return; labCur.done=true; S.lab.ord.tot++; tick(); if(ok) S.lab.ord.ok++; else addErr('lab-ord-'+hashStr(it[0]),'order',{s:it[0],al:it[1]||[]},'Laboratorio · riordina'); save(); labStats(); };
    $('#lnext').onclick=nextLab;
    return;
  }
  let it,prompt,sub;
  if(labMode==='trad'){ const pool=TRAD.filter(x=>labLvl<0||x[2]===labLvl); it=pick(pool,labCur&&labCur.it); prompt=it[0]; sub=`Traduci in italiano · ${LV[it[2]]}`; }
  else { it=pick(TRASF,labCur&&labCur.it); prompt=it[1]; sub=it[0]; }
  labCur={it,done:false};
  const answers = labMode==='trad'? it[1] : it[2];
  card.innerHTML=`<div class="card-h"><span class="lab">${esc(sub)}</span></div>
   <p class="labq">${esc(prompt)}</p>
   <textarea id="lin" class="labin" rows="2" spellcheck="false" autocapitalize="off" placeholder="Scrivi in italiano…"></textarea>
   <div id="lfb" class="fb"></div>
   <div class="btnrow" style="margin-top:12px"><button class="btn primary" id="lcheck">Verifica</button><button class="btn" id="lnext">Prossima →</button></div>
   <div id="lai"></div>`;
  const inp=$('#lin'); inp.focus({preventScroll:true});
  const doCheck=()=>{
    if(labCur.done || !inp.value.trim()) return;
    labCur.done=true;
    const v=canon(inp.value);
    const r = answers.some(a=>canon(a)===v)?'ok': answers.some(a=>canon(a).normalize('NFD').replace(/[̀-ͯ]/g,'')===v.normalize('NFD').replace(/[̀-ͯ]/g,''))?'acc':'no';
    S.lab[labMode].tot++; tick(); if(r!=='no') S.lab[labMode].ok++; save(); labStats();
    labCur.ekey='lab-'+labMode+'-'+hashStr(prompt);
    if(r==='no') addErr(labCur.ekey,'lab',{q:prompt,s:sub,a:answers,n:labMode==='trad'?(it[3]||''):''},'Laboratorio · '+(labMode==='trad'?'traduzione':'trasforma'));
    const note = labMode==='trad'&&it[3] ? `<p class="expl">${esc(it[3])}</p>`:'';
    const sols = `<div class="sols"><span class="note">Soluzioni accettate:</span><ul>${answers.map(a=>`<li>${esc(a)}</li>`).join('')}</ul></div>`;
    if(r==='ok') $('#lfb').innerHTML=`<span class="mark ok">Perfetto! ✓</span>${note}${answers.length>1?sols:''}`;
    else if(r==='acc') $('#lfb').innerHTML=`<span class="mark acc">Quasi: controlla gli accenti.</span>${note}${sols}`;
    else {
      $('#lfb').innerHTML=`<span class="mark no">Non corrisponde alle soluzioni previste.</span>${note}${sols}
        <p class="note">Anche altre forme possono essere giuste. Se pensi che la tua vada bene, chiedi un secondo parere:</p>
        <div class="btnrow"><button class="btn red" id="laibtn">Fai valutare la mia frase</button><button class="btn ghost" id="lself">Era giusta: conta il punto</button></div>`;
      $('#lself').onclick=()=>{ if(labCur.credited) return; labCur.credited=true; removeErr(labCur.ekey); S.lab[labMode].ok++; save(); labStats(); $('#lself').remove(); };
      $('#laibtn').onclick=()=>labAI(prompt,sub,answers,inp.value);
    }
  };
  $('#lcheck').onclick=doCheck;
  $('#lnext').onclick=nextLab;
  inp.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); labCur.done?nextLab():doCheck(); } });
}
async function labAI(prompt,task,answers,mine){
  const box=$('#lai'); const btn=$('#laibtn'); if(btn) btn.disabled=true;
  box.innerHTML=`<div class="ai-out"><div class="stamp">La professoressa sta leggendo…</div></div>`;
  const sample=await getSample();
  if(!sample){ box.innerHTML=`<div class="ai-out"><p>La valutazione automatica funziona solo con la pagina aperta dentro Claude.</p></div>`; if(btn) btn.disabled=false; return; }
  const q=`Sei un insegnante d'italiano. Valuta la risposta di una studentessa brasiliana che parla anche spagnolo.
Compito: ${task}
Frase di partenza: ${prompt}
Soluzioni di riferimento: ${answers.join(' | ')}
Risposta della studentessa: ${mine}
La risposta può essere corretta anche se diversa dalle soluzioni, purché sia grammaticalmente corretta, naturale e fedele al senso (e, per le trasformazioni, rispetti la consegna).
Rispondi solo con JSON: {"corretta": true o false, "versione_corretta": "la sua frase corretta con il minimo di modifiche", "spiegazione": "in ${lname()}, massimo 35 parole, indicando eventuali interferenze di PT/ES"}`;
  try{
    const r=await sample.json(q);
    const ok=!!(r&&r.corretta);
    if(ok && !labCur.credited){ labCur.credited=true; removeErr(labCur.ekey); S.lab[labMode].ok++; save(); labStats(); } if(ok){ const s=$('#lself'); s&&s.remove(); }
    box.innerHTML=`<div class="ai-out"><div class="stamp">${ok?'Va bene! ✓':'Correzione'}</div>${r&&r.versione_corretta?`<p class="corrected" style="font-size:17px">${esc(r.versione_corretta)}</p>`:''}<p>${esc((r&&r.spiegazione)||'')}</p></div>`;
  }catch(e){ box.innerHTML=`<div class="ai-out"><p>${esc(errMsg(e))}</p></div>`; if(btn) btn.disabled=false; }
}

/* ---------- utilità ---------- */
function hashStr(t){ let h=5381; t=String(t); for(let i=0;i<t.length;i++) h=((h<<5)+h+t.charCodeAt(i))|0; return (h>>>0).toString(36); }
let toastT;
function toast(msg){ const t=$('#toast'); if(!t) return; t.innerHTML=msg; t.hidden=false; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>{ t.hidden=true; },300); },3200); }

/* ---------- il mio piano (calendario reale) ---------- */
const dayKey=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const addDays=n=>{ const d=new Date(); d.setDate(d.getDate()+n); return dayKey(d); };
const kDate=k=>{ const [y,m,d]=k.split('-').map(Number); return new Date(y,m-1,d,12); };
const kAdd=(k,n)=>{ const d=kDate(k); d.setDate(d.getDate()+n); return dayKey(d); };
const kFmt=(k,o)=>kDate(k).toLocaleDateString('it-IT',o||{weekday:'short',day:'numeric',month:'short'});
const WD=['dom','lun','mar','mer','gio','ven','sab'];
const PLAN_DEF={min:25,cls:[2,4],sunFree:false,brk:['2026-12-20','2027-01-25'],hol:'pause',work:{on:true,ref:'2026-11',i:0}};
const WPAIRS=[[1,2],[2,3],[3,4],[4,5],[5,1]];
function workIdx(y,m){ const w=cfg().work; if(!w||!w.on) return -1; const [ry,rm]=w.ref.split('-').map(Number); const d=(y-ry)*12+(m-rm); return (((w.i+d)%5)+5)%5; }
function workPair(k){ const [y,m]=k.split('-').map(Number), i=workIdx(y,m); return i<0?[]:WPAIRS[i]; }
const pairLab=i=>WPAIRS[i].map(w=>WD[w]).join(' e ');
function cfg(){ return Object.assign({},PLAN_DEF,S.planCfg||{}); }
function tick(n=1){ const k=dayKey(); S.days[k]=(S.days[k]||0)+n; save(); updRhythm(); }

function dayType(k){
  const c=cfg(), wd=kDate(k).getDay();
  if(k>=c.brk[0]&&k<=c.brk[1]) return (c.hol==='light'&&[1,3,5].includes(wd))?'light':'pause';
  if(workPair(k).includes(wd)) return 'work';
  if(c.cls.includes(wd)) return 'class';
  if(c.sunFree&&wd===0) return 'free';
  return 'study';
}
function planSteps(){
  const out=[]; let ci=0, n=0;
  UNITS.forEach(u=>{
    const a1=u.band===0, big=u.band>=2;
    out.push({id:u.id+':L',uid:u.id,k:'L',t:'Lezione',m:a1?15:big?25:20,tab:'lezione'});
    LESSICO.forEach((th,ti)=>{ if(th.u===u.id) out.push({id:'V'+ti,uid:u.id,k:'V',ti,t:'Lessico · '+th.t,m:10}); });
    u.ex.forEach((s,i)=>out.push({id:u.id+':E'+i,uid:u.id,k:'E',i,t:'Esercizi · serie '+String.fromCharCode(65+i),m:s.t==='order'?6:(a1?8:10),tab:'esercizi'}));
    out.push({id:u.id+':R',uid:u.id,k:'R',t:'Lettura e domande',m:10,tab:'lettura'});
    const sc=chapterOfUnit(u.id); if(sc>=0) out.push({id:u.id+':S',uid:u.id,k:'S',ch:sc,t:'Racconto · capitolo '+(sc+1),m:10});
    out.push({id:u.id+':P',uid:u.id,k:'P',t:'Parla e ascolta',m:15,tab:'parla'});
    out.push({id:u.id+':W',uid:u.id,k:'W',t:'Scrittura',m:a1?15:big?30:25,tab:'scrittura'});
    n++;
    if(n%2===0&&ci<CULTURA.length){ out.push({id:'C'+ci,k:'C',ci,t:'Cultura · '+CULTURA[ci].t,m:10}); ci++; }
    const T=TESTS.find(t=>t.units[1]===u.id); if(T) out.push({id:'T'+T.id,k:'T',tid:T.id,t:T.title,m:30});
  });
  while(ci<CULTURA.length){ out.push({id:'C'+ci,k:'C',ci,t:'Cultura · '+CULTURA[ci].t,m:10}); ci++; }
  return out;
}
let _steps=null; const STEPS=()=>_steps||(_steps=planSteps()); const STEP=id=>STEPS().find(s=>s.id===id);
function stepAuto(s){
  switch(s.k){
    case 'L': return !!S.lesson[s.uid];
    case 'E': return !!S.ex[s.uid+'-'+s.i];
    case 'R': return !!S.read[s.uid];
    case 'S': return storyRead(s.ch);
    case 'P': return !!(S.spk[s.uid]&&S.spk[s.uid].done);
    case 'W': return !!(S.write[s.uid]&&S.write[s.uid].done);
    case 'C': return !!(S.cult[s.ci]&&S.cult[s.ci].read);
    case 'T': return !!S.tests[s.tid];
    case 'V': { const th=LESSICO[s.ti]; return !!S.lexSeen[s.ti]||th.w.filter(w=>S.voc[w[0]]).length>=th.w.length*0.6; }
  }
  return false;
}
const stepDone=s=>stepAuto(s)||!!S.planChk[s.id];
function buildPlan(from){
  const c=cfg(), keep={};
  const today=dayKey(), usedBy={};
  Object.entries((S.plan&&S.plan.a)||{}).forEach(([id,d])=>{ const s=STEP(id); if(s&&stepDone(s)){ const dd=d>today?today:d; keep[id]=dd; if(dd>=from) usedBy[dd]=(usedBy[dd]||0)+s.m; } });
  const todo=STEPS().filter(s=>!stepDone(s)); const a={}; let d=from, i=0, guard=0;
  while(i<todo.length&&guard++<2000){
    const t=dayType(d), ex=(t==='study'||t==='class')?extraMins(d):0, cap=t==='study'?Math.max(0,c.min-5-ex):t==='class'?Math.max(0,c.min-13-ex):0;
    let used=usedBy[d]||0, placed=usedBy[d]?1:0;
    while(i<todo.length){ const s=todo[i]; if(used+s.m<=cap||(placed===0&&t==='study'&&cap>0)){ a[s.id]=d; used+=s.m; placed++; i++; } else break; }
    d=kAdd(d,1);
  }
  const prev=S.plan||{}; S.plan={from,start:[prev.start||prev.from||from,from,...Object.values(keep)].sort()[0],a:Object.assign(keep,a),made:dayKey()}; save();
}
function autoAhead(){
  if(!S.plan||!S.plan.a) return false;
  const t=dayKey();
  const early=STEPS().some(s=>{ const d=S.plan.a[s.id]; return (d&&d>t&&stepDone(s))||(!d&&!stepDone(s)); });
  if(!early) return false;
  const todayOpen=planDay(t).some(s=>!stepDone(s));
  buildPlan(todayOpen?t:kAdd(t,1));
  return true;
}
let _ps=[null,null]; function planStart(){ if(!S.plan) return dayKey(); if(_ps[0]!==S.plan){ let m=S.plan.start||S.plan.from; Object.values(S.plan.a||{}).forEach(d=>{ if(d&&d<m) m=d; }); _ps=[S.plan,m]; } return _ps[1]; }
function nextStep(){ return STEPS().find(s=>!stepDone(s)); }
function planDay(k){ const a=(S.plan&&S.plan.a)||{}; return STEPS().filter(s=>a[s.id]===k); }
function fixedTasks(k){
  const t=dayType(k), out=[];
  if(t==='class'){
    const cur=planDay(k)[0]||STEPS().find(s=>!stepDone(s)&&s.uid)||{}; const u=UNITS.find(x=>x.id===cur.uid);
    out.push({id:k+'|prep',k:'prep',t:`Prima del corso: scheda riassuntiva${u?' di '+uName(u):''}`,m:3,href:u&&SCHEDE[u.id]?'#scheda-'+u.id:'#schede'});
    out.push({id:k+'|rev',k:'rev',t:'Ripasso del giorno: errori e memoria',m:5,href:'#ripasso'});
    out.push({id:k+'|log',k:'log',t:'Dopo il corso: registra la lezione e aggiungi le parole nuove',m:5,href:'#fuori',fm:'registro'});
  } else if(t==='study'){ out.push({id:k+'|rev',k:'rev',t:'Ripasso del giorno: errori e memoria',m:5,href:'#ripasso'}); }
  else if(t==='light'){ out.push({id:k+'|rev',k:'rev',t:'Ripasso leggero: quaderno degli errori',m:10,href:'#ripasso'}); }
  if(ankiDay(k)) out.push({id:k+'|anki',k:'anki',t:'Le mie parole (metodo Anki)',m:5,href:'#fuori',fm:'parole'});
  if(isDiaryDay(k)) out.push({id:k+'|diario',k:'diario',t:'Diario: 3 frasi su quello che hai visto al corso',m:5,href:'#diario'});
  if(isMixDay(k)) out.push({id:k+'|mix',k:'mix',t:'Ripasso misto della settimana',m:10,href:'#misto'});
  return out;
}
function isMixDay(k){
  if(studiedUnits().length<2) return false;
  const wd=kDate(k).getDay(), ok=d=>['study','class'].includes(dayType(d));
  if(wd===6) return ok(k);
  if(wd===0) return ok(k)&&!ok(kAdd(k,-1));
  return false;
}
function extraMins(k){ return (isMixDay(k)?10:0)+(isDiaryDay(k)?5:0)+(ankiDay(k)?5:0);
}
function fixedDone(f,k){
  if(S.planChk[f.id]) return true;
  if(f.k==='rev') return !!S.revDays[k]||(k===dayKey()&&errDue().length===0&&memToday().length===0);
  if(f.k==='mix') return !!S.misto[weekKey(k)];
  if(f.k==='diario') return !!S.diario[k];
  if(f.k==='anki') return !!(S.ankiDays[k]&&S.ankiDays[k].fin)||(k===dayKey()&&!ankiDue().length&&!ankiNew().length);
  if(f.k==='prep') return !!S.schedaDays[k];
  if(f.k==='log') return ((S.log[k]||[]).some(e=>e.t==='corso'));
  return false;
}
function dayInfo(k){
  const steps=planDay(k), fixed=fixedTasks(k), type=dayType(k);
  const items=[...fixed.filter(f=>f.k!=='log'),...steps.map(s=>({s})),...fixed.filter(f=>f.k==='log')];
  const done=items.map(it=>it.s?stepDone(it.s):fixedDone(it,k));
  const mins=items.reduce((a,it)=>a+(it.s?it.s.m:it.m),0);
  return {k,type,items,done,mins,nDone:done.filter(Boolean).length,stepsOk:steps.every(stepDone),hasSteps:steps.length>0};
}
function overdue(){ const t=dayKey(), a=(S.plan&&S.plan.a)||{}; return STEPS().filter(s=>a[s.id]&&a[s.id]<t&&!stepDone(s)); }
function planStreak(){
  let cur=0, k=dayKey(); const today=dayInfo(k);
  if(!(today.items.length&&today.nDone===today.items.length)) k=kAdd(k,-1);
  for(let g=0;g<400;g++){ const t=dayType(k); if(t==='free'||t==='pause'||t==='work'){ k=kAdd(k,-1); continue; } if(S.plan&&k<planStart()) break; const di=dayInfo(k); const ok=di.hasSteps?di.stepsOk:(di.items.length?di.nDone===di.items.length:true); if(!ok) break; cur++; k=kAdd(k,-1); }
  return cur;
}
function planEnd(){ const v=Object.values((S.plan&&S.plan.a)||{}); return v.length?v.sort().pop():dayKey(); }
function taskHTML(it,done,k,opts){
  const s=it.s, past=k<dayKey();
  const label=s?(s.uid?`<b>${esc(uName(UNITS.find(u=>u.id===s.uid)))}</b> · ${esc(s.t)}`:`<b>${esc(s.t)}</b>`):esc(it.t);
  const href=s?(s.k==='V'?'#lessico-'+s.ti:s.k==='S'?'#racconto-'+s.ch:s.k==='C'?'#cultura-'+s.ci:s.k==='T'?'#verifica-'+s.tid:'#unita-'+s.uid):it.href;
  const id=s?s.id:it.id;
  return `<li class="pt ${done?'ok':past&&s?'late':''}"><button class="ptchk" type="button" data-chk="${esc(id)}" aria-pressed="${done}" aria-label="Segna come fatto">${done?'✓':''}</button><a href="${href}" ${s&&s.tab?`data-tab="${s.tab}" data-uid="${s.uid}"`:''} ${it.fm?`data-fm="${it.fm}"`:''}>${label}</a><span class="ptm">${s?s.m:it.m}′</span></li>`;
}
function itemsHTML(di,k,cls){
  const doneIdx=di.items.map((_,i)=>i).filter(i=>di.done[i]);
  const collapse=doneIdx.length>3;
  const rows=di.items.map((it,i)=>(collapse&&di.done[i])?'':taskHTML(it,di.done[i],k)).join('');
  return `<ul class="ptl ${cls||''}">${collapse?`<li class="pt ok sum"><span class="ptchk">✓</span><span>${doneIdx.length} attività fatte</span></li>`:''}${rows}</ul>`;
}
function bindTasks(root,rerender){
  root.querySelectorAll('[data-chk]').forEach(b=>b.onclick=()=>{ const id=b.dataset.chk; S.planChk[id]=!S.planChk[id]; if(!S.planChk[id]) delete S.planChk[id]; save(); renderNav(route()); rerender(); });
  root.querySelectorAll('a[data-tab]').forEach(a=>a.addEventListener('click',e=>{ S.tab[a.dataset.uid]=a.dataset.tab; save(); if(location.hash===a.getAttribute('href')){ e.preventDefault(); render(); } }));
  root.querySelectorAll('a[data-fm]').forEach(a=>a.addEventListener('click',()=>{ fuoriMode=a.dataset.fm; }));
}
const DAY_LAB={study:'Studio',class:'Lezione al corso',free:'Giorno libero',pause:'Pausa per le feste',light:'Ripasso leggero',work:'Giorno di lavoro'};
const isClassWd=k=>cfg().cls.includes(kDate(k).getDay());
function todayCard(){
  const k=dayKey(), di=dayInfo(k), od=overdue().length;
  const all=di.items.length&&di.nDone===di.items.length;
  return `<div class="card todayplan ${all?'met':''}"><div class="card-h"><div><span class="lab">Oggi · ${kFmt(k,{weekday:'long',day:'numeric',month:'long'})}</span><h3>${DAY_LAB[di.type]}${di.type==='class'?' · lezione di italiano':''}</h3></div>${di.items.length?`<span class="note">${di.nDone}/${di.items.length} · circa ${di.mins} min</span>`:''}</div>
   ${di.items.length?itemsHTML(di,k):`<p class="note">${di.type==='work'?`Giorno di lavoro: niente compiti oggi${isClassWd(k)?' (se vai al corso, basta seguire la lezione)':''}. Si riprende ${(()=>{ let n=kAdd(k,1); for(let g=0;g<10&&dayType(n)==='work';g++) n=kAdd(n,1); return kFmt(n,{weekday:'long',day:'numeric'}); })()}.`:di.type==='free'?`Oggi riposo. Se ti va: qualche pagina di «${esc(libroOra().tit)}» o un video di Italianeando.`:'Pausa per le feste: buone vacanze! Si ricomincia il '+kFmt(kAdd(cfg().brk[1],1),{day:'numeric',month:'long'})+'.'}</p>`}
   ${all?'<p class="pen" style="font-size:24px;margin:8px 0 0;color:var(--verde)">Fatto per oggi. Brava!</p>':''}
   ${(()=>{ if(planDay(k).some(s=>!stepDone(s))||di.type==='pause'||di.type==='work') return ''; const ns=nextStep(); if(!ns) return ''; const when=(S.plan&&S.plan.a||{})[ns.id];
     return `<div class="ahead"><span class="pen">Sei in anticipo!</span> <span class="note">Se ti va di andare avanti, ecco la prossima attività${when?' (prevista per '+kFmt(when,{weekday:'long',day:'numeric',month:'long'})+')':''}. Quando la finisci, il piano si sposta in avanti da solo.</span><ul class="ptl">${taskHTML({s:ns},false,k)}</ul></div>`; })()}
   ${od?`<div class="callout small" style="margin:12px 0 0">Hai ${od} ${od===1?'attività':'attività'} in ritardo. <button class="btn" type="button" data-replan>Ripianifica da oggi</button></div>`:''}</div>`;
}
function bindReplan(root,rerender){ root.querySelectorAll('[data-replan]').forEach(b=>b.onclick=()=>{ buildPlan(dayKey()); toast('<span class="pen">Piano aggiornato</span> a partire da oggi.'); renderNav(route()); rerender(); }); }

let lastAllDone=null;
function rhythmWidget(){ return `<a class="rhythm" href="#piano" id="rhythm" title="Il mio piano"><span class="rw-top"><span>Oggi <b id="rw-n">0/0</b></span><span class="rw-streak" id="rw-s"></span></span><span class="rw-bar"><i id="rw-bar"></i></span></a>`; }
function updRhythm(){
  const di=dayInfo(dayKey()), st=planStreak(), e=$('#rw-n');
  const p=di.items.length?Math.round(100*di.nDone/di.items.length):100, all=di.items.length>0&&di.nDone===di.items.length;
  if(e){ e.textContent=di.items.length?`${di.nDone}/${di.items.length} attività`:DAY_LAB[di.type].toLowerCase(); $('#rw-bar').style.width=p+'%'; $('#rw-s').textContent=st?`serie: ${st} ${st===1?'giorno':'giorni'}`:''; $('#rhythm').classList.toggle('met',all); }
  const top=$('#rw-top'); if(top){ top.textContent=di.items.length?`${di.nDone}/${di.items.length}`:'✓'; top.setAttribute('href','#piano'); }
  const k=dayKey();
  if(all&&lastAllDone===false&&!S.planToast[k]){ S.planToast[k]=1; save(); toast('<span class="pen">Brava!</span> Hai finito il piano di oggi.'); }
  lastAllDone=all;
}
let calOff=0, calSel=null;
const KSHORT={L:'lezione',E:'esercizi',R:'lettura',S:'racconto',P:'parla e ascolta',W:'scrittura',C:'cultura',T:'verifica',V:'lessico'};
function stepShort(s){ const u=s.uid&&UNITS.find(x=>x.id===s.uid); return (u?(u.n||'U'+u.id)+' · ':'')+(s.k==='C'||s.k==='T'?s.t:KSHORT[s.k]); }
const CAL_ST={done:'fatto',part:'fatto in parte',miss:'da recuperare',plan:'previsto',rest:'',none:''};
function calState(k,today){
  const di=dayInfo(k), steps=planDay(k), before=S.plan&&k<planStart();
  const rest=['free','pause','work'].includes(di.type);
  if(before) return {di,steps,st:S.days[k]?'done':rest?'rest':'none'};
  let st=rest?'rest':'none';
  if(k<=today){ if(di.items.length){ st=di.nDone===di.items.length?'done':di.nDone>0?'part':k<today?'miss':'plan'; } else if(S.days[k]) st='done'; }
  else if(steps.length) st='plan';
  return {di,steps,st};
}
function calHTML(){
  const today=dayKey(), t0=kDate(today), y0=t0.getFullYear(), m0=t0.getMonth()+calOff;
  const y=y0+Math.floor(m0/12), mo=((m0%12)+12)%12;
  const nDays=new Date(y,mo+1,0).getDate(), lead=(new Date(y,mo,1,12).getDay()+6)%7, sel=calSel||today;
  const sum={done:0,part:0,miss:0,plan:0};
  let cells=['lun','mar','mer','gio','ven','sab','dom'].map(w=>`<span class="calwd">${w}</span>`).join('')+'<span class="cd empty"></span>'.repeat(lead);
  for(let d=1;d<=nDays;d++){
    const k=dayKey(new Date(y,mo,d,12)), {di,steps,st}=calState(k,today);
    if(sum[st]!==undefined) sum[st]++;
    const lines=steps.slice(0,3).map(s=>`<span class="cl ${stepDone(s)?'ok':''}">${esc(stepShort(s))}</span>`).join('')+(steps.length>3?`<span class="cl more">+${steps.length-3}</span>`:'');
    const dots=steps.slice(0,6).map(s=>`<i class="${stepDone(s)?'ok':''}"></i>`).join('');
    const lab=`${kFmt(k,{weekday:'long',day:'numeric',month:'long'})}: ${DAY_LAB[di.type]}${CAL_ST[st]?', '+CAL_ST[st]:''}${steps.length?', '+steps.length+' attività':''}`;
    cells+=`<button type="button" class="cd ${di.type} ${st} ${k===today?'today':''} ${k===sel?'sel':''}" data-cal="${k}" aria-pressed="${k===sel}" aria-label="${esc(lab)}"><span class="cn">${d}</span>${di.type==='class'||(di.type==='work'&&isClassWd(k))?'<span class="ctag">corso</span>':''}${di.type==='work'?'<span class="cl wk">lavoro</span>':''}<span class="clines">${lines}</span><span class="cdots">${dots}</span></button>`;
  }
  const mname=new Date(y,mo,1,12).toLocaleDateString('it-IT',{month:'long',year:'numeric'});
  const past=sum.done+sum.part+sum.miss;
  return `<div class="card-h"><div><span class="lab">Il mio calendario</span><h3>Che cosa ho studiato, che cosa mi aspetta</h3></div></div>
   <div class="calnav"><button class="btn" type="button" data-calm="-1" aria-label="Mese precedente">←</button><b>${mname}</b><button class="btn" type="button" data-calm="1" aria-label="Mese successivo">→</button>${calOff||sel!==today?'<button class="btn ghost" type="button" data-calm="0">Oggi</button>':''}
    <span class="calsum">${past?`${sum.done} ${sum.done===1?'giorno fatto':'giorni fatti'}${sum.part?` · ${sum.part} in parte`:''}${sum.miss?` · ${sum.miss} da recuperare`:''}`:''}${past&&sum.plan?' · ':''}${sum.plan?`${sum.plan} ${sum.plan===1?'giorno previsto':'giorni previsti'}`:''}</span></div>
   <div class="cal">${cells}</div>
   <div class="calleg"><span><i class="lg done"></i>fatto</span><span><i class="lg part"></i>in parte</span><span><i class="lg miss"></i>da recuperare</span><span><i class="lg plan"></i>previsto</span><span><i class="lg class"></i>lezione al corso</span><span><i class="lg work"></i>lavoro</span><span><i class="lg rest"></i>feste</span></div>
   <div class="caldet">${calDetail(sel,today)}</div>`;
}
function calDetail(k,today){
  const {di,st}=calState(k,today), before=S.plan&&k<planStart(), logs=(S.log[k]||[]);
  const head=`<div class="card-h"><div><span class="lab">${DAY_LAB[di.type]}${k===today?' · oggi':''}</span><h3 style="text-transform:capitalize">${kFmt(k,{weekday:'long',day:'numeric',month:'long'})}</h3></div>${!before&&di.items.length?`<span class="note">${di.nDone}/${di.items.length} · circa ${di.mins} min</span>`:''}</div>`;
  let body;
  if(before) body=`<p class="note">${S.days[k]?'Hai studiato con il quaderno (prima di creare il piano).':'Prima dell\'inizio del piano.'}</p>`;
  else if(di.items.length) body=itemsHTML(di,k,'sm')+(k>today?'<p class="note">Attività previste. Se le fai prima, il piano si sposta in avanti da solo.</p>':st==='miss'?'<p class="note">Questo giorno è rimasto indietro: le attività non fatte si recuperano con «Ripianifica da oggi».</p>':'');
  else body=`<p class="note">${di.type==='work'?`Giorno di lavoro: niente compiti.${isClassWd(k)?' Se vai al corso, basta seguire la lezione.':''}`:di.type==='free'?`Giorno libero. Se ti va: qualche pagina di «${esc(libroOra().tit)}».`:di.type==='pause'?'Pausa per le feste.':'Niente in programma.'}</p>`;
  if(logs.length) body+=`<p class="note">Registro: ${logs.map(e=>esc(e.t)+(e.m?' '+e.m+' min':'')).join(' · ')}</p>`;
  return head+body;
}
function bindCal(box,rerender){
  if(!box) return;
  const re=()=>{ box.innerHTML=calHTML(); bindCal(box,rerender); bindTasks(box,rerender); const f=box.querySelector('[data-cal][aria-pressed="true"]'); if(f) f.focus({preventScroll:true}); };
  box.querySelectorAll('[data-calm]').forEach(b=>b.onclick=()=>{ const v=+b.dataset.calm; if(v===0){ calOff=0; calSel=null; } else calOff+=v; re(); });
  box.querySelectorAll('[data-cal]').forEach(b=>b.onclick=()=>{ calSel=b.dataset.cal; re(); });
}
function libroOra(){ const ns=STEPS().find(s=>!stepDone(s)&&s.uid); const b=ns?UNITS.find(u=>u.id===ns.uid).band:4; return LIBRI.find(l=>l.band===b)||LIBRI[LIBRI.length-1]; }
function libroCard(){
  const L=libroOra(), i=LIBRI.indexOf(L), nx=LIBRI[i+1], read=S.books[i];
  return `<div class="card book"><div class="card-h"><div><span class="lab">Il libro del momento · ${L.lvl}</span><h3><i>${esc(L.tit)}</i></h3><span class="note">${esc(L.aut)} · ${esc(L.ed)}</span></div>${read?'<span class="pen" style="color:var(--verde)">letto ✓</span>':''}</div>
   <p>${esc(L.perche)}</p><p class="note"><b>Come leggerlo:</b> ${esc(L.come)}</p>${nx?`<p class="note">Dopo: <i>${esc(nx.tit)}</i> (${nx.lvl}).</p>`:''}
   <div class="btnrow"><a class="btn" href="#fuori" data-fm="libri">Un libro per ogni livello →</a></div></div>`;
}
function homeRhythm(){
  const st=planStreak(), due=errDue().length, steps=STEPS(), nd=steps.filter(stepDone).length;
  return `<section class="rhythm-sec">
   <div class="card-h"><h2 class="sec" style="margin:0">Il mio piano</h2><a class="btn" href="#piano">Il piano completo →</a></div>
   ${todayCard()}
   <div class="rgrid">
    <div class="card"><span class="lab">Percorso completato</span><b class="big">${Math.round(100*nd/steps.length)}<small>%</small></b><span class="rw-bar"><i style="width:${Math.round(100*nd/steps.length)}%"></i></span><span class="note">${nd} attività su ${steps.length} · fine prevista: ${kFmt(planEnd(),{month:'long',year:'numeric'})}</span></div>
    <div class="card"><span class="lab">Serie di giorni con il piano fatto</span><b class="big">${st}<small> ${st===1?'giorno':'giorni'}</small></b><span class="note">i giorni liberi e le feste non interrompono la serie</span></div>
    <div class="card ${due?'due':''}"><span class="lab">Errori da ripassare oggi</span><b class="big">${due}</b><a class="btn ${due?'primary':''}" href="#ripasso">${due?'Ripassa ora →':'Apri il quaderno'}</a></div>
   </div>
   <div class="card calcard" id="calbox">${calHTML()}</div>
   ${libroCard()}
   <div class="testrow">${TESTS.map(t=>{ const r=S.tests[t.id], d=(S.plan&&S.plan.a||{})['T'+t.id]; return `<a class="testchip ${r&&r.passed?'passed':''}" href="#verifica-${t.id}"><b>${t.title}</b><span>${t.range?"Primi passi ":"unità "}${tRange(t)} · ${t.lvl}</span><em>${r?(r.passed?'superata · ':'')+r.best+'/20':d?'prevista: '+kFmt(d,{day:'numeric',month:'short',year:'2-digit'}):'da fare'}</em></a>`; }).join('')}<a class="testchip lex" href="#lessico"><b>Lessico</b><span>${LESSICO.length} temi</span><em>${Object.keys(S.voc).filter(k=>S.voc[k]).length} parole imparate</em></a></div>
  </section>`;
}
function bindHome(){ const m=$('#main'); bindTasks(m,renderHome); bindReplan(m,renderHome); bindCal($('#calbox'),renderHome); }

/* pagina: il mio piano */
let planWeek=0;
function weekStart(off){ const d=new Date(); d.setHours(12); const wd=(d.getDay()+6)%7; d.setDate(d.getDate()-wd+7*off); return dayKey(d); }
function renderPiano(){
  const c=cfg(), steps=STEPS(), nd=steps.filter(stepDone).length, ws=weekStart(planWeek), today=dayKey();
  const milestones=[];
  BANDS.forEach((b,bi)=>{ const ids=UNITS.filter(u=>u.band===bi).map(u=>u.id); const last=steps.filter(s=>ids.includes(s.uid)).map(s=>S.plan.a[s.id]).filter(Boolean).sort().pop(); if(last) milestones.push([bi===0?'Fine dei Primi passi (A1)':'Fine del livello '+b,last]); });
  TESTS.forEach(t=>{ const d=S.plan.a['T'+t.id]; if(d) milestones.push([t.title,d]); });
  milestones.sort((a,b)=>a[1].localeCompare(b[1]));
  const days=[...Array(7)].map((_,i)=>kAdd(ws,i));
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Ogni giorno · il tuo calendario</div><h1 class="title">Il mio piano</h1>
   <p class="subtitle">Ogni giorno 20–30 minuti, organizzati intorno alle tue lezioni del martedì e del giovedì e ai tuoi giorni di lavoro, che cambiano ogni mese: nei giorni di lavoro non c'è niente da fare. Le attività si spuntano da sole quando le completi nel quaderno; puoi anche spuntarle a mano.</p></header>
   ${todayCard()}
   <div class="card calcard" id="calbox">${calHTML()}</div>
   <h2 class="sec">La settimana nel dettaglio</h2>
   <div class="weeknav"><button class="btn" type="button" id="wprev">←</button><b>${kFmt(days[0],{day:'numeric',month:'long'})} – ${kFmt(days[6],{day:'numeric',month:'long',year:'numeric'})}</b><button class="btn" type="button" id="wnext">→</button>${planWeek?'<button class="btn ghost" type="button" id="wtoday">Oggi</button>':''}</div>
   <div class="week">${days.map(k=>{ const di=dayInfo(k), isT=k===today, past=k<today, all=di.items.length&&di.nDone===di.items.length;
     return `<div class="wday ${di.type} ${isT?'today':''} ${past?'past':''} ${all?'done':''}"><div class="wdh"><b>${WD[kDate(k).getDay()]} ${kDate(k).getDate()}</b><span>${DAY_LAB[di.type]}</span></div>
      ${di.items.length?`${itemsHTML(di,k,'sm')}<span class="note">${di.nDone}/${di.items.length} · ${di.mins} min</span>`:`<p class="note">${di.type==='work'?'Lavoro: niente compiti':di.type==='free'?'Riposo (facoltativo: un video o una canzone)':'—'}</p>`}</div>`; }).join('')}</div>
   <div class="rgrid" style="margin-top:18px">
    <div class="card"><span class="lab">Percorso</span><b class="big">${Math.round(100*nd/steps.length)}<small>%</small></b><span class="rw-bar"><i style="width:${Math.round(100*nd/steps.length)}%"></i></span><span class="note">${nd} attività fatte su ${steps.length}</span></div>
    <div class="card"><span class="lab">Fine prevista del quaderno</span><b class="big" style="font-size:30px">${kFmt(planEnd(),{day:'numeric',month:'long',year:'numeric'})}</b><span class="note">se segui il piano a questo ritmo</span></div>
    <div class="card"><span class="lab">Serie</span><b class="big">${planStreak()}<small> giorni</small></b><span class="note">giorni consecutivi con il piano fatto</span></div>
   </div>
   <section class="card"><div class="card-h"><div><span class="lab">Traguardi</span><h3>Le date importanti</h3></div></div><ul class="miles">${milestones.map(([t,d])=>`<li class="${d<today?'pastm':''}"><b>${kFmt(d,{day:'numeric',month:'long',year:'numeric'})}</b><span>${esc(t)}</span></li>`).join('')}<li><b>${kFmt(c.brk[0],{day:'numeric',month:'long'})} – ${kFmt(c.brk[1],{day:'numeric',month:'long'})}</b><span>Pausa per le feste${c.hol==='light'?' (ripasso leggero lun, mer, ven)':''}</span></li></ul></section>
   <details class="card plancfg"><summary><b>Impostazioni del piano</b> <span class="note">giorni del corso, lavoro, minuti, feste</span></summary>
    <div class="cfgrow"><span>Giorni di lezione al corso</span><span class="chipsel" id="cfg-cls">${[1,2,3,4,5,6,0].map(w=>`<button type="button" data-w="${w}" aria-pressed="${c.cls.includes(w)}">${WD[w]}</button>`).join('')}</span></div>
    <div class="cfgrow"><span>Giorni di lavoro<br><small class="note">a rotazione: ogni mese si spostano di un giorno</small></span><span class="chipsel" id="cfg-wk">${(()=>{ const t=kDate(today), wi=workIdx(t.getFullYear(),t.getMonth()+1); return `<button type="button" data-wk="off" aria-pressed="${wi<0}">nessuno</button>`+WPAIRS.map((_,i)=>`<button type="button" data-wk="${i}" aria-pressed="${wi===i}">${pairLab(i)}</button>`).join(''); })()}</span></div>
    ${(()=>{ const t=kDate(today); if(workIdx(t.getFullYear(),t.getMonth()+1)<0) return ''; const out=[]; for(let j=0;j<6;j++){ const d=new Date(t.getFullYear(),t.getMonth()+j,1,12); out.push(`<b>${d.toLocaleDateString('it-IT',{month:'short'})}</b> ${pairLab(workIdx(d.getFullYear(),d.getMonth()+1))}`); } return `<p class="note">Questo mese scegli i tuoi due giorni; i mesi seguenti si calcolano da soli: ${out.join(' · ')}.</p>`; })()}
    <div class="cfgrow"><span>Minuti al giorno</span><span class="chipsel" id="cfg-min">${[20,25,30].map(m=>`<button type="button" data-m="${m}" aria-pressed="${c.min===m}">${m} min</button>`).join('')}</span></div>
    <div class="cfgrow"><span>Domenica</span><span class="chipsel" id="cfg-sun"><button type="button" data-s="1" aria-pressed="${c.sunFree}">giorno libero</button><button type="button" data-s="0" aria-pressed="${!c.sunFree}">si studia</button></span></div>
    <div class="cfgrow"><span>Pausa per le feste</span><span class="cfgdates"><label>dal <input type="date" id="cfg-b0" value="${c.brk[0]}"></label><label>al <input type="date" id="cfg-b1" value="${c.brk[1]}"></label></span></div>
    <div class="cfgrow"><span>Durante le feste</span><span class="chipsel" id="cfg-hol"><button type="button" data-h="pause" aria-pressed="${c.hol==='pause'}">pausa totale</button><button type="button" data-h="light" aria-pressed="${c.hol==='light'}">ripasso leggero (10 min, 3 volte a settimana)</button></span></div>
    <p class="note">Cambiando le impostazioni, il piano viene ricalcolato da oggi. Le attività già fatte restano dove sono.</p>
    <div class="btnrow"><button class="btn" type="button" data-replan>Ripianifica da oggi</button></div></details>`;
  const m=$('#main'); bindTasks(m,renderPiano); bindReplan(m,renderPiano); bindCal($('#calbox'),renderPiano);
  $('#wprev').onclick=()=>{ planWeek--; renderPiano(); }; $('#wnext').onclick=()=>{ planWeek++; renderPiano(); };
  const wt=$('#wtoday'); if(wt) wt.onclick=()=>{ planWeek=0; renderPiano(); };
  const setC=p=>{ S.planCfg=Object.assign({},cfg(),p); buildPlan(dayKey()); renderNav(route()); renderPiano(); const d=$('.plancfg'); if(d) d.open=true; };
  m.querySelectorAll('#cfg-cls [data-w]').forEach(b=>b.onclick=()=>{ const w=+b.dataset.w, cl=cfg().cls.slice(), i=cl.indexOf(w); if(i>=0) cl.splice(i,1); else cl.push(w); setC({cls:cl}); });
  m.querySelectorAll('#cfg-wk [data-wk]').forEach(b=>b.onclick=()=>{ const v=b.dataset.wk, t=kDate(today); setC({work:v==='off'?{on:false,ref:'2026-11',i:0}:{on:true,ref:`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}`,i:+v}}); });
  m.querySelectorAll('#cfg-min [data-m]').forEach(b=>b.onclick=()=>setC({min:+b.dataset.m}));
  m.querySelectorAll('#cfg-sun [data-s]').forEach(b=>b.onclick=()=>setC({sunFree:b.dataset.s==='1'}));
  m.querySelectorAll('#cfg-hol [data-h]').forEach(b=>b.onclick=()=>setC({hol:b.dataset.h}));
  ['cfg-b0','cfg-b1'].forEach((id,i)=>{ const el=$('#'+id); el.onchange=()=>{ const v=el.value; if(!/^\d{4}-\d{2}-\d{2}$/.test(v)) return; const b=cfg().brk.slice(); b[i]=v; if(b[0]>b[1]) return; setC({brk:b}); }; });
}

/* ---------- quaderno degli errori ---------- */
const INT=[1,3,7,15];
const BOXLAB=['tra 1 giorno','tra 3 giorni','tra 7 giorni','tra 15 giorni'];
function addErr(key,k,d,src){
  if(!key) return;
  const e=S.err[key];
  S.err[key]={k,d,src:src||(e&&e.src)||'',b:0,due:addDays(1),u:Date.now(),w:((e&&e.w)||0)+1};
  const ks=Object.keys(S.err); if(ks.length>600) ks.sort((a,b)=>S.err[a].u-S.err[b].u).slice(0,ks.length-600).forEach(x=>delErr(x));
  save(); refreshErrBadge();
}
function delErr(key){ if(!S.err[key]) return; delete S.err[key]; S.errDel[key]=Date.now(); }
function removeErr(key){ if(key&&S.err[key]){ delErr(key); save(); refreshErrBadge(); } }
function errDue(){ const t=dayKey(); return Object.keys(S.err).filter(k=>S.err[k].due<=t); }
function refreshErrBadge(){ const r=route(); if(r.type!=='unit') return; renderNav(r); }
function reviewResult(key,ok){
  const e=S.err[key]; if(!e) return;
  if(ok){ if(e.b>=3){ delErr(key); S.mastered=(S.mastered||0)+1; } else { e.b++; e.due=addDays(INT[e.b]); e.u=Date.now(); } }
  else { e.b=0; e.due=addDays(1); e.u=Date.now(); e.w=(e.w||0)+1; }
  save();
}
function errLabel(e){
  const d=e.d;
  switch(e.k){
    case 'fill': case 'fix': return d.p.replace(/[{}]/g,'');
    case 'mc': return d.q;
    case 'order': return d.s;
    case 'verb': return `${d.v} · ${TEMPI[d.t]} · ${PERSONE[d.p]}`;
    case 'lab': return d.q;
    case 'falso': return `Falso amico: ${d.w}`;
    case 'dict': return `Dettato: ${d.s}`;
    case 'myvoc': { const w=S.myvoc[d.k]; return w?`Le mie parole: ${w.it}`:'Le mie parole'; }
    case 'vocab': { const w=LESSICO[d.t]&&LESSICO[d.t].w[d.i]; return w?`Lessico: ${w[0]}`:'Lessico'; }
  }
  return '';
}
let rvQueue=[], rvPos=0, rvOk=0, rvMode='list';
function renderRipasso(){
  const all=Object.keys(S.err), due0=errDue(), mt=memToday(), ms=memStats(), due={length:due0.length+mt.length};
  const boxes=[0,0,0,0]; all.forEach(k=>boxes[Math.min(3,S.err[k].b)]++);
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Ogni giorno · ripasso</div><h1 class="title">Quaderno degli errori</h1>
   <p class="subtitle">Ogni risposta sbagliata finisce qui e torna a trovarti dopo 1, 3, 7 e 15 giorni. Se la indovini quattro volte di fila, la consideri imparata.</p></header>
   <div class="rgrid">
    <div class="card ${due.length?'due':''}"><span class="lab">Da ripassare oggi</span><b class="big">${due.length}</b><span class="note">${due0.length} errori · ${mt.length} carte della memoria</span><div class="btnrow"><button class="btn primary" id="rvstart" ${due.length?'':'disabled'}>Inizia il ripasso</button></div></div>
    <div class="card"><span class="lab">In attesa</span><b class="big">${all.length-due0.length}</b><button class="btn" id="rvall" ${all.length?'':'disabled'}>Ripassa tutto in anticipo</button></div>
    <div class="card"><span class="lab">Imparati</span><b class="big">${S.mastered}</b><span class="note">errori trasformati in certezze</span></div>
   </div>
   <div class="boxes">${boxes.map((n,i)=>`<div class="box"><span class="lab">Scatola ${i+1}</span><b>${n}</b><span class="note">torna ${BOXLAB[i]}</span></div>`).join('')}</div>
   <section class="card memcard"><div class="card-h"><div><span class="lab">Memoria a lungo termine</span><h3>Quello che sai già, ripassato al momento giusto</h3></div></div>
    <p>Anche le risposte <b>giuste</b> si dimenticano. Per ogni serie di esercizi che completi, alcune frasi entrano qui, insieme ai verbi dei tempi che hai studiato. Tornano dopo 3, 7, 15, 30 e 60 giorni, al massimo ${MEM_PER_DAY} al giorno dentro il ripasso del giorno. Se sbagli, la carta ricomincia e la frase va anche nel quaderno degli errori.</p>
    <div class="boxes"><div class="box"><span class="lab">Nella memoria</span><b>${ms.n}</b><span class="note">carte in giro</span></div><div class="box"><span class="lab">Oggi</span><b>${mt.length}</b><span class="note">da ripassare</span></div><div class="box"><span class="lab">Consolidate</span><b>${ms.done}</b><span class="note">5 ripassi giusti</span></div></div></section>
   <section class="card" id="rvcard" hidden></section>
   <section class="card"><div class="card-h"><div><span class="lab">Elenco</span><h3>Tutti gli errori salvati</h3></div><span class="note">${all.length} in totale</span></div>
    ${all.length?`<ul class="errlist">${all.sort((a,b)=>S.err[a].due.localeCompare(S.err[b].due)).slice(0,300).map(k=>{ const e=S.err[k]; return `<li><div><div class="el-t">${esc(errLabel(e))}</div><div class="note">${esc(e.src)} · scatola ${e.b+1} · ${e.due<=dayKey()?'<b class="due-t">oggi</b>':'il '+new Date(e.due+'T12:00:00').toLocaleDateString('it-IT',{day:'numeric',month:'short'})}${e.w>1?` · sbagliato ${e.w} volte`:''}</div></div><button class="btn ghost" data-del="${esc(k)}" title="Rimuovi">Rimuovi</button></li>`; }).join('')}</ul>`:`<p>Ancora nessun errore salvato. Quando sbagli un esercizio, una frase, un verbo o una parola, lo ritrovi qui.</p>`}
   </section>`;
  $('#rvstart').onclick=()=>startDaily();
  $('#rvall').onclick=()=>startReview(Object.keys(S.err));
  $('#main').querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{ removeErr(b.dataset.del); renderNav(route()); renderRipasso(); });
}
function startDaily(){
  const list=[...errDue().map(key=>({e:S.err[key],lab:`${S.err[key].src} · scatola ${S.err[key].b+1}`,onRes:ok=>reviewResult(key,ok)})),
    ...memToday().map(key=>{ const it=memItem(key); if(!it){ delete S.mem[key]; return null; } return {e:it,lab:'Memoria · '+it.src,onRes:ok=>memResult(key,ok,it)}; }).filter(Boolean)];
  const c=$('#rvcard'); c.hidden=false; c.scrollIntoView({block:'start',behavior:'smooth'});
  quizRun(c,shuffle(list),{onEnd:(ok,tot,card)=>{ S.revDays[dayKey()]=1; save();
    card.innerHTML=`<div class="drill"><div class="pen" style="font-size:40px">Finito!</div><p class="lead" style="margin:10px auto">${ok} giuste su ${tot}. Le risposte giuste vanno avanti; quelle sbagliate tornano domani.</p><div class="btnrow" style="justify-content:center"><button class="btn primary" id="rvback">Torna al quaderno</button></div></div>`;
    $('#rvback').onclick=()=>{ renderNav(route()); renderRipasso(); }; }});
}
function startReview(keys){
  rvQueue=shuffle(keys); rvPos=0; rvOk=0;
  const c=$('#rvcard'); c.hidden=false; c.scrollIntoView({block:'start',behavior:'smooth'});
  nextReview();
}
function nextReview(){
  const c=$('#rvcard');
  if(rvPos>=rvQueue.length){
    S.revDays[dayKey()]=1; save();
    c.innerHTML=`<div class="drill"><div class="pen" style="font-size:40px">Finito!</div><p class="lead" style="margin:10px auto">${rvOk} giuste su ${rvQueue.length}. Le risposte giuste salgono di scatola; quelle sbagliate tornano domani.</p><div class="btnrow" style="justify-content:center"><button class="btn primary" id="rvback">Torna al quaderno</button></div></div>`;
    $('#rvback').onclick=()=>{ renderNav(route()); renderRipasso(); };
    return;
  }
  const key=rvQueue[rvPos], e=S.err[key];
  if(!e){ rvPos++; return nextReview(); }
  c.innerHTML=`<div class="card-h"><span class="lab">${esc(e.src)} · scatola ${e.b+1}</span><span class="note">${rvPos+1} / ${rvQueue.length}</span></div><div id="rvbody"></div><div class="fb" id="rvfb"></div><div class="btnrow" style="margin-top:14px"><button class="btn primary" id="rvcheck">Verifica</button><button class="btn" id="rvnext" hidden>Avanti →</button></div>`;
  let answered=false;
  const finish=(ok,html)=>{
    if(answered) return; answered=true;
    reviewResult(key,ok); tick(); if(ok) rvOk++;
    $('#rvfb').innerHTML=(ok?'<span class="mark ok">Giusto! ✓</span>':'<span class="mark no">Non ancora…</span>')+(html||'');
    $('#rvcheck').hidden=true; const nx=$('#rvnext'); nx.hidden=false; nx.focus();
  };
  $('#rvnext').onclick=()=>{ rvPos++; nextReview(); };
  reviewCard($('#rvbody'),e,finish);
}
function reviewCard(box,e,finish){
  if(reviewExtra(box,e,finish)) return;
  const d=e.d, chk=$('#rvcheck');
  const enterTo=(el,fn)=>el.addEventListener('keydown',ev=>{ if(ev.key==='Enter'&&!ev.shiftKey){ ev.preventDefault(); if(!$('#rvnext').hidden) $('#rvnext').click(); else fn(); } });
  if(e.k==='fill'){
    const multi=Array.isArray(d.a[0]); const answers=multi?d.a:[d.a];
    let txt=d.p, hint=''; const m=txt.match(/\s*(\([^()]*\))\s*$/); if(m){ hint=m[1]; txt=txt.slice(0,m.index); }
    let bi=0; box.innerHTML=`<div class="sent rvsent">${esc(txt).replace(/___/g,()=>{ const a=answers[bi]||['']; const w=Math.max(4,...a.map(x=>x.length))+2; return `<input class="blank" data-b="${bi++}" style="width:${w}ch" autocomplete="off" autocapitalize="off" spellcheck="false">`; })}${hint?`<span class="hint">${esc(hint)}</span>`:''}</div>`;
    const ins=[...box.querySelectorAll('.blank')]; ins[0]&&ins[0].focus({preventScroll:true});
    const go=()=>{ let ok=true; ins.forEach(inp=>{ const r=judge(inp.value,answers[+inp.dataset.b]); inp.classList.add(r); if(r==='no') ok=false; }); finish(ok, `<p class="corrected">${esc(answers.map(a=>a[0]).join(' · '))}</p>${d.e?`<p class="expl">${esc(d.e)}</p>`:''}`); };
    ins.forEach(i=>enterTo(i,go)); chk.onclick=go;
  } else if(e.k==='fix'){
    box.innerHTML=`<div class="sent rvsent">${esc(d.p).replace(/\{([^}]*)\}/,'<span class="err">$1</span>')}</div><div class="fixline">Correzione: <input class="blank" style="width:${Math.max(12,...d.a.map(x=>x.length))+2}ch" autocomplete="off" autocapitalize="off" spellcheck="false"></div>`;
    const inp=box.querySelector('.blank'); inp.focus({preventScroll:true});
    const go=()=>{ const r=judge(inp.value,d.a); inp.classList.add(r); finish(r!=='no',`<p class="corrected">✓ ${esc(d.c)}</p>`); };
    enterTo(inp,go); chk.onclick=go;
  } else if(e.k==='mc' || e.k==='falso' || e.k==='vocab'){
    let q,o,c,ex='';
    if(e.k==='mc'){ q=d.q; o=d.o; c=d.c; ex=d.e; }
    else if(e.k==='falso'){ const f=FALSI.find(x=>x[0]===d.w)||FALSI[0]; o=shuffle([f[1],...shuffle(FALSI.filter(x=>x!==f)).slice(0,3).map(x=>x[1])]); q=`Che cosa significa «${f[0]}»?`; c=o.indexOf(f[1]); ex=`Attenzione: ${f[2]}. Es.: ${f[3]}`; }
    else { const th=LESSICO[d.t], w=th.w[d.i]; o=shuffle([w[0],...shuffle(th.w.filter(x=>x!==w)).slice(0,3).map(x=>x[0])]); q=`Come si dice «${w[1]}»?`; c=o.indexOf(w[0]); ex=w[2]; }
    box.innerHTML=`<div class="q rvsent">${esc(q)}</div><div class="opts">${o.map((x,j)=>`<button class="opt" data-j="${j}">${esc(x)}</button>`).join('')}</div>`;
    chk.hidden=true;
    box.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{ const j=+b.dataset.j; box.querySelectorAll('.opt').forEach((x,k)=>{ x.disabled=true; if(k===c) x.classList.add('ok'); }); if(j!==c) b.classList.add('no'); finish(j===c, ex?`<p class="expl">${esc(ex)}</p>`:''); });
  } else if(e.k==='order'){
    const ctl=makeOrder(box,[d.s,d.al||[]]); box.querySelector('.ordbox')||box.classList.add('ordbox');
    chk.onclick=()=>{ const ok=ctl.check(); if(ctl.incomplete()) return; finish(ok,''); };
  } else if(e.k==='verb'){
    const forms=coniuga(d.v,d.t), ans=forms[d.p];
    box.innerHTML=`<div class="drill" style="padding:6px 0"><div class="verb" style="font-size:40px">${d.v}</div><div class="note">${esc(VERBI[d.v].pt||'')}</div><div class="meta"><b>${TEMPI[d.t]}</b></div><div class="pers">${PERSONE[d.p]}</div><input id="rvin" autocomplete="off" autocapitalize="off" spellcheck="false"></div>`;
    const inp=$('#rvin'); inp.focus({preventScroll:true});
    const go=()=>{ if(!inp.value.trim()) return; const r=judge(inp.value,[ans]); finish(r!=='no',`<p class="corrected">${esc(ans)}</p>`); };
    enterTo(inp,go); chk.onclick=go;
  } else if(e.k==='lab'){
    box.innerHTML=`<span class="lab note">${esc(d.s)}</span><p class="labq">${esc(d.q)}</p><textarea class="labin" rows="2" id="rvin" spellcheck="false" autocapitalize="off"></textarea>`;
    const inp=$('#rvin'); inp.focus({preventScroll:true});
    const strip2=x=>canon(x).normalize('NFD').replace(/[̀-ͯ]/g,'');
    const go=()=>{ if(!inp.value.trim()) return; const ok=d.a.some(a=>strip2(a)===strip2(inp.value)); finish(ok,`<div class="sols"><span class="note">Soluzioni:</span><ul>${d.a.map(a=>`<li>${esc(a)}</li>`).join('')}</ul></div>${d.n?`<p class="expl">${esc(d.n)}</p>`:''}`); };
    enterTo(inp,go); chk.onclick=go;
  }
}

/* ---------- verifiche ---------- */
let testTimer=null, testState=null;
function stopTestTimer(){ if(testTimer){ clearInterval(testTimer); testTimer=null; } }
function renderTest(id){
  const T=TESTS.find(t=>t.id===id), r=S.tests[id];
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Verifica · ${T.range?"Primi passi ":"unità "}${tRange(T)} · livello ${T.lvl}</div><h1 class="title">${T.title}</h1>
   <p class="subtitle">Una prova nello stile degli esami CILS e CELI: lettura, testo a buchi e grammatica. 30 minuti, nessun suggerimento, 20 punti. Si supera con 12; con 17 è «con distinzione».</p></header>
   <div id="tbody"></div>`;
  if(testState&&testState.id===id&&testState.result) return showTestResult(T);
  const tb=$('#tbody');
  tb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">Prima di cominciare</span><h3>Come funziona</h3></div>${r?`<span class="score ${r.passed?'good':''}">${r.best}/20</span>`:''}</div>
   <ul class="dots"><li><b>Parte A · Lettura</b>: un testo e 5 domande (5 punti).</li><li><b>Parte B · Testo a buchi</b>: 8 spazi da completare (8 punti). Gli accenti contano.</li><li><b>Parte C · Grammatica</b>: 7 domande a scelta multipla (7 punti).</li></ul>
   <p>Il tempo parte quando premi «Comincia». Allo scadere la verifica si consegna da sola. Non cambiare pagina durante la prova, altrimenti dovrai ricominciare. Gli errori finiranno nel quaderno degli errori.</p>
   ${r?`<p class="note">Ultimo tentativo: ${r.last}/20 · migliore: ${r.best}/20${r.passed?' · superata il '+new Date(r.pdate).toLocaleDateString('it-IT'):''}</p>`:''}
   <div class="btnrow"><button class="btn primary" id="tstart">Comincia la verifica</button>${r&&r.passed?'<button class="btn" id="tcert">Vedi l\'attestato</button>':''}</div></section><div id="certbox"></div>`;
  $('#tstart').onclick=()=>startTest(T);
  const cb=$('#tcert'); if(cb) cb.onclick=()=>{ $('#certbox').innerHTML=certHTML(T,S.tests[id]); bindCert(T); };
}
function startTest(T){
  testState={id:T.id,end:Date.now()+30*60000,ans:{read:[],mc:[]},result:null};
  const R=T.reading;
  let bi=0;
  const cloze=esc(T.cloze.text).replace(/\[(\d)\]\s*(\([^)]*\))?/g,(m,n,h)=>`<span class="tblank"><sup>${n}</sup><input class="blank" data-c="${+n-1}" style="width:${Math.max(6,...T.cloze.a[+n-1].map(x=>x.length))+2}ch" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="spazio ${n}">${h?`<span class="hint">${h}</span>`:''}</span>`);
  $('#tbody').innerHTML=`<div class="timer" id="timer"><span>Tempo rimasto <b id="tleft">30:00</b></span><button class="btn primary" id="tsend">Consegna</button></div>
   <section class="card"><div class="card-h"><div><span class="lab">Parte A · 5 punti</span><h3>Lettura: ${esc(R.title)}</h3></div></div><article class="reading" style="font-size:17px">${R.text}</article>
    <ol class="items">${R.q.map((q,i)=>`<li><div><div class="q">${esc(q[0])}</div><div class="opts" data-g="read" data-i="${i}">${q[1].map((o,j)=>`<button class="opt" data-j="${j}">${esc(o)}</button>`).join('')}</div></div></li>`).join('')}</ol></section>
   <section class="card"><div class="card-h"><div><span class="lab">Parte B · 8 punti</span><h3>Testo a buchi: ${esc(T.cloze.title)}</h3></div></div><p class="sent cloze">${cloze}</p></section>
   <section class="card"><div class="card-h"><div><span class="lab">Parte C · 7 punti</span><h3>Grammatica</h3></div></div>
    <ol class="items">${T.mc.map((q,i)=>`<li><div><div class="q">${esc(q[0])}</div><div class="opts" data-g="mc" data-i="${i}">${q[1].map((o,j)=>`<button class="opt" data-j="${j}">${esc(o)}</button>`).join('')}</div></div></li>`).join('')}</ol></section>
   <div class="btnrow" style="justify-content:flex-end"><button class="btn primary" id="tsend2">Consegna la verifica</button></div>`;
  $('#tbody').querySelectorAll('.opts').forEach(g=>g.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{ g.querySelectorAll('.opt').forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); testState.ans[g.dataset.g][+g.dataset.i]=+b.dataset.j; }));
  $('#tsend').onclick=$('#tsend2').onclick=()=>gradeTest(T);
  stopTestTimer();
  const upd=()=>{ const left=Math.max(0,testState.end-Date.now()); const m=Math.floor(left/60000), s=Math.floor(left%60000/1000); const el=$('#tleft'); if(!el){ stopTestTimer(); return; } el.textContent=`${m}:${String(s).padStart(2,'0')}`; $('#timer').classList.toggle('low',left<5*60000); if(left<=0){ stopTestTimer(); gradeTest(T); } };
  upd(); testTimer=setInterval(upd,1000);
  window.scrollTo(0,0);
}
function gradeTest(T){
  if(!testState||testState.result) return;
  stopTestTimer();
  const src=`${T.title}`;
  const read=T.reading.q.map((q,i)=>{ const ok=testState.ans.read[i]===q[2]; if(!ok) addErr(`t${T.id}-r-${i}`,'mc',{q:q[0],o:q[1],c:q[2],e:''},src+' · lettura'); return ok; });
  const clozeVals=[...$('#tbody').querySelectorAll('[data-c]')].sort((a,b)=>a.dataset.c-b.dataset.c).map(x=>x.value);
  const cloze=T.cloze.a.map((a,i)=>{ const ok=judge(clozeVals[i]||'',a)==='ok'; if(!ok) addErr(`t${T.id}-c-${i}`,'fill',{p:clozeSentence(T,i),a:a,e:''},src+' · testo a buchi'); return ok; });
  const mc=T.mc.map((q,i)=>{ const ok=testState.ans.mc[i]===q[2]; if(!ok) addErr(`t${T.id}-m-${i}`,'mc',{q:q[0],o:q[1],c:q[2],e:''},src+' · grammatica'); return ok; });
  const score=[...read,...cloze,...mc].filter(Boolean).length;
  const passed=score>=12;
  const prev=S.tests[T.id]||{};
  S.tests[T.id]={best:Math.max(prev.best||0,score),last:score,date:Date.now(),passed:prev.passed||passed,pdate:prev.passed?prev.pdate:(passed?Date.now():null),dist:(prev.dist||score>=17)};
  tick(20);
  save();
  testState.result={score,read,cloze,mc,clozeVals,passed};
  renderNav(route());
  showTestResult(T);
}
function clozeSentence(T,i){
  const plain=T.cloze.text.replace(/\[(\d)\]\s*(\([^)]*\))?/g,(m,n,h)=>+n-1===i?`___ ${h||''}`:T.cloze.a[+n-1][0]);
  const parts=plain.split(/(?<=[.!?»])\s+/); const p=parts.find(x=>x.includes('___'))||plain;
  const hm=p.match(/___ (\([^)]*\))/); return (hm? p.replace(hm[0],'___')+' '+hm[1] : p).trim();
}
function showTestResult(T){
  const R=testState.result, sc=R.score, lab=sc>=17?'Superata con distinzione':sc>=12?'Superata':'Non ancora superata';
  const sec=(name,arr,max)=>`<div class="box"><span class="lab">${name}</span><b>${arr.filter(Boolean).length}/${max}</b></div>`;
  $('#tbody').innerHTML=`<section class="card result ${R.passed?'pass':''}"><div class="drill"><span class="lab">Risultato</span><div class="verb">${sc}<small style="font-size:.45em">/20</small></div><div class="pen" style="font-size:30px">${lab}</div>
    <p class="note">${R.passed?'Ottimo lavoro: gli errori sono nel quaderno, ripassali nei prossimi giorni.':'Servono 12 punti. Ripassa gli errori nel quaderno e riprova tra qualche giorno.'}</p></div>
    <div class="boxes">${sec('Lettura',R.read,5)}${sec('Testo a buchi',R.cloze,8)}${sec('Grammatica',R.mc,7)}</div>
    <div class="btnrow" style="justify-content:center"><a class="btn" href="#ripasso">Vai al quaderno degli errori</a><button class="btn" id="tagain">Rifai la verifica</button></div></section>
   <section class="card"><div class="card-h"><h3>Correzione</h3></div>
    <ol class="items">
     ${T.reading.q.map((q,i)=>`<li><div><div class="q">${esc(q[0])}</div><div class="${R.read[i]?'corrected':'expl'}">${R.read[i]?'✓':'✗ risposta giusta:'} ${esc(q[1][q[2]])}</div></div></li>`).join('')}
     ${T.cloze.a.map((a,i)=>`<li><div><div class="q">Spazio ${i+1}: <i>${esc(R.clozeVals[i]||'—')}</i></div><div class="${R.cloze[i]?'corrected':'expl'}">${R.cloze[i]?'✓':'✗ soluzione:'} ${esc(a.join(' / '))}</div></div></li>`).join('')}
     ${T.mc.map((q,i)=>`<li><div><div class="q">${esc(q[0])}</div><div class="${R.mc[i]?'corrected':'expl'}">${R.mc[i]?'✓':'✗ risposta giusta:'} ${esc(q[1][q[2]])}</div></div></li>`).join('')}
    </ol></section>
   <div id="certbox">${R.passed?certHTML(T,S.tests[T.id]):''}</div>`;
  $('#tagain').onclick=()=>{ testState=null; renderTest(T.id); };
  if(R.passed) bindCert(T);
  window.scrollTo(0,0);
}
function certHTML(T,r){
  return `<section class="cert"><div class="cert-in">
   <div class="eyebrow">Quaderno d'Italiano</div>
   <div class="cert-t">Attestato</div>
   <p>Si attesta che</p>
   <input class="cert-name" id="certname" value="${esc(S.name||'')}" placeholder="scrivi qui il tuo nome" aria-label="nome sull'attestato">
   <p>ha superato la <b>${T.title}</b> (${T.range?"Primi passi ":"unità "}${tRange(T)}) di livello <b>${T.lvl}</b><br>con il punteggio di <b>${r.best}/20</b>${r.dist||r.best>=17?', <i>con distinzione</i>':''}.</p>
   <div class="cert-foot"><span>${new Date(r.pdate||Date.now()).toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'})}</span><span class="seal">${T.lvl}</span></div>
  </div></section>`;
}
function bindCert(T){ const n=$('#certname'); if(n) n.addEventListener('input',()=>{ S.name=n.value; save(); }); }

/* ---------- lessico tematico ---------- */
let lexMode='lista', lexCard=null;
const lexNorm=t=>String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[’`']/g,'').replace(/[^a-z ]/g,' ').replace(/\s+/g,' ').trim();
const lexAccNorm=t=>String(t).toLowerCase().replace(/[’`]/g,"'").replace(/[^a-zàèéìíòóùú' ]/g,' ').replace(/\s+/g,' ').trim();
function lexForms(w){ const out=new Set(); [w.replace(/\(.*?\)/g,''),w.replace(/[()]/g,'')].forEach(v=>v.split('/').forEach(x=>{ const f=x.replace(/[?!…]/g,'').replace(/\s+/g,' ').trim(); if(!f) return; out.add(f); out.add(f.replace(/^(il|lo|la|i|gli|le|un|uno|una)\s+/i,'').replace(/^(l'|un')/i,'')); })); return [...out]; }
function sayWord(w){ if(canSpeak) speak(w[0].replace(/\s*\/\s*/g,', ')+'. '+w[2]); }
function renderLessico(id){
  if(id===undefined){
    const groups=[['Primi passi · A1','Le parole di tutti i giorni: con audio, carte e quiz. Ogni tema entra nel tuo piano insieme all\'unità dei Primi passi che gli corrisponde.',LEX_ORDER.filter(i=>LVL_RANK(LESSICO[i].lvl)===0)],['Dall\'A2 al C1','Il vocabolario per lavorare, discutere e scrivere bene.',LEX_ORDER.filter(i=>LVL_RANK(LESSICO[i].lvl)>0)]];
    const nW=LESSICO.reduce((a,t)=>a+t.w.length,0), nK=Object.keys(S.voc).filter(k=>S.voc[k]).length;
    $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Ogni giorno · lessico</div><h1 class="title">Lessico tematico</h1>
     <p class="subtitle">${nW} parole ed espressioni in ${LESSICO.length} temi, dalle prime parole dell'A1 al lessico formale del C1. Studia la lista ascoltando la pronuncia, ripassa con le carte, verifica con il quiz e con il dettato. Le parole sbagliate tornano nel quaderno degli errori.</p>
     <div class="uprog"><span class="track"><i style="width:${Math.round(100*nK/nW)}%"></i></span><span>${nK}/${nW} imparate</span></div></header>
     ${groups.map(([h,d,ids])=>`<h2 class="sec">${h}</h2><p class="note" style="margin-top:-6px">${d}</p><div class="lexgrid">${ids.map(i=>{ const t=LESSICO[i], k=t.w.filter(w=>S.voc[w[0]]).length; return `<a class="card lexcard ${S.lexSeen[i]?'seen':''}" href="#lessico-${i}"><span class="lab">${t.lvl} · ${t.w.length} parole</span><h3>${esc(t.t)}</h3><span class="rw-bar"><i style="width:${Math.round(100*k/t.w.length)}%"></i></span><span class="note">${k}/${t.w.length} imparate</span></a>`; }).join('')}</div>`).join('')}`;
    return;
  }
  const T=LESSICO[id]; const known=T.w.filter(w=>S.voc[w[0]]).length;
  const pos0=LEX_ORDER.indexOf(id), prev=LEX_ORDER[pos0-1], next=LEX_ORDER[pos0+1];
  const modes=[['lista','Lista'],['carte','Carte'],['quiz','Quiz']].concat(canSpeak?[['ascolta','Ascolta e scrivi']]:[]);
  if(!modes.some(m=>m[0]===lexMode)) lexMode='lista';
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow"><a href="#lessico">Lessico tematico</a> · ${T.lvl}</div><h1 class="title">${esc(T.t)}</h1>
   <div class="uprog"><span class="track"><i style="width:${Math.round(100*known/T.w.length)}%"></i></span><span>${known}/${T.w.length} imparate</span></div></header>
   <div class="seg" role="group">${modes.map(([k,l])=>`<button data-m="${k}" aria-pressed="${lexMode===k}">${l}</button>`).join('')}</div>
   <div id="lexbody"></div>
   <div class="btnrow" style="justify-content:space-between;margin-top:24px">${prev!==undefined?`<a class="btn ghost" href="#lessico-${prev}">← ${esc(LESSICO[prev].t)}</a>`:'<span></span>'}${next!==undefined?`<a class="btn ghost" href="#lessico-${next}">${esc(LESSICO[next].t)} →</a>`:''}</div>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ lexMode=b.dataset.m; renderLessico(id); });
  const lb=$('#lexbody');
  const seen=()=>{ if(!S.lexSeen[id]){ S.lexSeen[id]=dayKey(); save(); renderNav(route()); } };
  const err=i=>['voc-'+hashStr(T.w[i][0]),'vocab',{t:id,i},'Lessico · '+T.t];
  if(lexMode==='lista'){
    lb.innerHTML=`${canSpeak?'<p class="note">Tocca ▶ per sentire la parola e l\'esempio.</p>':''}<div class="tw"><table class="tbl lextbl">${T.w.map((w,i)=>`<tr>${canSpeak?`<td class="lxp"><button class="btn ghost play" type="button" data-say="${i}" aria-label="Ascolta ${esc(w[0])}">▶</button></td>`:''}<td><b>${esc(w[0])}</b></td><td class="pt">${esc(w[1])}</td><td><i>${esc(w[2])}</i></td><td><button class="btn ghost ${S.voc[w[0]]?'kn':''}" data-k="${i}">${S.voc[w[0]]?'✓ la so':'la so?'}</button></td></tr>`).join('')}</table></div>`;
    lb.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{ const w=T.w[+b.dataset.k]; S.voc[w[0]]=!S.voc[w[0]]; save(); renderLessico(id); });
    lb.querySelectorAll('[data-say]').forEach(b=>b.onclick=()=>sayWord(T.w[+b.dataset.say]));
  } else if(lexMode==='carte'){
    const order=[...T.w.keys()].sort((a,b)=>(S.voc[T.w[a][0]]?1:0)-(S.voc[T.w[b][0]]?1:0));
    let pos=0;
    const show=()=>{
      if(pos>=order.length){ seen(); lb.innerHTML=`<section class="card drill"><div class="pen" style="font-size:36px">Fatto!</div><p>Hai visto tutte le carte del tema. Quelle segnate «da ripassare» sono nel quaderno degli errori e tornano dopo 1, 3, 7 e 15 giorni.</p><button class="btn primary" id="lxagain">Ricomincia</button></section>`; $('#lxagain').onclick=()=>{ pos=0; show(); }; return; }
      const w=T.w[order[pos]];
      lb.innerHTML=`<p class="note">${pos+1} / ${order.length} · tocca la carta per girarla</p><button class="flip lexflip" id="lxcard"><div class="in"><div class="f"><b>${esc(w[0])}</b><small>${S.voc[w[0]]?'già imparata':'come si dice in portoghese?'}</small></div><div class="b"><span class="m">${esc(w[1])}</span><span class="ex">${esc(w[2])}</span></div></div></button>
       <div class="btnrow" style="justify-content:center;margin-top:16px">${canSpeak?'<button class="btn ghost" id="lxsay" type="button">▶ Ascolta</button>':''}<button class="btn" id="lxno">Da ripassare</button><button class="btn primary" id="lxyes">La so ✓</button></div>`;
      $('#lxcard').onclick=()=>$('#lxcard').classList.toggle('on');
      const sb=$('#lxsay'); if(sb) sb.onclick=()=>sayWord(w);
      $('#lxyes').onclick=()=>{ S.voc[w[0]]=true; removeErr('voc-'+hashStr(w[0])); tick(); save(); pos++; show(); };
      $('#lxno').onclick=()=>{ S.voc[w[0]]=false; addErr(...err(order[pos])); tick(); pos++; show(); };
    };
    show();
  } else if(lexMode==='ascolta'){
    const order=shuffle([...T.w.keys()]).slice(0,10); let pos=0, ok=0;
    const show=()=>{
      if(pos>=order.length){ if(ok>=7) seen(); lb.innerHTML=`<section class="card drill"><div class="pen" style="font-size:36px">${ok}/${order.length}</div><p>${ok>=7?'Ottimo orecchio!':'Riascolta le parole sbagliate nella lista: sono anche nel quaderno degli errori.'}</p><button class="btn primary" id="lxagain">Altre 10 parole</button></section>`; $('#lxagain').onclick=()=>renderLessico(id); return; }
      const i=order[pos], w=T.w[i];
      lb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">Dettato · ${pos+1}/${order.length}</span><h3>Ascolta e scrivi la parola</h3></div><span class="score">${ok}</span></div>
       <p class="note">Aiuto: <i>${esc(w[1])}</i>. Se è un nome, puoi scrivere anche l'articolo.</p>
       <div class="btnrow"><button class="btn" id="lxplay" type="button">▶ Ascolta</button><button class="btn ghost" id="lxslow" type="button">▶ Più lento</button></div>
       <div class="dictrow" style="margin-top:12px"><input id="lxin" class="inp" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="La parola che senti"><button class="btn primary" id="lxchk" type="button">Controlla</button></div><div id="lxfb" class="expl" hidden></div></section>`;
      const word=w[0].replace(/\s*\/\s*/g,', ');
      $('#lxplay').onclick=()=>speak(word); $('#lxslow').onclick=()=>speak(word,null,0.6); setTimeout(()=>speak(word),250);
      const inp=$('#lxin'); inp.focus({preventScroll:true}); let done=false;
      const chk=()=>{
        if(done){ pos++; show(); return; }
        const v=inp.value; if(!v.trim()) return; done=true;
        const forms=lexForms(w[0]), hit=forms.some(f=>lexNorm(f)===lexNorm(v)), exact=forms.some(f=>lexAccNorm(f)===lexAccNorm(v));
        const fb=$('#lxfb'); fb.hidden=false;
        if(hit){ ok++; S.voc[w[0]]=true; fb.innerHTML=`<span class="mark ok">giusto!</span> <b>${esc(w[0])}</b>${exact?'':' <span class="note">(attenzione ad accenti e apostrofi)</span>'} · <i>${esc(w[2])}</i>`; }
        else { addErr(...err(i)); fb.innerHTML=`<span class="mark no">no…</span> Era <b>${esc(w[0])}</b> · <i>${esc(w[2])}</i>`; }
        tick(); save(); $('#lxchk').textContent='Avanti →';
      };
      $('#lxchk').onclick=chk; inp.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); chk(); } });
    };
    show();
  } else {
    const qs=shuffle([...T.w.keys()]).slice(0,10).map(i=>{
      const w=T.w[i];
      if(Math.random()<.5){ const o=shuffle([w[0],...shuffle(T.w.filter(x=>x!==w)).slice(0,3).map(x=>x[0])]); const q=[`Come si dice «${w[1]}»?`,o,o.indexOf(w[0]),w[2]]; q.ix=i; return q; }
      const o=shuffle([w[1],...shuffle(T.w.filter(x=>x!==w)).slice(0,3).map(x=>x[1])]); const q=[`Che cosa significa «${w[0]}»?`,o,o.indexOf(w[1]),w[2]]; q.ix=i; return q;
    });
    lb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">10 domande</span><h3>Quiz: ${esc(T.t)}</h3></div><span class="score" id="lxscore"></span></div><ol class="items" id="lxq"></ol><div class="btnrow"><button class="btn primary" id="lxnew">Nuovo quiz</button></div></section>`;
    mcList($('#lxq'),qs,(sc,t)=>{ showScore($('#lxscore'),sc,t); if(sc>=7) seen(); },i=>err(qs[i].ix));
    $('#lxnew').onclick=()=>renderLessico(id);
  }
}

/* ---------- sincronizzazione ---------- */
let syncSt='local', dbRefs=null, pushing=false, pushAgain=false, pushT=null, lastPush=['',''];
function syncText(){ return {local:'○ Progressi salvati solo su questo dispositivo',sync:'◌ Sincronizzazione…',ok:'● Progressi sincronizzati sul tuo account',err:'○ Sincronizzazione non riuscita: riprovo al prossimo salvataggio',full:'○ Spazio esaurito: i progressi restano su questo dispositivo'}[syncSt]; }
function setSync(st){ syncSt=st; const el=$('#syncline'); if(el){ el.textContent=syncText(); el.className='syncline '+st; } }
function splitState(){ const o=JSON.parse(JSON.stringify(S)); const texts={write:o.write,corr:o.corr,gen:o.gen}; delete o.write; delete o.corr; delete o.gen; return [JSON.stringify(o),JSON.stringify(texts)]; }
function schedulePush(){ if(!dbRefs) return; clearTimeout(pushT); pushT=setTimeout(push,2500); }
async function push(){
  if(!dbRefs) return; if(pushing){ pushAgain=true; return; }
  pushing=true;
  try{
    const [c,t]=splitState();
    if(c!==lastPush[0]){ await dbRefs.core.set({json:c,at:S.at||0}); lastPush[0]=c; }
    if(t!==lastPush[1]){ await dbRefs.texts.set({json:t,at:S.at||0}); lastPush[1]=t; }
    setSync('ok');
  }catch(e){ setSync(e&&e.code==='quota_exceeded'?'full':'err'); }
  pushing=false;
  if(pushAgain){ pushAgain=false; push(); }
}
function mergeState(a,b){
  const [n,o]=(a.at||0)>=(b.at||0)?[a,b]:[b,a];
  const r=JSON.parse(JSON.stringify(n)), O=JSON.parse(JSON.stringify(o));
  ['ex','read','corr','gen','lesson','voc','tab','cult','spk','myvoc','orale','wpm','asc','story','planChk','revDays','schedaDays','planToast','lexSeen','books','mem','memDone','memDays','misto','ricordi','diario','frasi','frasiHide','ankiDays'].forEach(f=>{ r[f]=Object.assign({},O[f]||{},r[f]||{}); });
  r.write=Object.assign({},O.write||{},r.write||{});
  Object.keys(O.write||{}).forEach(k=>{ if(O.write[k]&&O.write[k].done&&r.write[k]) r.write[k].done=true; });
  r.days=Object.assign({},O.days||{}); Object.entries(n.days||{}).forEach(([k,v])=>{ r.days[k]=Math.max(v,r.days[k]||0); });
  r.errDel=Object.assign({},O.errDel||{}); Object.entries(n.errDel||{}).forEach(([k,v])=>{ r.errDel[k]=Math.max(v,r.errDel[k]||0); });
  r.err=Object.assign({},O.err||{}); Object.entries(n.err||{}).forEach(([k,v])=>{ if(!r.err[k]||v.u>=r.err[k].u) r.err[k]=v; });
  Object.keys(r.err).forEach(k=>{ if(r.errDel[k]&&r.err[k].u<=r.errDel[k]) delete r.err[k]; });
  const cut=Date.now()-60*864e5; Object.keys(r.errDel).forEach(k=>{ if(r.errDel[k]<cut) delete r.errDel[k]; });
  r.log=Object.assign({},O.log||{}); Object.entries(n.log||{}).forEach(([k,v])=>{ if(!r.log[k]||v.length>=r.log[k].length) r.log[k]=v; });
  r.mastered=Math.max(n.mastered||0,o.mastered||0);
  ['verbi','falsi'].forEach(f=>{ r[f]=r[f]||{}; const x=O[f]||{}; ['ok','tot','best'].forEach(z=>{ r[f][z]=Math.max(r[f][z]||0,x[z]||0); }); });
  r.lab=r.lab||{}; Object.keys(O.lab||{}).forEach(m=>{ r.lab[m]=r.lab[m]||{ok:0,tot:0}; r.lab[m].ok=Math.max(r.lab[m].ok,O.lab[m].ok||0); r.lab[m].tot=Math.max(r.lab[m].tot,O.lab[m].tot||0); });
  r.tests=Object.assign({},O.tests||{}); Object.entries(n.tests||{}).forEach(([k,v])=>{ const p=r.tests[k]; r.tests[k]=!p?v:{...v,best:Math.max(v.best||0,p.best||0),passed:!!(v.passed||p.passed),pdate:v.pdate||p.pdate,dist:!!(v.dist||p.dist)}; });
  r.name=n.name||o.name; r.at=Math.max(a.at||0,b.at||0);
  return r;
}
async function pullMerge(){
  const [a,b]=await Promise.all([dbRefs.core.get(),dbRefs.texts.get()]);
  if(a.exists){
    let remote=null;
    try{ remote=JSON.parse(a.data().json); if(b.exists) Object.assign(remote,JSON.parse(b.data().json)); }catch(e){ remote=null; }
    if(remote){
      const before=JSON.stringify(S);
      const merged=mergeState(S,remote);
      Object.keys(S).forEach(k=>delete S[k]); Object.assign(S,merged); ensureDefaults();
      try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){}
      if(JSON.stringify(S)!==before){ const r=route(); renderNav(r); if(r.type==='home') renderHome(); else if(r.type==='ripasso') renderRipasso(); }
    }
  }
  await push();
}
async function initSync(){
  if(!window.claude||!window.claude.use){ setSync('local'); return; }
  setSync('sync');
  try{
    const [db,user]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);
    const uid=user? await user.id() : null;
    if(!db||!uid){ setSync('local'); return; }
    const col=db.collection('data/users/'+uid);
    dbRefs={core:col.doc('quaderno'),texts:col.doc('quaderno-testi')};
    await pullMerge();
    document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible' && dbRefs) pullMerge().catch(()=>{}); });
  }catch(e){ dbRefs=null; setSync('local'); }
}

/* ---------- ascolta (sintesi vocale del browser) ---------- */
const canSpeak = (()=>{ try{ return 'speechSynthesis' in window && typeof SpeechSynthesisUtterance!=='undefined'; }catch(e){ return false; } })();
let speakingId=null;
function speakBtnHTML(id){ return canSpeak?`<button class="btn speak" id="${id}" type="button" aria-pressed="false">▶ Ascolta</button>`:''; }
function textOf(el,skip){ if(!el) return ''; const c=el.cloneNode(true); c.querySelectorAll(skip||'.speak').forEach(x=>x.remove()); c.querySelectorAll('p,li,h2,h3').forEach(x=>x.append('. ')); return c.textContent.replace(/\s+/g,' ').replace(/(\.\s*){2,}/g,'. ').trim(); }
let ttsVoice, ttsRunId=0, ttsWarned=false; const ttsHold=[];
function itVoice(){ if(ttsVoice!==undefined) return ttsVoice; try{ const vs=speechSynthesis.getVoices(); if(!vs.length) return null; ttsVoice=vs.find(v=>/^it[-_]IT/i.test(v.lang)&&v.localService)||vs.find(v=>/^it[-_]IT/i.test(v.lang))||vs.find(v=>/^it/i.test(v.lang))||null; return ttsVoice; }catch(e){ return null; } }
function ttsBusy(){ try{ return speechSynthesis.speaking||speechSynthesis.pending; }catch(e){ return false; } }
if(canSpeak){
  try{ speechSynthesis.addEventListener('voiceschanged',()=>{ ttsVoice=undefined; }); speechSynthesis.getVoices(); }catch(e){}
  /* iOS e Android: o primeiro áudio tem de nascer de um toque; depois a voz pode tocar também em sequência */
  const unlock=()=>{ ['pointerdown','touchend','keydown'].forEach(ev=>document.removeEventListener(ev,unlock,true)); try{ const u=new SpeechSynthesisUtterance(' '); u.volume=0; u.lang='it-IT'; speechSynthesis.speak(u); }catch(e){} };
  ['pointerdown','touchend','keydown'].forEach(ev=>document.addEventListener(ev,unlock,true));
}
const TTS_HELP=`<b>Non senti la voce?</b> No iPhone, desligue o <b>modo silencioso</b> (o botão na lateral) e aumente o volume. No Android, confira em Configurações → Acessibilidade → Saída de texto para fala se há voz <b>italiana</b> instalada. No app do Claude o áudio pode não funcionar: abra o caderno no Safari ou no Chrome.`;
function ttsRun(list,wasBusy){
  const run=++ttsRunId;
  const go=()=>{
    if(run!==ttsRunId) return;
    try{ speechSynthesis.resume(); }catch(e){}
    let started=false; ttsHold.length=0;
    list.forEach(u=>{ const f=u.onstart; u.onstart=e=>{ started=true; f&&f(e); }; ttsHold.push(u); speechSynthesis.speak(u); });
    setTimeout(()=>{ if(!started&&run===ttsRunId&&!ttsWarned){ ttsWarned=true; try{ toast(TTS_HELP); }catch(e){} } },3500);
  };
  if(wasBusy) setTimeout(go,150); else go();
}
function stopSpeak(){ ttsRunId++; try{ if(canSpeak) speechSynthesis.cancel(); }catch(e){} if(speakingId){ const b=document.getElementById(speakingId); if(b){ b.textContent=b.dataset.label||'▶ Ascolta'; b.setAttribute('aria-pressed','false'); } } speakingId=null; }
function speak(text,id,rate){
  if(!canSpeak||!text) return;
  const busy=ttsBusy(); stopSpeak();
  try{
    const parts=(text.match(/[^.!?»]+[.!?»]*/g)||[text]).map(p=>p.trim()).filter(Boolean);
    const v=itVoice();
    speakingId=id||null;
    ttsRun(parts.map((p,i)=>{ const u=new SpeechSynthesisUtterance(p); u.lang='it-IT'; if(v) u.voice=v; u.rate=rate||S.rate||0.9; if(i===parts.length-1) u.onend=()=>{ if(speakingId===(id||null)) stopSpeak(); }; return u; }),busy);
    if(id){ const b=document.getElementById(id); if(b){ b.textContent='■ Ferma'; b.setAttribute('aria-pressed','true'); } }
  }catch(e){ stopSpeak(); }
}
function bindSpeak(id,getText){ const b=document.getElementById(id); if(!b) return; b.onclick=()=>{ if(speakingId===id) stopSpeak(); else speak(getText(),id); }; }

/* ---------- cultura ---------- */
function homeCultura(){
  const read=k=>S.cult[k]&&S.cult[k].read;
  const next=CULTURA.findIndex((_,i)=>!read(i));
  return `<h2 class="sec">Cultura italiana</h2>
   <p>Per capire una lingua bisogna conoscere chi la parla. ${CULTURA.length} schede brevi, in italiano semplice con la traduzione in portoghese, curiosità e un piccolo quiz.</p>
   <div class="cultrow">${CULTURA.map((c,i)=>`<a class="cultchip ${read(i)?'done':''}" href="#cultura-${i}"><span class="lab">${esc(c.tag)}</span><b>${esc(c.t)}</b>${read(i)?'<em>✓ letta</em>':''}</a>`).join('')}</div>
   ${next>=0?`<div class="btnrow" style="margin:12px 0 30px"><a class="btn" href="#cultura-${next}">Leggi la prossima: ${esc(CULTURA[next].t)} →</a></div>`:'<p class="note" style="margin-bottom:30px">Hai letto tutte le schede. Bravissima!</p>'}`;
}
let cultTrans=false;
function renderCultura(id){
  if(id===undefined){
    const tags=[...new Set(CULTURA.map(c=>c.tag))];
    $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Ogni giorno · cultura</div><h1 class="title">Cultura italiana</h1>
     <p class="subtitle">Geografia, storia, cibo, arte, musica, cinema e le abitudini di tutti i giorni. Ogni scheda è scritta in italiano semplice: leggi prima da sola, poi controlla la traduzione.</p></header>
     ${tags.map(t=>`<h3>${esc(t)}</h3><div class="lexgrid">${CULTURA.map((c,i)=>c.tag!==t?'':`<a class="card lexcard" href="#cultura-${i}"><span class="lab">${esc(c.tag)}${S.cult[i]&&S.cult[i].read?' · ✓ letta':''}</span><h3>${esc(c.t)}</h3><span class="note">${esc(c.pt)}</span>${S.cult[i]&&S.cult[i].q?`<span class="note">quiz: ${S.cult[i].q}</span>`:''}</a>`).join('')}</div>`).join('')}`;
    return;
  }
  const C=CULTURA[id], st=S.cult[id]||{};
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow"><a href="#cultura">Cultura italiana</a> · ${esc(C.tag)}</div><h1 class="title">${esc(C.t)}</h1><p class="subtitle">${esc(C.pt)}</p></header>
   <div class="btnrow" style="margin-bottom:18px">${speakBtnHTML('cspeak')}<button class="btn" id="ctrans" aria-pressed="${cultTrans}">${cultTrans?'Nascondi la traduzione':'Mostra tutta la traduzione'}</button></div>
   <article class="reading cult" id="cultart">${C.p.map((p,i)=>`<div class="cpar"><p>${gloss(p[0])}</p><button class="btn ghost ptbtn" data-i="${i}" type="button">${cultTrans?'nascondi':'traduzione'}</button><p class="pt" ${cultTrans?'':'hidden'}>${esc(p[1])}</p></div>`).join('')}</article>
   <p class="note">Parole sottolineate con i puntini: passa il mouse o toccale per la traduzione.</p>
   <section class="card sapevi"><div class="card-h"><h3><span class="pen">Lo sapevi?</span></h3></div><ul class="dots">${C.curio.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section>
   <section class="card"><div class="card-h"><div><span class="lab">Parole chiave</span><h3>Il lessico della scheda</h3></div></div>
    <div class="tw"><table class="tbl lextbl">${C.w.map(w=>`<tr><td><b>${esc(w[0])}</b></td><td class="pt">${esc(w[1])}</td></tr>`).join('')}</table></div></section>
   <section class="card"><div class="card-h"><div><span class="lab">Quiz</span><h3>Hai capito?</h3></div><span class="score" id="cscore">${st.q||''}</span></div><ol class="items" id="cq"></ol>
    <div class="btnrow"><button class="btn" id="creset">Rifai il quiz</button><button class="btn ${st.read?'':'primary'}" id="cread">${st.read?'✓ Scheda letta':'Segna come letta'}</button></div></section>
   <div class="btnrow" style="justify-content:space-between;margin-top:24px">${id>0?`<a class="btn ghost" href="#cultura-${id-1}">← ${esc(CULTURA[id-1].t)}</a>`:'<span></span>'}${id<CULTURA.length-1?`<a class="btn ghost" href="#cultura-${id+1}">${esc(CULTURA[id+1].t)} →</a>`:''}</div>`;
  $('#ctrans').onclick=()=>{ cultTrans=!cultTrans; renderCultura(id); };
  $('#cultart').querySelectorAll('.ptbtn').forEach(b=>b.onclick=()=>{ const p=b.nextElementSibling; p.hidden=!p.hidden; b.textContent=p.hidden?'traduzione':'nascondi'; });
  bindSpeak('cspeak',()=>C.p.map(p=>p[0].replace(/\[\[([^|\]]+)\|[^\]]+\]\]/g,'$1')).join(' '));
  const markRead=()=>{ S.cult[id]=Object.assign({},S.cult[id]||{},{read:true}); save(); renderNav(route()); const b=$('#cread'); if(b){ b.textContent='✓ Scheda letta'; b.classList.remove('primary'); } };
  $('#cread').onclick=()=>{ if(S.cult[id]&&S.cult[id].read){ S.cult[id].read=false; save(); renderNav(route()); renderCultura(id); } else markRead(); };
  $('#creset').onclick=()=>renderCultura(id);
  mcList($('#cq'),C.q,(s,t)=>{ S.cult[id]=Object.assign({},S.cult[id]||{},{q:s+'/'+t}); showScore($('#cscore'),s,t); markRead(); },i=>[`c${id}-q${i}`,'mc',{q:C.q[i][0],o:C.q[i][1],c:C.q[i][2],e:''},'Cultura · '+C.t]);
  if(st.q){ const [a,b]=st.q.split('/').map(Number); showScore($('#cscore'),a,b); }
}

/* ═════════ ASCOLTO E PARLATO ═════════ */
const LVLS=['A1','A2','B1','B2','C1'];
function rateSel(){ const r=S.rate||0.9; return `<div class="rate" role="group" aria-label="Velocità della voce"><span class="note">Voce:</span>${[[0.7,'lenta'],[0.9,'normale'],[1.1,'veloce']].map(([v,l])=>`<button type="button" data-rate="${v}" aria-pressed="${Math.abs(r-v)<.01}">${l}</button>`).join('')}</div>`; }
function bindRate(root){ (root||document).querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>{ S.rate=+b.dataset.rate; save(); document.querySelectorAll('[data-rate]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.rate===S.rate)); }); }
function voiceNote(){
  if(!canSpeak) return `<p class="callout small">Questo browser non ha la sintesi vocale, quindi gli esercizi di ascolto mostrano il testo. Se stai usando l'app di Claude sul telefono, apri il quaderno nel browser (Safari o Chrome): lì la voce funziona.</p>`;
  return `<p class="note voicenote">${TTS_HELP} Dopo aver installato una voce, ricarica la pagina.</p>`;
}
function speakSeq(parts,id,opts){
  opts=opts||{};
  if(!canSpeak||!parts.length) return false;
  const busy=ttsBusy(); stopSpeak();
  try{
    const v=itVoice(), key=id||'_seq'; speakingId=key;
    ttsRun(parts.map((p,i)=>{
      const u=new SpeechSynthesisUtterance(p.text); u.lang='it-IT'; if(v) u.voice=v; u.rate=opts.rate||S.rate||0.9; u.pitch=p.pitch||1;
      if(p.onstart) u.onstart=p.onstart;
      if(i===parts.length-1) u.onend=()=>{ if(speakingId===key){ stopSpeak(); opts.onend&&opts.onend(); } };
      return u;
    }),busy);
    if(id){ const b=document.getElementById(id); if(b){ b.dataset.label=b.dataset.label||b.textContent; b.textContent='■ Ferma'; b.setAttribute('aria-pressed','true'); } }
    return true;
  }catch(e){ stopSpeak(); return false; }
}
const plain=t=>String(t).replace(/\[\[([^|\]]+)\|[^\]]+\]\]/g,'$1');
function sentencesOf(raw){ return (plain(raw).replace(/\n+/g,' ').match(/[^.!?…]+[.!?…»"]*\s*/g)||[]).map(s=>s.trim()).filter(s=>s.length>1); }
function wordsOf(t){ return plain(t).split(/\s+/).filter(w=>/[a-zàèéìòù]/i.test(w)).length; }

/* blocco «leggi ad alta voce»: frasi cliccabili, shadowing, cronometro */
function readAloudBlock(raw,key,{withTitle}={}){
  const paras=String(raw).split(/\n\s*\n/);
  let si=0;
  const html=paras.map(p=>{ const lines=p.split('\n'); return `<p>${lines.map(line=>{ const ss=(line.match(/[^.!?…]+[.!?…»"]*\s*/g)||[line]).filter(x=>x.trim()); return ss.map(s=>`<span class="snt" data-s="${si++}" tabindex="0" role="button">${gloss(esc(s.trim()).replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g,'[[$1|$2]]'))}</span>`).join(' '); }).join('<br>')}</p>`; }).join('');
  return `<div class="ra" data-key="${esc(key)}">
    <div class="btnrow ractl">${canSpeak?`<button class="btn" type="button" data-act="all" id="ra-all-${esc(key)}">▶ Ascolta tutto</button><button class="btn" type="button" data-act="shadow" id="ra-sh-${esc(key)}">⟲ Shadowing</button>`:''}<button class="btn" type="button" data-act="timer">⏱ Cronometra la tua lettura</button>${rateSel()}</div>
    <p class="note">${canSpeak?'Tocca una frase per ascoltarla. Con lo <b>shadowing</b> la voce legge una frase, poi si ferma: ripetila ad alta voce imitando la melodia.':''} Con il cronometro misuri le parole al minuto della tua lettura.</p>
    <div class="ratext reading">${html}</div>
    <div class="ratimer" hidden><b class="big" data-t>0:00</b><button class="btn primary" type="button" data-act="stop">Ho finito</button></div>
    <div class="rawpm"></div></div>`;
}
function bindReadAloud(root,raw,key){
  const box=root.querySelector(`.ra[data-key="${key}"]`); if(!box) return;
  bindRate(box);
  const spans=[...box.querySelectorAll('.snt')], texts=spans.map(s=>s.textContent.trim());
  const clear=()=>spans.forEach(s=>s.classList.remove('on'));
  spans.forEach((s,i)=>{ const go=()=>{ clear(); s.classList.add('on'); speakSeq([{text:texts[i]}],null,{onend:clear}); }; s.onclick=go; s.onkeydown=e=>{ if(e.key==='Enter'){ e.preventDefault(); go(); } }; });
  const all=box.querySelector('[data-act="all"]'); if(all) all.onclick=()=>{ if(speakingId===all.id){ stopSpeak(); clear(); return; } speakSeq(texts.map((t,i)=>({text:t,onstart:()=>{ clear(); spans[i].classList.add('on'); }})),all.id,{onend:clear}); };
  const sh=box.querySelector('[data-act="shadow"]');
  if(sh){ let tmr=null, active=false;
    const end=()=>{ active=false; clearTimeout(tmr); clear(); sh.textContent='⟲ Shadowing'; sh.setAttribute('aria-pressed','false'); };
    const step=i=>{ if(!active) return; if(i>=texts.length){ end(); tick(5); toast('<span class="pen">Bravissima!</span> Shadowing completato.'); return; }
      clear(); spans[i].classList.add('on'); spans[i].scrollIntoView({block:'nearest',behavior:'smooth'});
      speakSeq([{text:texts[i]}],null,{onend:()=>{ if(!active) return; spans[i].classList.add('you'); const wait=Math.max(1600,wordsOf(texts[i])*620/(S.rate||0.9)); tmr=setTimeout(()=>{ spans[i].classList.remove('you'); step(i+1); },wait); }});
      sh.textContent='■ Ferma lo shadowing'; sh.setAttribute('aria-pressed','true'); active=true; };
    sh.onclick=()=>{ if(active){ stopSpeak(); end(); } else { active=true; step(0); } };
  }
  let t0=0, iv=null; const tb=box.querySelector('.ratimer'), tt=box.querySelector('[data-t]'), out=box.querySelector('.rawpm');
  const showWpm=()=>{ const h=(S.wpm[key]||[]); if(!h.length){ out.innerHTML=''; return; } const last=h[h.length-1], best=Math.max(...h.map(x=>x.w)); out.innerHTML=`<p class="wpm"><b>${last.w}</b> parole al minuto · record <b>${best}</b> · ${h.length} ${h.length===1?'lettura':'letture'} <span class="note">· un madrelingua legge ad alta voce intorno alle 150 parole al minuto</span></p>`; };
  showWpm();
  box.querySelector('[data-act="timer"]').onclick=()=>{ stopSpeak(); tb.hidden=false; t0=Date.now(); clearInterval(iv); iv=setInterval(()=>{ const s=Math.floor((Date.now()-t0)/1000); tt.textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`; if(!document.body.contains(tt)) clearInterval(iv); },500); tb.scrollIntoView({block:'nearest'}); };
  box.querySelector('[data-act="stop"]').onclick=()=>{ clearInterval(iv); tb.hidden=true; const min=(Date.now()-t0)/60000; if(min<0.08) return; const w=Math.round(wordsOf(raw)/min); S.wpm[key]=(S.wpm[key]||[]).concat([{w,d:Date.now()}]).slice(-15); tick(Math.max(3,Math.round(min*2))); save(); showWpm(); };
}

/* ---------- pagina: Leggere ad alta voce ---------- */
function renderLeggere(id){
  if(id===undefined){
    $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Ascolto e parlato · lettura</div><h1 class="title">Leggere ad alta voce</h1>
     <p class="subtitle">${TESTI.length} testi dal livello A1 al C1 per allenare la pronuncia e la fluidità. Ascolta, fai lo shadowing, poi leggi da sola con il cronometro: vedrai crescere le tue parole al minuto.</p></header>
     ${voiceNote()}
     ${LVLS.map(l=>{ const items=TESTI.map((t,i)=>[t,i]).filter(([t])=>t.lvl===l); return items.length?`<h3>${l}</h3><div class="lexgrid">${items.map(([t,i])=>{ const h=S.wpm['t'+i]||[]; return `<a class="card lexcard" href="#leggere-${i}"><span class="lab">${l} · ${wordsOf(t.text)} parole</span><h3>${esc(t.t)}</h3>${h.length?`<span class="note">record: ${Math.max(...h.map(x=>x.w))} parole/min</span>`:'<span class="note">non ancora letto</span>'}</a>`; }).join('')}</div>`:''; }).join('')}
     <h3>Scioglilingua · trava-línguas</h3>
     <section class="card"><p class="note">Leggili prima piano, poi sempre più veloce. Sono ottimi per le doppie e per i suoni difficili.</p>${rateSel()}
      <ul class="phr">${SCIOGLI.map((s,i)=>`<li><button class="btn ghost play" type="button" data-sc="${i}" aria-label="Ascolta">▶</button><div><div class="phr-it">${esc(s[0])}</div><div class="note">${esc(s[1])}</div></div></li>`).join('')}</ul></section>`;
    bindRate($('#main'));
    $('#main').querySelectorAll('[data-sc]').forEach(b=>b.onclick=()=>speakSeq([{text:SCIOGLI[+b.dataset.sc][0]}]));
    return;
  }
  const T=TESTI[id];
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow"><a href="#leggere">Leggere ad alta voce</a> · ${T.lvl}</div><h1 class="title">${esc(T.t)}</h1><p class="subtitle">${wordsOf(T.text)} parole</p></header>
   ${voiceNote()}
   ${readAloudBlock(T.text,'t'+id)}
   <section class="card"><div class="card-h"><div><span class="lab">Attenzione alla pronuncia</span><h3>Dove cade l'accento</h3></div></div><p class="note">La sillaba in maiuscolo è quella tonica.</p><div class="chips">${T.pron.map(esc).join(' · ')}</div></section>
   <section class="card"><div class="card-h"><div><span class="lab">Parla</span><h3>Rispondi ad alta voce</h3></div></div>
    <ul class="phr">${T.ask.map((q,i)=>`<li><button class="btn ghost play" type="button" data-q="${i}" aria-label="Ascolta">▶</button><div class="phr-it">${esc(q)}</div></li>`).join('')}</ul>
    <p class="note">Parla per almeno un minuto per ogni domanda. Poi, se vuoi, scrivi o detta la risposta nel <a href="#fuori">Racconta</a> per ricevere una correzione.</p></section>
   <div class="btnrow" style="justify-content:space-between;margin-top:24px">${id>0?`<a class="btn ghost" href="#leggere-${id-1}">← ${esc(TESTI[id-1].t)}</a>`:'<span></span>'}${id<TESTI.length-1?`<a class="btn ghost" href="#leggere-${id+1}">${esc(TESTI[id+1].t)} →</a>`:''}</div>`;
  bindReadAloud($('#main'),T.text,'t'+id);
  $('#main').querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>speakSeq([{text:T.ask[+b.dataset.q]}]));
}

/* ---------- dettato ---------- */
function lcsMatch(a,b){ const n=a.length,m=b.length,dp=Array.from({length:n+1},()=>new Array(m+1).fill(0)); for(let i=n-1;i>=0;i--) for(let j=m-1;j>=0;j--) dp[i][j]=a[i]===b[j]?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]); const hit=new Array(n).fill(false); let i=0,j=0; while(i<n&&j<m){ if(a[i]===b[j]){ hit[i]=true; i++; j++; } else if(dp[i+1][j]>=dp[i][j+1]) i++; else j++; } return hit; }
function dictCheck(target,input){
  const tw=target.split(/\s+/), key=w=>canon(w), loose=w=>canon(w).normalize('NFD').replace(/[̀-ͯ]/g,'');
  const iw=canon(input).split(' ').filter(Boolean);
  const exact=lcsMatch(tw.map(key),iw), soft=lcsMatch(tw.map(loose),iw.map(loose));
  const html=tw.map((w,i)=>exact[i]?`<span class="dw ok">${esc(w)}</span>`:soft[i]?`<span class="dw acc">${esc(w)}</span>`:`<span class="dw no">${esc(w)}</span>`).join(' ');
  const ok=exact.every(Boolean)&&iw.length===tw.length, acc=!ok&&soft.every(Boolean)&&iw.length===tw.length;
  return {ok,acc,html,miss:tw.length-soft.filter(Boolean).length};
}
function dictCard(box,sentence,src,onDone){
  let plays=0;
  box.innerHTML=`<div class="dict"><div class="btnrow">${canSpeak?`<button class="btn primary" type="button" data-d="play">▶ Ascolta</button><button class="btn" type="button" data-d="slow">▶ Più lentamente</button>`:`<span class="note">Senza voce: leggi la frase per tre secondi, poi scrivila a memoria.</span><button class="btn" type="button" data-d="peek">Mostra per 3 secondi</button>`}<span class="note" data-d="cnt"></span></div>
    <div class="peek" hidden></div>
    <textarea class="labin" rows="2" spellcheck="false" autocapitalize="off" placeholder="Scrivi quello che senti…"></textarea>
    <div class="btnrow" style="margin-top:8px"><button class="btn" type="button" data-d="check">Verifica</button></div><div class="fb dres"></div></div>`;
  const ta=box.querySelector('textarea'), cnt=box.querySelector('[data-d="cnt"]');
  const play=r=>{ plays++; cnt.textContent=`ascoltata ${plays} ${plays===1?'volta':'volte'}`; speakSeq([{text:sentence}],null,{rate:r}); ta.focus({preventScroll:true}); };
  const pb=box.querySelector('[data-d="play"]'); if(pb) pb.onclick=()=>play();
  const sb=box.querySelector('[data-d="slow"]'); if(sb) sb.onclick=()=>play(0.6);
  const pk=box.querySelector('[data-d="peek"]'); if(pk) pk.onclick=()=>{ const p=box.querySelector('.peek'); p.textContent=sentence; p.hidden=false; setTimeout(()=>{ p.hidden=true; },3000); };
  let done=false;
  const check=()=>{ if(done||!ta.value.trim()) return; done=true; const r=dictCheck(sentence,ta.value);
    box.querySelector('.dres').innerHTML=`<div class="dline">${r.html}</div>${r.ok?'<span class="mark ok">Perfetto! ✓</span>':r.acc?'<span class="mark acc">Quasi: controlla gli accenti.</span>':`<span class="mark no">${r.miss?`${r.miss} ${r.miss===1?'parola':'parole'} da rivedere`:'controlla la frase'}</span>`}`;
    tick(); if(!r.ok&&!r.acc) addErr('dict-'+hashStr(sentence),'dict',{s:sentence},src); onDone&&onDone(r.ok||r.acc); };
  box.querySelector('[data-d="check"]').onclick=check;
  ta.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); check(); } });
  return {play};
}
function orderSentences(u){ const s=u.ex.find(x=>x.t==='order'); return s?s.items.map(i=>i[0]):[]; }

/* ---------- pagina: Ascolto ---------- */
let ascMode='dettato', ascLvl='mie';
function renderAscolto(id){
  if(id!==undefined) return renderDialogo(id);
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Ascolto e parlato · ascolto</div><h1 class="title">Ascolto</h1>
   <p class="subtitle">Allena l'orecchio: scrivi quello che senti, capisci dialoghi e annunci, riconosci numeri, prezzi e orari.</p></header>
   ${voiceNote()}
   <div class="seg" role="group">${[['dettato','Dettato'],['dialoghi','Dialoghi'],['numeri','Numeri e orari']].map(([k,l])=>`<button data-m="${k}" aria-pressed="${ascMode===k}">${l}</button>`).join('')}</div>
   <div id="ascbody"></div>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ ascMode=b.dataset.m; renderAscolto(); });
  const ab=$('#ascbody');
  if(ascMode==='dettato'){
    const mine=dictPool(studiedUnits());
    if(ascLvl==='mie'&&!mine.length) ascLvl=0;
    ab.innerHTML=`<div class="chipsel" style="margin-bottom:14px">${mine.length?`<button data-l="mie" aria-pressed="${ascLvl==='mie'}">Le mie unità</button>`:''}${BANDS.map((b,i)=>`<button data-l="${i}" aria-pressed="${ascLvl===i}">${b}</button>`).join('')}</div>${ascLvl==='mie'?`<p class="note">Frasi intere dalle letture e dagli esercizi delle unità che hai già studiato (${studiedUnits().map(u=>uNum(u)).join(', ')}).</p>`:''}${rateSel()}<section class="card" id="dcard"></section><p class="note" id="dstat"></p>`;
    bindRate(ab);
    ab.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{ ascLvl=b.dataset.l==='mie'?'mie':+b.dataset.l; renderAscolto(); });
    const pool=ascLvl==='mie'?mine:[].concat(...UNITS.filter(u=>u.band===ascLvl).map(u=>orderSentences(u).map(s=>[s,u])));
    let last=null;
    const next=()=>{ let it; do{ it=pool[Math.floor(Math.random()*pool.length)]; }while(pool.length>1&&it===last); last=it;
      const c=$('#dcard'); c.innerHTML=`<div class="card-h"><span class="lab">${esc(uName(it[1]))} · dettato</span></div><div id="dbox"></div><div class="btnrow" style="margin-top:10px"><button class="btn" id="dnext">Prossima →</button></div>`;
      const ctl=dictCard($('#dbox'),it[0],'Ascolto · dettato',ok=>{ S.lab.dict=S.lab.dict||{ok:0,tot:0}; S.lab.dict.tot++; if(ok) S.lab.dict.ok++; save(); stat(); });
      $('#dnext').onclick=next; if(canSpeak) setTimeout(()=>ctl.play(),250); };
    const stat=()=>{ const d=(S.lab.dict)||{ok:0,tot:0}; $('#dstat').textContent=`Dettati: ${d.ok} giusti su ${d.tot}.`; };
    stat(); next();
  } else if(ascMode==='dialoghi'){
    ab.innerHTML=`<div class="lexgrid">${ASCOLTI.map((a,i)=>`<a class="card lexcard" href="#ascolto-${i}"><span class="lab">${a.lvl}${S.asc[i]?' · '+S.asc[i]:''}</span><h3>${esc(a.t)}</h3><span class="note">${a.lines.length} battute · ${a.q.length} domande</span></a>`).join('')}</div>`;
  } else numDrill(ab);
}
function renderDialogo(id){
  const A=ASCOLTI[id]; let shown=false;
  const voices={A:1.12,B:0.82,N:1};
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow"><a href="#ascolto">Ascolto</a> · ${A.lvl}</div><h1 class="title">${esc(A.t)}</h1><p class="subtitle">Ascolta senza leggere. Rispondi alle domande, poi controlla il testo.</p></header>
   ${voiceNote()}
   <div class="btnrow">${canSpeak?'<button class="btn primary" id="dplay" type="button">▶ Ascolta il dialogo</button>':''}<button class="btn" id="dshow" type="button">${canSpeak?'Mostra il testo':'Leggi il testo'}</button>${rateSel()}</div>
   <div class="transcript reading" id="dtext" hidden>${A.lines.map(l=>`<p class="tl tl-${l[0]}"><b>${l[0]==='N'?'':(l[0]==='A'?'— ':'— ')}</b>${esc(l[1])}</p>`).join('')}</div>
   <section class="card" style="margin-top:18px"><div class="card-h"><div><span class="lab">Comprensione</span><h3>Domande</h3></div><span class="score" id="dscore"></span></div><ol class="items" id="dq"></ol><div class="btnrow"><button class="btn" id="dreset">Rifai</button></div></section>
   <div class="btnrow" style="justify-content:space-between;margin-top:24px">${id>0?`<a class="btn ghost" href="#ascolto-${id-1}">← ${esc(ASCOLTI[id-1].t)}</a>`:'<span></span>'}${id<ASCOLTI.length-1?`<a class="btn ghost" href="#ascolto-${id+1}">${esc(ASCOLTI[id+1].t)} →</a>`:''}</div>`;
  bindRate($('#main'));
  const dp=$('#dplay'); if(dp) dp.onclick=()=>{ if(speakingId==='dplay'){ stopSpeak(); return; } speakSeq(A.lines.map(l=>({text:l[1],pitch:voices[l[0]]})),'dplay'); tick(2); };
  $('#dshow').onclick=()=>{ shown=!shown; $('#dtext').hidden=!shown; $('#dshow').textContent=shown?'Nascondi il testo':(canSpeak?'Mostra il testo':'Leggi il testo'); };
  $('#dreset').onclick=()=>renderDialogo(id);
  mcList($('#dq'),A.q,(s,t)=>{ S.asc[id]=s+'/'+t; save(); showScore($('#dscore'),s,t); },i=>[`asc${id}-${i}`,'mc',{q:A.q[i][0],o:A.q[i][1],c:A.q[i][2],e:''},'Ascolto · '+A.t]);
  if(S.asc[id]){ const [a,b]=S.asc[id].split('/').map(Number); showScore($('#dscore'),a,b); }
}
let numType='numeri';
function numDrill(ab){
  const types=[['numeri','Numeri'],['prezzi','Prezzi'],['orari','Orari'],['anni','Anni'],['telefono','Telefono']];
  ab.innerHTML=`<div class="chipsel" style="margin-bottom:14px">${types.map(([k,l])=>`<button data-t="${k}" aria-pressed="${numType===k}">${l}</button>`).join('')}</div>${rateSel()}<section class="card drill" id="ncard"></section><p class="note">Scrivi con le cifre: 27 · 12,40 · 14:35 · 1987 · 347 215 6890.</p>`;
  bindRate(ab);
  ab.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ numType=b.dataset.t; numDrill(ab); });
  const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
  const next=()=>{
    let say,ans,show;
    if(numType==='numeri'){ const n=Math.random()<.5?R(0,100):R(100,9999); say=String(n); ans=String(n); show=String(n); }
    else if(numType==='prezzi'){ const e=R(1,99), c=[0,10,20,30,40,50,60,70,80,90,25,75,99][R(0,12)]; say=c?`${e} euro e ${c}`:`${e} euro`; ans=(e+c/100).toFixed(2); show=`${e},${String(c).padStart(2,'0')} €`; }
    else if(numType==='orari'){ const h=R(0,23), m=[0,5,10,15,20,25,30,35,40,45,50,55][R(0,11)]; say=m?`alle ${h} e ${m}`:`alle ${h}`; ans=`${h}:${String(m).padStart(2,'0')}`; show=ans; }
    else if(numType==='anni'){ const y=R(1800,2030); say=`nel ${y}`; ans=String(y); show=String(y); }
    else { const p=[R(320,399),R(100,999),R(1000,9999)]; say=p.map(x=>String(x).split('').join(' ')).join(', '); ans=p.join(''); show=p.join(' '); }
    const c=$('#ncard'); c.innerHTML=`${canSpeak?'<button class="btn primary" id="nplay" type="button">▶ Ascolta</button>':`<div class="verb">${esc(say)}</div>`}<div style="margin-top:14px"><input id="nin" inputmode="decimal" autocomplete="off" aria-label="risposta"></div><div class="fb" id="nfb"></div><div class="btnrow" style="justify-content:center"><button class="btn" id="nnext" type="button">Prossimo →</button></div>`;
    const inp=$('#nin'); let done=false;
    const play=()=>speakSeq([{text:say}]); const pb=$('#nplay'); if(pb){ pb.onclick=play; setTimeout(play,250); }
    const normN=v=>{ v=String(v).replace(/[€\s]/g,'').replace(',','.'); if(numType==='orari'){ const m=v.match(/^(\d{1,2})[:.,h]?(\d{2})?$/); return m?`${+m[1]}:${m[2]||'00'}`:v; } if(numType==='prezzi'){ const f=parseFloat(v); return isNaN(f)?v:f.toFixed(2); } return v.replace(/\D/g,''); };
    const check=()=>{ if(done) { next(); return; } if(!inp.value.trim()) return; done=true; const ok=normN(inp.value)===ans; tick(); $('#nfb').innerHTML=ok?'<span class="mark ok">Giusto! ✓</span>':`<span class="mark no">${esc(show)}</span>`; inp.style.color=ok?'var(--verde)':'var(--rosso)'; };
    inp.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); check(); } }); inp.focus({preventScroll:true});
    $('#nnext').onclick=next;
  };
  next();
}

/* ---------- pagina: Parlare ---------- */
let parMode='ia', orLvl='B1', chat=null, orTimer=null;
function stopOral(){ if(orTimer){ clearInterval(orTimer); orTimer=null; } }
function renderParlare(){
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Ascolto e parlato · parlato</div><h1 class="title">Parlare</h1>
   <p class="subtitle">Conversazioni con l'IA, frasi pronte per ogni situazione e simulazioni della prova orale.</p></header>
   <div class="seg" role="group">${[['ia','Conversazione'],['frasi','Frasi utili'],['orale','Prova orale']].map(([k,l])=>`<button data-m="${k}" aria-pressed="${parMode===k}">${l}</button>`).join('')}</div>
   <div id="pbody"></div>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ parMode=b.dataset.m; stopOral(); renderParlare(); });
  const pb=$('#pbody');
  if(parMode==='ia') return chat?renderChat(pb):chatPick(pb);
  if(parMode==='frasi'){
    pb.innerHTML=`${voiceNote()}${rateSel()}<p class="note">Ascolta, ripeti ad alta voce, poi prova a dirla senza guardare.</p>${FRASARIO.map((s,si)=>`<section class="card"><div class="card-h"><div><span class="lab">${s.lvl}</span><h3>${esc(s.t)}</h3></div>${canSpeak?`<button class="btn" type="button" data-all="${si}" id="fa-${si}">▶ Tutte</button>`:''}</div><ul class="phr">${s.f.map((f,fi)=>`<li><button class="btn ghost play" type="button" data-f="${si}-${fi}" aria-label="Ascolta">▶</button><div><div class="phr-it">${esc(f[0])}</div><div class="note">${esc(f[1])}</div></div></li>`).join('')}</ul></section>`).join('')}`;
    bindRate(pb);
    pb.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{ const [a,c]=b.dataset.f.split('-').map(Number); speakSeq([{text:FRASARIO[a].f[c][0]}]); });
    pb.querySelectorAll('[data-all]').forEach(b=>b.onclick=()=>{ if(speakingId===b.id){ stopSpeak(); return; } speakSeq(FRASARIO[+b.dataset.all].f.map(f=>({text:f[0]})),b.id); });
    return;
  }
  orale(pb);
}
function chatPick(pb){
  pb.innerHTML=`<section class="card tipcard"><span class="pen">Come «parlare» qui</span><p>Usa il <b>microfono della tastiera</b> del telefono (o la dettatura del computer: Win+H su Windows, Dettatura nelle impostazioni della tastiera sul Mac) per dire la frase a voce: il testo appare da solo. L'IA risponde, legge la risposta ad alta voce e ti corregge. Le correzioni finiscono nel quaderno degli errori.</p></section>
   <div class="lexgrid">${ROLEPLAY.map((r,i)=>`<button class="card lexcard rpc" type="button" data-r="${i}"><span class="lab">${r.lvl}</span><h3>${esc(r.t)}</h3><span class="note">${esc(r.goal)}</span></button>`).join('')}</div>`;
  pb.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{ chat={sc:ROLEPLAY[+b.dataset.r],turns:[],msgs:[]}; renderChat(pb); chatSend(null); });
}
const LVLHINT={A1:'frasi molto semplici e brevi, presente indicativo, lessico di base',A2:'frasi semplici, presente e passato prossimo, lessico quotidiano',B1:'frasi naturali, i tempi principali, qualche espressione comune',B2:'lingua naturale e varia, anche congiuntivo e condizionale',C1:'lingua ricca, idiomatica e sfumata'};
function chatRules(sc){ const lang=lname({band:/A[12]/.test(sc.lvl)?0:2});
  return `Sei ${sc.role}. Stai facendo una conversazione di pratica con una studentessa brasiliana (parla anche spagnolo) di livello ${sc.lvl}. Obiettivo della conversazione: ${sc.goal}.
Regole: resta sempre nel personaggio; usa un italiano adatto al livello ${sc.lvl} (${LVLHINT[sc.lvl]}); rispondi con 1-3 frasi brevi e quasi sempre fai una domanda per far continuare la conversazione; se la studentessa scrive in portoghese o in spagnolo, rispondi in italiano e suggeriscile la parola giusta.
Rispondi SEMPRE e soltanto con un oggetto JSON: {"risposta":"la tua battuta nel personaggio","correzione":"il messaggio della studentessa corretto con il minimo di modifiche, oppure stringa vuota se era corretto o se non ha ancora scritto","nota":"spiegazione brevissima dell'errore in ${lang}, oppure stringa vuota","suggerimenti":["due possibili risposte brevi per la studentessa, in italiano, di livello ${sc.lvl}"]}`; }
function renderChat(pb){
  const sc=chat.sc;
  pb.innerHTML=`<div class="btnrow" style="justify-content:space-between;margin-bottom:12px"><div><span class="lab note">${sc.lvl} · obiettivo</span><div><b>${esc(sc.t)}</b>: ${esc(sc.goal)}</div></div><div class="btnrow"><label class="note chk"><input type="checkbox" id="autosp" ${S.autoSpeak!==false?'checked':''}> leggi le risposte</label><button class="btn" id="cend" type="button">Valuta la conversazione</button><button class="btn ghost" id="cnew" type="button">Cambia scenario</button></div></div>
   <div class="chatbox" id="chatbox"></div>
   <div class="sugg" id="sugg"></div>
   <div class="chatin"><textarea id="cin" rows="2" class="labin" placeholder="Scrivi o detta la tua risposta…" spellcheck="false"></textarea><button class="btn primary" id="csend" type="button">Invia</button></div>
   <p class="note">Invio per inviare · Maiusc+Invio per andare a capo. Sul telefono tocca il microfono della tastiera per parlare.</p>
   <div id="ceval"></div>`;
  $('#autosp').onchange=e=>{ S.autoSpeak=e.target.checked; save(); };
  $('#cnew').onclick=()=>{ stopSpeak(); chat=null; renderParlare(); };
  $('#csend').onclick=()=>{ const t=$('#cin').value.trim(); if(t) chatSend(t); };
  $('#cin').addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); const t=e.target.value.trim(); if(t) chatSend(t); } });
  $('#cend').onclick=chatEval;
  drawChat();
}
function drawChat(){
  const box=$('#chatbox'); if(!box) return;
  box.innerHTML=chat.msgs.map((m,i)=>m.who==='ai'?`<div class="bub ai"><div>${esc(m.text)}</div>${canSpeak?`<button class="btn ghost play" type="button" data-say="${i}" aria-label="Ascolta">▶</button>`:''}</div>`:m.who==='me'?`<div class="bub me"><div>${esc(m.text)}</div>${m.corr?`<div class="corr"><span class="pen">✎</span> ${esc(m.corr)}${m.nota?`<div class="note">${esc(m.nota)}</div>`:''}</div>`:''}</div>`:`<div class="bub sys">${esc(m.text)}</div>`).join('');
  box.querySelectorAll('[data-say]').forEach(b=>b.onclick=()=>speakSeq([{text:chat.msgs[+b.dataset.say].text}]));
  box.scrollTop=box.scrollHeight;
}
async function chatSend(text){
  const sample=await getSample();
  if(!sample){ chat.msgs.push({who:'sys',text:'La conversazione con l\'IA funziona solo con la pagina aperta dentro Claude.'}); drawChat(); return; }
  if(text){ chat.msgs.push({who:'me',text}); chat.turns.push({role:'user',content:`Messaggio della studentessa: «${text}»\n(Rispondi solo con il JSON richiesto.)`}); $('#cin').value=''; tick(2); }
  chat.msgs.push({who:'sys',text:'…'}); drawChat();
  const btn=$('#csend'); if(btn) btn.disabled=true;
  try{
    const turns=[{role:'user',content:chatRules(chat.sc)+'\n\nComincia tu la conversazione, presentando la situazione in modo naturale.'}].concat(chat.turns);
    const r=await sample.json(turns,{cache:false});
    chat.msgs.pop();
    const reply=String((r&&r.risposta)||'…');
    chat.turns.push({role:'assistant',content:JSON.stringify(r)});
    if(text && r && r.correzione && canon(r.correzione)!==canon(text)){ const me=[...chat.msgs].reverse().find(m=>m.who==='me'); if(me){ me.corr=String(r.correzione); me.nota=String(r.nota||''); } addErr('chat-'+hashStr(text),'lab',{q:text,s:'Correggi la frase (conversazione)',a:[String(r.correzione)],n:String(r.nota||'')},'Conversazione · '+chat.sc.t); }
    chat.msgs.push({who:'ai',text:reply}); drawChat();
    const sg=$('#sugg'); if(sg){ const ss=(r&&Array.isArray(r.suggerimenti))?r.suggerimenti.slice(0,3).map(String):[]; sg.innerHTML=ss.length?`<span class="note">Idee:</span> ${ss.map((s,i)=>`<button class="chip" type="button" data-sg="${i}">${esc(s)}</button>`).join('')}`:''; sg.querySelectorAll('[data-sg]').forEach(b=>b.onclick=()=>{ $('#cin').value=ss[+b.dataset.sg]; $('#cin').focus(); }); }
    if(S.autoSpeak!==false) speakSeq([{text:reply}]);
  }catch(e){ chat.msgs.pop(); chat.msgs.push({who:'sys',text:errMsg(e)}); if(text) chat.turns.pop(); drawChat(); }
  if(btn) btn.disabled=false;
}
async function chatEval(){
  const out=$('#ceval'); const mine=chat.msgs.filter(m=>m.who==='me');
  if(mine.length<3){ out.innerHTML='<div class="ai-out"><p>Scrivi almeno tre messaggi prima di chiedere la valutazione.</p></div>'; return; }
  const sample=await getSample(); if(!sample) return;
  const lang=lname({band:/A[12]/.test(chat.sc.lvl)?0:2},1);
  const tr=chat.msgs.filter(m=>m.who!=='sys').map(m=>(m.who==='me'?'STUDENTESSA: ':'INTERLOCUTORE: ')+m.text).join('\n');
  out.innerHTML='<div class="ai-out"><div class="stamp">La professoressa sta leggendo…</div><div id="cevb"></div></div>';
  try{ const r=await sample(`Sei un'insegnante d'italiano. Valuta la conversazione di pratica di una studentessa brasiliana (parla anche spagnolo), scenario «${chat.sc.t}», livello ${chat.sc.lvl}. Rispondi in ${lang} con queste sezioni in markdown:
## Livello e impressione generale
## Che cosa hai fatto bene
## 3 errori da sistemare
(formato: ~~sbagliato~~ → **giusto**: spiegazione. Solo errori veri: non inserire mai forme già corrette.)
## 5 espressioni utili per la prossima volta

CONVERSAZIONE:
${tr}`,{cache:false,onText:({text})=>{ const b=$('#cevb'); if(b) b.innerHTML=md(text); }});
    $('#cevb').innerHTML=md(r.text); out.querySelector('.stamp').textContent='Valutazione'; tick(5);
  }catch(e){ out.innerHTML=`<div class="ai-out"><p>${esc(errMsg(e))}</p></div>`; }
}
function orale(pb){
  const items=ORALE.map((o,i)=>[o,i]).filter(([o])=>o.lvl===orLvl);
  pb.innerHTML=`<p class="note">Simulazione nello stile delle prove orali CILS e CELI: preparazione, poi parli da sola per il tempo indicato. Alla fine valuti la tua prova e, se vuoi, detti quello che hai detto per un parere.</p>
   <div class="chipsel" style="margin-bottom:14px">${['A2','B1','B2','C1'].map(l=>`<button data-l="${l}" aria-pressed="${orLvl===l}">${l}</button>`).join('')}</div>
   ${items.map(([o,i])=>`<section class="card oral" data-o="${i}"><div class="card-h"><div><span class="lab">${o.lvl} · ${esc(o.t)}</span><h3 class="oq">${esc(o.p)}</h3></div>${S.orale[i]?`<span class="score">${S.orale[i]}</span>`:''}</div>
    <div class="btnrow">${canSpeak?`<button class="btn ghost" type="button" data-act="say">▶ Ascolta la consegna</button>`:''}<button class="btn primary" type="button" data-act="go">Comincia: ${o.prep}s di preparazione, ${Math.round(o.talk/60*10)/10} min per parlare</button></div><div class="otimer"></div><div class="oafter"></div></section>`).join('')}`;
  pb.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{ orLvl=b.dataset.l; stopOral(); orale(pb); });
  pb.querySelectorAll('.oral').forEach(sec=>{ const i=+sec.dataset.o, o=ORALE[i];
    const say=sec.querySelector('[data-act="say"]'); if(say) say.onclick=()=>speakSeq([{text:o.p}]);
    sec.querySelector('[data-act="go"]').onclick=()=>{ stopOral(); stopSpeak(); const tbox=sec.querySelector('.otimer'); let phase='prep', left=o.prep;
      const draw=()=>{ tbox.innerHTML=`<div class="drill"><span class="lab">${phase==='prep'?'Preparazione: prendi appunti':'Parla ad alta voce!'}</span><div class="verb ${phase==='talk'?'talk':''}">${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}</div><button class="btn" type="button" data-act="skip">${phase==='prep'?'Sono pronta: comincio a parlare':'Ho finito'}</button></div>`; tbox.querySelector('[data-act="skip"]').onclick=()=>{ left=0; tickT(); }; };
      const tickT=()=>{ if(left>0){ left--; draw(); return; } if(phase==='prep'){ phase='talk'; left=o.talk; draw(); } else { stopOral(); tbox.innerHTML=''; afterOral(sec,i,o); } };
      draw(); orTimer=setInterval(tickT,1000); };
  });
}
function afterOral(sec,i,o){
  const crit=['Fluidità','Grammatica','Lessico','Pronuncia','Coerenza'];
  const box=sec.querySelector('.oafter');
  box.innerHTML=`<div class="selfev"><span class="lab">Autovalutazione · da 1 a 4</span>${crit.map((c,ci)=>`<div class="evrow"><span>${c}</span><span class="chipsel">${[1,2,3,4].map(n=>`<button type="button" data-c="${ci}" data-n="${n}">${n}</button>`).join('')}</span></div>`).join('')}</div>
   <p class="note" style="margin-top:12px">Vuoi un parere? Detta o scrivi quello che hai detto (anche più o meno) e ricevi una correzione.</p>
   <textarea class="labin" rows="4" placeholder="Detta o scrivi qui la tua risposta…"></textarea><div class="btnrow" style="margin-top:8px"><button class="btn red" type="button" data-act="fb">Correggi la mia risposta</button></div><div class="ofb"></div>`;
  const sc={}; box.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{ const c=b.dataset.c; sc[c]=+b.dataset.n; box.querySelectorAll(`[data-c="${c}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b)); if(Object.keys(sc).length===crit.length){ const tot=Object.values(sc).reduce((a,b)=>a+b,0); S.orale[i]=tot+'/20'; save(); tick(10); toast(`<span class="pen">Prova registrata:</span> ${tot}/20`); } });
  box.querySelector('[data-act="fb"]').onclick=async()=>{ const t=box.querySelector('textarea').value.trim(), out=box.querySelector('.ofb'); if(t.split(/\s+/).length<15){ out.innerHTML='<p class="note">Scrivi almeno 15 parole.</p>'; return; }
    const sample=await getSample(); if(!sample){ out.innerHTML='<p class="note">La correzione funziona solo con la pagina aperta dentro Claude.</p>'; return; }
    const lang=lname({band:o.lvl==='A2'?0:2},1);
    out.innerHTML='<div class="ai-out"><div class="stamp">La professoressa sta ascoltando…</div><div class="ofbb"></div></div>';
    try{ const r=await sample(`Sei un esaminatore della prova orale CILS/CELI. Questa è la trascrizione (dettata) della produzione orale di una studentessa brasiliana che parla anche spagnolo. Livello della prova: ${o.lvl}. Consegna: «${o.p}». Ignora la punteggiatura e piccoli errori di trascrizione automatica.
Rispondi in ${lang} con queste sezioni in markdown:
## Livello stimato e giudizio
## Punti di forza
## Errori principali
(formato: ~~sbagliato~~ → **giusto**: spiegazione. Solo errori veri: non inserire mai forme già corrette.)
## Versione migliorata
(una versione breve e naturale di ciò che voleva dire, al livello ${o.lvl})
## Per la prossima volta
3 consigli concreti

TRASCRIZIONE:
"""${t}"""`,{cache:false,onText:({text})=>{ const b=out.querySelector('.ofbb'); if(b) b.innerHTML=md(text); }});
      out.querySelector('.ofbb').innerHTML=md(r.text); out.querySelector('.stamp').textContent='Parere'; tick(5);
    }catch(e){ out.innerHTML=`<p class="note">${esc(errMsg(e))}</p>`; } };
}

/* ---------- pagina: Fuori dal quaderno ---------- */
let fuoriMode='parole';
const SRC=['corso','video','libro','podcast','conversazione','altro'];
function renderFuori(){
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Ascolto e parlato · il tuo studio</div><h1 class="title">Fuori dal quaderno</h1>
   <p class="subtitle">Il corso, i video, il tuo libro: raccogli qui le parole nuove, registra il tempo di studio (conta per il tuo obiettivo giornaliero) e racconta che cosa hai letto o visto.</p></header>
   <div class="seg" role="group">${[['parole','Le mie parole'],['frasi','Le mie frasi'],['registro','Registro di studio'],['racconta','Racconta'],['libri','Libri'],['risorse','Video e podcast']].map(([k,l])=>`<button data-m="${k}" aria-pressed="${fuoriMode===k}">${l}</button>`).join('')}</div><div id="fbody2"></div>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ fuoriMode=b.dataset.m; renderFuori(); });
  const fb=$('#fbody2');
  if(fuoriMode==='parole') return myWords(fb);
  if(fuoriMode==='frasi') return myPhrases(fb);
  if(fuoriMode==='registro') return studyLog(fb);
  if(fuoriMode==='racconta') return racconta(fb);
  if(fuoriMode==='libri') return libri(fb);
  risorse(fb);
}
/* ---------- metodo Anki per «Le mie parole» ---------- */
/* ogni parola ha due carte, come in Anki «base e inversa»: pt (português → italiano) e it (italiano → português) */
function ankiCfg(){ const c=Object.assign({nuove:15,dir:'both'},S.ankiCfg||{}); if(c.dir==='mix') c.dir='both'; return c; }
const ANKF={pt:'srs',it:'srsR'};
function ankiDirs(){ const d=ankiCfg().dir; return d==='both'?['it','pt']:[d]; }
function ankiCards(){ const out=[]; Object.keys(S.myvoc||{}).forEach(id=>ankiDirs().forEach(d=>out.push(id+'|'+d))); return out; }
const cardW=c=>S.myvoc[c.split('|')[0]], cardS=c=>{ const w=cardW(c); return w&&w[ANKF[c.split('|')[1]]]; };
function ankiDue(k){ k=k||dayKey(); return ankiCards().filter(c=>{ const s=cardS(c); return s&&s.due<=k; }).sort((a,b)=>cardS(a).due.localeCompare(cardS(b).due)); }
function ankiNew(){
  const c=ankiCfg(), t=dayKey(), done=((S.ankiDays||{})[t]||{}).n||0, both=c.dir==='both';
  const ok=card=>{ const [id,d]=card.split('|'), w=S.myvoc[id]; if(!w||w[ANKF[d]]) return false;
    if(both&&d==='pt'){ const sib=w.srsR; return !!(sib&&sib.first&&sib.first<t); } /* la carta inversa arriva il giorno dopo la prima */
    return true; };
  return ankiCards().filter(ok).sort((a,b)=>(cardW(a).d||0)-(cardW(b).d||0)||(a.endsWith('|it')?-1:1)).slice(0,Math.max(0,c.nuove-done));
}
function ankiDay(k){ if(!S.myvoc||!Object.keys(S.myvoc).length) return false; const t=dayType(k); if(t!=='study') return false; if(k===dayKey()) return !!(ankiDue().length||ankiNew().length||(S.ankiDays[k]&&S.ankiDays[k].fin)); return true; }
function ankiNext(s,g){
  const t=dayKey(); s=s?Object.assign({},s):{ivl:0,ease:2.5,reps:0,lapses:0};
  if(g===0){ if(s.reps>0&&s.ivl>0){ s.lapses++; s.ease=Math.max(1.3,+(s.ease-0.2).toFixed(2)); } s.ivl=0; s.due=t; s.again=true; return s; }
  let ivl;
  if(!s.reps||s.ivl===0) ivl=g===3?4:1;
  else if(g===1){ ivl=Math.max(s.ivl+1,Math.round(s.ivl*1.2)); s.ease=Math.max(1.3,+(s.ease-0.15).toFixed(2)); }
  else if(g===2) ivl=Math.max(s.ivl+1,Math.round(s.ivl*s.ease));
  else { ivl=Math.max(s.ivl+2,Math.round(s.ivl*s.ease*1.3)); s.ease=+(s.ease+0.15).toFixed(2); }
  s.ivl=Math.min(ivl,365); s.reps++; s.due=kAdd(t,s.ivl); if(!s.first) s.first=t; delete s.again; return s;
}
const ivlLab=d=>d<=0?'<10 min':d===1?'1 g':d<30?d+' g':d<365?Math.round(d/30)+' mesi':'1 anno';
function dueLab(w){ const ss=ankiDirs().map(d=>w[ANKF[d]]).filter(Boolean); if(!ss.length) return 'nuova'; const s=ss.sort((a,b)=>a.due.localeCompare(b.due))[0]; const t=dayKey(); if(s.due<=t) return 'oggi'; const n=Math.round((kDate(s.due)-kDate(t))/864e5); return n===1?'domani':`tra ${ivlLab(n)}`; }
function ankiRun(card,fb){
  const t=dayKey(), c=ankiCfg();
  const rev=shuffle(ankiDue()), nw=ankiNew();
  let q=[]; let ri=0, ni=0; while(ri<rev.length||ni<nw.length){ for(let j=0;j<3&&ri<rev.length;j++) q.push(rev[ri++]); if(ni<nw.length) q.push(nw[ni++]); }
  if(!q.length){ card.hidden=false; card.innerHTML=`<div class="drill"><div class="pen" style="font-size:30px">Niente da ripassare oggi ✓</div><p class="note">Le parole tornano quando è il loro momento. Aggiungine di nuove, se vuoi.</p></div>`; return; }
  const stat={done:0,ok:0,tot:q.length};
  card.hidden=false;
  const day=()=>{ S.ankiDays[t]=S.ankiDays[t]||{n:0,r:0}; return S.ankiDays[t]; };
  const end=()=>{ day().fin=1; save(); renderNav(route());
    const tom=ankiDue(kAdd(t,1)).length;
    card.innerHTML=`<div class="drill"><div class="pen" style="font-size:34px">Fatto per oggi!</div><p>${stat.done} carte ripassate. Domani: ${tom} ${tom===1?'carta':'carte'} da ripassare${(un=>un?` e fino a ${Math.min(c.nuove,un)} nuove`:'')(ankiCards().filter(x=>!cardS(x)).length)}.</p><div class="btnrow" style="justify-content:center"><button class="btn" type="button" id="ankiback">Torna alla lista</button></div></div>`;
    $('#ankiback').onclick=()=>myWords(fb); };
  const show=()=>{
    if(!q.length) return end();
    const cid=q[0], [id,dir]=cid.split('|'), w=S.myvoc[id], F=ANKF[dir]; if(!w){ q.shift(); return show(); }
    const front=dir==='pt'?w.pt:w.it, back=dir==='pt'?w.it:w.pt;
    const isNew=!w[F], prev=g=>ankiNext(w[F],g).ivl;
    const nNew=q.filter(x=>cardW(x)&&!cardS(x)).length, nAg=q.filter(x=>cardS(x)&&cardS(x).again).length, nRev=q.filter(x=>cardS(x)&&!cardS(x).again).length;
    card.innerHTML=`<div class="card-h"><span class="lab">Le mie parole · metodo Anki</span><span class="ankicnt"><b class="cn">${nNew}</b> <b class="cr">${nAg}</b> <b class="cg">${nRev}</b></span></div>
     <div class="ankif"><span class="note">${isNew?'nuova · ':''}${dir==='pt'?'português → italiano · come si dice?':'italiano → português · che cosa significa?'}</span><div class="ankiw">${esc(front)}${dir==='it'&&canSpeak?' <button class="btn ghost play" type="button" id="ankisayf" aria-label="Ascolta">▶</button>':''}</div></div>
     <input id="ankiin" class="dinp" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="scrivi la risposta (facoltativo), poi Invio">
     <div class="ankib" id="ankib" hidden><div class="ankiw it">${esc(back)} ${canSpeak?'<button class="btn ghost play" type="button" id="ankisay" aria-label="Ascolta">▶</button>':''}</div><div id="ankitype"></div>${w.ex?`<p class="ankiex"><i>${esc(w.ex)}</i></p>`:''}<p class="note">${esc(w.src||'')}${w[F]?` · ripassata ${w[F].reps} ${w[F].reps===1?'volta':'volte'}`:''}</p></div>
     <div class="btnrow ankiact"><button class="btn primary" type="button" id="ankishow">Mostra la risposta</button></div>
     <div class="ankig" id="ankig" hidden>${[['Di nuovo','g0'],['Difficile','g1'],['Bene','g2'],['Facile','g3']].map(([l,cl],g)=>`<button type="button" class="btn ${cl}" data-g="${g}"><small>${ivlLab(prev(g))}</small>${l}</button>`).join('')}</div>
     <p class="note ankikeys">Tastiera: Spazio = mostra, 1–4 = valuta.</p>`;
    const inp=$('#ankiin'); let shown=false;
    const flip=()=>{ if(shown) return; shown=true; $('#ankib').hidden=false; $('#ankig').hidden=false; $('#ankishow').parentElement.hidden=true;
      const typed=inp.value.trim(); inp.disabled=true;
      if(typed){ const r=dir==='pt'?judge(typed,[back,back.replace(/^(il|lo|la|l'|i|gli|le|un|uno|una|un')\s*/i,'')]):judge(typed,back.split(/[,;\/]/).map(x=>x.trim()).filter(Boolean).concat(back.split(/[,;\/]/).map(x=>x.trim().replace(/^(o|a|os|as|um|uma)\s+/i,'')))); $('#ankitype').innerHTML=r==='no'?`<span class="mark no">hai scritto: ${esc(typed)}</span>`:`<span class="mark ok">${r==='acc'?'quasi: attenzione agli accenti':'giusto!'}</span>`; }
      if(canSpeak&&dir==='pt') speak(w.it); const sb=$('#ankisay'); if(sb) sb.onclick=()=>speak(w.it+(w.ex?'. '+w.ex:''));
      const gb=card.querySelector('[data-g="2"]'); if(gb) gb.focus({preventScroll:true}); };
    const grade=g=>{ if(!shown) return;
      const wasNew=!w[F]; w[F]=ankiNext(w[F],g); const d=day(); if(wasNew) d.n++; d.r++;
      q.shift(); if(g===0) q.splice(Math.min(3,q.length),0,cid); else { stat.done++; if(g>=2) stat.ok++; }
      tick(); save(); show(); };
    $('#ankishow').onclick=flip; const sf=$('#ankisayf'); if(sf) sf.onclick=()=>speak(w.it);
    inp.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); flip(); } });
    card.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>grade(+b.dataset.g));
    card.onkeydown=e=>{ if(e.target===inp&&!shown) return; if(e.key===' '||e.key==='Enter'){ if(!shown){ e.preventDefault(); flip(); } } else if(/^[1-4]$/.test(e.key)){ e.preventDefault(); grade(+e.key-1); } };
    if(dir==='it'&&canSpeak) setTimeout(()=>speak(w.it),150);
    if(window.matchMedia&&matchMedia('(hover:hover)').matches) inp.focus({preventScroll:true});
  };
  show(); card.scrollIntoView({block:'start',behavior:'smooth'});
}
function myWords(fb){
  const ids=Object.keys(S.myvoc).sort((a,b)=>(S.myvoc[b].d||0)-(S.myvoc[a].d||0));
  fb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">Aggiungi</span><h3>Una parola nuova</h3></div><span class="note">${ids.length} parole</span></div>
    <form id="mvf" class="mvform"><input id="mv-it" placeholder="italiano (es. la scrivania)" required autocomplete="off"><input id="mv-pt" placeholder="português (escrivaninha)" required autocomplete="off"><input id="mv-ex" placeholder="esempio (facoltativo)" autocomplete="off"><select id="mv-src">${SRC.map(s=>`<option value="${s}">${s}</option>`).join('')}</select><button class="btn primary" type="submit">Aggiungi</button></form>
    <p class="note" id="mvmsg">Ogni parola nuova viene controllata (ortografia, articolo e traduzione) prima di entrare nel ripasso.</p></section>
   ${(()=>{ const sg=ids.filter(k=>S.myvoc[k].sug); return sg.length?`<section class="card mvsug"><div class="card-h"><div><span class="lab">Da controllare</span><h3>Forse volevi scrivere…</h3></div></div><ul class="errlist">${sg.map(k=>{ const w=S.myvoc[k], x=w.sug; return `<li><div><div class="el-t"><del>${esc(w.it)}</del> → <b>${esc(x.it)}</b> · ${esc(x.pt)}</div>${x.nota?`<div class="note">${esc(x.nota)}</div>`:''}${x.ex?`<div class="note"><i>${esc(x.ex)}</i></div>`:''}</div><div class="btnrow"><button class="btn primary" type="button" data-fix="${k}">Correggi</button><button class="btn ghost" type="button" data-keep="${k}">Va bene così</button></div></li>`; }).join('')}</ul></section>`:''; })()}
   ${(()=>{ const un=ids.filter(k=>!S.myvoc[k].v&&!S.myvoc[k].sug); return un.length?`<div class="btnrow" style="margin-bottom:12px"><button class="btn" type="button" id="mvcheck">Controlla le parole non verificate (${un.length})</button></div>`:''; })()}
   ${ids.length?`<section class="card ankihead"><div class="card-h"><div><span class="lab">Metodo Anki</span><h3>Ripasso delle mie parole</h3></div><span class="ankicnt" title="nuove · da rivedere"><b class="cn">${ankiNew().length}</b> <b class="cg">${ankiDue().length}</b></span></div>
     <p class="note">Ogni parola ha due carte: <b>italiano → português</b> (la riconosci) e <b>português → italiano</b> (la produci). Guarda la carta, prova a ricordare (o scrivi), gira e valuta tu: <b>Di nuovo</b> la ripete subito, <b>Difficile</b> torna presto, <b>Bene</b> e <b>Facile</b> la allontanano di giorni, settimane e mesi. Ogni giorno: le parole in scadenza e ${ankiCfg().nuove} nuove al massimo.</p>
     <div class="btnrow"><button class="btn primary" id="ankigo" type="button">${ankiDue().length||ankiNew().length?`Ripassa oggi (${ankiDue().length+ankiNew().length})`:'Niente da ripassare oggi ✓'}</button><button class="btn" id="mvrev" type="button">Allenamento scritto</button></div>
     <details class="ankicfg"><summary class="note">Impostazioni</summary>
      <div class="cfgrow"><span>Parole nuove al giorno</span><span class="chipsel">${[5,10,15,25].map(n=>`<button type="button" data-an="${n}" aria-pressed="${ankiCfg().nuove===n}">${n}</button>`).join('')}</span></div>
      <div class="cfgrow"><span>Carte per ogni parola<br><small class="note">con «tutte e due» ogni parola ha due carte: prima la riconosci (italiano → português), dal giorno dopo la produci (português → italiano)</small></span><span class="chipsel">${[['both','tutte e due'],['it','italiano → português'],['pt','português → italiano']].map(([k,l])=>`<button type="button" data-ad="${k}" aria-pressed="${ankiCfg().dir===k}">${l}</button>`).join('')}</span></div></details></section>
   <section class="card" id="ankicard" hidden tabindex="-1"></section>
   <div class="btnrow" style="margin-bottom:12px"><input id="mvq" class="vsel" placeholder="Cerca…" autocomplete="off"></div><section class="card" id="mvcard" hidden></section>
   <div class="tw"><table class="tbl lextbl" id="mvtbl">${ids.map(k=>{ const w=S.myvoc[k]; return `<tr data-k="${k}"><td>${canSpeak?`<button class="btn ghost play" type="button" data-say="${k}">▶</button>`:''}<b>${esc(w.it)}</b> ${w.v?'<span class="vok" title="Verificata">✓</span>':w.sug?'<span class="vno" title="Da controllare">?</span>':''} <span class="duelab ${w.srs&&w.srs.due<=dayKey()?'today':''}">${dueLab(w)}</span></td><td class="pt">${esc(w.pt)}</td><td><i>${esc(w.ex||'')}</i></td><td class="note">${esc(w.src||'')}</td><td><button class="btn ghost" type="button" data-del="${k}">Rimuovi</button></td></tr>`; }).join('')}</table></div>`:'<p class="note">Ancora nessuna parola. Aggiungi le parole che incontri nel corso, nei video o nel tuo libro: poi le ripassi qui e, se le sbagli, tornano nel quaderno degli errori.</p>'}`;
  $('#mvf').onsubmit=e=>{ e.preventDefault(); const it=$('#mv-it').value.trim(), pt=$('#mv-pt').value.trim(); if(!it||!pt) return; const k='w'+Date.now().toString(36); S.myvoc[k]={it,pt,ex:$('#mv-ex').value.trim(),src:$('#mv-src').value,d:Date.now(),v:false}; tick(); save(); myWords(fb); setTimeout(()=>$('#mv-it')&&$('#mv-it').focus(),0); checkWords([k],fb); };
  fb.querySelectorAll('[data-fix]').forEach(b=>b.onclick=()=>{ const w=S.myvoc[b.dataset.fix]; if(!w||!w.sug) return; w.it=w.sug.it; w.pt=w.sug.pt; if(w.sug.ex) w.ex=w.sug.ex; w.v=true; delete w.sug; save(); myWords(fb); });
  fb.querySelectorAll('[data-keep]').forEach(b=>b.onclick=()=>{ const w=S.myvoc[b.dataset.keep]; if(!w) return; w.v=true; delete w.sug; save(); myWords(fb); });
  const mc=$('#mvcheck'); if(mc) mc.onclick=()=>checkWords(ids.filter(k=>!S.myvoc[k].v&&!S.myvoc[k].sug).slice(0,40),fb);
  fb.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{ const k=b.dataset.del; delete S.myvoc[k]; removeErr('my-'+k); save(); myWords(fb); });
  fb.querySelectorAll('[data-say]').forEach(b=>b.onclick=()=>speakSeq([{text:S.myvoc[b.dataset.say].it}]));
  const ag=$('#ankigo'); if(ag) ag.onclick=()=>ankiRun($('#ankicard'),fb);
  fb.querySelectorAll('[data-an]').forEach(b=>b.onclick=()=>{ S.ankiCfg=Object.assign(ankiCfg(),{nuove:+b.dataset.an}); save(); myWords(fb); });
  fb.querySelectorAll('[data-ad]').forEach(b=>b.onclick=()=>{ S.ankiCfg=Object.assign(ankiCfg(),{dir:b.dataset.ad}); save(); myWords(fb); });
  const q=$('#mvq'); if(q) q.oninput=()=>{ const v=q.value.toLowerCase(); fb.querySelectorAll('#mvtbl tr').forEach(tr=>{ tr.hidden=v&&!tr.textContent.toLowerCase().includes(v); }); };
  const rv=$('#mvrev'); if(rv) rv.onclick=()=>{ const order=shuffle(ids).slice(0,20); let pos=0, ok=0; const card=$('#mvcard'); card.hidden=false;
    const show=()=>{ if(pos>=order.length){ card.innerHTML=`<div class="drill"><div class="pen" style="font-size:34px">Fatto!</div><p>${ok} giuste su ${order.length}.</p></div>`; return; }
      const w=S.myvoc[order[pos]]; card.innerHTML=`<div class="drill"><span class="lab">${pos+1}/${order.length} · come si dice in italiano?</span><div class="verb" style="font-size:34px">${esc(w.pt)}</div><input id="mvin" autocomplete="off" autocapitalize="off" spellcheck="false"><div class="fb" id="mvfb"></div></div>`;
      const inp=$('#mvin'); inp.focus({preventScroll:true}); let done=false;
      inp.onkeydown=e=>{ if(e.key!=='Enter') return; e.preventDefault(); if(done){ pos++; show(); return; } if(!inp.value.trim()) return; done=true; const r=judge(inp.value,[w.it,w.it.replace(/^(il|lo|la|l'|i|gli|le|un|uno|una|un')\s*/i,'')]); tick(); if(r!=='no') ok++; else addErr('my-'+order[pos],'myvoc',{k:order[pos]},'Le mie parole'); $('#mvfb').innerHTML=(r==='ok'?'<span class="mark ok">Giusto! ✓</span>':r==='acc'?`<span class="mark acc">Quasi: ${esc(w.it)}</span>`:`<span class="mark no">${esc(w.it)}</span>`)+(w.ex?`<p class="expl">${esc(w.ex)}</p>`:'')+'<p class="note">Invio per continuare</p>'; if(canSpeak) speakSeq([{text:w.it}]); };
    };
    show(); card.scrollIntoView({block:'nearest'}); };
}
function diaryPhrases(){
  const out=[], hid=S.frasiHide||{};
  Object.keys(S.diario||{}).forEach(d=>{ const e=S.diario[d]; (e.f||[]).forEach((f,i)=>{ if(!f||hid[d+'-'+i]) return; const c=e.c&&e.c[i];
    out.push({key:d+'-'+i,d,t:(e.d||0)+i,tema:e.tema||'',orig:f,txt:c&&!c.ok?c.corr:f,err:!!(c&&!c.ok),nota:c&&c.nota||'',checked:!!c,src:'diario'}); }); });
  Object.keys(S.frasi||{}).forEach(id=>{ const e=S.frasi[id], c=e.c; if(!e||!e.f) return;
    out.push({key:id,d:e.d,t:e.t||0,tema:e.tema||'',orig:e.f,txt:c&&!c.ok?c.corr:e.f,err:!!(c&&!c.ok),nota:c&&c.nota||'',checked:!!c,src:'mie'}); });
  return out.sort((a,b)=>b.d.localeCompare(a.d)||b.t-a.t);
}
let frFilt='tutte';
function myPhrases(fb){
  const all=diaryPhrases(), nErr=all.filter(x=>x.err).length;
  const list=all.filter(x=>frFilt==='tutte'||(frFilt==='errori'?x.err:!x.err));
  const unchecked=Object.keys(S.frasi||{}).filter(id=>!S.frasi[id].c);
  fb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">Aggiungi</span><h3>Frasi nuove</h3></div><span class="note">${all.length} frasi</span></div>
    <p class="note">Scrivi quante frasi vuoi, <b>una per riga</b>: sulla tua giornata, su quello che hai visto al corso o in un video. Claude corregge solo gli errori veri; le frasi entrano qui sotto, nella versione corretta.</p>
    <textarea id="frnew" class="labin" rows="4" spellcheck="false" autocapitalize="sentences" placeholder="Stamattina ho bevuto un caffè al bar.&#10;Il mio collega si chiama Paolo."></textarea>
    <input id="frtema" class="dinp" type="text" placeholder="argomento (facoltativo): il passato prossimo, la famiglia…" autocomplete="off">
    <div class="btnrow"><button class="btn primary" id="fradd" type="button">Correggi e aggiungi</button>${unchecked.length?`<button class="btn" id="frcheck" type="button">Correggi le frasi non corrette (${unchecked.length})</button>`:''}<span class="note" id="frmsg"></span></div></section>
   ${all.length?`<section class="card"><div class="card-h"><div><span class="lab">Per ripassare</span><h3>Le mie frasi</h3></div><span class="note">${nErr} con un errore corretto</span></div>
    <p>Le frasi che aggiungi qui e quelle del <a href="#diario">diario</a>, nella versione corretta. Sono frasi tue, sulla tua vita: rileggerle e ripeterle ad alta voce è il modo più rapido per farle diventare automatiche.</p>
    <div class="btnrow"><button class="btn primary" id="frrev" type="button">Ripassa le mie frasi</button><input id="frq" class="vsel" placeholder="Cerca…" autocomplete="off"></div>
    <div class="chipsel" style="margin-top:12px">${[['tutte','Tutte'],['errori','Con un errore'],['giuste','Giuste al primo colpo']].map(([k,l])=>`<button type="button" data-ff="${k}" aria-pressed="${frFilt===k}">${l}</button>`).join('')}</div></section>`:''}
   <section class="card" id="frcard" hidden></section>
   <ul class="frlist" id="frlist">${list.map(x=>`<li>${canSpeak?`<button class="btn ghost play" type="button" data-say="${x.key}" aria-label="Ascolta">▶</button>`:''}<div><div class="frt">${esc(x.txt)}</div>${x.err?`<div class="fro"><s>${esc(x.orig)}</s>${x.nota?` · <span class="note">${esc(x.nota)}</span>`:''}</div>`:''}<div class="note">${kFmt(x.d,{day:'numeric',month:'short'})}${x.src==='diario'?' · diario':''}${x.tema?' · '+esc(x.tema):''}${x.checked?'':' · non ancora corretta'}</div></div><button class="btn ghost frdel" type="button" data-frdel="${x.key}" aria-label="Togli la frase">✕</button></li>`).join('')}</ul>`;
  fb.querySelectorAll('[data-ff]').forEach(b=>b.onclick=()=>{ frFilt=b.dataset.ff; myPhrases(fb); });
  const msg=t=>{ const m=$('#frmsg'); if(m) m.textContent=t; };
  const correct=async ids=>{
    const f=ids.map(id=>S.frasi[id].f);
    try{ const c=await correggiFrasi(f,(S.frasi[ids[0]]||{}).tema||'',curUnit().lvl);
      if(!c) return 'Salvate. La correzione automatica funziona con la pagina aperta dentro Claude.';
      let n=0; ids.forEach((id,i)=>{ S.frasi[id].c=c[i]; if(!c[i].ok){ n++; addErr('fr-'+id,'lab',{q:f[i],s:'Correggi la tua frase',a:[c[i].corr],n:c[i].nota},'Le mie frasi'); } });
      save(); tick(); return n?`${n} ${n===1?'frase corretta: è':'frasi corrette: sono'} anche nel quaderno degli errori.`:'Tutto giusto ✓';
    }catch(e){ return 'Salvate. '+errMsg(e); }
  };
  $('#fradd').onclick=async()=>{
    const lines=$('#frnew').value.split(/\n+/).map(x=>x.trim()).filter(Boolean).slice(0,15), tema=$('#frtema').value.trim();
    if(!lines.length){ msg('Scrivi almeno una frase.'); return; }
    const t0=Date.now(), d=dayKey(), ids=lines.map((f,i)=>{ const id='f'+(t0+i).toString(36); S.frasi[id]={f,d,t:t0+i,tema}; return id; });
    save(); $('#fradd').disabled=true; msg('Claude sta correggendo…');
    const res=await correct(ids); frFilt='tutte'; myPhrases(fb); msg(res);
  };
  const rc=$('#frcheck'); if(rc) rc.onclick=async()=>{ rc.disabled=true; msg('Claude sta correggendo…'); const res=await correct(unchecked.slice(0,15)); myPhrases(fb); msg(res); };
  fb.querySelectorAll('[data-frdel]').forEach(b=>b.onclick=()=>{ const k=b.dataset.frdel; if(S.frasi[k]){ delete S.frasi[k]; removeErr('fr-'+k); } else S.frasiHide[k]=1; removeErr('frc-'+k); save(); myPhrases(fb); });
  if(!all.length) return;
  fb.querySelectorAll('[data-say]').forEach(b=>b.onclick=()=>{ const x=all.find(y=>y.key===b.dataset.say); if(x) speak(x.txt); });
  const q=$('#frq'); q.oninput=()=>{ const v=q.value.toLowerCase(); fb.querySelectorAll('#frlist li').forEach(li=>{ li.hidden=v&&!li.textContent.toLowerCase().includes(v); }); };
  $('#frrev').onclick=()=>{
    const pool=shuffle(all).slice(0,12).map(x=>{
      if(x.err) return {e:{k:'lab',d:{q:x.orig,s:'Questa è la frase che avevi scritto: scrivila corretta',a:[x.txt],n:x.nota},src:'Le mie frasi'},lab:'Le mie frasi · correggi'};
      const ws=x.txt.replace(/[.,!?;:«»"]/g,' ').split(/\s+/).filter(w=>w.length>=4&&!/^[A-ZÀ-Ý]/.test(w));
      if(!ws.length) return null;
      const w=ws.sort((a,b)=>b.length-a.length)[Math.floor(Math.random()*Math.min(2,ws.length))];
      const p=x.txt.replace(new RegExp('(^|[^a-zàèéìòù])'+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?![a-zàèéìòù])'),'$1___');
      return {e:{key:'frc-'+x.key,k:'fill',d:{p,a:[w],e:'La tua frase: «'+x.txt+'»'},src:'Le mie frasi'},lab:'Le mie frasi · completa'};
    }).filter(Boolean).map(it=>Object.assign(it,{onRes:ok=>{ if(!ok&&it.e.k==='fill') addErr(it.e.key,'fill',it.e.d,'Le mie frasi'); }}));
    const card=$('#frcard'); card.hidden=false; card.scrollIntoView({block:'nearest',behavior:'smooth'});
    quizRun(card,pool,{onEnd:(ok,tot,c)=>{ c.innerHTML=`<div class="drill"><div class="pen" style="font-size:34px">${ok}/${tot}</div><p>${ok===tot?'Perfetto: le tue frasi sono tue!':'Le frasi sbagliate tornano nel quaderno degli errori.'}</p><div class="btnrow" style="justify-content:center"><button class="btn" id="frmore" type="button">Altre frasi</button></div></div>`; $('#frmore').onclick=()=>$('#frrev').click(); }});
  };
}
async function checkWords(keys,fb){
  if(!keys.length) return;
  const msg=t=>{ const m=$('#mvmsg'); if(m) m.textContent=t; };
  const sample=await getSample();
  if(!sample){ msg('Il controllo automatico funziona solo con la pagina aperta dentro Claude: la parola è stata salvata così com\'è.'); return; }
  msg(keys.length===1?'Controllo la parola…':`Controllo ${keys.length} parole…`);
  const items=keys.map(k=>({id:k,it:S.myvoc[k].it,pt:S.myvoc[k].pt,ex:S.myvoc[k].ex||''}));
  try{
    const r=await sample.json(`Sei un insegnante d'italiano. Controlla queste voci del quaderno di vocabolario di una studentessa brasiliana (madrelingua portoghese). Per ogni voce verifica: l'ortografia italiana (accenti, doppie, lettere scambiate), la forma di base corretta (infinito per i verbi, articolo per i nomi se l'ha scritto), che la traduzione portoghese sia giusta e che l'esempio, se c'è, sia corretto. Non cambiare niente che sia già corretto e non aggiungere articoli se lei non li ha scritti.
Rispondi solo con un array JSON, una voce per ciascun id: [{"id":"...","ok":true o false,"it":"forma italiana corretta","pt":"traduzione portoghese corretta","ex":"esempio corretto oppure stringa vuota","nota":"spiegazione brevissima in portoghese dell'errore, vuota se ok"}]

VOCI:
${JSON.stringify(items)}`,{modelTier:'quick',cache:false});
    let nOk=0, nBad=0;
    (Array.isArray(r)?r:[]).forEach(x=>{ const w=S.myvoc[x&&x.id]; if(!w) return;
      const it=String(x.it||w.it).trim(), pt=String(x.pt||w.pt).trim(), ex=String(x.ex||'').trim();
      const same=canon(it)===canon(w.it)&&canon(pt)===canon(w.pt)&&(!ex||!w.ex||canon(ex)===canon(w.ex));
      if(x.ok||same){ w.v=true; delete w.sug; nOk++; } else { w.sug={it,pt,ex:ex&&canon(ex)!==canon(w.ex||'')?ex:'',nota:String(x.nota||'')}; w.v=false; nBad++; } });
    save(); myWords(fb);
    msg(nBad?`${nBad} ${nBad===1?'parola da controllare':'parole da controllare'} qui sopra.`:`Tutto giusto ✓ (${nOk} ${nOk===1?'parola verificata':'parole verificate'}).`);
  }catch(e){ msg(errMsg(e)); }
}
function studyLog(fb){
  const days=Object.keys(S.log).sort().reverse();
  const week=[...Array(7)].map((_,i)=>addDays(-i));
  const tot={}; week.forEach(d=>(S.log[d]||[]).forEach(e=>{ tot[e.t]=(tot[e.t]||0)+e.m; }));
  const all=Object.values(S.log).flat().reduce((a,e)=>a+e.m,0);
  fb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">Registra</span><h3>Che cosa hai fatto oggi fuori dal quaderno?</h3></div></div>
    <form id="lgf" class="mvform"><select id="lg-t">${SRC.map(s=>`<option value="${s}">${s}</option>`).join('')}</select><input id="lg-m" type="number" min="1" max="600" placeholder="minuti" required><input id="lg-n" placeholder="nota (es. lezione 5 del corso, episodio di una serie…)" autocomplete="off"><button class="btn primary" type="submit">Registra</button></form>
    <p class="note">Le lezioni del corso registrate qui spuntano da sole l'attività «Dopo il corso» del tuo piano.</p></section>
   <div class="rgrid"><div class="card"><span class="lab">Ultimi 7 giorni</span><b class="big">${Object.values(tot).reduce((a,b)=>a+b,0)}<small> min</small></b><span class="note">${Object.entries(tot).map(([k,v])=>`${k}: ${v}`).join(' · ')||'—'}</span></div><div class="card"><span class="lab">In totale</span><b class="big">${Math.round(all/6)/10}<small> ore</small></b><span class="note">fuori dal quaderno</span></div><div class="card"><span class="lab">Oggi</span><b class="big">${(S.log[dayKey()]||[]).reduce((a,e)=>a+e.m,0)}<small> min</small></b></div></div>
   ${days.length?`<section class="card"><ul class="errlist">${days.slice(0,30).map(d=>`<li><div><div class="el-t">${new Date(d+'T12:00:00').toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long'})}</div><div class="note">${S.log[d].map(e=>`${esc(e.t)} ${e.m} min${e.n?' ('+esc(e.n)+')':''}`).join(' · ')}</div></div></li>`).join('')}</ul></section>`:''}`;
  $('#lgf').onsubmit=e=>{ e.preventDefault(); const m=Math.max(1,Math.min(600,parseInt($('#lg-m').value,10)||0)); if(!m) return; const d=dayKey(); S.log[d]=(S.log[d]||[]).concat([{t:$('#lg-t').value,m,n:$('#lg-n').value.trim()}]); tick(m); save(); toast(`<span class="pen">Registrato:</span> ${m} minuti`); studyLog(fb); };
}
function racconta(fb){
  fb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">Racconta</span><h3>Che cosa hai letto, visto o studiato oggi?</h3></div></div>
   <p>Riassumi in italiano un capitolo del tuo libro, un video, una lezione del corso o una risposta che hai dato a voce. Puoi anche dettare il testo con il microfono della tastiera.</p>
   <textarea class="paper" id="rctext" style="min-height:200px" placeholder="Oggi ho letto / visto…">${esc(S.racconta||'')}</textarea>
   <div class="btnrow" style="margin-top:10px"><button class="btn red" id="rcgo" type="button">Correggi con la penna rossa</button><span class="note" id="rcwc"></span></div><div id="rcout"></div></section>`;
  const ta=$('#rctext'), wc=()=>{ $('#rcwc').textContent=(ta.value.trim()?ta.value.trim().split(/\s+/).length:0)+' parole'; }; wc();
  ta.oninput=()=>{ S.racconta=ta.value; save(); wc(); };
  $('#rcgo').onclick=async()=>{ const t=ta.value.trim(), out=$('#rcout'); if(t.split(/\s+/).length<20){ out.innerHTML='<p class="note">Scrivi almeno 20 parole.</p>'; return; }
    const sample=await getSample(); if(!sample){ out.innerHTML='<p class="note">La correzione funziona solo con la pagina aperta dentro Claude.</p>'; return; }
    const lang=lname({band:0},1);
    out.innerHTML='<div class="ai-out"><div class="stamp">La professoressa sta leggendo…</div><div id="rcb"></div></div>';
    try{ const r=await sample(`Sei un'insegnante d'italiano. Una studentessa brasiliana (parla anche spagnolo, livello tra A1 e B2) racconta che cosa ha letto, visto o studiato oggi. Il testo può essere dettato: ignora la punteggiatura mancante. Rispondi in ${lang} con queste sezioni in markdown:
## Livello stimato
## Errori
(formato: ~~sbagliato~~ → **giusto**: spiegazione; segna [ES] o [PT] per le interferenze. Solo errori veri: non inserire mai forme già corrette.)
## Testo corretto
## 5 parole o espressioni nuove da imparare
(utili per questo argomento, con traduzione in portoghese)

TESTO:
"""${t}"""`,{cache:false,onText:({text})=>{ const b=$('#rcb'); if(b) b.innerHTML=md(text); }});
      $('#rcb').innerHTML=md(r.text); out.querySelector('.stamp').textContent='Corretto ✓'; tick(10);
    }catch(e){ out.innerHTML=`<p class="note">${esc(errMsg(e))}</p>`; } };
}
const vLink=([id,t])=>`<a href="${ytV(id)}" target="_blank" rel="noopener">${esc(t)}</a>`;
function libri(fb){
  const cur=libroOra();
  fb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">La tua biblioteca</span><h3>Un libro per ogni livello</h3></div></div>
   <p>Leggere un libro intero è il modo più veloce per far entrare la grammatica nell'orecchio. Comprane uno alla volta: quello del tuo livello, segnato qui sotto. Le letture graduate di Alma Edizioni hanno l'audio online e gli esercizi in fondo.</p>
   <p class="note">Il ritmo giusto: 10 minuti la domenica (il giorno libero del piano) o dopo il corso. Le parole nuove vanno in <a href="#fuori" data-go="parole">Le mie parole</a>, i riassunti in <a href="#fuori" data-go="racconta">Racconta</a>.</p></section>
   <div class="books">${LIBRI.map((L,i)=>`<article class="card bookc ${L===cur?'cur':''} ${S.books[i]?'read':''}"><div class="card-h"><div><span class="lab">${L.lvl}${L===cur?' · il libro del momento':''}</span><h3><i>${esc(L.tit)}</i></h3><span class="note">${esc(L.aut)} · ${esc(L.ed)}${L.isbn?' · ISBN '+L.isbn:''}</span></div></div>
     <p>${esc(L.perche)}</p><p class="note"><b>Come leggerlo:</b> ${esc(L.come)}</p><p class="note"><b>In alternativa:</b> ${esc(L.alt)}</p>
     <div class="btnrow"><button class="btn ${S.books[i]?'kn':''}" type="button" data-book="${i}">${S.books[i]?'✓ Letto':"L'ho letto"}</button></div></article>`).join('')}</div>`;
  fb.querySelectorAll('[data-go]').forEach(a=>a.onclick=e=>{ e.preventDefault(); fuoriMode=a.dataset.go; renderFuori(); });
  fb.querySelectorAll('[data-book]').forEach(b=>b.onclick=()=>{ const i=b.dataset.book; S.books[i]=!S.books[i]; if(!S.books[i]) delete S.books[i]; else tick(5); save(); libri(fb); });
}
function risorse(fb){
  fb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">Metodo</span><h3>Come studiare con un video in 20 minuti</h3></div></div>
   <ol class="dots"><li><b>Guarda una volta</b> senza fermarti.</li><li><b>Riguarda gli esempi</b>: metti in pausa e ripeti ad alta voce le frasi in italiano (shadowing).</li><li><b>Annota 5 parole</b> nuove in <a href="#fuori" data-go="parole">Le mie parole</a>.</li><li><b>Fai gli esercizi</b> del video o quelli dell'unità corrispondente nel quaderno.</li><li><b>Registra</b> i minuti nel <a href="#fuori" data-go="registro">Registro di studio</a>.</li></ol></section>
   <section class="card"><div class="card-h"><div><span class="lab">Il canale consigliato</span><h3>Italianeando</h3></div></div>
   <p>Lezioni di grammatica italiana spiegate in spagnolo, con esempi ed esercizi corretti: per te, che parli spagnolo, sono chiarissime. Sono organizzate in quattro corsi, dall'A1 al B2. In ogni unità del quaderno, nella scheda «Parla e ascolta», trovi i video giusti per quell'argomento.</p>
   <div class="btnrow">${ITN_PL.map(([l,id,t])=>`<a class="btn" href="${ytPL(id)}" target="_blank" rel="noopener">${t}</a>`).join('')}<a class="btn ghost" href="${ITN_CH}" target="_blank" rel="noopener">Tutti i corsi</a></div></section>
   <section class="card"><div class="card-h"><div><span class="lab">Per argomento</span><h3>I video per ogni unità</h3></div></div>
    <div class="vlinks">${UNITS.map(u=>{ const v=VIDEI[u.id]; return `<div><b>${esc(uName(u))}</b> · ${v?v.map(vLink).join(' · '):`<span class="note">nessun video specifico: ripassa con il <a href="${ytPL(ITN_PL[3][1])}" target="_blank" rel="noopener">corso B2</a></span>`}</div>`; }).join('')}
    <div><b>Utili in ogni momento</b> · ${VIDEI_EXTRA.map(vLink).join(' · ')}</div></div></section>
   <section class="card"><div class="card-h"><div><span class="lab">Podcast e TV</span><h3>Per abituare l'orecchio</h3></div></div>
   <ul class="dots">
    <li><b>A1–A2</b> · <a href="https://coffeebreaklanguages.com" target="_blank" rel="noopener">Coffee Break Italian</a> (podcast con spiegazioni)</li>
    <li><b>A2–B2</b> · <a href="https://www.podcastitaliano.com" target="_blank" rel="noopener">Podcast Italiano</a> (episodi per principianti e per avanzati) · <a href="https://www.italianoautomatico.com" target="_blank" rel="noopener">Italiano Automatico</a></li>
    <li><b>B2–C1</b> · <a href="https://www.raiplay.it" target="_blank" rel="noopener">RaiPlay</a> (TV italiana) · <a href="https://www.raiplaysound.it" target="_blank" rel="noopener">RaiPlay Sound</a> (radio e podcast in italiano)</li>
   </ul></section>
   <section class="card"><div class="card-h"><div><span class="lab">Per il piacere</span><h3>Film, serie e musica</h3></div></div>
   <ul class="dots">
    <li><b>Film più facili:</b> <i>Benvenuti al Sud</i> (le differenze tra Nord e Sud), <i>Perfetti sconosciuti</i>, <i>Nuovo Cinema Paradiso</i>, <i>La vita è bella</i>.</li>
    <li><b>Serie:</b> <i>Don Matteo</i> (lingua semplice), <i>Il commissario Montalbano</i> (accento siciliano), <i>L'amica geniale</i> (anche in dialetto napoletano: perfetta con i sottotitoli).</li>
    <li><b>Musica con i testi:</b> cerca il testo e leggilo mentre ascolti: Laura Pausini, Eros Ramazzotti, Tiziano Ferro, Jovanotti, Marco Mengoni, Lucio Dalla, Mina.</li>
   </ul></section>`;
  fb.querySelectorAll('[data-go]').forEach(a=>a.onclick=e=>{ e.preventDefault(); fuoriMode=a.dataset.go; renderFuori(); });
}

/* ---------- scheda dell'unità: Parla e ascolta ---------- */
function tabParla(u,c){
  const st=S.spk[u.id]||{}, sp=USPEAK[u.id]||{p:[],v:[]};
  const raw=u.reading.text.replace(/<b>[^<]*:<\/b>\s*/g,'— ').replace(/<\/p>\s*<p>/g,'\n\n').replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').trim();
  const sents=orderSentences(u);
  c.innerHTML=`${voiceNote()}
   <section class="card"><div class="card-h"><div><span class="lab">1 · Leggi ad alta voce</span><h3>${esc(u.reading.title)}</h3></div></div>${readAloudBlock(raw,'u'+u.id)}</section>
   <section class="card"><div class="card-h"><div><span class="lab">2 · Dettato</span><h3>Scrivi quello che senti</h3></div><span class="score" id="pdscore">${st.dict||''}</span></div><div id="pdbox"></div><p class="note" id="pdpos"></p></section>
   <section class="card"><div class="card-h"><div><span class="lab">3 · Rispondi a voce</span><h3>Parla per un minuto</h3></div></div>
    <p class="note">Leggi o ascolta la domanda e rispondi ad alta voce, senza scrivere. Poi spunta la domanda.</p>
    <ul class="phr">${sp.p.map((q,i)=>`<li><button class="btn ghost play" type="button" data-q="${i}" aria-label="Ascolta">▶</button><div class="phr-it">${esc(q)}</div><button class="btn ghost said ${st.said&&st.said[i]?'kn':''}" type="button" data-said="${i}">${st.said&&st.said[i]?'✓ fatto':'fatto?'}</button></li>`).join('')}</ul>
    <p class="note">Vuoi una correzione? Detta una risposta nel <a href="#fuori" id="pracc">Racconta</a> o pratica con la <a href="#parlare" id="pconv">conversazione con l'IA</a>.</p></section>
   <section class="card"><div class="card-h"><div><span class="lab">4 · Guarda e ascolta</span><h3>I video di Italianeando su questo argomento</h3></div></div>
    ${VIDEI[u.id]?`<ul class="dots">${VIDEI[u.id].map(v=>`<li>${vLink(v)}</li>`).join('')}</ul><p class="note">Spiegazioni in spagnolo, esempi in italiano: ripeti ad alta voce gli esempi.</p>`:`<p>Per questo argomento non c'è un video specifico. Ripassa con il ${bandPL(u.band).map(([l,id,t])=>`<a href="${ytPL(id)}" target="_blank" rel="noopener">${t}</a>`).join(' o il ')} di Italianeando, oppure ascolta un episodio di <a href="https://www.raiplaysound.it" target="_blank" rel="noopener">RaiPlay Sound</a> e cerca le strutture dell'unità.</p>`}
    <p class="note">Dopo aver guardato, registra i minuti nel <a href="#fuori" id="preg">Registro di studio</a>.</p></section>
   <div class="done-row"><button class="btn ${st.done?'':'primary'}" id="pdone" type="button">${st.done?'✓ Parla e ascolta completato':'Segna come completato'}</button></div>`;
  bindReadAloud(c,raw,'u'+u.id);
  const set=(k,v)=>{ S.spk[u.id]=Object.assign({},S.spk[u.id]||{},{[k]:v}); save(); };
  c.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>speakSeq([{text:sp.p[+b.dataset.q]}]));
  c.querySelectorAll('[data-said]').forEach(b=>b.onclick=()=>{ const said=Object.assign({},(S.spk[u.id]||{}).said||{}); const i=b.dataset.said; said[i]=!said[i]; if(said[i]) tick(3); set('said',said); b.textContent=said[i]?'✓ fatto':'fatto?'; b.classList.toggle('kn',!!said[i]); });
  [['pracc','racconta'],['preg','registro']].forEach(([id,m])=>{ const a=$('#'+id); if(a) a.onclick=()=>{ fuoriMode=m; }; });
  const pc=$('#pconv'); if(pc) pc.onclick=()=>{ parMode='ia'; };
  $('#pdone').onclick=()=>{ set('done',!(S.spk[u.id]||{}).done); tabParla(u,c); refreshProgress(u); };
  let pos=0, ok=0;
  const next=()=>{ if(pos>=sents.length){ $('#pdbox').innerHTML=`<p><span class="mark ok">Dettato finito: ${ok}/${sents.length}</span></p><button class="btn" type="button" id="pdagain">Rifai il dettato</button>`; set('dict',ok+'/'+sents.length); showScore($('#pdscore'),ok,sents.length); if(!(S.spk[u.id]||{}).done){ set('done',true); refreshProgress(u); const b=$('#pdone'); if(b){ b.textContent='✓ Parla e ascolta completato'; b.classList.remove('primary'); } } $('#pdagain').onclick=()=>{ pos=0; ok=0; next(); }; $('#pdpos').textContent=''; return; }
    $('#pdpos').textContent=`Frase ${pos+1} di ${sents.length}`;
    dictCard($('#pdbox'),sents[pos],uName(u)+' · dettato',good=>{ if(good) ok++; const b=document.createElement('button'); b.className='btn'; b.type='button'; b.textContent=pos+1<sents.length?'Prossima frase →':'Vedi il risultato'; b.style.marginTop='8px'; b.onclick=()=>{ pos++; next(); }; $('#pdbox').appendChild(b); b.focus(); });
  };
  if(sents.length) next(); else $('#pdbox').innerHTML='<p class="note">Nessuna frase per questa unità.</p>';
  if(st.dict){ const [a,b]=st.dict.split('/').map(Number); showScore($('#pdscore'),a,b); }
}

/* ---------- ripasso: nuovi tipi ---------- */
function reviewExtra(box,e,finish){
  const d=e.d, chk=$('#rvcheck');
  if(e.k==='dict'){
    box.innerHTML='<div id="rvd"></div>'; chk.hidden=true;
    const ctl=dictCard($('#rvd'),d.s,e.src,ok=>{ finish(ok,''); });
    if(canSpeak) setTimeout(()=>ctl.play(),250);
    return true;
  }
  if(e.k==='myvoc'){
    const w=S.myvoc[d.k]; if(!w){ box.innerHTML='<p class="note">Parola rimossa.</p>'; chk.onclick=()=>finish(true,''); return true; }
    box.innerHTML=`<div class="drill" style="padding:6px 0"><span class="lab">come si dice in italiano?</span><div class="verb" style="font-size:34px">${esc(w.pt)}</div><input id="rvin" autocomplete="off" autocapitalize="off" spellcheck="false"></div>`;
    const inp=$('#rvin'); inp.focus({preventScroll:true});
    const go=()=>{ if(!inp.value.trim()) return; const r=judge(inp.value,[w.it,w.it.replace(/^(il|lo|la|l'|i|gli|le|un|uno|una|un')\s*/i,'')]); finish(r!=='no',`<p class="corrected">${esc(w.it)}</p>${w.ex?`<p class="expl">${esc(w.ex)}</p>`:''}`); };
    inp.addEventListener('keydown',ev=>{ if(ev.key==='Enter'){ ev.preventDefault(); if(!$('#rvnext').hidden) $('#rvnext').click(); else go(); } }); chk.onclick=go;
    return true;
  }
  return false;
}

/* ═════════ IL RACCONTO E LE SCHEDE ═════════ */
const chapterOfUnit = id => STORIA.findIndex(c=>c.u===id);
const storyRead = i => !!(S.story[i]&&S.story[i].read);
function storyCard(u){
  const i=chapterOfUnit(u.id); if(i<0) return '';
  const c=STORIA[i];
  return `<a class="card storycard" href="#racconto-${i}"><span class="lab">Il racconto · capitolo ${i+1} di ${STORIA.length}${storyRead(i)?' · ✓ letto':''}</span><h3>La lettera di Anna: «${esc(c.t)}»</h3><span class="note">Continua la storia con la grammatica di questa unità: ${esc(c.g)}.</span></a>`;
}
function renderRacconto(id){
  if(id===undefined){
    const next=STORIA.findIndex((_,i)=>!storyRead(i)); const done=STORIA.filter((_,i)=>storyRead(i)).length;
    $('#main').innerHTML=`<header class="story-hero"><div class="eyebrow">Il racconto · ${STORIA.length} capitoli dall'A1 al C1</div><h1 class="title">La lettera di Anna</h1>
     <p class="lead">Clara, architetta brasiliana, trova nella casa della nonna una lettera in italiano del 1925. Non capisce una parola. Per leggerla comincia a studiare, e la lettera la porta fino a un piccolo paese del Veneto, a una chiave arrugginita e a un segreto di famiglia lungo cento anni.</p>
     <p class="note">Un capitolo per ogni unità: ogni capitolo usa la grammatica che hai appena studiato e diventa più difficile insieme a te. Puoi ascoltarlo, leggerlo ad alta voce e rispondere a tre domande.</p>
     <div class="uprog"><span class="track"><i style="width:${Math.round(100*done/STORIA.length)}%"></i></span><span>${done}/${STORIA.length} capitoli letti</span></div>
     <div class="btnrow" style="margin-top:14px"><a class="btn primary" href="#racconto-${next<0?0:next}">${next<=0?(done?'Rileggi dall\'inizio':'Comincia a leggere'):'Continua: capitolo '+(next+1)} →</a></div></header>
     ${BANDS.map((b,bi)=>{ const ch=STORIA.map((c,i)=>[c,i]).filter(([c])=>{ const u=UNITS.find(x=>x.id===c.u); return u&&u.band===bi; }); return ch.length?`<h3>${bi===0?'A1 → A2 · Primi passi':b}</h3><ol class="chapters">${ch.map(([c,i])=>`<li class="${storyRead(i)?'read':''}"><a href="#racconto-${i}"><span class="cn">${i+1}</span><span class="ct"><b>${esc(c.t)}</b><small>${esc(uName(UNITS.find(x=>x.id===c.u)))} · ${esc(c.g)}</small></span>${storyRead(i)?'<span class="mark ok">✓</span>':''}</a></li>`).join('')}</ol>`:''; }).join('')}`;
    return;
  }
  const c=STORIA[id], u=UNITS.find(x=>x.id===c.u), st=S.story[id]||{};
  const prevUnread = id>0 && !storyRead(id-1);
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow"><a href="#racconto">La lettera di Anna</a> · capitolo ${id+1} di ${STORIA.length} · ${esc(u.lvl)}</div><h1 class="title">${esc(c.t)}</h1>
   <p class="subtitle">Grammatica in evidenza: ${esc(c.g)} · <a href="#unita-${u.id}">${esc(uName(u))}</a></p></header>
   ${prevUnread?`<div class="callout small">Questo capitolo continua il <a href="#racconto-${id-1}">capitolo ${id}</a>, che non hai ancora letto.</div>`:''}
   ${voiceNote()}
   <section class="card storytext">${readAloudBlock(c.text,'s'+id)}</section>
   <p class="note">Parole sottolineate con i puntini: passa il mouse o toccale per la traduzione.</p>
   <section class="card"><div class="card-h"><div><span class="lab">Hai capito?</span><h3>Tre domande</h3></div><span class="score" id="sscore"></span></div><ol class="items" id="sq"></ol>
    <div class="btnrow"><button class="btn" id="sreset" type="button">Rifai</button><button class="btn ${st.read?'':'primary'}" id="sread" type="button">${st.read?'✓ Capitolo letto':'Segna come letto'}</button></div></section>
   <div class="btnrow" style="justify-content:space-between;margin-top:24px">${id>0?`<a class="btn ghost" href="#racconto-${id-1}">← Capitolo ${id}</a>`:'<a class="btn ghost" href="#racconto">← Indice</a>'}${id<STORIA.length-1?`<a class="btn ${st.read?'primary':'ghost'}" href="#racconto-${id+1}">Capitolo ${id+2}: ${esc(STORIA[id+1].t)} →</a>`:'<span class="pen" style="font-size:24px">Fine</span>'}</div>`;
  bindReadAloud($('#main'),c.text,'s'+id);
  const mark=()=>{ if(storyRead(id)) return; S.story[id]=Object.assign({},S.story[id]||{},{read:true}); tick(5); save(); renderNav(route()); const b=$('#sread'); if(b){ b.textContent='✓ Capitolo letto'; b.classList.remove('primary'); }
    if(id===STORIA.length-1) toast('<span class="pen">Fine!</span> Hai letto tutta «La lettera di Anna».'); };
  $('#sread').onclick=()=>{ if(storyRead(id)){ S.story[id].read=false; save(); renderNav(route()); renderRacconto(id); } else mark(); };
  $('#sreset').onclick=()=>renderRacconto(id);
  mcList($('#sq'),c.q,(s,t)=>{ S.story[id]=Object.assign({},S.story[id]||{},{q:s+'/'+t}); showScore($('#sscore'),s,t); mark(); },i=>[`st${id}-${i}`,'mc',{q:c.q[i][0],o:c.q[i][1],c:c.q[i][2],e:''},'Il racconto · cap. '+(id+1)]);
  if(st.q){ const [a,b]=st.q.split('/').map(Number); showScore($('#sscore'),a,b); }
}
function renderScheda(id){
  if(id===undefined){
    $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Strumenti · ripasso veloce</div><h1 class="title">Schede riassuntive</h1>
     <p class="subtitle">Una pagina per ogni unità con le regole chiave, gli esempi da ascoltare e la trappola da evitare. Perfette per ripassare in due minuti prima della lezione del corso.</p></header>
     ${BANDS.map((b,bi)=>{ const us=UNITS.filter(u=>u.band===bi&&SCHEDE[u.id]); return us.length?`<h3>${bi===0?'A1 → A2 · Primi passi':b}</h3><div class="lexgrid">${us.map(u=>`<a class="card lexcard" href="#scheda-${u.id}"><span class="lab">${esc(uName(u))}</span><h3>${esc(u.title)}</h3><span class="note">${SCHEDE[u.id].r.length} regole · ${SCHEDE[u.id].e.length} esempi</span></a>`).join('')}</div>`:''; }).join('')}`;
    return;
  }
  const u=UNITS.find(x=>x.id===id), s=SCHEDE[id], ci=chapterOfUnit(id), i=UNITS.indexOf(u);
  S.schedaDays[dayKey()]=1; save();
  const prev=UNITS.slice(0,i).reverse().find(x=>SCHEDE[x.id]), next=UNITS.slice(i+1).find(x=>SCHEDE[x.id]);
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow"><a href="#schede">Schede riassuntive</a> · ${esc(uName(u))} · ${esc(u.lvl)}</div><h1 class="title">${esc(u.title)}</h1><p class="subtitle">Il ripasso in due minuti.</p></header>
   <section class="card scheda"><div class="card-h"><div><span class="lab">Da ricordare</span><h3>Le regole chiave</h3></div></div><ol class="srules">${s.r.map(r=>`<li>${r}</li>`).join('')}</ol></section>
   <section class="card"><div class="card-h"><div><span class="lab">Esempi</span><h3>Ascolta e ripeti</h3></div>${canSpeak?`<button class="btn" type="button" id="sh-all">▶ Tutti</button>`:''}</div><ul class="phr">${s.e.map((e,k)=>`<li><button class="btn ghost play" type="button" data-e="${k}" aria-label="Ascolta">▶</button><div class="phr-it">${esc(e)}</div></li>`).join('')}</ul></section>
   <div class="trap"><span class="pen">La trappola</span>${s.t}</div>
   <div class="btnrow" style="margin-top:18px"><a class="btn" href="#unita-${u.id}" data-tab="lezione">Rileggi la lezione</a><a class="btn primary" href="#unita-${u.id}" data-tab="esercizi">Fai gli esercizi →</a>${ci>=0?`<a class="btn" href="#racconto-${ci}">Leggi il capitolo ${ci+1} del racconto</a>`:''}</div>
   <div class="btnrow" style="justify-content:space-between;margin-top:24px">${prev?`<a class="btn ghost" href="#scheda-${prev.id}">← ${esc(uName(prev))}</a>`:'<span></span>'}${next?`<a class="btn ghost" href="#scheda-${next.id}">${esc(uName(next))} →</a>`:''}</div>`;
  $('#main').querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>speakSeq([{text:s.e[+b.dataset.e]}]));
  const sa=$('#sh-all'); if(sa) sa.onclick=()=>{ if(speakingId==='sh-all'){ stopSpeak(); return; } speakSeq(s.e.map(t=>({text:t})),'sh-all'); };
  $('#main').querySelectorAll('a[data-tab]').forEach(a=>a.addEventListener('click',()=>{ S.tab[u.id]=a.dataset.tab; save(); }));
}

/* ═════════ FISSARE I CONTENUTI ═════════
   1 · Ripasso misto della settimana      (#misto)
   2 · Memoria a lungo termine (grammatica e verbi con ripetizione dilazionata, dentro il ripasso del giorno)
   3 · «Ti ricordi?»: riscaldamento sull'unità precedente (scheda Lezione)
   4 · Diario: 3 frasi dopo il corso      (#diario)
   6 · Dettato delle frasi delle mie unità (#ascolto, «Le mie unità»)            */

const MEM_INT=[3,7,15,30,60];          // dopo 5 ripassi giusti la carta è consolidata
const MEM_PER_DAY=6;
const TENSE_AT={pres:104,pp:2,imp:3,fut:6,cond:6,cong:8,cimp:9,pr:12};
const MEM_VERBS=['essere','avere','fare','andare','venire','stare','dire','potere','volere','dovere','sapere','parlare','prendere','dormire','finire','uscire'];

function uStudied(u){ return !!(S.lesson[u.id]||S.read[u.id]||u.ex.some((_,i)=>S.ex[u.id+'-'+i])); }
function studiedUnits(){ return UNITS.filter(uStudied); }
function exItem(u,si,ii){
  const set=u.ex[si]; if(!set) return null; const it=set.items[ii]; if(!it) return null;
  const key=`${u.id}-${si}-${ii}`, src=uName(u)+' · serie '+String.fromCharCode(65+si);
  if(set.t==='fill') return {key,k:'fill',d:{p:it[0],a:it[1],e:it[2]||''},src};
  if(set.t==='fix') return {key,k:'fix',d:{p:it[0],a:it[1],c:it[2]},src};
  if(set.t==='mc') return {key,k:'mc',d:{q:it[0],o:it[1],c:it[2],e:it[3]||''},src};
  if(set.t==='order') return {key,k:'order',d:{s:it[0],al:it[1]||[]},src};
  return null;
}
function unitItems(u,onlyDone){ const out=[]; u.ex.forEach((set,si)=>{ if(onlyDone&&!S.ex[u.id+'-'+si]) return; set.items.forEach((_,ii)=>{ const x=exItem(u,si,ii); if(x) out.push(x); }); }); return out; }
function verbItem(v,t){
  if(!VERBI[v]) return null; let f; try{ f=coniuga(v,t); }catch(e){ return null; }
  const ps=(f||[]).map((x,i)=>x&&x!=='—'?i:-1).filter(i=>i>=0); if(!ps.length) return null;
  const p=ps[Math.floor(Math.random()*ps.length)];
  return {key:`v-${v}-${t}-${p}`,k:'verb',d:{v,t,p},src:'Verbi · '+TEMPI[t]};
}
function tensesOpen(){ return Object.keys(TENSE_AT).filter(t=>{ const u=UNITS.find(x=>x.id===TENSE_AT[t]); return u&&uStudied(u); }); }
const weekKey=k=>{ const d=kDate(k), wd=(d.getDay()+6)%7; return kAdd(k,-wd); };

/* ---------- 2 · memoria a lungo termine ---------- */
function memItem(key){
  if(key.startsWith('v:')){ const [,v,t]=key.split(':'); return verbItem(v,t); }
  const [uid,si,ii]=key.split('-').map(Number); const u=UNITS.find(x=>x.id===uid);
  return u?exItem(u,si,ii):null;
}
function memSync(){
  if(!S.mem) return;
  const t=dayKey(); let added=0;
  const add=key=>{ if(S.mem[key]||(S.memDone&&S.memDone[key])) return; S.mem[key]={b:0,due:kAdd(t,3+(added%5))}; added++; };
  UNITS.forEach(u=>u.ex.forEach((set,si)=>{
    if(!S.ex[u.id+'-'+si]) return;
    const n=set.items.length, pick=[...new Set([0,Math.floor(n/2),n-1])];
    pick.forEach(ii=>{ const key=`${u.id}-${si}-${ii}`; if(!S.err[key]) add(key); });
  }));
  tensesOpen().forEach(tn=>MEM_VERBS.slice(0,tn==='pres'?16:10).forEach(v=>{ if(VERBI[v]) add(`v:${v}:${tn}`); }));
  if(added) save();
  return added;
}
function memDue(){ const t=dayKey(); return Object.keys(S.mem||{}).filter(k=>S.mem[k].due<=t).sort((a,b)=>S.mem[a].due.localeCompare(S.mem[b].due)); }
function memToday(){ const done=(S.memDays&&S.memDays[dayKey()])||0; return memDue().slice(0,Math.max(0,MEM_PER_DAY-done)); }
function memResult(key,ok,item){
  const m=S.mem[key]; if(!m) return;
  const t=dayKey(); S.memDays[t]=(S.memDays[t]||0)+1;
  if(ok){ m.b++; if(m.b>=MEM_INT.length){ delete S.mem[key]; S.memDone[key]=t; } else m.due=kAdd(t,MEM_INT[m.b]); }
  else { m.b=0; m.due=kAdd(t,3); if(item) addErr(item.key,item.k,item.d,item.src); }
  save();
}
function memStats(){ const all=Object.keys(S.mem||{}); return {n:all.length,due:memDue().length,today:memToday().length,done:Object.keys(S.memDone||{}).length}; }

/* ---------- motore comune delle domande (usa reviewCard) ---------- */
function quizRun(card,list,opts){
  opts=opts||{}; let pos=0, ok=0;
  const next=()=>{
    if(pos>=list.length){ opts.onEnd&&opts.onEnd(ok,list.length,card); return; }
    const it=list[pos];
    card.innerHTML=`<div class="card-h"><span class="lab">${esc(it.lab||it.e.src||'')}</span><span class="note">${pos+1} / ${list.length}</span></div><div id="rvbody"></div><div class="fb" id="rvfb"></div><div class="btnrow" style="margin-top:14px"><button class="btn primary" id="rvcheck">Verifica</button><button class="btn" id="rvnext" hidden>Avanti →</button></div>`;
    let answered=false;
    const finish=(good,html)=>{
      if(answered) return; answered=true;
      try{ it.onRes&&it.onRes(good); }catch(e){}
      tick(); if(good) ok++;
      $('#rvfb').innerHTML=(good?'<span class="mark ok">Giusto! ✓</span>':'<span class="mark no">Non ancora…</span>')+(html||'');
      $('#rvcheck').hidden=true; const nx=$('#rvnext'); nx.hidden=false; nx.textContent=pos===list.length-1?'Fine →':'Avanti →'; nx.focus({preventScroll:true});
    };
    $('#rvnext').onclick=()=>{ pos++; next(); };
    reviewCard($('#rvbody'),it.e,finish);
  };
  next();
}
const errOnWrong=x=>ok=>{ if(!ok&&x.k!=='dict') addErr(x.key,x.k,x.d,x.src); };

/* ---------- 1 · ripasso misto della settimana ---------- */
function dictPool(units){
  const out=[];
  units.forEach(u=>{
    (u.ex.find(x=>x.t==='order')||{items:[]}).items.forEach(i=>out.push([i[0],u]));
    if(u.reading) sentencesOf(u.reading.text.replace(/<[^>]+>/g,' ')).forEach(s=>out.push([s,u]));
    u.ex.filter(x=>x.t==='fill').forEach(set=>set.items.forEach(it=>{ if(Array.isArray(it[1][0])) return; const s=it[0].replace(/\s*\([^()]*\)\s*$/,'').replace('___',it[1][0]); if(!/___/.test(s)) out.push([s,u]); }));
  });
  return out.filter(([s])=>{ const n=s.split(/\s+/).length; return n>=4&&n<=14&&!/[—«»"]/.test(s.slice(0,1)); });
}
function mistoList(){
  const us=shuffle(studiedUnits().filter(u=>u.ex.length));
  const pools=us.map(u=>shuffle(unitItems(u,true).length?unitItems(u,true):unitItems(u)));
  const list=[]; let round=0;
  while(list.length<9&&round<3){ pools.forEach(p=>{ if(list.length<9&&p[round]) list.push(p[round]); }); round++; }
  const ts=tensesOpen(); if(ts.length){ for(let i=0;i<2;i++){ const t=ts[Math.floor(Math.random()*ts.length)], v=MEM_VERBS[Math.floor(Math.random()*10)]; const x=verbItem(v,t); if(x) list.push(x); } }
  const themes=LESSICO.map((t,i)=>i).filter(i=>S.lexSeen[i]||(LESSICO[i].u&&UNITS.find(u=>u.id===LESSICO[i].u&&uStudied(u))));
  if(themes.length){ const ti=themes[Math.floor(Math.random()*themes.length)], wi=Math.floor(Math.random()*LESSICO[ti].w.length); list.push({key:'voc-'+hashStr(LESSICO[ti].w[wi][0]),k:'vocab',d:{t:ti,i:wi},src:'Lessico · '+LESSICO[ti].t}); }
  const out=shuffle(list).map(x=>({e:x,lab:x.src,onRes:errOnWrong(x)}));
  if(canSpeak){ const dp=shuffle(dictPool(us)).slice(0,2); dp.forEach(([s,u])=>out.push({e:{k:'dict',d:{s},src:uName(u)+' · dettato'},lab:uName(u)+' · dettato'})); }
  return out;
}
function renderMisto(){
  const wk=weekKey(dayKey()), done=S.misto[wk], us=studiedUnits();
  const hist=Object.entries(S.misto).sort((a,b)=>b[0].localeCompare(a[0])).slice(0,8);
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Ogni giorno · ripasso</div><h1 class="title">Ripasso misto</h1>
   <p class="subtitle">Una volta alla settimana, circa 10 minuti: domande mescolate di tutte le unità che hai già studiato, più verbi, lessico e due dettati. Mescolare gli argomenti costringe la memoria a scegliere la regola giusta, ed è così che la regola resta. Le risposte sbagliate vanno nel quaderno degli errori.</p></header>
   ${us.length<2?`<section class="card"><p>Il ripasso misto si apre quando hai studiato almeno due unità. Per ora ne hai ${us.length}: continua con il piano!</p></section>`:`
   <section class="card" id="mxcard"><div class="card-h"><div><span class="lab">Settimana del ${kFmt(wk,{day:'numeric',month:'long'})}</span><h3>${done?'Fatto questa settimana ✓':'Il ripasso di questa settimana'}</h3></div>${done?`<span class="score">${done.s}/${done.t}</span>`:''}</div>
    <p>${us.length} unità studiate: ${us.map(u=>esc(uNum(u))).join(', ')}.</p>
    <div class="btnrow"><button class="btn primary" id="mxgo">${done?'Rifallo':'Comincia'}</button></div></section>`}
   ${hist.length?`<section class="card"><div class="card-h"><div><span class="lab">Le ultime settimane</span><h3>I tuoi risultati</h3></div></div><ul class="dots">${hist.map(([k,r])=>`<li>settimana del ${kFmt(k,{day:'numeric',month:'short'})}: <b>${r.s}/${r.t}</b></li>`).join('')}</ul></section>`:''}`;
  const go=$('#mxgo'); if(!go) return;
  go.onclick=()=>{
    const list=mistoList(), card=$('#mxcard');
    quizRun(card,list,{onEnd:(ok,tot,c)=>{
      S.misto[wk]={s:ok,t:tot,d:dayKey()}; save(); renderNav(route());
      c.innerHTML=`<div class="drill"><div class="pen" style="font-size:40px">${ok}/${tot}</div><p class="lead" style="margin:10px auto">${ok>=tot*0.8?'Ottimo: le unità passate sono ancora lì!':ok>=tot*0.5?'Bene. Gli errori sono nel quaderno: torneranno domani.':'Niente panico: è proprio a questo che serve. Gli errori tornano domani nel quaderno.'}</p><div class="btnrow" style="justify-content:center"><a class="btn primary" href="#ripasso">Quaderno degli errori</a><a class="btn" href="#">Torna a oggi</a></div></div>`;
    }});
  };
}

/* ---------- 3 · ti ricordi? ---------- */
function ricordiHTML(u){
  const i=UNITS.indexOf(u), prev=UNITS[i-1];
  if(!prev||!prev.ex.length||!uStudied(prev)) return '';
  const r=S.ricordi[u.id];
  return `<section class="card ricordi" id="riccard"><div class="card-h"><div><span class="lab">Riscaldamento · 2 minuti</span><h3>Ti ricordi? 5 domande su ${esc(uName(prev))}</h3></div>${r?`<span class="score">${r.s}/${r.t}</span>`:''}</div>
   <p class="note">Prima della lezione nuova, richiama quella di prima: ricordare, anche con fatica, è quello che fissa la memoria.</p>
   <div class="btnrow"><button class="btn ${r?'':'primary'}" id="ricgo" data-prev="${prev.id}">${r?'Rifai il riscaldamento':'Comincia'}</button></div></section>`;
}
function bindRicordi(u){
  const b=$('#ricgo'); if(!b) return;
  b.onclick=()=>{
    const prev=UNITS.find(x=>x.id===+b.dataset.prev);
    const items=shuffle(unitItems(prev).filter(x=>x.k!=='order')).slice(0,5).map(x=>({e:x,lab:x.src,onRes:errOnWrong(x)}));
    quizRun($('#riccard'),items,{onEnd:(ok,tot,c)=>{ S.ricordi[u.id]={s:ok,t:tot,d:dayKey()}; save();
      c.innerHTML=`<div class="card-h"><div><span class="lab">Riscaldamento</span><h3>${ok}/${tot} · ${ok>=4?'Tutto chiaro, avanti!':'Gli errori sono nel quaderno: li rivedrai domani.'}</h3></div></div><p class="note">Adesso la lezione nuova, qui sotto.</p>`; }});
  };
}

/* ---------- 4 · diario dopo il corso ---------- */
function isDiaryDay(k){
  const t=dayType(k); if(t!=='study'&&t!=='class') return false;
  const p1=kAdd(k,-1), t1=dayType(p1);
  if(t1==='class') return true;
  return t1==='work'&&dayType(kAdd(k,-2))==='class';
}
function lastClassBefore(k){ for(let i=1;i<=3;i++){ const d=kAdd(k,-i); if(dayType(d)==='class') return d; } return null; }
function curUnit(){ const s=STEPS().find(x=>!stepDone(x)&&x.uid); return s?UNITS.find(u=>u.id===s.uid):UNITS[UNITS.length-1]; }
function renderDiario(){
  const k=dayKey(), cur=curUnit(), ent=S.diario[k]||{f:['','',''],tema:''};
  const lc=lastClassBefore(k);
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Ogni giorno · scrittura</div><h1 class="title">Il mio diario</h1>
   <p class="subtitle">Il giorno dopo il corso, tre frasi su quello che hai imparato a lezione o nell'unità di adesso. Bastano 5 minuti: scrivere con le tue parole collega il corso al quaderno. Claude corregge solo gli errori veri e li manda nel quaderno degli errori.</p></header>
   <section class="card"><div class="card-h"><div><span class="lab">${kFmt(k,{weekday:'long',day:'numeric',month:'long'})}${lc?' · dopo il corso di '+kFmt(lc,{weekday:'long'}):''}</span><h3>Tre frasi di oggi</h3></div>${S.diario[k]?'<span class="pen" style="color:var(--verde)">fatto ✓</span>':''}</div>
    <label class="note" for="dtema">Al corso abbiamo studiato… (anche in portoghese)</label>
    <input id="dtema" class="dinp" type="text" value="${esc(ent.tema||'')}" placeholder="per esempio: i verbi riflessivi, la famiglia, c'è e ci sono">
    <p class="note">Idee per l'unità di adesso (${esc(uName(cur))}): <i>${esc(cur.focus.split(';')[0])}</i>.</p>
    <ol class="dfrasi">${[0,1,2].map(i=>`<li><textarea class="labin" rows="2" data-f="${i}" spellcheck="false" autocapitalize="sentences" placeholder="Frase ${i+1}">${esc(ent.f[i]||'')}</textarea><div class="dcorr" data-c="${i}"></div></li>`).join('')}</ol>
    <div class="btnrow"><button class="btn primary" id="dgo">Correggi e salva</button><span class="note" id="dmsg"></span></div></section>
   <section class="card"><div class="card-h"><div><span class="lab">Vuoi scrivere di più?</span><h3>Le mie frasi</h3></div></div>
    <p>Il diario chiede tre frasi al giorno. Se ne vuoi scrivere altre, quando vuoi e quante vuoi, aggiungile in <b>Le mie frasi</b>: lì trovi anche tutte le frasi del diario, già corrette, per ripassarle.</p>
    <div class="btnrow"><a class="btn primary" href="#fuori" data-fm="frasi">Le mie frasi (${diaryPhrases().length}) →</a></div></section>`;
  $('#main').querySelectorAll('a[data-fm]').forEach(x=>x.addEventListener('click',()=>{ fuoriMode=x.dataset.fm; }));
  if(S.diario[k]&&S.diario[k].c) showDiaryCorr(S.diario[k]);
  $('#dgo').onclick=async()=>{
    const f=[...document.querySelectorAll('[data-f]')].map(t=>t.value.trim()), tema=$('#dtema').value.trim(), msg=$('#dmsg');
    if(f.filter(Boolean).length<3){ msg.textContent='Scrivi tutte e tre le frasi.'; return; }
    const entry={f,tema,d:Date.now()}; S.diario[k]=entry; save(); renderNav(route());
    $('#dgo').disabled=true; msg.textContent='Claude sta correggendo…';
    try{
      const c=await correggiFrasi(f,tema,cur.lvl);
      if(!c){ msg.textContent='Salvato. La correzione automatica funziona con la pagina aperta dentro Claude.'; $('#dgo').disabled=false; return; }
      entry.c=c; S.diario[k]=entry;
      c.forEach((x,i)=>{ if(!x.ok) addErr('diario-'+hashStr(f[i]),'lab',{q:f[i],s:'Correggi la frase del tuo diario',a:[x.corr],n:x.nota},'Diario · '+kFmt(k,{day:'numeric',month:'short'})); });
      save(); tick(); showDiaryCorr(entry);
      const nErr=c.filter(x=>!x.ok).length;
      msg.textContent=nErr?`${nErr} ${nErr===1?'frase da sistemare: è':'frasi da sistemare: sono'} nel quaderno degli errori.`:'Perfetto: tre frasi corrette!';
    }catch(e){ msg.textContent='Salvato. '+errMsg(e); }
    $('#dgo').disabled=false;
  };
}
async function correggiFrasi(f,tema,lvl){
  const sample=await getSample(); if(!sample) return null;
  const prompt=`Sei un'insegnante d'italiano attenta e gentile. La studentessa è brasiliana (parla portoghese e spagnolo) e studia italiano al livello ${lvl}. Ha scritto ${f.length} frasi${tema?`; argomento: «${tema}»`:''}.
Per ogni frase: se è corretta e naturale, "ok": true e "corretta" uguale all'originale. Se c'è un errore VERO (grammatica, ortografia, accento, parola sbagliata o inventata, calco dal portoghese o dallo spagnolo), "ok": false, "corretta" = la frase corretta cambiando il meno possibile, "nota" = spiegazione breve in ${lname({band:0})} (massimo 20 parole). Non segnalare come errore scelte corrette di stile o di registro.
${f.map((x,i)=>`${i+1}. ${x}`).join('\n')}
Rispondi solo con un array JSON di ${f.length} oggetti, nello stesso ordine: [{"ok":true,"corretta":"…","nota":""}]`;
  const data=await sample.json(prompt,{cache:false,modelTier:'quick'});
  const c=(Array.isArray(data)?data:[]).slice(0,f.length).map((x,i)=>({ok:!!(x&&x.ok)||canon(String(x&&x.corretta||''))===canon(f[i]),corr:String((x&&x.corretta)||f[i]),nota:String((x&&x.nota)||'')}));
  if(c.length!==f.length) throw {code:'invalid_json'};
  return c;
}
function showDiaryCorr(entry){
  (entry.c||[]).forEach((x,i)=>{ const box=document.querySelector(`[data-c="${i}"]`); if(!box) return;
    box.innerHTML=x.ok?'<span class="mark ok">giusta ✓</span>':`<span class="mark no">da sistemare</span> <span class="corrected">${esc(x.corr)}</span>${x.nota?`<p class="expl">${esc(x.nota)}</p>`:''}`; });
}

/* ---------- lingua delle spiegazioni di A1 e A2 (español / português) ---------- */
const LANG_UNDO=[];
function applyExpLang(){
  while(LANG_UNDO.length){ const [o,k,v]=LANG_UNDO.pop(); o[k]=v; }
  if((S.expLang||'es')!=='es'||typeof ES_AA==='undefined') return;
  const set=(o,k,v)=>{ if(o==null||v==null) return; LANG_UNDO.push([o,k,o[k]]); o[k]=v; };
  const low=new Set(UNITS.filter(u=>u.band<=1).map(u=>u.id));
  Object.entries(ES_AA).forEach(([key,val])=>{
    const parts=key.split('.'), u=UNITS.find(x=>String(x.id)===parts[0]); if(!u) return;
    if(parts[1]==='gloss'){ if(!u.reading) return; let t=u.reading.text; val.split(' ;; ').forEach(g=>{ const [it,es]=g.split('|'); t=t.split('[['+it+'|').map((seg,i)=>i===0?seg:es+seg.slice(seg.indexOf(']]'))).join('[['+it+'|'); }); set(u.reading,'text',t); return; }
    let o=u; for(let i=1;i<parts.length-1;i++){ o=o[/^\d+$/.test(parts[i])?+parts[i]:parts[i]]; if(o==null) return; }
    const last=parts[parts.length-1]; set(o,/^\d+$/.test(last)?+last:last,val);
  });
  if(ES_SCHEDE) Object.keys(ES_SCHEDE).forEach(id=>{ if(SCHEDE[id]) set(SCHEDE,id,ES_SCHEDE[id]); });
  if(ES_STORIA_GL) STORIA.forEach(c=>{ if(!low.has(c.u)) return; let t=c.text; Object.entries(ES_STORIA_GL).forEach(([it,es])=>{ t=t.split('[['+it+'|').map((seg,i)=>i===0?seg:es+seg.slice(seg.indexOf(']]'))).join('[['+it+'|'); }); set(c,'text',t); });
  if(ES_TRAD) Object.entries(ES_TRAD).forEach(([i,[q,n]])=>{ const t=TRAD[+i]; if(t){ set(t,0,q); set(t,3,n); } });
}
function langSwitch(){ const l=S.expLang||'es'; return `<div class="langsw" role="group" aria-label="Lingua delle spiegazioni"><span class="note">Explicaciones en</span><button type="button" data-xl="es" aria-pressed="${l==='es'}">español</button><button type="button" data-xl="pt" aria-pressed="${l==='pt'}">português</button></div>`; }
function bindLangSwitch(root,rerender){ (root||document).querySelectorAll('[data-xl]').forEach(b=>b.onclick=()=>{ S.expLang=b.dataset.xl; if(S.aiLang==='pt'||S.aiLang==='es') delete S.aiLang; save(); applyExpLang(); rerender(); }); }
if(!S.langMigES){ S.langMigES=1; if(S.aiLang==='pt') delete S.aiLang; save(); }
try{ applyExpLang(); }catch(e){ console.warn('lingua',e); }
if(!S.storyMig110){ if(STORIA_SHIFT>=0){ const o=S.story||{}, n={}; Object.keys(o).forEach(k=>{ n[+k>=STORIA_SHIFT?+k+1:k]=o[k]; }); S.story=n; } S.storyMig110=1; save(); }
if(!S.planMig2){ S.planCfg=Object.assign({},S.planCfg||{},{sunFree:false,work:PLAN_DEF.work}); S.planMig2=1; if(S.plan&&S.plan.a) buildPlan(dayKey()); }
if(!S.plan||!S.plan.a) buildPlan(dayKey());
render();
initSync();
})();
