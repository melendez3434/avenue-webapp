<template>
  <div>
    <div class="px-6 pb-5 pt-10 bg-theavenue-background flex items-center justify-between">
      <p class="leading-5 text-xl font-bold">Support {{ event }}</p>
      <button type="button" @click="$modal.hide('streaming-donate-modal')">
        <IcClose aria-role="button" aria-label="close" />
      </button>
    </div>

    <StripeLogos />

    <form class="mt-3 px-6 pb-10 pt-2" @submit.prevent="createDonation">
      <StripeCard
        ref="stripe"
        :stripe-validated.sync="donation.stripeValidated"
        @cardOnFile="cardOnFile = $event"
      />

      <p class="text-theavenue-white text-md mt-5">Quick Select Amount</p>
      <div
        class="grid lg:grid-cols-4 lg:grid-rows-1 grid-cols-2 grid-rows-2 lg:space-x-3 mt-3 gap-8"
      >
        <button
          v-for="(amount, key) in quickAmounts"
          :key="key"
          type="button"
          class="font-library bg-theavenue-black px-5 py-2 rounded text-2xl text-theavenue-gray w-full lg:w-auto"
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
            'text-theavenue-green-neon': isCustomAmountSet,
            ' text-avenue-white': !isCustomAmountSet,
          }"
          :v="$v.donation.amount"
          error-message="Minimum amount to donate is $1. Biggest is $100.000"
          @input="setAmount($event)"
        />
      </div>

      <div v-if="error" class="mb-6 text-theavenue-red-neon text-center">{{ error }}</div>

      <div class="mt-8">
        <R64Button :disabled="$v.donation.$invalid && !error" full type="submit" :loading="busy">
          Confirm
        </R64Button>
        <button
          class="text-sm mt-5 underline text-theavenue-white w-full bg-transparent"
          type="button"
          @click="$modal.hide('streaming-donate-modal')"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { required, minValue, maxValue } from 'vuelidate/lib/validators'
import IcClose from '@/assets/svg/close.svg?inline'

export default {
  name: 'TalentModalsStreamingDonate',

  components: { IcClose },

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
        amount: '',
        stripeValidated: false,
      },
      activeAmount: null,
      customAmount: '',
      quickAmounts: [
        { value: '200', label: '$2.00' },
        { value: '500', label: '$5.00' },
        { value: '1000', label: '$10.00' },
        { value: '2000', label: '$20.00' },
      ],
      cardOnFile: null,
      error: null,
      busy: false,
    }
  },

  computed: {
    isCustomAmountSet() {
      return this.customAmount.length
    },

    donationFormatted() {
      if (!this.isCustomAmountSet) {
        return this.donation.amount
      }

      const amountCleaned = this.donation.amount.replace(',', '')
      return amountCleaned * 100
    },
  },

  methods: {
    async createDonation() {
      try {
        this.busy = true
        await this.$refs.stripe.updateCard()
        await this.$api.talent.tip({ tip_jar_id: this.jar, amount: this.donationFormatted })
        this.busy = false
        this.$modal.hide('streaming-donate-modal')
      } catch (e) {
        console.log(e)
        this.error = "Couldn't make the donation. Please try again"
        this.busy = false
      }
    },

    setAmount(amount) {
      if (amount === '') return
      this.donation.amount = amount
      this.activeAmount = amount
    },

    setQuickAmount(amount) {
      this.setAmount(amount)
      this.customAmount = ''
    },
  },

  validations: {
    donation: {
      amount: { required, minValue: minValue(1), maxValue: maxValue(100000) },
      stripeValidated: {
        mustBeTrue(value) {
          if (this.cardOnFile) return true
          return !!value
        },
      },
    },
  },
}
</script>
