/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        avenue: {
          black: '#0E0E0E',
          'black-light': '#1E1E1E',
          white: '#EEEEEE',
          'white-light': '#FFFFFF',
          grey: '#AAAAAA',
          'grey-dark': '#666666',
          red: '#D00000',
          'red-light': '#EB5757',
        },
      },

      spacing: {
        '96': '24rem',
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    whitelistPatterns: [/page-/, /layout-/],
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
}
