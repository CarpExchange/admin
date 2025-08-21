/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  // exportPathMap: '***.html',
  // trailingSlash: true
};

export default nextConfig;


// const withPWA = require('next-pwa')({
//   dest: 'public'
// })

// module.exports = withPWA({
//   images: {
//     domains: ['res.cloudinary.com'],
//   },
// })
