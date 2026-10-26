module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier', 'eslint-plugin-import-helpers'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'warn',
      {
        tabWidth: 2,
        singleQuote: true,
        semi: true,
        trailingComma: 'all',
        parser: 'typescript',
        printWidth: 120,
        jsxSingleQuote: true,
        bracketSameLine: true,
        arrowParens: 'always',
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/display-name': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-empty-function': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [['/^react/'], ['module'], ['/^@//'], [('parent', 'sibling', 'index')]],
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],
  },
};
