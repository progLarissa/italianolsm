/* ───────── FASE A1 → A2 · PRIMI PASSI ───────── */
UNITS.forEach(u=>{ u.band++; });
UNITS.unshift(
/* ───────── P1 ───────── */
{
id:101, n:'P1', lvl:'A1', band:0,
title:'Ciao! Suoni, saluti e presentazioni',
sub:'Come si leggono le parole e come ci si presenta · Como ler e como se apresentar',
focus:'pronuncia e ortografia (c/ch, g/gh, gli, gn, sc, doppie, accento), saluti formali e informali, presentarsi (mi chiamo, sono, piacere), tu e Lei',
lesson:`
<p class="lead">O italiano se lê quase exatamente como se escreve. Aprendendo uma dúzia de regras você consegue ler em voz alta qualquer palavra, e é aí que começa a melodia da língua.</p>
<h3>Os sons que mudam</h3>
<div class="tw"><table class="tbl">
<tr><th>escrita</th><th>som</th><th>como em…</th><th>exemplos</th></tr>
<tr><td><b>ce, ci</b></td><td>"tch"</td><td>tchau</td><td><i>cena, ciao, cinema, dolce</i></td></tr>
<tr><td><b>che, chi</b></td><td>"k"</td><td>quero</td><td><i>che, chiave, Michele, pochi</i></td></tr>
<tr><td><b>ca, co, cu</b></td><td>"k"</td><td>casa</td><td><i>casa, come, cuore</i></td></tr>
<tr><td><b>ge, gi</b></td><td>"dj"</td><td>"dia" no Rio</td><td><i>gelato, giorno, Giulia</i></td></tr>
<tr><td><b>ghe, ghi</b></td><td>"g"</td><td>guerra</td><td><i>spaghetti, laghi</i></td></tr>
<tr><td><b>gli</b></td><td>"lh"</td><td>filho</td><td><i>figlio, famiglia, moglie</i></td></tr>
<tr><td><b>gn</b></td><td>"nh"</td><td>banho</td><td><i>gnocchi, lasagna, bagno</i></td></tr>
<tr><td><b>sce, sci</b></td><td>"ch"</td><td>chá</td><td><i>pesce, sciare, uscita</i></td></tr>
<tr><td><b>sche, schi</b></td><td>"sk"</td><td>—</td><td><i>scherzo, schiena</i></td></tr>
<tr><td><b>z, zz</b></td><td>"ts" ou "dz"</td><td>—</td><td><i>pizza</i> (ts), <i>zero</i> (dz)</td></tr>
<tr><td><b>h</b></td><td>muda</td><td>hora</td><td><i>ho, hai, ha, hanno</i></td></tr>
</table></div>
<p>Em <i>ciao, giorno, giallo</i> o <b>i</b> só serve para dar o som "tch"/"dj": não se pronuncia. Diz-se "tchao", "djorno".</p>
<div class="trap"><span class="pen">Attenzione, brasiliana!</span> No italiano as vogais finais são sempre claras: <i>latte</i> é "lát-te", nunca "látchi"; <i>sette</i> é "sét-te". E <b>di</b>, <b>ti</b> nunca viram "dji", "tchi": <i>dico</i> = "dí-ko", <i>tipo</i> = "tí-po".</div>
<h3>Consoantes duplas</h3>
<p>As <i>doppie</i> se pronunciam mais longas e mudam o significado: <i>nono</i> (nono) ≠ <i>nonno</i> (avô) · <i>sete</i> (sede) ≠ <i>sette</i> (sete) · <i>caro</i> ≠ <i>carro</i> · <i>pena</i> ≠ <i>penna</i> (caneta).</p>
<h3>O acento</h3>
<p>A maioria das palavras é paroxítona: <i>a-MI-co, par-LA-re</i>. O acento gráfico só aparece na última sílaba: <i>città, perché, caffè, così</i>. E <b>è</b> (é, verbo) ≠ <b>e</b> (e, conjunção).</p>
<h3>Saudações</h3>
<div class="tw"><table class="tbl">
<tr><th>informal (tu)</th><th>formal (Lei)</th></tr>
<tr><td><i>Ciao!</i> (oi / tchau)</td><td><i>Buongiorno</i> (até o começo da tarde) · <i>Buonasera</i></td></tr>
<tr><td><i>Come stai?</i></td><td><i>Come sta?</i></td></tr>
<tr><td><i>Come ti chiami?</i></td><td><i>Come si chiama?</i></td></tr>
<tr><td><i>A presto! Ci vediamo!</i></td><td><i>Arrivederci! ArrivederLa!</i></td></tr>
</table></div>
<p><i>Buonanotte</i> só para ir dormir. Para se apresentar: <i>Mi chiamo Ana. Sono brasiliana, di Recife. Piacere!</i> Resposta: <i>Piacere mio!</i></p>
<div class="plus"><span class="pen">Vantaggio</span> O <b>Lei</b> formal usa o verbo na 3ª pessoa, exatamente como o nosso "você" ou "o senhor": <i>Lei come sta?</i> = Como o senhor está?</div>
<div class="trap"><span class="pen">Parole utili</span> <i>grazie</i> (obrigada) · <i>prego</i> (de nada / por favor, entre) · <i>per favore</i> (por favor) · <i>scusa / scusi</i> (desculpa / com licença) · <i>sì / no</i> · <i>va bene</i> (tudo bem).</div>
`,
reading:{
title:'Al corso d\'italiano',
text:`<p><b>Insegnante:</b> Buongiorno a tutti! Io sono Paola, la vostra [[insegnante|professora]]. E tu, come ti chiami?</p>
<p><b>Studentessa:</b> Mi chiamo Ana. Sono brasiliana, di Belo Horizonte.</p>
<p><b>Insegnante:</b> Piacere, Ana! E dove [[abiti|mora (abitare)]]?</p>
<p><b>Ana:</b> Abito a Lisbona, ma lavoro per un'[[azienda|empresa]] italiana.</p>
<p><b>Insegnante:</b> Che lavoro fai?</p>
<p><b>Ana:</b> Sono programmatrice.</p>
<p><b>Insegnante:</b> Bene! E tu?</p>
<p><b>Studente:</b> Ciao, io sono Tomás. Sono argentino, di Rosario. Ho ventisei anni e sono studente.</p>
<p><b>Insegnante:</b> Perché studiate l'italiano?</p>
<p><b>Ana:</b> Perché mi piace la musica della lingua!</p>
<p><b>Tomás:</b> Io lo studio per il lavoro e perché mia [[nonna|avó]] è di Genova.</p>
<p><b>Insegnante:</b> Benissimo. [[Allora|Então]], cominciamo!</p>`,
q:[
["Come si chiama l'insegnante?",["Ana","Paola","Genova","Tomás"],1],
["Di dov'è Ana?",["Di Rosario","Di Belo Horizonte","Di Genova","Di Lisbona"],1],
["Che lavoro fa Ana?",["È studentessa","È insegnante","È programmatrice","È musicista"],2],
["Quanti anni ha Tomás?",["Ventisei","Venti","Trentasei","Sedici"],0],
["Perché Ana studia l'italiano?",["Per il lavoro","Per la nonna","Perché le piace la musica della lingua","Per un viaggio"],2]
]},
ex:[
{t:'mc', title:'Come si legge? · Como se lê?', items:[
["In «ciao», «ci» si legge come…",["k","tch","s"],1],
["In «chiave», «chi» si legge come…",["tch","k","ch (de chá)"],1],
["In «famiglia», «gli» si legge come…",["g + li","lh (de filho)","li"],1],
["In «bagno», «gn» si legge come…",["g + n","nh (de banho)","n"],1],
["In «pesce», «sce» si legge come…",["ske","che (de chá)","se"],1],
["In «giorno», «gi» si legge come…",["dj (como «dia» no Rio)","g (de gato)","j (de já)"],0],
["«Latte» si legge…",["«látchi»","«lát-te»","«láte»"],1,"No final, -e é um «e» claro, nunca «i»; e «te» nunca vira «tchi»."],
["«Nonno» e «nono» sono…",["la stessa parola","parole diverse: avô / nono","sinonimi"],1,"As consoantes duplas mudam o significado."]
]},
{t:'fill', title:'Completa i saluti · Complete as saudações', items:[
["___ ! Come stai? (informale)",["ciao"]],
["Buongiorno, signora. Come ___ ? (stare, formale)",["sta"]],
["Ciao, Marco! Come ___ ? (stare, informale)",["stai"]],
["Mi ___ Ana. E tu? (chiamarsi)",["chiamo"]],
["Scusi, Lei come si ___ ? (chiamarsi)",["chiama"]],
["___ brasiliana, di Recife. (essere, io)",["sono"]],
["Di dove ___ ? (essere, tu)",["sei"]],
["Quanti anni ___ ? — Ho trent'anni. (avere, tu)",["hai"]],
["Piacere! — Piacere ___ !",["mio"]],
["Grazie! — ___ !",["prego"]],
["Sono le nove di sera: ___ ! (saluto)",["buonasera"]]
]},
{t:'order', title:'Ricostruisci la frase · Monte a frase', items:[
["Mi chiamo Ana e sono brasiliana.",["Sono brasiliana e mi chiamo Ana."]],
["Buongiorno, come sta?",[]],
["Di dove sei?",[]],
["Ho ventisei anni.",[]],
["Abito a Lisbona con mia sorella.",[]]
]}
],
write:{
task:'Presentati in 5–8 frasi: come ti chiami, di dove sei, dove abiti, che lavoro fai, perché studi l\'italiano. (Apresente-se em 5 a 8 frases.)',
words:[40,80],
targets:[
{l:'«mi chiamo» e «sono»', re:'<(mi chiamo|sono)>', n:2},
{l:'onde você mora ou de onde é (abito, sono di…)', re:'<(abito|sono di|vivo)>', n:1},
{l:'1 frase com «perché»', re:'<perché>', n:1}
],
model:`Ciao! Mi chiamo Ana e sono brasiliana, di Belo Horizonte. Ho trentaquattro anni. Abito a Lisbona con mia sorella. Sono programmatrice e lavoro per un'azienda italiana. Parlo portoghese e spagnolo. Studio l'italiano perché mi piace la musica della lingua e perché voglio leggere libri italiani. Piacere di conoscerti!`
}
},

/* ───────── P2 ───────── */
{
id:102, n:'P2', lvl:'A1', band:0,
title:'Essere e avere',
sub:'Chi sei? Com\'è? · Quem você é? Como é?',
focus:'presente di essere e avere, pronomi soggetto, nazionalità e professioni, accordo dell\'aggettivo (-o/-a/-e), espressioni con avere (avere fame, sete, freddo, caldo, sonno, fretta, paura, ragione)',
lesson:`
<p class="lead">Os dois verbos mais importantes. Em italiano, <b>essere</b> faz o papel de "ser" e quase sempre de "estar", e <b>avere</b> é "ter".</p>
<div class="tw"><table class="tbl">
<tr><th></th><th>essere</th><th>avere</th></tr>
<tr><th>io</th><td>sono</td><td>ho</td></tr>
<tr><th>tu</th><td>sei</td><td>hai</td></tr>
<tr><th>lui / lei / Lei</th><td>è</td><td>ha</td></tr>
<tr><th>noi</th><td>siamo</td><td>abbiamo</td></tr>
<tr><th>voi</th><td>siete</td><td>avete</td></tr>
<tr><th>loro</th><td>sono</td><td>hanno</td></tr>
</table></div>
<p>O <b>h</b> é mudo e só serve para distinguir: <i>ho</i> (tenho) / <i>o</i> (ou) · <i>ha</i> (tem) / <i>a</i> (a, preposição) · <i>hanno</i> (têm) / <i>anno</i> (ano). Como no espanhol, o pronome sujeito costuma ficar de fora: <i>Sono stanca</i> = Estou cansada.</p>
<h3>Adjetivos: concordância</h3>
<div class="tw"><table class="tbl">
<tr><th></th><th>masc. sing.</th><th>fem. sing.</th><th>masc. pl.</th><th>fem. pl.</th></tr>
<tr><td>em -o</td><td>alto</td><td>alta</td><td>alti</td><td>alte</td></tr>
<tr><td>em -e</td><td>gentile</td><td>gentile</td><td>gentili</td><td>gentili</td></tr>
</table></div>
<p><b>Nacionalidades:</b> brasiliano/a, italiano/a, spagnolo/a, argentino/a, americano/a, tedesco/a (alemão) · e em -e: portoghese, francese, inglese, cinese, giapponese.</p>
<p><b>Profissões:</b> <i>Che lavoro fai?</i> → <i>Sono insegnante / medico / ingegnere / studentessa / programmatrice</i> (sem artigo), ou <i>Faccio la programmatrice</i> (com artigo).</p>
<h3>Expressões com avere</h3>
<div class="chips">ho fame (estou com fome) · ho sete (sede) · ho freddo (frio) · ho caldo (calor) · ho sonno (sono) · ho fretta (pressa) · ho paura (medo) · ho ragione (tenho razão) · ho bisogno di… (preciso de…)</div>
<div class="trap"><span class="pen">Attenzione!</span> A idade é com <b>avere</b>: <i>Ho trent'anni</i> (nunca "sono trent'anni"). E "estar com fome" é <i>avere fame</i>: nada de "sono con fame".</div>
<div class="plus"><span class="pen">Per chi parla spagnolo</span> Aqui o espanhol ajuda: <i>tengo hambre → ho fame</i>, <i>tengo frío → ho freddo</i>. O "estar" (<i>stare</i>) aparece em poucas expressões: <i>Come stai? Sto bene. Sto a casa.</i></div>
`,
reading:{
title:'La mia famiglia',
text:`<p>Mi chiamo Giulia e sono di Bari, nel Sud Italia. Ho trentadue anni e sono [[infermiera|enfermeira]]. Ho una famiglia grande.</p>
<p>Mio padre si chiama Nicola: è alto, simpatico e un po' [[testardo|teimoso]]. Ha sessantacinque anni ed è [[in pensione|aposentado]]. Mia madre, Teresa, è piccola e molto energica: ha sempre fretta!</p>
<p>Ho due fratelli. Marco ha ventotto anni, è ingegnere e abita a Torino. Luca è il più giovane: ha diciannove anni ed è studente all'università.</p>
<p>Abbiamo anche un [[cane|cachorro]], Pepe: è nero, piccolo e ha sempre fame. La domenica siamo tutti insieme a pranzo [[dalla nonna|na casa da avó]]. Che bello!</p>`,
q:[
["Che lavoro fa Giulia?",["È medico","È infermiera","È studentessa","È ingegnere"],1],
["Com'è il padre?",["Piccolo ed energico","Alto, simpatico e un po' testardo","Giovane e timido","Basso e serio"],1],
["Dove abita Marco?",["A Bari","A Torino","Dalla nonna","All'università"],1],
["Quanti anni ha Luca?",["Ventotto","Diciannove","Trentadue","Sessantacinque"],1],
["Chi è Pepe?",["Il nonno","Il cane","Un fratello","Il padre"],1]
]},
ex:[
{t:'fill', title:'Essere o avere?', items:[
["Io ___ brasiliana. (essere)",["sono"]],
["Tu ___ fame? (avere)",["hai"]],
["Marco ___ molto simpatico. (essere)",["è"]],
["Noi ___ una casa piccola. (avere)",["abbiamo"]],
["Voi ___ italiani? (essere)",["siete"]],
["Loro ___ due figli. (avere)",["hanno"]],
["Lei ___ trent'anni. (avere)",["ha"]],
["Noi ___ stanchi. (essere)",["siamo"]],
["Hai freddo? — No, ho ___ ! (= calor)",["caldo"]],
["Voi ___ ragione. (avere)",["avete"]],
["Maria è ___ . (simpatico)",["simpatica"]],
["Sophie e Claire sono ___ . (francese)",["francesi"]]
]},
{t:'mc', title:'Scegli · Escolha', items:[
["Quanti anni hai? — ___ venticinque anni.",["Sono","Ho","Ha"],1],
["Hans è di Berlino: è ___ .",["tedesco","tedesca","tedeschi"],0],
["Sophie e Claire sono ___ .",["francese","francesi","francesa"],1],
["«Estou com fome» si dice…",["Sono con fame.","Ho fame.","Sto fame."],1],
["Paolo ___ in ritardo: ha sempre fretta.",["è","ha","e"],0],
["«E» senza accento significa…",["é (verbo)","e (conjunção)","ele"],1]
]},
{t:'fix', title:'Correggi · Corrija a parte sublinhada', items:[
["{Sono} trent'anni.",["ho"],"Ho trent'anni."],
["Maria è {simpatico}.",["simpatica"],"Maria è simpatica."],
["Noi {abbiamo} brasiliani.",["siamo"],"Noi siamo brasiliani."],
["Loro {ha} fame.",["hanno"],"Loro hanno fame."],
["Luca {e} medico.",["è"],"Luca è medico."]
]},
{t:'order', title:'Ricostruisci la frase · Monte a frase', items:[
["Mia sorella è alta e simpatica.",[]],
["Abbiamo un cane piccolo e nero.",["Abbiamo un cane nero e piccolo."]],
["Hai fame o sete?",["Hai sete o fame?"]],
["I miei amici sono spagnoli.",[]],
["Oggi ho molto sonno.",["Ho molto sonno oggi."]]
]}
],
write:{
task:'Descrivi la tua famiglia o i tuoi amici: nome, età, lavoro, carattere, aspetto. (Descreva sua família ou seus amigos.)',
words:[50,90],
targets:[
{l:'4 formas de essere', re:'<(sono|sei|è|siamo|siete)>', n:4},
{l:'3 formas de avere', re:'<(ho|hai|ha|abbiamo|avete|hanno)>', n:3},
{l:'4 adjetivos concordados (alta, simpatici…)', manual:true}
],
model:`La mia famiglia è piccola. Mia madre si chiama Rosa, ha sessant'anni ed è insegnante. È bassa, allegra e molto paziente. Mio padre si chiama Paulo: è alto e un po' timido, ma è molto spiritoso. Ho una sorella, Bia. Lei ha trent'anni, è medico e abita a Rio. Bia ha due figli, Leo e Nina: sono piccoli, simpatici e hanno sempre fame! Abbiamo anche una gatta bianca, Luna.`
}
},

/* ───────── P3 ───────── */
{
id:103, n:'P3', lvl:'A1', band:0,
title:'Nomi, articoli e plurali',
sub:'Il, la, un, una e i plurali · Artigos, gênero e plural',
focus:'genere dei nomi (-o, -a, -e), plurale regolare e irregolare, articolo determinativo e indeterminativo di base (il, lo, l\', la, i, gli, le, un, uno, una), parole invariabili (il caffè, la città, il bar)',
lesson:`
<p class="lead">Quase todo substantivo italiano termina em vogal, e essa vogal diz o gênero e o número. O plural não leva <b>-s</b>: a vogal final muda.</p>
<div class="tw"><table class="tbl">
<tr><th>singular</th><th>plural</th><th>exemplo</th></tr>
<tr><td>-o (masc.)</td><td>-i</td><td><i>il libro → i libri</i></td></tr>
<tr><td>-a (fem.)</td><td>-e</td><td><i>la casa → le case</i></td></tr>
<tr><td>-e (masc. ou fem.)</td><td>-i</td><td><i>il fiore → i fiori · la chiave → le chiavi</i></td></tr>
<tr><td>acento final ou consoante</td><td>não muda</td><td><i>la città → le città · il caffè → i caffè · il bar → i bar</i></td></tr>
</table></div>
<p><b>Ortografia:</b> -ca/-ga → -che/-ghe (<i>l'amica → le amiche</i>); -co/-go → -chi/-ghi (<i>il gioco → i giochi</i>), com exceções como <i>l'amico → gli amici</i>.</p>
<p><b>Irregulares frequentes:</b> <i>l'uomo → gli uomini · la mano → le mani · l'uovo → le uova</i>.</p>
<h3>Artigos (versão simples)</h3>
<div class="tw"><table class="tbl">
<tr><th></th><th>definido sing.</th><th>definido pl.</th><th>indefinido</th></tr>
<tr><td>masc. (maioria)</td><td>il libro</td><td>i libri</td><td>un libro</td></tr>
<tr><td>masc. + s+consoante, z</td><td>lo studente, lo zaino</td><td>gli studenti</td><td>uno studente</td></tr>
<tr><td>masc. + vogal</td><td>l'amico</td><td>gli amici</td><td>un amico</td></tr>
<tr><td>fem.</td><td>la casa · l'amica</td><td>le case · le amiche</td><td>una casa · un'amica</td></tr>
</table></div>
<p>Na unidade 1 você vai ver os artigos em detalhe, com as preposições.</p>
<div class="trap"><span class="pen">Gênero diferente!</span> <i>il fiore</i> (a flor) · <i>il ponte</i> (a ponte) · <i>il colore</i> (a cor) · <i>il dolore</i> (a dor) · <i>il latte</i> · <i>il sale</i> (ES <i>la sal</i>) · <i>il miele</i> (ES <i>la miel</i>) · <i>la fine</i> (o fim). Como no português, <i>il problema, il programma, il cinema</i> são masculinos.</div>
`,
reading:{
title:'Il mio appartamento',
text:`<p>Abito in un appartamento piccolo ma [[luminoso|claro, com muita luz]], al terzo piano. C'è un [[soggiorno|sala de estar]] con un [[divano|sofá]] verde, due poltrone e tanti libri.</p>
<p>La cucina è piccola: ci sono un [[frigorifero|geladeira]], un forno e una macchina per il caffè, naturalmente! In camera da letto ho un letto grande, un [[armadio|armário]] e una [[scrivania|escrivaninha]] con il computer. Il bagno ha una doccia e uno [[specchio|espelho]] enorme.</p>
<p>Dalla finestra vedo i [[tetti|telhados]] della città, gli alberi del parco e, la sera, le luci dei bar. Non è una casa grande, ma per me è perfetta.</p>`,
q:[
["A che piano è l'appartamento?",["Al primo","Al terzo","Al quinto","Al piano terra"],1],
["Di che colore è il divano?",["Rosso","Verde","Blu","Nero"],1],
["Che cosa c'è in cucina?",["Un divano","Un frigorifero, un forno e una macchina per il caffè","Un letto","Una doccia"],1],
["Dov'è il computer?",["In cucina","Sulla scrivania, in camera da letto","In bagno","Nel soggiorno"],1],
["Che cosa vede dalla finestra?",["Il mare","I tetti, gli alberi e le luci dei bar","Le montagne","La stazione"],1]
]},
ex:[
{t:'fill', title:'Volgi al plurale · Passe para o plural', items:[
["il libro → ___",["i libri"]],
["la casa → ___",["le case"]],
["il fiore → ___",["i fiori"]],
["la chiave → ___",["le chiavi"]],
["la città → ___",["le città"]],
["il caffè → ___",["i caffè"]],
["lo studente → ___",["gli studenti"]],
["l'amica → ___",["le amiche"]],
["l'amico → ___",["gli amici"]],
["l'uomo → ___",["gli uomini"]],
["la mano → ___",["le mani"]],
["il bar → ___",["i bar"]]
]},
{t:'mc', title:'Il, lo, la o l\'? · Escolha o artigo', items:[
["___ fiore è rosso.",["Il","La","Lo"],0,"Fiore é masculino (em português, «a flor»)."],
["___ zaino è pesante.",["Il","Lo","L'"],1,"Diante de z: lo."],
["___ acqua è fredda.",["La","L'","Lo"],1],
["Ho ___ problema.",["una","un","uno"],1,"Problema é masculino, como em português."],
["___ studentesse sono brave.",["Le","Gli","I"],0],
["Vorrei ___ espresso.",["un","uno","un'"],0,"Masculino diante de vogal: un, sem apóstrofo."],
["___ sale, per favore.",["La","Il","Lo"],1,"Il sale (em espanhol, «la sal»)."]
]},
{t:'order', title:'Ricostruisci la frase · Monte a frase', items:[
["Le chiavi sono sul tavolo.",[]],
["Ho un gatto e due cani.",["Ho due cani e un gatto."]],
["Gli studenti sono in classe.",[]],
["La mia città è piccola ma bella.",[]],
["Vorrei due caffè, per favore.",["Per favore, vorrei due caffè."]]
]}
],
write:{
task:'Descrivi la tua casa o la tua stanza preferita: che cosa c\'è, di che colore sono le cose. (Descreva sua casa ou seu cômodo preferido.)',
words:[50,90],
targets:[
{l:'6 artigos (il, la, i, le, un, una…)', re:'<(il|lo|la|i|gli|le|un|uno|una)>|<(l|un)\'', n:6},
{l:'3 plurais', manual:true},
{l:'2 cores concordadas (rosse, bianca…)', manual:true}
],
model:`La mia casa è in una strada tranquilla. Il soggiorno è grande e luminoso: ci sono un divano grigio, due poltrone rosse e una libreria con tanti libri. La cucina è bianca e ha una finestra sul giardino. In camera da letto ci sono un letto, un armadio e due comodini. Le pareti sono azzurre. Il bagno è piccolo, ma ha una vasca. La mia stanza preferita è lo studio: ho una scrivania, il computer e tante piante.`
}
},

/* ───────── P4 ───────── */
{
id:104, n:'P4', lvl:'A1', band:0,
title:'Il presente dei verbi regolari',
sub:'Parlo, prendo, dormo, capisco · O presente dos verbos regulares',
focus:'presente indicativo regolare (-are, -ere, -ire, -isc-), frase negativa (non, non… mai), domande (che cosa, dove, quando, come, perché, chi, quanto), verbi in -care/-gare (cerchi, paghi)',
lesson:`
<div class="tw"><table class="tbl">
<tr><th></th><th>parlare</th><th>prendere</th><th>dormire</th><th>capire (-isc-)</th></tr>
<tr><th>io</th><td>parlo</td><td>prendo</td><td>dormo</td><td>capisco</td></tr>
<tr><th>tu</th><td>parli</td><td>prendi</td><td>dormi</td><td>capisci</td></tr>
<tr><th>lui / lei</th><td>parla</td><td>prende</td><td>dorme</td><td>capisce</td></tr>
<tr><th>noi</th><td>parliamo</td><td>prendiamo</td><td>dormiamo</td><td>capiamo</td></tr>
<tr><th>voi</th><td>parlate</td><td>prendete</td><td>dormite</td><td>capite</td></tr>
<tr><th>loro</th><td>parlano</td><td>prendono</td><td>dormono</td><td>capiscono</td></tr>
</table></div>
<ul class="dots">
<li><b>tu</b> termina sempre em <b>-i</b>; <b>noi</b> sempre em <b>-iamo</b>.</li>
<li><b>loro</b> tem o acento na antepenúltima: <i>PAR-la-no, PREN-do-no</i> (nunca "parlÁno").</li>
<li>Verbos em <b>-isc-</b>: <i>capire, finire, preferire, pulire, spedire</i> (só em io, tu, lui, loro).</li>
<li><b>-care / -gare</b> mantêm o som duro: <i>cercare → cerchi, cerchiamo · pagare → paghi</i>.</li>
<li><b>-iare</b> não duplica o i: <i>mangiare → mangi · studiare → studi</i>.</li>
</ul>
<h3>Negação e perguntas</h3>
<p><b>non</b> antes do verbo: <i>Non parlo tedesco.</i> Negação dupla, como no português: <i>Non mangio mai carne. Non vedo niente.</i> Para perguntar, basta a entonação: <i>Parli italiano?</i></p>
<div class="tw"><table class="tbl">
<tr><td><b>che cosa / cosa</b> o quê</td><td><b>chi</b> quem</td><td><b>dove</b> onde</td><td><b>quando</b> quando</td></tr>
<tr><td><b>come</b> como</td><td><b>perché</b> por quê / porque</td><td><b>quanto</b> quanto</td><td><b>quale</b> qual</td></tr>
</table></div>
<div class="trap"><span class="pen">Attenzione!</span> <b>come</b> = como (pergunta); "comer" é <b>mangiare</b>. <b>dove</b> = onde (ES <i>donde</i>). <b>perché</b> serve para a pergunta e a resposta.</div>
`,
reading:{
title:'Una giornata normale',
text:`<p>Sofia abita a Milano e lavora in una banca. Ogni mattina prende la [[metropolitana|metrô]] alle otto e arriva in ufficio alle otto e mezza. Lavora fino alle cinque. A pranzo mangia un panino con i [[colleghi|colegas]] in un bar vicino.</p>
<p>Il pomeriggio risponde alle email e parla con i clienti. Dopo il lavoro, due volte alla settimana, [[frequenta|faz, frequenta]] un corso di yoga. La sera cucina, guarda una serie in TV o legge un libro. Non esce molto durante la settimana, perché è stanca.</p>
<p>Il sabato, [[invece|por outro lado]], vede gli amici e balla fino a tardi! La domenica dorme fino alle dieci e [[pulisce|limpa]] la casa. Sofia preferisce la domenica: è il suo giorno preferito.</p>`,
q:[
["Dove lavora Sofia?",["In un bar","In una banca","In una scuola","In un negozio"],1],
["Come va al lavoro?",["In macchina","In metropolitana","A piedi","In bicicletta"],1],
["Che cosa fa due volte alla settimana?",["Balla","Un corso di yoga","Cucina per gli amici","Va al cinema"],1],
["Perché non esce molto durante la settimana?",["Perché è stanca","Perché non ha amici","Perché studia","Perché piove"],0],
["Qual è il suo giorno preferito?",["Il sabato","La domenica","Il lunedì","Il venerdì"],1]
]},
ex:[
{t:'fill', title:'Coniuga al presente · Conjugue', items:[
["Io ___ italiano ogni giorno. (studiare)",["studio"]],
["Tu ___ portoghese e spagnolo. (parlare)",["parli"]],
["Marco ___ il treno alle otto. (prendere)",["prende"]],
["Noi ___ in un ristorante cinese. (mangiare)",["mangiamo"]],
["Voi ___ fino a tardi la domenica? (dormire)",["dormite"]],
["Loro ___ in una banca. (lavorare)",["lavorano"]],
["Io non ___ questa parola. (capire)",["capisco"]],
["A che ora ___ il film? (finire)",["finisce"]],
["Tu ___ le chiavi? (cercare)",["cerchi"]],
["Chi ___ il conto? (pagare)",["paga"]],
["Noi ___ il tè. (preferire)",["preferiamo"]],
["Loro ___ un libro al mese. (leggere)",["leggono"]]
]},
{t:'mc', title:'Che parola interrogativa? · Qual palavra?', items:[
["___ abiti? — A Napoli.",["Dove","Quando","Chi"],0],
["___ ti chiami? — Marta.",["Come","Che","Quale"],0],
["___ studi l'italiano? — Perché mi piace.",["Quando","Perché","Dove"],1],
["___ costa? — Due euro.",["Quanto","Come","Chi"],0],
["___ è quel ragazzo? — È mio fratello.",["Che","Chi","Cosa"],1],
["___ fai stasera? — Niente.",["Che cosa","Chi","Dove"],0],
["Non mangio ___ carne. (= nunca)",["mai","niente","nessuno"],0]
]},
{t:'fix', title:'Correggi · Corrija', items:[
["Io {parlo non} tedesco.",["non parlo"],"Io non parlo tedesco."],
["Tu {parlas} molto bene!",["parli"],"Tu parli molto bene!"],
["Noi {mangiamos} alle otto.",["mangiamo"],"Noi mangiamo alle otto."],
["Loro {capono} tutto.",["capiscono"],"Loro capiscono tutto."],
["Tu {cerci} lavoro?",["cerchi"],"Tu cerchi lavoro?"]
]},
{t:'order', title:'Ricostruisci la frase · Monte a frase', items:[
["Non capisco questa parola.",[]],
["Dove abiti adesso?",["Adesso dove abiti?"]],
["La sera leggo un libro.",["Leggo un libro la sera."]],
["Noi non guardiamo mai la TV.",[]],
["Perché studi l'italiano?",[]]
]}
],
write:{
task:'Descrivi la tua settimana: che cosa fai di solito (lavoro, studio, tempo libero)? Usa almeno 8 verbi diversi. (Descreva sua semana com pelo menos 8 verbos.)',
words:[60,100],
targets:[
{l:'8 verbos diferentes no presente', manual:true},
{l:'1 frase negativa com «non»', re:'<non>', n:1},
{l:'1 verbo em -isc- (capisco, preferisco, finisco…)', re:'<W+isc(o|i|e|ono)>', n:1}
],
model:`Dal lunedì al venerdì lavoro da casa. La mattina comincio alle nove e finisco alle sei. A pranzo mangio un'insalata e leggo le notizie. Il martedì e il giovedì studio italiano con un'insegnante online: parliamo, scriviamo e qualche volta non capisco niente! La sera cucino e guardo un film. Non esco molto durante la settimana. Il sabato, invece, vedo le amiche e camminiamo in centro. Preferisco la domenica: dormo fino a tardi e non apro il computer.`
}
},

/* ───────── P5 ───────── */
{
id:105, n:'P5', lvl:'A1', band:0,
title:'Verbi irregolari e modali',
sub:'Vado, faccio, vengo, voglio, posso, devo · Os irregulares mais usados',
focus:'presente dei verbi irregolari frequenti (andare, venire, fare, stare, uscire, dire) e dei modali volere, potere, dovere, sapere + infinito; andare a / in; espressioni con fare (fare colazione, fare la spesa, fa caldo)',
lesson:`
<div class="tw"><table class="tbl">
<tr><th></th><th>andare</th><th>venire</th><th>fare</th><th>stare</th><th>uscire</th><th>dire</th></tr>
<tr><th>io</th><td>vado</td><td>vengo</td><td>faccio</td><td>sto</td><td>esco</td><td>dico</td></tr>
<tr><th>tu</th><td>vai</td><td>vieni</td><td>fai</td><td>stai</td><td>esci</td><td>dici</td></tr>
<tr><th>lui / lei</th><td>va</td><td>viene</td><td>fa</td><td>sta</td><td>esce</td><td>dice</td></tr>
<tr><th>noi</th><td>andiamo</td><td>veniamo</td><td>facciamo</td><td>stiamo</td><td>usciamo</td><td>diciamo</td></tr>
<tr><th>voi</th><td>andate</td><td>venite</td><td>fate</td><td>state</td><td>uscite</td><td>dite</td></tr>
<tr><th>loro</th><td>vanno</td><td>vengono</td><td>fanno</td><td>stanno</td><td>escono</td><td>dicono</td></tr>
</table></div>
<h3>Modais + infinitivo (sem preposição!)</h3>
<div class="tw"><table class="tbl">
<tr><th></th><th>volere</th><th>potere</th><th>dovere</th><th>sapere</th></tr>
<tr><th>io</th><td>voglio</td><td>posso</td><td>devo</td><td>so</td></tr>
<tr><th>tu</th><td>vuoi</td><td>puoi</td><td>devi</td><td>sai</td></tr>
<tr><th>lui / lei</th><td>vuole</td><td>può</td><td>deve</td><td>sa</td></tr>
<tr><th>noi</th><td>vogliamo</td><td>possiamo</td><td>dobbiamo</td><td>sappiamo</td></tr>
<tr><th>voi</th><td>volete</td><td>potete</td><td>dovete</td><td>sapete</td></tr>
<tr><th>loro</th><td>vogliono</td><td>possono</td><td>devono</td><td>sanno</td></tr>
</table></div>
<p><i>Voglio imparare. Posso entrare? Devo lavorare. So nuotare</i> (sei nadar). Para pedir com educação: <b>vorrei</b> (gostaria).</p>
<h3>Andare a / in</h3>
<p><b>a</b> + cidade ou infinitivo: <i>vado a Roma, vado a mangiare</i> · <b>in</b> + país, região, lugares e transporte: <i>vado in Italia, in banca, in centro, in treno, in macchina</i> · <i>a piedi</i> (a pé) · <i>a casa</i>.</p>
<h3>Expressões com fare</h3>
<div class="chips">fare colazione (tomar café da manhã) · fare la spesa (fazer compras de mercado) · fare la doccia · fare una passeggiata · fare sport · fare una foto · fa caldo / fa freddo (está calor / frio)</div>
<div class="trap"><span class="pen">Attenzione!</span> <b>sapere</b> = saber (um fato, fazer algo): <i>So che è vero. So cucinare.</i> · <b>conoscere</b> = conhecer (pessoa, lugar): <i>Conosco Roma. Conosco Marco.</i></div>
`,
reading:{
title:'Messaggi tra amiche',
text:`<p><b>Bea:</b> Ciao Giulia! Come stai? Stasera io e Paolo andiamo al cinema a vedere un film italiano. Vuoi venire con noi? Il film comincia alle nove, ma prima facciamo un [[aperitivo|aperitivo, happy hour]] in piazza.</p>
<p><b>Giulia:</b> Ciao Bea! Sto bene, grazie. Vengo [[volentieri|com prazer]], ma non posso venire all'aperitivo: devo lavorare fino alle otto. Vi [[raggiungo|encontro vocês lá]] direttamente al cinema, va bene? Sai se viene anche Marta?</p>
<p><b>Bea:</b> Marta non può, deve studiare per un esame. Però viene Luca! Dobbiamo comprare i biglietti online: [[li compro|eu os compro]] io per tutti.</p>
<p><b>Giulia:</b> Perfetto, grazie! Quanto costa?</p>
<p><b>Bea:</b> Nove euro. Ci vediamo alle nove meno dieci davanti al cinema. Non fare tardi!</p>
<p><b>Giulia:</b> [[Tranquilla|Fica tranquila]], non faccio tardi!</p>`,
q:[
["Dove vanno stasera Bea e Paolo?",["A teatro","Al cinema","A un concerto","A cena da Giulia"],1],
["Perché Giulia non va all'aperitivo?",["Non le piace","Deve lavorare fino alle otto","Deve studiare","È stanca"],1],
["Chi non può venire?",["Luca","Marta","Paolo","Giulia"],1],
["Chi compra i biglietti?",["Giulia","Bea","Luca","Marta"],1],
["A che ora si vedono davanti al cinema?",["Alle nove","Alle nove meno dieci","Alle otto","Alle dieci"],1]
]},
ex:[
{t:'fill', title:'Coniuga · Conjugue', items:[
["Stasera ___ al cinema. (andare, io)",["vado"]],
["Tu ___ con noi? (venire)",["vieni"]],
["Che cosa ___ domenica? (fare, voi)",["fate"]],
["Come ___ tua madre? (stare)",["sta"]],
["Loro ___ sempre alle sette. (uscire)",["escono"]],
["Noi ___ sempre la verità. (dire)",["diciamo"]],
["Io ___ imparare l'italiano. (volere)",["voglio"]],
["___ aprire la finestra? (potere, io)",["posso"]],
["Domani noi ___ lavorare. (dovere)",["dobbiamo"]],
["Tu ___ nuotare? (sapere)",["sai"]],
["Loro ___ in Spagna in macchina. (andare)",["vanno"]],
["Ogni mattina ___ colazione al bar. (fare, io)",["faccio"]]
]},
{t:'mc', title:'Scegli · Escolha', items:[
["Voglio ___ l'italiano.",["imparare","a imparare","di imparare"],0,"Modais + infinitivo, sem preposição."],
["Vado ___ Roma la settimana prossima.",["in","a","da"],1],
["Andiamo ___ Italia in estate.",["a","in","per"],1],
["Vado al lavoro ___ piedi.",["a","in","con"],0],
["«Conheço Roma» si dice…",["So Roma.","Conosco Roma."],1],
["Oggi ___ freddo: metti il cappotto!",["è","fa","ha"],1],
["Scusi, ___ entrare?",["posso","può","puoi"],0]
]},
{t:'fix', title:'Correggi · Corrija', items:[
["Io {ando} a casa.",["vado"],"Io vado a casa."],
["Noi {possiamos} venire.",["possiamo"],"Noi possiamo venire."],
["Lui {vole} un caffè.",["vuole"],"Lui vuole un caffè."],
["Devo {di studiare} stasera.",["studiare"],"Devo studiare stasera."],
["Loro {fano} la spesa il sabato.",["fanno"],"Loro fanno la spesa il sabato."]
]},
{t:'order', title:'Ricostruisci la frase · Monte a frase', items:[
["Stasera non posso uscire.",["Non posso uscire stasera."]],
["Vuoi venire al cinema con noi?",["Vuoi venire con noi al cinema?"]],
["Devo fare la spesa domani.",["Domani devo fare la spesa."]],
["Andiamo in Italia in treno.",[]],
["Come stai oggi?",["Oggi come stai?"]]
]}
],
write:{
task:'Scrivi un messaggio a un\'amica per invitarla a fare qualcosa nel fine settimana: dove andate, che cosa fate, a che ora. Poi scrivi la sua risposta: può venire o no? Perché? (Escreva um convite e a resposta.)',
words:[60,100],
targets:[
{l:'4 verbos irregulares (vado, faccio, vieni…)', re:'<(vado|vai|va|andiamo|andate|vanno|vengo|vieni|viene|veniamo|venite|vengono|faccio|fai|fa|facciamo|fate|fanno|sto|stai|sta|stiamo|state|stanno|esco|esci|esce|usciamo|uscite|escono|dico|dici|dice|diciamo|dite|dicono)>', n:4},
{l:'3 modais + infinitivo (voglio andare…)', re:'<(voglio|vuoi|vuole|vogliamo|volete|vogliono|vorrei|posso|puoi|può|possiamo|potete|possono|devo|devi|deve|dobbiamo|dovete|devono)\\s+W+(are|ere|ire)>', n:3}
],
model:`Ciao Carla! Sabato vado al mare con mio fratello. Vuoi venire con noi? Partiamo alle nove in macchina e torniamo la sera. Facciamo un picnic in spiaggia e, se fa caldo, facciamo il bagno. Puoi portare la tua macchina fotografica?\n— Ciao! Che bella idea, ma purtroppo non posso venire: sabato devo lavorare fino alle due. Però sono libera domenica. Vuoi fare qualcosa insieme domenica? Andiamo al museo o facciamo una passeggiata in centro?`
}
},

/* ───────── P6 ───────── */
{
id:106, n:'P6', lvl:'A1', band:0,
title:'Numeri, ore e routine',
sub:'Che ore sono? Mi sveglio, mi alzo · Números, horas e rotina',
focus:'numeri da 0 a 1000, l\'ora (sono le tre, è l\'una, alle otto e mezza), giorni della settimana, mesi, stagioni, la data, verbi riflessivi al presente (svegliarsi, alzarsi, lavarsi, vestirsi, chiamarsi, divertirsi), avverbi di frequenza (sempre, spesso, qualche volta, mai)',
lesson:`
<h3>Números</h3>
<div class="chips">0 zero · 1 uno · 2 due · 3 tre · 4 quattro · 5 cinque · 6 sei · 7 sette · 8 otto · 9 nove · 10 dieci · 11 undici · 12 dodici · 13 tredici · 14 quattordici · 15 quindici · 16 sedici · 17 diciassette · 18 diciotto · 19 diciannove · 20 venti · 21 ventuno · 22 ventidue · 23 ventitré · 28 ventotto · 30 trenta · 40 quaranta · 50 cinquanta · 60 sessanta · 70 settanta · 80 ottanta · 90 novanta · 100 cento · 200 duecento · 1000 mille · 2000 duemila</div>
<p>As dezenas perdem a vogal antes de <i>uno</i> e <i>otto</i>: <i>ventuno, ventotto, trentuno</i>. Tudo junto numa palavra: <i>trecentoquarantacinque</i> (345).</p>
<h3>As horas</h3>
<div class="tw"><table class="tbl">
<tr><td><i>Che ore sono?</i></td><td><b>Sono le</b> tre · <b>È l'</b>una · <b>È</b> mezzogiorno · <b>È</b> mezzanotte</td></tr>
<tr><td>minutos</td><td>le tre <b>e</b> dieci · e un quarto · e mezza · le quattro <b>meno</b> un quarto (3:45)</td></tr>
<tr><td><i>A che ora…?</i></td><td><b>Alle</b> otto · <b>all'</b>una · <b>a</b> mezzogiorno · <b>verso le</b> nove (por volta das nove)</td></tr>
</table></div>
<h3>Dias, meses, estações</h3>
<p><b>lunedì, martedì, mercoledì, giovedì, venerdì</b> (masc.), <b>sabato</b>, <b>domenica</b> (fem.), sempre com minúscula. <i>Il lunedì vado in palestra</i> = toda segunda · <i>Lunedì vado da Marco</i> = nesta segunda.</p>
<p>gennaio, febbraio, marzo, aprile, maggio, giugno, luglio, agosto, settembre, ottobre, novembre, dicembre · <i>il 9 novembre, il primo maggio</i> · primavera, estate, autunno, inverno.</p>
<h3>Verbos reflexivos</h3>
<div class="tw"><table class="tbl">
<tr><th>svegliarsi</th><td>mi sveglio · ti svegli · si sveglia · ci svegliamo · vi svegliate · si svegliano</td></tr>
</table></div>
<p>Outros: <i>alzarsi</i> (levantar-se), <i>lavarsi, vestirsi, truccarsi</i> (maquiar-se), <i>riposarsi, addormentarsi</i> (pegar no sono), <i>divertirsi</i>. O pronome vem <b>antes</b> do verbo: <i>Mi alzo</i> (nunca "alzo-mi").</p>
<p><b>Frequência:</b> sempre · di solito · spesso · qualche volta · raramente · <i>non… mai</i>.</p>
`,
reading:{
title:'La giornata di un fornaio',
text:`<p>Franco ha cinquantotto anni e [[fa il fornaio|é padeiro]] a Bologna da trent'anni. La sua giornata comincia quando gli altri dormono: si sveglia alle tre meno un quarto, si lava, si veste e alle tre e mezza è già in [[forno|padaria]]. Prepara il pane, le focacce e le brioche per i bar della zona.</p>
<p>Alle sette apre il negozio e serve i primi clienti. Alle due del pomeriggio torna a casa, [[pranza|almoça]] con la moglie e si riposa un paio d'ore. La sera si addormenta presto, verso le nove.</p>
<p>«Non vado mai al cinema e non esco mai la sera», dice [[ridendo|rindo]], «ma la domenica mi alzo alle dieci e mi sento un re!» In agosto il forno chiude per tre settimane: Franco e sua moglie vanno sempre al mare in Puglia.</p>`,
q:[
["A che ora si sveglia Franco?",["Alle tre e mezza","Alle tre meno un quarto","Alle sette","Alle due"],1],
["Che cosa fa alle sette?",["Torna a casa","Apre il negozio","Si riposa","Va al bar"],1],
["Quando si riposa?",["La mattina","Il pomeriggio, dopo pranzo","La sera tardi","Mai"],1],
["Che cosa non fa mai?",["Andare al cinema","Lavorare","Pranzare","Svegliarsi presto"],0],
["Dove va in agosto?",["In montagna","Al mare in Puglia","In città","All'estero"],1]
]},
ex:[
{t:'fill', title:'Ore, numeri e riflessivi', items:[
["Che ore sono? — ___ le otto.",["sono"]],
["Che ore sono? — ___ l'una.",["è"]],
["A che ora comincia il film? — ___ nove.",["alle"]],
["13:30 → È l'una e ___ .",["mezza","mezzo","trenta"]],
["8:45 → Sono le nove meno un ___ .",["quarto"]],
["Io ___ alle sette. (svegliarsi)",["mi sveglio"]],
["Tu ___ presto? (alzarsi)",["ti alzi"]],
["Marta ___ in cinque minuti! (vestirsi)",["si veste"]],
["Noi ___ molto alle feste. (divertirsi)",["ci divertiamo"]],
["I bambini ___ alle nove. (addormentarsi)",["si addormentano"]],
["Il giorno dopo la domenica è il ___ .",["lunedì"]],
["Il mese dopo luglio è ___ .",["agosto"]],
["27 = ___ (in lettere)",["ventisette"]],
["38 = ___ (in lettere)",["trentotto"]]
]},
{t:'mc', title:'Scegli · Escolha', items:[
["Che ore sono? (12:00)",["È mezzogiorno.","Sono mezzogiorno.","È le dodici."],0],
["21 si scrive…",["ventiuno","ventuno","vent'uno"],1],
["I giorni della settimana si scrivono…",["con la maiuscola","con la minuscola"],1],
["«Toda segunda vou à academia» = ___ vado in palestra.",["Il lunedì","Lunedì","Al lunedì"],0,"Il lunedì = toda segunda; lunedì = nesta segunda."],
["Io ___ chiamo Ana.",["mi","me","si"],0],
["«Nunca saio» si dice…",["Mai esco.","Non esco mai.","Non mai esco."],1]
]},
{t:'order', title:'Ricostruisci la frase · Monte a frase', items:[
["Mi sveglio alle sette e mezza.",[]],
["La domenica mi alzo tardi.",["Mi alzo tardi la domenica."]],
["Il film comincia alle nove.",[]],
["Non vado mai in palestra.",[]],
["Il mio compleanno è il dodici marzo.",[]]
]}
],
write:{
task:'Descrivi la tua routine: a che ora ti svegli, che cosa fai la mattina, il pomeriggio e la sera, che cosa fai nel fine settimana. (Descreva sua rotina com horários.)',
words:[60,100],
targets:[
{l:'4 horários (alle…, all\'una, verso le…)', re:'<(alle|all\'|a mezzogiorno|a mezzanotte|verso le|dalle)', n:4},
{l:'4 verbos reflexivos (mi sveglio, mi alzo…)', re:'<(mi|ti|si|ci|vi)\\s+W+(o|i|a|e|iamo|ate|ete|ite|ano|ono)>', n:4},
{l:'2 advérbios de frequência', re:'<(sempre|spesso|di solito|qualche volta|raramente|mai)>', n:2}
],
model:`Di solito mi sveglio alle sette, ma mi alzo alle sette e un quarto: mi piace restare un po' a letto! Mi lavo, mi vesto e faccio colazione con un caffè e una fetta di pane. Alle otto e mezza comincio a lavorare. A mezzogiorno e mezza pranzo e poi faccio una passeggiata. Finisco di lavorare verso le sei. La sera ceno alle otto e qualche volta studio italiano. Mi addormento sempre verso mezzanotte. Il sabato non mi sveglio mai prima delle nove.`
}
},

/* ───────── P7 ───────── */
{
id:107, n:'P7', lvl:'A1 → A2', band:0,
title:'In città: c\'è, ci sono e le preposizioni',
sub:'Dov\'è la stazione? C\'è un bar qui vicino? · Na cidade',
focus:'c\'è / ci sono, preposizioni semplici (di, a, da, in, con, su, per, tra/fra), espressioni di luogo (vicino a, lontano da, davanti a, dietro, accanto a, di fronte a), chiedere e dare indicazioni (giri a destra, vada dritto)',
lesson:`
<h3>C'è / ci sono = há, tem</h3>
<p><b>c'è</b> + singular, <b>ci sono</b> + plural: <i>C'è un bar qui vicino? Ci sono due farmacie. Non c'è problema.</i> Para perguntar onde está algo conhecido: <i>Dov'è il museo? Dove sono i bagni?</i></p>
<h3>Preposições simples</h3>
<div class="tw"><table class="tbl">
<tr><th>di</th><td>de (posse, origem com essere, material)</td><td><i>il libro di Marco · sono di Rio · di lana</i></td></tr>
<tr><th>a</th><td>a, em (cidades), a + infinitivo</td><td><i>vado a Roma · abito a Milano · vado a mangiare</i></td></tr>
<tr><th>da</th><td>de (de onde venho), desde, casa de alguém</td><td><i>vengo da Napoli · studio da un mese · vado da Marta</i></td></tr>
<tr><th>in</th><td>em (países, regiões, lugares, transporte)</td><td><i>in Italia · in centro · in banca · in treno</i></td></tr>
<tr><th>con</th><td>com</td><td><i>con gli amici</i></td></tr>
<tr><th>su</th><td>sobre, em cima</td><td><i>su un tavolo · sul tavolo</i></td></tr>
<tr><th>per</th><td>para, por</td><td><i>un regalo per te · passo per il centro</i></td></tr>
<tr><th>tra / fra</th><td>entre; daqui a</td><td><i>tra la banca e la posta · tra due giorni</i></td></tr>
</table></div>
<div class="trap"><span class="pen">Attenzione!</span> <i>Abito <b>a</b> Roma</i> (nunca "in Roma") · <i>Sono <b>di</b> Rio</i> mas <i>Vengo <b>da</b> Rio</i> · "daqui a dois dias" = <i><b>tra</b> due giorni</i> · "há um mês que estudo" = <i>studio <b>da</b> un mese</i>.</div>
<h3>Onde fica</h3>
<div class="chips">vicino a (perto de) · lontano da (longe de) · davanti a (em frente a) · dietro (atrás) · accanto a (ao lado de) · di fronte a (do outro lado, em frente) · sopra / sotto (em cima / embaixo) · a destra · a sinistra · dritto (reto) · all'angolo (na esquina)</div>
<h3>Dar indicações (com Lei)</h3>
<p><i>Scusi, dov'è la stazione?</i> — <i>Vada dritto, poi giri a destra. Prenda la prima a sinistra. È a cinque minuti a piedi.</i></p>
`,
reading:{
title:'Benvenuti a Lucca',
text:`<p>Lucca è una piccola città della Toscana, a circa mezz'ora da Pisa in treno. Il centro storico è [[circondato|cercado]] da [[mura|muralhas]] antiche: sopra le mura c'è una passeggiata di quattro chilometri, con alberi e [[panchine|bancos de praça]]. I lucchesi vanno lì a correre, a passeggiare o in bicicletta.</p>
<p>In centro ci sono molte chiese e una piazza molto speciale, Piazza dell'Anfiteatro: ha una forma ovale perché è costruita sopra un antico anfiteatro romano. Intorno alla piazza ci sono bar, ristoranti e negozi. Non ci sono molte macchine, quindi è facile girare a piedi.</p>
<p>Lucca è anche la città di Giacomo Puccini, il compositore della <i>Bohème</i>: la sua [[casa natale|casa onde nasceu]] oggi è un museo, vicino a Piazza San Michele.</p>`,
q:[
["Dov'è Lucca?",["In Sicilia","In Toscana","In Lombardia","Vicino a Roma"],1],
["Che cosa c'è sopra le mura?",["Una strada per le macchine","Una passeggiata con alberi e panchine","Un museo","La stazione"],1],
["Perché Piazza dell'Anfiteatro è ovale?",["È costruita sopra un anfiteatro romano","È un parco","È nuova","Non si sa"],0],
["Perché è facile girare a piedi?",["Ci sono pochi turisti","Non ci sono molte macchine","Ci sono molti autobus","La città è grande"],1],
["Chi è nato a Lucca?",["Verdi","Puccini","Dante","Leonardo"],1]
]},
ex:[
{t:'fill', title:'C\'è, ci sono e preposizioni', items:[
["In questa via ___ un bar molto buono.",["c'è"]],
["Nel mio quartiere ___ due farmacie.",["ci sono"]],
["Abito ___ Milano.",["a"]],
["Lavoro ___ Italia da un anno.",["in"]],
["Vengo ___ Rio de Janeiro.",["da"]],
["Sono ___ Rio de Janeiro.",["di"]],
["Vado in ufficio ___ treno.",["in"]],
["Esco ___ i miei amici.",["con"]],
["Questo regalo è ___ te.",["per"]],
["La farmacia è ___ la banca e la posta.",["tra","fra"]],
["Ci vediamo ___ due giorni. (= daqui a)",["tra","fra"]],
["Studio italiano ___ un mese.",["da"]]
]},
{t:'mc', title:'Scegli · Escolha', items:[
["Scusi, ___ il Duomo?",["c'è","dov'è","ci sono"],1],
["___ un supermercato qui vicino?",["C'è","Dov'è","Ci sono"],0],
["Vado ___ Marco stasera. (= à casa do Marco)",["a","da","in"],1],
["Vada dritto e poi ___ a destra.",["gira","giri","girare"],1,"Com Lei: giri, prenda, vada."],
["Il gatto è ___ il letto. (embaixo)",["sotto","sopra","su"],0],
["Il bar è ___ alla stazione. (= ao lado)",["accanto","dietro","lontano"],0]
]},
{t:'fix', title:'Correggi · Corrija', items:[
["Abito {in} Roma da due anni.",["a"],"Abito a Roma da due anni."],
["{Ci è} un problema.",["c'è"],"C'è un problema."],
["{C'è} molti turisti in centro.",["ci sono"],"Ci sono molti turisti in centro."],
["Vengo {di} Lisbona in aereo.",["da"],"Vengo da Lisbona in aereo."],
["Ci vediamo {dentro di} tre giorni.",["tra","fra"],"Ci vediamo tra tre giorni."]
]},
{t:'order', title:'Ricostruisci la frase · Monte a frase', items:[
["Scusi, dov'è la stazione?",[]],
["C'è una farmacia qui vicino?",["Qui vicino c'è una farmacia?"]],
["La banca è davanti alla posta.",[]],
["Vada dritto e giri a sinistra.",[]],
["Nel mio quartiere ci sono molti parchi.",["Ci sono molti parchi nel mio quartiere."]]
]}
],
write:{
task:'Descrivi il tuo quartiere a un amico italiano che viene a trovarti: che cosa c\'è, dove sono le cose, come arrivare a casa tua. (Descreva seu bairro e dê indicações.)',
words:[60,100],
targets:[
{l:'3 c\'è / ci sono', re:'<(c\'è|ci sono)', n:3},
{l:'5 preposições simples', re:'<(di|a|da|in|con|su|per|tra|fra)>', n:5},
{l:'2 expressões de lugar (vicino a, davanti a…)', re:'<(vicino|lontano|davanti|dietro|accanto|di fronte|a destra|a sinistra|dritto|all\'angolo)', n:2}
],
model:`Ciao Matteo! Il mio quartiere è tranquillo ma vivace. Vicino a casa mia c'è un mercato con frutta e verdura, e ci sono tre bar e una pizzeria buonissima. Di fronte al mio palazzo c'è un piccolo parco con una fontana. Per arrivare da me dalla stazione, prendi l'autobus 12 e scendi alla quarta fermata, in Piazza Verdi. Poi vai dritto per cento metri e giri a destra in via Roma. Casa mia è al numero 8, accanto a una libreria. A presto!`
}
},

/* ───────── P8 ───────── */
{
id:108, n:'P8', lvl:'A1 → A2', band:0,
title:'Mi piace! Gusti, cibo e ordinare',
sub:'Mi piace, mi piacciono, vorrei · Gostos, comida e pedir no bar',
focus:'piacere (mi piace / mi piacciono, ti, gli, le, ci, vi), anche a me / neanche a me, dimostrativi questo e quello, ordinare al bar e al ristorante (vorrei, per me, il conto per favore), lessico del cibo e dei pasti',
lesson:`
<p class="lead"><b>Piacere</b> funciona como o <i>gustar</i> espanhol: o que agrada é o sujeito. Em português pensamos ao contrário ("eu gosto de"), então vale treinar.</p>
<div class="tw"><table class="tbl">
<tr><th></th><th>+ singular ou infinitivo</th><th>+ plural</th></tr>
<tr><td>(a me) <b>mi</b></td><td>mi piace il caffè · mi piace ballare</td><td>mi piacciono i dolci</td></tr>
<tr><td>(a te) <b>ti</b></td><td>ti piace</td><td>ti piacciono</td></tr>
<tr><td>(a lui / a lei / a Lei) <b>gli / le / Le</b></td><td>gli piace · le piace</td><td>gli piacciono · le piacciono</td></tr>
<tr><td>(a noi / a voi / a loro) <b>ci / vi / gli</b></td><td>ci piace · vi piace · gli piace</td><td>ci piacciono…</td></tr>
</table></div>
<p>Com um nome: <i><b>A</b> Marco piace il calcio. <b>A</b> mia madre piacciono i fiori.</i></p>
<div class="trap"><span class="pen">Per chi parla portoghese</span> "Eu gosto <b>de</b> café" → <i>Mi piace <b>il</b> caffè</i>: sem "di" e com artigo. E <i>Tu mi piaci</i> = "eu gosto de você"… no sentido romântico!</div>
<p><b>Concordar:</b> <i>Mi piace il mare. — <b>Anche a me!</b> / A me no.</i> · <i>Non mi piace il pesce. — <b>Neanche a me.</b> / A me sì.</i></p>
<h3>Questo e quello</h3>
<p><b>questo, questa, questi, queste</b> (este/esse). <b>quello</b> muda como o artigo: <i>quel libro, quello zaino, quell'albero, quella casa, quei libri, quegli zaini, quelle case</i>.</p>
<h3>No bar e no restaurante</h3>
<div class="tw"><table class="tbl">
<tr><th>pedir</th><td><i>Vorrei… · Per me… · Prendo… · Che cosa ci consiglia? · Il conto, per favore. · Posso pagare con la carta?</i></td></tr>
<tr><th>no bar</th><td><i>un caffè</i> (= espresso) · <i>un macchiato · un cappuccino · un cornetto</i> (croissant) · <i>una spremuta</i> (suco espremido) · <i>un'acqua naturale / frizzante</i></td></tr>
<tr><th>o cardápio</th><td><i>antipasto</i> → <i>primo</i> (massa, risoto, sopa) → <i>secondo</i> (carne ou peixe) + <i>contorno</i> (acompanhamento) → <i>dolce</i></td></tr>
</table></div>
<div class="trap"><span class="pen">Attenzione!</span> Se pedir <i>un latte</i>, você recebe um copo de leite. Café com leite é <i>caffellatte</i> ou <i>latte macchiato</i>. O <i>coperto</i> na conta é uma taxa fixa por pessoa (pão e mesa).</div>
`,
reading:{
title:'Al bar della stazione',
text:`<p><b>Barista:</b> Buongiorno! Che cosa le preparo?</p>
<p><b>Cliente:</b> Buongiorno. Vorrei un cappuccino e un cornetto, per favore.</p>
<p><b>Barista:</b> Il cornetto [[vuoto|sem recheio]], alla crema o alla marmellata?</p>
<p><b>Cliente:</b> Alla crema, grazie. Quanto [[pago|eu pago]]?</p>
<p><b>Barista:</b> Sono tre euro e trenta.</p>
<p><b>Cliente:</b> Ecco a lei. Scusi, a che ora parte il treno per Firenze?</p>
<p><b>Barista:</b> Quello delle dieci? Di solito parte dal [[binario|plataforma]] tre. Le piace Firenze?</p>
<p><b>Cliente:</b> Non lo so, è la prima volta! Mi piacciono molto i musei, e a Firenze ce ne sono tanti.</p>
<p><b>Barista:</b> Allora deve vedere gli Uffizi. E mangiare la bistecca alla fiorentina!</p>
<p><b>Cliente:</b> [[Purtroppo|Infelizmente]] la carne non mi piace… sono vegetariana.</p>
<p><b>Barista:</b> Nessun problema: a Firenze ci sono anche la ribollita e la pappa al pomodoro. Sono buonissime!</p>
<p><b>Cliente:</b> Grazie mille! Arrivederci.</p>
<p><b>Barista:</b> Buon viaggio!</p>`,
q:[
["Che cosa ordina la cliente?",["Un caffè e un panino","Un cappuccino e un cornetto","Una spremuta","Un tè"],1],
["Quanto paga?",["Tre euro e trenta","Un euro e ottanta","Due euro","Cinque euro"],0],
["Dove va la cliente?",["A Roma","A Firenze","A Milano","A Napoli"],1],
["Perché non vuole la bistecca?",["È cara","È vegetariana","Non ha fame","Non c'è tempo"],1],
["Che cosa le piace molto?",["Il calcio","I musei","La carne","Il treno"],1]
]},
ex:[
{t:'fill', title:'Piacere, questo/quello e al bar', items:[
["Mi ___ il caffè. (piacere)",["piace"]],
["Mi ___ i film italiani. (piacere)",["piacciono"]],
["A Marco ___ leggere. (piacere)",["piace"]],
["Ti piace il calcio? — Sì, ___ piace molto. (a me)",["mi"]],
["A Laura piace il mare? — Sì, ___ piace tanto. (a lei)",["le"]],
["A noi ___ piacciono i gatti.",["ci"]],
["Mi piace il gelato. — ___ a me!",["anche"]],
["Non mi piace il pesce. — ___ a me.",["neanche","nemmeno","neppure"]],
["___ un caffè, per favore. (volere, cortese)",["vorrei"]],
["Il ___ , per favore! (para pagar)",["conto"]],
["___ libro è mio. (este)",["questo"]],
["___ ragazze sono spagnole. (aquelas)",["quelle"]]
]},
{t:'mc', title:'Scegli · Escolha', items:[
["Ti piacciono ___ ?",["il vino","i dolci","la pizza"],1],
["«Eu gosto de café» si dice…",["Io piaccio il caffè.","Mi piace di caffè.","Mi piace il caffè."],2],
["Mi piace ballare. — A me ___ . (= eu não)",["no","neanche","anche"],0],
["Al bar, «un caffè» è…",["un espresso","un caffè con latte","un caffè americano grande"],0],
["Se chiedi «un latte», ricevi…",["un caffellatte","un bicchiere di latte","un cappuccino"],1],
["___ zaino è di Paolo. (aquela mochila)",["Quel","Quello","Quella"],1],
["Il primo piatto di solito è…",["pasta, risotto o zuppa","carne o pesce","il dolce"],0]
]},
{t:'fix', title:'Correggi · Corrija', items:[
["Mi {piace} gli spaghetti.",["piacciono"],"Mi piacciono gli spaghetti."],
["{Io piace} la musica italiana.",["mi piace"],"Mi piace la musica italiana."],
["{Lui piace} il calcio.",["gli piace"],"Gli piace il calcio."],
["Mi piace {di leggere} romanzi.",["leggere"],"Mi piace leggere romanzi."],
["{Questo} ragazze sono simpatiche.",["queste"],"Queste ragazze sono simpatiche."]
]},
{t:'order', title:'Ricostruisci la frase · Monte a frase', items:[
["Mi piacciono molto i musei.",[]],
["Vorrei un cappuccino e un cornetto.",["Vorrei un cornetto e un cappuccino."]],
["A mia sorella non piace il pesce.",[]],
["Quanto costa questo libro?",[]],
["Il conto, per favore.",["Per favore, il conto."]]
]}
],
write:{
task:'Scrivi che cosa ti piace e che cosa non ti piace (cibo, musica, sport, città…). Poi scrivi un piccolo dialogo al bar o al ristorante. (Seus gostos e um diálogo no bar.)',
words:[70,110],
targets:[
{l:'3 «mi piace»', re:'<(mi|ti|gli|le|ci|vi)\\s+piace>', n:3},
{l:'2 «mi piacciono»', re:'<(mi|ti|gli|le|ci|vi)\\s+piacciono>', n:2},
{l:'1 «vorrei»', re:'<vorrei>', n:1},
{l:'1 questo / quello', re:'<(questo|questa|questi|queste|quel|quello|quella|quei|quegli|quelle|quell\')', n:1}
],
model:`Mi piace molto la cucina italiana, soprattutto la pasta e la pizza. Mi piacciono anche i dolci, ma non mi piace il caffè troppo forte. Mi piace camminare in città e visitare i musei. Non mi piacciono il calcio e la musica troppo alta. A mio fratello piace il cinema; a me piacciono di più i libri.\n— Buonasera! Che cosa prendete?\n— Io vorrei un'insalata e un'acqua naturale. Lui prende gli spaghetti al pomodoro.\n— Vino?\n— Sì, un bicchiere di quel vino rosso, grazie.\n— Il conto, per favore!`
}
}
);
