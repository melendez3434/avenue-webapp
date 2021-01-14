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
      class="sm:flex py-4 border-b-2 border-gray-900"
    >
      <div class="w-48 h-28 mr-6 flex items-center justify-center overflow-hidden">
        <img v-if="event.thumbnail" :src="event.thumbnail" alt="Event thumbnail" />
        <img
          v-else-if="hasAssets"
          :src="`https://image.mux.com/${event.assets[0].playback_id}/thumbnail.jpg`"
          alt="Event thumbnail"
        />
        <Placeholder v-else title="Event thumbnail" class="h-full " />
      </div>
      <div class="flex flex-col">
        <h3 class="font-league-gothic text-2xl uppercase tracking-wide text-left mb-4">
          {{ event.name }}
        </h3>
        <h3 class="font-league-gothic text-xl uppercase tracking-wide">{{ eventDuration }} hs</h3>
        <h3 class="font-league-gothic text-xl uppercase tracking-wide">
          {{ dateFormatted }}
        </h3>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import spacetime from 'spacetime'
import Placeholder from '@/assets/svg/thumbnail_placeholder.svg?inline'

export default {
  name: 'TalentEventListItem',

  components: { Placeholder },

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
      let hours = this.timeString(Math.floor(this.event.duration / 60))
      let minutes = this.timeString(Math.floor(this.event.duration % 60))
      return `${hours}:${minutes}`
    },

    hasAssets() {
      return this.event.assets.length > 0 && this.event.assets[0].playback_id
    },
  },

  methods: {
    timeString(time) {
      return time < 10 ? `0${time}` : `${time}`
    },
  },
}
</script>
