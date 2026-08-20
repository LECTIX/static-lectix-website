# Plan de migration de lectix.fr vers un site statique

> Audit réalisé le 20 août 2026 à partir du site public, de ses sitemaps et API WordPress, de la sauvegarde locale du site et des gabarits du mini-ERP. Plan mis à jour avec les décisions de cadrage du propriétaire de LECTIX.

## 1. Résumé exécutif

Le futur site ne doit pas être une copie statique de la boutique WooCommerce. Il doit devenir le **site de référence de la marque open source LECTIX** et une archive documentaire durable de ses produits, centrée sur quatre besoins :

1. présenter LECTIX comme une marque de produits électroniques open source pour le modélisme ferroviaire ;
2. permettre de retrouver les 18 produits et leurs usages ;
3. conserver notices, schémas, médias et liens vers les sources ouvertes ;
4. raconter l'histoire du projet dans une page À propos et préserver les URL utiles afin de ne pas casser les liens existants.

L'audit recense **88 URL dans les sitemaps** :

| Type | URL indexées | Contenu réel |
|---|---:|---|
| Pages WordPress | 48 | 19 pages françaises, dont beaucoup d'écrans WooCommerce et de traductions anciennes |
| Produits | 30 | 18 produits français et 12 variantes traduites |
| Catégories | 10 | 5 catégories françaises utiles et 5 variantes traduites |
| **Total** | **88** | **18 fiches produit et quelques pages éditoriales à conserver** |

Le site actuel dépend de WordPress 6.4.3, WooCommerce 9.1.6, WPML et Elementor. La page d'accueil et le catalogue présentent encore prix, avis, compte, panier et état de stock, alors que la boutique est fermée. Ces fonctions doivent disparaître.

## 2. Recommandation technique

### Framework retenu : Astro

Je recommande **Astro en sortie entièrement statique** (`output: "static"`). Astro est particulièrement adapté ici parce qu'il :

- génère du HTML léger sans JavaScript côté client par défaut ;
- propose des collections de contenu typées, idéales pour les 18 produits ;
- accepte Markdown, MDX, JSON et HTML, ce qui facilite une migration progressive des descriptions ERP ;
- gère les routes dynamiques statiques, les images optimisées, les sitemaps et les balises SEO ;
- reste simple à héberger sur Cloudflare Pages, Netlify, GitHub Pages ou un hébergement web classique ;
- permet d'ajouter un peu de JavaScript uniquement pour une recherche ou des filtres, sans transformer le site en application.

Hugo ou Eleventy conviendraient également, mais Astro offre ici le meilleur compromis entre simplicité éditoriale, composants réutilisables, validation des données et reprise du HTML existant.

### Hébergement retenu : Hostinger

Le site restera chez **Hostinger**. Le build Astro générera un dossier `dist/` qui sera déployé dans un dossier d'hébergement indépendant du WordPress. La stratégie proposée est :

1. créer un nouveau dossier racine dédié au site statique ;
2. y déployer uniquement le contenu de `dist/`, jamais les sources ni les sauvegardes ;
3. le tester avec un sous-domaine ou une URL de préproduction ;
4. configurer les redirections, la page 404 et les en-têtes de cache dans un `.htaccess` versionné ;
5. faire pointer `lectix.fr` vers ce nouveau dossier après recette ;
6. conserver temporairement l'ancien dossier WordPress, non exposé publiquement, pour permettre un retour arrière rapide.

Le premier déploiement peut être manuel par SFTP. Son automatisation pourra ensuite être ajoutée avec les secrets Hostinger stockés dans GitHub Actions, jamais dans le dépôt.

## 3. Ce que révèle l'audit

### 3.1 Navigation et pages visibles

La navigation principale actuelle contient : Open source, Boutique, Mon compte et Contact. Le pied de page ajoute Panier, Livraison et retours, CGV et Mentions légales. Après fermeture, la navigation cible devrait se limiter à :

- Produits ;
- Open source ;
- À propos ;
- Informations légales.

La page d'accueil ne comporte pas de `h1` visible et met surtout en avant dix produits, des prix, des avis et des arguments commerciaux devenus obsolètes. Le nouveau message principal doit immédiatement présenter LECTIX comme une marque de produits électroniques open source pour le modélisme ferroviaire, puis renvoyer vers le catalogue et les sources.

### 3.2 Contenus éditoriaux à conserver

| URL actuelle | Contenu | Décision proposée |
|---|---|---|
| `/` | Accueil commercial et produits phares | Réécrire comme présentation de la marque open source |
| `/the-end/` | Chronologie de la fermeture et mot du fondateur | Reprendre le contenu dans `/a-propos/`, puis rediriger définitivement l'ancienne URL |
| `/open-source/` | Tutoriel de fabrication, licences et lien GitHub | Conserver et enrichir avec un index des dépôts |
| `/mentions/` | Informations sur l'ancienne société et l'hébergeur | Remplacer par des informations actuelles uniquement ; retirer les données de la société fermée |
| `/contact-us/` | Formulaire actuellement défaillant et adresse e-mail | Remplacer par une page sans formulaire ou rediriger vers la contribution GitHub |
| `/delivery/` | Tarifs, délais, retours et garantie de la boutique | Supprimer et rediriger vers `/a-propos/` |
| `/conditions-generales/` | CGV de la boutique, 26 sections | Supprimer du site public et rediriger vers les informations légales actuelles |
| `/retractation/` | Formulaire de rétractation | Supprimer et rediriger vers `/a-propos/` |
| `/politique-de-confidentialite/` | Politique liée à la boutique et aux traitements WordPress | Remplacer par une courte politique adaptée au site statique |
| `/politique-de-cookies-ue/` | Politique générée pour WooCommerce, WordPress, PayPal, Tidio, reCAPTCHA, etc. | Remplacer par les informations actuelles sur la mesure d'audience PostHog sans cookie |
| `/merci/` | Confirmation de commande | Supprimer et rediriger vers `/` |
| `/store/` et `/boutique/` | Catalogue WooCommerce | Remplacer par le catalogue statique `/produits/` |
| `/my-account/`, `/checkout/`, `/cart/` | Écrans transactionnels | Supprimer et rediriger vers `/produits/` ou `/` |

### 3.3 Catalogue produit

Les 18 produits français doivent tous être conservés comme fiches d'archive. Les prix, promotions, stock, panier et formulaire d'avis ne doivent pas être repris. Chaque fiche doit afficher un bandeau explicite : **« Produit archivé — n'est plus commercialisé par LECTIX »**.

| Code | Produit / URL française actuelle | Source ouverte à relier | État du contenu |
|---|---|---|---|
| LEC011102 | `/produit/relais-temporise-10-min/` | `LECTIX/LEC011102-Relais-Temporise-10min` | Description ERP riche, notice et 5 schémas |
| LEC022102 | `/produit/relais-bistable-universel-12v-copie/` | `LECTIX/LEC022102-Relais-bistable-universel-4RT` | Description ERP, 3 schémas |
| LEC022001 | `/produit/relais-bistable-universel-12v/` | `LECTIX/LEC022001-Relais-bistable-universel-12V` | Description ERP, 3 schémas |
| LEC000043 | `/produit/detecteur-doccupation-dcc-par-consommation-de-courant-3a/` | `LECTIX/LEC000043-Detecteur-de-presence-DCC-Analogique-3A` | Description très riche, 2 notices et 14 schémas |
| LEC005001 | `/produit/led-declairage-interieur-10-pcs/` | `LECTIX/LEC005001-LED-d-eclairage-interieur` | Description courte à compléter depuis les sources |
| LEC032002 | `/produit/module-navette-analogique/` | `LECTIX/LEC032002-Module-va-et-vient-pour-navette-en-analogique-ou-funiculaire` | Description riche, notice et schémas ; lien GitHub actuel erroné |
| LEC030301 | `/produit/bornier-de-distribution-secable-2-x-4-plots/` | `LECTIX/LEC030301-Bornier-de-distribution-secable-mini-2-x-4-plots` | Description absente du rendu WordPress, disponible dans l'ERP |
| LEC030201 | `/produit/bornier-de-distribution-secable-xl/` | `LECTIX/LEC030201-Bornier-de-distribution-secable-XL-2-x-16-plots` | Description absente du rendu WordPress, disponible dans l'ERP |
| LEC030001 | `/produit/bornier-de-distribution-secable/` | `LECTIX/LEC030001-Bornier-de-distribution-secable-2-x-8-plots` | Description absente du rendu WordPress, disponible dans l'ERP |
| LEC011001 | `/produit/relais-temporise/` | `LECTIX/LEC011001-Relais-Temporise-3min30` | Description ERP riche, notice et 5 schémas |
| LEC001021 | `/produit/module-de-freinage-dcc-3a/` | `LECTIX/LEC001021-Module-de-freinage-DCC-3A` | Description riche, notices multilingues, schémas et vidéo |
| LEC200014R | `/produit/lec200014r/` | Pas de dépôt produit identifié | Description courte ; accessoire générique |
| LEC200014B | `/produit/lec200014b/` | Pas de dépôt produit identifié | Description courte ; accessoire générique |
| LEC009002 | `/produit/detecteur-ir/` | `LECTIX/LEC009002-D-tecteur-IR` | Description riche, notice, schémas et GIF |
| LEC008011 | `/produit/module-sonore-pour-sons-dambiance/` | `LECTIX/LEC008011---Module-sonore-pour-sons-d-ambiance` | Description WordPress, notice et liste de 14 sons |
| LEC001020 | `/produit/module-de-freinage-dcc/` | `LECTIX/LEC001020-Module-de-freinage-DCC-1A` | HTML ERP ancien/minifié, notices, schémas et vidéo |
| LEC000042A | `/produit/detecteur-doccupation-analogique/` | `LECTIX/LEC000042-Detecteur-de-presence-DCC-Analogique-1A` | HTML ERP ancien/minifié, notice et nombreux schémas |
| LEC000042 | `/produit/detecteur-dcc/` | `LECTIX/LEC000042-Detecteur-de-presence-DCC-Analogique-1A` | Fiche la plus riche, notices, nombreux schémas, vidéo et 28 avis actuels |

Points particuliers relevés :

- la fiche LEC032002 renvoie actuellement vers le dépôt du détecteur LEC000042 au lieu de son propre dépôt ;
- des images de LEC011001 pointent encore vers `dev.lectix.fr` ;
- les chemins des notices ne sont pas homogènes : `/static/...` et `/produit/.../documents/...` coexistent ;
- trois fiches de borniers n'affichent aucune description sur le site, alors que leurs gabarits existent dans l'ERP ;
- une partie du HTML ERP contient un document HTML complet (`<body>`, styles globaux et balisage minifié) injecté dans WooCommerce ; il ne faut pas le recopier tel quel ;
- les avis contiennent des noms de clients. Ils ne sont pas nécessaires à l'archive et ne doivent pas être migrés par défaut ;
- les anciennes sauvegardes comportent des factures, journaux WooCommerce et autres données opérationnelles. **Aucun fichier ne doit être copié en masse depuis `wp-content/uploads`**.

### 3.4 Catégories

Les catégories utiles sont :

- Accessoires ;
- Analogique ;
- Digital (DCC) ;
- Relais, sous-catégorie d'Accessoires ;
- Éclairage, sous-catégorie d'Accessoires.

La catégorie `~Archives` est vide et `Non classé` ne contient aucun produit. Elles peuvent être supprimées. Les cinq URL françaises de catégories actuelles seront conservées comme pages statiques ou redirigées vers leur vue équivalente du catalogue.

### 3.5 Langues

Le site mélange WPML et des URL à paramètres. Les sitemaps exposent surtout le français, l'anglais et l'allemand, avec quelques écrans commerciaux en espagnol et italien. L'ERP contient cependant des gabarits en `fr`, `en`, `de`, `es` et `it` pour 13 familles de produits ; LEC022001, LEC022102 et LEC032002 n'ont que le français et l'anglais, et LEC005001 seulement le français.

La première version sera **uniquement en français**. Les contenus multilingues restent utiles comme sources, mais ne seront pas publiés dans ce premier lot.

1. toutes les anciennes URL à `?lang=...` redirigeront vers leur page française équivalente ;
2. aucun `hreflang` ne sera généré en première version ;
3. l'architecture de contenu conservera un champ de langue afin de permettre une extension ultérieure sans refonte ;
4. anglais, allemand, espagnol et italien ne seront ajoutés que si le trafic et la maintenance future le justifient.

## 4. Architecture d'information cible

```text
/
├── produits/
│   ├── index                         catalogue des 18 produits
│   └── catégories/                   vues de filtre facultatives
├── produit/
│   └── [slug]/                       18 URL historiques françaises conservées
├── open-source/                      licences, tutoriel et index des dépôts
├── a-propos/                         histoire de LECTIX et ancien contenu de The end
├── informations-legales/             informations actuelles, confidentialité et éditeur
└── 404.html
```

Conserver exactement les slugs français `/produit/.../` évite une redirection pour les pages qui ont le plus de liens entrants. `/store/` et `/boutique/` redirigeront vers `/produits/`.

### Contenu de l'accueil

1. message principal : « LECTIX, des produits électroniques open source pour le modélisme ferroviaire » ;
2. courte présentation de la marque, de ses domaines d'application et de sa démarche open source ;
3. deux actions principales : « Consulter les produits » et « Accéder aux sources » ;
4. sélection des principales familles de produits ;
5. explication courte des licences matérielles et logicielles ;
6. lien discret vers la page À propos, qui porte l'histoire et la fermeture de l'entreprise.

### Modèle d'une fiche produit

1. nom, code et catégorie ;
2. bandeau « produit archivé / non commercialisé » ;
3. résumé et usages ;
4. caractéristiques et compatibilité ;
5. installation et câblage ;
6. exemples d'utilisation ;
7. galerie de schémas et photos ;
8. notices téléchargeables avec langue et version ;
9. dépôt GitHub, licences et éventuelles consignes de programmation ;
10. produits liés.

## 5. Architecture du projet Astro

Structure proposée :

```text
src/
├── components/
│   ├── ArchiveNotice.astro
│   ├── ProductCard.astro
│   ├── ProductGallery.astro
│   ├── DownloadList.astro
│   ├── SourceRepository.astro
│   └── Analytics.astro
├── content/
│   ├── config.ts
│   ├── products/*.mdx
│   └── pages/*.md
├── layouts/
│   ├── BaseLayout.astro
│   └── ProductLayout.astro
├── pages/
│   ├── index.astro
│   ├── produits/index.astro
│   ├── produit/[slug].astro
│   ├── open-source.astro
│   └── a-propos.astro
└── styles/
public/
├── assets/products/[code]/
├── documents/[code]/
├── favicon.*
├── robots.txt
└── .htaccess
scripts/
├── import-wordpress.mjs
├── import-erp.mjs
├── build-asset-manifest.mjs
└── check-legacy-urls.mjs
```

### Schéma de données produit

Chaque produit doit être validé par une collection de contenu avec, au minimum :

```yaml
sku: LEC000042
slug: detecteur-dcc
title: Détecteur d’occupation DCC 1A par consommation de courant
status: archived
categories: [digital-dcc]
summary: ...
sourceRepository: https://github.com/LECTIX/...
licenses:
  hardware: CERN-OHL-S-2.0
  software: GPL-3.0
manuals:
  - language: fr
    file: /documents/LEC000042/manual_fr.pdf
images: [...]
videos: [...]
relatedProducts: [...]
legacyUrls: [...]
```

Ne pas stocker de prix actif, de stock ou de données d'avis dans ce modèle. Si une valeur historique doit être conservée pour mémoire, elle doit être explicitement libellée comme telle et ne pas utiliser de balisage Schema.org `Offer`.

## 6. Stratégie de migration du contenu

### Source de vérité

Utiliser les sources dans cet ordre :

1. gabarits produit du mini-ERP pour la structure et les traductions ;
2. API WordPress publique pour le contenu éditorial, les résumés et les slugs ;
3. sitemaps pour l'inventaire des URL et médias indexés ;
4. dépôts GitHub publics des produits pour vérifier les sources, licences et fichiers techniques ;
5. sauvegarde locale pour retrouver un média manquant, uniquement après vérification qu'il est public.

### Transformation des descriptions ERP

Un script d'import doit :

1. lire les gabarits `listing/wc/<langue>/` ;
2. retirer `<html>`, `<head>`, `<body>`, CSS global et classes propres à l'ancien template ;
3. convertir titres, paragraphes, listes, images et liens en Markdown/MDX propre ;
4. remplacer les URL absolues `lectix.fr/static/...` par des fichiers locaux ;
5. détecter les ressources manquantes et produire un rapport bloquant ;
6. conserver les textes traduits comme documents séparés, sans mélanger les langues ;
7. valider manuellement chaque fiche générée avant publication.

Pour la première version, il est acceptable de rendre un fragment HTML nettoyé avec `set:html`, mais le contenu doit être assaini et isolé. L'objectif durable est du Markdown/MDX structuré.

### Médias et documents

- créer un manifeste explicite des 90 images référencées dans le sitemap produit et des ressources `/static/` réellement utilisées ;
- reprendre les notices depuis les dossiers ERP quand elles existent ;
- choisir un seul original par image et supprimer les doublons WordPress de tailles différentes ;
- générer AVIF/WebP pour les photos, mais conserver PNG/SVG pour les schémas quand cela préserve mieux la lisibilité ;
- conserver les PDF tels quels, avec titre, langue, taille et date/version si disponible ;
- fournir un texte alternatif descriptif pour chaque image utile ;
- exclure strictement factures, journaux, caches, sauvegardes, fichiers d'administration et données clients.

## 7. Plan des redirections

Le fichier `.htaccess` final doit être généré à partir d'une table de redirections versionnée et testé automatiquement sur l'environnement Hostinger de préproduction.

### Pages françaises

| Ancienne URL | Destination |
|---|---|
| `/store/`, `/boutique/` | `/produits/` |
| `/the-end/` | `/a-propos/` |
| `/contact-us/` | `/open-source/#contribuer` ou une page de contact statique |
| `/delivery/`, `/retractation/` | `/a-propos/` |
| `/conditions-generales/` | `/informations-legales/` |
| `/politique-de-confidentialite/`, `/politique-de-cookies-ue/` | `/informations-legales/` |
| `/merci/` | `/` |
| `/my-account/`, `/checkout/`, `/cart/` | `/produits/` |

### Variantes linguistiques de pages recensées

Les groupes suivants couvrent toutes les variantes du sitemap de pages :

- accueil : `/?lang=en`, `/?lang=de` ;
- boutique : `/shop/?lang=en`, `/shop/?lang=de`, `/negozio/?lang=it`, `/tienda/?lang=es`, `/store/?lang=en`, `/shop-2/?lang=de` ;
- livraison/rétractation : `/delivery-and-returns/?lang=en`, `/withdrawal/?lang=en`, `/widerruf/?lang=de` ;
- politique cookies : `/politique-de-cookies-ue/?lang=en|de|es|it` ;
- contact : `/contact-us/?lang=en` ;
- remerciement : `/thank-you/?lang=en`, `/dankeschoen/?lang=de`, `/gracias/?lang=es`, `/grazie/?lang=it` ;
- compte : `/my-account-2/?lang=en`, `/mein-account/?lang=de`, `/mi-cuenta/?lang=es`, `/il-mio-account/?lang=it` ;
- commande : `/checkout-2/?lang=en`, `/zur-kasse/?lang=de`, `/confirmar/?lang=es`, `/completa-transazione/?lang=it` ;
- panier : `/cart-2/?lang=en`, `/einkaufswagen/?lang=de`, `/carrito/?lang=es`, `/carrello/?lang=it`.

Les routes transactionnelles traduites redirigeront vers le catalogue. Les routes éditoriales traduites iront vers leur traduction propre lorsqu'elle existe, sinon vers la page française canonique.

### Variantes produit recensées

Les 12 URL traduites du sitemap produit doivent être ajoutées à la table de redirections :

- `/produit/detecteur-doccupation-analogique/?lang=en` ;
- `/produit/lec200014b/?lang=en` ;
- `/produit/distribution-terminal-secable-xl/?lang=en` ;
- `/produit/bornier-de-distribution-secable-xl/?lang=de` ;
- `/produit/module-de-freinage-dcc/?lang=en` ;
- `/produit/distribution-terminal-breakout/?lang=en` ;
- `/produit/breakout-terminal-block-2-x-8-pin-copie/?lang=en` ;
- `/produit/dcc-braking-module-3a/?lang=en` ;
- `/produit/detecteur-dcc/?lang=en` ;
- `/produit/timer-relay/?lang=en` ;
- `/produit/red-push-button/?lang=en` ;
- `/produit/ir-sensor/?lang=en`.

### Catégories recensées

Conserver ou rediriger les cinq routes françaises :

- `/categorie-produit/accessoires/` ;
- `/categorie-produit/analogique/` ;
- `/categorie-produit/digital-dcc/` ;
- `/categorie-produit/accessoires/relais/` ;
- `/categorie-produit/accessoires/eclairage/`.

Ajouter les variantes anglaises et allemande à la table :

- `/product-category/accessories/?lang=en` ;
- `/product-category/analog/?lang=en` ;
- `/product-category/digital-dcc-en/?lang=en` ;
- `/product-category/accessories/relay/?lang=en` ;
- `/categorie-produit/accessoires-de/?lang=de`.

## 8. SEO, accessibilité et confidentialité

### SEO

- un seul `h1` par page ;
- titres et descriptions spécifiques aux 18 produits ;
- URL françaises produit conservées ;
- canonical absolu et sitemap propre ; aucun `hreflang` en première version française ;
- données structurées `Product` sans `Offer`, ou `TechArticle` si cela décrit mieux l'archive ;
- page 404 utile avec accès au catalogue ;
- aucune URL WordPress, API, panier ou compte dans le nouveau sitemap ;
- redirections permanentes testées pour les 88 URL historiques.

### Accessibilité

- navigation utilisable au clavier et lien d'évitement ;
- contrastes WCAG AA ;
- titres hiérarchisés ;
- schémas agrandissables sans piège au clavier ;
- tableaux utilisables sur mobile ;
- alternatives textuelles et légendes pour les schémas ;
- vidéos avec titre et lien direct vers la plateforme.

### Confidentialité

Le site fonctionnera sans compte, publicité ni cookie non essentiel. Une mesure d'audience basique sera assurée par **PostHog Cloud EU**, uniquement pour décider si la fréquentation justifie de continuer à maintenir le site, l'hébergement et le nom de domaine.

Configuration minimale visée, à vérifier contre la version du SDK lors de l'implémentation :

```js
posthog.init(PUBLIC_POSTHOG_TOKEN, {
  api_host: "https://eu.i.posthog.com",
  cookieless_mode: "always",
  autocapture: false,
  capture_pageview: true,
  capture_pageleave: false,
  capture_dead_clicks: false,
  capture_exceptions: false,
  capture_heatmaps: false,
  capture_performance: false,
  disable_session_recording: true,
  disable_surveys: true,
  advanced_disable_flags: true,
  person_profiles: "identified_only",
  respect_dnt: true,
});
```

Règles complémentaires :

- ne jamais appeler `posthog.identify()` ;
- ne transmettre aucun nom, e-mail, identifiant client ou propriété personnalisée ;
- nettoyer les paramètres de requête et fragments avant l'envoi de l'URL de page ;
- limiter l'usage aux événements `$pageview` et aux agrégats pages vues / visiteurs ;
- désactiver aussi dans le projet PostHog les fonctionnalités non utilisées ;
- choisir une durée de conservation courte et documentée ;
- exposer une option simple de refus et respecter le signal Do Not Track dans la mesure prise en charge par le navigateur ;
- décrire PostHog, la finalité, les données envoyées, l'hébergement européen et la durée de conservation dans `/informations-legales/` ;
- vérifier les obligations juridiques applicables avant la mise en production : le mode sans cookie réduit la collecte, mais ne dispense pas le propriétaire du site de documenter le traitement.

La documentation officielle PostHog confirme que le mode `cookieless_mode: "always"` n'utilise ni cookie, ni session storage, ni local storage, et que l'instance Cloud EU est hébergée à Francfort. Sources : [configuration JavaScript](https://posthog.com/docs/libraries/js/config), [Web Analytics](https://posthog.com/docs/web-analytics), [confidentialité](https://posthog.com/docs/privacy).

## 9. Lots de réalisation

### Lot 1 — Socle technique

- initialiser Astro, TypeScript strict et la collection `products` ;
- créer les layouts, la feuille de style globale et les composants principaux ;
- configurer formatage, lint, build et prévisualisation de branche ;
- ajouter `robots.txt`, sitemap, `.htaccess` et configuration Hostinger ;
- créer le dossier Hostinger indépendant et une URL de préproduction.

**Critère de sortie :** une page d'accueil, une page de contenu et une fiche produit factice sont générées sans JavaScript inutile.

### Lot 2 — Extraction et normalisation

- figer une exportation des sitemaps et de l'API WordPress ;
- construire l'inventaire des médias et documents ;
- importer les 18 fiches depuis WordPress et l'ERP ;
- corriger les liens GitHub, chemins de notices et références à `dev.lectix.fr` ;
- produire un rapport de contenu incomplet.

**Critère de sortie :** 18 fiches valides, sans ressource distante obligatoire autre que GitHub/YouTube.

### Lot 3 — Expérience du site

- construire l'accueil de présentation de la marque open source ;
- construire le catalogue et ses filtres par catégorie ;
- finaliser le modèle produit, les galeries, téléchargements et produits liés ;
- créer `/a-propos/` à partir du contenu pertinent de `/the-end/` ;
- reprendre `/open-source/` et réécrire les informations légales sans données obsolètes de l'ancienne société ;
- intégrer PostHog dans un composant isolé avec la configuration minimale définie ci-dessus ;
- rendre le site entièrement responsive.

**Critère de sortie :** tout le contenu utile du site actuel est accessible sans fonctionnalité e-commerce.

### Lot 4 — URL, langues et SEO

- préserver les 18 slugs produit français ;
- implémenter et tester toutes les redirections ;
- générer les métadonnées et données structurées ;
- rediriger toutes les anciennes variantes linguistiques vers le français ;
- conserver une structure de contenu extensible sans publier d'autres langues.

**Critère de sortie :** aucune des 88 URL recensées ne renvoie une 404 non intentionnelle.

### Lot 5 — Qualité et mise en production

- valider le HTML, les liens, l'accessibilité et l'affichage mobile ;
- lancer Lighthouse sur accueil, catalogue, fiche produit et page éditoriale ;
- vérifier toutes les notices et tous les dépôts GitHub ;
- tester le dossier Hostinger de préproduction, PostHog et les redirections ;
- sauvegarder le WordPress, faire pointer le domaine vers le nouveau dossier, puis surveiller les 404 et les pages vues.

**Critère de sortie :** zéro lien interne cassé, zéro média manquant, build reproductible et score Lighthouse cible supérieur à 90 dans les quatre catégories principales.

## 10. Automatisation et contrôles à intégrer

À chaque pull request :

```text
npm run format:check
npm run lint
npm run build
npm run check:links
npm run check:legacy-urls
npm run test:a11y
```

Le contrôle `check:legacy-urls` doit lire l'inventaire versionné et confirmer pour chaque ancienne URL l'une des issues suivantes : page statique générée, redirection permanente ou suppression explicitement documentée.

## 11. Décisions de cadrage

### Décisions actées

1. **Langue de la première version :** français uniquement.
2. **Page d'accueil :** présenter LECTIX comme une marque de produits électroniques open source pour le modélisme ferroviaire, sans message de fermeture en introduction.
3. **Page historique :** remplacer `/the-end/` par `/a-propos/`, en reprenant le contenu historique pertinent.
4. **Mentions historiques :** retirer les anciennes coordonnées, identifiants de société, CGV et informations qui ne sont plus d'actualité.
5. **Avis clients :** ne migrer ni les avis, ni les noms, ni le score agrégé.
6. **Hébergement :** Hostinger, dans un dossier indépendant du WordPress.
7. **Mesure d'audience :** PostHog Cloud EU en configuration minimale et sans cookie.
8. **Identité visuelle :** conserver la charte LECTIX actuelle, en l'adaptant aux composants du site statique.

### Décision restant à confirmer

- **Contact :** aucun contact, adresse e-mail générique, ou orientation vers les issues GitHub.

## 12. Définition de « terminé »

La migration pourra être considérée comme terminée lorsque :

- les 18 produits disposent d'une fiche complète et relue ;
- notices, schémas et dépôts sources sont accessibles ;
- aucune fonction d'achat ou promesse de support n'est encore présentée comme active ;
- les 88 URL du sitemap historique ont un comportement défini et testé ;
- les données personnelles et fichiers opérationnels sont absents du dépôt et du build ;
- le site fonctionne sans base de données, PHP, WordPress ou ERP ;
- le build peut être régénéré depuis GitHub et déployé dans le dossier Hostinger indépendant ;
- PostHog ne collecte que les pages vues prévues, sans autocapture ni enregistrement de session ;
- une sauvegarde du WordPress est conservée hors du dépôt public avant sa mise hors ligne.

## 13. Ordre recommandé des prochains travaux

1. confirmer uniquement le mode de contact ;
2. créer le socle Astro et le schéma de contenu ;
3. écrire l'importeur sur deux produits représentatifs : LEC000042 (fiche complexe) et LEC030001 (description absente du WordPress) ;
4. faire valider le rendu de ces deux fiches ;
5. migrer les 16 autres produits ;
6. construire l'accueil, À propos, les pages éditoriales, PostHog, les redirections et la préproduction Hostinger ;
7. effectuer la recette complète avant la bascule de `lectix.fr`.
