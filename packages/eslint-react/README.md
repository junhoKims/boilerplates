# ESLint React Boilerplate

react와 prettier, typescript를 베이스로 쓴다고 가정, 사용하는 plugin과 config, 몇몇 rule 세팅<br/>

- Full Setting ([링크](https://github.com/junhoKims/boilerplates/blob/main/packages/eslint-react/samples/eslint-base.cjs))
- Use import plugin Setting ([링크](https://github.com/junhoKims/boilerplates/blob/main/packages/eslint-react/samples/eslint-with-import.cjs))
- Use unused-import plugin Setting ([링크](https://github.com/junhoKims/boilerplates/blob/main/packages/eslint-react/samples/eslint-with-unused-improt.cjs))

**설치**
```
pnpm add -D eslint prettier typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks
```

### vscode 사용한다면

`.vscode > settings.json` 에서 저장 시 자동 Formatting 되도록 적용

```
{
  "eslint.validate": [ "javascript", "javascriptreact", "typescript", "typescriptreact" ],
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll": false,
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  },
  "typescript.tsdk": "node_modules/typescript/lib",
}

```

### `eslint-plugin-import` 사용한다면

extends, rules, settings에 코드 추가

**설치**
```
pnpm add -D eslint-plugin-import
pnpm add -D eslint-import-resolver-typescript
```

**코드**
```
extends: [
   'plugin:import/recommended',
   'plugin:import/typescript',
],
rules: {
   'sort-imports': ['error', { ignoreDeclarationSort: true }],
   'import/order': [
      'error',
      {
         warnOnUnassignedImports: true,
         groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
         pathGroups: [
            {
            pattern: '{.,..}/**/*.+(css|sass|less|scss|pcss|styl|svg)',
            patternOptions: { dot: true, nocomment: true },
            group: 'unknown',
            position: 'after',
            },
         ],
         alphabetize: {
            order: 'asc',
         },
      },
   ],
},
settings: {
   'import/resolver': {
      typescript: {}
   }
}
```

### `eslint-plugin-unused-imports` 사용한다면

쓰지 않는 코드 자동 제거해주는 ESLint.<br/>
필요에 따라 설치


**설치**
```
pnpm add -D eslint-plugin-unused-imports
```

**코드**
****
```
plugins: ['unused-imports'],
rules: {
   "unused-imports/no-unused-imports": "error",
   "unused-imports/no-unused-vars": [
      "warn",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
   ],
}
```

### emotion 사용한다면

아래의 rule 추가

```
rules: {
   'react/no-unknown-property': ['error', { ignore: ['css'] }],
}

```