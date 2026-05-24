# Changelog

Versionsschema: `YYYY-MM-DD_HH-MM` (UTC) — sortiert sich automatisch chronologisch.
Aktuelle Version steht ganz oben.

---

## 2026-05-24_14-08

**Status:** Google Fonts auf Selbst-Hosting umgestellt, USt-ID im Impressum ergänzt.

### Schriftarten jetzt vollständig lokal

Die Schriftarten Archivo, Manrope und JetBrains Mono werden nicht mehr von `fonts.googleapis.com` geladen, sondern als Variable-Font-WOFF2-Dateien vom eigenen Server ausgeliefert.

**Technische Umsetzung:**
- Drei neue Dev-Dependencies in `package.json`: `@fontsource-variable/archivo`, `@fontsource-variable/manrope`, `@fontsource-variable/jetbrains-mono`
- `src/styles/global.css`: `@import`-Statements am Anfang
- `src/layouts/BaseLayout.astro`: Google-Fonts-`<link>`-Tags und `preconnect` entfernt

**Build-Output:** 13 WOFF2-Dateien in `/_astro/`, automatisch gehasht und mit Cache-Control aus `_headers` versorgt. Browser lädt nur das passende Subset (typischerweise nur `latin`).

**Folge für Datenschutz:**
- Keine IP-Übermittlung mehr an Google beim Laden der Schriftarten
- Drittland-Übermittlung (USA) für Fonts entfällt vollständig
- Bekannte DSGVO-Problemquelle (vgl. LG München 20.01.2022) eliminiert

### Inhaltliche Anpassungen

**Datenschutzerklärung (DE + EN):**
- Abschnitt 6 „Schriftarten" komplett umgeschrieben: „selbst gehostet, keine Datenübertragung an Dritte"
- Drittland-Übermittlung für Fonts aus dem Text entfernt

**Cookie-Hinweis (DE + EN):**
- „Hinweis zu Google Fonts" → „Hinweis zu Schriftarten" (selbst gehostet)
- Klarstellung: keine externen Schriftarten-Dienste, keine Cookies, keine IP-Übermittlung

**Impressum (DE + EN):**
- Umsatzsteuer-Identifikationsnummer eingetragen: **DE359815036**

### Build

23 Pages, sauber. Externe Font-Requests verifiziert auf 0.

### Was jetzt verbleibt für die anwaltliche Prüfung

Eine der drei Knackpunkte vom letzten Mal (Google Fonts) ist damit erledigt. Übrig:
- **Formspree (USA)** als Auftragsverarbeiter für das Kontaktformular — Anwalt prüfen lassen
- Allgemeine Durchsicht von Impressum, Datenschutz, Disclaimer, Cookie-Hinweis durch Fachanwalt für IT-/Internetrecht

---

## 2026-05-24_13-48

**Status:** Legal-Seiten, og-image, kleine Frontpage-Anpassung.

### Neue Legal-Seiten

Vier eigenständige rechtliche Seiten, je in DE und EN — jeweils mit `noindex, follow` (sollen nicht in Suchergebnissen erscheinen, aber Links werden verfolgt):

- `/de/impressum/` und `/en/imprint/`
- `/de/datenschutz/` und `/en/privacy/`
- `/de/disclaimer/` und `/en/disclaimer/`
- `/de/cookies/` und `/en/cookies/`

Footer-Links zeigen jetzt auf die echten URLs (vorher: `href="#"`).

### Inhaltliche Verbesserungen gegenüber der alten Gamma-Seite

**Impressum:** EU-Streitschlichtungs-Hinweis (Art. 14 ODR-VO Pflicht) ergänzt, Verantwortlicher nach § 18 Abs. 2 MStV separat ausgewiesen, USt-IdNr-Feld als Platzhalter (vom Mandanten zu ergänzen).

**Datenschutzerklärung:** Komplett neu geschrieben — speziell auf das tatsächliche Tech-Setup der Astro-Seite zugeschnitten (Cloudflare-Hosting, Formspree, Google Fonts, kein Google Analytics mehr). Aufsichtsbehörde HBDI explizit benannt. DSGVO-Boilerplate gestrafft.

**Disclaimer:** Beratungsspezifische Klarstellungen — keine Anlageberatung (WpHG), keine Rechtsberatung (RDG), keine Steuerberatung (StBerG). Risikohinweis Devisen-/Derivategeschäfte. Marken- und Kennzeichenrechte explizit erwähnt.

**Cookie-Hinweis:** Eigenständige Seite mit Tabellen-Übersicht aller Cookies. Aktuell nur `__cf_bm` (Cloudflare, technisch notwendig). Hinweis nach § 25 Abs. 2 Nr. 2 TTDSG, dass kein Cookie-Banner nötig ist.

### Frontpage-Anpassung

- Service-Teaser-Karte für PE: „Deal-Hedging" → „Deal-Strategien" (DE) bzw. „Deal hedging" → „Deal strategy" (EN)

### Neu im Tech-Setup

- `public/assets/og-image.png` (1200×630 px) für Social-Sharing-Previews — wird in `BaseLayout.astro` über OG- und Twitter-Card-Tags eingebunden
- `BaseLayout.astro`: neue Prop `noindex` für Legal-Seiten
- `src/content/config.ts`: pageType-Enum um `'legal'` erweitert
- `src/i18n/ui.ts`: `pathMap` um vier Legal-Routen ergänzt, Footer-Translations um `cookies`-Eintrag

### Build

23 Pages (15 Content + 8 Legal). Sauberer Build, keine Warnungen.

### Offene TODOs (übernommen)

- USt-IdNr im Impressum prüfen und einfügen, falls vorhanden
- LinkedIn-Company-URL in JSON-LD verifizieren
- UK-Telefonnummer prüfen
- Rechtliche Prüfung der drei Legal-Seiten durch einen Fachanwalt für IT-/Internetrecht
- Live-Deployment: Sitemap an Google Search Console und Bing Webmaster Tools übergeben

---

## 2026-05-24_13-07

**Status:** Komplette Architektur-Migration auf Astro mit Multi-Page-Struktur und Markdown-getrenntem Content.

### Was sich grundlegend ändert

- **Von Single-Page-HTML zu Multi-Page-Astro.** Statt einer Datei mit JavaScript-Sprachwechsel jetzt 15 separate Seiten — sieben Inhaltsseiten pro Sprache plus eine Sprachweiche an der Root.
- **Echte URL-Trennung der Sprachen.** `/de/private-equity-fx/` und `/en/private-equity-fx/` sind jetzt eigenständige Adressen mit hreflang-Verknüpfung. Saubere SEO-Lösung, die Google als Übersetzung versteht.
- **Content getrennt vom Layout** (Variante B). Alle Seitentexte liegen als Markdown in `src/content/{de,en}/`. Layout, Navigation, Komponenten sind in `src/components/` und `src/layouts/` einmalig definiert. Änderung am Header oder Footer = ein File, alle 15 Seiten ziehen nach.
- **Build-Schritt.** Astro generiert beim Build statisches HTML in `dist/`, das auf Cloudflare Pages deployt wird. Build-Befehl: `npm run build`.

### Neue Seiten

- `/de/` und `/en/` — Homepage mit den vier X&Y-Storys, Klientel-Grid und Service-Teasern
- `/de/etrading-beratung/` / `/en/etrading-consulting/`
- `/de/fx-options/` / `/en/fx-options/`
- **`/de/private-equity-fx/` / `/en/private-equity-fx/`** — die Priority-Seite für die DACH-Marktlücke (Deal-Hedging, Sign-to-Close, Cross-Border-M&A)
- `/de/vendor-selection/` / `/en/vendor-selection/`
- `/de/ueber-uns/` / `/en/about/`
- `/de/kontakt/` / `/en/contact/`

### Tiefgreifender SEO-Hebel

Jede Service-Seite hat:
- Eigenen Title und eigene Meta-Description (Keyword-fokussiert pro Seite)
- Eigenen Hero mit H1, der das primäre Keyword trägt
- 500-1.200 Wörter Fließtext, präzise auf das jeweilige Thema zugeschnitten
- FAQ-Block mit Schema.org `FAQPage` JSON-LD (Featured-Snippet-Kandidat)
- Interne Verlinkung zu verwandten Services (Themen-Cluster)
- hreflang-Tags zwischen DE und EN
- Canonical-URL

Astro generiert automatisch eine Sitemap (`/sitemap-index.xml`) mit allen 14 Sprachseiten und der hreflang-Verknüpfung — kein manuelles Pflegen mehr.

### Technik-Stack

- **Framework:** Astro 4.16
- **Sitemap:** @astrojs/sitemap (automatisch generiert)
- **Hosting-Ziel:** Cloudflare Pages (oder Vercel/Netlify; alles statisch)
- **Dependencies:** Nur Astro selbst + Sitemap-Plugin. Keine Runtime-Frameworks.
- **Build-Output:** Statisches HTML/CSS/JS in `dist/`

### Offene TODOs (übernommen aus Vorgängerversion)

- og-image.png erstellen (1200×630 px)
- Echte Imprint-, Datenschutz-, Disclaimer-Seiten anlegen (aktuell `href="#"`)
- LinkedIn-Company-URL in JSON-LD verifizieren (für About-Seite)
- UK-Telefonnummer prüfen
- Live-Deployment: Sitemap an Google Search Console und Bing Webmaster Tools übergeben
- Formspree-Domain-Whitelist um Live-URL und Cloudflare-Preview ergänzen

---

## 2026-05-24_12-51

**Status:** Erstes vollständiges Repo-Paket, GitHub-Upload-bereit (Plain-HTML-Architektur).

- Saubere Projektstruktur: `index.html` + getrennte `assets/` (CSS, JS, Logo, Favicon)
- SEO-Optimierung komplett: Title, Meta-Description (DE/EN), Open Graph, Twitter Cards, JSON-LD, Canonical, Favicon
- Kontaktformular mit Formspree-Endpoint (`mzdwvnwn`)
- Sprachwechsel DE/EN inkl. Title/Meta-Aktualisierung per JavaScript
- Cloudflare Pages Konfiguration (`_headers`, `_redirects`)
- robots.txt, sitemap.xml

---

<!-- Beim nächsten Update: neuen Block ganz oben einfügen, Format wie oben -->
