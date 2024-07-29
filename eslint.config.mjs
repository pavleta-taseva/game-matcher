import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import configPrettier from 'eslint-config-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  configPrettier,
  { ignores: ['polyfills.js', 'node_modules/*', 'build/**/*', '.next/**/*'] },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
