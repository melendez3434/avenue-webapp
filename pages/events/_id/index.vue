<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <section class="container mx-auto mt-12">
      <div class="flex items-center justify-center w-full space-x-6">
        <p class="text-3xl font-library text-center text-avenue-white-light text-light-white">
          {{ competition.name }}
        </p>
        <!-- TODO: change for competition icon -->
        <IcBread />
      </div>
      <p class="max-w-xl mx-auto text-avenue-white text-center mt-5">
        {{ competition.description }}
      </p>
      <!-- <div v-for="artist in talent"></div> -->
    </section>

    <section class="container text-center mx-auto mt-16 text-xs">
      <p>From {{ dateFrom }} to {{ dateTo }}</p>
    </section>

    <section class="container mx-auto mt-12">
      <!-- TODO: ORDER BY POINTS -->
      <div class="w-full flex pl-16 py-3">
        <div class="flex-1">Artist</div>
        <div class="w-48 text-right">Weekly Points</div>
        <div class="w-52 pr-16 text-right">Total Points</div>
      </div>
      <div>
        <!-- TODO: Iterate on competition talents -->
        <CompetitionTalentListItem
          v-for="talent in competition.talent"
          :key="talent.id"
          :talent="talent"
        />
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
      <nuxt-link class="font-bold" :to="{ name: 'events-talents' }">
        Want to join the competition? Click here to learn more
      </nuxt-link>
    </section>
  </div>
</template>
<script>
import spacetime from 'spacetime'
import IcBread from '@/assets/svg/bread.svg?inline'
import CompetitionTalentListItem from '@/components/competitions/CompetitionTalentListItem'

export default {
  name: 'EventDetailPage',

  auth: false,

  components: {
    CompetitionTalentListItem,
    IcBread,
  },

  async fetch() {
    try {
      const { data } = await this.$api.competitions.get(this.$route.params.id)
      this.competition = data
    } catch (error) {
      this.$router.replace({ name: 'events' })
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
