<template>
  <div
    class="w-full landscape:w-full md:w-1/2 p-2 md:p-4 landscape:p-2 bg-theavenue-background-extra-light flex md:flex-col landscape:flex-row items-center justify-center rounded-lg cursor-pointer"
    @click="$emit('click', jar.id)"
  >
    <IcTipJarColored
      v-if="jarWithMoreTips === jar.id"
      class="w-6 md:w-20 landscape:w-6"
      :class="{ 'shake-chunk shake-constant': activeJar === jar.id }"
    />
    <IcTipJarGreen
      v-else
      class="w-6 md:w-20 landscape:w-6"
      :class="{ 'shake-chunk shake-constant': activeJar === jar.id }"
    />
    <div class="flex md:flex-col items-center px-3 md:px-0">
      <div
        class="uppercase text-theavenue-green-neon font-library text-lg md:text-2xl lg:text-3xl landscape:text-sm my-1 landscape:ml-2 whitespace-no-wrap"
      >
        {{ jarAmount }}
      </div>
      <div class="hidden md:block landscape:hidden text-center h-12 overflow-hidden">
        {{ jar.name }}
      </div>
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
