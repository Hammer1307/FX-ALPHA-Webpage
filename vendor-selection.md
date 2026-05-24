---
import LanguageSwitcher from './LanguageSwitcher.astro';
import { t, pathMap, type Lang } from '../i18n/ui';

interface Props {
  lang: Lang;
  navKey?: string;
}
const { lang, navKey } = Astro.props;

const links = [
  { key: 'etrading',        path: pathMap.etrading[lang],         label: t(lang, 'nav.etrading') },
  { key: 'options',         path: pathMap.options[lang],          label: t(lang, 'nav.options') },
  { key: 'privateEquity',   path: pathMap.privateEquity[lang],    label: t(lang, 'nav.pe') },
  { key: 'vendorSelection', path: pathMap.vendorSelection[lang],  label: t(lang, 'nav.vendor') },
  { key: 'about',           path: pathMap.about[lang],            label: t(lang, 'nav.about') }
];

const homePath = pathMap.home[lang];
const contactPath = pathMap.contact[lang];
---
<header class="nav">
  <div class="nav-inner">
    <a href={homePath} class="brand">
      <span class="mark" role="img" aria-label="FX Alpha"></span>
      {t(lang, 'site.name')} <small>{t(lang, 'site.subtitle')}</small>
    </a>

    <div class="nav-right">
      <nav class="links">
        {links.map(link => (
          <a href={link.path} class:list={[{ active: navKey === link.key }]}>{link.label}</a>
        ))}
      </nav>

      <LanguageSwitcher lang={lang} />

      <a href={contactPath} class="cta">{t(lang, 'cta.contact')}</a>
    </div>
  </div>
</header>
