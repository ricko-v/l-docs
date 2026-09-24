<template>
  <div class="hero-shell">
    <div class="hero-kicker">@ricko-v/l <span>·</span> Panduan CLI v2.0</div>
    <div class="hero-grid">
      <div>
        <h1 class="hero-title">Lambda kamu.<br>Langsung dari<br><em>terminal.</em></h1>
        <p class="hero-lead">Login ke AWS, ambil kode function, lalu kirim perubahan. Satu CLI untuk workflow Lambda sehari-hari.</p>
        <div class="hero-actions"><UButton to="/mulai/instalasi" size="lg" trailing-icon="i-lucide-arrow-right">Mulai di sini</UButton><UButton to="/referensi/commands" size="lg" color="neutral" variant="outline">Lihat command</UButton></div>
        <p class="hero-note">Node.js 22+ &nbsp; / &nbsp; npm install -g @ricko-v/l</p>
      </div>
      <div class="terminal" aria-label="Contoh workflow CLI">
        <div class="terminal-top"><span>TERMINAL</span><span>billing / production</span></div>
        <div class="terminal-body">
          <p class="comment"># Masuk dengan profile project</p><p><span class="prompt">$</span> l login --profile production</p>
          <p class="gap"><span class="prompt">$</span> l init --profile production</p>
          <p class="gap comment"># Ambil kode, lalu edit secara lokal</p><p><span class="prompt">$</span> l pull billing-api billing-worker</p>
          <p class="gap comment"># Tinjau perubahan sebelum upload</p><p><span class="prompt">$</span> l push --all --dry-run</p>
          <p class="gap"><span class="prompt">$</span> l push --all</p><p class="success">↳ Tinjau target, lalu konfirmasi.</p>
        </div>
      </div>
    </div>
    <section class="docs-path" aria-labelledby="path-title">
      <div class="path-heading"><h2 id="path-title">Dari login sampai push.</h2><span>PILIH LANGKAH BERIKUTNYA ↴</span></div>
      <div class="path-grid">
        <NuxtLink to="/mulai/instalasi" class="path-item"><small>01 / MULAI</small><h3>Siapkan workspace <span class="arrow">↗</span></h3><p>Install dari npm, login melalui browser, dan buat konfigurasi pertama.</p></NuxtLink>
        <NuxtLink to="/panduan/multi-profile" class="path-item"><small>02 / PROFILE</small><h3>Pisahkan akses AWS <span class="arrow">↗</span></h3><p>Simpan beberapa login dan pilih profile yang sesuai untuk setiap project.</p></NuxtLink>
        <NuxtLink to="/panduan/pull-push" class="path-item"><small>03 / SINKRONISASI</small><h3>Kelola banyak function <span class="arrow">↗</span></h3><p>Pull dan push berdasarkan nama atau prefix, dengan preview sebelum perubahan.</p></NuxtLink>
      </div>
    </section>
  </div>
</template>
