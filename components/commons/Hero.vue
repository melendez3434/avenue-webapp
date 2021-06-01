<template>
  <div class="w-full max-h-3/4 relative overflow-hidden">
    <img
      src="@/assets/images/hero.jpg"
      alt="man playing guitar on a stage"
      class="w-full h-full object-cover"
    />
    <div class="absolute top-6 sm:top-1/3 p-2 md:p-6 ">
      <h1 class="font-bold text-lg md:text-3xl lg:text-6xl 3xl:text-7xl leading-none">
        Stream Live.
      </h1>
      <h1 class="font-bold text-lg md:text-3xl lg:text-6xl 3xl:text-7xl leading-none">
        Grow your following.
      </h1>
      <h1 class="font-bold text-lg md:text-3xl lg:text-6xl 3xl:text-7xl leading-none">
        Get paid.
      </h1>
      <div class="mt-6 md:mt-10 space-x-2 md:space-x-6">
        <button
          class="text-white font-semibold text-sm md:text-xl lg:text-2xl 3xl:text-3xl py-2 px-4 md:py-3 md:px-6 bg-theavenue-turquoise-neon transform scale-100 hover:scale-105"
          @click="startWatching"
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
    startWatching() {
      !this.$auth.user
        ? this.$modal.show('user-access-modal', { active: 'signup' })
        : this.$emit('scroll')
    },
  },
}
</script>
