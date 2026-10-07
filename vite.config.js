import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        experiencias: resolve(__dirname, "experiencias.html"),
        acervoVivo: resolve(__dirname, "projeto-acervo-vivo.html"),
        pirania: resolve(__dirname, "projeto-pirania.html"),
        notae: resolve(__dirname, "projeto-notae.html"),
      },
    },
  },
});
