<template>
  <div class="border border-theavenue-yellow-neon px-10 py-8 rounded-lg text-center">
    <!-- TODO: Icon from font awesome -->
    <p class="text-3xl text-avenue-white-light font-library uppercase">
      {{ competition.name }}
    </p>
    <p class="text-avenue-white text-sm mt-5">{{ competition.description }}</p>
    <p class="text-avenue-grey mt-5">From {{ dateFrom }} to {{ dateTo }}</p>
    <p class="mt-5 font-bold">Join today!</p>
    <div class="mt-5 w-full flex items-center justify-center">
      <nuxt-link
        :to="{ name: 'competitions-id', params: { id: competition.id } }"
        class="uppercase border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
      >
        Join
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import spacetime from 'spacetime'

export default {
  name: 'CompetitionListItem',

  props: {
    competition: {
      type: Object,
      required: true,
    },
  },

  computed: {
    userTimezone() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    },

    startTimeZoneDate() {
      return spacetime(this.competition.starts_at, 'UTC').goto(this.userTimezone)
    },

    endTimeZoneDate() {
      return spacetime(this.competition.ends_at, 'UTC').goto(this.userTimezone)
    },

    dateFrom() {
      return this.startTimeZoneDate.format('{month-short} {date-pad}')
    },

    dateTo() {
      return this.endTimeZoneDate.format('{month-short} {date-pad}')
    },
  },
}
</script>
