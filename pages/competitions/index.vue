<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <div class="container mx-auto text-center">
      <h1 class="text-4xl mt-10">Events</h1>
      <h2 class="mt-3 text-lg">
        Join the competition, help charity organizations and win the price!
        <br />
        Five weeks competitions featuring The Avenue’s best talents
      </h2>
    </div>

    <div class="container mx-auto mt-10">
      <section v-if="competitions.length" class="grid grid-cols-3 gap-6">
        <CompetitionListItem
          v-for="competition in competitions"
          :key="competition.id"
          :competition="competition"
          class="border border-theavenue-yellow-neon px-10 py-5 rounded-lg"
        />
      </section>
      <section v-else class="text-center">
        <p class="text-lg">There is no active events at the moment</p>
      </section>
    </div>
  </div>
</template>
<script>
import CompetitionListItem from '@/components/competitions/CompetitionListItem'

export default {
  name: 'CompetitionsIndexPage',

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
