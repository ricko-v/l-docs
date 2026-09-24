export default defineAppConfig({
  ui: { colors: { primary: 'amber', neutral: 'stone' } },
  docus: { locale: 'id' },
  seo: { title: 'l — AWS Lambda CLI', description: 'Panduan @ricko-v/l: login AWS, multi-profile, dan sinkronisasi kode Lambda dari terminal.' },
  header: { title: 'l / docs' },
  github: false,
  socials: { github: 'https://github.com/ricko-v/l', npm: 'https://www.npmjs.com/package/@ricko-v/l' },
  toc: { title: 'Di halaman ini', bottom: { title: 'Bantuan', links: [{ label: 'Laporkan masalah', icon: 'i-lucide-circle-help', to: 'https://github.com/ricko-v/l/issues', target: '_blank' }] } },
  assistant: { floatingInput: false, explainWithAi: false },
})
