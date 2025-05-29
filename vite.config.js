import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/js/index.jsx"],
      refresh: true,
    }),
    react(),
  ],
  server: {
    port: 4000,
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },

  resolve: {
    alias: {
      api: path.resolve(__dirname, "resources/js/api"),
      context: path.resolve(__dirname, "resources/js/context"),
      layout: path.resolve(__dirname, "resources/js/layout"),
      types: path.resolve(__dirname, "resources/js/types"),
      utils: path.resolve(__dirname, "resources/js/utils"),
      hoc: path.resolve(__dirname, "resources/js/hoc"),
      hooks: path.resolve(__dirname, "resources/js/hooks"),
      pages: path.resolve(__dirname, "resources/js/pages"),
      routes: path.resolve(__dirname, "resources/js/routes"),
      components: path.resolve(__dirname, "resources/js/components"),
      protections: path.resolve(__dirname, "resources/js/protections"),
    },
  },
});
