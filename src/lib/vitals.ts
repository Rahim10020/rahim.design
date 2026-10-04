import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";
import { track } from "@vercel/analytics";

/**
 * Mesure terrain temporaire (2 semaines) : Core Web Vitals réels par route,
 * visibles dans Vercel Analytics > Events (`web-vital`).
 * Compense l'absence de breakdown par route de Speed Insights (plan Hobby).
 * À SUPPRIMER une fois le RES stabilisé.
 */
const reported = new Set<string>();

function normalizeRoute(pathname: string): string {
  if (/^\/projects\/[^/]+$/.test(pathname)) return "/projects/:slug";
  if (/^\/learn\/[^/]+$/.test(pathname)) return "/learn/:slug";
  return pathname;
}

export function initVitals(pathname: string): void {
  const route = normalizeRoute(pathname);
  const report = (metric: Metric) => {
    const key = `${route}:${metric.name}`;
    if (reported.has(key)) return;
    reported.add(key);
    const value = Math.round(
      metric.name === "CLS" ? metric.value * 1000 : metric.value,
    );
    if (import.meta.env.DEV) {
      console.debug(`[vitals] ${route} ${metric.name}=${value} ${metric.rating}`);
      return;
    }
    try {
      track("web-vital", { route, name: metric.name, value, rating: metric.rating });
    } catch {
      /* analytics indisponible : mesure best-effort */
    }
  };

  onCLS(report);
  onFCP(report);
  onINP(report);
  onLCP(report);
  onTTFB(report);
}
