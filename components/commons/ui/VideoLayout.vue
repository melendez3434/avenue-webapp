<template>
  <div
    class="w-full flex flex-col md:grid md:grid-cols-9 md:pl-4 bg-theavenue-background-extra-light available-height"
  >
    <div class="col-span-6 flex flex-col justify-between md:overflow-y-auto">
      <div class="relative h-auto md:video-height">
        <div v-if="event" class="absolute right-0 top-0 z-10 mt-4 mr-8 text-right">
          <div class="font-bold text-shadow">{{ event.name }}</div>
          <div class="text-sm text-shadow">{{ usersOnline.length }} watching now</div>
          <div class="text-sm text-shadow">{{ event.attendees_count }} total views</div>
        </div>
        <slot v-if="inactiveStreaming" name="placeholder" />
        <slot v-else />
      </div>
      <div v-if="talent" class="flex justify-between items-center bg-avenue-black px-8 h-full">
        <div class="flex-1 flex justify-center"><slot name="streaming" /></div>
        <slot name="settings" />
      </div>
      <TalentProfile
        v-else-if="event"
        class="hidden md:block"
        :talent="eventTalent"
        :event="event"
      />
    </div>
    <div class="md:col-span-3 flex flex-col flex-1">
      <template v-if="event">
        <TipJars :event="event" @click:jar="openDonationModal" />
        <ChatRoom class="h-52 md:chat-height" :event="event" @click:jar="openDonationModal" />
      </template>
      <template v-else>
        <TipJarsPlaceholder />
        <ChatRoomPlaceholder class="flex-1" />
      </template>
    </div>
    <modal
      width="100%"
      classes="max-w-md inset-x-0 m-auto"
      name="report-modal"
      scrollable
      height="auto"
    >
      <ReportModal v-if="!talent" :talent="event.talent" />
    </modal>
  </div>
</template>

<script>
import ReportModal from '@/components/talents/modals/ReportModal'

export default {
  name: 'VideoLayout',

  components: {
    ReportModal,
  },

  props: {
    event: {
      type: Object,
      default: null,
    },

    talent: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      streaming: {
        status: this.talent ? 'active' : this.event.talent.streaming_status,
      },
      usersOnline: [],
      listeningPresenceEvents: false,
    }
  },

  computed: {
    artist() {
      return this.talent || this.event.talent
    },

    inactiveStreaming() {
      if (this.event && this.event.is_finished) {
        return false
      }

      return ['idle', 'disconnected', 'no-channel'].includes(this.streaming.status)
    },

    eventTalent() {
      if (!this.event) return {}

      return { ...this.event.talent, social_media_links: this.event.social_media_links }
    },
  },

  watch: {
    event() {
      if (this.listeningPresenceEvents) return

      this.listenPresenceEvents()
    },
  },

  mounted() {
    this.listenMuxEvents()
    this.listenPresenceEvents()
  },

  beforeDestroy() {
    if (this.event) {
      this.$echo.leave(`event-presence.${this.event.id}`)
    }

    if (this.talent) return

    this.$echo
      .channel(`live.${this.event.id}`)
      .stopListening('StreamingIsLive')
      .stopListening('StreamingIsIdle')
      .stopListening('StreamingIsDisconnected')
  },

  methods: {
    openDonationModal(jar) {
      if (!this.$auth.loggedIn) {
        return this.$modal.show('user-access-modal', { active: 'login' })
      }

      this.$modal.show('streaming-donate-modal', { event: this.event.name, jar })
    },

    listenMuxEvents() {
      if (this.talent) return

      this.$echo
        .channel(`live.${this.event.talent.id}`)
        .listen('StreamingIsLive', ({ event }) => {
          if (!event) return
          if (event.id !== this.event.id) return

          this.streaming.status = 'active'
        })
        .listen('StreamingIsIdle', ({ event }) => {
          if (!event) return
          if (event.id !== this.event.id) return
          setTimeout(() => {
            this.streaming.status = 'idle'
          }, this.$config.videoBuffer * 1000)
        })
        .listen('StreamingIsDisconnected', ({ event }) => {
          if (!event) return
          if (event.id !== this.event.id) return
          this.streaming.status = 'disconnected'
        })
    },

    listenPresenceEvents() {
      if (!this.event) return

      this.$echo
        .join(`event-presence.${this.event.id}`)
        .here(users => {
          this.usersOnline = users
        })
        .joining(user => {
          this.usersOnline.push(user)
        })
        .leaving(user => {
          this.usersOnline = this.usersOnline.filter(u => u.token !== user.token)
        })

      this.listeningPresenceEvents = true
    },
  },
}
</script>
<style scoped>
.available-height {
  height: calc(100vh - 5rem);
}
.el-popper.el-popover.bg-theavenue-gray {
  @apply bg-theavenue-gray;
  @apply border-none;
}
</style>
