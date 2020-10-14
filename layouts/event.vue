<template>
  <div class="min-h-screen bg-avenue-black text-white w-full">
    <Navbar />
    <nuxt />
    <modal name="user-access-modal" adaptive height="auto" @before-open="beforeOpenUserAccess">
      <UserAccessModal :active-tab="modal.active" :title="modal.title" :subtitle="modal.subtitle" />
    </modal>

    <modal name="talent-signup-modal" adaptive height="auto">
      <TalentSignUpModal />
    </modal>

    <modal name="streaming-profile-modal" adaptive height="auto" width="350px">
      <StreamingProfileModal />
    </modal>
  </div>
</template>
<script>
import Navbar from '@/components/commons/Navbar'
import UserAccessModal from '@/components/users/modals/UserAccessModal'
import TalentSignUpModal from '@/components/talents/modals/TalentSignUpModal'
import StreamingProfileModal from '@/components/talents/modals/StreamingProfileModal'

export default {
  name: 'EventDetail',

  components: {
    Navbar,
    UserAccessModal,
    TalentSignUpModal,
    StreamingProfileModal,
  },

  data() {
    return {
      modal: {
        active: 'login',
        title: 'Welcome to The Avenue',
        subtitle: '',
      },
    }
  },

  methods: {
    beforeOpenUserAccess({ params }) {
      this.modal.active = params.active || 'login'
      this.modal.title = params.title || 'Welcome to The Avenue'
      this.modal.subtitle = params.subtitle || ''
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
