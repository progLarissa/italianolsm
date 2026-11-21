/* ───────── PRIMI PASSI · UNITÀ SULLE PREPOSIZIONI ───────── */
(function(){
const unit={
id:109, n:'P8', lvl:'A1 → A2', band:0,
title:'Di, a, in, da: le preposizioni senza paura',
sub:'Quando si usa di, a, in o da? · Pense na função, não na tradução',
focus:'preposizioni semplici e loro funzioni: di (possesso, origine con essere, materiale, contenuto, argomento), a (città, casa/scuola/letto, ore, persone, a + infinito, a piedi), in (Paesi, regioni, negozi in -ia/-eria, ufficio, banca, mezzi di trasporto, mesi e anni), da (provenienza con venire, casa o studio di qualcuno, da quanto tempo, scopo: occhiali da sole), contrasto con portoghese e spagnolo',
lesson:`
<p class="lead">O segredo é parar de traduzir. Em português o "em" e o "de" fazem quase tudo. Em italiano cada preposição tem a sua <b>função</b>. Aprenda as funções e você acerta sem pensar.</p>
<div class="prepmap">
 <div class="pm pm-di"><b>DI</b><span>de quem? de onde (com essere)? de quê?</span><ul><li>il libro <b>di</b> Marco</li><li>sono <b>di</b> Recife</li><li>una maglia <b>di</b> lana</li><li>un bicchiere <b>di</b> vino</li><li>parliamo <b>di</b> calcio</li><li><b>di</b> sera, <b>d'</b>estate</li></ul></div>
 <div class="pm pm-a"><b>A</b><span>cidades, casa, horas, pessoas</span><ul><li>abito <b>a</b> Lisbona</li><li>sono <b>a</b> casa · vado <b>a</b> scuola · vado <b>a</b> letto</li><li><b>alle</b> otto · <b>a</b> maggio · <b>a</b> Natale</li><li>scrivo <b>a</b> Marta</li><li>vado <b>a</b> mangiare</li><li><b>a</b> piedi · fatto <b>a</b> mano</li></ul></div>
 <div class="pm pm-in"><b>IN</b><span>países, regiões, lojas, escritório, transporte</span><ul><li><b>in</b> Italia · <b>in</b> Toscana · <b>in</b> Sicilia</li><li><b>in</b> banca · <b>in</b> ufficio · <b>in</b> farmacia · <b>in</b> pizzeria</li><li><b>in</b> centro · <b>in</b> montagna · <b>in</b> campagna</li><li><b>in</b> treno · <b>in</b> macchina · <b>in</b> aereo</li><li><b>in</b> cucina · <b>in</b> bagno</li><li><b>in</b> estate · <b>nel</b> 2020</li></ul></div>
 <div class="pm pm-da"><b>DA</b><span>de onde venho, casa de alguém, desde, para quê</span><ul><li>vengo <b>da</b> Rio · parto <b>da</b> Milano</li><li>vado <b>da</b> Marco · <b>dal</b> medico</li><li>studio <b>da</b> un mese · <b>da</b> lunedì</li><li>occhiali <b>da</b> sole</li><li>qualcosa <b>da</b> bere</li></ul></div>
</div>
<h3>Dove vai? Dove sei? · O guia rápido</h3>
<div class="tw"><table class="tbl">
<tr><th>se é…</th><th>use</th><th>exemplos</th></tr>
<tr><td>uma <b>cidade</b> (ou ilha pequena)</td><td><b>a</b></td><td>a Roma, a Napoli, a Capri</td></tr>
<tr><td>um <b>país</b>, região, continente, ilha grande</td><td><b>in</b></td><td>in Brasile, in Spagna, in Toscana, in Europa, in Sardegna</td></tr>
<tr><td>uma <b>pessoa</b> (a casa dela, o consultório)</td><td><b>da</b></td><td>da Marco, da mia nonna, dal dentista, dal parrucchiere</td></tr>
<tr><td>um <b>lugar genérico</b>, sobretudo terminado em -ia, -eria</td><td><b>in</b></td><td>in banca, in ufficio, in biblioteca, in farmacia, in libreria, in pizzeria, in palestra</td></tr>
<tr><td><b>casa, scuola, teatro, letto, lezione</b></td><td><b>a</b></td><td>a casa, a scuola, a teatro, a letto, a lezione</td></tr>
<tr><td>um lugar <b>com artigo</b></td><td><b>a</b> + artigo</td><td>al bar, al cinema, al mare, al parco, al supermercato, all'università</td></tr>
</table></div>
<p>Muitos destes você precisa memorizar como blocos: <i>al cinema</i> mas <i>a teatro</i>; <i>in banca</i> mas <i>al supermercato</i>. Não tente achar lógica em tudo: repita até soar natural.</p>
<h3>Di ou da?</h3>
<div class="tw"><table class="tbl">
<tr><th>di = conteúdo, material, posse</th><th>da = finalidade, para que serve</th></tr>
<tr><td>un bicchiere <b>di</b> vino (um copo cheio de vinho)</td><td>un bicchiere <b>da</b> vino (uma taça para vinho)</td></tr>
<tr><td>una tazza <b>di</b> caffè (uma xícara de café)</td><td>una tazza <b>da</b> caffè (uma xícara de café, vazia)</td></tr>
<tr><td>un anello <b>d'</b>oro (de ouro)</td><td>scarpe <b>da</b> ginnastica (tênis, para ginástica)</td></tr>
<tr><td>la casa <b>di</b> Paolo (de Paolo)</td><td>vado <b>da</b> Paolo (à casa de Paolo)</td></tr>
<tr><td>sono <b>di</b> Roma (sou de Roma)</td><td>vengo <b>da</b> Roma (venho de Roma)</td></tr>
</table></div>
<h3>Tempo</h3>
<div class="tw"><table class="tbl">
<tr><td><b>alle</b> otto · <b>a</b> mezzogiorno</td><td>às oito, ao meio-dia</td></tr>
<tr><td><b>a</b> / <b>in</b> maggio · <b>in</b> estate · <b>nel</b> 2020</td><td>em maio, no verão, em 2020</td></tr>
<tr><td><b>il</b> sabato · sabato (sem preposição!)</td><td>aos sábados · no sábado</td></tr>
<tr><td><b>di</b> mattina · <b>la</b> mattina</td><td>de manhã</td></tr>
<tr><td><b>da</b> un mese · <b>da</b> lunedì</td><td>há um mês (e continua) · desde segunda</td></tr>
<tr><td>un mese <b>fa</b></td><td>há um mês (passado, acabou)</td></tr>
<tr><td><b>tra</b> / <b>fra</b> un'ora</td><td>daqui a uma hora</td></tr>
<tr><td><b>in</b> dieci minuti</td><td>em dez minutos (tempo que leva)</td></tr>
</table></div>
<h3>Os outros, rapidinho</h3>
<div class="chips"><b>su</b> = sobre, em cima (il libro è su un tavolo; un film su Dante) · <b>con</b> = com · <b>per</b> = para, por, durante (un regalo per te; passo per il centro; per tre ore) · <b>tra / fra</b> = entre, daqui a (tra Roma e Napoli; tra due giorni)</div>
<div class="trap"><span class="pen">As 10 armadilhas de quem fala português</span>
<ul class="dots">
<li>Moro <b>em</b> Lisboa → Abito <b>a</b> Lisbona</li>
<li>Vou <b>ao</b> médico → Vado <b>dal</b> medico</li>
<li>Estou <b>em</b> casa → Sono <b>a</b> casa</li>
<li>Vou <b>de</b> trem / <b>de</b> carro → Vado <b>in</b> treno / <b>in</b> macchina (mas <b>a</b> piedi)</li>
<li>Estudo <b>há</b> um mês → Studio <b>da</b> un mese</li>
<li>Cheguei <b>há</b> um mês → Sono arrivata un mese <b>fa</b></li>
<li>Daqui a uma hora → <b>Tra</b> un'ora</li>
<li><b>No</b> sábado → Sabato (sem nada)</li>
<li>Penso <b>em</b> você → Penso <b>a</b> te</li>
<li>Gosto <b>de</b> café → Mi piace il caffè (sem preposição)</li>
</ul></div>
<div class="plus"><span class="pen">Per chi parla spagnolo</span> O espanhol ajuda com <b>a</b> + infinitivo (<i>voy a comer → vado a mangiare</i>) e com <b>a</b> + pessoa (<i>escribo a Marta</i>). Mas cuidado: <i>vivo en Madrid</i> → <i>abito <b>a</b> Madrid</i>, e <i>voy al médico</i> → <i>vado <b>dal</b> medico</i>.</div>
`,
reading:{
title:'Una settimana di Bea',
text:`<p>Mi chiamo Bea e sono di Salvador, in Brasile. Da un anno abito a Milano, in un piccolo appartamento in centro. Lavoro in una libreria vicino al Duomo: ci vado a piedi, in quindici minuti.</p>
<p>Il lunedì e il mercoledì, dopo il lavoro, vado a lezione di italiano. La scuola è in via Torino, al terzo piano. Il martedì vado in palestra con una collega, e il giovedì vado da mia cugina, che abita a Monza: prendo il treno alle sei e mezza e arrivo da lei in venti minuti.</p>
<p>Il venerdì sera esco con gli amici: andiamo al cinema o a mangiare una pizza in pizzeria. Il sabato faccio la spesa al mercato e la domenica, se c'è il sole, andiamo al lago in macchina.</p>
<p>A dicembre torno a casa, a Salvador, per tre settimane. Tra un mese, quindi, sarò in spiaggia con la mia famiglia! Ho già comprato un regalo per tutti: delle tazze [[da caffè|xícaras de café (para café)]] [[di ceramica|de cerâmica]] fatte a mano.</p>`,
q:[
["Da quanto tempo Bea abita a Milano?",["Da un mese","Da un anno","Da tre settimane","Da sempre"],1],
["Come va al lavoro?",["In treno","A piedi","In macchina","In bicicletta"],1],
["Dove abita la cugina?",["A Salvador","A Monza","In via Torino","Al lago"],1],
["Dove vanno il venerdì sera?",["Al cinema o in pizzeria","In palestra","Al mercato","Al lago"],0],
["Che regalo ha comprato?",["Dei libri","Delle tazze da caffè di ceramica","Una pizza","Dei biglietti del treno"],1]
]},
ex:[
{t:'fill', title:'Dove? Di, a, in o da? · Lugares', items:[
["Abito ___ Napoli.",["a"],"Cidade → a."],
["Mia sorella vive ___ Germania.",["in"],"País → in."],
["Stasera vado ___ Marco.",["da"],"Pessoa → da."],
["Lavoro ___ banca.",["in"],"Lugar genérico → in."],
["Sono ___ casa, vieni pure!",["a"]],
["Domani vado ___ medico. (da + il)",["dal"]],
["Andiamo ___ cinema? (a + il)",["al"]],
["Lucca è ___ Toscana.",["in"]],
["Compro le medicine ___ farmacia.",["in"]],
["I bambini vanno ___ scuola alle otto.",["a"]],
["Vengo ___ Brasile, ma sono ___ Recife.",[["dal"],["di"]],"venire da (+ artigo com país) · essere di + cidade."],
["L'estate prossima andiamo ___ Sicilia.",["in"],"Ilha grande → in."],
["Ci vediamo ___ bar sotto casa. (a + il)",["al"]],
["Questo è il telefono ___ Giulia.",["di"],"Posse → di."]
]},
{t:'mc', title:'Tempo e modo · Quando e como?', items:[
["Il film comincia ___ nove.",["alle","in","dalle"],0],
["Studio italiano ___ tre settimane.",["fa","da","per"],1,"Ação que continua até hoje → da."],
["Sono arrivata a Milano tre mesi ___ .",["fa","da","tra"],0,"Passado concluído → fa."],
["Ci vediamo ___ due giorni. (= daqui a)",["tra","da","in"],0],
["Vado al lavoro ___ treno.",["con","in","di"],1],
["Vado al lavoro ___ piedi.",["in","a","con"],1],
["«No sábado vou à praia» = ___ vado al mare.",["Al sabato","Sabato","In sabato"],1,"Dias da semana sem preposição."],
["Ci sono andata ___ 2019.",["nel","in il","a"],0]
]},
{t:'fill', title:'Di o da? · Conteúdo ou finalidade', items:[
["Un bicchiere ___ vino, per favore! (cheio de vinho)",["di"]],
["Mi serve un bicchiere ___ vino. (taça para vinho)",["da"]],
["Ho comprato un paio di occhiali ___ sole.",["da"]],
["È una maglia ___ lana.",["di"]],
["Hai qualcosa ___ bere?",["da"]],
["Parliamo ___ politica.",["di"]],
["Ho bisogno di scarpe ___ ginnastica.",["da"]],
["Il libro ___ Paolo è sul tavolo.",["di"]],
["Vado ___ Paolo stasera.",["da"]],
["Un chilo ___ mele, grazie.",["di"]]
]},
{t:'fix', title:'Correggi le trappole · Corrija', items:[
["Abito {in} Lisbona.",["a"],"Abito a Lisbona."],
["Vado {al} dentista domani.",["dal"],"Vado dal dentista domani."],
["Sono {in} casa tutto il giorno.",["a"],"Sono a casa tutto il giorno."],
["Vado a Roma {de} treno.",["in"],"Vado a Roma in treno."],
["Studio italiano {fa} un mese.",["da"],"Studio italiano da un mese."],
["Ci vediamo {dentro di} un'ora.",["tra","fra"],"Ci vediamo tra un'ora."],
["Penso {in} te.",["a"],"Penso a te."],
["{Nel} sabato vado in palestra.",["il"],"Il sabato vado in palestra."]
]},
{t:'order', title:'Ricostruisci la frase · Monte a frase', items:[
["Abito a Milano da un anno.",["Da un anno abito a Milano."]],
["Stasera vado da mia nonna.",["Vado da mia nonna stasera."]],
["Lavoro in banca vicino al centro.",[]],
["Andiamo al mare in macchina.",["Andiamo in macchina al mare."]],
["Tra un mese torno in Brasile.",["Torno in Brasile tra un mese."]]
]}
],
write:{
task:'Racconta la tua settimana: dove vai, da chi, con chi, come (in treno, a piedi…), a che ora e da quanto tempo fai certe cose. (Conte a sua semana usando bem as preposições.)',
words:[60,110],
targets:[
{l:'3 usos de a (a Roma, a casa, alle otto…)', re:'<(a|ad|al|allo|alla|ai|agli|alle)>|<all\'', n:3},
{l:'3 usos de in (in Italia, in treno, in ufficio…)', re:'<(in|nel|nello|nella|nei|negli|nelle)>|<nell\'', n:3},
{l:'2 usos de da (da Marco, dal medico, da un anno…)', re:'<(da|dal|dallo|dalla|dai|dagli|dalle)>|<dall\'', n:2},
{l:'2 usos de di (di Rio, di lana, di sera…)', re:'<(di|del|dello|della|dei|degli|delle)>|<dell\'|<d\'', n:2}
],
model:`Sono di Belo Horizonte, ma da due anni abito a Lisbona. Lavoro da casa tre giorni alla settimana e due giorni in ufficio, in centro. Vado in ufficio in metro o, se fa bel tempo, a piedi. Il martedì sera vado a lezione di italiano alle sette. Il giovedì vado da una mia amica brasiliana e cuciniamo insieme. Il sabato mattina vado al mercato e compro un chilo di frutta e un po' di formaggio. La domenica, di solito, sto a casa e leggo un libro. Tra due mesi vado in Italia per la prima volta: non vedo l'ora!`
}
};
const at=UNITS.findIndex(u=>u.id===107);
UNITS.splice(at+1,0,unit);
const last=UNITS.find(u=>u.id===108); if(last) last.n='P9';
})();
TRAD.push(
["Moro em Lisboa há dois anos.",["Abito a Lisbona da due anni.","Vivo a Lisbona da due anni.","Da due anni abito a Lisbona."],0,"Cidade → a; ação que continua → da."],
["Amanhã vou ao dentista.",["Domani vado dal dentista.","Vado dal dentista domani."],0,"Profissional → da + artigo."],
["Estou em casa.",["Sono a casa."],0,"a casa, sem artigo."],
["Vou para a Itália de trem.",["Vado in Italia in treno."],0,"País → in; transporte → in."],
["Um copo de vinho, por favor.",["Un bicchiere di vino, per favore."],0,"Conteúdo → di."],
["Nos vemos daqui a uma hora.",["Ci vediamo tra un'ora.","Ci vediamo fra un'ora."],0,"Daqui a → tra/fra."]
);
USPEAK[109]={p:['Dove abiti e da quanto tempo?','Come vai al lavoro o a scuola?','Da chi vai quando hai bisogno di aiuto?','Dove vai il fine settimana?','Che cosa hai fatto un anno fa e che cosa farai tra un anno?'],v:['preposizioni semplici di a da in','preposizioni italiano a o in con le città']};
