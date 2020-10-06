<template>
  <div>
    <video ref="video" muted />
  </div>
</template>

<script>
const MediaStreamRecorder = require('msr')

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
    this.onMediaSuccess(this.cameraStream)
  },

  methods: {
    onMediaSuccess(stream) {
      var mediaRecorder = new MediaStreamRecorder(stream)
      mediaRecorder.video = this.$refs.video
      mediaRecorder.mimeType = 'video/webm'
      mediaRecorder.ondataavailable = async blob => {
        let formData = new FormData()
        formData.append('blob', blob)
        await this.$axios.post('/stream/update', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      }
      mediaRecorder.start(3000)
    },
  },
}
</script>
