<template>
  <video
    id="streaming"
    ref="streaming"
    controls
    controlsList="nofullscreen"
    class="relative bg-theavenue-black h-full w-full outline-none"
  />
</template>

<script>
export default {
  name: 'EventVideo',

  props: {
    playbackId: {
      type: [String, Number],
      required: true,
    },
  },

  mounted() {
    const url = `https://stream.mux.com/${this.playbackId}.m3u8`
    const video = this.$refs.streaming

    if (video && video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url
    } else if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(url)
      hls.attachMedia(video)
    }
    video.play()
  },
}
</script>
