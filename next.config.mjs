/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ['*'],
    images: {
        remotePatterns: [new URL('https://digital-shop-api.onrender.com/uploads/*')]
    },
};

export default nextConfig;
