<template>
  <div>
    <video v-show="false" ref="video" muted />
    <canvas ref="canvas" width="500" height="500" />
  </div>
</template>

<script>
import socket from '~/plugins/socket.io.js'

export default {
  name: 'Stream',

  auth: 'guest',

  async asyncData({ $api, redirect, params }) {
    if (!params.id) redirect('/')

    try {
      const { data } = await $api.talent.get(params.id)

      if (!data.dacast) redirect('/')

      return { dacast: data.dacast }
    } catch (e) {
      redirect('/')
    }
  },

  data() {
    return {
      video: null,
      context: null,
      cameraStream: null,
      mediaRecorder: null,
    }
  },

  async mounted() {
    socket.emit('create-ffmpeg-process', this.dacast)

    this.cameraStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    })

    this.video = this.$refs.video
    this.video.srcObject = this.cameraStream
    this.video.onloadedmetadata = () => {
      this.video.play()
    }
    this.context = this.$refs.canvas.getContext('2d')

    this.video.addEventListener(
      'play',
      () => {
        requestAnimationFrame(this.updateCanvas)
      },
      false
    )

    const mediaStream = this.$refs.canvas.captureStream(30) // 30 frames per second
    this.mediaRecorder = new MediaRecorder(mediaStream, {
      mimeType: 'video/webm',
      videoBitsPerSecond: 3000000,
    })
    this.mediaRecorder.ondataavailable = async e => {
      socket.emit('stream-video-chunk', { chunk: e.data, stream_name: this.dacast.stream_name })
    }
    this.mediaRecorder.start(2000)
  },

  beforeDestroy() {
    socket.emit('terminate-ffmpeg-process', this.dacast.stream_name)
  },

  methods: {
    updateCanvas() {
      if (this.video.ended || this.video.paused) {
        return
      }

      // this.context.drawImage(this.video, 0, 0, this.video.width, this.video.height)
      this.context.drawImage(this.video, 0, 0, 500, 500)

      requestAnimationFrame(this.updateCanvas)
    },
  },
}
</script>
