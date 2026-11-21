/* Verifiche: lettura (5), testo a buchi (8), scelta multipla (7) = 20 punti */
const TESTS = [
{id:1, units:[1,4], lvl:'B1', title:'Verifica 1',
reading:{title:'La signora del terzo piano',
text:`<p>Quando mi sono trasferita a Torino, nel palazzo non conoscevo nessuno. La prima persona che ho incontrato è stata la signora Bruna, del terzo piano. Aveva più di ottant'anni, viveva da sola e passava le giornate sul balcone, tra le piante di basilico e una radio sempre accesa.</p>
<p>Un giorno, mentre salivo le scale con le borse della spesa, mi ha fermata e mi ha chiesto se potevo comprarle il giornale ogni mattina. Gliel'ho comprato per tutto l'inverno. In cambio, lei mi preparava dei biscotti alle mandorle e me li lasciava davanti alla porta, in una scatola di latta.</p>
<p>A marzo sono partita per un mese per lavoro. Quando sono tornata, la scatola non c'era. Ho bussato alla sua porta, ma non ha risposto nessuno. Il portiere mi ha spiegato che la signora era andata a vivere dalla figlia, a Genova. Due settimane dopo, però, ho ricevuto un pacco: dentro c'erano i biscotti e un biglietto. «Il giornale qui me lo porta mia nipote», diceva, «ma non è puntuale come te».</p>`,
q:[
["Dove passava le giornate la signora Bruna?",["In cucina","Sul balcone","Al bar","In portineria"],1],
["Che favore ha chiesto alla narratrice?",["Di portarle la spesa","Di comprarle il giornale ogni mattina","Di innaffiare le piante","Di accompagnarla dal medico"],1],
["Che cosa faceva la signora in cambio?",["Le pagava il giornale","Le preparava dei biscotti","Le prestava dei libri","Le cucinava la cena"],1],
["Perché nessuno ha risposto quando la narratrice ha bussato?",["La signora dormiva","La signora era andata a vivere dalla figlia","La signora era in ospedale","La signora non voleva vederla"],1],
["In «me lo porta mia nipote», «lo» si riferisce a…",["il pacco","il giornale","il biscotto","il portiere"],1]
]},
cloze:{title:'Una vacanza in Puglia',
text:`L'anno scorso [1] (io, andare) in vacanza in Puglia con due amiche. [2] (noi, partire) da Milano in treno e il viaggio è durato quasi nove ore. Il primo giorno siamo andate [3] (a + il) mare, ma faceva così caldo che dopo un'ora siamo tornate [4] (in + lo) appartamento. La sera, mentre [5] (noi, cenare) in una trattoria, il proprietario ci ha offerto un limoncello. «Quanti ne volete?» ci ha chiesto. «[6] prendiamo tre, grazie!» Le mie amiche [7] (divertirsi) tantissimo. Io, invece, ho perso il telefono, ma per fortuna un cameriere l'ha trovato e [8] (a me + lo) ha restituito il giorno dopo.`,
a:[["sono andata"],["siamo partite"],["al"],["nell'"],["cenavamo"],["ne"],["si sono divertite"],["me l'","me lo"]]},
mc:[
["Domani vado ___ dentista.",["al","dal","nel"],1],
["Abito ___ Stati Uniti da due anni.",["nei","negli","agli"],1],
["Il film ___ alle nove.",["ha cominciato","è cominciato","era cominciando"],1],
["Quando sono arrivata, la lezione ___ già ___ .",["è / finita","era / finita","ha / finito"],1],
["Le chiavi? Non ___ trovo più!",["li","le","gli"],1],
["Hai detto a Paolo della festa? Sì, ___ ho detto.",["gliel'","l'","glie"],0],
["Conosco Marta ___ dieci anni.",["da","per","fa"],0]
]},

{id:2, units:[5,8], lvl:'B1+', title:'Verifica 2',
reading:{title:'Il coworking in montagna',
text:`<p>Da qualche anno, in alcune valli del Trentino, sono nati degli spazi di coworking per chi lavora a distanza. L'idea è semplice: si affitta una scrivania in un vecchio maso ristrutturato e si lavora con vista sulle Dolomiti. «All'inizio pensavamo che sarebbero venuti soprattutto stranieri», racconta Elena, che ne gestisce uno in valle. «Invece la maggior parte dei clienti sono italiani delle grandi città, stanchi del traffico».</p>
<p>Per arrivarci da Milano ci vogliono circa quattro ore, ma molti restano un mese intero. «Credo che il segreto sia l'equilibrio», spiega Elena. «Lavori fino alle cinque, poi esci, cammini nel bosco, e la sera ceni con persone che fanno mestieri diversissimi dal tuo».</p>
<p>Non tutti in paese sono entusiasti. Alcuni abitanti temono che i prezzi delle case aumentino troppo. Il sindaco, però, è ottimista: secondo lui il coworking porterà nuove famiglie e, forse, permetterà di riaprire la scuola. «Se volete provare», consiglia Elena, «prenotate presto e portate scarpe da montagna: ne avrete bisogno».</p>`,
q:[
["Chi sono la maggior parte dei clienti?",["Turisti stranieri","Italiani delle grandi città","Studenti universitari","Abitanti del paese"],1],
["Quanto tempo ci vuole per arrivare da Milano?",["Un'ora","Circa quattro ore","Un mese","Un giorno intero"],1],
["Secondo Elena, qual è il segreto del successo?",["I prezzi bassi","L'equilibrio tra lavoro e tempo libero","La connessione veloce","La cucina locale"],1],
["Che cosa temono alcuni abitanti?",["Il rumore","L'aumento dei prezzi delle case","La chiusura della scuola","Troppa neve"],1],
["In «ne avrete bisogno», «ne» si riferisce a…",["le scarpe da montagna","i prezzi","le famiglie","le prenotazioni"],0]
]},
cloze:{title:'Cara Giulia',
text:`Cara Giulia, ti scrivo da Bologna. Sono arrivata ieri e [1] (rimanere, io, futuro) qui fino a venerdì. Il viaggio è stato lunghissimo: per arrivare [2] sono volute sei ore! Domani [3] (vedere, io, futuro) Marco: mi aveva detto che [4] (venire, futuro nel passato) a prendermi in stazione, ma non è venuto… Penso che [5] (avere, lui) troppo lavoro in questo periodo. Se passi da Bologna, [6] (chiamare + mi, imperativo tu)! Ti porterei in un'osteria che mi piace molto: [7] (andare + ci, noi, presente) insieme? Spero che tu [8] (stare) bene. Un abbraccio, Sara`,
a:[["rimarrò"],["ci"],["vedrò"],["sarebbe venuto"],["abbia"],["chiamami"],["ci andiamo"],["stia"]]},
mc:[
["Quanti libri hai letto quest'anno? ___ ho letti dodici.",["Li","Ne","Ci"],1],
["Per fare la pizza ___ un'ora.",["ci vuole","ci vogliono","ci metto"],0],
["Quando ___ a casa, chiamami.",["arrivassi","arriverai","arriveresti"],1],
["Signora, ___ pure!",["entra","entri","entrate"],1],
["Penso che Luca ___ ragione.",["ha","abbia","avrà avuto"],1],
["Benché ___ tardi, continuiamo.",["è","sia","sarà"],1],
["Ha detto che ___ il giorno dopo.",["partirebbe","sarebbe partito","partirà"],1]
]},

{id:3, units:[9,12], lvl:'B2', title:'Verifica 3',
reading:{title:'La valigia di cartone',
text:`<p>Mio nonno partì per l'Argentina nel 1951, a diciannove anni, con una valigia di cartone e l'indirizzo di un cugino che non aveva mai visto. Raccontava sempre che, se il cugino non fosse venuto a prenderlo al porto, sarebbe tornato in Italia con la stessa nave. Il cugino, invece, c'era: lo riconobbe da una foto che la famiglia gli aveva spedito mesi prima.</p>
<p>I primi anni furono duri. Lavorava dodici ore al giorno in una fabbrica di scarpe e la sera studiava lo spagnolo, benché fosse stanchissimo. Nelle lettere alla madre, però, scriveva che tutto andava bene, come se Buenos Aires fosse una specie di paradiso. Lei, che non sapeva leggere, se le faceva leggere dal parroco del paese.</p>
<p>Quando, molti anni dopo, gli chiesi se si fosse mai pentito di essere partito, ci pensò a lungo. Mi disse che, se fosse rimasto, probabilmente avrebbe avuto una vita più tranquilla, ma che non avrebbe mai conosciuto mia nonna. «E tu», aggiunse sorridendo, «non saresti qui a fare domande».</p>`,
q:[
["Che cosa avrebbe fatto il nonno se il cugino non fosse venuto?",["Avrebbe cercato lavoro da solo","Sarebbe tornato in Italia","Avrebbe aspettato al porto","Sarebbe andato in Brasile"],1],
["Come lo riconobbe il cugino?",["Dalla valigia","Da una foto","Dalla voce","Da una lettera"],1],
["Perché le lettere alla madre non erano del tutto sincere?",["Il nonno voleva tranquillizzarla","Il parroco le cambiava","Il nonno non sapeva scrivere","Erano in spagnolo"],0],
["Chi leggeva le lettere alla madre?",["Il nonno","Il cugino","Il parroco","La nonna"],2],
["«Benché fosse stanchissimo» esprime…",["una causa","una concessione","un'ipotesi","un fine"],1]
]},
cloze:{title:'Un incontro inatteso',
text:`Ieri ho incontrato Chiara, che non vedevo da anni. Mi ha detto che [1] (lavorare, imperfetto) a Londra e che il mese dopo [2] (tornare, futuro nel passato) in Italia. Credevo che [3] (sposarsi, lei, congiuntivo trapassato) da tempo, invece mi ha raccontato che il fidanzato l'aveva lasciata. «Se l'[4] (sapere, io) prima», le ho detto, «ti avrei chiamata». Lei ha sorriso, come se non [5] (essere) importante. Poi mi ha chiesto [6] ancora vivevo nello stesso quartiere. Le ho risposto di sì; [7] (= e non solo: di più), le ho proposto di venire a cena da me. Magari [8] (potere, noi) tornare amiche come prima!`,
a:[["lavorava"],["sarebbe tornata"],["si fosse sposata"],["avessi saputo"],["fosse"],["se"],["anzi","inoltre"],["potessimo"]]},
mc:[
["Vorrei che tu mi ___ la verità.",["dica","dicessi","diresti"],1],
["Se ___ più tempo, studierei il cinese.",["avrei","avessi","ho avuto"],1],
["Se l'avessi saputo, ___ .",["te l'avrei detto","te lo direi","te lo dicessi"],0],
["Il modulo ___ compilato entro lunedì.",["va","viene stato","è andato"],0],
["In Italia ___ molti prodotti biologici.",["si vende","si vendono","si è venduto"],1],
["«Verrò domani», disse. → Disse che ___ il giorno dopo.",["verrebbe","sarebbe venuto","verrà"],1],
["Dante ___ a Ravenna nel 1321.",["morse","morì","moriva"],1]
]},

{id:4, units:[13,16], lvl:'C1', title:'Verifica 4',
reading:{title:'Lavoro agile: la pubblica amministrazione ci ripensa',
text:`<p>Il lavoro agile nella pubblica amministrazione torna al centro del dibattito. Secondo un'indagine diffusa la scorsa settimana, la maggior parte dei dipendenti pubblici che ne hanno usufruito negli ultimi anni dichiara di aver mantenuto, se non migliorato, la propria produttività. I dirigenti, tuttavia, si mostrano più cauti: molti lamentano difficoltà nel coordinamento dei gruppi e nella valutazione dei risultati.</p>
<p>Il nodo, osservano gli autori, non è tanto la scelta tra presenza e distanza, quanto l'organizzazione del lavoro. Laddove gli obiettivi sono stati definiti con chiarezza, il passaggio al lavoro agile ha comportato benefici evidenti, tra cui la riduzione delle assenze e un minore ricorso agli straordinari. Dove invece si è semplicemente trasferito a casa il lavoro d'ufficio, senza ripensarne i processi, i risultati sono stati deludenti.</p>
<p>Il rapporto si chiude con alcune raccomandazioni: investire nella formazione dei dirigenti, dotare il personale di strumenti adeguati e, soprattutto, misurare i risultati anziché le ore di presenza. Resta da vedere se le amministrazioni sapranno farne tesoro.</p>`,
q:[
["Che cosa dichiara la maggior parte dei dipendenti?",["Di essere meno produttiva","Di aver mantenuto o migliorato la produttività","Di preferire l'ufficio","Di lavorare più ore"],1],
["Di che cosa si lamentano molti dirigenti?",["Dei costi","Del coordinamento e della valutazione dei risultati","Della tecnologia","Delle assenze"],1],
["Secondo gli autori, il vero nodo è…",["la scelta tra casa e ufficio","l'organizzazione del lavoro","il numero di dipendenti","gli stipendi"],1],
["«Ha comportato benefici» significa che…",["ha portato dei vantaggi","si è comportato bene","ha eliminato dei benefici"],0],
["«Farne tesoro» significa…",["risparmiare denaro","imparare dall'esperienza e usarla","nascondere i risultati","spendere di più"],1]
]},
cloze:{title:'Una risposta formale',
text:`Gentile Dottoressa Ferri, [1] riferimento alla Sua email del 12 maggio, Le comunico che il documento [2] cui mi chiedeva è in fase di revisione. La [3] (consegnare, nome) è prevista entro la fine del mese. Mi scuso per il ritardo, [4] (causare, participio) dal cambio del sistema informatico. Non sono ancora riuscito [5] completare la parte economica, ma conto [6] (su + il) contributo dei colleghi dell'ufficio acquisti, [7] (possessivo relativo) esperienza sarà preziosa. Resto in attesa di un Suo cortese [8] e porgo distinti saluti.`,
a:[["in"],["di"],["consegna"],["causato"],["a"],["sul"],["la cui"],["riscontro"]]},
mc:[
["La persona ___ ti ho parlato è arrivata.",["che","di cui","cui"],1],
["Ho smesso ___ fumare.",["a","di","da"],1],
["Sono ___ arrivata, ti chiamo tra un'ora.",["appena","finito di","già di"],0],
["Domani mi ___ tagliare i capelli.",["faccio","lascio","metto"],0],
["All'esame me la sono ___ bene.",["cavato","cavata","cavati"],1],
["Il progetto ___ costi elevati.",["comporta","si comporta","porta via"],0],
["Qual è la formula più formale?",["Ti scrivo per dirti che…","Le scrivo per comunicarLe che…","Volevo dirti che…"],1]
]}
];
