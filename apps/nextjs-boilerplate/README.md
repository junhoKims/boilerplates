# Next.js Boilerplate

Next.js Boilerplate

## Getting Started

먼저, 아래 .vscode/settings.json 파일 생성

```json
{
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.preferences.importModuleSpecifier": "non-relative",
}
```

첫번째, 아래 스크립트 실행

```script
pnpm --filter @boilerplates/nextjs-boilerplate add -D -E @typescript-eslint/eslint-plugin@8.22.0 @typescript-eslint/parser@8.22.0 eslint@9.19.0 eslint-config-prettier@10.0.1 eslint-plugin-import@2.31.0 eslint-plugin-prettier@5.2.3 eslint-plugin-unused-imports@4.1.4 globals@15.14.0 prettier@3.4.2 typescript-eslint@8.22.0
```

두번째, tsconfig.json 수정

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ],
    "declaration": true,
    "declarationMap": true,
    "resolveJsonModule": true,
    "target": "ESNext",
    "lib": [
      "ESNext",
      "dom",
      "dom.iterable"
    ],
    "strict": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "noUncheckedIndexedAccess": true,
    "verbatimModuleSyntax": true,
    "incremental": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "preserve",
    "noEmit": true,
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

세번째, eslint.config.mjs 수정

```js
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

```

## Font 설정
