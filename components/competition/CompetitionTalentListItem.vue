<template>
  <Collapse>
    <template slot="header">
      <div class="w-full flex">
        <div class="flex-1 text-xxs md:text-xs whitespace-no-wrap">
          {{ board.competition_talent.name }}
        </div>
        <a
          class="hidden md:block text-xxs md:text-xs text-right ml-1 md:ml-0 flex-1"
          :href="board.competition_talent.website"
          target="_blank"
        >
          {{ board.competition_talent.business_name }}
        </a>

        <!-- TODO: Weekly points -->
        <div class="w-16 md:w-48 text-right text-xxs md:text-xs">
          {{ board.points }}
        </div>
        <!-- TODO: Total points -->
        <div class="w-16 md:w-48 text-right text-xxs md:text-xs md:pr-12">
          {{ board.total_points }}
        </div>
      </div>
    </template>
    <div class="px-2 pb-2 md:px-12 md:pb-12">
      <div class="w-full flex items-center justify-between">
        <div class="flex space-x-3 items-center">
          <nuxt-link
            :to="{ name: 'artist-id', params: { id: board.competition_talent.talent.id } }"
          >
            <img
              v-if="board.competition_talent.talent.photo"
              :src="board.competition_talent.talent.photo"
              :alt="`${board.competition_talent.name}`"
              class="w-10 h-10 rounded-full"
            />
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'artist-id', params: { id: board.competition_talent.talent.id } }"
            class="font-bold text-xs md:text-xs"
          >
            {{ board.competition_talent.name }}
          </nuxt-link>
        </div>
        <span class="font-bold text-xs md:text-xs text-right">
          {{ board.competition_talent.city }}, {{ board.competition_talent.state }}
        </span>
      </div>

      <div v-if="futurePerformances.length" class="mt-10">
        <p class="text-base md:text-lg">Future performances</p>
        <div class="mt-5 md:grid grid-cols-4 gap-5">
          <div v-for="performance in futurePerformances" :key="performance.id" class="text-center">
            <EventThumbnail width="w-full border border-gray-600" height="h-32" />
            <span class="block mt-3 font-bold text-xs">{{ performance.name }}</span>
            <span class="block mt-3 text-xxs">{{ performance.starts_at }}</span>
          </div>
        </div>
      </div>

      <div v-if="futurePerformances.length || pastPerformances.length">
        <div v-if="pastPerformances.length" class="mt-10">
          <p class="text-base md:text-lg">Past performances</p>
          <div class="mt-5 md:grid grid-cols-4 gap-5">
            <div v-for="performance in pastPerformances" :key="performance.id" class="text-center">
              <EventThumbnail width="w-full" height="h-32" />
              <span class="block mt-3 font-bold text-xs">{{ performance.name }}</span>
              <span class="block mt-3 text-xxs">{{ performance.starts_at }}</span>
            </div>
          </div>
        </div>
        <div class="mt-10">
          <p v-if="board.competition_talent.talent.charities" class="font-bold mt-3">
            Charities this performer is contributing to:
            <a
              v-for="charity in board.competition_talent.talent.charities"
              :key="charity.charity_website"
              :href="charity.charity_website"
              target="_blank"
              class="font-normal"
            >
              {{ charity.charity }},
            </a>
          </p>
        </div>
      </div>

      <div v-else>
        <p class="mt-6">This artist hasn't streamed in the competition yet</p>
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
        past: false,
        competition: this.competitionId,
      })
      this.pastPerformances = past
      this.futurePerformances = future
    } catch {
      console.error("We couldn't fetch this information")
    }
  },
}
</script>
