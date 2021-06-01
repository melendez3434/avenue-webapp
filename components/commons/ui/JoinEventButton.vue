<template>
  <button
    class="mx-auto border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
    @click="handleSignup"
  >
    Sign up
    <span v-if="hasLongText">for {{ competition.name }}</span>
  </button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'JoinEventButton',

  props: {
    competition: {
      type: Object,
      default: () => ({}),
    },

    hasLongText: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    async handleSignup() {
      try {
        if (this.$auth.user && this.$auth.user.talent_id) {
          const alreadyRegistered = await this.competition.talent.find(
            t => t.talent.id === this.user.talent_id
          )
          if (alreadyRegistered) return this.$modal.show('already-signedup-modal')
        }

        this.setCurrentCompetition(this.competition)
        if (!this.$auth.user) return this.$modal.show('not-logged-modal')
        if (this.$auth.loggedIn && !this.$auth.user.talent_id) {
          return this.$modal.show('not-talent-modal')
        }
        if (this.$auth.user.talent_id && !this.$auth.user.has_stripe_customer_id) {
          return this.$modal.show('no-stripe-modal')
        }
        return this.$modal.show('join-event-modal', { competition: this.competition })
      } catch {
        console.error('There was an error on the JoinEventButton')
      }
    },

    ...mapActions({
      setCurrentCompetition: 'global/setCurrentCompetition',
    }),
  },
}
</script>
