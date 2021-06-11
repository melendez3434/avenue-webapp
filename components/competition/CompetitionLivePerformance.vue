<template>
  <div class="relative">
    <nuxt-link :to="{ name: 'event-slug', params: { slug: performance.id } }">
      <EventThumbnail
        width="w-full"
        height="h-48"
        :event="performance"
        is-scoreboard
        class="bg-gray-900"
      />
      <IcLive class="absolute top-2 left-2 w-14" />
      <div class="flex flex-col">
        <span class="font-league-gothic uppercase text-2xl">{{ performance.talent.name }}</span>
        <span class="text-sm text-gray-400">{{ performance.category.name }}</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import IcLive from '@/assets/svg/live_w_text_2.svg?inline?'

export default {
  name: 'CompetitionLivePerformance',

  components: { IcLive },

  props: {
    performance: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
