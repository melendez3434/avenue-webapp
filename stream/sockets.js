import http from 'http'
import socketIO from 'socket.io'

let child_process = require('child_process')
var processes = {}

export default function() {
  this.nuxt.hook('render:before', () => {
    const server = http.createServer(this.nuxt.renderer.app)
    const io = socketIO(server)

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port, host) =>
      new Promise(resolve => server.listen(port || 3000, host || 'localhost', resolve))
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))

    // Add socket.io events
    io.on('connection', socket => {
      socket.on('create-ffmpeg-process', function({ url, user, password, path }) {
        const command = `ffmpeg -re -i pipe:0 -c:v libx264 -b:v 1600k -preset ultrafast -b:a 128k -x264opts keyint=50 -g 25 -pix_fmt yuv420p -f flv "${url} flashver=FMLE/3.020(compatible;20FMSc/1.0) live=true pubUser=${user} pubPasswd=${password} playpath=${path}"`
        processes[path] = child_process.spawn(command, { shell: true })
      })

      socket.on('stream-video-chunk', function({ path, chunk }) {
        processes[path].stdin.write(chunk)
      })

      socket.on('terminate-ffmpeg-process', function(path) {
        processes[path].kill('SIGINT')
      })
    })
  })
}
