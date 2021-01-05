<template>
  <VideoLayout :event="event" :talent="talent">
    <div slot="streaming" class="w-112">
      <R64Button v-if="playing" full secondary :disabled="startingStream" @click="askToFinishEvent">
        {{ startingStream ? 'Buffering Video ...' : 'Stop Stream' }}
      </R64Button>
      <R64Button v-else full :disabled="stoppingStream" @click="startStreaming">
        {{ stoppingStream ? 'Please wait ...' : 'Start Stream' }}
      </R64Button>
    </div>
    <IcSettings
      slot="settings"
      class="cursor-pointer h-12"
      :class="{ 'opacity-25 pointer-events-none': playing }"
      @click="$modal.show('device-settings-modal')"
    />
    <div class="h-full relative bg-theavenue-black">
      <div v-if="error">There was an error loading the media devices</div>
      <div class="relative h-full">
        <IcLive v-if="playing && !startingStream" class="w-32 absolute" />
        <video ref="video" class="h-full w-full" muted />
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
        :selected-bitrate="bitrate"
        @confirm="updateVideoStream"
      />
    </modal>
    <modal
      width="100%"
      classes="max-w-md inset-x-0 m-auto"
      name="finish-event-modal"
      scrollable
      height="auto"
    >
      <div class="text-center py-8">
        <p class="text-xl text-avenue-white-light">Do you want to finish the event as well?</p>
        <p class="text-xs text-avenue-white">Payments are proccessed when the event is finished</p>
        <div class="flex items-center justify-center space-x-6 mt-5">
          <R64Button outline @click="stopStreaming">No</R64Button>
          <R64Button @click="stopStreamingAndFinishEvent">Yes</R64Button>
        </div>
      </div>
    </modal>
    <modal
      width="100%"
      classes="max-w-md inset-x-0 m-auto"
      name="extend-event-modal"
      scrollable
      height="auto"
    >
      <div class="text-center py-8">
        <p class="text-xl text-avenue-white-light">
          Event time is almost over. Do you want to extend it for {{ extendMinutes }} minutes?
        </p>
        <p class="text-xs text-avenue-white">Payments are proccessed when the event is finished</p>
        <div class="flex items-center justify-center space-x-6 mt-5">
          <R64Button outline @click="stopStreamingAndFinishEvent">Finish Event</R64Button>
          <R64Button @click="extendTime">Extend Time</R64Button>
        </div>
      </div>
    </modal>
    <modal
      width="100%"
      classes="max-w-md inset-x-0 m-auto"
      name="pending-streaming-modal"
      scrollable
      height="auto"
    >
      <div class="text-center py-8">
        <p class="text-xl text-avenue-white-light">
          {{ leaveWarning }}
        </p>
        <div class="flex items-center justify-center space-x-6 mt-5">
          <R64Button outline @click="$modal.hide('pending-streaming-modal')">Ok</R64Button>
        </div>
      </div>
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

  beforeRouteLeave(to, from, next) {
    if (this.occupiedProcess) {
      this.$modal.show('pending-streaming-modal')
      return next(false)
    }

    return next()
  },

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
      leaveWarning: "The video is processing, please don't leave the page",
      extendMinutes: 10,
      error: false,
      playing: false,
      video: null,
      cameraStream: null,
      mediaRecorder: null,
      devices: [],
      videoInput: {},
      audioInput: {},
      pendingChunks: [],
      stoppingStream: false,
      startingStream: false,
      bitrate: 1000,
    }
  },

  computed: {
    occupiedProcess() {
      return this.playing || this.stoppingStream
    },

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
    window.onbeforeunload = event => {
      if (this.occupiedProcess) {
        event.returnValue = this.leaveWarning
      }
    }

    window.addEventListener('unload', () => {
      if (this.occupiedProcess) {
        socket.emit('terminate-ffmpeg-process', this.talent.stream_key)
      }
    })

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
        this.playing = false
        this.mediaRecorder.stop()
      })

      socket.on(`${this.talent.stream_key}-processed-chunk`, chunkId => {
        const index = this.pendingChunks.indexOf(chunkId)
        if (index > -1) {
          this.pendingChunks.splice(index, 1)
        }
      })

      this.$echo
        .channel(`live.${this.talent.id}`)
        .listen('StreamingIsLive', () => {
          this.startingStream = false
        })
        .listen('StreamingIsIdle', () => {
          this.stoppingStream = false
        })

      if (this.event) {
        return this.listenForEventToFinish()
      }

      this.$echo.channel(`live.${this.talent.id}`).listen('TalentIsLiveNow', ({ event }) => {
        this.event = event
        this.listenForEventToFinish()
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

    this.$echo.channel(`live.${this.talent.id}`).stopListening('TalentIsLiveNow')

    if (this.event) {
      this.$echo.channel(`event.${this.event.id}`).stopListening('EventIsEndedNow')
    }
  },

  methods: {
    startStreaming() {
      socket.emit('create-ffmpeg-process', this.talent.stream_key, this.bitrate)
      this.mediaRecorder.start(1000)
      this.startingStream = true
      this.playing = true

      // Timeout for enabling manually the stream. 20 sec should be enough for MUX
      // to notify the event
      setTimeout(() => {
        this.startingStream = false
      }, 20000)
    },

    stopStreaming() {
      this.$modal.hide('finish-event-modal')
      this.playing = false
      this.mediaRecorder.stop()
      this.stoppingStream = true
      requestAnimationFrame(this.killFfmpegProcess)
    },

    killFfmpegProcess() {
      if (this.pendingChunks.length) {
        return requestAnimationFrame(this.killFfmpegProcess)
      }
      socket.emit('terminate-ffmpeg-process', this.talent.stream_key)
      // Timeout for enabling manually the stream. 20 sec should be enough for MUX
      // to notify the event
      setTimeout(() => {
        this.stoppingStream = false
      }, 20000)
    },

    stopStreamingAndFinishEvent() {
      this.stopStreaming()
      this.$api.events.finish(this.event.id)
      this.$modal.hide('extend-event-modal')
    },

    async updateVideoStream({ audio, video, bitrate }) {
      this.stopCameraStream()
      this.bitrate = bitrate
      this.audioInput = this.audioDevices.find(a => a.value === audio) || {}
      this.videoInput = this.videoDevices.find(v => v.value === video) || {}
      this.cameraStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: audio } },
        video: { deviceId: { exact: video } },
      })

      this.mediaRecorder = new MediaRecorder(this.cameraStream, {
        mimeType: 'video/webm',
        videoBitsPerSecond: this.bitrate * 1000,
      })

      this.mediaRecorder.ondataavailable = async e => {
        // Generates unique id
        const chunkId =
          Date.now().toString(36) +
          Math.random()
            .toString(36)
            .substring(2)

        this.pendingChunks.push(chunkId)

        socket.emit('stream-video-chunk', {
          chunk: e.data,
          stream_name: this.talent.stream_key,
          chunkId,
        })
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

    askToFinishEvent() {
      if (!this.event) {
        return this.stopStreaming()
      }

      this.$modal.show('finish-event-modal')
    },

    extendTime() {
      this.$api.events.extendTime(this.event.id, this.extendMinutes)
      this.$modal.hide('extend-event-modal')
    },

    listenForEventToFinish() {
      this.$echo.channel(`event.${this.event.id}`).listen('EventIsEndedNow', () => {
        this.$modal.show('extend-event-modal')
      })
    },
  },
}
</script>
