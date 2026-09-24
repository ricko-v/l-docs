<script setup lang="ts">
const { copy, docsPath } = useDocsCopy()
</script>
<template>
  <div class="hero-shell">
    <div class="hero-kicker">@ricko-v/l <span>·</span> {{ copy.guide }}</div>
    <div class="hero-grid">
      <div>
        <h1 class="hero-title">{{ copy.title[0] }}<br>{{ copy.title[1] }}<br><em>{{ copy.title[2] }}</em></h1>
        <p class="hero-lead">{{ copy.lead }}</p>
        <div class="hero-actions"><UButton :to="docsPath('/mulai/instalasi')" size="lg" trailing-icon="i-lucide-arrow-right">{{ copy.start }}</UButton><UButton :to="docsPath('/referensi/commands')" size="lg" color="neutral" variant="outline">{{ copy.commands }}</UButton></div>
        <p class="hero-note">Node.js 22+ &nbsp; / &nbsp; npm install -g @ricko-v/l</p>
      </div>
      <div class="terminal" :aria-label="copy.terminal">
        <div class="terminal-top"><span>TERMINAL</span><span>billing / production</span></div>
        <div class="terminal-body">
          <p class="comment"># {{ copy.login }}</p><p><span class="prompt">$</span> l login --profile production</p>
          <p class="gap"><span class="prompt">$</span> l init --profile production</p>
          <p class="gap comment"># {{ copy.pull }}</p><p><span class="prompt">$</span> l pull billing-api billing-worker</p>
          <p class="gap comment"># {{ copy.preview }}</p><p><span class="prompt">$</span> l push --all --dry-run</p>
          <p class="gap"><span class="prompt">$</span> l push --all</p><p class="success">↳ {{ copy.confirm }}</p>
        </div>
      </div>
    </div>
    <section class="docs-path" aria-labelledby="path-title">
      <div class="path-heading"><h2 id="path-title">{{ copy.steps }}</h2><span>{{ copy.next }} ↴</span></div>
      <div class="path-grid">
        <NuxtLink v-for="card in copy.cards" :key="card.path" :to="docsPath(card.path)" class="path-item"><small>{{ card.tag }}</small><h3>{{ card.title }} <span class="arrow">↗</span></h3><p>{{ card.text }}</p></NuxtLink>
      </div>
    </section>
  </div>
</template>
