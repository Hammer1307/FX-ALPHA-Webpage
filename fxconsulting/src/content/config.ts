import { defineCollection, z } from 'astro:content';

// Schema für alle Content-Seiten
const pageSchema = z.object({
  // SEO
  title: z.string(),
  description: z.string(),
  keywords: z.string().optional(),

  // Hero
  eyebrow: z.string().optional(),
  headline: z.string(),
  subheadline: z.string().optional(),

  // Page Type
  pageType: z.enum(['home', 'service', 'about', 'contact', 'legal']),

  // Navigation key
  navKey: z.string().optional(),

  // Related Services
  related: z.array(z.string()).optional(),

  // FAQ (für Featured Snippets)
  faq: z.array(z.object({
    q: z.string(),
    a: z.string()
  })).optional(),

  // Nur für Homepage: vier X & Y Story-Sektionen
  stories: z.array(z.object({
    eyebrow: z.string(),
    headlineX: z.string(),
    headlineY: z.string(),
    intro: z.string(),
    columns: z.array(z.object({
      label: z.string(),
      text: z.string()
    }))
  })).optional(),

  // Nur für Homepage: Klientel-Grid
  clientTypes: z.array(z.object({
    title: z.string(),
    text: z.string()
  })).optional(),

  // Nur für Homepage: Service-Teaser-Karten
  serviceTeasers: z.array(z.object({
    number: z.string(),
    title: z.string(),
    text: z.string(),
    linkKey: z.string()
  })).optional()
});

// Schema für Insights / White Paper (eigene Collection pro Sprache)
const insightSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.string().optional(),
  // Typ-Label für Karte & Hero, z. B. "White Paper", "Analyse", "Briefing"
  type: z.string().default('White Paper'),
  // Veröffentlichungsdatum im ISO-Format (YYYY-MM-DD)
  date: z.string(),
  // optionale Lesezeit-Angabe, z. B. "8 Min." / "8 min read"
  readingTime: z.string().optional(),
  // optionaler Autor (sonst Organisation)
  author: z.string().optional(),
  // Teaser für die Übersichtskarte
  teaser: z.string(),
  // optionaler, kürzerer SEO-Title (sonst wird title verwendet)
  seoTitle: z.string().optional(),
  // optionaler PDF-Download (Pfad relativ zu /public, z. B. /insights/datei.pdf)
  pdf: z.string().optional(),
  // optionales Label/Hinweis zum PDF, z. B. "11 Seiten · Deutsch"
  pdfNote: z.string().optional(),
  // Entwurf: wird nicht ausgegeben, solange true
  draft: z.boolean().optional()
});

export const collections = {
  de: defineCollection({ type: 'content', schema: pageSchema }),
  en: defineCollection({ type: 'content', schema: pageSchema }),
  insightsDe: defineCollection({ type: 'content', schema: insightSchema }),
  insightsEn: defineCollection({ type: 'content', schema: insightSchema })
};
