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
    handleSignup() {
      if (!this.$auth.user) {
        return this.$modal.show('not-logged-modal')
      } else if (this.$auth.loggedIn && !this.$auth.user.talent_id) {
        return this.$modal.show('not-talent-modal')
      }
      return this.$modal.show('join-event-modal', { competition: this.competition })
    },
  },
}
</script>
