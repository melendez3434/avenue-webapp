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
        <Collapse>
          <template slot="header">
            <div class="w-full flex">
              <div class="flex-1">Artist name</div>
              <div class="w-48 text-right">100</div>
              <div class="w-48 text-right pr-12">300</div>
            </div>
          </template>
          <div class="px-12">
            <div class="w-full flex items-center justify-between">
              <div class="flex space-x-3 items-center">
                <div class="w-10 h-10 bg-theavenue-gray rounded-full" />
                <span>Artist name</span>
              </div>
              <span>Restaurant name with link</span>
              <span>City and State</span>
            </div>

            <div class="mt-10">
              <p class="text-xl">Past performances</p>
              <div class="mt-5 grid grid-cols-4 gap-5">
                <div class="text-center">
                  <div class="w-full h-32 bg-theavenue-gray" />
                  <span class="block mt-3">Performance Name</span>
                </div>
                <div class="text-center">
                  <div class="w-full h-32 bg-theavenue-gray" />
                  <span class="block mt-3">Performance Name</span>
                </div>
                <div class="text-center">
                  <div class="w-full h-32 bg-theavenue-gray" />
                  <span class="block mt-3">Performance Name</span>
                </div>
                <div class="text-center">
                  <div class="w-full h-32 bg-theavenue-gray" />
                  <span class="block mt-3">Performance Name</span>
                </div>
                <div class="text-center">
                  <div class="w-full h-32 bg-theavenue-gray" />
                  <span class="block mt-3">Performance Name</span>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </section>
  </div>
</template>
<script>
import spacetime from 'spacetime'
import Collapse from '@/components/commons/ui/Collapse'

export default {
  name: 'CompetitionDetailPage',

  auth: false,

  components: {
    Collapse,
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
