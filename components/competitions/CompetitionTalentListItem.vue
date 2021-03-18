<template>
  <Collapse>
    <template slot="header">
      <div class="w-full flex">
        <div class="flex-1 text-xxs md:text-xs">{{ talent.name }}</div>
        <a
          class="w-48 text-xxs md:text-xs text-right ml-1 md:ml-0"
          :href="talent.website"
          target="_blank"
        >
          {{ talent.business_name }}
        </a>

        <!-- TODO: Weekly points -->
        <div class="w-48 text-right text-xxs md:text-xs">{{ talent.points }}</div>
        <!-- TODO: Total points -->
        <div class="w-48 text-right text-xxs md:text-xs md:pr-12">{{ talent.points }}</div>
      </div>
    </template>
    <div class="px-2 pb-2 md:px-12 md:pb-12">
      <div class="w-full flex items-center justify-between">
        <div class="flex space-x-3 items-center">
          <img
            v-if="talent.talent.photo"
            :src="talent.talent.photo"
            :alt="`${talent.name}`"
            class="w-10 h-10 rounded-full"
          />
          <!-- TODO: Nuxt link not working for some reason -->
          <nuxt-link
            :to="{ name: 'artist-id', params: { id: talent.talent.id } }"
            class="font-bold text-xs md:text-xs"
          >
            {{ talent.name }}
          </nuxt-link>
        </div>
        <span class="font-bold text-xs md:text-xs text-right">
          {{ talent.city }}, {{ talent.state }}
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
        <p class="font-bold">
          Prizes:
          <span class="font-normal" />
        </p>
        <p class="font-bold mt-3">
          Charities this performer is contributing to:
          <a
            v-for="charity in talent.rounds"
            :key="charity.charity_website"
            :href="charity.charity_website"
            target="_blank"
            class="font-normal"
          >
            {{ charity.charity }},
          </a>
        </p>
      </div>

      <div class="mt-10 flex items-center justify-center w-full">
        <ShareButton />
      </div>
    </div>
  </Collapse>
</template>
<script>
import Collapse from '@/components/commons/ui/Collapse'
import EventThumbnail from '@/components/events/EventThumbnail'
import ShareButton from '@/components/commons/ui/ShareButton'

export default {
  name: 'CompetitionTalentListItem',

  components: {
    Collapse,
    EventThumbnail,
    ShareButton,
  },

  props: {
    talent: {
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

  async fetchPastPerformances() {
    try {
      const { past } = await this.$api.events.list({
        talent: this.talent.talent.id,
        past: true,
        competition: this.competitionId,
      })
      const { future } = await this.$api.events.list({
        talent: this.talent.talent.id,
        past: false,
        competition: this.competitionId,
      })
      this.pastPerformances = past
      this.futurePerformances = future
    } catch {
      console.error("We couldn't fetch this events")
    }
  },
}
</script>
