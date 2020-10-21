<template>
  <VideoLayout :event="event" :talent="talent">
    <div slot="streaming" class=" bg-avenue-black p-8">
      <R64Button v-if="playing" full secondary @click="stopStreaming">Stop Stream</R64Button>
      <R64Button v-else full @click="startStreaming">Start Stream</R64Button>
    </div>
    <div class="h-full relative bg-theavenue-black">
      <div v-if="error">There was an error loading the media devices</div>
      <div class="relative h-full">
        <IcLive v-if="playing" class="w-32 absolute" />
        <video ref="video" class="h-full w-full" muted />
        <IcSettings
          class="absolute bottom-4 right-4 cursor-pointer"
          @click="$modal.show('device-settings-modal')"
        />
      </div>

      <canvas v-show="false" ref="canvas" />
    </div>
    <modal
      width="100%"
      classes="max-w-md inset-x-0 m-auto"
      name="device-settings-modal"
      scrollable
      height="auto"
    >
      <DeviceSettingsModal
        :video-sources="videoDevices"
        :audio-sources="audioDevices"
        :selected-audio="audioInput.value"
        :selected-video="videoInput.value"
        @confirm="updateVideoStream"
      />
    </modal>
  </VideoLayout>
</template>

<script>
import socket from '~/plugins/socket.io.js'
import VideoLayout from '@/components/commons/ui/VideoLayout'
import DeviceSettingsModal from '@/components/talents/modals/DeviceSettingsModal'
import IcLive from '@/assets/svg/live_w_text.svg?inline'
import IcSettings from '@/assets/svg/settings.svg?inline'

export default {
  name: 'BroadcastChannel',

  components: { VideoLayout, DeviceSettingsModal, IcLive, IcSettings },

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
      devices: [],
      videoInput: {},
      audioInput: {},
    }
  },

  computed: {
    audioDevices() {
      const devices = []
      for (const device of this.devices) {
        if (!device.label) continue

        if (device.kind === 'audioinput') {
          devices.push({
            value: device.deviceId,
            label: device.label,
          })
        }
      }
      return devices
    },

    videoDevices() {
      const devices = []
      for (const device of this.devices) {
        if (!device.label) continue

        if (device.kind === 'videoinput') {
          devices.push({
            value: device.deviceId,
            label: device.label,
          })
        }
      }
      return devices
    },

    hasDevices() {
      return !!this.videoDevices.length && !!this.audioDevices.length
    },
  },

  async mounted() {
    try {
      await this.getMediaDevices()

      this.video = this.$refs.video
      this.video.onloadedmetadata = () => {
        this.video.play()
        this.$refs.canvas.width = this.video.videoWidth
        this.$refs.canvas.height = this.video.videoHeight
        if (!this.updateCanvasLoop) {
          this.updateCanvas()
        }
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

    this.stopCameraStream()
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

    async updateVideoStream({ audio, video }) {
      this.stopCameraStream()
      this.audioInput = this.audioDevices.find(a => a.value === audio) || {}
      this.videoInput = this.videoDevices.find(v => v.value === video) || {}
      this.cameraStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: audio } },
        video: { deviceId: { exact: video } },
      })
      this.video.srcObject = this.cameraStream
    },

    stopCameraStream() {
      if (!this.cameraStream) return
      this.cameraStream.getTracks().forEach(track => {
        track.stop()
      })
    },

    async getMediaDevices() {
      this.devices = await navigator.mediaDevices.enumerateDevices()
      if (this.hasDevices) {
        return this.$modal.show('device-settings-modal')
      }

      // If list is empty ask browser for permission and retrieve devices again
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: !this.audioDevices.length,
        video: !this.videoDevices.length,
      })
      stream.getTracks().forEach(track => {
        track.stop() // Force stop
      })

      this.devices = await navigator.mediaDevices.enumerateDevices()
      if (this.hasDevices) {
        return this.$modal.show('device-settings-modal')
      }

      // At this point the user has denied the access to some device
      this.error = true
    },
  },
}
</script>
