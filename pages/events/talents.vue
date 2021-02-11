<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <div class="container mx-auto text-center mt-10">
      <h1 class="text-4xl">Events</h1>
      <h2 class="mt-3 text-lg">
        Join the competition, help charity organizations and win the price!
      </h2>

      <section class="mt-12">
        <div class="grid md:grid-cols-3 gap-6">
          <div>
            <IcPodium class="mx-auto h-40" />
            <p class="sm:px-12">Know your competitors in a pre-tournament first encounter</p>
          </div>
          <div>
            <IcDish class="mx-auto h-40" />
            <p class="sm:px-8">Prepare a star dish every week and engage your audience</p>
          </div>
          <div>
            <IcLoveHand class="mx-auto h-40" />
            <p class="sm:px-14">Help a charity of your choice every week</p>
          </div>
        </div>
        <div class="mt-12 grid grid-cols-2 gap-6 md:px-48">
          <div>
            <IcCake class="mx-auto h-40" />
            <p class="sm:px-6">Be among the first four each week to face your competitors</p>
          </div>
          <div>
            <IcStars class="mx-auto h-40" />
            <p class="sm:px-6">Win the price and taste the glory!</p>
          </div>
        </div>
      </section>
    </div>

    <div class="container mx-auto text-center mt-12 text-avenue-white-light">
      <p class="text-4xl">What are you waiting for?</p>
      <p class="mt-3 text-lg">
        Join an event now!
      </p>
    </div>

    <div class="container mx-auto mt-10">
      <section v-if="competitions.length" class="grid grid-cols-3 gap-6">
        <CompetitionListItem
          v-for="competition in competitions"
          :key="competition.id"
          :competition="competition"
          class="border border-theavenue-yellow-neon px-10 py-5 rounded-lg"
          is-talent
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
import IcPodium from '@/assets/svg/podium.svg?inline'
import IcDish from '@/assets/svg/dish.svg?inline'
import IcLoveHand from '@/assets/svg/love_hand.svg?inline'
import IcCake from '@/assets/svg/cake.svg?inline'
import IcStars from '@/assets/svg/stars.svg?inline'

export default {
  name: 'EventsTalentPage',

  auth: false,

  components: {
    CompetitionListItem,
    IcPodium,
    IcDish,
    IcLoveHand,
    IcCake,
    IcStars,
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
