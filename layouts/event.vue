<template>
  <div class="min-h-screen bg-avenue-black text-white w-full">
    <Navbar />
    <div>
      <nuxt />
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/commons/Navbar'

export default {
  name: 'EventDetail',

  components: {
    Navbar,
  },
}
</script>
