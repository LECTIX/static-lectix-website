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
    summary: "Un relais réglable pour automatiser simplement une action sur le réseau.",
    image: "/images/relais-temporise.webp",
    imageAlt: "Carte électronique du relais temporisé LECTIX LEC011102",
    sourceRepository: "https://github.com/LECTIX/LEC011102-Relais-Temporise-10min",
    introduction:
      "Ce module commande un relais après une temporisation réglable. Il convient notamment aux automatismes de réseau, aux éclairages et aux accessoires temporisés.",
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
    summary: "Automatise les allers-retours d'une navette ou d'un funiculaire analogique.",
    image: "/images/module-navette.webp",
    imageAlt: "Module électronique LECTIX pour navette analogique",
    introduction:
      "Le module va-et-vient automatise la circulation d'un train entre deux extrémités en commande analogique, avec réglages de vitesse, d'accélération et d'arrêt.",
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
    summary: "Distribue proprement l'alimentation avec une carte adaptable à chaque installation.",
    image: "/images/bornier-distribution-xl.webp",
    imageAlt: "Bornier de distribution sécable XL LECTIX",
    sourceRepository:
      "https://github.com/LECTIX/LEC030201-Bornier-de-distribution-secable-XL-2-x-16-plots",
    introduction:
      "Cette carte distribue deux potentiels sur seize points de raccordement. Elle peut être recoupée pour s'adapter à la place disponible sous le réseau.",
    features: [
      "Deux lignes de distribution indépendantes",
      "Seize points de raccordement",
      "Carte sécable pour adapter sa longueur",
      "Fichiers de fabrication disponibles sur GitHub",
    ],
  },
];

export const products = featuredProducts;
