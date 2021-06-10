<template>
  <div
    class="border border-theavenue-yellow-neon rounded-lg p-6 flex flex-col mb-4 md:mb-0 w-full"
    style="box-shadow: 0px 0px 10px rgba(255, 210, 67);"
  >
    <div class="flex items-center mb-4">
      <nuxt-link :to="{ name: 'artist-id', params: { id: talent.id } }" class="font-bold">
        <img
          v-if="talent.photo"
          :src="talent.photo"
          :alt="`${talent.name}`"
          class="rounded-full w-12 h-12 mr-4"
        />
        <div v-else class="bg-gray-300 rounded-full w-12 h-12 mr-4" />
      </nuxt-link>
      <nuxt-link :to="{ name: 'artist-id', params: { id: talent.id } }" class="font-bold">
        {{ talent.name }}
      </nuxt-link>
    </div>
    <blockquote class="italic h-12 overflow-hidden">{{ talent.motivation }}...</blockquote>
    <span
      v-if="isFaceoff"
      class="mt-3 font-league-gothic uppercase text-lg justify-self-center text-center tracking-wider"
    >
      {{ talent.points }} points
    </span>
  </div>
</template>

<script>
export default {
  name: 'CompetitionTalentCard',

  props: {
    talent: {
      type: Object,
      default: () => ({}),
    },

    isFaceoff: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
