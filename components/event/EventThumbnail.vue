<template>
  <div class="flex items-center justify-center overflow-hidden" :class="[width, height]">
    <img v-if="event.thumbnail" :src="event.thumbnail" alt="Event thumbnail" />
    <img
      v-else-if="hasAssets"
      :src="`https://image.mux.com/${event.assets[0].playback_id}/thumbnail.jpg`"
      alt="Event thumbnail"
    />
    <Placeholder v-else title="Event thumbnail" class="h-full" />
  </div>
</template>

<script>
import Placeholder from '@/assets/svg/thumbnail_placeholder.svg?inline'

export default {
  name: 'EventThumbnail',

  components: { Placeholder },

  props: {
    event: {
      type: Object,
      default: () => ({
        assets: [],
      }),
    },

    width: {
      type: String,
      default: 'w-48',
    },

    height: {
      type: String,
      default: 'h-28',
    },
  },

  computed: {
    hasAssets() {
      return this.event.assets.length > 0 && this.event.assets[0].playback_id
    },
  },
}
</script>
