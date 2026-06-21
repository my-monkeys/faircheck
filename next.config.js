const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // o2switch / CloudLinux : node_modules mutualisé au parent -> racine Turbopack au parent.
  turbopack: { root: path.join(__dirname, '..') },
  // CloudLinux LVE limite les forks -> 1 worker sinon `next build` crashe (EAGAIN).
  experimental: { cpus: 1 },
  // Root → default locale, permanent (passes equity better than the page-level 307).
  async redirects() {
    return [{ source: '/', destination: '/en', permanent: true }];
  },
  // Cache the static brand assets (were served max-age=0).
  async headers() {
    const long = [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }];
    return [
      { source: '/og.png', headers: long },
      { source: '/icon-192.png', headers: long },
      { source: '/icon-512.png', headers: long },
      { source: '/sitemap.xsl', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }] },
    ];
  },
};

module.exports = nextConfig;
