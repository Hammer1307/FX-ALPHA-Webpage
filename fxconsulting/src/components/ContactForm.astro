---
import { t, type Lang } from '../i18n/ui';

interface Props {
  lang: Lang;
}
const { lang } = Astro.props;
---
<div class="contact-form">
  <form action="https://formspree.io/f/mzdwvnwn" method="POST" id="contactForm" novalidate>
    <div class="form-header">{t(lang, 'form.header')}</div>
    <div class="form-sub">{t(lang, 'form.sub')}</div>

    <div class="field-row">
      <div class="field">
        <label for="cf-name">{t(lang, 'form.name')}<span class="req">{t(lang, 'form.required')}</span></label>
        <input type="text" id="cf-name" name="name" required autocomplete="name" />
      </div>
      <div class="field">
        <label for="cf-email">{t(lang, 'form.email')}<span class="req">{t(lang, 'form.required')}</span></label>
        <input type="email" id="cf-email" name="email" required autocomplete="email" />
      </div>
    </div>

    <div class="field-row">
      <div class="field">
        <label for="cf-company">{t(lang, 'form.company')}</label>
        <input type="text" id="cf-company" name="company" autocomplete="organization" />
      </div>
      <div class="field">
        <label for="cf-phone">{t(lang, 'form.phone')}</label>
        <input type="tel" id="cf-phone" name="phone" autocomplete="tel" />
      </div>
    </div>

    <div class="field">
      <label for="cf-topic">{t(lang, 'form.topic')}</label>
      <select id="cf-topic" name="topic">
        <option value="" disabled selected>{t(lang, 'form.topic.placeholder')}</option>
        <option value="etrading">{t(lang, 'form.topic.etrading')}</option>
        <option value="options">{t(lang, 'form.topic.options')}</option>
        <option value="vendor">{t(lang, 'form.topic.vendor')}</option>
        <option value="pe">{t(lang, 'form.topic.pe')}</option>
        <option value="other">{t(lang, 'form.topic.other')}</option>
      </select>
    </div>

    <div class="field">
      <label for="cf-message">{t(lang, 'form.message')}<span class="req">{t(lang, 'form.required')}</span></label>
      <textarea id="cf-message" name="message" required></textarea>
    </div>

    <div class="hp-field" aria-hidden="true">
      <label>Leave this field empty</label>
      <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" />
    </div>

    <button type="submit" class="submit" data-lang={lang}>{t(lang, 'form.submit')}</button>

    <div class="form-feedback" id="formFeedback" role="status" aria-live="polite"></div>
  </form>
</div>

<script is:inline define:vars={{ messages: {
  sending: { de: 'Wird gesendet…', en: 'Sending…' },
  success: {
    de: 'Vielen Dank! Ihre Nachricht ist angekommen — wir melden uns in der Regel innerhalb von 24 Stunden.',
    en: 'Thank you! Your message has been received — we typically respond within 24 hours.'
  },
  error: {
    de: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@fxconsulting.de.',
    en: 'Something went wrong. Please try again or email us directly at info@fxconsulting.de.'
  }
}}}>
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if (form) {
    const submitBtn = form.querySelector('.submit');
    const lang = submitBtn.dataset.lang || 'de';
    const submitOriginal = submitBtn.textContent;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

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
          throw new Error('Submission failed');
        }
      } catch (err) {
        feedback.className = 'form-feedback error show';
        feedback.textContent = messages.error[lang];
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = submitOriginal;
      }
    });
  }
</script>
