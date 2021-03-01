<template>
  <Collapse>
    <template slot="header">
      <div class="w-full flex">
        <div class="flex-1">{{ talent.name }}</div>
        <!-- TODO: Weekly points -->
        <div class="w-48 text-right">{{ talent.points }}</div>
        <!-- TODO: Total points -->
        <div class="w-48 text-right pr-12">{{ talent.points }}</div>
      </div>
    </template>
    <div class="px-12 pb-12">
      <div class="w-full flex items-center justify-between">
        <div class="flex space-x-3 items-center">
          <img
            v-if="talent.talent.photo"
            :src="talent.talent.photo"
            :alt="`${talent.name}`"
            class="w-10 h-10 rounded-full"
          />
          <nuxt-link :to="{ name: 'artist-id', params: { id: talent.id } }" class="font-bold">
            {{ talent.name }}
          </nuxt-link>
        </div>
        <a :href="talent.website" target="_blank">{{ talent.bussiness_name }}</a>
        <span class="font-bold">{{ talent.city }}, {{ talent.state }}</span>
      </div>

      <div class="mt-10">
        <p class="text-xl">Past performances</p>
        <div class="mt-5 grid grid-cols-4 gap-5">
          <div class="text-center">
            <EventThumbnail width="w-full" height="h-32" />
            <span class="block mt-3 font-bold text-xs">Performance Name</span>
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
          <!-- <a
            TODO: this is wrong
            v-for="charity in talent.rounds.charity"
            :key="charity.charity_website"
            :href="charity.charity_website"
            target="_blank"
            class="font-normal"
          >
            {{ charity.charity }}
          </a> -->
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
  },
}
</script>
