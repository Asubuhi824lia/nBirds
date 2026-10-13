import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react-swc';
import path from "path";

export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss(), reactRouter(), react()],
  ssr: {
    // Укажите здесь пакеты, которые нужно обрабатывать через сборку Vite, а не оставлять в виде исходных Node.js модулей
    noExternal: ['@mui/material', 'react-transition-group'],
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@features': path.resolve(__dirname, './src/features'),
      '~': path.resolve(__dirname, "./*"),
    }
  }
});
