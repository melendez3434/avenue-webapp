<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <section class="container mx-auto mt-12">
      <div class="flex flex-col md:flex-row items-center justify-center w-full md:space-x-6">
        <p class="text-3xl font-library text-center text-avenue-white-light text-light-white">
          {{ competition.name }}
        </p>
        <!-- TODO: This image is not working correctly -->
        <img v-if="competition.icon" :src="competition.icon" alt="" class="w-8 h-8" />
      </div>
      <p class="max-w-xl mx-auto text-avenue-white text-center mt-5 text-lg">
        {{ competition.description }}
      </p>
    </section>

    <section class="container text-center mx-auto mt-10 text-xs">
      <p>From {{ dateFrom }} to {{ dateTo }}</p>
    </section>

    <section v-if="eventIsFuture">
      <Countdown :start-date="competition.starts_at" />
    </section>

    <div v-else>
      <section class="md:grid grid-cols-3 grid-rows-2 gap-12 mx-auto mt-12 container">
        <div class="flex flex-col items-center justify-center gap-6 col-end-3 row-end-2">
          <h4 class="font-league-gothic uppercase text-2xl lg:text-3xl">
            Grand prize status
          </h4>
          <IcTrophy class="h-20" />
          <span class="text-4xl lg:text-5xl font-league-gothic ">
            {{ grandPrizeStatus }}
          </span>
        </div>
        <div
          class="col-start-2 flex flex-col items-center justify-center gap-6 mt-6 col-end-3 row-end-3"
        >
          <h4 class="font-league-gothic uppercase text-2xl lg:text-3xl">Week prize status</h4>
          <IcPodium class="h-20" />
          <span class="text-4xl lg:text-5xl font-league-gothic">{{ weekPrizeStatus }}</span>
        </div>
        <div
          v-show="lastWeekWinner"
          class="flex flex-col items-center justify-center gap-6 mt-32 col-end-2 row-end-2"
        >
          <h4 class="font-league-gothic uppercase text-2xl lg:text-3xl">
            Last week's winner
          </h4>
          <img
            v-if="lastWeekWinner && lastWeekWinner.photo"
            :src="lastWeekWinner.photo"
            :alt="`${lastWeekWinner.name}`"
            class="rounded-full w-24 h-24"
          />
          <!-- <span class="text-xs font-bold">{{ lastWeekWinner.name }}</span> -->
        </div>
        <div
          v-show="topScorer"
          class="flex flex-col items-center justify-center gap-6 mt-32 col-end-4 row-end-2"
        >
          <h4 class="font-league-gothic uppercase text-2xl lg:text-3xl">
            General top scorer
          </h4>
          <img
            v-if="topScorer && topScorer.photo"
            :src="topScorer.photo"
            :alt="`${topScorer.name}`"
            class="rounded-full w-24 h-24"
          />
          <!-- <span class="text-xs font-bold"  >{{ topScorer.name }}</span> -->
        </div>
      </section>
      <section class="container mx-auto mt-20">
        <div>
          <div class="flex flex-row gap-4 mb-6">
            <IcPodium class="h-8" />
            <h2 class="text-xl font-bold mt-1">Top four scores of the week</h2>
          </div>
          <p>
            Watch them compite for the week’s prize on next Saturday’s face-off
          </p>
        </div>
        <div class=" grid grid-flow-cols grid-cols-3 gap-6">
          <FaceOffScorer v-for="scorer in topScorers" :key="scorer.id" :talent="topScorer" />
        </div>
      </section>
      <section class="container mx-auto mt-20">
        <div class="flex flex-row gap-4 mb-6">
          <IcScoreboard class="h-8" />
          <h2 class="text-xl font-bold">Scoreboard</h2>
        </div>
        <div class="md:container mx-auto mt-12">
          <div class="w-full flex pl-8 pr-2 md:pl-16 md:pr-0 py-3 text-xxs md:text-base">
            <div class="flex-1">Artist</div>
            <div class="w-36 md:w-48 text-right">Restaurant</div>
            <div class="w-32 md:w-48 text-right">Week Points</div>
            <div class="w-32 md:w-52 md:pr-16 text-right">Total Points</div>
          </div>
          <div>
            <CompetitionTalentListItem
              v-for="talent in competition.talent"
              :key="talent.talent.id"
              :talent="talent"
              :competition-id="competition.id"
              :style="{ order: scores.indexOf(talent.points, 0) }"
            />
          </div>
        </div>
      </section>
    </div>

    <section
      v-if="showSignupBtn"
      class="container mx-auto flex flex-col justify-center items-center mt-10 md:mt-20"
    >
      <h5 class="mb-4">Want to join this competition?</h5>
      <nuxt-link
        :to="{ name: 'events-id-join', params: { id: competition.id } }"
        class="uppercase border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-xl md:text-2xl text-center hover:text-light-white mt-1 focus:outline-none cursor-pointer"
      >
        Join {{ competition.name }}
      </nuxt-link>
    </section>

    <section v-if="competition.sponsors.length" class="container mx-auto mt-20">
      <div class="flex flex-row gap-4 items-start mb-6">
        <IcSponsor class="h-8" />
        <h2 class="text-xl font-bold">Sponsors</h2>
      </div>
      <div class="mt-5 px-12 md:px-32 grid grid-cols-3">
        <div v-for="sponsor in competition.sponsors" :key="sponsor.id">
          <img v-if="sponsor.logo" :src="sponsor.logo" :alt="`${sponsor.name} logo`" class="w-10" />
          <span class="text-xs font-bold">{{ sponsor.name }}</span>
        </div>
      </div>
    </section>
    <section v-if="showSignupBtn" class="container mx-auto mt-20 text-xs">
      <nuxt-link class="font-bold" :to="{ name: 'events-talents' }">
        Want to join the competition? Click here to learn more
      </nuxt-link>
    </section>
  </div>
</template>
<script>
import spacetime from 'spacetime'
import CompetitionTalentListItem from '@/components/competitions/CompetitionTalentListItem'
import IcTrophy from '@/assets/svg/trophy.svg?inline'
import IcPodium from '@/assets/svg/podium.svg?inline'
import IcSponsor from '@/assets/svg/sponsor.svg?inline'
import IcScoreboard from '@/assets/svg/scoreboard.svg?inline'

export default {
  name: 'EventDetailPage',

  auth: false,

  components: {
    CompetitionTalentListItem,
    IcTrophy,
    IcPodium,
    IcSponsor,
    IcScoreboard,
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
      prizesPercentage: 5,
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

    eventIsFuture() {
      return this.today < this.dateFrom
    },

    hasSponsors() {
      return this.competition.sponsors && this.competition.sponsors.length
    },

    currentRound() {
      return this.competition.rounds.filter(round => round.current)
    },

    scores() {
      let scores = []
      //TODO: find out why this array is being populated by numbers that it already has
      for (let i = 0; i < this.competition.talent.length; i++) {
        if (!scores[this.competition.talent[i].points]) {
          scores.push(this.competition.talent[i].points)
        }
      }
      scores.sort(function(a, b) {
        return b - a
      })
      return scores
    },

    grandPrizeStatus() {
      const totalPoints = this.scores.reduce((accumulator, current) => {
        return accumulator + current
      }, 0)
      const grandPrizeStatus = Math.floor((totalPoints / 100) * this.prizesPercentage)
      return grandPrizeStatus || 0
    },

    weekPrizeStatus() {
      return Math.floor((this.currentRound.round_points / 100) * this.prizesPercentage) || 0
    },

    showSignupBtn() {
      return this.currentRound < 3 || this.eventIsFuture
    },

    lastRound() {
      let lastRound = null
      if (this.currentRound.round > 1) {
        lastRound = this.competition.rounds.filter(
          round => round.round === this.currentRound.round - 1
        )
      }
      return lastRound
    },

    lastWeekWinner() {
      if (this.lastRound) {
        return this.lastRound.winners[0].competition_talent.talent
      } else {
        return null
      }
    },

    topScorer() {
      let topScore = 0
      let topScorer = null
      if (this.competition.talent.length) {
        for (let i = 0; i < this.competition.talent.length; i++) {
          if (this.competition.talent[i].points && this.competition.talent[i].points > topScore) {
            topScore = this.competition[i].points
            topScorer = this.competition.talent.find(talent => talent.points === topScore)
          }
        }
      }
      return topScorer
    },
  },
}
</script>
