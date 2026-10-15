// app.json'u genişletir: GitHub Pages alt yolu (ör. /cfa) EXPO_BASE_URL ile verilir.
module.exports = ({ config }) => ({
  ...config,
  experiments: { ...config.experiments, baseUrl: process.env.EXPO_BASE_URL || '' },
});
