import LocalScheme from '@nuxtjs/auth/lib/schemes/local'

const DEFAULTS = {
  name: 'cookie',
  cookie: {
    name: null,
  },
  tokenRequired: false,
  globalToken: false,
  tokenName: null,
  autoFetchUser: true,
  endpoints: {
    csrf: null,
  },
}

export default class CookieScheme extends LocalScheme {
  constructor(auth, options) {
    super(auth, {
      ...DEFAULTS,
      ...options,
    })
  }

  mounted() {
    if (process.server) {
      this.$auth.ctx.$axios.setHeader('referer', this.$auth.ctx.req.headers.host)
    }

    return super.mounted()
  }

  async login(endpoint) {
    // Ditch any leftover local tokens before attempting to log in
    this.$auth.reset()

    // Make CSRF request if required
    if (this.options.endpoints.csrf) {
      await this.$auth.request(this.options.endpoints.csrf, {
        maxRedirects: 0,
      })
    }

    return super.login(endpoint, { reset: false })
  }

  reset() {
    if (this.options.cookie.name) {
      this.$auth.$storage.setCookie(this.options.cookie.name, null, { prefix: '' })
    }

    return super.reset()
  }
}
