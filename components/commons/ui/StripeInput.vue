<template>
  <label class="block font-montserrat">
    <span>
      {{ label }}
    </span>
    <div
      id="card-element"
      class="leading-snug outline-none mt-1 px-3 py-2 block w-full text-avenue-white bg-theavenue-background-dark rounded-md focus:shadow-outline-white focus:border-white placeholder-avenue-white-light"
    />
  </label>
</template>

<script>
export default {
  name: 'StripeInput',

  props: {
    label: {
      type: String,
      default: 'Credit Card',
    },
  },

  data() {
    return {
      cardElement: null,
      elements: null,
      stripe: null,
    }
  },

  async mounted() {
    this.stripe = window.Stripe(this.$config.stripeKey)
    this.elements = this.stripe.elements()
    this.cardElement = this.elements.create('card', {
      style: {
        base: {
          color: '#888888',
          fontSize: '18px',
          fontStyle: 'normal',
          '::placeholder': {
            color: '#a0aec0',
          },
        },
      },
    })

    this.cardElement.mount('#card-element')

    this.cardElement.on('blur', () => this.$emit('blur'))
    this.cardElement.on('focus', () => this.$emit('focus'))
    this.cardElement.on('change', event => this.$emit('change', event))
  },

  beforeDestroy() {
    this.cardElement.unmount()
  },

  methods: {
    createToken() {
      return this.stripe.createToken(this.cardElement)
    },
  },
}
</script>
