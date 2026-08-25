import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://lectix.fr",
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      // Les pages de visualisation des schémas restent accessibles et suivables,
      // mais les fiches produit sont leurs pages canoniques utiles à indexer.
      filter: (page) => !page.includes("/schema/") && !page.endsWith("/llms.txt"),
    }),
  ],
});
