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
})
