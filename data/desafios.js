// Desafios sazonais: trajetos curtos que correm em paralelo à jornada (PLANO.md §7).
// Não travam nem atrasam a jornada principal. Mesma regra de conteúdo: texto fiel e referência.
// trechos: [livro, capítulo, versículo inicial, versículo final]  (ids de livro de data/plano.js)
// Ligações entre Antigo e Novo Testamento: só as que o próprio Novo Testamento faz (com referência).

export const DESAFIOS = [
  {
    id: 'natal-2026',
    serie: 'natal', ciclo: 1,
    nome: 'A promessa cumprida',
    tipo: 'Natal',
    inicio: '2026-12-14',
    fim: '2027-01-06',
    icone: 'star',
    cor: '#b8323f',
    tema: 'natal',
    desc: '12 dias: das promessas do Antigo Testamento ao nascimento de Jesus.',
    selo: { id: 'natal-2026', nome: 'Natal 2026', icone: 'star', arte: 'natal', ref: 'Lc 2:10-11', texto: 'Hoje, na cidade de Davi, nasceu o Salvador. Selo de quem completou o desafio de Natal de 2026.' },
    sessoes: [
      { titulo: 'A primeira promessa', icone: 'sunrise', trechos: [['gn', 3, 8, 15]],
        contexto: 'Logo depois que o pecado entra no mundo, Deus fala com a serpente e anuncia que um descendente da mulher a feriria na cabeça.',
        notas: [
          ['Gn 3:9', 'A primeira pergunta de Deus ao ser humano depois do pecado: onde você está?'],
          ['Gn 3:15', 'A descendência da mulher ferirá a cabeça da serpente, e ela lhe ferirá o calcanhar.'],
          ['Tradição', 'Desde os primeiros séculos, muitos cristãos leram Gn 3:15 como o primeiro anúncio do Salvador. O próprio texto não diz quem é esse descendente.'],
        ],
        pergunta: 'Deus foi procurar Adão depois do erro. Como é saber que Deus vem atrás de você?',
        crianca: 'Qual foi a primeira pergunta que Deus fez a Adão depois que ele errou?' },

      { titulo: 'Uma bênção para todas as famílias', icone: 'users-round', trechos: [['gn', 12, 1, 3], ['gl', 3, 8, 9], ['gl', 3, 16, 16]],
        contexto: 'Deus chama Abraão e promete que, por meio dele, todas as famílias da terra seriam abençoadas. Séculos depois, Paulo explica a quem essa promessa apontava.',
        notas: [
          ['Gn 12:3', 'Em você serão benditas todas as famílias da terra.'],
          ['Gl 3:8', 'Paulo: a Escritura anunciou antes o evangelho a Abraão.'],
          ['Gl 3:16', 'Paulo: a promessa foi feita "à sua descendência", no singular, que é Cristo.'],
        ],
        pergunta: 'A promessa a Abraão era para "todas as famílias". O que significa a sua família fazer parte dessa promessa?',
        crianca: 'Deus prometeu abençoar quantas famílias por meio de Abraão?' },

      { titulo: 'Um rei da casa de Davi', icone: 'crown', trechos: [['2sm', 7, 12, 16], ['lc', 1, 30, 33]],
        contexto: 'Deus promete ao rei Davi um descendente cujo reino seria firmado para sempre. Mil anos depois, o anjo Gabriel repete essa promessa a Maria.',
        notas: [
          ['2Sm 7:13', 'Confirmarei o trono do reino dele para sempre.'],
          ['2Sm 7:16', 'A sua casa e o seu reino serão firmados para sempre.'],
          ['Lc 1:32-33', 'Gabriel: Deus lhe dará o trono de Davi, seu pai, e o seu reino não terá fim.'],
        ],
        pergunta: 'Deus cumpriu uma promessa mil anos depois. Que promessa de Deus você precisa continuar esperando?',
        crianca: 'Que rei recebeu a promessa de um reino para sempre?' },

      { titulo: 'O sinal: Deus conosco', icone: 'heart', trechos: [['is', 7, 10, 14], ['mt', 1, 20, 23]],
        contexto: 'O profeta Isaías anuncia ao rei Acaz um sinal: a virgem conceberia e daria à luz um filho chamado Emanuel. Mateus diz que isso se cumpriu no nascimento de Jesus.',
        notas: [
          ['Is 7:14', 'O próprio Senhor dará um sinal: a virgem conceberá e dará à luz um filho, e o chamará Emanuel.'],
          ['Mt 1:22-23', 'Mateus: tudo isso aconteceu para se cumprir o que o Senhor disse pelo profeta.'],
          ['Mt 1:23', 'Emanuel quer dizer: Deus conosco.'],
        ],
        pergunta: '"Deus conosco." Em que lugar da sua vida você mais precisa lembrar que Deus está com você?',
        crianca: 'O que quer dizer o nome Emanuel?' },

      { titulo: 'Um menino nos nasceu', icone: 'sun', trechos: [['is', 9, 1, 7], ['mt', 4, 12, 16]],
        contexto: 'Isaías anuncia luz para o povo que andava em trevas, na região da Galileia, e o nascimento de um menino que reinaria no trono de Davi. Mateus diz que essa luz chegou quando Jesus começou a pregar na Galileia.',
        notas: [
          ['Is 9:2', 'O povo que andava em trevas viu uma grande luz.'],
          ['Is 9:6', 'Um menino nos nasceu; o seu nome: Maravilhoso Conselheiro, Deus Forte, Pai da Eternidade, Príncipe da Paz.'],
          ['Is 9:7', 'O seu governo e a paz não terão fim, sobre o trono de Davi.'],
          ['Mt 4:14-16', 'Mateus cita Is 9:1-2 quando Jesus vai morar em Cafarnaum, na Galileia.'],
        ],
        pergunta: 'Qual dos nomes de Is 9:6 você mais precisa conhecer hoje: Conselheiro, Deus Forte, Pai, Príncipe da Paz?',
        crianca: 'Escolha um dos nomes do menino em Isaías 9:6. Por que você escolheu esse?' },

      { titulo: 'Um ramo do tronco de Jessé', icone: 'sprout', trechos: [['is', 11, 1, 10]],
        contexto: 'Do tronco cortado de Jessé, pai de Davi, brotaria um ramo cheio do Espírito do Senhor. Isaías descreve um reino de justiça e paz, onde o lobo vive com o cordeiro.',
        notas: [
          ['Is 11:1', 'Um ramo brotará do tronco de Jessé.'],
          ['Is 11:2', 'O Espírito do Senhor repousará sobre ele: sabedoria, entendimento, conselho, força, conhecimento e temor do Senhor.'],
          ['Is 11:6', 'O lobo viverá com o cordeiro, e um menino pequeno os guiará.'],
          ['Rm 15:12', 'Paulo cita Is 11:10 para falar de Cristo, em quem as nações esperam.'],
        ],
        pergunta: 'Isaías fala de um mundo em paz, onde até inimigos convivem. Onde você pode levar um pouco dessa paz?',
        crianca: 'Que animais vivem juntos em paz em Isaías 11?' },

      { titulo: 'Belém, a pequena', icone: 'house', trechos: [['mq', 5, 2, 5], ['mt', 2, 1, 6]],
        contexto: 'O profeta Miqueias anuncia que da pequena Belém sairia o governante de Israel. Quando os magos perguntam onde nasceria o rei dos judeus, os sacerdotes e escribas respondem com essa profecia.',
        notas: [
          ['Mq 5:2', 'Belém Efrata, pequena entre as famílias de Judá: de você sairá o que governará Israel.'],
          ['Mq 5:4-5', 'Ele pastoreará com a força do Senhor; ele será a nossa paz.'],
          ['Mt 2:5-6', 'Os sacerdotes e escribas citam Miqueias: o Messias nasceria em Belém da Judeia.'],
        ],
        pergunta: 'Deus escolheu uma cidade pequena. Onde você se sente pequeno demais para Deus usar?',
        crianca: 'Em que cidade pequena o profeta disse que o rei nasceria?' },

      { titulo: 'O anúncio a Zacarias', icone: 'flame', trechos: [['lc', 1, 5, 25]],
        contexto: 'O sacerdote Zacarias e sua esposa Isabel eram idosos e não tinham filhos. No templo, o anjo Gabriel anuncia que eles terão um filho, João, que prepararia o caminho do Senhor.',
        notas: [
          ['Lc 1:6', 'Zacarias e Isabel eram justos diante de Deus.'],
          ['Lc 1:13', 'A sua oração foi ouvida; Isabel lhe dará um filho, e o chamará João.'],
          ['Lc 1:17', 'João iria adiante do Senhor para preparar um povo para ele.'],
          ['Lc 1:20', 'Por não crer, Zacarias ficaria mudo até o cumprimento das palavras.'],
        ],
        pergunta: 'A oração de Zacarias foi ouvida, mesmo depois de muito tempo. Que oração antiga você ainda faz?',
        crianca: 'Qual era o nome do bebê que Zacarias e Isabel iam ter?' },

      { titulo: 'O anúncio a Maria', icone: 'music', trechos: [['lc', 1, 26, 56]],
        contexto: 'Gabriel visita Maria, uma moça noiva de José, em Nazaré, e anuncia que ela será mãe do Filho do Altíssimo. Maria aceita e vai visitar Isabel, onde canta um cântico de louvor.',
        notas: [
          ['Lc 1:30', 'Não tenha medo, Maria; você encontrou graça diante de Deus.'],
          ['Lc 1:37', 'Para Deus nada é impossível.'],
          ['Lc 1:38', 'Maria: eis aqui a serva do Senhor; aconteça comigo conforme a sua palavra.'],
          ['Lc 1:46-47', 'O cântico de Maria: a minha alma engrandece o Senhor.'],
        ],
        pergunta: 'Maria respondeu "aconteça comigo conforme a tua palavra". O que seria dizer isso a Deus hoje?',
        crianca: 'O que Maria respondeu ao anjo?' },

      { titulo: 'José, o justo', icone: 'moon-star', trechos: [['mt', 1, 18, 25]],
        contexto: 'José descobre que Maria está grávida e decide deixá-la em segredo, para não expô-la. Um anjo aparece em sonho, explica que o filho vem do Espírito Santo e manda chamá-lo Jesus.',
        notas: [
          ['Mt 1:19', 'José era justo e não queria expor Maria publicamente.'],
          ['Mt 1:20', 'Não tenha medo de receber Maria; o que nela foi gerado vem do Espírito Santo.'],
          ['Mt 1:21', 'Você o chamará Jesus, porque ele salvará o seu povo dos seus pecados.'],
          ['Mt 1:24', 'José acorda e faz como o anjo mandou.'],
        ],
        pergunta: 'José obedeceu assim que acordou. Que passo de obediência você tem adiado?',
        crianca: 'Por que o bebê ia se chamar Jesus?' },

      { titulo: 'Nasceu o Salvador', icone: 'baby', trechos: [['lc', 2, 1, 20]],
        contexto: 'Um decreto de César Augusto leva José e Maria a Belém. Jesus nasce e é deitado numa manjedoura, porque não havia lugar para eles na hospedaria. Anjos anunciam o nascimento a pastores no campo.',
        notas: [
          ['Lc 2:7', 'Maria o envolve em panos e o deita numa manjedoura; não havia lugar para eles na hospedaria.'],
          ['Lc 2:10-11', 'Trago boas notícias de grande alegria para todo o povo: hoje nasceu o Salvador, Cristo, o Senhor.'],
          ['Lc 2:14', 'Glória a Deus nas maiores alturas, e paz na terra.'],
          ['Lc 2:19', 'Maria guardava todas essas coisas, meditando nelas no coração.'],
        ],
        pergunta: 'Os pastores foram depressa e depois contaram o que viram. A quem você pode contar essa boa notícia?',
        crianca: 'Onde o bebê Jesus foi deitado? Quem recebeu a notícia primeiro?' },

      { titulo: 'Os magos e a luz', icone: 'star', trechos: [['mt', 2, 7, 12], ['joa', 1, 1, 5], ['joa', 1, 14, 14]],
        contexto: 'Magos vindos do Oriente seguem a estrela até a casa onde está o menino, o adoram e lhe dão presentes. João resume o Natal numa frase: a Palavra se fez carne e habitou entre nós.',
        notas: [
          ['Mt 2:10-11', 'Ao ver a estrela, os magos se alegram muito; entram, adoram o menino e oferecem ouro, incenso e mirra.'],
          ['Mt 2:11', 'O texto não diz quantos eram os magos; fala de três presentes.'],
          ['Jo 1:4-5', 'Nele estava a vida, e a vida era a luz dos homens; a luz brilha nas trevas.'],
          ['Jo 1:14', 'A Palavra se fez carne e habitou entre nós, cheia de graça e de verdade.'],
        ],
        pergunta: 'Os magos trouxeram o melhor que tinham. O que você quer oferecer a Jesus neste Natal?',
        crianca: 'Quais foram os três presentes dos magos?' },
    ],
  },
  {
    id: 'ano-novo-2027',
    serie: 'ano-novo', ciclo: 1,
    nome: 'Recomeços',
    tipo: 'Ano novo',
    inicio: '2027-01-01',
    fim: '2027-01-31',
    icone: 'sunrise',
    cor: '#2f7a8a',
    desc: '7 dias sobre como Deus faz começar de novo: da primeira luz à promessa de todas as coisas novas.',
    selo: { id: 'ano-novo-2027', nome: 'Ano novo 2027', icone: 'sunrise', ref: 'Lm 3:22-23', texto: 'As misericórdias do Senhor se renovam a cada manhã. Selo de quem completou o desafio de Ano novo de 2027.' },
    sessoes: [
      { titulo: 'No princípio, a luz', icone: 'sun', trechos: [['gn', 1, 1, 5]],
        contexto: 'A Bíblia começa com a terra sem forma e vazia, coberta de trevas. A primeira palavra de Deus traz luz e o primeiro dia.',
        notas: [
          ['Gn 1:2', 'A terra estava desordenada e vazia, e as trevas cobriam o abismo; o Espírito de Deus se movia sobre as águas.'],
          ['Gn 1:3', 'Deus disse: haja luz. E houve luz.'],
          ['Gn 1:5', 'Houve tarde e manhã: o primeiro dia.'],
        ],
        pergunta: 'O que está "desordenado e vazio" na sua vida que você quer entregar a Deus neste começo de ano?',
        crianca: 'Qual foi a primeira coisa que Deus criou falando?' },

      { titulo: 'Depois do dilúvio', icone: 'rainbow', trechos: [['gn', 8, 15, 22], ['gn', 9, 12, 16]],
        contexto: 'Quando as águas baixam, Noé e sua família saem da arca para começar tudo de novo numa terra lavada.',
        notas: [
          ['Gn 8:20', 'A primeira coisa que Noé fez fora da arca foi edificar um altar ao Senhor.'],
          ['Gn 8:22', 'Enquanto a terra durar, plantio e colheita, frio e calor, verão e inverno, dia e noite não vão cessar.'],
          ['Gn 9:13', 'O arco nas nuvens é o sinal da aliança de Deus com a terra.'],
        ],
        pergunta: 'Noé começou a vida nova com um altar. Como você pode começar este ano colocando Deus em primeiro lugar?',
        crianca: 'Qual sinal Deus colocou nas nuvens?' },

      { titulo: 'Novas a cada manhã', icone: 'sunrise', trechos: [['lm', 3, 19, 26]],
        contexto: 'Lamentações chora a destruição de Jerusalém (Lm 1:1). No meio da dor, o autor decide lembrar de algo que lhe dá esperança.',
        notas: [
          ['Lm 3:21', 'Isto trarei de volta à memória, por isso terei esperança.'],
          ['Lm 3:22-23', 'As misericórdias do Senhor não têm fim; elas se renovam a cada manhã. Grande é a tua fidelidade.'],
          ['Lm 3:26', 'É bom esperar em silêncio a salvação do Senhor.'],
          ['Tradição', 'A tradição atribui Lamentações a Jeremias. O próprio livro não diz quem o escreveu.'],
        ],
        pergunta: 'Quando o dia começa difícil, o que você pode "trazer à memória" para ter esperança?',
        crianca: 'De quanto em quanto tempo as misericórdias de Deus se renovam?' },

      { titulo: 'Uma coisa nova', icone: 'sprout', trechos: [['is', 43, 16, 21]],
        contexto: 'Deus lembra ao povo o caminho que abriu no mar e diz que vai fazer algo ainda novo: caminho no deserto e rios na terra seca.',
        notas: [
          ['Is 43:16', 'O Senhor é aquele que preparou no mar um caminho, nas águas impetuosas uma vereda.'],
          ['Is 43:18-19', 'Não fiquem presos às coisas passadas: eis que farei uma coisa nova; já está surgindo.'],
          ['Is 43:21', 'Deus formou esse povo para anunciar o seu louvor.'],
        ],
        pergunta: 'Que coisa do ano passado você precisa deixar para trás para enxergar o que Deus está fazendo de novo?',
        crianca: 'Onde Deus prometeu abrir um caminho e fazer correr rios?' },

      { titulo: 'A segunda vez', icone: 'waves', trechos: [['jn', 3, 1, 10]],
        contexto: 'Jonas fugiu de Deus, foi engolido por um grande peixe e orou lá de dentro (Jn 1:17; 2:1). Agora Deus fala com ele de novo.',
        notas: [
          ['Jn 3:1', 'A palavra do Senhor veio a Jonas pela segunda vez.'],
          ['Jn 3:5', 'Os ninivitas creram em Deus, do maior ao menor.'],
          ['Jn 3:10', 'Deus viu que se converteram do mau caminho e não fez o mal que tinha anunciado.'],
        ],
        pergunta: 'Deus deu uma segunda chance a Jonas e a Nínive. A quem você pode dar uma segunda chance este ano?',
        crianca: 'Quantas vezes Deus mandou Jonas ir a Nínive?' },

      { titulo: 'Nova criatura', icone: 'sparkles', trechos: [['2co', 5, 14, 21]],
        contexto: 'Paulo explica aos coríntios o que muda em quem está unido a Cristo, que morreu e ressuscitou por todos.',
        notas: [
          ['2Co 5:15', 'Ele morreu por todos para que os que vivem não vivam mais para si.'],
          ['2Co 5:17', 'Se alguém está em Cristo, é nova criatura: as coisas velhas passaram, tudo se fez novo.'],
          ['2Co 5:18', 'Tudo isso vem de Deus, que nos reconciliou consigo por meio de Cristo.'],
        ],
        pergunta: 'O que significa, no seu dia a dia, que "as coisas velhas já passaram"?',
        crianca: 'Quem está em Cristo se torna o quê?' },

      { titulo: 'Todas as coisas novas', icone: 'star', trechos: [['ap', 21, 1, 7]],
        contexto: 'No fim da Bíblia, João vê o recomeço definitivo: novo céu, nova terra e Deus morando com o seu povo.',
        notas: [
          ['Ap 21:1', 'João viu um novo céu e uma nova terra.'],
          ['Ap 21:4', 'Deus limpará toda lágrima; não haverá mais morte, nem pranto, nem dor.'],
          ['Ap 21:5', 'Aquele que está no trono diz: eis que faço novas todas as coisas.'],
        ],
        pergunta: 'Qual promessa de Apocalipse 21 mais te dá esperança para o ano que começa?',
        crianca: 'O que Deus vai limpar dos olhos do seu povo?' },
    ],
  },
];
