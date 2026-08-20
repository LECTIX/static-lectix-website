export type ProductImage = {
  src: string;
  alt: string;
  caption: string;
};

export type ProductSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  warning?: string;
};

export type ProductContent = {
  details: ProductSection[];
  gallery: ProductImage[];
};

export const productContentByCode: Record<string, ProductContent> = {
  LEC011102: {
    details: [
      {
        title: "À quoi sert ce relais temporisé ?",
        paragraphs: [
          "Lorsque les deux bornes d’entrée sont reliées par un bouton poussoir, un ILS ou un autre contact, le relais s’enclenche pendant la durée choisie. Il revient ensuite automatiquement à sa position de repos.",
          "Ses deux contacts inverseurs permettent de commander un éclairage, un module sonore, un moteur ou un automatisme sans imposer un usage particulier.",
        ],
        bullets: [
          "allumer un éclairage pendant quelques secondes ou quelques minutes",
          "déclencher un son à la fin d’un délai",
          "commander temporairement un passage à niveau ou une animation",
          "réaliser un arrêt temporisé en gare, en analogique comme en DCC",
        ],
      },
      {
        title: "Branchement et réglage",
        paragraphs: [
          "Branchez une alimentation de 8 à 16 V, continue ou alternative, sur le bornier d’alimentation. Ce bornier n’est pas polarisé. Une alimentation de 12 V continu convient dans la plupart des installations.",
          "Reliez ensuite le contact de déclenchement aux deux bornes d’entrée. La durée se règle avec le potentiomètre bleu, à l’aide d’un petit tournevis plat.",
        ],
        warning: "Le potentiomètre est fragile : arrêtez de tourner dès qu’il arrive en butée et ne forcez jamais.",
      },
    ],
    gallery: [
      { src: "/images/details/lec011-cablage.webp", alt: "Schéma de câblage du relais temporisé", caption: "Branchement général du relais temporisé" },
      { src: "/images/details/lec011-eclairage.webp", alt: "Exemple de commande temporisée d’un éclairage", caption: "Allumer un éclairage pendant une durée déterminée" },
      { src: "/images/details/lec011-arret-dcc.webp", alt: "Exemple d’arrêt temporisé en gare en DCC", caption: "Exemple d’arrêt temporisé en gare sur un réseau DCC" },
    ],
  },
  LEC022102: {
    details: [
      {
        title: "Un relais qui garde sa position",
        paragraphs: [
          "Une courte impulsion sur l’entrée SET ou RESET suffit pour faire basculer le relais. Une fois l’impulsion terminée, le relais conserve sa position sans consommer en permanence.",
          "Cette version possède quatre contacts inverseurs indépendants. Elle est pratique lorsqu’un même événement doit commander plusieurs circuits : signalisation, coupure de voie, éclairage ou autre accessoire.",
        ],
        bullets: ["cantonnement analogique", "boucle de retournement", "passage à niveau", "ajout de contacts à un aiguillage ou à un interrupteur"],
      },
      {
        title: "Comment le commander",
        paragraphs: [
          "Reliez la borne commune au pôle négatif de l’alimentation. Placez ensuite un bouton, un ILS, une pédale de contact ou un capteur entre le pôle positif et chacune des entrées SET et RESET.",
          "Une impulsion sur RESET relie les bornes communes aux sorties R. Une impulsion sur SET les relie aux sorties S.",
        ],
        warning: "Ne mettez jamais les entrées SET et RESET sous tension en même temps.",
      },
    ],
    gallery: [
      { src: "/images/details/lec022102-reset.webp", alt: "Câblage de l’entrée RESET du relais bistable 4RT", caption: "Commande de la position RESET" },
      { src: "/images/details/lec022102-set.webp", alt: "Câblage de l’entrée SET du relais bistable 4RT", caption: "Commande de la position SET" },
      { src: "/images/details/lec022102-extension.webp", alt: "Extension de contacts avec le relais bistable 4RT", caption: "Exemple d’extension de contacts inverseurs" },
    ],
  },
  LEC022001: {
    details: [
      {
        title: "Un relais bistable pour deux circuits",
        paragraphs: [
          "Une impulsion sur l’une des deux entrées fait changer le relais de position. Il reste ensuite dans cette position, même lorsque l’impulsion est terminée.",
          "Les deux contacts inverseurs peuvent par exemple commander en même temps une zone de voie et un feu, ou compléter les contacts disponibles sur un moteur d’aiguillage.",
        ],
        bullets: ["cantonnement analogique", "boucle de retournement", "protection d’une zone", "commande d’un passage à niveau"],
      },
      {
        title: "Branchement des entrées SET et RESET",
        paragraphs: [
          "Reliez la borne commune au pôle négatif de l’alimentation. Les entrées SET et RESET reçoivent chacune une impulsion positive au moyen d’un bouton, d’un ILS ou d’un autre contact.",
          "Les sorties C, R et S correspondent aux bornes communes et aux deux positions des contacts inverseurs.",
        ],
        warning: "Les entrées SET et RESET ne doivent jamais être alimentées simultanément.",
      },
    ],
    gallery: [
      { src: "/images/details/lec022001-reset.webp", alt: "Câblage de l’entrée RESET du relais bistable 12 V", caption: "Commande de la position RESET" },
      { src: "/images/details/lec022001-set.webp", alt: "Câblage de l’entrée SET du relais bistable 12 V", caption: "Commande de la position SET" },
      { src: "/images/details/lec022001-extension.webp", alt: "Extension de contacts avec le relais bistable 12 V", caption: "Ajouter des contacts inverseurs à une commande existante" },
    ],
  },
  LEC000043: {
    details: [
      {
        title: "Détecter la présence d’un train",
        paragraphs: [
          "Le module surveille la consommation électrique d’une portion de voie isolée. Dès qu’une locomotive, un wagon éclairé, un feu de fin de convoi ou un essieu graphité consomme du courant, le relais du détecteur s’enclenche.",
          "Les deux contacts inverseurs du relais restent libres d’usage. Ils peuvent commander directement un feu, un module sonore, un automatisme ou transmettre l’information d’occupation à un autre montage.",
        ],
        bullets: ["signalisation et cantonnement", "protection d’une voie cachée", "déclenchement d’un bruitage", "commande d’un passage à niveau"],
      },
      {
        title: "Installation sur la voie",
        paragraphs: [
          "Isolez un seul rail de la zone à surveiller. Branchez l’alimentation DCC sur les bornes A et B, puis raccordez le rail isolé à l’une des bornes B DETECT. Trois fils suffisent donc pour obtenir une détection fonctionnelle.",
          "Le seuil de détection est réglable entre 1 et 10 mA. Le réglage d’origine doit normalement détecter une locomotive immobile grâce à la consommation de son décodeur.",
        ],
        warning: "Réglez le potentiomètre avec délicatesse. Pour augmenter la sensibilité, tournez dans le sens inverse des aiguilles d’une montre.",
      },
      {
        title: "Entrée FORCE et contacts du relais",
        paragraphs: [
          "En reliant les deux bornes FORCE avec un interrupteur, il est possible d’imposer l’activation du relais, même si aucun train n’est détecté.",
          "Cette fonction est utile pour tester une installation ou pour certains automatismes, par exemple la gestion d’un arrêt en gare.",
        ],
      },
    ],
    gallery: [
      { src: "/images/details/lec000043-cablage.webp", alt: "Câblage du détecteur d’occupation DCC 3 A", caption: "Câblage de base avec une zone de voie isolée" },
      { src: "/images/details/lec000043-reglage.webp", alt: "Réglage de la sensibilité du détecteur DCC 3 A", caption: "Réglage du seuil de détection" },
      { src: "/images/details/lec000043-feu.webp", alt: "Branchement d’un feu bicolore sur le détecteur DCC 3 A", caption: "Exemple de commande automatique d’un feu bicolore" },
    ],
  },
  LEC005001: {
    details: [
      {
        title: "Éclairer un bâtiment sans montage compliqué",
        paragraphs: [
          "Chaque petite carte porte une LED blanche et sa résistance de limitation. Elle peut éclairer une pièce, une maison, une gare ou un petit bâtiment complet.",
          "Le format compact permet de placer la carte derrière un plafond ou contre une paroi, sans avoir à ajouter une résistance séparée.",
        ],
      },
      {
        title: "Installation",
        paragraphs: [
          "Soudez deux fils sur les bornes + et −, puis fixez la carte dans la maquette avec une petite vis ou du ruban adhésif double face. Faites ressortir les fils sous le décor avant de les raccorder à l’alimentation.",
        ],
        bullets: ["alimentation continue uniquement", "tension comprise entre 5 et 16 V", "respecter la polarité + et −", "tester l’éclairage avant de refermer le bâtiment"],
      },
    ],
    gallery: [
      { src: "/images/details/lec005-eclairage.webp", alt: "LED LECTIX allumée", caption: "La LED produit une lumière blanche de ton froid" },
      { src: "/images/details/lec005-maison.webp", alt: "Exemple d’éclairage d’une maison miniature", caption: "Exemple d’intégration dans un bâtiment miniature" },
      { src: "/images/details/lec005-dimensions.webp", alt: "Dimensions de la carte LED LECTIX", caption: "Dimensions de la petite carte d’éclairage" },
    ],
  },
  LEC032002: {
    details: [
      {
        title: "Une navette automatique et progressive",
        paragraphs: [
          "Le module commande la marche d’un train analogique entre deux extrémités. À l’approche d’une extrémité, le train ralentit, s’arrête pendant la durée choisie, puis repart progressivement dans l’autre sens.",
          "Les extrémités peuvent être détectées par consommation de courant ou par des contacts extérieurs tels que des ILS ou des pédales de voie. Le module convient aussi à un funiculaire ou à un autre moteur à courant continu.",
        ],
        warning: "Ce module utilise un courant pulsé. Il ne convient pas aux locomotives équipées d’un décodeur DCC.",
      },
      {
        title: "Câblage de la voie",
        paragraphs: [
          "Branchez une alimentation continue de 8 à 16 V sur l’entrée du module, puis la voie sur la sortie A–B. La tension choisie doit être adaptée à vos locomotives.",
          "Pour une détection par consommation, isolez le même rail dans les deux zones d’arrêt et raccordez-les à B1 et B2. Avec des ILS, branchez les deux contacts sur ILS1 et ILS2.",
        ],
      },
      {
        title: "Réglages à effectuer",
        paragraphs: [
          "Quatre potentiomètres règlent la vitesse maximale, le temps d’arrêt, l’accélération et le freinage. Commencez avec un freinage court, puis augmentez-le progressivement afin que le train s’arrête toujours avant la fin de la voie.",
        ],
        warning: "Faites les premiers essais à faible vitesse et ne forcez jamais les potentiomètres lorsqu’ils arrivent en butée.",
      },
    ],
    gallery: [
      { src: "/images/details/lec032002-navette.webp", alt: "Câblage automatique d’une voie en navette", caption: "Navette automatique par détection de consommation" },
      { src: "/images/details/lec032002-ils.webp", alt: "Câblage d’une navette avec deux ILS", caption: "Navette commandée par deux contacts ILS" },
      { src: "/images/details/lec032002-funiculaire.webp", alt: "Câblage du module pour un funiculaire", caption: "Exemple de commande d’un funiculaire" },
    ],
  },
  LEC030301: {
    details: [
      {
        title: "Distribuer proprement une alimentation",
        paragraphs: [
          "Les quatre bornes vertes sont reliées entre elles. Les quatre bornes bleues forment une seconde ligne indépendante. Une seule arrivée d’alimentation peut ainsi être répartie vers plusieurs éclairages ou modules.",
          "Le lot d’origine comportait cinq cartes. Chaque carte peut rester entière ou être séparée en deux petites barrettes lorsque la place manque sous le réseau.",
        ],
      },
      {
        title: "Repérage et installation",
        paragraphs: [
          "La zone blanche permet de noter la tension, la polarité ou un numéro de circuit au feutre. Fixez la carte sur un support isolant et vérifiez le serrage des fils avant la mise sous tension.",
        ],
        warning: "La limite indiquée pour la carte est de 10 A et 250 V. Pour un réseau miniature, respectez toujours les limites de l’alimentation et de la section des fils utilisés.",
      },
    ],
    gallery: [
      { src: "/images/details/lec030301-separation.webp", alt: "Bornier mini séparé en deux barrettes", caption: "La carte peut être séparée en deux lignes indépendantes" },
      { src: "/images/details/lec030301-cablage.webp", alt: "Exemple de câblage du bornier mini", caption: "Exemple de distribution vers plusieurs accessoires" },
    ],
  },
  LEC030201: {
    details: [
      {
        title: "Une grande distribution pour le réseau",
        paragraphs: [
          "Les seize bornes vertes sont reliées entre elles et les seize bornes bleues forment une seconde ligne. La carte permet de distribuer proprement deux conducteurs d’alimentation vers de nombreux appareils.",
          "Elle convient par exemple à un réseau comportant beaucoup d’éclairages, de moteurs d’aiguillage ou de modules alimentés par le même transformateur.",
        ],
      },
      {
        title: "Une carte sécable et facile à repérer",
        paragraphs: [
          "La carte peut être coupée sur les pointillés pour obtenir deux barrettes indépendantes et plus faciles à placer. La zone blanche sert à noter la tension, la polarité ou le numéro du circuit.",
        ],
        warning: "Coupez la carte uniquement hors tension et avant son installation. Vérifiez qu’aucune piste de cuivre ne relie encore les deux parties.",
      },
    ],
    gallery: [
      { src: "/images/details/lec030201-separation.webp", alt: "Bornier XL séparé en deux barrettes", caption: "Les deux lignes peuvent être séparées" },
      { src: "/images/details/lec030201-cablage.webp", alt: "Exemple de câblage du bornier XL", caption: "Distribution d’une alimentation vers plusieurs appareils" },
    ],
  },
  LEC030001: {
    details: [
      {
        title: "Deux lignes de huit raccordements",
        paragraphs: [
          "Les huit bornes vertes sont reliées entre elles, tout comme les huit bornes bleues. Cette disposition permet de distribuer une alimentation à deux conducteurs sans multiplier les dominos ou les raccords volants.",
          "La carte peut alimenter des éclairages, des moteurs ou des modules placés dans une même zone du réseau.",
        ],
      },
      {
        title: "Séparer et identifier les circuits",
        paragraphs: [
          "Coupez la carte sur les pointillés pour obtenir deux barrettes indépendantes. La zone blanche permet d’inscrire au feutre la tension, la polarité ou un numéro de repérage.",
        ],
        warning: "Effectuez la découpe avant le câblage, puis contrôlez visuellement les pistes de cuivre avant la mise sous tension.",
      },
    ],
    gallery: [
      { src: "/images/details/lec030001-separation.webp", alt: "Bornier 2 × 8 séparé en deux barrettes", caption: "La carte après séparation des deux lignes" },
      { src: "/images/details/lec030001-cablage.webp", alt: "Exemple de câblage du bornier 2 × 8", caption: "Exemple de distribution électrique" },
    ],
  },
  LEC011001: {
    details: [
      {
        title: "Commander un accessoire pendant un temps donné",
        paragraphs: [
          "Un bouton poussoir, un ILS ou un autre contact déclenche le relais. Celui-ci reste actif entre environ une seconde et trois minutes trente, selon le réglage choisi.",
          "Les deux contacts inverseurs permettent aussi bien d’allumer un éclairage que de commander un module sonore, une animation ou une zone d’arrêt.",
        ],
        bullets: ["arrêt temporisé en gare", "éclairage de quai", "déclenchement différé d’un son", "animation d’un décor"],
      },
      {
        title: "Branchement et réglage",
        paragraphs: [
          "Alimentez le module entre 8 et 16 V, en continu ou en alternatif. Le bornier d’alimentation n’est pas polarisé. Reliez ensuite votre contact de commande aux deux bornes d’entrée.",
          "Réglez la durée avec le potentiomètre bleu et un petit tournevis. Procédez par essais successifs jusqu’à obtenir le délai souhaité.",
        ],
        warning: "Ne forcez jamais le potentiomètre en fin de course.",
      },
    ],
    gallery: [
      { src: "/images/details/lec011-cablage.webp", alt: "Schéma de câblage du relais temporisé", caption: "Branchement général du relais temporisé" },
      { src: "/images/details/lec011-eclairage.webp", alt: "Exemple de commande temporisée d’un éclairage", caption: "Commande d’un éclairage pendant la temporisation" },
      { src: "/images/details/lec011-arret-dcc.webp", alt: "Exemple d’arrêt temporisé en gare en DCC", caption: "Exemple d’arrêt temporisé en gare" },
    ],
  },
  LEC001021: {
    details: [
      {
        title: "Créer des arrêts progressifs en DCC",
        paragraphs: [
          "Le module crée une asymétrie dans le signal DCC, appelée signal ABC. Un décodeur compatible reconnaît ce signal et ralentit la locomotive jusqu’à l’arrêt en utilisant ses propres réglages de freinage.",
          "Lorsque le signal ABC disparaît, le train redémarre progressivement. Il est ainsi possible de commander l’arrêt avec un interrupteur, un relais, un détecteur d’occupation ou un contact lié à un aiguillage.",
        ],
        bullets: ["arrêt au pied d’un signal", "arrêt automatique en gare", "protection d’un aiguillage", "cantonnement avec un détecteur d’occupation"],
      },
      {
        title: "Compatibilité et installation",
        paragraphs: [
          "Le réseau doit être en DCC et le décodeur de la locomotive doit prendre en charge la technologie ABC. Isolez un rail de la zone d’arrêt, puis câblez le module comme indiqué sur le schéma.",
          "Activez ensuite la fonction ABC dans les variables de configuration du décodeur. La procédure exacte dépend de la marque et du modèle du décodeur.",
        ],
        warning: "Un décodeur non compatible ABC ignorera le module. Vérifiez sa notice avant de modifier la voie.",
      },
    ],
    gallery: [
      { src: "/images/details/lec001021-cablage.webp", alt: "Câblage du module de freinage DCC 3 A", caption: "Câblage d’une zone d’arrêt ABC" },
      { src: "/images/details/lec001021-cv.webp", alt: "Réglages du décodeur pour le freinage ABC", caption: "Principaux réglages ABC du décodeur" },
    ],
  },
  LEC009002: {
    details: [
      {
        title: "Détecter sans modifier l’alimentation de la voie",
        paragraphs: [
          "Les capteurs infrarouges détectent le passage d’un train, d’un wagon, d’un véhicule routier ou de tout autre objet proche. Le système fonctionne indépendamment du courant de traction et convient donc à un réseau analogique comme à un réseau DCC.",
          "Le relais inverseur peut commander un passage à niveau, un feu, un bruitage, une boucle de retournement ou un autre automatisme.",
        ],
      },
      {
        title: "Un ou deux capteurs",
        paragraphs: [
          "Avec un seul capteur, le relais reste actif tant qu’un objet est détecté, puis se relâche après une courte temporisation. Celle-ci évite les coupures entre deux wagons.",
          "Avec deux capteurs, le premier passage enclenche le relais et le passage devant le second le relâche. Ce mode bistable est utile pour suivre l’entrée puis la sortie d’une zone.",
        ],
      },
      {
        title: "Installation et réglage",
        paragraphs: [
          "Alimentez le module entre 8 et 20 V continu. Placez les capteurs entre les traverses ou orientez-les vers le bas des véhicules afin de détecter également les wagons plats.",
          "Réglez chaque capteur dans les conditions d’éclairage les plus fortes du réseau. Pour un réglage prudent, utilisez un véhicule sombre et branchez un seul capteur à la fois.",
        ],
        warning: "Les potentiomètres des capteurs sont fragiles. Tournez-les délicatement et sans jamais forcer.",
      },
    ],
    gallery: [
      { src: "/images/details/lec009002-cablage.webp", alt: "Câblage de l’alimentation du détecteur infrarouge", caption: "Branchement de l’alimentation et des capteurs" },
      { src: "/images/details/lec009002-installation.webp", alt: "Capteurs infrarouges installés dans une voie miniature", caption: "Exemple de capteurs intégrés dans la voie" },
      { src: "/images/details/lec009002-reglage.webp", alt: "Réglage de la distance de détection infrarouge", caption: "Réglage indépendant de chaque capteur" },
    ],
  },
  LEC008011: {
    details: [
      {
        title: "Ajouter des sons au réseau",
        paragraphs: [
          "Le module peut lire jusqu’à quatorze sons différents : locomotive à vapeur, klaxon, sifflet de chef de gare, animaux, pluie, cloches, sirène ou ambiance personnalisée.",
          "Chaque entrée se commande par un bouton poussoir, un ILS, une pédale de contact ou le relais d’un autre module. Un détecteur peut ainsi déclencher automatiquement un klaxon à l’entrée d’un tunnel.",
        ],
      },
      {
        title: "Branchement et volume",
        paragraphs: [
          "Branchez une alimentation continue de 10 à 20 V et raccordez le haut-parleur. Les contacts de commande se branchent ensuite sur les entrées correspondant aux sons souhaités.",
          "Le volume se règle avec le petit potentiomètre du module. Commencez à faible volume, puis augmentez progressivement.",
        ],
      },
      {
        title: "Utiliser ses propres sons",
        paragraphs: [
          "Les fichiers audio sont enregistrés sur une carte microSD. Il est possible de remplacer les sons d’origine en respectant le nom et le format de fichier attendus par le module.",
          "Conservez une copie de la carte avant toute modification afin de pouvoir revenir facilement à la configuration précédente.",
        ],
      },
    ],
    gallery: [
      { src: "/images/details/lec008011-cablage.webp", alt: "Schéma de câblage du module sonore", caption: "Branchement du module sonore et de ses commandes" },
      { src: "/images/details/lec008011-volume.webp", alt: "Emplacement du réglage de volume du module sonore", caption: "Potentiomètre de réglage du volume" },
    ],
  },
  LEC001020: {
    details: [
      {
        title: "Un arrêt progressif commandé par le décodeur",
        paragraphs: [
          "Ce module envoie un signal ABC sur une zone de voie. Le décodeur compatible utilise alors ses réglages internes pour ralentir et arrêter la locomotive. Lorsque le signal disparaît, le train redémarre progressivement.",
          "Le module peut être commandé par un interrupteur, un relais, un détecteur ou un contact d’aiguillage.",
        ],
        bullets: ["arrêt devant un signal", "arrêt en gare", "protection d’un aiguillage", "cantonnement automatique"],
      },
      {
        title: "Ce qu’il faut vérifier avant l’installation",
        paragraphs: [
          "Le réseau doit être en DCC et le décodeur doit être compatible ABC. Cette version accepte 1 A et convient particulièrement à l’échelle N.",
          "Isolez un rail de la zone d’arrêt, câblez le module, puis activez la fonction ABC dans le décodeur en suivant sa propre notice.",
        ],
        warning: "Le mode manœuvre ou la marche réduite de certains décodeurs peut désactiver temporairement la réaction au signal ABC.",
      },
    ],
    gallery: [
      { src: "/images/details/lec001020-cablage.webp", alt: "Câblage du module de freinage DCC 1 A", caption: "Câblage d’une zone d’arrêt ABC" },
      { src: "/images/details/lec001020-cv.webp", alt: "Réglages ABC d’un décodeur DCC", caption: "Principaux réglages du décodeur" },
    ],
  },
  LEC000042A: {
    details: [
      {
        title: "Détecter un train sur une voie analogique",
        paragraphs: [
          "Le module mesure la consommation de courant sur une portion de voie isolée. Il peut détecter une locomotive, un wagon éclairé ou un essieu graphité, puis activer immédiatement son relais.",
          "Le relais permet de commander un feu, un bruitage, un passage à niveau ou un système de cantonnement analogique.",
        ],
      },
      {
        title: "Câblage de la zone de détection",
        paragraphs: [
          "Dans le sens de marche surveillé, isolez le rail gauche de la zone. Branchez l’alimentation de traction sur A et B, puis raccordez le rail isolé à B DETECT.",
          "La détection analogique commence à partir d’environ 6 V et fonctionne dans un seul sens de circulation.",
        ],
      },
      {
        title: "Sensibilité et forçage",
        paragraphs: [
          "Le seuil de détection est réglable avec le potentiomètre. Une entrée FORCE permet aussi d’activer volontairement le relais au moyen d’un interrupteur.",
        ],
        warning: "Pour augmenter la sensibilité, tournez doucement le potentiomètre dans le sens inverse des aiguilles d’une montre. Ne forcez jamais en butée.",
      },
    ],
    gallery: [
      { src: "/images/details/lec000042a-cablage.webp", alt: "Câblage du détecteur d’occupation analogique", caption: "Câblage d’une zone de détection analogique" },
      { src: "/images/details/lec000042a-reglage.webp", alt: "Réglage du détecteur d’occupation analogique", caption: "Réglage de la sensibilité" },
      { src: "/images/details/lec000042a-feu.webp", alt: "Commande d’un feu bicolore en analogique", caption: "Exemple de commande d’un feu bicolore" },
    ],
  },
  LEC000042: {
    details: [
      {
        title: "Une information d’occupation utilisable partout",
        paragraphs: [
          "Le détecteur surveille la consommation d’une zone de voie DCC. Une locomotive, un wagon éclairé, un feu de fin de convoi ou un essieu graphité suffit à activer le relais.",
          "Les deux contacts inverseurs peuvent commander un feu, un module sonore, un passage à niveau, une gare cachée ou un autre automatisme.",
        ],
        bullets: ["cantonnement", "signalisation", "protection d’une voie cachée", "déclenchement automatique d’un son"],
      },
      {
        title: "Installation avec trois fils",
        paragraphs: [
          "Isolez un rail de la zone à surveiller. Branchez la centrale DCC sur A et B, puis reliez le rail isolé à l’une des bornes B DETECT.",
          "Le module détecte dans les deux sens de circulation. Sa sensibilité peut être ajustée pour repérer la faible consommation d’un décodeur lorsque la locomotive est immobile.",
        ],
      },
      {
        title: "Réglage et entrée FORCE",
        paragraphs: [
          "Reliez les deux bornes FORCE avec un interrupteur pour imposer l’activation du relais. Le potentiomètre règle le seuil de détection lorsque le réglage d’origine ne convient pas à votre matériel.",
        ],
        warning: "Tournez le potentiomètre très doucement. Le sens inverse des aiguilles d’une montre augmente la sensibilité.",
      },
    ],
    gallery: [
      { src: "/images/details/lec000042-cablage.webp", alt: "Câblage du détecteur d’occupation DCC 1 A", caption: "Câblage d’une zone de détection DCC" },
      { src: "/images/details/lec000042-reglage.webp", alt: "Réglage de la sensibilité du détecteur DCC 1 A", caption: "Réglage du seuil de détection" },
      { src: "/images/details/lec000042-feu.webp", alt: "Commande d’un feu bicolore avec le détecteur DCC", caption: "Exemple de commande automatique d’un feu" },
    ],
  },
};
