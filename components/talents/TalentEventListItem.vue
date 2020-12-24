<template>
  <div v-if="isFuture" class="md:flex justify-between">
    <h3 class="font-league-gothic text-2xl uppercase tracking-wider">
      {{ talent.name }} - {{ event.name }}
    </h3>
    <h3 class="font-league-gothic text-2xl uppercase tracking-wide">
      {{ dateTimeFormatted }}
    </h3>
  </div>
  <div v-else>
    <nuxt-link
      :to="{ name: 'event-slug', params: { slug: event.id } }"
      class="md:flex justify-between py-4"
    >
      <h3 class="font-league-gothic text-2xl uppercase tracking-wide">{{ eventDuration }} hs</h3>
      <h3 class="font-league-gothic text-2xl uppercase tracking-wide text-left">
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
      default: false,
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
      if (this.event.duration < 60) {
        return `00:${this.event.duration}`
      }
      let minutes = Math.floor(this.event.duration % 60)
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      return `${Math.floor(this.event.duration / 60)}:${minutes}`
    },
  },
}
</script>
