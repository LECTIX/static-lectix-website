import type { Product } from "./products";
import type { UseCase } from "./useCases";

export const siteUrl = "https://lectix.fr";

const absoluteUrl = (path: string) => new URL(path, siteUrl).href;

const organization = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "LECTIX",
  url: `${siteUrl}/`,
  logo: absoluteUrl("/images/logo-lectix.webp"),
  sameAs: ["https://github.com/LECTIX"],
  description:
    "Ancienne marque française de produits électroniques pour le modélisme ferroviaire, dont les plans et programmes sont désormais publiés en open source.",
};

const website = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: `${siteUrl}/`,
  name: "LECTIX",
  alternateName: "LECTIX — électronique pour le train miniature",
  description:
    "Notices, schémas et fichiers open source de produits électroniques conçus pour le modélisme ferroviaire.",
  inLanguage: "fr-FR",
  publisher: { "@id": `${siteUrl}/#organization` },
};

const graph = (...items: Record<string, unknown>[]) => ({
  "@context": "https://schema.org",
  "@graph": items,
});

export const homeStructuredData = graph(organization, website);

export const createBreadcrumbStructuredData = (
  items: { name: string; path: string }[],
) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const createProductStructuredData = (product: Product) => {
  const path = `/produit/${product.slug}/`;
  const url = absoluteUrl(path);

  return graph(
    createBreadcrumbStructuredData([
      { name: "Accueil", path: "/" },
      { name: "Produits", path: "/produits/" },
      { name: `${product.code} — ${product.name}`, path },
    ]),
    {
      "@type": "TechArticle",
      "@id": `${url}#documentation`,
      headline: `${product.name} (${product.code})`,
      description: product.introduction,
      url,
      mainEntityOfPage: url,
      image: absoluteUrl(product.image),
      inLanguage: "fr-FR",
      isPartOf: { "@id": `${siteUrl}/#website` },
      publisher: { "@id": `${siteUrl}/#organization` },
      about: {
        "@type": "Thing",
        additionalType: "https://schema.org/Product",
        name: product.name,
        identifier: product.code,
        description: `${product.category} — ${product.summary}`,
        image: absoluteUrl(product.image),
      },
    },
    organization,
    website,
  );
};

export const createProductListStructuredData = (products: Product[]) =>
  graph(
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/produits/#liste`,
      name: "Produits électroniques LECTIX pour le train miniature",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/produit/${product.slug}/`),
        name: `${product.code} — ${product.name}`,
      })),
    },
    organization,
    website,
  );

export const createUseCaseListStructuredData = (useCases: UseCase[]) =>
  graph(
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/usages/#liste`,
      name: "Automatismes et usages pour le train miniature",
      numberOfItems: useCases.length,
      itemListElement: useCases.map((useCase, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/usages/#${useCase.id}`),
        name: useCase.title,
        description: useCase.summary,
      })),
    },
    organization,
    website,
  );

export const createFaqStructuredData = (
  path: string,
  faqs: { question: string; answer: string }[],
) =>
  graph(
    {
      "@type": "FAQPage",
      "@id": `${absoluteUrl(path)}#faq`,
      inLanguage: "fr-FR",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    organization,
    website,
  );
