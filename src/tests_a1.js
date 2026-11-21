TESTS.unshift({id:0, units:[101,108], range:'P1–P9', lvl:'A1', title:'Verifica A1',
reading:{title:'Un\'email da Marta',
text:`<p>Ciao Lucia! Come stai? Io sto bene, ma sono un po' stanca: da lunedì lavoro in un nuovo ufficio, in centro. Il lavoro mi piace molto e i colleghi sono simpatici.</p>
<p>Il problema è la casa: abito ancora in periferia e ogni mattina prendo due autobus. Mi sveglio alle sei e arrivo in ufficio alle otto e mezza! Adesso cerco un appartamento piccolo vicino al lavoro. Ci sono tante offerte, ma sono care.</p>
<p>Sabato vado a vedere due case: vuoi venire con me? Dopo possiamo mangiare una pizza insieme. Un abbraccio, Marta</p>`,
q:[
["Dove lavora Marta adesso?",["In periferia","In un nuovo ufficio in centro","A casa","In una pizzeria"],1],
["Come va al lavoro?",["In macchina","Con due autobus","A piedi","In treno"],1],
["A che ora si sveglia?",["Alle sei","Alle otto e mezza","Alle sette","Alle nove"],0],
["Che cosa cerca?",["Un nuovo lavoro","Un appartamento vicino al lavoro","Nuovi colleghi","Una macchina"],1],
["Che cosa propone a Lucia per sabato?",["Andare al cinema","Vedere due case e poi mangiare una pizza","Lavorare insieme","Fare sport"],1]
]},
cloze:{title:'Mi presento',
text:`Mi chiamo Pedro e [1] (essere) di Porto Alegre. [2] (avere) ventinove anni e [3] (lavorare) in un ristorante. Ogni giorno [4] (svegliarsi) alle sette. Nel mio quartiere [5] (c'è / ci sono) un parco molto grande. Il fine settimana [6] (andare) al mare con gli amici. Mi [7] (piacere) molto i dolci italiani! Adesso [8] (abitare) a Bologna.`,
a:[["sono"],["ho"],["lavoro"],["mi sveglio"],["c'è"],["vado"],["piacciono"],["abito"]]},
mc:[
["___ studenti sono in classe.",["I","Gli","Le"],1],
["Marta ___ trent'anni.",["è","ha","hai"],1],
["Noi ___ in Italia in treno.",["andiamo","andamo","vanno"],0],
["Che ore sono? — ___ l'una.",["Sono","È","Ha"],1],
["Abito ___ Roma.",["in","a","di"],1],
["Mi ___ le lasagne.",["piace","piacciono","piaci"],1],
["Voglio ___ l'italiano.",["imparare","di imparare","a imparare"],0]
]});
