import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@layout": "/src/layout",
      "@routes": "/src/routes",
      "@components": "/src/components",
      "@common": "/src/common",
      "@theme": "/src/theme",
      "@api": "/src/api",
      "@services": "/src/services",
    },
  },
});
