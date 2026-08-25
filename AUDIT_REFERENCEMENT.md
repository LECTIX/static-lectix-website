# Audit de référencement Google et assistants IA

> Audit réalisé le 25 août 2026 sur le site public `lectix.fr` et sur la version statique Astro. Les corrections décrites comme « appliquées » sont présentes dans le dépôt.

## Synthèse

Le site disposait déjà de trois atouts importants : tout le contenu utile est livré directement dans le HTML, les fiches produit sont détaillées et les pages sont reliées par usages. Les principaux problèmes étaient techniques plutôt qu’éditoriaux : le sitemap contenait 81 visionneuses de schémas peu pertinentes comme pages d’entrée, le domaine `www` répondait sans redirection, les anciennes URL WPML restaient accessibles avec `?lang=`, plusieurs anciens PDF étaient encore visibles dans les résultats et aucune donnée structurée n’explicitait la nature du site.

Google indique que les mêmes fondamentaux s’appliquent à la recherche classique et à ses réponses génératives : contenu utile et original, pages indexables, liens internes, texte directement accessible et données structurées cohérentes avec la page. Aucun balisage spécial « IA » n’est requis. Un fichier `llms.txt` est ignoré par Google et ne doit donc jamais être présenté comme un levier de classement ([fonctionnalités IA et site web](https://developers.google.com/search/docs/appearance/ai-features), [guide Google pour la recherche générative](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

## Résultat de l’audit initial

| Point contrôlé | Constat initial | Risque |
|---|---|---|
| Accès des robots | Googlebot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot et PerplexityBot recevaient bien une réponse HTTP 200 | Faible |
| Rendu du contenu | HTML statique complet, sans dépendance à JavaScript pour lire les fiches | Faible |
| Canonicals | Canonical absolue présente, mais `www.lectix.fr` répondait aussi en 200 | Moyen : signaux répartis entre deux hôtes |
| Anciennes langues | `?lang=en` répondait en 200 avec le contenu français | Moyen : doublons et exploration inutile |
| Sitemap | 105 URL, dont 81 pages `/schema/` servant seulement à agrandir une image | Élevé : sitemap dilué par des pages utilitaires |
| Anciennes notices | Des URL `/static/LEC…/manual_fr.pdf` apparaissaient encore dans les résultats | Moyen : anciennes URL cassées ou redirigées vers une 404 |
| Page 404 | Le serveur Hostinger renvoyait sa propre page, pas la 404 utile du projet | Moyen |
| Titres produits | Titres uniques mais sans référence LEC | Faible à moyen pour les recherches par référence |
| Données structurées | Aucun JSON-LD | Moyen pour la compréhension de la marque, des listes, FAQ et documentations |
| Partage social | Pas d’image Open Graph ni de Twitter Card | Faible |
| Assistants IA | Contenu crawlable, mais robots non documentés explicitement et aucun sommaire machine lisible | Faible à moyen |

## Plan de correction appliqué

### Priorité 1 — indexation et consolidation

- rediriger définitivement `www.lectix.fr` vers `https://lectix.fr` ;
- retirer les paramètres historiques `lang` par redirection 301 ;
- rediriger les anciennes boutiques, catégories, routes traduites et notices PDF vers leurs pages françaises actuelles ;
- servir la page `404.html` du projet avec un vrai statut 404 ;
- conserver les visionneuses de schémas accessibles aux utilisateurs et aux liens internes, mais les passer en `noindex,follow` et les retirer du sitemap ;
- ramener le sitemap de 105 à 23 URL réellement destinées à être des pages d’entrée.

Google recommande que le sitemap ne contienne que les URL canoniques souhaitées dans les résultats ([documentation sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)).

### Priorité 2 — compréhension sémantique

- ajouter `WebSite` et `Organization` sur l’accueil ;
- décrire chaque fiche comme une `TechArticle` consacrée à un produit LECTIX, sans inventer d’offre commerciale ;
- ajouter `ItemList` au catalogue et à la liste des usages ;
- ajouter `FAQPage` uniquement lorsque les questions et réponses sont réellement visibles ;
- ajouter un fil d’Ariane visible et son `BreadcrumbList` sur les fiches et schémas ;
- inclure la référence LEC dans le titre de chaque fiche produit.

Les données structurées aident Google à comprendre les entités et doivent correspondre au contenu visible ([introduction aux données structurées](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)).

### Priorité 3 — extraits, images et assistants IA

- ajouter les directives permettant des extraits et aperçus d’images complets ;
- ajouter Open Graph et Twitter Card avec une image adaptée à chaque fiche ;
- autoriser explicitement les robots de recherche et de consultation d’OpenAI, Anthropic et Perplexity ;
- publier `/llms.txt` comme sommaire de navigation, avec les 16 références, les usages et l’avertissement que la société est fermée ;
- ne pas créer de pages artificielles ni réécrire le contenu « pour une IA ».

OpenAI demande de ne pas bloquer `OAI-SearchBot` pour qu’un contenu puisse être découvert et cité dans ChatGPT Search ([FAQ éditeurs OpenAI](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)). Anthropic distingue également `Claude-SearchBot`, `Claude-User` et `ClaudeBot` et respecte `robots.txt` ([documentation des robots Anthropic](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)).

## Contrôles automatisés ajoutés

Après `npm run build`, la commande `npm run check:seo` contrôle :

- présence et unicité des titres ;
- meta descriptions, canonicals, directives robots et un seul `h1` ;
- balises sociales ;
- validité syntaxique du JSON-LD ;
- liens internes cassés ;
- concordance exacte entre pages indexables et sitemap ;
- exclusion des visionneuses `/schema/` ;
- présence de `robots.txt` et `llms.txt`.

État après correction : **105 pages HTML générées, 23 pages indexables et 23 URL dans le sitemap**, sans erreur détectée.

## Actions manuelles après déploiement

1. Ajouter ou vérifier la propriété `https://lectix.fr/` dans Google Search Console.
2. Soumettre `https://lectix.fr/sitemap-index.xml`.
3. Demander une nouvelle exploration de l’accueil, `/produits/`, `/usages/` et des principales fiches LEC000042, LEC001020 et LEC008011.
4. Surveiller pendant quatre à huit semaines la disparition des URL `?lang=`, `/static/…` et `/schema/…` dans le rapport d’indexation.
5. Contrôler dans PostHog les référents contenant `google`, `bing`, `chatgpt`, `perplexity` ou `claude` ; un robot qui n’exécute pas JavaScript ne générera pas de visite PostHog, ce qui est normal.

Il n’existe aucune garantie d’indexation ou de citation. Le meilleur avantage durable de LECTIX reste son contenu de première main : références précises, compatibilités, notices, câblages et exemples réels de cantonnement ou d’automatisme.
