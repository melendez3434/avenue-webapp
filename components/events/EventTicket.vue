<template>
  <div>
    <button
      v-if="button && !ticket.authPurchased"
      type="button"
      class="font-library border-2 py-2 px-3 uppercase text-theavenue-red-neon text-light-red text-md md:text-2xl rounded-md border-theavenue-red-neon whitespace-no-wrap"
      style="box-shadow: 1px 1px 7px #FF2F2F;"
      @click="buyTicket"
    >
      BUY TICKET
    </button>
    <div
      v-if="!button"
      class="bg-black text-theavenue-green-neon font-library p-2 text-lg flex flex-col item-center justify-center cursor-pointer"
      @click="buyTicket"
    >
      <div :class="{ 'opacity-50': ticket.authPurchased }">
        <span>$</span>
        <span>{{ ticket.price_formated }}</span>
      </div>
      <div v-if="ticket.authPurchased" class="text-white text-xs uppercase mt-1">Purchased</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventTicket',

  props: {
    event: {
      type: Object,
      required: true,
    },

    button: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ticket() {
      return this.event.ticketDetails || {}
    },
  },

  methods: {
    buyTicket() {
      if (!this.$auth.user) {
        return this.$modal.show('user-access-modal', {
          active: 'login',
          title: this.event.talent.name,
          subtitle: 'Log in or sign up to buy the ticket for',
        })
      }

      if (this.ticket.authPurchased) return

      this.$modal.show('purchase-ticket-modal', {
        event: this.event,
      })
    },
  },
}
</script>
