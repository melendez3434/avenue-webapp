<template>
  <el-popover placement="left" trigger="click">
    <a
      :href="googleCalendarLink"
      class="flex items-center cursor-pointer space-x-2 mt-2 shadow-solid rounded py-2 px-3 font-semibold text-black"
      target="_blank"
    >
      <IcGoogle class="w-6 mr-3" />
      Google Calendar
    </a>
    <a
      :href="yahooCalendarLink"
      class="flex items-center cursor-pointer space-x-2 mt-2 shadow-solid rounded py-2.5 px-3 font-semibold text-black"
      target="_blank"
    >
      <IcYahoo class="w-4 mr-3" />
      Yahoo! Calendar
    </a>
    <a
      :href="outlookCalendarLink"
      class="flex items-center cursor-pointer space-x-2 mt-2 shadow-solid rounded py-2 px-3 font-semibold text-black"
      target="_blank"
    >
      <IcOutlook class="w-6 mr-3" />
      Outlook Calendar
    </a>
    <button
      slot="reference"
      class="flex items-center cursor-pointer space-x-2 mt-2 shadow-solid rounded py-2 px-3 font-semibold text-black"
      target="_blank"
    >
      <IcCalendar class="mr-2" />
      Add to Calendar
    </button>
  </el-popover>
</template>

<script>
import IcCalendar from '@/assets/svg/calendar.svg?inline'
import IcGoogle from '@/assets/svg/google.svg?inline'
import IcOutlook from '@/assets/svg/outlook.svg?inline'
import IcYahoo from '@/assets/svg/yahoo.svg?inline'

export default {
  name: 'AddToCalendar',

  components: { IcCalendar, IcGoogle, IcOutlook, IcYahoo },

  props: {
    event: {
      type: Object,
      required: true,
    },
  },

  computed: {
    start() {
      const formatted = this.event.starts_at.replace(/-/g, '').replace(/:/g, '')
      return formatted.slice(0, 8) + 'T' + formatted.slice(9)
    },

    outlookStart() {
      const time = this.event.starts_at.slice(0, 10) + 'T' + this.event.starts_at.slice(10)
      return time.replace(/ /g, '')
    },

    end() {
      const time = this.event.ends_at.replace(/-/g, '').replace(/:/g, '')
      return time.slice(0, 8) + 'T' + time.slice(9)
    },

    outlookEnd() {
      const time = this.event.ends_at.slice(0, 10) + 'T' + this.event.ends_at.slice(10)
      return time.replace(/ /g, '')
    },

    title() {
      return `Watch ${this.event.talent.name} stream live on The Avenue`
    },

    googleCalendarLink() {
      return `http://www.google.com/calendar/event?action=TEMPLATE&dates=${this.start}/${this.end}&text=${this.title}&location=&details=${this.title}`
    },

    outlookCalendarLink() {
      return `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=${this.outlookStart}&enddt=${this.outlookEnd}&subject=${this.title}`
    },

    yahooCalendarLink() {
      return `https://calendar.yahoo.com/?v=60&title=${this.title}&st=${this.start}&et=${this.end}`
    },
  },
}
</script>
