/// <reference types="vite/client" />
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { type CommonServerOptions, defineConfig } from "vite";

const proxyApiConfig: CommonServerOptions = {
  port: 3000,
  proxy: {
    "/api": {
      target: "http://localhost:8080",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
};

export default defineConfig({
  clearScreen: false,
  plugins: [
    tailwindcss(),
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
  ],
  server: proxyApiConfig,
  preview: proxyApiConfig,
});
