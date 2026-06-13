import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    // Укажите здесь пакеты, которые нужно обрабатывать через сборку Vite, а не оставлять в виде исходных Node.js модулей
    noExternal: ['@mui/material', 'react-transition-group'],
  },
});
