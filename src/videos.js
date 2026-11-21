/* Video del canale Italianeando (spiegazioni in spagnolo), scelti per ogni unità. [videoId, titolo] */
const ITN_CH='https://www.youtube.com/@Italianeando/courses';
const ITN_PL=[
 ['A1','PLNdL9GF6UdULd-ePyXG-JRgiOzVnMQe0o','Corso A1',[0]],
 ['A2','PLNdL9GF6UdUKnohm39Gb92KTaRmyed9f1','Corso A2',[1]],
 ['B1','PLNdL9GF6UdUIIeJzqz2nCtxgfvxLvj32a','Corso B1',[1,2]],
 ['B2','PLNdL9GF6UdULn_qpbeJ6Vo7hu8s2sjk68','Corso B2',[2,3]]
];
const ytV=id=>'https://www.youtube.com/watch?v='+id;
const ytPL=id=>'https://www.youtube.com/playlist?list='+id;
const VIDEI={
 101:[['PQDoAvp9Wp0','El alfabeto en italiano'],['R02TRxefMvc','Fonética y pronunciación'],['cKmIUjNbX4Y','Pronunciación de la C'],['r7kVPFjkHHY','Pronunciación de la G'],['ZKZZc40p5kg','Saludos y primeros contactos'],['SMv1UCgLRgE','¿Cómo se utiliza PREGO?'],['9pri-SG6WdY','Presentarse en italiano']],
 102:[['9DNb4gHwHXQ','El verbo ESSERE'],['x2BGLXCwedg','El verbo AVERE'],['UBV7t5iBnQo','Los adjetivos'],['m6_LTsVOHJM','Corrección: ejercicios de adjetivos']],
 103:[['xpjXrfeITRY','Los sustantivos: masculino, femenino, singular y plural'],['bLcXyrtSI2k','Los artículos'],['We5b108ncTc','Corrección: ejercicios de artículos determinados'],['B2aVavo2b8E','50 minutos de ejercicios: sustantivos y artículos']],
 104:[['6pQ1hvphGmk','Verbos regulares en presente'],['402pAsNC99o','Cómo formular preguntas (dove, come, perché…)'],['7cWEdQEtaoo','Conjunciones: ma, siccome, né, e, o, oppure']],
 105:[['4ECjnhbTXCE','Verbos modales: potere, volere, dovere'],['95z1XWU5TSk','El verbo STARE'],['S2E5GiosMpA','Verbos DARE, DIRE y FARE'],['x8jzch6VZOM','ANDARE y VENIRE']],
 106:[['g1B5JiUCnag','Los días de la semana'],['Gaae6iw0z-I','Verbos reflexivos y recíprocos']],
 107:[['QlhL9BuCx4E','C\'È y CI SONO'],['fBK50B6A_cA','Preposiciones simples']],
 109:[['fBK50B6A_cA','Preposiciones simples'],['Gae9VD6CgMY','50 minutos de ejercicios: preposiciones simples y articuladas']],
 108:[['ivfyU6_0I9s','El verbo PIACERE'],['H_0qLlY6d0I','Ejercicios con PIACERE']],
 1:[['Wpbqy_nQz54','Preposizioni articolate: cómo se forman'],['2ffLDK3iyoU','Preposizioni articolate: cuándo se usan'],['Gae9VD6CgMY','50 minutos de ejercicios: preposiciones'],['dSaL-DU5hV4','Adjetivos posesivos'],['ihxchcphL6c','Ejercicios: aggettivi possessivi'],['Lo14y6_AScY','El artículo partitivo'],['BsYhtFQ-K88','Ejercicios: articolo partitivo'],['uYxIEPFA6F4','«Bello» y «quello»']],
 2:[['SSUrFszdbB4','El passato prossimo'],['1Vd0bPoYQwY','Ejercicios: passato prossimo']],
 3:[['OnLo-OtIzR0','El imperfetto'],['j-iep9WFCAQ','30 minutos de ejercicios: imperfetto'],['Hht15Rf97gE','Diferencias entre imperfetto y passato prossimo'],['lh4E06WYDmY','Ejercicios: ¿passato prossimo o imperfetto?'],['VawN-PIgPv8','El trapassato prossimo'],['gNSE-6iVTcY','Stare + gerundio y stare per']],
 4:[['iNXzD7ac4-c','Pronombres directos (1)'],['QXdk4A5Mz6A','Pronombres directos: dónde se colocan'],['E4l03S6P5dY','Pronombres directos con el passato prossimo'],['rGJXVabcaWU','Ejercicios: pronombres directos'],['xJY3pBmyPD4','Pronombres indirectos'],['FSUsMYVBG0g','Ejercicios: pronombres indirectos']],
 5:[['VoQnnw8N7rU','Cómo usar CI y NE'],['heeZRQNXKdM','El NE partitivo'],['IFPzZeFPD6o','Ejercicios: NE o LO/LA/LI/LE'],['E8m2Nc2IXxA','Qualche, alcuni, alcune'],['XNq0ogOLdTI','Volerci y metterci']],
 6:[['Nor2rwuW8c0','El futuro simple'],['-w5WuFMMcyo','El futuro composto'],['CnDQOOmynpM','El condicional simple'],['c8ZC4D71EQw','El condicional compuesto']],
 7:[['jHtleJhGHgE','L\'imperativo: usos y conjugación'],['at3aoN2-V3M','L\'imperativo: ejercicios']],
 8:[['TY-F22mg0Fo','El congiuntivo presente'],['agzk-287um0','Una hora de congiuntivo']],
 9:[['QtYH28cZaBg','El congiuntivo imperfetto']],
 10:[['ZjkU6-GHIi8','El período hipotético']],
 12:[['m3nyfdCMLb8','El passato remoto']]
};
const VIDEI_EXTRA=[['QeYAi1Q7Lns','10 falsos amigos entre italiano y español'],['V5b3w7Yn73w','Comparativo y superlativo'],['E8m2Nc2IXxA','Qualche, alcuni, alcune'],['uYxIEPFA6F4','«Bello» y «quello»']];
function bandPL(b){ return ITN_PL.filter(p=>p[3].includes(b)); }

/* Un libro per livello, da comprare e leggere durante il percorso. */
const LIBRI=[
 {lvl:'A1',band:0,tit:'Pasta per due',aut:'Giovanni Ducci',ed:'Alma Edizioni · collana Italiano Facile',isbn:'9788861823860',
  perche:'Una lettura graduata pensata per livelli davvero bassi: circa 500 parole, solo il presente (niente passato prossimo), dialoghi semplici, una storia simpatica e ricette di cucina. Ha l\'audio online.',
  come:'Un capitolo alla volta, dopo il corso. Leggi prima in silenzio, poi ascolta l\'audio e rileggi ad alta voce. Fai gli esercizi in fondo al libro.',
  alt:'Dov\'è Yukio? (A. De Giuli, C. M. Naddeo, Alma): un piccolo giallo, stesso livello.'},
 {lvl:'A2',band:1,tit:'Le magiche ricette di Matilda',aut:'Alessandra Pasqui',ed:'Alma Edizioni · Italiano Facile (2024)',
  perche:'Livello A2, circa 1500 parole: l\'Italia di ieri e di oggi si incontrano grazie a un misterioso libro di ricette. Il passo giusto dopo i Primi passi.',
  come:'Mentre studi le unità 1–3, sottolinea i verbi al passato e chiediti perché l\'autrice usa l\'uno o l\'altro tempo.',
  alt:'Modelle, pistole e mozzarella (Alma, A2).'},
 {lvl:'B1',band:2,tit:'Piccole storie d\'amore',aut:'Alessandro De Giuli, Ciro Massimo Naddeo',ed:'Alma Edizioni · Italiano Facile',
  perche:'Racconti brevi di livello B1, scelti come lettura del B1 anche nelle scuole ufficiali di lingue spagnole. Ogni storia si legge in una o due sere.',
  come:'Un racconto a settimana. Dopo ogni racconto scrivi un riassunto di 5 frasi in «Racconta» e fallo correggere.',
  alt:'Dolce vita (Alma, B1/B2).'},
 {lvl:'B2',band:3,tit:'Io non ho paura',aut:'Niccolò Ammaniti',ed:'Einaudi (2001)',isbn:'9788806188672',
  perche:'Il primo romanzo «vero» consigliato a chi studia italiano: lingua immediata, tanta suspense, l\'estate del 1978 in un paesino del Sud. Ne esiste anche il film di Gabriele Salvatores.',
  come:'Leggi un capitolo e annota 5 parole in «Le mie parole». Alla fine guarda il film in italiano, con i sottotitoli in italiano.',
  alt:'Seta (Alessandro Baricco): breve, frasi semplici e bellissime.'},
 {lvl:'C1',band:4,tit:'Il giorno della civetta',aut:'Leonardo Sciascia',ed:'Adelphi',
  perche:'Un classico del Novecento sulla mafia, breve e denso, consigliato per il livello C1. Lingua letteraria, registri diversi, dialoghi pieni di sottintesi.',
  come:'Leggilo dopo le unità 12–16: cerca il passato remoto, il discorso indiretto e il registro formale che hai studiato.',
  alt:'Lessico famigliare (Natalia Ginzburg, Einaudi): la lingua di una famiglia, ironica e quotidiana.'}
];
