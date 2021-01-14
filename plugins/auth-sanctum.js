export default function({ $axios }) {
  $axios.onError(async error => {
    console.error(error)
    const code = parseInt(error.response.status)
    if (code === 419 && !error.config.__isRetryRequest) {
      error.config.__isRetryRequest = true

      await $axios.get('/backend/sanctum/csrf-cookie', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        withCredentials: true,
      })

      return $axios.request(error.config)
    }

    throw error
  })
}
