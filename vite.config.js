import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'node:fs'

const FALLBACK_SITE_URL = 'https://dotrongtan.dev'

/** @param {string} siteUrl */
function buildRobotsTxt(siteUrl) {
  return `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${siteUrl}/sitemap.xml
`
}

/** @param {string} siteUrl */
function buildSitemapXml(siteUrl) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || FALLBACK_SITE_URL).replace(/\/$/, '')

  return {
    plugins: [
      react(),
      {
        name: 'seo-static-files',
        transformIndexHtml(html) {
          return html.replaceAll('__SITE_URL__', siteUrl)
        },
        closeBundle() {
          writeFileSync('dist/robots.txt', buildRobotsTxt(siteUrl))
          writeFileSync('dist/sitemap.xml', buildSitemapXml(siteUrl))
        },
      },
    ],
  }
})
