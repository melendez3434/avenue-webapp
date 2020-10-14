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
          class="font-library bg-theavenue-black px-5 py-2 rounded text-2xl text-theavenue-gray"
          @click="donation.amount = 200"
        >
          $2.00
        </button>
        <button
          class="font-library bg-theavenue-black px-5 py-2 rounded text-2xl text-theavenue-gray"
          @click="donation.amount = 500"
        >
          $5.00
        </button>
        <button
          class="font-library bg-theavenue-black px-5 py-2 rounded text-2xl text-theavenue-gray"
          @click="donation.amount = 1000"
        >
          $10.00
        </button>
        <button
          class="font-library bg-theavenue-black px-5 py-2 rounded text-2xl text-theavenue-gray"
          @click="donation.amount = 2000"
        >
          $20.00
        </button>
      </div>

      <div class="w-full mt-3">
        <label for="custom_amount" class="block leading-tight text-white">
          Enter Custom Amount
        </label>
        <R64Input
          v-model="donation.amount"
          class="font-library"
          placeholder="$ 0000.00"
          base-class="leading-snug text-5xl text-center outline-none mt-1 px-3 py-2 block w-full text-avenue-white bg-theavenue-background-dark rounded-md focus:shadow-outline-white focus:border-white"
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
    }
  },

  methods: {
    createDonation(e) {
      e.preventDefault()
      console.log('create donation')
    },
  },
}
</script>
