import redirectSSL from 'redirect-ssl'
import path from 'path'
import fs from 'fs'

const config = {
  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production',
    }),
  ],

  components: true,

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    stripeKey: process.env.STRIPE_KEY,
    videoBuffer: process.env.VIDEO_PLAYER_BUFFER,
    sentryEnabled: process.env.SENTRY_DISABLED !== 'true',
    sentryDSN: process.env.SENTRY_DSN,
    wsUrl: process.env.WS_URL,
    maxRetries: process.env.MAX_RETRIES || 0,
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID,
      pageTracking: true,
      scriptURL: 'https://www.googletagmanager.com/gtag/js',
    },
  },

  privateRuntimeConfig: {},

  /*
   ** Headers of the page
   */
  head: {
    title: 'The Avenue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      {
        hid: 'description',
        name: 'description',
        content:
          'The Avenue welcomes all performers to our virtual live streaming platform. Our goal from inception has been to democratize live streaming to celebrate artists and fans.',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: 'https://js.stripe.com/v3/' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/global.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/api',
    '~/plugins/r64components',
    '~/plugins/vuelidate',
    '~/plugins/auth-sanctum',
    '~/plugins/chat-scroll.client.js',
    '~/plugins/vcalendar.client.js',
    '~/plugins/infinite-loading.client.js',
    '~/plugins/elementui.js',
    '~plugins/vue-js-modal.js',
    '~/plugins/sentry.client.js',
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
    '@nuxtjs/laravel-echo',
    '@nuxtjs/device',
    '@nuxtjs/fontawesome',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', '@nuxtjs/gtm'],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    credentials: true,
  },

  proxy: {
    '/api': {
      target: `${process.env.BASE_URL}/api`,
      pathRewrite: {
        '^/api': '',
      },
      secure: process.env.SECURE,
      changeOrigin: true,
    },
    '/backend': {
      target: process.env.BASE_URL,
      pathRewrite: {
        '^/backend': '/',
      },
    },
  },

  auth: {
    cookie: {
      options: {
        expires: 7,
        secure: process.env.NODE_ENV !== 'development',
      },
    },
    redirect: {
      login: '/?action=login',
      logout: '/',
    },
    strategies: {
      laravelSanctum: {
        url: '/backend',
        user: { property: 'data' },
      },
    },
  },

  /*
   ** Build configuration
   */
  router: {
    middleware: ['auth'],
  },

  build: {
    transpile: ['@nuxtjs/auth'],
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {},
  },

  echo: {
    broadcaster: 'pusher',
    authModule: true,
    connectOnLogin: true,
    disconnectOnLogout: true,
    key: process.env.PUSHER_KEY,
    cluster: process.env.PUSHER_CLUSTER,
    encrypted: true,
    plugins: ['~/plugins/echo.js'],
  },

  fontawesome: {
    icons: {
      solid: [
        'faBreadSlice',
        'faCocktail',
        'faCarrot',
        'faBeer',
        'faCut',
        'faDrum',
        'faGuitar',
        'faCompactDisc',
        'faTicketAlt',
      ],
    },
  },

  gtm: {
    id: process.env.GOOGLE_TAG_MANAGER_ID,
    pageTracking: true,
  },
}

if (process.env.HTTPS_LOCALHOST) {
  config.server = {
    host: process.env.HOST,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '.certificates/localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, '.certificates/localhost.crt')),
    },
  }
}

export default config
