var STORIA_SHIFT=-1;
/* ───────── PRIMI PASSI · UNITÀ SU C'È E CI SONO ───────── */
(function(){
const unit={
id:110, n:'P7', lvl:'A1 → A2', band:0,
title:'C\'è o ci sono? Dire che cosa c\'è (e che cosa non c\'è)',
sub:'Há, tem, existe · c\'è, ci sono, è, ecco',
focus:'c\'è + singolare, ci sono + plurale; forma negativa e interrogativa; c\'è / ci sono o è / sono (esistenza o posizione); c\'è o ho (esistenza o possesso); ecco; usi quotidiani: c\'è il sole, c\'è Marco?, che c\'è?, non c\'è problema, non c\'è campo',
lesson:`
<p class="lead">Em português dizemos <b>tem</b> ou <b>há</b>, e em espanhol <b>hay</b>: uma forma só, para tudo. Em italiano é o verbo <b>essere</b> com a partícula <b>ci</b> («aí, lá»). E como é <i>essere</i>, ele <b>concorda</b>: singular ou plural.</p>
<div class="tw"><table class="tbl">
<tr><th></th><th>singular</th><th>plural</th></tr>
<tr><th>afirmativa</th><td><b>C'è</b> un bar qui vicino.</td><td><b>Ci sono</b> due farmacie.</td></tr>
<tr><th>negativa</th><td><b>Non c'è</b> latte.</td><td><b>Non ci sono</b> autobus la sera.</td></tr>
<tr><th>pergunta</th><td><b>C'è</b> un bagno?</td><td><b>Ci sono</b> posti liberi?</td></tr>
<tr><th>resposta curta</th><td>Sì, c'è. · No, non c'è.</td><td>Sì, ci sono. · No, non ci sono.</td></tr>
</table></div>
<p><b>C'è</b> = <i>ci + è</i>: o <i>i</i> cai e entra o apóstrofo. Por isso nunca se escreve <s>ci è</s> nem <s>ce</s>. No plural não se junta nada: <b>ci sono</b>, separado. A pergunta é igual à afirmação, muda só a entonação (como em português).</p>

<h3>O que vem depois</h3>
<div class="tw"><table class="tbl">
<tr><th>c'è +</th><td>um nome no singular, quase sempre com <b>un, uno, una, un'</b>, ou sem artigo para coisas que não se contam</td><td><i>C'è <b>una</b> farmacia. C'è <b>un</b> problema. C'è <b>tempo</b>. Non c'è <b>pane</b>.</i></td></tr>
<tr><th>ci sono +</th><td>um nome no plural, com número, <b>molti/tanti</b>, <b>alcuni</b>, <b>dei/delle</b> ou sem artigo</td><td><i>Ci sono <b>tre</b> camere. Ci sono <b>molti</b> turisti. Ci sono <b>delle</b> sedie. Non ci sono <b>taxi</b>.</i></td></tr>
</table></div>
<p>Atenção ao verbo, não ao português: <i>tem muita gente</i> → <b>c'è</b> molta gente (<i>gente</i> é singular!) · <i>tem muitos turistas</i> → <b>ci sono</b> molti turisti.</p>
<p>Numa lista, use o plural: <i>In camera <b>ci sono</b> un letto, un armadio e due sedie.</i> (Na fala você vai ouvir também <i>c'è un letto, un armadio…</i>, concordando com a primeira palavra.)</p>

<h3>C'è ou è? Existe ou onde está?</h3>
<p>É o erro mais comum. <b>C'è / ci sono</b> diz que uma coisa <b>existe</b> num lugar (informação nova, em geral com <i>un/una</i>). <b>È / sono</b> diz <b>onde está</b> uma coisa que já conhecemos (com <i>il/la</i>, nomes próprios).</p>
<div class="tw"><table class="tbl">
<tr><th>existe? → c'è / ci sono</th><th>onde está? → è / sono, dov'è / dove sono</th></tr>
<tr><td><i>C'è <b>un</b> museo in questa città?</i><br>Tem um museu nesta cidade?</td><td><i><b>Il</b> museo <b>è</b> in piazza.</i> · <i><b>Dov'è</b> il museo?</i><br>O museu fica na praça. Onde fica o museu?</td></tr>
<tr><td><i>Qui vicino <b>ci sono</b> due banche.</i></td><td><i><b>Le</b> banche <b>sono</b> in via Roma.</i> · <i><b>Dove sono</b> le banche?</i></td></tr>
<tr><td><i>C'è una ragazza alla porta.</i></td><td><i>Giulia <b>è</b> alla porta.</i></td></tr>
</table></div>
<p>Truque: se em português você pode dizer <b>«tem um…»</b> ou <b>«há um…»</b>, é <b>c'è</b>. Se você diz <b>«o/a … fica…»</b> ou <b>«está…»</b>, é <b>è</b>.</p>

<h3>C'è ou ho? Existe ou é meu?</h3>
<p>O nosso <b>«tem»</b> serve para duas coisas. Em italiano são dois verbos:</p>
<div class="tw"><table class="tbl">
<tr><th>existência (há, tem num lugar)</th><th>posse (eu tenho, você tem)</th></tr>
<tr><td><i>In frigo <b>c'è</b> il latte?</i> · Tem leite na geladeira?</td><td><i><b>Hai</b> del latte?</i> · Você tem leite?</td></tr>
<tr><td><i>A Roma <b>ci sono</b> molte chiese.</i></td><td><i>Roma <b>ha</b> molte chiese.</i> (as duas estão certas!)</td></tr>
<tr><td><i>Non <b>c'è</b> tempo!</i> · Não há tempo!</td><td><i>Non <b>ho</b> tempo.</i> · Eu não tenho tempo.</td></tr>
</table></div>

<h3>E «ecco»?</h3>
<p><b>Ecco</b> = <i>eis, olha aqui, aqui está</i>: serve para <b>mostrar</b> algo que você está vendo ou entregando. Não muda: <i><b>Ecco</b> il bar! · <b>Ecco</b> le chiavi. · <b>Ecco</b> a Lei il resto.</i> Compare: <i>C'è un bar?</i> (existe?) → <i>Sì, ecco il bar, lì a destra!</i> (olha ele ali).</p>

<h3>Expressões de todo dia com c'è</h3>
<div class="tw"><table class="tbl">
<tr><td><i>C'è il sole · c'è vento · c'è nebbia</i></td><td>faz sol, está ventando, tem neblina</td></tr>
<tr><td><i>Pronto, <b>c'è</b> Marco? — No, non c'è.</i></td><td>Alô, o Marco está? — Não, não está. (ao telefone, na porta)</td></tr>
<tr><td><i>Che c'è? · Che cosa c'è?</i></td><td>O que foi? O que houve?</td></tr>
<tr><td><i>Non c'è problema · Non c'è di che</i></td><td>Sem problema · Não há de quê</td></tr>
<tr><td><i>C'è tempo · Non c'è tempo</i></td><td>Há tempo · Não dá tempo</td></tr>
<tr><td><i>Non c'è campo</i></td><td>O celular está sem sinal</td></tr>
<tr><td><i>Non c'è nessuno · Non c'è niente</i></td><td>Não tem ninguém · Não tem nada (dupla negação, como em português!)</td></tr>
<tr><td><i>C'è da fare · C'è da aspettare</i></td><td>Tem coisa para fazer · Tem que esperar</td></tr>
</table></div>
<p class="note">Mais adiante você vai encontrar o passado: <i>c'era / c'erano</i> (havia) e <i>c'è stato / ci sono stati</i> (houve). O mecanismo é o mesmo: <i>ci</i> + essere.</p>

<div class="trap"><span class="pen">As armadilhas de quem fala português e espanhol</span>
<ul class="dots">
<li>Tem um bar aqui perto? / ¿Hay un bar? → <b>C'è</b> un bar qui vicino? (nunca <s>ha un bar</s>, <s>tiene un bar</s>)</li>
<li>Tem muitos turistas → <b>Ci sono</b> molti turisti (nunca <s>c'è molti turisti</s>)</li>
<li>Tem muita gente → <b>C'è</b> molta gente (<i>gente</i> é singular)</li>
<li><s>Ci è</s> / <s>ce</s> → <b>c'è</b>, com apóstrofo e acento</li>
<li>Onde fica o Coliseu? → <b>Dov'è</b> il Colosseo? (nunca <s>Dove c'è il Colosseo?</s>)</li>
<li>Tem o museu aqui? → <b>C'è un</b> museo qui? (existência pede <i>un</i>, não <i>il</i>)</li>
<li>Eu tenho dois irmãos → <b>Ho</b> due fratelli (posse → avere)</li>
<li>Faz dois anos que… → isso não é c'è: <i>Studio da due anni</i> · <i>due anni <b>fa</b></i></li>
</ul></div>
<div class="plus"><span class="pen">Per chi parla spagnolo</span> Pense em <b>hay = c'è / ci sono</b>, mas lembre que o italiano concorda: <i>hay un libro → c'è un libro</i>, <i>hay dos libros → ci sono due libri</i>. E <i>¿dónde está el baño?</i> continua sendo <b>dov'è</b> il bagno?</div>
`,
reading:{
title:'La mia nuova casa a Bologna',
text:`<p>Cara Ana, finalmente ho una casa! È un appartamento piccolo al terzo piano, in una via vicino al centro di Bologna. Non c'è l'ascensore, ma ci sono tante finestre e la luce è bellissima.</p>
<p>Nell'appartamento ci sono due stanze, una cucina e un bagno. In camera ci sono un letto, un armadio e una scrivania per lavorare. In cucina c'è tutto: c'è il frigo, c'è il forno e c'è anche una macchina per il caffè. Non c'è la lavatrice, però: il sabato vado alla [[lavanderia|lavanderia]] qui sotto.</p>
<p>Il quartiere è vivace. Sotto casa c'è un forno e all'angolo c'è un bar con un cornetto buonissimo. Non ci sono supermercati grandi, ma ci sono tre piccoli negozi di alimentari e un mercato il martedì. Il parco è a cinque minuti a piedi.</p>
<p>E poi ci sono i [[portici|pórticos, galerias cobertas]]! A Bologna ci sono quasi quaranta chilometri di portici: quando piove, non c'è bisogno dell'ombrello.</p>
<p>Quando vieni? C'è sempre un posto per te sul divano! Un abbraccio, Luísa</p>`,
q:[
["Che cosa non c'è nel palazzo di Luísa?",["Le finestre","L'ascensore","Il terzo piano","La luce"],1],
["Quante stanze ci sono nell'appartamento?",["Una","Due","Tre","Quattro"],1],
["Che cosa non c'è in cucina?",["Il frigo","Il forno","La lavatrice","La macchina per il caffè"],2],
["Che cosa c'è all'angolo?",["Un forno","Un bar","Un supermercato","Il parco"],1],
["Perché a Bologna non c'è bisogno dell'ombrello?",["Non piove mai","Ci sono molti portici","Ci sono molti negozi","Il parco è vicino"],1]
]},
ex:[
{t:'fill', title:'C\'è o ci sono? · Singular ou plural', items:[
["In questa via ___ un ristorante giapponese.",["c'è"]],
["Nel mio palazzo ___ otto appartamenti.",["ci sono"]],
["___ un problema con la prenotazione.",["c'è"]],
["In piazza ___ molti turisti oggi.",["ci sono"]],
["Al mercato ___ molta gente.",["c'è"],"«gente» è singolare."],
["Nel frigo ___ due bottiglie d'acqua.",["ci sono"]],
["Scusi, ___ un bagno qui?",["c'è"]],
["In classe ___ dodici studenti.",["ci sono"]],
["Oggi ___ il sole!",["c'è"]],
["Sul tavolo ___ un libro e due quaderni.",["ci sono"],"Lista → plurale."],
["In Italia ___ venti regioni.",["ci sono"]],
["Vicino alla stazione ___ un albergo economico.",["c'è"]]
]},
{t:'fill', title:'Non c\'è, non ci sono · Negativa e domande', items:[
["Mi dispiace, ___ più pane. (não tem mais)",["non c'è"]],
["La domenica ___ autobus per l'aeroporto.",["non ci sono"]],
["— Pronto, c'è Paolo? — No, ___ . (não está)",["non c'è"]],
["Ho cercato, ma ___ posti liberi sul treno.",["non ci sono"]],
["Andiamo, ___ tempo! (não dá tempo)",["non c'è"]],
["— Grazie mille! — ___ di che!",["non c'è"]],
["Ho il telefono, ma qui ___ campo.",["non c'è"]],
["— ___ una farmacia aperta? — Sì, in via Dante.",["c'è"]],
["— ___ taxi alla stazione? — Sì, ci sono sempre.",["ci sono"]],
["In casa ___ nessuno: sono tutti al mare.",["non c'è"]]
]},
{t:'mc', title:'C\'è, è o ecco? · Existe, onde está ou olha aqui', items:[
["Scusi, ___ il Duomo?",["c'è","dov'è","ci sono"],1,"Coisa conhecida (il Duomo) → dov'è."],
["___ un supermercato qui vicino?",["C'è","Dov'è","È"],0,"Existe? → c'è + un."],
["Il museo ___ in piazza Maggiore.",["c'è","è","ci sono"],1,"Onde fica uma coisa conhecida → è."],
["In piazza Maggiore ___ un museo.",["c'è","è","sono"],0],
["Le chiavi? ___ le chiavi, sul tavolo!",["Ci sono","Ecco","C'è"],1,"Mostrar → ecco."],
["Io ___ due fratelli.",["ci sono","ho","c'è"],1,"Posse → avere."],
["— Che ___ ? Sei triste? — Niente, sono solo stanca.",["c'è","è","ecco"],0,"Che c'è? = O que foi?"],
["Dove ___ i bagni, per favore?",["c'è","sono","ci sono"],1],
["___ molto traffico stamattina.",["Ci sono","C'è","È"],1,"traffico è singolare."],
["Roma ___ molte fontane. (Roma tem…)",["c'è","ha","ci sono"],1,"Anche giusto: A Roma ci sono molte fontane."]
]},
{t:'fix', title:'Correggi · Corrija as armadilhas', items:[
["{Ha} un bar qui vicino?",["c'è"],"C'è un bar qui vicino?"],
["In centro {c'è} molti negozi.",["ci sono"],"In centro ci sono molti negozi."],
["{Ci è} un problema.",["c'è"],"C'è un problema."],
["Scusi, {dove c'è} il Colosseo?",["dov'è"],"Scusi, dov'è il Colosseo?"],
["Al concerto {ci sono} molta gente.",["c'è"],"Al concerto c'è molta gente."],
["{Ce} un messaggio per te.",["c'è"],"C'è un messaggio per te."],
["Io {ci sono} due fratelli. (= eu tenho)",["ho"],"Io ho due fratelli."],
["In questa città c'è {il} museo?",["un"],"In questa città c'è un museo?"]
]},
{t:'order', title:'Ricostruisci la frase · Monte a frase', items:[
["C'è un bar qui vicino?",["Qui vicino c'è un bar?"]],
["Nel mio quartiere non ci sono parchi.",["Non ci sono parchi nel mio quartiere."]],
["In cucina c'è tutto quello che serve.",[]],
["Pronto, c'è Giulia?",[]],
["Ecco le chiavi della camera.",[]]
]}
],
write:{
task:'Descrivi la tua casa e il tuo quartiere a un\'amica italiana: che cosa c\'è, che cosa non c\'è e dove sono le cose. (Descreva sua casa e seu bairro: o que tem, o que não tem e onde ficam as coisas.)',
words:[50,100],
targets:[
{l:'3 volte c\'è', re:"c['’]è", n:3},
{l:'2 volte ci sono', re:'ci sono', n:2},
{l:'1 negativa (non c\'è / non ci sono)', re:"non (c['’]è|ci sono)", n:1},
{l:'1 frase con è / sono per dire dove sta una cosa (il supermercato è…)', manual:true}
],
model:`Abito in un appartamento al secondo piano, in un quartiere tranquillo di Rio. Nell'appartamento ci sono due camere, un salotto, una cucina e un bagno. In salotto c'è un divano grande e ci sono tante piante. Non c'è un balcone, purtroppo, ma ci sono due finestre sul giardino. Il mio quartiere è bello: sotto casa c'è un bar e all'angolo c'è una panetteria. Il supermercato è in via principale, a cinque minuti a piedi. Non ci sono cinema, ma la spiaggia è vicina!`
}
};
const at=UNITS.findIndex(u=>u.id===107);
UNITS.splice(at,0,unit);
const ren={107:'P8',109:'P9',108:'P10'};
UNITS.forEach(u=>{ if(ren[u.id]) u.n=ren[u.id]; });
const u7=UNITS.find(u=>u.id===107);
if(u7) u7.lesson=u7.lesson.replace("<h3>C'è / ci sono = há, tem</h3>","<h3>Ripasso: c'è / ci sono (unità P7)</h3>");
})();

TRAD.push(
["Tem um supermercado aqui perto?",["C'è un supermercato qui vicino?","Qui vicino c'è un supermercato?"],0,"Existência → c'è + un."],
["Tem muitos turistas na praça.",["Ci sono molti turisti in piazza.","In piazza ci sono molti turisti."],0,"Plural → ci sono."],
["Onde fica a estação?",["Dov'è la stazione?"],0,"Coisa conhecida → dov'è."],
["Não tem leite na geladeira.",["Non c'è latte nel frigo.","Nel frigo non c'è latte.","Non c'è il latte nel frigo."],0,"Negativa: non c'è."],
["Alô, a Giulia está?",["Pronto, c'è Giulia?"],0,"Ao telefone: c'è + pessoa."],
["Tem muita gente no bar.",["C'è molta gente al bar.","Al bar c'è molta gente."],0,"gente è singolare."]
);
USPEAK[110]={p:['Che cosa c\'è nella tua casa? E che cosa non c\'è?','Che cosa c\'è nel tuo quartiere?','Che cosa c\'è nel tuo frigo in questo momento?','Quanti studenti ci sono nella tua classe di italiano? Di dove sono?','Che cosa c\'è di bello nella tua città per un turista?'],v:[]};
SCHEDE[110]={r:['<b>c\'è</b> + singular (un, una, molta gente) · <b>ci sono</b> + plural (due, molti, dei)','<b>non c\'è / non ci sono</b> · a pergunta muda só a entonação','Existe? → <b>c\'è</b> un museo · Onde fica? → il museo <b>è</b>… / <b>dov\'è</b>?','Posse → <b>avere</b>: ho due fratelli · Mostrar → <b>ecco</b> le chiavi','c\'è il sole · c\'è Marco? · che c\'è? · non c\'è campo · non c\'è di che'],e:['Qui vicino c\'è una farmacia.','In centro ci sono molti negozi.','Dov\'è la stazione?','Pronto, c\'è Giulia? — No, non c\'è.'],t:'Tem um bar? → C\'è un bar? (nunca «ha un bar») · tem muitos turistas → CI SONO molti turisti.'};
VIDEI[110]=[['QlhL9BuCx4E','C\'È y CI SONO'],['VoQnnw8N7rU','Cómo usar CI y NE (ci come «lì»)']];
VIDEI[107]=[['fBK50B6A_cA','Preposiciones simples'],['402pAsNC99o','Cómo formular preguntas (dove, come, perché…)']];
(function(){
  const t=LESSICO.find(x=>x.t==='Il tempo che fa'); if(t) t.u=110;
  const T0=TESTS.find(x=>x.id===0); if(T0) T0.range='P1–P10';
  const i107=STORIA.findIndex(c=>c.u===107);
  STORIA.splice(i107,0,{u:110, t:'La strada per il paese', g:'c\'è, ci sono, ecco', text:`La stazione di San Vito è piccolissima. C'è un solo [[binario|trilho, plataforma]], c'è una panchina e c'è un vecchio orologio fermo alle due. Non c'è una biglietteria e non ci sono taxi.

Clara prende il telefono per guardare la mappa, ma non c'è campo. «Perfetto…» pensa.

Fuori dalla stazione c'è un signore anziano con un cane. Clara si avvicina.

«Scusi, c'è un autobus per il centro?»

«Un autobus? No, signorina, qui non ci sono autobus. Ma il paese è vicino: dieci minuti a piedi.»

«E c'è un albergo in paese?»

Il signore ride. «Un albergo a San Vito? No, non c'è! Ci sono la chiesa, la piazza, il forno e un bar. Ah, e ci sono io!»

«Grazie mille!»

«Prego. Ecco la strada: sempre dritto e poi a sinistra. Quando vede il campanile, è in piazza.»

Clara cammina. Lungo la strada ci sono alberi di [[fichi|figos]], [[muretti|murinhos]] di pietra e un gatto nero che dorme al sole. C'è un profumo di uva e di erba. Dopo dieci minuti, ecco il campanile.`,
  q:[["Che cosa non c'è alla stazione?",["Una panchina","Un binario","La biglietteria e i taxi","Un orologio"],2],["Perché Clara non può usare la mappa?",["Il telefono è rotto","Non c'è campo","Non ha la batteria","Non sa leggere la mappa"],1],["Che cosa c'è in paese, secondo il signore?",["Un albergo e due bar","La chiesa, la piazza, il forno e un bar","Molti autobus","Un museo"],1]]});
  STORIA_SHIFT=i107;
})();
