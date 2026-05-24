import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://fxconsulting.de',
  trailingSlash: 'ignore',
  build: {
    format: 'directory'
  },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  }
});
