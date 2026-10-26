import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import importHelpersPlugin from 'eslint-plugin-import-helpers';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Base recommended rules
  js.configs.recommended,

  // Global ignores
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'public/**',
      '*.config.js',
      'src/database.js',
      'src/server.js',
      'src/utils/**',
      'src/themes/**',
    ],
  },

  // TypeScript + React source files
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        alert: 'readonly',
        // DOM types (TypeScript uses these as type references — declaring them avoids no-undef false positives)
        HTMLElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLFormElement: 'readonly',
        HTMLSelectElement: 'readonly',
        MouseEvent: 'readonly',
        KeyboardEvent: 'readonly',
        Event: 'readonly',
        FormEvent: 'readonly',
        // Node globals (for API routes / server code)
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
        NodeJS: 'readonly',
        // Jest globals
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      prettier: prettierPlugin,
      'import-helpers': importHelpersPlugin,
    },
    rules: {
      // --- TypeScript ---
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // Allow short-circuit patterns like `condition && sideEffect()`
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],

      // --- React ---
      ...reactPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/display-name': 'off',
      // React 17+ JSX transform — no longer need to import React for JSX
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // --- React Hooks ---
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // --- General ---
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // --- Prettier ---
      ...prettierConfig.rules,
      'prettier/prettier': [
        'warn',
        {
          tabWidth: 2,
          singleQuote: true,
          semi: true,
          trailingComma: 'all',
          printWidth: 120,
          jsxSingleQuote: true,
          bracketSameLine: true,
          arrowParens: 'always',
          endOfLine: 'auto',
        },
      ],

      // --- Import order (alphabetical within groups) ---
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [['/^react/'], ['module'], ['/^@//'], ['parent', 'sibling', 'index']],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    },
  },
];
