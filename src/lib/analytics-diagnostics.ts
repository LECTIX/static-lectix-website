type Navigation = Pick<PerformanceNavigationTiming,
  "type" | "startTime" | "requestStart" | "responseStart" | "responseEnd" |
  "domInteractive" | "domContentLoadedEventEnd" | "loadEventEnd" |
  "transferSize" | "encodedBodySize" | "decodedBodySize">;

type Connection = { effectiveType?: string; saveData?: boolean };

// Aucun chemin de ressource, contenu du DOM, adresse réseau ou champ du formulaire.
export function navigationDiagnostics(entry?: Navigation, connection?: Connection) {
  const properties: Record<string, string | number | boolean> = {};
  const duration = (name: string, end: number, start = 0) => {
    if (end > 0 && Number.isFinite(end) && Number.isFinite(start) && end >= start) {
      properties[name] = Math.round(end - start);
    }
  };
  if (entry) {
    if (["navigate", "reload", "back_forward", "prerender"].includes(entry.type)) {
      properties.navigation_type = entry.type;
    }
    duration("navigation_ttfb_ms", entry.responseStart, entry.startTime);
    if (entry.requestStart > 0) duration("navigation_server_wait_ms", entry.responseStart, entry.requestStart);
    duration("navigation_download_ms", entry.responseEnd, entry.responseStart);
    duration("navigation_dom_interactive_ms", entry.domInteractive, entry.startTime);
    duration("navigation_dom_ready_ms", entry.domContentLoadedEventEnd, entry.startTime);
    duration("navigation_load_ms", entry.loadEventEnd, entry.startTime);
    for (const [key, value] of Object.entries({
      navigation_transfer_bytes: entry.transferSize,
      navigation_encoded_bytes: entry.encodedBodySize,
      navigation_decoded_bytes: entry.decodedBodySize,
    })) {
      if (Number.isFinite(value) && value >= 0) properties[key] = Math.round(value);
    }
  }
  if (connection?.effectiveType && ["slow-2g", "2g", "3g", "4g"].includes(connection.effectiveType)) {
    properties.network_effective_type = connection.effectiveType;
  }
  if (typeof connection?.saveData === "boolean") properties.network_save_data = connection.saveData;
  return properties;
}
