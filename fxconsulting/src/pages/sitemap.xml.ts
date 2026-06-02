import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { pathMap } from '../i18n/ui';

const SITE = 'https://fxconsulting.de';

// Statische Seiten, die in die Sitemap gehören (Rechtsseiten bewusst ausgenommen).
const PAGE_KEYS: Array<{ key: keyof typeof pathMap; priority: string }> = [
  { key: 'home', priority: '1.0' },
  { key: 'etrading', priority: '0.9' },
  { key: 'options', priority: '0.9' },
  { key: 'privateEquity', priority: '0.9' },
  { key: 'vendorSelection', priority: '0.9' },
  { key: 'insights', priority: '0.7' },
  { key: 'about', priority: '0.6' },
  { key: 'contact', priority: '0.6' }
];

function entry(loc: string, lastmod: string, priority: string, deUrl: string, enUrl: string | null) {
  const alts = [
    `<xhtml:link rel="alternate" hreflang="de" href="${deUrl}"/>`,
    enUrl ? `<xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>` : '',
    `<xhtml:link rel="alternate" hreflang="x-default" href="${deUrl}"/>`
  ].filter(Boolean).map((l) => `    ${l}`).join('\n');
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
${alts}
  </url>`;
}

export const GET: APIRoute = async () => {
  const buildDate = new Date().toISOString().slice(0, 10);
  const urls: string[] = [];

  // 1) Statische Seiten (DE + EN)
  for (const { key, priority } of PAGE_KEYS) {
    const deUrl = SITE + pathMap[key].de;
    const enUrl = SITE + pathMap[key].en;
    urls.push(entry(deUrl, buildDate, priority, deUrl, enUrl));
    urls.push(entry(enUrl, buildDate, priority, deUrl, enUrl));
  }

  // 2) Insights-Artikel (automatisch aus den Collections)
  const insDe = await getCollection('insightsDe', ({ data }) => !data.draft);
  const insEn = await getCollection('insightsEn', ({ data }) => !data.draft);
  const enSlugs = new Set(insEn.map((e) => e.slug));
  const deSlugs = new Set(insDe.map((e) => e.slug));

  for (const e of insDe) {
    const deUrl = `${SITE}/de/insights/${e.slug}/`;
    const enUrl = enSlugs.has(e.slug) ? `${SITE}/en/insights/${e.slug}/` : null;
    urls.push(entry(deUrl, e.data.date, '0.7', deUrl, enUrl));
  }
  for (const e of insEn) {
    const enUrl = `${SITE}/en/insights/${e.slug}/`;
    const deUrl = deSlugs.has(e.slug) ? `${SITE}/de/insights/${e.slug}/` : null;
    // hreflang: de-Variante als Referenz, sonst nur en
    urls.push(entry(enUrl, e.data.date, '0.7', deUrl ?? enUrl, deUrl ? enUrl : null));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
