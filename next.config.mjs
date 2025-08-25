import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  // exportPathMap: '***.html',
  // trailingSlash: true
  reactStrictMode: true,
};

export default withPWA({
  dest: 'public', // Destination directory for PWA files (service worker, etc.)
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
  // other PWA options as needed (e.g., register, scope, swSrc)
})(nextConfig);


