<template>
  <Collapse>
    <template slot="header">
      <div class="w-full flex">
        <div class="flex-1 text-xxs md:text-xs lg:text-base whitespace-no-wrap">
          {{ board.competition_talent.name }}
        </div>
        <div
          class="hidden md:block text-xxs md:text-xs lg:text-base text-right ml-1 md:ml-0 flex-1"
        >
          <font-awesome-icon
            v-if="board.competition_talent.website"
            class="hidden md:inline-block"
            :icon="['fas', 'external-link-alt']"
          />
          <a class="w-auto" :href="board.competition_talent.website" target="_blank">
            {{ board.competition_talent.business_name || board.competition_talent.website }}
          </a>
        </div>
        <div class="w-16 md:w-48 text-right text-xxs md:text-xs lg:text-base">
          {{ points }}
        </div>
        <div class="w-16 md:w-48 text-right text-xxs md:text-xs md:pr-12 lg:text-base">
          {{ totalPoints }}
        </div>
      </div>
    </template>
    <div class="px-2 pb-2 md:px-12 md:pb-12">
      <div class="w-full flex items-center justify-between">
        <div class="flex space-x-2 lg:space-x-3 items-center">
          <nuxt-link
            :to="{ name: 'artist-id', params: { id: board.competition_talent.talent.id } }"
          >
            <img
              v-if="board.competition_talent.talent.photo"
              :src="board.competition_talent.talent.photo"
              :alt="`${board.competition_talent.name}`"
              class="w-10 h-10 rounded-full"
            />
            <div v-else class="bg-gray-300 rounded-full w-10 h-10" />
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'artist-id', params: { id: board.competition_talent.talent.id } }"
            class="font-bold text-xs md:text-xs lg:text-base"
          >
            {{ board.competition_talent.name }}
          </nuxt-link>
        </div>
        <span
          v-if="board.competition_talent.city && board.competition_talent.state"
          class="font-bold text-xs md:text-xs lg:text-base text-right"
        >
          {{ board.competition_talent.city }}, {{ board.competition_talent.state }}
        </span>
      </div>
      <div v-if="talent.motivation" class="my-6 text-lg leading-loose">
        <p>{{ talent.motivation }}</p>
      </div>
      <div v-if="pastPerformances.length || futurePerformances.length || livePerformances.length">
        <div v-if="livePerformances.length" class="mt-10">
          <p class="text-base md:text-lg font-bold">Live performances</p>
          <div
            class="mt-5 md:grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 h-42 lg:h-60 3xl:h-72"
          >
            <CompetitionPerformance
              v-for="performance in livePerformances"
              :key="performance.id"
              :performance="performance"
              live
            />
          </div>
        </div>
        <div v-if="futurePerformances.length" class="mt-10">
          <p class="text-base md:text-lg font-bold">Future performances</p>
          <div
            class="mt-5 md:grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 h-42 lg:h-60 3xl:h-72"
          >
            <CompetitionPerformance
              v-for="performance in futurePerformances"
              :key="performance.id"
              :performance="performance"
            />
          </div>
        </div>
        <div v-if="pastPerformances.length" class="mt-10">
          <p class="text-base md:text-lg font-bold">Past performances</p>
          <div
            class="mt-5 md:grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 h-42 lg:h-60 3xl:h-72"
          >
            <CompetitionPerformance
              v-for="performance in pastPerformances"
              :key="performance.id"
              :performance="performance"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <p class="mt-6 lg:text-base">{{ talent.name }} hasn't streamed in the competition yet</p>
      </div>
      <div class="mt-10">
        <p v-if="charities" class="mt-3">
          <span>{{ talent.name }} is contributing to</span>
          <!-- eslint-disable-next-line -->
          <span v-html="charities" />
        </p>
      </div>
      <div class="mt-10 flex items-center justify-center w-full space-x-6">
        <ShareButton />
        <FollowButton :talent="board.competition_talent.talent" />
      </div>
    </div>
  </Collapse>
</template>

<script>
export default {
  name: 'CompetitionTalentListItem',

  props: {
    board: {
      type: Object,
      default: () => ({}),
    },

    competitionId: {
      type: [String, Number],
      default: null,
      required: true,
    },
  },

  data() {
    return {
      futurePerformances: [],
      pastPerformances: [],
      livePerformances: [],
      talent: {},
    }
  },

  async fetch() {
    try {
      const { data: past } = await this.$api.events.list({
        talent: this.board.competition_talent.talent.id,
        past: true,
        competition: this.competitionId,
      })

      const { data: future } = await this.$api.events.list({
        talent: this.board.competition_talent.talent.id,
        upcoming: true,
        competition: this.competitionId,
      })

      const { data: live } = await this.$api.events.list({
        live: 1,
        talent: this.board.competition_talent.talent.id,
        competition: this.competitionId,
      })
      const { data: talent } = await this.$api.competitions.talent(
        this.competitionId,
        this.board.competition_talent.talent.id
      )
      this.talent = talent
      this.pastPerformances = past
      this.futurePerformances = future
      this.livePerformances = live
    } catch {
      console.error("We couldn't fetch this information")
    }
  },

  computed: {
    points() {
      return this.board.points || 0
    },

    totalPoints() {
      return this.board.total_points || 0
    },

    charities() {
      if (!this.talent.charities) return null
      if (!this.talent.charities.length) return null
      return this.talent.charities
        .map(
          charity =>
            `<a class="font-bold underline" href="${charity.charity_website}" target="_blank">${charity.charity}</a>`
        )
        .join(',')
    },
  },
}
</script>
