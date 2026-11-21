/* falso amigo: [italiano, significado, armadilha, exemplo] */
const FALSI = [
["burro","manteiga","ES/PT burro = asino","Pane, burro e marmellata."],
["salire","subir","ES salir = uscire","Sono salita al terzo piano."],
["guardare","olhar","PT guardar = mettere via, conservare","Guarda che bel tramonto!"],
["caldo","quente","ES caldo = brodo","Oggi fa un caldo terribile."],
["aceto","vinagre","ES aceite = olio","Insalata con olio e aceto."],
["largo","largo, amplo","ES largo = lungo","Una strada larga dieci metri."],
["squisito","delicioso","PT esquisito = strano","Che torta squisita!"],
["autista","motorista","PT autista = persona autistica","L'autista dell'autobus era gentile."],
["macchina","carro","PT máquina = macchinario, apparecchio","Vado in ufficio in macchina."],
["camera","quarto (cômodo)","PT câmera = macchina fotografica / telecamera","La camera da letto è piccola."],
["tirare","puxar","ES/PT tirar = togliere, buttare","Tirare la porta (non spingere)."],
["imbarazzata","envergonhada, constrangida","ES embarazada = incinta","Ero imbarazzatissima davanti a tutti."],
["topo","rato","PT topo = cima","Un topo in cucina!"],
["cena","jantar","PT cena = scena","La cena è alle otto."],
["presto","cedo, logo","PT/ES presto = veloce; ES pronto = presto","Mi alzo presto. A presto!"],
["negozio","loja","PT negócio = affare","Il negozio apre alle nove."],
["gamba","perna","ES gamba = gambero","Mi fa male la gamba."],
["seta","seda","ES seta = fungo","Una camicia di seta."],
["ufficio","escritório","PT ofício = mestiere","Lavoro in ufficio."],
["polpo","polvo (animal)","PT polvo = polpo; IT polvere = pó","Insalata di polpo."],
["bravo","bom, competente","ES/PT bravo = arrabbiato, feroce","È una brava insegnante."],
["rumore","barulho","PT/ES rumor = voce, pettegolezzo","Che rumore fanno i vicini!"],
["morbido","macio, fofo","PT mórbido = morboso","Un cuscino morbido."],
["donna","mulher","PT dona = proprietaria, signora","Una donna molto simpatica."],
["conto","conta (restaurante)","PT/ES conto/cuento = racconto","Il conto, per favore!"],
["palestra","academia (de ginástica)","PT palestra = conferenza","Vado in palestra tre volte a settimana."],
["carta","papel","PT/ES carta = lettera","Un foglio di carta."],
["tasca","bolso (de roupa)","ES tasca = osteria, bettola","Ho le chiavi in tasca."],
["cattivo","mau, ruim","PT cativo = prigioniero","Un cattivo odore."],
["licenziare","demitir","PT licenciar = abilitare, laureare","L'hanno licenziato dopo un mese."],
["vaso","vaso (de flores)","ES vaso = bicchiere","Un vaso di fiori sul tavolo."],
["pelo","pelo (do corpo)","ES pelo = capelli","Ha i capelli lunghi (non i peli!)."],
["salsa","molho","ES/PT salsa = prezzemolo (PT)","Pasta con la salsa di pomodoro."],
["fermare","parar","PT firmar = fissare; IT firmare = assinar","Ferma la macchina!"],
["annoiarsi","entediar-se","PT enjoar = avere la nausea","Mi annoio a morte."],
["eventualmente","se for o caso, se necessário","PT eventualmente = ogni tanto","Eventualmente ti chiamo io."],
["subire","sofrer (algo), aguentar","PT/ES subir = salire","Ha subito un'operazione."],
["levare","tirar, remover","PT/ES levar = portare","Levati le scarpe, per favore."],
["intendere","pretender, ter a intenção","PT/ES entender = capire","Che cosa intendi fare?"],
["pretendere","exigir","PT/ES pretender = intendere","Pretendo una risposta!"]
];

/* verbos: pres(6), part, aux, fut (radical), imp (radical), cong [sing,noi,voi,loro], cimp (radical), pr [io,lui,loro], noiPR (opcional) */
const VERBI = {
essere:{pres:['sono','sei','è','siamo','siete','sono'],part:'stato',aux:'E',fut:'sar',impF:['ero','eri','era','eravamo','eravate','erano'],cong:['sia','siamo','siate','siano'],cimp:'fo',pr:['fui','fu','furono'],noiPR:'fummo'},
avere:{pres:['ho','hai','ha','abbiamo','avete','hanno'],part:'avuto',aux:'A',fut:'avr',imp:'ave',cong:['abbia','abbiamo','abbiate','abbiano'],cimp:'ave',pr:['ebbi','ebbe','ebbero']},
fare:{pres:['faccio','fai','fa','facciamo','fate','fanno'],part:'fatto',aux:'A',fut:'far',imp:'face',cong:['faccia','facciamo','facciate','facciano'],cimp:'face',pr:['feci','fece','fecero']},
andare:{pres:['vado','vai','va','andiamo','andate','vanno'],part:'andato',aux:'E',fut:'andr',imp:'anda',cong:['vada','andiamo','andiate','vadano'],cimp:'anda',pr:['andai','andò','andarono']},
venire:{pres:['vengo','vieni','viene','veniamo','venite','vengono'],part:'venuto',aux:'E',fut:'verr',imp:'veni',cong:['venga','veniamo','veniate','vengano'],cimp:'veni',pr:['venni','venne','vennero']},
dire:{pres:['dico','dici','dice','diciamo','dite','dicono'],part:'detto',aux:'A',fut:'dir',imp:'dice',cong:['dica','diciamo','diciate','dicano'],cimp:'dice',pr:['dissi','disse','dissero']},
dare:{pres:['do','dai','dà','diamo','date','danno'],part:'dato',aux:'A',fut:'dar',imp:'da',cong:['dia','diamo','diate','diano'],cimp:'de',pr:['diedi/detti','diede/dette','diedero/dettero']},
stare:{pres:['sto','stai','sta','stiamo','state','stanno'],part:'stato',aux:'E',fut:'star',imp:'sta',cong:['stia','stiamo','stiate','stiano'],cimp:'ste',pr:['stetti','stette','stettero']},
potere:{pres:['posso','puoi','può','possiamo','potete','possono'],part:'potuto',aux:'A',fut:'potr',imp:'pote',cong:['possa','possiamo','possiate','possano'],cimp:'pote',pr:['potei/potetti','poté/potette','poterono/potettero']},
volere:{pres:['voglio','vuoi','vuole','vogliamo','volete','vogliono'],part:'voluto',aux:'A',fut:'vorr',imp:'vole',cong:['voglia','vogliamo','vogliate','vogliano'],cimp:'vole',pr:['volli','volle','vollero']},
dovere:{pres:['devo','devi','deve','dobbiamo','dovete','devono'],part:'dovuto',aux:'A',fut:'dovr',imp:'dove',cong:['debba','dobbiamo','dobbiate','debbano'],cimp:'dove',pr:['dovetti/dovei','dovette/dové','dovettero/doverono']},
sapere:{pres:['so','sai','sa','sappiamo','sapete','sanno'],part:'saputo',aux:'A',fut:'sapr',imp:'sape',cong:['sappia','sappiamo','sappiate','sappiano'],cimp:'sape',pr:['seppi','seppe','seppero']},
uscire:{pres:['esco','esci','esce','usciamo','uscite','escono'],part:'uscito',aux:'E',fut:'uscir',imp:'usci',cong:['esca','usciamo','usciate','escano'],cimp:'usci',pr:['uscii','uscì','uscirono']},
rimanere:{pres:['rimango','rimani','rimane','rimaniamo','rimanete','rimangono'],part:'rimasto',aux:'E',fut:'rimarr',imp:'rimane',cong:['rimanga','rimaniamo','rimaniate','rimangano'],cimp:'rimane',pr:['rimasi','rimase','rimasero']},
bere:{pres:['bevo','bevi','beve','beviamo','bevete','bevono'],part:'bevuto',aux:'A',fut:'berr',imp:'beve',cong:['beva','beviamo','beviate','bevano'],cimp:'beve',pr:['bevvi','bevve','bevvero']},
tenere:{pres:['tengo','tieni','tiene','teniamo','tenete','tengono'],part:'tenuto',aux:'A',fut:'terr',imp:'tene',cong:['tenga','teniamo','teniate','tengano'],cimp:'tene',pr:['tenni','tenne','tennero']},
scegliere:{pres:['scelgo','scegli','sceglie','scegliamo','scegliete','scelgono'],part:'scelto',aux:'A',fut:'sceglier',imp:'sceglie',cong:['scelga','scegliamo','scegliate','scelgano'],cimp:'sceglie',pr:['scelsi','scelse','scelsero']},
parlare:{pres:['parlo','parli','parla','parliamo','parlate','parlano'],part:'parlato',aux:'A',fut:'parler',imp:'parla',cong:['parli','parliamo','parliate','parlino'],cimp:'parla',pr:['parlai','parlò','parlarono']},
credere:{pres:['credo','credi','crede','crediamo','credete','credono'],part:'creduto',aux:'A',fut:'creder',imp:'crede',cong:['creda','crediamo','crediate','credano'],cimp:'crede',pr:['credei/credetti','credé/credette','crederono/credettero']},
finire:{pres:['finisco','finisci','finisce','finiamo','finite','finiscono'],part:'finito',aux:'A',fut:'finir',imp:'fini',cong:['finisca','finiamo','finiate','finiscano'],cimp:'fini',pr:['finii','finì','finirono']}
};
const PERSONE = ['io','tu','lui/lei','noi','voi','loro'];
const TEMPI = {
pres:'presente', imp:'imperfetto', pp:'passato prossimo', fut:'futuro', cond:'condizionale',
cong:'congiuntivo presente', cimp:'congiuntivo imperfetto', pr:'passato remoto'
};
function coniuga(v, t){
  const d = VERBI[v];
  switch(t){
    case 'pres': return d.pres.slice();
    case 'imp': return d.impF ? d.impF.slice() : ['vo','vi','va','vamo','vate','vano'].map(e=>d.imp+e);
    case 'fut': return ['ò','ai','à','emo','ete','anno'].map(e=>d.fut+e);
    case 'cond': return ['ei','esti','ebbe','emmo','este','ebbero'].map(e=>d.fut+e);
    case 'cong': return [d.cong[0],d.cong[0],d.cong[0],d.cong[1],d.cong[2],d.cong[3]];
    case 'cimp': return ['ssi','ssi','sse','ssimo','ste','ssero'].map(e=>d.cimp+e);
    case 'pr': return [d.pr[0], d.cimp+'sti', d.pr[1], d.noiPR || d.cimp+'mmo', d.cimp+'ste', d.pr[2]];
    case 'pp': {
      const A=['ho','hai','ha','abbiamo','avete','hanno'], E=['sono','sei','è','siamo','siete','sono'];
      const st = d.part.slice(0,-1);
      return d.aux==='A' ? A.map(a=>a+' '+d.part)
        : E.map((a,i)=> i<3 ? a+' '+st+'o/'+st+'a' : a+' '+st+'i/'+st+'e');
    }
  }
}
