const url = '/api/auth/password'

export default $axios => ({
  request(email) {
    return $axios.$post(`${url}/email`, { email })
  },

  isValidToken({ email, token }) {
    return $axios.$get(`${url}/validate-token`, { params: { email, token } })
  },

  reset(data) {
    return $axios.$post(`${url}/reset`, data)
  },
})
