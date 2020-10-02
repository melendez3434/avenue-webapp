<template>
  <div class="w-full grid grid-cols-9 grid-rows-1">
    <div class="col-span-6">
      <div id="streaming" ref="streaming" />
    </div>
    <div class="col-span-3 flex flex-col">
      <TipJars class="h-64" />
      <ChatRoom class="flex-1" :event="$route.params.slug" :style="chatStyle" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'EventPage',

  auth: false,

  layout: 'event',

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

  computed: {
    chatStyle() {
      return { maxHeight: `calc(${this.videoHeight}px - 256px)` }
    },
  },

  mounted() {
    this.videoHeight =
      (this.dimensions.height / this.dimensions.width) * this.$refs.streaming.offsetWidth

    dacast(this.event.talent.embed_code, 'streaming', {
      width: '100%',
      height: this.videoHeight,
    })
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
