<template>
  <div
    class="w-full grid grid-cols-1 md:grid-cols-9 md:pl-4 bg-theavenue-background-extra-light available-height"
  >
    <div class="col-span-6 flex flex-col justify-between overflow-y-auto">
      <div :style="videoStyle" class="relative">
        <div v-if="event" class="absolute right-0 top-0 z-10 mt-4 mr-8 text-right">
          <div class="font-bold text-shadow">{{ event.name }}</div>
          <div class="text-sm text-shadow">{{ usersOnline.length }} watching now</div>
        </div>
        <slot v-if="inactiveStreaming" name="placeholder" />
        <slot v-else />
      </div>
      <div v-if="talent" class="flex justify-between items-center bg-avenue-black px-8 h-full">
        <div class="flex-1 flex justify-center"><slot name="streaming" /></div>
        <slot name="settings" />
      </div>
      <TalentProfile v-else-if="event" :talent="event.talent" />
    </div>
    <div class="col-span-3 flex flex-col">
      <template v-if="event">
        <TipJars :event="event" @click:jar="openDonationModal" />
        <ChatRoom class="flex-1" :event="event" :style="chatStyle" @click:jar="openDonationModal" />
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
    }
  },

  computed: {
    videoStyle() {
      return { height: 'calc(100vh - 83px - 5rem)' }
    },

    chatStyle() {
      const streamButtonHeight = this.talent ? 104 : 0
      return { height: `calc(100vh - 384px - 78px - ${streamButtonHeight}px)` }
    },

    artist() {
      return this.talent || this.event.talent
    },

    inactiveStreaming() {
      return ['idle', 'disconnected', 'no-channel'].includes(this.streaming.status)
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
          this.streaming.status = 'idle'
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
    },
  },
}
</script>
<style scoped>
.available-height {
  height: calc(100vh - 83px);
}
.el-popper.el-popover.bg-theavenue-gray {
  @apply bg-theavenue-gray;
  @apply border-none;
}
</style>
