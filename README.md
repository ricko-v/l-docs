# l docs

Website dokumentasi pengguna **@ricko-v/l v2.0.0**, dibuat dengan Docus 5, Nuxt 4, Nuxt Content, dan Nuxt UI. Bahasa utama: Indonesia.

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

1. Buat repository untuk project ini, misalnya `l-docs`, lalu push source dan `package-lock.json` ke branch `main`.
2. Pada repository, buka **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Jalankan workflow **Deploy documentation to GitHub Pages**, atau push commit ke `main`.
4. Lihat URL hasil deploy pada environment `github-pages` atau Settings → Pages.

Workflow mengambil `base_path` dan `base_url` dari konfigurasi Pages. Nama repo, user site, dan custom domain tidak perlu di-hardcode. Jika memakai branch selain main, sesuaikan filter pada `.github/workflows/deploy.yml`.

Untuk memeriksa build dengan subpath secara lokal:

```sh
NUXT_APP_BASE_URL=/l-docs/ NUXT_SITE_URL=https://ricko-v.github.io/l-docs npm run generate
NUXT_APP_BASE_URL=/l-docs/ npm run check:output
NUXT_APP_BASE_URL=/l-docs/ npm run preview
```

Buka `/l-docs/` pada preview. Jangan memakai `npm run build` sebagai artefak Pages; gunakan `npm run generate`.

## Mengedit dokumentasi

- `content/1.mulai/`: instalasi dan login.
- `content/2.panduan/`: konfigurasi, multi-profile, dan pull/push.
- `content/3.referensi/`: command dan troubleshooting.
- `content/index.md` dan `app/components/content/LandingIntro.vue`: homepage.
- `app/app.config.ts`: brand, tautan, navigasi, dan tema.
- `app/app.css`: typography dan styling.

Urutan file memakai prefix angka. Tautan internal menggunakan route tanpa prefix angka, misalnya `/panduan/pull-push`; Nuxt menambahkan base URL deployment. Konten Markdown memakai format MDC, bukan wikilink Obsidian.

Dokumentasi diadaptasi dari `l/docs/`, lalu diperbarui untuk instalasi publik dari npm. Kedua project berdiri sendiri; tidak ada sinkronisasi otomatis. Saat merilis CLI baru, periksa sintaks command, schema config, batasan, dan penanda versi pada quick start/homepage, lalu jalankan generate dan periksa hasilnya.

Sumber: [Docus](https://github.com/nuxt-content/docus), [Nuxt GitHub Pages](https://nuxt.com/deploy/github-pages), [source CLI](https://github.com/ricko-v/l).

## Catatan dependency

Docus 5.13 menyertakan beberapa source TypeScript layer yang belum lolos `nuxt typecheck` dengan Nuxt 4.5. Karena itu, workflow menggunakan static generation dengan `failOnError: true` sebagai pemeriksaan build, ditambah validasi tautan output. Override `sharp` menggunakan rilis patched 0.35.4; OG image dinonaktifkan pada situs ini.
