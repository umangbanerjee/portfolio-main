/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/work/starex-one",
        destination: "/work/gatewise",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
