/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['*'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'digital-shop-api.onrender.com',
        pathname: '/uploads/',
      },
    ],
  },
};

export default nextConfig;
