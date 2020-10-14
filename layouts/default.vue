<template>
  <div class="min-h-screen bg-avenue-black text-white">
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
        title: 'Welcome to The Avenueeeeee',
        subtitle: '',
      },
    }
  },

  methods: {
    beforeOpenUserAccess({ params }) {
      console.log('params', params)
      if (params.active) {
        this.modal.active = params.active
      }

      if (params.title) {
        this.modal.title = params.title
      }

      if (params.subtitle) {
        this.modal.subtitle = params.subtitle
      }
      // this.modal.active = params.active || 'login'
      // this.modal.title = params.title
      // this.modal.subtitle = params.subtitle
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
