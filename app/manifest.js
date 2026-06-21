export default function manifest() {
  return {
    name: 'Faircheck — provably-fair verifier',
    short_name: 'Faircheck',
    description: 'Recompute and verify crypto-casino provably-fair results in your browser.',
    start_url: '/en',
    scope: '/',
    display: 'standalone',
    background_color: '#161a1f',
    theme_color: '#161a1f',
    lang: 'en',
    categories: ['utilities', 'finance'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
  };
}
