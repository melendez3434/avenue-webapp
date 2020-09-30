const resource = '/api/events'

export default $axios => ({
  list(params) {
    return $axios.$get(`${resource}/`, { params })
  },
})
