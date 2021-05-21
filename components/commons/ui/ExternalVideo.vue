<template>
  <div class="relative">
    <video ref="video" :src="url" type="video/mov" />
    <template>
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
import IcPlay from '@/assets/svg/play.svg?inline'
import IcPause from '@/assets/svg/pause.svg?inline'
import IcVolume from '@/assets/svg/volume_up.svg?inline'

export default {
  name: 'ExternalVideo',

  components: {
    IcPlay,
    IcPause,
    IcVolume,
  },

  props: {
    url: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      muted: false,
      video: null,
      play: false,
    }
  },

  mounted() {
    this.video = this.$refs.video
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
