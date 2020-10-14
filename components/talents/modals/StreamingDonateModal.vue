<template>
  <div>
    <div class="px-6 pb-5 pt-10 bg-theavenue-background">
      <p class="text-sm leading-5">Make donation to</p>
      <p class="text-2xl leading-tight font-medium">{{ event }}</p>
    </div>
    <form class="mt-3 px-6 pb-10 pt-5" @submit="createDonation">
      <div class="mt-3">
        <R64Input v-model="donation.name" label="Name on Card" />
      </div>
      <div class="mt-3">
        <R64Input v-model="donation.card" label="Credit Card" />
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

      <div class="mt-8">
        <R64Button full>Confirm</R64Button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'StreamingDonateModal',

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
      },
      activeAmount: null,
      customAmount: '0000.00',
      quickAmounts: [
        { value: 200, label: '$2.00' },
        { value: 500, label: '$5.00' },
        { value: 1000, label: '$10.00' },
        { value: 2000, label: '$20.00' },
      ],
    }
  },

  methods: {
    async createDonation(e) {
      e.preventDefault()
      await this.$api.talent.tip({ tip_jar_id: this.jar, amount: this.donation.amount })
      this.$modal.close('streaming-donate-modal')
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
}
</script>
