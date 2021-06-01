<template>
  <div class="px-8 py-8 bg-avenue-blue-light text-center flex flex-col items-center">
    <IcClose
      class="cursor-pointer absolute top-4 right-4"
      aria-role="button"
      aria-label="close"
      @click="close"
    />
    <p class="text-3xl font-bold">Oops!</p>
    <p class="mt-8 text-lg font-bold">
      It seems that you aren't signed up for a talent account yet
    </p>
    <p class="my-5 text-lg px-6">
      You will need to be signed up for a talent account to compete
    </p>
    <IcTrophy class="h-28" />
    <button
      class="mx-auto my-4 border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white focus:outline-none cursor-pointer"
      @click="buttonActions('talent-signup-modal')"
    >
      Talent Sign-Up
    </button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import IcClose from '@/assets/svg/close.svg?inline'
import IcTrophy from '@/assets/svg/trophy.svg?inline'

export default {
  name: 'NotTalentModal',

  components: {
    IcTrophy,
    IcClose,
  },

  methods: {
    ...mapActions({
      setBackToCompetition: 'global/setBackToCompetition',
    }),

    close() {
      return this.$emit('close')
    },

    buttonActions(modal) {
      this.setBackToCompetition()
      this.$modal.hide('not-talent-modal')
      this.$modal.show(modal)
    },
  },
}
</script>
