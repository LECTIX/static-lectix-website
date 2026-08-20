// Le jeton de projet PostHog est public par conception : il est nécessairement
// inclus dans le JavaScript envoyé au navigateur. Une variable d'environnement
// permet toutefois de le remplacer sans modifier le code.
export const POSTHOG_PROJECT_TOKEN =
  import.meta.env.PUBLIC_POSTHOG_KEY || "phc_rci8JhH74AwJi6btf9tvvR2kvGQFHMrw52PfaENM9UJ8";

export const POSTHOG_API_HOST = "https://eu.i.posthog.com";

export const POSTHOG_PRODUCTION_HOSTNAMES = new Set(["lectix.fr", "www.lectix.fr"]);
