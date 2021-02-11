<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <section class="container mx-auto mt-12">
      <!-- TODO: Icon from font awesome -->
      <p class="text-3xl font-library text-center text-avenue-white-light text-light-white">
        {{ competition.name }}
      </p>
      <p class="max-w-xl mx-auto text-avenue-white text-center mt-5">
        {{ competition.description }}
      </p>
      <!-- <div v-for="artist in talent"></div> -->
    </section>

    <section class="container mx-auto mt-16">
      <p>This event starts on {{ dateFrom }} and ends on {{ dateTo }}</p>
      <p class="mt-3">
        Help your favorite performers win by tipping their performances. 1$ = 1 point
      </p>
    </section>

    <section class="container mx-auto mt-12">
      <!-- TODO: ORDER BY POINTS -->
      <div class="w-full flex pl-16 py-3">
        <div class="flex-1">Artist</div>
        <div class="w-48 text-right">Weekly Points</div>
        <div class="w-52 pr-16 text-right">Total Points</div>
      </div>
      <div>
        <!-- TOOD: Iterate on competition talents -->
        <CompetitionTalentListItem />
      </div>
    </section>

    <section class="container mx-auto mt-12">
      <p class="font-bold text-lg">This event is sponsored by</p>
      <div class="mt-5 px-12 md:px-32 grid grid-cols-3">
        <div class="w-60 h-32 flex items-center justify-center bg-theavenue-gray">Logo</div>
        <div class="w-60 h-32 flex items-center justify-center bg-theavenue-gray">Logo</div>
        <div class="w-60 h-32 flex items-center justify-center bg-theavenue-gray">Logo</div>
      </div>
    </section>
    <section class="container mx-auto mt-12">
      <nuxt-link
        class="font-bold text-lg"
        :to="{ name: 'events-id-join', params: { id: competition.id } }"
      >
        Want to join the competition? Click here to see the conditions
      </nuxt-link>
    </section>
  </div>
</template>
<script>
import spacetime from 'spacetime'
import CompetitionTalentListItem from '@/components/competitions/CompetitionTalentListItem'

export default {
  name: 'EventDetailPage',

  auth: false,

  components: {
    CompetitionTalentListItem,
  },

  async fetch() {
    try {
      const { data } = await this.$api.competitions.get(this.$route.params.id)
      console.log('data', data)
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
