<template>
  <div class="flex mb-4 md:mb-12 justify-center">
    <transition name="component-fade" mode="in-out">
      <Lights1 v-if="currentLight === 1" class="h-full w-full" />
      <Lights2 v-if="currentLight === 2" class="h-full w-full" />
      <Lights3 v-if="currentLight === 3" class="h-full w-full" />
      <Lights4 v-if="currentLight === 4" class="h-full w-full" />
    </transition>
  </div>
</template>

<script>
import Lights1 from '@/assets/svg/the-avenue-lights-3.svg?inline'
import Lights2 from '@/assets/svg/the-avenue-lights-4.svg?inline'
import Lights3 from '@/assets/svg/the-avenue-lights-5.svg?inline'
import Lights4 from '@/assets/svg/the-avenue-lights-7.svg?inline'

export default {
  components: {
    Lights1,
    Lights2,
    Lights3,
    Lights4,
  },

  data() {
    return {
      currentLight: 0,
      currentLoop: 0,
      loops: 1,
      lastLight: 3,
    }
  },

  mounted() {
    this.startRotation()
  },

  methods: {
    startRotation() {
      this.timer = setInterval(this.nextLight, 1000)
    },

    stopRotation() {
      clearTimeout(this.timer)
      this.timer = null
    },

    nextLight() {
      if (this.currentLoop === this.loops) {
        return this.stopRotation()
      }

      this.currentLight = this.currentLight === this.lastLight ? 0 : this.currentLight + 1

      if (this.currentLight === this.lastLight) {
        this.currentLoop += 1
      }
    },
  },
}
</script>

<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
