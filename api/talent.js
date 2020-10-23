const resource = '/api/talents'

export default $axios => ({
  register(data) {
    return $axios.$post(`${resource}/signup`, data)
  },

  stripeAuthorize(talentId) {
    return $axios.$get(`${resource}/${talentId}/stripe/authorize-url`)
  },

  list(params) {
    return $axios.$get(`${resource}`, { params })
  },

  get(id) {
    return $axios.$get(`${resource}/${id}`)
  },

  tip(data) {
    return $axios.$post('api/tips/', data)
  },

  report(id, data) {
    return $axios.$post(`${resource}/${id}/misbehaving-reports`, data)
  },

  reportReasons() {
    return $axios.$get('api/misbehaving-reasons')
  },
})
