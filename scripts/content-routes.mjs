import { readdir } from 'node:fs/promises'
import { join, resolve, relative, sep } from 'node:path'

export async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(join(dir, e.name)) : join(dir, e.name)))).flat()
}
export async function contentRoutes(locale) {
  const root = resolve('content', locale)
  return (await files(root)).filter(f => f.endsWith('.md')).map(file => ({
    file,
    path: '/' + relative(root, file).split(sep).map(part => part.replace(/^\d+\./, '')).join('/').replace(/(?:^|\/)index\.md$/, '').replace(/\.md$/, ''),
  }))
}
export const prefix = '/' + (process.env.NUXT_APP_BASE_URL || '').split('/').filter(Boolean).map(s => s + '/').join('')
