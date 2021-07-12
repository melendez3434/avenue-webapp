<template>
  <section class="container mx-auto">
    <div v-if="$fetchState.pending">
      <BaseSpinner class="transform translate-y-2/4" />
    </div>
    <div v-else>
      <CompetitionWinner
        v-if="eventIsFinished"
        class="mt-8"
        :competition-name="competitionName"
        :talent="lastWeekWinner"
      />
      <div v-else>
        <div
          v-if="!lastWeekWinner && !topScorer"
          class="container md:grid grid-cols-3 gap-12 2xl:gap-24 mx-auto mt-12 lg:mt-20 container max-w-screen-2xl	"
        >
          <div class="flex flex-col items-center justify-center gap-6 col-start-1 mb-14 md:mb-0">
            <h4 class="font-league-gothic uppercase text-2xl lg:text-2xl xl:text-5xl text-center">
              Grand prize total
            </h4>
            <IcTrophy class="h-20 2xl:h-32" />
            <span class="text-5xl lg:text-6xl 2xl:text-8xl font-league-gothic ">
              {{ grandPrizeStatus || 0 }}
            </span>
          </div>
          <div
            class="flex flex-col items-center justify-center gap-6 mt-6 col-start-3 mb-14 md:mb-0"
          >
            <h4
              class="font-league-gothic uppercase text-2xl lg:text-2xl xl:text-5xl text-center xl:max-w-3/5"
            >
              Current Round's Prize Total
            </h4>
            <IcPodium class="h-20 xl:h-32" />
            <span class="text-4xl lg:text-5xl 2xl:text-7xl font-league-gothic ">
              {{ weekPrizeStatus || 0 }}
            </span>
          </div>
        </div>
        <div
          v-else-if="lastWeekWinner"
          class="container md:grid grid-cols-3 grid-rows-2 gap-12 2xl:gap-24 mx-auto mt-12 lg:mt-20 container max-w-screen-2xl	"
        >
          <div
            class="flex flex-col items-center justify-center gap-6 col-end-3 row-end-2 mb-14 md:mb-0"
          >
            <h4 class="font-league-gothic uppercase text-2xl lg:text-2xl xl:text-5xl text-center">
              Grand prize total
            </h4>
            <IcTrophy class="h-20 2xl:h-32" />
            <span class="text-5xl lg:text-6xl 2xl:text-8xl font-league-gothic ">
              {{ grandPrizeStatus || 0 }}
            </span>
          </div>
          <div
            class="col-start-2 flex flex-col items-center justify-center gap-6 mt-6 col-end-3 row-end-3 mb-14 md:mb-0"
          >
            <h4
              class="font-league-gothic uppercase text-2xl lg:text-2xl xl:text-5xl text-center xl:max-w-3/5"
            >
              Current Round's Prize Total
            </h4>
            <IcPodium class="h-20 xl:h-32" />
            <span class="text-4xl lg:text-5xl 2xl:text-7xl font-league-gothic ">
              {{ weekPrizeStatus || 0 }}
            </span>
          </div>
          <div
            class="flex flex-col items-center justify-center gap-6 md:mt-32 col-end-2 row-end-2 mb-14 md:mb-0"
          >
            <h4 class="font-league-gothic uppercase text-2xl lg:text-2xl xl:text-5xl">
              Last week's winner
            </h4>
            <img
              v-if="lastWeekWinner.competition_talent.talent.photo"
              :src="lastWeekWinner.competition_talent.talent.photo"
              :alt="lastWeekWinner.competition_talent.name"
              class="rounded-full w-24 h-24 2xl:h-32 2xl:w-32"
            />
            <div v-else class="w-24 h-24 rounded-full bg-gray-200" />
            <span class="xl:text-lg 2xl:text-xl font-bold">
              {{ lastWeekWinner.competition_talent.name }}
            </span>
          </div>
          <div
            v-if="topScorer"
            class="flex flex-col items-center justify-center gap-6 md:mt-32 col-end-4 row-end-2 mb-14 md:mb-0"
          >
            <h4 class="font-league-gothic uppercase text-2xl lg:text-2xl xl:text-5xl">
              Top scorer
            </h4>
            <img
              v-if="topScorer.talent.photo"
              :src="topScorer.talent.photo"
              :alt="`${topScorer.name}`"
              class="rounded-full w-24 h-24 2xl:h-32 2xl:w-32"
            />
            <div v-else class="w-24 h-24 rounded-full bg-gray-200" />
            <span class="xl:text-lg font-bold">{{ topScorer.name }}</span>
          </div>
        </div>
        <div
          v-else
          class="container flex flex-no-wrap flex-col lg:flex-row justify-between gap-12 mx-auto mt-12 max-w-screen-2xl	"
        >
          <div class=" flex flex-col items-center justify-between gap-6 mb-14 md:mb-0 lg:mt-10">
            <h4
              class="font-league-gothic uppercase text-2xl lg:text-3xl 2xl:text-5xl text-center xl:max-w-3/5"
            >
              Current Round's Prize Total
            </h4>
            <IcPodium class="h-20 2xl:h-32" />
            <span class="text-4xl lg:text-5xl font-league-gothic 2xl:text-7xl">
              {{ weekPrizeStatus || 0 }}
            </span>
          </div>
          <div class="flex flex-col items-center gap-10 mb-14 md:mb-0">
            <h4 class="font-league-gothic uppercase text-2xl lg:text-3xl 2xl:text-5xl text-center">
              Grand prize total
            </h4>
            <IcTrophy class="h-20 2xl:h-32" />
            <span class="text-4xl lg:text-5xl font-league-gothic 2xl:text-7xl ">
              {{ grandPrizeStatus || 0 }}
            </span>
          </div>
          <div
            v-if="topScorer"
            class="flex flex-col items-center space-y-10 lg:space-y-20 mb-14 md:mb-0 lg:mt-10 px-20 3xl:px-28"
          >
            <h4 class="font-league-gothic uppercase text-2xl lg:text-3xl 2xl:text-5xl">
              Top scorer
            </h4>
            <img
              v-if="topScorer.talent.photo"
              :src="topScorer.talent.photo"
              :alt="`${topScorer.name}`"
              class="rounded-full w-28 h-28 2xl:h-36 2xl:w-36"
            />
            <div v-else class="w-28 h-28 rounded-full bg-gray-200" />
            <span class="2xl:text-lg font-bold mb-3">{{ topScorer.name }}</span>
          </div>
        </div>
      </div>
      <section
        v-if="info.current_top_four_scorers.length && !eventIsFinished"
        class="container mx-auto mt-20"
      >
        <div>
          <div class="flex flex-row gap-4 mb-6">
            <IcPodium class="h-8" />
            <h2 v-if="isFaceOff" class="text-xl font-bold mt-1">
              Currently performing on week face-off
            </h2>
            <h2 v-else class="text-xl font-bold mt-1">Top four scores of the week</h2>
          </div>
          <p v-if="!isFaceOff">
            Watch them compete for the round prize on next Saturday’s face-off
          </p>
        </div>
        <div
          class=" md:grid grid-flow-cols grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-6 mt-6"
        >
          <CompetitionTalentCard
            v-for="scorer in info.current_top_four_scorers"
            :key="scorer.id"
            :points="isFaceOff ? null : scorer.points"
            :talent="scorer.competition_talent"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import IcTrophy from '@/assets/svg/trophy.svg?inline'
import IcPodium from '@/assets/svg/podium.svg?inline'

export default {
  name: 'CompetitionOverallInfo',

  components: {
    IcTrophy,
    IcPodium,
  },

  props: {
    isFaceOff: {
      type: Boolean,
      default: false,
    },

    competitionName: {
      type: String,
      default: null,
    },

    eventIsFinished: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      prizesPercentage: 5,
      info: {
        last_week_winners: [],
        general_top_scorer: {},
        current_top_four_scorers: [],
      },
    }
  },

  async fetch() {
    try {
      const { data } = await this.$api.competitions.overallInfo(this.$route.params.id)
      this.info = data
    } catch {
      console.error("We couldn't fetch the overall info")
    }
  },

  computed: {
    lastWeekWinner() {
      if (!this.info.last_week_winners) return null
      return this.info.last_week_winners.length ? this.info.last_week_winners[0] : null
    },

    topScorer() {
      return this.info.general_top_scorer
    },

    grandPrizeStatus() {
      return Math.round((this.info.grand_prize_status * this.prizesPercentage) / 100)
    },

    weekPrizeStatus() {
      return Math.round((this.info.weekly_prize_status * this.prizesPercentage) / 100)
    },
  },
}
</script>
