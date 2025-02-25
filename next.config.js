/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/livechat/register/1",
        permanent: true,
      },
      {
        source: "/events/",
        destination: "/livechat/register/1",
        permanent: true,
      },
      {
        source: "/calendar/",
        destination: "/livechat/register/1",
        permanent: true,
      },
      {
        source: "/livechat/register/",
        destination: "/livechat/register/1",
        permanent: true,
      },
      {
        source: "/livechat/register",
        destination: "/livechat/register/1",
        permanent: true,
      },
      {
        source: "/livechat/login/",
        destination: "/livechat/login/1",
        permanent: true,
      },
      {
        source: "/livechat/login",
        destination: "/livechat/login/1",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://admin-lc.church-krop.ru/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
