<template>
  <div>
    <div class="px-6 pb-5 pt-10 bg-theavenue-background">
      <p class="text-sm leading-5">Make donation to</p>
      <p class="text-2xl leading-tight font-medium">{{ event }}</p>
    </div>
    <form class="mt-3 px-6 pb-10 pt-5" @submit.prevent="createDonation">
      <div class="mt-3">
        <R64Input v-model="donation.name" label="Name on Card" />
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
              type="button"
              class="text-xs bg-theavenue-background-light border border-theavenue-off-white text-theavenue-off-white px-2 py-0.5 rounded"
              @click="card = null"
            >
              Change card
            </button>
          </div>
        </div>
        <StripeInput v-else ref="stripe" @change="onStripeChange" />
      </div>

      <p class="text-theavenue-white text-md mt-5">Quick Select Amount</p>
      <div class="grid grid-cols-4 grid-rows-1 space-x-3 mt-3">
        <button
          v-for="(amount, key) in quickAmounts"
          :key="key"
          type="button"
          class="font-library bg-theavenue-black px-5 py-2 rounded text-2xl text-theavenue-gray"
          :class="{ 'text-theavenue-green-neon': activeAmount === amount.value }"
          @click="setQuickAmount(amount.value)"
        >
          {{ amount.label }}
        </button>
      </div>

      <div class="w-full mt-3">
        <label for="custom_amount" class="block leading-tight text-white">
          Enter Custom Amount
        </label>
        <R64Input
          v-model="customAmount"
          class="font-library"
          placeholder="$ 0000.00"
          base-class="leading-snug text-5xl text-center outline-none mt-1 px-3 py-2 block w-full bg-theavenue-background-dark rounded-md focus:shadow-outline-white focus:border-white"
          :class="{
            'text-theavenue-green-neon': customAmount !== '0000.00',
            ' text-avenue-white': customAmount === '0000.00',
          }"
          @input="setAmount($event)"
        />
      </div>

      <div v-if="error" class="mb-6 text-theavenue-red-neon text-center">{{ error }}</div>

      <div class="mt-8">
        <R64Button :disabled="$v.donation.$invalid && !error" full type="submit">Confirm</R64Button>
      </div>
    </form>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import StripeInput from '@/components/commons/ui/StripeInput'

export default {
  name: 'StreamingDonateModal',

  components: { StripeInput },

  props: {
    event: {
      type: String,
      default: '',
    },
    jar: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      donation: {
        name: '',
        card: '',
        amount: '',
        stripeValidated: false,
      },
      activeAmount: null,
      customAmount: '0000.00',
      quickAmounts: [
        { value: 200, label: '$2.00' },
        { value: 500, label: '$5.00' },
        { value: 1000, label: '$10.00' },
        { value: 2000, label: '$20.00' },
      ],
      card: null,
      error: null,
    }
  },

  computed: {
    isStripeCustomer() {
      return this.$auth.user.has_stripe_customer_id
    },
  },

  async created() {
    if (this.isStripeCustomer) {
      const { data } = await this.$api.global.stripeCard()
      this.card = data
    }
  },

  methods: {
    onStripeChange(event) {
      this.donation.stripeValidated = event.complete
    },

    async createDonation() {
      try {
        if (!this.isStripeCustomer) {
          const data = await this.$refs.stripe.createToken()
          await this.$api.global.stripe(data.token.id)
          // Update user
        } else if (!this.card) {
          const data = await this.$refs.stripe.createToken()
          await this.$api.global.updateStripe(data.token.id)
        }

        await this.$api.talent.tip({ tip_jar_id: this.jar, amount: this.donation.amount })

        // Update tip jar

        this.$modal.hide('streaming-donate-modal')
      } catch (e) {
        this.error = e.response.data.error
      }
    },

    setAmount(amount) {
      if (amount === '0000.00') return
      this.donation.amount = amount
      this.activeAmount = amount
    },

    setQuickAmount(amount) {
      this.setAmount(amount)
      this.customAmount = '0000.00'
    },
  },

  validations: {
    donation: {
      amount: { required },
      stripeValidated: {
        mustBeTrue(value) {
          if (this.card) return true
          return !!value
        },
      },
    },
  },
}
</script>
