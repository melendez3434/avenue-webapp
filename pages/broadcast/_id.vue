<template>
  <VideoLayout :event="event" :talent="talent">
    <div slot="streaming" class=" bg-avenue-black p-8">
      <R64Button v-if="playing" full secondary @click="stopStreaming">Stop Stream</R64Button>
      <R64Button v-else full @click="startStreaming">
        Start Stream
      </R64Button>
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

      if (!talent.stream_key) return error('Invalid broadcast settings')

      return { event, talent }
    } catch (e) {
      error('Invalid broadcast settings')
    }
  },

  data() {
    return {
      error: false,
      playing: false,
      video: null,
      cameraStream: null,
      mediaRecorder: null,
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
      }

      socket.on(`${this.talent.stream_key}-error`, () => {
        if (!this.playing) return
        this.$modal.show('warning-modal', {
          text: 'Streaming server has stopped. Please try again.',
        })
        this.stopStreaming()
      })

      this.$echo.channel(`event.${this.talent.id}`).listen('TalentIsLiveNow', ({ event }) => {
        this.event = event
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

    socket.disconnect()

    this.$echo.channel(`event.${this.talent.id}`).stopListening('TalentIsLiveNow')
  },

  methods: {
    startStreaming() {
      socket.emit('create-ffmpeg-process', this.talent.stream_key)
      this.mediaRecorder.start(1000)
      this.playing = true
    },

    stopStreaming() {
      socket.emit('terminate-ffmpeg-process', this.talent.stream_key)
      this.playing = false
      this.mediaRecorder.stop()
    },

    async updateVideoStream({ audio, video }) {
      this.stopCameraStream()
      this.audioInput = this.audioDevices.find(a => a.value === audio) || {}
      this.videoInput = this.videoDevices.find(v => v.value === video) || {}
      this.cameraStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: audio } },
        video: { deviceId: { exact: video } },
      })

      this.mediaRecorder = new MediaRecorder(this.cameraStream, {
        mimeType: 'video/webm',
        videoBitsPerSecond: 3000000,
      })

      this.mediaRecorder.ondataavailable = async e => {
        socket.emit('stream-video-chunk', { chunk: e.data, stream_name: this.talent.stream_key })
      }

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
