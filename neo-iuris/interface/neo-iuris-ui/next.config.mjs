/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // PWA Configuration Mock
    // In a real build, we would wrap this with: const withPWA = require('next-pwa')(...)
    // pwa: {
    //     dest: 'public',
    //     register: true,
    //     skipWaiting: true,
    //     disable: process.env.NODE_ENV === 'development'
    // },
    images: {
        domains: ['upload.wikimedia.org', 'images.unsplash.com'],
    },
};

export default nextConfig;
