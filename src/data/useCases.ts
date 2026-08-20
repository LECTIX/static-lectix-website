export type UseCaseCategory = "Circulation et sécurité" | "Détection et commande" | "Décor et câblage";

export type UseCaseProduct = {
  code: string;
  anchor: string;
};

export type UseCase = {
  id: string;
  title: string;
  summary: string;
  category: UseCaseCategory;
  products: UseCaseProduct[];
};

export const useCaseCategories: UseCaseCategory[] = ["Circulation et sécurité", "Détection et commande", "Décor et câblage"];

export const useCases: UseCase[] = [
  {
    id: "cantonnement-dcc",
    title: "Réaliser un cantonnement DCC",
    summary: "Espacez automatiquement plusieurs trains : l’occupation d’un canton commande l’arrêt progressif du convoi qui arrive dans le canton précédent.",
    category: "Circulation et sécurité",
    products: [
      { code: "LEC000042", anchor: "cantonnement-complet" },
      { code: "LEC000043", anchor: "cantonnement-complet" },
      { code: "LEC001020", anchor: "applications" },
      { code: "LEC001021", anchor: "applications" },
    ],
  },
  {
    id: "cantonnement-analogique",
    title: "Réaliser un cantonnement analogique",
    summary: "Coupez automatiquement la zone d’arrêt précédente lorsqu’un train occupe le canton suivant, sans module de freinage DCC.",
    category: "Circulation et sécurité",
    products: [{ code: "LEC000042A", anchor: "cantonnement-complet" }],
  },
  {
    id: "proteger-voie-cachee",
    title: "Protéger une voie cachée",
    summary: "Détectez un train ou un wagon resté dans une zone invisible et arrêtez le convoi suivant avant qu’il ne le rejoigne.",
    category: "Circulation et sécurité",
    products: [
      { code: "LEC000042", anchor: "protection-voie" },
      { code: "LEC000043", anchor: "protection-voie" },
      { code: "LEC009002", anchor: "applications" },
    ],
  },
  {
    id: "arret-signal",
    title: "Arrêter un train au pied d’un signal",
    summary: "Créez une zone de freinage ABC pour obtenir un ralentissement, un arrêt et un redémarrage progressifs en DCC.",
    category: "Circulation et sécurité",
    products: [
      { code: "LEC001020", anchor: "installation" },
      { code: "LEC001021", anchor: "installation" },
    ],
  },
  {
    id: "arret-gare",
    title: "Créer un arrêt temporisé en gare",
    summary: "Détectez l’arrivée du train, immobilisez-le pendant la durée choisie, puis autorisez automatiquement son départ.",
    category: "Circulation et sécurité",
    products: [
      { code: "LEC011001", anchor: "arret-gare-dcc" },
      { code: "LEC011102", anchor: "arret-gare-dcc" },
    ],
  },
  {
    id: "navette",
    title: "Faire circuler une navette analogique",
    summary: "Automatisez les allers-retours d’un train avec freinage, temps d’arrêt, accélération et vitesse maximale réglables.",
    category: "Circulation et sécurité",
    products: [{ code: "LEC032002", anchor: "navette-consommation" }],
  },
  {
    id: "funiculaire",
    title: "Animer un funiculaire",
    summary: "Inversez automatiquement un moteur à courant continu entre deux extrémités détectées par des ILS ou des contacts équivalents.",
    category: "Circulation et sécurité",
    products: [{ code: "LEC032002", anchor: "funiculaire" }],
  },
  {
    id: "proteger-aiguillage",
    title: "Protéger un aiguillage",
    summary: "Arrêtez automatiquement un train DCC lorsqu’un aiguillage n’est pas correctement positionné pour son itinéraire.",
    category: "Circulation et sécurité",
    products: [
      { code: "LEC001020", anchor: "applications" },
      { code: "LEC001021", anchor: "applications" },
    ],
  },
  {
    id: "detecter-occupation",
    title: "Détecter l’occupation d’une voie",
    summary: "Repérez une locomotive, un wagon éclairé ou un essieu graphité grâce à la consommation de courant de la zone surveillée.",
    category: "Détection et commande",
    products: [
      { code: "LEC000042", anchor: "applications" },
      { code: "LEC000042A", anchor: "applications" },
      { code: "LEC000043", anchor: "applications" },
    ],
  },
  {
    id: "detecter-sans-contact",
    title: "Détecter un passage sans modifier la voie",
    summary: "Utilisez un ou deux capteurs infrarouges pour détecter un train, un wagon ou un véhicule, indépendamment du courant de traction.",
    category: "Détection et commande",
    products: [{ code: "LEC009002", anchor: "applications" }],
  },
  {
    id: "signalisation",
    title: "Commander automatiquement la signalisation",
    summary: "Faites passer un feu bicolore du vert au rouge selon l’occupation d’une zone ou l’état d’un canton.",
    category: "Détection et commande",
    products: [
      { code: "LEC000042", anchor: "signalisation" },
      { code: "LEC000042A", anchor: "signalisation" },
      { code: "LEC000043", anchor: "signalisation" },
    ],
  },
  {
    id: "passage-niveau",
    title: "Commander un passage à niveau",
    summary: "Déclenchez l’animation à l’approche du train avec un détecteur d’occupation, un capteur infrarouge ou un contact temporisé.",
    category: "Détection et commande",
    products: [
      { code: "LEC009002", anchor: "applications" },
      { code: "LEC000042", anchor: "applications" },
      { code: "LEC011001", anchor: "applications" },
    ],
  },
  {
    id: "boucle-retournement",
    title: "Gérer une boucle de retournement DCC",
    summary: "Détectez successivement l’entrée et la sortie du train afin de commander l’inversion de polarité de la boucle.",
    category: "Détection et commande",
    products: [
      { code: "LEC009002", anchor: "boucle-retournement" },
      { code: "LEC022001", anchor: "applications" },
      { code: "LEC022102", anchor: "applications" },
    ],
  },
  {
    id: "aiguillage-zone-detection",
    title: "Inclure un aiguillage dans une zone de détection",
    summary: "Commutez le rail surveillé en même temps que l’aiguille pour conserver la détection sur les différentes branches de la voie.",
    category: "Détection et commande",
    products: [
      { code: "LEC000042", anchor: "aiguillage" },
      { code: "LEC000042A", anchor: "aiguillage" },
      { code: "LEC000043", anchor: "aiguillage" },
    ],
  },
  {
    id: "son-automatique",
    title: "Déclencher un son au passage d’un train",
    summary: "Jouez automatiquement un klaxon, une annonce ou un bruit d’ambiance lorsqu’un train entre dans une zone déterminée.",
    category: "Décor et câblage",
    products: [
      { code: "LEC008011", anchor: "installation" },
      { code: "LEC000042", anchor: "son-automatique" },
      { code: "LEC009002", anchor: "son-automatique" },
    ],
  },
  {
    id: "eclairage-temporise",
    title: "Allumer un éclairage pendant un temps défini",
    summary: "Une impulsion suffit pour allumer un quai, une pièce ou une animation pendant quelques secondes ou plusieurs minutes.",
    category: "Décor et câblage",
    products: [
      { code: "LEC011001", anchor: "eclairage-temporise" },
      { code: "LEC011102", anchor: "eclairage-temporise" },
    ],
  },
  {
    id: "eclairage-batiment",
    title: "Éclairer un bâtiment miniature",
    summary: "Installez une petite carte LED avec résistance intégrée pour éclairer une maison entière ou une pièce particulière.",
    category: "Décor et câblage",
    products: [{ code: "LEC005001", anchor: "installation" }],
  },
  {
    id: "distribuer-alimentation",
    title: "Distribuer proprement une alimentation",
    summary: "Répartissez deux lignes électriques vers plusieurs modules, éclairages ou accessoires et identifiez clairement chaque circuit.",
    category: "Décor et câblage",
    products: [
      { code: "LEC030001", anchor: "applications" },
      { code: "LEC030201", anchor: "applications" },
      { code: "LEC030301", anchor: "applications" },
    ],
  },
  {
    id: "ajouter-contacts",
    title: "Ajouter des contacts inverseurs",
    summary: "Complétez un moteur d’aiguillage, un interrupteur ou un autre relais lorsqu’il ne reste pas assez de contacts auxiliaires.",
    category: "Décor et câblage",
    products: [
      { code: "LEC022001", anchor: "extension-contacts" },
      { code: "LEC022102", anchor: "extension-contacts" },
    ],
  },
];
