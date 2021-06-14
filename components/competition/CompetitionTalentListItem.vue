<template>
  <Collapse>
    <template slot="header">
      <div class="w-full flex">
        <div class="flex-1 text-xxs md:text-xs lg:text-sm whitespace-no-wrap">
          {{ board.competition_talent.name }}
        </div>
        <div class="hidden md:block text-xxs md:text-xs lg:text-sm text-right ml-1 md:ml-0 flex-1">
          <font-awesome-icon :icon="['fas', 'external-link-alt']" />
          <a class="w-auto" :href="board.competition_talent.website" target="_blank">
            {{ board.competition_talent.business_name }}
          </a>
        </div>
        <div class="w-16 md:w-48 text-right text-xxs md:text-xs lg:text-sm">
          {{ points }}
        </div>
        <div class="w-16 md:w-48 text-right text-xxs md:text-xs md:pr-12 lg:text-sm">
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
            class="font-bold text-xs md:text-xs lg:text-sm"
          >
            {{ board.competition_talent.name }}
          </nuxt-link>
        </div>
        <span
          v-if="board.competition_talent.city && board.competition_talent.state"
          class="font-bold text-xs md:text-xs lg:text-sm text-right"
        >
          {{ board.competition_talent.city }}, {{ board.competition_talent.state }}
        </span>
      </div>
      <div v-if="pastPerformances.length || futurePerformances.length || livePerformances.length">
        <div v-if="livePerformances.length" class="mt-10">
          <p class="text-base md:text-lg lg:text-sm">Live performances</p>
          <div class="mt-5 md:grid md:grid-cols-3 lg:grid-cols-4 gap-5 h-42 lg:h-60">
            <CompetitionPerformance
              v-for="performance in livePerformances"
              :key="performance.id"
              :performance="performance"
              time="Live"
            />
          </div>
        </div>
        <div v-if="futurePerformances.length" class="mt-10">
          <p class="text-base md:text-lg">Future performances</p>
          <div class="mt-5 md:grid md:grid-cols-3 lg:grid-cols-4 gap-5 h-42 lg:h-60">
            <CompetitionPerformance
              v-for="performance in futurePerformances"
              :key="performance.id"
              :performance="performance"
              time="Future"
            />
          </div>
        </div>
        <div v-if="pastPerformances.length" class="mt-10">
          <p class="text-base md:text-lg">Past performances</p>
          <div class="mt-5 md:grid md:grid-cols-3 lg:grid-cols-4 gap-5 h-42 lg:h-60">
            <CompetitionPerformance
              v-for="performance in pastPerformances"
              :key="performance.id"
              :performance="performance"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <p class="mt-6 lg:text-sm">This artist hasn't streamed in the competition yet</p>
      </div>
      <div class="mt-14">
        <p v-if="talent.charities && talent.charities.length" class="font-bold mt-3">
          Charities this performer is contributing to:
          <a
            v-for="charity in talent.charities"
            :key="charity.charity_website"
            :href="charity.charity_website"
            target="_blank"
            class="font-normal"
          >
            <span v-if="talent.charities.length > 1">{{ charity.charity }}, &nbsp;</span>
            <span v-else>{{ charity.charity }}</span>
          </a>
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
  },
}
</script>
