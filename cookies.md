---
import '../styles/global.css';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import type { Lang } from '../i18n/ui';
import { pathMap } from '../i18n/ui';

interface Props {
  title: string;
  description: string;
  keywords?: string;
  lang: Lang;
  navKey?: string;
  ogImage?: string;
  noindex?: boolean;
}

const { title, description, keywords, lang, navKey, ogImage = '/assets/og-image.png', noindex = false } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site).toString();

// hreflang: ermittle die gleiche Page in der anderen Sprache, wenn vorhanden
const altLang: Lang = lang === 'de' ? 'en' : 'de';
const currentPath = Astro.url.pathname.replace(/\/$/, '') + '/';
const matchedKey = Object.entries(pathMap).find(([_, paths]) => paths[lang] === currentPath)?.[0];
const altUrl = matchedKey ? new URL(pathMap[matchedKey][altLang], Astro.site).toString() : null;

const ogLocale = lang === 'de' ? 'de_DE' : 'en_US';
const altLocale = lang === 'de' ? 'en_US' : 'de_DE';
---
<!DOCTYPE html>
<html lang={lang}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#0a1e3a" />
  <meta name="x-version" content="2026-05-24_21-06" />

  <title>{title}</title>
  <meta name="description" content={description} />
  {keywords && <meta name="keywords" content={keywords} />}
  <meta name="author" content="FX Alpha eBusiness Consulting GmbH" />
  <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
  <link rel="canonical" href={canonical} />

  {altUrl && <link rel="alternate" hreflang={altLang} href={altUrl} />}
  {altUrl && <link rel="alternate" hreflang={lang} href={canonical} />}
  {altUrl && <link rel="alternate" hreflang="x-default" href={lang === 'de' ? canonical : altUrl} />}

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={new URL(ogImage, Astro.site).toString()} />
  <meta property="og:locale" content={ogLocale} />
  <meta property="og:locale:alternate" content={altLocale} />
  <meta property="og:site_name" content="FX Alpha" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={new URL(ogImage, Astro.site).toString()} />

  <link rel="icon" type="image/png" href="/assets/favicon.png" />

  <slot name="head" />
</head>
<body>
  <Nav lang={lang} navKey={navKey} />
  <main>
    <slot />
  </main>
  <Footer lang={lang} />
</body>
</html>
