<template>
  <div class="flex justify-center relative w-full h-20 md:h-40 lg:h-64">
    <transition name="page" mode="in-out">
      <component
        :is="lightComponent"
        :key="lightComponent"
        class="absolute left-0 top-0 h-full w-full"
      />
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
      currentLight: 1,
      currentLoop: 0,
      loops: 1,
      lastLight: 3,
    }
  },

  computed: {
    lightComponent() {
      return `Lights${this.currentLight}`
    },
  },

  mounted() {
    this.startRotation()
  },

  methods: {
    startRotation() {
      this.timer = setInterval(this.nextLight, 500)
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
