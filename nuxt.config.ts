const baseURL = '/' + (process.env.NUXT_APP_BASE_URL || '').split('/').filter(Boolean).join('/') + '/'
const appBaseURL = baseURL === '//' ? '/' : baseURL
const siteURL = (process.env.NUXT_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

export default defineNuxtConfig({
  extends: ['docus'],
  compatibilityDate: '2026-09-24',
  devtools: { enabled: false },
  app: {
    baseURL: appBaseURL,
    head: { htmlAttrs: { lang: 'id' }, link: [{ rel: 'icon', type: 'image/svg+xml', href: appBaseURL + 'favicon.svg' }] },
  },
  site: { name: 'l — AWS Lambda CLI', url: siteURL },
  css: ['@fontsource-variable/manrope', '@fontsource-variable/jetbrains-mono'],
  ui: { fonts: false },
  llms: { domain: siteURL, },
  icon: { clientBundle: { icons: ['simple-icons:npm', 'lucide:circle-help', 'vscode-icons:file-type-json'] } },
  robots: { robotsTxt: false },
  docus: { assistant: { enabled: false } },
  mcp: { enabled: false },
  ogImage: { enabled: false },
  nitro: { prerender: { crawlLinks: true, failOnError: true, autoSubfolderIndex: true } },
})
