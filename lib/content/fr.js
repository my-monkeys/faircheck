// Contenu français — miroir exact de la structure source (en.js). Mêmes clés,
// mêmes {tokens} ; seules les VALEURS de chaîne sont traduites.

const C = {
  ui: {
    nav: { casinos: 'Casinos', games: 'Jeux', how: 'Comment ça marche' },
    tagline: 'provably fair',
    footer: {
      about: 'Un vérificateur indépendant et ouvert pour les jeux de casino provably fair (équitables et vérifiables). Nous recalculons les résultats — nous ne gérons, n’hébergeons ni n’encaissons aucun pari.',
      verify: 'Vérifier', learn: 'Comprendre',
      lVerifier: 'Vérificateur universel', lByGame: 'Par jeu', lByCasino: 'Par casino', lHow: 'Comment fonctionne le provably fair',
      legal: '{name} est un outil informatif, pas un opérateur de jeux d’argent. Il n’est ni affilié, ni approuvé, ni sponsorisé par aucun casino cité sur ce site, et il ne renvoie vers aucun opérateur ni n’en fait la promotion. Les noms et les mécaniques de jeu sont mentionnés uniquement à des fins de vérification et d’éducation. Les jeux d’argent comportent un risque financier et sont soumis à une limite d’âge (18+/21+ selon votre juridiction) ; certaines formes de jeu en ligne sont illégales dans certains pays — vérifiez votre législation locale.',
      network: 'Un projet {link} · entièrement calculé dans votre navigateur.',
    },
    verifier: {
      form: 'Formulaire de vérification', loadExample: 'charger un exemple',
      serverSeed: 'Server seed (graine serveur) — révélée / non hachée',
      serverSeedPh: 'ex. 3f1a9c… (la graine que le casino affiche APRÈS rotation des graines)',
      clientSeed: 'Client seed (graine client)', clientSeedPh: 'votre graine client',
      nonce: 'Nonce', noncePh: 'numéro du pari, ex. 1',
      optional: 'Optionnel · vérification du hash d’engagement',
      hashDesc: 'Collez le hash de la graine serveur que le casino a publié avant le pari. Faircheck confirme que le SHA-256 de votre graine révélée correspond — preuve que la graine était fixée à l’avance.',
      hashPh: 'graine serveur hachée (SHA-256 hexadécimal de 64 caractères)',
      errServer: 'Collez la graine serveur révélée (non hachée).',
      errClient: 'Collez la graine client.',
      errNonce: 'Le nonce doit être un entier ≥ 0.',
      errFail: 'Échec du calcul.',
      verify: 'Vérifier le résultat de {game}', computing: 'Calcul en cours…',
      privacy: '100 % dans votre navigateur · les graines ne quittent jamais cette page',
      hashOk: '✓ Hash vérifié', hashBad: '✗ Hash non concordant',
      expected: 'attendu', got: 'sha256()',
      copyLink: '⧉ copier le lien de vérification', copied: '✓ lien copié',
      showRaw: 'Afficher le matériel cryptographique brut',
      hmacMsg: 'message HMAC n°{n}', bytesUsed: 'octets utilisés', floats: 'floats',
    },
  },

  home: {
    metaTitle: 'Faircheck — Vérificateur provably fair casinos crypto',
    metaDesc: 'Collez votre server seed, client seed et nonce pour recalculer vous-même n’importe quel résultat de casino crypto — Dice, Limbo, Mines, Plinko, Roulette, Keno, Wheel et Hi-Lo. 100 % dans votre navigateur, sans inscription.',
    kicker: 'Indépendant · ouvert · côté client',
    h1a: 'Vérifiez votre résultat de casino.', h1b: 'Prouvez qu’il était équitable.',
    lead: 'Collez votre server seed, client seed et nonce. Faircheck recalcule le résultat exact avec le même calcul HMAC-SHA256 que le casino a utilisé — pour que vous puissiez vérifier vous-même Dice, Limbo, Mines, Plinko, Roulette, Keno, Wheel et Hi-Lo. Rien ne quitte votre navigateur.',
    chips: ['{n}+ casinos', '{m} jeux', 'sans inscription', 'aucun enregistrement des graines'],
    howKicker: 'La méthode', howH2: 'Trois entrées, un résultat vérifiable',
    steps: [
      ['Engagement', 'Avant le pari, le casino affiche le hash SHA-256 d’une graine serveur secrète. Elle est désormais figée — elle ne peut plus changer.'],
      ['Pari', 'Votre résultat est HMAC-SHA256(server seed, `client seed:nonce:round`), transformé en float, puis associé au jeu. Vous contrôlez la graine client.'],
      ['Révélation et vérification', 'Faites tourner vos graines pour révéler la graine serveur. Faircheck la hache pour la faire correspondre à l’engagement et recalcule chaque tirage.'],
    ],
    fullExplainer: 'Explication complète →',
    gamesKicker: 'Par jeu', gamesH2: 'Choisissez un jeu à vérifier', allGames: 'Tous les jeux →',
    casinosKicker: 'Par casino', casinosH2: '{n} casinos, un seul algorithme', allCasinos: 'Tous les casinos →',
    faqKicker: 'FAQ', faqH2: 'Questions',
    faq: [
      ['Qu’est-ce qu’un vérificateur provably fair ?', 'Un outil qui recalcule le résultat d’un jeu de casino à partir de ses entrées publiques — la server seed, votre client seed et le nonce — pour que vous puissiez confirmer que le résultat était déterminé avant le pari et jamais modifié. Faircheck fait tout cela entièrement dans votre navigateur.'],
      ['Dois-je faire confiance à Faircheck ?', 'Non. La vérification est du pur calcul (HMAC-SHA256) exécuté localement sur votre appareil. Vos graines ne sont jamais envoyées nulle part. Vous pouvez lire l’algorithme ouvert et même refaire le même calcul vous-même.'],
      ['Quels casinos sont couverts ?', 'Tous les casinos utilisant la « méthode Stake » — le schéma graine/nonce HMAC-SHA256 employé par {n}+ casinos crypto dont Stake, BC.Game, Roobet, Shuffle et Rollbit. Le calcul est identique ; seuls les menus de rotation des graines diffèrent.'],
      ['Mon résultat ne correspond pas — le casino triche-t-il ?', 'En général, c’est une erreur de graine ou de nonce : vérifiez que vous avez bien fait tourner votre paire de graines pour que la graine serveur soit révélée (non hachée), et que le nonce correspond exactement au numéro du pari. Pour Limbo/Wheel, l’avantage de la maison ou le nombre de segments de l’opérateur doivent aussi correspondre. Une vraie discordance avec des entrées correctes est le signal d’alerte qui mérite une capture d’écran.'],
    ],
  },

  how: {
    metaTitle: 'Comment fonctionne le provably fair — server seed, client seed et nonce',
    metaDesc: 'Un guide clair sur les jeux d’argent provably fair : server seeds, client seeds, nonces, HMAC-SHA256 et comment vérifier soi-même n’importe quel résultat.',
    kicker: 'La méthode', h1: 'Comment fonctionne le provably fair',
    lead: 'Le provably fair (équitable et vérifiable) permet de vérifier, par la cryptographie plutôt que par la confiance, qu’un résultat a été décidé avant votre pari et jamais altéré ensuite. Voici toute l’idée en cinq minutes.',
    s1h: '1. L’engagement',
    s1p: 'Avant tout pari, le casino génère une graine serveur secrète et ne vous montre que son hash SHA-256. Un hash est une empreinte à sens unique : impossible de l’inverser pour retrouver la graine, mais une fois la graine révélée, n’importe qui peut la hacher et confirmer la correspondance. En publiant le hash d’abord, le casino se fige lui-même — il ne peut plus choisir une autre graine serveur une fois qu’il voit comment vous pariez.',
    s2h: '2. Votre contribution',
    s2p: 'Vous fournissez une graine client (que vous pouvez changer à tout moment) et chaque pari porte un nonce qui s’incrémente. Comme vous influez sur la graine client, le casino n’a pas pu pré-calculer un résultat qu’il serait seul à contrôler.',
    s3h: '3. Le tirage', s3p: 'Le résultat est produit de façon déterministe :',
    s3p2: 'Ces octets sont découpés en groupes de 4 octets et convertis en floats dans l’intervalle [0, 1). Chaque jeu associe ensuite les floats à un résultat — un lancer de dés, un multiplicateur de crash, un ensemble de cases minées, et ainsi de suite. Mêmes entrées, même sortie, à chaque fois.',
    s4h: '4. La révélation',
    s4p: 'Lorsque vous faites tourner votre paire de graines, le casino révèle l’ancienne graine serveur en clair. Vous pouvez alors faire deux vérifications : hacher la graine révélée et confirmer qu’elle correspond à l’engagement de l’étape 1, et recalculer chaque résultat pour confirmer que le casino les a rapportés honnêtement. C’est exactement ce que fait le vérificateur Faircheck — localement, dans votre navigateur, pour que vos graines ne quittent jamais votre appareil.',
    s5h: 'Pourquoi c’est identique sur la plupart des casinos',
    s5p: 'Stake a publié ce schéma et il est devenu le standard de facto. Les {n}+ casinos pris en charge par Faircheck utilisent la même méthode HMAC-SHA256 octet-vers-float ; seuls les menus de rotation des graines diffèrent. C’est pourquoi un seul vérificateur peut tous les contrôler.',
    faqH2: 'FAQ',
    faq: [
      ['Provably fair veut-il dire « équitable » ?', 'Non. Cela prouve que le casino ne pouvait pas changer le résultat après votre pari — cela ne change pas l’avantage de la maison. Un jeu provably fair peut toujours être conçu pour favoriser la maison ; il ne peut simplement pas mentir sur le résultat qu’il a généré.'],
      ['Le casino peut-il quand même tricher ?', 'Pas sur le résultat lui-même, du moment qu’il s’engage sur la graine serveur hachée avant le pari et que vous vérifiez après l’avoir révélée. La seule confiance restante est que l’engagement que vous avez vu a bien été montré avant le jeu — d’où l’intérêt de capturer la graine hachée.'],
      ['Qu’est-ce qu’un nonce ?', 'Un compteur qui augmente de un à chaque pari réalisé sur la même paire graine serveur/graine client. Il garantit que chaque pari produit un résultat différent à partir des mêmes graines.'],
    ],
    ctaH: 'Prêt à vérifier un pari ?', ctaP: 'Ouvrez le vérificateur universel et collez vos graines.', ctaBtn: 'Ouvrir le vérificateur',
    linkVerifier: 'le vérificateur Faircheck',
  },

  gamesIndex: {
    metaTitle: 'Jeux provably fair vérifiés — Dice, Limbo, Mines, Plinko et plus',
    metaDesc: 'Vérifiez Dice, Limbo, Mines, Plinko, Roulette, Keno, Wheel et Hi-Lo. Chaque jeu expliqué, avec un vérificateur gratuit dans le navigateur et la formule exacte.',
    kicker: 'Par jeu', h1: 'Jeux provably fair',
    lead: 'Chaque jeu transforme le même flux de graines HMAC-SHA256 en résultat d’une manière différente. Choisissez-en un pour lire son fonctionnement et vérifier un résultat sur l’un des {n} casinos pris en charge.',
  },

  casinosIndex: {
    metaTitle: 'Casinos crypto vérifiés — Stake, BC.Game, Roobet et plus',
    metaDesc: 'Vérification provably fair pour {n}+ casinos crypto — Stake, BC.Game, Roobet, Shuffle, Rollbit et plus. Recalculez n’importe quel résultat de jeu original dans votre navigateur.',
    kicker: 'Par casino', h1: 'Casinos que nous vérifions',
    lead: 'Ces {n} casinos crypto utilisent le même schéma provably fair « méthode Stake » en HMAC-SHA256, donc Faircheck reproduit leurs {m} jeux originaux à partir de la paire de graines et du nonce que vous avez déjà.',
    gamesLine: '{n} jeux · graine/nonce',
  },

  gamePage: {
    breadcrumb: 'Jeux',
    h1: 'Vérifier {game}',
    algoKicker: 'Comment {game} est généré', algoH2: 'L’algorithme',
    faqH2: 'FAQ',
    perCasinoKicker: 'Par casino', perCasinoH2: 'Vérifier {game} sur votre casino',
    perCasinoDesc: 'Le calcul est le même partout, mais chaque page est adaptée à la façon dont ce casino révèle ses graines.',
    otherGames: 'Autres jeux',
    metaTitle: 'Vérifier {game} — Vérificateur provably fair',
    metaDesc: 'Vérificateur provably fair {game} gratuit. {intro}',
  },

  casinoPage: {
    breadcrumb: 'Casinos',
    h1: 'Vérificateur {casino}',
    engineLine: 'Moteur : {engine} · créé en {year} · {n} jeux vérifiables',
    howKicker: 'Comment vérifier sur {casino}', howH2: 'Révélez votre graine, puis recalculez',
    howP1: 'Ouvrez le panneau provably fair ou d’équité dans votre compte {casino} et faites tourner votre paire de graines. Cela révèle la graine serveur précédente en clair et affiche le hash SHA-256 sur lequel elle était engagée avant vos paris.',
    howP2: 'Collez cette graine serveur révélée, votre graine client et le nonce du pari dans le formulaire ci-dessus. {engine}',
    howP3: 'Faircheck hache votre graine révélée pour confirmer qu’elle correspond à l’engagement pris avant le pari, puis reproduit le résultat exact — le tout localement, pour que vos graines ne quittent jamais la page.',
    gamesKicker: 'Jeux {casino}', gamesH2: 'Vérifier un jeu précis',
    otherCasinos: 'Autres casinos',
    metaTitle: 'Vérificateur provably fair {casino}',
    metaDesc: 'Vérifiez les résultats {casino} en toute indépendance. Recalculez Dice, Limbo, Mines et plus à partir de votre server seed, client seed et nonce — gratuit, dans votre navigateur.',
  },

  casinoGamePage: {
    h1: 'Vérificateur {casino} {game}',
    lead: 'Vérifiez en toute indépendance n’importe quel pari {game} sur {casino}. {intro}',
    stepKicker: 'Pas à pas sur {casino}', stepH2: 'Comment vérifier {game} sur {casino}',
    steps: [
      ['Révélez la graine.', 'Ouvrez le panneau provably fair de {casino} et faites tourner votre paire de graines — cela révèle la graine serveur précédente et affiche le hash SHA-256 sur lequel elle était engagée avant votre pari.'],
      ['Trouvez le nonce.', 'Chaque pari sur une paire de graines a un nonce qui s’incrémente. Utilisez le nonce de la manche {game} exacte que vous voulez vérifier.'],
      ['Collez et vérifiez.', 'Déposez la graine serveur, la graine client et le nonce dans le formulaire ci-dessus. Faircheck recalcule le {label} et confirme que le hash de la graine correspond.'],
    ],
    formulaH2: 'La formule de {game}',
    faqH2: 'FAQ vérification {game}',
    moreGames: 'Plus de jeux {casino}', gameOnOthers: '{game} sur d’autres casinos',
    metaTitle: 'Vérificateur {casino} {game} — Provably fair',
    metaDesc: 'Vérifiez vous-même les résultats {game} sur {casino}. Recalculez le {label} à partir de votre server seed, client seed et nonce avec le calcul HMAC-SHA256 exact. Gratuit, dans le navigateur, sans inscription.',
  },

  notFound: {
    metaTitle: 'Introuvable',
    kicker: '404', h1: 'Rien à vérifier ici', lead: 'Cette page n’existe pas. Retournez au vérificateur.',
    cta1: 'Vérificateur universel', cta2: 'Parcourir les casinos',
  },

  // Résumé du moteur « méthode Stake », réutilisé sur plusieurs pages.
  engineSummary: 'Octets issus de HMAC-SHA256(serverSeed, `clientSeed:nonce:round`), convertis en floats et associés à chaque jeu. La graine serveur est engagée sous forme de hash SHA-256 avant le pari et révélée quand vous faites tourner les graines.',

  // Contenu localisé par jeu. `name` + `resultLabel` sont des chaînes d’affichage ; `slug` et
  // `formula` vivent dans lib/games-meta.js (indépendants de la langue).
  games: {
    dice: {
      name: 'Dice (Dés)', resultLabel: 'Lancer', tagline: 'Le lancer de 0,00 à 100,00, recalculé à partir de vos graines.',
      intro: 'Dice est le jeu provably fair le plus simple : un seul float pilote un lancer entre 0,00 et 100,00. Faircheck régénère ce float exact à partir de votre server seed, client seed et nonce, pour que vous puissiez confirmer que le lancer affiché par le casino était le seul qu’il pouvait produire.',
      howItWorks: [
        'Un seul float de 4 octets est prélevé dans le flux d’octets HMAC-SHA256 clé par votre graine serveur.',
        'Le float (un nombre dans [0, 1)) est multiplié par 10001 et arrondi à l’entier inférieur, puis divisé par 100 pour donner un lancer à deux décimales entre 0,00 et 100,00.',
        'Comme la graine serveur a été engagée sous forme de hash SHA-256 avant le pari, l’opérateur n’a pas pu la changer après avoir vu votre graine client ou votre nonce.',
      ],
      faq: [
        ['Pourquoi 10001 et pas 10000 ?', 'Multiplier par 10001 rend tous les lancers de 0,00 à 100,00 inclus également probables une fois arrondis à l’entier inférieur — avec 10000, 100,00 serait inatteignable.'],
        ['Mon lancer ne correspond pas. Et maintenant ?', 'Vérifiez le nonce (il s’incrémente de un à chaque pari) et que vous avez bien collé la graine serveur NON hachée que le casino a révélée après rotation de votre paire de graines. Un seul caractère erroné change tout.'],
      ],
    },
    limbo: {
      name: 'Limbo', resultLabel: 'Multiplicateur', tagline: 'Le multiplicateur cible façon crash, avec l’avantage de la maison exposé.',
      intro: 'Limbo transforme un float en multiplicateur cible. Contrairement à Dice, le résultat dépend de l’avantage de la maison de l’opérateur, donc Faircheck l’expose comme une entrée plutôt que de le cacher — réglez-le sur la valeur de votre casino (1 % est la norme) et le multiplicateur est entièrement reproductible.',
      howItWorks: [
        'Un float est tiré du flux HMAC-SHA256, exactement comme dans Dice.',
        'Le float est converti en grand entier, inversé et mis à l’échelle par (1 − avantage de la maison) pour produire le point de crash.',
        'Le résultat est arrondi à deux décimales à l’entier inférieur et borné à un minimum de 1,00×.',
      ],
      faq: [
        ['Pourquoi dois-je saisir un avantage de la maison ?', 'La formule du multiplicateur intègre l’avantage de l’opérateur. La plupart des casinos « méthode Stake » utilisent 1 % (0,01) ; un avantage différent décale chaque multiplicateur, il doit donc correspondre à votre casino.'],
        ['Limbo est-il identique à Crash ?', 'Le calcul est très proche — tous deux dérivent un multiplicateur d’un seul float — mais Crash arrondit et anime différemment selon l’opérateur. Utilisez le vérificateur Limbo pour le Limbo façon Stake.'],
      ],
      note: 'À noter : Limbo dépend d’un avantage de la maison propre à l’opérateur. Si votre résultat est décalé d’un facteur constant, ajustez-le dans le formulaire pour correspondre à ce qu’a utilisé {casino}.',
    },
    roulette: {
      name: 'Roulette', resultLabel: 'Case', tagline: 'La case de la roulette européenne à zéro unique, 0–36.',
      intro: 'La roulette provably fair associe un float aux 37 cases d’une roue européenne à zéro unique. Faircheck reproduit la case gagnante pour que vous puissiez confirmer que le tour a été fixé par les graines, pas par la maison.',
      howItWorks: [
        'Un seul float dans [0, 1) est généré à partir de vos graines.',
        'Il est multiplié par 37 et arrondi à l’entier inférieur pour tomber sur une case de 0 à 36.',
        'Rouge/noir et pair/impair découlent simplement de ce numéro de case sur la disposition standard de la roue.',
      ],
      faq: [
        ['Roue européenne ou américaine ?', 'Le vérificateur « méthode Stake » utilise la roue européenne à zéro unique (0–36). La roulette américaine à double zéro est rare parmi les jeux originaux des casinos crypto.'],
      ],
    },
    plinko: {
      name: 'Plinko', resultLabel: 'Case finale', tagline: 'Le parcours gauche/droite de la bille et sa case finale.',
      intro: 'Plinko lâche une bille à travers un triangle de picots. Chaque rangée utilise un float pour décider gauche ou droite. Faircheck reconstitue le parcours complet et la case dans laquelle la bille se pose, pour tout nombre de rangées de 8 à 16.',
      howItWorks: [
        'Un float est tiré par rangée (de 8 à 16 floats au total, selon le niveau de risque).',
        'Un float inférieur à 0,5 envoie la bille à gauche, sinon à droite.',
        'La case finale est le nombre de mouvements vers la droite — cet index sélectionne le multiplicateur de gain sur le plateau.',
      ],
      faq: [
        ['Combien de rangées dois-je choisir ?', 'Cela dépend du plateau sur lequel vous avez joué — les rangées de Stake vont de 8 (faible) à 16 (élevé). Le parcours ne correspond que si le nombre de rangées correspond à votre pari.'],
      ],
    },
    mines: {
      name: 'Mines', resultLabel: 'Cases minées', tagline: 'Lesquelles des 25 cases étaient des mines.',
      intro: 'Mines cache des bombes sur une grille 5×5. Les positions des mines sont tirées de vos graines avant tout clic. Faircheck révèle exactement quelles cases (0–24) étaient minées, pour que vous puissiez confirmer que rien n’a bougé pendant votre jeu.',
      howItWorks: [
        'Un float est tiré par mine dans le flux HMAC-SHA256.',
        'Chaque float choisit une case parmi les cases non minées restantes (un mélange-et-sélection), garantissant des positions distinctes.',
        'L’ensemble complet des cases minées est fixé au moment du pari — cliquer sur une case sûre ne déplace jamais une mine.',
      ],
      faq: [
        ['Comment les cases sont-elles numérotées ?', 'De gauche à droite, de haut en bas : la case en haut à gauche est 0, celle en bas à droite est 24.'],
      ],
    },
    keno: {
      name: 'Keno', resultLabel: 'Numéros tirés', tagline: 'Les 10 numéros tirés parmi 40.',
      intro: 'Keno tire dix numéros parmi un champ de quarante. Faircheck reproduit le tirage exact à partir de vos graines pour que vous puissiez comparer les numéros à ceux que vous avez choisis.',
      howItWorks: [
        'Dix floats sont tirés du flux HMAC-SHA256.',
        'Chaque float sélectionne une case parmi le réservoir restant de quarante, produisant dix numéros distincts.',
        'Le tirage est identique pour toute personne détenant la même paire de graines et le même nonce.',
      ],
      faq: [
        ['Numérotation ?', 'Les cases sont numérotées de 1 à 40. Faircheck les renvoie triées pour faciliter la comparaison.'],
      ],
    },
    wheel: {
      name: 'Wheel (Roue)', resultLabel: 'Segment', tagline: 'Le segment gagnant de la roue.',
      intro: 'Wheel tourne vers l’un de N segments égaux. Faircheck associe votre float à la roue sur laquelle vous avez réellement joué — réglez le nombre de segments et l’index gagnant est reproductible.',
      howItWorks: [
        'Un seul float dans [0, 1) est généré.',
        'Il est multiplié par le nombre de segments et arrondi à l’entier inférieur pour choisir l’index gagnant.',
        'Les niveaux de risque changent le nombre de segments et les multiplicateurs présents sur la roue, donc le nombre de segments doit correspondre à votre pari.',
      ],
      faq: [
        ['Pourquoi régler le nombre de segments ?', 'Les différents niveaux de risque utilisent des nombres de segments différents. Le float est le même ; seule l’association change.'],
      ],
      note: 'À noter : Wheel dépend d’un nombre de segments propre à l’opérateur. Si votre résultat est décalé, réglez le nombre de segments dans le formulaire pour correspondre à ce qu’a utilisé {casino}.',
    },
    hilo: {
      name: 'Hi-Lo', resultLabel: 'Carte', tagline: 'La carte tirée d’un jeu de 52 cartes.',
      intro: 'Hi-Lo demande si la carte suivante est plus haute ou plus basse. Chaque carte est un seul float sur un jeu de 52 cartes. Faircheck révèle la carte exacte pour que vous puissiez vérifier la séquence sur laquelle vous avez parié.',
      howItWorks: [
        'Un float par carte est tiré du flux HMAC-SHA256.',
        'Le float est multiplié par 52 et arrondi à l’entier inférieur pour donner un index de 0 à 51.',
        'L’index correspond à une valeur (A→K) et une couleur (♦♣♥♠) dans l’ordonnancement Stake standard.',
      ],
      faq: [
        ['Quel ordre de cartes ?', 'Les valeurs vont de l’As, 2…10, Valet, Dame, Roi ; les couleurs vont carreau, trèfle, cœur, pique — l’ordonnancement utilisé par les jeux « méthode Stake ».'],
      ],
    },
  },

  // Notice localisée par casino. slug/name/year/games vivent dans lib/casinos.js.
  casinos: {
    stake: 'À l’origine du modèle moderne graine/nonce ; sa spécification provably fair ouverte est celle que la plupart des autres casinos ont copiée mot pour mot.',
    'stake-us': 'Le site social-casino américain frère de Stake, faisant tourner les mêmes jeux originaux provably fair et la même vérification HMAC-SHA256.',
    'bc-game': 'Un grand casino crypto dont les jeux maison utilisent le schéma identique graine serveur, graine client et nonce.',
    shuffle: 'Un casino crypto plus récent bâti autour de jeux originaux façon Stake avec la vérification standard par paire de graines.',
    rollbit: 'Casino crypto et plateforme de trading ; ses jeux originaux dice, plinko et limbo suivent la méthode HMAC-SHA256.',
    roobet: 'Casino crypto populaire dont les jeux originaux exposent une graine serveur que l’on peut faire tourner et un nonce qui s’incrémente.',
    gamdom: 'L’un des plus anciens casinos crypto, avec des jeux originaux provably fair vérifiables à partir de la paire de graines révélée.',
    trustdice: 'Casino crypto axé sur le dice avec un ensemble complet de jeux originaux provably fair sur le modèle standard.',
    'chips-gg': 'Casino social crypto proposant des jeux originaux façon Stake et l’équité vérifiable par paire de graines.',
    duelbits: 'Casino crypto et book esport ; ses jeux originaux se vérifient via le schéma graine/nonce HMAC-SHA256.',
    rainbet: 'Casino crypto moderne avec des jeux originaux provably fair et un processus de vérification public.',
    'wild-io': 'Casino crypto dont les jeux originaux exposent graine serveur, graine client et nonce pour des contrôles indépendants.',
    metaspins: 'Casino crypto avec des jeux originaux façon Stake vérifiables une fois la graine serveur révélée.',
    jackbit: 'Casino crypto et bookmaker proposant des jeux originaux provably fair sur le modèle de graines standard.',
    flush: 'Casino crypto avec des jeux originaux provably fair HMAC-SHA256 et des graines que l’on peut faire tourner.',
    'bets-io': 'Casino crypto dont les jeux maison publient la paire de graines et le nonce pour la vérification.',
    '500-casino': 'Casino crypto de longue date (anciennement CSGO500) avec des jeux originaux provably fair sur le modèle graine/nonce.',
    betfury: 'Casino crypto avec une vaste bibliothèque de jeux originaux vérifiables à partir des graines serveur et client.',
    nanogames: 'Casino crypto avec des jeux originaux rapides et l’équité vérifiable HMAC-SHA256 standard.',
    empire: 'Casino crypto et de skins dont les jeux originaux suivent le schéma provably fair par paire de graines.',
    csgoroll: 'Site basé sur les skins avec des jeux originaux provably fair que vous pouvez recalculer à partir des graines révélées.',
    clash: 'Site de caisses et de jeux originaux exposant graine serveur, graine client et nonce pour la vérification.',
    primedice: 'Le site de dice classique frère de Stake — le jeu qui a popularisé l’équité vérifiable graine/nonce.',
    bitsler: 'Casino crypto de dice chevronné avec dice, roulette et limbo provably fair.',
    windice: 'Casino crypto de dice avec des jeux originaux provably fair sur le modèle standard.',
    luckybird: 'Casino social crypto avec des jeux originaux façon Stake et des paires de graines que l’on peut faire tourner.',
    weiss: 'Casino crypto axé sur la confidentialité proposant des jeux originaux provably fair sur le modèle graine/nonce.',
    leebet: 'Casino crypto plus récent avec des jeux originaux provably fair HMAC-SHA256.',
    justbit: 'Casino crypto dont les jeux originaux se vérifient à partir des graines serveur et client révélées.',
    mystake: 'Casino crypto et fiat avec des jeux originaux provably fair sur le modèle standard.',
    fairspin: 'Casino blockchain avec des jeux originaux provably fair vérifiables à partir de la paire de graines.',
    'crypto-games': 'Casino multi-cryptos de longue date avec des dice et jeux originaux provably fair simples et bien documentés.',
  },
};

export default C;
