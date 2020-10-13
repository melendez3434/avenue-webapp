<template>
  <div class="p-20">
    <div v-if="error">There was an error loading the media devides</div>
    <div v-else>
      <div v-if="playing" class="cursor-pointer mb-8" @click="stopStreaming">Stop Streaming</div>
      <div v-else class="cursor-pointer mb-8" @click="startStreaming">Start Streaming</div>
    </div>
    <video ref="video" width="100%" muted />
    <canvas v-show="false" ref="canvas" />
  </div>
</template>

<script>
import socket from '~/plugins/socket.io.js'

export default {
  name: 'BroadcastChannel',

  async asyncData({ $api, params, error }) {
    try {
      const { data } = await $api.talent.get(params.id)

      if (!data.dacast) return error('Invalid broadcast settings')

      const auth_stream_url = `rtmp://${data.dacast.login}:${
        data.dacast.password
      }@${data.dacast.stream_url.replace('rtmp://', '')}/${data.dacast.stream_name}`

      return { dacast: { ...data.dacast, auth_stream_url } }
    } catch (e) {
      error('Invalid broadcast settings')
    }
  },

  data() {
    return {
      error: false,
      playing: false,
      video: null,
      context: null,
      cameraStream: null,
      mediaRecorder: null,
      updateCanvasLoop: null,
    }
  },

  async mounted() {
    try {
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
        this.updateCanvas()
      }
      this.context = this.$refs.canvas.getContext('2d')

      const mediaStream = this.$refs.canvas.captureStream(30)
      this.mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm',
        videoBitsPerSecond: 3000000,
      })
      this.mediaRecorder.ondataavailable = async e => {
        socket.emit('stream-video-chunk', { chunk: e.data, stream_name: this.dacast.stream_name })
      }

      socket.on(`${this.dacast.stream_name}-error`, () => {
        this.stopStreaming()
      })
    } catch (error) {
      this.error = true
    }
  },

  beforeDestroy() {
    if (!this.cameraStream) return

    if (this.playing) {
      this.stopStreaming()
    }

    this.cameraStream.getTracks().forEach(track => {
      if (track.readyState == 'live') {
        track.stop()
      }
    })
    socket.emit('terminate-ffmpeg-process', this.dacast.stream_name)

    this.updateCanvasLoop = null
    socket.disconnect()
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

      this.updateCanvasLoop = requestAnimationFrame(this.updateCanvas)
    },
  },
}
</script>
