<template>
  <section class="bg-avenue-blue-light p-6 h-80">
    <IcClose aria-role="button" aria-label="close" />
    <header>
      <h2>Stay Tuned!</h2>
      <p>This streaming is about to end but these events are live now</p>
    </header>
  </section>
</template>

<script>
import IcClose from '@/assets/svg/close.svg?inline'

export default {
  components: { IcClose },

  props: {
    events: {
      type: Array,
      default: null,
    },
  },
}
</script>
