# FX Alpha — Website

Multi-page Astro site for **FX Alpha eBusiness Consulting GmbH** (`fxconsulting.de`).

Multilingual (DE + EN) with separate URLs per language for proper international SEO. Content is written in Markdown, fully separated from the layout components. Builds to static HTML/CSS/JS — deploys anywhere that hosts static files.

**Current version:** `2026-05-24_13-48` — see [CHANGELOG.md](./CHANGELOG.md)

## Versioning convention

ZIP exports and major snapshots use the timestamp `YYYY-MM-DD_HH-MM` (UTC) in the filename — they sort chronologically in any file manager. The current version is also embedded in `BaseLayout.astro` as a `<meta name="x-version">` tag, so any rendered page identifies its build.

---

## Architecture

```
fxconsulting/
├── astro.config.mjs              # Astro + sitemap + i18n config
├── package.json                  # Dependencies (astro, @astrojs/sitemap)
├── tsconfig.json
├── public/                       # Static assets (copied as-is to dist/)
│   ├── assets/
│   │   ├── logo.webp
│   │   └── favicon.png
│   ├── robots.txt
│   ├── _headers                  # Cloudflare Pages: security + cache
│   └── _redirects
├── src/
│   ├── styles/
│   │   └── global.css            # All visual styling
│   ├── i18n/
│   │   └── ui.ts                 # UI strings (menu, footer, form labels)
│   ├── layouts/
│   │   └── BaseLayout.astro      # HTML shell, meta tags, header/footer
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── LanguageSwitcher.astro
│   │   ├── Hero.astro
│   │   ├── ContactForm.astro
│   │   ├── RelatedServices.astro
│   │   ├── Faq.astro
│   │   └── ContactCTA.astro
│   ├── content/                  # Markdown — separated from layout
│   │   ├── config.ts             # Content collection schema
│   │   ├── de/
│   │   │   ├── home.md
│   │   │   ├── etrading-beratung.md
│   │   │   ├── fx-options.md
│   │   │   ├── private-equity-fx.md
│   │   │   ├── vendor-selection.md
│   │   │   ├── ueber-uns.md
│   │   │   └── kontakt.md
│   │   └── en/
│   │       └── (same structure with EN slugs)
│   └── pages/                    # Route definitions
│       ├── index.astro           # Language picker / auto-redirect
│       ├── de/
│       │   └── (7 pages)
│       └── en/
│           └── (7 pages)
└── CHANGELOG.md
```

## Setup & development

Requires **Node.js 18+**.

```bash
# 1. Install dependencies
npm install

# 2. Local dev server (hot reload at http://localhost:4321)
npm run dev

# 3. Production build (output goes to dist/)
npm run build

# 4. Preview the production build locally
npm run preview
```

## Editing content

**Texts:** Edit the Markdown files in `src/content/{de,en}/`. Each file has frontmatter (title, description, headline, FAQs, etc.) and a Markdown body. No Astro knowledge needed.

**UI labels** (menu items, button labels, form fields): Edit `src/i18n/ui.ts`.

**Layout, design, structure:** Edit files in `src/layouts/`, `src/components/`, `src/styles/`.

**New service page:**
1. Create `src/content/de/new-slug.md` and `src/content/en/new-slug.md`
2. Add the URL mapping in `src/i18n/ui.ts` under `pathMap`
3. Create `src/pages/de/new-slug.astro` and `src/pages/en/new-slug.astro` (copy any service page as a template — they're 30 lines each)
4. Add the nav entry in `src/components/Nav.astro` if it should appear in the main menu

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. Cloudflare dashboard → Pages → Create project → Connect to Git
3. Pick the repo
4. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** `18` or higher (set as env var `NODE_VERSION=18`)
5. Deploy

Cloudflare picks up `public/_headers` and `public/_redirects` automatically. Custom domain `fxconsulting.de` via *Custom Domains* → DNS records are suggested.

## URL structure

| Page | German | English |
|------|--------|---------|
| Home | `/de/` | `/en/` |
| eTrading | `/de/etrading-beratung/` | `/en/etrading-consulting/` |
| FX Options | `/de/fx-options/` | `/en/fx-options/` |
| Private Equity | `/de/private-equity-fx/` | `/en/private-equity-fx/` |
| Vendor Selection | `/de/vendor-selection/` | `/en/vendor-selection/` |
| About | `/de/ueber-uns/` | `/en/about/` |
| Contact | `/de/kontakt/` | `/en/contact/` |

Root `/` is a language picker that auto-redirects based on browser language.

## SEO features built in

- ✅ Each page: unique title, meta description, H1 (keyword-focused per page)
- ✅ `hreflang` tags linking DE and EN versions
- ✅ Canonical URLs
- ✅ Open Graph + Twitter Card meta tags
- ✅ JSON-LD `FAQPage` schema on every service page (Featured Snippet candidate)
- ✅ Sitemap with i18n alternates (auto-generated at `/sitemap-index.xml`)
- ✅ robots.txt with sitemap reference
- ✅ Internal cross-linking via "Related services" block on each service page

## Things to update at launch

1. **og-image.png** (1200×630 px) at `public/assets/og-image.png` — currently referenced in meta tags but file doesn't exist yet
2. **Imprint, privacy policy, disclaimer pages** — currently footer links point to `#`
3. **UK phone number** in About content — currently a placeholder
4. **LinkedIn company URL** for JSON-LD — verify on About page
5. **Formspree** dashboard: allow your live domain (and Cloudflare preview domain during testing)
6. **Submit sitemap** to Google Search Console and Bing Webmaster Tools

## License

Proprietary. © FX Alpha eBusiness Consulting GmbH.
