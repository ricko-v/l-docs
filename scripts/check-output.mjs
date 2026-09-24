import { readFile, readdir, stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { contentRoutes } from './content-routes.mjs'

const root = resolve('.output/public')
const base = '/' + (process.env.NUXT_APP_BASE_URL || '').split('/').filter(Boolean).join('/')
const prefix = base === '/' ? '/' : base + '/'
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(join(dir, e.name)) : join(dir, e.name)))).flat()
}
const pages = (await files(root)).filter(f => f.endsWith('/index.html'))
const errors = []
let checked = 0
for (const file of pages) {
  const html = await readFile(file, 'utf8')
  if (html.includes('[[')) errors.push(`${file}: unconverted wikilink`)
  const current = new URL(prefix + file.slice(root.length + 1).replace(/index\.html$/, ''), 'https://docs.example')
  for (const match of html.matchAll(/<(?:a|link|script|img)\b[^>]*?\b(?:href|src)="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll('&amp;', '&'), current)
    if (url.origin !== current.origin) continue
    if (!url.pathname.startsWith(prefix)) {
      errors.push(`${file}: outside base URL: ${url.pathname}`)
      continue
    }
    let target = join(root, decodeURIComponent(url.pathname.slice(prefix.length)))
    try {
      if ((await stat(target)).isDirectory()) target = join(target, 'index.html')
      await stat(target)
      if (url.hash && target.endsWith('.html')) {
        const targetHtml = target === file ? html : await readFile(target, 'utf8')
        if (!targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) errors.push(`${file}: missing anchor ${match[1]}`)
      }
      checked++
    } catch { errors.push(`${file}: missing ${url.pathname}`) }
  }
}
const idRoutes = await contentRoutes('id')
const enRoutes = await contentRoutes('en')
const expected = idRoutes.length * 3 // Two languages plus legacy redirects.
if (JSON.stringify(idRoutes.map(r => r.path).sort()) !== JSON.stringify(enRoutes.map(r => r.path).sort())) {
  errors.push('Missing translation: Indonesian and English routes must match')
}
for (const locale of ['id', 'en']) {
  for (const { path } of idRoutes) {
    const file = join(root, locale, path, 'index.html')
    try {
      const html = await readFile(file, 'utf8')
      if (!html.match(new RegExp(`<html[^>]* lang="${locale}"`))) errors.push(`${file}: wrong document language`)
      const other = locale === 'id' ? 'en' : 'id'
      if (!html.includes(`hreflang="${other}`)) errors.push(`${file}: missing alternate language metadata`)
      for (const match of html.matchAll(/<a\b[^>]*href="([^"#]+)"/g)) {
        if (match[1].startsWith(prefix + other + '/')) errors.push(`${file}: content links to the other language: ${match[1]}`)
      }
    } catch { errors.push(`Missing localized page: ${file}`) }
  }
}
if (pages.length !== expected) errors.push(`Expected ${expected} localized pages and redirects; found ${pages.length}`)
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1 }
else console.log(`Verified ${pages.length} pages and ${checked} internal links/assets for ${prefix}`)
