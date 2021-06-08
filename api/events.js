const resource = '/api/events'

export default $axios => ({
  list(params) {
    return $axios.$get(`${resource}`, { params })
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

  finish(slug) {
    return $axios.$post(`${resource}/${slug}/finish`)
  },

  topTippers(slug) {
    return $axios.$get(`${resource}/${slug}/top-contributions`)
  },

  extendTime(slug, minutes) {
    return $axios.$post(`${resource}/${slug}/extend`, { minutes })
  },

  view(slug) {
    return $axios.$post(`${resource}/${slug}/attendees`)
  },

  buyTicket(event_id) {
    return $axios.$post('api/tickets', { event_id })
  },
})
