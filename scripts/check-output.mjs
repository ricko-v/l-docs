import { readFile, readdir, stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'

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
const expected = (await files(resolve('content'))).filter(f => f.endsWith('.md')).length
if (pages.length !== expected) errors.push(`Expected ${expected} content pages; found ${pages.length}`)
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1 }
else console.log(`Verified ${pages.length} pages and ${checked} internal links/assets for ${prefix}`)
