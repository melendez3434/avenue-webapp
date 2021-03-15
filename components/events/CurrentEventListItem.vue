<template>
  <div>
    <nuxt-link
      :to="{ name: 'events' }"
      class="w-full bg-theavenue-white flex items-center justify-center font-league-gothic text-yellow-300 text-2xl md:text-6xl py-2 px-4 uppercase"
    >
      <p class="whitespace-no-wrap truncate max-w-xs lg:max-w-lg xl:max-w-none">
        {{ currentCompetition.name }}
      </p>
    </nuxt-link>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'CurrentEventListItem',

  computed: {
    ...mapState({
      currentCompetition: state => state.global.currentCompetition,
    }),
  },
}
</script>
