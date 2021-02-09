const resource = '/api/competitions'

export default $axios => ({
  list() {
    return $axios.$get(`${resource}/`)
  },

  get(id) {
    return $axios.$get(`${resource}/${id}`)
  },

  talentSignUp(id) {
    return $axios.$post(`${resource}/${id}/talent`)
  },
})
