<template>
  <div class="min-h-screen bg-avenue-black text-white">
    <Navbar />
    <nuxt />

    <Footer v-if="!isStreamingPage" />

    <modal
      width="100%"
      classes="max-w-md inset-x-0 m-auto"
      name="user-access-modal"
      scrollable
      height="auto"
      @before-open="beforeOpenUserAccess"
    >
      <UsersModalsUserAccessModal
        :active-tab="modal.active"
        :title="modal.title"
        :subtitle="modal.subtitle"
      />
    </modal>

    <modal
      width="100%"
      classes="max-w-md inset-x-0 m-auto"
      name="talent-signup-modal"
      scrollable
      height="auto"
    >
      <TalentModalsSignUp />
    </modal>

    <modal name="streaming-profile-modal" adaptive height="auto" width="350px">
      <TalentModalsStreamingProfile />
    </modal>

    <modal
      name="warning-modal"
      adaptive
      height="auto"
      width="350px"
      @before-open="beforeOpenWarning"
    >
      <WarningModal :text="warningText" />
    </modal>

    <modal
      name="streaming-donate-modal"
      width="100%"
      classes="max-w-xl inset-x-0 m-auto"
      height="auto"
      scrollable
      @before-open="beforeOpenStreamingDonate"
    >
      <TalentModalsStreamingDonate :event="streamingDonate.event" :jar="streamingDonate.jar" />
    </modal>

    <modal
      name="purchase-ticket-modal"
      width="100%"
      classes="max-w-xl inset-x-0 m-auto"
      height="auto"
      scrollable
      @before-open="beforeOpenPurchaseTicket"
    >
      <EventModalsPurchaseTicket
        :event="ticketPurchase.event"
        @ticketPurchased="ticketPurchase.callback()"
      />
    </modal>

    <modal
      width="100%"
      classes="max-w-md inset-x-0 m-auto"
      name="join-event-modal"
      scrollable
      height="auto"
      @before-open="beforeOpenJoinEventModal"
    >
      <CompetitionJoinModal :competition="activeCompetition" />
    </modal>

    <modal
      width="100%"
      classes="max-w-md inset-x-0 m-auto"
      name="already-signedup-modal"
      scrollable
      height="auto"
    >
      <CompetitionAlreadySignedup @close="$modal.hide('already-signedup-modal')" />
    </modal>

    <modal
      width="100%"
      classes="max-w-md md:max-w-2xl inset-x-0 m-auto"
      name="not-logged-modal"
      scrollable
      height="auto"
    >
      <CompetitionNotLoggedModal @close="$modal.hide('not-logged-modal')" />
    </modal>

    <modal
      width="100%"
      classes="max-w-md md:max-w-2xl inset-x-0 m-auto"
      name="not-talent-modal"
      scrollable
      height="auto"
    >
      <CompetitionNotTalentModal @close="$modal.hide('not-talent-modal')" />
    </modal>

    <modal
      width="100%"
      classes="max-w-md md:max-w-2xl inset-x-0 m-auto"
      name="already-talent-modal"
      scrollable
      height="auto"
    >
      <TalentModalsAlreadyTalent @close="$modal.hide('already-talent-modal')" />
    </modal>

    <modal
      width="100%"
      classes="max-w-md inset-x-0 m-auto"
      name="welcome-modal"
      scrollable
      height="auto"
    >
      <CompetitionWelcomeModal @close="$modal.hide('welcome-modal')" />
    </modal>

    <modal
      width="100%"
      classes="max-w-md inset-x-0 m-auto"
      name="no-stripe-modal"
      scrollable
      height="auto"
    >
      <CompetitionNoStripeModal @close="$modal.hide('no-stripe-modal')" />
    </modal>

    <modal
      width="100%"
      classes="max-w-md md:max-w-2xl inset-x-0 m-auto"
      name="mobile-app-modal"
      scrollable
      height="auto"
    >
      <div class="flex flex-col space-y-8 items-center justify-center p-8">
        <IcClose
          class="cursor-pointer absolute top-4 right-4"
          aria-role="button"
          aria-label="close"
          @click="$modal.hide('mobile-app-modal')"
        />
        <div class="text-xl" @click="$modal.hide('mobile-app-modal')">
          <span>Trying to sign up for one of our competitions? Please sign up</span>
          <nuxt-link :to="{ name: 'events' }">
            here.
          </nuxt-link>
        </div>
        <div class="text-xl">For the best streaming experience download our app.</div>
        <IcPhone />
        <a href="https://apps.apple.com/us/app/the-avenue-viewer/id1555461012">
          <IcAppStore />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.app.theavenuev">
          <IcGooglePlay />
        </a>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import IcClose from '@/assets/svg/close.svg?inline'
import IcPhone from '@/assets/svg/phone.svg?inline'
import IcAppStore from '@/assets/svg/appstore.svg?inline'
import IcGooglePlay from '@/assets/svg/googleplay.svg?inline'

export default {
  name: 'DefaultLayout',

  components: {
    IcClose,
    IcPhone,
    IcAppStore,
    IcGooglePlay,
  },

  data() {
    return {
      modal: {
        active: 'login',
        title: 'Welcome to The Avenue',
        subtitle: '',
      },
      streamingDonate: {
        event: null,
        jar: null,
      },
      activeCompetition: {},
      ticketPurchase: {
        event: null,
        callback: () => {},
      },
      warningText: '',
    }
  },

  computed: {
    ...mapState({
      storeInitialized: state => state.global.storeInitialized,
    }),

    isStreamingPage() {
      const isEvent = this.$route.path.includes('event')
      const isBroadcast = this.$route.path.includes('broadcast')

      return isEvent || isBroadcast
    },
  },

  watch: {
    '$route.query.newPassword'(newPassword) {
      if (newPassword === true) {
        window.location.href = '/'
      }
    },

    '$route.query.action'(active) {
      this.$modal.show('user-access-modal', { active })
    },

    '$auth.loggedIn': {
      immediate: true,
      handler(loggedIn) {
        if (!loggedIn) return
        this.fetchFollowedTalents()
      },
    },
  },

  mounted() {
    if (this.$device.isMobileOrTablet && !this.$route.path.includes('events/')) {
      this.$modal.show('mobile-app-modal')
    }

    const active = this.$route.query.action
    if (!active) return
    this.$modal.show('user-access-modal', { active })
  },

  async created() {
    if (!this.storeInitialized) {
      await this.initStore()
    }
  },

  methods: {
    ...mapActions({
      initStore: 'global/initStore',
      fetchFollowedTalents: 'global/fetchFollowedTalents',
    }),

    beforeOpenUserAccess(data) {
      const params = data.params || {}
      this.modal.active = params.active || 'Login'
      this.modal.title = params.title || 'Welcome to The Avenue'
      this.modal.subtitle = params.subtitle || ''
    },

    beforeOpenPurchaseTicket(data) {
      const params = data.params || {}
      this.ticketPurchase.event = params.event
      this.ticketPurchase.callback = params.callback
    },

    beforeOpenWarning(data) {
      const params = data.params || {}
      this.warningText = params.text
    },

    beforeOpenStreamingDonate({ params }) {
      this.streamingDonate.event = params.event
      this.streamingDonate.jar = params.jar
    },

    beforeOpenJoinEventModal(data) {
      this.activeCompetition = data.params.competition
    },
  },
}
</script>
<style>
.nuxt-link-exact-active {
  @apply text-avenue-white-light;
}

.vm--container > .vm--modal {
  @apply bg-theavenue-background-light;
  @apply rounded-md;
}
</style>
