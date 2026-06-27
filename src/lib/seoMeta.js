import { DEFAULT_SEO } from '../constants/seoDefaults';

/** @param {string} [siteUrl] */
export function getSiteUrl(siteUrl) {
  const fromEnv = import.meta.env.VITE_SITE_URL;
  const base = siteUrl || fromEnv || (typeof window !== 'undefined' ? window.location.origin : '');
  return base.replace(/\/$/, '');
}

/** @param {string} pathOrUrl @param {string} siteUrl */
export function resolveAbsoluteUrl(pathOrUrl, siteUrl) {
  if (!pathOrUrl) return '';
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = getSiteUrl(siteUrl);
  return `${base}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

/** @param {'name'|'property'} attr @param {string} key @param {string} content */
function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** @param {string} rel @param {string} href */
function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** @param {Partial<import('../constants/seoDefaults').SeoConfig>} seo @param {string} [siteUrl] */
export function applySeoToDocument(seo, siteUrl) {
  const config = { ...DEFAULT_SEO, ...seo };
  const baseUrl = getSiteUrl(siteUrl);
  const pageUrl = baseUrl || (typeof window !== 'undefined' ? window.location.href.split('?')[0] : '');
  const imageUrl = resolveAbsoluteUrl(config.ogImage, baseUrl);

  document.title = config.title;
  document.documentElement.lang = 'vi';

  upsertMeta('name', 'description', config.description);
  upsertMeta('name', 'keywords', config.keywords);
  upsertMeta('name', 'author', config.author);
  upsertMeta('name', 'robots', 'index, follow');
  upsertMeta('name', 'theme-color', config.themeColor);

  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:site_name', config.siteName);
  upsertMeta('property', 'og:locale', config.locale);
  upsertMeta('property', 'og:title', config.title);
  upsertMeta('property', 'og:description', config.description);
  upsertMeta('property', 'og:url', pageUrl);
  upsertMeta('property', 'og:image', imageUrl);
  upsertMeta('property', 'og:image:secure_url', imageUrl);
  upsertMeta('property', 'og:image:alt', config.ogImageAlt);
  upsertMeta('property', 'og:image:width', '1200');
  upsertMeta('property', 'og:image:height', '630');

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', config.title);
  upsertMeta('name', 'twitter:description', config.description);
  upsertMeta('name', 'twitter:image', imageUrl);
  upsertMeta('name', 'twitter:image:alt', config.ogImageAlt);
  if (config.twitterHandle) {
    upsertMeta('name', 'twitter:site', config.twitterHandle);
    upsertMeta('name', 'twitter:creator', config.twitterHandle);
  }

  upsertLink('canonical', pageUrl);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: config.siteName,
    url: pageUrl,
    image: imageUrl,
    description: config.description,
    founder: { '@type': 'Person', name: config.author },
    areaServed: 'VN',
    serviceType: ['Web Development', 'E-commerce', 'System Integration'],
  };

  let script = document.getElementById('seo-jsonld');
  if (!script) {
    script = document.createElement('script');
    script.id = 'seo-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(jsonLd);
}
