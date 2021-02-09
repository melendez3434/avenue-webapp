<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <section class="container mx-auto">
      <!-- TODO: Icon from font awesome -->
      <p class="text-3xl text-center text-avenue-white-light">{{ competition.name }}</p>
      <p class="text-avenue-white text-sm text-center">{{ competition.description }}</p>

      <!-- <div v-for="artist in talent"></div> -->
    </section>
  </div>
</template>
<script>
export default {
  name: 'CompetitionDetailPage',

  auth: false,

  async fetch() {
    try {
      const { data } = await this.$api.competitions.get(this.$route.params.id)
      console.log('data', data)
      this.competition = data
    } catch (error) {
      console.error("Couldn't fetch the event")
    }
  },

  data() {
    return {
      competition: {},
    }
  },
}
</script>
