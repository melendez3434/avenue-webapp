<template>
  <el-popover placement="top" trigger="click">
    <div v-if="hasShareApi">
      <button
        class="flex items-center cursor-pointer space-x-2 mt-2 shadow-solid rounded py-2 px-3 font-semibold text-black"
        @click="shareMobile"
      >
        <IcShare />
        Share
      </button>
      <div v-if="event" class="shadow-solid rounded mt-2">
        <AddToCalendar :event="event" aria-haspopup="true" />
      </div>
    </div>
    <div v-else>
      <div
        class="flex items-center cursor-pointer space-x-2 shadow-solid rounded py-2 px-3 font-semibold text-black"
        @click="copyUrl"
      >
        <IcCopy />
        <span v-if="urlCopied">Done!</span>
        <span v-else>Copy Url</span>
      </div>
      <div
        class="flex items-center cursor-pointer space-x-2 mt-2 shadow-solid rounded py-2 px-3 font-semibold text-black"
        @click="socialWindow(facebookUrl)"
      >
        <IcFacebook class="w-6" />
        <span>Facebook</span>
      </div>
      <div
        class="flex items-center cursor-pointer space-x-2 mt-2 shadow-solid rounded py-2.5 px-3 font-semibold text-black"
        @click="socialWindow(twitterUrl)"
      >
        <IcTwitter class="w-6" />
        <span>Twitter</span>
      </div>
      <template v-if="event">
        <a
          :href="emailUrl"
          class="flex items-center cursor-pointer space-x-2 mt-2 shadow-solid rounded py-2 px-3 font-semibold text-black"
        >
          <IcMail />
          <span>Email</span>
        </a>
        <div v-if="event" class="shadow-solid rounded mt- border-black">
          <AddToCalendar :event="event" aria-haspopup="true" />
        </div>
      </template>
    </div>
    <button
      slot="reference"
      aria-haspopup="true"
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
import IcCopy from '@/assets/svg/copy.svg?inline'
import IcMail from '@/assets/svg/mail.svg?inline'
import IcShare from '@/assets/svg/anchor_arrow.svg?inline'
import IcFacebook from '@/assets/svg/facebook_black.svg?inline'
import IcTwitter from '@/assets/svg/twitter_black.svg?inline'
import AddToCalendar from '@/components/commons/ui/AddToCalendar'
export default {
  name: 'ShareButton',
  components: { IcCopy, IcMail, IcShare, IcFacebook, IcTwitter, AddToCalendar },
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
    hasShareApi() {
      return process.client ? navigator.canShare : null
    },
    shareApiText() {
      return this.event
        ? `Watch ${this.event.talent.name} performing on The Avenue`
        : 'Watch this artist on The Avenue'
    },
    socialUrl() {
      return this.url.replace('/', '%2F').replace(':', '%3A')
    },
    facebookUrl() {
      return `https://www.facebook.com/sharer.php?u=${this.socialUrl}`
    },
    twitterUrl() {
      return `https://twitter.com/intent/tweet?url=${this.socialUrl}&text=Come+and+watch+this+artist+on+The+Avenue&hashtags=theavenue,streaming`
    },
  },

  methods: {
    copyUrl() {
      navigator.clipboard
        .writeText(this.url)
        .then(() => {
          this.urlCopied = true
          setTimeout(() => {
            this.urlCopied = false
          }, 2000)
        })
        .catch(error => {
          console.log(`Copy failed! ${error}`)
        })
    },

    shareMobile() {
      if (!this.hasShareApi || !process.client) return
      const shareData = {
        title: 'The Avenue',
        text: this.shareApiText,
        url: this.url,
      }
      navigator
        .share(shareData)
        .then(() => {
          console.log('Thanks for sharing')
        })
        .catch(() => {
          console.error("Couldn't share")
        })
    },

    socialWindow(url) {
      const left = (screen.width - 570) / 2
      const top = (screen.height - 570) / 2
      const params =
        'menubar=no,toolbar=no,status=no,width=570,height=570,top=' + top + ',left=' + left
      process.client ? window.open(url, 'NewWindow', params) : null
    },
  },
}
</script>
