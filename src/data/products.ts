export type ProductCategory = "Accessoires" | "Analogique" | "Digital DCC";

export type Product = {
  slug: string;
  code: string;
  name: string;
  category: ProductCategory;
  summary: string;
  image: string;
  imageAlt: string;
  sourceRepository?: string;
  introduction: string;
  features: string[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "relais-temporise-10-min",
    code: "LEC011102",
    name: "Relais temporisé 10 min",
    category: "Accessoires",
    summary: "Commande automatiquement un accessoire pendant une durée réglable.",
    image: "/images/relais-temporise.webp",
    imageAlt: "Carte électronique du relais temporisé LECTIX LEC011102",
    sourceRepository: "https://github.com/LECTIX/LEC011102-Relais-Temporise-10min",
    introduction:
      "Ce module commande un relais pendant une durée réglable. Il peut servir pour un éclairage, un moteur ou un autre accessoire du réseau.",
    features: [
      "Temporisation réglable d’environ 10 secondes à 10 minutes",
      "Alimentation de 8 à 16 V, en courant continu ou alternatif",
      "Déclenchement par bouton poussoir, ILS ou autre contact",
      "Réglage simple avec un tournevis",
    ],
    featured: true,
  },
  {
    slug: "relais-bistable-universel-12v-copie",
    code: "LEC022102",
    name: "Relais bistable universel 4RT",
    category: "Accessoires",
    summary: "Commande quatre contacts inverseurs et garde sa position sans alimentation permanente.",
    image: "/images/relais-bistable-4rt.webp",
    imageAlt: "Relais bistable universel 4RT LECTIX LEC022102",
    sourceRepository: "https://github.com/LECTIX/LEC022102-Relais-bistable-universel-4RT",
    introduction:
      "Ce relais bistable conserve sa position après une impulsion. Ses quatre contacts indépendants permettent de commander plusieurs éléments en même temps.",
    features: [
      "Alimentation de 12 à 16 V, en courant continu ou alternatif",
      "Quatre contacts inverseurs indépendants",
      "Pouvoir de coupure maximal de 2 A",
      "Consommation maximale de 30 mA lorsqu’une bobine est alimentée",
    ],
  },
  {
    slug: "relais-bistable-universel-12v",
    code: "LEC022001",
    name: "Relais bistable universel 12 V",
    category: "Accessoires",
    summary: "Commande deux contacts inverseurs avec une simple impulsion.",
    image: "/images/relais-bistable-12v.webp",
    imageAlt: "Relais bistable universel 12 V LECTIX LEC022001",
    sourceRepository: "https://github.com/LECTIX/LEC022001-Relais-bistable-universel-12V",
    introduction:
      "Ce relais bistable garde sa position après une impulsion. Il convient pour commander simplement deux circuits sur un réseau miniature.",
    features: [
      "Alimentation de 12 à 16 V, en courant continu ou alternatif",
      "Deux contacts inverseurs indépendants",
      "Pouvoir de coupure maximal de 2 A",
      "Consommation de 15 mA lorsqu’une bobine est alimentée",
    ],
  },
  {
    slug: "detecteur-doccupation-dcc-par-consommation-de-courant-3a",
    code: "LEC000043",
    name: "Détecteur d’occupation DCC 3 A",
    category: "Digital DCC",
    summary: "Détecte un train sur une portion de voie DCC par sa consommation de courant.",
    image: "/images/detecteur-occupation-dcc-3a.webp",
    imageAlt: "Détecteur d’occupation DCC 3 A LECTIX LEC000043",
    sourceRepository: "https://github.com/LECTIX/LEC000043-Detecteur-de-presence-DCC-Analogique-3A",
    introduction:
      "Ce module détecte la présence d’un train sur une zone de voie DCC. Son relais peut ensuite commander un feu, un automatisme ou un autre module.",
    features: [
      "Détection dans les deux sens de circulation",
      "Sensibilité réglable de 1 à 10 mA",
      "Courant maximal supporté de 3 A",
      "Temporisation à la désactivation et entrée de forçage",
    ],
    featured: true,
  },
  {
    slug: "led-declairage-interieur-10-pcs",
    code: "LEC005001",
    name: "LED d’éclairage intérieur — lot de 10",
    category: "Accessoires",
    summary: "Éclaire simplement les bâtiments et les décors du réseau.",
    image: "/images/led-interieur.webp",
    imageAlt: "Lot de LED d’éclairage intérieur LECTIX LEC005001",
    sourceRepository: "https://github.com/LECTIX/LEC005001-LED-d-eclairage-interieur",
    introduction:
      "Ces petites cartes à LED sont prévues pour éclairer un bâtiment, une gare ou un autre élément du décor. La résistance est déjà intégrée.",
    features: [
      "Lumière blanche de ton froid",
      "Alimentation de 5 à 16 V en courant continu",
      "Résistance de 500 ohms intégrée",
      "Fixation possible avec une vis ou du ruban adhésif double face",
    ],
  },
  {
    slug: "module-navette-analogique",
    code: "LEC032002",
    name: "Module va-et-vient pour navette analogique",
    category: "Analogique",
    summary: "Fait circuler automatiquement un train ou un funiculaire entre deux extrémités.",
    image: "/images/module-navette.webp",
    imageAlt: "Module va-et-vient LECTIX pour navette analogique",
    sourceRepository:
      "https://github.com/LECTIX/LEC032002-Module-va-et-vient-pour-navette-en-analogique-ou-funiculaire",
    introduction:
      "Ce module fait circuler automatiquement un train analogique ou un funiculaire entre deux extrémités de voie.",
    features: [
      "Accélération et freinage progressifs",
      "Temps d’arrêt réglable de 1 seconde à plus de 3 minutes",
      "Réglage de la vitesse maximale et des courbes de marche",
      "Protection contre les courts-circuits",
    ],
    featured: true,
  },
  {
    slug: "bornier-de-distribution-secable-2-x-4-plots",
    code: "LEC030301",
    name: "Bornier de distribution mini — 2 × 4 plots",
    category: "Accessoires",
    summary: "Distribue deux lignes électriques vers quatre branchements chacune.",
    image: "/images/bornier-distribution-mini.webp",
    imageAlt: "Bornier de distribution mini LECTIX LEC030301",
    sourceRepository:
      "https://github.com/LECTIX/LEC030301-Bornier-de-distribution-secable-mini-2-x-4-plots",
    introduction:
      "Ce petit bornier répartit facilement deux lignes électriques. Il peut être séparé en deux barrettes indépendantes pour s’adapter à la place disponible.",
    features: [
      "Deux lignes de quatre points de raccordement",
      "Lot d’origine composé de cinq cartes",
      "Courant maximal de 10 A et tension maximale de 250 V",
      "Zone blanche pour noter la polarité ou un numéro",
    ],
  },
  {
    slug: "bornier-de-distribution-secable-xl",
    code: "LEC030201",
    name: "Bornier de distribution sécable XL — 2 × 16 plots",
    category: "Accessoires",
    summary: "Répartit deux lignes électriques vers seize branchements chacune.",
    image: "/images/bornier-distribution-xl.webp",
    imageAlt: "Bornier de distribution sécable XL LECTIX LEC030201",
    sourceRepository:
      "https://github.com/LECTIX/LEC030201-Bornier-de-distribution-secable-XL-2-x-16-plots",
    introduction:
      "Cette grande carte permet de raccorder plusieurs fils sur deux lignes électriques. Elle peut être coupée pour prendre moins de place sous le réseau.",
    features: [
      "Deux lignes de seize points de raccordement",
      "Courant maximal de 10 A et tension maximale de 250 V",
      "Carte sécable en deux barrettes indépendantes",
      "Zone blanche pour noter la polarité ou un numéro",
    ],
  },
  {
    slug: "bornier-de-distribution-secable",
    code: "LEC030001",
    name: "Bornier de distribution sécable — 2 × 8 plots",
    category: "Accessoires",
    summary: "Répartit deux lignes électriques vers huit branchements chacune.",
    image: "/images/bornier-distribution-2x8.webp",
    imageAlt: "Bornier de distribution sécable LECTIX LEC030001",
    sourceRepository: "https://github.com/LECTIX/LEC030001-Bornier-de-distribution-secable-2-x-8-plots",
    introduction:
      "Cette carte facilite la distribution de l’alimentation vers plusieurs appareils. Elle peut être séparée en deux barrettes indépendantes.",
    features: [
      "Deux lignes de huit points de raccordement",
      "Courant maximal de 10 A et tension maximale de 250 V",
      "Carte sécable en deux barrettes indépendantes",
      "Zone blanche pour noter la polarité ou un numéro",
    ],
  },
  {
    slug: "relais-temporise",
    code: "LEC011001",
    name: "Relais temporisé 3 min 30",
    category: "Accessoires",
    summary: "Commande automatiquement un accessoire pendant une courte durée réglable.",
    image: "/images/relais-temporise-3min30.webp",
    imageAlt: "Relais temporisé LECTIX LEC011001",
    sourceRepository: "https://github.com/LECTIX/LEC011001-Relais-Temporise-3min30",
    introduction:
      "Ce module active un relais pendant une durée réglable. Il peut commander un éclairage, une animation ou un autre accessoire.",
    features: [
      "Temporisation réglable d’environ 1 seconde à 3 minutes 30",
      "Alimentation de 8 à 16 V, en courant continu ou alternatif",
      "Déclenchement par bouton poussoir, ILS ou autre contact",
      "Réglage simple avec un tournevis",
    ],
  },
  {
    slug: "module-de-freinage-dcc-3a",
    code: "LEC001021",
    name: "Module de freinage DCC 3 A",
    category: "Digital DCC",
    summary: "Fait ralentir, arrêter puis redémarrer progressivement un train DCC.",
    image: "/images/module-freinage-dcc-3a.webp",
    imageAlt: "Module de freinage DCC 3 A LECTIX LEC001021",
    sourceRepository: "https://github.com/LECTIX/LEC001021-Module-de-freinage-DCC-3A",
    introduction:
      "Ce module utilise la technologie ABC pour obtenir des ralentissements et des arrêts progressifs sur un réseau DCC.",
    features: [
      "Compatible uniquement avec le DCC",
      "Courant maximal de 3 A",
      "Décodeur compatible ABC nécessaire",
      "Version recommandée pour l’échelle H0",
    ],
  },
  {
    slug: "lec200014r",
    code: "LEC200014R",
    name: "14 boutons poussoirs rouges de 7 mm",
    category: "Accessoires",
    summary: "Lot de boutons momentanés rouges pour commander les accessoires du réseau.",
    image: "/images/boutons-poussoirs-rouges.webp",
    imageAlt: "Lot de boutons poussoirs rouges LECTIX LEC200014R",
    introduction:
      "Ces boutons momentanés ferment le contact uniquement pendant l’appui. Les écrous et les rondelles de fixation sont compris dans le lot.",
    features: [
      "Lot de quatorze boutons rouges de 7 mm",
      "Contact normalement ouvert",
      "Tension maximale de 50 V continu ou 120 V alternatif",
      "Courant maximal de 0,5 A en continu et 3 A en pointe",
    ],
  },
  {
    slug: "lec200014b",
    code: "LEC200014B",
    name: "14 boutons poussoirs noirs de 7 mm",
    category: "Accessoires",
    summary: "Lot de boutons momentanés noirs pour commander les accessoires du réseau.",
    image: "/images/boutons-poussoirs-noirs.webp",
    imageAlt: "Lot de boutons poussoirs noirs LECTIX LEC200014B",
    introduction:
      "Ces boutons momentanés ferment le contact uniquement pendant l’appui. Les écrous et les rondelles de fixation sont compris dans le lot.",
    features: [
      "Lot de quatorze boutons noirs de 7 mm",
      "Contact normalement ouvert",
      "Tension maximale de 50 V continu ou 120 V alternatif",
      "Courant maximal de 0,5 A en continu et 3 A en pointe",
    ],
  },
  {
    slug: "detecteur-ir",
    code: "LEC009002",
    name: "Détecteur infrarouge",
    category: "Accessoires",
    summary: "Détecte le passage d’un train ou la présence d’un objet sans contact.",
    image: "/images/detecteur-ir.webp",
    imageAlt: "Détecteur infrarouge LECTIX LEC009002",
    sourceRepository: "https://github.com/LECTIX/LEC009002-D-tecteur-IR",
    introduction:
      "Ce module détecte un objet sans contact grâce à un ou deux capteurs infrarouges. Il peut commander un relais en mode direct ou bistable.",
    features: [
      "Distance de détection réglable jusqu’à 10 cm",
      "Fonctionne aussi à la lumière du jour",
      "Mode direct avec un capteur ou bistable avec deux capteurs",
      "Temporisation à la désactivation",
    ],
  },
  {
    slug: "module-sonore-pour-sons-dambiance",
    code: "LEC008011",
    name: "Module sonore pour sons d’ambiance",
    category: "Accessoires",
    summary: "Déclenche jusqu’à quatorze sons pour donner vie au réseau.",
    image: "/images/module-sonore.webp",
    imageAlt: "Module sonore LECTIX LEC008011 avec haut-parleur",
    sourceRepository: "https://github.com/LECTIX/LEC008011---Module-sonore-pour-sons-d-ambiance",
    introduction:
      "Ce module diffuse des klaxons, des bruits d’animaux ou d’autres ambiances sonores. Chaque son se déclenche avec un bouton, un ILS ou un autre contact.",
    features: [
      "Jusqu’à quatorze sons déclenchés séparément",
      "Sons personnalisables sur carte microSD",
      "Alimentation de 10 à 20 V en courant continu",
      "Haut-parleur directement raccordé au module",
    ],
  },
  {
    slug: "module-de-freinage-dcc",
    code: "LEC001020",
    name: "Module de freinage DCC 1 A",
    category: "Digital DCC",
    summary: "Fait ralentir, arrêter puis redémarrer progressivement un train DCC.",
    image: "/images/module-freinage-dcc-1a.webp",
    imageAlt: "Module de freinage DCC 1 A LECTIX LEC001020",
    sourceRepository: "https://github.com/LECTIX/LEC001020-Module-de-freinage-DCC-1A",
    introduction:
      "Ce module utilise la technologie ABC pour obtenir des ralentissements et des arrêts progressifs sur un réseau DCC.",
    features: [
      "Compatible uniquement avec le DCC",
      "Courant maximal de 1 A",
      "Décodeur compatible ABC nécessaire",
      "Version recommandée pour l’échelle N",
    ],
  },
  {
    slug: "detecteur-doccupation-analogique",
    code: "LEC000042A",
    name: "Détecteur d’occupation analogique",
    category: "Analogique",
    summary: "Détecte un train analogique sur une portion de voie par sa consommation de courant.",
    image: "/images/detecteur-occupation-analogique.webp",
    imageAlt: "Détecteur d’occupation analogique LECTIX LEC000042A",
    sourceRepository: "https://github.com/LECTIX/LEC000042-Detecteur-de-presence-DCC-Analogique-1A",
    introduction:
      "Ce module détecte la présence d’un train sur une zone de voie analogique. Son relais peut ensuite commander un feu ou un automatisme.",
    features: [
      "Détection dans un sens de circulation à partir de 6 V",
      "Seuil de détection sensible et réglable",
      "Relais inverseur pour commander un autre système",
      "Temporisation à la désactivation et entrée de forçage",
    ],
  },
  {
    slug: "detecteur-dcc",
    code: "LEC000042",
    name: "Détecteur d’occupation DCC 1 A",
    category: "Digital DCC",
    summary: "Détecte un train sur une portion de voie DCC par sa consommation de courant.",
    image: "/images/detecteur-occupation-dcc-1a.webp",
    imageAlt: "Détecteur d’occupation DCC 1 A LECTIX LEC000042",
    sourceRepository: "https://github.com/LECTIX/LEC000042-Detecteur-de-presence-DCC-Analogique-1A",
    introduction:
      "Ce module détecte la présence d’un train sur une zone de voie DCC. Son relais peut ensuite commander un feu, un automatisme ou un autre module.",
    features: [
      "Détection dans les deux sens de circulation",
      "Seuil de détection sensible et réglable",
      "Relais double inverseur pour commander d’autres systèmes",
      "Temporisation à la désactivation et entrée de forçage",
    ],
  },
];

export const featuredProducts = products.filter((product) => product.featured);
