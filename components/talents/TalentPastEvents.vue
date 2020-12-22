<template>
  <div class="space-y-6">
    <nuxt-link :to="{ name: 'event-slug', params: { slug: event.id } }">
      <div
        v-for="event in events"
        :key="event.id"
        :playback-id="event.talent.playback_id"
        class="flex justify-between border-b border-gray-800"
      >
        <h3 class="font-league-gothic text-2xl uppercase">{{ event.duration }}</h3>
        <h3 class="font-league-gothic text-2xl uppercase">{{ talent.name }} - {{ event.name }}</h3>
        <h3 class="font-league-gothic text-2xl uppercase">{{ dateFormatted }}</h3>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import spacetime from 'spacetime'

export default {
  name: 'TalentPastEvents',

  props: {
    events: {
      type: Object,
      default: null,
    },
  },

  computed: {
    startTimeZoneDate() {
      return spacetime(this.event.starts_at, 'UTC').goto(this.userTimezone)
    },

    dateFormatted() {
      return this.startTimeZoneDate.format('{day}, {month} {date-pad} / {hour}:{minute-pad} {ampm}')
    },
  },
}
</script>
