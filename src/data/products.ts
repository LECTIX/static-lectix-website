export type Product = {
  slug: string;
  code: string;
  name: string;
  category: "Accessoires" | "Analogique" | "Digital DCC";
  summary: string;
  image: string;
  imageAlt: string;
  sourceRepository?: string;
  introduction: string;
  features: string[];
};

export const featuredProducts: Product[] = [
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
      "Temporisation réglable d'environ 10 secondes à 10 minutes",
      "Relais inverseur accessible sur bornier",
      "Déclenchement par bouton poussoir ou contact sec",
      "Schémas, nomenclature et fichiers de fabrication ouverts",
    ],
  },
  {
    slug: "module-navette-analogique",
    code: "LEC032002",
    name: "Module navette analogique",
    category: "Analogique",
    summary: "Fait circuler automatiquement un train entre deux extrémités de voie.",
    image: "/images/module-navette.webp",
    imageAlt: "Module électronique LECTIX pour navette analogique",
    introduction:
      "Ce module fait circuler un train entre deux extrémités de voie. La vitesse, le démarrage, le freinage et le temps d'arrêt peuvent être réglés.",
    features: [
      "Fonctionnement autonome pour une voie en navette",
      "Réglage de l'accélération, de la décélération et de la vitesse maximale",
      "Temps d'arrêt réglables aux deux extrémités",
      "Documentation technique à consolider lors de la migration complète",
    ],
  },
  {
    slug: "bornier-de-distribution-secable-xl",
    code: "LEC030201",
    name: "Bornier de distribution sécable XL",
    category: "Accessoires",
    summary: "Répartit l'alimentation électrique vers plusieurs éléments du réseau.",
    image: "/images/bornier-distribution-xl.webp",
    imageAlt: "Bornier de distribution sécable XL LECTIX",
    sourceRepository:
      "https://github.com/LECTIX/LEC030201-Bornier-de-distribution-secable-XL-2-x-16-plots",
    introduction:
      "Cette carte permet de raccorder plusieurs fils sur deux lignes électriques. Elle peut être coupée pour prendre moins de place sous le réseau.",
    features: [
      "Deux lignes de distribution indépendantes",
      "Seize points de raccordement",
      "Carte sécable pour adapter sa longueur",
      "Fichiers de fabrication disponibles sur GitHub",
    ],
  },
];

export const products = featuredProducts;
