<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <div class="container mx-auto text-center mt-20">
      <h1 class="text-5xl font-bold">Events</h1>
      <h6 class="mt-5 text-lg">
        Five weeks competitions featuring The Avenue’s top talent
      </h6>
      <h6 class="mt-5 text-xl font-bold leading-relaxed">
        Vote for your favorite performers as they compete in our national competitions. Follow these
        artists on our performers’ scoreboard, tracking their progress and tallying up their
        contributions to charitable&nbsp;organizations.
      </h6>
    </div>
    <section class="container md:grid grid-cols-3 gap-6 mx-auto my-16">
      <div class="flex flex-col items-center mt-10">
        <IcPodium class="h-32" />
        <p class="text-center mt-2 leading-8">
          Get to know the sponsors as they stream live at our pre-tournament showcase. Attending
          competitors will earn an extra 200 points for supporting our sponsors!
        </p>
      </div>
      <div class="flex flex-col items-center mt-10">
        <IcLoveHand class="h-32" />
        <p class="text-center mt-2 leading-8">
          Participate in Charitable Monday, a day where all of the performers’ tips are donated to
          the charity of their choice!
        </p>
      </div>
      <div class="flex flex-col items-center mt-10">
        <IcStars class="h-28 mb-4" />
        <p class="text-center mt-2 leading-8">
          Tip the performers and help them lead the way each week! The top four performers each week
          will compete in a face-off each Saturday, where they’ll bring their best performance of
          the week. $1 = 1 point.
        </p>
      </div>
    </section>

    <div class="container mx-auto mt-20">
      <section v-if="competitions.length" class="flex flex-wrap justify-between gap-6">
        <CompetitionListItem
          v-for="competition in competitions"
          :key="competition.id"
          :competition="competition"
        />
      </section>
      <section v-else class="text-center">
        <p class="text-lg">There are no active events at the moment</p>
      </section>
    </div>
    <div v-if="$auth.loggedIn && $auth.user.talent_id" class="container mx-auto mt-20">
      <nuxt-link :to="{ name: 'events-talents' }" class="container font-bold text-xs">
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
