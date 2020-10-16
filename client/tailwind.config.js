module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production ',
    content: ['./pages/**/*.tsx', './pages/**/*.js'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
