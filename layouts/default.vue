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
      @before-close="beforeCloseUserAccess"
    >
      <UserAccessModal :active-tab="modal.active" />
    </modal>

    <modal
      width="100%"
      classes="max-w-md inset-x-0 m-auto"
      name="talent-signup-modal"
      scrollable
      height="auto"
    >
      <TalentSignUpModal />
    </modal>

    <modal name="streaming-profile-modal" adaptive height="auto" width="350px">
      <StreamingProfileModal />
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
      adaptive
      height="auto"
      @before-open="beforeOpenStreamingDonate"
    >
      <StreamingDonateModal :event="streamingDonate.event" :jar="streamingDonate.jar" />
    </modal>
  </div>
</template>

<script>
import Navbar from '@/components/commons/Navbar'
import UserAccessModal from '@/components/users/modals/UserAccessModal'
import TalentSignUpModal from '@/components/talents/modals/TalentSignUpModal'
import StreamingProfileModal from '@/components/talents/modals/StreamingProfileModal'
import WarningModal from '@/components/talents/modals/WarningModal'
import StreamingDonateModal from '@/components/talents/modals/StreamingDonateModal'
import Footer from '@/components/commons/Footer'

export default {
  name: 'DefaultLayout',

  components: {
    Navbar,
    UserAccessModal,
    TalentSignUpModal,
    StreamingProfileModal,
    WarningModal,
    Footer,
    StreamingDonateModal,
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

      warningText: '',
    }
  },

  computed: {
    isStreamingPage() {
      const isEvent = this.$route.path.includes('event')
      const isBroadcast = this.$route.path.includes('broadcast')

      return isEvent || isBroadcast
    },
  },

  mounted() {
    const action = this.$route.query.action
    if (action && action === 'login') {
      this.$modal.show('user-access-modal', { active: 'login' })
    }
  },

  methods: {
    beforeOpenUserAccess(data) {
      const params = data.params || {}
      const active = params.active || 'login'
      this.modal.active = active
    },

    beforeCloseUserAccess() {
      this.$router.replace({ name: this.$router.name })
    },

    beforeOpenWarning(data) {
      const params = data.params || {}
      this.warningText = params.text
    },

    beforeOpenStreamingDonate({ params }) {
      this.streamingDonate.event = params.event
      this.streamingDonate.jar = params.jar
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
