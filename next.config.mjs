/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "wallpapershome.com",
      },
      {
        hostname: "*.*.com",
      },
    ],
  },
};

export default nextConfig;
