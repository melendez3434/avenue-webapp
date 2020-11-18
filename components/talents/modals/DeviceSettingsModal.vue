<template>
  <div class="relative">
    <div class="absolute text-theavenue-white top-0 right-0 mt-4 mr-6">
      <IcClose class="cursor-pointer" @click="close" />
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

      <R64Button type="submit" class="mt-8" full>
        Confirm
      </R64Button>
    </form>
  </div>
</template>
<script>
import IcClose from '@/assets/svg/close_2.svg?inline'

export default {
  name: 'DeviceSettingsModal',

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
  },

  data() {
    const audioSource = this.audioSources[0] || {}
    const videoSource = this.videoSources[0] || {}
    return {
      audio: this.selectedAudio || audioSource.value,
      video: this.selectedVideo || videoSource.value,
      streamPreview: null,
    }
  },

  async mounted() {
    await this.updatePreview()
  },

  beforeDestroy() {
    this.streamPreview.getTracks().forEach(track => {
      track.stop()
    })
  },

  methods: {
    updateSettings() {
      this.$emit('confirm', { audio: this.audio, video: this.video })
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
      this.$refs.preview.srcObject = this.streamPreview
    },
  },
}
</script>
