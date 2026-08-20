import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://lectix.fr",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap()],
});
