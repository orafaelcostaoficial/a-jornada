"""Gera os prompts completos (um por imagem) para o Gemini.

Uso: python3 ferramentas/gerar_prompts.py
Saída: PROMPTS-AVATARES.md, PROMPTS-CARTAS.md, PROMPTS-SELOS.md

Cada prompt é autossuficiente: pode ser colado sozinho, sem o estilo base à parte.
Regra: só o que o texto bíblico diz (referência ao lado); sem violência, sem nudez, sem texto na imagem.
"""

ESTILO = ("ilustração digital para um app bíblico infantil e familiar, estilo livro ilustrado moderno: "
          "cartoon plano (flat) com sombreado suave, contorno limpo e arredondado, formas simples e bonitas, "
          "expressões serenas e simpáticas, adequado para crianças")
TRAJES = "trajes simples do antigo Oriente Próximo (túnicas e mantos de linho e lã, sandálias), sem adereços modernos"
EVITE = ("texto, letras, números, assinatura, moldura, marca d'água, cenas de luta ou violência, sangue, "
         "arma apontada para alguém, nudez, "
         "estilo fotográfico realista, rostos assustadores")

# ─────────────────────────── AVATARES (o viajante) ───────────────────────────
# (arquivo, personagem, momento, cena detalhada, expressão, cores, referência)
AVATARES = [
    ('davi', 'Davi', 'inicial', 'um jovem pastor de cabelo ruivo, olhos bonitos e boa aparência, segurando uma pequena harpa de madeira junto ao peito; uma ovelha branca encosta a cabeça no ombro dele', 'sorriso leve e tranquilo', 'túnica bege com faixa âmbar, cajado apoiado no ombro', '1Sm 16:11-12,23'),
    ('davi-meio', 'Davi', 'mediano', 'o mesmo jovem pastor ruivo segurando uma funda de couro na mão direita e, a tiracolo, uma bolsa de pastor aberta com cinco pedras lisas à mostra; nenhum gigante, nenhuma luta, nenhum inimigo na imagem', 'olhar firme e confiante, como quem confia em Deus', 'túnica bege com faixa âmbar', '1Sm 17:40,45'),
    ('davi-final', 'Davi', 'final', 'Davi adulto, já rei, com uma coroa simples de ouro, dançando de alegria com os braços erguidos para o alto, o manto girando com o movimento', 'alegria radiante, olhos voltados para cima', 'manto real vermelho-escuro sobre túnica clara', '2Sm 5:3; 6:14-15'),
    ('ester', 'Ester', 'inicial', 'uma jovem judia de aparência bonita, roupas simples e um véu leve sobre os cabelos escuros, mãos cruzadas à frente', 'olhar tranquilo e gentil', 'tons de lilás claro e creme', 'Et 2:7'),
    ('ester-meio', 'Ester', 'mediano', 'Ester, já rainha, usando vestes simples de jejum, sem coroa, de olhos fechados e mãos juntas em oração', 'serenidade e coragem, concentrada na oração', 'tons de roxo suave e cinza claro', 'Et 4:16'),
    ('ester-final', 'Ester', 'final', 'Ester rainha, com coroa real delicada e vestes nobres, estendendo a mão direita para tocar a ponta de um cetro de ouro que aparece entrando pela lateral da imagem (só o cetro, sem mostrar o rei)', 'confiança serena', 'vestido púrpura com detalhes dourados', 'Et 2:17; 5:1-2'),
    ('daniel', 'Daniel', 'inicial', 'um jovem nobre judeu segurando junto ao peito uma pequena tigela de legumes numa mão e um copo de água na outra, como quem escolhe com gentileza não comer a comida do rei', 'sorriso educado e decidido', 'túnica azul-clara de corte nobre, faixa branca', 'Dn 1:3-6,12'),
    ('daniel-meio', 'Daniel', 'mediano', 'Daniel adulto, de joelhos, mãos juntas em oração, olhando para cima, com o contorno de uma janela aberta logo atrás dele', 'paz e fidelidade', 'túnica azul e manto azul-marinho', 'Dn 6:10'),
    ('daniel-final', 'Daniel', 'final', 'Daniel mais velho, de barba grisalha, de pé e sereno, com dois leões grandes deitados e quietos aos seus pés, de olhos fechados como se descansassem', 'calma profunda, um leve sorriso', 'manto azul-marinho com borda dourada', 'Dn 6:22'),
    ('rute', 'Rute', 'inicial', 'uma jovem moabita abraçando com carinho a sogra idosa, Noemi, que aparece de perfil ao lado dela', 'decisão e ternura no olhar', 'túnica cor de trigo e véu creme; Noemi com manto cinza', 'Rt 1:14-16'),
    ('rute-meio', 'Rute', 'mediano', 'Rute segurando junto ao peito um feixe de espigas de cevada douradas', 'sorriso trabalhador e grato', 'túnica cor de trigo, lenço amarelado na cabeça', 'Rt 2:2,17'),
    ('rute-final', 'Rute', 'final', 'Rute sorrindo, segurando no colo o filho bebê, Obede, enrolado num pano claro', 'alegria e gratidão', 'vestido dourado-claro e manto creme', 'Rt 4:13,17'),
    ('sansao', 'Sansão', 'inicial', 'um menino de cabelo comprido, nunca cortado, solto até os ombros, alegre e forte para a idade, de braços na cintura', 'sorriso largo e travesso', 'túnica terracota', 'Jz 13:5,24'),
    ('sansao-meio', 'Sansão', 'mediano', 'Sansão jovem e muito forte, com o cabelo bem longo preso em sete tranças, de braços cruzados', 'sorriso confiante', 'túnica terracota sem mangas, cinto de couro', 'Jz 16:13,17'),
    ('sansao-final', 'Sansão', 'final', 'Sansão de cabelo longo, com as duas mãos apoiadas em duas colunas grossas de pedra, uma de cada lado, olhos fechados e rosto erguido, orando ao Senhor; sem pessoas ao redor e sem destruição', 'entrega e oração', 'túnica terracota gasta', 'Jz 16:28-29'),
    ('debora', 'Débora', 'inicial', 'uma mulher madura e sábia, profetisa e juíza, sentada, segurando um rolo de pergaminho no colo, com folhas de palmeira aparecendo atrás do ombro', 'olhar sábio e acolhedor', 'túnica verde-oliva e véu bege', 'Jz 4:4-5'),
    ('debora-meio', 'Débora', 'mediano', 'Débora de pé, apontando com o braço estendido para a frente, como quem chama alguém para seguir', 'firmeza e coragem', 'túnica verde-oliva, manto verde-escuro', 'Jz 4:6,14'),
    ('debora-final', 'Débora', 'final', 'Débora com os dois braços erguidos, cantando de alegria um cântico ao Senhor', 'alegria e gratidão, boca aberta cantando', 'túnica verde com detalhes dourados', 'Jz 5:1-3'),
    ('moises', 'Moisés', 'inicial', 'um homem adulto com cajado de pastor, descalço, olhando com espanto para um pequeno arbusto em chamas ao seu lado, que queima sem se consumir', 'espanto e reverência', 'túnica marrom-clara, manto de pastor marrom', 'Êx 3:1-5'),
    ('moises-meio', 'Moisés', 'mediano', 'Moisés com o cajado erguido na mão e o braço estendido para a frente, o vento forte soprando o manto e a barba', 'determinação e fé', 'manto marrom sobre túnica bege', 'Êx 14:16,21'),
    ('moises-final', 'Moisés', 'final', 'Moisés idoso de barba branca longa, segurando junto ao peito duas tábuas de pedra lisas, com o rosto resplandecendo de luz suave', 'serenidade e luz no rosto', 'manto branco-marfim e túnica marrom', 'Êx 34:29'),
    ('miria', 'Miriã', 'inicial', 'uma menina olhando atenta de longe, com a mão sobre os olhos, cuidando do irmão bebê que não aparece na imagem', 'atenção e cuidado', 'túnica rosa-antigo e lenço claro', 'Êx 2:3-4'),
    ('miria-meio', 'Miriã', 'mediano', 'a mesma menina falando com coragem, com uma mão no peito e a outra apontando para o lado, oferecendo ajuda', 'coragem e esperteza', 'túnica rosa-antigo', 'Êx 2:7-8'),
    ('miria-final', 'Miriã', 'final', 'Miriã adulta, profetisa, dançando e tocando um tamborim erguido acima da cabeça', 'alegria contagiante', 'túnica rosa e manto vinho esvoaçante', 'Êx 15:20-21'),
    ('gideao', 'Gideão', 'inicial', 'um homem jovem segurando um punhado de trigo, olhando para cima surpreso, como quem ouviu alguém chamar', 'surpresa e timidez', 'túnica verde-musgo e lenço na cabeça', 'Jz 6:11-12'),
    ('gideao-meio', 'Gideão', 'mediano', 'Gideão segurando com as duas mãos um velo de lã molhado, torcendo-o, com gotas de água caindo', 'admiração', 'túnica verde-musgo', 'Jz 6:37-38'),
    ('gideao-final', 'Gideão', 'final', 'Gideão tocando uma trombeta de chifre de carneiro com uma mão e erguendo uma tocha acesa com a outra; sem armas', 'coragem e confiança', 'túnica verde-oliva e manto marrom', 'Jz 7:16,20'),
    ('ana', 'Ana', 'inicial', 'uma mulher jovem orando em silêncio, olhando para cima com os olhos marejados e uma lágrima no rosto, a mão direita sobre o coração e a mão esquerda aberta com a palma para cima, os lábios entreabertos como quem fala baixinho no coração', 'tristeza com esperança', 'túnica verde-azulada e véu terracota com borda bordada dourada', '1Sm 1:10-13'),
    ('ana-meio', 'Ana', 'mediano', 'Ana cantando de alegria um cântico ao Senhor, sem bebê e sem outras pessoas: rosto erguido, olhos brilhando, boca aberta cantando, as duas mãos abertas juntas na frente do peito com as palmas para cima, como quem oferece louvor', 'alegria e gratidão', 'túnica verde-azulada e véu terracota com borda bordada dourada', '1Sm 2:1-2'),
    ('ana-final', 'Ana', 'final', 'Ana de mãos dadas com o menino Samuel, que veste uma pequena túnica; os dois de frente, ela levemente inclinada para ele', 'ternura e entrega', 'túnica verde-azulada e véu terracota com borda bordada dourada; Samuel de túnica branca', '1Sm 1:27-28; 2:19'),
]

# ─────────────────────────── CARTAS (pessoas da Bíblia) ───────────────────────────
# (arquivo, nome, cena detalhada, aparência sustentada pelo texto, cenário, referência)
CARTAS = [
    ('adao', 'Adão', 'cuidando com as mãos de uma planta no jardim, ao lado de um rio', 'homem adulto, vestido com uma túnica simples de pele', 'jardim exuberante com árvores frutíferas e um rio', 'Gn 2:8-15; 3:21'),
    ('eva', 'Eva', 'ao lado de uma grande árvore frutífera, olhar pensativo', 'mulher adulta, vestida com uma túnica simples de pele', 'jardim verde e luminoso', 'Gn 2:22; 3:20-21'),
    ('caim', 'Caim', 'segurando feixes de grãos como oferta', 'homem adulto, lavrador, com roupas de trabalho no campo', 'campo cultivado ao entardecer', 'Gn 4:2-3'),
    ('abel', 'Abel', 'trazendo nos braços um cordeiro como oferta, junto a um pequeno altar de pedras com fumaça subindo', 'jovem pastor de ovelhas', 'pasto com algumas ovelhas ao fundo', 'Gn 4:2,4'),
    ('sete', 'Sete', 'de pé diante da família reunida, em gesto de oração', 'homem adulto', 'campo aberto sob céu limpo', 'Gn 4:25-26'),
    ('enoque', 'Enoque', 'caminhando por uma trilha em direção a uma luz suave no horizonte, em paz', 'homem idoso de barba', 'trilha entre colinas ao amanhecer', 'Gn 5:22-24'),
    ('matusalem', 'Matusalém', 'sentado à porta de uma tenda, segurando um cajado', 'homem muito idoso, de barba longa e branca', 'entrada de tenda ao pôr do sol', 'Gn 5:27'),
    ('noe', 'Noé', 'diante de uma enorme arca de madeira em construção, enquanto animais se aproximam em pares', 'homem idoso de barba branca', 'campo aberto com a arca ao fundo e céu se fechando ao longe', 'Gn 6:14-22; 7:9'),
    ('sem', 'Sem', 'saindo da arca e olhando para o céu', 'homem adulto', 'montanhas ao fundo e um arco-íris no céu', 'Gn 8:4; 9:13,18'),
    ('ninrode', 'Ninrode', 'segurando um arco, de pé numa planície', 'homem forte, caçador', 'planície com as muralhas de uma cidade antiga ao longe', 'Gn 10:8-10'),
    ('tera', 'Terá', 'conduzindo uma caravana com camelos, saindo de uma cidade', 'homem idoso', 'cidade antiga às margens de um rio, ao fundo', 'Gn 11:31'),
    ('abraao', 'Abraão', 'do lado de fora da tenda, olhando para um céu repleto de estrelas', 'homem idoso de barba branca', 'deserto à noite com tenda iluminada', 'Gn 15:5; 24:1'),
    ('sara', 'Sara', 'à entrada de uma tenda, sorrindo, com um bebê nos braços', 'mulher idosa', 'entrada de tenda com luz da manhã', 'Gn 18:11; 21:2,6'),
    ('lo', 'Ló', 'no alto de um monte, olhando para uma planície verde e bem regada, com rebanhos', 'homem adulto', 'vale verde do Jordão ao fundo', 'Gn 13:10-11'),
    ('melquisedeque', 'Melquisedeque', 'oferecendo pão e um cálice de vinho com as duas mãos', 'rei e sacerdote, homem maduro, com vestes nobres e uma coroa simples', 'portal de uma cidade antiga de pedra', 'Gn 14:18'),
    ('agar', 'Agar', 'junto a uma fonte de água no deserto, olhando para cima com esperança, iluminada por uma luz suave', 'mulher jovem egípcia', 'deserto com uma fonte e poucas plantas', 'Gn 16:7,13'),
    ('ismael', 'Ismael', 'segurando um arco, com uma aljava nas costas', 'jovem arqueiro', 'deserto com dunas', 'Gn 21:20'),
    ('isaque', 'Isaque', 'subindo um monte com um feixe de lenha nas costas', 'rapaz', 'monte rochoso; um carneiro preso pelos chifres num arbusto aparece ao fundo', 'Gn 22:5-6,13'),
    ('abimeleque', 'Abimeleque', 'de pé junto a um poço, em gesto de acordo, com servos atrás', 'rei de uma cidade antiga, com vestes nobres', 'poço no deserto de Berseba', 'Gn 21:22-31'),
    ('rebeca', 'Rebeca', 'junto a um poço, com um cântaro no ombro, dando água a camelos', 'moça jovem', 'poço de pedra ao entardecer', 'Gn 24:15-20'),
    ('labao', 'Labão', 'de pé diante de grandes rebanhos, segurando uma pequena balança de pesar', 'homem de meia-idade, pastor rico', 'campos de Harã com ovelhas e cabras', 'Gn 29:15; 31:7'),
    ('esau', 'Esaú', 'voltando cansado do campo, diante de uma panela de ensopado de lentilhas', 'homem forte, ruivo e muito peludo, caçador', 'acampamento ao entardecer', 'Gn 25:25,27,29-30'),
    ('jaco', 'Jacó', 'dormindo com a cabeça sobre uma pedra, sonhando com uma escada que sobe da terra ao céu, com anjos de luz subindo e descendo', 'homem jovem, tranquilo', 'campo aberto à noite, escada luminosa no céu', 'Gn 25:27; 28:11-12'),
    ('lia', 'Lia', 'à porta de uma tenda, segurando um bebê', 'mulher jovem de olhar terno', 'tenda com luz suave da tarde', 'Gn 29:17,31-32'),
    ('raquel', 'Raquel', 'conduzindo as ovelhas do pai até um poço no campo', 'jovem pastora', 'campo com poço de pedra', 'Gn 29:9-10'),
    ('dina', 'Diná', 'caminhando calma por um campo florido perto de tendas', 'jovem filha de Jacó', 'campo florido com tendas ao fundo; cena tranquila, sem tensão', 'Gn 30:21; 34:1'),
    ('benjamim', 'Benjamim', 'olhando surpreso para uma taça de prata encontrada no alto de um saco de grãos', 'rapaz, o filho mais novo', 'interior de um armazém egípcio', 'Gn 44:12,20'),
    ('jose', 'José', 'num campo de trigo, vestindo uma túnica longa e especial, de mangas compridas, bem ornamentada', 'rapaz de dezessete anos', 'campo com feixes de trigo e céu estrelado ao fundo', 'Gn 37:2-3,7,9'),
    ('ruben', 'Rúben', 'junto a uma cisterna seca no deserto, estendendo a mão para dentro dela, preocupado', 'homem jovem, o primogênito', 'deserto de Dotã', 'Gn 37:21-22,29'),
    ('juda', 'Judá', 'de pé com a mão no peito, em gesto de se oferecer no lugar do irmão mais novo', 'homem maduro', 'salão de uma casa egípcia com colunas', 'Gn 44:18,33'),
    ('tamar', 'Tamar', 'segurando um selo com cordão numa mão e um cajado na outra', 'mulher jovem, com véu', 'caminho de terra entre colinas', 'Gn 38:18,25'),
    ('potifar', 'Potifar', 'de pé, com postura de autoridade, diante da própria casa', 'oficial egípcio, capitão da guarda, com trajes egípcios', 'casa nobre egípcia com colunas e palmeiras', 'Gn 39:1'),
    ('farao-jose', 'Faraó', 'sentado no trono, segurando um cetro', 'rei egípcio com trajes reais egípcios', 'salão com colunas pintadas; ao fundo, pinturas de sete espigas e sete vacas', 'Gn 41:1-7,40'),
    ('manasses', 'Manassés', 'brincando às margens do rio Nilo ao nascer do sol', 'menino', 'margem do Nilo com juncos e sol nascendo', 'Gn 41:51'),
    ('efraim', 'Efraim', 'num campo fértil e verdejante, segurando um ramo com frutos', 'menino', 'plantações às margens do Nilo', 'Gn 41:52'),
    ('simeao', 'Simeão', 'de pé num pátio egípcio, com correntes leves nos pulsos, olhar arrependido', 'homem adulto', 'pátio de pedra com guardas ao longe', 'Gn 42:21,24'),
    ('jo', 'Jó', 'sentado sobre cinzas, coberto com um manto simples, olhando firme para o céu', 'homem maduro de barba', 'céu de tempestade se abrindo em luz dourada', 'Jó 2:8; 38:1'),
    ('elifaz', 'Elifaz', 'sentado à noite, contando com gestos uma visão que teve', 'homem idoso e sábio', 'acampamento à noite sob as estrelas', 'Jó 2:11; 4:13-16'),
    ('bildade', 'Bildade', 'sentado no chão, falando com gestos firmes', 'homem idoso', 'chão de terra com outros amigos sentados em círculo, só contornos', 'Jó 2:11; 8:1'),
    ('zofar', 'Zofar', 'sentado no chão, apontando o dedo enquanto fala', 'homem de expressão severa', 'chão de terra ao entardecer', 'Jó 2:11; 11:1'),
    ('eliu', 'Eliú', 'de pé, falando com energia, com a mão erguida', 'homem jovem, o mais novo do grupo', 'nuvens de tempestade e relâmpagos ao longe', 'Jó 32:6; 37:1-5'),
    # ── Era 2: Moisés ──
    ('joquebede', 'Joquebede', 'colocando com cuidado um bebê num cesto de juncos à beira do rio, entre os juncos', 'mulher hebreia jovem, mãe carinhosa', 'margem do Nilo com juncos altos ao amanhecer', 'Êx 2:2-3'),
    ('filha-farao', 'Filha de Faraó', 'segurando nos braços um bebê que acabou de tirar de um cesto de juncos, com ternura', 'princesa egípcia com vestido de linho branco e joias simples', 'margem do Nilo com servas ao fundo', 'Êx 2:5-6,10'),
    ('moises', 'Moisés', 'descendo do monte com duas tábuas de pedra lisas nos braços, o rosto resplandecendo de luz suave', 'homem idoso de barba branca longa', 'encosta rochosa do monte Sinai com nuvens', 'Êx 34:29'),
    ('zipora', 'Zípora', 'à entrada de uma tenda, segurando um cântaro, com ovelhas ao lado', 'mulher jovem midianita, pastora', 'deserto de Midiã com um poço e ovelhas', 'Êx 2:16,21'),
    ('arao', 'Arão', 'segurando uma vara de madeira da qual brotam flores e amêndoas', 'homem idoso de barba, vestido de sumo sacerdote com peitoral de pedras coloridas e turbante', 'interior iluminado de uma tenda de tecido', 'Êx 28:1-4; Nm 17:8'),
    ('farao-exodo', 'Faraó', 'sentado no trono, de braços cruzados e olhar teimoso, com rãs pequenas no chão do salão', 'rei egípcio com coroa e trajes reais egípcios', 'salão egípcio com colunas pintadas', 'Êx 5:2; 8:2-6'),
    ('miria', 'Miriã', 'tocando um tamborim erguido e dançando de alegria, com mulheres dançando atrás', 'mulher madura, profetisa, véu claro e manto rosa', 'margem do mar ao sol, com ondas calmas', 'Êx 15:20-21'),
    ('jetro', 'Jetro', 'conversando com Moisés, apontando com a mão aberta como quem dá conselho', 'homem idoso e sábio, sacerdote de Midiã, de barba branca e turbante', 'entrada de tenda no deserto ao entardecer', 'Êx 18:13-24'),
    ('josue', 'Josué', 'de pé na entrada de uma tenda, esperando com atenção, segurando um cajado', 'homem jovem e forte, com túnica e cinto de couro', 'acampamento no deserto com a tenda do encontro', 'Êx 33:11'),
    ('bezalel', 'Bezalel', 'trabalhando com cuidado numa peça de ouro com ferramentas de artesão', 'homem adulto, artesão habilidoso, avental de couro', 'oficina simples com tecidos coloridos, madeira e metais', 'Êx 31:2-5'),
    ('nadabe', 'Nadabe e Abiú', 'segurando cada um um incensário com fumaça, de pé diante de uma tenda', 'dois jovens sacerdotes com túnicas brancas', 'entrada da tenda do encontro, com céu cinzento ao fundo; cena calma, sem fogo sobre pessoas', 'Lv 10:1'),
    ('eleazar', 'Eleazar', 'recebendo as vestes de sacerdote, com Moisés colocando-as sobre seus ombros', 'homem adulto, filho de Arão', 'alto de um monte com vista do deserto', 'Nm 20:25-28'),
    ('calebe', 'Calebe', 'ajudando a carregar numa vara, com outro homem, um cacho de uvas enorme', 'homem forte, de barba, olhar confiante', 'vale verde de Escol com videiras', 'Nm 13:23,30'),
    ('core', 'Corá', 'de pé, com a mão erguida, falando em tom de protesto diante de outros homens', 'homem adulto, levita, com túnica', 'acampamento no deserto; cena tensa, sem destruição', 'Nm 16:1-3'),
    ('balaao', 'Balaão', 'montado numa jumenta que vira a cabeça para ele e fala, Balaão espantado', 'homem de meia-idade, adivinho, com manto', 'caminho estreito entre vinhas e muros de pedra', 'Nm 22:23-28'),
    ('fineias', 'Fineias', 'de pé diante da tenda, sereno, com luz suave sobre ele', 'homem jovem, sacerdote, com túnica branca e cinto azul', 'acampamento no deserto ao entardecer; sem armas', 'Nm 25:11-13'),
    ('filhas-zelofeade', 'Filhas de Zelofeade', 'cinco irmãs de pé lado a lado, firmes e respeitosas, diante de um ancião', 'cinco moças jovens com véus de cores diferentes', 'entrada da tenda do encontro', 'Nm 27:1-7'),
]

# ─────────────────────────── SELOS (objetos e palavras-chave) ───────────────────────────
# (arquivo, nome, objeto detalhado, referência)
SELOS = [
    ('luz', 'Luz', 'um ponto de luz muito brilhante no centro, com raios dourados e brancos se abrindo em todas as direções, como uma explosão suave de luz', 'Gn 1:3-4'),
    ('arvore', 'Árvore da vida', 'uma árvore frondosa e cheia de frutos, de tronco forte e raízes visíveis, com folhas verdes brilhantes', 'Gn 2:9; 3:24'),
    ('arca', 'Arca', 'um grande barco de madeira em forma de caixa, com um telhado, uma porta na lateral e uma abertura no alto, flutuando sobre ondas calmas', 'Gn 6:14-16'),
    ('arcoiris', 'Arco nas nuvens', 'um arco-íris completo sobre nuvens brancas e fofas, com gotas de chuva brilhando', 'Gn 9:13-15'),
    ('estrelas', 'Estrelas', 'um grupo de estrelas douradas de vários tamanhos, brilhando, agrupadas de forma harmoniosa, sem lua e sem céu ao fundo', 'Gn 15:5'),
    ('carneiro', 'Carneiro', 'um carneiro de lã clara com chifres curvos presos num arbusto', 'Gn 22:13-14'),
    ('poco', 'Poço', 'um poço redondo de pedras com um cântaro de barro apoiado na borda e água brilhando lá dentro', 'Gn 24:11-20'),
    ('escada', 'Escada', 'uma escada de luz que sobe da terra até as nuvens, com pequenas figuras de anjos de luz subindo e descendo', 'Gn 28:12-15'),
    ('tunica', 'Túnica', 'uma túnica longa e especial, de mangas compridas, bem ornamentada, estendida como se estivesse pendurada', 'Gn 37:3'),
    ('espiga', 'Espigas', 'sete espigas de trigo cheias e douradas, amarradas em feixe', 'Gn 41:5-7,26'),
    ('ouro', 'Ouro provado', 'uma barra de ouro puro, brilhante e polida, refletindo luz', 'Jó 23:10'),
    ('redemoinho', 'Redemoinho', 'um redemoinho de vento e nuvens girando, com uma luz forte e serena no centro', 'Jó 38:1'),
    # ── Era 2: Moisés ──
    ('sarca', 'Sarça ardente', 'um pequeno arbusto do deserto envolto em chamas douradas, com os galhos e folhas inteiros, sem queimar', 'Êx 3:2'),
    ('pao', 'Pão sem fermento', 'um pão achatado e redondo, sem fermento, com marcas de forno, sobre um pano', 'Êx 12:8,15'),
    ('coluna', 'Coluna de nuvem e fogo', 'uma coluna alta de nuvem branca que se torna fogo dourado na parte de baixo', 'Êx 13:21-22'),
    ('cajado', 'Cajado erguido', 'um cajado de pastor de madeira, em pé, com ondas do mar se abrindo dos dois lados', 'Êx 14:16,21'),
    ('mana', 'Maná', 'pequenos grãos brancos e redondos espalhados como geada sobre a areia, com brilho suave', 'Êx 16:14,31'),
    ('arcaalianca', 'Arca da aliança', 'uma caixa retangular de madeira coberta de ouro, com dois querubins de ouro de asas abertas sobre a tampa e varas de transporte nas laterais', 'Êx 25:10-22'),
    ('tabuas', 'Tábuas da Lei', 'duas tábuas de pedra lisas, arredondadas no alto, lado a lado, sem letras', 'Êx 31:18; 34:1'),
    ('trombetas', 'Trombetas de prata', 'duas trombetas longas e retas de prata batida, cruzadas', 'Nm 10:1-2'),
    ('uvas', 'Cacho de Escol', 'um cacho de uvas enorme pendurado numa vara de madeira', 'Nm 13:23'),
    ('vara', 'Vara que floresceu', 'uma vara de madeira com brotos, flores brancas e amêndoas', 'Nm 17:8'),
    ('serpente', 'Serpente de bronze', 'uma serpente de bronze enrolada no alto de uma haste de madeira, com aparência serena, não assustadora', 'Nm 21:8-9'),
    ('nebo', 'Monte Nebo', 'um monte com o cume iluminado e, ao longe, um vale verde com um rio', 'Dt 34:1-4'),
]


def bloco(arq, titulo, ref, texto):
    return f"### `{arq}` — {titulo}\nConferir: {ref}\n\n```\n{texto}\n```\n"


def prompt_avatar(a):
    arq, nome, momento, cena, expr, cores, ref = a
    return (f"Crie uma {ESTILO}. Avatar do personagem bíblico {nome} ({momento} da jornada). "
            f"PERSONAGEM: {cena}. EXPRESSÃO: {expr}. ROUPA E CORES: {cores}; {TRAJES}. "
            "COMPOSIÇÃO: retrato próximo, só do peito para cima (busto), personagem centralizado e de frente; a cabeça é grande, "
            "ocupando cerca de 40% da altura da imagem; braços e objetos ficam junto ao corpo, nunca abertos nem perto das bordas; "
            "pensado para ser recortado em círculo e reconhecido mesmo bem pequeno. "
            "FUNDO: branco liso e puro (#FFFFFF), sem cenário, sem chão, sem sombra projetada e sem degradê. "
            f"O mesmo traço e a mesma paleta suave usados para todos os personagens da série. "
            f"EVITE: {EVITE}. FORMATO: quadrado 1:1, alta resolução.")


def prompt_carta(c):
    arq, nome, cena, aparencia, cenario, ref = c
    return (f"Crie uma {ESTILO}, para a arte de uma carta colecionável. PERSONAGEM: {nome}, {aparencia}, {cena}. "
            f"{TRAJES.capitalize()}. CENÁRIO: {cenario}, com profundidade e luz quente dourada. "
            "COMPOSIÇÃO: uma figura central, da cintura para cima ou de corpo inteiro, bem enquadrada, com o rosto no terço superior; "
            "cena completa, com fundo ilustrado. Deus nunca aparece como figura humana; quando houver presença divina, só luz. "
            f"EVITE: {EVITE}. FORMATO: quadrado 1:1, alta resolução.")


def prompt_selo(s):
    arq, nome, objeto, ref = s
    return (f"Crie uma {ESTILO}, como um ícone-emblema para um selo colecionável chamado \"{nome}\". "
            f"OBJETO: {objeto}. COMPOSIÇÃO: só o objeto, centralizado, ocupando cerca de 75% da imagem, "
            "forma clara e reconhecível mesmo em tamanho pequeno, sem pessoas (a não ser que estejam descritas acima). "
            "CORES: vivas e quentes, com brilho dourado suave. FUNDO: branco liso e puro (#FFFFFF), sem moldura e sem círculo "
            f"(o app coloca o objeto sobre uma medalha dourada). EVITE: {EVITE}. FORMATO: quadrado 1:1, alta resolução.")


CABECALHO = """# {titulo} — A Jornada

{intro}

**Como usar:** copie um bloco inteiro e cole no Gemini. Cada prompt já traz o estilo, a composição e o fundo.
Salve a imagem com o nome exato do título (ex.: `{exemplo}`) na pasta **Projetos/A_Jornada/01_Imagens/{pasta}** do Drive.
Gere todas na mesma conversa do Gemini para manter o traço igual. **Conferir** mostra onde a cena está no texto bíblico.

---

"""


def escrever(nome_arq, titulo, intro, exemplo, pasta, itens, fn, rotulo):
    out = CABECALHO.format(titulo=titulo, intro=intro, exemplo=exemplo, pasta=pasta)
    for i in itens:
        out += bloco(i[0] + '.png', rotulo(i), i[-1], fn(i)) + "\n"
    open(nome_arq, 'w', encoding='utf-8').write(out)
    print(nome_arq, len(itens))


if __name__ == '__main__':
    escrever('PROMPTS-AVATARES.md', 'Prompts dos personagens do jogador',
             'Toda jornada começa no pó da terra (Gn 2:7), desenhado pelo próprio app. Ao concluir a primeira sessão, '
             'o viajante escolhe um destes 10 personagens. Cada um tem três imagens: **inicial** (níveis 1–7), '
             '**mediana** (`-meio`, níveis 8–19) e **final** (`-final`, nível 20+). O app desenha atrás o cenário '
             'de cada estágio, por isso o fundo é branco liso.', 'davi-meio.png', 'Avatares',
             AVATARES, prompt_avatar, lambda a: f"{a[1]} ({a[2]})")
    po = (f"Crie uma {ESTILO}. Um pequeno monte de barro avermelhado e macio, sem rosto e sem forma humana, "
          "com pequenas partículas de pó ao redor e um brilho suave e dourado descendo sobre ele, como se estivesse "
          "prestes a receber vida. COMPOSIÇÃO: o monte centralizado na parte de baixo, ocupando metade da largura. "
          f"FUNDO: branco liso e puro (#FFFFFF), sem chão e sem sombra. EVITE: {EVITE}. FORMATO: quadrado 1:1, alta resolução.")
    with open('PROMPTS-AVATARES.md', 'a', encoding='utf-8') as f:
        f.write("---\n\n## Opcional: o começo da jornada\n\n" + bloco('po.png', 'Pó da terra (todos começam assim)', 'Gn 2:7', po))
    escrever('PROMPTS-CARTAS.md', 'Prompts das cartas (pessoas da Bíblia)',
             'Uma carta para cada pessoa que aparece nas sessões (eras 1 e 2). A arte é a cena completa, com fundo ilustrado.',
             'noe.png', 'Cartas', CARTAS, prompt_carta, lambda c: c[1])
    escrever('PROMPTS-SELOS.md', 'Prompts dos Selos da Palavra',
             'Os selos são objetos e palavras-chave do texto. A imagem é só o objeto, em fundo branco; '
             'o app coloca sobre uma medalha dourada.', 'luz.png', 'Selos', SELOS, prompt_selo, lambda s: s[1])
