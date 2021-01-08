<template>
  <el-popover placement="top" trigger="click">
    <div
      class="shadow-solid rounded mt-2 flex flex-row items-center p-1.5 font-bold"
      @click="share"
    >
      <IcShare class="w-8 h-8" fill="black" />
      Share
    </div>
    <div v-if="event" class="shadow-solid rounded mt-2">
      <AddToCalendar :event="event" />
    </div>
    <button
      slot="reference"
      class="font-library text-lg hover:text-light-white flex space-x-4 items-center border border-theavenue-white px-2 rounded-md py-0.5"
      style="box-shadow: 0px 0px 10px #FFFFFF;"
      target="_blank"
    >
      <IcShare class="w-6 h-6" />
      share
    </button>
  </el-popover>
</template>

<script>
import spacetime from 'spacetime'
import IcShare from '@/assets/svg/anchor_arrow.svg?inline'
import AddToCalendar from '@/components/commons/ui/AddToCalendar'

export default {
  name: 'ShareButton',

  components: { IcShare, AddToCalendar },

  props: {
    url: {
      type: String,
      default: process.client ? window.location.href : '',
    },
    event: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      urlCopied: false,
    }
  },

  computed: {
    formattedEventDate() {
      return `${this.eventDate} at ${this.eventStartTime} - ${this.eventEndTime} (${this.timezoneFormatted})`
    },

    eventDate() {
      return spacetime(this.event.starts_at, 'UTC')
        .goto(this.event.timezone)
        .format('{month-short} {date-pad}, {year}')
    },

    eventStartTime() {
      return spacetime(this.event.starts_at, 'UTC')
        .goto(this.event.timezone)
        .format('{hour}:{minute-pad}{ampm}')
    },

    eventEndTime() {
      return spacetime(this.event.ends_at, 'UTC') 
        .goto(this.event.timezone)
        .format('{hour}:{minute-pad}{ampm}')
    },

    eventUrl() {
      return `https://www.theavenue.live/event/${this.event.id}`
    },

    timezoneFormatted() {
      const [, city] = this.event.timezone.split('/')
      return city.replace('_', ' ')
    },

    isHomePage() {
      return this.$route.path === '/'
    }
  },

  methods: {
    showPopover() {
      this.urlCopied = true

      setTimeout(() => {
        this.urlCopied = false
      }, 2000)
    },

    share() {
      if (navigator.share) {
        navigator.share({
          title
        })
      }
    },
  },
}
</script>
