import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1. Игноры (Обязательно!)
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      "coverage",
      ".react-router",
      "**/*.config.*"
    ],
  },

  // 2. Базовые настройки для всех файлов
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module", // Важно для React Router (ESM)
      globals: {
        ...globals.browser,
        ...globals.node, // Разрешаем и браузер, и ноду (безопаснее для фуллстека)
      },
    },
    plugins: {
      js,
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // 3. Настройки для серверных файлов (.server)
  {
    files: ["**/.server/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      globals: globals.node,
    },
  },

  // 4. TypeScript конфиг
  ...tseslint.configs.recommended,

  // 5. React конфиг
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'], // Важно для React 17+

  // 6. Хуки React
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
    },
  },

  // 7. Кастомные правила проекта
  {
    rules: {
      'react/react-in-jsx-scope': 'off', // Не нужен в React 17+
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]);