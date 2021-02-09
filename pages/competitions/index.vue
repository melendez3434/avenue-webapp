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
      <section v-if="competitions.length" class="grid grid-cols-4 gap-6">
        <div
          v-for="competition in competitions"
          :key="competition.id"
          class="border border-theavenue-yellow-neon px-5 py-2 rounded-lg"
        >
          <!-- TODO: Icon from font awesome -->
          <p class="text-3xl text-center text-avenue-white-light">{{ competition.name }}</p>
          <p class="text-avenue-white text-sm text-center">{{ competition.description }}</p>
          <p class="mt-3 text-center">Join today!</p>
          <div class="mt-3 w-full flex items-center justify-center">
            <nuxt-link
              :to="{ name: 'competitions-id', params: { id: competition.id } }"
              class="uppercase text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
            >
              See event
            </nuxt-link>
          </div>
        </div>
      </section>
      <section v-else class="text-center">
        <p class="text-lg">There is no active events at the moment</p>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CompetitionsIndexPage',

  auth: false,

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
