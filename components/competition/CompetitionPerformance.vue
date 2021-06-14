<template>
  <div>
    <nuxt-link :to="{ name: 'event-slug', params: { slug: performance.id } }" class="text-center">
      <EventThumbnail
        width="w-full"
        height="h-48"
        :event="performance"
        is-for-scoreboard
        class="overflow-hidden"
      />
      <span class="block mt-3 font-bold text-xs">{{ performance.name }}</span>
      <span class="block mt-1 text-xxs font-bold">
        {{ performanceDate }} - {{ performanceStartTime }}
      </span>
    </nuxt-link>
  </div>
</template>

<script>
import spacetime from 'spacetime'

export default {
  name: 'CompetitionPerformance',

  props: {
    performance: {
      type: Object,
      default: () => ({}),
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
