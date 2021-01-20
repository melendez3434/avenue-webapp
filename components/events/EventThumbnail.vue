<template>
  <div class="w-48 h-28 mr-6 flex items-center justify-center overflow-hidden">
    <img v-if="event.thumbnail" :src="event.thumbnail" alt="Event thumbnail" />
    <img
      v-else-if="hasAssets"
      :src="`https://image.mux.com/${event.assets[0].playback_id}/thumbnail.jpg`"
      alt="Event thumbnail"
    />
    <Placeholder v-else title="Event thumbnail" class="h-full " />
  </div>
</template>

<script>
import Placeholder from '@/assets/svg/thumbnail_placeholder.svg?inline'

export default {
  components: { Placeholder },

  props: {
    event: {
      type: Object,
      default: null,
    },
  },
}
</script>
