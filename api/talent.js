const resource = '/api/talents'

export default $axios => ({
  register(data) {
    return $axios.$post(`${resource}/signup`, data)
  },
  stripeAuthorize(talentId) {
    return $axios.$get(`${resource}/${talentId}/stripe/authorize-url`)
  },
})
