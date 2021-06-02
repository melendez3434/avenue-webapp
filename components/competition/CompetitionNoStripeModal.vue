<template>
  <div class="px-8 py-8 bg-avenue-blue-light text-center flex flex-col items-center">
    <IcClose
      class="cursor-pointer absolute top-4 right-4"
      aria-role="button"
      aria-label="close"
      @click="close"
    />
    <div class="leading-relaxed">
      <p class="text-3xl font-bold">Oops!</p>
      <p class="mt-5 text-lg font-bold">
        It seems that you haven't completed your Stripe information
      </p>
      <p class="my-5 text-lg px-6">
        You need to do so to get paid for your earnings in the competition. Notice we will never
        charge you anything.
      </p>
      <p>
        <a href="https://stripe.com/" target="_blank" class="underline">Stripe</a>
        is a worldwide trusted payment service.
      </p>
    </div>
    <a href="https://stripe.com/" target="_blank" class="my-2">
      <IcStripe class="w-40 fill-current text-white" />
    </a>
    <div class="flex space-x-4 mt-4">
      <R64Button @click="completeStripe">
        Complete
      </R64Button>
      <R64Button @click="close">
        Cancel
      </R64Button>
    </div>
  </div>
</template>

<script>
import IcClose from '@/assets/svg/close.svg?inline'
import IcStripe from '@/assets/svg/stripe.svg?inline'

export default {
  name: 'CompetitionNoStripeModal',

  components: {
    IcClose,
    IcStripe,
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
