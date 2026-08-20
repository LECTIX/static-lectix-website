# Site statique LECTIX

Première implémentation du site public qui remplacera le WordPress de `lectix.fr`.

Le catalogue statique contient les 18 références françaises de l’ancien site, classées en trois familles. Les prix, le stock, le panier et les avis clients ne sont pas repris. Chaque fiche conserve le visuel principal, les informations utiles et un lien direct vers le dépôt open source lorsqu’il existe.

## Développement

```sh
npm install
npm run dev
```

Copier `.env.example` vers `.env` pour activer localement Turnstile ou PostHog. Les secrets serveur ne doivent jamais être placés dans `.env` ni dans le dépôt.

## Vérifications

```sh
npm run check
npm run build
```

Le résultat statique est généré dans `dist/`.

## Contact sur Hostinger

1. déployer le contenu de `dist/` dans le dossier public du nouveau site ;
2. déployer `server/contact.php` comme `public_html/api/contact.php` ;
3. copier `server/contact-config.example.php` vers `contact-config.php`, deux niveaux au-dessus de l'endpoint, donc hors de `public_html` ;
4. renseigner l'adresse destinataire, l'expéditeur du domaine et le secret Turnstile dans ce fichier privé ;
5. tester l'envoi et la délivrabilité avant la bascule du domaine.

Le formulaire utilise le transport `hsendmail` déjà disponible sur l'hébergement Hostinger Premium. SMTP reste une solution de repli si la délivrabilité est insuffisante.
