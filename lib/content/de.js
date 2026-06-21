// German content — mirrors the English source structure exactly
// (same keys, same {tokens}); only the string VALUES are translated.

const C = {
  ui: {
    nav: { casinos: 'Casinos', games: 'Spiele', how: 'So funktioniert es' },
    tagline: 'provably-fair',
    footer: {
      about: 'Ein unabhängiger, offener Verifizierer für provably-fair Casinospiele (nachweislich fair). Wir berechnen Ergebnisse neu — wir betreiben, hosten oder nehmen keine Wetten an.',
      verify: 'Verifizieren', learn: 'Lernen',
      lVerifier: 'Universal-Verifizierer', lByGame: 'Nach Spiel', lByCasino: 'Nach Casino', lHow: 'So funktioniert provably fair',
      legal: '{name} ist ein Informationswerkzeug, kein Glücksspielbetreiber. Es ist mit keinem auf dieser Seite genannten Casino verbunden, wird von keinem unterstützt oder gesponsert, und es verlinkt oder bewirbt keinen Betreiber. Namen und Spielmechaniken werden ausschließlich zu Verifizierungs- und Bildungszwecken referenziert. Glücksspiel birgt finanzielle Risiken und ist altersbeschränkt (18+/21+ je nach Rechtsraum); manche Formen des Online-Glücksspiels sind in bestimmten Ländern illegal — prüfe deine lokale Gesetzgebung.',
      network: 'Ein {link}-Projekt · vollständig in deinem Browser berechnet.',
    },
    verifier: {
      form: 'Verifizierungsformular', loadExample: 'Beispiel laden',
      serverSeed: 'Server-Seed — offengelegt / ungehasht',
      serverSeedPh: 'z. B. 3f1a9c… (der Seed, den das Casino ANZEIGT, nachdem du die Seeds rotiert hast)',
      clientSeed: 'Client-Seed', clientSeedPh: 'dein Client-Seed',
      nonce: 'Nonce', noncePh: 'Wettnummer, z. B. 1',
      gameHash: 'Spiel-Hash — Hash des Rundenergebnisses',
      gameHashPh: 'der Hash der Runde, z. B. 0a1b2c… (hex)',
      salt: 'Salt (optional)',
      saltPh: 'öffentlicher Salt, falls dein Casino den Hash per HMAC verschlüsselt',
      optional: 'Optional · Prüfung des Vorab-Commitment-Hashes',
      hashDesc: 'Füge den gehashten Server-Seed ein, den das Casino vor der Wette veröffentlicht hat. Faircheck bestätigt, dass der SHA-256 deines offengelegten Seeds damit übereinstimmt — der Beweis, dass der Seed im Voraus festgelegt wurde.',
      hashPh: 'gehashter Server-Seed (64-stelliger SHA-256-Hex)',
      errServer: 'Füge den offengelegten (ungehashten) Server-Seed ein.',
      errClient: 'Füge den Client-Seed ein.',
      errNonce: 'Nonce muss eine ganze Zahl ≥ 0 sein.',
      errFail: 'Berechnung fehlgeschlagen.',
      verify: '{game}-Ergebnis verifizieren', computing: 'Berechne…',
      privacy: '100 % in deinem Browser · Seeds verlassen diese Seite nie',
      hashOk: '✓ Hash verifiziert', hashBad: '✗ Hash stimmt nicht überein',
      expected: 'erwartet', got: 'sha256()',
      copyLink: '⧉ Verifizierungslink kopieren', copied: '✓ Link kopiert',
      showRaw: 'Rohes kryptografisches Material anzeigen',
      hmacMsg: 'HMAC-Nachricht #{n}', bytesUsed: 'verwendete Bytes', floats: 'Floats',
    },
  },

  home: {
    metaTitle: 'Faircheck — Provably-Fair Verifizierer für Krypto-Casinos',
    metaDesc: 'Füge Server-Seed, Client-Seed und Nonce ein und berechne jedes Krypto-Casino-Ergebnis selbst neu — Dice, Limbo, Mines, Plinko, Roulette, Keno, Wheel und Hi-Lo. 100 % im Browser, ohne Login.',
    kicker: 'Unabhängig · offen · clientseitig',
    h1a: 'Verifiziere dein Casino-Ergebnis.', h1b: 'Beweise, dass es fair war.',
    lead: 'Füge deinen Server-Seed, Client-Seed und Nonce ein. Faircheck berechnet das exakte Ergebnis mit derselben HMAC-SHA256-Mathematik neu, die das Casino verwendet hat — so kannst du Dice, Limbo, Mines, Plinko, Roulette, Keno, Wheel und Hi-Lo selbst prüfen. Nichts verlässt deinen Browser.',
    chips: ['{n}+ Casinos', '{m} Spiele', 'ohne Login', 'kein Seed-Logging'],
    howKicker: 'Die Methode', howH2: 'Drei Eingaben, ein nachweisbares Ergebnis',
    steps: [
      ['Commit', 'Vor der Wette zeigt das Casino den SHA-256-Hash eines geheimen Server-Seeds. Er ist nun festgelegt — er kann sich nicht mehr ändern.'],
      ['Wette', 'Dein Ergebnis ist HMAC-SHA256(server seed, `client seed:nonce:round`), in einen Float umgewandelt und dann auf das Spiel abgebildet. Du kontrollierst den Client-Seed.'],
      ['Offenlegen & verifizieren', 'Rotiere deine Seeds, um den Server-Seed offenzulegen. Faircheck hasht ihn, um ihn mit dem Commitment abzugleichen, und berechnet jeden Wurf neu.'],
    ],
    fullExplainer: 'Vollständige Erklärung →',
    gamesKicker: 'Nach Spiel', gamesH2: 'Wähle ein Spiel zum Verifizieren', allGames: 'Alle Spiele →',
    casinosKicker: 'Nach Casino', casinosH2: '{n} Casinos, ein Algorithmus', allCasinos: 'Alle Casinos →',
    faqKicker: 'FAQ', faqH2: 'Fragen',
    faq: [
      ['Was ist ein provably-fair Verifizierer?', 'Ein Werkzeug, das ein Casino-Spielergebnis aus seinen öffentlichen Eingaben neu berechnet — dem Server-Seed, deinem Client-Seed und der Nonce — damit du bestätigen kannst, dass das Ergebnis vor der Wette feststand und nie verändert wurde. Faircheck macht das vollständig in deinem Browser.'],
      ['Muss ich Faircheck vertrauen?', 'Nein. Die Verifizierung ist reine Mathematik (HMAC-SHA256), die lokal auf deinem Gerät läuft. Deine Seeds werden nie irgendwohin gesendet. Du kannst den offenen Algorithmus lesen und sogar dieselbe Berechnung selbst durchführen.'],
      ['Welche Casinos werden abgedeckt?', 'Jedes Casino mit der „Stake-Methode“ — dem HMAC-SHA256-Seed/Nonce-Schema, das von {n}+ Krypto-Casinos verwendet wird, darunter Stake, BC.Game, Roobet, Shuffle und Rollbit. Die Mathematik ist identisch; nur die Menüs zur Seed-Rotation unterscheiden sich.'],
      ['Mein Ergebnis stimmt nicht überein — betrügt das Casino?', 'Meist liegt es an einem Seed- oder Nonce-Fehler: Stelle sicher, dass du dein Seed-Paar rotiert hast, sodass der Server-Seed offengelegt (ungehasht) ist, und dass die Nonce genau die Wettnummer ist. Bei Limbo/Wheel müssen außerdem der Hausvorteil oder die Segmentanzahl des Betreibers übereinstimmen. Eine echte Abweichung bei korrekten Eingaben ist das Warnsignal, das einen Screenshot wert ist.'],
    ],
  },

  how: {
    metaTitle: 'So funktioniert Provably Fair — Server-Seed, Client-Seed & Nonce erklärt',
    metaDesc: 'Ein verständlicher Leitfaden zum provably-fair Glücksspiel: Server-Seeds, Client-Seeds, Nonces, HMAC-SHA256 und wie du jedes Ergebnis selbst verifizierst.',
    kicker: 'Die Methode', h1: 'So funktioniert provably fair',
    lead: 'Provably-fair Glücksspiel (nachweislich fair) lässt dich mit Kryptografie statt Vertrauen prüfen, dass ein Ergebnis vor deiner Wette feststand und danach nie manipuliert wurde. Hier ist die ganze Idee in fünf Minuten.',
    s1h: '1. Das Commitment',
    s1p: 'Vor jeder Wette erzeugt das Casino einen geheimen Server-Seed und zeigt dir nur dessen SHA-256-Hash. Ein Hash ist ein einseitiger Fingerabdruck: Du kannst ihn nicht umkehren, um den Seed zu finden, aber sobald der Seed offengelegt ist, kann jeder ihn hashen und die Übereinstimmung bestätigen. Indem das Casino den Hash zuerst veröffentlicht, legt es sich selbst fest — es kann keinen anderen Server-Seed mehr wählen, sobald es sieht, wie du wettest.',
    s2h: '2. Deine Eingabe',
    s2p: 'Du gibst einen Client-Seed an (den du jederzeit ändern kannst) und jede Wette trägt eine hochzählende Nonce. Weil du den Client-Seed beeinflusst, kann das Casino kein Ergebnis vorberechnet haben, das es allein kontrolliert.',
    s3h: '3. Die Ziehung', s3p: 'Das Ergebnis wird deterministisch erzeugt:',
    s3p2: 'Diese Bytes werden in 4-Byte-Gruppen aufgeteilt und in Floats im Bereich [0, 1) umgewandelt. Jedes Spiel bildet die Floats dann auf ein Ergebnis ab — einen Würfelwurf, einen Crash-Multiplikator, eine Reihe von Minenfeldern und so weiter. Gleiche Eingaben, gleiches Ergebnis, jedes Mal.',
    s4h: '4. Die Offenlegung',
    s4p: 'Wenn du dein Seed-Paar rotierst, legt das Casino den alten Server-Seed im Klartext offen. Jetzt kannst du zwei Prüfungen durchführen: den offengelegten Seed hashen und bestätigen, dass er dem Commitment aus Schritt 1 entspricht, und jedes Ergebnis neu berechnen, um zu bestätigen, dass das Casino sie ehrlich gemeldet hat. Genau das macht der Faircheck-Verifizierer — lokal, in deinem Browser, sodass deine Seeds dein Gerät nie verlassen.',
    s5h: 'Warum es bei den meisten Casinos gleich ist',
    s5p: 'Stake hat dieses Schema veröffentlicht und es wurde zum De-facto-Standard. Die {n}+ Casinos, die Faircheck unterstützt, verwenden die identische HMAC-SHA256-Byte-zu-Float-Methode; nur die Menüs zum Rotieren der Seeds unterscheiden sich. Deshalb kann ein Verifizierer sie alle prüfen.',
    faqH2: 'FAQ',
    faq: [
      ['Ist provably fair dasselbe wie „fair“?', 'Nein. Es beweist, dass das Casino das Ergebnis nach deiner Wette nicht ändern konnte — es ändert nicht den Hausvorteil. Ein provably-fair Spiel kann immer noch zugunsten des Hauses gestaltet sein; es kann nur nicht über das erzeugte Ergebnis lügen.'],
      ['Kann das Casino trotzdem betrügen?', 'Nicht beim Ergebnis selbst, solange es sich vor der Wette auf den gehashten Server-Seed festlegt und du nach dessen Offenlegung verifizierst. Das verbleibende Vertrauen besteht darin, dass das Commitment, das du gesehen hast, wirklich vor dem Spiel gezeigt wurde — deshalb solltest du einen Screenshot des gehashten Seeds machen.'],
      ['Was ist eine Nonce?', 'Ein Zähler, der für jede Wette mit demselben Server-/Client-Seed-Paar um eins steigt. Er garantiert, dass jede Wette aus denselben Seeds ein anderes Ergebnis erzeugt.'],
    ],
    ctaH: 'Bereit, eine Wette zu prüfen?', ctaP: 'Öffne den Universal-Verifizierer und füge deine Seeds ein.', ctaBtn: 'Verifizierer öffnen',
    linkVerifier: 'der Faircheck-Verifizierer',
  },

  gamesIndex: {
    metaTitle: 'Provably-Fair Spiele — Dice, Limbo, Mines, Plinko & mehr',
    metaDesc: 'Verifiziere Dice, Limbo, Mines, Plinko, Roulette, Keno, Wheel und Hi-Lo. Jedes Spiel erklärt, mit kostenlosem In-Browser-Verifizierer und der exakten Formel.',
    kicker: 'Nach Spiel', h1: 'Provably-fair Spiele',
    lead: 'Jedes Spiel verwandelt denselben HMAC-SHA256-Seed-Stream auf andere Weise in ein Ergebnis. Wähle eines aus, um zu lesen, wie es funktioniert, und verifiziere ein Ergebnis gegen jedes der {n} unterstützten Casinos.',
  },

  casinosIndex: {
    metaTitle: 'Krypto-Casinos, die wir verifizieren — Stake, BC.Game, Roobet & mehr',
    metaDesc: 'Provably-fair Verifizierung für {n}+ Krypto-Casinos — Stake, BC.Game, Roobet, Shuffle, Rollbit und mehr. Berechne jedes Original-Spielergebnis in deinem Browser neu.',
    kicker: 'Nach Casino', h1: 'Casinos, die wir verifizieren',
    lead: 'Diese {n} Krypto-Casinos verwenden dasselbe HMAC-SHA256 provably-fair Schema der „Stake-Methode“, sodass Faircheck ihre {m} Originale aus dem Seed-Paar und der Nonce reproduziert, die du bereits hast.',
    gamesLine: '{n} Spiele · Seed/Nonce',
  },

  gamePage: {
    breadcrumb: 'Spiele',
    h1: '{game} verifizieren',
    algoKicker: 'Wie {game} erzeugt wird', algoH2: 'Der Algorithmus',
    faqH2: 'FAQ',
    perCasinoKicker: 'Pro Casino', perCasinoH2: 'Verifiziere {game} in deinem Casino',
    perCasinoDesc: 'Die Mathematik ist überall dieselbe, aber jede Seite ist darauf abgestimmt, wie das jeweilige Casino seine Seeds offenlegt.',
    otherGames: 'Andere Spiele',
    metaTitle: '{game} verifizieren — Provably-Fair Checker',
    metaDesc: 'Kostenloser provably-fair {game}-Verifizierer. {intro}',
  },

  casinoPage: {
    breadcrumb: 'Casinos',
    h1: '{casino}-Verifizierer',
    engineLine: 'Engine: {engine} · gegründet {year} · {n} verifizierbare Spiele',
    howKicker: 'So verifizierst du bei {casino}', howH2: 'Lege deinen Seed offen, dann berechne neu',
    howP1: 'Öffne das provably-fair oder Fairness-Panel in deinem {casino}-Konto und rotiere dein Seed-Paar. Dies legt den vorherigen Server-Seed im Klartext offen und zeigt den SHA-256-Hash, auf den er vor deinen Wetten festgelegt wurde.',
    howP2: 'Füge diesen offengelegten Server-Seed, deinen Client-Seed und die Nonce der Wette in das obige Formular ein. {engine}',
    howP3: 'Faircheck hasht deinen offengelegten Seed, um zu bestätigen, dass er mit dem Vorab-Commitment übereinstimmt, und reproduziert dann das exakte Ergebnis — alles lokal, sodass deine Seeds die Seite nie verlassen.',
    gamesKicker: '{casino}-Spiele', gamesH2: 'Ein bestimmtes Spiel verifizieren',
    otherCasinos: 'Andere Casinos',
    metaTitle: '{casino} Provably-Fair Verifizierer',
    metaDesc: 'Verifiziere {casino}-Ergebnisse unabhängig. Berechne Dice, Limbo, Mines und mehr aus deinem Server-Seed, Client-Seed und Nonce neu — kostenlos, in deinem Browser.',
  },

  casinoGamePage: {
    h1: '{casino} {game}-Verifizierer',
    lead: 'Prüfe jede {casino}-{game}-Wette unabhängig. {intro}',
    stepKicker: 'Schritt für Schritt bei {casino}', stepH2: 'So verifizierst du {casino} {game}',
    steps: [
      ['Lege den Seed offen.', 'Öffne {casino}s provably-fair Panel und rotiere dein Seed-Paar — dies legt den vorherigen Server-Seed offen und zeigt den SHA-256-Hash, auf den er vor deiner Wette festgelegt wurde.'],
      ['Finde die Nonce.', 'Jede Wette auf einem Seed-Paar hat eine hochzählende Nonce. Verwende die Nonce genau der {game}-Runde, die du prüfen möchtest.'],
      ['Einfügen & verifizieren.', 'Füge Server-Seed, Client-Seed und Nonce in das obige Formular ein. Faircheck berechnet das {label} neu und bestätigt, dass der Seed-Hash übereinstimmt.'],
    ],
    formulaH2: 'Die {game}-Formel',
    faqH2: '{game}-Verifizierung FAQ',
    moreGames: 'Mehr {casino}-Spiele', gameOnOthers: '{game} bei anderen Casinos',
    metaTitle: '{casino} {game}-Verifizierer — Provably Fair',
    metaDesc: 'Verifiziere {casino}-{game}-Ergebnisse selbst. Berechne das {label} aus deinem Server-Seed, Client-Seed und Nonce mit der exakten HMAC-SHA256-Mathematik neu. Kostenlos, im Browser, ohne Login.',
  },

  notFound: {
    metaTitle: 'Nicht gefunden',
    kicker: '404', h1: 'Hier gibt es nichts zu verifizieren', lead: 'Diese Seite existiert nicht. Geh zurück zum Verifizierer.',
    cta1: 'Universal-Verifizierer', cta2: 'Casinos durchsuchen',
  },

  // Stake-method engine summary, reused across pages.
  engineSummary: 'Bytes aus HMAC-SHA256(serverSeed, `clientSeed:nonce:round`), in Floats umgewandelt und pro Spiel abgebildet. Der Server-Seed wird vor der Wette als SHA-256-Hash festgelegt und offengelegt, wenn du die Seeds rotierst.',

  // Per-game localized content. `name` + `resultLabel` are display strings; `slug` and
  // `formula` live in lib/games-meta.js (language-neutral).
  games: {
    dice: {
      name: 'Dice (Würfel)', resultLabel: 'Wurf', tagline: 'Der 0.00–100.00-Wurf, aus deinen Seeds neu berechnet.',
      intro: 'Dice ist das einfachste provably-fair Spiel: Ein einzelner Float treibt einen Wurf zwischen 0.00 und 100.00 an. Faircheck erzeugt genau diesen Float aus deinem Server-Seed, Client-Seed und Nonce neu, sodass du bestätigen kannst, dass der vom Casino gezeigte Wurf der einzig mögliche war.',
      howItWorks: [
        'Ein einzelner 4-Byte-Float wird aus dem HMAC-SHA256-Byte-Stream entnommen, der mit deinem Server-Seed verschlüsselt ist.',
        'Der Float (eine Zahl in [0, 1)) wird mit 10001 multipliziert und abgerundet, dann durch 100 geteilt, um einen Wurf mit zwei Dezimalstellen zwischen 0.00 und 100.00 zu ergeben.',
        'Da der Server-Seed vor der Wette als SHA-256-Hash festgelegt wurde, konnte der Betreiber ihn nicht ändern, nachdem er deinen Client-Seed oder deine Nonce gesehen hatte.',
      ],
      faq: [
        ['Warum 10001 und nicht 10000?', 'Die Multiplikation mit 10001 macht nach dem Abrunden jeden Wurf von 0.00 bis einschließlich 100.00 gleich wahrscheinlich — mit 10000 wäre 100.00 unerreichbar.'],
        ['Mein Wurf stimmt nicht überein. Was nun?', 'Prüfe die Nonce (sie steigt mit jeder Wette um eins) und ob du den UNGEHASHTEN Server-Seed eingefügt hast, den das Casino nach dem Rotieren deines Seed-Paars offengelegt hat. Ein einziges falsches Zeichen ändert alles.'],
      ],
    },
    limbo: {
      name: 'Limbo', resultLabel: 'Multiplikator', tagline: 'Der Crash-artige Ziel-Multiplikator, mit offengelegtem Hausvorteil.',
      intro: 'Limbo verwandelt einen Float in einen Ziel-Multiplikator. Anders als bei Dice hängt das Ergebnis vom Hausvorteil des Betreibers ab, daher legt Faircheck diesen als Eingabe offen, statt ihn zu verbergen — stelle ihn auf den Wert deines Casinos ein (1 % ist Standard) und der Multiplikator ist vollständig reproduzierbar.',
      howItWorks: [
        'Ein Float wird aus dem HMAC-SHA256-Stream gezogen, genau wie bei Dice.',
        'Der Float wird in eine große Ganzzahl umgewandelt, invertiert und mit (1 − Hausvorteil) skaliert, um den Crash-Punkt zu erzeugen.',
        'Das Ergebnis wird auf zwei Dezimalstellen abgerundet und auf ein Minimum von 1.00× begrenzt.',
      ],
      faq: [
        ['Warum muss ich einen Hausvorteil eingeben?', 'Die Multiplikator-Formel bezieht den Vorteil des Betreibers ein. Die meisten Casinos der Stake-Methode verwenden 1 % (0.01); ein anderer Vorteil verschiebt jeden Multiplikator, daher muss er zu deinem Casino passen.'],
        ['Ist Limbo dasselbe wie Crash?', 'Die Mathematik ist eng verwandt — beide leiten einen Multiplikator aus einem einzelnen Float ab — aber Crash rundet und animiert je nach Betreiber anders. Verwende den Limbo-Verifizierer für Limbo im Stake-Stil.'],
      ],
      note: 'Achtung: Limbo hängt von einem betreiberspezifischen Hausvorteil ab. Wenn dein Ergebnis um einen konstanten Faktor abweicht, passe ihn im Formular an den von {casino} verwendeten Wert an.',
    },
    roulette: {
      name: 'Roulette', resultLabel: 'Fach', tagline: 'Das europäische Single-Zero-Fach, 0–36.',
      intro: 'Provably-fair Roulette bildet einen Float auf die 37 Fächer eines europäischen Single-Zero-Rads ab. Faircheck reproduziert das Gewinnerfach, sodass du bestätigen kannst, dass der Spin durch die Seeds bestimmt wurde, nicht durch das Haus.',
      howItWorks: [
        'Ein einzelner Float in [0, 1) wird aus deinen Seeds erzeugt.',
        'Er wird mit 37 multipliziert und abgerundet, um auf einem Fach von 0 bis 36 zu landen.',
        'Rot/Schwarz und Gerade/Ungerade ergeben sich einfach aus dieser Fachnummer auf einem Standard-Radlayout.',
      ],
      faq: [
        ['Europäisches oder amerikanisches Rad?', 'Der Verifizierer der Stake-Methode verwendet das europäische Single-Zero-Rad (0–36). Amerikanisches Double-Zero-Roulette ist bei Krypto-Casino-Originalen selten.'],
      ],
    },
    plinko: {
      name: 'Plinko', resultLabel: 'Zielfach', tagline: 'Der Links/Rechts-Pfad der Kugel und das Endfach.',
      intro: 'Plinko lässt eine Kugel durch ein Dreieck aus Stiften fallen. Jede Reihe verwendet einen Float, um links oder rechts zu entscheiden. Faircheck rekonstruiert den vollständigen Pfad und das Fach, in dem die Kugel landet, für jede Reihenzahl von 8 bis 16.',
      howItWorks: [
        'Pro Reihe wird ein Float gezogen (insgesamt 8 bis 16 Floats, je nach Risikostufe).',
        'Ein Float unter 0.5 schickt die Kugel nach links, andernfalls nach rechts.',
        'Das Zielfach ist die Anzahl der Rechtsbewegungen — dieser Index wählt den Auszahlungs-Multiplikator auf dem Brett.',
      ],
      faq: [
        ['Wie viele Reihen sollte ich wählen?', 'Das hängt von dem Brett ab, das du gespielt hast — Stakes Reihen reichen von 8 (niedrig) bis 16 (hoch). Der Pfad stimmt nur überein, wenn die Reihenzahl zu deiner Wette passt.'],
      ],
    },
    mines: {
      name: 'Mines', resultLabel: 'Minenfelder', tagline: 'Welche der 25 Felder Minen waren.',
      intro: 'Mines versteckt Bomben auf einem 5×5-Raster. Die Minenpositionen werden aus deinen Seeds gezogen, bevor du irgendwas anklickst. Faircheck legt genau offen, welche Felder (0–24) vermint waren, sodass du bestätigen kannst, dass sich beim Spielen nichts verschoben hat.',
      howItWorks: [
        'Pro Mine wird ein Float aus dem HMAC-SHA256-Stream gezogen.',
        'Jeder Float wählt ein Feld aus den verbleibenden unverminten Feldern (Mischen und Auswählen) und garantiert so unterschiedliche Positionen.',
        'Die vollständige Menge der Minenfelder steht zum Zeitpunkt der Wette fest — das Anklicken eines sicheren Feldes verschiebt nie eine Mine.',
      ],
      faq: [
        ['Wie sind die Felder nummeriert?', 'Von links nach rechts, von oben nach unten: das Feld oben links ist 0, das unten rechts ist 24.'],
      ],
    },
    keno: {
      name: 'Keno', resultLabel: 'Gezogene Zahlen', tagline: 'Die 10 aus 40 gezogenen Zahlen.',
      intro: 'Keno zieht zehn Zahlen aus einem Feld von vierzig. Faircheck reproduziert die exakte Ziehung aus deinen Seeds, sodass du die Zahlen mit den von dir gewählten vergleichen kannst.',
      howItWorks: [
        'Zehn Floats werden aus dem HMAC-SHA256-Stream gezogen.',
        'Jeder Float wählt ein Feld aus dem verbleibenden Pool von vierzig und erzeugt so zehn unterschiedliche Zahlen.',
        'Die Ziehung ist für jeden identisch, der dasselbe Seed-Paar und dieselbe Nonce hat.',
      ],
      faq: [
        ['Nummerierung?', 'Die Felder sind von 1 bis 40 nummeriert. Faircheck gibt sie sortiert zurück, um den Vergleich zu erleichtern.'],
      ],
    },
    wheel: {
      name: 'Wheel (Glücksrad)', resultLabel: 'Segment', tagline: 'Das Gewinnsegment des Rads.',
      intro: 'Wheel dreht sich zu einem von N gleichen Segmenten. Faircheck bildet deinen Float auf das Rad ab, das du tatsächlich gespielt hast — stelle die Segmentanzahl ein und der Gewinnindex ist reproduzierbar.',
      howItWorks: [
        'Ein einzelner Float in [0, 1) wird erzeugt.',
        'Er wird mit der Anzahl der Segmente multipliziert und abgerundet, um den Gewinnindex zu wählen.',
        'Risikostufen ändern, wie viele Segmente und welche Multiplikatoren auf dem Rad sitzen, daher muss die Segmentanzahl zu deiner Wette passen.',
      ],
      faq: [
        ['Warum die Segmentanzahl einstellen?', 'Verschiedene Risikostufen verwenden unterschiedliche Segmentanzahlen. Der Float ist derselbe; nur die Abbildung ändert sich.'],
      ],
      note: 'Achtung: Wheel hängt von einer betreiberspezifischen Segmentanzahl ab. Wenn dein Ergebnis abweicht, stelle die Segmentanzahl im Formular auf den von {casino} verwendeten Wert ein.',
    },
    hilo: {
      name: 'Hi-Lo', resultLabel: 'Karte', tagline: 'Die gezogene Karte aus einem 52-Karten-Deck.',
      intro: 'Hi-Lo fragt, ob die nächste Karte höher oder niedriger ist. Jede Karte ist ein einzelner Float über ein 52-Karten-Deck. Faircheck legt die exakte Karte offen, sodass du die Sequenz, auf die du gewettet hast, verifizieren kannst.',
      howItWorks: [
        'Pro Karte wird ein Float aus dem HMAC-SHA256-Stream gezogen.',
        'Der Float wird mit 52 multipliziert und auf einen Index von 0 bis 51 abgerundet.',
        'Der Index bildet auf einen Rang (A→K) und eine Farbe (♦♣♥♠) in der Standard-Stake-Reihenfolge ab.',
      ],
      faq: [
        ['Welche Kartenreihenfolge?', 'Die Ränge laufen Ass, 2…10, Bube, Dame, König; die Farben laufen Karo, Kreuz, Herz, Pik — die Reihenfolge, die Spiele der Stake-Methode verwenden.'],
      ],
    },
    crash: {
      name: 'Crash', resultLabel: 'Multiplikator', tagline: 'Der Crash-Multiplikator der Runde, aus dem Spiel-Hash.',
      intro: 'Crash ist Mehrspieler: ein einziger geteilter Multiplikator pro Runde, abgeleitet aus dem Hash dieser Runde — nicht aus deinem persönlichen Server-Seed und deiner Nonce. Faircheck berechnet den exakten Crash-Punkt aus dem vom Casino veröffentlichten Hash neu, mit offengelegtem Hausvorteil.',
      howItWorks: [
        'Vor der Runde legt sich das Casino auf einen Hash fest; wenn die Runde endet, wird dieser Hash (seine Position in einer öffentlichen Hash-Kette) offengelegt.',
        'Ein 13-stelliger Hex-Ausschnitt des Hashes wird zu einer Ganzzahl h, und der Crash-Punkt ist floor((100·2^52 − h) / (2^52 − h)) / 100.',
        'Ein kleiner Bruchteil der Runden — etwa der Hausvorteil, z. B. 1 von 101 bei 1 % — platzt sofort bei 1.00×; dort sitzt der Hausvorteil.',
      ],
      faq: [
        ['Warum ein Spiel-Hash und kein Server-Seed und keine Nonce?', 'Crash ist ein einziges Spiel, das alle in der Runde teilen, daher kann es nicht vom Client-Seed eines einzelnen Spielers abhängen. Die gesamte Runde wird durch einen Hash festgelegt, auf den sich das Casino im Voraus festlegt.'],
        ['Mein Casino verwendet einen Salt — was ist das?', 'Manche Betreiber verschlüsseln den Runden-Hash per HMAC mit einem öffentlichen Salt (oft einem zukünftigen Bitcoin-Block-Hash), bevor sie den Multiplikator berechnen. Füge ihn in das optionale Salt-Feld ein; andernfalls lass es leer.'],
      ],
      note: 'Achtung: Crash backt den Hausvorteil von {casino} über eine Sofort-Platz-Wahrscheinlichkeit in die Formel ein. Wenn dein Ergebnis abweicht, stelle den Hausvorteil auf den Wert deines Casinos ein (1 % ist Standard).',
    },
  },

  // Per-casino localized blurb. slug/name/year/games live in lib/casinos.js.
  casinos: {
    stake: 'Der Begründer des modernen Seed/Nonce-Modells; seine offene provably-fair Spezifikation ist die, die die meisten anderen Casinos wortwörtlich kopiert haben.',
    'stake-us': 'Stakes US-Social-Casino-Schwesterseite, die dieselben provably-fair Originale und dieselbe HMAC-SHA256-Verifizierung verwendet.',
    'bc-game': 'Ein großes Krypto-Casino, dessen hauseigene Originale das identische Server-Seed-, Client-Seed- und Nonce-Schema verwenden.',
    shuffle: 'Ein neueres Krypto-Casino, aufgebaut um Originale im Stake-Stil mit standardmäßiger Seed-Paar-Verifizierung.',
    rollbit: 'Krypto-Casino und Trading-Plattform; seine Dice-, Plinko- und Limbo-Originale folgen der HMAC-SHA256-Methode.',
    roobet: 'Beliebtes Krypto-Casino, dessen Original-Spiele einen rotierbaren Server-Seed und eine hochzählende Nonce offenlegen.',
    gamdom: 'Eines der älteren Krypto-Casinos, mit provably-fair Originalen, die aus dem offengelegten Seed-Paar verifizierbar sind.',
    trustdice: 'Dice-orientiertes Krypto-Casino mit einer vollständigen Auswahl an provably-fair Originalen nach dem Standardmodell.',
    'chips-gg': 'Krypto-Social-Casino, das Originale im Stake-Stil und Seed-Paar-Provable-Fairness bietet.',
    duelbits: 'Krypto-Casino und Esports-Buch; seine Originale verifizieren über das HMAC-SHA256-Seed/Nonce-Schema.',
    rainbet: 'Modernes Krypto-Casino mit provably-fair Originalen und einem öffentlichen Verifizierungsablauf.',
    'wild-io': 'Krypto-Casino, dessen Originale Server-Seed, Client-Seed und Nonce für unabhängige Prüfungen offenlegen.',
    metaspins: 'Krypto-Casino mit Originalen im Stake-Stil, verifizierbar, sobald der Server-Seed offengelegt ist.',
    jackbit: 'Krypto-Casino und Sportwettenanbieter, der provably-fair Originale nach dem Standard-Seed-Modell bietet.',
    flush: 'Krypto-Casino mit HMAC-SHA256 provably-fair Originalen und rotierbaren Seeds.',
    'bets-io': 'Krypto-Casino, dessen hauseigene Spiele das Seed-Paar und die Nonce zur Verifizierung veröffentlichen.',
    '500-casino': 'Langjähriges Krypto-Casino (ehemals CSGO500) mit provably-fair Originalen nach dem Seed/Nonce-Modell.',
    betfury: 'Krypto-Casino mit einer großen Bibliothek an Originalen, verifizierbar aus Server- und Client-Seeds.',
    nanogames: 'Krypto-Casino mit schnellen Originalen und standardmäßiger HMAC-SHA256-Provable-Fairness.',
    empire: 'Krypto- und Skin-Casino, dessen Originale dem Seed-Paar-Provably-Fair-Schema folgen.',
    csgoroll: 'Skin-basierte Seite mit provably-fair Originalen, die du aus den offengelegten Seeds neu berechnen kannst.',
    clash: 'Case- und Originale-Seite, die Server-Seed, Client-Seed und Nonce zur Verifizierung offenlegt.',
    primedice: 'Die klassische Stake-Schwesterseite für Dice — das Spiel, das die Seed/Nonce-Provable-Fairness populär gemacht hat.',
    bitsler: 'Veteranen-Krypto-Dice-Casino mit provably-fair Dice, Roulette und Limbo.',
    windice: 'Krypto-Dice-Casino mit provably-fair Originalen nach dem Standardmodell.',
    luckybird: 'Social-Krypto-Casino mit Originalen im Stake-Stil und rotierbaren Seed-Paaren.',
    weiss: 'Datenschutzorientiertes Krypto-Casino, das provably-fair Originale nach dem Seed/Nonce-Modell bietet.',
    leebet: 'Neueres Krypto-Casino mit HMAC-SHA256 provably-fair Originalen.',
    justbit: 'Krypto-Casino, dessen Originale aus den offengelegten Server- und Client-Seeds verifizieren.',
    mystake: 'Krypto- und Fiat-Casino mit provably-fair Originalen nach dem Standardmodell.',
    fairspin: 'Blockchain-Casino mit provably-fair Originalen, verifizierbar aus dem Seed-Paar.',
    'crypto-games': 'Langjähriges Multi-Coin-Casino mit einfachen, gut dokumentierten provably-fair Dice und Originalen.',
  },
};

export default C;
