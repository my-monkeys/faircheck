// English content — the single source of truth. Other locales mirror this structure
// exactly (same keys, same {tokens}); only the string VALUES are translated.

const C = {
  ui: {
    nav: { casinos: 'Casinos', games: 'Juegos', how: 'Cómo funciona' },
    tagline: 'provably-fair',
    footer: {
      about: 'Un verificador independiente y abierto para juegos de casino provably fair. Recalculamos los resultados: no operamos, alojamos ni aceptamos apuestas.',
      verify: 'Verificar', learn: 'Aprender',
      lVerifier: 'Verificador universal', lByGame: 'Por juego', lByCasino: 'Por casino', lHow: 'Cómo funciona el provably fair',
      legal: '{name} es una herramienta informativa, no un operador de juego. No está afiliado, respaldado ni patrocinado por ningún casino mencionado en este sitio, y no enlaza ni promociona a ningún operador. Los nombres y las mecánicas de juego se citan únicamente con fines de verificación y educativos. El juego conlleva riesgo financiero y tiene restricción de edad (18+/21+ según tu jurisdicción); algunas formas de juego en línea son ilegales en ciertos países: consulta tu legislación local.',
      network: 'Un proyecto de {link} · calculado completamente en tu navegador.',
    },
    verifier: {
      form: 'Formulario de verificación', loadExample: 'cargar ejemplo',
      serverSeed: 'Semilla del servidor — revelada / sin hashear',
      serverSeedPh: 'p. ej. 3f1a9c… (la semilla que el casino muestra DESPUÉS de rotar las semillas)',
      clientSeed: 'Semilla del cliente', clientSeedPh: 'tu semilla del cliente',
      nonce: 'Nonce', noncePh: 'número de apuesta, p. ej. 1',
      gameHash: 'Hash del juego — hash del resultado de la ronda',
      gameHashPh: 'el hash de la ronda, p. ej. 0a1b2c… (hex)',
      salt: 'Salt (opcional)',
      saltPh: 'salt público, si tu casino aplica HMAC al hash',
      optional: 'Opcional · comprobación del hash de pre-compromiso',
      hashDesc: 'Pega el hash de la semilla del servidor que el casino publicó antes de la apuesta. Faircheck confirma que el SHA-256 de tu semilla revelada coincide con él: prueba de que la semilla quedó fijada de antemano.',
      hashPh: 'hash de la semilla del servidor (SHA-256 hex de 64 caracteres)',
      errServer: 'Pega la semilla del servidor revelada (sin hashear).',
      errClient: 'Pega la semilla del cliente.',
      errNonce: 'El nonce debe ser un número entero ≥ 0.',
      errFail: 'Falló el cálculo.',
      verify: 'Verificar resultado de {game}', computing: 'Calculando…',
      privacy: '100% en tu navegador · las semillas nunca salen de esta página',
      hashOk: '✓ Hash verificado', hashBad: '✗ El hash no coincide',
      expected: 'esperado', got: 'sha256()',
      copyLink: '⧉ copiar enlace de verificación', copied: '✓ enlace copiado',
      showRaw: 'Mostrar material criptográfico en bruto',
      hmacMsg: 'Mensaje HMAC n.º {n}', bytesUsed: 'bytes usados', floats: 'floats',
    },
  },

  home: {
    metaTitle: 'Faircheck — Verificador Provably Fair de Casinos Cripto',
    metaDesc: 'Pega tu semilla del servidor, semilla del cliente y nonce para recalcular tú mismo cualquier resultado de casino cripto — Dice, Limbo, Mines, Plinko, Ruleta, Keno, Wheel y Hi-Lo. 100% en tu navegador, sin registro.',
    kicker: 'Independiente · abierto · del lado del cliente',
    h1a: 'Verifica el resultado de tu casino.', h1b: 'Demuestra que fue justo.',
    lead: 'Pega tu semilla del servidor, semilla del cliente y nonce. Faircheck recalcula el resultado exacto con la misma matemática HMAC-SHA256 que usó el casino, para que puedas comprobar Dice, Limbo, Mines, Plinko, Ruleta, Keno, Wheel y Hi-Lo tú mismo. Nada sale de tu navegador.',
    chips: ['{n}+ casinos', '{m} juegos', 'sin registro', 'sin registro de semillas'],
    howKicker: 'El método', howH2: 'Tres entradas, un resultado comprobable',
    steps: [
      ['Compromiso', 'Antes de la apuesta, el casino muestra el hash SHA-256 de una semilla del servidor secreta. Ahora queda fijada: no puede cambiar.'],
      ['Apuesta', 'Tu resultado es HMAC-SHA256(semilla del servidor, `client seed:nonce:round`), convertido en un float y luego mapeado al juego. Tú controlas la semilla del cliente.'],
      ['Revelar y verificar', 'Rota tus semillas para revelar la semilla del servidor. Faircheck la hashea para que coincida con el compromiso y recalcula cada tirada.'],
    ],
    fullExplainer: 'Explicación completa →',
    gamesKicker: 'Por juego', gamesH2: 'Elige un juego para verificar', allGames: 'Todos los juegos →',
    casinosKicker: 'Por casino', casinosH2: '{n} casinos, un algoritmo', allCasinos: 'Todos los casinos →',
    faqKicker: 'Preguntas frecuentes', faqH2: 'Preguntas',
    faq: [
      ['¿Qué es un verificador provably fair?', 'Una herramienta que recalcula el resultado de un juego de casino a partir de sus entradas públicas — la semilla del servidor, tu semilla del cliente y el nonce — para que puedas confirmar que el resultado se determinó antes de la apuesta y nunca se alteró. Faircheck lo hace completamente en tu navegador.'],
      ['¿Tengo que confiar en Faircheck?', 'No. La verificación es matemática pura (HMAC-SHA256) que se ejecuta localmente en tu dispositivo. Tus semillas nunca se envían a ningún sitio. Puedes leer el algoritmo abierto e incluso ejecutar tú mismo el mismo cálculo.'],
      ['¿Qué casinos cubre?', 'Todos los casinos del “método Stake” — el esquema HMAC-SHA256 de semilla/nonce que usan {n}+ casinos cripto, incluidos Stake, BC.Game, Roobet, Shuffle y Rollbit. La matemática es idéntica; solo cambian los menús de rotación de semillas.'],
      ['Mi resultado no coincide, ¿el casino está haciendo trampa?', 'Normalmente es un desajuste de semilla o nonce: asegúrate de haber rotado tu par de semillas para que la semilla del servidor quede revelada (sin hashear), y de que el nonce sea el número exacto de la apuesta. Para Limbo/Wheel, también deben coincidir la ventaja de la casa o el número de segmentos del operador. Un desajuste real con entradas correctas es la señal de alarma que vale la pena capturar en pantalla.'],
    ],
  },

  how: {
    metaTitle: 'Cómo Funciona el Provably Fair — Semilla del Servidor, del Cliente y Nonce',
    metaDesc: 'Una guía clara sobre el juego provably fair: semillas del servidor, semillas del cliente, nonces, HMAC-SHA256 y cómo verificar tú mismo cualquier resultado.',
    kicker: 'El método', h1: 'Cómo funciona el provably fair',
    lead: 'El juego provably fair (comprobablemente justo) te permite comprobar, con criptografía en lugar de confianza, que un resultado se decidió antes de que apostaras y nunca se manipuló después. Aquí tienes toda la idea en cinco minutos.',
    s1h: '1. El compromiso',
    s1p: 'Antes de cualquier apuesta, el casino genera una semilla del servidor secreta y te muestra solo su hash SHA-256. Un hash es una huella unidireccional: no puedes revertirlo para hallar la semilla, pero una vez que la semilla se revela, cualquiera puede hashearla y confirmar que coincide. Al publicar el hash primero, el casino se compromete: ya no puede elegir una semilla del servidor distinta una vez que ve cómo apuestas.',
    s2h: '2. Tu entrada',
    s2p: 'Tú aportas una semilla del cliente (puedes cambiarla en cualquier momento) y cada apuesta lleva un nonce que se incrementa. Como influyes en la semilla del cliente, el casino no pudo haber precalculado un resultado que solo él controle.',
    s3h: '3. El sorteo', s3p: 'El resultado se produce de forma determinista:',
    s3p2: 'Esos bytes se dividen en grupos de 4 bytes y se convierten en floats en el rango [0, 1). Cada juego mapea entonces los floats a un resultado: una tirada de dados, un multiplicador de crash, un conjunto de minas, y así sucesivamente. Mismas entradas, mismo resultado, siempre.',
    s4h: '4. La revelación',
    s4p: 'Cuando rotas tu par de semillas, el casino revela la antigua semilla del servidor en texto plano. Ahora puedes hacer dos comprobaciones: hashear la semilla revelada y confirmar que es igual al compromiso del paso 1, y recalcular cada resultado para confirmar que el casino los informó honestamente. Eso es exactamente lo que hace el verificador de Faircheck: localmente, en tu navegador, para que tus semillas nunca salgan de tu dispositivo.',
    s5h: 'Por qué es igual en la mayoría de los casinos',
    s5p: 'Stake publicó este esquema y se convirtió en el estándar de facto. Los {n}+ casinos que Faircheck admite usan el método idéntico de byte a float con HMAC-SHA256; solo difieren los menús para rotar las semillas. Por eso un único verificador puede comprobarlos todos.',
    faqH2: 'Preguntas frecuentes',
    faq: [
      ['¿Provably fair es lo mismo que “justo”?', 'No. Prueba que el casino no pudo cambiar el resultado después de que apostaras, pero no cambia la ventaja de la casa. Un juego provably fair puede seguir diseñado a favor de la casa; simplemente no puede mentir sobre el resultado que generó.'],
      ['¿Puede el casino seguir haciendo trampa?', 'No sobre el resultado en sí, siempre que se comprometa con el hash de la semilla del servidor antes de la apuesta y tú verifiques después de revelarla. La confianza restante está en que el compromiso que viste se mostró realmente antes de jugar, por lo que deberías capturar en pantalla el hash de la semilla.'],
      ['¿Qué es un nonce?', 'Un contador que aumenta en uno por cada apuesta hecha con el mismo par de semillas servidor/cliente. Garantiza que cada apuesta produzca un resultado distinto a partir de las mismas semillas.'],
    ],
    ctaH: '¿Listo para comprobar una apuesta?', ctaP: 'Abre el verificador universal y pega tus semillas.', ctaBtn: 'Abrir el verificador',
    linkVerifier: 'el verificador de Faircheck',
  },

  gamesIndex: {
    metaTitle: 'Juegos Provably Fair que Verificamos — Dice, Limbo, Mines, Plinko y Más',
    metaDesc: 'Verifica Dice, Limbo, Mines, Plinko, Ruleta, Keno, Wheel y Hi-Lo. Cada juego explicado, con un verificador gratuito en el navegador y la fórmula exacta.',
    kicker: 'Por juego', h1: 'Juegos provably fair',
    lead: 'Cada juego convierte el mismo flujo de semillas HMAC-SHA256 en un resultado de una forma distinta. Elige uno para leer cómo funciona y verificar un resultado en cualquiera de los {n} casinos admitidos.',
  },

  casinosIndex: {
    metaTitle: 'Casinos Cripto que Verificamos — Stake, BC.Game, Roobet y Más',
    metaDesc: 'Verificación provably fair para {n}+ casinos cripto — Stake, BC.Game, Roobet, Shuffle, Rollbit y más. Recalcula cualquier resultado de juego original en tu navegador.',
    kicker: 'Por casino', h1: 'Casinos que verificamos',
    lead: 'Estos {n} casinos cripto usan el mismo esquema provably fair del “método Stake” con HMAC-SHA256, así que Faircheck reproduce sus {m} juegos originales a partir del par de semillas y el nonce que ya tienes.',
    gamesLine: '{n} juegos · semilla/nonce',
  },

  gamePage: {
    breadcrumb: 'Juegos',
    h1: 'Verificar {game}',
    algoKicker: 'Cómo se genera {game}', algoH2: 'El algoritmo',
    faqH2: 'Preguntas frecuentes',
    perCasinoKicker: 'Por casino', perCasinoH2: 'Verificar {game} en tu casino',
    perCasinoDesc: 'La matemática es la misma en todas partes, pero cada página está ajustada a cómo ese casino revela sus semillas.',
    otherGames: 'Otros juegos',
    metaTitle: 'Verificar {game} — Comprobador Provably Fair',
    metaDesc: 'Verificador provably fair gratuito de {game}. {intro}',
  },

  casinoPage: {
    breadcrumb: 'Casinos',
    h1: 'Verificador de {casino}',
    engineLine: 'Motor: {engine} · fundado en {year} · {n} juegos verificables',
    howKicker: 'Cómo verificar en {casino}', howH2: 'Revela tu semilla y luego recalcula',
    howP1: 'Abre el panel de provably fair o de equidad en tu cuenta de {casino} y rota tu par de semillas. Esto revela la semilla del servidor anterior en texto plano y muestra el hash SHA-256 al que quedó comprometida antes de tus apuestas.',
    howP2: 'Pega esa semilla del servidor revelada, tu semilla del cliente y el nonce de la apuesta en el formulario de arriba. {engine}',
    howP3: 'Faircheck hashea tu semilla revelada para confirmar que coincide con el compromiso previo a la apuesta, luego reproduce el resultado exacto, todo localmente, para que tus semillas nunca salgan de la página.',
    gamesKicker: 'Juegos de {casino}', gamesH2: 'Verificar un juego concreto',
    otherCasinos: 'Otros casinos',
    metaTitle: 'Verificador Provably Fair de {casino}',
    metaDesc: 'Verifica de forma independiente los resultados de {casino}. Recalcula Dice, Limbo, Mines y más a partir de tu semilla del servidor, semilla del cliente y nonce — gratis, en tu navegador.',
  },

  casinoGamePage: {
    h1: 'Verificador de {game} en {casino}',
    lead: 'Comprueba de forma independiente cualquier apuesta de {game} en {casino}. {intro}',
    stepKicker: 'Paso a paso en {casino}', stepH2: 'Cómo verificar {game} en {casino}',
    steps: [
      ['Revela la semilla.', 'Abre el panel provably fair de {casino} y rota tu par de semillas: esto revela la semilla del servidor anterior y muestra el hash SHA-256 al que quedó comprometida antes de tu apuesta.'],
      ['Encuentra el nonce.', 'Cada apuesta en un par de semillas tiene un nonce que se incrementa. Usa el nonce de la ronda exacta de {game} que quieras comprobar.'],
      ['Pega y verifica.', 'Coloca la semilla del servidor, la semilla del cliente y el nonce en el formulario de arriba. Faircheck recalcula el {label} y confirma que el hash de la semilla coincide.'],
    ],
    formulaH2: 'La fórmula de {game}',
    faqH2: 'Preguntas frecuentes sobre la verificación de {game}',
    moreGames: 'Más juegos de {casino}', gameOnOthers: '{game} en otros casinos',
    metaTitle: 'Verificador de {game} en {casino} — Provably Fair',
    metaDesc: 'Verifica tú mismo los resultados de {game} en {casino}. Recalcula el {label} a partir de tu semilla del servidor, semilla del cliente y nonce con la matemática exacta HMAC-SHA256. Gratis, en el navegador, sin registro.',
  },

  notFound: {
    metaTitle: 'No encontrado',
    kicker: '404', h1: 'Nada que verificar aquí', lead: 'Esa página no existe. Vuelve al verificador.',
    cta1: 'Verificador universal', cta2: 'Explorar casinos',
  },

  // Stake-method engine summary, reused across pages.
  engineSummary: 'Bytes de HMAC-SHA256(serverSeed, `clientSeed:nonce:round`), convertidos en floats y mapeados según el juego. La semilla del servidor se compromete como un hash SHA-256 antes de la apuesta y se revela cuando rotas las semillas.',

  // Per-game localized content. `name` + `resultLabel` are display strings; `slug` and
  // `formula` live in lib/games-meta.js (language-neutral).
  games: {
    dice: {
      name: 'Dice (Dados)', resultLabel: 'Tirada', tagline: 'La tirada de 0.00–100.00, recalculada a partir de tus semillas.',
      intro: 'Dice es el juego provably fair más simple: un único float impulsa una tirada entre 0.00 y 100.00. Faircheck regenera ese float exacto a partir de tu semilla del servidor, semilla del cliente y nonce, para que puedas confirmar que la tirada que el casino te mostró era la única que podía haber producido.',
      howItWorks: [
        'Se toma un único float de 4 bytes del flujo de bytes HMAC-SHA256 con clave en tu semilla del servidor.',
        'El float (un número en [0, 1)) se multiplica por 10001 y se aplica el suelo (floor), luego se divide por 100 para dar una tirada con dos decimales entre 0.00 y 100.00.',
        'Como la semilla del servidor quedó comprometida como un hash SHA-256 antes de la apuesta, el operador no pudo cambiarla después de ver tu semilla del cliente o tu nonce.',
      ],
      faq: [
        ['¿Por qué 10001 y no 10000?', 'Multiplicar por 10001 hace que toda tirada de 0.00 a 100.00 inclusive sea igualmente probable una vez aplicado el suelo (floor); usar 10000 haría inalcanzable el 100.00.'],
        ['Mi tirada no coincide. ¿Y ahora qué?', 'Comprueba el nonce (se incrementa en uno cada apuesta) y que pegaste la semilla del servidor SIN HASHEAR que el casino reveló tras rotar tu par de semillas. Un solo carácter equivocado lo cambia todo.'],
      ],
    },
    limbo: {
      name: 'Limbo', resultLabel: 'Multiplicador', tagline: 'El multiplicador objetivo estilo crash, con la ventaja de la casa al descubierto.',
      intro: 'Limbo convierte un float en un multiplicador objetivo. A diferencia de los dados, el resultado depende de la ventaja de la casa del operador, así que Faircheck la expone como una entrada en lugar de ocultarla: ajústala al valor de tu casino (1% es lo estándar) y el multiplicador es totalmente reproducible.',
      howItWorks: [
        'Se extrae un float del flujo HMAC-SHA256, exactamente como en los dados.',
        'El float se convierte en un entero grande, se invierte y se escala por (1 − ventaja de la casa) para producir el punto de crash.',
        'El resultado se redondea hacia abajo a dos decimales y se limita a un mínimo de 1.00×.',
      ],
      faq: [
        ['¿Por qué tengo que introducir una ventaja de la casa?', 'La fórmula del multiplicador incorpora la ventaja del operador. La mayoría de los casinos del método Stake usan el 1% (0.01); una ventaja distinta desplaza cada multiplicador, así que debe coincidir con tu casino.'],
        ['¿Limbo es lo mismo que Crash?', 'La matemática está muy relacionada — ambos derivan un multiplicador de un único float — pero Crash redondea y anima de forma distinta según el operador. Usa el verificador de Limbo para el Limbo estilo Stake.'],
      ],
      note: 'Atención: Limbo depende de una ventaja de la casa específica del operador. Si tu resultado está desviado por un factor constante, ajústalo en el formulario para que coincida con lo que usó {casino}.',
    },
    roulette: {
      name: 'Ruleta', resultLabel: 'Casilla', tagline: 'La casilla europea de un solo cero, 0–36.',
      intro: 'La ruleta provably fair mapea un float sobre las 37 casillas de una rueda europea de un solo cero. Faircheck reproduce la casilla ganadora para que puedas confirmar que el giro lo fijaron las semillas, no la casa.',
      howItWorks: [
        'Se genera un único float en [0, 1) a partir de tus semillas.',
        'Se multiplica por 37 y se aplica el suelo (floor) para caer en una casilla del 0 al 36.',
        'El rojo/negro y el par/impar se deducen simplemente de ese número de casilla en una disposición de rueda estándar.',
      ],
      faq: [
        ['¿Rueda europea o americana?', 'El verificador del método Stake usa la rueda europea de un solo cero (0–36). La ruleta americana de doble cero es rara en los juegos originales de los casinos cripto.'],
      ],
    },
    plinko: {
      name: 'Plinko', resultLabel: 'Casilla final', tagline: 'El recorrido izquierda/derecha de la bola y su casilla final.',
      intro: 'Plinko deja caer una bola a través de un triángulo de clavos. Cada fila usa un float para decidir izquierda o derecha. Faircheck reconstruye el recorrido completo y la casilla en la que se asienta la bola, para cualquier número de filas de 8 a 16.',
      howItWorks: [
        'Se extrae un float por fila (de 8 a 16 floats en total, según el nivel de riesgo).',
        'Un float por debajo de 0.5 envía la bola a la izquierda; en caso contrario, a la derecha.',
        'La casilla final es el número de movimientos a la derecha: ese índice selecciona el multiplicador de pago en el tablero.',
      ],
      faq: [
        ['¿Cuántas filas debo elegir?', 'Depende del tablero que jugaste — las filas de Stake van de 8 (bajo) a 16 (alto). El recorrido solo coincide si el número de filas coincide con tu apuesta.'],
      ],
    },
    mines: {
      name: 'Mines (Minas)', resultLabel: 'Minas', tagline: 'Cuáles de las 25 casillas eran minas.',
      intro: 'Mines esconde bombas en una cuadrícula de 5×5. Las posiciones de las minas se extraen de tus semillas antes de que hagas clic en nada. Faircheck revela exactamente qué casillas (0–24) tenían mina, para que puedas confirmar que nada se movió mientras jugabas.',
      howItWorks: [
        'Se extrae un float por mina del flujo HMAC-SHA256.',
        'Cada float elige una casilla de las casillas restantes sin minar (un barajar y seleccionar), garantizando posiciones distintas.',
        'El conjunto completo de minas queda fijado en el momento de la apuesta: hacer clic en una casilla segura nunca reubica una mina.',
      ],
      faq: [
        ['¿Cómo se numeran las casillas?', 'De izquierda a derecha, de arriba abajo: la casilla superior izquierda es 0 y la inferior derecha es 24.'],
      ],
    },
    keno: {
      name: 'Keno', resultLabel: 'Números sorteados', tagline: 'Los 10 números sorteados de entre 40.',
      intro: 'Keno sortea diez números de un campo de cuarenta. Faircheck reproduce el sorteo exacto a partir de tus semillas para que puedas cotejar los números con los que elegiste.',
      howItWorks: [
        'Se extraen diez floats del flujo HMAC-SHA256.',
        'Cada float selecciona una casilla del grupo restante de cuarenta, produciendo diez números distintos.',
        'El sorteo es idéntico para todos los que tengan el mismo par de semillas y nonce.',
      ],
      faq: [
        ['¿Numeración?', 'Las casillas se numeran del 1 al 40. Faircheck las devuelve ordenadas para facilitar la comparación.'],
      ],
    },
    wheel: {
      name: 'Wheel (Ruleta de premios)', resultLabel: 'Segmento', tagline: 'El segmento ganador de la ruleta.',
      intro: 'Wheel gira hasta uno de N segmentos iguales. Faircheck mapea tu float sobre la ruleta que realmente jugaste: ajusta el número de segmentos y el índice ganador es reproducible.',
      howItWorks: [
        'Se genera un único float en [0, 1).',
        'Se multiplica por el número de segmentos y se aplica el suelo (floor) para elegir el índice ganador.',
        'Los niveles de riesgo cambian cuántos segmentos y qué multiplicadores hay en la ruleta, así que el número de segmentos debe coincidir con tu apuesta.',
      ],
      faq: [
        ['¿Por qué fijar el número de segmentos?', 'Los distintos niveles de riesgo usan diferentes números de segmentos. El float es el mismo; solo cambia el mapeo.'],
      ],
      note: 'Atención: Wheel depende de un número de segmentos específico del operador. Si tu resultado no coincide, ajusta el número de segmentos en el formulario para que coincida con lo que usó {casino}.',
    },
    hilo: {
      name: 'Hi-Lo', resultLabel: 'Carta', tagline: 'La carta sorteada de una baraja de 52 cartas.',
      intro: 'Hi-Lo pregunta si la siguiente carta es más alta o más baja. Cada carta es un único float sobre una baraja de 52 cartas. Faircheck revela la carta exacta para que puedas verificar la secuencia sobre la que apostaste.',
      howItWorks: [
        'Se extrae un float por carta del flujo HMAC-SHA256.',
        'El float se multiplica por 52 y se aplica el suelo (floor) para obtener un índice del 0 al 51.',
        'El índice se mapea a un valor (A→K) y un palo (♦♣♥♠) en la ordenación estándar de Stake.',
      ],
      faq: [
        ['¿Qué orden de cartas?', 'Los valores van As, 2…10, J, Q, K; los palos van diamantes, tréboles, corazones, picas — la ordenación que usan los juegos del método Stake.'],
      ],
    },
    crash: {
      name: 'Crash', resultLabel: 'Multiplicador', tagline: 'El multiplicador de crash de la ronda, a partir del hash del juego.',
      intro: 'Crash es multijugador: un único multiplicador compartido por ronda, derivado del hash de esa ronda, no de tu semilla del servidor y nonce personales. Faircheck recalcula el punto de crash exacto a partir del hash que el casino publicó, con la ventaja de la casa al descubierto.',
      howItWorks: [
        'Antes de la ronda, el casino se compromete con un hash; cuando la ronda termina, ese hash (su posición en una cadena de hashes pública) se revela.',
        'Una porción de 13 dígitos hexadecimales del hash se convierte en un entero h, y el punto de crash es floor((100·2^52 − h) / (2^52 − h)) / 100.',
        'Una pequeña fracción de las rondas — aproximadamente la ventaja de la casa, p. ej. 1 de cada 101 al 1% — estalla instantáneamente en 1.00×; ahí es donde vive la ventaja de la casa.',
      ],
      faq: [
        ['¿Por qué un hash del juego y no una semilla del servidor y un nonce?', 'Crash es un único juego compartido por todos en la ronda, así que no puede depender de la semilla del cliente de ningún jugador concreto. Toda la ronda queda fijada por un único hash con el que el casino se compromete de antemano.'],
        ['Mi casino usa un salt — ¿qué es?', 'Algunos operadores aplican HMAC al hash de la ronda con un salt público (a menudo un futuro hash de bloque de Bitcoin) antes de calcular el multiplicador. Pégalo en el campo Salt opcional; en caso contrario, déjalo vacío.'],
      ],
      note: 'Atención: Crash incorpora la ventaja de la casa de {casino} en la fórmula mediante una probabilidad de estallido instantáneo. Si tu resultado no coincide, ajusta la ventaja de la casa al valor de tu casino (el 1% es lo estándar).',
    },
  },

  // Per-casino localized blurb. slug/name/year/games live in lib/casinos.js.
  casinos: {
    stake: 'El creador del moderno modelo de semilla/nonce; su especificación abierta de provably fair es la que la mayoría de los demás casinos copiaron al pie de la letra.',
    'stake-us': 'El sitio hermano de casino social de Stake en EE. UU., que ejecuta los mismos juegos originales provably fair y la misma verificación HMAC-SHA256.',
    'bc-game': 'Un gran casino cripto cuyos juegos originales propios usan el esquema idéntico de semilla del servidor, semilla del cliente y nonce.',
    shuffle: 'Un casino cripto más reciente construido en torno a juegos originales estilo Stake con verificación estándar de par de semillas.',
    rollbit: 'Casino cripto y plataforma de trading; sus juegos originales de dice, plinko y limbo siguen el método HMAC-SHA256.',
    roobet: 'Popular casino cripto cuyos juegos originales exponen una semilla del servidor rotable y un nonce que se incrementa.',
    gamdom: 'Uno de los casinos cripto más veteranos, con juegos originales provably fair verificables a partir del par de semillas revelado.',
    trustdice: 'Casino cripto centrado en los dados con un conjunto completo de juegos originales provably fair sobre el modelo estándar.',
    'chips-gg': 'Casino social cripto que ofrece juegos originales estilo Stake y equidad comprobable por par de semillas.',
    duelbits: 'Casino cripto y casa de apuestas de esports; sus juegos originales se verifican mediante el esquema de semilla/nonce HMAC-SHA256.',
    rainbet: 'Casino cripto moderno con juegos originales provably fair y un flujo de verificación público.',
    'wild-io': 'Casino cripto cuyos juegos originales exponen semilla del servidor, semilla del cliente y nonce para comprobaciones independientes.',
    metaspins: 'Casino cripto con juegos originales estilo Stake verificables una vez revelada la semilla del servidor.',
    jackbit: 'Casino cripto y casa de apuestas que ofrece juegos originales provably fair sobre el modelo estándar de semillas.',
    flush: 'Casino cripto con juegos originales provably fair HMAC-SHA256 y semillas rotables.',
    'bets-io': 'Casino cripto cuyos juegos propios publican el par de semillas y el nonce para su verificación.',
    '500-casino': 'Casino cripto de larga trayectoria (antes CSGO500) con juegos originales provably fair sobre el modelo de semilla/nonce.',
    betfury: 'Casino cripto con una gran biblioteca de juegos originales verificables a partir de las semillas del servidor y del cliente.',
    nanogames: 'Casino cripto con juegos originales rápidos y equidad comprobable estándar HMAC-SHA256.',
    empire: 'Casino cripto y de skins cuyos juegos originales siguen el esquema provably fair por par de semillas.',
    csgoroll: 'Sitio basado en skins con juegos originales provably fair que puedes recalcular a partir de las semillas reveladas.',
    clash: 'Sitio de cajas y juegos originales que expone semilla del servidor, semilla del cliente y nonce para su verificación.',
    primedice: 'El clásico sitio de dados hermano de Stake — el juego que popularizó la equidad comprobable de semilla/nonce.',
    bitsler: 'Veterano casino cripto de dados con dice, ruleta y limbo provably fair.',
    windice: 'Casino cripto de dados con juegos originales provably fair sobre el modelo estándar.',
    luckybird: 'Casino cripto social con juegos originales estilo Stake y pares de semillas rotables.',
    weiss: 'Casino cripto centrado en la privacidad que ofrece juegos originales provably fair sobre el modelo de semilla/nonce.',
    leebet: 'Casino cripto más reciente con juegos originales provably fair HMAC-SHA256.',
    justbit: 'Casino cripto cuyos juegos originales se verifican a partir de las semillas del servidor y del cliente reveladas.',
    mystake: 'Casino cripto y fiat con juegos originales provably fair sobre el modelo estándar.',
    fairspin: 'Casino blockchain con juegos originales provably fair verificables a partir del par de semillas.',
    'crypto-games': 'Casino multidivisa de larga trayectoria con dice y juegos originales provably fair sencillos y bien documentados.',
  },
};

export default C;
