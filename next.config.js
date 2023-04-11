/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "assets.nflxext.com", "rb.gy"],
  },
  transpilePackages: ["@stripe/firestore-stripe-payments"],
};

module.exports = nextConfig;
