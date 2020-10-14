<template>
  <div class="min-h-screen bg-avenue-black text-white">
    <Navbar />
    <nuxt />

    <modal name="user-access-modal" adaptive height="auto" @before-open="beforeOpenUserAccess">
      <UserAccessModal :active-tab="modal.active" />
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
  name: 'DefaultLayout',

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
