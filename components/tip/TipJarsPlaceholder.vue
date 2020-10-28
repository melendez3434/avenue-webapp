<template>
  <div class="bg-avenue-blue-light border-b-2 border-theavenue-background-extra-light">
    <div class="font-sans font-bold text-2xl text-center pt-4">Tip Jars</div>
    <div class="p-5 md:p-8 flex space-x-4">
      <div
        v-for="jar in jars"
        :id="jar.id"
        :key="jar.id"
        class="w-1/2 p-4 bg-theavenue-background-extra-light flex md:flex-col items-center justify-center rounded-lg cursor-pointer"
      >
        <IcTipjarA class="w-16 md:w-32" />
        <div class="flex flex-col items-center px-3 md:px-0">
          <div>0%</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IcTipjarA from '@/assets/svg/tipjar_0.svg?inline'

export default {
  name: 'TipJarsPlaceholder',

  components: { IcTipjarA },

  data() {
    return {
      jars: [{ id: 'placeholder-1' }, { id: 'placeholder-2' }],
    }
  },
}
</script>
