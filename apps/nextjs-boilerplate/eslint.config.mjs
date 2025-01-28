import { fileURLToPath } from 'url';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ...js.configs.recommended,
    rules: {
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
    },
  },
  {
    ...eslintPluginPrettierRecommended,
  },
  ...compat.extends('next/core-web-vitals'),
  ...tseslint.config({
    files: ['**/*.{ts,tsx,d.cts,d.ts,d.mts}'],
    extends: [tseslint.configs.recommendedTypeChecked, tseslint.configs.stylisticTypeChecked],
  }),
  ...compat.config({
    extends: ['plugin:import/recommended'],
    rules: {
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/order': [
        'error',
        {
          'newlines-between': 'never',
          warnOnUnassignedImports: true,
          groups: ['builtin', 'external', 'internal', 'object', ['parent', 'sibling', 'index'], 'type', 'unknown'],
          pathGroups: [
            {
              pattern: 'react*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '{.,..,@,*}/**/*.+(css|sass|less|scss|pcss|styl|svg)',
              group: 'unknown',
              position: 'after',
            },
          ],
          alphabetize: {
            order: 'desc',
          },
          pathGroupsExcludedImportTypes: ['type'],
        },
      ],
    },
  }),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.serviceworker,
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
  },
];

export default eslintConfig;
