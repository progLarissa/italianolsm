FALSI.push(
["comportare","implicar, acarretar","PT comportar-se = IT comportarsi","Il progetto comporta dei rischi."],
["riparare","consertar","PT reparar = notare, accorgersi","Devo far riparare la bici."],
["attendere","esperar, aguardar","PT/ES atender = rispondere, servire","Attenda in linea, prego."],
["aspettare","esperar (alguém, algo)","ES/PT esperar = anche sperare (ter esperança)","Ti aspetto alle otto. / Spero che venga."],
["assistere","presenciar, assistir (a um evento), ajudar","PT assistir TV = guardare la TV","Ho assistito all'incidente."],
["spesa","compras de mercado, gasto","PT despesa = solo spesa come costo","Vado a fare la spesa."],
["fretta","pressa","PT frete = trasporto, spedizione","Ho fretta, scusa!"],
["esperto","especialista, experiente","PT esperto = furbo, sveglio","È un esperto di informatica."],
["sentire","ouvir e sentir","PT sentir = solo provare (non udire)","Senti questa canzone!"],
["ricoverare","internar (hospital)","PT recuperar = recuperare","L'hanno ricoverato d'urgenza."],
["estate","verão","PT estado / ES estado = stato","Quest'estate vado in Sicilia."],
["stanza","cômodo, quarto","PT estância = tenuta, località","Un appartamento di tre stanze."],
["trucco","maquiagem; truque","PT truque = solo inganno","Si è tolta il trucco."],
["brutto","feio, ruim","PT bruto = rozzo, grezzo","Che brutto tempo!"],
["mancia","gorjeta","PT/ES mancha = macchia","Ho lasciato la mancia al cameriere."],
["riso","arroz; riso (risada)","PT riso = solo risata","Risotto: si fa con il riso Carnaroli."],
["spalla","ombro","ES espalda = schiena (costas)","Mi fa male la spalla destra."],
["salire","subir","ES salir = uscire","Sali in macchina!"],
["gentile","amável","PT/ES gentil = (simile) ma anche pagão (gentio)","Sei molto gentile."],
["parare","defender (gol), aparar","PT/ES parar = fermare/fermarsi","Il portiere ha parato il rigore."],
["vivanda","comida, alimento","PT vivenda = villa, casa","Vivande e bevande."],
["lusinga","lisonja","PT/ES lisonja (ok), mas IT lusingato = lisonjeado","Mi sento lusingata."],
["prossimo","próximo; o próximo (pessoa)","ES próximo = vicino (anche IT vicino!)","Il prossimo treno parte alle 9."],
["vicino","perto, vizinho","PT vizinho (ok), ES vecino; ma IT vicino = anche perto","Abito vicino alla stazione."],
["affogare","afogar-se","PT afogar (ok), ma ES ahogar; IT soffocare = sufocar","Ha rischiato di affogare."],
["piccante","apimentado","PT picante (ok); IT pepe = pimenta-do-reino","Non mi piace il cibo piccante."]
);
/* tira entradas repetidas ou pouco úteis */
(function(){ const seen=new Set(); for(let i=FALSI.length-1;i>=0;i--){ const k=FALSI[i][0]; if(seen.has(k)||['lusinga','affogare','piccante','gentile','prossimo','vicino'].includes(k)) FALSI.splice(i,1); else seen.add(k); } FALSI.sort((a,b)=>a[0].localeCompare(b[0],'it')); })();

/* significado e grupo dos verbos existentes */
const VPT={essere:'ser, estar',avere:'ter',fare:'fazer',andare:'ir',venire:'vir',dire:'dizer',dare:'dar',stare:'estar, ficar',potere:'poder',volere:'querer',dovere:'dever',sapere:'saber',uscire:'sair',rimanere:'ficar, permanecer',bere:'beber',tenere:'segurar, manter',scegliere:'escolher',parlare:'falar',credere:'acreditar',finire:'terminar'};
Object.keys(VPT).forEach(k=>{ VERBI[k].pt=VPT[k]; VERBI[k].g=['parlare','credere','finire'].includes(k)?'reg':'irr'; });

/* novos verbos: presente | particípio | aux | futuro | imperfetto | congiuntivo (sing,noi,voi,loro) | cong. imperfetto | passato remoto (io,lui,loro) | significado | grupo */
function V(pres,part,aux,fut,imp,cong,cimp,pr,pt,g){ return {pres:pres.split(' '),part,aux,fut,imp,cong:cong.split(' '),cimp,pr:pr.split(' '),pt,g}; }
Object.assign(VERBI,{
porre:V('pongo poni pone poniamo ponete pongono','posto','A','porr','pone','ponga poniamo poniate pongano','pone','posi pose posero','pôr, colocar','irr'),
tradurre:V('traduco traduci traduce traduciamo traducete traducono','tradotto','A','tradurr','traduce','traduca traduciamo traduciate traducano','traduce','tradussi tradusse tradussero','traduzir','irr'),
piacere:V('piaccio piaci piace piacciamo piacete piacciono','piaciuto','E','piacer','piace','piaccia piacciamo piacciate piacciano','piace','piacqui piacque piacquero','agradar, gostar','irr'),
nascere:V('nasco nasci nasce nasciamo nascete nascono','nato','E','nascer','nasce','nasca nasciamo nasciate nascano','nasce','nacqui nacque nacquero','nascer','irr'),
morire:V('muoio muori muore moriamo morite muoiono','morto','E','morir','mori','muoia moriamo moriate muoiano','mori','morii morì morirono','morrer','irr'),
vivere:V('vivo vivi vive viviamo vivete vivono','vissuto','A','vivr','vive','viva viviamo viviate vivano','vive','vissi visse vissero','viver','irr'),
vedere:V('vedo vedi vede vediamo vedete vedono','visto','A','vedr','vede','veda vediamo vediate vedano','vede','vidi vide videro','ver','irr'),
prendere:V('prendo prendi prende prendiamo prendete prendono','preso','A','prender','prende','prenda prendiamo prendiate prendano','prende','presi prese presero','pegar, tomar','irr'),
mettere:V('metto metti mette mettiamo mettete mettono','messo','A','metter','mette','metta mettiamo mettiate mettano','mette','misi mise misero','pôr, colocar','irr'),
leggere:V('leggo leggi legge leggiamo leggete leggono','letto','A','legger','legge','legga leggiamo leggiate leggano','legge','lessi lesse lessero','ler','irr'),
scrivere:V('scrivo scrivi scrive scriviamo scrivete scrivono','scritto','A','scriver','scrive','scriva scriviamo scriviate scrivano','scrive','scrissi scrisse scrissero','escrever','irr'),
chiudere:V('chiudo chiudi chiude chiudiamo chiudete chiudono','chiuso','A','chiuder','chiude','chiuda chiudiamo chiudiate chiudano','chiude','chiusi chiuse chiusero','fechar','irr'),
aprire:V('apro apri apre apriamo aprite aprono','aperto','A','aprir','apri','apra apriamo apriate aprano','apri','aprii aprì aprirono','abrir','irr'),
chiedere:V('chiedo chiedi chiede chiediamo chiedete chiedono','chiesto','A','chieder','chiede','chieda chiediamo chiediate chiedano','chiede','chiesi chiese chiesero','pedir, perguntar','irr'),
rispondere:V('rispondo rispondi risponde rispondiamo rispondete rispondono','risposto','A','risponder','risponde','risponda rispondiamo rispondiate rispondano','risponde','risposi rispose risposero','responder','irr'),
correre:V('corro corri corre corriamo correte corrono','corso','A','correr','corre','corra corriamo corriate corrano','corre','corsi corse corsero','correr','irr'),
perdere:V('perdo perdi perde perdiamo perdete perdono','perso','A','perder','perde','perda perdiamo perdiate perdano','perde','persi perse persero','perder','irr'),
vincere:V('vinco vinci vince vinciamo vincete vincono','vinto','A','vincer','vince','vinca vinciamo vinciate vincano','vince','vinsi vinse vinsero','vencer, ganhar','irr'),
decidere:V('decido decidi decide decidiamo decidete decidono','deciso','A','decider','decide','decida decidiamo decidiate decidano','decide','decisi decise decisero','decidir','irr'),
conoscere:V('conosco conosci conosce conosciamo conoscete conoscono','conosciuto','A','conoscer','conosce','conosca conosciamo conosciate conoscano','conosce','conobbi conobbe conobbero','conhecer','irr'),
crescere:V('cresco cresci cresce cresciamo crescete crescono','cresciuto','E','crescer','cresce','cresca cresciamo cresciate crescano','cresce','crebbi crebbe crebbero','crescer','irr'),
salire:V('salgo sali sale saliamo salite salgono','salito','E','salir','sali','salga saliamo saliate salgano','sali','salii salì salirono','subir','irr'),
scendere:V('scendo scendi scende scendiamo scendete scendono','sceso','E','scender','scende','scenda scendiamo scendiate scendano','scende','scesi scese scesero','descer','irr'),
spegnere:V('spengo spegni spegne spegniamo spegnete spengono','spento','A','spegner','spegne','spenga spegniamo spegniate spengano','spegne','spensi spense spensero','apagar, desligar','irr'),
togliere:V('tolgo togli toglie togliamo togliete tolgono','tolto','A','toglier','toglie','tolga togliamo togliate tolgano','toglie','tolsi tolse tolsero','tirar, remover','irr'),
piangere:V('piango piangi piange piangiamo piangete piangono','pianto','A','pianger','piange','pianga piangiamo piangiate piangano','piange','piansi pianse piansero','chorar','irr'),
ridere:V('rido ridi ride ridiamo ridete ridono','riso','A','rider','ride','rida ridiamo ridiate ridano','ride','risi rise risero','rir','irr'),
rompere:V('rompo rompi rompe rompiamo rompete rompono','rotto','A','romper','rompe','rompa rompiamo rompiate rompano','rompe','ruppi ruppe ruppero','quebrar','irr'),
muovere:V('muovo muovi muove muoviamo muovete muovono','mosso','A','muover','muove','muova muoviamo muoviate muovano','muove','mossi mosse mossero','mover','irr'),
offrire:V('offro offri offre offriamo offrite offrono','offerto','A','offrir','offri','offra offriamo offriate offrano','offri','offrii offrì offrirono','oferecer','irr'),
mangiare:V('mangio mangi mangia mangiamo mangiate mangiano','mangiato','A','manger','mangia','mangi mangiamo mangiate mangino','mangia','mangiai mangiò mangiarono','comer','reg'),
cercare:V('cerco cerchi cerca cerchiamo cercate cercano','cercato','A','cercher','cerca','cerchi cerchiamo cerchiate cerchino','cerca','cercai cercò cercarono','procurar','reg'),
pagare:V('pago paghi paga paghiamo pagate pagano','pagato','A','pagher','paga','paghi paghiamo paghiate paghino','paga','pagai pagò pagarono','pagar','reg'),
cominciare:V('comincio cominci comincia cominciamo cominciate cominciano','cominciato','A','comincer','comincia','cominci cominciamo cominciate comincino','comincia','cominciai cominciò cominciarono','começar','reg'),
studiare:V('studio studi studia studiamo studiate studiano','studiato','A','studier','studia','studi studiamo studiate studino','studia','studiai studiò studiarono','estudar','reg'),
giocare:V('gioco giochi gioca giochiamo giocate giocano','giocato','A','giocher','gioca','giochi giochiamo giochiate giochino','gioca','giocai giocò giocarono','jogar, brincar','reg'),
arrivare:V('arrivo arrivi arriva arriviamo arrivate arrivano','arrivato','E','arriver','arriva','arrivi arriviamo arriviate arrivino','arriva','arrivai arrivò arrivarono','chegar','reg'),
tornare:V('torno torni torna torniamo tornate tornano','tornato','E','torner','torna','torni torniamo torniate tornino','torna','tornai tornò tornarono','voltar','reg'),
dormire:V('dormo dormi dorme dormiamo dormite dormono','dormito','A','dormir','dormi','dorma dormiamo dormiate dormano','dormi','dormii dormì dormirono','dormir','reg'),
partire:V('parto parti parte partiamo partite partono','partito','E','partir','parti','parta partiamo partiate partano','parti','partii partì partirono','partir','reg'),
sentire:V('sento senti sente sentiamo sentite sentono','sentito','A','sentir','senti','senta sentiamo sentiate sentano','senti','sentii sentì sentirono','ouvir, sentir','reg'),
capire:V('capisco capisci capisce capiamo capite capiscono','capito','A','capir','capi','capisca capiamo capiate capiscano','capi','capii capì capirono','entender','reg'),
preferire:V('preferisco preferisci preferisce preferiamo preferite preferiscono','preferito','A','preferir','preferi','preferisca preferiamo preferiate preferiscano','preferi','preferii preferì preferirono','preferir','reg'),
vendere:V('vendo vendi vende vendiamo vendete vendono','venduto','A','vender','vende','venda vendiamo vendiate vendano','vende','vendei/vendetti vendé/vendette venderono/vendettero','vender','reg')
});
function gerundio(v){ const d=VERBI[v]; if(v==='essere') return 'essendo'; const s=d.imp; return s.endsWith('a')? s+'ndo' : s.slice(0,-1)+'endo'; }
