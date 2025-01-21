module.exports = {
  // ...existing code...
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  // ...existing code...
};
