<template>
  <div class="w-full grid grid-cols-9 grid-rows-1 min-h-content">
    <div class="col-span-6 bg-avenue-black h-full">
      <div id="twitch-streaming" ref="streaming" />
    </div>
    <div class="col-span-3 bg-avenue-black h-full">
      chat
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

  mounted() {
    const height = (480 / 900) * this.$refs.streaming.offsetWidth
    new Twitch.Embed('twitch-streaming', {
      width: '100%',
      height: `${height}px`,
      channel: this.event.twitch_channel,
      layout: 'video',
    })
  },
}
</script>
<style>
.min-h-content {
  min-height: calc(100vh - 69px);
}
</style>
