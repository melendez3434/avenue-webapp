<template>
  <div>
    <div class="px-6 pb-5 pt-10 bg-theavenue-background flex items-center justify-between">
      <p class="leading-5 text-xl font-bold">Buy a ticket for {{ event.name }}</p>
      <button type="button" @click="$modal.hide('purchase-ticket-modal')">
        <IcClose aria-role="button" aria-label="close" />
      </button>
    </div>

    <StripeLogos />

    <form class="mt-3 px-6 pb-10 pt-2" @submit.prevent="buyTicket">
      <StripeCard
        ref="stripe"
        :stripe-validated.sync="stripeValidated"
        @cardOnFile="cardOnFile = $event"
      />

      <div v-if="error" class="mb-6 text-theavenue-red-neon text-center">{{ error }}</div>
      <div class="font-bold text-theavenue-green-neon">
        ${{ event.ticketDetails.total_cost_formatted }}
      </div>
      <div class="text-sm">
        <span>The total includes processing fees of</span>
        <span>${{ event.ticketDetails.fees_formatted }}</span>
        <span>added to the ticket price of</span>
        <span>${{ event.ticketDetails.price_formatted }}.</span>
      </div>
      <div class="mt-8">
        <R64Button :disabled="$v.$invalid && !error" full type="submit" :loading="busy">
          Confirm
        </R64Button>
        <button
          class="text-sm mt-5 underline text-theavenue-white w-full bg-transparent"
          type="button"
          @click="$modal.hide('purchase-ticket-modal')"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import IcClose from '@/assets/svg/close.svg?inline'

export default {
  name: 'EventModalsPurchaseTicket',

  components: { IcClose },

  props: {
    event: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      stripeValidated: false,
      cardOnFile: null,
      error: null,
      busy: false,
    }
  },

  methods: {
    async buyTicket() {
      try {
        this.busy = true
        await this.$refs.stripe.updateCard()
        await this.$api.events.buyTicket(this.event.id)
        this.busy = false
        this.$emit('ticketPurchased')
        this.$modal.hide('purchase-ticket-modal')
      } catch (e) {
        this.error = "Couldn't make the purchase. Please try again"
        this.busy = false
      }
    },
  },

  validations: {
    stripeValidated: {
      mustBeTrue(value) {
        if (this.cardOnFile) return true
        return !!value
      },
    },
  },
}
</script>
