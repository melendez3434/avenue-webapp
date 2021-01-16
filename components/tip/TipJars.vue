<template>
  <div
    class="h-20 md:h-80 landscape:h-20 bg-avenue-blue-light border-b-2 border-theavenue-background-extra-light"
  >
    <div class="p-5 landscape:p-2 flex space-x-1 md:space-x-4">
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
    <div class="hidden md:block mb-2 text-center landscape:hidden">
      <span class="font-bold">Top Tipper:</span>
      <span>{{ topTipper.name }}</span>
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
    try {
      const { data: jars } = await this.$api.events.getTipJars(this.event.id)
      const { data: tippers } = await this.$api.events.topTippers(this.event.id)
      this.jars = jars
      this.topTipper = tippers.length ? tippers[0].user : {}
    } catch {
      console.error("Couldn't fetch jars and tippers")
    }
  },

  data() {
    return {
      jars: [],
      topTipper: {},
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

    this.$echo
      .channel(`event.${this.event.id}`)
      .listen('TipCreated', ({ chatMessage, topContributors }) => {
        const jar = this.jars.find(j => j.id === chatMessage.tip_jar_id)
        if (!jar) return

        this.activeJar = jar.id
        this.$set(jar, 'total_amount', jar.total_amount + chatMessage.amount)
        this.topTipper = topContributors[0].user

        clearInterval(this.interval)
        this.initializeDonationsInterval()

        setTimeout(() => {
          this.activeJar = null
        }, 4000)
      })
  },

  beforeDestroy() {
    this.$echo.channel(`event.${this.event}`).stopListening('TipCreated')
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

    async fetchTopTipper() {
      try {
        const { data: tippers } = await this.$api.events.topTippers(this.event.id)
        this.topTipper = tippers[0].user
      } catch {
        console.error("Couldn't fetch the top tipper")
      }
    },
  },
}
</script>
