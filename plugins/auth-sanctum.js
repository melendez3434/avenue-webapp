export default function({ $axios }) {
  $axios.onError(async error => {
    try {
      const code = parseInt(error.response.status)
      if (code === 419 && !error.config.__isRetryRequest) {
        error.config.__isRetryRequest = true

        await $axios.get('/sanctum/csrf-cookie', {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
          withCredentials: true,
        })

        return $axios.request(error.config)
      }
      console.error(error)
      throw error
    } catch (error) {
      console.error(error)
      throw error
    }
  })
}
