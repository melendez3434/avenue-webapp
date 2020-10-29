<template>
  <VideoLayout :event="event">
    <EventVideo :playback-id="event.talent.playback_id" />
    <template #placeholder>
      <div class="w-full h-full flex items-center justify-center">
        Streaming is not live yet or it is idle. When its live you'll watch it here.
      </div>
    </template>
  </VideoLayout>
</template>
<script>
import VideoLayout from '@/components/commons/ui/VideoLayout'
import EventVideo from '@/components/events/EventVideo'

export default {
  name: 'EventPage',

  auth: false,

  components: { VideoLayout, EventVideo },

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
