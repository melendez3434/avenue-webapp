<template>
  <div>
    <div v-if="$fetchState.pending">
      <base-spinner class="transform translate-y-2/4" />
    </div>
    <section v-else>
      <div
        v-if="topScorer && lastWeekWinner"
        class="md:grid grid-cols-3 grid-rows-2 gap-12 mx-auto mt-12 container"
      >
        <div class="flex flex-col items-center justify-center gap-6 col-end-3 row-end-2">
          <h4 class="font-league-gothic uppercase text-2xl lg:text-3xl">
            Grand prize total
          </h4>
          <IcTrophy class="h-20" />
          <span class="text-4xl lg:text-5xl font-league-gothic ">
            {{ info.grand_prize_status }}
          </span>
        </div>
        <div
          class="col-start-2 flex flex-col items-center justify-center gap-6 mt-6 col-end-3 row-end-3"
        >
          <h4 class="font-league-gothic uppercase text-2xl lg:text-3xl">
            Current Round's Prize Total
          </h4>
          <IcPodium class="h-20" />
          <span class="text-4xl lg:text-5xl font-league-gothic">
            {{ info.weekly_prize_status }}
          </span>
        </div>
        <div class="flex flex-col items-center justify-center gap-6 md:mt-32 col-end-2 row-end-2">
          <h4 class="font-league-gothic uppercase text-2xl lg:text-3xl">
            Last week's winner
          </h4>
          <img
            v-if="lastWeekWinner.competition_talent.talent.photo"
            :src="lastWeekWinner.competition_talent.talent.photo"
            :alt="lastWeekWinner.competition_talent.name"
            class="rounded-full w-24 h-24"
          />
          <span class="text-xs font-bold">
            {{ lastWeekWinner.competition_talent.name }}
          </span>
        </div>
        <div class="flex flex-col items-center justify-center gap-6 md:mt-32 col-end-4 row-end-2">
          <h4 class="font-league-gothic uppercase text-2xl lg:text-3xl">
            Top scorer
          </h4>
          <img
            v-if="topScorer.competition_talent.talent.photo"
            :src="topScorer.competition_talent.talent.photo"
            :alt="`${topScorer.competition_talent.name}`"
            class="rounded-full w-24 h-24"
          />
          <span class="text-xs font-bold">{{ topScorer.competition_talent.name }}</span>
        </div>
      </div>
      <div
        v-if="!lastWeekWinner"
        class="flex flex-no-wrap flex-col lg:flex-row justify-between gap-12 mx-auto mt-12 container max-w-screen-lg"
      >
        <div class=" flex flex-col items-center justify-between gap-6">
          <h4 class="font-league-gothic uppercase text-2xl lg:text-3xl">
            Current Round's Prize Total
          </h4>
          <IcPodium class="h-20" />
          <span class="text-4xl lg:text-5xl font-league-gothic">
            {{ info.weekly_prize_status }}
          </span>
        </div>
        <div class="flex flex-col items-center justify-between gap-6">
          <h4 class="font-league-gothic uppercase text-2xl lg:text-3xl">
            Grand prize total
          </h4>
          <IcTrophy class="h-20" />
          <span class="text-4xl lg:text-5xl font-league-gothic ">
            {{ info.grand_prize_status }}
          </span>
        </div>
        <div v-if="topScorer" class="flex flex-col items-center justify-between gap-3">
          <h4 class="font-league-gothic uppercase text-2xl lg:text-3xl">
            Top scorer
          </h4>
          <img
            v-if="topScorer.competition_talent.talent.photo"
            :src="topScorer.competition_talent.talent.photo"
            :alt="`${topScorer.competition_talent.name}`"
            class="rounded-full w-24 h-24"
          />
          <span class="text-xs font-bold">{{ topScorer.competition_talent.name }}</span>
        </div>
      </div>
    </section>
    <section v-if="info.current_top_four_scorers.length" class="container mx-auto mt-20">
      <div>
        <div class="flex flex-row gap-4 mb-6">
          <IcPodium class="h-8" />
          <h2 class="text-xl font-bold mt-1">Top four scores of the week</h2>
        </div>
        <p>
          Watch them compite for the round prize on next Saturday’s face-off
        </p>
      </div>
      <div class=" md:grid grid-flow-cols grid-cols-3 gap-6 mt-6">
        <CompetitionTalentCard
          v-for="scorer in info.current_top_four_scorers"
          :key="scorer.id"
          is-faceoff
          :talent="scorer.competition_talent"
        />
      </div>
    </section>
  </div>
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

  data() {
    return {
      info: {
        last_week_winners: [],
        general_top_scorers: [],
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
      return this.info.last_week_winners.length ? this.info.last_week_winners[0] : null
    },

    topScorer() {
      return this.info.general_top_scorers.length ? this.info.general_top_scorers[0] : null
    },
  },
}
</script>
