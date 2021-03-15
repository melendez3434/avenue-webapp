<template>
  <div class="px-8 py-8 bg-avenue-blue-light text-center flex flex-col items-center">
    <IcClose
      class="cursor-pointer absolute top-4 right-4"
      aria-role="button"
      aria-label="close"
      @click="close"
    />
    <p class="text-3xl font-bold">Ups!</p>
    <p class="mt-8 text-lg font-bold">It seems that you haven’t signed up in The Avenue</p>
    <p class="my-5 text-lg px-6">
      You should also create a talent account after. That’s the only requirement to perform in
      {{ currentCompetition.name }}. If you already have an account just login.
    </p>
    <IcDish />
    <button
      class="mx-auto border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
      @click="$modal.show('user-access-modal', { active: 'signup' })"
    >
      Sign up
    </button>
    <button
      class="mx-auto border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
      @click="$modal.show('user-access-modal', { active: 'login' })"
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
  },
}
</script>
