module.exports = {
  reactStrictMode: true,
  images: {
    // Allowlist of external hostnames permitted to serve optimised images
    remotePatterns: [
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'media.discordapp.net' },
      { protocol: 'https', hostname: 'cdn.discordapp.com' },
    ],
  },
};
