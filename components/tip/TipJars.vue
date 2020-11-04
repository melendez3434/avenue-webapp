<template>
  <div class="bg-avenue-blue-light border-b-2 border-theavenue-background-extra-light">
    <div class="p-5 flex space-x-4">
      <Jar
        v-for="jar in jars"
        :id="jar.id"
        :key="jar.id"
        :jar="jar"
        :active-jar="activeJar"
        :jar-with-more-tips="jarWithMoreTips"
        :jars-total="jarsTotal"
        :show-totals="event.show_jar_totals"
        @click="$emit('click:jar', $event)"
      />
    </div>
  </div>
</template>

<script>
import Jar from '@/components/tip/Jar'
import '@/assets/css/shake.css'

export default {
  name: 'TipJars',

  components: { Jar },

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

  computed: {
    jarsTotal() {
      return this.jars.reduce((total, jar) => jar.total_amount + total, 0)
    },

    jarWithMoreTips() {
      const jarsAmount = this.jars.map(j => j.total_amount)
      const allJarsAreEqual = jarsAmount.every(j => j === jarsAmount[0])

      if (allJarsAreEqual) {
        return 0
      }

      const jars = [...this.jars]
      const ordered = jars.sort((a, b) => b.total_amount - a.total_amount)
      return ordered[0].id
    },
  },

  async mounted() {
    this.initializeDonationsInterval()

    this.$echo.channel(`event.${this.event.id}`).listen('TipCreated', ({ chatMessage }) => {
      const jar = this.jars.find(j => j.id === chatMessage.tip_jar_id)
      if (!jar) return

      this.activeJar = jar.id
      this.$set(jar, 'total_amount', jar.total_amount + chatMessage.amount)

      clearInterval(this.interval)
      this.initializeDonationsInterval()

      setTimeout(() => {
        this.activeJar = null
      }, 4000)
    })
  },

  beforeDestroy() {
    this.$echo.channel(`event.${this.event}`).stopListening('ChatMessageCreated')
    clearInterval(this.interval)
  },

  methods: {
    initializeDonationsInterval() {
      this.interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * this.jars.length)
        const jar = this.jars[randomIndex]
        if (jar) {
          this.activeJar = jar.id
          setTimeout(() => {
            this.activeJar = null
          }, 4000)
        }
      }, this.maxTimeout)
    },
  },
}
</script>
