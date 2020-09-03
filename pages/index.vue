<template>
  <div class="mx-auto flex-1 flex flex-col items-center justify-center text-avenue-white">
    <Navbar />
    IndexPage
  </div>
</template>

<script>
import Navbar from '@/components/commons/Navbar'

export default {
  name: 'IndexPage',

  auth: false,

  components: {
    Navbar,
  },
}
</script>
