<template>
  <div :id="eventTag" class="w-full" />
</template>
<script>
export default {
  name: 'LiveEventListItem',

  props: {
    event: {
      type: Object,
      required: true,
    },
  },

  computed: {
    eventTag() {
      return `embed-${this.event.id}`
    },
  },

  mounted() {
    new Twitch.Embed(this.eventTag, {
      width: '100%',
      height: 320,
      channel: this.event.twitch_channel,
      layout: 'video',
      autoplay: false,
    })
  },
}
</script>
