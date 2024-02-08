/** @type {import('next').NextConfig} */
const nextConfig = {
  output:"standalone",
  reactStrictMode: true,
  images: {
    domains: ['placedog.net'],
  },
};

module.exports = nextConfig;
