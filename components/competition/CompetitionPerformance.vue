<template>
  <div :style="{ position: live ? 'relative' : '' }">
    <nuxt-link :to="{ name: 'event-slug', params: { slug: performance.id } }" class="text-center">
      <EventThumbnail
        width="w-full"
        :event="performance"
        is-for-scoreboard
        class=" h-48 3xl:h-64"
      />
      <IcLive v-if="live" class="absolute top-2 left-2 w-14" />
      <span class="block mt-3 font-bold text-xs">{{ performance.name }}</span>
      <span class="block mt-1 text-xxs font-bold">
        {{ performanceDate }} - {{ performanceStartTime }}
      </span>
    </nuxt-link>
  </div>
</template>

<script>
import spacetime from 'spacetime'
import IcLive from '@/assets/svg/live_w_text_2.svg?inline?'

export default {
  name: 'CompetitionPerformance',

  components: { IcLive },

  props: {
    performance: {
      type: Object,
      default: () => ({}),
    },

    live: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    performanceDate() {
      return spacetime(this.performance.starts_at, 'UTC')
        .goto(this.performance.timezone)
        .format('{month-short} {date-pad}, {year}')
    },

    performanceStartTime() {
      return spacetime(this.performance.starts_at, 'UTC')
        .goto(this.performance.timezone)
        .format('{hour}:{minute-pad}{ampm}')
    },
  },
}
</script>
