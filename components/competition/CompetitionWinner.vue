<template>
  <section>
    <div class="mx-auto flex flex-no-wrap justify-items-center justify-center gap-6">
      <Confetti class="h-40" />
      <img :src="talent.talent.photo" alt="faceoff winner photo" class="h-40 rounded-full" />
      <Confetti class="h-40 transform scale-x-flip" />
    </div>
    <div class="mx-auto mt-6 font-bold text-center">
      <span>{{ talent.name }} Is The Winner Of {{ competitionName }}</span>
    </div>
  </section>
</template>

<script>
import Confetti from '@/assets/svg/confetti.svg?inline'
export default {
  name: 'CompetitionWinner',

  auth: false,

  components: { Confetti },

  props: {
    talent: {
      type: Object,
      default: () => ({}),
    },

    competitionName: {
      type: String,
      required: true,
    },
  },
}
</script>
