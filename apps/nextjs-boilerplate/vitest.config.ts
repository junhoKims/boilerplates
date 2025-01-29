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
