<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
defineProps<{ navigation?: ContentNavigationItem[] }>()
// Shiki adds style nodes to content; keep CSS out of search snippets.
const { data: files } = useLazyAsyncData('l-docs-search', () =>
  queryCollectionSearchSections('docs', { ignoredTags: ['style', 'script'] }),
  { server: false },
)
</script>
<template><LazyUContentSearch :files="files" :navigation="navigation" title="Cari dokumentasi" placeholder="Cari command, profile, atau pesan error…" /></template>
