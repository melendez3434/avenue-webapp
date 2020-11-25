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
      screens: {
        portrait: { raw: '(orientation: portrait)' },
        landscape: { raw: '(orientation: landscape)' },
      },
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
          'red-neon': '#FF2F2F',
          'blue-light': '#00182B',
          'blue-dark': '#00080E',
        },
        theavenue: {
          white: '#FFFFFF',
          'off-white': '#EEEEEE',
          gray: '#888888',
          black: '#000000',
          'background-dark': '#00080E',
          background: '#001322',
          'background-light': '#00182B',
          'background-extra-light': '#00243F',
          'red-neon': '#FF2F2F',
          'orange-neon': '#FF5E39',
          'yellow-neon': '#FFD243',
          'green-neon': '#3FED3F',
          'turquoise-neon': '#2CD7FF',
          'blue-neon': '#0066FF',
          'purple-neon': '#8E46FF',
          'pink-neon': '#FF39AF',
        },
      },

      spacing: {
        '38px': '38px',
        '86': '19rem',
        '112': '28rem',
      },

      fontSize: {
        xxs: '0.58rem',
      },

      fontFamily: {
        library: ['"LIBRARY 3 AM soft Regular"', 'sans-serif'],
        'league-gothic': ['"League Gothic"', 'serif'], // Ensure fonts with spaces have " " surrounding it.
      },

      boxShadow: {
        'outline-white': '0 0 0 3px rgba(255, 255, 255, 0.85)',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    whitelistPatterns: [/page-/, /layout-/, /croppie-/, /cr-/],
    content: [
      path.join(__dirname, 'components/**/*.vue'),
      path.join(__dirname, 'layouts/**/*.vue'),
      path.join(__dirname, 'pages/**/*.vue'),
      path.join(__dirname, 'plugins/**/*.js'),
      'nuxt.config.js',
    ],
  },
}
