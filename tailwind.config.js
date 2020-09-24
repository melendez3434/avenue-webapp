/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

const path = require('path')

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
        '38px': '38px',
        '96': '24rem',
      },

      fontSize: {
        xxs: '0.58rem',
      },
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    whitelistPatterns: [/page-/, /layout-/],
    content: [
      path.join(__dirname, 'components/**/*.vue'),
      path.join(__dirname, 'layouts/**/*.vue'),
      path.join(__dirname, 'pages/**/*.vue'),
      path.join(__dirname, 'plugins/**/*.js'),
      'nuxt.config.js',
    ],
  },
}
