<template>
  <div class="relative">
    <div class="absolute text-theavenue-white top-0 right-0 mt-4 mr-6">
      <IcClose class="cursor-pointer" aria-role="button" aria-label="close" @click="close" />
    </div>
    <div class="px-6 pb-5 pt-10 bg-theavenue-background">
      <p class="text-2xl leading-tight font-medium">Set up your live stream</p>
    </div>
    <div>
      <div class="p-6 text-xl leading-tight font-medium">Preview</div>
      <video ref="preview" class="w-full px-2" muted autoplay playsinline />
    </div>
    <form class="mt-3 px-6 pb-10 pt-5" @submit.prevent="updateSettings">
      <div class="mb-6">
        <R64Select v-model="video" :options="videoSources" label="Camera" @input="updatePreview" />
      </div>
      <div class="mb-6">
        <R64Select v-model="audio" :options="audioSources" label="Microphone" />
      </div>
      <div class="mb-6">
        <R64Input v-model="bitrate" type="number" label="Bitrate (kbps)" />
      </div>
      <div>
        <p class="text-xs">
          If you have a slow internet connection we recommend choosing lower bitrates.
        </p>
      </div>

      <R64Button :disabled="bitrateInvalid" type="submit" class="mt-8 mb-24 md:mb-0" full>
        Confirm
      </R64Button>
    </form>
  </div>
</template>
<script>
import IcClose from '@/assets/svg/close_2.svg?inline'

export default {
  name: 'TalentModalsDeviceSettings',

  components: { IcClose },

  props: {
    videoSources: {
      type: Array,
      default: () => [],
    },

    audioSources: {
      type: Array,
      default: () => [],
    },

    selectedAudio: {
      type: String,
      default: '',
    },

    selectedVideo: {
      type: String,
      default: '',
    },

    selectedBitrate: {
      type: Number,
      default: 1000,
    },
  },

  data() {
    const audioSource = this.audioSources[0] || {}
    const videoSource = this.videoSources[0] || {}
    return {
      audio: this.selectedAudio || audioSource.value,
      video: this.selectedVideo || videoSource.value,
      bitrate: this.selectedBitrate || 1000,
      streamPreview: null,
    }
  },

  computed: {
    bitrateInvalid() {
      return Number(this.bitrate) < 1
    },
  },

  async mounted() {
    await this.updatePreview()
  },

  beforeDestroy() {
    if (!this.streamPreview) return

    this.streamPreview.getTracks().forEach(track => {
      track.stop()
    })
  },

  methods: {
    updateSettings() {
      this.$emit('confirm', { audio: this.audio, video: this.video, bitrate: Number(this.bitrate) })
      this.close()
    },

    close() {
      this.$modal.hide('device-settings-modal')
    },

    async updatePreview() {
      this.streamPreview = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: this.audio } },
        video: { deviceId: { exact: this.video } },
      })

      if (!this.streamPreview) return

      this.$refs.preview.srcObject = this.streamPreview
    },
  },
}
</script>
