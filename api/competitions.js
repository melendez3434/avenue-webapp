const resource = '/api/competitions'

export default $axios => ({
  list() {
    return $axios.$get(`${resource}/`)
  },

  get(id) {
    return $axios.$get(`${resource}/${id}`)
  },

  talent(competition, talent) {
    return $axios.$get(`${resource}/${competition}/talents/${talent}`)
  },

  talentSignUp(id, payload) {
    return $axios.$post(`${resource}/${id}/talents`, payload)
  },

  board(competition, round) {
    return $axios.$get(`/api/competition-boards/${competition}/rounds/${round}`)
  },

  boards(competition) {
    return $axios.$get(`/api/competition-boards/${competition}`)
  },

  overallInfo(competition) {
    return $axios.$get(`/api/competition-overall-info/${competition}`)
  },
})
