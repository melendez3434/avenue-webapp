<template>
  <div class="min-h-screen bg-avenue-black">
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
