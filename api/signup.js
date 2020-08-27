export default $axios => ({
  register(data) {
    return $axios.$post('/api/register', data)
  },
})
