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
      Sentry.captureException(new Error('Stream connected'), {
        tags: 'testing',
      })

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
          Sentry.captureException(new Error(message), {
            tags: { stream_name },
          })
          processes[stream_name] = null
          socket.emit(`${stream_name}-error`, { code, signal })
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
          processes[processName].kill('SIGINT')
          console.warn(`ffmpeg process for ${processName} ended`)
        }, 1500)
      }
    })
  })
}
