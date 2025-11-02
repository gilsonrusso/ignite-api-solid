import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

/** @type {import("eslint").FlatConfig.ConfigArray} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.ts'],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // ⚙️ Boas práticas
      'no-console': 'off',
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
      'no-var': 'error',

      // 🧠 TypeScript
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    ignores: ['dist', 'node_modules'],
  },
];
