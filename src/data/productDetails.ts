export type ProductImage = {
  src: string;
  alt: string;
  caption: string;
};

export type ProductSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  steps?: string[];
  warning?: string;
  images?: ProductImage[];
};

export type ProductContent = {
  details: ProductSection[];
  gallery: ProductImage[];
};

const image = (src: string, alt: string, caption: string): ProductImage => ({ src, alt, caption });

export const getIllustrationId = (code: string, src: string) => {
  const filename = src.split("/").at(-1)?.replace(/\.[^.]+$/, "") ?? "illustration";
  const subject = filename.replace(/^lec\d+[a-z]?-/i, "");
  return `${code.toLowerCase()}-${subject}`;
};

export const getProductImages = (content: ProductContent) => [
  ...content.details.flatMap((section) => section.images ?? []),
  ...content.gallery,
];

const createDccDetector = (code: "LEC000042" | "LEC000043", amperage: "1 A" | "3 A", brakingCode: "LEC001020" | "LEC001021"): ProductContent => {
  const detailRoot = `/images/details/${code.toLowerCase()}`;
  const schemaRoot = `/images/schemas/${code.toLowerCase()}-detecteur`;

  return {
    details: [
      {
        id: "applications",
        title: "Applications possibles",
        paragraphs: [
          `Le ${code} est un détecteur d’occupation DCC par consommation de courant. Sa sensibilité réglable permet de détecter une locomotive, même à l’arrêt grâce à la consommation de son décodeur, mais aussi un wagon éclairé, un feu de fin de convoi ou un essieu graphité.`,
          "Dès qu’un matériel roulant consomme du courant sur la zone surveillée, le module active son relais double inverseur. Ses deux contacts restent libres de potentiel : ils peuvent commander directement un autre circuit ou transmettre l’information d’occupation à un automatisme.",
        ],
        bullets: [
          "réaliser un cantonnement et espacer automatiquement les trains",
          "commander la signalisation d’un canton ou d’une gare cachée",
          "protéger une voie cachée en arrêtant le convoi suivant",
          "déclencher automatiquement un bruitage",
          "commander un passage à niveau ou un autre automatisme",
        ],
      },
      {
        id: "compatibilite",
        title: "Compatibilité et choix de la version",
        paragraphs: [
          `Cette version accepte jusqu’à ${amperage}. Elle est destinée en priorité aux réseaux DCC, avec une détection dans les deux sens de circulation. Le même principe électronique peut fonctionner en analogique, mais le câblage et le comportement diffèrent : reportez-vous dans ce cas à la fiche LEC000042A.`,
          `Pour un cantonnement DCC, associez le détecteur à un module de freinage ${brakingCode}. Le décodeur de la locomotive doit alors être compatible avec la technologie ABC.`,
        ],
        images: [
          image("/images/schemas/lec000043-comparaison-lec000.webp", "Tableau comparatif des détecteurs d’occupation LECTIX", "Comparer les versions de détecteurs d’occupation"),
          image("/images/schemas/lec000043-comparaison-lec001.webp", "Tableau comparatif des modules de freinage LECTIX", "Comparer les modules de freinage à associer au détecteur"),
        ],
      },
      {
        id: "installation",
        title: "Installation et câblage avec trois fils",
        paragraphs: [
          "Une seule file de rail doit être isolée sur toute la longueur de la zone de détection. Le module s’insère ensuite entre la centrale DCC et ce rail isolé.",
        ],
        steps: [
          "Isolez un rail aux deux extrémités de la zone à surveiller.",
          "Branchez la sortie de la centrale DCC sur les bornes A et B du détecteur.",
          "Reliez le rail isolé à l’une des deux bornes B DETECT.",
          "Utilisez les contacts du relais pour raccorder le feu, le module sonore ou l’automatisme choisi.",
          "Testez la détection avant de fixer définitivement le module.",
        ],
        images: [image(`${detailRoot}-cablage.webp`, `Schéma de câblage du détecteur d’occupation DCC ${amperage}`, "Câblage de base d’une zone de détection DCC")],
      },
      {
        id: "force",
        title: "Forcer l’activation du relais",
        paragraphs: [
          "Certains automatismes, par exemple la gestion d’un arrêt en gare, demandent d’activer le relais même si aucun train n’est détecté. Il suffit alors de relier les deux bornes FORCE avec un interrupteur ou un contact équivalent.",
        ],
        images: [image(`${schemaRoot}-force-activation.webp`, "Câblage de l’entrée FORCE du détecteur d’occupation", "Activation forcée du relais par un interrupteur")],
      },
      {
        id: "sensibilite",
        title: "Régler la sensibilité de la détection",
        paragraphs: [
          "Le module est livré avec un réglage standard destiné à détecter la faible consommation d’un décodeur, même lorsque la locomotive est immobile. Si ce seuil ne convient pas à votre matériel, ajustez-le avec le potentiomètre.",
          "Tournez dans le sens des aiguilles d’une montre pour diminuer la sensibilité, et dans le sens inverse pour l’augmenter.",
        ],
        warning: "Le potentiomètre est fragile. Tournez-le doucement et ne forcez jamais lorsqu’il arrive en butée.",
        images: [image(`${detailRoot}-reglage.webp`, "Réglage du seuil du détecteur d’occupation", "Potentiomètre de réglage de la sensibilité")],
      },
      {
        id: "signalisation",
        title: "Commander automatiquement un feu bicolore",
        paragraphs: [
          "Un contact inverseur du relais peut alimenter alternativement le rouge ou le vert d’un feu bicolore. Le feu change ainsi d’état dès qu’un train entre dans la zone de détection, sans autre électronique de commande.",
        ],
        images: [image(`${detailRoot}-feu.webp`, "Branchement d’un feu bicolore sur le détecteur d’occupation", "Signalisation automatique selon l’occupation de la voie")],
      },
      {
        id: "protection-voie",
        title: "Protéger un tronçon ou une voie cachée",
        paragraphs: [
          `Ce montage associe le détecteur au module de freinage ${brakingCode}. Lorsque la zone surveillée est libre, le relais shunte le module de freinage et les trains passent normalement. Dès qu’un train occupe la zone, le shunt est supprimé : le convoi suivant reçoit le signal ABC et s’arrête dans la zone d’arrêt.`,
          "Cette protection est particulièrement utile dans une voie cachée, où un wagon dételé ou un train arrêté peut ne pas être visible depuis le poste de commande.",
        ],
        warning: "Le module de freinage n’agit que sur les locomotives munies d’un décodeur DCC compatible ABC.",
        images: [image(`${schemaRoot}-protection-voie.webp`, "Protection automatique d’un tronçon avec détecteur et module de freinage", "Protection d’une voie cachée avec arrêt automatique")],
      },
      {
        id: "son-automatique",
        title: "Déclencher automatiquement un son",
        paragraphs: [
          "Le relais du détecteur peut commander une entrée du module sonore LEC008011. Un klaxon peut ainsi retentir à l’entrée d’un tunnel, une annonce en gare au passage d’un train ou un bruitage lors de l’occupation d’une zone précise.",
        ],
        images: [image(`${schemaRoot}-sound-module.webp`, "Connexion du détecteur d’occupation au module sonore", "Déclenchement automatique d’un bruitage")],
      },
      {
        id: "cantonnement-simple",
        title: "Réaliser un cantonnement simple",
        paragraphs: [
          `Le principe consiste à répéter le montage de protection avec un détecteur ${code} et un module de freinage ${brakingCode} par canton. L’occupation d’un canton provoque l’arrêt du train qui arrive dans le canton précédent.`,
          "Ce montage protège la circulation dans un seul sens. Un train arrivant en sens inverse ne reçoit pas le signal d’arrêt prévu par ce câblage.",
        ],
        images: [image(`${schemaRoot}-canton-voie-droite.webp`, "Schéma d’un cantonnement DCC simple", "Cantonnement simple sur une voie à sens unique")],
      },
      {
        id: "cantonnement-signalisation",
        title: "Ajouter la signalisation au cantonnement",
        paragraphs: [
          "Le second contact inverseur du détecteur reste disponible pour commander un feu bicolore. Le même relais peut donc à la fois protéger le canton précédent et présenter automatiquement le rouge ou le vert selon l’occupation de la voie.",
        ],
        images: [image(`${schemaRoot}-canton-voie-droite-avec-feu.webp`, "Cantonnement DCC avec feu bicolore", "Cantonnement avec changement automatique du signal")],
      },
      {
        id: "aiguillage",
        title: "Intégrer un aiguillage dans une zone de détection",
        paragraphs: [
          "Une zone de détection peut inclure un aiguillage à condition de commuter le rail détecté en même temps que la position de l’aiguille. Il faut disposer d’un contact inverseur lié au moteur d’aiguillage, à un relais ou au bouton de commande.",
          "Les deux schémas ci-dessous montrent le raccordement selon que l’aiguillage se trouve à l’entrée ou à la sortie de la zone.",
        ],
        images: [
          image(`${schemaRoot}-canton-voie-evitement-entree.webp`, "Aiguillage placé à l’entrée d’une zone de détection", "Câblage d’un aiguillage à l’entrée de la zone"),
          image(`${schemaRoot}-canton-voie-evitement-sortie.webp`, "Aiguillage placé à la sortie d’une zone de détection", "Câblage d’un aiguillage à la sortie de la zone"),
        ],
      },
      {
        id: "cantonnement-complet",
        title: "Cantonnement complet avec zones de roulage",
        paragraphs: [
          `Ce montage enchaîne plusieurs détecteurs ${code} et modules de freinage ${brakingCode}. Chaque canton comporte une zone de roulage et une zone d’arrêt. Les zones d’arrêt peuvent ainsi garder une longueur identique, ce qui rend les distances de freinage plus régulières d’un canton à l’autre.`,
        ],
        images: [image(`${schemaRoot}-canton-successifs.webp`, "Cantonnement DCC complet avec zones de roulage", "Enchaînement recommandé de plusieurs cantons")],
      },
      {
        id: "cantonnement-sans-roulage",
        title: "Enchaîner des cantons sans zone de roulage",
        paragraphs: [
          "Ce second schéma montre un cantonnement sans zone de roulage distincte. Il fonctionne, mais impose des zones d’arrêt de même longueur pour conserver un comportement régulier. Le montage avec zones de roulage est donc généralement plus simple à régler.",
        ],
        images: [image(`${schemaRoot}-canton-successifs-sans-roulage.webp`, "Cantonnement DCC sans zones de roulage", "Variante de cantonnement sans zone de roulage")],
      },
    ],
    gallery: [],
  };
};

const createBrakingModule = (code: "LEC001020" | "LEC001021", amperage: "1 A" | "3 A", scale: "N" | "H0", alternativeCode: string): ProductContent => {
  const root = `/images/details/${code.toLowerCase()}`;
  return {
    details: [
      {
        id: "applications",
        title: "Applications possibles",
        paragraphs: [
          "Le module crée une asymétrie dans le signal DCC. Un décodeur compatible ABC reconnaît cette information et exécute sa propre courbe de ralentissement jusqu’à l’arrêt. Lorsque l’asymétrie disparaît, le train redémarre progressivement.",
        ],
        bullets: [
          "arrêter automatiquement un convoi au pied d’un signal",
          "réaliser un arrêt automatique en gare",
          "protéger un aiguillage mal positionné",
          "créer un va-et-vient automatique en DCC",
          "réaliser un cantonnement avec un détecteur d’occupation",
        ],
      },
      {
        id: "fonctionnement-abc",
        title: "Principe du freinage ABC",
        paragraphs: [
          "La technologie ABC, développée par Lenz, ne coupe pas brutalement l’alimentation de la voie. Le signal DCC reste présent dans la zone d’arrêt : les fonctions de la locomotive, comme l’éclairage ou le son, peuvent donc rester actives pendant l’arrêt.",
          "La distance et la progressivité du freinage dépendent des réglages du décodeur. Le module ne remplace pas ces réglages ; il transmet l’ordre d’arrêt ou de redémarrage.",
        ],
      },
      {
        id: "compatibilite",
        title: "Compatibilité à vérifier avant l’installation",
        paragraphs: [
          `Le ${code} fonctionne uniquement sur un réseau digital DCC avec une centrale conforme à la norme NMRA et un décodeur compatible ABC. Cette version accepte ${amperage} et est recommandée pour l’échelle ${scale}. Pour l’autre plage de courant, consultez le module ${alternativeCode}.`,
          "La liste illustrée ci-dessous est indicative et non exhaustive. Vérifiez toujours la notice exacte du décodeur installé dans votre locomotive.",
        ],
        warning: "Un décodeur non compatible ABC traversera la zone sans s’arrêter.",
        images: [
          image(`/images/schemas/${code.toLowerCase()}-abc-compatible-decoders.webp`, "Liste indicative de décodeurs compatibles ABC", "Exemples de décodeurs compatibles avec le freinage ABC"),
          image("/images/schemas/lec000043-comparaison-lec001.webp", "Comparatif des modules de freinage LECTIX", "Choisir la version 1 A ou 3 A"),
        ],
      },
      {
        id: "installation",
        title: "Installation et commande de la zone d’arrêt",
        paragraphs: [
          "Isolez le rail droit de la zone d’arrêt, puis raccordez le module conformément au schéma. Lorsque l’interrupteur est ouvert — ou absent — le signal ABC est envoyé dans la zone et les locomotives configurées s’arrêtent.",
          "Lorsque l’interrupteur est fermé, le module est shunté : les trains passent normalement. Une locomotive déjà arrêtée redémarre selon les paramètres de son décodeur.",
          "L’interrupteur peut être remplacé par le relais d’un détecteur d’occupation, un contact de fin de course ou tout autre dispositif possédant un pouvoir de coupure adapté.",
        ],
        steps: [
          "Vérifiez la compatibilité ABC du décodeur.",
          "Isolez le rail droit de la zone d’arrêt.",
          "Câblez le module et son éventuel contact de commande.",
          "Activez la fonction ABC dans le décodeur.",
          "Testez à faible vitesse avant l’exploitation normale.",
        ],
        images: [image(`${root}-cablage.webp`, `Câblage du module de freinage DCC ${amperage}`, "Câblage d’une zone d’arrêt ABC")],
      },
      {
        id: "configuration-decodeur",
        title: "Configurer le décodeur",
        paragraphs: [
          "La fonction ABC doit être activée dans les variables de configuration — les CV — du décodeur. Les numéros de CV et les valeurs varient selon les marques : la notice du décodeur reste la référence.",
          "Les réglages permettent notamment d’agir sur la distance de freinage, le sens pris en compte et le redémarrage. Si le mode manœuvre ou la marche réduite est activé, certains décodeurs ignorent temporairement le signal ABC.",
        ],
        images: [image(`${root}-cv.webp`, "Tableau des réglages ABC des décodeurs DCC", "Principaux réglages à contrôler dans le décodeur")],
      },
    ],
    gallery: [],
  };
};

const createTimedRelay = (duration: string): ProductContent => ({
  details: [
    {
      id: "applications",
      title: "Applications possibles",
      paragraphs: [
        `Après une impulsion sur son entrée, le relais reste actif pendant une durée réglable ${duration}. Ses deux contacts inverseurs autorisent des montages très variés, en analogique comme en DCC.`,
      ],
      bullets: [
        "réaliser un arrêt temporisé automatique en gare",
        "activer un passage à niveau ou une animation pendant un temps défini",
        "déclencher un son à la fin de la temporisation",
        "allumer un éclairage pendant une durée déterminée",
      ],
    },
    {
      id: "installation",
      title: "Installation et câblage",
      paragraphs: [
        "Branchez une alimentation de 8 à 16 V, continue ou alternative ; 12 V continu convient dans la plupart des installations. Le bornier d’alimentation n’est pas polarisé.",
        "Reliez ensuite les deux bornes de commande à un bouton poussoir, un ILS, un relais, une pédale de voie ou tout autre contact sec. Réglez la durée à l’aide du potentiomètre.",
      ],
      warning: "Le potentiomètre est fragile : ne forcez jamais en fin de course.",
      images: [image("/images/details/lec011-cablage.webp", "Schéma général du relais temporisé", "Alimentation, entrée de commande et contacts du relais")],
    },
    {
      id: "son-differe",
      title: "Déclencher un son à la fin d’un délai",
      paragraphs: [
        "Le contact au repos du relais peut alimenter une entrée du module sonore LEC008011 lorsque la temporisation se termine. On peut par exemple déclencher le sifflet du chef de gare juste avant le départ du train.",
      ],
      images: [image("/images/schemas/lec011001-lec011-sound-example.webp", "Relais temporisé raccordé au module sonore", "Déclenchement d’un son à la fin de la temporisation")],
    },
    {
      id: "eclairage-temporise",
      title: "Allumer un éclairage pendant une durée définie",
      paragraphs: [
        "Dans ce montage, une pression sur le bouton déclenche immédiatement l’éclairage. Celui-ci reste allumé pendant toute la durée choisie, puis s’éteint automatiquement.",
      ],
      images: [image("/images/details/lec011-eclairage.webp", "Commande temporisée d’un éclairage", "Éclairage actif pendant la temporisation")],
    },
    {
      id: "arret-gare-dcc",
      title: "Arrêt temporisé en gare — version DCC",
      paragraphs: [
        "Un ILS, un détecteur infrarouge ou un contact équivalent détecte l’arrivée du train et déclenche la temporisation. Pendant ce délai, le module de freinage n’est plus shunté et ordonne l’arrêt à la locomotive compatible ABC.",
        "À la fin de la temporisation, le relais shunte de nouveau le module de freinage et le train redémarre selon les paramètres de son décodeur. Un interrupteur supplémentaire peut autoriser le passage sans arrêt ou provoquer un départ anticipé.",
      ],
      images: [image("/images/details/lec011-arret-dcc.webp", "Arrêt temporisé automatique en gare sur un réseau DCC", "Arrêt en gare avec relais temporisé et module ABC")],
    },
    {
      id: "arret-gare-analogique",
      title: "Arrêt temporisé en gare — version analogique",
      paragraphs: [
        "Le capteur d’arrivée déclenche la temporisation et le relais coupe l’alimentation de la zone d’arrêt. À la fin du délai, le relais rétablit le courant et le train repart.",
        "Comme en DCC, un interrupteur facultatif peut permettre de supprimer l’arrêt ou de faire repartir le train avant la fin du temps réglé.",
      ],
      images: [image("/images/schemas/lec011001-lec011-arret-temporise-analogique.webp", "Arrêt temporisé automatique sur un réseau analogique", "Coupure temporisée d’une zone d’arrêt analogique")],
    },
  ],
  gallery: [],
});

const createBistableRelay = (code: "LEC022001" | "LEC022102", contacts: string): ProductContent => ({
  details: [
    {
      id: "applications",
      title: "Applications possibles",
      paragraphs: [
        `Une impulsion sur SET ou RESET suffit à changer la position du relais. Il conserve ensuite son état sans alimentation permanente de la bobine. Cette version met à disposition ${contacts}.`,
      ],
      bullets: [
        "cantonnement analogique",
        "protection d’une zone de Car System",
        "gestion d’une boucle de retournement",
        "commande d’un passage à niveau",
        "ajout de contacts à un aiguillage, un interrupteur ou un autre relais",
      ],
    },
    {
      id: "installation",
      title: "Commande des entrées RESET et SET",
      paragraphs: [
        "Reliez la borne commune au pôle négatif de l’alimentation. Placez ensuite un bouton, un ILS, une pédale, un capteur Hall ou un contact équivalent entre le pôle positif et chacune des entrées R et S.",
        "Une impulsion sur RESET relie les bornes communes C aux sorties R. Une impulsion sur SET les relie aux sorties S.",
      ],
      warning: "N’alimentez jamais les entrées RESET et SET simultanément.",
      images: [
        image(`/images/details/${code.toLowerCase()}-reset.webp`, "Commande RESET du relais bistable", "Position RESET : contacts C–R fermés"),
        image(`/images/details/${code.toLowerCase()}-set.webp`, "Commande SET du relais bistable", "Position SET : contacts C–S fermés"),
      ],
    },
    {
      id: "extension-contacts",
      title: "Ajouter des contacts inverseurs",
      paragraphs: [
        "Lorsqu’un moteur d’aiguillage, un interrupteur ou un autre appareil ne possède pas assez de contacts auxiliaires, le relais bistable peut reproduire son état et fournir des contacts supplémentaires pour la signalisation, la polarisation ou un automatisme.",
      ],
      images: [image(`/images/details/${code.toLowerCase()}-extension.webp`, "Extension de contacts avec un relais bistable", "Ajout de contacts inverseurs à une commande existante")],
    },
  ],
  gallery: [],
});

export const productContentByCode: Record<string, ProductContent> = {
  LEC000042: createDccDetector("LEC000042", "1 A", "LEC001020"),
  LEC000042A: {
    details: [
      {
        id: "applications",
        title: "Applications possibles sur un réseau analogique",
        paragraphs: [
          "Ce détecteur surveille la consommation de courant d’une portion de voie. Une locomotive, un wagon éclairé ou un essieu graphité active immédiatement son relais double inverseur.",
          "Les deux contacts du relais peuvent commander directement un autre circuit ou transmettre l’information d’occupation à un automatisme.",
        ],
        bullets: ["cantonnement analogique", "commande de la signalisation", "déclenchement automatique d’un bruitage", "passage à niveau ou autre automatisme"],
      },
      {
        id: "compatibilite",
        title: "Compatibilité et sens de circulation",
        paragraphs: [
          "Cette fiche décrit le câblage analogique du détecteur LEC000042A. La détection commence à partir d’environ 6 V et fonctionne dans un seul sens de circulation, car la polarité de la voie change avec le sens de marche.",
          "Pour une utilisation DCC avec détection dans les deux sens, reportez-vous aux versions LEC000042 ou LEC000043.",
        ],
      },
      {
        id: "installation",
        title: "Installation et câblage",
        paragraphs: ["Dans le sens de marche surveillé, la file de rail gauche doit être isolée aux deux extrémités de la zone."],
        steps: [
          "Isolez le rail gauche de la zone de détection.",
          "Branchez l’alimentation traction sur A et B : A correspond au rail droit et B au rail gauche dans le sens de marche.",
          "Reliez le rail gauche isolé à l’une des bornes B DETECT.",
          "Raccordez l’automatisme choisi aux contacts du relais.",
          "Testez avant de fixer définitivement le module.",
        ],
        images: [image("/images/details/lec000042a-cablage.webp", "Câblage du détecteur d’occupation analogique", "Zone de détection analogique câblée avec trois fils")],
      },
      {
        id: "force",
        title: "Forcer l’activation du relais",
        paragraphs: ["Pour imposer l’activation du relais, même sans train dans la zone, reliez les deux bornes FORCE avec un interrupteur. Cette entrée peut servir dans un automatisme d’arrêt en gare ou pendant les essais."],
        images: [image("/images/schemas/lec000042a-detecteur-force-activation.webp", "Entrée FORCE du détecteur analogique", "Activation forcée du relais")],
      },
      {
        id: "sensibilite",
        title: "Régler la sensibilité",
        paragraphs: [
          "Le réglage d’origine convient à la plupart des matériels. Pour diminuer la sensibilité, tournez le potentiomètre dans le sens des aiguilles d’une montre ; pour l’augmenter, tournez dans le sens inverse.",
        ],
        warning: "Le potentiomètre est fragile. Tournez-le délicatement et ne forcez jamais en butée.",
        images: [image("/images/details/lec000042a-reglage.webp", "Réglage de la sensibilité du détecteur analogique", "Potentiomètre du seuil de détection")],
      },
      {
        id: "signalisation",
        title: "Commander automatiquement un feu bicolore",
        paragraphs: ["Un contact inverseur du relais peut alimenter alternativement le rouge ou le vert d’un signal. Le feu change alors d’état dès qu’un train entre dans la zone."],
        images: [image("/images/details/lec000042a-feu.webp", "Feu bicolore commandé par le détecteur analogique", "Signalisation automatique d’une zone analogique")],
      },
      {
        id: "son-automatique",
        title: "Déclencher automatiquement un son",
        paragraphs: ["Raccordé au module sonore LEC008011, le détecteur peut déclencher un klaxon à l’entrée d’un tunnel, une annonce en gare ou tout autre bruitage lors du passage d’un train."],
        images: [image("/images/schemas/lec000042a-detecteur-sound-module.webp", "Détecteur analogique raccordé au module sonore", "Déclenchement d’un bruitage au passage du train")],
      },
      {
        id: "cantonnement-simple",
        title: "Réaliser un cantonnement analogique simple",
        paragraphs: [
          "En analogique, aucun module ABC n’est nécessaire : lorsque le canton suivant est occupé, le relais du détecteur coupe directement l’alimentation de la zone d’arrêt précédente.",
          "Ce câblage protège la circulation dans un seul sens. La zone d’arrêt doit être assez longue pour immobiliser complètement le train avant l’entrée dans le canton occupé.",
        ],
        images: [image("/images/schemas/lec000042a-detecteur-canton-voie-droite.webp", "Cantonnement simple sur un réseau analogique", "Coupure automatique de la zone d’arrêt précédente")],
      },
      {
        id: "aiguillage",
        title: "Intégrer un aiguillage dans la zone",
        paragraphs: [
          "Un aiguillage peut faire partie de la zone de détection si un contact inverseur commute le rail surveillé en même temps que l’aiguille. Ce contact peut provenir du moteur d’aiguillage, d’un relais ou du bouton de commande.",
        ],
        images: [
          image("/images/schemas/lec000042a-detecteur-canton-voie-evitement-entree.webp", "Aiguillage à l’entrée d’une zone analogique", "Câblage d’un aiguillage à l’entrée de la zone"),
          image("/images/schemas/lec000042a-detecteur-canton-voie-evitement-sortie.webp", "Aiguillage à la sortie d’une zone analogique", "Câblage d’un aiguillage à la sortie de la zone"),
        ],
      },
      {
        id: "cantonnement-complet",
        title: "Enchaîner plusieurs cantons analogiques",
        paragraphs: ["En répétant le montage, chaque détecteur commande la zone d’arrêt du canton précédent. On obtient ainsi un cantonnement complet qui espace automatiquement les trains circulant dans le sens protégé."],
        images: [image("/images/schemas/lec000042a-detecteur-canton-successifs.webp", "Cantonnement analogique complet", "Enchaînement de plusieurs cantons analogiques")],
      },
    ],
    gallery: [],
  },
  LEC000043: createDccDetector("LEC000043", "3 A", "LEC001021"),
  LEC001020: createBrakingModule("LEC001020", "1 A", "N", "LEC001021"),
  LEC001021: createBrakingModule("LEC001021", "3 A", "H0", "LEC001020"),
  LEC005001: {
    details: [
      {
        id: "applications",
        title: "Applications possibles",
        paragraphs: ["Chaque petite carte associe une LED blanche et sa résistance. Elle peut éclairer l’ensemble d’un petit bâtiment ou seulement une pièce afin de créer plusieurs zones lumineuses dans une gare, une maison ou un atelier."],
      },
      {
        id: "installation",
        title: "Installation",
        paragraphs: ["La résistance est déjà intégrée à la carte. Deux fils et une alimentation continue suffisent pour mettre l’éclairage en service."],
        steps: [
          "Soudez deux fils sur les bornes + et −.",
          "Fixez la carte dans la maquette avec une petite vis ou du ruban adhésif double face.",
          "Faites ressortir les fils sous le décor.",
          "Branchez-les sur une alimentation continue comprise entre 5 et 16 V en respectant la polarité.",
          "Testez l’éclairage avant de refermer le bâtiment.",
        ],
      },
    ],
    gallery: [
      image("/images/details/lec005-eclairage.webp", "Carte LED LECTIX allumée", "Lumière blanche de ton froid"),
      image("/images/details/lec005-maison.webp", "Maison miniature éclairée par une carte LED", "Exemple d’intégration dans un bâtiment"),
      image("/images/details/lec005-dimensions.webp", "Dimensions de la carte LED", "Dimensions de la carte d’éclairage"),
    ],
  },
  LEC008011: {
    details: [
      {
        id: "applications",
        title: "Ajouter des sons au réseau",
        paragraphs: [
          "Le module LEC008011 peut jouer jusqu’à quatorze sons différents. Chaque son possède sa propre entrée et peut être déclenché par un bouton poussoir, un ILS, une pédale de voie ou le relais d’un détecteur.",
        ],
        bullets: ["ambiances sonores : pluie, usine, gare ou scène de village", "klaxons et sifflets ferroviaires", "sirènes et sons de véhicules", "bruits d’animaux", "sons personnalisés enregistrés sur la carte microSD"],
      },
      {
        id: "installation",
        title: "Branchement du module",
        paragraphs: [
          "Le haut-parleur est raccordé directement au module. Branchez une alimentation continue de 10 à 20 V, puis reliez un contact entre la borne commune et l’entrée correspondant au son souhaité.",
          "Un détecteur d’occupation ou un détecteur infrarouge peut remplacer le bouton afin de déclencher un son automatiquement au passage d’un train.",
        ],
        images: [image("/images/details/lec008011-cablage.webp", "Câblage du module sonore LECTIX", "Alimentation, haut-parleur et entrées de déclenchement")],
      },
      {
        id: "sons-fournis",
        title: "Les quatorze sons d’origine",
        paragraphs: ["La carte microSD d’origine contenait les sons suivants, chacun associé à une entrée numérotée :"],
        bullets: ["1. Train à vapeur", "2. Klaxon deux tons", "3. Klaxon", "4. Sifflet du chef de gare", "5. Poules", "6. Hennissement de cheval", "7. Moteur de tracteur", "8. Ambiance générale avec oiseaux et avion", "9. Scierie", "10. Pluie orageuse", "11. Cloches d’église", "12. Sirène d’ambulance", "13. Sirène de gendarmerie", "14. Passage à niveau"],
      },
      {
        id: "volume",
        title: "Régler le volume",
        paragraphs: ["Tournez délicatement le potentiomètre de volume. Commencez avec un niveau faible, puis augmentez progressivement afin d’éviter la saturation du haut-parleur."],
        images: [image("/images/details/lec008011-volume.webp", "Réglage du volume du module sonore", "Emplacement du potentiomètre de volume")],
      },
      {
        id: "sons-personnalises",
        title: "Utiliser ses propres sons",
        paragraphs: ["Les fichiers audio sont stockés sur la carte microSD et peuvent être remplacés. Respectez le format et le nom attendus pour chaque piste, et conservez une copie de sauvegarde de la carte avant toute modification."],
      },
    ],
    gallery: [],
  },
  LEC009002: {
    details: [
      {
        id: "applications",
        title: "Applications possibles",
        paragraphs: [
          "Le LEC009002 détecte sans contact un train, un wagon, un véhicule routier ou tout autre objet passant devant ses capteurs infrarouges. Il ne demande aucune modification du câblage de la voie et fonctionne indépendamment du courant de traction.",
          "Son relais inverseur permet de commander directement de nombreux automatismes.",
        ],
        bullets: ["passage à niveau", "signalisation", "déclenchement automatique d’un bruitage", "boucle de retournement DCC", "surveillance d’une voie cachée"],
      },
      {
        id: "un-capteur",
        title: "Fonctionnement avec un capteur",
        paragraphs: [
          "Avec un seul capteur, le module fonctionne en mode direct. Le relais s’enclenche lorsqu’un objet entre dans le champ de détection, puis se relâche après une courte temporisation quand l’objet s’éloigne.",
          "Cette temporisation évite les coupures entre deux wagons d’un même convoi.",
        ],
      },
      {
        id: "deux-capteurs",
        title: "Fonctionnement avec deux capteurs",
        paragraphs: ["Avec deux capteurs, le module devient bistable. Le passage devant le premier capteur enclenche le relais ; celui-ci ne se relâche qu’au passage devant le second. Ce mode permet de matérialiser l’entrée puis la sortie d’une zone."],
      },
      {
        id: "installation",
        title: "Alimentation et câblage",
        paragraphs: ["Branchez une alimentation continue de 8 à 20 V sur le bornier, puis raccordez un ou deux capteurs avec leurs câbles. Le bornier d’alimentation n’est pas polarisé."],
        images: [image("/images/details/lec009002-cablage.webp", "Câblage du détecteur infrarouge", "Alimentation du module et raccordement des capteurs")],
      },
      {
        id: "pose-capteurs",
        title: "Installer les capteurs dans la voie",
        paragraphs: [
          "Placez les capteurs directement entre les traverses ou orientez-les vers le bas des véhicules. Cette position permet de détecter aussi les wagons plats. Essayez de conserver un éclairage ambiant stable et effectuez le réglage dans les conditions de lumière les plus fortes du réseau.",
        ],
        images: [
          image("/images/schemas/lec009002-lec009201-dimensions.webp", "Dimensions du capteur infrarouge", "Dimensions du capteur pour préparer son logement"),
          image("/images/details/lec009002-installation.webp", "Capteurs infrarouges installés dans une voie miniature", "Exemple d’intégration entre les traverses")],
      },
      {
        id: "sensibilite",
        title: "Régler la distance de détection",
        paragraphs: [
          "La distance varie selon la couleur de l’objet. Réglez chaque capteur avec un véhicule sombre placé à la distance désirée et, pour simplifier l’opération, ne branchez qu’un capteur à la fois.",
          "Tournez dans le sens des aiguilles d’une montre pour diminuer la distance, et dans le sens inverse pour l’augmenter.",
        ],
        warning: "Le potentiomètre est fragile. Tournez-le doucement et ne forcez jamais en butée.",
        images: [image("/images/details/lec009002-reglage.webp", "Réglage de la distance du capteur infrarouge", "Potentiomètre de réglage de chaque capteur")],
      },
      {
        id: "son-automatique",
        title: "Déclencher automatiquement un son",
        paragraphs: ["Le relais du détecteur peut commander une entrée du module sonore LEC008011. Il devient ainsi possible de jouer un klaxon à l’entrée d’un tunnel ou une annonce lors du passage d’un train."],
        images: [image("/images/schemas/lec009002-lec009002-sound-module.webp", "Détecteur infrarouge raccordé au module sonore", "Déclenchement automatique d’un bruitage")],
      },
      {
        id: "boucle-retournement",
        title: "Commander une boucle de retournement DCC",
        paragraphs: [
          "Le relais inverse la polarité de la voie dans la boucle. Un capteur est placé avant l’entrée et le second à l’intérieur de la section isolée : le passage successif devant les capteurs commande le relais bistable.",
        ],
        warning: "Laissez une distance suffisante entre les capteurs et les coupures de voie afin que tout le train se trouve au bon endroit lors de la commutation.",
        images: [image("/images/schemas/lec009002-boucle.webp", "Animation du câblage d’une boucle de retournement DCC", "Boucle de retournement commandée par deux capteurs IR")],
      },
    ],
    gallery: [],
  },
  LEC011001: createTimedRelay("d’environ 1 seconde à 3 minutes 30"),
  LEC011102: createTimedRelay("d’environ 10 secondes à 10 minutes"),
  LEC022001: createBistableRelay("LEC022001", "deux contacts inverseurs"),
  LEC022102: createBistableRelay("LEC022102", "quatre contacts inverseurs"),
  LEC030001: {
    details: [
      { id: "applications", title: "Distribuer deux lignes électriques", paragraphs: ["Les huit bornes vertes sont reliées entre elles et les huit bornes bleues forment une seconde ligne indépendante. Une arrivée d’alimentation peut ainsi être répartie vers plusieurs éclairages, moteurs ou modules sans multiplier les raccords volants."], bullets: ["distribution d’une alimentation accessoires", "répartition d’un bus DCC", "regroupement des retours d’éclairage", "organisation du câblage sous le réseau"] },
      { id: "installation", title: "Séparer et repérer les circuits", paragraphs: ["La carte peut être coupée sur les pointillés pour obtenir deux barrettes indépendantes. La zone blanche sert à noter la tension, la polarité ou le numéro du circuit."], warning: "Effectuez la découpe hors tension avant le câblage, puis vérifiez qu’aucune piste de cuivre ne relie encore les deux parties." },
    ],
    gallery: [image("/images/details/lec030001-separation.webp", "Bornier 2 × 8 séparé en deux barrettes", "Séparation des deux lignes"), image("/images/details/lec030001-cablage.webp", "Exemple de câblage du bornier 2 × 8", "Distribution d’une alimentation vers plusieurs appareils")],
  },
  LEC030201: {
    details: [
      { id: "applications", title: "Distribuer deux lignes vers seize raccordements", paragraphs: ["Les seize bornes vertes sont reliées entre elles et les seize bornes bleues forment une seconde ligne. Cette grande carte convient aux zones regroupant de nombreux éclairages, moteurs d’aiguillage ou modules alimentés par le même transformateur."], bullets: ["distribution d’une alimentation accessoires", "répartition d’un bus DCC", "câblage d’une grande gare ou d’un dépôt", "organisation des départs sous le réseau"] },
      { id: "installation", title: "Une carte sécable et facile à identifier", paragraphs: ["Coupez la carte sur les pointillés pour obtenir deux longues barrettes indépendantes. La zone blanche permet d’inscrire la tension, la polarité ou un numéro de repérage."], warning: "Coupez uniquement hors tension et avant l’installation. Contrôlez les pistes de cuivre avant la remise sous tension." },
    ],
    gallery: [image("/images/details/lec030201-separation.webp", "Bornier XL séparé en deux barrettes", "Séparation des deux lignes de seize plots"), image("/images/details/lec030201-cablage.webp", "Exemple de câblage du bornier XL", "Distribution vers de nombreux appareils")],
  },
  LEC030301: {
    details: [
      { id: "applications", title: "Distribuer deux lignes dans un espace réduit", paragraphs: ["Les quatre bornes vertes sont reliées entre elles et les quatre bornes bleues constituent une seconde ligne. Le format compact convient à une petite zone du réseau ou à quelques accessoires proches."], bullets: ["distribution locale d’un éclairage", "raccordement de plusieurs accessoires", "création de deux petites barrettes indépendantes", "repérage d’un circuit sous le réseau"] },
      { id: "installation", title: "Installation et repérage", paragraphs: ["La carte peut être séparée en deux barrettes lorsque la place est limitée. Inscrivez la tension, la polarité ou le numéro du circuit sur la zone blanche avant de raccorder les fils."], warning: "Respectez la limite de l’alimentation et la section des fils. La carte était donnée pour un maximum de 10 A et 250 V." },
    ],
    gallery: [image("/images/details/lec030301-separation.webp", "Bornier mini séparé en deux barrettes", "Séparation des deux lignes de quatre plots"), image("/images/details/lec030301-cablage.webp", "Exemple de câblage du bornier mini", "Distribution locale vers plusieurs accessoires")],
  },
  LEC032002: {
    details: [
      {
        id: "applications",
        title: "Applications possibles",
        paragraphs: ["Le module commande automatiquement un moteur à courant continu dans les deux sens, avec accélération, freinage et arrêt réglables."],
        bullets: ["navette automatique par consommation de courant", "navette commandée par deux ILS, pédales ou capteurs", "animation d’un funiculaire", "commande d’un autre système motorisé en courant continu"],
        warning: "Le module produit un courant pulsé et ne convient pas aux locomotives équipées d’un décodeur DCC.",
      },
      {
        id: "navette-consommation",
        title: "Navette automatique par consommation de courant",
        paragraphs: ["Branchez une alimentation continue de 8 à 16 V adaptée aux locomotives, puis la voie sur la sortie A–B. Isolez le même rail dans les deux zones d’arrêt et raccordez-les à B1 et B2."],
        steps: ["Placez le train au milieu de la voie.", "Réglez DECEL au minimum de temps de freinage.", "Mettez le module sous tension.", "Vérifiez que chaque zone commande le bon sens de marche.", "Si le train dépasse le capteur, coupez l’alimentation et inversez B1 et B2."],
        images: [image("/images/details/lec032002-navette.webp", "Câblage d’une navette par consommation de courant", "Navette automatique avec deux zones isolées")],
      },
      {
        id: "navette-ils",
        title: "Navette commandée par des ILS ou des pédales",
        paragraphs: ["Au lieu des zones de consommation, raccordez les deux contacts marquant le début du freinage à ILS1 et ILS2. Les capteurs doivent être suffisamment éloignés des extrémités pour laisser au train sa distance d’arrêt."],
        images: [image("/images/details/lec032002-ils.webp", "Câblage d’une navette avec deux ILS", "Navette commandée par deux contacts de voie")],
      },
      {
        id: "funiculaire",
        title: "Animer un funiculaire",
        paragraphs: ["Branchez le moteur à courant continu sur A–B et les deux capteurs d’extrémité sur ILS1 et ILS2. Commencez les essais avec une décélération très courte afin d’éviter toute collision, puis augmentez-la progressivement."],
        images: [image("/images/details/lec032002-funiculaire.webp", "Câblage du module pour un funiculaire", "Commande d’un funiculaire avec deux capteurs")],
      },
      {
        id: "reglages",
        title: "Régler la vitesse, l’arrêt et les rampes",
        paragraphs: ["Quatre potentiomètres règlent la vitesse maximale, la temporisation avant redémarrage, l’accélération et la décélération."],
        steps: ["Placez MAX SPEED au maximum.", "Placez DELAY au minimum.", "Placez ACCEL et DECEL sur les temps les plus courts.", "Vérifiez d’abord le va-et-vient.", "Ajustez la vitesse maximale.", "Augmentez progressivement DECEL, puis ACCEL.", "Réglez enfin DELAY pour obtenir le temps d’arrêt souhaité."],
        warning: "Utilisez un petit tournevis plat et ne forcez jamais un potentiomètre lorsqu’il arrive en butée.",
      },
    ],
    gallery: [],
  },
};
