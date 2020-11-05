<template>
  <div class="relative h-full w-full">
    <video
      id="streaming"
      ref="streaming"
      controls
      controlsList="nofullscreen"
      class="relative bg-theavenue-black h-full w-full outline-none"
    />
    <div class="dimmer-gradient-small w-full absolute top-0 left-0 h-full" />
    <IcPause
      v-if="play"
      class="cursor-pointer w-10 h-10 absolute left-0 bottom-0 ml-6 mb-4"
      @click="pauseVideo"
    />
    <IcPlay
      v-else
      class="cursor-pointer w-16 h-16 absolute left-0 bottom-0 ml-6 mb-4"
      @click="playVideo"
    />
    <IcVolume
      class="cursor-pointer w-10 h-10 absolute right-0 bottom-0 mr-6 mb-4"
      :class="{ 'opacity-50': muted }"
      @click="toggleMute"
    />
  </div>
</template>

<script>
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
  },

  data() {
    return {
      play: true,
      muted: false,
      video: null,
    }
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
    }
    this.video.play()
    this.video.controls = false
  },

  methods: {
    playVideo() {
      this.play = true
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
<style scoped>
.dimmer-gradient-small {
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 8%);
}
</style>
