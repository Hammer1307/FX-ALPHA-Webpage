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

export const collections = {
  de: defineCollection({ type: 'content', schema: pageSchema }),
  en: defineCollection({ type: 'content', schema: pageSchema })
};
