<template>
  <div
    v-if="loaded"
    class=" mx-auto w-4/6 lg:w-1/2 mt-20 h-auto text-theavenue-white border p-8 flex justify-around items-center"
    style="box-shadow: 0px 0px 10px #FFFFFF;"
  >
    <div class="flex flex-col justify-center items-center w-1/4">
      <span class="font-league-gothic text-6xl md:text-xxl">{{ displayDays }}</span>
      <span class="text-xs md:text-xl">Days</span>
    </div>
    <div class="flex flex-col justify-center items-center w-1/4">
      <span class="font-league-gothic text-6xl md:text-xxl">{{ displayHours }}</span>
      <span class="text-xs md:text-xl">Hours</span>
    </div>
    <div class="flex flex-col justify-center items-center w-1/4">
      <span class="font-league-gothic text-6xl md:text-xxl">{{ displayMinutes }}</span>
      <span class="text-xs md:text-xl">Minutes</span>
    </div>
    <div class="flex flex-col justify-center items-center w-1/4">
      <span class="font-league-gothic text-6xl md:text-xxl">{{ displaySeconds }}</span>
      <span class="text-xs md:text-xl">Seconds</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    startDate: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      displayDays: 0,
      displayHours: 0,
      displayMinutes: 0,
      displaySeconds: 0,
      loaded: false,
    }
  },

  computed: {
    _seconds: () => 1000,
    _minutes() {
      return this._seconds * 60
    },
    _hours() {
      return this._minutes * 60
    },
    _days() {
      return this._hours * 24
    },
  },

  mounted() {
    this.showRemaining()
  },

  methods: {
    formatNum: num => (num < 10 ? `0${num}` : num),

    showRemaining() {
      const timer = setInterval(() => {
        const now = new Date()
        const end = new Date(this.startDate)
        const distance = end.getTime() - now.getTime()

        if (distance < 0) {
          clearInterval(timer)
          return
        }

        const days = Math.floor(distance / this._days)
        const hours = Math.floor((distance % this._days) / this._hours)
        const minutes = Math.floor((distance % this._hours) / this._minutes)
        const seconds = Math.floor((distance % this._minutes) / this._seconds)
        this.displayDays = this.formatNum(days)
        this.displayHours = this.formatNum(hours)
        this.displayMinutes = this.formatNum(minutes)
        this.displaySeconds = this.formatNum(seconds)
        this.loaded = true
      })
    },
  },
}
</script>
