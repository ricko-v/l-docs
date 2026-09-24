<script setup lang="ts">
import { id } from '@nuxt/ui/locale'
import { transformNavigation } from 'docus/app/utils/navigation'
import { useDocusShortcuts } from 'docus/app/composables/useDocusShortcuts'

const appConfig = useAppConfig()
const config = useRuntimeConfig()
useDocusShortcuts()
useHead({
  htmlAttrs: { lang: 'id', dir: 'ltr' },
  link: [{ rel: 'icon', type: 'image/svg+xml', href: config.app.baseURL + 'favicon.svg' }],
})
useSeoMeta({ titleTemplate: '%s · l docs', description: appConfig.seo.description })
const { data: navigation } = await useAsyncData('navigation_docs', () => queryCollectionNavigation('docs'), {
  transform: data => transformNavigation(data, false, 'id'),
})
provide('navigation', navigation)
</script>

<template>
  <UApp :locale="id">
    <NuxtLoadingIndicator color="var(--ui-primary)" />
    <AppHeader />
    <NuxtLayout><NuxtPage /></NuxtLayout>
    <AppFooter />
    <ClientOnly><AppSearch :navigation="navigation || undefined" /></ClientOnly>
  </UApp>
</template>
