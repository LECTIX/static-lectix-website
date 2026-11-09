import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { execFileSync } from "node:child_process";

let release = process.env.PUBLIC_SITE_RELEASE;
if (!release) {
  try {
    release = execFileSync("git", ["describe", "--always", "--dirty"], { encoding: "utf8" }).trim();
  } catch {
    release = "unversioned";
  }
}

export default defineConfig({
  site: "https://lectix.fr",
  output: "static",
  trailingSlash: "always",
  vite: { define: { "import.meta.env.PUBLIC_SITE_RELEASE": JSON.stringify(release) } },
  integrations: [
    sitemap({
      // Les pages de visualisation des schémas restent accessibles et suivables,
      // mais les fiches produit sont leurs pages canoniques utiles à indexer.
      filter: (page) => !page.includes("/schema/") && !page.endsWith("/llms.txt"),
    }),
  ],
});
