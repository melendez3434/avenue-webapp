<template>
  <div class="bg-avenue-blue-light border-b-2 border-theavenue-background-extra-light">
    <div class="font-sans font-bold text-2xl text-center pt-4">Tip Jars</div>
    <div class="p-5 md:p-8 flex space-x-4">
      <div
        v-for="(jar, index) in jars"
        :id="jar.id"
        :key="jar.id"
        class="w-1/2 p-4 bg-theavenue-background-extra-light flex md:flex-col items-center justify-center rounded-lg cursor-pointer"
        @click="$emit('click:jar', jar.id)"
      >
        <IcTipjarA
          v-if="index === 0"
          class="w-16 md:w-32"
          :class="{ 'shake-chunk shake-constant': activeJar === jar.id }"
        />
        <IcTipjarB
          v-else
          class="w-16 md:w-32"
          :class="{ 'shake-chunk shake-constant': activeJar === jar.id }"
        />
        <div class="flex flex-col items-center px-3 md:px-0">
          <div
            v-if="event.show_jar_totals"
            class="uppercase text-theavenue-green-neon font-library text-lg md:text-2xl my-3"
          >
            $ {{ jar.total_amount.toFixed(2) }}
          </div>
          <div>{{ jar.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IcTipjarA from '@/assets/svg/tipjar_0.svg?inline'
import IcTipjarB from '@/assets/svg/tipjar_1.svg?inline'
import '@/assets/css/shake.css'

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
      activeJar: null,
      interval: null,
      maxTimeout: 5 * 60 * 1000,
    }
  },

  async mounted() {
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.jars.length)
      const jar = this.jars[randomIndex]
      if (jar) {
        this.activeJar = jar.id
        setTimeout(() => {
          this.activeJar = null
        }, 4000)
      }
    }, this.maxTimeout)

    this.$echo.channel(`event.${this.event.id}`).listen('TipCreated', ({ chatMessage }) => {
      const jar = this.jars.find(j => j.id === chatMessage.tip_jar_id)

      if (!jar) return

      this.activeJar = jar.id
      this.$set(jar, 'total_amount', jar.total_amount + chatMessage.amount)
      clearInterval(this.interval)
      setTimeout(() => {
        this.activeJar = null
      }, 4000)
    })
  },

  beforeDestroy() {
    this.$echo.channel(`event.${this.event}`).stopListening('ChatMessageCreated')
    clearInterval(this.interval)
  },
}
</script>
