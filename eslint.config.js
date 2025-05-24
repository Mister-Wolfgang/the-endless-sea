import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';

const commonGlobals = {
  console: true,
  navigator: true,
  document: true,
  window: true,
  process: true,
  HTMLDivElement: true, // Pour les composants React
  HTMLElement: true
};

const testGlobals = {
  ...commonGlobals,
  describe: true,
  it: true,
  test: true,
  expect: true,
  jest: true,
  beforeEach: true,
  afterEach: true
};

export default [
  js.configs.recommended,
  {
    ignores: ['**/dist/**', 'node_modules/**'],
    rules: {
      'no-undef': 'error'
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      },
      globals: commonGlobals
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',  // Désactivé en faveur de la règle TypeScript
      '@typescript-eslint/no-unused-vars': ['error', { 
        varsIgnorePattern: '^(UP|DOWN|LEFT|RIGHT|QWERTY|AZERTY|UNKNOWN)$'
      }]
    }
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    languageOptions: {
      globals: testGlobals
    }
  },
  {
    files: ['*.config.{ts,js}', '.storybook/**/*', 'vite.config.*'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: null
      }
    }
  },
  prettier
];
