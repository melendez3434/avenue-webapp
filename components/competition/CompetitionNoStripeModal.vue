<template>
  <div class="px-8 py-8 bg-avenue-blue-light text-center flex flex-col items-center">
    <IcClose
      class="cursor-pointer absolute top-4 right-4"
      aria-role="button"
      aria-label="close"
      @click="close"
    />
    <p class="text-3xl font-bold">Oops!</p>
    <p class="mt-8 text-lg font-bold">It seems that you haven't completed your Stripe account</p>
    <p class="my-5 text-lg px-6">
      You need to do so to get paid for your earnings in the competition. Notice we will never
      charge you anything.
      <a href="https://stripe.com/" target="_blank">Stripe</a>
      is a worldwide trusted payment service.
    </p>
    <div class="flex space-x-4">
      <button
        class="mx-auto my-4 border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white focus:outline-none cursor-pointer"
        @click="completeStripe"
      >
        Complete
      </button>
      <button
        class="mx-auto border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
        @click="close"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import IcClose from '@/assets/svg/close.svg?inline'

export default {
  name: 'CompetitionNoStripeModal',

  components: {
    IcClose,
  },

  methods: {
    close() {
      return this.$emit('close')
    },

    buttonActions(modal, params) {
      this.$modal.hide('not-logged-modal')
      this.$modal.show(modal, params)
    },

    async completeStripe() {
      const { data: url } = await this.$api.talent.stripeAuthorize(this.$auth.user.talent_id)
      window.location.href = url
    },
  },
}
</script>
