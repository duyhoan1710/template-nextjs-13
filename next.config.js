/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  experiments: {
    topLevelAwait: true,
  },
  images: {
    domains: ["vercel.com"],
  },
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
};

module.exports = nextConfig;
