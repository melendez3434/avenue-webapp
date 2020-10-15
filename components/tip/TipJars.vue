<template>
  <div class="bg-avenue-blue-light border-b-2 border-theavenue-background-extra-light">
    <div class="font-sans font-bold text-2xl text-center pt-4">Tip Jars</div>
    <div class="p-8 flex space-x-4">
      <div
        v-for="(jar, index) in jars"
        :key="jar.id"
        class="w-1/2 p-4 bg-theavenue-background-extra-light flex flex-col items-center justify-center rounded-lg cursor-pointer"
        @click="$emit('click:jar', jar.id)"
      >
        <IcTipjarA v-if="index === 0" />
        <IcTipjarB v-else />
        <div class="uppercase text-theavenue-green-neon font-library text-2xl my-3">
          $ {{ jar.total_amount.toFixed(2) }}
        </div>
        <div class="text-sm">Tip Jar #{{ index + 1 }}</div>
        <div>{{ jar.name }}</div>
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
    event: {
      type: Object,
      required: true,
    },
  },

  async fetch() {
    const { data } = await this.$api.events.getTipJars(this.event.id)
    this.jars = data
  },

  data() {
    return {
      jars: [],
    }
  },

  async mounted() {
    this.$echo.channel(`event.${this.event.id}`).listen('ChatMessageCreated', ({ chatMessage }) => {
      const jar = this.jars.find(j => j.id === chatMessage.tip_jar_id)

      if (!jar) return

      this.$set(jar, 'total_amount', jar.total_amount + chatMessage.amount)
    })
  },

  beforeDestroy() {
    this.$echo.channel(`event.${this.event}`).stopListening('ChatMessageCreated')
  },
}
</script>
