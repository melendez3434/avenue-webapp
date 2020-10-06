<template>
  <div class="min-h-screen bg-avenue-black text-white">
    <Navbar />
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
