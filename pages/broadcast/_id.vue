<template>
  <div>
    <div v-if="$fetchState.pending" class="h-screen">
      <base-spinner class="transform translate-y-2/4" />
    </div>
    <div v-else>
      <VideoLayout :event="event" :talent="talent">
        <div slot="streaming" class="w-112">
          <R64Button
            v-if="playing"
            full
            secondary
            :disabled="startingStream"
            @click="askToFinishEvent"
          >
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
          <div v-if="error">There was an error loading the media devices. Please try again.</div>
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
          <TalentModalsDeviceSettings
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
            <p class="text-xs text-avenue-white">
              Payments are proccessed when the event is finished
            </p>
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
            <p class="text-xs text-avenue-white">
              Payments are proccessed when the event is finished
            </p>
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
        <modal
          width="100%"
          classes="max-w-md inset-x-0 m-auto"
          name="bad-connection-modal"
          scrollable
          height="auto"
        >
          <div class="text-center py-8">
            <p class="text-xl text-avenue-white-light">
              Oops! It seems like you have a bad internet connection.
            </p>
            <p class="text-xs text-avenue-white">
              We recommend that you try using
              <a href="https://obsproject.com/" target="_blank">OBS</a>
              instead of the browser to stream.
            </p>
            <p class="text-xl text-avenue-white-light">
              Do you want to finish this stream?
            </p>
            <div class="flex items-center justify-center space-x-6 mt-5">
              <R64Button outline @click="$modal.hide('bad-connection-modal')">No</R64Button>
              <R64Button @click="stopStreaming">Yes</R64Button>
            </div>
          </div>
        </modal>
      </VideoLayout>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import IcLive from '@/assets/svg/live_w_text.svg?inline'
import IcSettings from '@/assets/svg/settings.svg?inline'

export default {
  name: 'BroadcastChannel',

  components: { IcLive, IcSettings },

  beforeRouteLeave(to, from, next) {
    if (this.serverProcessOpen) {
      this.$modal.show('pending-streaming-modal')
      return next(false)
    }

    return next()
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
      serverProcessOpen: false,
      bitrate: 1000,
      socket: null,
      reconnections: 0,
      event: null,
      events: null,
      talent: null,
    }
  },

  async fetch() {
    try {
      const { data: talent } = await this.$api.talent.get(this.$route.params.id)
      const { data: events } = await this.$api.events.list({
        live: 1,
        talent: this.$route.params.id,
      })

      let event = null

      if (events.length) event = events[0]

      if (!talent.stream_key) {
        console.error('Invalid broadcast settings')
        return this.$router.push('/')
      }

      this.events = events
      this.event = event
      this.talent = talent
    } catch {
      console.error('Invalid broadcast settings')
    }
  },

  computed: {
    audioDevices() {
      const devices = []
      let i = 0
      for (const device of this.devices) {
        if (!device.deviceId) continue

        if (device.kind === 'audioinput') {
          if (!device.label) i++

          devices.push({
            value: device.deviceId,
            label: device.label || `Audio Input #${i}`,
          })
        }
      }
      return devices
    },

    videoDevices() {
      const devices = []
      let i = 0
      for (const device of this.devices) {
        if (!device.deviceId) continue

        if (device.kind === 'videoinput') {
          if (!device.label) i++

          devices.push({
            value: device.deviceId,
            label: device.label || `Video Input #${i}`,
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
    this.socket = io(this.$config.wsUrl, {
      transports: ['websocket', 'polling', 'flashsocket'],
    })

    window.onbeforeunload = event => {
      if (this.serverProcessOpen) {
        event.returnValue = this.leaveWarning
      }
    }

    window.addEventListener('unload', () => {
      if (this.serverProcessOpen) {
        this.terminateServerProcess()
      }
    })

    try {
      await this.getMediaDevices()

      this.video = this.$refs.video
      this.video.onloadedmetadata = () => {
        this.video.play()
      }

      this.socket.on(`${this.talent.stream_key}-error`, (text, forceKill) => {
        if (!this.playing) return

        this.showWarningAndStop(text)

        if (!forceKill) return

        if (
          window.confirm(
            'This stream is already live. Check your other open tabs and browsers. Do you want to force closing this one?'
          )
        ) {
          this.terminateServerProcess()
        }
      })

      this.socket.on(`${this.talent.stream_key}-reconnecting`, () => {
        this.reconnections++
        if (this.reconnections > this.$config.maxRetries) {
          this.$modal.show('bad-connection-modal')
          return this.showWarningAndStop()
        }

        this.startingStream = true
        this.mediaRecorder.stop()
        setTimeout(() => {
          this.startStreaming()
        }, 1000)
      })

      this.socket.on(`${this.talent.stream_key}-processed-chunk`, chunkId => {
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
      console.error(error)
      this.error = true
    }
  },

  beforeDestroy() {
    if (!this.cameraStream) return

    if (this.playing) {
      this.stopStreaming()
    }

    this.stopCameraStream()

    this.socket.disconnect()

    this.$echo.channel(`live.${this.talent.id}`).stopListening('TalentIsLiveNow')

    if (this.event) {
      this.$echo.channel(`event.${this.event.id}`).stopListening('EventIsAboutToEnd')
    }
  },

  methods: {
    showWarningAndStop() {
      this.playing = false
      this.mediaRecorder.stop()
      this.serverProcessOpen = false
    },

    startStreaming() {
      this.socket.emit('create-ffmpeg-process', this.talent.stream_key, this.bitrate)
      this.serverProcessOpen = true
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
      this.terminateServerProcess()
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

      const isSafari = window.safari !== undefined
      this.mediaRecorder = new MediaRecorder(this.cameraStream, {
        mimeType: isSafari ? 'video/mp4' : 'video/webm',
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

        this.socket.emit('stream-video-chunk', {
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
      this.$echo.channel(`event.${this.event.id}`).listen('EventIsAboutToEnd', () => {
        this.$modal.show('extend-event-modal')
      })
    },

    terminateServerProcess() {
      this.socket.emit('terminate-ffmpeg-process', this.talent.stream_key)
      this.serverProcessOpen = false
    },
  },
}
</script>
