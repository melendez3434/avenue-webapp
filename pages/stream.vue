<template>
  <div>
    <video v-show="false" ref="video" muted />
    <canvas ref="canvas" width="500" height="500" />
  </div>
</template>

<script>
export default {
  name: 'Stream',

  auth: 'guest',

  data() {
    return {
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
      // Then send the binary data via the WebSocket connection!
      // ws.send(e.data);
      let formData = new FormData()
      formData.append('blob', e.data)
      await this.$axios.post('/stream/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }
    this.mediaRecorder.start(2000)
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
