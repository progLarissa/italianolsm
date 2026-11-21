/* ───────── LEGGERE AD ALTA VOCE ───────── */
/* {t, lvl, text (paragrafi separati da \n\n, glosse [[a|b]]), pron:[parole con accento], ask:[domande per parlare]} */
const TESTI = [
{t:'Il mercato del sabato', lvl:'A1', text:`Il sabato mattina vado al mercato con mia madre. Il mercato è in piazza, vicino alla chiesa. Ci sono tante [[bancarelle|barracas]]: frutta, verdura, formaggi, pane e fiori.

Mia madre compra sempre le mele, i pomodori e un po' di formaggio. Io compro i fiori per la cucina. Il signor Luigi vende le [[pesche|pêssegos]] più buone della città. È simpatico e parla molto!

Alle undici prendiamo un caffè al bar della piazza e poi torniamo a casa. Il sabato è il mio giorno preferito.`,
pron:['MER-ca-to','SA-ba-to','CHIE-sa (ch = k)','for-MAG-gi (gg = dj)','PE-sche (sch = sk)'], ask:['Che cosa compri al mercato?','Qual è il tuo giorno preferito? Perché?']},
{t:'Una cartolina da Roma', lvl:'A1', text:`Cara Giulia,
ti scrivo da Roma! La città è bellissima e fa molto caldo. Il nostro albergo è piccolo ma comodo, vicino a Piazza Navona.

Ogni giorno camminiamo tanto. Ieri abbiamo visto il Colosseo e la Fontana di Trevi. Oggi visitiamo i Musei Vaticani. La sera mangiamo in una trattoria: la carbonara è buonissima!

Torno a casa lunedì. Ti porto un regalo.
Un bacio,
Anna`,
pron:['CA-ra','al-BER-go','Co-los-SE-o','buo-NIS-si-ma','re-GA-lo'], ask:['Quale città vuoi visitare in Italia?','Che cosa mangi in vacanza?']},
{t:'La mia giornata', lvl:'A1', text:`Mi sveglio alle sette e mezza. Mi alzo, faccio la doccia e bevo un caffè. Poi prendo l'autobus e vado al lavoro.

Lavoro in un ufficio in centro. A mezzogiorno mangio con i colleghi. Il pomeriggio lavoro ancora tre ore.

La sera torno a casa, cucino e leggo un libro. Qualche volta guardo un film. Vado a letto verso le undici. Sono stanca, ma contenta.`,
pron:['MEZ-za (zz = dz)','DOC-cia','uf-FI-cio','mez-zo-GIOR-no','qual-che VOL-ta'], ask:['Com\'è la tua giornata?','A che ora ti svegli di solito?']},
{t:'Il nonno e il treno', lvl:'A2', text:`Mio nonno ha ottantadue anni e ama i treni. Da giovane lavorava in ferrovia: guidava i treni tra Bologna e Firenze. Conosce ogni [[galleria|túnel]] e ogni stazione della linea.

Quando ero piccola, la domenica mi portava alla stazione. Ci sedevamo su una panchina e guardavamo passare i treni. Lui mi raccontava storie di viaggi, di neve e di passeggeri strani.

Oggi il nonno non guida più, ma ogni domenica va ancora alla stazione. Adesso ci vado anch'io, con mia figlia. E il nonno racconta le stesse storie, con lo stesso sorriso.`,
pron:['ot-tan-ta-DU-e','fer-ro-VI-a','gal-le-RI-a','pas-seg-GE-ri','sor-RI-so'], ask:['Chi è una persona importante della tua famiglia? Com\'è?','Che cosa facevi la domenica da piccola?']},
{t:'La pasta al pomodoro', lvl:'A2', text:`Per quattro persone servono trecentoventi grammi di spaghetti, una [[passata|molho de tomate peneirado]] di pomodoro, uno spicchio d'aglio, olio extravergine d'oliva, sale e qualche foglia di basilico.

Prima metti l'olio in una padella e fai [[soffriggere|dourar levemente]] l'aglio per un minuto. Poi aggiungi la passata, un pizzico di sale e lascia cuocere per quindici minuti.

Nel frattempo porta a bollore una pentola d'acqua, aggiungi il sale e butta la pasta. Quando è al dente, scolala e mettila nella padella con il sugo. Mescola bene, aggiungi il basilico e servi subito. Buon appetito!`,
pron:['spa-GHET-ti (gh = g)','SPIC-chio','A-glio (gli = lh)','ba-SI-li-co','pen-TO-la'], ask:['Qual è il tuo piatto preferito? Come si prepara?','Cucini spesso? Che cosa?']},
{t:'Il primo giorno di lavoro', lvl:'A2', text:`Lunedì è stato il mio primo giorno nel nuovo lavoro. Ero molto nervosa: mi sono svegliata alle sei, anche se dovevo essere in ufficio alle nove.

Sono arrivata in anticipo e ho aspettato al bar di fronte. Alle nove meno cinque sono entrata. La mia responsabile, Elena, mi ha presentato a tutti i colleghi e mi ha mostrato la mia scrivania, vicino alla finestra.

La mattina è passata velocissima. A pranzo i colleghi mi hanno portato in una trattoria lì vicino e abbiamo parlato di tutto, non solo di lavoro. Quando sono tornata a casa, ero stanca ma felice.`,
pron:['ner-VO-sa','re-spon-sa-BI-le','scri-va-NI-a','ve-lo-CIS-si-ma','trat-to-RI-a'], ask:['Racconta il tuo primo giorno di lavoro o di scuola.','Come ti senti quando cominci qualcosa di nuovo?']},
{t:'Il dialetto di mia nonna', lvl:'B1', text:`Mia nonna è nata in un paesino della Calabria e per tutta la vita ha parlato soprattutto il dialetto. L'italiano lo capiva benissimo, ma diceva che le parole del dialetto erano «più vere», più vicine alle cose.

Quando ero bambina non capivo quasi niente di quello che diceva, e lei rideva delle mie risposte sbagliate. Poi, un'estate, ho cominciato a scrivere su un quaderno le sue espressioni preferite, con la traduzione accanto. Alla fine dell'estate il quaderno era pieno.

Oggi la nonna non c'è più, ma quel quaderno è sulla mia libreria. Ogni tanto lo apro e leggo ad alta voce qualche frase. Non ho il suo accento, naturalmente, ma mi sembra di sentire la sua voce.`,
pron:['pa-e-SI-no','sop-rat-TUT-to','ben-NIS-si-mo','e-spres-SIO-ni','ac-CEN-to'], ask:['Nella tua famiglia si parla un dialetto o una lingua diversa? Racconta.','Quali parole o espressioni ti ricordano una persona cara?']},
{t:'Vivere su un\'isola', lvl:'B1', text:`Da tre anni vivo a Procida, una piccola isola nel golfo di Napoli. Prima abitavo a Milano e lavoravo in un'agenzia di pubblicità: correvo sempre, dalla mattina alla sera.

Qui la vita ha un altro ritmo. Il traghetto per Napoli parte ogni ora, e se lo perdi non succede niente: aspetti il prossimo, prendi un caffè, chiacchieri con qualcuno. All'inizio questa lentezza mi innervosiva; adesso non potrei più farne a meno.

Certo, l'isola ha anche i suoi limiti. D'inverno molti negozi chiudono e per andare dal medico specialista bisogna prendere la nave. Ma quando la sera guardo il mare dal porto, con le case colorate che si accendono una dopo l'altra, penso di aver fatto la scelta giusta.`,
pron:['PRO-ci-da','pub-bli-CI-tà','tra-GHET-to','in-ner-vo-SI-va','spe-cia-LI-sta'], ask:['Preferisci vivere in una grande città o in un posto piccolo? Perché?','Che cosa cambieresti nel ritmo della tua vita?']},
{t:'La bicicletta', lvl:'B1', text:`In molte città italiane la bicicletta sta tornando di moda. A Ferrara, chiamata «la città delle biciclette», quasi tutti si spostano su due ruote: studenti, impiegati, pensionati con il cesto della spesa.

Andare in bicicletta ha molti vantaggi. Non inquina, non costa quasi niente, fa bene alla salute e spesso è più veloce della macchina, soprattutto in centro. Inoltre permette di vedere la città in un altro modo, più lento e più attento.

Non mancano però i problemi: in alcune città le piste ciclabili sono poche e pericolose, e i furti di biciclette sono frequenti. Per questo molti chiedono ai Comuni di investire di più. Se le strade fossero più sicure, dicono, ancora più persone lascerebbero l'auto a casa.`,
pron:['bi-ci-CLET-ta','FER-ra-ra','van-TAG-gi','ci-CLA-bi-li','pe-ri-CO-lo-se'], ask:['Come ti sposti in città? Quali sono i vantaggi e gli svantaggi?','Che cosa dovrebbe fare il Comune della tua città per i ciclisti?']},
{t:'Il lavoro che cambia', lvl:'B2', text:`Fino a pochi decenni fa, per molti italiani il «posto fisso» era il sogno di una vita: entrare in un'azienda o nella pubblica amministrazione a vent'anni e restarci fino alla pensione. Oggi questo modello sembra appartenere a un'altra epoca.

I giovani cambiano lavoro più spesso, a volte per scelta, più spesso per necessità. Molti lavorano da remoto per aziende che hanno sede in altri Paesi, altri alternano periodi di lavoro e di formazione. Secondo alcuni sociologi, la stabilità non è scomparsa: ha semplicemente cambiato forma, e oggi coincide più con le competenze che con il contratto.

Resta il fatto che l'incertezza ha un prezzo. Senza un reddito stabile è più difficile chiedere un mutuo, fare progetti, decidere di avere figli. Il vero problema, forse, non è la flessibilità in sé, ma il fatto che spesso non sia accompagnata da tutele adeguate.`,
pron:['de-CEN-ni','am-mi-ni-stra-ZIO-ne','so-CIO-lo-gi','com-pe-TEN-ze','ade-GUA-te'], ask:['Per te è meglio un lavoro stabile o un lavoro flessibile? Argomenta.','Come è cambiato il mondo del lavoro nel tuo Paese?']},
{t:'Le città e il turismo', lvl:'B2', text:`Ogni anno milioni di turisti visitano Venezia, Firenze e le Cinque Terre. Il turismo porta lavoro e ricchezza, ma in alcuni luoghi ha raggiunto livelli che molti residenti considerano insostenibili.

Nei centri storici gli affitti brevi per i turisti hanno fatto salire i prezzi delle case, e molte famiglie sono state costrette a trasferirsi in periferia. Al posto delle botteghe artigiane sono comparsi negozi di souvenir tutti uguali. Il rischio, dicono gli urbanisti, è che le città diventino scenografie: belle da fotografare, ma senza vita.

Alcune amministrazioni hanno cominciato a reagire: Venezia, per esempio, ha introdotto un contributo d'accesso nei giorni di maggiore affluenza. Le opinioni sono divise. C'è chi pensa che sia un passo necessario e chi teme che trasformi la città in un museo a pagamento.`,
pron:['in-so-ste-NI-bi-li','re-si-DEN-ti','bot-TE-ghe','sce-no-gra-FI-e','af-flu-EN-za'], ask:['Il turismo di massa è un problema o un\'opportunità? Argomenta.','Come si potrebbe proteggere una città molto turistica?']},
{t:'Il silenzio', lvl:'B2', text:`Viviamo immersi nel rumore: il traffico, le notifiche del telefono, la musica nei negozi, la televisione accesa anche quando nessuno la guarda. Ci siamo talmente abituati che il silenzio, quando arriva, quasi ci mette a disagio.

Eppure il silenzio non è un vuoto. Gli scienziati hanno osservato che brevi momenti di quiete abbassano il ritmo cardiaco e aiutano la concentrazione. Ma al di là dei dati, chiunque abbia passato qualche ora in montagna o in un monastero sa che il silenzio cambia il modo di pensare: i pensieri rallentano, si fanno più chiari.

Forse non possiamo eliminare il rumore dalle nostre vite. Possiamo però difendere qualche spazio di quiete: una passeggiata senza cuffie, un pasto senza telefono, dieci minuti la sera con la luce spenta. Non è poco.`,
pron:['im-MER-si','no-ti-FI-che','di-SA-gio','car-DI-a-co','mo-NA-ste-ro'], ask:['Riesci a stare in silenzio? Che cosa provi?','Quali abitudini hai per ridurre il rumore nella tua giornata?']},
{t:'Elogio della lentezza', lvl:'C1', text:`Ci è stato insegnato che il tempo è denaro, e che sprecarlo sia quasi una colpa. Così riempiamo ogni minuto: ascoltiamo podcast mentre cuciniamo, rispondiamo alle email in coda alla posta, leggiamo i titoli dei giornali senza mai arrivare in fondo agli articoli. Ne risulta una vita più densa, ma non necessariamente più ricca.

La lentezza, al contrario, viene spesso confusa con la pigrizia o con l'inefficienza. In realtà presuppone un'attenzione che la fretta non consente. Chi impara una lingua lo sa bene: non si arriva alla padronanza accumulando regole, ma lasciando sedimentare le parole, tornando sugli stessi testi, accettando di non capire subito.

Non si tratta, beninteso, di rinunciare alla rapidità quando serve. Si tratta di restituire alle cose il loro tempo: quello della lettura, della conversazione, dell'apprendimento. Un tempo che non si misura in risultati immediati, ma in ciò che, lentamente, diventa nostro.`,
pron:['spre-CAR-lo','pi-GRI-zia','pre-sup-PO-ne','pa-dro-NAN-za','se-di-men-TA-re'], ask:['La lentezza è un valore o un lusso? Argomenta con esempi.','Che cosa hai imparato lentamente nella tua vita?']},
{t:'La lingua che abitiamo', lvl:'C1', text:`Si dice spesso che una lingua non è soltanto uno strumento di comunicazione, ma una casa: un luogo in cui si abita, con le sue stanze familiari e i suoi angoli ancora sconosciuti. Chi emigra lo sperimenta sulla propria pelle. Per anni continua a contare, a sognare, a imprecare nella lingua madre, mentre la nuova lingua resta un abito elegante ma un po' stretto.

Poi, quasi senza accorgersene, qualcosa cambia. Una battuta che fa ridere senza bisogno di tradurla mentalmente; una parola che sembra l'unica giusta per dire una certa sfumatura; un sogno, finalmente, nella lingua nuova. È in quei momenti che la casa straniera comincia a diventare propria.

Non per questo la prima lingua viene abbandonata. Anzi, chi vive tra più lingue scopre di avere più stanze a disposizione, e che ognuna gli permette di guardare il mondo da una finestra diversa.`,
pron:['co-mu-ni-ca-ZIO-ne','spe-ri-MEN-ta','im-pre-CA-re','ac-cor-GER-se-ne','sfu-ma-TU-ra'], ask:['Che rapporto hai con le lingue che parli? Ti senti diversa in ognuna?','Racconta un momento in cui una lingua straniera ti è sembrata «tua».']}
];
const SCIOGLI = [
["Trentatré trentini entrarono a Trento, tutti e trentatré trotterellando.","tr + doppie"],
["Sopra la panca la capra campa, sotto la panca la capra crepa.","p e c"],
["Apelle figlio di Apollo fece una palla di pelle di pollo.","doppie: ll"],
["Tigre contro tigre.","tr / gr"],
["Sereno è, sereno sarà, se non sarà sereno si rasserenerà.","r e s"],
["Chi ama chiama chi ama, chi chiama chi ama chiama chi ama.","chi = ki"],
["Se l'arcivescovo di Costantinopoli si volesse disarcivescoviscostantinopolizzare…","sc e ritmo"],
["Il cuoco cuoce in cucina e dice che la cuoca giace e tace perché sua cugina non cuoce.","c dura e dolce"]
];

/* ───────── ASCOLTO: dialoghi ───────── */
/* righe [speaker, testo]; speaker A/B/N (narratore) */
const ASCOLTI = [
{t:'In albergo', lvl:'A1', lines:[
['A','Buonasera! Benvenuta all\'Hotel Belvedere.'],['B','Buonasera. Ho una prenotazione a nome Costa, Laura Costa.'],['A','Sì, ecco: una camera singola per tre notti. Mi dà un documento, per favore?'],['B','Certo, ecco il passaporto. A che ora è la colazione?'],['A','Dalle sette alle dieci, al primo piano. La sua camera è la numero quarantadue, al quarto piano. L\'ascensore è a destra.'],['B','Grazie. C\'è il wi-fi?'],['A','Sì, la password è sul biglietto con la chiave. Buona permanenza!']],
q:[["Per quante notti è la prenotazione?",["Una","Due","Tre","Quattro"],2],["Quando c'è la colazione?",["Dalle sei alle nove","Dalle sette alle dieci","Dalle otto alle undici","Tutto il giorno"],1],["Qual è il numero della camera?",["Ventiquattro","Quarantadue","Quattordici","Dodici"],1],["Dov'è la password del wi-fi?",["Al bar","Sul biglietto con la chiave","Alla reception","Non c'è"],1]]},
{t:'Annunci alla stazione', lvl:'A1', lines:[
['N','Attenzione. Il treno regionale per Firenze delle ore nove e quindici partirà dal binario sei anziché dal binario tre.'],['N','Il treno Frecciarossa da Milano per Roma è in arrivo al binario dieci con un ritardo di venti minuti. Ci scusiamo per il disagio.'],['N','Si avvisano i signori viaggiatori che il treno per Bologna delle ore dieci è stato cancellato.']],
q:[["Da quale binario parte il treno per Firenze?",["Tre","Sei","Dieci","Nove"],1],["A che ora parte il treno per Firenze?",["9:15","9:50","10:00","6:15"],0],["Quanti minuti di ritardo ha il Frecciarossa?",["Dieci","Quindici","Venti","Trenta"],2],["Che cosa succede al treno per Bologna?",["Parte in ritardo","È cancellato","Cambia binario","Parte in anticipo"],1]]},
{t:'Le previsioni del tempo', lvl:'A2', lines:[
['N','Ed ecco le previsioni del tempo per domani. Al Nord il cielo sarà nuvoloso, con piogge in Lombardia e in Veneto, soprattutto nel pomeriggio. Le temperature scenderanno di qualche grado: a Milano la massima sarà di dodici gradi.'],['N','Al Centro tempo variabile: sole la mattina e qualche nuvola la sera. A Roma diciotto gradi.'],['N','Al Sud e sulle isole bel tempo e temperature miti: a Palermo fino a ventidue gradi. Mare calmo. Attenzione al vento forte sulla Sardegna.']],
q:[["Dove pioverà domani?",["In Sicilia","In Lombardia e in Veneto","A Roma","In Sardegna"],1],["Quale sarà la temperatura massima a Milano?",["Diciotto gradi","Dodici gradi","Ventidue gradi","Dieci gradi"],1],["Che tempo farà a Palermo?",["Pioggia","Bel tempo","Neve","Nebbia"],1],["Dove ci sarà vento forte?",["In Sardegna","A Roma","A Milano","In Veneto"],0]]},
{t:'Un messaggio in segreteria', lvl:'A2', lines:[
['A','Buongiorno, sono Francesca dello studio dentistico Ferri. Chiamo per l\'appuntamento della signora Bianchi di giovedì alle quattro.'],['A','Purtroppo il dottore giovedì non c\'è, quindi dobbiamo spostare la visita. Possiamo proporle venerdì alle dieci e mezza oppure lunedì prossimo alle tre.'],['A','Ci richiami, per favore, al numero zero due, quattro cinque sei, sette otto nove. Lo studio è aperto dalle nove all\'una e dalle tre alle sette. Grazie e buona giornata.']],
q:[["Perché chiama Francesca?",["Per confermare l'appuntamento","Per spostare l'appuntamento","Per chiedere un pagamento","Per un'emergenza"],1],["Quando era l'appuntamento?",["Giovedì alle quattro","Venerdì alle dieci e mezza","Lunedì alle tre","Mercoledì alle quattro"],0],["Che cosa propone?",["Venerdì alle 10:30 o lunedì alle 15","Solo martedì","Giovedì alle 16","Sabato mattina"],0],["Quando è chiuso lo studio?",["Dalle nove all'una","Dall'una alle tre","Dalle tre alle sette","Mai"],1]]},
{t:'Una stanza in affitto', lvl:'B1', lines:[
['A','Pronto?'],['B','Buongiorno, chiamo per l\'annuncio della stanza in via Mazzini. È ancora libera?'],['A','Sì, è libera dal primo del mese. È una stanza singola in un appartamento con altre due ragazze, una studentessa e un\'infermiera.'],['B','Quanto costa al mese?'],['A','Trecentottanta euro, spese comprese, tranne il riscaldamento, che dividiamo in tre. Chiediamo anche due mensilità di caparra.'],['B','Va bene. La stanza ha la scrivania? Lavoro da casa due giorni alla settimana.'],['A','Sì, c\'è una scrivania vicino alla finestra. Però il wi-fi a volte è lento, te lo dico subito.'],['B','Ah, capisco. Posso venire a vederla?'],['A','Certo. Domani dopo le sei va bene?'],['B','Perfetto, a domani!']],
q:[["Con chi vivrebbe la persona che chiama?",["Con una famiglia","Con una studentessa e un'infermiera","Da sola","Con il proprietario"],1],["Che cosa NON è compreso nel prezzo?",["L'acqua","Il riscaldamento","Il wi-fi","La luce"],1],["Perché chiede della scrivania?",["Studia all'università","Lavora da casa due giorni alla settimana","Ama leggere","Non lo dice"],1],["Che problema segnala la ragazza?",["La stanza è piccola","Il wi-fi a volte è lento","C'è rumore","La finestra è rotta"],1]]},
{t:'In farmacia', lvl:'B1', lines:[
['A','Buongiorno, mi dica.'],['B','Buongiorno. Da ieri ho mal di gola e un po\' di febbre. Avrei bisogno di qualcosa, ma non vorrei prendere antibiotici.'],['A','Ha tosse?'],['B','No, solo la gola che brucia, soprattutto la mattina.'],['A','Allora le consiglio queste pastiglie da sciogliere in bocca, tre o quattro al giorno, e un antinfiammatorio dopo i pasti, se la febbre supera i trentotto. Beva molta acqua calda con il miele.'],['B','E se fra tre giorni non sto meglio?'],['A','In quel caso vada dal medico: potrebbe servire una visita. Per gli antibiotici, comunque, ci vuole la ricetta.']],
q:[["Che sintomi ha la cliente?",["Tosse e febbre","Mal di gola e un po' di febbre","Mal di testa","Mal di stomaco"],1],["Quante pastiglie al giorno consiglia la farmacista?",["Una","Tre o quattro","Dieci","Due"],1],["Quando deve prendere l'antinfiammatorio?",["Prima di dormire","Dopo i pasti, se la febbre supera i 38","Ogni ora","A digiuno"],1],["Che cosa serve per gli antibiotici?",["Niente","La ricetta","Un documento","Pagare in contanti"],1]]},
{t:'Il notiziario', lvl:'B2', lines:[
['N','Buonasera, ecco le principali notizie. Apriamo con il maltempo: forti piogge hanno colpito la Liguria nella notte. Alcune strade sono state chiuse in via precauzionale, ma non si registrano feriti. Le scuole di Genova resteranno chiuse anche domani.'],['N','Economia: secondo i dati diffusi oggi, la vendita di biciclette elettriche è cresciuta del quindici per cento rispetto all\'anno scorso. A trainare il mercato sono soprattutto le grandi città del Nord.'],['N','Cultura: si è aperta oggi a Torino una mostra dedicata ai manifesti del cinema italiano degli anni Sessanta. L\'esposizione resterà aperta fino a marzo e l\'ingresso sarà gratuito la prima domenica del mese.']],
q:[["Che cosa è successo in Liguria?",["Un terremoto","Forti piogge","Uno sciopero","Un incendio"],1],["Che cosa resterà chiuso domani a Genova?",["Le strade","Le scuole","I negozi","L'aeroporto"],1],["Di quanto sono cresciute le vendite di biciclette elettriche?",["Del 5%","Del 15%","Del 50%","Del 25%"],1],["Quando l'ingresso alla mostra sarà gratuito?",["Ogni giorno","La prima domenica del mese","Il sabato","Mai"],1]]},
{t:'Intervista a una restauratrice', lvl:'B2', lines:[
['A','Oggi abbiamo con noi Marta Ruggeri, restauratrice di affreschi. Marta, come si diventa restauratori?'],['B','Serve una formazione lunga: cinque anni di studi specialistici, e poi tanta pratica nei cantieri. È un mestiere che si impara soprattutto guardando lavorare chi ha più esperienza.'],['A','Qual è la parte più difficile del suo lavoro?'],['B','Sapersi fermare. Il restauro non deve rendere un\'opera «nuova», ma conservarla e renderla leggibile. Ogni intervento deve essere riconoscibile e, se possibile, reversibile.'],['A','C\'è un lavoro a cui è particolarmente legata?'],['B','Un piccolo affresco in una chiesa di campagna, in Umbria. Nessuno lo considerava importante. Quando abbiamo tolto lo sporco, sono comparsi colori che nessuno vedeva da secoli. Gli abitanti del paese venivano ogni sera a guardare: per loro era come ritrovare un pezzo di famiglia.']],
q:[["Come si impara il mestiere, secondo Marta?",["Solo studiando libri","Con lunghi studi e molta pratica","Con un corso online","Da soli"],1],["Qual è la parte più difficile del lavoro?",["Trovare clienti","Sapersi fermare","Lavorare in alto","Usare i colori"],1],["Secondo Marta, il restauro deve…",["rendere l'opera nuova","conservare l'opera e renderla leggibile","cambiare i colori","nascondere i danni"],1],["Perché l'affresco umbro è speciale per lei?",["È molto famoso","Gli abitanti l'hanno sentito come un pezzo di famiglia","È il più grande d'Italia","L'ha dipinto lei"],1]]}
];

/* ───────── FRASARIO ───────── */
const FRASARIO = [
{t:'Fare conoscenza', lvl:'A1', f:[["Piacere, mi chiamo…","Prazer, eu me chamo…"],["Di dove sei?","De onde você é?"],["Sono brasiliana, ma vivo all'estero.","Sou brasileira, mas moro no exterior."],["Che lavoro fai?","Em que você trabalha?"],["Da quanto tempo studi l'italiano?","Há quanto tempo você estuda italiano?"],["Scusa, puoi parlare più lentamente?","Desculpa, pode falar mais devagar?"],["Come si dice … in italiano?","Como se diz … em italiano?"],["Non ho capito, puoi ripetere?","Não entendi, pode repetir?"]]},
{t:'Al bar', lvl:'A1', f:[["Un caffè, per favore.","Um café (espresso), por favor."],["Vorrei un cappuccino e un cornetto.","Queria um cappuccino e um croissant."],["Quant'è?","Quanto é?"],["Posso pagare con la carta?","Posso pagar com cartão?"],["Un bicchiere d'acqua, per favore.","Um copo d'água, por favor."],["Dov'è il bagno?","Onde é o banheiro?"],["Grazie, buona giornata!","Obrigada, bom dia!"]]},
{t:'Al ristorante', lvl:'A1–A2', f:[["Avete un tavolo per due?","Vocês têm uma mesa para dois?"],["Ho prenotato a nome…","Fiz uma reserva em nome de…"],["Che cosa ci consiglia?","O que o senhor nos recomenda?"],["Sono vegetariana / allergica a…","Sou vegetariana / alérgica a…"],["Per me un primo e un contorno.","Para mim um primeiro prato e um acompanhamento."],["Il conto, per favore.","A conta, por favor."],["È tutto buonissimo, complimenti!","Está tudo delicioso, parabéns!"]]},
{t:'In albergo', lvl:'A2', f:[["Ho una prenotazione a nome…","Tenho uma reserva em nome de…"],["La colazione è compresa?","O café da manhã está incluído?"],["A che ora devo lasciare la camera?","A que horas tenho que deixar o quarto?"],["L'aria condizionata non funziona.","O ar-condicionado não funciona."],["Posso lasciare la valigia qui?","Posso deixar a mala aqui?"],["Mi può chiamare un taxi?","Pode me chamar um táxi?"]]},
{t:'In stazione e in giro', lvl:'A2', f:[["Un biglietto per Firenze, andata e ritorno.","Uma passagem para Florença, ida e volta."],["Da quale binario parte?","De qual plataforma sai?"],["Il treno è in ritardo?","O trem está atrasado?"],["Devo convalidare il biglietto?","Tenho que validar a passagem?"],["Scusi, come arrivo al centro?","Com licença, como chego ao centro?"],["È lontano a piedi?","É longe a pé?"],["Mi sono persa.","Eu me perdi."]]},
{t:'Dal medico e in farmacia', lvl:'A2–B1', f:[["Non mi sento bene.","Não estou me sentindo bem."],["Ho mal di testa / di gola / di pancia.","Estou com dor de cabeça / de garganta / de barriga."],["Ho la febbre da due giorni.","Estou com febre há dois dias."],["Sono allergica alla penicillina.","Sou alérgica a penicilina."],["Ci vuole la ricetta?","Precisa de receita?"],["Quante volte al giorno devo prenderlo?","Quantas vezes por dia tenho que tomar?"]]},
{t:'Al telefono', lvl:'B1', f:[["Pronto? Parlo con…?","Alô? Estou falando com…?"],["Chiamo per…","Estou ligando por causa de…"],["Mi può passare…, per favore?","Pode me passar para…, por favor?"],["Può richiamarmi più tardi?","Pode me ligar de volta mais tarde?"],["La linea è disturbata, non la sento bene.","A linha está ruim, não ouço bem."],["Le lascio il mio numero.","Deixo o meu número."]]},
{t:'Fare amicizia e uscire', lvl:'B1', f:[["Ti va di prendere un aperitivo?","Topa tomar um aperitivo?"],["Che fai stasera?","O que você vai fazer hoje à noite?"],["Ci sto! / Purtroppo non posso.","Topo! / Infelizmente não posso."],["Ci vediamo alle otto davanti al cinema.","A gente se vê às oito em frente ao cinema."],["Che bello rivederti!","Que bom te ver de novo!"],["Dai, offro io!","Deixa, eu pago!"]]},
{t:'Al lavoro', lvl:'B1–B2', f:[["Possiamo fissare una riunione per giovedì?","Podemos marcar uma reunião para quinta?"],["Ti mando il documento entro oggi.","Te mando o documento ainda hoje."],["Scusate il ritardo.","Desculpem o atraso."],["Potresti spiegarmi meglio questo punto?","Você poderia me explicar melhor este ponto?"],["Sono d'accordo, però propongo di…","Concordo, mas proponho…"],["Ci aggiorniamo la settimana prossima.","Voltamos a conversar semana que vem."]]},
{t:'Esprimere un\'opinione', lvl:'B2', f:[["Secondo me…","Na minha opinião…"],["Dal mio punto di vista…","Do meu ponto de vista…"],["Credo che sia importante…","Acho que é importante…"],["Non sono del tutto d'accordo.","Não concordo totalmente."],["Hai ragione, ma bisogna considerare che…","Você tem razão, mas é preciso considerar que…"],["Da un lato…, dall'altro…","Por um lado…, por outro…"],["In fin dei conti…","No fim das contas…"]]},
{t:'Argomentare e dibattere', lvl:'C1', f:[["Vorrei soffermarmi su un aspetto…","Gostaria de me deter num aspecto…"],["Non è tanto una questione di…, quanto di…","Não é tanto uma questão de…, mas de…"],["Ammesso che sia vero…","Supondo que seja verdade…"],["Questo non significa che…","Isso não quer dizer que…"],["Mi permetto di dissentire.","Permito-me discordar."],["Per riassumere…","Para resumir…"],["Ne consegue che…","Disso decorre que…"]]},
{t:'Riempitivi: suonare naturale', lvl:'B1–C1', f:[["Allora…","Então…"],["Cioè…","Quer dizer…"],["Insomma…","Enfim…"],["Diciamo che…","Digamos que…"],["Boh, non lo so.","Sei lá, não sei."],["Magari!","Quem dera!"],["Figurati!","Imagina! (de nada)"],["Dai!","Vai! / Ah, para!"],["Ecco!","Isso! / Pronto!"]]}
];

/* ───────── CONVERSAZIONE CON L'IA ───────── */
const ROLEPLAY = [
{t:'Al bar', lvl:'A1', role:'un barista simpatico di un bar di Roma', goal:'ordinare una colazione e pagare'},
{t:'Fare conoscenza', lvl:'A1', role:'una ragazza italiana conosciuta a una festa, curiosa e gentile', goal:'presentarsi, dire di dove sei, che lavoro fai e perché studi italiano'},
{t:'Chiedere indicazioni', lvl:'A1', role:'un signore anziano di Bologna, cordiale, che spiega la strada', goal:'arrivare dalla stazione alla Piazza Maggiore'},
{t:'In albergo', lvl:'A2', role:'il receptionist di un albergo a Firenze', goal:'fare il check-in e risolvere un problema con la camera'},
{t:'Al ristorante', lvl:'A2', role:'un cameriere di una trattoria napoletana, un po\' scherzoso', goal:'ordinare una cena completa e chiedere consigli'},
{t:'Dal medico', lvl:'A2', role:'un medico di base, calmo e professionale', goal:'spiegare i sintomi di un raffreddore e capire la terapia'},
{t:'Cercare casa', lvl:'B1', role:'una proprietaria che affitta una stanza a Torino', goal:'chiedere prezzo, spese, regole della casa e fissare una visita'},
{t:'Un reclamo in negozio', lvl:'B1', role:'un commesso di un negozio di elettronica', goal:'restituire un prodotto difettoso e ottenere il rimborso'},
{t:'Colloquio di lavoro', lvl:'B2', role:'una responsabile delle risorse umane di un\'azienda tecnologica milanese', goal:'presentare la propria esperienza, rispondere a domande difficili e chiedere informazioni sul contratto'},
{t:'Un dibattito tra amici', lvl:'B2', role:'un amico italiano con opinioni forti sul lavoro da remoto', goal:'difendere la propria opinione con argomenti e concedere qualcosa'},
{t:'Una telefonata formale', lvl:'B2', role:'un impiegato della segreteria di un\'università', goal:'chiedere informazioni sull\'iscrizione a un corso e sui documenti necessari'},
{t:'Intervista radiofonica', lvl:'C1', role:'una giornalista di una radio culturale', goal:'raccontare il proprio rapporto con le lingue e la migrazione, con riflessioni personali e argomentate'}
];

/* ───────── PROVA ORALE ───────── */
const ORALE = [
{lvl:'A2', t:'Presentazione', p:'Presentati: chi sei, di dove sei, che cosa fai, la tua famiglia, i tuoi interessi.', prep:30, talk:60},
{lvl:'A2', t:'La tua città', p:'Descrivi la città o il quartiere in cui vivi: che cosa c\'è, che cosa ti piace e che cosa no.', prep:30, talk:60},
{lvl:'A2', t:'Un fine settimana', p:'Racconta che cosa hai fatto lo scorso fine settimana.', prep:30, talk:60},
{lvl:'B1', t:'Un ricordo', p:'Racconta un viaggio importante della tua vita: dove, con chi, che cosa è successo, che cosa hai imparato.', prep:60, talk:120},
{lvl:'B1', t:'Abitudini', p:'Come è cambiata la tua vita negli ultimi cinque anni? Confronta passato e presente.', prep:60, talk:120},
{lvl:'B1', t:'Consigli', p:'Un amico vuole imparare una lingua straniera da solo. Che cosa gli consigli? Perché?', prep:60, talk:120},
{lvl:'B2', t:'Argomentare', p:'«Lo smartphone ci ha reso più soli.» Sei d\'accordo? Argomenta con esempi, considera anche il punto di vista opposto.', prep:90, talk:180},
{lvl:'B2', t:'Ipotesi', p:'Se potessi vivere un anno in qualsiasi città del mondo, quale sceglieresti e come cambierebbe la tua vita?', prep:90, talk:180},
{lvl:'B2', t:'Problema e soluzione', p:'Nella tua città il traffico è un problema serio. Proponi tre soluzioni e valutane vantaggi e svantaggi.', prep:90, talk:180},
{lvl:'C1', t:'Riflessione', p:'In che misura la lingua che parliamo influenza il nostro modo di pensare? Argomenta partendo dalla tua esperienza.', prep:120, talk:240},
{lvl:'C1', t:'Attualità', p:'Il turismo di massa sta trasformando molte città europee. Analizza il fenomeno, le sue cause e le possibili politiche per gestirlo.', prep:120, talk:240},
{lvl:'C1', t:'Etica', p:'L\'intelligenza artificiale nel lavoro: opportunità o minaccia? Esprimi una posizione articolata e rispondi alle possibili obiezioni.', prep:120, talk:240}
];

/* ───────── PARLA E ASCOLTA per unità: domande e ricerche video ───────── */
const USPEAK = {
101:{p:['Come ti chiami e di dove sei?','Dove abiti adesso?','Che lavoro fai?','Perché studi l\'italiano?','Come saluti una persona che non conosci?'],v:['pronuncia italiana per principianti','saluti in italiano presentarsi']},
102:{p:['Descrivi una persona della tua famiglia.','Quanti anni hai?','Com\'è il tuo carattere?','Di che nazionalità sono i tuoi amici?','Di che cosa hai paura?'],v:['verbi essere e avere italiano','descrivere una persona in italiano']},
103:{p:['Che cosa c\'è nella tua stanza?','Qual è il tuo oggetto preferito?','Quanti libri hai a casa?','Descrivi la tua cucina.','Che cosa c\'è nella tua borsa?'],v:['articoli determinativi italiano principianti','plurale dei nomi italiano']},
104:{p:['Che cosa fai la mattina?','Che lingue parli?','Che cosa mangi a pranzo?','Che cosa non fai mai?','Dove lavori o studi?'],v:['presente indicativo verbi regolari italiano','la mia giornata in italiano']},
105:{p:['Che cosa vuoi fare questo fine settimana?','Che cosa devi fare domani?','Dove vai in vacanza?','Che cosa sai fare bene?','Che cosa fai il sabato?'],v:['verbi irregolari andare fare venire italiano','verbi modali volere potere dovere']},
106:{p:['A che ora ti svegli?','Racconta la tua routine.','Quando è il tuo compleanno?','Qual è il tuo giorno preferito? Perché?','Quale stagione preferisci?'],v:['che ore sono in italiano','verbi riflessivi routine italiano']},
107:{p:['Che cosa c\'è nel tuo quartiere?','Come vai al lavoro?','Spiega come arrivare a casa tua dalla stazione.','Che cosa c\'è vicino a casa tua?','Qual è il posto più bello della tua città?'],v:['chiedere indicazioni in italiano','preposizioni semplici italiano']},
108:{p:['Che cosa ti piace mangiare?','Che musica ti piace?','Che cosa non ti piace fare?','Che cosa ordini al bar?','Qual è il tuo piatto italiano preferito?'],v:['ordinare al bar in italiano','verbo piacere spiegazione']},
1:{p:['Descrivi il tuo quartiere ideale.','Dove vai quando sei malata?','Che cosa compri al mercato?','Che cosa hai nello zaino?','Racconta il tuo sabato mattina.'],v:['preposizioni articolate italiano','fare la spesa al mercato italiano']},
2:{p:['Che cosa hai fatto ieri?','Racconta un viaggio andato storto.','A che ora ti sei svegliata stamattina?','Che film hai visto ultimamente?','Che cosa hai mangiato ieri sera?'],v:['passato prossimo essere o avere','raccontare un viaggio in italiano']},
3:{p:['Com\'era la tua casa da bambina?','Che cosa facevi d\'estate da piccola?','Racconta un ricordo d\'infanzia.','Che cosa stavi facendo ieri alle otto?','Com\'era la tua scuola?'],v:['imperfetto e passato prossimo differenza','trapassato prossimo italiano']},
4:{p:['Che cosa regali ai tuoi amici per il compleanno?','Hai prestato qualcosa a qualcuno di recente?','Che cosa ti hanno regalato l\'ultima volta?','Chi chiami quando hai un problema?','A chi racconti i tuoi segreti?'],v:['pronomi combinati glielo me lo','pronomi diretti e indiretti italiano']},
5:{p:['Quanto tempo ci metti per arrivare al lavoro?','Quanti caffè bevi al giorno?','Che cosa ne pensi dei social network?','Ci sei mai stata in Italia? Racconta.','Quando non ce la fai più, che cosa fai?'],v:['particelle ci e ne','ci vuole ci metto differenza']},
6:{p:['Come sarà la tua vita tra dieci anni?','Che cosa farai le prossime vacanze?','Che cosa faresti con un milione di euro?','Che consiglio daresti a chi comincia l\'italiano?','Che cosa ti hanno promesso e non hanno fatto?'],v:['futuro semplice italiano','condizionale presente e passato']},
7:{p:['Dai cinque consigli a un turista nella tua città.','Spiega una ricetta usando l\'imperativo.','Che cosa diresti a un amico stressato?','Come chiedi qualcosa a uno sconosciuto con il Lei?','Quali sono le regole della tua casa?'],v:['imperativo italiano con pronomi','imperativo formale Lei']},
8:{p:['Che cosa pensi del lavoro da remoto?','Che cosa speri per il futuro?','È importante che i bambini imparino le lingue? Perché?','Che cosa ti preoccupa del mondo di oggi?','Cerchi una casa: com\'è la casa che sogni?'],v:['congiuntivo presente spiegazione','penso che congiuntivo o indicativo']},
9:{p:['Che cosa pensavano i tuoi genitori del tuo lavoro?','Che cosa vorresti che cambiasse nella tua vita?','Racconta una decisione importante e le reazioni degli altri.','Magari…! Che cosa desideri?','Chi conosci che parla come se sapesse tutto?'],v:['congiuntivo imperfetto italiano','concordanza dei tempi congiuntivo']},
10:{p:['Se potessi vivere in Italia, dove vivresti?','Se avessi scelto un\'altra professione, che cosa faresti oggi?','Che cosa faresti se vincessi la lotteria?','Se fossi il sindaco della tua città, che cosa cambieresti?','Se avessi saputo l\'italiano da piccola, che cosa sarebbe cambiato?'],v:['periodo ipotetico italiano','se avessi saputo frasi ipotetiche']},
11:{p:['Spiega come si prepara un piatto tipico del tuo Paese.','Come si festeggia il Natale nella tua famiglia?','Che cosa si fa la domenica nel tuo Paese?','Descrivi un processo del tuo lavoro.','Quali regole vanno rispettate in ufficio?'],v:['si impersonale e si passivante','forma passiva italiano venire andare']},
12:{p:['Riferisci una conversazione di ieri.','Che cosa ti ha detto l\'ultima persona con cui hai parlato?','Racconta una storia usando «eppure», «anzi», «insomma».','Che libro italiano vorresti leggere?','Riassumi una notizia che hai letto oggi.'],v:['discorso indiretto italiano','connettivi italiano tuttavia eppure anzi']},
13:{p:['Descrivi la città da cui vieni.','Parla di una persona il cui lavoro ammiri.','Qual è il libro di cui parli di più?','Descrivi un luogo in cui ti senti a casa.','Chi è la persona con cui parli di più?'],v:['pronomi relativi cui il quale','il cui la cui italiano']},
14:{p:['Che abitudine hai smesso di avere?','Che cosa hai deciso di fare quest\'anno?','Di chi o di che cosa ti sei innamorata?','Che cosa sei riuscita a fare di cui sei orgogliosa?','Su chi puoi contare?'],v:['verbi con preposizione a di italiano','smettere di cominciare a']},
15:{p:['Racconta come te la sei cavata in una situazione difficile.','Che cosa ti fai fare dal parrucchiere?','Quando non te la senti di uscire, che cosa fai?','Ce l\'hai con qualcuno? Perché?','Come te la passi in questo periodo?'],v:['fare causativo italiano','cavarsela farcela prendersela']},
16:{p:['Presenta un reclamo a voce, in registro formale.','Spiega un progetto di lavoro come in una riunione.','Chiedi informazioni a un ufficio pubblico.','Riassumi un problema e proponi una soluzione formale.','Presentati come in un colloquio di lavoro.'],v:['email formale in italiano','registro formale italiano lessico']}
};
