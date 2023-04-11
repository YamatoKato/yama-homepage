/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: false,
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
