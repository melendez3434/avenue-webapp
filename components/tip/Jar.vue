<template>
  <div
    class="w-1/2 p-4 bg-theavenue-background-extra-light flex md:flex-col items-center justify-center rounded-lg cursor-pointer"
    @click="$emit('click', jar.id)"
  >
    <IcTipJarColored
      v-if="jarWithMoreTips === jar.id"
      class="w-10 md:w-20"
      :class="{ 'shake-chunk shake-constant': activeJar === jar.id }"
    />
    <IcTipJarGreen
      v-else
      class="w-10 md:w-20"
      :class="{ 'shake-chunk shake-constant': activeJar === jar.id }"
    />
    <div class="flex flex-col items-center px-3 md:px-0">
      <div class="uppercase text-theavenue-green-neon font-library text-lg md:text-3xl my-1">
        {{ jarAmount }}
      </div>
      <div>{{ jar.name }}</div>
    </div>
  </div>
</template>
<script>
import IcTipJarGreen from '@/assets/svg/tipjar_0.svg?inline'
import IcTipJarColored from '@/assets/svg/tipjar_1.svg?inline'

export default {
  name: 'Jar',

  components: {
    IcTipJarGreen,
    IcTipJarColored,
  },

  props: {
    jar: {
      type: Object,
      default: () => ({}),
    },
    activeJar: {
      type: Number,
      default: null,
    },
    jarWithMoreTips: {
      type: Number,
      default: null,
    },
    showTotals: {
      type: Boolean,
      default: false,
    },
    jarsTotal: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    jarAmount() {
      return this.showTotals ? this.jarAmountFormatted : this.jarPercentage
    },

    jarAmountFormatted() {
      return `$ ${this.jar.total_amount.toFixed(2)}`
    },

    jarPercentage() {
      const percentage = (this.jar.total_amount / this.jarsTotal) * 100 || 0
      return `${Math.round(percentage)}%`
    },
  },
}
</script>
