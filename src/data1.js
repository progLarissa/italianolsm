const UNITS = [
/* ───────────────────────── UNITÀ 1 ───────────────────────── */
{
id:1, lvl:'A2 → B1', band:0,
title:'Articoli e preposizioni articolate',
sub:'O esqueleto de qualquer frase: il / lo / gli, del, nello, dal…',
focus:'articoli determinativi (il, lo, l\', la, i, gli, le), preposizioni articolate, partitivo, possessivi con articolo',
lesson:`
<p class="lead">Em italiano o artigo depende do <em>som inicial</em> da palavra seguinte, e as preposições se fundem com ele muito mais do que em português. Parece detalhe, mas aparece em todas as frases: vale a pena automatizar logo.</p>
<h3>Artigos definidos</h3>
<div class="tw"><table class="tbl">
<tr><th></th><th>diante de consoante</th><th>s + consoante, z, gn, ps, x, y</th><th>diante de vogal</th></tr>
<tr><th>masc. sing.</th><td>il libro</td><td>lo studente, lo zaino, lo psicologo</td><td>l'amico</td></tr>
<tr><th>masc. pl.</th><td>i libri</td><td>gli studenti, gli zaini</td><td>gli amici</td></tr>
<tr><th>fem. sing.</th><td>la casa</td><td>la studentessa</td><td>l'amica</td></tr>
<tr><th>fem. pl.</th><td>le case</td><td>le studentesse</td><td>le amiche</td></tr>
</table></div>
<p>Indefinidos seguem a mesma lógica: <i>un libro, uno zaino, un amico</i> (sem apóstrofo no masculino!), <i>una casa, un'amica</i>.</p>
<h3>Preposições articuladas</h3>
<div class="tw"><table class="tbl c">
<tr><th></th><th>il</th><th>lo</th><th>l'</th><th>la</th><th>i</th><th>gli</th><th>le</th></tr>
<tr><th>di</th><td>del</td><td>dello</td><td>dell'</td><td>della</td><td>dei</td><td>degli</td><td>delle</td></tr>
<tr><th>a</th><td>al</td><td>allo</td><td>all'</td><td>alla</td><td>ai</td><td>agli</td><td>alle</td></tr>
<tr><th>da</th><td>dal</td><td>dallo</td><td>dall'</td><td>dalla</td><td>dai</td><td>dagli</td><td>dalle</td></tr>
<tr><th>in</th><td>nel</td><td>nello</td><td>nell'</td><td>nella</td><td>nei</td><td>negli</td><td>nelle</td></tr>
<tr><th>su</th><td>sul</td><td>sullo</td><td>sull'</td><td>sulla</td><td>sui</td><td>sugli</td><td>sulle</td></tr>
</table></div>
<p><i>Con</i> e <i>per</i> normalmente não se fundem: <i>con il treno, per la strada</i>.</p>
<h3>Partitivo: "um pouco de", "alguns"</h3>
<p><i>di</i> + artigo indica quantidade indeterminada: <i>Vorrei <b>del</b> pane</i> (quero pão), <i>Ho conosciuto <b>degli</b> studenti brasiliani</i> (alguns estudantes). Nas negativas some: <i>Non ho pane</i>.</p>
<h3>Possessivos levam artigo</h3>
<p>Como no português de Portugal: <i>il mio libro, la tua casa, i nostri amici</i>. Exceção: parentes no singular, sem adjetivo nem diminutivo → <i>mia madre, tuo fratello</i>. Mas: <i>i miei fratelli, la mia sorellina, la loro madre</i> (<i>loro</i> sempre com artigo).</p>
<div class="trap"><span class="pen">Attenzione!</span> Ir à casa ou ao consultório de alguém usa <b>da</b>: <i>vado dal medico, vado da Marco</i> (ES <i>al médico</i>, PT <i>ao médico</i>). Lugares "institucionais" usam <b>in</b> sem artigo: <i>in banca, in ufficio, in biblioteca, in centro, in montagna</i>. Cidades com <b>a</b> (<i>a Roma</i>), países com <b>in</b> (<i>in Italia</i>), países plurais com artigo (<i>negli Stati Uniti</i>).</div>
<div class="trap"><span class="pen">Per chi parla spagnolo</span> <b>lo</b> não é neutro: é artigo masculino (<i>lo zio</i>). E <b>gli</b> é o plural masculino, nada a ver com o <i>le</i> indireto do espanhol.</div>
`,
reading:{
title:'Sabato mattina a Bologna',
text:`<p>Il sabato mattina Giulia esce presto dalla sua casa in via Saragozza e va al mercato delle Erbe. Prima si ferma al bar sotto i [[portici|pórticos, arcadas]] e prende un cappuccino con una brioche. Al [[bancone|balcão]] c'è sempre lo stesso barista, un signore con gli occhiali che conosce tutti i clienti per nome. Poi entra nel mercato: compra del pane, delle [[albicocche|damascos]] e un po' di mortadella per il pranzo. Le piace parlare con i venditori, che le danno consigli sulle ricette e sulle stagioni della frutta.</p>
<p>Verso le undici passa dalla libreria vicino all'università, dove lavora sua sorella. Le due sorelle [[chiacchierano|conversam, batem papo]] dei loro progetti per l'estate: Giulia vorrebbe andare negli Stati Uniti, ma sua sorella preferisce le isole greche. Alla fine decidono di [[rimandare|adiar]] la discussione. A mezzogiorno Giulia torna a casa con lo zaino pieno e le gambe stanche, ma contenta: per lei il sabato è il giorno più bello della settimana.</p>`,
q:[
["Dove fa colazione Giulia?",["Al mercato","In un bar sotto i portici","A casa","In libreria"],1,"«Prima si ferma al bar sotto i portici e prende un cappuccino»."],
["Che cosa compra per il pranzo?",["Solo frutta","Pane, albicocche e mortadella","Un cappuccino e una brioche","Dei libri"],1,"Pane, albicocche e mortadella: note os partitivos del, delle."],
["Chi lavora in libreria?",["Il barista","Una venditrice","La sorella di Giulia","Giulia"],2,"«…la libreria vicino all'università, dove lavora sua sorella»."],
["Su che cosa non sono d'accordo le sorelle?",["Sul ristorante","Sulla destinazione delle vacanze","Sul lavoro","Sul mercato"],1,"Giulia quer ir aos Estados Unidos, a irmã prefere as ilhas gregas."],
["«Rimandare la discussione» significa…",["continuare a discutere","discuterne un'altra volta","litigare","dimenticare il problema"],1,"Rimandare = adiar."]
]},
ex:[
{t:'fill', title:'Completa con articolo o preposizione articolata', items:[
["Ho lasciato le chiavi ___ tavolo. (su)",["sul"],"su + il = sul"],
["Domani vado ___ dentista. (da)",["dal"],"Ir ao profissional = da + artigo."],
["Il treno parte ___ stazione centrale alle otto. (da)",["dalla"]],
["Abbiamo parlato ___ problemi della scuola. (di)",["dei"]],
["Vorrei ___ pane fresco, per favore. (partitivo)",["del"]],
["Ho conosciuto ___ studenti brasiliani. (partitivo)",["degli"],"studenti começa por s + consoante → gli → degli."],
["Il libro è ___ zaino. (in)",["nello"]],
["Ho regalato un fiore ___ zia di Marco. (a)",["alla"]],
["___ psicologo mi ha consigliato di riposare. (articolo)",["lo"]],
["Stasera ceno con ___ madre. (possessivo, 1ª persona)",["mia"],"Parente no singular: sem artigo."],
["Abito ___ Stati Uniti da tre anni. (in)",["negli"]],
["Ho messo il latte ___ frigo. (in)",["nel"]]
]},
{t:'mc', title:'Scegli la forma giusta', items:[
["Vado ___ medico perché ho la febbre.",["al","dal","nel"],1,"Profissionais e pessoas: da."],
["Lavoro ___ banca da cinque anni.",["nella","in","alla"],1,"In banca, in ufficio: sem artigo."],
["Qual è corretta?",["Il mio fratello vive a Milano.","Mio fratello vive a Milano.","Lo mio fratello vive a Milano."],1,"Parente no singular sem adjetivo: sem artigo."],
["Ho comprato ___ zaini nuovi.",["i","gli","le"],1],
["Quale frase è corretta?",["Loro madre è medico.","La loro madre è medico.","Sua loro madre è medico."],1,"Loro leva sempre artigo."],
["Ci vediamo ___ otto davanti al cinema.",["alle","sulle","nelle"],0,"Horas: alle otto, all'una."]
]},
{t:'fix', title:'Correggi la parte sottolineata', items:[
["Domani vado {al} dentista.",["dal"],"Domani vado dal dentista."],
["Ho visto {i} zii di Paolo alla festa.",["gli"],"Ho visto gli zii di Paolo alla festa."],
["Ho incontrato {un'amico} al bar.",["un amico"],"Ho incontrato un amico al bar."],
["Abitiamo {nella} Italia da due anni.",["in"],"Abitiamo in Italia da due anni."],
["{La mia} sorella studia medicina.",["mia"],"Mia sorella studia medicina."]
]}
],
write:{
task:'Descreva o seu bairro ou a sua cidade ideal: onde ficam as coisas, o que se compra, aonde você vai e com quem.',
words:[120,160],
targets:[
{l:'8 preposições articuladas', re:'<(dell\'|all\'|dall\'|nell\'|sull\'|(del|dello|della|dei|degli|delle|al|allo|alla|ai|agli|alle|dal|dallo|dalla|dai|dagli|dalle|nel|nello|nella|nei|negli|nelle|sul|sullo|sulla|sui|sugli|sulle)>)', n:8},
{l:'2 artigos lo / gli', re:'<(lo|gli)>', n:2},
{l:'1 "da" + pessoa ou profissional', manual:true}
],
model:`Nel mio quartiere ideale le case sono basse e colorate e le strade sono piene di alberi. Al centro della piazza c'è una fontana, e intorno ci sono dei piccoli negozi: il panettiere, il fruttivendolo e una libreria con gli scaffali fino al soffitto. La mattina vado al bar sotto casa e prendo un caffè al bancone. Il sabato faccio la spesa al mercato: compro del pane, delle verdure e un po' di formaggio dai contadini della zona. Quando sto male vado dal medico, che ha lo studio sopra la farmacia. Nel pomeriggio porto il cane al parco, sulla collina, dove si vedono i tetti di tutta la città. La sera ceno con mia madre o con gli amici in una trattoria nella via principale.`
}
},

/* ───────────────────────── UNITÀ 2 ───────────────────────── */
{
id:2, lvl:'A2 → B1', band:0,
title:'Passato prossimo: essere o avere?',
sub:'O erro número 1 de quem fala espanhol e português.',
focus:'passato prossimo, scelta dell\'ausiliare essere/avere, accordo del participio, participi irregolari',
lesson:`
<p class="lead">Espanhol e português usam um só auxiliar (<i>haber</i>, <i>ter</i>). O italiano usa dois, e escolher o errado soa imediatamente estrangeiro. A boa notícia: a regra é bastante previsível.</p>
<h3>Quem usa <b>essere</b></h3>
<ul class="dots">
<li>Verbos de movimento com destino ou origem: <i>andare, venire, arrivare, partire, uscire, entrare, tornare, cadere</i>.</li>
<li>Mudança de estado: <i>nascere, morire, diventare, crescere, invecchiare, aumentare, dimagrire</i>.</li>
<li>Estado/permanência: <i>essere, stare, restare, rimanere</i>.</li>
<li>Todos os reflexivos: <i>mi sono svegliata, ci siamo divertiti</i>.</li>
<li><i>piacere, sembrare, succedere, costare, bastare, mancare, durare, servire</i>.</li>
</ul>
<p>Os transitivos (com objeto direto) usam <b>avere</b>: <i>ho mangiato, ho visto, ho scritto</i>. Também alguns intransitivos de atividade: <i>ho dormito, ho camminato, ho lavorato, ho viaggiato</i>.</p>
<h3>Concordância do particípio</h3>
<p>Com <b>essere</b>, o particípio concorda com o sujeito: <i>Maria è andat<b>a</b>, le ragazze sono uscit<b>e</b>, i prezzi sono aumentat<b>i</b></i>. Com <b>avere</b>, fica invariável: <i>Maria ha mangiat<b>o</b></i> (ver unidade 4 para a exceção com pronomes).</p>
<h3>Verbos com os dois auxiliares</h3>
<p>Mudam conforme tenham objeto: <i>Ho finito il lavoro</i> / <i>Il film è finito</i>; <i>Ho salito le scale</i> / <i>Sono salita sul treno</i>; <i>Ho cambiato casa</i> / <i>Sei cambiata tanto!</i> Igual para <i>cominciare, passare, correre, scendere</i>.</p>
<h3>Particípios irregulares que mais aparecem</h3>
<div class="chips">fatto · detto · scritto · letto · preso · messo · visto · aperto · chiuso · chiesto · risposto · rimasto · scelto · spento · acceso · vinto · perso · corso · nato · morto · vissuto · successo · rotto · deciso · sceso · offerto · speso · tradotto · promesso · discusso</div>
<div class="trap"><span class="pen">Attenzione!</span> <i>Mi è piaciuto il film / Mi sono piaciuti i film</i>: o particípio concorda com aquilo que agrada, que é o sujeito gramatical.</div>
<div class="plus"><span class="pen">Vantaggio</span> Uso: no norte e no italiano padrão, o <i>passato prossimo</i> cobre o nosso pretérito perfeito simples (<i>ieri ho fatto</i> = ontem fiz). O <i>passato remoto</i> fica para textos escritos e para o Sul (unidade 12).</div>
`,
reading:{
title:'Un weekend andato storto',
text:`<p>Venerdì sera io e Marco siamo partiti per Torino in treno. Il viaggio è cominciato male: vicino a Milano il treno si è fermato per due ore per un [[guasto|avaria, defeito]]. Siamo arrivati in albergo dopo mezzanotte e il receptionist ci ha detto che la nostra camera non era più disponibile. Alla fine ci hanno dato una stanza piccolissima, vicino all'ascensore.</p>
<p>Il sabato, per fortuna, è andato meglio. Abbiamo visitato il Museo Egizio, abbiamo passeggiato lungo il Po e abbiamo mangiato in una trattoria che ci ha consigliato un amico. Marco ha ordinato il vitello tonnato, io ho scelto gli agnolotti. Domenica mattina, però, è successa un'altra cosa: ho lasciato il telefono sul tavolo della colazione e me ne sono [[accorta|percebi (accorgersi)]] solo in stazione. Sono tornata di corsa in albergo e, per fortuna, una cameriera l'aveva già consegnato alla reception. Abbiamo preso il treno delle undici [[per un pelo|por um triz]].</p>`,
q:[
["Perché sono arrivati tardi a Torino?",["Hanno perso il treno","Il treno si è fermato per un guasto","Hanno sbagliato albergo","Si sono persi"],1],
["Che problema c'è stato in albergo?",["Era chiuso","La camera prenotata non era disponibile","Non c'era l'ascensore","Era troppo caro"],1],
["Chi ha consigliato la trattoria?",["Il receptionist","Un amico","Marco","Una cameriera"],1],
["Chi racconta la storia?",["Marco","Una donna","Il receptionist","Non si può sapere"],1,"«me ne sono accorta», «sono tornata»: a concordância do particípio revela que quem narra é mulher."],
["«Per un pelo» significa…",["con calma","quasi non ce l'hanno fatta","in anticipo","per sbaglio"],1]
]},
ex:[
{t:'fill', title:'Coniuga al passato prossimo', items:[
["Ieri Marta ___ con le colleghe. (uscire)",["è uscita"]],
["Noi ___ troppo alla festa. (mangiare)",["abbiamo mangiato"]],
["Le mie amiche ___ in ritardo. (arrivare)",["sono arrivate"]],
["Quanto ___ il biglietto? (costare)",["è costato"],"costare usa essere."],
["Il concerto ___ a mezzanotte. (finire)",["è finito"],"Sem objeto → essere."],
["Chi ___ questa lettera? (scrivere)",["ha scritto"]],
["Mi ___ molto il film. (piacere)",["è piaciuto"]],
["Stamattina io (f.) ___ alle sei. (svegliarsi)",["mi sono svegliata"]],
["Paolo ___ a Londra per dieci anni. (vivere)",["ha vissuto","è vissuto"],"vivere aceita os dois auxiliares."],
["Che cosa ___ ? (succedere)",["è successo"]],
["I prezzi ___ molto quest'anno. (aumentare)",["sono aumentati"]],
["Noi ___ le scale a piedi. (salire)",["abbiamo salito"],"Com objeto (le scale) → avere."]
]},
{t:'mc', title:'Scegli la risposta giusta', items:[
["Abbiamo ___ le scale a piedi.",["salito","saliti","salite"],0,"Com avere o particípio não concorda."],
["Il film ___ alle dieci.",["ha cominciato","è cominciato"],1],
["Le ragazze si sono ___ molto.",["divertito","divertite","divertiti"],1],
["Quante ore ___ il viaggio?",["ha durato","è durato"],1],
["Ho ___ il libro sul tavolo.",["mettuto","messo","misso"],1],
["Ieri ___ dodici chilometri.",["ho camminato","sono camminato"],0,"Atividade sem destino → avere."]
]},
{t:'fix', title:'Correggi la parte sottolineata', items:[
["Ieri {ho andato} al cinema con Luca.",["sono andato","sono andata"],"Ieri sono andato/a al cinema con Luca."],
["Maria è {nato} a Napoli.",["nata"],"Maria è nata a Napoli."],
["Abbiamo {apriti} la finestra.",["aperto"],"Abbiamo aperto la finestra."],
["Mi {è piaciuta} molto i tuoi biscotti.",["sono piaciuti"],"Mi sono piaciuti molto i tuoi biscotti."],
["Gli studenti {hanno arrivato} tardi.",["sono arrivati"],"Gli studenti sono arrivati tardi."],
["{Ho rimasto} a casa tutto il giorno.",["sono rimasto","sono rimasta"],"Sono rimasto/a a casa tutto il giorno."]
]}
],
write:{
task:'Conte uma viagem ou um fim de semana em que algo deu errado. Sequência de fatos, do começo ao fim.',
words:[130,170],
targets:[
{l:'6 tempos compostos com essere', re:'<(sono|sei|è|siamo|siete)\\s+(W+\\s+)?W+(at|ut|it|st|rt|nat|mort)[oaie]>', n:6},
{l:'3 particípios irregulares', re:'<(fatt|dett|scritt|lett|pres|mess|vist|apert|chius|chiest|rispost|rimast|scelt|spent|acces|vint|pers|cors|nat|mort|vissut|success|rott|decis|sces|offert|spes|promess|tradott|discuss)[oaie]>', n:3},
{l:'1 verbo reflexivo no passado', re:'<(mi|ti|si|ci|vi)\\s+(sono|sei|è|siamo|siete)>', n:1}
],
model:`L'estate scorsa io e mia sorella siamo andate a Napoli per un weekend. Siamo partite venerdì mattina, ma il volo è partito con tre ore di ritardo. Quando siamo arrivate, abbiamo scoperto che la valigia di mia sorella non c'era: è rimasta a Roma! Abbiamo compilato un modulo all'aeroporto e poi abbiamo preso un taxi per il centro. La sera ci siamo consolate con una pizza enorme in una pizzeria di via dei Tribunali. Il sabato è stato bellissimo: abbiamo visto il Cristo Velato, abbiamo fatto una passeggiata sul lungomare e siamo salite al Vomero con la funicolare. Domenica, però, è cominciato a piovere e siamo rimaste in albergo quasi tutto il giorno. La valigia è arrivata un'ora prima della partenza. Alla fine ci siamo divertite lo stesso.`
}
},

/* ───────────────────────── UNITÀ 3 ───────────────────────── */
{
id:3, lvl:'A2 → B1', band:0,
title:'Imperfetto, passato prossimo e trapassato',
sub:'Contar histórias: cenário, ação e o que tinha acontecido antes.',
focus:'contrasto imperfetto / passato prossimo, trapassato prossimo, stare + gerundio, verbi che cambiano significato (sapere, conoscere, dovere)',
lesson:`
<p class="lead">Aqui você já joga em casa: a lógica imperfeito/perfeito é a mesma do espanhol e do português. A diferença é só que o "perfeito" italiano é composto (<i>ho fatto</i> = fiz).</p>
<div class="tw"><table class="tbl">
<tr><th>Imperfetto</th><th>Passato prossimo</th></tr>
<tr><td>cenário, descrição: <i>Era tardi e pioveva</i></td><td>ação concluída: <i>È arrivato alle dieci</i></td></tr>
<tr><td>hábito: <i>Da piccola andavo al mare</i></td><td>vez única ou contada: <i>Ci sono andata tre volte</i></td></tr>
<tr><td>ação em curso interrompida: <i>Mentre cucinavo…</i></td><td>…a interrupção: <i>…è suonato il telefono</i></td></tr>
<tr><td>duração sem limite</td><td>duração delimitada: <i>Ha piovuto tutto il giorno</i></td></tr>
</table></div>
<h3>Formas</h3>
<p>-<b>avo</b>/-<b>evo</b>/-<b>ivo</b>, -vi, -va, -vamo, -vate, -vano. Irregulares: <i>essere → ero, eri, era, eravamo, eravate, erano</i>; <i>fare → facevo</i>; <i>dire → dicevo</i>; <i>bere → bevevo</i>; <i>tradurre → traducevo</i>.</p>
<p><b>Stare + gerundio</b> no imperfetto para ação em andamento: <i>Stavo uscendo quando mi hai chiamato.</i></p>
<h3>Trapassato prossimo: o passado do passado</h3>
<p>Imperfetto de <i>avere/essere</i> + particípio: <i>Quando siamo arrivati, il treno <b>era già partito</b></i>. Corresponde ao PT <i>tinha partido</i> e ao ES <i>había salido</i>, com a mesma escolha de auxiliar da unidade 2.</p>
<h3>Verbos que mudam de sentido</h3>
<div class="tw"><table class="tbl">
<tr><th></th><th>imperfetto</th><th>passato prossimo</th></tr>
<tr><th>sapere</th><td><i>Sapevo</i> = já sabia</td><td><i>Ho saputo</i> = fiquei sabendo</td></tr>
<tr><th>conoscere</th><td><i>Conoscevo Anna</i> = já a conhecia</td><td><i>Ho conosciuto Anna</i> = fui apresentada a ela</td></tr>
<tr><th>dovere</th><td><i>Dovevo partire</i> = era para partir (talvez não tenha ido)</td><td><i>Sono dovuta partire</i> = tive que partir (e parti)</td></tr>
<tr><th>potere</th><td><i>Potevo aiutarti</i> = teria sido possível</td><td><i>Ho potuto aiutarti</i> = consegui</td></tr>
</table></div>
<div class="trap"><span class="pen">Attenzione!</span> Duração até o presente usa <b>presente + da</b>: <i>Conosco Paolo da dieci anni</i>, <i>Studio italiano da tre mesi</i>. Não use passato prossimo aqui.</div>
`,
reading:{
title:'La sera che andò via la luce',
text:`<p>Quando ero bambina passavo tutte le estati dalla nonna, in un paesino dell'Abruzzo. La casa era vecchia e un po' umida, ma aveva un giardino enorme con un [[fico|figueira]] e un [[pozzo|poço]] che non funzionava più. La mattina la nonna si alzava prima dell'alba, preparava il caffè con la moka e poi andava a lavorare nell'[[orto|horta]]. Io invece dormivo fino a tardi e, quando scendevo in cucina, trovavo sempre una fetta di pane con la marmellata di fichi.</p>
<p>Un'estate, però, è successa una cosa che non ho mai dimenticato. Era una sera di agosto e faceva un caldo terribile. Stavamo cenando in giardino quando all'improvviso è andata via la luce in tutto il paese. Io avevo paura del buio, ma la nonna ha acceso una candela, ha preso la [[fisarmonica|acordeão, sanfona]] che il nonno le aveva regalato da giovane e ha cominciato a suonare. In pochi minuti sono arrivati i vicini, ognuno con qualcosa da mangiare o da bere. Abbiamo ballato fino a mezzanotte. Ancora oggi, quando manca la luce, penso a quella sera.</p>`,
q:[
["Che cosa faceva la nonna ogni mattina?",["Dormiva fino a tardi","Faceva il caffè e lavorava nell'orto","Suonava la fisarmonica","Andava al mercato"],1],
["Perché la narratrice era spaventata?",["Per un temporale","Aveva paura del buio","Per i vicini","Per il caldo"],1],
["Chi aveva regalato la fisarmonica alla nonna?",["La nipote","I vicini","Il nonno","Nessuno"],2],
["Perché si usa l'imperfetto in «faceva un caldo terribile»?",["È un'azione puntuale","Descrive lo sfondo della scena","È un'azione futura","È un errore"],1],
["Quale fatto è anteriore a tutti gli altri del racconto?",["La nonna ha acceso una candela","Il nonno le aveva regalato la fisarmonica","Sono arrivati i vicini","Abbiamo ballato"],1,"O trapassato (aveva regalato) marca o fato mais antigo."]
]},
ex:[
{t:'fill', title:'Imperfetto, passato prossimo o trapassato?', items:[
["Quando ___ piccola, ___ in campagna. (essere / abitare)",[["ero"],["abitavo"]]],
["Mentre ___ la doccia, ___ il telefono. (fare, io / suonare)",[["facevo"],["è suonato","ha suonato"]]],
["Ieri ___ tutto il giorno. (piovere)",["è piovuto","ha piovuto"],"Duração delimitada → passato prossimo; piovere aceita os dois auxiliares."],
["Da bambino Luca ___ sempre il latte prima di dormire. (bere)",["beveva"]],
["Quando siamo arrivati, il treno ___ già ___ . (partire)",[["era"],["partito"]]],
["Non ___ che avessi una sorella: l'ho scoperto ieri. (sapere, io)",["sapevo"]],
["Ieri ___ i genitori di Anna: sono simpaticissimi! (conoscere, io)",["ho conosciuto"]],
["___ uscendo quando mi hai chiamato. (stare, io)",["stavo"]],
["Gli ho restituito il libro che mi ___ l'anno prima. (prestare)",["aveva prestato"]],
["Che tempo ___ quando siete partiti? (fare)",["faceva"]],
["Studio italiano ___ tre mesi.",["da"],"Duração até hoje: presente + da."]
]},
{t:'mc', title:'Scegli la risposta giusta', items:[
["Ieri sera ero stanca, così ___ a letto presto.",["andavo","sono andata"],1],
["Quando vivevo a Roma, ___ ogni mattina al bar.",["sono andata","andavo"],1,"Hábito."],
["«Ho saputo la notizia» significa:",["la sapevo da tempo","l'ho scoperta in quel momento"],1],
["«Dovevo partire alle otto, ma…» implica che:",["sono partito alle otto","probabilmente non sono partito alle otto"],1],
["Era la prima volta che ___ il mare.",["vedevo","ho visto","vedrò"],0],
["Quando sono arrivata, Marco ___ già ___ .",["è / uscito","era / uscito","ha / uscito"],1]
]},
{t:'fix', title:'Correggi la parte sottolineata', items:[
["Quando ero piccolo, {sono andato} spesso dai nonni.",["andavo"],"Quando ero piccolo, andavo spesso dai nonni."],
["Ieri {facevo} una passeggiata di tre ore.",["ho fatto"],"Ieri ho fatto una passeggiata di tre ore."],
["Mentre {ho cucinato}, è arrivato Paolo.",["cucinavo"],"Mentre cucinavo, è arrivato Paolo."],
["Quando sono arrivata, la festa {è già finita}.",["era già finita"],"Quando sono arrivata, la festa era già finita."],
["{Ho conosciuto} Paolo da anni: siamo amici d'infanzia.",["conosco"],"Conosco Paolo da anni: siamo amici d'infanzia."]
]}
],
write:{
task:'Conte uma lembrança de infância: primeiro o cenário (como era, o que se fazia sempre), depois um acontecimento preciso.',
words:[150,190],
targets:[
{l:'6 verbos no imperfetto', re:'<W+(avo|evo|ivo|ava|eva|iva|avamo|evamo|ivamo|avano|evano|ivano)>|<(ero|eri|era|eravamo|erano)>', n:6},
{l:'3 verbos no passato prossimo', re:'<(ho|hai|ha|abbiamo|avete|hanno|sono|sei|è|siamo|siete)\\s+(W+\\s+)?W+(at|ut|it|tt|st|rt|s)[oaie]>', n:3},
{l:'1 trapassato prossimo', re:'<(avevo|avevi|aveva|avevamo|avevate|avevano|ero|eri|era|eravamo|eravate|erano)\\s+(già\\s+|mai\\s+)?W+(at|ut|it|tt|st|rt)[oaie]>', n:1},
{l:'1 stavo + gerúndio', re:'<(stavo|stavi|stava|stavamo|stavate|stavano)\\s+W+(ando|endo)>', n:1}
],
model:`Quando avevo otto anni abitavo in una piccola città vicino al mare. Ogni domenica mio padre ci portava in spiaggia con una vecchia macchina rossa che faceva un rumore terribile. Mia madre preparava i panini con la frittata e mio fratello e io litigavamo per tutto il viaggio. La spiaggia era quasi sempre vuota e l'acqua era freddissima, ma a noi non importava. Una domenica di settembre, però, è successa una cosa strana. Stavamo costruendo un castello di sabbia quando mio fratello ha trovato una bottiglia con un messaggio dentro. L'abbiamo aperta con le mani che tremavano. Dentro c'era una lettera scritta in francese: una bambina di Marsiglia l'aveva buttata in mare due anni prima. Le abbiamo risposto e per molti anni siamo rimaste amiche di penna. Ancora oggi, quando vedo una bottiglia sulla spiaggia, mi fermo a guardarla.`
}
},

/* ───────────────────────── UNITÀ 4 ───────────────────────── */
{
id:4, lvl:'B1', band:0,
title:'Pronomi diretti, indiretti e combinati',
sub:'Glielo, me ne, te la: o italiano adora juntar pronomes.',
focus:'pronomi diretti (lo, la, li, le), indiretti (gli, le, Le), pronomi combinati (me lo, glielo), posizione, accordo del participio con lo/la/li/le',
lesson:`
<div class="tw"><table class="tbl">
<tr><th></th><th>direto</th><th>indireto</th><th>combinado com lo / la / li / le / ne</th></tr>
<tr><th>io</th><td>mi</td><td>mi</td><td><b>me</b> lo, me la, me ne</td></tr>
<tr><th>tu</th><td>ti</td><td>ti</td><td><b>te</b> lo, te la, te ne</td></tr>
<tr><th>lui</th><td>lo</td><td>gli</td><td><b>glielo</b>, gliela, glieli, gliele, gliene</td></tr>
<tr><th>lei / Lei</th><td>la / La</td><td>le / Le</td><td><b>glielo</b>, gliela… (iguais!)</td></tr>
<tr><th>noi</th><td>ci</td><td>ci</td><td><b>ce</b> lo, ce la, ce ne</td></tr>
<tr><th>voi</th><td>vi</td><td>vi</td><td><b>ve</b> lo, ve la, ve ne</td></tr>
<tr><th>loro</th><td>li / le</td><td>gli (loro, formal, depois do verbo)</td><td><b>glielo</b>…</td></tr>
</table></div>
<p>O indireto vem <b>primeiro</b> e o <i>i</i> vira <i>e</i>: <i>mi + lo → me lo</i>. Com <i>gli/le</i> tudo vira uma palavra só: <i>Il libro? <b>Gliel'</b>ho dato</i> (a ele, a ela ou a eles).</p>
<h3>Posição</h3>
<ul class="dots">
<li>Antes do verbo conjugado: <i>Lo vedo domani. Te lo dico.</i></li>
<li>Colado ao infinitivo, gerúndio e imperativo (tu/noi/voi): <i>Voglio veder<b>lo</b>, vedendo<b>lo</b>, guarda<b>lo</b>!</i></li>
<li>Com verbos modais, as duas posições: <i>Lo voglio vedere = Voglio vederlo</i>.</li>
</ul>
<h3>Concordância com o particípio</h3>
<p>Com <i>lo, la, li, le</i> antes do <i>avere</i>, o particípio concorda: <i>La torta? L'ho mangiat<b>a</b>. Le chiavi? Le ho pres<b>e</b>.</i> Com <i>ne</i> também: <i>Di mele, ne ho mangiat<b>e</b> tre.</i></p>
<div class="trap"><span class="pen">Per chi parla spagnolo</span> o <i>le</i> indireto espanhol corresponde a <b>gli</b> (masc.) ou <b>le</b> (fem.). E o <i>se lo</i> espanhol vira <b>glielo</b>: <i>se lo di → gliel'ho dato</i>.</div>
<div class="trap"><span class="pen">Per chi parla portoghese</span> não existe próclise/ênclise livre: com verbo conjugado o pronome vem sempre antes (<i>Ti amo</i>, nunca "amo-ti"). E <i>lhe</i> → <i>gli/le</i>.</div>
`,
reading:{
title:'Il trasloco',
text:`<p>Cara Elisa,<br>ti scrivo perché finalmente il [[trasloco|mudança]] è finito! Ti ricordi i libri che mi avevi prestato a febbraio? Li ho ritrovati in uno [[scatolone|caixa grande de papelão]] in cantina: te li riporto sabato, promesso. Anche la lampada di tua zia è [[saltata fuori|apareceu]]: gliela restituisco io, così la saluto.</p>
<p>Il nuovo appartamento mi piace tantissimo, anche se i vicini sono un po' strani. Quello del terzo piano, per esempio, mi ha chiesto se potevo prestargli il [[trapano|furadeira]]. Gliel'ho dato senza problemi, ma sono passate due settimane e non me l'ha ancora riportato. Ieri l'ho incontrato sulle scale e gliel'ho ricordato con gentilezza: mi ha risposto che me lo restituisce «appena finisce i lavori». Vedremo!</p>
<p>Sabato vieni alla festa di inaugurazione? Ho invitato anche Matteo e Sara, ma non mi hanno ancora risposto. Se li senti, ricordaglielo tu, per favore.<br>Un abbraccio,<br>Chiara</p>`,
q:[
["Che cosa riporterà Chiara a Elisa?",["La lampada","I libri","Il trapano","Uno scatolone"],1],
["A chi restituirà la lampada?",["A Elisa","Alla zia di Elisa","Al vicino","A Matteo"],1,"«gliela restituisco io, così la saluto» — gliela = la lampada a lei (la zia)."],
["In «non me l'ha ancora riportato», «l'» si riferisce a…",["il trapano","la lampada","un libro","il vicino"],0],
["Che cosa chiede Chiara a Elisa alla fine?",["Di portare dei libri","Di ricordare la festa a Matteo e Sara","Di parlare con il vicino","Di aiutarla con il trasloco"],1],
["«Ricordaglielo» significa:",["ricorda a loro la festa","ricordati di loro","ricorda me a loro","ricordalo a me"],0]
]},
ex:[
{t:'fill', title:'Completa con il pronome', items:[
["Hai visto Marta? Sì, ___ ho vista ieri.",["l'"]],
["Hai comprato le mele? Sì, ___ ho comprate.",["le"]],
["Hai telefonato a Paolo? No, ___ telefono stasera.",["gli"]],
["Hai scritto alla professoressa? Sì, ___ ho scritto un'email.",["le"]],
["Mi presti la bici? Sì, ___ presto volentieri.",["te la"]],
["Hai dato il libro a Luca? Sì, ___ ho dato.",["gliel'","glielo"]],
["Chi ti ha regalato quegli orecchini? ___ ha regalati mia madre.",["me li"]],
["Puoi spiegare la regola a noi? Certo, ___ spiego subito.",["ve la"]],
["Devo restituire le chiavi alla signora: ___ restituisco domani.",["gliele"]],
["Le foto? Voglio ___ prima di stamparle. (vedere)",["vederle"]],
["Quante pizze avete ordinato? ___ abbiamo ordinate quattro.",["ne"]],
["La verità? Non ___ hanno ancora detta. (a noi)",["ce l'","ce la"]]
]},
{t:'mc', title:'Scegli la risposta giusta', items:[
["Hai detto la verità a tua madre? Sì, ___ ho detta.",["gliel'","glie l'","le la"],0],
["Queste scarpe? ___ ho pagate ottanta euro.",["Le","Li","Gli"],0],
["Signora, ___ posso offrire un caffè?",["La","Le","Gli"],1,"offrire a qualcuno → indireto; Lei formal → Le."],
["Quanti biscotti hai mangiato? ___ ho mangiati cinque.",["Li","Ne","Ce"],1],
["Sto cercando Luca, ma non ___ trovo.",["gli","lo","le"],1],
["Il regalo per i bambini? ___ porto domani.",["Glielo","Se lo","Gli lo"],0]
]},
{t:'fix', title:'Correggi la parte sottolineata', items:[
["Ho visto Anna e {gli} ho detto ciao.",["le"],"Ho visto Anna e le ho detto ciao."],
["I documenti? {Gli} ho già spediti.",["li"],"I documenti? Li ho già spediti."],
["Questa canzone? L'ho {sentito} mille volte.",["sentita"],"Questa canzone? L'ho sentita mille volte."],
["Il regalo per Paolo? {Se lo} ho dato ieri.",["gliel'","glielo"],"Il regalo per Paolo? Gliel'ho dato ieri."],
["Mi passi il sale? Sì, {ti lo} passo.",["te lo"],"Mi passi il sale? Sì, te lo passo."]
]}
],
write:{
task:'Escreva um e-mail a uma amiga: você devolve coisas, pede favores e conta a quem emprestou ou deu o quê.',
words:[120,160],
targets:[
{l:'4 pronomes combinados', re:'<(me|te|ce|ve|se)\\s+(lo|la|li|le|ne)>|glie(lo|la|li|le|ne)>|gliel\'', n:4},
{l:'2 pronomes colados a infinitivo/imperativo', manual:true},
{l:'1 particípio concordado com lo/la/li/le', manual:true}
],
model:`Ciao Bea,\nti ricordi la giacca che mi avevi prestato per il matrimonio di Luca? Te la riporto giovedì, l'ho portata in lavanderia ieri. Anche il libro di cucina di tua madre è qui: gliel'ho promesso per Natale, ma se lo vedi prima diglielo tu che non l'ho perso! Ti devo chiedere un favore: mi presti la tua valigia grande per il viaggio a Lisbona? Se me la dai sabato, te la restituisco il 20. Ah, ho finalmente trovato le foto della gita in montagna: le ho stampate tutte e te ne ho messe da parte cinque. Volevo mandarle anche a Marco, ma non ho il suo indirizzo. Me lo puoi scrivere? Grazie mille, un abbraccio!\nGiulia`
}
},

/* ───────────────────────── UNITÀ 5 ───────────────────────── */
{
id:5, lvl:'B1', band:0,
title:'Ci e ne',
sub:'Duas palavrinhas sem equivalente em espanhol e português.',
focus:'particella ci (luogo, a/su qualcosa), particella ne (partitivo, di/da qualcosa), verbi pronominali volerci, metterci, farcela, andarsene, entrarci',
lesson:`
<p class="lead">Quem sabe francês reconhece <i>y</i> e <i>en</i>. Para nós, <b>ci</b> e <b>ne</b> são a maior novidade do italiano intermediário, e omiti-los é o que mais denuncia o falante de espanhol/português.</p>
<h3>CI</h3>
<ul class="dots">
<li><b>Lugar</b> (= lá, aí): <i>Vai a Roma? Sì, <b>ci</b> vado domani.</i> <i>Ci sono stata due volte.</i></li>
<li><b>a / su + coisa</b>: <i>Pensi al viaggio? Sì, <b>ci</b> penso sempre.</i> <i>Non <b>ci</b> credo! Ci conto.</i></li>
<li><b>Esserci</b>: <i>c'è, ci sono</i> (há, existe).</li>
</ul>
<h3>NE</h3>
<ul class="dots">
<li><b>Partitivo</b> (quantidade): <i>Quanti figli hai? <b>Ne</b> ho due.</i> <i>Vuoi del vino? No, grazie, non <b>ne</b> voglio.</i></li>
<li><b>di + coisa</b>: <i>Che <b>ne</b> pensi?</i> (o que você acha disso?) <i><b>Ne</b> parliamo dopo.</i></li>
<li><b>da + lugar</b>: <i>Sono entrata in banca e <b>ne</b> sono uscita dopo un'ora.</i></li>
</ul>
<h3>Verbos com ci / ne que você vai ouvir sempre</h3>
<div class="tw"><table class="tbl">
<tr><td><b>volerci</b></td><td>levar / ser preciso (impessoal)</td><td><i>Ci vuole un'ora. Ci vogliono due ore.</i></td></tr>
<tr><td><b>metterci</b></td><td>demorar (alguém)</td><td><i>Ci metto venti minuti a piedi.</i></td></tr>
<tr><td><b>farcela</b></td><td>conseguir, dar conta</td><td><i>Ce la faccio! Non ce la faccio più.</i></td></tr>
<tr><td><b>andarsene</b></td><td>ir embora</td><td><i>Me ne vado. Se n'è andata.</i></td></tr>
<tr><td><b>entrarci</b></td><td>ter a ver</td><td><i>Questo non c'entra niente.</i></td></tr>
<tr><td><b>starci</b></td><td>aceitar, topar</td><td><i>Una pizza stasera? Ci sto!</i></td></tr>
<tr><td><b>fregarsene</b></td><td>não estar nem aí (coloquial)</td><td><i>Me ne frego.</i></td></tr>
</table></div>
<div class="trap"><span class="pen">Attenzione!</span> "Tenho dois" não existe sem <b>ne</b>: <i>Ho due</i> ✗ → <i><b>Ne</b> ho due</i> ✓. E "levar tempo": <i>ci vuole</i> (impessoal) ≠ <i>ci metto</i> (eu demoro).</div>
<div class="plus"><span class="pen">Combinações</span> <i>ci + ne → ce n'è, ce ne sono</i>; <i>mi + ne → me ne</i>; <i>ci + la → ce la</i>.</div>
`,
reading:{
title:'Il paese che si svuota',
text:`<p>In Italia ci sono migliaia di piccoli comuni che rischiano di sparire. A Pietrabianca (nome inventato), sull'Appennino, quarant'anni fa gli abitanti erano duemila; oggi ce ne sono meno di trecento, e quasi la metà ha più di sessantacinque anni. I giovani se ne vanno perché il lavoro non c'è e per arrivare all'università più vicina ci vogliono due ore di autobus.</p>
<p>Il sindaco, però, non ci sta. Tre anni fa ha lanciato un'iniziativa che ha fatto parlare di sé anche all'estero: vendere le case abbandonate a un euro, a condizione che chi le compra le [[ristrutturi|reforme]] entro tre anni. «All'inizio nessuno ci credeva», racconta. «Poi sono arrivate centinaia di richieste. Ne abbiamo accettate una quarantina». Tra i nuovi abitanti ci sono una coppia di architetti olandesi, un programmatore che lavora da remoto e una famiglia argentina con tre bambini.</p>
<p>Non tutti ce l'hanno fatta: ristrutturare costa molto più di quanto molti immaginavano. Ma la scuola elementare, che doveva chiudere, l'anno scorso ha riaperto con dodici alunni. «Non è molto», ammette il sindaco, «ma ci basta per ricominciare a sperare».</p>`,
q:[
["Quanti abitanti ha oggi Pietrabianca?",["Duemila","Meno di trecento","Cinquemila","Quaranta"],1],
["Perché i giovani se ne vanno?",["Le case costano troppo","Mancano lavoro e servizi vicini","Non amano la montagna","Il sindaco li manda via"],1],
["«Il sindaco non ci sta» significa che il sindaco…",["non è in paese","non accetta la situazione","non sta bene","non ha tempo"],1],
["In «Ne abbiamo accettate una quarantina», «ne» sostituisce:",["delle case","delle richieste","degli abitanti","dei comuni"],1,"O particípio concorda: accettate (richieste, fem. pl.)."],
["Quale risultato positivo cita il testo?",["Tutti hanno ristrutturato","La scuola elementare ha riaperto","Il paese ha di nuovo duemila abitanti","L'autobus è più veloce"],1],
["«Non tutti ce l'hanno fatta» vuol dire che…",["alcuni non sono riusciti","alcuni non sono arrivati","tutti hanno finito i lavori","alcuni hanno venduto la casa"],0]
]},
ex:[
{t:'fill', title:'Ci, ne o una combinazione?', items:[
["Vai spesso a Napoli? Sì, ___ vado ogni mese.",["ci"]],
["Quanti fratelli hai? ___ ho tre.",["ne"]],
["Che cosa pensi del nuovo progetto? Che cosa ___ pensi?",["ne"]],
["Per arrivare a Milano ___ vogliono tre ore.",["ci"]],
["Quanto tempo ___ metti per prepararti la mattina?",["ci"]],
["Sono stanchissima: ___ vado a casa.",["me ne"]],
["È difficile, ma ___ la faccio!",["ce"]],
["Hai pensato alla mia proposta? Sì, ___ ho pensato molto.",["ci"]],
["Di pasta, ___ hai comprata abbastanza?",["ne"]],
["Questo non ___ entra niente con la nostra discussione.",["c'"]],
["Quante uova ci sono in frigo? ___ sono sei.",["ce ne"]],
["Gli ospiti ___ sono andati a mezzanotte.",["se ne"]]
]},
{t:'mc', title:'Scegli la risposta giusta', items:[
["Per fare il tiramisù ___ quattro uova.",["ci vuole","ci vogliono"],1],
["«Non ce la faccio più» significa:",["non lo faccio più","non riesco più a continuare","non ci vado più"],1],
["Quante sigarette fumi? Non ___ fumo nessuna.",["ci","ne","la"],1],
["Sei mai stata in Sicilia? No, non ___ sono mai stata.",["ne","ci","la"],1],
["Parliamo di politica? No, non ___ voglio parlare.",["ci","ne","lo"],1,"parlare di → ne."],
["Io ___ metto un'ora ad arrivare in ufficio.",["ci","ne","mi"],0]
]},
{t:'fix', title:'Correggi la parte sottolineata', items:[
["Hai figli? Sì, {ho} due.",["ne ho"],"Hai figli? Sì, ne ho due."],
["Vieni al cinema? No, non {ne} vengo.",["ci"],"Vieni al cinema? No, non ci vengo."],
["Quanto tempo {ci vuoi} per finire?",["ci metti"],"Quanto tempo ci metti per finire?"],
["Sono stufa, {mi vado}!",["me ne vado"],"Sono stufa, me ne vado!"],
["Di questo problema {ci} parliamo domani.",["ne"],"Di questo problema ne parliamo domani."]
]}
],
write:{
task:'Você comprou uma casa por um euro num vilarejo italiano. Escreva um post de blog: por que foi, quanto tempo levou para chegar e reformar, o que você acha disso hoje.',
words:[140,180],
targets:[
{l:'4 usos de ci', re:'<(ci|ce)>|<c\'', n:4},
{l:'4 usos de ne', re:'<ne>|<n\'', n:4},
{l:'volerci ou metterci', re:'<(ci|ce)\\s+(vuole|vogliono|voleva|volevano|è voluto|sono voluti|metto|metti|mette|mettiamo|mettete|mettono|ho messo|hai messo|ha messo|abbiamo messo|hanno messo)', n:1}
],
model:`Due anni fa ho comprato una casa a un euro a Castelluccio, un paesino in Molise. Ci sono arrivata per caso: ne avevo letto in un articolo e ci ho pensato per mesi prima di decidere. Per arrivarci da Roma ci vogliono quasi tre ore di macchina, e l'ultima mezz'ora è tutta curve. La casa era un disastro: c'era un buco nel tetto e di finestre sane non ce n'era neanche una. Ci ho messo un anno e mezzo a ristrutturarla, e ho speso molto più di quanto pensavo. Tante volte ho pensato: non ce la faccio, me ne torno in città. Ma i vicini mi hanno aiutato in tutti i modi. Oggi ci vivo sei mesi all'anno e ci lavoro da remoto. Che ne penso? Che ne è valsa la pena. Se ci passate, venite a trovarmi!`
}
},

/* ───────────────────────── UNITÀ 6 ───────────────────────── */
{
id:6, lvl:'B1', band:0,
title:'Futuro e condizionale',
sub:'Inclusive a grande armadilha: "disse que viria" = disse che sarebbe venuto.',
focus:'futuro semplice e anteriore, futuro di probabilità, condizionale presente e passato, futuro nel passato (condizionale passato), condizionale giornalistico',
lesson:`
<h3>Futuro</h3>
<p>-<b>rò</b>, -rai, -rà, -remo, -rete, -ranno. Em -are o <i>a</i> vira <i>e</i>: <i>parlerò</i>. Irregulares: <i>andrò, avrò, dovrò, potrò, saprò, vedrò, vivrò</i> · <i>berrò, rimarrò, terrò, verrò, vorrò</i> · <i>sarò, farò, darò, starò</i>.</p>
<ul class="dots">
<li><b>Probabilidade</b> no presente: <i>Saranno le otto</i> = devem ser oito horas. <i>Avrà fame</i> = deve estar com fome.</li>
<li><b>Futuro anteriore</b> (avrò/sarò + particípio): ação futura anterior a outra, e probabilidade no passado: <i>Avrà perso il treno</i> = deve ter perdido o trem.</li>
</ul>
<div class="trap"><span class="pen">Attenzione!</span> Depois de <i>quando, appena, se</i> com valor futuro, o italiano usa <b>futuro</b>: <i>Quando <b>arriverai</b>, chiamami</i>. ES usa subjuntivo (<i>cuando llegues</i>), PT o futuro do subjuntivo (<i>quando chegares</i>). Nenhum dos dois funciona em italiano.</div>
<h3>Condizionale</h3>
<p>-<b>rei</b>, -resti, -rebbe, -remmo, -reste, -rebbero (mesmo radical do futuro): <i>vorrei, potresti, sarebbe</i>.</p>
<ul class="dots">
<li>Cortesia: <i>Vorrei un caffè. Potrebbe aiutarmi?</i></li>
<li>Conselho: <i>Dovresti dormire di più.</i></li>
<li>Notícia não confirmada (jornalístico): <i>Il ministro <b>si sarebbe dimesso</b></i> = teria se demitido.</li>
</ul>
<h3>O futuro no passado</h3>
<div class="tw"><table class="tbl">
<tr><th>Espanhol</th><th>Português</th><th>Italiano</th></tr>
<tr><td>Dijo que vendría</td><td>Disse que viria</td><td>Ha detto che <b>sarebbe venuto</b></td></tr>
<tr><td>Pensaba que lo harías</td><td>Pensava que você faria</td><td>Pensavo che l'<b>avresti fatto</b></td></tr>
</table></div>
<p>Em italiano, o futuro visto do passado é <b>sempre condicional passado</b>, mesmo que a ação ainda vá acontecer. "Ha detto che verrebbe" é o erro mais típico de hispanófonos e lusófonos neste nível.</p>
`,
reading:{
title:'Come vivremo nel 2050',
text:`<p>Come vivremo nel 2050? Secondo un rapporto pubblicato ieri da un gruppo di [[urbanisti|urbanistas]] di un'università milanese, le città italiane cambieranno più nei prossimi venticinque anni che nei cento precedenti. Le auto private, dicono gli autori, diventeranno sempre più rare nei centri storici: al loro posto ci saranno tram, biciclette e piccoli veicoli elettrici condivisi.</p>
<p>Il rapporto, che sarebbe costato oltre due milioni di euro, prevede anche che entro il 2050 un italiano su tre lavorerà almeno in parte da casa. «Non sarà la fine degli uffici», spiega una delle autrici, «ma gli uffici dovranno trasformarsi in luoghi d'incontro più che di lavoro quotidiano».</p>
<p>Non tutti sono d'accordo. Alcuni economisti ritengono che le previsioni siano troppo ottimistiche: secondo loro, senza investimenti seri, nel 2050 le città saranno semplicemente più vecchie e più care. Un consigliere comunale ha dichiarato che il Comune avrebbe già pronto un piano per ridurre il traffico, ma non ha voluto fornire dettagli. Lo presenteranno, ha detto, «quando avremo trovato i [[fondi|recursos, verbas]]».</p>`,
q:[
["Chi ha scritto il rapporto?",["Il Comune","Un gruppo di urbanisti","Alcuni economisti","Un giornale"],1],
["Perché il giornalista scrive «sarebbe costato»?",["È un'ipotesi irreale","L'informazione non è confermata","È un futuro sicuro","È una richiesta gentile"],1],
["Secondo l'autrice, in futuro gli uffici…",["spariranno","diventeranno luoghi d'incontro","saranno più grandi","costeranno di più"],1],
["Che cosa pensano alcuni economisti?",["Che le previsioni siano troppo ottimistiche","Che il rapporto sia perfetto","Che le città saranno più giovani","Che le auto aumenteranno"],0],
["«Quando avremo trovato i fondi» indica…",["un'azione futura anteriore a un'altra","un'azione passata","un'ipotesi irreale","un ordine"],0]
]},
ex:[
{t:'fill', title:'Futuro o condizionale?', items:[
["Quando ___ a Roma, chiamami. (arrivare, tu)",["arriverai"],"Futuro depois de quando, nunca subjuntivo."],
["L'anno prossimo ___ in Giappone. (andare, noi)",["andremo"]],
["Non risponde… ___ ancora in riunione. (essere)",["sarà"],"Futuro de probabilidade."],
["___ un caffè macchiato, per favore. (volere, io)",["vorrei"]],
["Al tuo posto, ___ subito con il capo. (parlare, io)",["parlerei"]],
["Mi ha promesso che ___ alla festa, ma non è venuto. (venire)",["sarebbe venuto"],"Futuro no passado = condizionale passato."],
["Secondo i giornali, il calciatore ___ con la Juventus. (firmare — notizia non confermata, passato)",["avrebbe firmato"]],
["Appena ___ questo lavoro, verrò da te. (finire, io)",["avrò finito","finirò"]],
["Mi ___ dire che ore sono, per favore? (potere, Lei)",["potrebbe"]],
["Ero sicura che ___ noi! (vincere)",["avremmo vinto"]],
["Sono le dieci e Marco non è qui: ___ il treno. (perdere — probabilità)",["avrà perso"]],
["Sei stanchissima: ___ dormire di più. (dovere, tu)",["dovresti"]]
]},
{t:'mc', title:'Scegli la risposta giusta', items:[
["Disse che ___ il giorno dopo.",["partirebbe","sarebbe partito","partirà"],1],
["Sono le dieci e Marco non è arrivato. ___ perso il treno.",["Avrà","Avrebbe","Ha avuto"],0],
["Quando ___ in Italia, visiterò Firenze.",["sarò","sia","sarei"],0],
["«Il presidente sarebbe malato» significa:",["è sicuramente malato","pare che sia malato, ma non è confermato","sarà malato in futuro"],1],
["Pensavo che tu ___ .",["verresti","saresti venuta","venga"],1],
["Che ore sono? Non so, ___ le tre.",["saranno","sarebbero","sono state"],0]
]},
{t:'fix', title:'Correggi la parte sottolineata', items:[
["Quando {sia} grande, farò il medico.",["sarò"],"Quando sarò grande, farò il medico."],
["Pensavo che il film {finirebbe} prima.",["sarebbe finito"],"Pensavo che il film sarebbe finito prima."],
["{Volerei} un'informazione, per favore.",["vorrei"],"Vorrei un'informazione, per favore."],
["Domani {andarò} dal medico.",["andrò"],"Domani andrò dal medico."],
["Mi ha scritto che {verrebbe} domani.",["sarebbe venuto","sarebbe venuta"],"Mi ha scritto che sarebbe venuto/a domani."]
]}
],
write:{
task:'Como será a sua vida daqui a 10 anos? Depois escreva 3 linhas de "notícia não confirmada" sobre você, em estilo jornalístico.',
words:[140,180],
targets:[
{l:'5 verbos no futuro', re:'<W+(rò|rai|rà|remo|rete|ranno)>', n:5},
{l:'1 futuro anteriore', re:'<(avrò|avrai|avrà|avremo|avrete|avranno|sarò|sarai|sarà|saremo|sarete|saranno)\\s+W+(at|ut|it|tt|st|rt|s)[oaie]>', n:1},
{l:'2 condizionali', re:'<W+(rei|resti|rebbe|remmo|reste|rebbero)>', n:2},
{l:'1 futuro no passado (ha detto che… sarebbe…)', manual:true}
],
model:`Tra dieci anni, se tutto andrà come spero, parlerò italiano quasi come la mia lingua madre. Passerò almeno due mesi all'anno in Italia, probabilmente in Sicilia, e lavorerò da remoto da una casa con la vista sul mare. Quando avrò finito il progetto a cui lavoro adesso, ne comincerò un altro, questa volta in italiano. Lavorerò meno ore al computer e farò più passeggiate. Mia madre mi ha sempre detto che un giorno sarei andata a vivere all'estero: chissà, forse avrà ragione lei. Mi piacerebbe anche imparare a cucinare come una nonna siciliana, ma su questo non sarei così ottimista.\n\nULTIM'ORA — Secondo fonti non confermate, una studentessa straniera avrebbe letto in italiano tutti i romanzi di Elena Ferrante in un solo mese. La donna avrebbe dichiarato di non aver usato il dizionario neanche una volta.`
}
}
];
