import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./index.css";
import App from "./App.tsx";
import { detectLocale } from "./lib/locale";

const rootEl = document.getElementById("root")!;

const app = (
  <StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
  </StrictMode>
);

// Le HTML pré-rendu (FR) n'est hydraté que s'il correspond à la locale du
// visiteur : sinon (ex. navigateur EN), render frais classique.
if (rootEl.hasChildNodes() && detectLocale() === document.documentElement.lang) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
