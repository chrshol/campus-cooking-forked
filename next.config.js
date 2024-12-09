/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'example.com',
      'storage.googleapis.com',
      'amazonaws.com',
      // Add any other domains your images are hosted on
    ],
  },
};

module.exports = nextConfig; 