<template>
  <div class="min-h-screen bg-avenue-black text-white w-full">
    <Navbar />
    <nuxt />
    <modal name="user-access-modal" adaptive height="auto" @before-open="beforeOpenUserAccess">
      <UserAccessModal
        :active-tab="modals.userAccess.active"
        :title="modals.userAccess.title"
        :subtitle="modals.userAccess.subtitle"
      />
    </modal>

    <modal name="talent-signup-modal" adaptive height="auto">
      <TalentSignUpModal />
    </modal>

    <modal name="streaming-profile-modal" adaptive height="auto" width="350px">
      <StreamingProfileModal />
    </modal>

    <modal
      name="streaming-donate-modal"
      adaptive
      height="auto"
      @before-open="beforeOpenStreamingDonate"
    >
      <StreamingDonateModal
        :event="modals.streamingDonate.event"
        :jar="modals.streamingDonate.jar"
      />
    </modal>
  </div>
</template>
<script>
import Navbar from '@/components/commons/Navbar'
import UserAccessModal from '@/components/users/modals/UserAccessModal'
import TalentSignUpModal from '@/components/talents/modals/TalentSignUpModal'
import StreamingProfileModal from '@/components/talents/modals/StreamingProfileModal'
import StreamingDonateModal from '@/components/talents/modals/StreamingDonateModal'

export default {
  name: 'EventDetail',

  components: {
    Navbar,
    UserAccessModal,
    TalentSignUpModal,
    StreamingProfileModal,
    StreamingDonateModal,
  },

  data() {
    return {
      modals: {
        userAccess: {
          active: 'login',
          title: 'Welcome to The Avenue',
          subtitle: '',
        },
        streamingDonate: {
          event: null,
          jar: null,
        },
      },
    }
  },

  methods: {
    beforeOpenUserAccess(data) {
      const params = data.params || {}
      this.modals.userAccess.active = params.active || 'login'
      this.modals.userAccess.title = params.title || 'Welcome to The Avenue'
      this.modals.userAccess.subtitle = params.subtitle || ''
    },

    beforeOpenStreamingDonate({ params }) {
      this.modals.streamingDonate.event = params.event
      this.modals.streamingDonate.jar = params.jar
    },
  },
}
</script>
<style>
.vm--container > .vm--modal {
  @apply bg-theavenue-background-light;
  @apply rounded-md;
}
</style>
