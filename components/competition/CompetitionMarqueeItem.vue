<template>
  <div>
    <nuxt-link
      :to="{ name: 'events-id', params: { id: competition.id } }"
      class="w-full bg-theavenue-white flex items-center justify-center font-league-gothic text-black text-2xl md:text-6xl py-2 px-4 uppercase"
    >
      <CompetitionIcon v-if="competition.icon" :icon="competition.icon" class="mr-4" />
      <p class="whitespace-no-wrap truncate max-w-xs lg:max-w-lg xl:max-w-none">
        {{ competition.name }}
      </p>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'CompetitionMarqueeItem',

  props: {
    competition: {
      type: Object,
      required: true,
    },
  },
}
</script>
