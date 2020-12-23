<template>
  <div v-if="isFuture" class="md:flex justify-between">
    <h3 class="font-league-gothic text-2xl uppercase tracking-wider">
      {{ talent.name }} - {{ event.name }}
    </h3>
    <h3 class="font-league-gothic text-2xl uppercase tracking-wide">
      {{ dateTimeFormatted }}
    </h3>
  </div>
  <div v-else class="md:flex justify-between">
    <nuxt-link :to="{ name: 'event-slug', params: { slug: event.id } }">
      <h3 class="font-league-gothic text-2xl uppercase tracking-wide">{{ eventDuration }} hs</h3>
      <h3 class="font-league-gothic text-2xl uppercase tracking-wide">
        {{ talent.name }} - {{ event.name }}
      </h3>
      <h3 class="font-league-gothic text-2xl uppercase tracking-wide">
        {{ dateFormatted }}
      </h3>
    </nuxt-link>
  </div>
</template>

<script>
import spacetime from 'spacetime'

export default {
  name: 'TalentEventListItem',

  props: {
    event: {
      type: Object,
      default: null,
    },

    talent: {
      type: Object,
      default: null,
    },

    isFuture: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    startTimeZoneDate() {
      return spacetime(this.event.starts_at, 'UTC').goto(this.userTimezone)
    },

    dateTimeFormatted() {
      return this.startTimeZoneDate.format('{month} {date-pad} / {hour}:{minute-pad} {ampm}')
    },

    dateFormatted() {
      return this.startTimeZoneDate.format('{month} {date-pad} / {year}')
    },

    eventDuration() {
      if (String(this.event.duration.length === 2)) {
        return `00:${this.event.durations}`
      }
      return this.event.duration
    },
  },
}
</script>
