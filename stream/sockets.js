import http from 'http'
import socketIO from 'socket.io'

const spawn = require('child_process').spawn

var processes = {}

export default function() {
  this.nuxt.hook('render:before', () => {
    const server = http.createServer(this.nuxt.renderer.app)
    const io = socketIO(server)

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port, host) =>
      new Promise(resolve =>
        server.listen(
          port || process.env.PORT || 3000,
          host || process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
          resolve
        )
      )
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))

    // Add socket.io events
    io.on('connection', socket => {
      socket.on('create-ffmpeg-process', function(stream_name) {
        const endpoint = `${process.env.RTMP_SERVER}/${stream_name}`
        processes[stream_name] = spawn('ffmpeg', [
          '-i',
          '-',

          // video codec config: low latency, adaptive bitrate
          '-c:v',
          'libx264',
          '-preset',
          'veryfast',
          '-tune',
          'zerolatency',

          // audio codec config: sampling frequency (11025, 22050, 44100), bitrate 64 kbits
          '-c:a',
          'aac',
          '-ar',
          '44100',
          '-b:a',
          '64k',

          //force to overwrite
          '-y',

          // used for audio sync
          '-use_wallclock_as_timestamps',
          '1',
          '-async',
          '1',

          //'-filter_complex', 'aresample=44100', // resample audio to 44100Hz, needed if input is not 44100
          //'-strict', 'experimental',
          '-bufsize',
          '1000',
          '-f',
          'flv',

          endpoint,
        ])
        console.warn(`ffmpeg process for ${stream_name} started`)

        process.on('uncaughtException', error => {
          console.error(error)
        })

        processes[stream_name].stderr.on('data', error => {
          if (process.env.FFMPEG_DEBUG === 'true') {
            console.log(error.toString())
          }
        })

        // Notify client if ffmpeg dies.
        processes[stream_name].on('close', (code, signal) => {
          console.warn(`ffmpeg process for ${stream_name} ended`, { code, signal })
          processes[stream_name] = null
          socket.emit(`${stream_name}-error`, { code, signal })
        })

        // Handle STDIN pipe errors by logging to the console.
        // These errors most commonly occur when FFmpeg closes and there is still
        // data to write.f If left unhandled, the server will crash.
        processes[stream_name].stdin.on('error', e => {
          console.error(e)
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

      function terminateProcess(processName) {
        const ffmpegProcess = processes[processName]

        if (!ffmpegProcess) return
        processes[processName].kill('SIGINT')
      }
    })
  })
}
