import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    cssMinify: false,
    // The SSR build only prerenders /text/; it doesn't need public/.
    copyPublicDir: !isSsrBuild,
  },
}));
