<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <div class="container mx-auto text-center mt-20">
      <h1 class="text-4xl">Events</h1>
      <h2 class="mt-5 text-lg">
        Cheer for your favorite chef, help them win the price and s, help charity organizations!
      </h2>
      <h3 class="mt-5 text-lg">Five weeks competitions featuring The Avenue’s best talents</h3>
    </div>

    <div class="container mx-auto mt-20">
      <section v-if="competitions.length" class="grid grid-cols-3 gap-6">
        <CompetitionListItem
          v-for="competition in competitions"
          :key="competition.id"
          :competition="competition"
          class="border border-theavenue-yellow-neon px-10 py-5 rounded-lg"
        />
      </section>
      <section v-else class="text-center">
        <p class="text-lg">There are no active events at the moment</p>
      </section>
    </div>
  </div>
</template>
<script>
import CompetitionListItem from '@/components/competitions/CompetitionListItem'

export default {
  name: 'EventsPage',

  auth: false,

  components: {
    CompetitionListItem,
  },

  async fetch() {
    try {
      const { data } = await this.$api.competitions.list()
      this.competitions = data
    } catch (error) {
      console.error("Couldn't fetch events")
    }
  },

  data() {
    return {
      competitions: [],
    }
  },
}
</script>
