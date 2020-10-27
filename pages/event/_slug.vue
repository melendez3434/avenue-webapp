<template>
  <VideoLayout :event="event">
    <div id="streaming" ref="streaming" class="relative bg-theavenue-black h-full w-full" />
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
    this.videoHeight =
      (this.dimensions.height / this.dimensions.width) * this.$refs.streaming.offsetWidth

    // dacast(this.event.talent.embed_code, 'streaming', {
    //   width: '100%',
    //   height: this.videoHeight,
    // })
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
