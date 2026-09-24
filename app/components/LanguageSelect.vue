<script setup lang="ts">
const { locale, locales } = useDocusI18n()
const { copy } = useDocsCopy()
const route = useRoute()
const baseURL = useRuntimeConfig().app.baseURL
const selected = useCookie('i18n_redirected', { path: baseURL, sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 })
// Load the translated static page so Docus and Nuxt UI start in the same locale.
// Keep the query; translated headings do not share hashes.
const languagePath = (code: string) => `${baseURL}${code}${route.path.replace(/^\/(id|en)(?=\/|$)/, '')}${route.fullPath.slice(route.path.length).split('#')[0]}`
</script>
<template>
  <UPopover :content="{ align: 'end' }">
    <UButton color="neutral" variant="ghost" icon="i-lucide-languages" :aria-label="copy.language" :label="locale.toUpperCase()" />
    <template #content="{ close }">
      <nav class="p-1 min-w-44" :aria-label="copy.language">
        <a v-for="item in locales" :key="item.code" :href="languagePath(item.code)" :lang="item.code" :hreflang="item.code" :aria-current="item.code === locale ? 'page' : undefined" class="flex items-center justify-between gap-3 rounded px-3 py-2 text-sm hover:bg-elevated focus-visible:outline-primary" @click="selected = item.code; close()">
          {{ item.name }}<UIcon v-if="item.code === locale" name="i-lucide-check" />
        </a>
      </nav>
    </template>
  </UPopover>
</template>
