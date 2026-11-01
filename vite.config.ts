import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss(), reactRouter()],
  resolve: {
    // One React instance for client + SSR (prevents "dispatcher is null" / broken useContext)
    dedupe: ["react", "react-dom"],
    alias: {
      // Package points `module` to missing dist/index.mjs — force the existing entry.
      "word-search-puzzle-generator": path.resolve(
        __dirname,
        "node_modules/word-search-puzzle-generator/dist/index.js",
      ),
    },
  },
  server: {
    // Avoid EMFILE on macOS when too many files are watched
    watch: { usePolling: true, interval: 300 },
  },
  ssr: {
    // Укажите здесь пакеты, которые нужно обрабатывать через сборку Vite, а не оставлять в виде исходных Node.js модулей
    noExternal: [
      "@mui/material",
      "react-transition-group",
      "@dnd-kit/react",
      "@dnd-kit/dom",
      "@dnd-kit/abstract",
      "@dnd-kit/state",
      "word-search-puzzle-generator",
    ],
  },
});
