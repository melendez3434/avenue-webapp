<template>
  <Collapse>
    <template slot="header">
      <div class="w-full flex">
        <div class="flex-1 text-xxs md:text-xs">{{ talent.name }}</div>
        <a class="w-48 text-xxs md:text-xs" :href="talent.website" target="_blank">
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
            :to="{ name: 'artist-id', params: { id: talent.id } }"
            class="font-bold text-xxs md:text-xs"
          >
            {{ talent.name }}
          </nuxt-link>
        </div>
        <span class="font-bold">{{ talent.city }}, {{ talent.state }}</span>
      </div>

      <div class="mt-10">
        <p class="text-base md:text-lg">Future performances</p>
        <div class="mt-5 md:grid grid-cols-4 gap-5">
          <div class="text-center">
            <EventThumbnail width="w-full border border-gray-600" height="h-32" />
            <span class="block mt-3 font-bold text-xs">Performance Name</span>
            <span class="block mt-3 text-xxs">Performance date</span>
          </div>
        </div>
      </div>

      <div class="mt-10">
        <p class="text-base md:text-lg">Past performances</p>
        <div class="mt-5 md:grid grid-cols-4 gap-5">
          <div class="text-center">
            <EventThumbnail width="w-full" height="h-32" />
            <span class="block mt-3 font-bold text-xs">Performance Name</span>
            <span class="block mt-3 text-xxs">Performance date</span>
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
  },
}
</script>
