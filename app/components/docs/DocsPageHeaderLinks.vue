<script setup lang="ts">
const copied = ref(false)
const failed = ref(false)
async function copyLink() {
  try { await navigator.clipboard.writeText(window.location.href); copied.value = true; failed.value = false }
  catch { failed.value = true }
}
</script>
<template><UButton color="neutral" variant="soft" size="sm" :icon="copied ? 'i-lucide-check' : 'i-lucide-link'" :label="failed ? 'Salin URL dari address bar' : copied ? 'Tautan disalin' : 'Salin tautan'" @click="copyLink" /></template>
