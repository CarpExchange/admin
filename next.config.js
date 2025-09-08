// import withPWAInit from "next-pwa";

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["res.cloudinary.com"],
//   },
//   reactStrictMode: true,
// };

// const prod = process.env.NODE_ENV === "production";
// const withPWA = withPWAInit({
//   dest: "public",
//   disable: prod ? false : true,
//   register: true,
//   skipWaiting: true,
//   fallbacks: {
//     document: "/offline",
//   },
// });

// export default withPWA(nextConfig);


const withPWA = require('next-pwa')({
  dest: 'public', // Destination for PWA files
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
  register: true, // Register the service worker
  skipWaiting: true, // Activate the new service worker immediately
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);