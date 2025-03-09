import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '../llmanipulate-backend/openapi.json',
  output: 'api',
  plugins: [
    '@hey-api/client-fetch',
    {
      name: '@hey-api/transformers',
      dates: true,
    },
    {
      name: '@hey-api/sdk',
      transformer: true,
    },
  ],
});