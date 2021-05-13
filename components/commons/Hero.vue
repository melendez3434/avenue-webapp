<template>
  <div class="w-full relative">
    <img src="@/assets/images/hero.jpg" alt="man recording music on a studio" class="w-full" />
    <div class="absolute top-6 md:top-1/3 p-2 md:p-6 lg:p-10">
      <h1 class="font-bold text-lg md:text-3xl lg:text-6xl 3xl:text-7xl leading-none">
        Stream Live.
      </h1>
      <h1 class="font-bold text-lg md:text-3xl lg:text-6xl 3xl:text-7xl leading-none">
        Grow your following.
      </h1>
      <h1 class="font-bold text-lg md:text-3xl lg:text-6xl 3xl:text-7xl leading-none">
        Get payed.
      </h1>
      <div class="mt-6 md:mt-10 space-x-2 md:space-x-6">
        <button
          class="text-white font-semibold text-sm md:text-xl lg:text-2xl 3xl:text-3xl py-2 px-4 md:py-3 md:px-6 bg-theavenue-turquoise-neon transform scale-100 hover:scale-105"
          @click="openSignup()"
        >
          Start Watching
        </button>
        <button
          class="text-white font-semibold text-sm md:text-xl lg:text-2xl 3xl:text-3xl py-2 px-4 md:py-3 md:px-6 bg-theavenue-blue-neon transform scale-100 hover:scale-105"
        >
          <nuxt-link :to="{ name: 'performers' }">
            Start Performing
          </nuxt-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',

  auth: false,

  methods: {
    openSignup() {
      if (!this.$auth.user) {
        this.$modal.show('user-access-modal', { active: 'signup' })
      } else {
        this.modal.show('already-logged-modal')
      }
    },
  },
}
</script>
