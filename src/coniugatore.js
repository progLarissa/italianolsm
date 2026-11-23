/* ═════════ CONIUGATORE COMPLETO (senza IA) ═════════
   Coniuga qualsiasi verbo italiano: i verbi della lista (VERBI), altri irregolari, i composti
   (ri-fare, ot-tenere, pro-porre, pro-durre…), i verbi in -ere «forti» e tutti i regolari
   (-are, -ere, -ire, -ire con -isc-), anche riflessivi (alzarsi, divertirsi…). */

/* altri irregolari completi */
Object.assign(VERBI,{
cadere:V('cado cadi cade cadiamo cadete cadono','caduto','E','cadr','cade','cada cadiamo cadiate cadano','cade','caddi cadde caddero','cair','irr'),
sedere:V('siedo siedi siede sediamo sedete siedono','seduto','E','seder','sede','sieda sediamo sediate siedano','sede','sedetti sedette sedettero','sentar (sedersi: sentar-se)','irr'),
valere:V('valgo vali vale valiamo valete valgono','valso','E','varr','vale','valga valiamo valiate valgano','vale','valsi valse valsero','valer','irr'),
apparire:V('appaio appari appare appariamo apparite appaiono','apparso','E','apparir','appari','appaia appariamo appariate appaiano','appari','apparvi apparve apparvero','aparecer','irr'),
cogliere:V('colgo cogli coglie cogliamo cogliete colgono','colto','A','coglier','coglie','colga cogliamo cogliate colgano','coglie','colsi colse colsero','colher','irr'),
sciogliere:V('sciolgo sciogli scioglie sciogliamo sciogliete sciolgono','sciolto','A','scioglier','scioglie','sciolga sciogliamo sciogliate sciolgano','scioglie','sciolsi sciolse sciolsero','dissolver, soltar','irr'),
trarre:V('traggo trai trae traiamo traete traggono','tratto','A','trarr','trae','tragga traiamo traiate traggano','trae','trassi trasse trassero','tirar, extrair','irr'),
tacere:V('taccio taci tace tacciamo tacete tacciono','taciuto','A','tacer','tace','taccia tacciamo tacciate tacciano','tace','tacqui tacque tacquero','calar-se','irr'),
cuocere:V('cuocio cuoci cuoce cuociamo cuocete cuociono','cotto','A','cuocer','cuoce','cuocia cuociamo cuociate cuociano','cuoce','cossi cosse cossero','cozinhar, cozer','irr'),
cucire:V('cucio cuci cuce cuciamo cucite cuciono','cucito','A','cucir','cuci','cucia cuciamo cuciate cuciano','cuci','cucii cucì cucirono','costurar','irr'),
udire:V('odo odi ode udiamo udite odono','udito','A','udir','udi','oda udiamo udiate odano','udi','udii udì udirono','ouvir','irr'),
riempire:V('riempio riempi riempie riempiamo riempite riempiono','riempito','A','riempir','riempi','riempia riempiamo riempiate riempiano','riempi','riempii riempì riempirono','encher','irr'),
compiere:V('compio compi compie compiamo compite compiono','compiuto','A','compir','compi','compia compiamo compiate compiano','compi','compii compì compirono','completar, fazer (anos)','irr')
});

/* -ere forti: [passato remoto io, participio, significato, ausiliare se è «essere»] */
const ERE_FORTI={
accendere:['accesi','acceso','acender, ligar'],accorgere:['accorsi','accorto','perceber (accorgersi)'],aggiungere:['aggiunsi','aggiunto','acrescentar'],
appendere:['appesi','appeso','pendurar'],assumere:['assunsi','assunto','contratar, assumir'],attendere:['attesi','atteso','aguardar'],
concludere:['conclusi','concluso','concluir'],condividere:['condivisi','condiviso','compartilhar'],confondere:['confusi','confuso','confundir'],
coinvolgere:['coinvolsi','coinvolto','envolver'],correggere:['corressi','corretto','corrigir'],deludere:['delusi','deluso','decepcionar'],
difendere:['difesi','difeso','defender'],dipendere:['dipesi','dipeso','depender','E'],dipingere:['dipinsi','dipinto','pintar'],
dirigere:['diressi','diretto','dirigir'],discutere:['discussi','discusso','discutir'],distinguere:['distinsi','distinto','distinguir'],
dividere:['divisi','diviso','dividir'],emergere:['emersi','emerso','emergir','E'],escludere:['esclusi','escluso','excluir'],
esplodere:['esplosi','esploso','explodir','E'],esprimere:['espressi','espresso','expressar'],evadere:['evasi','evaso','fugir, evadir','E'],
fingere:['finsi','finto','fingir'],friggere:['frissi','fritto','fritar'],giungere:['giunsi','giunto','chegar','E'],illudere:['illusi','illuso','iludir'],
includere:['inclusi','incluso','incluir'],invadere:['invasi','invaso','invadir'],mordere:['morsi','morso','morder'],
nascondere:['nascosi','nascosto','esconder'],offendere:['offesi','offeso','ofender'],persuadere:['persuasi','persuaso','persuadir'],
piovere:['piovvi','piovuto','chover','E'],porgere:['porsi','porto','entregar, oferecer'],pretendere:['pretesi','preteso','exigir, pretender'],
proteggere:['protessi','protetto','proteger'],radere:['rasi','raso','raspar, barbear'],raggiungere:['raggiunsi','raggiunto','alcançar'],
reggere:['ressi','retto','segurar, sustentar'],rendere:['resi','reso','devolver, tornar'],risolvere:['risolsi','risolto','resolver'],
sorgere:['sorsi','sorto','surgir','E'],spargere:['sparsi','sparso','espalhar'],spendere:['spesi','speso','gastar'],spingere:['spinsi','spinto','empurrar'],
stendere:['stesi','steso','estender, estirar'],succedere:['successi','successo','acontecer','E'],tendere:['tesi','teso','tender, esticar'],
uccidere:['uccisi','ucciso','matar'],volgere:['volsi','volto','virar, voltar'],svolgere:['svolsi','svolto','realizar, desenvolver'],
rivolgere:['rivolsi','rivolto','dirigir (rivolgersi: dirigir-se a)'],convincere:['convinsi','convinto','convencer'],
esistere:[null,'esistito','existir','E'],insistere:[null,'insistito','insistir'],resistere:[null,'resistito','resistir'],
assistere:[null,'assistito','assistir'],consistere:[null,'consistito','consistir','E'],riflettere:[null,'riflettuto','refletir'],
ricevere:[null,'ricevuto','receber'],ripetere:[null,'ripetuto','repetir'],temere:[null,'temuto','temer'],battere:[null,'battuto','bater'],
combattere:[null,'combattuto','combater'],godere:[null,'goduto','desfrutar','',['godr']],vendere:[null,'venduto','vender'],
credere:[null,'creduto','acreditar'],ricadere:[null,'ricaduto','recair','E']
};
/* composti: verbo → [base, prefisso nuovo, significato, ausiliare se diverso] */
const COMPOSTI={};
function addComp(base,list){ list.split(';').forEach(x=>{ const [inf,pt,aux]=x.split('|'); COMPOSTI[inf.trim()]=[base,pt,aux||'']; }); }
addComp('fare','rifare|refazer;disfare|desfazer;soddisfare|satisfazer;contraffare|falsificar;strafare|exagerar');
addComp('tenere','appartenere|pertencer|E;contenere|conter;mantenere|manter;ottenere|obter;sostenere|sustentar, defender;trattenere|reter;ritenere|considerar;intrattenere|entreter;astenere|abster-se');
addComp('venire','avvenire|acontecer|E;convenire|convir|E;divenire|tornar-se|E;intervenire|intervir|E;prevenire|prevenir|A;svenire|desmaiar|E;rinvenire|encontrar|A;provenire|provir|E;sopravvenire|sobrevir|E');
addComp('porre','comporre|compor;disporre|dispor;esporre|expor;imporre|impor;opporre|opor;proporre|propor;supporre|supor;deporre|depor;riporre|guardar, repor;posporre|adiar;predisporre|predispor;sottoporre|submeter');
addComp('tradurre','condurre|conduzir;dedurre|deduzir;indurre|induzir;introdurre|introduzir;produrre|produzir;ridurre|reduzir;sedurre|seduzir;riprodurre|reproduzir');
addComp('trarre','attrarre|atrair;contrarre|contrair;distrarre|distrair;estrarre|extrair;sottrarre|subtrair;ritrarre|retratar');
addComp('mettere','ammettere|admitir;commettere|cometer;permettere|permitir;promettere|prometer;rimettere|recolocar;scommettere|apostar;smettere|parar (de fazer);trasmettere|transmitir;sottomettere|submeter;compromettere|comprometer');
addComp('prendere','apprendere|aprender;comprendere|compreender;riprendere|retomar;sorprendere|surpreender;intraprendere|empreender');
addComp('scrivere','descrivere|descrever;iscrivere|inscrever (iscriversi: inscrever-se);prescrivere|prescrever;riscrivere|reescrever;trascrivere|transcrever;sottoscrivere|assinar');
addComp('vedere','rivedere|rever;prevedere|prever;intravedere|entrever');
addComp('dire','ridire|repetir;contraddire|contradizer;predire|predizer;disdire|cancelar (reserva)');
addComp('correre','percorrere|percorrer;soccorrere|socorrer;trascorrere|passar (tempo);occorrere|ser necessário|E;ricorrere|recorrer|E;concorrere|concorrer;scorrere|deslizar, correr|E');
addComp('muovere','commuovere|comover;promuovere|promover;rimuovere|remover');
addComp('rompere','interrompere|interromper;corrompere|corromper;irrompere|irromper');
addComp('chiudere','racchiudere|encerrar;rinchiudere|trancar;socchiudere|entreabrir');
addComp('chiedere','richiedere|requerer, pedir');
addComp('scendere','discendere|descender|E');
addComp('leggere','rileggere|reler;eleggere|eleger');
addComp('vivere','rivivere|reviver;sopravvivere|sobreviver|E;convivere|conviver');
addComp('nascere','rinascere|renascer');
addComp('conoscere','riconoscere|reconhecer');
addComp('crescere','accrescere|aumentar;rincrescere|lamentar|E');
addComp('uscire','riuscire|conseguir|E');
addComp('aprire','riaprire|reabrir');
addComp('offrire','soffrire|sofrer');
addComp('togliere','distogliere|desviar');
addComp('scegliere','prescegliere|escolher');
addComp('cogliere','accogliere|acolher;raccogliere|recolher, juntar');
addComp('salire','risalire|subir de novo');
addComp('valere','prevalere|prevalecer|E');
addComp('cadere','accadere|acontecer|E;scadere|vencer (prazo)|E');
addComp('sedere','possedere|possuir|A');
addComp('piacere','dispiacere|desagradar, lamentar|E;compiacere|agradar');
addComp('vincere','avvincere|cativar');
addComp('ridere','sorridere|sorrir;deridere|zombar');
addComp('rispondere','corrispondere|corresponder');
addComp('apparire','scomparire|desaparecer|E;comparire|aparecer|E');

const NON_ISC=new Set('dormire partire sentire aprire offrire seguire servire vestire coprire soffrire fuggire bollire divertire avvertire mentire scoprire convertire investire consentire inseguire proseguire eseguire pentire ripartire risentire acconsentire sfuggire cucire udire riempire morire salire uscire venire apparire'.split(' '));
const AUX_E=new Set('arrivare tornare ritornare entrare restare diventare durare costare bastare mancare sembrare capitare accadere succedere cadere nascere morire partire salire scendere uscire venire andare essere stare rimanere piacere dispiacere apparire scomparire sparire comparire crescere emergere sorgere esistere ingrassare dimagrire invecchiare guarire impazzire fuggire evadere giungere svenire riuscire divenire avvenire intervenire convenire bisognare occorrere scappare arrossire dipendere consistere ricadere scadere'.split(' '));
const AUX_BOTH=new Set('cambiare passare cominciare iniziare finire terminare correre vivere volare salire scendere crescere aumentare diminuire migliorare peggiorare continuare saltare suonare guarire trascorrere'.split(' '));
const PERS_IMP=['tu','Lei','noi','voi','Loro'];

/* verbi regolari comuni (per la ricerca e i suggerimenti) */
const VERBI_COMUNI={};
`abitare|morar;accettare|aceitar;affittare|alugar;aiutare|ajudar;alzare|levantar;amare|amar;annoiare|entediar;arrabbiarsi|ficar com raiva;ascoltare|escutar;aspettare|esperar;baciare|beijar;ballare|dançar;bastare|bastar;buttare|jogar fora;cambiare|mudar, trocar;camminare|caminhar;cantare|cantar;cenare|jantar;chiacchierare|conversar;chiamare|chamar, ligar;chiamarsi|chamar-se;comprare|comprar;contare|contar;controllare|verificar;costare|custar;cucinare|cozinhar;dimenticare|esquecer;disegnare|desenhar;diventare|tornar-se;domandare|perguntar;durare|durar;entrare|entrar;fermare|parar;fidarsi|confiar;girare|virar, girar;guardare|olhar, assistir;guidare|dirigir (carro);imparare|aprender;incontrare|encontrar;innamorarsi|apaixonar-se;insegnare|ensinar;invitare|convidar;iniziare|iniciar;lamentarsi|queixar-se;lasciare|deixar;laurearsi|formar-se;lavare|lavar;lavarsi|lavar-se;lavorare|trabalhar;mandare|mandar, enviar;mancare|faltar;mostrare|mostrar;nuotare|nadar;ordinare|pedir, encomendar;organizzare|organizar;passare|passar;pensare|pensar;pettinarsi|pentear-se;portare|levar, trazer, usar;pranzare|almoçar;prenotare|reservar;preoccuparsi|preocupar-se;preparare|preparar;prestare|emprestar;provare|experimentar, tentar;raccontare|contar (história);regalare|presentear;restare|ficar;ricordare|lembrar;ricordarsi|lembrar-se;riposarsi|descansar;rilassarsi|relaxar;ritornare|voltar;rubare|roubar;salutare|cumprimentar;sbagliare|errar;sbrigarsi|apressar-se;scherzare|brincar, fazer piada;scusare|desculpar;sembrare|parecer;sognare|sonhar;sperare|esperar, ter esperança;spiegare|explicar;sposarsi|casar-se;suonare|tocar (instrumento);svegliarsi|acordar;tagliare|cortar;telefonare|telefonar;tirare|puxar, atirar;toccare|tocar;trovare|encontrar, achar;truccarsi|maquiar-se;usare|usar;vergognarsi|ter vergonha;viaggiare|viajar;visitare|visitar;volare|voar;addormentarsi|adormecer;alzarsi|levantar-se;sciare|esquiar;inviare|enviar;dimagrire|emagrecer;pulire|limpar;costruire|construir;spedire|enviar (pelo correio);suggerire|sugerir;restituire|devolver;sostituire|substituir;colpire|bater, atingir;guarire|curar, sarar;impedire|impedir;garantire|garantir;gestire|gerir;inserire|inserir;obbedire|obedecer;reagire|reagir;sparire|desaparecer;stupire|surpreender;tradire|trair;trasferirsi|mudar-se;unire|unir;arrossire|corar;chiarire|esclarecer;condire|temperar;fornire|fornecer;agire|agir;approfondire|aprofundar;digerire|digerir;diminuire|diminuir;seguire|seguir;servire|servir;vestirsi|vestir-se;coprire|cobrir;fuggire|fugir;bollire|ferver;divertirsi|divertir-se;avvertire|avisar;mentire|mentir;scoprire|descobrir;pentirsi|arrepender-se;sentirsi|sentir-se;aumentare|aumentar;migliorare|melhorar;continuare|continuar;saltare|pular;salvare|salvar;scappare|fugir, sair correndo;spostare|mover, deslocar;fumare|fumar;dimostrare|demonstrar;sistemare|arrumar;noleggiare|alugar (carro);parcheggiare|estacionar;festeggiare|comemorar;assaggiare|provar (comida);pregare|rezar, pedir;asciugare|secar;mescolare|misturar`.split(';').forEach(x=>{ const [v,pt]=x.split('|'); VERBI_COMUNI[v]=pt; });

/* ---------- motore ---------- */
const ACC={fa:'fà',sta:'stà',va:'và',do:'dò',sto:'stò',so:'sò',da:'dà'};
function isRefl(inf){ return /(ar|er|ir|or|ur)si$/.test(inf)&&inf.length>=5; }
function baseOf(inf){ return isRefl(inf)?inf.slice(0,-2)+'e':inf; }
const I_TONICA=/^(sciare|inviare|spiare|avviare|deviare|rinviare)$/;
function bi(s,inf){ if(/[cg]$/.test(s)) return s+'h'; if(/i$/.test(s)&&!I_TONICA.test(inf)) return s.slice(0,-1); return s; }
function bn(s){ if(/[cg]$/.test(s)) return s+'h'; if(/i$/.test(s)) return s.slice(0,-1); return s; }
function be(s,inf){ if(/[cg]$/.test(s)) return s+'h'; if(/[cg]i$/.test(s)&&!I_TONICA.test(inf)) return s.slice(0,-1); return s; }
function regData(inf){
  const end=inf.slice(-3), s=inf.slice(0,-3);
  if(end==='are'){ const b=bi(s,inf), n=bn(s);
    return {pres:[s+'o',b+'i',s+'a',n+'iamo',s+'ate',s+'ano'],part:s+'ato',aux:'A',fut:be(s,inf)+'er',imp:s+'a',cong:[b+'i',n+'iamo',n+'iate',b+'ino'],cimp:s+'a',pr:[s+'ai',s+'ò',s+'arono'],g:'reg',conj:1}; }
  if(end==='ere') return {pres:[s+'o',s+'i',s+'e',s+'iamo',s+'ete',s+'ono'],part:s+'uto',aux:'A',fut:s+'er',imp:s+'e',cong:[s+'a',s+'iamo',s+'iate',s+'ano'],cimp:s+'e',pr:[s+'ei',s+'é',s+'erono'],g:'reg',conj:2};
  if(end==='ire'){ const isc=!NON_ISC.has(inf);
    const part=/(apr|copr|offr|soffr|scopr)ire$/.test(inf)?s.slice(0,-1)+'erto':s+'ito';
    return {pres:isc?[s+'isco',s+'isci',s+'isce',s+'iamo',s+'ite',s+'iscono']:[s+'o',s+'i',s+'e',s+'iamo',s+'ite',s+'ono'],part,aux:'A',fut:s+'ir',imp:s+'i',cong:isc?[s+'isca',s+'iamo',s+'iate',s+'iscano']:[s+'a',s+'iamo',s+'iate',s+'ano'],cimp:s+'i',pr:[s+'ii',s+'ì',s+'irono'],g:'reg',conj:3,isc}; }
  return null;
}
function prefixData(d,pre,cut){
  const f=x=>{ if(Array.isArray(x)) return x.map(f); if(typeof x!=='string') return x; return x.split('/').map(y=>{ const z=cut?y.slice(cut):y; return pre+(ACC[z]||z); }).join('/'); };
  const o={}; Object.keys(d).forEach(k=>{ o[k]=(['pres','cong','pr','impF','part','fut','imp','cimp','noiPR'].includes(k))?f(d[k]):d[k]; });
  return o;
}
function verbData(inf){
  if(VERBI[inf]) return Object.assign({src:'lista'},VERBI[inf]);
  if(COMPOSTI[inf]){
    const [base,pt,aux]=COMPOSTI[inf], bd=VERBI[base]; if(!bd) return null;
    let d;
    if(base==='tradurre'||base==='trarre'){ const head=base==='tradurre'?'tra':'tr'; const pre=inf.slice(0,inf.length-base.length+head.length); d=prefixData(bd,pre,head.length); }
    else d=prefixData(bd,inf.slice(0,inf.length-base.length),0);
    d.pt=pt||bd.pt; if(aux) d.aux=aux; d.src='composto'; d.base=base; d.g='irr';
    if(inf==='prevedere'||inf==='provvedere') d.fut=inf.slice(0,-1);
    return d;
  }
  const r=regData(inf); if(!r) return null;
  if(ERE_FORTI[inf]){ const [p1,part,pt,aux,ov]=ERE_FORTI[inf];
    if(p1){ const root=p1.slice(0,-1); r.pr=[p1,root+'e',root+'ero']; r.g='irr'; }
    const regPart=r.part; r.part=part; r.pt=pt; if(aux==='E') r.aux='E'; if(ov) r.fut=ov[0];
    r.src=(p1||part!==regPart||ov)?'forte':'regole'; if(r.src==='forte') r.g='irr';
    return r;
  }
  r.src='regole'; r.pt=VERBI_COMUNI[inf]||VERBI_COMUNI[inf.replace(/e$/,'si')]||'';
  if(AUX_E.has(inf)) r.aux='E';
  return r;
}
function formsOf(d,t){
  switch(t){
    case 'pres': return d.pres.slice();
    case 'imp': return d.impF?d.impF.slice():['vo','vi','va','vamo','vate','vano'].map(e=>d.imp+e);
    case 'fut': return ['ò','ai','à','emo','ete','anno'].map(e=>d.fut+e);
    case 'cond': return ['ei','esti','ebbe','emmo','este','ebbero'].map(e=>d.fut+e);
    case 'cong': return [d.cong[0],d.cong[0],d.cong[0],d.cong[1],d.cong[2],d.cong[3]];
    case 'cimp': return ['ssi','ssi','sse','ssimo','ste','ssero'].map(e=>d.cimp+e);
    case 'pr': return [d.pr[0],d.cimp+'sti',d.pr[1],d.noiPR||d.cimp+'mmo',d.cimp+'ste',d.pr[2]];
  }
  return [];
}
const AUXF={A:{pres:['ho','hai','ha','abbiamo','avete','hanno'],imp:['avevo','avevi','aveva','avevamo','avevate','avevano'],fut:['avrò','avrai','avrà','avremo','avrete','avranno'],cond:['avrei','avresti','avrebbe','avremmo','avreste','avrebbero'],cong:['abbia','abbia','abbia','abbiamo','abbiate','abbiano'],cimp:['avessi','avessi','avesse','avessimo','aveste','avessero']},
 E:{pres:['sono','sei','è','siamo','siete','sono'],imp:['ero','eri','era','eravamo','eravate','erano'],fut:['sarò','sarai','sarà','saremo','sarete','saranno'],cond:['sarei','saresti','sarebbe','saremmo','sareste','sarebbero'],cong:['sia','sia','sia','siamo','siate','siano'],cimp:['fossi','fossi','fosse','fossimo','foste','fossero']}};
function gerOf(d,inf){ if(inf==='essere') return 'essendo'; const s=d.imp; if(!s) return ''; return s.endsWith('a')?s+'ndo':s.slice(0,-1)+'endo'; }
const IMPER_IRR={essere:['sii','sia','siamo','siate','siano'],avere:['abbi','abbia','abbiamo','abbiate','abbiano'],sapere:['sappi','sappia','sappiamo','sappiate','sappiano'],
 fare:["fa'/fai",'faccia','facciamo','fate','facciano'],andare:["va'/vai",'vada','andiamo','andate','vadano'],dare:["da'/dai",'dia','diamo','date','diano'],
 stare:["sta'/stai",'stia','stiamo','state','stiano'],dire:["di'",'dica','diciamo','dite','dicano'],volere:['vogli','voglia','vogliamo','vogliate','vogliano'],
 potere:null,dovere:null,piovere:null};
function imperOf(d,inf){
  if(inf in IMPER_IRR) return IMPER_IRR[inf]&&IMPER_IRR[inf].slice();
  const c=formsOf(d,'cong'), p=d.pres;
  const tu=(inf.endsWith('are')&&d.imp&&d.imp.endsWith('a'))?d.imp:p[1];
  return [tu,c[2],p[3],p[4],c[5]];
}
function conjugate(input){
  const raw=String(input||'').trim().toLowerCase().replace(/’/g,"'");
  if(!raw) return null;
  const refl=isRefl(raw), inf=baseOf(raw);
  const d=verbData(inf); if(!d) return null;
  const aux=refl?'E':d.aux, part=d.part, ps=part.slice(0,-1);
  const PR=['mi','ti','si','ci','vi','si'];
  const R=(arr)=>refl?arr.map((x,i)=>x==='—'?x:PR[i]+' '+x):arr;
  const ptc=i=>aux==='E'?(i<3?ps+'o/'+ps+'a':ps+'i/'+ps+'e'):part;
  const comp=t=>R(AUXF[aux][t].map((a,i)=>a+' '+ptc(i)));
  const T={};
  ['pres','imp','fut','pr'].forEach(t=>T[t]=R(formsOf(d,t)));
  T.pp=comp('pres'); T.trap=comp('imp'); T.futant=comp('fut');
  T.cong=R(formsOf(d,'cong')); T.cimp=R(formsOf(d,'cimp')); T.congp=comp('cong'); T.congtrap=comp('cimp');
  T.cond=R(formsOf(d,'cond')); T.condp=comp('cond');
  let imper=imperOf(d,inf);
  if(imper&&refl){ const c=formsOf(d,'cong'); imper=[imper[0].split('/')[0].replace(/'$/,'')+'ti','si '+c[2],imper[2]+'ci',imper[3]+'vi','si '+c[5]].map(x=>x.replace(/^(fa|va|da|sta)ti$/,'$1tti')); }
  T.imper=imper;
  let ger=gerOf(d,inf); if(refl) ger+='si';
  /* forme regolari per evidenziare le irregolarità */
  let reg=null; if(d.src!=='regole'){ const r=regData(inf); if(r){ r.aux=d.aux; reg={}; ['pres','imp','fut','pr','cong','cimp','cond'].forEach(t=>reg[t]=R(formsOf(r,t))); reg.part=r.part; } }
  const notes=[];
  if(d.src==='regole') notes.push(d.conj===3?(d.isc?'Regolare in -ire con -isc- (come capire).':'Regolare in -ire senza -isc- (come dormire).'):d.conj===1?'Regolare in -are (come parlare).':'Regolare in -ere (come credere).');
  const regP={are:'ato',ere:'uto',ire:'ito'}[inf.slice(-3)]; if(regP&&part!==inf.slice(0,-3)+regP) notes.push(`Participio irregolare: ${part}.`);
  if(d.src==='regole'&&d.conj===2&&!VERBI_COMUNI[inf]&&!ERE_FORTI[inf]) notes.push('Attenzione: molti verbi in -ere hanno participio e passato remoto irregolari. Se il verbo è raro, controlla sul dizionario.');
  if(d.src==='composto') notes.push(`Si coniuga come ${d.base}.`);
  if(/(care|gare)$/.test(inf)&&d.src!=='lista') notes.push('-care/-gare: si aggiunge una h davanti a i ed e (cerchi, pagherò) per mantenere il suono duro.');
  if(/(ciare|giare|sciare)$/.test(inf)&&!/^(sciare|inviare)$/.test(inf)) notes.push('-ciare/-giare: la i cade davanti a i ed e (mangi, comincerò).');
  if(AUX_BOTH.has(inf)) notes.push(`Ausiliare: avere con l'oggetto diretto (Ho ${inf==='finire'?'finito il libro':'cambiato casa'}), essere senza (${inf==='finire'?'Il film è finito':'La città è cambiata'}).`);
  if(refl) notes.push('Riflessivo: i tempi composti usano sempre essere e il participio concorda (mi sono alzato/alzata).');
  return {inf:raw,base:inf,refl,pt:(refl&&VERBI_COMUNI[raw])||d.pt||'',aux,part,ger,T,reg,src:d.src,g:d.g==='irr'||(d.src!=='regole'&&d.src!=='lista')?'irr':(d.g||'reg'),notes};
}
/* indice: tutte le forme → infinito, e significati in portoghese */
let VIDX=null;
function verbIndex(){
  if(VIDX) return VIDX;
  const all=new Set([...Object.keys(VERBI),...Object.keys(COMPOSTI),...Object.keys(ERE_FORTI),...Object.keys(VERBI_COMUNI)]);
  const forms={}, pt=[];
  all.forEach(v=>{ let c; try{ c=conjugate(v); }catch(e){ c=null; } if(!c) return;
    pt.push([v,c.pt]);
    const add=f=>String(f).split('/').forEach(x=>{ x=x.replace(/^(mi|ti|si|ci|vi) /,'').replace(/'$/,'').trim(); if(!x||x.includes(' ')) return; (forms[x]=forms[x]||new Set()).add(v); });
    ['pres','imp','fut','pr','cong','cimp','cond'].forEach(t=>c.T[t].forEach(add)); (c.T.imper||[]).forEach(add); add(c.part); if(/o$/.test(c.part)) ['a','i','e'].forEach(e=>add(c.part.slice(0,-1)+e)); add(c.ger.replace(/si$/,''));
  });
  VIDX={all:[...all].sort(),forms,pt};
  return VIDX;
}
function findVerb(q){
  q=String(q||'').trim().toLowerCase().replace(/’/g,"'"); if(!q) return {list:[]};
  const I=verbIndex();
  const known=v=>I.all.includes(v)||I.all.includes(baseOf(v));
  if(known(q)){ const c=conjugate(q); if(c) return {verb:q,c}; }
  if(I.forms[q]){ const vs=[...I.forms[q]]; return {fromForm:q,list:vs}; }
  if(/\s/.test(q)){ const ws=q.split(/\s+/), last=ws.pop().replace(/[!?.,]+$/,''); if(I.forms[last]){ let vs=[...I.forms[last]]; if(/^(mi|ti|si|ci|vi)$/.test(ws[0])){ const rf=vs.map(v=>v.replace(/e$/,'si')).filter(v=>conjugate(v)); if(rf.length) vs=rf; } return {fromForm:q,list:[...new Set(vs)]}; } }
  if(/(are|ere|ire|rre|rsi)$/.test(q)&&!/\s/.test(q)){ const c=conjugate(q); if(c) return {verb:q,c,guess:true}; }
  const n=x=>x.normalize('NFD').replace(/[̀-ͯ]/g,'');
  const qq=n(q), words=r=>n(r).split(/[,;()\/]|\s+-\s+/).map(x=>x.trim());
  const byPt=I.pt.filter(([v,p])=>p&&words(p).some(w=>w===qq||w===qq+'-se'||w.split(' ')[0]===qq)).map(x=>x[0]);
  const byPre=I.all.filter(v=>v.startsWith(qq)).slice(0,12);
  return {list:[...new Set([...byPt,...byPre])].slice(0,16),byPt:byPt.length>0};
}
