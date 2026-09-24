import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { contentRoutes, prefix } from './content-routes.mjs'

// GitHub Pages has no server redirects. Preserve old URLs with static HTML.
const root = resolve('.output/public')
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
const site = (process.env.NUXT_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
const routes = await contentRoutes('id')
for (const { path } of routes) {
  const target = `${prefix}id${path === '/' ? '/' : path}`
  const file = join(root, path, 'index.html')
  const json = value => JSON.stringify(value).replaceAll('<', '\\u003c')
  const selection = path === '/' ? `if (document.cookie.split(';').some(c => c.trim() === 'i18n_redirected=en')) target = ${json(prefix + 'en/')};` : ''
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, `<!doctype html>
<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>l docs</title>
<meta name="robots" content="noindex"><link rel="canonical" href="${escape(site + '/id' + path)}">
<script>let target = ${json(target)}; ${selection} location.replace(target + location.search + location.hash);</script>
<noscript><meta http-equiv="refresh" content="0;url=${escape(target)}"></noscript>
</head><body><p><a href="${escape(target)}">Buka dokumentasi / Open documentation</a></p></body></html>\n`)
}
console.log(`Generated ${routes.length} static redirects for ${prefix}`)
