<template>
  <div class="relative h-full w-full">
    <video
      id="streaming"
      ref="streaming"
      controls
      controlsList="nofullscreen"
      class="relative bg-theavenue-black h-full w-full outline-none"
      playsinline
    />
    <R64Select
      v-if="offline && assets.length > 1"
      v-model="selectedAsset"
      class="absolute z-10 top-0 left-0 py-2 px-4 w-40"
      :options="parts"
      @input="$emit('selected-asset', selectedAsset)"
    />
    <template v-if="!offline">
      <div class="hidden md:block dimmer-gradient-small w-full absolute top-0 left-0 h-full" />
      <IcPause
        v-if="play"
        class="hidden md:block cursor-pointer w-10 h-10 absolute left-0 bottom-0 ml-6 mb-4"
        @click="pauseVideo"
      />
      <IcPlay
        v-else
        class="hidden md:block cursor-pointer w-16 h-16 absolute left-0 bottom-0 ml-6 mb-4"
        @click="playVideo"
      />
      <IcVolume
        class="hidden md:block cursor-pointer w-10 h-10 absolute right-0 bottom-0 mr-6 mb-4"
        :class="{ 'opacity-50': muted }"
        @click="toggleMute"
      />
    </template>
  </div>
</template>

<script>
import Hls from 'hls.js'
import IcPlay from '@/assets/svg/play.svg?inline'
import IcPause from '@/assets/svg/pause.svg?inline'
import IcVolume from '@/assets/svg/volume_up.svg?inline'

export default {
  name: 'EventVideo',

  components: {
    IcPlay,
    IcPause,
    IcVolume,
  },

  props: {
    playbackId: {
      type: [String, Number],
      required: true,
    },

    assets: {
      type: Array,
      default: () => [],
    },

    offline: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      play: false,
      muted: !this.$nuxt.context.from,
      video: null,
      selectedAsset: this.playbackId,
    }
  },

  computed: {
    parts() {
      return this.assets.map((asset, index) => {
        return {
          label: `Part ${index + 1}`,
          value: asset.playback_id,
        }
      })
    },
  },

  mounted() {
    const url = `https://stream.mux.com/${this.playbackId}.m3u8`
    this.video = this.$refs.streaming

    if (this.video && this.video.canPlayType('application/vnd.apple.mpegurl')) {
      this.video.src = url
    } else if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(url)
      hls.attachMedia(this.video)
      this.video.controls = this.offline
    }
    this.video.muted = this.muted

    this.video.onloadeddata = () => {
      this.playVideo()
    }
  },

  methods: {
    playVideo() {
      this.play = true
      if (!this.offline) {
        this.video.currentTime = this.video.duration - this.$config.videoBuffer || 0
      }
      this.video.play()
    },

    pauseVideo() {
      this.play = false
      this.video.pause()
    },

    toggleMute() {
      this.muted = !this.muted
      this.video.muted = this.muted
    },
  },
}
</script>
