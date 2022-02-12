/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "picsum.photos", "i.picsum.photos"],
  },
};

module.exports = nextConfig;
