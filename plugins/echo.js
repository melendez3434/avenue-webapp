export default function({ $echo, $axios }) {
  $echo.options.authorizer = channel => {
    return {
      authorize: (socketId, callback) => {
        $axios
          .post('/api/broadcasting/auth', {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then(response => {
            callback(false, response.data)
          })
          .catch(error => {
            callback(true, error)
          })

        $axios.setHeader('X-Socket-ID', socketId)
      },
    }
  }

  $echo.connect()
}
