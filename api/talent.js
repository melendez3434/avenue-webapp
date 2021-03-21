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

  getScoutByToken(token) {
    return $axios.$get(`api/scouts/token/${token}`)
  },

  follow(talentId) {
    return $axios.$post(`api/my/followings/${talentId}`)
  },

  unfollow(talentId) {
    return $axios.$delete(`api/my/followings/${talentId}`)
  },

  followedList() {
    return $axios.$get('api/my/followings')
  },
})
