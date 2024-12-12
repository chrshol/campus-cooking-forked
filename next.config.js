/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'example.com',
      'storage.googleapis.com',
      'amazonaws.com',
      'cdn.loveandlemons.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.loveandlemons.com',
        pathname: '/wp-content/**',
      }
    ],
  },
  experimental: {
    images: {
      unoptimized: true,
    },
  }
};

module.exports = nextConfig; 