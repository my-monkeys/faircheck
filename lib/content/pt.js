// Conteúdo em português (pt-BR) — espelha a estrutura de en.js exatamente
// (mesmas chaves, mesmos {tokens}); apenas os VALORES das strings são traduzidos.

const C = {
  ui: {
    nav: { casinos: 'Cassinos', games: 'Jogos', how: 'Como funciona' },
    tagline: 'provably fair',
    footer: {
      about: 'Um verificador independente e aberto para jogos de cassino provably fair. Nós recalculamos os resultados — não operamos, hospedamos nem aceitamos apostas.',
      verify: 'Verificar', learn: 'Aprender',
      lVerifier: 'Verificador universal', lByGame: 'Por jogo', lByCasino: 'Por cassino', lHow: 'Como funciona o provably fair',
      legal: '{name} é uma ferramenta informativa, não um operador de apostas. Não tem qualquer afiliação, endosso ou patrocínio de nenhum cassino citado neste site, e não direciona nem promove qualquer operador. Nomes e mecânicas de jogos são referenciados apenas para fins de verificação e educação. Apostas envolvem risco financeiro e têm restrição de idade (18+/21+ conforme sua jurisdição); algumas formas de apostas online são ilegais em certos países — confira a legislação local.',
      network: 'Um projeto {link} · calculado inteiramente no seu navegador.',
    },
    verifier: {
      form: 'Formulário de verificação', loadExample: 'carregar exemplo',
      serverSeed: 'Server seed — revelada / sem hash',
      serverSeedPh: 'ex.: 3f1a9c… (a seed que o cassino mostra DEPOIS de você rotacionar as seeds)',
      clientSeed: 'Client seed', clientSeedPh: 'sua client seed',
      nonce: 'Nonce', noncePh: 'número da aposta, ex.: 1',
      optional: 'Opcional · verificação do hash de pré-compromisso',
      hashDesc: 'Cole o hash da server seed que o cassino publicou antes da aposta. O Faircheck confirma que o SHA-256 da sua seed revelada bate com ele — prova de que a seed foi travada de antemão.',
      hashPh: 'hash da server seed (SHA-256 hex de 64 caracteres)',
      errServer: 'Cole a server seed revelada (sem hash).',
      errClient: 'Cole a client seed.',
      errNonce: 'O nonce deve ser um número inteiro ≥ 0.',
      errFail: 'Falha no cálculo.',
      verify: 'Verificar resultado de {game}', computing: 'Calculando…',
      privacy: '100% no seu navegador · as seeds nunca saem desta página',
      hashOk: '✓ Hash verificado', hashBad: '✗ Hash não confere',
      expected: 'esperado', got: 'sha256()',
      copyLink: '⧉ copiar link de verificação', copied: '✓ link copiado',
      showRaw: 'Mostrar material criptográfico bruto',
      hmacMsg: 'msg HMAC nº {n}', bytesUsed: 'bytes usados', floats: 'floats',
    },
  },

  home: {
    metaTitle: 'Faircheck — Verificador Provably Fair de Cassinos Cripto',
    metaDesc: 'Cole sua server seed, client seed e nonce e recalcule você mesmo qualquer resultado de cassino cripto — Dice, Limbo, Mines, Plinko, Roleta, Keno, Wheel e Hi-Lo. 100% no navegador, sem login.',
    kicker: 'Independente · aberto · no lado do cliente',
    h1a: 'Verifique seu resultado de cassino.', h1b: 'Prove que foi justo.',
    lead: 'Cole sua server seed, client seed e nonce. O Faircheck recalcula o resultado exato com a mesma matemática HMAC-SHA256 que o cassino usou — assim você confere Dice, Limbo, Mines, Plinko, Roleta, Keno, Wheel e Hi-Lo por conta própria. Nada sai do seu navegador.',
    chips: ['{n}+ cassinos', '{m} jogos', 'sem login', 'sem registro de seeds'],
    howKicker: 'O método', howH2: 'Três entradas, um resultado comprovável',
    steps: [
      ['Compromisso', 'Antes da aposta, o cassino mostra o hash SHA-256 de uma server seed secreta. A partir daí ela está travada — não pode mudar.'],
      ['Aposta', 'Seu resultado é HMAC-SHA256(server seed, `client seed:nonce:round`), convertido em um float e mapeado para o jogo. Você controla a client seed.'],
      ['Revelar e verificar', 'Rotacione suas seeds para revelar a server seed. O Faircheck a passa por hash para conferir com o compromisso e recalcula cada rodada.'],
    ],
    fullExplainer: 'Explicação completa →',
    gamesKicker: 'Por jogo', gamesH2: 'Escolha um jogo para verificar', allGames: 'Todos os jogos →',
    casinosKicker: 'Por cassino', casinosH2: '{n} cassinos, um único algoritmo', allCasinos: 'Todos os cassinos →',
    faqKicker: 'FAQ', faqH2: 'Perguntas',
    faq: [
      ['O que é um verificador provably fair?', 'Uma ferramenta que recalcula o resultado de um jogo de cassino a partir de suas entradas públicas — a server seed, sua client seed e o nonce — para você confirmar que o resultado foi definido antes da aposta e nunca alterado. O Faircheck faz isso inteiramente no seu navegador.'],
      ['Preciso confiar no Faircheck?', 'Não. A verificação é pura matemática (HMAC-SHA256) rodando localmente no seu dispositivo. Suas seeds nunca são enviadas a lugar nenhum. Você pode ler o algoritmo aberto e até rodar o mesmo cálculo por conta própria.'],
      ['Quais cassinos ele cobre?', 'Todo cassino que usa o “método Stake” — o esquema de seed/nonce com HMAC-SHA256 usado por {n}+ cassinos cripto, incluindo Stake, BC.Game, Roobet, Shuffle e Rollbit. A matemática é idêntica; só mudam os menus de rotação de seeds.'],
      ['Meu resultado não bate — o cassino está trapaceando?', 'Geralmente é uma divergência de seed ou nonce: confira se você rotacionou seu par de seeds para que a server seed esteja revelada (sem hash), e se o nonce é exatamente o número da aposta. Em Limbo/Wheel, o house edge ou a contagem de segmentos do operador também precisam bater. Uma divergência real com entradas corretas é o sinal de alerta que vale uma captura de tela.'],
    ],
  },

  how: {
    metaTitle: 'Como Funciona o Provably Fair — Server Seed, Client Seed e Nonce',
    metaDesc: 'Um guia direto sobre apostas provably fair: server seeds, client seeds, nonces, HMAC-SHA256 e como verificar qualquer resultado por conta própria.',
    kicker: 'O método', h1: 'Como funciona o provably fair',
    lead: 'O provably fair (justiça comprovável) permite checar, com criptografia em vez de confiança, que um resultado foi decidido antes de você apostar e nunca adulterado depois. Aqui está a ideia toda em cinco minutos.',
    s1h: '1. O compromisso',
    s1p: 'Antes de qualquer aposta, o cassino gera uma server seed secreta e mostra apenas o hash SHA-256 dela. Um hash é uma impressão digital de mão única: você não consegue revertê-lo para achar a seed, mas, uma vez revelada a seed, qualquer um pode passá-la por hash e confirmar que ela confere. Ao publicar o hash primeiro, o cassino se trava — não pode mais escolher uma server seed diferente depois de ver como você apostou.',
    s2h: '2. Sua entrada',
    s2p: 'Você fornece uma client seed (que pode mudar a qualquer momento) e cada aposta carrega um nonce incremental. Como você influencia a client seed, o cassino não pode ter pré-calculado um resultado que só ele controla.',
    s3h: '3. O sorteio', s3p: 'O resultado é produzido de forma determinística:',
    s3p2: 'Esses bytes são fatiados em grupos de 4 bytes e convertidos em floats no intervalo [0, 1). Cada jogo então mapeia os floats para um resultado — uma rolagem de dados, um multiplicador de crash, um conjunto de minas, e assim por diante. Mesmas entradas, mesma saída, sempre.',
    s4h: '4. A revelação',
    s4p: 'Quando você rotaciona seu par de seeds, o cassino revela a server seed antiga em texto puro. Agora você pode fazer duas checagens: passar a seed revelada por hash e confirmar que ela é igual ao compromisso do passo 1, e recalcular cada resultado para confirmar que o cassino os reportou com honestidade. É exatamente isso que o verificador Faircheck faz — localmente, no seu navegador, para que suas seeds nunca saiam do seu dispositivo.',
    s5h: 'Por que é igual na maioria dos cassinos',
    s5p: 'A Stake publicou esse esquema e ele virou o padrão de fato. Os {n}+ cassinos que o Faircheck suporta usam o mesmo método de byte-para-float com HMAC-SHA256; só os menus para rotacionar seeds diferem. É por isso que um único verificador consegue checar todos eles.',
    faqH2: 'FAQ',
    faq: [
      ['Provably fair é a mesma coisa que “justo”?', 'Não. Ele prova que o cassino não podia mudar o resultado depois que você apostou — mas não muda o house edge. Um jogo provably fair ainda pode ser desenhado para favorecer a casa; ele só não pode mentir sobre o resultado que gerou.'],
      ['O cassino ainda consegue trapacear?', 'No resultado em si, não, desde que ele se comprometa com o hash da server seed antes da aposta e você verifique depois de revelá-la. A confiança que resta é que o compromisso que você viu foi de fato mostrado antes do jogo — por isso vale capturar uma tela do hash da seed.'],
      ['O que é um nonce?', 'Um contador que aumenta de um em um a cada aposta feita com o mesmo par de server/client seed. Ele garante que cada aposta produza um resultado diferente a partir das mesmas seeds.'],
    ],
    ctaH: 'Pronto para conferir uma aposta?', ctaP: 'Abra o verificador universal e cole suas seeds.', ctaBtn: 'Abrir o verificador',
    linkVerifier: 'o verificador Faircheck',
  },

  gamesIndex: {
    metaTitle: 'Jogos Provably Fair Que Verificamos — Dice, Limbo, Mines e Mais',
    metaDesc: 'Verifique Dice, Limbo, Mines, Plinko, Roleta, Keno, Wheel e Hi-Lo. Cada jogo explicado, com um verificador gratuito no navegador e a fórmula exata.',
    kicker: 'Por jogo', h1: 'Jogos provably fair',
    lead: 'Cada jogo transforma o mesmo fluxo de seeds HMAC-SHA256 em um resultado de um jeito diferente. Escolha um para ler como ele funciona e verificar um resultado em qualquer um dos {n} cassinos suportados.',
  },

  casinosIndex: {
    metaTitle: 'Cassinos Cripto Que Verificamos — Stake, BC.Game, Roobet e Mais',
    metaDesc: 'Verificação provably fair para {n}+ cassinos cripto — Stake, BC.Game, Roobet, Shuffle, Rollbit e mais. Recalcule qualquer resultado dos jogos originais no seu navegador.',
    kicker: 'Por cassino', h1: 'Cassinos que verificamos',
    lead: 'Estes {n} cassinos cripto rodam o mesmo esquema provably fair do “método Stake” com HMAC-SHA256, então o Faircheck reproduz seus {m} originais a partir do par de seeds e do nonce que você já tem.',
    gamesLine: '{n} jogos · seed/nonce',
  },

  gamePage: {
    breadcrumb: 'Jogos',
    h1: 'Verificar {game}',
    algoKicker: 'Como {game} é gerado', algoH2: 'O algoritmo',
    faqH2: 'FAQ',
    perCasinoKicker: 'Por cassino', perCasinoH2: 'Verificar {game} no seu cassino',
    perCasinoDesc: 'A matemática é a mesma em todo lugar, mas cada página é ajustada para como aquele cassino revela suas seeds.',
    otherGames: 'Outros jogos',
    metaTitle: 'Verificar {game} — Checador Provably Fair',
    metaDesc: 'Verificador provably fair de {game} gratuito. {intro}',
  },

  casinoPage: {
    breadcrumb: 'Cassinos',
    h1: 'Verificador {casino}',
    engineLine: 'Motor: {engine} · fundado em {year} · {n} jogos verificáveis',
    howKicker: 'Como verificar na {casino}', howH2: 'Revele sua seed e depois recalcule',
    howP1: 'Abra o painel de provably fair ou de fairness na sua conta {casino} e rotacione seu par de seeds. Isso revela a server seed anterior em texto puro e mostra o hash SHA-256 com o qual ela foi comprometida antes das suas apostas.',
    howP2: 'Cole essa server seed revelada, sua client seed e o nonce da aposta no formulário acima. {engine}',
    howP3: 'O Faircheck passa sua seed revelada por hash para confirmar que ela bate com o compromisso de pré-aposta e então reproduz o resultado exato — tudo localmente, para que suas seeds nunca saiam da página.',
    gamesKicker: 'Jogos da {casino}', gamesH2: 'Verificar um jogo específico',
    otherCasinos: 'Outros cassinos',
    metaTitle: 'Verificador Provably Fair {casino}',
    metaDesc: 'Verifique de forma independente os resultados da {casino}. Recalcule Dice, Limbo, Mines e mais a partir da sua server seed, client seed e nonce — grátis, no seu navegador.',
  },

  casinoGamePage: {
    h1: 'Verificador {casino} {game}',
    lead: 'Confira de forma independente qualquer aposta de {game} na {casino}. {intro}',
    stepKicker: 'Passo a passo na {casino}', stepH2: 'Como verificar {game} na {casino}',
    steps: [
      ['Revele a seed.', 'Abra o painel provably fair da {casino} e rotacione seu par de seeds — isso revela a server seed anterior e mostra o hash SHA-256 com o qual ela foi comprometida antes de você apostar.'],
      ['Encontre o nonce.', 'Cada aposta em um par de seeds tem um nonce incremental. Use o nonce exato da rodada de {game} que você quer conferir.'],
      ['Cole e verifique.', 'Coloque a server seed, a client seed e o nonce no formulário acima. O Faircheck recalcula o {label} e confirma que o hash da seed confere.'],
    ],
    formulaH2: 'A fórmula de {game}',
    faqH2: 'FAQ de verificação de {game}',
    moreGames: 'Mais jogos da {casino}', gameOnOthers: '{game} em outros cassinos',
    metaTitle: 'Verificador {casino} {game} — Provably Fair',
    metaDesc: 'Verifique você mesmo os resultados de {game} na {casino}. Recalcule o {label} a partir da sua server seed, client seed e nonce com a matemática exata HMAC-SHA256. Grátis, no navegador, sem login.',
  },

  notFound: {
    metaTitle: 'Não encontrado',
    kicker: '404', h1: 'Nada para verificar aqui', lead: 'Essa página não existe. Volte para o verificador.',
    cta1: 'Verificador universal', cta2: 'Ver cassinos',
  },

  // Resumo do motor do método Stake, reutilizado em várias páginas.
  engineSummary: 'Bytes de HMAC-SHA256(serverSeed, `clientSeed:nonce:round`), convertidos em floats e mapeados por jogo. A server seed é comprometida como um hash SHA-256 antes da aposta e revelada quando você rotaciona as seeds.',

  // Conteúdo localizado por jogo. `name` + `resultLabel` são strings de exibição; `slug` e
  // `formula` ficam em lib/games-meta.js (neutros em relação ao idioma).
  games: {
    dice: {
      name: 'Dice (Dados)', resultLabel: 'Resultado', tagline: 'A rolagem de 0.00–100.00, recalculada a partir das suas seeds.',
      intro: 'Dice é o jogo provably fair mais simples: um único float gera uma rolagem entre 0.00 e 100.00. O Faircheck regenera esse float exato a partir da sua server seed, client seed e nonce, para você confirmar que a rolagem que o cassino mostrou era a única que ele poderia ter produzido.',
      howItWorks: [
        'Um único float de 4 bytes é extraído do fluxo de bytes HMAC-SHA256 com chave na sua server seed.',
        'O float (um número em [0, 1)) é multiplicado por 10001 e arredondado para baixo, depois dividido por 100 para dar uma rolagem com duas casas decimais entre 0.00 e 100.00.',
        'Como a server seed foi comprometida como um hash SHA-256 antes da aposta, o operador não podia mudá-la depois de ver sua client seed ou nonce.',
      ],
      faq: [
        ['Por que 10001 e não 10000?', 'Multiplicar por 10001 faz com que toda rolagem de 0.00 a 100.00, inclusive, seja igualmente provável depois do arredondamento para baixo — usar 10000 tornaria o 100.00 inalcançável.'],
        ['Minha rolagem não bate. E agora?', 'Confira o nonce (ele aumenta de um em um a cada aposta) e se você colou a server seed SEM HASH que o cassino revelou depois de rotacionar seu par de seeds. Um único caractere errado muda tudo.'],
      ],
    },
    limbo: {
      name: 'Limbo', resultLabel: 'Multiplicador', tagline: 'O multiplicador-alvo estilo crash, com o house edge exposto.',
      intro: 'Limbo transforma um float em um multiplicador-alvo. Diferente do dice, o resultado depende do house edge do operador, então o Faircheck o expõe como uma entrada em vez de escondê-lo — defina-o conforme o valor do seu cassino (1% é o padrão) e o multiplicador fica totalmente reproduzível.',
      howItWorks: [
        'Um float é extraído do fluxo HMAC-SHA256, exatamente como no dice.',
        'O float é convertido em um inteiro grande, invertido e escalado por (1 − house edge) para produzir o ponto de crash.',
        'O resultado é arredondado para baixo a duas casas decimais e limitado a um mínimo de 1.00×.',
      ],
      faq: [
        ['Por que preciso informar um house edge?', 'A fórmula do multiplicador embute a margem do operador. A maioria dos cassinos do método Stake usa 1% (0.01); uma margem diferente desloca todo multiplicador, então ela precisa bater com a do seu cassino.'],
        ['Limbo é a mesma coisa que Crash?', 'A matemática é bem parecida — ambos derivam um multiplicador de um único float — mas o Crash arredonda e anima de forma diferente em cada operador. Use o verificador de Limbo para o Limbo estilo Stake.'],
      ],
      note: 'Atenção: o Limbo depende de um house edge específico do operador. Se seu resultado estiver errado por um fator constante, ajuste-o no formulário para bater com o que a {casino} usou.',
    },
    roulette: {
      name: 'Roleta', resultLabel: 'Casa', tagline: 'A casa europeia de zero único, 0–36.',
      intro: 'A roleta provably fair mapeia um float nas 37 casas de uma roleta europeia de zero único. O Faircheck reproduz a casa vencedora para você confirmar que o giro foi fixado pelas seeds, não pela casa.',
      howItWorks: [
        'Um único float em [0, 1) é gerado a partir das suas seeds.',
        'Ele é multiplicado por 37 e arredondado para baixo para cair em uma casa de 0 a 36.',
        'Vermelho/preto e par/ímpar simplesmente decorrem desse número de casa no layout padrão da roleta.',
      ],
      faq: [
        ['Roleta europeia ou americana?', 'O verificador do método Stake usa a roleta europeia de zero único (0–36). A roleta americana de zero duplo é rara nos jogos originais de cassinos cripto.'],
      ],
    },
    plinko: {
      name: 'Plinko', resultLabel: 'Casa final', tagline: 'O caminho esquerda/direita da bolinha e a casa final.',
      intro: 'Plinko solta uma bolinha por um triângulo de pinos. Cada linha usa um float para decidir esquerda ou direita. O Faircheck reconstrói o caminho completo e a casa em que a bolinha para, para qualquer contagem de linhas de 8 a 16.',
      howItWorks: [
        'Um float é extraído por linha (de 8 a 16 floats no total, dependendo do nível de risco).',
        'Um float abaixo de 0.5 manda a bolinha para a esquerda; caso contrário, para a direita.',
        'A casa final é o número de movimentos para a direita — esse índice seleciona o multiplicador de pagamento no tabuleiro.',
      ],
      faq: [
        ['Quantas linhas devo escolher?', 'Depende do tabuleiro que você jogou — as linhas da Stake vão de 8 (baixo) a 16 (alto). O caminho só bate se a contagem de linhas bater com a da sua aposta.'],
      ],
    },
    mines: {
      name: 'Mines', resultLabel: 'Minas', tagline: 'Quais das 25 casas eram minas.',
      intro: 'Mines esconde bombas em uma grade 5×5. As posições das minas são extraídas das suas seeds antes de você clicar em qualquer coisa. O Faircheck revela exatamente quais casas (0–24) tinham minas, para você confirmar que nada se moveu enquanto você jogava.',
      howItWorks: [
        'Um float é extraído por mina a partir do fluxo HMAC-SHA256.',
        'Cada float escolhe uma casa entre as casas sem mina restantes (um embaralha-e-seleciona), garantindo posições distintas.',
        'O conjunto completo de minas é fixado no momento da aposta — clicar em uma casa segura nunca realoca uma mina.',
      ],
      faq: [
        ['Como as casas são numeradas?', 'Da esquerda para a direita, de cima para baixo: a casa superior esquerda é 0, a inferior direita é 24.'],
      ],
    },
    keno: {
      name: 'Keno', resultLabel: 'Números sorteados', tagline: 'Os 10 números sorteados de 40.',
      intro: 'Keno sorteia dez números de um campo de quarenta. O Faircheck reproduz o sorteio exato a partir das suas seeds para você conferir os números contra os que escolheu.',
      howItWorks: [
        'Dez floats são extraídos do fluxo HMAC-SHA256.',
        'Cada float seleciona uma casa do conjunto restante de quarenta, produzindo dez números distintos.',
        'O sorteio é idêntico para todos que tenham o mesmo par de seeds e nonce.',
      ],
      faq: [
        ['Numeração?', 'As casas são numeradas de 1 a 40. O Faircheck as retorna ordenadas para facilitar a comparação.'],
      ],
    },
    wheel: {
      name: 'Wheel (Roda)', resultLabel: 'Segmento', tagline: 'O segmento vencedor da roda.',
      intro: 'Wheel gira até um de N segmentos iguais. O Faircheck mapeia seu float na roda que você realmente jogou — defina a contagem de segmentos e o índice vencedor fica reproduzível.',
      howItWorks: [
        'Um único float em [0, 1) é gerado.',
        'Ele é multiplicado pelo número de segmentos e arredondado para baixo para escolher o índice vencedor.',
        'Os níveis de risco mudam quantos segmentos e quais multiplicadores ficam na roda, então a contagem de segmentos precisa bater com a da sua aposta.',
      ],
      faq: [
        ['Por que definir a contagem de segmentos?', 'Níveis de risco diferentes usam números diferentes de segmentos. O float é o mesmo; só o mapeamento muda.'],
      ],
      note: 'Atenção: o Wheel depende de uma contagem de segmentos específica do operador. Se seu resultado estiver errado, defina a contagem de segmentos no formulário para bater com o que a {casino} usou.',
    },
    hilo: {
      name: 'Hi-Lo', resultLabel: 'Carta', tagline: 'A carta sorteada de um baralho de 52 cartas.',
      intro: 'Hi-Lo pergunta se a próxima carta é mais alta ou mais baixa. Cada carta é um único float sobre um baralho de 52 cartas. O Faircheck revela a carta exata para você verificar a sequência em que apostou.',
      howItWorks: [
        'Um float por carta é extraído do fluxo HMAC-SHA256.',
        'O float é multiplicado por 52 e arredondado para baixo para um índice de 0 a 51.',
        'O índice mapeia para um valor (A→K) e um naipe (♦♣♥♠) na ordenação padrão da Stake.',
      ],
      faq: [
        ['Qual a ordem das cartas?', 'Os valores vão de Ás, 2…10, Valete, Dama, Rei; os naipes vão de ouros, paus, copas, espadas — a ordenação que os jogos do método Stake usam.'],
      ],
    },
  },

  // Descrição localizada por cassino. slug/name/year/games ficam em lib/casinos.js.
  casinos: {
    stake: 'O criador do moderno modelo de seed/nonce; sua especificação aberta de provably fair é a que a maioria dos outros cassinos copiou ao pé da letra.',
    'stake-us': 'O site social-casino irmão da Stake nos EUA, rodando os mesmos jogos originais provably fair e a mesma verificação HMAC-SHA256.',
    'bc-game': 'Um grande cassino cripto cujos jogos originais usam o mesmo esquema de server seed, client seed e nonce.',
    shuffle: 'Um cassino cripto mais novo construído em torno de originais estilo Stake com verificação padrão por par de seeds.',
    rollbit: 'Cassino cripto e plataforma de trading; seus originais de dice, plinko e limbo seguem o método HMAC-SHA256.',
    roobet: 'Cassino cripto popular cujos jogos originais expõem uma server seed rotacionável e um nonce incremental.',
    gamdom: 'Um dos cassinos cripto mais antigos, com originais provably fair verificáveis a partir do par de seeds revelado.',
    trustdice: 'Cassino cripto focado em dice, com um conjunto completo de originais provably fair no modelo padrão.',
    'chips-gg': 'Cassino social cripto que oferece originais estilo Stake e justiça comprovável por par de seeds.',
    duelbits: 'Cassino cripto e casa de esports; seus originais se verificam pelo esquema de seed/nonce com HMAC-SHA256.',
    rainbet: 'Cassino cripto moderno com originais provably fair e um fluxo de verificação público.',
    'wild-io': 'Cassino cripto cujos originais expõem server seed, client seed e nonce para checagens independentes.',
    metaspins: 'Cassino cripto com originais estilo Stake verificáveis assim que a server seed é revelada.',
    jackbit: 'Cassino cripto e casa de apostas que oferece originais provably fair no modelo de seed padrão.',
    flush: 'Cassino cripto com originais provably fair em HMAC-SHA256 e seeds rotacionáveis.',
    'bets-io': 'Cassino cripto cujos jogos internos publicam o par de seeds e o nonce para verificação.',
    '500-casino': 'Cassino cripto de longa data (antigo CSGO500) com originais provably fair no modelo de seed/nonce.',
    betfury: 'Cassino cripto com uma grande biblioteca de originais verificáveis a partir das server e client seeds.',
    nanogames: 'Cassino cripto com originais rápidos e justiça comprovável padrão em HMAC-SHA256.',
    empire: 'Cassino cripto e de skins cujos originais seguem o esquema provably fair por par de seeds.',
    csgoroll: 'Site baseado em skins com originais provably fair que você pode recalcular a partir das seeds reveladas.',
    clash: 'Site de caixas e originais que expõe server seed, client seed e nonce para verificação.',
    primedice: 'O clássico site de dice irmão da Stake — o jogo que popularizou a justiça comprovável por seed/nonce.',
    bitsler: 'Veterano cassino cripto de dice com dice, roleta e limbo provably fair.',
    windice: 'Cassino cripto de dice com originais provably fair no modelo padrão.',
    luckybird: 'Cassino cripto social com originais estilo Stake e pares de seeds rotacionáveis.',
    weiss: 'Cassino cripto focado em privacidade que oferece originais provably fair no modelo de seed/nonce.',
    leebet: 'Cassino cripto mais novo com originais provably fair em HMAC-SHA256.',
    justbit: 'Cassino cripto cujos originais se verificam a partir das server e client seeds reveladas.',
    mystake: 'Cassino cripto e fiat com originais provably fair no modelo padrão.',
    fairspin: 'Cassino blockchain com originais provably fair verificáveis a partir do par de seeds.',
    'crypto-games': 'Cassino multimoeda de longa data com dice e originais provably fair simples e bem documentados.',
  },
};

export default C;
