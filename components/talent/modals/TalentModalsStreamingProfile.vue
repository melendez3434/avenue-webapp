<template>
  <div class="p-10 text-center">
    <IcClose
      class="cursor-pointer absolute top-4 right-4"
      aria-role="button"
      aria-label="close"
      @click="close"
    />
    <p class="text-theavenue-white font-bold mb-2 text-lg">
      Would you like to set up a streaming profile and Stripe account?
    </p>
    <p>
      Setting up a profile now allows you to stream, join a competition, and get paid. Set up your
      profile using an account where you want your tips directed. You can set up your profile later,
      but will need it to stream or join a competition.
    </p>
    <div class="mt-6 flex flex-col justify-center">
      <p class="text-sm">
        <a href="https://stripe.com/" target="_blank" class="underline">Stripe</a>
        is a worldwide trusted payment service.
      </p>
      <a href="https://stripe.com/" target="_blank" class="my-2 mx-auto">
        <IcStripe class="w-40 fill-current text-white" />
      </a>
    </div>
    <div class="w-full flex items-center justify-between space-x-6 mt-5">
      <R64Button class="w-1/2" secondary @click="handleNo">Not Now</R64Button>
      <R64Button
        class="w-1/2"
        primary-class="bg-theavenue-gray text-theavenue-white"
        @click="handleYes"
      >
        Yes
      </R64Button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import IcStripe from '@/assets/svg/stripe.svg?inline'
import IcClose from '@/assets/svg/close.svg?inline'

export default {
  name: 'TalentModalsStreamingProfile',

  components: { IcStripe, IcClose },

  computed: {
    ...mapState({
      backToCompetitionSignup: state => state.global.backToCompetitionSignup,
      currentCompetition: state => state.global.currentCompetition,
    }),
  },

  methods: {
    handleNo() {
      this.$modal.hide('streaming-profile-modal')
    },

    handleYes() {
      this.$modal.hide('streaming-profile-modal')
      this.$modal.show('talent-signup-modal')
    },

    close() {
      this.$emit('close')
    },
  },
}
</script>
