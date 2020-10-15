<template>
  <div class="bg-avenue-blue-light border-b-2 border-theavenue-background-extra-light">
    <div class="font-sans font-bold text-2xl text-center pt-4">Tip Jars</div>
    <div class="p-5 md:p-8 flex space-x-4">
      <div
        v-for="(jar, index) in jars"
        :key="jar.id"
        class="w-1/2 p-4 bg-theavenue-background-extra-light flex md:flex-col items-center justify-center rounded-lg"
      >
        <IcTipjarA v-if="index === 0" class="w-16 md:w-32" />
        <IcTipjarB v-else class="w-16 md:w-32" />
        <div class="flex flex-col items-center px-3 md:px-0">
          <div class="uppercase text-theavenue-green-neon font-library text-lg md:text-2xl my-3">
            $0.00
          </div>
          <div class="text-xs md:text-sm">Tip Jar #{{ index + 1 }}</div>
          <div>{{ jar.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IcTipjarA from '@/assets/svg/tipjar_0.svg?inline'
import IcTipjarB from '@/assets/svg/tipjar_1.svg?inline'

export default {
  name: 'TipJars',

  components: { IcTipjarA, IcTipjarB },

  props: {
    jars: {
      type: Array,
      required: true,
    },
  },
}
</script>
