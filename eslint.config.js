// https://docs.expo.dev/guides/using-eslint/
import expoConfig from 'eslint-config-expo/flat';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    rules: {
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  }
]);
