const resource = '/api/events'

export default $axios => ({
  list(params) {
    return $axios.$get(`${resource}/`, { params })
  },

  get(slug) {
    return $axios.$get(`${resource}/${slug}`)
  },

  getChat(slug) {
    return $axios.$get(`${resource}/${slug}/chat`)
  },

  getTipJars(slug) {
    return $axios.$get(`${resource}/${slug}/tip-jars`)
  },

  sendMessage(slug, message) {
    return $axios.$post(`${resource}/${slug}/chat`, { message })
  },
})
