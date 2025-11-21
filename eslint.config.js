// eslint.config.js
// https://docs.expo.dev/guides/using-eslint/
const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

const perfectionist = require('eslint-plugin-perfectionist');
const react = require('eslint-plugin-react');
const reactNative = require('eslint-plugin-react-native');

module.exports = defineConfig([
  expoConfig,
  globalIgnores(['dist/*']),
  {
    plugins: {
      react,
      perfectionist,
      'react-native': reactNative,
    },
    rules: {
      'perfectionist/sort-imports': 'off',
      'react-native/no-inline-styles': 'error',
      'perfectionist/sort-object-types': 'off',
      'perfectionist/sort-objects': [
        'error',
        {
          type: 'line-length',
        },
      ],
    },
  },
]);
