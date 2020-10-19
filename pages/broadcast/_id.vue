<template>
  <VideoLayout :event="event" :talent="talent">
    <div slot="streaming" class=" bg-avenue-black p-8">
      <R64Button v-if="playing" full secondary @click="stopStreaming">Stop Stream</R64Button>
      <R64Button v-else full @click="startStreaming">Start Stream</R64Button>
    </div>
    <div class="h-full relative bg-theavenue-black">
      <div v-if="error">There was an error loading the media devices</div>
      <IcLive v-if="playing" class="w-32 absolute" />
      <video ref="video" class="h-full w-full" muted />
      <canvas v-show="false" ref="canvas" />
    </div>
  </VideoLayout>
</template>

<script>
import socket from '~/plugins/socket.io.js'
import VideoLayout from '@/components/commons/ui/VideoLayout'
import IcLive from '@/assets/svg/live_w_text.svg?inline'

export default {
  name: 'BroadcastChannel',

  components: { VideoLayout, IcLive },

  async asyncData({ $api, params, error }) {
    try {
      const { data: talent } = await $api.talent.get(params.id)
      const { data: events } = await $api.events.list({ live: 1, talent: params.id })

      let event = null

      if (events.length) event = events[0]

      if (!talent.dacast) return error('Invalid broadcast settings')

      const auth_stream_url = `rtmp://${talent.dacast.login}:${
        talent.dacast.password
      }@${talent.dacast.stream_url.replace('rtmp://', '')}/${talent.dacast.stream_name}`

      return { event, talent, dacast: { ...talent.dacast, auth_stream_url } }
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
