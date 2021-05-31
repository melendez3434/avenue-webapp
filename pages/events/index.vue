<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <section class="container mx-auto">
      <div class=" text-center mt-20">
        <div class="flex flex-col md:flex-row items-center justify-center w-full md:space-x-6">
          <h1 class="text-4xl font-library text-center text-avenue-white-light text-light-white">
            Competitions
          </h1>
        </div>
        <h2 class="mt-5 text-lg">
          Featuring The Avenue’s top talent
        </h2>
        <h3 class="mt-5 text-xl font-bold leading-relaxed">
          Vote for your favorite performers as they compete in our national competitions. Follow
          these artists on our performers’ scoreboard, tracking their progress and tallying up their
          contributions to charitable&nbsp;organizations.
        </h3>
      </div>
    </section>
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
      <section class="flex flex-wrap justify-center items-center gap-6">
        <CompetitionListItem
          v-for="competition in competitions"
          :key="competition.id"
          :competition="competition"
        />
      </section>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import IcPodium from '@/assets/svg/podium.svg?inline'
import IcLoveHand from '@/assets/svg/love_hand.svg?inline'
import IcStars from '@/assets/svg/stars.svg?inline'
import CompetitionListItem from '@/components/competition/CompetitionListItem.vue'

export default {
  name: 'EventsPage',

  auth: false,

  components: {
    CompetitionListItem,
    IcPodium,
    IcLoveHand,
    IcStars,
  },

  computed: {
    ...mapState({
      competitions: state => state.global.competitions,
    }),
  },

  middleware({ store, redirect }) {
    if (!store.state.global.competitions) {
      return redirect('/')
    }
  },
}
</script>
