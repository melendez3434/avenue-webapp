<template>
  <article class="container mx-auto hidden md:flex md:flex-col py-12 space-y-14 max-w-screen-lg">
    <div>
      <div class="mb-4">
        <h2 ref="about" class="text-3xl">About</h2>
      </div>
      <div class="prose lg:prose-lg ml-0 text-theavenue-white">
        {{ talent.biography }}
      </div>
    </div>
    <div>
      <div class="mb-8">
        <h2 class="text-3xl">Upcoming Shows</h2>
      </div>
      <div
        v-for="event in futureEvents"
        :key="event.id"
        class="text-theavenue-white w-max rounded-lg p-8 md:flex justify-between"
        style="box-shadow: 0px 0px 10px #FFFFFF;"
      >
        <h3 class="font-league-gothic text-2xl uppercase">{{ talent.name }} - {{ event.name }}</h3>
        <h3 class="font-league-gothic text-2xl uppercase">Jan 01</h3>
      </div>
      <div v-if="!futureEvents">
        <p>This artist doesn't have any future event planned for now.</p>
      </div>
    </div>
    <div>
      <div class="space-y-6">
        <h2 class="text-3xl">Past Shows</h2>
        <div v-if="pastEvents">
          <p class="mb-8">Revive {{ talent.name }} past shows with just one click</p>
          <div
            v-for="event in pastEvents"
            :key="event.id"
            :playback-id="event.talent.playback_id"
            class="flex justify-between border-b border-gray-800"
          >
            <nuxt-link :to="{ name: 'event-slug', params: { slug: event.id } }">
              <h3 class="font-league-gothic text-2xl uppercase">{{ event.duration }}</h3>
              <h3 class="font-league-gothic text-2xl uppercase">
                {{ talent.name }} - {{ event.name }}
              </h3>
              <h3 class="font-league-gothic text-2xl uppercase">{{ dateFormatted }}</h3>
            </nuxt-link>
          </div>
        </div>
        <div v-else>
          <p>This artist doesn't have past shows.</p>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import spacetime from 'spacetime'

export default {
  name: 'TalentEvents',

  props: {
    events: {
      type: Array,
      default: null,
    },

    talent: {
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

    pastEvents() {
      return this.events.filter(event => event.is_finished)
    },

    futureEvents() {
      return this.events.filter(event => !event.is_finished)
    },
  },
}
</script>
