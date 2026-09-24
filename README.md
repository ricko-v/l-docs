# l docs

Website dokumentasi pengguna **@ricko-v/l v2.0.0**, dibuat dengan Docus 5, Nuxt 4, Nuxt Content, dan Nuxt UI. Bahasa: Indonesia (default) dan Inggris.

## Development

Gunakan Node.js 24 (lihat `.nvmrc`; minimum project docs 22.18).

```sh
npm ci
npm run dev
```

Buka http://localhost:3000. CLI `l` sendiri tetap mendukung Node.js 22+.

```sh
npm run generate
npm run check:output
npm run preview
```

Output deploy berada di `.output/public/`. Font disimpan melalui npm dan disajikan dari situs sendiri. Pencarian, navigasi, dan dark mode memakai Docus. MCP/AI yang memerlukan server tidak diaktifkan untuk GitHub Pages.

## Deploy ke GitHub Pages

1. Buat repository untuk project ini, misalnya `l-docs`, lalu push source dan `package-lock.json` ke branch `master`.
2. Pada repository, buka **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Jalankan workflow **Deploy documentation to GitHub Pages**, atau push commit ke `master`.
4. Lihat URL hasil deploy pada environment `github-pages` atau Settings → Pages.

Workflow mengambil `base_path` dan `base_url` dari konfigurasi Pages. Nama repo, user site, dan custom domain tidak perlu di-hardcode. Jika memakai branch selain master, sesuaikan filter pada `.github/workflows/deploy.yml`.

Untuk memeriksa build dengan subpath secara lokal:

```sh
NUXT_APP_BASE_URL=/l-docs/ NUXT_SITE_URL=https://ricko-v.github.io/l-docs npm run generate
NUXT_APP_BASE_URL=/l-docs/ npm run check:output
NUXT_APP_BASE_URL=/l-docs/ npm run preview
```

Buka `/l-docs/` pada preview. Jangan memakai `npm run build` sebagai artefak Pages; gunakan `npm run generate`.

## Mengedit dokumentasi

- `content/{id,en}/1.mulai/`: instalasi dan login.
- `content/{id,en}/2.panduan/`: konfigurasi, multi-profile, dan pull/push.
- `content/{id,en}/3.referensi/`: command dan troubleshooting.
- `content/{id,en}/index.md` dan `app/components/content/LandingIntro.vue`: homepage.
- `app/app.config.ts`: brand, tautan, navigasi, dan tema.
- `app/app.css`: typography dan styling.

Urutan file memakai prefix angka. Tautan internal menggunakan route tanpa prefix angka, dengan locale, misalnya `/id/panduan/pull-push` atau `/en/panduan/pull-push`; Nuxt menambahkan base URL deployment. Konten Markdown memakai format MDC, bukan wikilink Obsidian.

Dokumentasi diadaptasi dari `l/docs/`, lalu diperbarui untuk instalasi publik dari npm. Kedua project berdiri sendiri; tidak ada sinkronisasi otomatis. Saat merilis CLI baru, periksa sintaks command, schema config, batasan, dan penanda versi pada quick start/homepage, lalu jalankan generate dan periksa hasilnya.

Sumber: [Docus](https://github.com/nuxt-content/docus), [Nuxt GitHub Pages](https://nuxt.com/deploy/github-pages), [source CLI](https://github.com/ricko-v/l).

## Dukungan dua bahasa

Docus menggunakan `@nuxtjs/i18n` dengan prefix `/id/` dan `/en/`. Indonesia adalah bahasa awal; pilihan bahasa eksplisit disimpan dalam cookie selama satu tahun. Bahasa browser tidak mengganti URL yang dibuka. Pemilih bahasa tetap membuka halaman yang sama, mempertahankan query, dan melepas hash karena judul bagian diterjemahkan.

- Setiap halaman di `content/id/` harus memiliki pasangan dengan path file yang sama di `content/en/`, termasuk frontmatter dan `.navigation.yml`.
- Slug halaman sama pada kedua bahasa agar perpindahan bahasa stabil. Teks, judul, deskripsi, dan heading diterjemahkan; command dan nama field config tetap sama.
- Tautan Markdown harus menggunakan prefix bahasa halaman. Anchor harus sesuai heading pada bahasa tersebut.
- Teks komponen khusus berada di `app/composables/useDocsCopy.ts`. Label UI bawaan memakai locale Docus/Nuxt UI.
- Pencarian memakai koleksi terpisah per bahasa sehingga hasil tetap sesuai bahasa aktif.
- Ubah kedua bahasa bersama dalam satu perubahan ketika memperbarui CLI; penanda versi/rilis mendatang harus selalu konsisten.

`postgenerate` membuat redirect HTML statis untuk `/` dan URL lama tanpa locale. Root membuka bahasa tersimpan atau Indonesia; URL lama membuka pasangan Indonesia dan mempertahankan query/hash. Redirect ini bekerja di GitHub Pages tanpa server. Tanpa JavaScript, fallback menggunakan Indonesia.

`npm run check:output` memeriksa pasangan terjemahan, metadata bahasa/hreflang, jumlah halaman dan redirect, tautan/anchor/aset, serta prefix deployment. Jalankan pemeriksaan untuk root dan subpath sebelum deploy.

## Catatan dependency

Docus 5.13 menyertakan beberapa source TypeScript layer yang belum lolos `nuxt typecheck` dengan Nuxt 4.5. Karena itu, workflow menggunakan static generation dengan `failOnError: true` sebagai pemeriksaan build, ditambah validasi tautan output. Override `sharp` menggunakan rilis patched 0.35.4; OG image dinonaktifkan pada situs ini.
