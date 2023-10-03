/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "storage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
