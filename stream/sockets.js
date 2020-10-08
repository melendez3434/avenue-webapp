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
      socket.on('create-ffmpeg-process', function({ stream_url, login, password, stream_name }) {
        const command = `ffmpeg -loglevel error -re -i pipe:0 -c:v libx264 -b:v 1600k -preset ultrafast -b:a 128k -x264opts keyint=50 -g 25 -pix_fmt yuv420p -f flv "${stream_url} flashver=FMLE/3.020(compatible;20FMSc/1.0) live=true pubUser=${login} pubPasswd=${password} playpath=${stream_name}"`
        processes[stream_name] = child_process.spawn(command, { shell: true })
        process.on('uncaughtException', error => {
          console.error(error)
        })

        processes[stream_name].stderr.on('data', error => {
          console.error(String(error))
          if (processes[stream_name]) {
            terminateProcess(stream_name)
          }
        })
      })

      socket.on('stream-video-chunk', function({ stream_name, chunk }) {
        const ffmpegProcess = processes[stream_name]

        if (!ffmpegProcess) return

        ffmpegProcess.stdin.write(chunk)
      })

      socket.on('terminate-ffmpeg-process', function(stream_name) {
        terminateProcess(stream_name)
      })

      socket.on('disconnect', function() {
        //
      })

      function terminateProcess(processName) {
        const ffmpegProcess = processes[processName]

        if (!ffmpegProcess) return

        processes[processName].kill('SIGINT')
        processes[processName] = null
        socket.emit(`${processName}-error`)
      }
    })
  })
}
