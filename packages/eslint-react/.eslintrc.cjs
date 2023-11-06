module.exports = {
  env: { browser: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['unused-imports'],
  rules: {
    /**
     * emotion 사용 시 추가해야하는 rules
     */
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    /**
     * typescript 사용 시 추가해야하는 rules
     */
    '@typescript-eslint/no-unused-vars': 'off',
    /**
     * eslint-plugin-unused-import 사용 시 추가하는 rules
     */
    "unused-imports/no-unused-imports": "error",
		"unused-imports/no-unused-vars": [
			"warn",
			{ "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
		],
    /**
     * eslint-plugin-import 사용 시 추가하는 rules
     */
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
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {}
    }
  },
};
