const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const reactPlugin = require('eslint-plugin-react');

module.exports = [
  // Configuration pour ignorer complètement certains fichiers/dossiers
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.storybook/**',
      '*.config.js',
      '*.config.cjs',
      'vite.config.ts',
      'vitest.workspace.ts',
    ],
  },
  // Configuration principale pour les fichiers source
  {
    files: ['src/**/*.{js,jsx,ts,tsx}', '*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      // Autoriser les props JSX personnalisées pour React Three Fiber
      'react/no-unknown-property': [
        'error',
        {
          ignore: ['attach', 'args', 'intensity', 'position'],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
