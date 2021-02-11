<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <section class="mx-auto container mt-12">
      <h1 class="text-4xl text-center">{{ competition.name }} Requirements and Conditions</h1>
      <h2 class="mt-16 text-xl">
        {{ competition.name }} takes place from {{ dateFrom }} to {{ dateTo }}
      </h2>

      <ol class="list-decimal leading-loose mt-5 pl-5">
        <li>
          In order to perform on The Avenue’s events you must have a performer account in The Avenue
          and have performed at least twice before.
        </li>
        <li>
          The events consist of a five weeks competition. The performer with the biggest ammount of
          points at the final week will be the winner.
        </li>
        <li>
          You win points when people tip, at the rate of one dollar to one point. Viewers can tip
          during the performance or at any other moment of the same weeek in which the performance
          took place. Weekly winners are determined by total points between Sunday and Friday.
        </li>
        <li>
          As a performer you will keep 70% of the tips for each performance, as in any other
          performance in The Avenue.
        </li>
        <li>
          Each week’s round winner will also get 5% of the week total tips (percentage of total tips
          of all performances).
        </li>
        <li>The final winner gets 5% of the tips of the entire competition.</li>
        <li>The organizer gets 5% of the tips of the entire competition.</li>
        <li>The Avenue gets 15% of the total earnings.</li>
      </ol>

      <div class="mt-12 text-center">
        <nuxt-link
          :to="{ name: 'events-id-join', params: { id: competition.id } }"
          class="uppercase border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
        >
          Join {{ competition.name }}
        </nuxt-link>
      </div>
    </section>
  </div>
</template>
<script>
import spacetime from 'spacetime'

export default {
  name: 'CompetitionRequirementsPage',

  auth: false,

  async fetch() {
    try {
      const { data } = await this.$api.competitions.get(this.$route.params.id)
      this.competition = data
    } catch (error) {
      console.error("Couldn't fetch the event")
    }
  },

  data() {
    return {
      competition: {},
    }
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
