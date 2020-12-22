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
        class="text-theavenue-white w-max rounded-lg p-8"
        style="box-shadow: 0px 0px 10px #FFFFFF;"
      >
        <nuxt-link
          class="md:flex justify-between"
          :to="{ name: 'event-slug', params: { slug: event.id } }"
        >
          <h3 class="font-league-gothic text-2xl uppercase tracking-wide">
            {{ talent.name }} - {{ event.name }}
          </h3>
          <h3 class="font-league-gothic text-2xl uppercase tracking-wide">
            {{ dateTimeFormatted(event) }}
          </h3>
        </nuxt-link>
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
            class="border-b border-gray-800"
          >
            <nuxt-link
              class="md:flex justify-between"
              :to="{ name: 'event-slug', params: { slug: event.id } }"
            >
              <h3 class="font-league-gothic text-2xl uppercase tracking-wide">
                {{ event.duration }}
              </h3>
              <h3 class="font-league-gothic text-2xl uppercase tracking-wide">
                {{ talent.name }} - {{ event.name }}
              </h3>
              <h3 class="font-league-gothic text-2xl uppercase tracking-wide">
                {{ dateFormatted(event) }}
              </h3>
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
    pastEvents() {
      return this.events.filter(event => event.is_finished)
    },

    futureEvents() {
      return this.events.filter(event => !event.is_finished)
    },
  },

  methods: {
    startTimeZoneDate(event) {
      return spacetime(event.starts_at, 'UTC').goto(this.userTimezone)
    },

    dateTimeFormatted(event) {
      return this.startTimeZoneDate(event).format('{month} {date-pad} / {hour}:{minute-pad} {ampm}')
    },

    dateFormatted(event) {
      return this.startTimeZoneDate(event).format('{month} {date-pad}')
    },
  },
}
</script>
