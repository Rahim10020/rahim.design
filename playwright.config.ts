import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  timeout: 30_000,
  use: { baseURL: "http://localhost:4173" },
  webServer: {
    command: "pnpm preview --port 4173 --strictPort",
    port: 4173,
    reuseExistingServer: true,
  },
});
