import withPWAInit from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  reactStrictMode: true,
};

const prod = process.env.NODE_ENV === "production";
const withPWA = withPWAInit({
  dest: "public",
  disable: prod ? false : true,
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: "/offline",
  },
});

export default withPWA(nextConfig);
