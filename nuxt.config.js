import redirectSSL from 'redirect-ssl'

export default {
  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production',
    }),
  ],

  components: true,

  publicRuntimeConfig: {
    baseURL: '${BASE_URL}',
    stripeKey: process.env.STRIPE_KEY,
  },

  privateRuntimeConfig: {},

  /*
   ** Headers of the page
   */
  head: {
    title: 'The aVenue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
    '@nuxtjs/laravel-echo',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/auth', '~/stream/sockets'],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL,
    proxy: true,
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
      local: false,
      sanctum: {
        _scheme: '~/schemes/cookie',
        name: 'sanctum',
        cookie: {
          name: 'XSRF-TOKEN',
        },
        endpoints: {
          csrf: {
            url: '/sanctum/csrf-cookie',
            withCredentials: true,
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },

          login: {
            url: '/api/auth/login',
            method: 'post',
            withCredentials: true,
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },

          logout: {
            url: '/api/auth/logout',
            withCredentials: true,
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },

          user: {
            url: '/api/user',
            withCredentials: true,
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            propertyName: 'data',
          },
        },
        user: 'data',
      },
    },
  },

  proxy: {
    '/sanctum/csrf-cookie': {
      target: `${process.env.BASE_URL}`,
      secure: process.env.SECURE,
      changeOrigin: true,
    },
    '/api': {
      target: `${process.env.BASE_URL}/api`,
      pathRewrite: {
        '^/api': '',
      },
      secure: process.env.SECURE,
      changeOrigin: true,
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
}
