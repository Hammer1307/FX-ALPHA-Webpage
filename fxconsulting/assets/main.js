// SEO metadata for both languages
  const seoMeta = {
    de: {
      title: 'FX Alpha · Unabhängige FX- und eTrading-Beratung | Banken · PE · Trading',
      description: 'Unabhängige FX-Beratung aus Deutschland für Banken, Hedge Funds, Private Equity und Trading-Häuser. eTrading-Plattformen, FX Options, Deal-Hedging, Vendor Selection. 30+ Jahre Erfahrung.',
      ogTitle: 'FX Alpha · Unabhängige FX- und eTrading-Beratung',
      ogDesc: 'Unabhängige FX-Beratung aus Deutschland. Für Banken, Hedge Funds, Private Equity und Trading-Häuser. eTrading, FX Options, Deal-Hedging, Vendor Selection.',
      ogLocale: 'de_DE'
    },
    en: {
      title: 'FX Alpha · Independent FX & eTrading Consulting | Banks · PE · Trading',
      description: 'Independent FX advisory from Germany for banks, hedge funds, private equity and trading firms. eTrading platforms, FX options, deal hedging, vendor selection. 30+ years of experience.',
      ogTitle: 'FX Alpha · Independent FX & eTrading Consulting',
      ogDesc: 'Independent FX advisory from Germany. For banks, hedge funds, private equity and trading firms. eTrading, FX options, deal hedging, vendor selection.',
      ogLocale: 'en_US'
    }
  };

  function applyMeta(lang) {
    const m = seoMeta[lang] || seoMeta.de;
    document.title = m.title;
    const setMeta = (sel, val) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute('content', val);
    };
    setMeta('meta[name="description"]', m.description);
    setMeta('meta[property="og:title"]', m.ogTitle);
    setMeta('meta[property="og:description"]', m.ogDesc);
    setMeta('meta[property="og:locale"]', m.ogLocale);
    setMeta('meta[name="twitter:title"]', m.ogTitle);
    setMeta('meta[name="twitter:description"]', m.ogDesc);
  }

  // Language switcher
  const langBtns = document.querySelectorAll('.lang-btn');
  const htmlEl = document.documentElement;
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      htmlEl.setAttribute('lang', lang);
      langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
      applyMeta(lang);
      try { localStorage.setItem('fxalpha-lang', lang); } catch(e) {}
    });
  });
  // Restore language preference
  try {
    const saved = localStorage.getItem('fxalpha-lang');
    if (saved && (saved === 'de' || saved === 'en')) {
      htmlEl.setAttribute('lang', saved);
      langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === saved));
      applyMeta(saved);
    }
  } catch(e) {}

  // Contact form submission via Formspree (AJAX)
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if (form) {
    const submitBtn = form.querySelector('.submit');
    const submitOriginal = submitBtn.innerHTML;

    const messages = {
      sending: { de: 'Wird gesendet…', en: 'Sending…' },
      success: {
        de: 'Vielen Dank! Ihre Nachricht ist angekommen — wir melden uns in der Regel innerhalb von 24 Stunden.',
        en: 'Thank you! Your message has been received — we typically respond within 24 hours.'
      },
      error: {
        de: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@fxconsulting.de.',
        en: 'Something went wrong. Please try again or email us directly at info@fxconsulting.de.'
      }
    };

    const currentLang = () => htmlEl.getAttribute('lang') || 'de';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Basic validation
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const lang = currentLang();
      submitBtn.disabled = true;
      submitBtn.textContent = messages.sending[lang];
      feedback.className = 'form-feedback';
      feedback.textContent = '';

      try {
        const data = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          feedback.className = 'form-feedback success show';
          feedback.textContent = messages.success[lang];
          form.reset();
        } else {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || 'Submission failed');
        }
      } catch (err) {
        feedback.className = 'form-feedback error show';
        feedback.textContent = messages.error[lang];
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitOriginal;
      }
    });
  }