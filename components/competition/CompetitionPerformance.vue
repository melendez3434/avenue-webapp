<template>
  <div>
    <p class="text-base md:text-lg">{{ time }} performances</p>
    <div class="mt-5 md:grid md:grid-cols-3 lg:grid-cols-4 gap-5 h-42 lg:h-60">
      <nuxt-link :to="{ name: 'event-slug', params: { slug: performance.id } }" class="text-center">
        <EventThumbnail
          width="w-full"
          height="h-40"
          :event="performance"
          is-for-scoreboard
          class="overflow-hidden"
        />
        <span class="block mt-3 font-bold text-xs">{{ performance.name }}</span>
        <span class="block mt-1 text-xxs font-bold">
          {{ performanceDate }}. {{ performanceStartTime }}
        </span>
      </nuxt-link>
      <div class="text-center">
        <EventThumbnail
          width="w-full"
          height="h-40"
          :event="performance"
          is-for-scoreboard
          class="overflow-hidden"
        />
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
