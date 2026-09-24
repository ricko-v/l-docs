const copy = {
  id: {
    description: 'Panduan @ricko-v/l: login AWS, multi-profile, dan sinkronisasi kode Lambda dari terminal.',
    language: 'Pilih bahasa', search: 'Cari dokumentasi', searchPlaceholder: 'Cari command, profile, atau pesan error…',
    source: 'Source di GitHub', credit: 'Dibuat oleh ricko-v', help: 'Bantuan', issue: 'Laporkan masalah',
    copy: 'Salin tautan', copied: 'Tautan disalin', copyFailed: 'Salin URL dari address bar',
    guide: 'Panduan CLI v2.0', title: ['Lambda kamu.', 'Langsung dari', 'terminal.'],
    lead: 'Login ke AWS, ambil kode function, lalu kirim perubahan. Satu CLI untuk workflow Lambda sehari-hari.',
    start: 'Mulai di sini', commands: 'Lihat command', terminal: 'Contoh workflow CLI',
    login: 'Masuk dengan profile project', pull: 'Ambil kode, lalu edit secara lokal', preview: 'Tinjau perubahan sebelum upload', confirm: 'Tinjau target, lalu konfirmasi.',
    steps: 'Dari login sampai push.', next: 'PILIH LANGKAH BERIKUTNYA',
    cards: [
      { tag: '01 / MULAI', title: 'Siapkan workspace', text: 'Install dari npm, login melalui browser, dan buat konfigurasi pertama.', path: '/mulai/instalasi' },
      { tag: '02 / PROFILE', title: 'Pisahkan akses AWS', text: 'Simpan beberapa login dan pilih profile yang sesuai untuk setiap project.', path: '/panduan/multi-profile' },
      { tag: '03 / SINKRONISASI', title: 'Kelola banyak function', text: 'Pull dan push berdasarkan nama atau prefix, dengan preview sebelum perubahan.', path: '/panduan/pull-push' },
    ],
  },
  en: {
    description: 'The @ricko-v/l guide: AWS login, multiple profiles, and Lambda code synchronization from your terminal.',
    language: 'Choose language', search: 'Search documentation', searchPlaceholder: 'Search commands, profiles, or error messages…',
    source: 'Source on GitHub', credit: 'Built by ricko-v', help: 'Help', issue: 'Report an issue',
    copy: 'Copy link', copied: 'Link copied', copyFailed: 'Copy the URL from your address bar',
    guide: 'CLI v2.0 guide', title: ['Your Lambda.', 'Straight from', 'the terminal.'],
    lead: 'Sign in to AWS, pull function code, and push your changes. One CLI for your everyday Lambda workflow.',
    start: 'Get started', commands: 'View commands', terminal: 'Example CLI workflow',
    login: 'Sign in with your project profile', pull: 'Pull code, then edit locally', preview: 'Review changes before uploading', confirm: 'Review the targets, then confirm.',
    steps: 'From login to push.', next: 'CHOOSE YOUR NEXT STEP',
    cards: [
      { tag: '01 / GET STARTED', title: 'Set up your workspace', text: 'Install from npm, sign in through your browser, and create your first configuration.', path: '/mulai/instalasi' },
      { tag: '02 / PROFILES', title: 'Separate AWS access', text: 'Keep multiple logins and choose the right profile for each project.', path: '/panduan/multi-profile' },
      { tag: '03 / SYNC', title: 'Manage multiple functions', text: 'Pull and push by name or prefix, with a preview before applying changes.', path: '/panduan/pull-push' },
    ],
  },
}

export function useDocsCopy() {
  const { locale } = useDocusI18n()
  const language = computed(() => locale.value === 'en' ? 'en' : 'id')
  return {
    copy: computed(() => copy[language.value]),
    docsPath: (path: string) => `/${language.value}${path}`,
  }
}
