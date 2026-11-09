# Site statique LECTIX

Première implémentation du site public qui remplacera le WordPress de `lectix.fr`.

Le catalogue statique contient les 16 produits électroniques open source conservés après la fermeture de LECTIX, classés en trois familles. Les prix, le stock, le panier, les avis clients et les accessoires génériques achetés pour la revente ne sont pas repris. Chaque fiche rassemble les explications, les principaux schémas et un lien direct vers le dépôt open source.

## Développement

```sh
npm install
npm run dev
```

Copier `.env.example` vers `.env` pour activer localement Turnstile ou remplacer le jeton public PostHog. Les secrets serveur ne doivent jamais être placés dans `.env` ni dans le dépôt.

La mesure d'audience PostHog est déjà reliée au projet LECTIX. Elle ne démarre que sur `lectix.fr` et `www.lectix.fr`, afin que les consultations locales ne faussent pas les statistiques. Le jeton de projet PostHog est public par conception ; `PUBLIC_POSTHOG_KEY` permet seulement de le remplacer. La configuration utilise uniquement `sessionStorage` : aucun cookie, aucun profil visiteur et aucun suivi persistant entre deux visites. Elle mesure les pages vues et quittées, les clics sur les liens et boutons, les Web Vitals et les erreurs JavaScript non gérées. Les valeurs saisies et les interactions du formulaire de contact, les enregistrements de session, les cartes de chaleur et les journaux de console restent exclus. Seuls les motifs techniques d’échec de la vérification du formulaire sont mesurés, sans jeton ni contenu saisi. Les signaux Do Not Track et Global Privacy Control sont respectés.

Le référencement est documenté dans `AUDIT_REFERENCEMENT.md`. Le build génère un sitemap limité aux pages éditoriales et produit, des données structurées JSON-LD et `/llms.txt`. Après `npm run build`, exécuter `npm run check:seo` pour vérifier titres, descriptions, canonicals, liens internes, JSON-LD, directives robots et concordance du sitemap.

## Vérifications

```sh
npm run check
npm run build
npm run check:seo
npm test
```

`npm test` nécessite Google Chrome installé. Les tests interceptent toutes les requêtes : aucun événement réel ni e-mail n’est envoyé.

Le résultat statique est généré dans `dist/`.

## Suivi des performances et des liens cassés

Le tableau [Lectix · Performances et liens cassés](https://eu.posthog.com/project/253861/dashboard/1098334) sépare les performances des pages utiles et les visites de pages 404. Il affiche le FCP hebdomadaire, les volumes et sessions par page, ainsi que les p75/p90 sur les 21 derniers jours complets comparés aux 21 précédents (UTC). Les robots connus et la cohorte interne sont exclus. Si une période a moins de 30 mesures, la comparaison est signalée comme fragile ; ce repère n’est pas un seuil de fiabilité statistique. Les requêtes et identifiants sont conservés dans `docs/posthog-performance.json`.

Chaque événement porte `site_page_status` (200 ou 404) et `$app_version`. Les vues historiques reconnaissent les anciennes pages 404 grâce au titre enregistré sur leurs pages vues ; cette détection est indicative lorsque la page vue manque. Les jours incomplets sont exclus. Les vues SQL ont des fenêtres fixes : le sélecteur de dates global du tableau ne remplace pas ces fenêtres.

`$app_version` provient de `PUBLIC_SITE_RELEASE` (le commit GitHub dans le déploiement automatique), sinon de Git avec un suffixe `-dirty` si les fichiers suivis ont été modifiés. Hors dépôt Git, la valeur est `unversioned`.

Les propriétés `navigation_*` mesurent le délai avant le premier octet, l’attente après l’envoi de la requête, le téléchargement, les étapes de traitement du document et les tailles de transfert. Une étape non terminée n’est pas publiée comme un zéro. Les informations de connexion se limitent à la catégorie fournie par le navigateur et au mode d’économie de données, sans adresse réseau. Le suivi reste limité à l’onglet, sans cookie ni profil persistant. Les paramètres et fragments d’URL sont retirés des URL principales, des URL de session et des objets Web Vitals.

Le formulaire attend une vérification valide avant l’envoi. Un échec, une expiration, un navigateur incompatible ou un chargement trop long affiche un message et un bouton de reprise sans effacer la saisie. La vérification serveur reste obligatoire. L’événement `contact_verification_error` contient seulement un motif prédéfini et, s’il existe, un code numérique. Les tests utilisent une vérification simulée ; ils ne démontrent pas la disponibilité réelle de Cloudflare ni la réception d’un e-mail.

L’essai d’allègement du 9 novembre 2026 a été évalué sur les fichiers générés, avant compression et après gzip. La version standard avec diagnostics pesait 253 400 octets (83 511 après gzip). Les bundles slim précompilés avec les deux extensions locales pesaient 294 237 octets (94 530 après gzip), et la variante ESM 662 069 octets (170 628 après gzip). La version standard et la dépendance `posthog-js` 1.418.13 sont conservées. Aucun gain de FCP en production n’est revendiqué ; les diagnostics doivent d’abord permettre d’attribuer les lenteurs.

Les nouvelles redirections sont exactes, acceptent les anciennes notices avec ou sans barre finale et laissent les URL inconnues en 404. Pour contrôler les réponses réelles, servir `dist/` avec Apache et les règles `.htaccess`, puis exécuter :

```sh
LECTIX_TEST_BASE_URL=http://127.0.0.1:18741 node scripts/check-redirects.mjs
```

Le serveur de développement Astro ne reproduit pas les redirections Apache.

## Organisation de la production

Le site est construit localement puis publié comme site statique sur l'hébergement Hostinger de `lectix.fr`.

- le contenu de `dist/` est déployé à la racine de `public_html` ;
- `server/contact.php` est ajouté au paquet sous `api/contact.php` ;
- `public/.htaccess`, automatiquement copié dans `dist/` par Astro, contient les redirections et les en-têtes de sécurité ;
- `contact-config.php` reste dans `domains/lectix.fr/`, à côté de `public_html` et donc inaccessible depuis le Web ;
- le secret Turnstile ne doit jamais se trouver dans le dépôt, dans l'archive ou dans une variable commençant par `PUBLIC_`.

Le formulaire utilise le transport `hsendmail` disponible sur l'hébergement Hostinger Premium. SMTP reste une solution de repli si la délivrabilité devient insuffisante.

## Déploiement par un LLM

La procédure ci-dessous est prévue pour un agent disposant d'un accès au dépôt GitHub et au MCP Hostinger.

1. Lire ce README, inspecter `git status` et ne jamais écraser des modifications locales qui ne concernent pas le déploiement.
2. Installer les dépendances avec `npm ci`, puis lancer :

   ```sh
   ASTRO_TELEMETRY_DISABLED=1 npm run check
   ASTRO_TELEMETRY_DISABLED=1 npm run build
   ```

3. Préparer le résultat à publier :

   ```sh
   mkdir -p dist/api
   cp server/contact.php dist/api/contact.php
   ```

4. Vérifier avant archivage que `dist/index.html`, `dist/.htaccess`, `dist/api/contact.php` et `dist/scripts/contact.js` existent. Vérifier aussi qu'aucun fichier nommé `contact-config.php`, aucune clé secrète et aucun `.DS_Store` ne sont présents dans `dist/`.
5. Créer une archive dont `index.html` se trouve directement à la racine, avec un nom de la forme `static-lectix-website_YYYYMMDD_HHMMSS.zip`. Ne pas placer le dossier `dist` lui-même au premier niveau de l'archive.
6. Avec le MCP Hostinger, appeler d'abord `hosting_listWebsitesV1` afin de retrouver le compte et le site `lectix.fr` sans deviner l'identifiant d'hébergement. Présenter la cible exacte à l'utilisateur et obtenir sa confirmation avant toute écriture.
7. Publier l'archive avec `hosting_deployStaticWebsite`, pour le domaine `lectix.fr`, avec suppression de l'archive locale après succès. Le déploiement remplace le contenu de `public_html`, mais ne doit jamais modifier le fichier privé `domains/lectix.fr/contact-config.php`.
8. Si l'API de déploiement renvoie une erreur après l'envoi de l'archive, inspecter d'abord les fichiers présents et le site public : un import peut avoir abouti malgré une erreur finale de l'API. Ne pas relancer aveuglément le déploiement.
9. Vider le cache du site avec `hosting_clearWebsiteCacheV1`, puis vérifier `https://lectix.fr/` et `https://www.lectix.fr/`. Une réponse HTTP 200 ne suffit pas : contrôler également le titre ou une phrase propre au site LECTIX.
10. Vérifier que `GET /api/contact.php` renvoie `405 Method Not Allowed`. Un test complet du formulaire envoie réellement un e-mail : l'agent doit demander une confirmation explicite juste avant ce test. Le même jeton Turnstile rejoué doit renvoyer `status=error`.
11. Lorsque les contrôles sont terminés, committer uniquement les fichiers concernés et pousser la branche vers GitHub.

Exemple de demande à donner à un LLM :

> Déploie la version actuelle de ce dépôt sur le site Hostinger `lectix.fr` en suivant strictement la section « Déploiement par un LLM » du README. Construis et vérifie le site, montre-moi la cible avant toute écriture, ne touche jamais au fichier privé `contact-config.php`, puis contrôle le contenu réellement servi après avoir vidé le cache.

## Déploiement manuel

### 1. Construire le paquet

Depuis la racine du dépôt :

```sh
npm ci
ASTRO_TELEMETRY_DISABLED=1 npm run check
ASTRO_TELEMETRY_DISABLED=1 npm run build
mkdir -p dist/api
cp server/contact.php dist/api/contact.php
```

Contrôler ensuite que les quatre fichiers indispensables sont présents :

```text
dist/index.html
dist/.htaccess
dist/api/contact.php
dist/scripts/contact.js
```

Créer une archive ZIP à partir du contenu de `dist/`. À l'ouverture de l'archive, `index.html` doit apparaître immédiatement à la racine et non dans un sous-dossier `dist/`.

### 2. Publier avec hPanel

1. Dans hPanel, réaliser une sauvegarde ou conserver une copie du contenu actuel de `domains/lectix.fr/public_html`.
2. Ouvrir le gestionnaire de fichiers Hostinger et accéder à `domains/lectix.fr/public_html`.
3. Remplacer le contenu public par celui de l'archive, puis extraire les fichiers avec écrasement. Vérifier que le fichier caché `.htaccess` a bien été copié.
4. Supprimer l'archive ZIP du serveur après extraction.
5. Ne pas supprimer ni déplacer `domains/lectix.fr/contact-config.php`, qui se trouve volontairement hors de `public_html`.
6. Vider le cache du site depuis hPanel.

Pour une toute première installation seulement, copier `server/contact-config.example.php` vers `domains/lectix.fr/contact-config.php`, puis renseigner dans ce fichier privé l'adresse destinataire, l'expéditeur du domaine et le secret Turnstile.

### 3. Contrôler le résultat

- ouvrir `https://lectix.fr/` et `https://www.lectix.fr/` dans une fenêtre privée ;
- vérifier l'accueil, la liste des produits, une fiche produit, une page de schéma et la page de contact ;
- appeler `https://lectix.fr/api/contact.php` en GET et vérifier que le serveur répond `405 Method Not Allowed` ;
- envoyer un message de test depuis le formulaire et vérifier sa réception ;
- en cas d'ancienne version encore visible, vider de nouveau le cache Hostinger et le cache du navigateur avant de modifier les fichiers.

En cas de problème, restaurer la sauvegarde de `public_html`. Le fichier privé de contact ne fait pas partie du paquet statique et doit être conservé pendant tout retour arrière.
