const resource = '/api/competitions'

export default $axios => ({
  list() {
    return $axios.$get(`${resource}/`)
  },

  get(id) {
    return $axios.$get(`${resource}/${id}`)
  },

  talent(competition, talent) {
    console.log(`${resource}/${competition}/talents/${talent}`)
    return $axios.$get(`${resource}/${competition}/talents/${talent}`)
  },

  talentSignUp(id, payload) {
    return $axios.$post(`${resource}/${id}/talents`, payload)
  },

  boards(competition) {
    return $axios.$get(`/api/competition-boards/${competition}`)
  },
})
