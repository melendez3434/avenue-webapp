<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <LogoLights class="w-full" />
    <div class="container mx-auto text-center mt-20">
      <h1 class="text-4xl font-bold">Events</h1>
      <h6 class="mt-5 text-lg font-bold">
        Vote for your favorite performers and show love for their art and the charities they support
      </h6>
      <h6 class="mt-5 text-lg font-bold">
        Five weeks competitions featuring The Avenue’s top talent
      </h6>
    </div>
    <section class="container mx-auto my-16 grid grid-cols-3 gap-6">
      <div class="flex flex-col items-center">
        <IcPodium class="h-40" />
        <p class="text-center mt-2 leading-8">
          Get to know the chefs in a pre-tournament where you’ll get 200 points to spend on them.
          These points will be added to the final score
        </p>
      </div>
      <div class="flex flex-col items-center">
        <IcLoveHand class="h-40" />
        <p class="text-center mt-2 leading-8">
          Contribute to charity with your tips every Monday. All the tips from that day’s
          performances will go to a charity of the performer’s choice
        </p>
      </div>
      <div class="flex flex-col items-center">
        <IcStars class="h-40" />
        <p class="text-center mt-2 leading-8">
          Tip their performances and help them be among the first four of each week to meet their
          competitors in a face-off on Saturdays, where they’ll cook their dish of the week. 1$ = 1
          point
        </p>
      </div>
    </section>

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
    <div v-if="$auth.loggedIn && $auth.user.talent_id">
      <nuxt-link :to="{ name: 'events-talents' }" class="font-bold mx-8">
        Want to join the competition? Click here to learn more
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import CompetitionListItem from '@/components/competitions/CompetitionListItem'
import IcPodium from '@/assets/svg/podium.svg?inline'
import IcLoveHand from '@/assets/svg/love_hand.svg?inline'
import IcStars from '@/assets/svg/stars.svg?inline'

export default {
  name: 'EventsPage',

  auth: false,

  components: {
    CompetitionListItem,
    IcPodium,
    IcLoveHand,
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
