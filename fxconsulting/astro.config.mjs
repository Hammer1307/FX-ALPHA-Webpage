import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Kanonische Hauptdomain — steuert Canonical, hreflang, OG-URLs und Schema.
  // Alle anderen Domains (.com, fxalphaebusinessconsulting.de, fxalpha.de)
  // leiten per 301 hierher (siehe public/_redirects).
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
