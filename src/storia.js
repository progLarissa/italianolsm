/* ───────── IL RACCONTO: «La lettera di Anna» ─────────
   {u: unità collegata, t: titolo, g: grammatica in evidenza, text (paragrafi \n\n, glosse [[a|b]]), q: domande} */
const STORIA = [
{u:101, t:'Una lettera in italiano', g:'presentarsi, essere, saluti', text:`Ciao! Mi chiamo Clara. Sono brasiliana, di Caxias do Sul, nel Sud del Brasile. Sono [[architetta|arquiteta]] e abito a San Paolo.

Oggi è domenica e sono a casa di mia nonna, Rosa. Mia nonna ha novant'anni. È piccola, simpatica e parla molto.

«Clara, guarda!» dice la nonna. Ha una vecchia [[scatola|caixa]] in mano. Nella scatola c'è una lettera. La lettera è in italiano.

«È di Anna, la sorella di mia madre Teresa», dice la nonna. «Io non capisco l'italiano. E tu?»

«No, nonna. Non capisco niente!»

Guardo la lettera. Le parole sono belle, ma misteriose. Allora decido: voglio imparare l'italiano.`,
q:[["Di dov'è Clara?",["Di San Paolo","Di Caxias do Sul","Di San Vito","Di Roma"],1],["Che lavoro fa Clara?",["È insegnante","È architetta","È programmatrice","È medico"],1],["Chi è Anna?",["La nonna di Clara","La sorella di Teresa","La madre di Clara","Un'amica"],1]]},

{u:102, t:'La foto', g:'essere e avere, descrizioni', text:`Nella scatola c'è anche una foto. È vecchia e un po' [[rovinata|estragada]]. Ci sono due ragazze.

«Questa è mia madre, Teresa», dice la nonna. «Qui ha vent'anni.» Teresa è alta e magra. Ha i capelli neri e gli occhi grandi. È seria.

L'altra ragazza è più piccola. Ha i capelli chiari e un sorriso dolce. «E questa è Anna, sua sorella. È più giovane.»

Dietro la foto c'è una data: 1920. E un nome: San Vito.

«Che cos'è San Vito, nonna?»

«È il paese di mia madre, in Italia. Nel Veneto, credo.»

Clara ha trentadue anni, ha un lavoro, ha una casa. Ma adesso ha anche una domanda: chi è Anna?`,
q:[["Com'è Teresa nella foto?",["Bassa e allegra","Alta, magra e seria","Bionda e piccola","Vecchia"],1],["Che cosa c'è dietro la foto?",["Un indirizzo","Una data e un nome","Una poesia","Niente"],1],["Dov'è San Vito, secondo la nonna?",["In Sicilia","Nel Veneto","In Brasile","A Roma"],1]]},

{u:103, t:'La scatola dei segreti', g:'nomi, articoli e plurali', text:`La sera, a casa sua, Clara apre la scatola sul tavolo. Dentro ci sono tante cose: la lettera, due foto, un [[fazzoletto|lenço]] bianco, tre [[bottoni|botões]], una piccola croce d'argento e una chiave vecchia.

Clara mette gli oggetti uno vicino all'altro. Le foto sono in bianco e nero. I bottoni sono di legno. La chiave è piccola e pesante.

Poi prende la lettera. Ci sono due pagine. Le parole sono scritte a mano, con l'[[inchiostro|tinta]] blu. In alto c'è una data: «San Vito, 3 maggio 1925».

Clara cerca alcune parole su internet: «cara» significa «querida», «casa» è come in portoghese, «chiave» significa «chave».

Una chiave? Clara guarda la chiave sul tavolo. È la chiave della lettera?`,
q:[["Quante foto ci sono nella scatola?",["Una","Due","Tre","Nessuna"],1],["Di che cosa sono i bottoni?",["Di metallo","Di legno","D'argento","Di plastica"],1],["Quando è scritta la lettera?",["Nel 1920","Nel 1925","Nel 1899","Oggi"],1]]},

{u:104, t:'Parola per parola', g:'presente dei verbi regolari', text:`Adesso Clara studia italiano tutti i giorni. La mattina lavora in uno studio di architettura, il pomeriggio [[progetta|projeta]] case e la sera, a casa, apre il libro di grammatica. Il martedì e il giovedì frequenta un corso online.

L'insegnante si chiama Paola e abita a Bologna. Parla piano e spiega bene. Clara capisce sempre di più.

Ogni sera Clara legge una frase della lettera. Scrive le parole nuove in un quaderno e cerca il significato nel dizionario. Lentamente, la lettera comincia a parlare:

«Cara Teresa, come stai? Qui a San Vito tutti pensano a te. La casa è ancora nostra…»

Clara non dorme quella notte. Pensa alla casa, a San Vito, ad Anna. E alla chiave.`,
q:[["Quando frequenta il corso online?",["Il lunedì e il mercoledì","Il martedì e il giovedì","Il sabato","Ogni giorno"],1],["Che cosa fa Clara ogni sera?",["Guarda la TV","Legge una frase della lettera","Va in palestra","Chiama la nonna"],1],["Che cosa dice la lettera della casa?",["È venduta","È ancora nostra","È distrutta","È in Brasile"],1]]},

{u:105, t:'Devo andare', g:'verbi irregolari e modali', text:`Dopo tre mesi Clara sa leggere tutta la lettera. L'ultima parte dice: «La chiave della casa è dalla famiglia Dal Bo, al bar della piazza. Se un giorno vuoi tornare, la casa ti aspetta. Tua sorella, Anna.»

Clara chiama la nonna. «Nonna, vado in Italia!»

«In Italia? E che cosa fai là?»

«Voglio vedere San Vito. Voglio trovare la casa. E devo sapere chi sono i Dal Bo.»

«Ma Clara, la lettera ha cento anni!»

«Lo so, nonna. Forse non c'è più niente. Ma posso provare.»

La nonna sta un momento in silenzio. Poi dice: «Va bene. Ma fai tante foto della piazza per me.»

Clara esce, va in agenzia e compra un biglietto. Parte a settembre.`,
q:[["Dov'è la chiave della casa, secondo la lettera?",["In chiesa","Dalla famiglia Dal Bo, al bar della piazza","Nella scatola","In Comune"],1],["Che cosa chiede la nonna a Clara?",["Di non partire","Di fare tante foto della piazza","Di portare un regalo","Di vendere la casa"],1],["Quando parte Clara?",["A maggio","A settembre","A Natale","Subito"],1]]},

{u:106, t:'Il viaggio', g:'numeri, ore e routine', text:`Il volo parte da San Paolo alle undici e venti di sera. Clara dorme poco: guarda un film, mangia, legge la lettera per la decima volta. Arriva a Venezia alle tre e mezza del pomeriggio, ora italiana.

All'aeroporto prende un autobus per la stazione di Mestre e poi il treno regionale delle cinque e dieci. Il biglietto costa quattro euro e cinquanta.

Il treno è lento e passa tra le colline: [[vigne|vinhedos]], [[campanili|campanários]], piccole case gialle. È il diciotto settembre e fa ancora caldo.

Alle sei meno un quarto Clara scende alla piccola stazione di San Vito. Non c'è nessuno. Si guarda intorno, si sistema lo zaino sulle spalle e comincia a camminare verso il centro.`,
q:[["A che ora arriva Clara a Venezia?",["Alle 11:20","Alle 15:30","Alle 17:10","Alle 17:45"],1],["Quanto costa il biglietto del treno?",["4,50 €","5,10 €","3,50 €","15 €"],0],["Che cosa vede dal treno?",["Il mare","Vigne, campanili e case gialle","Grattacieli","La neve"],1]]},

{u:107, t:'San Vito', g:'c\'è, ci sono e luoghi', text:`San Vito è un paese piccolo, sulle colline. Al centro c'è una piazza con una fontana. Di fronte alla fontana c'è la chiesa, con un campanile alto. Intorno alla piazza ci sono un forno, una farmacia, un piccolo negozio di alimentari e un bar con i tavolini fuori.

Sopra la porta del bar c'è un'[[insegna|letreiro]] vecchia: «Bar Dal Bo — dal 1908».

Clara si ferma. Il cuore le batte forte. «Dal Bo… come nella lettera!»

Vicino al bar ci sono due signori anziani che giocano a carte. Un cane dorme sotto un tavolino. Una ragazza in bicicletta passa e saluta: «Buonasera!»

Clara respira profondamente, attraversa la piazza ed entra nel bar.`,
q:[["Che cosa c'è di fronte alla fontana?",["Il bar","La chiesa","La farmacia","La stazione"],1],["Da quando esiste il bar Dal Bo?",["Dal 1925","Dal 1908","Dal 1899","Da poco"],1],["Che cosa fanno i due signori anziani?",["Bevono il caffè","Giocano a carte","Leggono il giornale","Dormono"],1]]},

{u:109, t:'Dal Bo', g:'preposizioni: di, a, in, da', text:`Dentro il bar c'è odore di caffè e di legno. Dietro il [[bancone|balcão]] c'è un ragazzo di circa trent'anni.

«Buonasera! Posso aiutarla?»

«Buonasera. Mi chiamo Clara e vengo dal Brasile. Cerco la famiglia Dal Bo.»

«Sono io! Cioè, sono Matteo Dal Bo. Il bar è di mia nonna, Lina. Perché?»

Clara mostra la lettera. Matteo legge, poi la guarda con gli occhi grandi. «Una lettera del 1925? Deve parlare con mia nonna. Abita qui sopra, al primo piano. Domani mattina va in chiesa alle otto, ma alle dieci è sempre al bar.»

«Grazie mille. Dove posso dormire stasera?»

«Da noi c'è una stanza in affitto, sopra il forno. È di mia zia. Le telefono subito!»

Quella sera Clara dorme in una piccola stanza con la finestra sulla piazza.`,
q:[["Chi è Matteo?",["Il parroco","Il nipote di Lina","Il fornaio","Un turista"],1],["Dove abita Lina?",["In Brasile","Sopra il bar, al primo piano","In chiesa","Alla stazione"],1],["Dove dorme Clara?",["In albergo","In una stanza sopra il forno","Dalla nonna","In treno"],1]]},

{u:108, t:'Il caffè di nonna Lina', g:'piacere, al bar', text:`Alle dieci Clara è al bar. Una signora piccola, con i capelli bianchi e gli occhi vivaci, è seduta a un tavolino.

«Lei è la ragazza brasiliana? Io sono Lina. Prende un caffè?»

«Sì, grazie. Un cappuccino, per favore.»

«Alle dieci? Va bene, va bene», ride Lina. «Le piace l'Italia?»

«Mi piace tantissimo. Mi piacciono le colline, le case, i campanili…»

Clara le dà la lettera. Lina mette gli occhiali e legge in silenzio. Poi chiude gli occhi.

«Anna Zanetti», dice piano. «[[Me la ricordo|Eu me lembro dela]]. [[Era vecchia quando io ero bambina|Ela era velha quando eu era criança]]. Ogni domenica [[veniva|vinha]] qui e [[prendeva|tomava]] sempre un caffè corretto.»

Lina si alza, va dietro il bancone e apre un [[cassetto|gaveta]]. Prende una scatoletta di latta.

«Mia nonna [[mi ha detto|me disse]]: se un giorno arriva qualcuno dal Brasile, [[dagli|dê a ele]] questa.»

Dentro c'è un'altra chiave, grande e arrugginita.`,
q:[["Che cosa ordina Clara?",["Un caffè corretto","Un cappuccino","Una spremuta","Niente"],1],["Che cosa ricorda Lina di Anna?",["Che era una bambina","Che ogni domenica prendeva un caffè corretto al bar","Che viveva in Brasile","Niente"],1],["Che cosa c'è nella scatoletta di latta?",["Una foto","Un'altra chiave","Dei soldi","Una lettera"],1]]},

{u:1, t:'Nell\'archivio della parrocchia', g:'articoli e preposizioni articolate', text:`Il giorno dopo Lina accompagna Clara dal parroco, don Franco. L'archivio della parrocchia è in una stanza fredda dietro la chiesa, con gli scaffali pieni di libri antichi.

«I registri dei battesimi cominciano nel Seicento», spiega don Franco, mentre cerca sugli scaffali. «Zanetti… Zanetti… ecco, il registro dal 1895 al 1910.»

Apre il libro sul tavolo. Le pagine sono gialle e la scrittura è difficile da leggere. Clara segue le righe con il dito.

«Qui! "Teresa Zanetti, figlia di Giovanni e di Maria Dal Col, nata il 12 marzo 1899."»

Due pagine dopo trovano anche Anna, nata nel 1902.

Clara fa una foto alle pagine con il telefono. Le mani le tremano un po'. Per la prima volta vede il nome della [[bisnonna|bisavó]] scritto in Italia, nel suo paese.`,
q:[["Dov'è l'archivio?",["In Comune","In una stanza dietro la chiesa","Al bar","In una biblioteca a Venezia"],1],["Quando è nata Teresa?",["Nel 1902","Nel 1899","Nel 1920","Nel 1895"],1],["Che cosa fa Clara con le pagine?",["Le porta via","Le fotografa con il telefono","Le traduce","Le strappa"],1]]},

{u:2, t:'Una giornata incredibile', g:'passato prossimo', text:`Cara nonna,
oggi è stata una giornata incredibile! Stamattina sono andata in chiesa con Lina, la signora del bar. Il parroco ci ha aperto l'archivio e abbiamo trovato i nomi di tua madre e di sua sorella: Teresa è nata nel 1899, Anna nel 1902.

Poi siamo tornate al bar e Matteo, il nipote di Lina, ci ha preparato il pranzo. Ho mangiato i bigoli, una pasta tipica di qui: mi sono piaciuti tantissimo!

Nel pomeriggio sono salita sulla collina con Matteo e finalmente ho visto la casa. È rimasta chiusa per quarant'anni: le finestre sono rotte e il giardino è pieno d'erba. Non sono entrata. Ho deciso di aspettare domani, con Lina.

Ti ho mandato le foto della piazza. Ti sono piaciute?
Un bacio,
Clara`,
q:[["Chi ha aperto l'archivio?",["Lina","Il parroco","Matteo","Clara"],1],["Che cosa ha mangiato Clara?",["La pizza","I bigoli","Il risotto","Le lasagne"],1],["Perché Clara non è entrata nella casa?",["Non aveva la chiave","Ha deciso di aspettare il giorno dopo con Lina","Era vietato","Era notte"],1]]},

{u:3, t:'Com\'era San Vito', g:'imperfetto e trapassato', text:`La sera Lina invita Clara a cena. Mentre mangiano, racconta.

«Quando ero piccola, San Vito era diverso. Non c'erano macchine, solo biciclette e carri. Le donne lavavano i panni alla fontana e gli uomini lavoravano nelle vigne. D'inverno faceva un freddo terribile e la neve arrivava fino alle finestre.

Anna abitava nella casa sulla collina, da sola. Era una donna gentile ma un po' triste. Ogni sera si sedeva davanti alla porta e guardava la strada, [[come se aspettasse|como se esperasse]] qualcuno.

Mia nonna diceva che Teresa e Anna si volevano molto bene. Quando Teresa era partita per il Brasile, nel 1920, Anna aveva diciotto anni. Aveva promesso alla sorella che [[avrebbe tenuto|guardaria, cuidaria]] la casa per lei.»

«E Teresa non era mai tornata?»

«Mai», dice Lina. «Ma Anna non aveva mai smesso di aspettarla.»`,
q:[["Com'era San Vito quando Lina era piccola?",["Pieno di macchine","Senza macchine, con biciclette e carri","Molto turistico","Una città grande"],1],["Che cosa faceva Anna ogni sera?",["Andava al bar","Guardava la strada davanti alla porta","Scriveva lettere","Lavorava nelle vigne"],1],["Che cosa aveva promesso Anna a Teresa?",["Di partire anche lei","Di tenere la casa per lei","Di vendere la casa","Di scriverle ogni giorno"],1]]},

{u:4, t:'Chi ha la chiave?', g:'pronomi diretti, indiretti e combinati', text:`La mattina dopo Matteo aspetta Clara davanti al bar.

«Hai la chiave della nonna?»

«Sì, ce l'ho. Me l'ha data ieri, ricordi?»

«E l'altra chiave, quella piccola della scatola?»

«Ho anche quella. La porto sempre con me.»

Lina arriva con una borsa. «Ho preso una torcia e dei guanti. Matteo, portali tu, per favore: sono pesanti per me.»

«Nonna, li porto io, tranquilla.»

Mentre salgono, Clara riceve un messaggio. È la nonna Rosa: «Ho visto le foto della piazza! Mandamene altre, per favore. E saluta la signora Lina.»

«Mia nonna ti saluta», dice Clara a Lina.

«Ringraziala tanto. E dille che la casa la aspetta da cento anni», risponde Lina con un sorriso.`,
q:[["Chi ha dato la chiave a Clara?",["Matteo","Lina","Il parroco","La nonna Rosa"],1],["Che cosa chiede la nonna Rosa nel messaggio?",["Di tornare subito","Altre foto","Soldi","La lettera"],1],["Chi porta la torcia e i guanti?",["Lina","Matteo","Clara","Nessuno"],1]]},

{u:5, t:'La casa sulla collina', g:'ci e ne', text:`Per arrivare alla casa ci vogliono venti minuti a piedi. La strada è stretta e sale tra le vigne. Clara ci mette un po' di più: si ferma ogni dieci passi a fare foto.

La porta è di legno scuro. Clara mette la grande chiave nella [[serratura|fechadura]] e la gira. Non succede niente. Ci riprova. Al terzo tentativo la porta si apre con un rumore lunghissimo.

Dentro c'è polvere dappertutto. «Quante stanze ci sono?» chiede Clara. «Ne conto quattro», dice Matteo, accendendo la torcia.

In cucina c'è ancora un tavolo, con due sedie. In camera da letto, sotto la finestra, c'è una [[cassapanca|arca, baú de madeira]] chiusa. Clara prova ad aprirla, ma non ce la fa.

Poi si ricorda. Prende dalla tasca la piccola chiave della scatola. Entra perfettamente.

Dentro la cassapanca ci sono delle lenzuola, una scatola di lettere e un quaderno con la copertina nera.

«Che cos'è?» chiede Lina.

«Credo che sia un diario», risponde Clara. «Ne leggiamo una pagina?»`,
q:[["Quanto tempo ci vuole per arrivare alla casa?",["Cinque minuti","Venti minuti a piedi","Un'ora","Dieci minuti in macchina"],1],["Quante stanze ci sono?",["Due","Quattro","Sei","Una"],1],["Che cosa apre la piccola chiave della scatola?",["La porta","La cassapanca","Una finestra","Un cassetto del bar"],1]]},

{u:6, t:'Che cosa farà Clara?', g:'futuro e condizionale', text:`Quella notte Clara non riesce a dormire. Scrive nel suo quaderno:

«Domani leggerò il diario dall'inizio. Lo farò piano, una pagina alla volta, perché la carta è fragile. Matteo dice che mi aiuterà con le parole in dialetto: secondo lui, Anna scriveva metà in italiano e metà in veneto.

Vorrei restare almeno un mese. Al lavoro dovrò chiedere le ferie, ma il mio capo capirà, credo. Potrei anche lavorare da qui, la mattina, e passare i pomeriggi nella casa.

Quando avrò finito di leggere il diario, saprò finalmente chi era Anna.»

Prima di dormire, legge un messaggio della nonna Rosa: «Sapevo che l'avresti trovata. Mia madre diceva sempre che un giorno qualcuno della famiglia sarebbe tornato a San Vito.»

Clara spegne la luce e sorride. Secondo Matteo, la casa sarebbe del Settecento. Sarà vero?`,
q:[["Come leggerà il diario Clara?",["Tutto in una notte","Piano, una pagina alla volta","Lo farà leggere a Matteo","Non lo leggerà"],1],["Perché Matteo la aiuterà?",["Conosce il dialetto veneto","È un professore","Ha già letto il diario","Lavora in biblioteca"],0],["Che cosa diceva sempre Teresa, secondo la nonna Rosa?",["Che la casa era venduta","Che un giorno qualcuno della famiglia sarebbe tornato","Che Anna era partita","Che non voleva tornare"],1]]},

{u:7, t:'Istruzioni per un diario', g:'imperativo', text:`Il giorno dopo Lina porta Clara da una sua amica, la signora Ornella, che per anni ha lavorato nella biblioteca di Treviso.

«Fammi vedere», dice Ornella. «Ah, che meraviglia. Allora, ascoltami bene: non toccarlo con le mani bagnate, giralo sempre dall'angolo in alto, e non lasciarlo al sole. Se una pagina è attaccata, non forzarla: chiamami.»

Poi si gira verso Lina: «Lina, portale una scatola di cartone pulita, per favore. E dalle anche la mia lente.»

Nel pomeriggio Clara va in Comune per chiedere informazioni sulla casa. L'impiegata è gentile ma molto precisa.

«Si accomodi. Compili questo modulo, scriva qui il nome della proprietaria originale e firmi in fondo. Poi torni giovedì con un documento d'identità e, se li ha, porti anche i documenti di famiglia.»

«Grazie. E se ho domande?»

«Mi chiami pure. Ecco il numero.»`,
q:[["Chi è Ornella?",["Una vicina di Clara","Un'amica di Lina che lavorava in biblioteca","L'impiegata del Comune","La sorella di Matteo"],1],["Che cosa NON deve fare Clara con il diario?",["Girarlo dall'angolo in alto","Toccarlo con le mani bagnate","Chiamare Ornella","Metterlo in una scatola"],1],["Quando deve tornare in Comune?",["Lunedì","Giovedì","Domani","Fra un mese"],1]]},

{u:8, t:'Credo che sia lei', g:'congiuntivo presente', text:`Tra le pagine del diario Clara trova una piccola foto: una bambina di pochi mesi, in braccio a una donna giovane. Dietro c'è scritto: «Giulia, 1932».

«Chi è Giulia?» chiede Clara. «Penso che la donna sia Anna. Ha lo stesso sorriso della foto con Teresa.»

Lina guarda la foto a lungo. «Ma Anna non si è mai sposata. In paese tutti dicevano che fosse sempre stata sola.»

«È possibile che abbia avuto una figlia senza dirlo a nessuno?»

«Può darsi», dice Ornella. «A quei tempi era una cosa difficile. Bisogna che leggiamo il diario con attenzione. Spero che non sia una storia troppo triste.»

Clara annuisce. Benché sia stanca, quella sera legge fino a mezzanotte. Vuole che Anna le racconti tutto.`,
q:[["Che cosa c'è dietro la foto?",["«Anna, 1920»","«Giulia, 1932»","«Teresa, 1899»","Niente"],1],["Perché Clara pensa che la donna sia Anna?",["Per il vestito","Per il sorriso","Per la data","Lo dice il parroco"],1],["Che cosa dicevano tutti in paese su Anna?",["Che era ricca","Che era sempre stata sola","Che era partita","Che aveva cinque figli"],1]]},

{u:9, t:'Pensavo che fosse sola', g:'congiuntivo imperfetto e trapassato', text:`Alla fine, la verità la racconta il diario stesso. Nel 1931 Anna aveva conosciuto un giovane maestro, arrivato in paese per insegnare. Si erano innamorati, ma poco dopo lui era partito per lavorare in Africa, e non era più tornato.

Quando era nata Giulia, Anna aveva avuto paura che il paese la giudicasse. Una zia di Bologna si era offerta di crescere la bambina come se fosse sua. Anna aveva accettato, a condizione che potesse vederla ogni estate.

«Pensavo che fosse sola tutta la vita», dice Lina con la voce rotta. «Nessuno sapeva niente. Lei voleva che nessuno lo sapesse.»

Clara chiude il diario. «Vorrei che Teresa l'avesse saputo. Forse lo sapeva, chissà.»

Ornella ha già fatto qualche telefonata. «A Bologna vive ancora una nipote di Giulia», dice. «Si chiama Elisa. Se vuoi, ti do il suo numero.»`,
q:[["Chi era il padre di Giulia?",["Un medico","Un giovane maestro","Il parroco","Un contadino"],1],["Chi ha cresciuto Giulia?",["Teresa","Una zia di Bologna","Lina","Ornella"],1],["Chi vive ancora a Bologna?",["Giulia","Una nipote di Giulia, Elisa","Il maestro","Matteo"],1]]},

{u:10, t:'Se Teresa fosse rimasta', g:'periodo ipotetico', text:`Sul treno per Bologna, Clara guarda dal finestrino e pensa.

Se Teresa fosse rimasta in Italia, la nonna Rosa non sarebbe nata in Brasile, e lei, Clara, non esisterebbe. Se Anna avesse raccontato a tutti la verità, forse la sua vita sarebbe stata più difficile, o forse più leggera. Se la lettera del 1925 fosse andata persa, oggi Clara sarebbe a San Paolo, davanti al computer, senza sapere niente di tutto questo.

Le sembra incredibile: basta una scelta, una lettera, un treno, e tutto cambia.

Il telefono vibra. È un messaggio di Elisa: «Ciao Clara! Ti aspetto alla stazione. Se hai fame, andiamo subito a mangiare: conosco una trattoria qui vicino. Se sei stanca, invece, ti porto a casa mia. Come preferisci!»

Clara risponde: «Se mi offri dei tortellini, non sono stanca per niente!»`,
q:[["Che cosa sarebbe successo se Teresa fosse rimasta in Italia?",["Clara sarebbe nata a Bologna","La nonna Rosa non sarebbe nata in Brasile","Anna sarebbe partita","Niente"],1],["Che cosa propone Elisa?",["Di andare al museo","Di mangiare subito o di andare a casa sua","Di tornare a San Vito","Di dormire in albergo"],1],["Che cosa risponde Clara?",["Che è stanca","Che con i tortellini non è stanca","Che non ha fame","Che preferisce l'albergo"],1]]},

{u:11, t:'Lettere dal Brasile', g:'passivo, si impersonale, gerundio', text:`Elisa abita in un appartamento pieno di libri, vicino all'università. Dopo cena porta in salotto una scatola di metallo.

«Questa scatola è stata conservata da mia nonna Giulia fino alla sua morte. In famiglia non se ne parlava mai. Si diceva soltanto che erano "le carte della zia Anna".»

Dentro ci sono decine di lettere. Le buste sono gialle, i francobolli sono brasiliani.

Clara ne prende una, tremando. «Sono state scritte da Teresa! Guarda: Caxias do Sul, 1926… 1931… 1947…»

Leggendo le date, capiscono una cosa importante: Teresa non aveva dimenticato la sorella. Le aveva scritto per tutta la vita. Le lettere venivano spedite due volte all'anno, a Natale e a Pasqua.

«Queste lettere vanno lette con calma», dice Elisa. «Domani le leggiamo insieme?»

Finita la cena, Clara chiama la nonna Rosa. Non riesce a parlare: piange e ride nello stesso momento.`,
q:[["Chi aveva conservato la scatola?",["Elisa","La nonna Giulia","Teresa","Clara"],1],["Da dove vengono le lettere?",["Da Bologna","Dal Brasile","Da San Vito","Dall'Africa"],1],["Quando venivano spedite le lettere?",["Ogni mese","A Natale e a Pasqua","Una volta sola","Ogni settimana"],1]]},

{u:12, t:'La lettera di Teresa', g:'discorso indiretto e passato remoto', text:`Il giorno dopo Elisa e Clara leggono la prima lettera, del 1926. Teresa racconta il viaggio con una scrittura semplice e ordinata:

«Cara Anna, partimmo da Genova il quattro aprile, con il vapore. Il viaggio durò trentadue giorni. Molti stettero male, io no. Quando arrivammo a Rio Grande, piovve per una settimana intera. Poi salimmo verso le colline con un carro. Mio marito disse che la terra assomigliava a quella di San Vito, e un po' è vero.»

Alla fine della lettera, Teresa chiedeva alla sorella se la casa fosse ancora in piedi e le diceva che un giorno sarebbe tornata.

Elisa poi racconta: «Mia nonna mi disse che Anna leggeva queste lettere ad alta voce, d'estate, quando andava a trovarla. E le diceva sempre che la zia del Brasile sarebbe tornata, prima o poi.»

Eppure Teresa non tornò mai. Insomma, le due sorelle si erano aspettate a vicenda per tutta la vita.`,
q:[["Quanto durò il viaggio di Teresa?",["Una settimana","Trentadue giorni","Un anno","Tre giorni"],1],["Che cosa disse il marito di Teresa sulla terra?",["Che era brutta","Che assomigliava a quella di San Vito","Che era troppo cara","Niente"],1],["Che cosa diceva Anna a Giulia?",["Che la zia del Brasile sarebbe tornata","Che doveva partire","Che la casa era venduta","Che Teresa era morta"],0]]},

{u:13, t:'Le persone di cui parlava Anna', g:'pronomi relativi', text:`Tornate a San Vito, Clara ed Elisa passano le serate nella casa sulla collina, alla luce di una lampada portatile, leggendo il diario di Anna e le lettere di Teresa insieme.

Pian piano compare un mondo intero: la maestra da cui Anna aveva imparato a scrivere, il fornaio la cui moglie le portava il pane caldo, la fontana dove le ragazze si raccontavano i segreti, il maestro di cui si era innamorata.

«Chi avrebbe immaginato che una donna di cui tutti dicevano "poverina, è sola" avesse una vita così piena?» dice Elisa.

Lina, che le ascolta in silenzio, a un certo punto si alza. «C'è una cosa che non vi ho detto. Il fornaio di cui parla il diario era il mio bisnonno. E la ragazza con cui Anna andava alla fontana ogni mattina era mia nonna.»

Clara la guarda. Ciò che aveva cominciato come una storia della sua famiglia sta diventando la storia di tutto il paese.`,
q:[["Dove leggono il diario la sera?",["Al bar","Nella casa sulla collina","In biblioteca","A Bologna"],1],["Chi era il fornaio di cui parla il diario?",["Il padre di Elisa","Il bisnonno di Lina","Il maestro","Il parroco"],1],["Che cosa sta diventando la storia, secondo Clara?",["Un romanzo","La storia di tutto il paese","Un film","Un segreto"],1]]},

{u:14, t:'Decidere di restare', g:'verbi e preposizioni', text:`Una mattina di ottobre Clara si sveglia e capisce che ha deciso. Ha smesso di pensare al biglietto di ritorno e ha cominciato a pensare alla casa.

Chiama il suo capo a San Paolo. «Ho bisogno di parlarle. Vorrei provare a lavorare da remoto per sei mesi.» Con sua sorpresa, il capo accetta: «Se riesci a rispettare le scadenze, per me va bene.»

Poi chiama la nonna. «Nonna, sono appena tornata dal Comune. La casa è ancora della nostra famiglia: Anna non l'ha mai venduta. Voglio provare a ristrutturarla.»

«Lo sapevo che ti saresti innamorata di quel posto», ride la nonna. «Tua bisnonna sognava di tornarci ogni giorno.»

La sera, al bar, Clara lo racconta a Lina e a Matteo. «Non so se ci riuscirò. Non sono abituata a fare tutto in un'altra lingua. Ma conto su di voi.»

«Su di noi puoi contare sempre», dice Matteo, e alza il bicchiere.`,
q:[["Che cosa chiede Clara al suo capo?",["Un aumento","Di lavorare da remoto per sei mesi","Di licenziarsi","Una vacanza"],1],["Che cosa ha scoperto in Comune?",["Che la casa è stata venduta","Che la casa è ancora della famiglia","Che la casa è del Comune","Che la casa sarà demolita"],1],["Che cosa risponde Matteo?",["Che è impossibile","Che possono contare su di loro sempre","Che lui parte","Che non vuole aiutarla"],1]]},

{u:15, t:'Me la caverò', g:'causativo e verbi pronominali', text:`I lavori cominciano a novembre. Clara, che è architetta, disegna il progetto da sola, ma per il resto deve farsi aiutare.

Prima fa controllare il tetto da un geometra del paese, poi lo fa riparare da due fratelli muratori che lavorano da quarant'anni sulle case della valle. Ornella le fa conoscere un restauratore che sistema le vecchie porte di legno.

Non tutto va liscio. Un giorno il muratore più anziano se la prende perché Clara vuole cambiare una finestra. «Questa finestra c'è da trecento anni, signorina!» Clara non se la sente di insistere, e la finestra resta dov'è.

Le giornate sono lunghe e il freddo è forte. Certe sere Clara è così stanca che non ce la fa nemmeno a cenare. Ma quando la nonna Rosa le chiede al telefono come se la passa, risponde sempre: «Benissimo, nonna. Me la cavo.»

E ogni giorno, un po' meglio, se la cava davvero.`,
q:[["Chi ripara il tetto?",["Clara da sola","Due fratelli muratori","Matteo","Il geometra"],1],["Perché il muratore se la prende?",["Clara non lo paga","Clara vuole cambiare una finestra antica","Fa troppo freddo","Lavorano di domenica"],1],["Che cosa risponde Clara alla nonna?",["Che vuole tornare","«Me la cavo»","Che è malata","Che i lavori sono finiti"],1]]},

{u:16, t:'Una lettera, cento anni dopo', g:'registro formale', text:`A primavera la casa è pronta. Clara ha un'idea, e la mette per iscritto.

«Spettabile Comune di San Vito,
con la presente desidero proporre l'apertura, presso la casa Zanetti, di un piccolo archivio dedicato all'emigrazione del paese verso il Brasile. La sottoscritta mette a disposizione gratuitamente due stanze dell'edificio, nonché il materiale documentario in suo possesso: il diario di Anna Zanetti e la corrispondenza della sorella Teresa, conservata dalla famiglia Ferri di Bologna. Resto in attesa di un Vostro cortese riscontro e porgo distinti saluti.»

La risposta arriva dopo tre settimane: il progetto è approvato.

Quella sera Clara sale sulla collina, si siede davanti alla porta, proprio dove si sedeva Anna, e scrive un'ultima lettera, a mano, con l'inchiostro blu:

«Cara Teresa, cara Anna,
la casa è ancora nostra. Qualcuno, alla fine, è tornato.
Vostra Clara.»`,
q:[["Che cosa propone Clara al Comune?",["Di vendere la casa","Di aprire un piccolo archivio sull'emigrazione","Di aprire un albergo","Di demolire la casa"],1],["Che cosa mette a disposizione?",["Soldi","Due stanze e i documenti di famiglia","Un terreno","Un'auto"],1],["A chi è indirizzata l'ultima lettera?",["Alla nonna Rosa","A Teresa e ad Anna","Al Comune","A Matteo"],1]]}
];
