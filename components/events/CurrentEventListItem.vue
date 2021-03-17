<template>
  <div>
    <nuxt-link
      :to="{ name: 'events-id', params: { id: currentCompetition.id } }"
      class="w-full bg-theavenue-white flex items-center justify-center font-league-gothic text-black text-2xl md:text-6xl py-2 px-4 uppercase"
    >
      <IcBread class="w-12 h-12 mr-5" />
      <p class="whitespace-no-wrap truncate max-w-xs lg:max-w-lg xl:max-w-none">
        {{ currentCompetition.name }}
      </p>
    </nuxt-link>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import IcBread from '@/assets/svg/bread_black.svg?inline'

export default {
  name: 'CurrentEventListItem',

  components: { IcBread },

  computed: {
    ...mapState({
      currentCompetition: state => state.global.currentCompetition,
    }),
  },
}
</script>
