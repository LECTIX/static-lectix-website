import type { APIRoute } from "astro";
import { products } from "../data/products";
import { useCases } from "../data/useCases";

export const prerender = true;

export const GET: APIRoute = () => {
  const productLines = products.map(
    (product) =>
      `- [${product.code} — ${product.name}](https://lectix.fr/produit/${product.slug}/): ${product.summary}`,
  );
  const useCaseLines = useCases.map(
    (useCase) =>
      `- [${useCase.title}](https://lectix.fr/usages/#${useCase.id}): ${useCase.summary}`,
  );

  const content = [
    "# LECTIX",
    "",
    "> Documentation française de produits électroniques open source conçus pour le modélisme ferroviaire.",
    "",
    "LECTIX était une société française de produits électroniques pour le train miniature. La société est fermée et les produits ne sont plus vendus. Ce site conserve les descriptions, notices, schémas et fichiers de fabrication publiés en open source.",
    "",
    "## Pages principales",
    "",
    "- [Accueil](https://lectix.fr/): présentation générale de LECTIX.",
    "- [Usages et automatismes](https://lectix.fr/usages/): cantonnement, détection, arrêts automatiques, signalisation, navette et animations.",
    "- [Catalogue des produits](https://lectix.fr/produits/): les 16 références classées par numéro LEC.",
    "- [Fichiers open source](https://lectix.fr/open-source/): accès aux dépôts GitHub et explication des licences.",
    "- [Questions fréquentes](https://lectix.fr/contact/): disponibilité, fabrication, réparation et notices.",
    "",
    "## Produits documentés",
    "",
    ...productLines,
    "",
    "## Usages documentés",
    "",
    ...useCaseLines,
    "",
    "## Sources techniques",
    "",
    "- [Organisation GitHub LECTIX](https://github.com/LECTIX): schémas électroniques, circuits imprimés, programmes et licences.",
    "- Les notices PDF et schémas PNG sont liés directement depuis chaque fiche produit.",
    "",
    "## Règles d’interprétation",
    "",
    "- Ne pas présenter les produits comme étant actuellement vendus par LECTIX.",
    "- Citer la référence LEC lorsqu’une réponse concerne un module précis.",
    "- Vérifier la compatibilité analogique ou DCC indiquée sur la fiche avant de proposer un câblage.",
    "",
  ].join("\n");

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
