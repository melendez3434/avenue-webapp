<template>
  <el-popover placement="top" trigger="click">
    <div
      v-clipboard="urlWithEnter"
      class="flex items-center cursor-pointer space-x-2 shadow-solid rounded py-2 px-3 font-semibold text-black"
      @success="showPopover"
    >
      <IcCopy />
      <span v-if="urlCopied">Done!</span>
      <span v-else>Copy Url</span>
    </div>
    <a
      :href="emailUrl"
      class="flex items-center cursor-pointer space-x-2 mt-2 shadow-solid rounded py-2 px-3 font-semibold text-black"
    >
      <IcMail />
      <span>Send Email</span>
    </a>
    <template v-if="event">
      <div class="shadow-solid rounded mt-2">
        <AddToCalendar :event="event" />
      </div>
    </template>
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
import { clipboard } from 'vue-clipboards'
import IcCopy from '@/assets/svg/copy.svg?inline'
import IcMail from '@/assets/svg/mail.svg?inline'
import IcShare from '@/assets/svg/anchor_arrow.svg?inline'
import AddToCalendar from '@/components/commons/ui/AddToCalendar'
export default {
  name: 'ShareButton',
  components: { IcCopy, IcMail, IcShare, AddToCalendar },
  directives: { clipboard },
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
    urlWithEnter() {
      return `${this.url}${String.fromCharCode(13)}`
    },
    emailUrl() {
      const subject = encodeURI(`${this.event.name} on The Avenue. ${this.formattedEventDate}`)
      const body = encodeURI(
        `${this.event.talent.name} will be live streaming ${this.formattedEventDate} on The Avenue.\n\n${this.eventUrl}\n\n${this.event.talent.biography}\n\nGenre: ${this.event.category.name}\n\nThank you.\nThe Avenue`
      )
      return `mailto:?subject=${subject}&body=${body}`
    },
    // smsUrl() {
    //   const body = encodeURI(
    //     `Watch ${this.event.talent.name} stream live, ${this.formattedEventDate}, on The Avenue.\n\n${this.eventUrl}`
    //   )
    //   return `sms:?&body=${body}`
    // },
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
  },
  methods: {
    showPopover() {
      this.urlCopied = true
      setTimeout(() => {
        this.urlCopied = false
      }, 2000)
    },
  },
}
</script>
