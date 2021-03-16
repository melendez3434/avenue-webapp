<template>
  <div class="px-8 py-8 bg-avenue-blue-light text-center flex flex-col items-center">
    <IcClose
      class="cursor-pointer absolute top-4 right-4"
      aria-role="button"
      aria-label="close"
      @click="close"
    />
    <p class="text-3xl font-bold">Ups!</p>
    <p class="mt-8 text-lg font-bold">It seems that you aren't signed into The Avenue</p>
    <p class="my-5 text-lg px-6">
      If you already have an account, just log in! You will need to be signed up for a talent
      account to compete in {{ currentCompetition.name }}
    </p>
    <IcDish />
    <button
      class="mx-auto my-4 border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white focus:outline-none cursor-pointer"
      @click="buttonActions('user-access-modal', { active: 'signup' })"
    >
      Sign up
    </button>
    <button
      class="mx-auto border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
      @click="buttonActions('user-access-modal', { active: 'login' })"
    >
      Login
    </button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import IcDish from '@/assets/svg/dish.svg?inline'
import IcClose from '@/assets/svg/close.svg?inline'

export default {
  name: 'NotLoggedModal',

  components: {
    IcDish,
    IcClose,
  },

  computed: {
    ...mapState({
      currentCompetition: state => state.global.currentCompetition,
    }),
  },

  methods: {
    close() {
      return this.$emit('close')
    },

    buttonActions(modal) {
      this.$modal.hide('not-logged-modal')
      this.$modal.show(modal)
    },
  },
}
</script>
