<template>
  <VideoLayout :event="event">
    <video
      id="streaming"
      ref="streaming"
      controls
      class="relative bg-theavenue-black h-full w-full outline-none"
    />
    <template #placeholder>
      <div class="w-full h-full flex items-center justify-center">
        El video no ha empezao julian
      </div>
    </template>
  </VideoLayout>
</template>
<script>
import VideoLayout from '@/components/commons/ui/VideoLayout'

export default {
  name: 'EventPage',

  auth: false,

  layout: 'event',

  components: { VideoLayout },

  async asyncData({ $api, redirect, params }) {
    if (!params.slug) redirect('/')

    try {
      const { data: event } = await $api.events.get(params.slug)
      return { event }
    } catch (e) {
      redirect('/')
    }
  },

  data() {
    return {
      videoHeight: 0,
      dimensions: {
        width: 1920,
        height: 1080,
      },
    }
  },

  mounted() {
    const url = `https://stream.mux.com/${this.event.talent.playback_id}.m3u8`
    const video = this.$refs.streaming
    console.log('video', video)

    if (video && video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url
    } else if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(url)
      hls.attachMedia(video)
    }
  },
}
</script>
<style>
.min-h-content {
  min-height: calc(100vh - 69px);
}
.dc-video-player-wrapper {
  position: initial;
}
#streaming .app-container {
  width: 100%;
}
</style>
