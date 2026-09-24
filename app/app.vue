<script setup lang="ts">
import { id, en } from '@nuxt/ui/locale'
import { transformNavigation } from 'docus/app/utils/navigation'
import { useDocusShortcuts } from 'docus/app/composables/useDocusShortcuts'

const config = useRuntimeConfig()
const { locale } = useDocusI18n()
const { copy } = useDocsCopy()
const uiLocale = computed(() => locale.value === 'en' ? en : id)
const collection = computed(() => locale.value === 'en' ? 'docs_en' : 'docs_id')
useDocusShortcuts()
useHead({
  htmlAttrs: { lang: () => locale.value, dir: 'ltr' },
  link: [{ rel: 'icon', type: 'image/svg+xml', href: config.app.baseURL + 'favicon.svg' }],
})
useSeoMeta({ titleTemplate: '%s · l docs', description: () => copy.value.description })
const { data: navigation } = await useAsyncData(() => `navigation_${collection.value}`, () => queryCollectionNavigation(collection.value), {
  transform: data => transformNavigation(data, true, locale.value),
  watch: [locale],
})
provide('navigation', navigation)
</script>

<template>
  <UApp :locale="uiLocale">
    <NuxtLoadingIndicator color="var(--ui-primary)" />
    <AppHeader />
    <NuxtLayout><NuxtPage /></NuxtLayout>
    <AppFooter />
    <ClientOnly><AppSearch :key="locale" :navigation="navigation || undefined" /></ClientOnly>
  </UApp>
</template>
