<template>
  <el-popover placement="top" trigger="click">
    <div v-if="event" class="shadow-solid rounded">
      <AddToCalendar :event="event" />
    </div>

    <div
      v-clipboard="urlWithEnter"
      class="flex items-center cursor-pointer space-x-2 mt-2 shadow-solid rounded py-2 px-3 font-semibold text-black"
      @success="showPopover"
    >
      <IcCopy />
      <span v-if="urlCopied">Done!</span>
      <span v-else>Copy Url</span>
    </div>
    <template v-if="event">
      <a
        :href="emailUrl"
        class="flex items-center cursor-pointer space-x-2 mt-2 shadow-solid rounded py-2 px-3 font-semibold text-black"
      >
        <IcMail />
        <span>Send Email</span>
      </a>
      <a
        :href="smsUrl"
        class="flex items-center cursor-pointer space-x-2 mt-2 shadow-solid rounded py-2 px-3 font-semibold text-black"
      >
        <IcSms />
        <span>Send SMS</span>
      </a>
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
import { clipboard } from 'vue-clipboards'
import IcCopy from '@/assets/svg/copy.svg?inline'
import IcMail from '@/assets/svg/mail.svg?inline'
import IcSms from '@/assets/svg/sms.svg?inline'
import IcShare from '@/assets/svg/anchor_arrow.svg?inline'
import AddToCalendar from '@/components/commons/ui/AddToCalendar'

export default {
  name: 'ShareButton',

  components: { IcCopy, IcMail, IcSms, IcShare, AddToCalendar },

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
      return `mailto:?subject=${this.event.talent.name}, performing live on The Avenue&amp;body=Check out this site http://www.theavenue.live.`
    },

    smsUrl() {
      return `sms:?body=${this.event.talent.name}, performing live on The Avenue&amp;body=Check out this site http://www.theavenue.live.`
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
