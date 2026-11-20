// Desafios sazonais: trajetos curtos que correm em paralelo à jornada (PLANO.md §7).
// Não travam nem atrasam a jornada principal. Mesma regra de conteúdo: texto fiel e referência.
// trechos: [livro, capítulo, versículo inicial, versículo final]  (ids de livro de data/plano.js)
// Ligações entre Antigo e Novo Testamento: só as que o próprio Novo Testamento faz (com referência).

export const DESAFIOS = [
  {
    id: 'natal-2026',
    nome: 'A promessa cumprida',
    tipo: 'Natal',
    inicio: '2026-12-14',
    fim: '2027-01-06',
    icone: 'star',
    cor: '#b8323f',
    desc: '12 dias: das promessas do Antigo Testamento ao nascimento de Jesus.',
    selo: { id: 'natal-2026', nome: 'Natal 2026', icone: 'star', ref: 'Lc 2:10-11', texto: 'Hoje, na cidade de Davi, nasceu o Salvador. Selo de quem completou o desafio de Natal de 2026.' },
    sessoes: [
      { titulo: 'A primeira promessa', trechos: [['gn', 3, 8, 15]],
        contexto: 'Logo depois que o pecado entra no mundo, Deus fala com a serpente e anuncia que um descendente da mulher a feriria na cabeça.',
        notas: [
          ['Gn 3:9', 'A primeira pergunta de Deus ao ser humano depois do pecado: onde você está?'],
          ['Gn 3:15', 'A descendência da mulher ferirá a cabeça da serpente, e ela lhe ferirá o calcanhar.'],
          ['Tradição', 'Desde os primeiros séculos, muitos cristãos leram Gn 3:15 como o primeiro anúncio do Salvador. O próprio texto não diz quem é esse descendente.'],
        ],
        pergunta: 'Deus foi procurar Adão depois do erro. Como é saber que Deus vem atrás de você?',
        crianca: 'Qual foi a primeira pergunta que Deus fez a Adão depois que ele errou?' },

      { titulo: 'Uma bênção para todas as famílias', trechos: [['gn', 12, 1, 3], ['gl', 3, 8, 9], ['gl', 3, 16, 16]],
        contexto: 'Deus chama Abraão e promete que, por meio dele, todas as famílias da terra seriam abençoadas. Séculos depois, Paulo explica a quem essa promessa apontava.',
        notas: [
          ['Gn 12:3', 'Em você serão benditas todas as famílias da terra.'],
          ['Gl 3:8', 'Paulo: a Escritura anunciou antes o evangelho a Abraão.'],
          ['Gl 3:16', 'Paulo: a promessa foi feita "à sua descendência", no singular, que é Cristo.'],
        ],
        pergunta: 'A promessa a Abraão era para "todas as famílias". O que significa a sua família fazer parte dessa promessa?',
        crianca: 'Deus prometeu abençoar quantas famílias por meio de Abraão?' },

      { titulo: 'Um rei da casa de Davi', trechos: [['2sm', 7, 12, 16], ['lc', 1, 30, 33]],
        contexto: 'Deus promete ao rei Davi um descendente cujo reino seria firmado para sempre. Mil anos depois, o anjo Gabriel repete essa promessa a Maria.',
        notas: [
          ['2Sm 7:13', 'Confirmarei o trono do reino dele para sempre.'],
          ['2Sm 7:16', 'A sua casa e o seu reino serão firmados para sempre.'],
          ['Lc 1:32-33', 'Gabriel: Deus lhe dará o trono de Davi, seu pai, e o seu reino não terá fim.'],
        ],
        pergunta: 'Deus cumpriu uma promessa mil anos depois. Que promessa de Deus você precisa continuar esperando?',
        crianca: 'Que rei recebeu a promessa de um reino para sempre?' },

      { titulo: 'O sinal: Deus conosco', trechos: [['is', 7, 10, 14], ['mt', 1, 20, 23]],
        contexto: 'O profeta Isaías anuncia ao rei Acaz um sinal: a virgem conceberia e daria à luz um filho chamado Emanuel. Mateus diz que isso se cumpriu no nascimento de Jesus.',
        notas: [
          ['Is 7:14', 'O próprio Senhor dará um sinal: a virgem conceberá e dará à luz um filho, e o chamará Emanuel.'],
          ['Mt 1:22-23', 'Mateus: tudo isso aconteceu para se cumprir o que o Senhor disse pelo profeta.'],
          ['Mt 1:23', 'Emanuel quer dizer: Deus conosco.'],
        ],
        pergunta: '"Deus conosco." Em que lugar da sua vida você mais precisa lembrar que Deus está com você?',
        crianca: 'O que quer dizer o nome Emanuel?' },

      { titulo: 'Um menino nos nasceu', trechos: [['is', 9, 1, 7], ['mt', 4, 12, 16]],
        contexto: 'Isaías anuncia luz para o povo que andava em trevas, na região da Galileia, e o nascimento de um menino que reinaria no trono de Davi. Mateus diz que essa luz chegou quando Jesus começou a pregar na Galileia.',
        notas: [
          ['Is 9:2', 'O povo que andava em trevas viu uma grande luz.'],
          ['Is 9:6', 'Um menino nos nasceu; o seu nome: Maravilhoso Conselheiro, Deus Forte, Pai da Eternidade, Príncipe da Paz.'],
          ['Is 9:7', 'O seu governo e a paz não terão fim, sobre o trono de Davi.'],
          ['Mt 4:14-16', 'Mateus cita Is 9:1-2 quando Jesus vai morar em Cafarnaum, na Galileia.'],
        ],
        pergunta: 'Qual dos nomes de Is 9:6 você mais precisa conhecer hoje: Conselheiro, Deus Forte, Pai, Príncipe da Paz?',
        crianca: 'Escolha um dos nomes do menino em Isaías 9:6. Por que você escolheu esse?' },

      { titulo: 'Um ramo do tronco de Jessé', trechos: [['is', 11, 1, 10]],
        contexto: 'Do tronco cortado de Jessé, pai de Davi, brotaria um ramo cheio do Espírito do Senhor. Isaías descreve um reino de justiça e paz, onde o lobo vive com o cordeiro.',
        notas: [
          ['Is 11:1', 'Um ramo brotará do tronco de Jessé.'],
          ['Is 11:2', 'O Espírito do Senhor repousará sobre ele: sabedoria, entendimento, conselho, força, conhecimento e temor do Senhor.'],
          ['Is 11:6', 'O lobo viverá com o cordeiro, e um menino pequeno os guiará.'],
          ['Rm 15:12', 'Paulo cita Is 11:10 para falar de Cristo, em quem as nações esperam.'],
        ],
        pergunta: 'Isaías fala de um mundo em paz, onde até inimigos convivem. Onde você pode levar um pouco dessa paz?',
        crianca: 'Que animais vivem juntos em paz em Isaías 11?' },

      { titulo: 'Belém, a pequena', trechos: [['mq', 5, 2, 5], ['mt', 2, 1, 6]],
        contexto: 'O profeta Miqueias anuncia que da pequena Belém sairia o governante de Israel. Quando os magos perguntam onde nasceria o rei dos judeus, os sacerdotes e escribas respondem com essa profecia.',
        notas: [
          ['Mq 5:2', 'Belém Efrata, pequena entre as famílias de Judá: de você sairá o que governará Israel.'],
          ['Mq 5:4-5', 'Ele pastoreará com a força do Senhor; ele será a nossa paz.'],
          ['Mt 2:5-6', 'Os sacerdotes e escribas citam Miqueias: o Messias nasceria em Belém da Judeia.'],
        ],
        pergunta: 'Deus escolheu uma cidade pequena. Onde você se sente pequeno demais para Deus usar?',
        crianca: 'Em que cidade pequena o profeta disse que o rei nasceria?' },

      { titulo: 'O anúncio a Zacarias', trechos: [['lc', 1, 5, 25]],
        contexto: 'O sacerdote Zacarias e sua esposa Isabel eram idosos e não tinham filhos. No templo, o anjo Gabriel anuncia que eles terão um filho, João, que prepararia o caminho do Senhor.',
        notas: [
          ['Lc 1:6', 'Zacarias e Isabel eram justos diante de Deus.'],
          ['Lc 1:13', 'A sua oração foi ouvida; Isabel lhe dará um filho, e o chamará João.'],
          ['Lc 1:17', 'João iria adiante do Senhor para preparar um povo para ele.'],
          ['Lc 1:20', 'Por não crer, Zacarias ficaria mudo até o cumprimento das palavras.'],
        ],
        pergunta: 'A oração de Zacarias foi ouvida, mesmo depois de muito tempo. Que oração antiga você ainda faz?',
        crianca: 'Qual era o nome do bebê que Zacarias e Isabel iam ter?' },

      { titulo: 'O anúncio a Maria', trechos: [['lc', 1, 26, 56]],
        contexto: 'Gabriel visita Maria, uma moça noiva de José, em Nazaré, e anuncia que ela será mãe do Filho do Altíssimo. Maria aceita e vai visitar Isabel, onde canta um cântico de louvor.',
        notas: [
          ['Lc 1:30', 'Não tenha medo, Maria; você encontrou graça diante de Deus.'],
          ['Lc 1:37', 'Para Deus nada é impossível.'],
          ['Lc 1:38', 'Maria: eis aqui a serva do Senhor; aconteça comigo conforme a sua palavra.'],
          ['Lc 1:46-47', 'O cântico de Maria: a minha alma engrandece o Senhor.'],
        ],
        pergunta: 'Maria respondeu "aconteça comigo conforme a tua palavra". O que seria dizer isso a Deus hoje?',
        crianca: 'O que Maria respondeu ao anjo?' },

      { titulo: 'José, o justo', trechos: [['mt', 1, 18, 25]],
        contexto: 'José descobre que Maria está grávida e decide deixá-la em segredo, para não expô-la. Um anjo aparece em sonho, explica que o filho vem do Espírito Santo e manda chamá-lo Jesus.',
        notas: [
          ['Mt 1:19', 'José era justo e não queria expor Maria publicamente.'],
          ['Mt 1:20', 'Não tenha medo de receber Maria; o que nela foi gerado vem do Espírito Santo.'],
          ['Mt 1:21', 'Você o chamará Jesus, porque ele salvará o seu povo dos seus pecados.'],
          ['Mt 1:24', 'José acorda e faz como o anjo mandou.'],
        ],
        pergunta: 'José obedeceu assim que acordou. Que passo de obediência você tem adiado?',
        crianca: 'Por que o bebê ia se chamar Jesus?' },

      { titulo: 'Nasceu o Salvador', trechos: [['lc', 2, 1, 20]],
        contexto: 'Um decreto de César Augusto leva José e Maria a Belém. Jesus nasce e é deitado numa manjedoura, porque não havia lugar para eles na hospedaria. Anjos anunciam o nascimento a pastores no campo.',
        notas: [
          ['Lc 2:7', 'Maria o envolve em panos e o deita numa manjedoura; não havia lugar para eles na hospedaria.'],
          ['Lc 2:10-11', 'Trago boas notícias de grande alegria para todo o povo: hoje nasceu o Salvador, Cristo, o Senhor.'],
          ['Lc 2:14', 'Glória a Deus nas maiores alturas, e paz na terra.'],
          ['Lc 2:19', 'Maria guardava todas essas coisas, meditando nelas no coração.'],
        ],
        pergunta: 'Os pastores foram depressa e depois contaram o que viram. A quem você pode contar essa boa notícia?',
        crianca: 'Onde o bebê Jesus foi deitado? Quem recebeu a notícia primeiro?' },

      { titulo: 'Os magos e a luz', trechos: [['mt', 2, 7, 12], ['joa', 1, 1, 5], ['joa', 1, 14, 14]],
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
];
