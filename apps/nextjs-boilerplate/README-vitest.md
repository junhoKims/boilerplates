# Next.js vitest

Nextjs에서 vitest 셋업

## 특징

- 무난함

## Getting Started

1. 패키지 설치

```
pnpm -w add -D -E vitest@latest @vitejs/plugin-react@latest jsdom@latest @testing-library/react@latest @testing-library/dom@latest @testing-library/jest-dom@latest
```

2. tsconfig.json에 vitest global 추가

     - `types` 수동 작성 시, react, react-dom, node도 수동 입력 필요
  
  ```json
  "compilerOptions": {
    "types": ["node", "react", "react-dom","vitest/globals"],
  }
  ```

3. vitest.config.ts 작성

  ```ts
  import path from 'path';
  import { configDefaults, defineConfig } from 'vitest/config';

  const EXCLUDES = ['**\/build/**', '**/{tests,specs}/e2e/**', '**/storybook-static/**', '.next/**', '.storybook/**'];
  const COVERAGE_EXCLUDES = [
    '**/{postcss,tailwind}.config.*',
    '**/index.?(c|m)[jt]s?(x)',
    '**/{constants,types}.?(c|m)[jt]s?(x)',
  ];

  export default defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      exclude: [...configDefaults.exclude, ...EXCLUDES],
      setupFiles: ['./tests/setup-tests.ts'],
      coverage: {
        enabled: false,
        extension: ['.js', '.cjs', '.mjs', '.ts', '.cts', '.mts', '.tsx', '.jsx'],
        exclude: [...(configDefaults.coverage.exclude ?? []), ...COVERAGE_EXCLUDES],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  });
  ```

4. setup-tests.ts 작성

  ```ts
  import '@testing-library/jest-dom/vitest';
  ```