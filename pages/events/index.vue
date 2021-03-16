<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <div class="container mx-auto text-center mt-20">
      <div class="flex flex-col md:flex-row items-center justify-center w-full md:space-x-6">
        <h1 class="text-4xl font-library text-center text-avenue-white-light text-light-white">
          {{ currentCompetition.name }}
        </h1>
        <IcBread />
      </div>
      <h6 class="mt-5 text-lg">
        Four weeks competition featuring The Avenue’s top talent
      </h6>
      <h6 class="mt-5 text-xl font-bold leading-relaxed">
        A cooking competition supporting Black chefs and Black-owned restaurants. Vote for your
        favorite performers as they compete in our national competitions. Follow these artists on
        our performers’ scoreboard, tracking their progress and tallying up their contributions to
        charitable&nbsp;organizations.
      </h6>
    </div>
    <button
      class="mx-auto border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-10 focus:outline-none cursor-pointer"
      @click="handleSignup"
    >
      Sign up for {{ currentCompetition.name }}
    </button>
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

    <div class="container mx-auto mt-10">
      <section v-if="currentCompetition" class="flex flex-wrap justify-center items-center gap-6">
        <CompetitionListItem :competition="currentCompetition" />
      </section>
      <section v-else class="text-center">
        <p class="text-lg">There are no active events at the moment</p>
      </section>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CompetitionListItem from '@/components/competitions/CompetitionListItem'
import IcPodium from '@/assets/svg/podium.svg?inline'
import IcLoveHand from '@/assets/svg/love_hand.svg?inline'
import IcStars from '@/assets/svg/stars.svg?inline'
import IcBread from '@/assets/svg/bread.svg?inline'

export default {
  name: 'EventsPage',

  auth: false,

  components: {
    CompetitionListItem,
    IcPodium,
    IcLoveHand,
    IcStars,
    IcBread,
  },

  computed: {
    ...mapState({
      currentCompetition: state => state.global.currentCompetition,
    }),
  },

  methods: {
    handleSignup() {
      if (!this.$auth.user) {
        return this.$modal.show('not-logged-modal')
      } else if (this.$auth.loggedIn && !this.$auth.user.talent_id) {
        return this.$modal.show('not-talent-modal')
      }
      return this.$modal.show('join-event-modal', { competition: this.competition })
    },
  },
}
</script>
