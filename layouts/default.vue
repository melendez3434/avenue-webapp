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
  </div>
</template>

<script>
import Navbar from '@/components/commons/Navbar'
import UserAccessModal from '@/components/users/modals/UserAccessModal'
import TalentSignUpModal from '@/components/talents/TalentSignUpModal'

export default {
  name: 'DefaultLayout',

  components: {
    Navbar,
    UserAccessModal,
    TalentSignUpModal,
  },

  data() {
    return {
      modal: {
        active: 'login',
      },
    }
  },

  methods: {
    beforeOpenUserAccess({ params }) {
      if (params.active) {
        this.modal.active = params.active
      }
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
