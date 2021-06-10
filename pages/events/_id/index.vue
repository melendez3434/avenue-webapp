<template>
  <div v-if="!competition.id" class="h-screen">
    <base-spinner v-if="$fetchState.pending" class="transform translate-y-2/4" />
  </div>
  <div
    v-else
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <section class="container mx-auto mt-12">
      <div class="flex flex-col md:flex-row items-center justify-center w-full md:space-x-6">
        <h1 class="text-4xl font-library text-center text-avenue-white-light text-light-white">
          <span>{{ competition.name }}</span>
          <CompetitionIcon v-if="competition.icon" :icon="competition.icon" is-title />
        </h1>
      </div>
      <p class="mx-auto text-avenue-white text-center mt-5 text-xl leading-loose">
        {{ competition.description }}
      </p>
      <p class="container text-center mx-auto mt-5 text-gray-400">
        From {{ dateFrom }} to {{ dateTo }}
      </p>
    </section>

    <section
      v-if="showSignupBtn"
      class="container mx-auto flex flex-col justify-center items-center mt-10 md:mt-20"
    >
      <h5 class="mb-4">Want to join this competition?</h5>
      <JoinEventButton has-long-text :competition="competition" />
    </section>

    <!-- TODO: make this reflect the winner -->
    <CompetitionWinner
      v-if="eventIsFinished"
      class="mt-8"
      :competition-name="competition.name"
      :talent="competition.talent[0].talent"
    />

    <div v-if="alreadyRegistered" class="container mx-auto my-16 text-center">
      <p>
        Hello, {{ alreadyRegistered.name }}! Go to your
        <button class="underline font-bold cursor-pointer text-sm" @click="goToDashboard">
          dashboard
        </button>
        to manage your performances for the competition.
      </p>
    </div>

    <CompetitionSponsors
      v-if="competition.sponsors.length"
      :sponsors="competition.sponsors"
      class="mt-8"
    />

    <section v-if="eventIsFuture">
      <Countdown :start-date="competition.starts_at" />
    </section>

    <div v-else>
      <CompetitionOverallInfo />
      <section v-if="competition.talent.length" class="container mx-auto mt-20">
        <div class="flex flex-row gap-4 mb-6">
          <IcScoreboard class="h-8" />
          <h2 class="text-xl font-bold">Scoreboard</h2>
        </div>
        <div class="md:container mx-auto mt-12">
          <div class="w-full flex pl-8 pr-2 md:pl-16 md:pr-0 py-3 text-xxs md:text-base">
            <div class="flex-1">Artist</div>
            <div class="hidden md:block md:w-48 text-right flex-1">Business</div>
            <div class="w-16 md:w-48 text-right whitespace-no-wrap">Week Points</div>
            <div class="w-16 md:w-52 md:pr-16 text-right whitespace-no-wrap">Total Points</div>
          </div>
          <div>
            <CompetitionTalentListItem
              v-for="board in boards"
              :key="board.competition_talent.talent.id"
              :board="board"
              :competition-id="competition.id"
              :style="{ order: board.position }"
            />
          </div>
        </div>
      </section>
    </div>

    <section v-if="eventIsFuture && competition.talent.length" class="container mt-20 mx-auto">
      <h2 class="font-league-gothic text-3xl text-center uppercase">Meet the competitors</h2>
      <div class="md:flex justify-center flex-wrap gap-6 mt-6 w-full">
        <CompetitionTalentCard
          v-for="talent in competition.talent"
          :key="talent.id"
          :talent="talent"
          class="md:w-1/3"
        />
      </div>
    </section>

    <div class="container mt-10 mx-auto underline text-sm font-bold">
      <nuxt-link :to="{ name: 'events-join' }">Read the rules</nuxt-link>
    </div>
  </div>
</template>
<script>
import spacetime from 'spacetime'
import IcScoreboard from '@/assets/svg/scoreboard.svg?inline'
import { mapState } from 'vuex'

export default {
  name: 'EventDetailPage',

  auth: false,

  components: {
    IcScoreboard,
  },

  data() {
    return {
      competition: { talent: [], sponsors: [] },
      prizesPercentage: 5,
      boards: [],
    }
  },

  async fetch() {
    try {
      const { data: competition } = await this.$api.competitions.get(this.$route.params.id)
      const { data: boards } = await this.$api.competitions.boards(this.$route.params.id)
      this.boards = boards
      this.competition = competition
    } catch (error) {
      this.$router.replace({ name: 'events' })
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user,
    }),

    alreadyRegistered() {
      if (!this.user) return false

      return this.competition.talent.find(t => t.talent.id === this.user.talent_id) || false
    },

    userTimezone() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    },

    startTimeZoneDate() {
      return spacetime(this.competition.starts_at, 'UTC').goto(this.userTimezone)
    },

    endTimeZoneDate() {
      return spacetime(this.competition.ends_at, 'UTC').goto(this.userTimezone)
    },

    startTimeZoneDateFormatted() {
      return this.startTimeZoneDate.format('{year}-{month-pad}-{date-pad}')
    },

    dateFrom() {
      return this.startTimeZoneDate.format('{month-short} {date-pad}')
    },

    dateTo() {
      return this.endTimeZoneDate.format('{month-short} {date-pad}')
    },

    today() {
      let today = new Date()
      today = spacetime(today, 'UTC').goto(this.userTimezone)
      return today.format('{month-short} {date-pad}')
    },

    eventIsFinished() {
      return spacetime('UTC').isAfter(spacetime(this.competition.ends_at, 'UTC'))
    },

    competitionWinner() {
      // TODO: Fetch competition winner
      return {}
    },

    eventIsFuture() {
      const today = spacetime.now('UTC')
      const start = spacetime(this.competition.starts_at, 'UTC')
      return today.isBefore(start)
    },

    hasSponsors() {
      return this.competition.sponsors && this.competition.sponsors.length
    },

    scores() {
      let scores = []
      for (let i = 0; i < this.competition.talent.length; i++) {
        if (!scores.includes(this.competition.talent[i].points)) {
          scores.push(this.competition.talent[i].points)
        }
      }
      scores.sort(function(a, b) {
        return b - a
      })
      return scores
    },

    showSignupBtn() {
      if (this.alreadyRegistered) return false
      if (this.eventIsFuture) return true
      if (!this.competition.current_round) return true
      return this.competition.current_round.round < 3
    },
  },

  watch: {
    '$route.query.welcome'(welcome) {
      if (!welcome) return
      this.$modal.show('welcome-modal')
      this.$fetch()
    },
  },

  methods: {
    goToDashboard() {
      window.open(this.$config.baseURL)
    },
  },
}
</script>
