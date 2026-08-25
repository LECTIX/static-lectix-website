import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist");
const errors = [];

const walk = (directory) =>
  readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

if (!existsSync(dist)) {
  throw new Error("Le dossier dist manque. Exécutez d’abord npm run build.");
}

const htmlFiles = walk(dist).filter((file) => file.endsWith(".html"));
const indexableCanonicals = new Set();
const titles = new Map();

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const page = relative(dist, file);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;

  if (!title) errors.push(`${page}: titre manquant`);
  if (!description) errors.push(`${page}: meta description manquante`);
  if (!robots) errors.push(`${page}: directive robots manquante`);
  if (!canonical) errors.push(`${page}: canonical manquante`);
  if (h1Count !== 1) errors.push(`${page}: ${h1Count} balise(s) h1`);
  if (!html.includes('property="og:image"')) errors.push(`${page}: image Open Graph manquante`);
  if (!html.includes('name="twitter:card"')) errors.push(`${page}: Twitter Card manquante`);

  if (title) {
    const otherPage = titles.get(title);
    if (otherPage) errors.push(`${page}: titre dupliqué avec ${otherPage}`);
    titles.set(title, page);
  }

  if (robots?.startsWith("index") && canonical) indexableCanonicals.add(canonical);
  if (page.startsWith("schema/") && robots !== "noindex,follow") {
    errors.push(`${page}: une visionneuse de schéma doit être noindex,follow`);
  }
  if (page === "404.html" && robots !== "noindex,follow") {
    errors.push(`${page}: la page 404 doit être noindex,follow`);
  }

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch {
      errors.push(`${page}: JSON-LD invalide`);
    }
  }

  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = match[1].split("#")[0].split("?")[0];
    if (!href) continue;
    const decodedHref = decodeURIComponent(href);
    const target = decodedHref.endsWith("/")
      ? join(dist, decodedHref, "index.html")
      : join(dist, decodedHref);
    if (!existsSync(target)) errors.push(`${page}: lien interne introuvable ${href}`);
  }
}

const sitemap = readFileSync(join(dist, "sitemap-0.xml"), "utf8");
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));

for (const url of sitemapUrls) {
  if (url.includes("/schema/") || url.endsWith("/llms.txt")) {
    errors.push(`sitemap: URL utilitaire indésirable ${url}`);
  }
  if (!indexableCanonicals.has(url)) errors.push(`sitemap: URL sans page HTML indexable ${url}`);
}

for (const url of indexableCanonicals) {
  if (!sitemapUrls.has(url)) errors.push(`sitemap: page indexable absente ${url}`);
}

const robotsTxt = readFileSync(join(dist, "robots.txt"), "utf8");
for (const directive of ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "Sitemap:"]) {
  if (!robotsTxt.includes(directive)) errors.push(`robots.txt: directive manquante ${directive}`);
}

if (!existsSync(join(dist, "llms.txt"))) errors.push("llms.txt manquant");

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `SEO validé : ${htmlFiles.length} pages HTML, ${indexableCanonicals.size} pages indexables, ${sitemapUrls.size} URL dans le sitemap.`,
);
