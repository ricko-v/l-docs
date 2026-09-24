<script setup lang="ts">
const { copy } = useDocsCopy()
const links = computed(() => [{ label: copy.value.issue, icon: 'i-lucide-circle-help', to: 'https://github.com/ricko-v/l/issues', target: '_blank' }])
</script>
<template><div class="space-y-6"><USeparator type="dashed" /><UPageLinks :title="copy.help" :links="links" /></div></template>
