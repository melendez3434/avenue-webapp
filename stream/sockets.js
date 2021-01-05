import http from 'http'
import socketIO from 'socket.io'
import * as Sentry from '@sentry/node'

if (process.env.SENTRY_DISABLED !== 'true') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  })
}

const spawn = require('child_process').spawn

var processes = {}

export default function() {
  this.nuxt.hook('render:before', () => {
    const server = http.createServer(this.nuxt.renderer.app)
    const io = socketIO(server)
    if (!process.env.HTTPS_LOCALHOST) {
      // overwrite nuxt.server.listen()
      this.nuxt.server.listen = (port, host) =>
        new Promise(resolve =>
          server.listen(
            port || process.env.PORT || 3000,
            host || process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
            resolve
          )
        )
    }
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))

    // Add socket.io events
    io.on('connection', socket => {
      socket.on('create-ffmpeg-process', function(stream_name, bitrate) {
        const endpoint = `${process.env.RTMP_SERVER}/${stream_name}`

        if (processes[stream_name]) {
          socket.emit(`${stream_name}-error`, 'Event already live', true)
          Sentry.captureException(new Error('Event tried to start twice'), {
            tags: { stream_name },
          })
          return
        }

        const CBR = `${bitrate || 1000}k`
        processes[stream_name] = spawn('ffmpeg', [
          '-i',
          '-',

          '-c:v',
          'libx264',
          '-preset',
          'ultrafast',
          '-minrate',
          CBR,
          '-maxrate',
          CBR,
          '-bufsize',
          CBR,

          '-f',
          'flv',
          '-flvflags',
          'no_duration_filesize',

          endpoint,
        ])
        console.warn(`ffmpeg process for ${stream_name} started`)

        process.on('uncaughtException', error => {
          console.error(error)
          Sentry.captureException(new Error(error), {
            tags: { stream_name },
          })
        })

        processes[stream_name].stderr.on('data', error => {
          if (process.env.FFMPEG_DEBUG === 'true') {
            console.log(error.toString())
          }
        })

        // Notify client if ffmpeg dies.
        processes[stream_name].on('close', (code, signal) => {
          const message = `ffmpeg process for ${stream_name} ended unexpectedly`
          console.error(message, { code, signal })

          processes[stream_name] = null
          socket.emit(`${stream_name}-error`, 'Streaming server has stopped. Please try again.')

          Sentry.captureException(new Error(message), {
            tags: { stream_name },
          })
        })

        // Handle STDIN pipe errors by logging to the console.
        // These errors most commonly occur when FFmpeg closes and there is still
        // data to write.f If left unhandled, the server will crash.
        processes[stream_name].stdin.on('error', e => {
          console.error(e)

          Sentry.captureException(new Error(e), {
            tags: { stream_name },
          })
        })
      })

      socket.on('stream-video-chunk', function({ stream_name, chunk, chunkId }) {
        const ffmpegProcess = processes[stream_name]

        if (!ffmpegProcess) return

        ffmpegProcess.stdin.write(chunk)
        // Notify back to the client that chunk has been processed
        socket.emit(`${stream_name}-processed-chunk`, chunkId)
      })

      socket.on('terminate-ffmpeg-process', function(stream_name) {
        terminateProcess(stream_name)
      })

      function terminateProcess(processName) {
        const ffmpegProcess = processes[processName]

        if (!ffmpegProcess) return

        // Await the last chunk to finish
        setTimeout(() => {
          ffmpegProcess.kill('SIGINT')
          processes[processName] = null
          console.warn(`ffmpeg process for ${processName} ended`)
        }, 5000)
      }
    })
  })
}
