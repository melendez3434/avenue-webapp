<template>
  <div>
    <p class="text-base md:text-lg">{{ time }} performances</p>
    <div class="mt-5 md:grid md:grid-cols-3 lg:grid-cols-4 gap-5 h-42 lg:h-60">
      <div class="text-center">
        <EventThumbnail width="w-full" height="h-42" :event="performance" is-for-scoreboard />
        <span class="block mt-3 font-bold text-xs">{{ performance.name }}</span>
        <span class="block mt-1 text-xxs font-bold">
          {{ performanceDate }}. {{ performanceStartTime }}
        </span>
      </div>
    </div>
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

    time: {
      type: String,
      default: 'Past',
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
