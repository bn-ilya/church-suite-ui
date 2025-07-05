/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/register/1",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/register/1",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/login/1",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/:path*`,
      },
      {
        source: "/formio-api/:path*",
        destination: `https://church-krop.ru/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
