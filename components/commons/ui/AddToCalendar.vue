<template>
  <div title="Add to Calendar" class="addeventatc">
    Add to Calendar
    <span class="start">{{ start }}</span>
    <span class="end">{{ end }}</span>
    <span class="timezone">{{ event.timezone }}</span>
    <span class="title">{{ title }}</span>
    <span class="description">{{ `https://www.theavenue.live/event/${event.id}` }}</span>
    <span class="location">The Avenue</span>
  </div>
</template>

<script>
import spacetime from 'spacetime'

export default {
  name: 'AddToCalendar',

  props: {
    event: {
      type: Object,
      required: true,
    },
  },

  computed: {
    start() {
      return spacetime(this.event.starts_at, 'UTC')
        .goto(this.event.timezone)
        .format('{month-pad}/{date-pad}/{year} {hour-pad}:{minute-pad} {ampm}')
    },

    end() {
      return spacetime(this.event.ends_at, 'UTC')
        .goto(this.event.timezone)
        .format('{month-pad}/{date-pad}/{year} {hour-pad}:{minute-pad} {ampm}')
    },

    title() {
      return `Watch ${this.event.talent.name} stream live on The Avenue`
    },
  },
}
</script>
