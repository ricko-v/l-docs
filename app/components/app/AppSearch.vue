<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
defineProps<{ navigation?: ContentNavigationItem[] }>()
const { locale } = useDocusI18n()
const { copy } = useDocsCopy()
const collection = computed(() => locale.value === 'en' ? 'docs_en' : 'docs_id')
const { data: files } = useLazyAsyncData(() => `l-docs-search-${collection.value}`, () =>
  queryCollectionSearchSections(collection.value, { ignoredTags: ['style', 'script'] }),
{ server: false })
</script>
<template><LazyUContentSearch :files="files" :navigation="navigation" :title="copy.search" :placeholder="copy.searchPlaceholder" /></template>
