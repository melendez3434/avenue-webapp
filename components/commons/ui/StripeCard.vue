<template>
  <div>
    <div class="mt-3">
      <div v-if="loadingCardData" class="mb-10 text-gray-300">Loading Card ...</div>
      <R64Input v-else v-model="name" :disabled="loadingCardData" label="Name on Card" />
    </div>
    <div class="mt-3">
      <div v-if="card">
        <span>Credit Card</span>
        <div class="h-38px bg-theavenue-background-dark flex items-center justify-between px-3">
          <span>**** **** **** {{ card.last4 }}</span>
          <span>{{ card.exp_month }} / {{ card.exp_year }}</span>
        </div>
        <div class="w-full flex justify-end mt-2">
          <button
            v-if="!loadingCardData"
            type="button"
            class="text-xs bg-theavenue-background-light border border-theavenue-off-white text-theavenue-off-white px-2 py-0.5 rounded"
            @click="changeCard"
          >
            Change card
          </button>
        </div>
      </div>
      <StripeInput v-else-if="!loadingCardData" ref="stripe" @change="onStripeChange" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'StripeCard',

  props: {
    stripeValidated: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      card: null,
      name: '',
      loadingCardData: false,
    }
  },

  computed: {
    isStripeCustomer() {
      return this.$auth.user.has_stripe_customer_id
    },
  },

  async created() {
    if (this.isStripeCustomer) {
      await this.getCardData()
    }
  },

  methods: {
    async getCardData() {
      this.loadingCardData = true
      try {
        const { data } = await this.$api.global.stripeCard()
        if (!data) return
        this.card = data
        this.$emit('cardOnFile', data)
        this.name = data.name
        this.loadingCardData = false
      } catch (e) {
        console.error(e)
        this.loadingCardData = false
      }
    },

    changeCard() {
      this.card = null
      this.$emit('cardOnFile', null)
    },

    onStripeChange(event) {
      this.$emit('update:stripeValidated', event.complete)
    },

    async updateCard() {
      if (this.card) return

      const data = await this.$refs.stripe.createToken({ name: this.name })

      if (this.isStripeCustomer) {
        await this.$api.global.updateStripe(data.token.id)
      } else {
        await this.$api.global.stripe(data.token.id)
      }

      await this.$auth.fetchUser()
    },
  },
}
</script>
