<template>
  <div class="p-20">
    <div v-if="playing" class="cursor-pointer mb-8" @click="stopStreaming">Stop Streaming</div>
    <div v-else class="cursor-pointer mb-8" @click="startStreaming">Start Streaming</div>
    <video ref="video" width="100%" muted />
    <canvas v-show="false" ref="canvas" />
  </div>
</template>

<script>
import socket from '~/plugins/socket.io.js'

export default {
  name: 'BroadcastChannel',

  auth: 'guest',

  async asyncData({ $api, redirect, params }) {
    if (!params.id) redirect('/')

    try {
      const { data } = await $api.talent.get(params.id)

      if (!data.dacast) redirect('/')

      // return { dacast: data.dacast }
      return {
        dacast: {
          stream_url: 'rtmp://lowlatency.dacast.com:1935/live-181563-565927',
          stream_name: 'mystream565927',
          login: '565927',
          password: '356634',
        },
      }
    } catch (e) {
      redirect('/')
    }
  },

  data() {
    return {
      playing: false,
      video: null,
      context: null,
      cameraStream: null,
      mediaRecorder: null,
    }
  },

  async mounted() {
    this.cameraStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    })

    this.video = this.$refs.video
    this.video.srcObject = this.cameraStream
    this.video.onloadedmetadata = () => {
      this.video.play()
      this.$refs.canvas.width = this.video.videoWidth
      this.$refs.canvas.height = this.video.videoHeight
      requestAnimationFrame(this.updateCanvas)
    }
    this.context = this.$refs.canvas.getContext('2d')

    const mediaStream = this.$refs.canvas.captureStream(30) // 30 frames per second
    this.mediaRecorder = new MediaRecorder(mediaStream, {
      mimeType: 'video/webm',
      videoBitsPerSecond: 3000000,
    })
    this.mediaRecorder.ondataavailable = async e => {
      console.log('sending video')
      socket.emit('stream-video-chunk', { chunk: e.data, stream_name: this.dacast.stream_name })
    }

    socket.on(`${this.dacast.stream_name}-error`, () => {
      console.log('this has crashed')
      this.stopStreaming()
    })
  },

  beforeDestroy() {
    this.cameraStream.getTracks().forEach(track => {
      if (track.readyState == 'live') {
        track.stop()
      }
    })
    socket.emit('terminate-ffmpeg-process', this.dacast.stream_name)
  },

  methods: {
    startStreaming() {
      socket.emit('create-ffmpeg-process', this.dacast)
      this.mediaRecorder.start(2000)
      this.playing = true
    },

    stopStreaming() {
      this.playing = false
      this.mediaRecorder.stop()
    },

    updateCanvas() {
      if (this.video.ended || this.video.paused) {
        return
      }

      this.context.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight)

      requestAnimationFrame(this.updateCanvas)
    },
  },
}
</script>
