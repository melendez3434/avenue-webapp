<template>
  <div class="min-h-screen bg-avenue-black text-white">
    <Navbar />

    <div class="container mx-auto mt-5 flex items-center space-x-8">
      <nuxt-link :to="{ name: 'index' }" class="text-3xl text-avenue-grey">Live</nuxt-link>
      <nuxt-link :to="{ name: 'upcoming' }" class="text-3xl text-avenue-grey">
        Upcoming
      </nuxt-link>
    </div>

    <nuxt />
  </div>
</template>

<script>
import Navbar from '@/components/commons/Navbar'

export default {
  name: 'DefaultLayout',

  components: {
    Navbar,
  },
}
</script>
<style>
.nuxt-link-exact-active {
  @apply text-avenue-white-light;
}
</style>
