# FX Alpha — Website

Static website for **FX Alpha eBusiness Consulting GmbH** (`fxconsulting.de`).

Single-page site with German/English language toggle, modern editorial design, fully static — no build step, no frameworks. Pure HTML, CSS, JS. Deploys anywhere that hosts static files.

---

## File structure

```
fxconsulting/
├── index.html            # Main page (DE/EN content with JS toggle)
├── assets/
│   ├── styles.css        # All styles (~22 KB)
│   ├── main.js           # Language switcher + contact form handler
│   ├── logo.webp         # Company logo (transparent, ~264 KB)
│   └── favicon.png       # Favicon
├── robots.txt            # Search-engine instructions
├── sitemap.xml           # Sitemap for search engines
├── _headers              # HTTP headers (Cloudflare Pages)
├── _redirects            # URL redirects (Cloudflare Pages)
├── .gitignore
└── README.md
```

## Local preview

Open `index.html` directly in a browser — everything works file-protocol-safe.

For a proper local server (recommended, fixes any CORS quirks):

```bash
# Python 3
python3 -m http.server 8000

# or with Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. In Cloudflare dashboard → Pages → Create project → Connect to Git
3. Select this repo
4. Build settings:
   - **Build command**: *(leave empty)*
   - **Build output directory**: `/`
5. Deploy

Cloudflare picks up `_headers` and `_redirects` automatically.

## Deploy alternatives

| Host | Setup |
|------|-------|
| **GitHub Pages** | Settings → Pages → Deploy from main branch, root `/` |
| **Netlify** | Drag-and-drop the folder, or connect repo |
| **Vercel** | `vercel` in this folder, accept defaults |
| **S3 / nginx / Apache** | Upload contents as-is |

## SEO setup checklist

- [x] Title tag (DE + EN, switches with language)
- [x] Meta description (DE + EN)
- [x] Open Graph + Twitter Card tags
- [x] JSON-LD structured data (`ProfessionalService` schema)
- [x] Canonical URL
- [x] Favicon
- [x] robots.txt + sitemap.xml
- [ ] **TODO**: Create `og-image.png` (1200×630 px) for social sharing previews
- [ ] **TODO**: Submit `sitemap.xml` to Google Search Console
- [ ] **TODO**: Verify domain in Google Search Console + Bing Webmaster Tools
- [ ] **TODO**: Add Google Analytics or Plausible (GDPR-friendly)

## Multilingual SEO upgrade (recommended)

Currently both languages live on one URL (`/`), with JS hiding one. For proper international SEO, split into:

- `/de/` — German version (set as default)
- `/en/` — English version

Then activate the commented `hreflang` block in `index.html` `<head>`:

```html
<link rel="alternate" hreflang="de" href="https://fxconsulting.de/de/">
<link rel="alternate" hreflang="en" href="https://fxconsulting.de/en/">
<link rel="alternate" hreflang="x-default" href="https://fxconsulting.de/">
```

## Contact form

Submissions go to **Formspree** at `https://formspree.io/f/mzdwvnwn`.

Configure in Formspree dashboard:
- Recipient email: `info@fxconsulting.de`
- Add `fxconsulting.de` (and the Cloudflare preview domain during testing) to allowed domains
- Optional: Enable reCAPTCHA, autoresponder, file upload

## Things to update at launch

1. **Phone numbers** in `index.html` and structured data — verify the UK number (currently placeholder)
2. **LinkedIn company URL** in JSON-LD (currently `linkedin.com/company/fx-alpha-ebusiness-consulting` — confirm or update)
3. **Imprint, privacy policy, disclaimer** — currently dead links in footer (`href="#"`)
4. **Real client logos** if you want a trust strip later

## License

Proprietary. © FX Alpha eBusiness Consulting GmbH.
