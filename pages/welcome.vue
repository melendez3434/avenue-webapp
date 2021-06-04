<template>
  <base-spinner v-if="!storeInitialized" class="transform translate-y-2/4" />
  <div
    v-else
    class="available-min-height bg-avenue-blue-light flex flex-col md:flex-row  items-center justify-center"
  >
    <div class="px-24 py-8 text-center flex flex-col items-center">
      <p class="text-3xl font-bold">Welcome to The Avenue!</p>
      <p class="mt-8 text-lg font-bold">The Avenue hosts virtual competitions now!</p>
      <p class="mt-8 text-lg font-bold">
        Do you want to join a competition?
      </p>
    </div>
    <section class="container mx-8 mt-10">
      <div class="flex flex-col xl:grid xl:grid-cols-2 justify-center items-center gap-6">
        <CompetitionListItem
          v-for="competition in competitions"
          :key="competition.id"
          :competition="competition"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'WelcomePage',

  computed: {
    ...mapState({
      competitions: state => state.global.competitions,
      storeInitialized: state => state.global.storeInitialized,
    }),
  },

  created() {
    const backToCompetition = localStorage.getItem('backToCompetition')
    const competition = JSON.parse(localStorage.getItem('currentCompetition'))

    if (backToCompetition) {
      this.$modal.show('join-event-modal', { competition })
      localStorage.removeItem('currentCompetition')
      localStorage.removeItem('currentCompetition')
      this.$router.push('/')
    }
  },
}
</script>
