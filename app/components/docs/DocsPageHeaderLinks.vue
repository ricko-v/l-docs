<script setup lang="ts">
const { copy } = useDocsCopy()
const route = useRoute()
const copied = ref(false)
const failed = ref(false)
watch(() => route.fullPath, () => { copied.value = false; failed.value = false })
async function copyLink() {
  try { await navigator.clipboard.writeText(window.location.href); copied.value = true; failed.value = false }
  catch { failed.value = true }
}
</script>
<template><UButton color="neutral" variant="soft" size="sm" :icon="copied ? 'i-lucide-check' : 'i-lucide-link'" :label="failed ? copy.copyFailed : copied ? copy.copied : copy.copy" @click="copyLink" /></template>
