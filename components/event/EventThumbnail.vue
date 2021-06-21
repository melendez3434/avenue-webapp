<template>
  <div
    class="flex items-center justify-center overflow-hidden bg-gray-900"
    :style="{ border: addBorder ? '1px solid #a2a4a8' : 'none' }"
  >
    <img
      v-if="event.thumbnail"
      class="object-cover overflow-hidden"
      :src="event.thumbnail"
      alt="Event thumbnail"
    />
    <img
      v-else-if="hasAssets"
      class="object-cover"
      :src="`https://image.mux.com/${event.assets[0].playback_id}/thumbnail.jpg`"
      alt="Event thumbnail"
    />
    <Placeholder v-else class="object-cover" title="Event thumbnail" />
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

    isForScoreboard: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    hasAssets() {
      if (!this.event.assets) return false
      if (!this.event.assets.length < 1) return false
      return this.event.assets[0] ? this.event.assets[0].playback_id : false
    },

    addBorder() {
      return this.isForScoreboard && !this.event.thumbnail && !this.event.assets.length
    },
  },
}
</script>
